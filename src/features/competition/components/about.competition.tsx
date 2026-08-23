import { Container } from "@/components/ui";

const AboutCompetition = () => {
  return (
    <section className="w-full relative">
      <div className="size-100 z-0 rounded-full absolute blur-[200px]  right-0 bg-gold-500 translate-x-1/2"></div>
      <Container className="flex flex-col gap-6 py-20">
        <h1 className="font-bold text-2xl text-gradient-gold">Description</h1>
        <p className="text-gradient-gold font-bold text-xl">
          Business Model Canvas Competition (BMCC), organized by The 16th UI
          Studentpreneurs, is designed to encourage students to explore
          entrepreneurship by developing innovative ideas and presenting
          impactful business models.
          <br />
          <br />
          Compete for a total prize pool of IDR 20.000.000+ and gain valuable
          opportunities to showcase your business ideas.
          <br />
          <br />
          Participants will gain intensive training, exclusive mentoring
          sessions, networking opportunities, and valuable business pitching
          experience
        </p>
      </Container>
    </section>
  );
};

export default AboutCompetition;
