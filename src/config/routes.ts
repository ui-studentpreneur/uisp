/**
 * Single source of truth for every internal path.
 *
 * Import from here instead of hardcoding strings in `href`/`redirect()` so a
 * route rename is a one-line change and TypeScript catches every call site.
 */
export const routes = {
  home: "/",
  api: {
    health: "/api/health",
  },
} as const;

/** Every literal path reachable from `routes`, as a union type. */
export type AppRoute = "/" | "/api/health";
