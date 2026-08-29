import Link from "next/link";
import type { ReactNode } from "react";

import { contentPages } from "@/config/content";
import { routes } from "@/config/routes";
import type { AdminUser } from "@/lib/auth/session";

import { signOut } from "../server/auth-actions";

import { SaveButton } from "./save-button";

/** Chrome for every signed-in admin page: page nav, who you are, sign out. */
export function AdminShell({
  user,
  children,
}: {
  user: AdminUser;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-300/20 pb-6">
        <Link
          href={routes.admin}
          className="text-gradient-gold text-xl font-bold"
        >
          Content admin
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gold-100/60">{user.email}</span>
          <form action={signOut}>
            <SaveButton variant="ghost">Sign out</SaveButton>
          </form>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        {contentPages.map((page) => (
          <Link
            key={page.slug}
            href={`${routes.admin}/${page.slug}`}
            className="rounded-lg border border-blue-300/30 px-3 py-1.5 text-sm text-gold-200 transition-colors hover:border-gold-500"
          >
            {page.title}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
