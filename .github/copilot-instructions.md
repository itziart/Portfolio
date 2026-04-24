# GitHub Copilot Instructions — Itziar Martín Molina · 3D Artist Portfolio

> Prefer **`CLAUDE.md`** at the repo root for the full workflow. This file is a shorter mirror for Copilot.

## Project context

- Static SPA: **plain HTML + CSS + JavaScript**. No frameworks, no bundler for the site.
- **Runtime files:** `index.html`, `styles.css`, `scripts.js`. Hosted on **GitHub Pages**; asset paths must be **relative** (`assets/...`, never `/assets/...`).
- All content comes from **`portfolioData`** at the top of `scripts.js`. Do not hardcode portfolio content in HTML.
- **`DESIGN.md`** — layout, BEM, CSS variables, render contracts. **`EXTENSION_PLAN.md`** — roadmap and historical Q&A (if it disagrees with code, follow **code** and update docs).

## HTML structure (shell)

- `#info-section` (header), `#site-nav` (sticky nav), `<main>` category `<section>` elements (`characters`, `creatures`, `props`, `generalist`, `sfx`), `#contact`.
- Category sections are filled by JS; ids must match `category.id`. Legacy hashes `#makeup` / `#sculpture` redirect to `#sfx` in `init()`.

## Data rules

- **Project types:** `"staged"` (stages + optional `highlights`, `rendersStageLabel`) and `"gallery"` (top-level `media`).
- **Categories:** `generalist` and `sfx` use **`layout: "mosaic"`** → card grid + expandable bodies. Others use stacked heroes.
- **Media:** `{ type: "image" | "video", src, poster?, aspect?, hasAudio? }`. `aspect` = width ÷ height (strongly recommended).
- Optional: `description` (HTML allowed), `pinned`, `openFullscreenOnly`, `hero.hasAudio`.

## JavaScript conventions

- `const` / `let` only; never `var`.
- Render helpers return **HTML strings**; `init()` assigns `innerHTML` and attaches listeners.
- Key symbols: `mountLightbox`, `renderCategorySection` / `renderCategoryMosaic`, `renderProjectHero`, `renderProjectBody`, `renderProjectStages`, `renderProjectGallery`, `normalizeStage`, `normalizeProject`.
- Entry: `init()` on `DOMContentLoaded`.

## CSS conventions

- **Variables in `:root`** for colors, spacing, fonts — see `styles.css` (includes nav, tool badges, hero layout tokens beyond the short list in older docs).
- **BEM:** `.block__element--modifier`. **No `id` selectors** in CSS (exception: `#info-section` may appear for viewport lock; prefer extending via classes when touching styles).
- **Mosaic:** `.media-mosaic` is a **CSS grid** (3 → 2 → 1 columns), not `column-count`.

## Behaviors (must preserve)

- **Overlays:** opacity transitions, not `display: none/block` toggles.
- **Scroll:** `scrollIntoView({ behavior: 'smooth', block: 'start' })` for tiles and nav (nav uses `preventDefault` on links).
- **Video tiles:** hover-play on pointer devices; `@media (hover: none)` may autoplay; respect `prefers-reduced-motion`.
- **Lightbox:** Esc, arrows, backdrop close; videos get controls in the viewer.
- **Tools:** text badges from `TOOL_DISPLAY_NAMES`, not required PNG icons in the hero.

## Adding a project

1. Add an object to `portfolioData.projects` with correct `category` and `type`.
2. Place files under `assets/[category]/[project-slug]/` (or paths referenced in data).
3. Regenerate posters / optimize video per `scripts/` when adding `.mp4`.

## Local checks

```bash
live-server --port=8080
htmlhint index.html
stylelint styles.css
node test.js   # Playwright screenshot / smoke if configured
```

Run **htmlhint** and **stylelint** after editing HTML/CSS.
