"use client";

import { useEffect, useRef, type ReactNode } from "react";

import {
  EPSILON,
  STROKE_WIDTH,
  buildPath,
  type Box,
} from "./timeline-path";

const CARD = "[data-timeline-card]";

function toBox(card: HTMLElement, base: DOMRect): Box {
  const r = card.getBoundingClientRect();
  const left = r.left - base.left;
  const top = r.top - base.top;
  return {
    left,
    right: r.right - base.left,
    top,
    bottom: r.bottom - base.top,
    midX: left + r.width / 2,
    midY: top + r.height / 2,
  };
}

/** Groups cards into visual rows by their vertical position. */
function toRows(cards: HTMLElement[]): HTMLElement[][] {
  const rows: HTMLElement[][] = [];
  let rowTop: number | null = null;

  for (const card of cards) {
    const { top } = card.getBoundingClientRect();
    if (rowTop === null || Math.abs(top - rowTop) > EPSILON) {
      rows.push([card]);
      rowTop = top;
    } else {
      rows[rows.length - 1].push(card);
    }
  }

  return rows;
}

/**
 * Reverses every second row via flex `order`, so the rows read left-to-right,
 * then right-to-left, and so on.
 *
 * Reordering is safe to do after measuring because the cards are all the same
 * width: reversing a row cannot change which cards fit in it, so the rows do
 * not need regrouping afterwards.
 */
function applySerpentine(rows: HTMLElement[][]): void {
  let position = 0;

  for (const [index, row] of rows.entries()) {
    const ordered = index % 2 === 1 ? [...row].reverse() : row;
    for (const card of ordered) {
      card.style.order = String(position);
      position += 1;
    }
  }
}

/**
 * Draws the gold connector between timeline cards.
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
 * Written straight to the DOM rather than through state — this reruns on every
 * resize, and re-rendering for a string only the SVG reads would be waste.
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const gradient = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const draw = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>(CARD));

      // Pass 1 — natural wrap. Stale orders would corrupt the row grouping.
      for (const card of cards) card.style.order = "";
      applySerpentine(toRows(cards));

      // Pass 2 — reordered layout, in chronological (DOM) order.
      const base = el.getBoundingClientRect();
      path.current?.setAttribute(
        "d",
        buildPath(
          cards.map((card) => toBox(card, base)),
          base.width
        )
      );
      // Vertical sweep over the whole track, matching the brand gradient.
      gradient.current?.setAttribute("y2", String(base.height));
    };

    draw();

    // Only fires on size changes, so reordering (which moves cards without
    // resizing them or the container) cannot loop back into this.
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    for (const card of el.querySelectorAll(CARD)) observer.observe(card);

    return () => observer.disconnect();
  }, [children]);

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
        <path
          ref={path}
          stroke="url(#timeline-connector)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div className="relative flex flex-wrap justify-center gap-x-80 gap-y-24">
        {children}
      </div>
    </div>
  );
}
