import "server-only";

import { readBlock, readItems } from "@/lib/content/queries";

export async function getAboutContent() {
  const [hero, video, theme, values] = await Promise.all([
    readBlock("about.hero"),
    readBlock("about.video"),
    readBlock("about.theme"),
    readItems("about.values"),
  ]);

  return { hero, video, theme, values: values.map((v) => v.label) };
}
