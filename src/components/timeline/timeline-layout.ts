/**
 * DOM measurement for the timeline track — reading where the cards actually
 * landed, and reordering them into the serpentine.
 *
 * Split from `timeline-track.tsx` so the component stays a component: this file
 * is the only place that touches layout geometry, `timeline-path.ts` turns that
 * geometry into a path, and `timeline-reveal.ts` animates it.
 */

import { EPSILON, type Box } from "./timeline-path";

/** Card rect, relative to the track's own box — the SVG's coordinate space. */
export function toBox(card: HTMLElement, base: DOMRect): Box {
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
export function toRows(cards: HTMLElement[]): HTMLElement[][] {
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
export function applySerpentine(rows: HTMLElement[][]): void {
  let position = 0;

  for (const [index, row] of rows.entries()) {
    const ordered = index % 2 === 1 ? [...row].reverse() : row;
    for (const card of ordered) {
      card.style.order = String(position);
      position += 1;
    }
  }
}
