import { Button, Container } from "@/components/ui";

/** Placeholder — same one the hero CTA uses. Swap for the real form URL. */
const REGISTRATION_URL = "/";

const CtaCompetition = () => {
  return (
    <section className="relative isolate">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2  z-0 size-100 rounded-full bg-blue-100 blur-[200px]" />

      <Container className="relative z-10 flex flex-col items-center gap-8 pb-40 text-center max-md:gap-6 max-md:pb-20">
        <p className="text-gradient-gold max-w-3xl text-3xl mb-4 font-bold max-md:text-lg">
          Ready to Take the Challenge?
        </p>

        <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Register Now!</Button>
        </a>
      </Container>
    </section>
  );
};

export default CtaCompetition;
