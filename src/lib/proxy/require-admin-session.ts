import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

import { routes } from "@/config/routes";

/**
 * Bounces anonymous requests off `/admin` before the page renders.
 *
 * This is a courtesy, not the gate. It only checks that a session cookie is
 * *present* — verifying it means a database round trip, which the proxy runs on
 * every request and cannot afford. The real check is `requireUser()` in
 * `(dashboard)/layout.tsx` and at the top of every Server Action.
 *
 * Returns `null` when the request should carry on to the next handler.
 */
export function requireAdminSession(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(routes.admin)) return null;
  // The login page is the one place inside /admin that anonymous users belong.
  if (pathname === routes.adminLogin) return null;
  if (getSessionCookie(request)) return null;

  return NextResponse.redirect(new URL(routes.adminLogin, request.url));
}
