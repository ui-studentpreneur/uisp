import { Button, Container, Reveal } from "@/components/ui";

const OurTheme = ({
  heading,
  quote,
  body,
  valuesHeading,
  values,
}: {
  heading: string;
  quote: string;
  body: string;
  valuesHeading: string;
  values: readonly string[];
}) => {
  return (
    <section id="theme" className="relative isolate flex items-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        <Reveal motion="stamp">
          <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
        </Reveal>

        {/* The wrapper takes the ellipse's box so the unfurl has something
            definite to clip: `w-[150%]` measured against a shrink-to-fit
            wrapper would collapse. */}
        <Reveal motion="unfurl" className="w-[150%] h-120 max-md:h-64">
          <div className="w-full h-full bg-gradient-gold rounded-[50%] p-1">
            <div className="w-full relative h-full flex justify-center items-center bg-gradient-donker rounded-[50%] overflow-hidden">
              {/*
                `--marquee-tile` is the tile's WIDTH and the height follows the
                source's own ratio, so it has to be read against this box's
                height or `repeat-x` leaves bare strips above and below.

                /22163.jpg is 1600x488 — a wide strip, not a square — so the
                tile stands 0.305x as tall as it is wide. Each breakpoint keeps
                the tile ~1.1x the ellipse's height, which is the crop:

                  desktop  110rem = 1760px -> 537px tall vs h-120 (480px)
                  mobile    56rem =  896px -> 273px tall vs h-64  (256px)

                Shrinking the mobile tile to fit the smaller ellipse is the
                trap: 20rem stood only 98px tall and the photo showed as a band
                through the middle.
              */}
              <div
                aria-hidden
                className="animate-marquee-bg opacity-10 motion-reduce:animate-none absolute inset-y-0 left-0 w-[calc(100%+var(--marquee-tile))] [--marquee-duration:60s] [--marquee-tile:110rem] max-md:[--marquee-tile:56rem]"
                style={{ backgroundImage: "url(/22163.jpg)" }}
              />
              {/* The ellipse narrows toward its ends, so the quote is held to a
                  measure that clears the curve — and the mobile ellipse is tall
                  enough (h-64) for the four lines that measure wraps to. */}
              <p className="z-10  text-gradient-gold font-bold text-5xl max-md:text-base max-w-7xl max-md:max-w-[62%] max-md:w-full max-md:px-4 mx-auto">
                &quot;{quote}&quot;
              </p>
            </div>
          </div>
        </Reveal>

        <Container className="flex flex-col gap-12 ">
          <Reveal motion="brief">
            <p className="text-gradient-gold text-base">{body}</p>
          </Reveal>{" "}
          <Reveal motion="stamp">
            <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {valuesHeading}
            </h2>
          </Reveal>
          {/* Three peers in a row, same as the home page milestones. */}
          <Reveal motion="deal" className="flex gap-4 justify-center flex-wrap">
            {values.map((value) => (
              <Button key={value} size={"lg"} className="w-fit cursor-none">
                {value}
              </Button>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
};
export default OurTheme;
