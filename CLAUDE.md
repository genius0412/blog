# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **yarn** (see `yarn.lock`).

- `yarn dev` — run the dev server (http://localhost:3000)
- `yarn build` — production build; statically generates portfolio detail routes and blog posts
- `yarn start` — serve the production build
- `yarn lint` — Next.js / ESLint (config extends `next/core-web-vitals`)

There is no test suite. To type-check in isolation, `npx tsc --noEmit` — but note `tsconfig.json` includes `.next/types/**`, so stale generated types from a previous build can produce phantom errors; `rm -rf .next` first for a clean signal on source only.

## Environment

The **blog** half requires an **Upstash Redis** connection. `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the environment (put them in `.env`, which is gitignored). The blog pages read Redis **at build time** (for static generation), so `yarn build` fails without these vars — even though the rest of the site (home, portfolio, detail, resume) builds fine without them. On Vercel the vars are set.

## Architecture

Dohun Kim's personal site — a warm, holistic profile (overview → depth) plus a blog. **Next.js 14 App Router** + TypeScript + TailwindCSS, deployed on Vercel. The `@/*` import alias maps to `./src/*`. The full intent is in `docs/overhaul-spec.md` — read it before making structural changes.

Light-only, warm theme. Design tokens (palette `bg`/`surface`/`border`/`ink`/`muted`/`accent`, `font-serif` Fraunces / `font-sans` Inter, `shadow-soft`/`shadow-lift`) live in `tailwind.config.ts`; fonts are wired via `next/font` in `src/app/layout.tsx`. Motion is **Framer Motion, used subtly** and must respect `prefers-reduced-motion` — always go through `src/components/motion/FadeIn.tsx` (it short-circuits to a static render when reduced motion is set) rather than calling `motion.*` directly in pages.

### Content data module (single source of truth)

`src/content/data.ts` holds every portfolio item's **facts** as typed data (`PortfolioItem`, `Profile`). Home (`app/page.tsx`) and Portfolio (`app/portfolio/page.tsx`) render entirely from it — nothing is hardcoded in JSX. Adding/editing an item is a data edit. Items are grouped by `category` (8 categories in `categoryMeta`) and sorted newest-first via `byNewest`.

### The detail layer (overview → depth) — the subtle part

Long-form prose lives in **MDX files** under `src/content/{research,projects,robotics}/<slug>.mdx` with the frontmatter schema in `src/content/mdx.ts` (`DetailMeta`). The folder is the route **group**; the filename is the **slug**.

- **Tier falls out of the data — there is no tier flag.** An item is **deep** (gets a card + "read more →" + a detail page) **iff** an MDX file with a matching `id` exists. Otherwise it's **rich** (card, has description/links) or **line** (bare row). This logic lives in `src/components/PortfolioItemView.tsx`. Dropping in a new MDX file silently promotes an item; **never** render an empty/padded detail page.
- `src/content/mdx.ts` is the **server-only** registry/loader (uses `fs` — only import from server components): `hasDetail(id)`, `detailHref(id)`, `loadDetail(group, slug)`, `detailParamsForGroup(group)`. MDX bodies are rendered with `markdown-to-jsx` (no MDX build step), parsed with `gray-matter`.
- **Each detail item has two routes** (Next.js parallel + intercepting routes):
  - Standalone page: `app/<group>/[slug]/page.tsx` → renders `DetailStandalone`. Shown on direct visit/refresh/new tab.
  - Intercepted modal: `app/@modal/(.)<group>/[slug]/page.tsx` → renders `DetailModalBody` (wraps `DetailContent` in `Modal`). Shown on in-site `<Link>` navigation.
  - The `@modal` parallel slot is declared in `app/layout.tsx` (the `modal` prop) with `app/@modal/default.tsx` returning `null`. `Modal` closes via ✕/backdrop/Esc by calling `router.back()`, so the URL restores.
  - **Both URLs are shareable.** Render order on a detail page (title+date → description → role → links → body → people → log) is enforced in `src/components/DetailContent.tsx`.

So a deep item exists in **three** places that must stay consistent: a `PortfolioItem` in `data.ts` (id), an `.mdx` file (same id, under one of the three groups), and — only if you add a new group — new route folders. The current groups are `research`, `projects`, `robotics` (note: a CAD item can be `category: "robotics"` in the data but live under the `projects/` route group; route group ≠ portfolio category).

### Blog (`/blog`) — Markdown + Redis views/likes

Separate from the portfolio/detail system. Posts are Markdown in `src/posts/*.md` (the **content** folder; the route folder is `app/blog`). **Adding a post = dropping a new `.md` file there.**

- `src/components/getPostMetadata.ts` / `getPostContent.ts` — `fs`-based loaders (server only); `slug` is the filename without `.md`.
- `app/blog/page.tsx` (list) and `app/blog/[slug]/page.tsx` (server: loads content + Redis counts) → `Post.tsx` (`"use client"` renderer, `markdown-to-jsx` + `.prose-warm`, like-toggle UI).
- **Views & likes (Upstash Redis):** keys `views:post:${slug}`, `likes:post:${slug}`, and `deduplicate:${hash}:${slug}:{views|likes}` where `hash` is SHA-256 of the client IP (`getHash` in `src/components/utils.ts`). API routes are edge runtime: `app/api/incrementViews/route.ts` (POST, once per IP+slug; called fire-and-forget by `UpdateViewCount.tsx`) and `app/api/likes/route.ts` (GET state / POST toggle — likes store a true/false dedup state since they're toggleable). `PostPreview.tsx` (server) reads the same keys directly for per-card counts.

### Résumé (`/resume`)

`app/resume/page.tsx` embeds a **static** `public/resume.pdf` (Dohun uploads it; no generation step) with a Download button. The file may not be present yet — the page shows a fallback note when the viewer is blank.

## Conventions

- Files use **tab indentation**.
- Some components type props as `any` (e.g. blog `Post.tsx`, `UpdateViewCount.tsx`) — match the surrounding style rather than over-engineering types unless asked.
- Keep content in `src/content/data.ts` / MDX, not in JSX. Keep motion behind `FadeIn`. These two rules are the backbone of the design.
