import type { NavItem } from "@/config";

import { NavLink } from "../nav-link";

import { NavDropdown } from "./nav-dropdown";

export function DesktopNav({ items }: { items: readonly NavItem[] }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {items.map((item) =>
        item.children?.length ? (
          <NavDropdown key={item.label} item={item} />
        ) : (
          <li key={item.label}>
            <NavLink
              item={item}
              className="block rounded-full px-4 py-2 text-sm font-medium text-gold-100 hover:text-gold-300"
            />
          </li>
        )
      )}
    </ul>
  );
}
