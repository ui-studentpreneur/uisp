import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/*
 * Better Auth's four tables. The column names and types are dictated by the
 * adapter, not chosen here — Better Auth queries them by these exact names, so
 * renaming one breaks sign-in rather than the build. Regenerate with
 * `npx @better-auth/cli generate` if the library's core schema ever changes.
 */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  // Required since Better Auth 1.7, and sign-in filters on it: an email and
  // password account must read `local:credential`, not `credential`. OAuth
  // providers write their own issuer here.
  issuer: text("issuer").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/*
 * Content. Two shapes cover every editable thing on the site.
 *
 * A *block* is a section that exists exactly once — the home hero, the grand
 * theme, the footer's brand copy. One row per key, all its fields in `data`.
 *
 * An *item* is one entry in an ordered list — a timeline date, a speaker, a
 * sponsor logo, a contact card. Many rows per collection, ordered by
 * `position`.
 *
 * `data` is `jsonb` rather than a column per field because the field set is
 * declared in `src/config/content-fields.ts` and read by a single generic
 * admin form. Adding a field to a section is an edit to that file; it is not a
 * migration. The trade is that the database does not type-check the payload —
 * `readBlock`/`readItems` do, on the way out.
 */

export const contentBlock = pgTable("content_block", {
  /** Dotted section path, e.g. `home.hero`. Unique — one row per section. */
  key: text("key").primaryKey(),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contentItem = pgTable(
  "content_item",
  {
    id: text("id").primaryKey(),
    /** Dotted collection path, e.g. `home.timeline`. */
    collection: text("collection").notNull(),
    /** Sort key. Gaps are fine; only the relative order is read. */
    position: integer("position").notNull().default(0),
    data: jsonb("data").notNull().$type<Record<string, unknown>>(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    // Every read is "one collection, in order", so the index carries both.
    index("content_item_collection_position_idx").on(
      table.collection,
      table.position,
    ),
  ],
);
