"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import { err, type Result } from "@/lib/utils";

/**
 * Signs in and lets Better Auth set the session cookie.
 *
 * The cookie is written by the `nextCookies()` plugin, which only works inside
 * a Server Action — so signing in has to happen here rather than through a
 * client-side fetch to `/api/auth`.
 *
 * `redirect()` is deliberately outside the `try`: it works by throwing, so
 * catching around it would swallow the navigation and report it as a failure.
 */
export async function signIn(
  _previous: Result<null> | null,
  form: FormData,
): Promise<Result<null>> {
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  if (!email || !password) return err("Enter your email and password.");

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (error) {
    // Better Auth reports a wrong password and an unknown email identically,
    // on purpose — repeating that here keeps the form from confirming which
    // addresses exist.
    if (error instanceof APIError) return err("Email or password is wrong.");
    throw error;
  }

  redirect(routes.admin);
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({ headers: await headers() });
  redirect(routes.adminLogin);
}
