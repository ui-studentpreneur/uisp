import { RegisterWidget } from "@/components/layout";

import { HeroSection } from "../home/components/hero-section";

import AboutCompetition from "./components/about.competition";
import CtaCompetition from "./components/cta.competition";
import TimelineCompetition from "./components/timeline.competition";
import { getCompetitionContent } from "./server/queries";

const ComptetitionPage = async () => {
  const { hero, about, timeline, cta } = await getCompetitionContent();

  return (
    <div className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <HeroSection
        heading={hero.heading}
        image={hero.image}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
      />

      {/* Sits right after the hero: its sentinel marks where the widget appears. */}
      <RegisterWidget href={hero.ctaLink} label={hero.ctaText} />

      <AboutCompetition heading={about.heading} body={about.body} />
      <TimelineCompetition {...timeline} />
      <CtaCompetition
        heading={cta.heading}
        ctaText={cta.ctaText}
        ctaLink={cta.ctaLink}
      />
    </div>
  );
};

export default ComptetitionPage;
