"use client";

import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import type { NavItem } from "@/config";
import { cn } from "@/lib/utils";

import { NavLink } from "../nav-link";

import { useCollapse } from "./use-collapse";

export const LEAF =
  "block rounded-xl px-3 py-2.5 text-sm font-bold text-gold-100 transition-colors hover:bg-white/5 hover:text-gold-300";

/**
 * One row of the mobile menu. Items with children render a GSAP-animated
 * disclosure; a native `<details>` cannot be animated because the browser
 * toggles it in a single frame.
 */
export function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useCollapse<HTMLDivElement>(expanded, root);

  if (!item.children?.length) {
    return <NavLink item={item} className={LEAF} onClick={onNavigate} />;
  }

  return (
    <div ref={root}>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className={cn(LEAF, "flex w-full items-center justify-between")}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </button>

      {/* Padding lives on the <ul>: on this wrapper it would survive height 0. */}
      <div ref={panel} className="invisible h-0 overflow-hidden">
        <ul className="mt-1 space-y-1 border-l border-white/10 pt-1 pl-3">
          {item.children.map((child) => (
            <li key={child.label}>
              <NavLink item={child} className={LEAF} onClick={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
