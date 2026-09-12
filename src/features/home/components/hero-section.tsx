import Image from "next/image";

import { RegisterMenu } from "@/components/layout";
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
 * page and the copy slightly faster, which is the whole depth cue. The photo
 * layer clips itself (`ParallaxBackground` is `overflow-hidden`), so this
 * section deliberately does not: the register menu hangs below the button and
 * a clip here would cut it off on a short viewport. `z-10` is what then keeps
 * the open menu above the section that follows.
 *
 * `registerMenu` swaps the single call to action for the menu of all three
 * events. The landing page is the only hero that does not belong to one event,
 * so it is the only one with something to choose between; every other hero
 * registers for the event it is already on and keeps its own `ctaLink`.
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
  registerMenu = false,
}: {
  image: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  /** Offer the three events instead of linking straight to `ctaLink`. */
  registerMenu?: boolean;
}) {
  return (
    <section
      data-parallax
      className="relative isolate z-10 flex min-h-[calc(100dvh-var(--navbar-height))]"
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

          {registerMenu ? (
            <RegisterMenu label={ctaText} />
          ) : (
            <a href={ctaLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg">{ctaText}</Button>
            </a>
          )}
        </ParallaxItem>
      </Container>
    </section>
  );
}
