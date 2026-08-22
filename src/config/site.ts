/**
 * Static, build-time metadata about the product itself.
 * Never put secrets or runtime-dependent values here — use `env.ts` for those.
 */
export const siteConfig = {
  name: "UI Studentpreneurs",
  shortName: "UISP",
  description:
    "The 16th UI Studentpreneurs  is The Biggest and Most Awaited National Entrepreneurship event held under Badan Eksekutif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Indonesia”",
  locale: "en",
  /** Absolute origin used for canonical URLs, OG images and sitemaps. */
  url: "https://example.com",
} as const;

export type SiteConfig = typeof siteConfig;
