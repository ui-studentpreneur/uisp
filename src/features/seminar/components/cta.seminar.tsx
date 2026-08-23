import { Button, Container } from "@/components/ui";

/** Placeholder — same one the hero CTA uses. Swap for the real form URL. */
const REGISTRATION_URL = "/";

const CtaSeminar = () => {
  return (
    <section className="relative flex-col gap-10 isolate">
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 z-0 size-100 -translate-x-1/2 rounded-full bg-blue-100 blur-[300px]" />
      <Container className="flex flex-col gap-4">
        <p className="text-gradient-gold max-w-3xl text-2xl font-bold max-md:text-lg">
          Benefit
        </p>
        <p className="text-gradient-gold text-xl font-bold max-md:text-lg">
          Participants will gain valuable insights from experienced
          professionals, expand their network, and deepen their understanding of
          entrepreneurship through inspiring discussions and knowledge-sharing
          sessions
        </p>
      </Container>

      <Container className="relative z-10 flex flex-col items-center gap-8 py-24 text-center max-md:gap-6 max-md:py-16">
        <p className="text-gradient-gold max-w-3xl text-2xl font-bold max-md:text-lg">
          Ready to Discover New Insights?
        </p>

        <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Register Now!</Button>
        </a>
      </Container>
    </section>
  );
};

export default CtaSeminar;
