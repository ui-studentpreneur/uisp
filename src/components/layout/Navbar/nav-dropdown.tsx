import { ChevronDown } from "lucide-react";
import Link from "next/link";

import type { NavItem } from "@/config";

import { NavLink } from "../nav-link";

/**
 * Hover dropdown with no client JavaScript.
 *
 * `group-hover` opens it for the pointer; `group-focus-within` opens it for the
 * keyboard. The panel is `invisible` rather than `hidden`, so its links are not
 * focusable until the trigger itself is focused — which is what makes tabbing
 * into the panel work without state.
 */
export function NavDropdown({ item }: { item: NavItem }) {
  return (
    <li className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-gold-100 transition-colors hover:text-gold-300"
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:rotate-180"
        />
      </Link>

      {/* `pt-3` bridges the gap so the pointer can travel trigger → panel. */}
      <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="relative min-w-52 rounded-2xl border-gradient-gold bg-gradient-donker p-2 shadow-xl shadow-black/40">
          {item.children?.map((child) => (
            <li key={child.label}>
              <NavLink
                item={child}
                className="block rounded-xl font-semibold px-3 py-2 text-sm text-gold-100 hover:bg-white/5 hover:text-gold-300"
              />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
