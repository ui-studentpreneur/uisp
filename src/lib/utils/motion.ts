/**
 * Client-only motion helpers. Reads `window`, so call from effects/handlers.
 */

/** `true` when the OS asks for reduced motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * `0` under reduced motion, otherwise `1`.
 *
 * Multiply durations by this so a reduced-motion user still lands on the same
 * end state — instantly, rather than not at all.
 */
export function motionScale(): number {
  return prefersReducedMotion() ? 0 : 1;
}
