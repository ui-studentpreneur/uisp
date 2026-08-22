"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type RefObject } from "react";

import { DURATION, STAGGER, motionScale } from "./motion";

gsap.registerPlugin(useGSAP);

/**
 * Animates a disclosure panel between collapsed and expanded.
 *
 * Shared by the mobile menu and its submenus so both use one implementation.
 * The panel must be a `overflow-hidden` wrapper whose only child is a `<ul>` —
 * all padding belongs on that `<ul>`, because padding on the wrapper would keep
 * the panel visible at `height: 0`.
 *
 * `autoAlpha` is used rather than `opacity` so the collapsed panel gets
 * `visibility: hidden`, which takes its links out of the tab order.
 */
export function useCollapse<T extends HTMLElement>(
  open: boolean,
  scope: RefObject<HTMLElement | null>
): RefObject<T | null> {
  const panel = useRef<T>(null);
  const isFirstRun = useRef(true);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;

      // Mount: land on the correct state with no animation.
      if (isFirstRun.current) {
        isFirstRun.current = false;
        gsap.set(el, open ? { height: "auto", autoAlpha: 1 } : { height: 0, autoAlpha: 0 });
        return;
      }

      const scale = motionScale();
      // Direct children only, so a nested submenu is not staggered twice.
      const rows = Array.from(el.querySelectorAll<HTMLElement>(":scope > ul > li"));

      if (!open) {
        // Kill the row stagger too, or a mid-flight open leaves rows stranded
        // at opacity 0 with no tween left to finish them.
        gsap.killTweensOf(rows);
        gsap.to(el, {
          height: 0,
          autoAlpha: 0,
          duration: DURATION.close * scale,
          ease: "power3.inOut",
          overwrite: true,
        });
        return;
      }

      gsap
        .timeline()
        .to(el, {
          height: "auto",
          autoAlpha: 1,
          duration: DURATION.open * scale,
          ease: "power3.out",
          overwrite: true,
        })
        .fromTo(
          rows,
          { y: -10, autoAlpha: 0 },
          {
            // `fromTo`, not `from`: an interrupted open can leave a row at
            // opacity 0, and `from` would then animate 0 → 0 and never show it.
            y: 0,
            autoAlpha: 1,
            duration: DURATION.open * 0.6 * scale,
            stagger: STAGGER * scale,
            ease: "power2.out",
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          },
          scale ? "<0.08" : 0
        );
    },
    { dependencies: [open], scope }
  );

  return panel;
}
