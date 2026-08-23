import { routes } from "./routes";

/** A nav entry that points at a page. */
export type NavLeaf = {
  label: string;
  href: string;
  /** External links open in a new tab and get `rel="noreferrer"`. */
  external?: boolean;
};

/**
 * A label that only opens a submenu. It has no page of its own, so it carries
 * no `href` — narrow a `NavItem` with `"children" in item` to reach it.
 */
export type NavGroup = {
  label: string;
  /** Renders as a hover dropdown on desktop and a disclosure on mobile. */
  children: readonly NavLeaf[];
};

export type NavItem = NavLeaf | NavGroup;

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.aboutUs },
  { label: "Competition", href: routes.competition },
  {
    label: "Events",
    children: [
      { label: "Seminar", href: routes.events.seminar },
      {
        label: "Youth Entrepreneur Summit",
        href: routes.events.youthEntrepreneurSummit,
      },
    ],
  },
] as const;

export const footerNav: readonly NavLeaf[] = [
  {
    label: "Documentation",
    href: "https://nextjs.org/docs",
    external: true,
  },
] as const;
