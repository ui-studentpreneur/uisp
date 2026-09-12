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
  | "image"
  /** One of `options`. Still a string — this only narrows what can be typed. */
  | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  /** The choices for a `select`. Ignored by every other type. */
  options?: readonly string[];
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
  /**
   * Block key this list is edited under, so the admin shows it there instead
   * of with the other lists at the end of the page. Use it where the page
   * order is the thing the editor is reasoning about — an event's details sit
   * between its hero and its closing call to action, and a form that lists
   * them out of that order is a form you have to translate.
   *
   * Naming the block a list already shares a key with is the normal case and
   * not redundant: the pairing is never assumed, so leaving it off keeps the
   * list at the end.
   */
  after?: string;
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
