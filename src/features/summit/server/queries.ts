import "server-only";

import {
  readBlock,
  readItems,
  toEventDetail,
  toSpeakerGroups,
} from "@/lib/content/queries";

export async function getSummitContent() {
  const [hero, widget, details, speakerHeading, speakers, cta] =
    await Promise.all([
      readBlock("summit.hero"),
      readBlock("summit.widget"),
      readItems("summit.details"),
      readBlock("summit.speakers"),
      readItems("summit.speakers"),
      readBlock("summit.cta"),
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
