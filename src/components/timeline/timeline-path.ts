/**
 * Geometry for the timeline connector. Pure and DOM-free so it can be reasoned
 * about (and tested) without a browser — `timeline-track.tsx` does the
 * measuring and hands the boxes in, already in chronological order.
 *
 * The rows run boustrophedon: first row left to right, the next right to left,
 * and so on. That means a row always ends on the same side the next row starts,
 * so the wrap is a short U-turn on that side rather than a sweep back across.
 */

/**
 * Stroke width of the connector, in px.
 *
 * The rails inset by half of this. An SVG clips to its own viewport by default,
 * so a line centred exactly on the container edge loses its outer half.
 */
export const STROKE_WIDTH = 8;

/**
 * Corner radius of the wrap turn, shrunk automatically when a leg is too short.
 *
 * Keep it comfortably above `STROKE_WIDTH`; a radius near the stroke width
 * reads as a blob rather than a curve.
 */
export const CORNER_RADIUS = 60;

/** How far past the card edge the U-turn reaches before curving down. */
export const WRAP_OVERHANG = 80;

/** Two cards count as aligned when their centres land this close together. */
export const EPSILON = 4;

export type Box = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  midX: number;
  midY: number;
};

const clamp = (...legs: number[]) =>
  Math.max(0, Math.min(CORNER_RADIUS, ...legs));

/**
 * Straight run between two cards on the same row.
 *
 * Connects the facing edges, so it works in both directions — on a
 * right-to-left row `b` sits to the left of `a`.
 */
function sameRow(a: Box, b: Box): string {
  return b.midX > a.midX
    ? `M ${a.right} ${a.midY} L ${b.left} ${b.midY}`
    : `M ${a.left} ${a.midY} L ${b.right} ${b.midY}`;
}

/**
 * The U-turn into the next row: out past the card edge, down, and back into
 * the next card on the same side.
 *
 * The side is whichever container edge `a` sits nearer — the end of a row is
 * always against one of them.
 */
function wrapTurn(a: Box, b: Box, width: number): string {
  const inset = STROKE_WIDTH / 2;
  const onRight = width - a.right <= a.left;
  // +1 when the turn bulges right of the cards, -1 when it bulges left.
  const dir = onRight ? 1 : -1;

  const startX = onRight ? a.right : a.left;
  const endX = onRight ? b.right : b.left;
  const railX = onRight
    ? Math.min(width - inset, a.right + WRAP_OVERHANG)
    : Math.max(inset, a.left - WRAP_OVERHANG);

  // The vertical run is shared by both corners, so each gets at most half.
  const drop = (b.midY - a.midY) / 2;
  const rOut = clamp(Math.abs(railX - startX), drop);
  const rIn = clamp(Math.abs(railX - endX), drop);

  return [
    `M ${startX} ${a.midY}`,
    `H ${railX - dir * rOut}`,
    `Q ${railX} ${a.midY} ${railX} ${a.midY + rOut}`,
    `V ${b.midY - rIn}`,
    `Q ${railX} ${b.midY} ${railX - dir * rIn} ${b.midY}`,
    `H ${endX}`,
  ].join(" ");
}

/** Straight drop between two cards stacked in one column. */
function sameColumn(a: Box, b: Box): string {
  return `M ${a.midX} ${a.bottom} L ${b.midX} ${b.top}`;
}

/**
 * How many cards share each box's row.
 *
 * Rows are contiguous in chronological order — the serpentine reversal changes
 * where a card sits, not which row it belongs to — so a single scan is enough.
 */
function rowSizes(boxes: readonly Box[]): number[] {
  const sizes = new Array<number>(boxes.length).fill(1);
  let start = 0;

  const close = (end: number) => {
    for (let i = start; i < end; i += 1) sizes[i] = end - start;
  };

  for (let i = 1; i < boxes.length; i += 1) {
    if (Math.abs(boxes[i].midY - boxes[start].midY) >= EPSILON) {
      close(i);
      start = i;
    }
  }
  close(boxes.length);

  return sizes;
}

/**
 * One `d` string per gap between cards, in chronological order.
 *
 * Returned as separate segments rather than one joined path because the
 * connector draws itself on scroll: SVG restarts a dash pattern at every
 * subpath, so a single `stroke-dashoffset` over a multi-`M` path would draw
 * every leg at once instead of one after another.
 */
export function buildSegments(boxes: readonly Box[], width: number): string[] {
  const segments: string[] = [];
  const sizes = rowSizes(boxes);

  for (let i = 0; i < boxes.length - 1; i += 1) {
    const a = boxes[i];
    const b = boxes[i + 1];

    if (Math.abs(a.midY - b.midY) < EPSILON) {
      segments.push(sameRow(a, b));
    } else if (sizes[i] === 1 && sizes[i + 1] === 1) {
      // One card per row (the narrow layout): there is no row to reverse, so a
      // U-turn out to the side would be decoration. Drop straight instead.
      segments.push(sameColumn(a, b));
    } else {
      segments.push(wrapTurn(a, b, width));
    }
  }

  return segments;
}
