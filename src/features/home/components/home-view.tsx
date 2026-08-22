import { Container } from "@/components/ui";

import { getHighlights } from "../server/queries";

import { HeroSection } from "./hero-section";
import { HighlightGrid } from "./highlight-grid";

/**
 * The feature's screen-level component. `app/(marketing)/page.tsx` renders
 * this and nothing else, which is what keeps route files trivial.
 *
 * Sections own their own width now: the hero is full-bleed, so anything that
 * should stay on the page measure wraps itself in `Container`.
 */
export async function HomeView() {
  const highlights = await getHighlights();

  return (
    <>
      <HeroSection />
      <Container className="py-20">
        <HighlightGrid highlights={highlights} />
      </Container>
    </>
  );
}
