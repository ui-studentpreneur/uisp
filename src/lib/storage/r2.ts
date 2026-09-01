import "server-only";

import { r2Env } from "@/config/env";

import { presign } from "./sigv4";

/**
 * Cloudflare R2 over the S3 API.
 *
 * R2 has no regions, but SigV4 requires one in the credential scope and R2
 * only accepts this literal.
 */
const REGION = "auto";
const SERVICE = "s3";

/**
 * How long a presigned upload URL stays valid. Long enough for a slow phone on
 * hotel wifi to finish a PUT it has already started, short enough that a URL
 * leaked from a browser history is worthless.
 */
const UPLOAD_WINDOW_SECONDS = 15 * 60;

/** Where the object is readable once uploaded — a bucket domain, not the API. */
export function publicUrl(key: string): string {
  return `${r2Env().publicUrl}/${key}`;
}

/**
 * A URL the browser may `PUT` one object to, and where that object will then
 * be readable.
 *
 * The credentials never leave the server; the browser gets a signature that
 * covers exactly this key, this method and this quarter of an hour. Nothing
 * else about the upload is signed — in particular `Content-Type` travels as a
 * plain header, so the caller must send it for R2 to store the right one.
 */
export function presignUpload(key: string): {
  uploadUrl: string;
  publicUrl: string;
} {
  const env = r2Env();

  // Path style (`/bucket/key`) against the account's S3 endpoint, rather than
  // a bucket subdomain: the signed host is then the same for every bucket, and
  // it is the form Cloudflare documents for R2.
  const url = new URL(
    `https://${env.accountId}.r2.cloudflarestorage.com/${env.bucket}/${key}`,
  );

  const uploadUrl = presign({
    method: "PUT",
    url,
    accessKeyId: env.accessKeyId,
    secretAccessKey: env.secretAccessKey,
    region: REGION,
    service: SERVICE,
    expiresIn: UPLOAD_WINDOW_SECONDS,
  });

  return { uploadUrl, publicUrl: publicUrl(key) };
}
