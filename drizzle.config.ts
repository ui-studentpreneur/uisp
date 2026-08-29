import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit reads `DATABASE_URL` straight from the process rather than
 * through `src/config/env.ts` — it runs outside Next, so the app's loader and
 * its `server-only` imports are not available here.
 *
 * `pnpm db:push` and `pnpm db:generate` load `.env.local` themselves; see the
 * scripts in `package.json`.
 */
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
  casing: "snake_case",
});
