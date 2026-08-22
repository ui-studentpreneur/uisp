import Link from "next/link";

import type { NavItem } from "@/config";
import { cn } from "@/lib/utils";

export function NavLink({ item, className }: { item: NavItem; className?: string }) {
  const styles = cn("transition-colors hover:text-foreground", className);

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={styles}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={styles}>
      {item.label}
    </Link>
  );
}
