/**
 * What counts as an uploadable image.
 *
 * Shared by both ends of the upload: the dropzone filters what the file picker
 * offers and rejects a bad drop before any network call, and the presign route
 * re-checks the same rules — the browser's answer is a convenience, not a
 * guarantee, since the endpoint is a plain POST anyone signed in can craft.
 */

/**
 * Extension per accepted MIME type. The map is the allow-list; the value is
 * what the object key ends in, so the CDN serves a sane filename and
 * `next/image` can recognise `.svg` and skip optimisation.
 */
export const IMAGE_EXTENSIONS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/svg+xml": "svg",
} as const;

export type ImageMimeType = keyof typeof IMAGE_EXTENSIONS;

/** For the file input's `accept`, so the picker hides everything else. */
export const IMAGE_ACCEPT = Object.keys(IMAGE_EXTENSIONS).join(",");

/**
 * 8 MB. Comfortably above a full-resolution photo and below anything that
 * would sit in a browser's memory long enough to be felt.
 */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export function isImageMimeType(value: string): value is ImageMimeType {
  return value in IMAGE_EXTENSIONS;
}

/** A human-readable reason the file is unusable, or `null` when it is fine. */
export function rejectImage(file: {
  type: string;
  size: number;
}): string | null {
  if (!isImageMimeType(file.type)) {
    return file.type
      ? `${file.type} is not an image type we accept.`
      : "That file has no recognisable type.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Too large — the limit is ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`;
  }
  if (file.size === 0) return "That file is empty.";
  return null;
}
