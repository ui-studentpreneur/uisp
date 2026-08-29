import type { CollectionSpec } from "@/config/content";

import { addItem } from "../server/actions";
import type { AdminItem } from "../server/queries";

import { ActionForm } from "./action-form";
import { ItemForm } from "./item-form";
import { SaveButton } from "./save-button";

/** An ordered list the editor can add to, reorder and delete from. */
export function CollectionEditor({
  spec,
  items,
}: {
  spec: CollectionSpec;
  items: readonly AdminItem[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-bold text-gold-200">
          {spec.title}{" "}
          <span className="text-sm font-normal text-gold-100/40">
            ({items.length})
          </span>
        </h3>
        <code className="text-xs text-gold-100/40">{spec.key}</code>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-blue-300/30 p-6 text-sm text-gold-100/50">
          Nothing here yet. Add the first {spec.itemLabel.toLowerCase()}.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((item, index) => (
            <ItemForm
              key={item.id}
              spec={spec}
              item={item}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          ))}
        </ul>
      )}

      <ActionForm action={addItem.bind(null, spec.key)} quiet>
        <SaveButton variant="ghost">Add {spec.itemLabel}</SaveButton>
      </ActionForm>
    </section>
  );
}
