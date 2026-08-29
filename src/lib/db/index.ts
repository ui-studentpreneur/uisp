import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { serverEnv } from "@/config/env";

import * as schema from "./schema";

/**
 * The Drizzle client.
 *
 * Held on `globalThis` because Next's dev server re-evaluates modules on every
 * hot reload; without this each edit would open a fresh pool and the database
 * would run out of connections long before you noticed.
 *
 * `prepare: false` is required by connection poolers such as Neon's and
 * PgBouncer in transaction mode: prepared statements are bound to a backend
 * connection the pooler is free to hand to somebody else between statements.
 */
const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
};

const sql =
  globalForDb.sql ?? postgres(serverEnv().databaseUrl, { prepare: false });

if (!globalForDb.sql) globalForDb.sql = sql;

export const db = drizzle(sql, { schema });

export * from "./schema";
