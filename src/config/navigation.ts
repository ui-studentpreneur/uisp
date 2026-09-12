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
 * The destination is not a page: it is `ctaLink` on the named block, which is
 * the same registration URL that event's own Register button opens. Storing
 * the block key rather than the URL is what keeps the two in step — change the
 * form link in the admin once and both buttons follow.
 */
export type RegisterOption = {
  label: string;
  /** Block whose `ctaLink` this opens. */
  block: string;
  /** Path under `public/`. Already drawn in `blue-100`, same as the labels. */
  icon: string;
};

export const registerNav: readonly RegisterOption[] = [
  {
    label: "Business Model Canvas Competition",
    block: "competition.hero",
    icon: "/regist2.svg",
  },
  {
    label: "National Seminar",
    block: "seminar.hero",
    icon: "/regist3.svg",
  },
  {
    label: "Young Entrepreneur Summit",
    block: "summit.hero",
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
