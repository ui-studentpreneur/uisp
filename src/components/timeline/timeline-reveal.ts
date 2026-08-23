"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motionScale } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Timeline units. They only matter relative to each other — `scrub` stretches
 * the whole sequence across the track's scroll distance, whatever that is.
 */
const CARD_IN = 0.6;
const SEGMENT_IN = 1;

/**
 * How far each step starts before the one before it has finished.
 *
 * Without it the sequence reads as a series of stops: a card lands, nothing
 * moves, then the line starts. The overlap keeps something in motion at every
 * scroll position while still arriving strictly one at a time.
 */
const OVERLAP = 0.2;

/** Seconds the animation takes to catch up to the scrollbar. This is the glide. */
const SCRUB = 1;

/**
 * Tears a reveal down.
 *
 * The ScrollTrigger has to go explicitly: killing a ScrollTrigger kills the
 * animation it drives, but killing the animation leaves the trigger behind —
 * and this rebuilds on every resize, so a leftover trigger per resize would
 * pile up and keep re-rendering a dead timeline.
 */
export function killReveal(reveal: gsap.core.Timeline | null): void {
  reveal?.scrollTrigger?.kill();
  reveal?.kill();
}

/**
 * Reveals the track on scroll: card, the connector leg out of it, the next
 * card, and so on in chronological order.
 *
 * Scrubbed off one trigger spanning the whole track rather than one trigger per
 * card. Two cards in a row enter the viewport at the same moment, so per-card
 * triggers would fire them together — the single scrubbed sequence is what
 * guarantees they arrive one by one.
 *
 * Call it after the connector's `d` attributes are written; segment lengths are
 * read here and are wrong for a stale path. Returns the timeline so the caller
 * can kill it before re-measuring, or `null` when there is nothing to animate.
 */
export function buildReveal(
  container: HTMLElement,
  cards: HTMLElement[],
  segments: SVGPathElement[],
): gsap.core.Timeline | null {
  if (!cards.length) return null;

  // Each leg is hidden behind a dash exactly its own length; drawing it is just
  // sliding that dash off the end. `0.01` keeps a degenerate leg dashed — a
  // dasharray of 0 means "no dashing", which would paint it at full length.
  const lengths = segments.map((s) => Math.max(s.getTotalLength(), 0.01));
  segments.forEach((segment, i) =>
    gsap.set(segment, {
      strokeDasharray: lengths[i],
      strokeDashoffset: lengths[i],
    }),
  );

  // Reduced motion: land on the finished state now, with no scroll dependency
  // at all — the content must not be gated behind an animation that never runs.
  if (!motionScale()) {
    gsap.set(segments, { strokeDashoffset: 0 });
    gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: container,
      // Starts once the track is a fifth of the way up the viewport and is done
      // before its tail leaves, so the last card is not still arriving offscreen.
      start: "top 80%",
      end: "bottom 65%",
      scrub: SCRUB,
    },
  });

  cards.forEach((card, i) => {
    tl.fromTo(
      card,
      { autoAlpha: 0, y: 32, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: CARD_IN, ease: "power2.out" },
      i === 0 ? 0 : `>-${OVERLAP}`,
    );

    // The leg *out of* this card, so a card is always in place before the line
    // leaves it. The last card has none.
    const segment = segments[i];
    if (segment) {
      tl.to(segment, { strokeDashoffset: 0, duration: SEGMENT_IN }, `>-${OVERLAP}`);
    }
  });

  return tl;
}
