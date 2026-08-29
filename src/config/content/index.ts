import { aboutPage } from "./about";
import { competitionPage } from "./competition";
import { seminarPage, summitPage } from "./events";
import { footerPage } from "./footer";
import { homePage } from "./home";
import type { BlockSpec, CollectionSpec, PageSpec } from "./types";

export type {
  BlockSpec,
  CollectionSpec,
  Field,
  FieldType,
  PageSpec,
} from "./types";

/** Everything the admin can edit, in the order it is listed. */
export const contentPages: readonly PageSpec[] = [
  homePage,
  aboutPage,
  competitionPage,
  seminarPage,
  summitPage,
  footerPage,
];

/*
 * Flat lookups, built once at module load. A block key and a collection key may
 * be identical — `home.timeline` is both a heading and a list — so they are
 * deliberately kept in separate maps rather than one namespace.
 */

const blocks = new Map<string, BlockSpec>(
  contentPages.flatMap((page) => page.blocks.map((b) => [b.key, b] as const)),
);

const collections = new Map<string, CollectionSpec>(
  contentPages.flatMap((page) =>
    page.collections.map((c) => [c.key, c] as const),
  ),
);

export function blockSpec(key: string): BlockSpec | undefined {
  return blocks.get(key);
}

export function collectionSpec(key: string): CollectionSpec | undefined {
  return collections.get(key);
}

export function pageSpec(slug: string): PageSpec | undefined {
  return contentPages.find((page) => page.slug === slug);
}

export const allBlockSpecs: readonly BlockSpec[] = [...blocks.values()];
export const allCollectionSpecs: readonly CollectionSpec[] = [
  ...collections.values(),
];
