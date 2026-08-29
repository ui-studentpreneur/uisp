"use client";

import { useRef, useState, type ChangeEvent } from "react";

/** Quiet typing before the preview tries a path, in milliseconds. */
const SETTLE_MS = 400;

/**
 * A path input with a live preview of what it points at.
 *
 * The preview is debounced rather than bound straight to the input: typing
 * `/hero.png` would otherwise request `/h`, `/he`, `/her`… and each one 404s
 * loudly in the console for no reason.
 *
 * A plain `<img>`, not `next/image`. The value is whatever the editor typed,
 * so it is frequently a path that does not resolve yet — the optimiser treats
 * that as an error, and there is no LCP to protect on an admin form.
 */
export function ImageField({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  const [src, setSrc] = useState(value);
  const [broken, setBroken] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Debounced inside the handler rather than in an effect: there is no external
  // state to subscribe to here, only a delay.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value.trim();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setBroken(false);
      setSrc(next);
    }, SETTLE_MS);
  };

  return (
    <>
      <input
        name={name}
        defaultValue={value}
        onChange={handleChange}
        type="text"
        placeholder="/example.png"
        className={className}
      />

      <div className="flex items-center gap-3 rounded-lg border border-blue-300/25 bg-blue-900/40 p-3">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-md bg-blue-950/60">
          {src && !broken ? (
            /* eslint-disable-next-line @next/next/no-img-element -- see the
               note above: an editor-supplied path is often not resolvable, and
               next/image treats that as a build-time error. */
            <img
              src={src}
              alt=""
              onError={() => setBroken(true)}
              className="size-full object-contain"
            />
          ) : (
            <span className="text-2xl text-gold-100/25">□</span>
          )}
        </div>

        <p className="min-w-0 text-xs break-all text-gold-100/50">
          {!src
            ? "No image set."
            : broken
              ? `Nothing at ${src} — check the path is under public/.`
              : src}
        </p>
      </div>
    </>
  );
}
