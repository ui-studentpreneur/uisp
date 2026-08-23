/**
 * The feature's screen-level component. `app/(marketing)/page.tsx` renders
 * this and nothing else, which is what keeps route files trivial.
 *
 * Sections own their own width now: the hero is full-bleed, so anything that
 * should stay on the page measure wraps itself in `Container`.
 */
import AboutHero from "./components/hero.about";
import CompanyVideo from "./components/company.about";
import OurTheme from "./components/theme.about";

export async function AboutPage() {
  return (
    <main className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <AboutHero />
      <CompanyVideo />
      <OurTheme />
    </main>
  );
}
