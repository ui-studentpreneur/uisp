import type { ReactNode } from "react";

/**
 * The admin sits outside the `(main)` group on purpose: it gets the root
 * layout's fonts and providers, but none of the marketing navbar or footer.
 *
 * No auth check here — `/admin/login` is nested under this layout, and a guard
 * at this level would redirect the login page to itself. The gate lives in
 * `(dashboard)/layout.tsx`, which wraps every signed-in page.
 */
export const metadata = { title: "Content admin", robots: { index: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-blue-900 text-gold-100">{children}</div>;
}
