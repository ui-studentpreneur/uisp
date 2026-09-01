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

`border-gradient-gold` draws a gold gradient border. CSS has no gradient `border-color`, so it is not a border: a `::before` is filled with the gradient and masked (`mask-composite: exclude`) down to a ring. It inherits `border-radius`, so it follows `rounded-full` automatically. Thickness is `--border-gradient-width` (default `2px`), with per-side overrides `--border-gradient-width-top`, `--border-gradient-width-x` and `--border-gradient-width-bottom`. Zeroing a side removes that edge — the ring band *is* that padding. Only these names are read; any other `--border-gradient-width-*` class will set a variable that nothing consumes. **The caller must establish the containing block** (`relative`, `absolute`, …) — the utility deliberately sets no `position`, because doing so silently overrode `absolute` on elements that needed it, with the winner decided by Tailwind's emit order.

`border-image` is the only true gradient-border property and it ignores `border-radius`, so it cannot produce a pill — do not switch to it.

Gradients are not a Tailwind namespace, so they are plain custom properties. Referencing the var directly is fine where a utility does not fit: `style={{ backgroundImage: "var(--gradient-gold)" }}`.

### Stacking gradients on one element

`text-gradient-*` works by painting a gradient into the element's **background** and clipping it to the glyphs. So a single element cannot carry both a gradient surface and gradient text — the surface would be clipped to the letters instead.

`components/ui/button.tsx` is the reference for combining all three. Each gradient gets its own layer:

| Layer | Mechanism |
|---|---|
| border | `border-gradient-gold` — masked `::before` ring |
| surface | `bg-gradient-donker` — the element's own `background-image` |
| label | `text-gradient-gold` — on an inner `<span>` |

Keeping the border off the background is what lets a state swap the surface (`active:bg-none active:bg-blue-500`) without destroying the border. Do not "simplify" this by folding the border into a double-background trick — the pressed state breaks.

Icons are not text, so `background-clip` cannot paint them; give them a solid colour (`[&_svg]:text-gold-400`).

Two traps when changing this:

- **Never transition `background-color` on an element whose surface is a gradient image.** The base sets no `background-color`, so a state that removes the image and fades the colour in shows the page through the gap — a white flash on press. Let the swap happen in a single paint; transition only `box-shadow`/`transform`.
- **`twMerge` treats `bg-gradient-*` as a background-*colour*.** `cn("bg-blue-800 bg-gradient-donker")` collapses to just `bg-gradient-donker`, so you cannot put a fallback colour underneath the gradient this way. Variant-prefixed classes are unaffected, which is why `active:bg-none active:bg-blue-500` survives. (The same rule is what makes `<Button className="bg-red-500" />` correctly override the surface.)

### Type

**Raleway** is the sans face, loaded in `app/layout.tsx` via `next/font/google` and bound to `--font-sans`, so `font-sans` (already on `<body>`) resolves to it. Geist Mono remains as `font-mono`.

### Why `@theme static`

`theme.css` uses `@theme static`, not plain `@theme`. Tailwind tree-shakes theme variables it does not see used, which would leave `var(--color-gold-500)` undefined for anything referencing it outside a utility class — inline styles, hand-written CSS, third-party components. `static` emits the whole ramp to `:root` unconditionally. The cost is a few hundred bytes; keep it.

Utilities themselves are still generated on demand, so unused classes cost nothing.

## Animation (GSAP)

`gsap` + `@gsap/react` are installed. Always use the `useGSAP()` hook, never a bare `useEffect` — it reverts tweens on unmount for you, and it must run client-side only.

```tsx
gsap.registerPlugin(useGSAP);            // once per module
useGSAP(() => { ... }, { dependencies: [open], scope: rootRef });
```

Always pass `scope` so selector strings cannot match elements outside the component. Wrap anything created in a later event handler in `contextSafe`.

`Navbar/use-collapse.ts` is the reference disclosure animation, shared by the mobile menu and its submenus. Four rules it encodes, all learned the hard way:

- **Padding goes on the inner `<ul>`, never the animated wrapper.** Padding on the wrapper stays visible at `height: 0`, so the panel never fully closes.
- **`autoAlpha`, not `opacity`.** It also sets `visibility: hidden`, which takes collapsed links out of the tab order.
- **`fromTo`, not `from`.** An interrupted open leaves a row at opacity 0; `from` would then animate 0 → 0 and the row never appears.
- **Kill the stagger on close** (`gsap.killTweensOf(rows)`). `overwrite` only covers the tween's own target, so row tweens survive a close that targets the wrapper.

A first-run ref sets the closed state with `gsap.set` instead of animating, and the collapsed classes (`invisible h-0`) are on the element so SSR markup renders closed — otherwise the menu flashes open before hydration.

Multiply every duration by `motionScale()` from `Navbar/motion.ts`, which returns `0` under `prefers-reduced-motion`. That lands on the same end state instantly rather than skipping the state change.

## Next.js 16 specifics

This version differs from older App Router material — check `node_modules/next/dist/docs/` before assuming.

- **Middleware is `proxy.ts`.** One file per project; concerns live in `src/lib/proxy/` and are composed in `src/proxy.ts`.
- **Request APIs are async, with no sync fallback.** `await cookies()`, `await headers()`, `await draftMode()`, `await props.params`, `await props.searchParams`.
- **Route props are global generated types.** `PageProps<'/blog/[slug]'>`, `LayoutProps<'/dashboard'>`, `RouteContext<'/api/x'>`. Run `pnpm exec next typegen` after adding or moving routes; a stale `.next/types` is the usual cause of a bogus `tsc` error.
- **`revalidateTag(tag)` now requires a cacheLife profile**: `revalidateTag('posts', 'max')`. For read-your-writes in a Server Action use `updateTag(tag)`; to refresh the client router use `refresh()`. `cacheLife`/`cacheTag` are stable (no `unstable_` prefix).
- **Cache Components (`cacheComponents: true`, the `use cache` directive) is off.** Caching follows the previous model — see `docs/01-app/02-guides/caching-without-cache-components.md`. Turning it on is a project-wide decision, not a per-feature one.
- **Route Handlers are uncached by default**; opt in per file with `export const dynamic = 'force-static'`.
- **React Compiler is enabled** (`reactCompiler: true`). Do not hand-add `useMemo`/`useCallback` for render performance. The lint rules are strict about `setState` inside effects — reach for `useSyncExternalStore` for external state (see `hooks/use-media-query.ts`).

## Content is in the database, not in the components

Every string, image path and list on the marketing pages and the footer is
editable at `/admin`. **Do not hardcode copy into a component.** A section that
needs new text needs a new field in the registry, not a literal in JSX.

```
src/config/content/     the registry — one file per page
├── types.ts            Field / BlockSpec / CollectionSpec / PageSpec
└── index.ts            assembles `contentPages` + key lookups

src/lib/content/        read path: readBlock, readItems, groupItems, mappers
src/lib/storage/        R2: SigV4 presigning, object keys, the browser uploader
src/lib/db/             drizzle schema + client (auth tables + content tables)
src/lib/auth/           Better Auth instance, session helpers
src/features/admin/     the editor UI and its Server Actions
```

Two shapes cover everything. A **block** is a section that exists once
(`home.hero`); its fields live in one `jsonb` payload. An **item** is one entry
in an ordered list (`home.timeline`); many rows, ordered by `position`. A block
key and a collection key may be the same string — `home.timeline` is both the
heading and the list — so they are looked up in separate maps.

`src/config/content/*` is the single source of truth for three consumers that
would otherwise drift: the admin form renders from it, `pnpm db:seed` writes
from it, and `readBlock`/`readItems` fall back to it when a row is missing.
**Adding a field is an edit to that file and nothing else** — no migration, no
new form. Every value is a string; nothing here needs a number or a boolean.

### Adding editable content

1. Add the field to the block, or the collection to the page, in
   `src/config/content/<page>.ts`, with its current value as the default.
2. Read it in that feature's `server/queries.ts` and pass it down as a prop.
3. `pnpm db:seed` to write the new defaults. Blocks are upserted; collections
   are only written when empty, so re-running never duplicates or reorders.

Components take content as props and know nothing about the database. The
`Record<string, string>` a row comes back as does **not** satisfy a type with
named required fields, so `server/queries.ts` names them — that mapping belongs
there and nowhere else.

### Images are uploaded, not typed

An `image` field is still one string, exactly like every other field — what
changed is where the string comes from. The admin's dropzone uploads the file
to Cloudflare R2 and writes back the public URL; the seeded `/hero.png` paths
under `public/` keep working untouched, and a component cannot tell the two
apart.

```
browser ──POST──▶ /api/admin/upload-url   presign (currentUser + type + size)
browser ──PUT───▶ <account>.r2.cloudflarestorage.com/<bucket>/<key>
browser ────────▶ writes the public URL into the field, form posts as before
```

The file never passes through the Next server, which keeps a photo clear of the
request-body limit every serverless host imposes. Consequences worth knowing:

- **The bucket needs CORS.** The PUT comes from the browser, so the bucket must
  allow `PUT` from the site's origin. Without it the upload fails before it
  starts, and the browser reports it as a network error.
- **`R2_PUBLIC_URL` is in `next.config.ts`.** `next/image` rejects any remote
  host not in `remotePatterns`, so the bucket origin is read there — the one
  place outside `src/config/env.ts` allowed to touch `process.env`. Change the
  bucket domain and the build must be re-run, not just the deploy.
- **R2 config is its own env reader.** `r2Env()` in `src/config/env.ts`, not
  part of `ServerEnv`: `EnvReader.finish` throws on any missing key in the
  object it is given, so folding these in would turn an unset bucket name into
  a blank home page instead of a failed upload.
- **`sigv4.ts` is hand-rolled and verified against AWS's published test
  vector.** If you touch it, re-check it against that vector before anything
  else — a wrong signature is a 403 from R2 with no other clue.
- Uploads are keyed `content/<year>/<month>/<slug>-<8 hex>.<ext>`, never the
  bare filename: a reused key would keep serving the old bytes from the CDN
  cache. Nothing deletes the old object when a field is repointed.

### Auth

Better Auth with email and password, one account, no sign-up route
(`disableSignUp: true`). Create or rotate it with `pnpm admin:create`, reading
`ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`.

`proxy.ts` bounces anonymous requests off `/admin`, but it only checks that a
cookie *exists* — the real gate is `requireUser()` in
`app/admin/(dashboard)/layout.tsx` and at the top of **every** Server Action. A
Server Action is a POST any client can craft; the proxy is a redirect, not a
guard.

Server Actions return `Result<T>`, so they are wired through `<ActionForm>`,
which consumes the value with `useActionState` — React's bare `action={fn}`
discards the return value. Hence the `(…bound, previousState, formData)` shape.

### Why the pages are still static

The public routes prerender at build time and every mutating action calls
`revalidatePath("/", "layout")`. That combination — not per-request rendering —
is what makes an edit appear immediately while keeping the pages static.
Verified end to end: save in the admin, and the prerendered page serves the new
copy on the next request.

### Database commands

```bash
pnpm db:push        # apply src/lib/db/schema.ts to the database
pnpm db:seed        # admin account + content defaults (idempotent)
pnpm admin:create   # create or reset the admin password
pnpm db:studio      # browse the data
```

The seed and admin scripts run under `--conditions=react-server` so the
`server-only` imports resolve to their empty build; without it that package
throws, because outside a bundler it cannot tell a script from a Client
Component.

## Checks

```bash
pnpm check      # typecheck + lint
pnpm build      # full production build
```

Run both before declaring work done.

### Verifying visual changes

**Do not render screenshots to check your work.** Launching a browser and reading images back burns a large amount of context for what is almost always a yes/no question. Verify from the compiled output instead — it is exact, and costs a few lines:

```bash
CSS=$(find .next/static -name "*.css" | head -1)
grep -o "\.rounded-full{[^}]*}" "$CSS"
grep -o "\.active\\\\:bg-blue-500:active{[^}]*}" "$CSS"
```

That confirms a class was generated and what it resolves to. For class-merging questions, run `twMerge` directly in `node -e`. Reach for a screenshot only when the user reports a visual bug that the CSS alone cannot explain, and say why you need one.
