# CLAUDE.md — Itziar Martín Molina · 3D Artist Portfolio

> Read this file fully at the start of every session. Then read `DESIGN.md` and `EXTENSION_PLAN.md` if the task touches structure or new features.

## Sources of truth (in priority order)

1. **`EXTENSION_PLAN.md`** — current planning doc for the in-progress extension (new categories, multi-image stages, video support). Schema v2 lives here.
2. **`DESIGN.md`** — original design spec. Visual identity, CSS variables, BEM conventions, render-function names. If `DESIGN.md` and `EXTENSION_PLAN.md` disagree, the plan wins, but flag the conflict and propose an update to `DESIGN.md`.
3. **This file** — workflow + guardrails. Updated when conventions change.

If any of those docs are out of date with the code, **say so in your reply** and propose the update. Don't silently work around documentation drift.

---

## Project context

Static SPA portfolio for a 3D artist. Plain HTML + CSS + JavaScript. No frameworks, no bundlers, no npm dependencies. Three files: `index.html`, `styles.css`, `script.js`. Hosted on GitHub Pages.

All content is data-driven from a single `portfolioData` object at the top of `script.js`. **Never hardcode content in HTML.** Adding a new project should mean editing only `portfolioData` and dropping files into `assets/`.

---

## Architecture rules

### Data
- All content (artist info, categories, projects, stages, media) lives in `portfolioData` in `script.js`.
- Schema v2 supports two project types: `"staged"` (Characters / Creatures / Props — has named stages) and `"gallery"` (Makeup / Generalist — single mosaic, no stage labels).
- Each "stage" or "gallery" holds a `media` array of `{ type: "image" | "video", src, poster?, alt?, aspect? }` items.
- Never read content from the DOM. Always read from `portfolioData`.

### JavaScript
- Use `const` and `let`. Never `var`.
- Render functions return HTML strings (or DOM elements) — they never mutate the DOM directly.
- Naming convention:
  - `renderInfoSection(data)`
  - `renderCategorySection(category, projects)`
  - `renderProjectHero(project)`
  - `renderProjectBody(project)` — dispatches to staged or gallery
  - `renderProjectStages(project)` / `renderProjectGallery(project)`
  - `renderStageBlock(stage)` — label + media
  - `renderMediaMosaic(mediaArray)` / `renderMediaSolo(mediaItem)` / `renderMediaTile(mediaItem)`
  - `renderLightbox()` — mounted once globally
- Entry point is `init()`, called on `DOMContentLoaded`.
- No jQuery, no lodash, no external JS libraries unless explicitly requested.
- Lightbox, masonry, hover-play, keyboard nav, deep-linking — all vanilla.

### HTML
- Semantic elements: `<header>`, `<main>`, `<section>`, `<figure>`, `<nav>`, `<picture>`, `<video>`.
- Section IDs match `category.id` exactly (e.g., `id="characters"`).
- Asset paths are **always relative** (`assets/...`), never absolute (`/assets/...`) — required for GitHub Pages.
- No `<form>` elements unless explicitly asked.
- Every `<img>` has `loading="lazy"`, `decoding="async"`, and `width`/`height` attributes when known.
- Every `<video>` has `muted`, `loop`, `playsinline`, `preload="metadata"`, and a `poster` attribute.

### CSS
- All colors, spacing, fonts, transitions live in `:root` CSS custom properties. Never hardcode.
- BEM naming: `.block__element--modifier`. Class selectors only — no `id` selectors in CSS.
- No utility frameworks (no Tailwind, no Bootstrap).
- Mobile-first media queries (`min-width`).
- Animations use CSS `transition` / `@keyframes`. No JS animation libraries.

---

## CSS variables

```css
:root {
  --color-bg: #0e0e0e;
  --color-surface: #1a1a1a;
  --color-text: #f0f0f0;
  --color-text-muted: #888888;
  --color-accent: #c8a96e;
  --color-overlay: rgba(0, 0, 0, 0.55);

  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;

  --transition-default: 0.3s ease;
}
```

If you need a new variable, add it here. Don't introduce one-off literal values.

---

## Behaviors that must always be implemented correctly

### Hover overlays (info section, gallery tiles)
- Dark overlay appears on hover. `opacity: 0` → `opacity: 1` transition. Never `display: none`.
- Overlay is `position: absolute; inset: 0` inside a `position: relative` parent.

### Scroll-to-section
- Always use `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.
- Never use `<a href="#section">` anchor jumps.

### Tool icons
- `<img>` tags pointing to `assets/icons/[tool-slug].svg`. White via CSS filter:
  ```css
  .project-hero__tool-icon { filter: brightness(0) invert(1); opacity: 0.85; width: 32px; height: 32px; }
  ```

### Mosaic
- Pure CSS columns (`column-count: 3` desktop, `2` tablet, `1` mobile). No JS masonry library.
- Single-item stages render full-width centered, not as a 1-column mosaic.

### Video tiles
- Idle: poster visible, no autoplay, small "▶" badge.
- Hover (devices with hover): play muted + loop, reset on mouse-leave.
- No-hover devices (`@media (hover: none)`): autoplay muted + loop on tile.
- Hero videos: autoplay muted + loop unconditionally.

### Lightbox
- Click any mosaic item → fullscreen overlay with prev / next.
- Esc closes. Arrow keys navigate. Click backdrop closes.
- Videos in lightbox get `controls`.

### Reduced motion
- `@media (prefers-reduced-motion: reduce)` disables hover-video and overlay transitions.

### Accessibility
- Alt text on every image: `${project.name} — ${stage.label}` minimum.
- Focus-visible rings on tiles and lightbox controls.

---

## What you should never do

- Use `var`.
- Hardcode colors, fonts, spacing — use variables.
- Use `display: none/block` for overlay show/hide — use opacity.
- Use absolute paths starting with `/`.
- Use `id` selectors in CSS — classes only.
- Use `document.write()`.
- Add placeholder comments (`// TODO`, `// add logic here`) — write the implementation.
- Pull in a framework (React, Vue, etc.) or a UI library.
- Read content from the DOM; always read from `portfolioData`.
- Inline styles in JS-generated HTML, except dynamic values like `background-image: url(...)`.

---

## Adding things

**New project:**
1. Add an object to `portfolioData.projects`.
2. Drop assets in `assets/[category]/[project-slug]/`.
3. Done. No HTML changes, no CSS changes.

**New tool icon:**
1. Drop `assets/icons/[tool-slug].svg`.
2. Add the slug to the project's `tools` array.

**New category:**
1. Add an object to `portfolioData.categories`.
2. Drop a `assets/[id]/thumb.jpg`.
3. Update the `.info-tile:nth-child` grid in `styles.css` if the tile layout needs to change to accommodate a new count.

---

## Local dev & checks

```bash
# Local server
live-server --port=8080

# Lint
htmlhint index.html
stylelint styles.css

# Screenshot for visual verification
node test.js   # Playwright + Chromium → saves screenshot.png
```

Run `htmlhint` and `stylelint` after generating or editing files. Take a Playwright screenshot when verifying layout changes.

---

## Asset scripts (in `scripts/`)

- `reorganize-assets.sh` — applies the path manifest, renames + git-mvs files into the spec layout.
- `generate-posters.sh` — generates `*-poster.jpg` for every `.mp4` via ffmpeg.
- `optimize-videos.sh` — re-encodes videos to web-friendly H.264, no audio, ~5 MB cap.
- `fill-aspect-ratios.mjs` — emits `{path: aspect}` JSON to paste into `portfolioData`.

When adding new assets, run `generate-posters.sh` and `optimize-videos.sh` first, then update `portfolioData`.

---

## Git hygiene

- Commit per implementation-plan step (see `EXTENSION_PLAN.md` Section 8). One numbered item = one commit.
- Commit messages: imperative, short, prefixed with phase: `phase 3: add renderMediaMosaic`.
- Never commit raw unoptimized videos. Always optimize → commit.

---

## When in doubt

- Re-read `EXTENSION_PLAN.md`.
- If still unclear, ask before generating large code blocks. One clarifying question is cheaper than rewriting a hundred lines.
- If a change touches the data schema, the render-function signatures, or the visual language, update `DESIGN.md` or `EXTENSION_PLAN.md` in the same commit.
