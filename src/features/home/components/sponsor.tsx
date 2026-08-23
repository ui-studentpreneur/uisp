const sponsorSection = () => {
  return (
    <section id="speaker" className="relative isolate flex items-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-20 py-24 text-center max-md:gap-10">
        <h2 className="text-gradient-gold px-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Our Previous Speakers and Assessors
        </h2>

        {/*
          No `Container` around the carousel: the peeking cards need the full
          viewport width to work out their own gutters.
        */}
        <div className="flex w-full flex-col"></div>
      </div>
    </section>
  );
};
export default sponsorSection;
