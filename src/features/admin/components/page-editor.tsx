import Link from "next/link";

import { blockSpec, collectionSpec } from "@/config/content";

import type { LoadedPage } from "../server/queries";

import { BlockForm } from "./block-form";
import { CollectionEditor } from "./collection-editor";

/** Every editable thing on one page: its sections first, then its lists. */
export function PageEditor({ loaded }: { loaded: LoadedPage }) {
  const { page, blocks, collections } = loaded;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-bold text-gold-200">{page.title}</h2>
        <Link
          href={page.path}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gold-300 underline underline-offset-4 hover:text-gold-100"
        >
          View {page.path} ↗
        </Link>
      </div>

      {blocks.length > 0 ? (
        <div className="flex flex-col gap-6">
          {blocks.map(({ key, data }) => {
            const spec = blockSpec(key);
            return spec ? (
              <BlockForm key={key} spec={spec} data={data} />
            ) : null;
          })}
        </div>
      ) : null}

      {collections.map(({ key, items }) => {
        const spec = collectionSpec(key);
        return spec ? (
          <CollectionEditor key={key} spec={spec} items={items} />
        ) : null;
      })}
    </div>
  );
}
