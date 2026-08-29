import "server-only";

import { asc, eq } from "drizzle-orm";

import { collectionSpec, contentPages, type PageSpec } from "@/config/content";
import type { ContentData } from "@/lib/content/queries";
import { readBlock } from "@/lib/content/queries";
import { contentItem, db } from "@/lib/db";

export type AdminItem = { id: string; position: number; data: ContentData };

/**
 * A collection exactly as stored, defaults *not* filled in.
 *
 * Deliberately different from the public `readItems`: the editor has to see an
 * empty list as empty, or deleting the last item would look like it failed.
 */
export async function listItems(collection: string): Promise<AdminItem[]> {
  const rows = await db
    .select({
      id: contentItem.id,
      position: contentItem.position,
      data: contentItem.data,
    })
    .from(contentItem)
    .where(eq(contentItem.collection, collection))
    .orderBy(asc(contentItem.position));

  return rows.map((row) => ({
    id: row.id,
    position: row.position,
    data: Object.fromEntries(
      Object.entries(row.data).map(([k, v]) => [k, String(v ?? "")]),
    ),
  }));
}

export type LoadedPage = {
  page: PageSpec;
  blocks: { key: string; data: ContentData }[];
  collections: { key: string; items: AdminItem[] }[];
};

/** Everything one admin page needs, in a single pass. */
export async function loadPage(page: PageSpec): Promise<LoadedPage> {
  const [blocks, collections] = await Promise.all([
    Promise.all(
      page.blocks.map(async (block) => ({
        key: block.key,
        data: await readBlock(block.key),
      })),
    ),
    Promise.all(
      page.collections.map(async (collection) => ({
        key: collection.key,
        items: await listItems(collection.key),
      })),
    ),
  ]);

  return { page, blocks, collections };
}

/** Item counts for the admin index, so each page shows what is inside it. */
export async function pageSummaries(): Promise<
  { page: PageSpec; blocks: number; items: number }[]
> {
  return Promise.all(
    contentPages.map(async (page) => {
      const counts = await Promise.all(
        page.collections.map((c) => listItems(c.key).then((i) => i.length)),
      );
      return {
        page,
        blocks: page.blocks.length,
        items: counts.reduce((sum, n) => sum + n, 0),
      };
    }),
  );
}

/** The fields an item of this collection has, or `[]` for an unknown key. */
export function fieldsFor(collection: string) {
  return collectionSpec(collection)?.fields ?? [];
}
