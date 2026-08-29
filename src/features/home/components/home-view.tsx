import { getHomeContent } from "../server/queries";

import { HeroSection } from "./hero-section";
import MilestoneSection from "./milestone";
import SpeakerSection from "./speaker";
import SponsorSection from "./sponsor";
import { TimelineSection } from "./timeline-section";

/**
 * The feature's screen-level component. `app/(main)/page.tsx` renders this and
 * nothing else, which is what keeps route files trivial.
 *
 * Every section's copy comes from the database through one read here, so the
 * sections stay presentational and the page makes a single round trip.
 *
 * Sections own their own width: the hero is full-bleed, so anything that should
 * stay on the page measure wraps itself in `Container`.
 */
export async function HomeView() {
  const content = await getHomeContent();

  return (
    <main className="bg-gradient-donker">
      <HeroSection
        image={content.hero.image}
        heading={content.hero.heading}
        description={content.hero.description}
        ctaText={content.hero.ctaText}
        ctaLink={content.hero.ctaLink}
      />
      <TimelineSection {...content.timeline} />
      <MilestoneSection {...content.milestones} />
      <SpeakerSection {...content.speakers} />
      <SponsorSection groups={content.sponsors} />
    </main>
  );
}
