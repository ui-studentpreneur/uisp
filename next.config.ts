import type { NextConfig } from "next";

/**
 * Public origin of the R2 bucket the admin uploads to.
 *
 * Read straight from `process.env` rather than through `src/config/env.ts` —
 * this file is evaluated before any path alias exists, and it is the one place
 * outside that module allowed to do so.
 *
 * Optional on purpose: without it the site still builds and every image under
 * `public/` still renders. Only an uploaded image needs the allow-list below.
 */
const r2PublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // `next/image` answers 400 for any remote host that is not listed here, so
    // uploaded images would break without this. A bad value is ignored rather
    // than thrown, which would take the whole build down over an env typo.
    remotePatterns:
      r2PublicUrl && URL.canParse(r2PublicUrl)
        ? [new URL(`${r2PublicUrl}/**`)]
        : [],
  },
};

export default nextConfig;
