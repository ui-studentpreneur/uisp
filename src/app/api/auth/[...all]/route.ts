import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

/**
 * Better Auth's own endpoints (sign-in, sign-out, session). Mounted at
 * `/api/auth/*`, which is the default `basePath` the client and the server
 * helpers both assume.
 */
export const { GET, POST } = toNextJsHandler(auth);
