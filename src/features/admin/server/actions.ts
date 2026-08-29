"use server";

import { randomUUID } from "node:crypto";

import { and, asc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { blockSpec, collectionSpec } from "@/config/content";
import { requireUser } from "@/lib/auth/session";
import { contentBlock, contentItem, db } from "@/lib/db";
import { err, ok, type Result } from "@/lib/utils";

/**
 * What `useActionState` passes back in on the next call. The actions that take
 * a `FormData` have to declare it to reach the second argument, and ignore it —
 * the forms are uncontrolled, so nothing needs the previous result except the
 * status line that renders it. Actions with nothing to read from the form omit
 * it entirely; a shorter function still satisfies the callback type.
 */
type ActionState = Result<unknown> | null;

/**
 * Every action here re-checks the session. `proxy.ts` bounces anonymous
 * requests away from `/admin`, but a Server Action is a POST to the page's own
 * URL that any client can craft — the proxy is a redirect, not a guard.
 */

/**
 * Public pages read the database on every request, so nothing here strictly
 * needs invalidating. It is called anyway because the router keeps a
 * client-side cache of visited routes, and without it an editor who saves and
 * navigates back sees the version they just replaced.
 */
function revalidateSite(): void {
  revalidatePath("/", "layout");
}

/** Reads only the fields the registry declares, ignoring anything else posted. */
function collect(
  fields: readonly { name: string }[],
  form: FormData,
): Record<string, string> {
  const data: Record<string, string> = {};
  for (const field of fields) {
    const value = form.get(field.name);
    data[field.name] = typeof value === "string" ? value : "";
  }
  return data;
}

export async function saveBlock(
  key: string,
  _previous: ActionState,
  form: FormData,
): Promise<Result<null>> {
  await requireUser();

  const spec = blockSpec(key);
  if (!spec) return err(`Unknown section: ${key}`);

  const data = collect(spec.fields, form);

  await db
    .insert(contentBlock)
    .values({ key, data })
    .onConflictDoUpdate({
      target: contentBlock.key,
      set: { data, updatedAt: new Date() },
    });

  revalidateSite();
  return ok(null);
}

export async function saveItem(
  collection: string,
  id: string,
  _previous: ActionState,
  form: FormData,
): Promise<Result<null>> {
  await requireUser();

  const spec = collectionSpec(collection);
  if (!spec) return err(`Unknown list: ${collection}`);

  const data = collect(spec.fields, form);

  await db
    .update(contentItem)
    .set({ data, updatedAt: new Date() })
    .where(and(eq(contentItem.id, id), eq(contentItem.collection, collection)));

  revalidateSite();
  return ok(null);
}

export async function addItem(collection: string): Promise<Result<string>> {
  await requireUser();

  const spec = collectionSpec(collection);
  if (!spec) return err(`Unknown list: ${collection}`);

  // Appended, not prepended: an editor adding to a timeline expects the new
  // row at the end, and `position` is sparse so the gap does not matter.
  const [last] = await db
    .select({ position: contentItem.position })
    .from(contentItem)
    .where(eq(contentItem.collection, collection))
    .orderBy(sql`${contentItem.position} desc`)
    .limit(1);

  const id = randomUUID();
  const blank = Object.fromEntries(spec.fields.map((f) => [f.name, ""]));

  await db.insert(contentItem).values({
    id,
    collection,
    position: (last?.position ?? -1) + 1,
    data: blank,
  });

  revalidateSite();
  return ok(id);
}

export async function deleteItem(
  collection: string,
  id: string,
): Promise<Result<null>> {
  await requireUser();

  await db
    .delete(contentItem)
    .where(and(eq(contentItem.id, id), eq(contentItem.collection, collection)));

  revalidateSite();
  return ok(null);
}

/**
 * Swaps an item with its neighbour.
 *
 * Positions are rewritten from the sorted list rather than by adding or
 * subtracting one, because seeded rows can share a position and arithmetic on
 * a tie moves nothing. Renumbering the whole collection is a handful of rows
 * and always terminates.
 */
export async function moveItem(
  collection: string,
  id: string,
  direction: "up" | "down",
): Promise<Result<null>> {
  await requireUser();

  const rows = await db
    .select({ id: contentItem.id })
    .from(contentItem)
    .where(eq(contentItem.collection, collection))
    .orderBy(asc(contentItem.position));

  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) return err("That item no longer exists.");

  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= rows.length) return ok(null);

  const order = rows.map((row) => row.id);
  [order[index], order[target]] = [order[target], order[index]];

  await Promise.all(
    order.map((rowId, position) =>
      db.update(contentItem).set({ position }).where(eq(contentItem.id, rowId)),
    ),
  );

  revalidateSite();
  return ok(null);
}
