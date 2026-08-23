import { HeroSection } from "../home/components/hero-section";
import AboutCompetition from "./components/about.competition";
import CtaCompetition from "./components/cta.competition";
import TimelineCompetition from "./components/timeline.competition";
const ComptetitionPage = () => {
  return (
    <div className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <HeroSection
        heading="Business Model Canvas Competition"
        image="/image-compe.png"
        description="The Business Model Canvas Competition is an event to foster entrepreneurial spirit, encourage innovative business ideas, and provide a platform for young people to present creative and viable business models."
        ctaText="Register Now!"
        ctaLink="/"
      />
      <AboutCompetition />
      <TimelineCompetition />
      <CtaCompetition />
    </div>
  );
};

export default ComptetitionPage;
