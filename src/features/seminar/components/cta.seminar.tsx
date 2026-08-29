import { Button, Container, Reveal } from "@/components/ui";

const CtaSeminar = ({
  benefitHeading,
  benefitBody,
  heading,
  ctaText,
  ctaLink,
}: {
  benefitHeading: string;
  benefitBody: string;
  heading: string;
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <section className="relative flex-col gap-10 isolate">
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 z-0 size-100 -translate-x-1/2 rounded-full bg-blue-100 blur-[300px]" />
      <Container>
        <Reveal motion="brief" className="flex flex-col gap-4 max-md:gap-2">
          <p className="text-gradient-gold max-w-3xl text-2xl font-bold">
            {benefitHeading}
          </p>
          <p className="text-gradient-gold text-xl font-bold max-md:text-lg">
            {benefitBody}
          </p>
        </Reveal>
      </Container>

      <Container className="relative z-10 py-24 text-center max-md:py-16">
        <Reveal
          motion="rally"
          className="flex flex-col items-center gap-8 max-md:gap-6"
        >
          <p className="text-gradient-gold max-w-3xl text-2xl font-bold max-md:text-lg">
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

export default CtaSeminar;
