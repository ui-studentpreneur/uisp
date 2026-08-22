"use client";

import type { ReactNode } from "react";

/**
 * The single client boundary wrapping the app.
 *
 * Add context providers (theme, query client, analytics) by nesting them here
 * rather than sprinkling `"use client"` across layouts — this keeps every
 * other layout and page a Server Component.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
