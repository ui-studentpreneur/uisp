import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Spacing between logos. The trailing padding must equal the gap: the track
 * animates by exactly -50%, so each copy has to occupy exactly half the width
 * *including* the space that separates it from the next copy. Using a `gap` on
 * the track instead would leave half a gap unaccounted for, and the loop would
 * visibly jump on every repeat.
 */
const ROW = "flex shrink-0 items-center gap-40 pr-40 max-md:gap-30 max-md:pr-30";

/**
 * Continuous horizontal scroll.
 *
 * Pure CSS: no measuring, no JS, and it runs before hydration. Pauses on hover
 * so a logo can be read, and stops entirely under `prefers-reduced-motion`.
 */
export function Marquee({
  seconds,
  reverse = false,
  children,
}: {
  seconds: number;
  /** Drift left to right instead of right to left. */
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <div
        style={{ "--marquee-duration": `${seconds}s` } as CSSProperties}
        className={cn(
          "animate-marquee flex w-max",
          "hover:[animation-play-state:paused] motion-reduce:animate-none",
          // Same keyframes played backwards. Both copies are identical, so
          // starting at -50% is as seamless as starting at 0.
          reverse && "[animation-direction:reverse]"
        )}
      >
        <div className={ROW}>{children}</div>
        {/* Second copy exists only to close the loop. */}
        <div className={ROW} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
