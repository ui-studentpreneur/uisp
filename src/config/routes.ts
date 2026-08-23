/**
 * Single source of truth for every internal path.
 *
 * Import from here instead of hardcoding strings in `href`/`redirect()` so a
 * route rename is a one-line change and TypeScript catches every call site.
 */
export const routes = {
  home: "/",
  aboutUs: "/about-us",
  competition: "/competition",
  events: {
    index: "/events",
    seminar: "/events/seminar",
    youthEntrepreneurSummit: "/events/youth-entrepreneur-summit",
  },
  api: {
    health: "/api/health",
  },
} as const;

/** Every literal path reachable from `routes`, as a union type. */
export type AppRoute =
  | "/"
  | "/about-us"
  | "/competition"
  | "/events"
  | "/events/seminar"
  | "/events/youth-entrepreneur-summit"
  | "/api/health";
