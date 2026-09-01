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
    seminar: "/events/seminar",
    youthEntrepreneurSummit: "/events/youth-entrepreneur-summit",
  },
  api: {
    health: "/api/health",
    /** Presigns one image upload to R2. Signed-in editors only. */
    adminUploadUrl: "/api/admin/upload-url",
  },
  /** Content admin. Gated by `requireUser()` on every page and action. */
  admin: "/admin",
  adminLogin: "/admin/login",
} as const;

/** Every literal path reachable from `routes`, as a union type. */
export type AppRoute =
  | "/"
  | "/about-us"
  | "/competition"
  | "/events/seminar"
  | "/events/youth-entrepreneur-summit"
  | "/api/health"
  | "/api/admin/upload-url"
  | "/admin"
  | "/admin/login";

/**
 * Fragment ids shared between a link and the element it targets.
 *
 * Not routes: they append to whichever page the reader is already on, so the
 * target element must exist on every page — the footer lives in the layout.
 */
export const anchors = {
  contact: "contact",
} as const;
