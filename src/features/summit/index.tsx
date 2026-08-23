import { RegisterWidget } from "@/components/layout";
import { registrationUrls } from "@/config";

import { HeroSection } from "../home/components/hero-section";

import AboutSummit from "./components/about.summit";
import CtaSummit from "./components/cta.summit";
import SpeakerSummit from "./components/speaker.summit";

const SummitPage = () => {
  return (
    <section className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <HeroSection
        heading="Young Entrepreneur Summit"
        // TODO: placeholder artwork — there is no summit image in `public/` yet.
        image="/yes-bg.png"
        description="The Young Entrepreneur Summit (YES) is an event that brings young entrepreneurs gain valuable insights, mentorships, and networking opportunities from industry experts,  startups and business experts from all over Indonesia. The goal itself is to help develop startups through sharing sessions."
        ctaText="Register Now!"
        ctaLink={registrationUrls.youthEntrepreneurSummit}
      />

      {/* Sits right after the hero: its sentinel marks where the widget appears. */}
      <RegisterWidget href={registrationUrls.youthEntrepreneurSummit} />

      <AboutSummit />
      <SpeakerSummit />
      <CtaSummit />
    </section>
  );
};
export default SummitPage;
