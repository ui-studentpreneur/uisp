import { NextResponse, type NextRequest } from "next/server";

import { applySecurityHeaders, requireAdminSession } from "@/lib/proxy";

/**
 * Next 16 renamed Middleware to Proxy. Only one `proxy.ts` per project is
 * supported, so keep this file a composition root: each concern lives in its
 * own module under `src/lib/proxy/` and is applied here in order.
 *
 * Handlers may take a `NextRequest` when they need the incoming request.
 * Not for slow work, and not the sole authorization check — verify auth inside
 * Server Components, Server Actions and Route Handlers too.
 */
export function proxy(request: NextRequest) {
  // Redirects short-circuit: there is no page to add headers to.
  const redirected = requireAdminSession(request);
  if (redirected) return redirected;

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  // Skip static assets and image optimisation.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
