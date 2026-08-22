"use client";

import { useRef, useState } from "react";

import type { NavItem } from "@/config";

import { HamburgerIcon } from "./hamburger-icon";
import { MobileNavItem } from "./mobile-nav-item";
import { useCollapse } from "./use-collapse";

/**
 * The only stateful piece of the navbar. Owns the open/closed flag; the
 * animation itself lives in `useCollapse`, shared with the submenus.
 */
export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useCollapse<HTMLDivElement>(open, root);

  return (
    <div ref={root} className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-full text-gold-100 transition-colors hover:bg-white/5 hover:text-gold-300"
      >
        <HamburgerIcon open={open} />
      </button>

      {/* Padding lives on the <ul>: on this wrapper it would survive height 0. */}
      <div
        id="mobile-nav-panel"
        ref={panel}
        className="invisible absolute inset-x-0 top-full h-0 overflow-hidden rounded-b-2xl border-gradient-gold bg-gradient-donker shadow-xl shadow-black/40 [--border-gradient-width-top:0px] [--border-gradient-width-x:0px]"
      >
        <ul className="space-y-1 p-2">
          {items.map((item) => (
            <li key={item.label}>
              <MobileNavItem item={item} onNavigate={() => setOpen(false)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
