import Link from "next/link";

import { routes } from "@/config/routes";

import type { pageSummaries } from "../server/queries";

/** Landing view: what is editable, and how much of it there is. */
export function PageIndex({
  summaries,
}: {
  summaries: Awaited<ReturnType<typeof pageSummaries>>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {summaries.map(({ page, blocks, items }) => (
        <Link
          key={page.slug}
          href={`${routes.admin}/${page.slug}`}
          className="rounded-2xl border border-blue-300/25 bg-blue-800/30 p-6 transition-colors hover:border-gold-500"
        >
          <h2 className="text-lg font-bold text-gold-200">{page.title}</h2>
          <p className="mt-1 text-sm text-gold-100/50">{page.path}</p>
          <p className="mt-4 text-sm text-gold-100/70">
            {blocks} section{blocks === 1 ? "" : "s"} · {items} list item
            {items === 1 ? "" : "s"}
          </p>
        </Link>
      ))}
    </div>
  );
}
