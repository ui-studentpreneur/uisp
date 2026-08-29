import { Button, Container, Reveal } from "@/components/ui";

const CtaSummit = ({
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
      <div className="absolute left-0 z-0 size-100 -translate-x-1/2 rounded-full bg-gold-500 blur-[200px]" />

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

export default CtaSummit;
