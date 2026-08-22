import Link from "next/link";

import { Container } from "@/components/ui";
import { mainNav, routes, siteConfig } from "@/config";

import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <Container as="nav" className="flex h-16 items-center justify-between">
        <Link href={routes.home} className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <ul className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
