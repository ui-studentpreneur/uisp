import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";

import { auth } from ".";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
};

/** The signed-in user, or `null`. Safe to call from any Server Component. */
export async function currentUser(): Promise<AdminUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const { id, name, email } = session.user;
  return { id, name, email };
}

/**
 * The signed-in user, or a redirect to the login page.
 *
 * This is the real gate. `proxy.ts` also bounces anonymous requests away from
 * `/admin`, but only as a courtesy — it reads the cookie without verifying it,
 * so every admin page and action calls this too.
 */
export async function requireUser(): Promise<AdminUser> {
  const user = await currentUser();
  if (!user) redirect(routes.adminLogin);
  return user;
}
