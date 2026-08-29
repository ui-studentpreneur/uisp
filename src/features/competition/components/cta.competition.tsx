import { Button, Container, Reveal } from "@/components/ui";

const CtaCompetition = ({
  heading,
  ctaText,
  ctaLink,
}: {
  heading: string;
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <section className="relative isolate">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2  z-0 size-100 rounded-full bg-blue-100 blur-[200px]" />

      <Container className="relative z-10 pb-40 text-center max-md:pb-20">
        <Reveal
          motion="rally"
          className="flex flex-col items-center gap-8 max-md:gap-6"
        >
          <p className="text-gradient-gold max-w-3xl text-3xl mb-4 font-bold max-md:text-lg">
            {heading}
          </p>

          <a href={ctaLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg">{ctaText}</Button>
          </a>
        </Reveal>
      </Container>
    </section>
  );
};

export default CtaCompetition;
