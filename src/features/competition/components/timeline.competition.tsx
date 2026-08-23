import Image from "next/image";

import {
  TimelineCard,
  TimelineTrack,
  type TimelineItem,
} from "@/components/timeline";
import { Container } from "@/components/ui";

const TIMELINE: readonly TimelineItem[] = [
  { date: "19 September 2026", title: "Open Registration BMCC" },
  { date: "31 October 2026", title: "Close Registration & Submission BMCC" },
  { date: "2 November 2026", title: "Semifinal Round BMCC" },
  {
    date: "27 November 2026",
    title: "Close Semifinal Round Submission BMCC",
  },
  { date: "9 January 2027", title: "Technical Meeting Final Round" },
  { date: "19 - 20 February 2027", title: "Training & Mentoring" },
  { date: "27 February 2027", title: "Pitching Day & Awarding Night" },
];

/**
 * BMCC timeline. Same card and connector as the home page — only the copy,
 * the dates and the artwork differ, so the shared pieces come from
 * `@/components/timeline`.
 */
const TimelineCompetition = () => {
  return (
    <section id="timeline" className="relative isolate flex items-center">
      {/* Artwork sits beside the track, bleeding off the right edge. Hidden on
          small screens, where the cards stack into a single column and there
          is no room next to them. */}
      <Image
        src="/compe-timeline-bg.svg"
        alt=""
        aria-hidden
        width={976}
        height={1199}
        className="pointer-events-none absolute top-1/2 right-0 z-0 h-[70%] w-auto max-w-none -translate-y-1/2 max-md:hidden"
      />

      <div className="flex w-full flex-col items-center gap-6 py-24 text-center max-md:gap-4">
        <h2 className="text-gradient-gold text-3xl font-bold tracking-tight sm:text-4xl">
          Competition Timeline
        </h2>

        <div className="relative w-full py-40 max-md:py-10">
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
};

export default TimelineCompetition;
