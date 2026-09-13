import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";
import { isExternalHref } from "@/lib/utils";

/** One row of the menu: an event, and the link it opens. */
export type RegisterMenuOption = {
  label: string;
  /** That event's own page by default; any URL the admin has set otherwise. */
  href: string;
  icon: string;
};

/** Shared by both link elements, so the two render identically. */
const ROW =
  "flex items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium text-blue-100 transition-colors hover:bg-white/5 hover:text-white max-md:text-sm";

/**
 * The hero's register button, opening a menu of the three events on hover.
 *
 * Each row goes to that event's own page by default, so a reader who has not
 * chosen yet lands somewhere that explains the event. An editor can repoint any
 * row at an external registration form in the admin (`home.register`), which is
 * why the links are passed in: `features/home/server/queries.ts` reads them and
 * this component stays presentational.
 *
 * The two destinations need different markup, so each row picks per `href`. An
 * internal path goes through `next/link` and opens in place — prefetched, no
 * full reload. Anything with a scheme is someone else's site and opens in a new
 * tab with `rel="noopener noreferrer"`, the same way the event pages open their
 * own `ctaLink`.
 *
 * Same no-JavaScript mechanism as `Navbar/nav-dropdown.tsx`: `group-hover`
 * opens it for the pointer and `group-focus-within` for the keyboard, and the
 * panel is `invisible` rather than `hidden` so its links stay out of the tab
 * order until the trigger is focused. Focus is also what opens it on a phone,
 * where there is no hover to speak of — tapping the trigger focuses it.
 *
 * The trigger is a button with no `href`: it has no page of its own. The hero's
 * own "Button link" field goes unused wherever this is mounted.
 *
 * `pt-3` on the wrapper, not margin on the panel: the padding is inside the
 * hover target, so the pointer can cross the gap from trigger to panel without
 * passing through dead space that would close it.
 */
export function RegisterMenu({
  label,
  options,
}: {
  label: string;
  options: readonly RegisterMenuOption[];
}) {
  return (
    <div className="group relative inline-block">
      <Button size="lg" aria-haspopup="menu">
        {label}
        <ChevronDown
          aria-hidden
          className="transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
        />
      </Button>

      <div className="invisible absolute top-full left-1/2 z-20 w-max max-w-[min(30rem,85vw)] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="relative rounded-3xl border-gradient-gold bg-gradient-donker p-2 text-left shadow-xl shadow-black/40">
          {options.map((option, index) => (
            <li
              key={option.label}
              className={index > 0 ? "border-t border-gold-500/20" : undefined}
            >
              <RegisterMenuLink href={option.href}>
                {/* Decorative: the label beside it already names the event. */}
                <Image
                  src={option.icon}
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 object-contain"
                />
                {option.label}
              </RegisterMenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** One row's link element, chosen by where the `href` points. */
function RegisterMenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={ROW}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={ROW}>
      {children}
    </Link>
  );
}
