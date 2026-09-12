import "server-only";

import { registerNav } from "@/config";
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
  // The hero's register menu opens each event's own registration link, so the
  // three event heroes are read for their `ctaLink` and nothing else. Reading
  // them here rather than in each event feature keeps the home page to one
  // round trip; they are content keys, not another feature's internals.
  const registerLinks = Promise.all(
    registerNav.map(async (option) => ({
      label: option.label,
      icon: option.icon,
      href: (await readBlock(option.block)).ctaLink ?? "",
    })),
  );

  const [
    hero,
    timelineHeading,
    timeline,
    milestoneHeading,
    milestones,
    speakerHeading,
    speakers,
    sponsors,
    registerOptions,
  ] = await Promise.all([
    readBlock("home.hero"),
    readBlock("home.timeline"),
    readItems("home.timeline"),
    readBlock("home.milestones"),
    readItems("home.milestones"),
    readBlock("home.speakers"),
    readItems("home.speakers"),
    readItems("home.sponsors"),
    registerLinks,
  ]);

  return {
    hero,
    registerOptions,
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
      items: group.items.map((item) => ({
        id: item.id,
        image: item.image,
        tier: item.tier,
      })),
    })),
  };
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;
