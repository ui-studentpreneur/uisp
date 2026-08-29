/**
 * Installs the admin account and the site's content.
 *
 * Idempotent by design — run it as often as you like. Blocks are upserted, so
 * re-running restores a section you have edited; collections are only written
 * when empty, so it will never duplicate items or undo a reorder.
 *
 * Run after `pnpm db:push`:
 *   pnpm db:seed
 *
 * The script runs under `--conditions=react-server` so that the `server-only`
 * imports in `lib/db` and `lib/auth` resolve to their empty build. Without it
 * that package throws on import, since outside a bundler it cannot tell a
 * script from a Client Component.
 */
import { randomUUID } from "node:crypto";

import { sql } from "drizzle-orm";

import { contentPages } from "../src/config/content";
import { contentBlock, contentItem, db } from "../src/lib/db";

import { adminEmail, upsertAdmin } from "./admin";

async function seedAdmin(): Promise<void> {
  const outcome = await upsertAdmin();
  const verb = outcome === "created" ? "created" : "password reset";
  console.log(`\u2713 admin account ${verb} for ${adminEmail()}`);
}

async function seedContent(): Promise<void> {
  let blocks = 0;
  let items = 0;

  for (const page of contentPages) {
    for (const block of page.blocks) {
      await db
        .insert(contentBlock)
        .values({ key: block.key, data: block.defaults })
        .onConflictDoUpdate({
          target: contentBlock.key,
          set: { data: block.defaults, updatedAt: new Date() },
        });
      blocks += 1;
    }

    for (const collection of page.collections) {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(contentItem)
        .where(sql`${contentItem.collection} = ${collection.key}`);

      if (count > 0) {
        console.log(`· ${collection.key} has ${count} items, skipping`);
        continue;
      }

      if (collection.defaults.length === 0) continue;

      await db.insert(contentItem).values(
        collection.defaults.map((data, position) => ({
          id: randomUUID(),
          collection: collection.key,
          position,
          data,
        })),
      );
      items += collection.defaults.length;
    }
  }

  console.log(`✓ ${blocks} blocks upserted, ${items} items inserted`);
}

async function main(): Promise<void> {
  await seedAdmin();
  await seedContent();
  console.log("\nDone. Sign in at /admin/login");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
