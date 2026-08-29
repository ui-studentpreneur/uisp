import type { BlockSpec } from "@/config/content";
import type { ContentData } from "@/lib/content/queries";

import { saveBlock } from "../server/actions";

import { ActionForm } from "./action-form";
import { FieldInput } from "./field-input";
import { SaveButton } from "./save-button";

/**
 * One section that exists exactly once, as a form.
 *
 * The action is bound with `.bind(null, key)` rather than closed over in a
 * client handler, so the inputs stay server-rendered and the form still posts
 * without JavaScript.
 */
export function BlockForm({
  spec,
  data,
}: {
  spec: BlockSpec;
  data: ContentData;
}) {
  return (
    <ActionForm
      action={saveBlock.bind(null, spec.key)}
      className="rounded-2xl border border-blue-300/25 bg-blue-800/30 p-6"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-bold text-gold-200">{spec.title}</h3>
        <code className="text-xs text-gold-100/40">{spec.key}</code>
      </div>

      <div className="flex flex-col gap-4">
        {spec.fields.map((field) => (
          <FieldInput key={field.name} field={field} value={data[field.name]} />
        ))}
      </div>

      <div className="mt-5">
        <SaveButton />
      </div>
    </ActionForm>
  );
}
