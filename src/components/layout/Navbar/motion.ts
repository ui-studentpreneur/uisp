/** Shared motion constants for the navbar. Client-only — reads `window`. */

export const DURATION = {
  open: 0.4,
  close: 0.28,
  icon: 0.25,
} as const;

export const STAGGER = 0.05;

/**
 * Respect the OS "reduce motion" setting. Callers multiply their durations by
 * the result, so a reduced-motion user still lands on the same end state —
 * instantly, rather than not at all.
 */
export function motionScale(): number {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
}
