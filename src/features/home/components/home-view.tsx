import { getHighlights } from "../server/queries";

import { HeroSection } from "./hero-section";
import { HighlightGrid } from "./highlight-grid";

/**
 * The feature's screen-level component. `app/(marketing)/page.tsx` renders
 * this and nothing else, which is what keeps route files trivial.
 */
export async function HomeView() {
  const highlights = await getHighlights();

  return (
    <>
      <HeroSection />
      <HighlightGrid highlights={highlights} />
    </>
  );
}
