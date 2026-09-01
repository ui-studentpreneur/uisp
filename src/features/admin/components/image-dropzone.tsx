"use client";

import { ImageUp, LoaderCircle } from "lucide-react";
import { useRef, useState, type DragEvent, type ReactNode } from "react";

import { IMAGE_ACCEPT, MAX_IMAGE_BYTES } from "@/lib/storage/image-file";
import { cn } from "@/lib/utils";

/**
 * The drop target: a button that also accepts a dragged file.
 *
 * A `<button>` rather than a `<div role="button">` so the keyboard and screen
 * reader paths come for free — and `type="button"`, because the default inside
 * a form is `submit`, which would post the row every time an editor opened the
 * file picker.
 *
 * Everything inside is `pointer-events-none`: without it, dragging across a
 * child fires `dragleave` on the button and the highlight flickers off while
 * the pointer is still over the target.
 */
export function ImageDropzone({
  label,
  busy,
  progress,
  onFile,
  children,
}: {
  /** Field label, for the accessible name. */
  label: string;
  busy: boolean;
  /** Fraction uploaded, `0`–`1`. Only read while `busy`. */
  progress: number;
  onFile: (file: File) => void;
  /** The current preview, rendered inside the target. */
  children: ReactNode;
}) {
  const picker = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const take = (files: FileList | null) => {
    const [file] = files ?? [];
    if (file && !busy) onFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOver(false);
    take(event.dataTransfer.files);
  };

  return (
    <>
      <button
        type="button"
        disabled={busy}
        aria-label={`Upload ${label}`}
        onClick={() => picker.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg border border-dashed p-3 text-left transition-colors",
          "border-blue-300/40 bg-blue-900/40 hover:border-gold-500/70",
          over && "border-gold-500 bg-blue-800/60",
          busy && "cursor-progress opacity-70",
        )}
      >
        <span className="pointer-events-none contents">{children}</span>

        <span className="pointer-events-none min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-medium text-gold-200">
            {busy ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ImageUp className="size-4" />
            )}
            {busy
              ? `Uploading… ${Math.round(progress * 100)}%`
              : over
                ? "Drop to upload"
                : "Drag an image here, or click to choose"}
          </span>

          <span className="mt-1 block text-xs text-gold-100/50">
            PNG, JPG, WEBP, AVIF, GIF or SVG · up to{" "}
            {MAX_IMAGE_BYTES / 1024 / 1024} MB
          </span>

          {busy ? (
            <span className="mt-2 block h-1 overflow-hidden rounded-full bg-blue-950/60">
              <span
                className="block h-full rounded-full bg-gold-500 transition-[width]"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </span>
          ) : null}
        </span>
      </button>

      {/* Kept out of the tab order: the button above is the control, and this
          input carries no `name`, so it never posts with the form. */}
      <input
        ref={picker}
        type="file"
        accept={IMAGE_ACCEPT}
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => {
          take(event.target.files);
          // Cleared so choosing the same file twice in a row still fires.
          event.target.value = "";
        }}
      />
    </>
  );
}
