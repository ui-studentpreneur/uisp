import { redirect } from "next/navigation";

import { routes } from "@/config";
import { LoginForm } from "@/features/admin";
import { currentUser } from "@/lib/auth/session";

export default async function AdminLoginPage() {
  // Already signed in: skip the form rather than showing a dead end.
  if (await currentUser()) redirect(routes.admin);

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <LoginForm />
    </main>
  );
}
