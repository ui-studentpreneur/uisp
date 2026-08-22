import { Container } from "@/components/ui";
import { footerNav, siteConfig } from "@/config";

import { NavLink } from "./nav-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <Container className="flex flex-col gap-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex items-center gap-6">
          {footerNav.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
