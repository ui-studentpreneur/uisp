"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useRef } from "react";

import { DURATION, motionScale } from "./motion";

gsap.registerPlugin(useGSAP);

/** Cross-fades and counter-rotates the two icons as the menu toggles. */
export function HamburgerIcon({ open }: { open: boolean }) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const duration = DURATION.icon * motionScale();
      const shared = { duration, ease: "power2.out", overwrite: true } as const;

      gsap.to("[data-icon=menu]", {
        ...shared,
        autoAlpha: open ? 0 : 1,
        rotate: open ? 90 : 0,
      });
      gsap.to("[data-icon=close]", {
        ...shared,
        autoAlpha: open ? 1 : 0,
        rotate: open ? 0 : -90,
      });
    },
    { dependencies: [open], scope: root }
  );

  return (
    <span ref={root} aria-hidden className="relative block size-5">
      <Menu data-icon="menu" className="absolute inset-0 size-5" />
      <X data-icon="close" className="invisible absolute inset-0 size-5 opacity-0" />
    </span>
  );
}
