"use client";

import { X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

import { uploadImage } from "@/lib/storage/upload-image";

import { ImageDropzone } from "./image-dropzone";
import { ImagePreview } from "./image-preview";

/** Quiet typing before the preview tries a path, in milliseconds. */
const SETTLE_MS = 400;

/**
 * An image, chosen by dropping a file on it or by typing a path.
 *
 * The stored value is still a plain string — an R2 URL after an upload, or a
 * path under `public/` for everything seeded before uploads existed — so the
 * field posts with the rest of the form and nothing downstream has to know
 * where the bytes came from. The text input stays for that reason: it is how
 * an existing `/hero.png` is edited, and how a URL from elsewhere gets pasted.
 *
 * Controlled, unlike every other field here, because an upload has to write
 * the value back. That costs a render per keystroke on this one input.
 */
export function ImageField({
  name,
  label,
  value,
  className,
}: {
  name: string;
  label: string;
  value: string;
  className: string;
}) {
  const [current, setCurrent] = useState(value);
  const [preview, setPreview] = useState(value);
  /** Fraction uploaded, or `null` when no upload is running. */
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  /** Sets both at once — nothing to debounce when the value did not come from typing. */
  const commit = (next: string) => {
    window.clearTimeout(timer.current);
    setCurrent(next);
    setPreview(next);
  };

  // Debounced inside the handler rather than in an effect: there is no external
  // state to subscribe to here, only a delay. Without it, typing `/hero.png`
  // requests `/h`, `/he`, `/her`… and each one 404s loudly for no reason.
  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setCurrent(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPreview(next.trim()), SETTLE_MS);
  };

  const handleFile = async (file: File) => {
    setError(null);
    setProgress(0);
    try {
      commit(await uploadImage(file, setProgress));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setProgress(null);
    }
  };

  return (
    <>
      <ImageDropzone
        label={label}
        busy={progress !== null}
        progress={progress ?? 0}
        onFile={handleFile}
      >
        {/* Remounted per value, which is what resets its `broken` state. */}
        <ImagePreview key={preview} src={preview} />
      </ImageDropzone>

      <div className="flex items-center gap-2">
        <input
          name={name}
          value={current}
          onChange={handleType}
          type="text"
          aria-label={`${label} — path or URL`}
          placeholder="/example.png"
          className={className}
        />

        {current ? (
          <button
            type="button"
            onClick={() => commit("")}
            aria-label={`Clear ${label}`}
            className="shrink-0 rounded-lg border border-blue-300/40 p-2 text-gold-100/60 transition-colors hover:border-gold-500 hover:text-gold-200"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </>
  );
}
