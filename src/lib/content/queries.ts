import "server-only";

import { asc, eq } from "drizzle-orm";

import { blockSpec, collectionSpec } from "@/config/content";
import { contentBlock, contentItem, db } from "@/lib/db";

/** One editable record: every field of a section, as strings. */
export type ContentData = Record<string, string>;

export type ContentEntry = ContentData & { id: string };

/** Coerces a `jsonb` payload to the string map the rest of the app expects. */
function toData(raw: Record<string, unknown>): ContentData {
  const out: ContentData = {};
  for (const [key, value] of Object.entries(raw)) {
    out[key] = typeof value === "string" ? value : String(value ?? "");
  }
  return out;
}

/**
 * A section's fields, with the registry defaults underneath.
 *
 * Merged rather than replaced so the site keeps rendering after a field is
 * added to `config/content` but before anyone has saved that section again —
 * the new field falls back to its default instead of arriving as `undefined`
 * and blanking part of the page.
 */
export async function readBlock(key: string): Promise<ContentData> {
  const defaults = blockSpec(key)?.defaults ?? {};

  const [row] = await db
    .select({ data: contentBlock.data })
    .from(contentBlock)
    .where(eq(contentBlock.key, key))
    .limit(1);

  return { ...defaults, ...(row ? toData(row.data) : {}) };
}

/**
 * Whether `pnpm db:seed` has ever run against this database.
 *
 * An empty collection is ambiguous on its own: it could mean nobody has seeded
 * yet, or that the editor deliberately deleted every item. This distinguishes
 * the two by asking whether *any* block exists — seeding writes all of them, so
 * one row is proof the content has been installed.
 *
 * Only the `true` answer is memoised. Seeding is a one-way door, so caching it
 * is safe; caching `false` would strand a running dev server on defaults until
 * it was restarted.
 */
let seeded = false;

async function isSeeded(): Promise<boolean> {
  if (seeded) return true;
  const [row] = await db
    .select({ key: contentBlock.key })
    .from(contentBlock)
    .limit(1);
  seeded = row !== undefined;
  return seeded;
}

/**
 * A collection's items in editor order.
 *
 * Before the database is seeded this falls back to the registry defaults, so a
 * fresh checkout renders the real site immediately. Afterwards the table is
 * authoritative — including when the editor has deleted every item, which must
 * leave the list empty rather than resurrecting the defaults.
 */
export async function readItems(key: string): Promise<ContentEntry[]> {
  const rows = await db
    .select({ id: contentItem.id, data: contentItem.data })
    .from(contentItem)
    .where(eq(contentItem.collection, key))
    .orderBy(asc(contentItem.position));

  if (rows.length > 0) {
    return rows.map((row) => ({ id: row.id, ...toData(row.data) }));
  }

  if (await isSeeded()) return [];

  const defaults = collectionSpec(key)?.defaults ?? [];
  return defaults.map((data, index) => ({ id: `default-${index}`, ...data }));
}

/**
 * Items bucketed by their `group` field, in the order each group first appears.
 *
 * Used by the speaker and sponsor sections, where the editor decides both the
 * grouping and its order just by ordering the items.
 */
export function groupItems(
  items: readonly ContentEntry[],
): { title: string; items: ContentEntry[] }[] {
  const groups: { title: string; items: ContentEntry[] }[] = [];

  for (const item of items) {
    const title = item.group ?? "";
    const existing = groups.find((group) => group.title === title);
    if (existing) existing.items.push(item);
    else groups.push({ title, items: [item] });
  }

  return groups;
}

/**
 * Content rows into the shape the speaker carousel takes, shared by the home,
 * seminar and summit features.
 *
 * The return type is written out rather than imported from
 * `@/components/speaker`: `lib/` sits below `components/` and must not depend
 * on it. Structural typing does the rest — this satisfies `SpeakerGroup[]`
 * without either side knowing about the other.
 *
 * The mapping itself is needed because a `Record<string, string>` does not
 * satisfy a type with named required fields, however many keys it happens to
 * hold at runtime.
 */
export function toSpeakerGroups(entries: readonly ContentEntry[]): {
  title: string;
  people: { name: string; role: string; company: string; image: string }[];
}[] {
  return groupItems(entries).map((group) => ({
    title: group.title,
    people: group.items.map((person) => ({
      name: person.name,
      role: person.role,
      company: person.company,
      image: person.image,
    })),
  }));
}

/**
 * A stored row into an event detail. Empty strings become `undefined` so the
 * row component's "is this field filled in?" checks work — an unset date on a
 * prose block arrives as `""`, which is falsy but still renders its icon if
 * the check is a presence test rather than a truthiness one.
 */
export function toEventDetail(entry: ContentEntry): {
  heading: string;
  date?: string;
  location?: string;
  body?: string;
} {
  return {
    heading: entry.heading,
    date: entry.date || undefined,
    location: entry.location || undefined,
    body: entry.body || undefined,
  };
}
