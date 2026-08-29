"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Fixed "register" shortcut in the bottom-right corner, revealed once the hero
 * has scrolled away.
 *
 * The reveal is driven by a zero-height sentinel this component renders in the
 * normal flow: mount it directly after the hero and the sentinel sits exactly
 * on the hero's bottom edge, so nothing here has to know the hero's height. The
 * widget itself is `fixed`, so where the sentinel lands does not move it.
 *
 * `visibility` is transitioned alongside `opacity` — that is what keeps the
 * hidden button out of the tab order without cutting the fade short, because
 * visibility flips immediately on the way in and only at the end on the way
 * out.
 */
export function RegisterWidget({
  href,
  label = "Register Now!",
  headline = "Ready to Grow Beyond Limits?",
}: {
  href: string;
  label?: string;
  headline?: string;
}) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Only count the sentinel leaving through the *top*. Off-screen with a
      // positive `top` means it is still below the fold — the reader has not
      // reached the hero's end yet, which is the case on first paint.
      setScrolledPast(
        !entry.isIntersecting && entry.boundingClientRect.top < 0,
      );
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px w-full" />

      <div
        className={cn(
          "fixed right-6 bottom-6 z-40 max-md:right-4 max-md:bottom-4",
          "transition-[opacity,transform,visibility] duration-300 ease-out",
          "motion-reduce:transition-none",
          scrolledPast
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-4 opacity-0",
        )}
      >
        <div
          className="rounded-t-3xl rounded-l-3xl border-2 border-gold-300 p-4 max-md:p-3 flex flex-col items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(105deg, #F5B899 4.43%, #7E6861 51.59%, #162230 101.18%)",
          }}
        >
          <p className="text-white w-[80%] font-bold text-xl max-md:text-lg text-center">
            {headline}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={scrolledPast ? undefined : -1}
          >
            <Button size="lg" className="shadow-xl shadow-black/40">
              {label}
              <ArrowUpRight aria-hidden />
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
