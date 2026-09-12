import Link from "next/link";

import { blockSpec, collectionSpec } from "@/config/content";

import type { LoadedPage } from "../server/queries";

import { BlockForm } from "./block-form";
import { CollectionEditor } from "./collection-editor";

type LoadedBlock = LoadedPage["blocks"][number];
type LoadedCollection = LoadedPage["collections"][number];

/**
 * One card, or one run of block cards, in the order the editor reads them.
 *
 * `key` is prefixed by kind because a block and a collection may share a key —
 * `seminar.speakers` is both the heading and the list — and the two would
 * otherwise collide as React keys in the same array.
 */
type Section =
  | { kind: "blocks"; key: string; blocks: LoadedBlock[] }
  | { kind: "collection"; key: string; collection: LoadedCollection };

/**
 * Interleaves the two arrays into the order the page itself is in.
 *
 * A collection naming a block with `after` is pulled up to sit under it;
 * everything else stays at the end, which is where every list used to be.
 * Consecutive blocks are kept in one run so they still render as the tighter
 * group — splitting them per block would space them like separate sections.
 */
function sequence(loaded: LoadedPage): Section[] {
  const blockKeys = new Set(loaded.page.blocks.map((b) => b.key));
  const anchored = new Map<string, LoadedCollection[]>();

  for (const collection of loaded.collections) {
    const after = collectionSpec(collection.key)?.after;
    // An `after` naming a block this page does not have would strand the list
    // where nobody could edit it, so it falls through to the tail instead.
    if (!after || !blockKeys.has(after)) continue;
    anchored.set(after, [...(anchored.get(after) ?? []), collection]);
  }

  const sections: Section[] = [];
  let run: LoadedBlock[] = [];
  const flush = () => {
    if (run.length === 0) return;
    sections.push({ kind: "blocks", key: `b:${run[0].key}`, blocks: run });
    run = [];
  };

  for (const block of loaded.blocks) {
    run.push(block);
    const here = anchored.get(block.key);
    if (!here) continue;
    flush();
    for (const c of here) {
      sections.push({ kind: "collection", key: `c:${c.key}`, collection: c });
    }
  }
  flush();

  const placed = new Set([...anchored.values()].flat());
  for (const c of loaded.collections) {
    if (placed.has(c)) continue;
    sections.push({ kind: "collection", key: `c:${c.key}`, collection: c });
  }

  return sections;
}

/** Every editable thing on one page, in the order the page renders it. */
export function PageEditor({ loaded }: { loaded: LoadedPage }) {
  const { page } = loaded;

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

      {sequence(loaded).map((section) => {
        if (section.kind === "collection") {
          const spec = collectionSpec(section.collection.key);
          return spec ? (
            <CollectionEditor
              key={section.key}
              spec={spec}
              items={section.collection.items}
            />
          ) : null;
        }

        return (
          <div key={section.key} className="flex flex-col gap-6">
            {section.blocks.map(({ key, data }) => {
              const spec = blockSpec(key);
              return spec ? (
                <BlockForm key={key} spec={spec} data={data} />
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
}
