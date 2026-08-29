import { Container, Reveal } from "@/components/ui";

const AboutCompetition = ({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) => {
  return (
    <section className="w-full relative">
      <div className="size-100 z-0 rounded-full absolute blur-[200px]  right-0 bg-gold-500 translate-x-1/2"></div>
      <Container className="flex flex-col gap-6 py-20">
        <Reveal motion="stamp">
          <h1 className="font-bold text-2xl text-gradient-gold">{heading}</h1>
        </Reveal>
        <Reveal motion="brief" className="flex flex-col gap-6">
          {body.split(/\n{2,}/).map((paragraph, index) => (
            <p
              key={index}
              className="text-gradient-gold font-bold text-xl whitespace-pre-line"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};

export default AboutCompetition;
