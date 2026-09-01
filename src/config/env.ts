import { EnvReader } from "@/lib/validation";

/**
 * Environment access. Nothing outside this file reads `process.env`.
 *
 * - `clientEnv` holds only `NEXT_PUBLIC_*` values and is safe in any component.
 * - `serverEnv()` is a lazy getter so a missing secret fails on first server
 *   use rather than at module-import time (which would break the client build).
 *
 * Each `process.env.X` is written as a literal member expression on purpose:
 * that is what lets the bundler inline public values.
 */

const nodeEnv = process.env.NODE_ENV ?? "development";

/**
 * Absolute origin for metadata and canonical URLs.
 *
 * `??` is not enough here. A variable that exists but was left blank arrives as
 * `""`, which is not nullish — so the fallback would be skipped and
 * `new URL("")` in the root layout throws `ERR_INVALID_URL`, failing the build
 * during page-data collection. Hosting dashboards produce exactly that when a
 * project setting is added without a value, so these are truthiness checks
 * rather than `??`.
 *
 * `NEXT_PUBLIC_VERCEL_URL` is the deployment's own hostname, so a preview build
 * without the variable set still gets real absolute URLs instead of localhost.
 */
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return "http://localhost:3000";
}

export const clientEnv = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  isDevelopment: nodeEnv === "development",
  siteUrl: siteUrl(),
} as const;

export type ClientEnv = typeof clientEnv;

export type ServerEnv = {
  nodeEnv: string;
  logLevel: "debug" | "info" | "warn" | "error";
  /** PostgreSQL connection string. */
  databaseUrl: string;
  /** Signing key for Better Auth sessions. */
  authSecret: string;
  /** Absolute origin Better Auth issues callbacks against. */
  authUrl: string;
};

/**
 * Cloudflare R2, the object store uploaded images live in.
 *
 * Read through its own reader rather than as part of `ServerEnv`, because
 * `EnvReader.finish` throws on the first missing key in the whole object: the
 * site renders, builds and serves every existing image without R2 configured,
 * and only the admin's upload endpoint needs it. Folding these in would turn a
 * missing bucket name into a blank home page.
 */
export type R2Env = {
  /** Cloudflare account id — the S3 endpoint's subdomain. */
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  /** Origin the bucket is publicly readable at. Never a trailing slash. */
  publicUrl: string;
};

let cachedR2: R2Env | undefined;

/** Server-only. Throws with every missing key at once on first upload. */
export function r2Env(): R2Env {
  if (cachedR2) return cachedR2;

  const reader = new EnvReader(process.env);
  const publicUrl = reader.url("R2_PUBLIC_URL");

  cachedR2 = reader.finish<R2Env>({
    accountId: reader.string("R2_ACCOUNT_ID"),
    accessKeyId: reader.string("R2_ACCESS_KEY_ID"),
    secretAccessKey: reader.string("R2_SECRET_ACCESS_KEY"),
    bucket: reader.string("R2_BUCKET"),
    // Stripped here so callers can always join with a single slash.
    publicUrl: publicUrl.replace(/\/+$/, ""),
  });

  return cachedR2;
}

let cached: ServerEnv | undefined;

/** Server-only. Calling this from a Client Component is a bug. */
export function serverEnv(): ServerEnv {
  if (cached) return cached;

  const reader = new EnvReader(process.env);
  cached = reader.finish<ServerEnv>({
    nodeEnv,
    logLevel: reader.enum(
      "LOG_LEVEL",
      ["debug", "info", "warn", "error"] as const,
      clientEnv.isProduction ? "info" : "debug",
    ),
    databaseUrl: reader.string("DATABASE_URL"),
    authSecret: reader.string("BETTER_AUTH_SECRET"),
    // Falls back to the public origin so a deployment that sets only
    // NEXT_PUBLIC_SITE_URL still issues callbacks against itself.
    authUrl: reader.url("BETTER_AUTH_URL", clientEnv.siteUrl),
  });

  return cached;
}
