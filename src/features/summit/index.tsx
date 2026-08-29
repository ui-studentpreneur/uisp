import { RegisterWidget } from "@/components/layout";

import { HeroSection } from "../home/components/hero-section";

import AboutSummit from "./components/about.summit";
import CtaSummit from "./components/cta.summit";
import SpeakerSummit from "./components/speaker.summit";
import { getSummitContent } from "./server/queries";

const SummitPage = async () => {
  const { hero, widget, details, speakers, cta } = await getSummitContent();

  return (
    <section className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <HeroSection
        heading={hero.heading}
        image={hero.image}
        description={hero.description}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
      />

      {/* Sits right after the hero: its sentinel marks where the widget appears. */}
      <RegisterWidget
        href={hero.ctaLink}
        label={widget.ctaText}
        headline={widget.headline}
      />

      <AboutSummit details={details} />
      <SpeakerSummit {...speakers} />
      <CtaSummit
        heading={cta.heading}
        ctaText={cta.ctaText}
        ctaLink={cta.ctaLink}
      />
    </section>
  );
};
export default SummitPage;
