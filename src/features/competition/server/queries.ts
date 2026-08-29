import "server-only";

import { readBlock, readItems } from "@/lib/content/queries";

export async function getCompetitionContent() {
  const [hero, about, timelineHeading, timeline, cta] = await Promise.all([
    readBlock("competition.hero"),
    readBlock("competition.about"),
    readBlock("competition.timeline"),
    readItems("competition.timeline"),
    readBlock("competition.cta"),
  ]);

  return {
    hero,
    about,
    cta,
    timeline: {
      heading: timelineHeading.heading,
      items: timeline.map((item) => ({ date: item.date, title: item.title })),
    },
  };
}
