/**
 * Static, build-time metadata about the product itself.
 * Never put secrets or runtime-dependent values here — use `env.ts` for those.
 */
export const siteConfig = {
  name: "UISP",
  shortName: "UISP",
  description: "A modular Next.js application.",
  locale: "en",
  /** Absolute origin used for canonical URLs, OG images and sitemaps. */
  url: "https://example.com",
} as const;

export type SiteConfig = typeof siteConfig;
