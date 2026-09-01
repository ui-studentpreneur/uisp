/**
 * The shape of every editable thing on the site.
 *
 * This registry is the contract between three places that would otherwise
 * drift: the admin form renders from it, the seed script writes from it, and
 * the read layer falls back to it when a row is missing. Adding a field to a
 * section is an edit here and nothing else — no migration, no new form.
 *
 * Every value is a string. Nothing on this site needs a number or a boolean,
 * and keeping the payload uniform is what lets one `<input>` cover all of it.
 */

export type FieldType =
  /** Single line. */
  | "text"
  /** Multi-line prose. */
  | "textarea"
  /** Absolute URL, or a site-relative path. */
  | "url"
  /** An image: uploaded to R2 from the admin, or a path under `public/`. */
  | "image";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  /** Shown under the input. Use it for anything non-obvious. */
  help?: string;
};

/** A section that exists exactly once, such as a hero. */
export type BlockSpec = {
  /** Dotted path, unique across the site. Also the database key. */
  key: string;
  title: string;
  fields: readonly Field[];
  defaults: Readonly<Record<string, string>>;
};

/** An ordered list the editor can add to, reorder and delete from. */
export type CollectionSpec = {
  key: string;
  title: string;
  /** Singular noun for the "Add …" button and the delete confirmation. */
  itemLabel: string;
  fields: readonly Field[];
  defaults: readonly Readonly<Record<string, string>>[];
};

export type PageSpec = {
  /** URL segment inside the admin, e.g. `/admin/home`. */
  slug: string;
  title: string;
  /** The public page this edits, so the admin can link straight to it. */
  path: string;
  blocks: readonly BlockSpec[];
  collections: readonly CollectionSpec[];
};

/** Fields shared by every hero, which is the same component on four pages. */
export const heroFields: readonly Field[] = [
  { name: "heading", label: "Heading", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "ctaText", label: "Button label", type: "text" },
  {
    name: "ctaLink",
    label: "Button link",
    type: "url",
    help: "Registration form URL. Opens in a new tab.",
  },
  {
    name: "image",
    label: "Background image",
    type: "image",
  },
];

/** Fields shared by every speaker, assessor and mentor card. */
export const speakerFields: readonly Field[] = [
  {
    name: "group",
    label: "Group",
    type: "text",
    help: "Cards sharing a group render under one pill. Groups appear in the order their first card does.",
  },
  { name: "name", label: "Name", type: "text" },
  {
    name: "role",
    label: "Role",
    type: "text",
    help: "Ends with “of” or “at”.",
  },
  { name: "company", label: "Company", type: "text" },
  { name: "image", label: "Photo", type: "image" },
];
