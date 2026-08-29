import type { ReactNode } from "react";

import { AdminShell } from "@/features/admin";
import { requireUser } from "@/lib/auth/session";

/**
 * The gate. Every page inside this group is signed-in only, and `requireUser`
 * verifies the session against the database rather than trusting the cookie.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
