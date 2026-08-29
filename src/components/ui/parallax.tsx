"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

import { cn, motionScale } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Seconds the layer takes to catch up to the scrollbar. This is the glide. */
const SCRUB = 0.6;

/**
 * The scroll window every layer of one hero shares.
 *
 * Measured from the nearest `data-parallax` ancestor rather than the moving
 * element itself: the layers have different boxes — a full-bleed photo and a
 * centred block of copy — so triggering each off its own box would start them
 * at different scroll positions and the depth would read as drift.
 *
 * `top top` → `bottom top` is the section's own life on screen. Heroes sit at
 * the top of the page, so the range opens at the first pixel of scroll.
 */
function heroRange(el: HTMLElement): ScrollTrigger.Vars {
  return {
    trigger: el.closest<HTMLElement>("[data-parallax]") ?? el,
    start: "top top",
    end: "bottom top",
    scrub: SCRUB,
  };
}

/**
 * Full-bleed art that scrolls slower than the page.
 *
 * The moving layer is taller than the section by `strength` on each edge, and
 * travels exactly that overhang — from flush-top to flush-bottom — so the
 * section is covered at every scroll position instead of exposing a gap once
 * the art has moved. `yPercent` is a share of the *layer*, hence the
 * `1 + 2 * strength` correction.
 *
 * Fills its parent, which must be `relative` and clip its overflow. Under
 * reduced motion the layer never moves; it stays oversized and centred, which
 * still covers.
 */
export function ParallaxBackground({
  children,
  strength = 0.18,
  className,
}: {
  children: ReactNode;
  /** Overhang per edge, as a share of the section's height. */
  strength?: number;
  className?: string;
}) {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = layer.current;
      if (!el || !motionScale()) return;

      const travel = (100 * strength) / (1 + 2 * strength);
      gsap.fromTo(
        el,
        { yPercent: travel },
        { yPercent: -travel, ease: "none", scrollTrigger: heroRange(el) },
      );
    },
    { dependencies: [strength], scope: layer },
  );

  const overhang = `-${strength * 100}%`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        ref={layer}
        className="absolute inset-x-0"
        style={{ top: overhang, bottom: overhang }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * One depth plane inside a hero: drifts `distance` pixels over the section's
 * scroll range while the page scrolls its full height.
 *
 * Sign is the depth. Negative moves the element *up* — faster than the page,
 * so it reads as nearer. Positive lags behind and reads as further away, which
 * is what a background wants. Keep the values small; parallax stops being
 * depth and starts being a slide somewhere past a tenth of the viewport.
 *
 * Renders a plain `div`, so pass the positioning through `className` when the
 * element it replaces was positioned.
 */
export function ParallaxItem({
  children,
  distance,
  className,
}: {
  children?: ReactNode;
  /** Pixels travelled across the section. Negative is toward the viewer. */
  distance: number;
  className?: string;
}) {
  const item = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = item.current;
      if (!el || !motionScale()) return;

      gsap.to(el, { y: distance, ease: "none", scrollTrigger: heroRange(el) });
    },
    { dependencies: [distance], scope: item },
  );

  return (
    <div ref={item} className={className}>
      {children}
    </div>
  );
}
