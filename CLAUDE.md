# CLAUDE.md — Itziar Martín Molina · 3D Artist Portfolio

> Read this file fully at the start of every session. Then read `DESIGN.md` and `EXTENSION_PLAN.md` if the task touches structure or new features.

## Sources of truth (in priority order)

1. **`EXTENSION_PLAN.md`** — roadmap, answered product questions, and historical migration notes. When it disagrees with **running code**, treat the code as authoritative and update the plan (do not “spec the site back” to old proposals).
2. **`DESIGN.md`** — visual identity, layout contracts, CSS variables, BEM, render-function names aligned with the current build.
3. **This file** — workflow + guardrails. Updated when conventions change.
4. **`.github/copilot-instructions.md`** — short mirror of this file for GitHub Copilot; keep it in sync when conventions change.

If any of those docs are out of date with the code, **say so in your reply** and propose the update. Don't silently work around documentation drift.

---

## Project context

Static SPA portfolio for a 3D artist. Plain HTML + CSS + JavaScript. No frameworks, no bundlers, **no runtime npm dependencies** for the site (`index.html`, `styles.css`, `scripts.js`). Local checks may use Node tools (e.g. Playwright via `test.js`). Hosted on GitHub Pages.

All content is data-driven from a single `portfolioData` object at the top of `scripts.js`. **Never hardcode content in HTML.** Adding a new project should mean editing only `portfolioData` and dropping files into `assets/`.

---

## Architecture rules

### Data
- All content (artist info, categories, projects, stages, media) lives in `portfolioData` in `scripts.js`.
- Schema v2 supports two project types: `"staged"` (named stages + optional **highlights** strip) and `"gallery"` (single mosaic, no stage labels). Categories on disk include **`sfx`** (SFX Makeup & Sculpting) alongside **characters**, **creatures**, **props**, **generalist** — the old `makeup` id is redirected via hash (`#makeup` → `#sfx`) for bookmarks.
- Each stage or gallery holds a `media` array of `{ type: "image" | "video", src, poster?, alt?, aspect?, hasAudio? }` items. Hero media may set `hasAudio` for fullscreen playback; mosaic videos may too.
- **Category** objects may include `focalPoint` (or legacy `focalX` / `focalY`) for thumbnail background position, and `layout: "mosaic"` to render that category as a **card grid** with expandable project bodies instead of stacked full-width heroes.
- **Project** optional fields used in code: `description` (HTML allowed for links), `pinned` (sort to top within a category), `highlights` (array of media shown under the renders block for staged work), `rendersStageLabel` (`null` = no promoted renders block; string = match a stage `label`; omitted = auto-pick `/^render/i` or last stage), `openFullscreenOnly` (mosaic cards: click opens hero video fullscreen instead of expanding body), `hero.focalPoint`, `hero.hasAudio`.
- Never read content from the DOM. Always read from `portfolioData`.

### JavaScript
- Use `const` and `let`. Never `var`.
- Render functions return HTML strings (or DOM elements) — they never mutate the DOM directly.
- Naming convention:
  - `renderInfoSection(data)` — personal block + flagship + bottom tiles (wired in `renderInfoFlagship` / `renderInfoBottom`)
  - `renderContactSection(artist)` — `#contact` section body
  - `renderCategorySection(category, projects)` — dispatches to stacked heroes or `renderCategoryMosaic` when `category.layout === "mosaic"`
  - `renderProjectHero(project)` / `renderProjectBody(project)` / `renderProjectAbout(project)`
  - `renderProjectStages(project)` / `renderProjectGallery(project)`
  - `pickRendersStage(stages, rendersStageLabel)` / `renderRendersBlock` / `renderHighlightsBlock` / `renderStageAccordion`
  - `renderStageBlock(stage, projectName)` — label + media (non-accordion block)
  - `renderMediaMosaic(mediaArray)` / `renderMediaSolo(mediaItem)` / `renderMediaTile(mediaItem)` / `renderStageMedia`
  - `mountLightbox()` — creates the lightbox DOM and listeners once (there is no `renderLightbox()`)
  - `renderProjectStage(stage)` — legacy helper returning a single background-image div; not used for v2 bodies
- Entry point is `init()`, called on `DOMContentLoaded`.
- No jQuery, no lodash, no external JS libraries unless explicitly requested.
- Lightbox, masonry, hover-play, keyboard nav, deep-linking — all vanilla.

### HTML
- Semantic elements: `<header>`, `<main>`, `<section>`, `<figure>`, `<nav>`, `<picture>`, `<video>`.
- `index.html` declares `<header id="info-section">`, `<nav class="site-nav" id="site-nav">`, category `<section>` elements (including `generalist`, `sfx`), and `<section id="contact" class="contact-section">`. Section IDs for categories match `category.id` exactly.
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

Core tokens match `DESIGN.md`. The live `styles.css` `:root` also defines layout tokens (e.g. `--info-left-width`, `--nav-height`, `--color-tool-badge-bg`, `--project-hero-desktop-max-height`). If you need a new value, add a variable in `styles.css` and document it in `DESIGN.md` §7 — do not introduce one-off literals for repeated concepts.

---

## Behaviors that must always be implemented correctly

### Hover overlays (info section, gallery tiles)
- Dark overlay appears on hover. `opacity: 0` → `opacity: 1` transition. Never `display: none`.
- Overlay is `position: absolute; inset: 0` inside a `position: relative` parent.

### Scroll-to-section
- Always use `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.
- Never use `<a href="#section">` anchor jumps.

### Tool labels (hero + mosaic cards)
- Tools render as **text badges** (`.project-hero__tool` / `.project-card__tool` with `.project-hero__tool-fallback` / `.project-card__tool-label`). Display names come from `TOOL_DISPLAY_NAMES` in `scripts.js`; unknown slugs fall back to the raw string.
- Optional PNG icons under `assets/icons/[tool-slug].png` are **not** required for the current hero UI.

### Mosaic
- Pure CSS **grid** (`repeat(3, 1fr)` desktop, `2` columns ≤1024px, `1` column ≤640px). No JS masonry library.
- Single-item stages render full-width centered via `renderMediaSolo`, not as a lonely single-column grid cell.

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
1. Drop `assets/icons/[tool-slug].png`.
2. Add the slug to the project's `tools` array.

**New category:**
1. Add an object to `portfolioData.categories` (with `thumbnail`, `hoverText`, optional `focalPoint` / `layout: "mosaic"`).
2. Add a matching empty `<section id="[id]">` in `index.html` (structure change is rare; prefer updating the template once per new section).
3. If the landing tile set changes, update `renderInfoFlagship` / `renderInfoBottom` id lists and any related CSS in `styles.css` (desktop uses `.info-flagship` / `.info-bottom`, not only `nth-child` spans).

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
