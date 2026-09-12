import { anchors, routes } from "./routes";

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
        label: "Young Entrepreneur Summit",
        href: routes.events.youthEntrepreneurSummit,
      },
    ],
  },
  /* Same-page fragment: the footer it targets is rendered by the layout, so
     this resolves from every page. */
  { label: "Contact Us", href: `#${anchors.contact}` },
] as const;

/**
 * One event the hero's register menu offers.
 *
 * These are links to pages, so they live here beside the rest of the site's
 * navigation rather than in the content registry — the labels name routes, and
 * renaming one without moving the route it points at would be a broken link,
 * not an edit.
 */
export type RegisterOption = NavLeaf & {
  /** Path under `public/`. Already drawn in `blue-100`, same as the labels. */
  icon: string;
};

export const registerNav: readonly RegisterOption[] = [
  {
    label: "Business Model Canvas Competition",
    href: routes.competition,
    icon: "/regist2.svg",
  },
  {
    label: "National Seminar",
    href: routes.events.seminar,
    icon: "/regist3.svg",
  },
  {
    label: "Young Entrepreneur Summit",
    href: routes.events.youthEntrepreneurSummit,
    icon: "/regist1.svg",
  },
] as const;

export const footerNav: readonly NavLeaf[] = [
  {
    label: "Documentation",
    href: "https://nextjs.org/docs",
    external: true,
  },
] as const;
