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

export const clientEnv = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  isDevelopment: nodeEnv === "development",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type ClientEnv = typeof clientEnv;

export type ServerEnv = {
  nodeEnv: string;
  logLevel: "debug" | "info" | "warn" | "error";
};

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
  });

  return cached;
}
