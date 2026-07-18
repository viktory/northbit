# Northbit — Senior Software Engineer Portfolio

A single-page personal portfolio website for a Senior Software Engineer. Editorial-minimalist design with a "premium" aesthetic (grain overlays, cinematic glows, physics-based motion). One scrolling page composed of section components.

## Agent config: `.agents/` is the source of truth

`AGENTS.md` and the `.agents/` directory are the **canonical source of origin** for all agent configuration in this repo (skills, commands, and any future shared agent assets). Original files live **only** under `.agents/` — e.g. skills in `.agents/skills/`, commands in `.agents/commands/`.

Tool-specific directories (`.claude/`, `.cursor/`, …) must **never hold original files** — they contain only symlinks back into `.agents/`. This keeps every tool in sync from one source and avoids drift.

**Rule for agents:** whenever you add a new shareable category under `.agents/` (a `skills/` or `commands/` folder, etc.), mirror it into each supported tool by creating a directory symlink:

- Claude Code → `.claude/<category>`
- Cursor → `.cursor/<category>`

Requirements for every symlink:

- **Relative path, never absolute.** The link target is written relative to the symlink's own location and must resolve correctly from the repo root — e.g. from `.claude/skills` the target is `../.agents/skills`; from `.cursor/commands` it is `../.agents/commands`. Do not use absolute `/Users/...` paths.
- **Directory-level, not per-file.** Symlink the whole category folder so new skills/commands added under `.agents/` are picked up automatically without further changes.

Current links: `.claude/skills → ../.agents/skills`, `.cursor/skills → ../.agents/skills`.

> Note: Claude Code discovers skills at session start (restart to pick up new ones). Cursor natively reads `.cursor/rules/` and `.cursor/commands/`; a `.cursor/skills` link is kept for parity but may be inert until referenced.

## Tech Stack

- **Next.js 16.2.6** (App Router) — ⚠️ this is a newer version with breaking changes vs. common knowledge. See `AGENTS.md`: read `node_modules/next/dist/docs/` before writing Next.js code.
- **React 19.2** + **TypeScript 5** (strict mode)
- **Tailwind CSS v4** — config-in-CSS via `@theme` in `src/app/globals.css` (no `tailwind.config.js`). PostCSS plugin: `@tailwindcss/postcss`.
- **Framer Motion 12** (`framer-motion`) for animation
- **@phosphor-icons/react** for icons
- **`components`** — a private in-house design-system package linked via **yalc** (`file:.yalc/components`, not npm). Provides `ThemeProvider`, `THEMES`, `Carousel`, `Link`, `Pill`, `Heading`, `Text`, `Container`, `Grid`, `Flex`, `Divider`, `Code`, `Pre`, `Quote`, `Kbd`, `List`, `Highlight`, etc., plus `components/styles.css`.
- **Jest 30** + **Testing Library** (jsdom) for tests

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint (flat config, eslint.config.mjs)
npm test           # jest
npm run test:watch # jest --watch
npm run reinstall  # rm node_modules/components && npm install (refresh yalc-linked components pkg)
```

## Structure

```
src/
  app/
    layout.tsx        # root layout: metadata, global grain overlay, globals.css
    page.tsx          # composes all sections inside <ThemeProvider themeName={THEMES.EDITORIAL}>
    globals.css       # Tailwind v4 @theme tokens (colors, fonts) + base styles
    page.test.tsx     # example test (mocks the `components` package)
  components/
    layout/           # Navbar, Footer
    sections/         # Hero, Skills, Experience, Projects, Education, Contact (one per page section)
    ui/               # reusable primitives: Island, LogoCarousel, NarrativeBlock, SectionLabel
  data/               # content as JSON: experience.json, projects.json, skills.json, education.json
public/logos/         # brand SVGs used by LogoCarousel
.yalc/components/     # the yalc-linked design-system package (do not edit by hand)
.agents/skills/       # vendored agent skills (frontend-design, theme-factory, vercel-react-*); see skills-lock.json
```

## Conventions

- **Path alias:** `@/*` → `./src/*` (e.g. `@/components/sections/Hero`).
- **Content lives in `src/data/*.json`**, not hardcoded in components. Section components import their JSON and map over it. Edit the JSON to change portfolio content (companies, roles, projects, skills). The Experience data is split into `hero` (featured, narrative) and `archive` (accordion) arrays.
- **Client components:** section/UI components that use motion, state, or browser APIs start with `"use client";`. Keep them client-only when they need Framer Motion or hooks.
- **Design tokens:** use the semantic Tailwind colors from `globals.css` — `substrate`, `ink`, `accent`, `surface`, `border`, `muted`, `caption` (e.g. `bg-ink`, `text-accent`). Fonts: `--font-heading`, `--font-body`, `--font-mono`.
- **Theming:** the page is wrapped in `ThemeProvider` from `components` with `THEMES.EDITORIAL`; import `components/styles.css` alongside it.
- **Exports:** components are mostly named exports (`export function Hero()` / `export const Navbar`); `Education` is a default export. Match the existing file's style.
- **Tests:** colocated as `*.test.tsx`. Mock the `components` package in tests (see `page.test.tsx`) since it's an external build artifact.

## Gotchas

- The `components` package is **yalc-linked**, not from npm. If its exports look stale after an upstream change, run `npm run reinstall`. Don't edit files under `.yalc/`.
- Tailwind is **v4** — there is no `tailwind.config.js`; theme customization goes in the `@theme { ... }` block in `globals.css`.
- Next.js is a **newer major** than typical training data — verify APIs against `node_modules/next/dist/docs/` before using them (per `AGENTS.md`).
