import { createHash, createHmac } from "node:crypto";

/**
 * AWS Signature Version 4, query-string flavour — enough to presign one
 * request and no more.
 *
 * Hand-rolled for the same reason `lib/validation` parses env without zod: the
 * whole surface used here is a URL, a method and an expiry, against an
 * algorithm that has not changed since 2013. The AWS SDK is ~3 MB of client,
 * credential-provider and middleware to produce this string.
 *
 * Verified against the published `GET /test.txt` vector from the AWS docs
 * (`AKIAIOSFODNN7EXAMPLE`, 20130524, us-east-1) — if this file is ever
 * changed, re-check it against that vector.
 */

const ALGORITHM = "AWS4-HMAC-SHA256";
const TERMINATOR = "aws4_request";

/**
 * Presigned requests sign a placeholder instead of the body hash — the body is
 * whatever the browser later PUTs, and the signer never sees it.
 */
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";

export type SignOptions = {
  method: string;
  /** Endpoint origin plus path, e.g. `https://host/bucket/key`. */
  url: URL;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  service: string;
  /** Seconds the URL stays valid, from `now`. */
  expiresIn: number;
  /** Injectable so the test vector can pin a timestamp. */
  now?: Date;
};

/**
 * RFC 3986, which is stricter than `encodeURIComponent`: the four characters
 * it leaves alone are the difference between a valid signature and a 403.
 */
function uriEncode(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/** Each segment encoded, the separators left as separators. */
function canonicalPath(pathname: string): string {
  return pathname.split("/").map(uriEncode).join("/");
}

/** Sorted by encoded name, joined `k=v` — the order is part of the signature. */
function canonicalQuery(params: Map<string, string>): string {
  return [...params]
    .map(([key, value]): [string, string] => [uriEncode(key), uriEncode(value)])
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function hmac(key: Buffer | string, value: string): Buffer {
  return createHmac("sha256", key).update(value, "utf8").digest();
}

/** Returns the URL with the signature and its parameters appended. */
export function presign(options: SignOptions): string {
  const { url, accessKeyId, region, service, expiresIn } = options;

  const stamp = (options.now ?? new Date())
    .toISOString()
    .replace(/[-:]|\.\d{3}/g, "");
  const date = stamp.slice(0, 8);
  const scope = `${date}/${region}/${service}/${TERMINATOR}`;

  // `host` is the only signed header: the browser sends it on every request,
  // and anything else would have to be reproduced exactly by the uploader.
  const params = new Map(url.searchParams);
  params.set("X-Amz-Algorithm", ALGORITHM);
  params.set("X-Amz-Credential", `${accessKeyId}/${scope}`);
  params.set("X-Amz-Date", stamp);
  params.set("X-Amz-Expires", String(expiresIn));
  params.set("X-Amz-SignedHeaders", "host");

  const query = canonicalQuery(params);

  const canonicalRequest = [
    options.method,
    canonicalPath(url.pathname),
    query,
    `host:${url.host}\n`,
    "host",
    UNSIGNED_PAYLOAD,
  ].join("\n");

  const stringToSign = [
    ALGORITHM,
    stamp,
    scope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = [date, region, service, TERMINATOR].reduce<Buffer>(
    (key, part) => hmac(key, part),
    Buffer.from(`AWS4${options.secretAccessKey}`, "utf8"),
  );

  const signature = hmac(signingKey, stringToSign).toString("hex");

  return `${url.origin}${canonicalPath(url.pathname)}?${query}&X-Amz-Signature=${signature}`;
}
