import Image from "next/image";

import { ParallaxItem } from "@/components/ui";

/**
 * Pixels each plane travels across the section. Negative runs ahead of the
 * page (nearer the viewer), positive lags behind it (further away), so the
 * glow, the mark and the copy separate into three depths as you scroll.
 */
const GLOW_DRIFT = 120;
const LOGO_DRIFT = -40;
const COPY_DRIFT = -75;

const AboutHero = ({
  heading,
  body,
  image,
}: {
  heading: string;
  body: string;
  image: string;
}) => {
  return (
    <section
      data-parallax
      className="relative flex max-md:flex-col gap-4 justify-center items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <ParallaxItem
        distance={GLOW_DRIFT}
        className="absolute left-0 z-0 -translate-x-1/2"
      >
        <div className="size-100 rounded-full blur-[200px] bg-gold-500" />
      </ParallaxItem>
      <ParallaxItem
        distance={LOGO_DRIFT}
        className="relative z-10 flex items-center"
      >
        <div className="relative mr-20 max-md:mr-6 flex justify-center">
          {" "}
          <Image
            src={image}
            alt=""
            aria-hidden
            width={0}
            height={0}
            className="object-contain shrink-0 w-50 max-md:w-20 h-auto"
          />
        </div>
      </ParallaxItem>
      <ParallaxItem
        distance={COPY_DRIFT}
        className="relative z-10 flex flex-col gap-6 max-md:gap-3 w-[70%] max-md:text-center max-md:w-full"
      >
        <h1 className="text-gradient-gold text-3xl max-md:text-xl font-bold">
          {heading}
        </h1>
        <p className="text-gradient-gold text-lg max-md:text-sm">{body}</p>
      </ParallaxItem>
    </section>
  );
};
export default AboutHero;
