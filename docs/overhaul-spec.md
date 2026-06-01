# Overhaul Spec — `dohunkim.xyz`

A full overhaul of Dohun Kim's personal website. **One site, one codebase.** A warm, holistic personal profile for a general audience (colleges, programs, anyone Dohun shares the link with). It shows the full person — academics, robotics, math, competitive programming, research, software, music, athletics — and lets a visitor get a **general overview first, then go deeper** on anything that has more behind it.

---

## 1. Goals & tone

- **Audience:** college admissions readers, general programs, and anyone Dohun shares his link with. A professor cold-emailed for research can also be linked straight to a specific deep-dive page (see §5.5).
- **Tone:** warm, inviting, human, polished. **Not** "developer" or "terminal" styled. Personality is welcome.
- **Impression to leave:** a capable, self-directed student with a clear STEM spike *and* genuine breadth (music, athletics, leadership). Both are first-class — nothing is hidden.
- **Structure principle:** overview, then depth. The home and portfolio pages stay skimmable; richer items open into detail pages on click. Items without real depth never pretend to have it (see the tiers in §5.5).
- **Feel:** light background, friendly typography, a little motion, confident but not flashy.

---

## 2. Tech stack

- **Framework:** Next.js (App Router) + TypeScript. Keep the existing Next.js project; overhaul in place.
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion, used **subtly** — scroll fade-ins, gentle hover states, a light hero entrance. Respect `prefers-reduced-motion` (disable non-essential motion when set).
- **Content:** a typed data module (see §6) is the single source of truth. All page content renders from data, not hardcoded JSX, so adding an item is a one-line data edit. Long-form detail content lives in MDX files (see §5.5 / §6).
- **Résumé:** a **static PDF** that Dohun uploads. No auto-generation, no build step. See §7.
- **Blog:** keep existing blog; restyle to match. MDX or existing setup is fine.
- **Deploy:** assume Vercel (or current host).

---

## 3. Design system

### Palette (warm / holistic)
- Background: `#faf8f5` (warm off-white)
- Surface / card: `#ffffff` with a soft warm border `#ece7e0`
- Primary text: `#1f2421` (deep charcoal)
- Muted text: `#6b665f`
- **Accent: amber/terracotta `#c2683f`** — links, key highlights, hover states, small rules. Used sparingly.
- Accent-soft (backgrounds/tints): `#f4e6dd`

Provide dark mode only if trivial; otherwise ship light-only.

### Typography
- **Headings:** a warm, characterful serif or humanist sans — e.g. **Fraunces** (preferred, friendly serif) or **General Sans** / **Geist Sans**.
- **Body:** clean, readable sans — **Inter** or **Geist Sans**.
- Generous line height and spacing. Typography-led layout.

### Components
- Bordered/soft-shadow cards for sections and items.
- Skill/interest "pills."
- Optional simple timeline for multi-year activities.
- A stat strip on the home page.
- Buttons: solid amber primary, ghost/outline secondary.

### Motion (subtle)
- Hero: gentle fade/slide-up on load.
- Sections: fade-in on scroll (once, not repeating).
- Cards/links: soft hover lift + accent on hover.
- No autoplaying loops, no heavy parallax.

---

## 4. Site map

- `/` — Home: hero + intro + stat strip + section previews + featured highlights + footer.
- `/portfolio` — full overview page; all categories, sticky jump-nav, newest-first within each section.
- **Detail routes** — per-item deep dives, e.g. `/research/gozinta-boxes`, `/projects/decode-pto`. Open as a **modal** from within the site and as a **standalone page** on direct visit. See §5.5.
- `/resume` — displays the uploaded résumé PDF with a download button. See §7.
- `/blog` and `/blog/[slug]` — existing blog, restyled.
- (No separate `/about`; bio folds into the home hero/intro.)

---

## 5. Page specifications

### 5.1 Home (`/`)

Top to bottom:

1. **Hero**
   - Name: **Dohun Kim**.
   - A short tagline conveying range without leading with "developer" (final copy at Dohun's discretion; provide an editable string).
   - One-line positioning sentence: high school junior in Weston, MA.
   - Primary links/buttons: **Résumé** (→ `/resume`), **GitHub** (`github.com/genius0412`), **Email** (`dohunkimofficial@gmail.com`).
   - Gentle entrance animation; warm background, maybe a soft amber accent shape — restrained.

2. **Intro blurb** (2–4 sentences)
   - A junior at Weston High School (4.0) doing published math research through MIT PRIMES STEP, co-captaining FTC robotics, competing in math and informatics — and singing a cappella and playing tennis. Warm and direct.

3. **Stat strip** (4–6 quick credibility numbers) — pick the 5 strongest, e.g.:
   - `2` published papers (arXiv)
   - FTC Worlds — Motivate Award, 2nd
   - USACO **Gold**
   - AMC 10A **141/150**
   - Codeforces **1737**

4. **Section previews** — cards linking into `/portfolio` anchors: Research · Robotics · Mathematics · Competitive Programming · Software · Music · Athletics. Each: title, one-liner, "view →".

5. **Featured highlights** (2–3, given visual weight)
   - Published research (the two arXiv papers).
   - FTC World Championship — Motivate Award, 2nd place.

6. **Footer** — email, GitHub, "Built with Next.js." Quiet.

### 5.2 Portfolio (`/portfolio`)

- **Sticky jump-nav** with anchor links to each section.
- Sections, **newest-first within each**: Research & Academic · Robotics · Mathematics · Competitive Programming · Software · Music · Athletics · Education.
- Each item: title, role (if any), dates, 1–2 sentence description, links (arXiv, GitHub, Onshape, YouTube) where present, and a **"read more →"** affordance **only if** the item has a detail page (see §5.5).
- All items render from the data module (§6).

### 5.3 Résumé (`/resume`)
See §7. Embeds the uploaded PDF in a simple viewer with a prominent **Download** button. Plain by design.

### 5.4 Blog
Keep posts; restyle list and post pages to match the warm system (fonts, spacing, accent).

### 5.5 Detail layer (overview → depth)

Some items carry more than fits on a card — a paper write-up, a CAD/engineering explanation, a leadership story, an optional log. These do **not** sit inline on the home/portfolio pages. Instead:

- Each deep item has its **own route** (e.g. `/projects/decode-pto`, `/research/gozinta-boxes`).
- Clicking it **from within the site** opens that route as a **modal overlay** (visitor stays in place).
- Visiting the URL **directly** (shared link, refresh, new tab) renders a **full standalone page**.
- Implement with Next.js App Router **intercepting + parallel routes**: real page at `app/<group>/[slug]/page.tsx`; intercepted modal at `app/@modal/(.)<group>/[slug]/page.tsx`; a `@modal` parallel slot in the root layout defaulting to nothing. The URL updates so the modal is shareable too; closable via ✕, backdrop click, and Esc. Quiet fade only; respect `prefers-reduced-motion`.
- **Why both:** the modal gives smooth in-page browsing; the standalone URL means Dohun can link someone (e.g. a professor) straight to a single write-up that opens as a clean page.

**Three tiers of item (the tier falls out of the data; no separate flag to maintain):**
1. **Line item** — a single row, no card, no link-out. Facts speak for themselves (e.g. MMEA Districts, tennis, older results).
2. **Rich item** — a full card with facts, dates, and external links, but **no "read more"** because the card already says everything (e.g. the "500 Miles" solo).
3. **Deep item** — has an MDX write-up → shows "read more →" and opens a detail page (e.g. papers, FTC leadership, a CAD project, Empower).

**Rule:** an item gets a detail page **iff** a matching MDX file exists. **No MDX file → no "read more," no modal.** Adding an MDX file later quietly promotes a rich item to a deep item with no other change. Never render an empty/padded detail page.

**Voice:** detail pages here are **warm and narrative** (what Dohun built, led, learned, contributed) — leadership- and growth-flavored, not a dry technical spec. Technical write-ups (papers, CAD) are welcome but written for an intelligent general reader.

See §6 for the MDX frontmatter schema and the starter set of detail pages to scaffold as placeholders.

---

## 6. Content data module (single source of truth)

A typed data module (e.g. `content/data.ts`) holds every item's **facts**. Long-form prose for deep items lives in **MDX files** (e.g. `content/research/gozinta-boxes.mdx`) linked by `id`. Pages render from this; nothing is hardcoded in JSX.

### Suggested types

```ts
type Link = { label: string; href: string };

type PortfolioItem = {
  id: string;
  title: string;
  org?: string;
  role?: string;
  start?: string;        // "2024"
  end?: string;          // "present"
  description?: string;  // 1–2 sentence card summary
  links?: Link[];
  tags?: string[];
  category:
    | "research" | "robotics" | "math" | "cp"
    | "software" | "music" | "athletics" | "education";
  featured?: boolean;    // surfaced on the home page
  // No detailSlug flag needed: an item is "deep" iff an MDX file with this id exists.
};

type Profile = {
  name: string;
  location: string;
  email: string;
  github: string;
  skills: string[];
  stats: { label: string; value: string }[];
};
```

### Detail-page MDX frontmatter (shared schema)

All deep-item MDX files use one schema; every long field is **optional** and absent fields render nothing.

```yaml
---
id: decode-pto                 # matches the PortfolioItem id
title: "DECODE — Clutch PTO Lift & Drivetrain"
kind: project                  # project | research | other
date: "2025–2026"
description: "One-line summary."
role: "What Dohun specifically did."
people:                        # collaborators / credits — optional
  - "Teammate — slides, bellypan, string guide, magnet mount"
links:
  - label: "Onshape CAD"
    href: "https://cad.onshape.com/..."
log:                           # OPTIONAL work log — omit if none
  - date: "2025-09-15"
    entry: "..."
---

<!-- MDX body: the warm, narrative explanation. May embed images / Onshape iframes. -->
```

Render order on a detail page: title + date → description → role → links → **body (explanation)** → people (if any) → log (if any).

**Placeholders:** scaffold each starter detail page with clearly-marked placeholder prose (e.g. `> _Placeholder: to be written by Dohun._`). **Do not invent** technical explanations of the papers or CAD. Starter detail pages: `research/gozinta-boxes`, `research/chip-firing`, `projects/decode-pto`, `projects/into-the-deep`, `robotics/ftc-leadership`, `projects/empower`. Others added later by dropping in an MDX file with a matching `id`.

### Content to encode (items)

> These facts should match Dohun's final résumé. Verify against it before shipping.

**Research & Academic** (`research`)
- MIT PRIMES STEP — Senior Group math research, 2024–2025. `featured`. (deep)
- *Mathematics of Gozinta Boxes* — `https://arxiv.org/abs/2508.18277`. `featured`. (deep)
- *Chip-Firing in Infinite k-ary Trees* — `https://arxiv.org/abs/2501.06675`. `featured`. (deep)

**Robotics** (`robotics`)
- FTC #22489 Galactic Narwhal Chicken Effect – Diamond, Weston — team member 2024–2025, **Co-Captain 2025–2026** (team active 2024–2026). (deep — leadership story)
- FTC World Championship (Jemison Division) — **Motivate Award, 2nd place**. `featured`.
- FTC MA State Championship — Winning Alliance Captain (event role).
- Multinational Tech Invitational (formerly Maryland Tech Invitational) — invited; reached playoffs (top 16).
- Advanced to the Michiana Premier Event.
- Weston Robotics — Planning Council & Program-Wide Mentor, 2026–present.
- Volunteer FLL Mentor — teams "Butterfly Effect" & "LegoImpossible," 2024–2026.
- CAD / mechanical design (deep): *Into the Deep* (2024–2025) full robot CAD — Onshape `https://cad.onshape.com/documents/2e5ebebe43c247d2291879a2/w/2564d9489293bfa6bdffefc9/e/33d929603717268545ab0c75`; *DECODE* (2025–2026) — designed the drivetrain and a clutch power-take-off (PTO) lift system (teammates: slides, bellypan, string guide, magnet mount) — Onshape `https://cad.onshape.com/documents/8dbb6ec5b64ba5d9556668ce/w/7242710ea56febb23e213c1a/e/cf81280e74517a36b814bdf1`.

**Mathematics** (`math`)
- AIME II 2025 — 9/15.
- AMC 10A 2024 — 141/150. `featured`.
- MAML Olympiad Level 1 — 2nd in Massachusetts (24/25).
- IMLEM (Weston MS) — #1 individual, perfect scores across all 5 meets, 2022–2023.
- (Optional, compact) AMC 12B 2023 — 102/150; AMC 10A 2023 — 117.5/150 (both advanced to AIME).

**Competitive Programming** (`cp`)
- USACO 2026 — advanced to **Gold** (900/1000). `featured`.
- Codeforces (genius0412) — rating **1737** — `https://codeforces.com/profile/genius0412`.
- MITIT Winter 2023 — 2nd, Beginner Division (team).
- USACO.guide Informatics Tournament 2024 — 8th, solo.
- Korean Olympiad in Informatics — Silver (National 2021; Regional 2021 & 2022).
- (Optional) National Software Thinking Olympiad — Bronze (2019); USACO Silver, perfect 1000 (2019).

**Software** (`software`)
- Empower Initiative — Website Coordinator; `https://empowerinit.org` · `https://github.com/genius0412/empower`. (deep)
- FTCDesign — **Major Contributor** — `https://www.ftcdesign.org`. *(confirm one-line description with Dohun.)*
- Configlib — **Major Contributor** — `https://configlib.framer.website`. *(confirm one-line description with Dohun.)*
- A11y Checker — accessibility checker; 2nd place, Congressional App Challenge (Office of Rep. Katherine Clark) — `https://youtu.be/qvqzYHCsRM8`.
- Voya — choose-your-own-adventure study game — `https://voya.dohunkim.xyz`.

**Music** (`music`)
- Weston Town Criers (a cappella) — soloist on "500 Miles," 2025–2026. (rich, no detail page)
- Concert Choir & Jazz Choir, Weston High School.
- MMEA Districts — Junior Districts 7th (tenor) & 8th (bass); Senior Districts 9th & 10th (bass). (line items)

**Athletics** (`athletics`)
- Weston High School tennis. (line item)

**Education** (`education`)
- Weston High School — 2024–present, GPA 4.0 UW. AP coursework/exams: Physics C Mechanics & E&M (A); Calculus BC (5); Computer Science A (5); Statistics (A); World History (A).
- Hanyang University — Gifted & Talented Center for Informatics, Seoul (Advanced Course in Informatics), 2020–2021: graduated #1 of 95 and youngest in cohort; selected for a 1-on-1 AI course under Prof. Ki Hyuk Sung.

**Profile**
- name: Dohun Kim · location: Weston, MA · email: `dohunkimofficial@gmail.com` · github: `genius0412`.
- skills — Programming: C/C++, JavaScript/TypeScript, Python, Java. Languages: English (Fluent), Korean (Fluent), Spanish (Intermediate). Frameworks/Tools: React, Next.js, Onshape (CAD).
- stats: pick 5 strongest (see §5.1).

---

## 7. Résumé (static PDF)

- Dohun maintains the résumé himself (currently a LaTeX-built PDF) and **uploads `resume.pdf`** into the repo (e.g. `public/resume.pdf`). **No auto-generation, no build step, no print-CSS route.**
- `/resume` shows the PDF in a simple inline viewer (e.g. an `<embed>`/`<iframe>` of `public/resume.pdf`, or a styled "open / download" card with a thumbnail) plus a prominent **Download** button linking to `/resume.pdf`.
- The header's **Résumé** button links to `/resume`.
- Keep the page plain and document-first; it should feel part of the site (same fonts/spacing) but carry no animation or cards beyond the viewer + download control.
- To update the résumé later, Dohun replaces `public/resume.pdf` — nothing else changes.

---

## 8. Acceptance checklist

- [ ] One codebase; no references to any subdomain or second site.
- [ ] Light warm theme with amber accent; typography-led; subtle motion respecting reduced-motion.
- [ ] Home: hero, intro, stat strip (incl. Codeforces 1737), section previews, featured highlights, footer.
- [ ] Portfolio: sticky jump-nav, all 8 sections, newest-first, links wired (arXiv, GitHub, Onshape, YouTube, Codeforces).
- [ ] Detail layer: per-item routes open as **modal** in-site and **standalone page** on direct visit; URL shareable both ways.
- [ ] Tiering enforced: line / rich / deep; **no MDX file → no "read more"**; no empty detail pages.
- [ ] Detail content in MDX using the shared frontmatter schema; warm/narrative voice; starter pages scaffolded with **placeholders** (no invented paper/CAD explanations).
- [ ] All content rendered from the typed data module; facts match the final résumé.
- [ ] `/resume` displays the uploaded `public/resume.pdf` with a Download button; no generation step.
- [ ] Blog restyled to match.