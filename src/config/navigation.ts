import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  /** External links open in a new tab and get `rel="noreferrer"`. */
  external?: boolean;
  /** Renders as a hover dropdown on desktop and a disclosure on mobile. */
  children?: readonly NavItem[];
};

// TODO: point these at real routes as the pages land — placeholders resolve home.
export const mainNav: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  {
    label: "Solutions",
    href: routes.home,
    children: [
      { label: "Overview", href: routes.home },
      { label: "Integrations", href: routes.home },
      { label: "Pricing", href: routes.home },
    ],
  },
  {
    label: "Resources",
    href: routes.home,
    children: [
      { label: "Documentation", href: routes.home },
      { label: "Support", href: routes.home },
    ],
  },
  { label: "Contact", href: routes.home },
] as const;

export const footerNav: readonly NavItem[] = [
  {
    label: "Documentation",
    href: "https://nextjs.org/docs",
    external: true,
  },
] as const;
