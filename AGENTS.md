<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Architecture

Feature-sliced App Router project. Three ideas carry everything else:

1. **`app/` is routing only.** A route file wires a URL to a feature and does nothing else.
2. **Features are vertical slices.** A feature owns its UI, server code, schemas and types, and exposes them through one barrel.
3. **Dependencies point one way.** `app/ → features/ → components/ → lib/`. Never the reverse.

## Map

```
src/
├── app/                    ROUTING ONLY — thin files, no business logic
│   ├── layout.tsx          root layout: html/body, fonts, metadata, providers
│   ├── error.tsx           segment error boundary (client)
│   ├── global-error.tsx    last-resort boundary, renders its own html/body
│   ├── loading.tsx         suspense fallback
│   ├── not-found.tsx       404 UI
│   ├── (marketing)/        route group — URL-invisible, own layout
│   │   ├── layout.tsx      header + main + footer shell
│   │   └── page.tsx        `/` → renders <HomeView /> and nothing else
│   └── api/health/route.ts Route Handler
│
├── features/               VERTICAL SLICES — where the app actually lives
│   └── home/
│       ├── components/     feature UI, incl. the screen-level *-view.tsx
│       ├── server/         queries.ts (reads) + actions.ts (writes) — server only
│       ├── types.ts        types owned by this feature
│       └── index.ts        PUBLIC BARREL — the only legal import path
│
├── components/             CROSS-FEATURE UI — no business logic
│   ├── ui/                 primitives: Button, Card, Container
│   ├── layout/             shell chrome: SiteHeader, SiteFooter, NavLink
│   └── providers/          the single "use client" boundary for context
│
├── lib/                    FRAMEWORK-AGNOSTIC — knows nothing about features
│   ├── api/                createHttpClient, ApiError
│   ├── proxy/              proxy concerns, composed by src/proxy.ts
│   ├── utils/              cn, formatters, Result
│   └── validation/         env parsing (swap for zod when it lands)
│
├── config/                 STATIC CONFIG — env, routes, navigation, site meta
├── hooks/                  cross-feature client hooks
├── types/                  types shared by more than one feature
├── styles/                 DESIGN TOKENS
│   ├── globals.css         Tailwind entry, semantic colours, dark mode
│   ├── theme.css           gold/blue ramps, gradient custom properties
│   └── utilities.css       @utility gradient classes
└── proxy.ts                Next 16 middleware (composition root only)
```

## Layer rules

| Layer | May import | Must never import |
|---|---|---|
| `app/` | `features/`, `components/`, `config/` | another route's internals |
| `features/<x>/` | `components/`, `lib/`, `config/`, `hooks/`, `types/` | `app/`, or another feature's internals |
| `components/` | `lib/`, `config/`, `hooks/` | `features/`, `app/` |
| `lib/` | other `lib/` modules | everything above it |
| `config/` | `lib/validation` | everything else |

Cross-feature use goes through the barrel: `import { HomeView } from "@/features/home"` — never `@/features/home/components/...`. If two features need the same thing, it moves down to `components/` or `lib/`; it does not travel sideways.

`@/*` maps to `src/*` (see `tsconfig.json`). Use it for every non-sibling import; relative paths only within the same folder or feature.

## File size budget

No file should be long enough that you scroll to understand it. Current max in the repo is 65 lines.

- **Component: ~150 lines.** Past that, extract the sub-tree into a sibling file.
- **Module: ~200 lines.** Past that, split by responsibility, not alphabetically.
- **Route file: ~50 lines.** A `page.tsx` that grew logic means that logic belongs in a feature.
- **One exported component per file**, named for the file. `card.tsx` may also export `CardTitle`/`CardDescription` — parts of one primitive, not unrelated components.

## Naming

- Files and folders: `kebab-case` (`site-header.tsx`, `use-media-query.ts`).
- Components: `PascalCase`. Hooks: `useThing`. Types: `PascalCase`.
- Screen-level feature component: `<name>-view.tsx`, exported as `<Name>View`.
- Barrels (`index.ts`) re-export only; they never contain logic.

## Adding a feature

```
src/features/<name>/
├── components/<name>-view.tsx    screen-level, composes the rest
├── server/queries.ts             reads
├── server/actions.ts             writes — "use server" at the top of the file
├── types.ts
└── index.ts                      export only what the outside needs
```

Then the route is one line of composition:

```tsx
// src/app/(group)/<path>/page.tsx
import { ThingView } from "@/features/thing";

export default function ThingPage() {
  return <ThingView />;
}
```

Add the path to `src/config/routes.ts` and link via `routes.*` — never a hardcoded string.

## Conventions that matter here

- **Server Components by default.** `"use client"` goes on the smallest leaf that needs it. Context providers nest inside `components/providers/app-providers.tsx` so layouts stay server-rendered.
- **`server/` is a boundary.** Only Server Components and Server Actions import it. Anything in a `server/` folder may touch secrets; nothing there may be imported by a `"use client"` file. (Add the `server-only` package and import it at the top of those files if you want the build to enforce this — it is not currently a dependency.)
- **Server Actions return `Result<T>`**, not thrown errors — a thrown error reaches the client as an opaque digest in production. See `src/lib/utils/result.ts`.
- **`process.env` is read in `src/config/env.ts` only.** `clientEnv` is safe anywhere; `serverEnv()` is a lazy getter so a missing secret fails on first server use instead of breaking the client build. New variables get documented in `.env.example`.
- **No `fetch` inside components.** Data access goes through `features/<x>/server/queries.ts`, which may use `createHttpClient` from `lib/api`.
- **Styling is Tailwind + `cn()`.** Variant maps live at the top of the component file (see `components/ui/button.tsx`). Use design tokens, never raw hex — see [Design tokens](#design-tokens).
- **Tests colocate** as `<file>.test.ts(x)` next to the source. No runner is installed yet.

## Design tokens

Tailwind v4 has no JS config — tokens are CSS, split across three files:

| File | Holds |
|---|---|
| `styles/theme.css` | brand ramps (`@theme static`) + gradient custom properties |
| `styles/utilities.css` | `@utility` gradient classes |
| `styles/globals.css` | entry: imports the above, semantic `background`/`foreground`, dark mode |

**Never write a raw hex value in a component.** If a colour is missing from the ramp, add it to `theme.css`.

### Colour

Two ramps, `50`–`900`, each generating the full utility set (`bg-`, `text-`, `border-`, `ring-`, `from-`/`via-`/`to-`, …):

- **`gold-*`** — primary brand, warm peach. `gold-500` (`#f5b899`) is the base.
- **`blue-*`** — surfaces and text, deep navy. `blue-500` (`#1f3552`) is the base.

```tsx
<div className="bg-blue-900 text-gold-100 border-gold-700" />
```

Semantic aliases `bg-background` / `text-foreground` resolve to white on `blue-900` in light mode and `blue-900` on `blue-50` in dark, switching on `prefers-color-scheme`. Prefer them for page-level surfaces so dark mode keeps working; use the ramps directly for deliberate brand accents.

### Gradients

Declared as `--gradient-gold` and `--gradient-donker` in `theme.css`, exposed through four utilities:

```tsx
<section className="bg-gradient-donker" />   {/* background */}
<h1 className="text-gradient-gold" />        {/* gradient-filled text */}
```

Also `bg-gradient-gold` and `text-gradient-donker`. The `text-gradient-*` utilities set `background-clip: text` with a transparent colour — give the element real text, and note it cannot also carry a background.

Gradients are not a Tailwind namespace, so they are plain custom properties. Referencing the var directly is fine where a utility does not fit: `style={{ backgroundImage: "var(--gradient-gold)" }}`.

### Type

**Raleway** is the sans face, loaded in `app/layout.tsx` via `next/font/google` and bound to `--font-sans`, so `font-sans` (already on `<body>`) resolves to it. Geist Mono remains as `font-mono`.

### Why `@theme static`

`theme.css` uses `@theme static`, not plain `@theme`. Tailwind tree-shakes theme variables it does not see used, which would leave `var(--color-gold-500)` undefined for anything referencing it outside a utility class — inline styles, hand-written CSS, third-party components. `static` emits the whole ramp to `:root` unconditionally. The cost is a few hundred bytes; keep it.

Utilities themselves are still generated on demand, so unused classes cost nothing.

## Next.js 16 specifics

This version differs from older App Router material — check `node_modules/next/dist/docs/` before assuming.

- **Middleware is `proxy.ts`.** One file per project; concerns live in `src/lib/proxy/` and are composed in `src/proxy.ts`.
- **Request APIs are async, with no sync fallback.** `await cookies()`, `await headers()`, `await draftMode()`, `await props.params`, `await props.searchParams`.
- **Route props are global generated types.** `PageProps<'/blog/[slug]'>`, `LayoutProps<'/dashboard'>`, `RouteContext<'/api/x'>`. Run `pnpm exec next typegen` after adding or moving routes; a stale `.next/types` is the usual cause of a bogus `tsc` error.
- **`revalidateTag(tag)` now requires a cacheLife profile**: `revalidateTag('posts', 'max')`. For read-your-writes in a Server Action use `updateTag(tag)`; to refresh the client router use `refresh()`. `cacheLife`/`cacheTag` are stable (no `unstable_` prefix).
- **Cache Components (`cacheComponents: true`, the `use cache` directive) is off.** Caching follows the previous model — see `docs/01-app/02-guides/caching-without-cache-components.md`. Turning it on is a project-wide decision, not a per-feature one.
- **Route Handlers are uncached by default**; opt in per file with `export const dynamic = 'force-static'`.
- **React Compiler is enabled** (`reactCompiler: true`). Do not hand-add `useMemo`/`useCallback` for render performance. The lint rules are strict about `setState` inside effects — reach for `useSyncExternalStore` for external state (see `hooks/use-media-query.ts`).

## Checks

```bash
pnpm check      # typecheck + lint
pnpm build      # full production build
```

Run both before declaring work done.
