import { randomUUID } from "node:crypto";

import { IMAGE_EXTENSIONS, type ImageMimeType } from "./image-file";

/** Longest slug kept from the original filename, in characters. */
const MAX_STEM = 48;

/** Everything uploaded from the admin lands under this prefix. */
const PREFIX = "content";

/**
 * Turns a filename into one path segment: lowercase, ASCII, no separators.
 * Anything that survives is safe in a URL without escaping.
 */
function slugify(filename: string): string {
  const stem = filename.replace(/\.[^.]+$/, "");
  const slug = stem
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_STEM)
    .replace(/-+$/, "");
  return slug || "image";
}

/**
 * The object's key in the bucket.
 *
 * Always unique, never the bare filename. Two editors uploading `logo.png`
 * must not overwrite each other, and a key that is reused would keep serving
 * the old bytes from the CDN's cache long after the new image was saved. The
 * date segments are for a human browsing the bucket, nothing reads them.
 */
export function imageObjectKey(
  filename: string,
  contentType: ImageMimeType,
): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const unique = randomUUID().slice(0, 8);

  return `${PREFIX}/${year}/${month}/${slugify(filename)}-${unique}.${IMAGE_EXTENSIONS[contentType]}`;
}
