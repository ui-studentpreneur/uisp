import type { CollectionSpec } from "@/config/content";

import { deleteItem, moveItem, saveItem } from "../server/actions";
import type { AdminItem } from "../server/queries";

import { ActionForm } from "./action-form";
import { FieldInput } from "./field-input";
import { ItemSummary } from "./item-summary";
import { SaveButton } from "./save-button";

/**
 * One row of a collection: its fields, plus reorder and delete.
 *
 * Collapsed by default, because a collection of fifty logos rendered as fifty
 * open forms is a page nobody can scan. `<details>` does it with no client
 * state — which matters here, since the fields are uncontrolled inputs posting
 * to a Server Action and a re-render would discard what had been typed.
 *
 * The move and delete controls live inside the panel rather than beside the
 * summary: they are forms, and a form inside `<summary>` puts its buttons on
 * the element whose whole job is to toggle on click.
 *
 * Four separate forms rather than one with several submit buttons — a nested
 * form is invalid HTML, and `formAction` on a button would still submit the
 * field inputs, so deleting would post the whole row for nothing.
 */
export function ItemForm({
  spec,
  item,
  index,
  isFirst,
  isLast,
}: {
  spec: CollectionSpec;
  item: AdminItem;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <li className="overflow-hidden rounded-2xl border border-blue-300/25 bg-blue-800/30">
      <details className="group/item">
        <ItemSummary spec={spec} item={item} position={index + 1} />

        <div className="flex flex-col gap-4 border-t border-blue-300/20 p-5">
          <div className="flex items-center gap-2">
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

            <div className="ml-auto">
              <ActionForm
                action={deleteItem.bind(null, spec.key, item.id)}
                quiet
              >
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
        </div>
      </details>
    </li>
  );
}
