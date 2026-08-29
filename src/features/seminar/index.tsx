import { RegisterWidget } from "@/components/layout";

import { HeroSection } from "../home/components/hero-section";

import AboutSeminar from "./components/about.seminar";
import CtaSeminar from "./components/cta.seminar";
import SpeakerSeminar from "./components/speaker.seminar";
import { getSeminarContent } from "./server/queries";

const SeminarPage = async () => {
  const { hero, widget, details, speakers, cta } = await getSeminarContent();

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

      <AboutSeminar details={details} />
      <SpeakerSeminar {...speakers} />
      <CtaSeminar
        benefitHeading={cta.benefitHeading}
        benefitBody={cta.benefitBody}
        heading={cta.heading}
        ctaText={cta.ctaText}
        ctaLink={cta.ctaLink}
      />
    </section>
  );
};
export default SeminarPage;
