import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  /** External links open in a new tab and get `rel="noreferrer"`. */
  external?: boolean;
  /** Renders as a hover dropdown on desktop and a disclosure on mobile. */
  children?: readonly NavItem[];
};

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.aboutUs },
  { label: "Competition", href: routes.competition },
  {
    label: "Events",
    href: routes.events.index,
    children: [
      { label: "Seminar", href: routes.events.seminar },
      {
        label: "Youth Entrepreneur Summit",
        href: routes.events.youthEntrepreneurSummit,
      },
    ],
  },
] as const;

export const footerNav: readonly NavItem[] = [
  {
    label: "Documentation",
    href: "https://nextjs.org/docs",
    external: true,
  },
] as const;
