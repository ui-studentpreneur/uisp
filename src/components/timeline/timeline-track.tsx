"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Children, useRef, type ReactNode } from "react";

import { applySerpentine, toBox, toRows } from "./timeline-layout";
import { STROKE_WIDTH, buildSegments } from "./timeline-path";
import { buildReveal, killReveal } from "./timeline-reveal";

const CARD = "[data-timeline-card]";

/**
 * Draws the gold connector between timeline cards and reveals both on scroll.
 *
 * Measured from real laid-out positions rather than assumed from a column
 * count: the cards use `flex-wrap`, so how many fit per row depends on the
 * viewport and is only knowable at runtime.
 *
 * Runs in two passes. The first clears any previous `order` and reads the
 * natural wrap to find the rows; the second reads the reordered layout and
 * builds the path. Both are needed because the serpentine order is derived
 * from the layout it then changes.
 *
 * The path is written straight to the DOM rather than through state — this
 * reruns on every resize, and re-rendering for a string only the SVG reads
 * would be waste.
 *
 * The hidden starting state is set here rather than in the markup, so the cards
 * are readable if this never runs. They sit below the fold on both pages that
 * use them, so hydration lands long before they are on screen.
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const segments = useRef<(SVGPathElement | null)[]>([]);
  const gradient = useRef<SVGLinearGradientElement>(null);

  // One connector per gap between cards, so each leg can draw itself in turn.
  const segmentCount = Math.max(0, Children.count(children) - 1);

  useGSAP(
    (_context, contextSafe) => {
      const el = container.current;
      if (!el) return;

      let reveal: gsap.core.Timeline | null = null;

      // `contextSafe` because `draw` also runs from the observer, long after
      // this callback has returned: without it the rebuilt tweens would escape
      // the context and outlive the component.
      const draw = contextSafe!(() => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>(CARD));

        // The reveal moves cards with transforms and `getBoundingClientRect`
        // reports those, so measuring mid-flight would bend the connector
        // around wherever a card happened to be passing. Drop the old tweens
        // and the inline styles they left before reading anything.
        killReveal(reveal);
        gsap.set(cards, { clearProps: "transform,opacity,visibility" });

        // Pass 1 — natural wrap. Stale orders would corrupt the row grouping.
        for (const card of cards) card.style.order = "";
        applySerpentine(toRows(cards));

        // Pass 2 — reordered layout, in chronological (DOM) order.
        const base = el.getBoundingClientRect();
        const legs = buildSegments(
          cards.map((card) => toBox(card, base)),
          base.width,
        );
        const paths = segments.current
          .slice(0, segmentCount)
          .filter((path) => path !== null);
        paths.forEach((path, i) => path.setAttribute("d", legs[i] ?? ""));

        // Vertical sweep over the whole track, matching the brand gradient.
        gradient.current?.setAttribute("y2", String(base.height));

        reveal = buildReveal(el, cards, paths);
      });

      draw();

      // Only fires on size changes, so reordering (which moves cards without
      // resizing them or the container) cannot loop back into this. Transforms
      // do not affect the observed box either, so the reveal cannot retrigger it.
      const observer = new ResizeObserver(draw);
      observer.observe(el);
      for (const card of el.querySelectorAll(CARD)) observer.observe(card);

      return () => observer.disconnect();
    },
    { dependencies: [children], scope: container },
  );

  return (
    <div ref={container} className="relative">
      {/* No viewBox: SVG user units then equal CSS pixels of this box. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            ref={gradient}
            id="timeline-connector"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop offset="0.236" stopColor="#F5B899" />
            <stop offset="0.452" stopColor="#F6D6BF" />
            <stop offset="0.894" stopColor="#B17763" />
          </linearGradient>
        </defs>

        {Array.from({ length: segmentCount }, (_, i) => (
          <path
            key={i}
            ref={(node) => {
              segments.current[i] = node;
            }}
            stroke="url(#timeline-connector)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </svg>

      <div className="relative flex flex-wrap justify-center gap-x-80 gap-y-24">
        {children}
      </div>
    </div>
  );
}
