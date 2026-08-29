import type { Field } from "@/config/content";

import { ImageField } from "./image-field";

const BASE =
  "w-full rounded-lg border border-blue-300/40 bg-blue-900/40 px-3 py-2 text-sm text-gold-100 " +
  "placeholder:text-gold-100/30 outline-none focus:border-gold-500";

/**
 * One labelled input, chosen from the field's declared type.
 *
 * The label wraps its control rather than pointing at an id. A generated id
 * would have to be stable across the server and client renders, and this is a
 * Server Component — there is no `useId` to reach for, and anything random
 * would mismatch on hydration.
 *
 * Uncontrolled on purpose: the form posts to a Server Action, so React never
 * needs the value between renders, and `defaultValue` avoids a state update per
 * keystroke across what can be forty inputs on one page.
 */
export function FieldInput({
  field,
  value,
}: {
  field: Field;
  value: string | undefined;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-gold-300 uppercase">
        {field.label}
      </span>

      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          defaultValue={value ?? ""}
          rows={5}
          className={BASE}
        />
      ) : field.type === "image" ? (
        <ImageField name={field.name} value={value ?? ""} className={BASE} />
      ) : (
        <input
          name={field.name}
          defaultValue={value ?? ""}
          type="text"
          inputMode={field.type === "url" ? "url" : undefined}
          className={BASE}
        />
      )}

      {field.help ? (
        <span className="text-xs text-gold-100/50">{field.help}</span>
      ) : null}
    </label>
  );
}
