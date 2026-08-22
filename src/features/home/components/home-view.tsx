import { HeroSection } from "./hero-section";
import { TimelineSection } from "./timeline-section";
import MilestoneSection from "./milestone";

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
      <HeroSection />
      <TimelineSection />
      <MilestoneSection />
    </main>
  );
}
