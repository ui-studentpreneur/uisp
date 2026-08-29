import Image from "next/image";

import {
  Button,
  Container,
  ParallaxBackground,
  ParallaxItem,
} from "@/components/ui";

/** Pixels the copy runs ahead of the page — negative is toward the viewer. */
const COPY_DRIFT = -80;

/**
 * Full-bleed hero, one viewport tall.
 *
 * `100dvh` rather than `100vh` so mobile browsers do not add the collapsing
 * URL-bar height, and minus `--navbar-height` so the hero plus the fixed navbar
 * fill exactly one screen instead of overflowing it.
 *
 * The section spans the viewport; the inner `Container` holds the copy to the
 * same measure as the rest of the page and centres it vertically.
 *
 * `data-parallax` marks this as the scroll window both moving layers measure
 * from — see `components/ui/parallax.tsx`. The photo scrolls slower than the
 * page and the copy slightly faster, which is the whole depth cue. The
 * section's `overflow-hidden` is what clips the oversized photo layer.
 *
 * `-z-10` inside `isolate` puts the photo behind the copy but still inside this
 * section's stacking context. The heading's gradient is painted through
 * `background-clip: text`, and in-flow content paints after negative-z
 * children, so the photo cannot cover it.
 */
export function HeroSection({
  image,
  heading,
  description,
  ctaText,
  ctaLink,
}: {
  image: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}) {
  return (
    <section
      data-parallax
      className="relative isolate flex min-h-[calc(100dvh-var(--navbar-height))] overflow-hidden"
    >
      <ParallaxBackground className="-z-10">
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </ParallaxBackground>

      {/* Readability scrim. Delete this line if the photo reads dark enough. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-blue-900/40" />

      <Container className="flex flex-col justify-center py-20 text-center">
        <ParallaxItem
          distance={COPY_DRIFT}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-gradient-gold text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>

          <p className=" text-lg leading-8 text-gold-300">{description}</p>

          <a href={ctaLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg">{ctaText}</Button>
          </a>
        </ParallaxItem>
      </Container>
    </section>
  );
}
