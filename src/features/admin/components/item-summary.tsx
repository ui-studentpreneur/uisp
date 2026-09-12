import { ChevronDown } from "lucide-react";

import type { CollectionSpec } from "@/config/content";

import type { AdminItem } from "../server/queries";

/** Last segment of an image path, which is what tells two logos apart. */
function fileName(src: string): string {
  return src.split("/").pop() ?? src;
}

/**
 * The always-visible line of a collapsed row.
 *
 * A collection can run to dozens of entries — the sponsor logos are nearly
 * sixty — and every one of those rendered as an open form made the page
 * thousands of pixels long to scroll past. So the row has to be identifiable
 * without opening it, which for a list of logos means the logo itself: the
 * first text field is the band name, identical on all forty-seven of them.
 *
 * Reading straight from the field types rather than from names hard-coded per
 * collection keeps this working for the next collection that gets an image.
 */
export function ItemSummary({
  spec,
  item,
  position,
}: {
  spec: CollectionSpec;
  item: AdminItem;
  position: number;
}) {
  const image = spec.fields.find((f) => f.type === "image");
  const label = spec.fields.find((f) => f.type !== "image");
  const badge = spec.fields.find((f) => f.type === "select");

  const src = image ? item.data[image.name] : undefined;
  const badgeValue = badge ? item.data[badge.name] : undefined;

  return (
    <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
      <span className="w-5 shrink-0 text-xs tabular-nums text-gold-100/35">
        {position}
      </span>

      {src ? (
        // Not `next/image`: an admin thumbnail of a file the editor just
        // uploaded gains nothing from the optimizer, and the source may be any
        // aspect ratio at all.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="size-9 shrink-0 rounded-md bg-blue-900/50 object-contain p-1"
        />
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-gold-200">
          {(label ? item.data[label.name] : "") || "Untitled"}
        </span>
        {src ? (
          <span className="block truncate text-xs text-gold-100/40">
            {fileName(src)}
          </span>
        ) : null}
      </span>

      {badgeValue ? (
        <span className="shrink-0 rounded-full border border-gold-500/30 px-2.5 py-1 text-xs font-semibold text-gold-300">
          {badgeValue}
        </span>
      ) : null}

      <ChevronDown
        aria-hidden
        className="size-4 shrink-0 text-gold-100/40 transition-transform duration-150 group-open/item:rotate-180"
      />
    </summary>
  );
}
