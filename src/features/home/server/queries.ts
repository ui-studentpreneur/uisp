import "server-only";

import {
  groupItems,
  readBlock,
  readItems,
  toSpeakerGroups,
} from "@/lib/content/queries";

/**
 * Read path for the home feature.
 *
 * One function fetching everything in parallel rather than a read per section:
 * the sections are siblings in one render, so sequential awaits would stack
 * their latencies for no reason.
 */
export async function getHomeContent() {
  const [
    hero,
    timelineHeading,
    timeline,
    milestoneHeading,
    milestones,
    speakerHeading,
    speakers,
    sponsors,
  ] = await Promise.all([
    readBlock("home.hero"),
    readBlock("home.timeline"),
    readItems("home.timeline"),
    readBlock("home.milestones"),
    readItems("home.milestones"),
    readBlock("home.speakers"),
    readItems("home.speakers"),
    readItems("home.sponsors"),
  ]);

  return {
    hero,
    timeline: {
      heading: timelineHeading.heading,
      items: timeline.map((item) => ({ date: item.date, title: item.title })),
    },
    milestones: {
      heading: milestoneHeading.heading,
      items: milestones.map((item) => ({
        image: item.image,
        title: item.title,
      })),
    },
    speakers: {
      heading: speakerHeading.heading,
      groups: toSpeakerGroups(speakers),
    },
    sponsors: groupItems(sponsors).map((group) => ({
      title: group.title,
      items: group.items.map((item) => ({ id: item.id, image: item.image })),
    })),
  };
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;
