import Image from "next/image";

import { Button, Container } from "@/components/ui";

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
    <section className="relative isolate flex min-h-[calc(100dvh-var(--navbar-height))] overflow-hidden">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Readability scrim. Delete this line if the photo reads dark enough. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-blue-900/40" />

      <Container className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <h1 className="text-gradient-gold text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h1>

        <p className=" text-lg leading-8 text-gold-300">{description}</p>

        <a href={ctaLink} target="_blank" rel="noopener noreferrer">
          <Button size="lg">{ctaText}</Button>
        </a>
      </Container>
    </section>
  );
}
