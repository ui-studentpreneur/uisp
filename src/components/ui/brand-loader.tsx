"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { motionScale } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** One pass through the mark, in seconds. */
const IN = 0.55;
const OUT = 0.45;
const STAGGER = 0.12;
/** Rest at full strength before the mark fades back out. */
const HOLD = 0.25;

/**
 * One paint server per shape, carrying the same three stops as
 * `--gradient-gold`: an SVG `fill` needs a real gradient element, and a CSS
 * custom property cannot fill a path. Only the axis differs per shape.
 *
 * The ids are renamed from the source file's Figma output so this inlined copy
 * cannot collide with another SVG on the same page.
 */
const GRADIENTS = [
  { id: "loader-gradient-a", x1: 23.0307, y1: 0, x2: 15.7048, y2: 39.5102 },
  {
    id: "loader-gradient-b",
    x1: 22.8483,
    y1: 35.9902,
    x2: 13.5127,
    y2: 99.2018,
  },
  { id: "loader-gradient-c", x1: 32.7267, y1: 74.333, x2: 30.1674, y2: 98.6883 },
  { id: "loader-gradient-d", x1: 22.7218, y1: 16.6973, x2: 17.0436, y2: 59.6515 },
] as const;

/**
 * The brand mark, breathing, as the page-level loading indicator.
 *
 * The SVG is inlined rather than loaded from `public/logo-only.svg` through
 * `next/image`: GSAP animates the four shapes individually, and nothing can
 * reach inside an `<img>`. It is a copy of that file — if the logo is
 * redrawn, this is the second place to update.
 *
 * The shapes ripple in sequence, which is what makes it read as progress
 * rather than as decoration that happens to move.
 */
export function BrandLoader({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      // Reduced motion leaves the mark exactly as rendered. There is no end
      // state to jump to here — the animation *is* the content — and a
      // repeating timeline of zero-length tweens would spin the main thread.
      if (!el || !motionScale()) return;

      const shapes = gsap.utils.toArray<SVGElement>("[data-shape]", el);
      gsap.set(shapes, { transformOrigin: "50% 50%" });

      gsap
        .timeline({ repeat: -1, defaults: { ease: "power2.inOut" } })
        .fromTo(
          shapes,
          { opacity: 0.2, scale: 0.9 },
          { opacity: 1, scale: 1, duration: IN, stagger: STAGGER },
        )
        .to(
          shapes,
          { opacity: 0.2, scale: 0.9, duration: OUT, stagger: STAGGER },
          `+=${HOLD}`,
        );
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 46 98"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-shape
        d="M21.0233 22.5877C25.8633 17.186 29.2023 12.9618 31.6655 0C32.6602 2.44702 33.1257 3.77443 33.8397 6.0858C35.9514 16.1901 33.382 21.1833 25.3717 27.8543C19.879 31.8334 16.2622 33.7386 11.6398 39.2066C10.6099 35.4615 16.1832 27.9894 21.0233 22.5877Z"
        fill="url(#loader-gradient-a)"
      />
      <path
        data-shape
        d="M21.2735 53.6774C37.7704 47.3602 42.2248 43.2878 42.8499 35.9902C44.4284 39.2737 45.0491 41.5306 45.4896 45.5952C46.9462 58.9815 40.7841 62.1969 24.7166 66.0936C7.42836 70.2864 6.05831 91.8142 24.8313 97.954C12.429 96.718 6.79221 94.6943 1.76292 86.0064C-1.11187 78.7728 -0.555597 73.5694 4.05828 66.0936C8.46679 60.5013 12.475 57.9834 21.2735 53.6774Z"
        fill="url(#loader-gradient-b)"
      />
      <ellipse
        data-shape
        cx="32.7267"
        cy="86.1445"
        rx="12.2423"
        ry="11.8115"
        fill="url(#loader-gradient-c)"
      />
      <path
        data-shape
        d="M20.4826 37.7782C11.7489 42.4136 6.48205 50.4267 5.44922 58.6248C11.8757 51.5979 18.0994 48.2937 30.1223 43.634C40.9096 39.3007 42.2867 28.4089 37.0078 16.6973C36.385 25.0982 32.0732 31.1026 20.4826 37.7782Z"
        fill="url(#loader-gradient-d)"
      />

      <defs>
        {GRADIENTS.map(({ id, ...coords }) => (
          <linearGradient
            key={id}
            id={id}
            {...coords}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.235577" stopColor="#F5B899" />
            <stop offset="0.451923" stopColor="#F6D6BF" />
            <stop offset="0.89403" stopColor="#B17763" />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
