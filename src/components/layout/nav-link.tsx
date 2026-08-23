import Link from "next/link";

import type { NavLeaf } from "@/config";
import { cn } from "@/lib/utils";

export function NavLink({
  item,
  className,
  onClick,
}: {
  item: NavLeaf;
  className?: string;
  /** Passed by client callers only — e.g. to close the mobile menu on tap. */
  onClick?: () => void;
}) {
  const styles = cn("transition-colors hover:text-foreground", className);

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={styles}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={styles} onClick={onClick}>
      {item.label}
    </Link>
  );
}
