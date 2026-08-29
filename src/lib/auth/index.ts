import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { serverEnv } from "@/config/env";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

/**
 * Better Auth instance. One admin-shaped account per deployment, created by
 * `pnpm db:seed` or `pnpm admin:create` — there is deliberately no public sign
 * up route, and `disableSignUp` closes the one Better Auth mounts by default.
 *
 * `nextCookies()` must be the last plugin: it is what lets Better Auth set the
 * session cookie from inside a Server Action, which is how the login form
 * signs in without a client-side fetch.
 */
export const auth = betterAuth({
  secret: serverEnv().authSecret,
  baseURL: serverEnv().authUrl,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  session: {
    // A content editor should not be signed out mid-edit; a week is plenty.
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [nextCookies()],
});
