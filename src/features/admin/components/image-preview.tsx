"use client";

import { useState } from "react";

/**
 * Thumbnail of whatever the field currently points at.
 *
 * A plain `<img>`, not `next/image`. The value can be an R2 URL, a path under
 * `public/`, or something half-typed that resolves to nothing — the optimiser
 * treats the last two as errors, and there is no LCP to protect on an admin
 * form.
 *
 * Holds no memory of a previous `src`: the field remounts this on every change
 * (`key={src}`), which is what resets `broken` without an effect.
 */
export function ImagePreview({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <span className="grid size-20 shrink-0 place-items-center rounded-md bg-blue-950/60 text-2xl text-gold-100/25">
        {broken ? "!" : "□"}
      </span>
    );
  }

  return (
    <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-md bg-blue-950/60">
      {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
      <img
        src={src}
        alt=""
        onError={() => setBroken(true)}
        className="size-full object-contain"
      />
    </span>
  );
}
