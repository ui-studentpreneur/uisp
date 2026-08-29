"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

import { motionScale } from "@/lib/utils";

import { MOTIONS, type RevealMotion } from "./reveal-motions";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** How far up the viewport the content has to reach before it enters. */
const START = "top 85%";

/**
 * Plays a one-shot entrance when its content scrolls into view.
 *
 * Renders a plain `div`, so pass `className` when the wrapper has to take over
 * the layout of the element it now sits inside — a flex row, for instance.
 * By default it animates its own direct children, one target each; `select`
 * reaches deeper for content it does not own, such as a shared section that
 * marks its parts with a `data-` hook.
 *
 * The hidden starting state is applied here rather than in the markup, so the
 * page is readable if this never runs. Every section using it sits below the
 * fold, and hydration lands well before it is scrolled to.
 *
 * Under reduced motion nothing is set at all: the content is simply already in
 * its finished state, which is the point — the entrance must never be what
 * makes it visible.
 */
export function Reveal({
  motion,
  select,
  className,
  children,
}: {
  motion: RevealMotion;
  /** CSS selector for descendants to animate instead of the direct children. */
  select?: string;
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionScale()) return;

      const targets: Element[] = select
        ? gsap.utils.toArray(select, el)
        : Array.from(el.children);
      if (!targets.length) return;

      const { from, to, perTarget } = MOTIONS[motion];
      const trigger = (t: Element) => ({
        scrollTrigger: { trigger: t, start: START, once: true },
      });

      if (perTarget) {
        targets.forEach((t) => gsap.fromTo(t, from, { ...to, ...trigger(t) }));
        return;
      }

      // One trigger for the whole set: the stagger is the choreography, and
      // per-element triggers would fire side-by-side items simultaneously.
      gsap.fromTo(targets, from, { ...to, ...trigger(el) });
    },
    { dependencies: [motion, select], scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
