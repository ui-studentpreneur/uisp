/**
 * Creating the admin account, shared by `db:seed` and `admin:create`.
 *
 * Goes through Better Auth's internal adapter rather than `signUpEmail`,
 * because the public sign-up endpoint is disabled — that is the point of
 * `disableSignUp: true`, and this account is meant to be the only way in. The
 * password still goes through `ctx.password.hash`, so it is hashed with the
 * exact parameters sign-in will verify against.
 */
import { eq } from "drizzle-orm";

import { auth } from "../src/lib/auth";
import { db, user } from "../src/lib/db";

type Credentials = { email: string; password: string; name: string };

function readCredentials(): Credentials {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local");
  }

  return { email, password, name: process.env.ADMIN_NAME ?? "Admin" };
}

/**
 * Creates the account, or resets its password if the email already exists.
 * Returns what it did, so callers can report it.
 */
export async function upsertAdmin(): Promise<"created" | "reset"> {
  const { email, password, name } = readCredentials();
  const ctx = await auth.$context;
  const hash = await ctx.password.hash(password);

  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing) {
    await ctx.internalAdapter.updatePassword(existing.id, hash);
    return "reset";
  }

  // `ctx.adapter` rather than `internalAdapter`: the internal helpers want an
  // endpoint context this script has no way to produce, and the generic
  // adapter writes the same two rows.
  const created = await ctx.adapter.create<
    { email: string; name: string; emailVerified: boolean },
    { id: string }
  >({
    model: "user",
    data: { email, name, emailVerified: true },
  });

  // The credential account is what actually holds the password; a user row on
  // its own can be looked up but never signed in as.
  await ctx.adapter.create({
    model: "account",
    data: {
      userId: created.id,
      providerId: "credential",
      // Not "credential". Better Auth looks a password account up by this
      // exact string, so getting it wrong creates an account that exists but
      // can never sign in — verified against what `signUpEmail` writes.
      issuer: "local:credential",
      accountId: created.id,
      password: hash,
    },
  });

  return "created";
}

export function adminEmail(): string {
  return readCredentials().email;
}
