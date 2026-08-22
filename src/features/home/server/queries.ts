import type { Highlight } from "../types";

/**
 * Read path for the home feature. Server-only by convention: it lives under
 * `server/` and is imported exclusively by Server Components.
 *
 * Swap the static array for a database or `createHttpClient` call — every
 * caller already awaits this signature.
 */
export async function getHighlights(): Promise<readonly Highlight[]> {
  return [
    {
      id: "routing",
      title: "Thin routes",
      description:
        "Files under app/ only wire a URL to a feature. Composition and data live in features/.",
      href: "https://nextjs.org/docs/app/getting-started/project-structure",
    },
    {
      id: "features",
      title: "Vertical slices",
      description:
        "Each feature owns its components, server code, schemas and types behind one barrel export.",
      href: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    },
    {
      id: "boundaries",
      title: "Enforced boundaries",
      description:
        "lib/ knows nothing about features, features never import each other's internals.",
      href: "https://nextjs.org/docs/app/guides/data-security",
    },
  ];
}
