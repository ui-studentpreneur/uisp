import { HeroSection } from "../home/components/hero-section";
import AboutSeminar from "./components/about.seminar";
import CtaSeminar from "./components/cta.seminar";
import SpeakerSeminar from "./components/speaker.seminar";

const SeminarPage = () => {
  return (
    <section className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <HeroSection
        heading="National Seminar"
        image="/seminar-bg.png"
        description="The National Seminar is the largest entrepreneurial seminar organized by The 16th UI Studentpreneurs designed to provide valuable insights and discussions on entrepreneurship, innovation, and current industry trends through inspiring sessions led by experienced professionals. This event provides an immersive platform to individuals to explore self-potential and entrepreneurial interest ."
        ctaText="Register Now!"
        ctaLink="/"
      />
      <AboutSeminar />
      <SpeakerSeminar />
      <CtaSeminar />
    </section>
  );
};
export default SeminarPage;
