import "server-only";

import { readBlock, readItems } from "@/lib/content/queries";

export async function getAboutContent() {
  // `about.values` is both a block and a collection: the heading and the list
  // it introduces. They are separate lookups because the two maps are.
  const [hero, video, theme, valuesBlock, values] = await Promise.all([
    readBlock("about.hero"),
    readBlock("about.video"),
    readBlock("about.theme"),
    readBlock("about.values"),
    readItems("about.values"),
  ]);

  return {
    hero,
    video,
    theme,
    valuesHeading: valuesBlock.heading,
    values: values.map((v) => v.label),
  };
}
