/**
 * The feature's screen-level component. `app/(main)/about-us/page.tsx` renders
 * this and nothing else, which is what keeps route files trivial.
 */
import AboutHero from "./components/hero.about";
import CompanyVideo from "./components/company.about";
import OurTheme from "./components/theme.about";
import { getAboutContent } from "./server/queries";

export async function AboutPage() {
  const { hero, video, theme, values } = await getAboutContent();

  return (
    <main className="w-full overflow-hidden relative min-h-screen bg-blue-700">
      <AboutHero heading={hero.heading} body={hero.body} image={hero.image} />
      <CompanyVideo src={video.src} title={video.title} />
      <OurTheme
        heading={theme.heading}
        quote={theme.quote}
        body={theme.body}
        valuesHeading={theme.valuesHeading}
        values={values}
      />
    </main>
  );
}
