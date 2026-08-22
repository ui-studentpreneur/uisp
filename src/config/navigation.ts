import { routes } from "./routes";

export type NavItem = {
  label: string;
  href: string;
  /** External links open in a new tab and get `rel="noreferrer"`. */
  external?: boolean;
};

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: routes.home },
] as const;

export const footerNav: readonly NavItem[] = [
  {
    label: "Documentation",
    href: "https://nextjs.org/docs",
    external: true,
  },
] as const;
