import "server-only";

import {
  readBlock,
  readItems,
  toEventDetail,
  toSpeakerGroups,
} from "@/lib/content/queries";

export async function getSeminarContent() {
  const [hero, widget, details, speakerHeading, speakers, cta] =
    await Promise.all([
      readBlock("seminar.hero"),
      readBlock("seminar.widget"),
      readItems("seminar.details"),
      readBlock("seminar.speakers"),
      readItems("seminar.speakers"),
      readBlock("seminar.cta"),
    ]);

  return {
    hero,
    widget,
    details: details.map(toEventDetail),
    cta,
    speakers: {
      heading: speakerHeading.heading,
      groups: toSpeakerGroups(speakers),
    },
  };
}
