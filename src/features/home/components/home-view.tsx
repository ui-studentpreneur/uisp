import { HeroSection } from "./hero-section";
import { TimelineSection } from "./timeline-section";
import MilestoneSection from "./milestone";
import SpeakerSection from "./speaker";
import SponsorSection from "./sponsor";

/**
 * The feature's screen-level component. `app/(marketing)/page.tsx` renders
 * this and nothing else, which is what keeps route files trivial.
 *
 * Sections own their own width now: the hero is full-bleed, so anything that
 * should stay on the page measure wraps itself in `Container`.
 */
export async function HomeView() {
  return (
    <main className="bg-gradient-donker">
      <HeroSection
        image="/hero.png"
        heading="The Biggest and Most Awaited National Entrepreneurship Event"
        description="The 16th UI Studentpreneurs  is The Biggest and Most Awaited National Entrepreneurship event held under Badan Eksekutif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Indonesia”"
        ctaText="Register Now"
        ctaLink="/register"
      />
      <TimelineSection />
      <MilestoneSection />
      <SpeakerSection />
      <SponsorSection />
    </main>
  );
}
