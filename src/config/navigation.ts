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
 * The destination is editable: `field` names this option's field in the
 * `home.register` block, so an editor can repoint a row at an external
 * registration form without touching code. `defaultHref` is the event's own
 * page, which is where the row goes until someone does — a reader who has not
 * decided yet lands on the page that explains the event rather than on a form.
 *
 * This list is the single source for the three rows: `config/content/home.ts`
 * builds the block's fields and defaults from it, so adding an event here adds
 * its admin field too.
 */
export type RegisterOption = {
  label: string;
  /** Field name inside the `home.register` block. */
  field: string;
  /** Where the row points until an editor overrides it. */
  defaultHref: string;
  /** Path under `public/`. Already drawn in `blue-100`, same as the labels. */
  icon: string;
};

export const registerNav: readonly RegisterOption[] = [
  {
    label: "Business Model Canvas Competition",
    field: "competitionLink",
    defaultHref: routes.competition,
    icon: "/regist2.svg",
  },
  {
    label: "National Seminar",
    field: "seminarLink",
    defaultHref: routes.events.seminar,
    icon: "/regist3.svg",
  },
  {
    label: "Young Entrepreneur Summit",
    field: "summitLink",
    defaultHref: routes.events.youthEntrepreneurSummit,
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
