import { Container } from "@/components/ui";
import { mainNav } from "@/config";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavbarBrand } from "./navbar-brand";

/**
 * Fixed site navigation. Server-rendered apart from `MobileNav`, which owns the
 * hamburger state; the desktop dropdowns are pure CSS.
 *
 * Height comes from `--navbar-height`, shared with the layout offset and
 * the hero's viewport calc.
 */
const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--navbar-height)] bg-gradient-donker">
      {/*
        Decorative artwork. `background-size: auto 100%` scales it to the full
        navbar height at every breakpoint — `bg-contain` fitted it to the *width*
        instead, so on narrow screens it never reached full height.

        On mobile the layer starts at the horizontal midpoint, putting the
        artwork's left edge in the middle of the bar. From `sm` up the layer
        spans the bar and the artwork is anchored to the right edge.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 left-1/2 [background-size:auto_100%] bg-[url(/nav-bg.svg)] bg-left bg-no-repeat sm:left-0 sm:bg-right"
      />

      <Container
        as="nav"
        className="relative flex h-full items-center justify-between gap-6"
      >
        <NavbarBrand />
        <DesktopNav items={mainNav} />
        <MobileNav items={mainNav} />
      </Container>
    </header>
  );
};

export default Navbar;
