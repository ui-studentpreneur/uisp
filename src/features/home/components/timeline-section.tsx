import Image from "next/image";

import {
  TimelineCard,
  TimelineTrack,
  type TimelineItem,
} from "@/components/timeline";
import { Container, Reveal } from "@/components/ui";

// TODO: real dates and titles. When this needs to come from a CMS or the DB,
// move it to `home/server/queries.ts` alongside `getHighlights()`.
const TIMELINE: readonly TimelineItem[] = [
  { date: "31 Oktober 2026", title: "Grand Opening Webinar" },
  { date: "14 November 2026", title: "Championpreneur Talks" },
  { date: "28 & 30 January 2027", title: "Young Entrepreneur Summit" },
  { date: "17 February 2027", title: "National Seminar" },
  { date: "19 & 20 February 2027", title: "Training and Mentoring" },
  { date: "27 February 2027", title: "Pitching Day and Awarding Night" },
];

/**
 * Full-bleed timeline section.
 *
 * The artwork is gold linework on transparency, so whatever sits behind this
 * section has to be dark for it to read.
 *
 * Lives under `home/` because only the copy, data and artwork are the home
 * page's. The card and connector are shared with `competition/`, so they sit in
 * `@/components/timeline`.
 */
export function TimelineSection() {
  return (
    <section id="timeline" className="relative isolate flex items-center">
      <div className="flex w-full flex-col items-center gap-6 py-24  text-center max-md:gap-4">
        {/* Heading only: `TimelineTrack` already scrubs the cards and the
            connector in, and a second entrance would fight it. */}
        <Reveal motion="stamp">
          <h2 className="text-gradient-gold text-3xl font-bold tracking-tight sm:text-4xl">
            Our Timeline
          </h2>
        </Reveal>

        <div className="relative w-full py-40 max-md:py-10">
          {/* Sized to the width so the artwork keeps its 1439x1184 aspect. */}
          <Image
            src="/timeline-bg.svg"
            alt=""
            aria-hidden
            width={1439}
            height={1184}
            sizes="100vw"
            className="pointer-events-none absolute max-md:top-1/2 top-0 z-0 h-auto w-full"
          />

          <Container className="relative z-10">
            <TimelineTrack>
              {TIMELINE.map((item) => (
                <TimelineCard key={item.date} item={item} />
              ))}
            </TimelineTrack>
          </Container>
        </div>
      </div>
    </section>
  );
}
