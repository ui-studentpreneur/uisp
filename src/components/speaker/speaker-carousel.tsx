"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { cn, prefersReducedMotion } from "@/lib/utils";

import type { Speaker } from "../types";

import { SpeakerCard } from "./speaker-card";

/** Fraction of each neighbouring card left visible beside the active one. */
const PEEK = 0.2;
/** Gutter between cards, in rem. */
const GAP_REM = 1;
/** Time each card is held before advancing. */
const AUTOPLAY_MS = 4000;
/** Quiet period after a swipe before autoplay takes over again. */
const RESUME_AFTER_MS = 6000;
/**
 * How many times the list is repeated. Three is the minimum that loops: one set
 * either side of the middle guarantees a neighbour in both directions no matter
 * where the middle set is scrolled to.
 */
const COPIES = 3;
/** Idle time after scrolling before the loop is silently recentred. */
const SETTLE_MS = 140;
/** Matches Tailwind's `md`, where the carousel becomes a wrapped row. */
const DESKTOP = "(min-width: 48rem)";

/**
 * The active card plus a sliver of its neighbours:
 *
 *   viewport = peek + gap + card + gap + peek,  peek = PEEK * card
 *
 * which rearranges to the width below. Sized against the viewport rather than
 * the track, because the track's own padding is derived from this — using `%`
 * would make the two definitions circular.
 */
const SLIDE_WIDTH = `calc((100vw - ${GAP_REM * 2}rem) / ${1 + 2 * PEEK})`;

/**
 * Speaker list: an endless, auto-advancing carousel on mobile and a plain
 * wrapped row from `md` up.
 *
 * Looping is done by rendering the list `COPIES` times and, once scrolling
 * settles, jumping `scrollLeft` by exactly one set whenever the viewport drifts
 * out of the middle set. The jump is instant and lands on identical content, so
 * it is invisible — and because it only ever moves by a whole set, the card
 * under the pointer does not shift.
 *
 * Built on native scroll-snap rather than a transform track, so swiping,
 * momentum and accessibility come from the browser.
 */
export function SpeakerCarousel({ people }: { people: readonly Speaker[] }) {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const desktop = window.matchMedia(DESKTOP);
    const slides = () =>
      Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));

    /**
     * Scroll offset that centres a slide. `slides[0].offsetLeft` is the track's
     * start padding, so subtracting it makes offsets zero-based.
     */
    const offsetOf = (index: number) => {
      const all = slides();
      return all[index].offsetLeft - all[0].offsetLeft;
    };

    /** Width of one full copy of the list. */
    const setWidth = () => offsetOf(people.length);

    const activeIndex = () => {
      const centre = el.scrollLeft + el.clientWidth / 2;
      const all = slides();
      let best = 0;
      let bestDistance = Infinity;

      all.forEach((slide, index) => {
        const distance = Math.abs(
          slide.offsetLeft + slide.clientWidth / 2 - centre
        );
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });

      return best;
    };

    const markActive = () => {
      const all = slides();
      const active = desktop.matches ? -1 : activeIndex();
      all.forEach((slide, index) => {
        slide.toggleAttribute("data-active", index === active);
      });
    };

    const goTo = (index: number, behavior: ScrollBehavior = "smooth") => {
      el.scrollTo({ left: offsetOf(index), behavior });
    };

    /** Pull the viewport back into the middle copy once it drifts out. */
    const recentre = () => {
      const width = setWidth();
      if (width <= 0) return;
      if (el.scrollLeft < width * 0.5) el.scrollLeft += width;
      else if (el.scrollLeft > width * 1.5) el.scrollLeft -= width;
    };

    // Start in the middle copy so there is a card on both sides immediately.
    goTo(people.length, "auto");
    markActive();

    let paused = false;
    let resume: number | undefined;
    let settle: number | undefined;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        markActive();
      });
      window.clearTimeout(settle);
      settle = window.setTimeout(recentre, SETTLE_MS);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resume);
      resume = window.setTimeout(() => {
        paused = false;
      }, RESUME_AFTER_MS);
    };

    const tick = () => {
      // Checked per tick, so a resize or a background tab needs no resubscribe.
      if (paused || desktop.matches || document.hidden) return;
      goTo(Math.min(activeIndex() + 1, slides().length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", pause);
    el.addEventListener("wheel", pause, { passive: true });

    // Reduced motion keeps the loop and the swipe, and drops only the autoplay.
    const timer = prefersReducedMotion()
      ? undefined
      : window.setInterval(tick, AUTOPLAY_MS);

    return () => {
      if (timer) window.clearInterval(timer);
      window.clearTimeout(resume);
      window.clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [people]);

  return (
    <ul
      ref={track}
      style={{ "--slide-width": SLIDE_WIDTH } as CSSProperties}
      className={[
        // `w-full` is load-bearing: the parents are `flex flex-col items-center`,
        // so without a definite width this is a non-stretched flex item sized by
        // content. The cards are `shrink-0`, making min-content wider than the
        // screen — the box would grow past the viewport instead of scrolling
        // inside it, which kills both the swipe and the peeking neighbours.
        "flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto",
        "px-[calc((100vw-var(--slide-width))/2)]",
        // Headroom so the lifted active card is not clipped by the scrollport.
        "py-6",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // Desktop: an ordinary wrapped row.
        "md:flex-wrap md:justify-center md:gap-20 md:overflow-visible md:px-0 md:py-0",
      ].join(" ")}
    >
      {Array.from({ length: COPIES }, (_, copy) =>
        people.map((speaker) => (
          <li
            key={`${copy}-${speaker.name}`}
            data-slide
            // Only the middle copy is real content; the rest are loop padding.
            aria-hidden={copy !== 1 || undefined}
            className={cn(
              "flex w-[var(--slide-width)] shrink-0 snap-center justify-center",
              "transition-transform duration-300 ease-out",
              "data-active:-translate-y-4",
              "md:w-auto md:translate-y-0",
              // The copies exist only to make the mobile carousel loop. Desktop
              // is a plain wrapped row, so they would just repeat the list.
              copy !== 1 && "md:hidden"
            )}
          >
            <SpeakerCard speaker={speaker} />
          </li>
        ))
      )}
    </ul>
  );
}
