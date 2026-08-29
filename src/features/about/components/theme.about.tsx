import { Button, Container } from "@/components/ui";

const OurTheme = () => {
  return (
    <section id="theme" className="relative isolate flex items-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Introducing Our Grand Theme
        </h2>
        <div className="w-[150%] h-120 max-md:h-50  bg-gradient-gold rounded-[50%] p-1">
          <div className="w-full relative h-full flex justify-center items-center bg-gradient-donker rounded-[50%] overflow-hidden">
            {/* Tile is 1.5x the container height, so the square source is
                cropped top and bottom instead of shown whole — the zoom. */}
            <div
              aria-hidden
              className="animate-marquee-bg opacity-30 motion-reduce:animate-none absolute inset-y-0 left-0 w-[calc(100%+var(--marquee-tile))] [--marquee-duration:60s] [--marquee-tile:110rem] max-md:[--marquee-tile:20rem]"
              style={{ backgroundImage: "url(/theme-bg.png)" }}
            />
            <p className="z-10  text-gradient-gold font-bold text-5xl max-md:text-xl max-w-7xl max-md:max-w-[60%] max-md:w-full max-md:px-4 mx-auto">
              &quot;Innovate Beyond Uncertainty: Empowering Young Entrepreneurs
              to Shape Ideas into Impact.&quot;
            </p>
          </div>
        </div>

        <Container className="flex flex-col gap-12 ">
          <p className="text-gradient-gold text-base">
            Amidst economic uncertainty, The 16th UI Studentpreneurs is here to
            empower young entrepreneurs to ensure their ideas go beyond mere
            concepts. Through encouragement to innovate, take concrete
            operational action, and build resilience, participants are driven to
            transform their ideas into solutions that create a real impact for
            society.
          </p>{" "}
          <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Core Values
          </h2>
          <div className="flex gap-4 justify-center flex-wrap ">
            <Button size={"lg"} className="w-fit cursor-none">
              INNOVATION
            </Button>
            <Button size={"lg"} className="w-fit cursor-none">
              ACTION
            </Button>
            <Button size={"lg"} className="w-fit cursor-none">
              RESILIENCE
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};
export default OurTheme;
