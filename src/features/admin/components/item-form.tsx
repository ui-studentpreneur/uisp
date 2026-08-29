import type { CollectionSpec } from "@/config/content";

import { deleteItem, moveItem, saveItem } from "../server/actions";
import type { AdminItem } from "../server/queries";

import { ActionForm } from "./action-form";
import { FieldInput } from "./field-input";
import { SaveButton } from "./save-button";

/**
 * One row of a collection: its fields, plus reorder and delete.
 *
 * Four separate forms rather than one with several submit buttons — a nested
 * form is invalid HTML, and `formAction` on a button would still submit the
 * field inputs, so deleting would post the whole row for nothing.
 */
export function ItemForm({
  spec,
  item,
  isFirst,
  isLast,
}: {
  spec: CollectionSpec;
  item: AdminItem;
  isFirst: boolean;
  isLast: boolean;
}) {
  // The first field doubles as the row's label. It is the name, date or title
  // in every collection, which is what makes a collapsed list readable.
  const summary = item.data[spec.fields[0]?.name ?? ""] || "Untitled";

  return (
    <li className="rounded-2xl border border-blue-300/25 bg-blue-800/30 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold text-gold-200">
          {summary}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <ActionForm
            action={moveItem.bind(null, spec.key, item.id, "up")}
            quiet
          >
            <SaveButton variant="ghost" disabled={isFirst}>
              ↑
            </SaveButton>
          </ActionForm>

          <ActionForm
            action={moveItem.bind(null, spec.key, item.id, "down")}
            quiet
          >
            <SaveButton variant="ghost" disabled={isLast}>
              ↓
            </SaveButton>
          </ActionForm>

          <ActionForm action={deleteItem.bind(null, spec.key, item.id)} quiet>
            <SaveButton variant="danger">Delete</SaveButton>
          </ActionForm>
        </div>
      </div>

      <ActionForm
        action={saveItem.bind(null, spec.key, item.id)}
        className="flex flex-col gap-4"
      >
        {spec.fields.map((field) => (
          <FieldInput
            key={field.name}
            field={field}
            value={item.data[field.name]}
          />
        ))}
        <div>
          <SaveButton />
        </div>
      </ActionForm>
    </li>
  );
}
