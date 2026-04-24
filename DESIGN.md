# Portfolio Design Document — Itziar Martín Molina · 3D Artist

> **This file is the source of truth for visual identity, CSS conventions, and render-function contracts.** Keep it open while developing. For roadmap and answered product questions, see `EXTENSION_PLAN.md`. If the two disagree with **the shipped code**, update the docs to match the code.

---

## 1. Project Overview

A **static Single Page Application** portfolio for a 3D artist.  
Hosted on **GitHub Pages**. No framework — plain HTML + CSS + JS.  
One HTML file (`index.html`), one CSS file (`styles.css`), one JS file (`scripts.js`). All content is data-driven from a JS object.

**File structure (representative):**
```
portfolio/
├── index.html
├── styles.css
├── scripts.js
├── DESIGN.md
├── EXTENSION_PLAN.md
├── CLAUDE.md
├── .github/copilot-instructions.md
├── test.js                    # optional Playwright smoke / screenshot
└── assets/
    ├── avatar.png
    ├── icons/                   # optional PNG tool icons (not required by current hero UI)
    ├── characters/…
    ├── creatures/…
    ├── props/…
    ├── sfx/                     # SFX makeup & sculpting (replaces legacy “makeup” category id)
    └── generalist/…
```

---

## 2. Data Schema

All content lives in `scripts.js` as a single `portfolioData` object.  
**Do not hardcode content in HTML.**

### 2.1 Schema v2

```js
const portfolioData = {
  artist: {
    name: "Itziar Martín Molina",
    title: "3D Artist",
    avatar: "assets/avatar.png",
    bio: "...",
    contact: {
      email: "...",
      phone: "...",
      instagram: "https://...",
      artstation: "https://...",
      linkedin: "https://...",
      languages: "...",
      location: "..."
    }
  },

  categories: [
    { id: "characters",  label: "Characters", thumbnail: "assets/...", hoverText: "View Characters", focalPoint: "15% 50%" },
    { id: "creatures",   label: "Creatures",  thumbnail: "assets/...", hoverText: "View Creatures", focalPoint: "15% 100%" },
    { id: "props",       label: "Props",      thumbnail: "assets/...", hoverText: "View Props", focalPoint: "40% 50%" },
    { id: "generalist",  label: "Generalist", thumbnail: "assets/...", hoverText: "View Generalist", focalPoint: "50% 50%", layout: "mosaic" },
    { id: "sfx",         label: "SFX Makeup & Sculpting", thumbnail: "assets/...", hoverText: "View SFX", focalPoint: "50% 30%", layout: "mosaic" }
  ],

  projects: [

    // STAGED project (Characters / Creatures / Props)
    {
      id: "assassin-elf",
      category: "characters",
      type: "staged",
      name: "Assassin Elf",
      tools: ["zbrush", "maya", "substance", "xgen", "marmoset"],
      hero: {
        type: "video",
        src: "assets/characters/assassin-elf/hero.mp4",
        poster: "assets/characters/assassin-elf/hero-poster.jpg",
        aspect: 1.778
      },
      stages: [
        {
          label: "Blockout",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf.jpg",    aspect: 2.38  },
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf-02.jpg", aspect: 2.273 }
          ]
        },
        {
          label: "Retopology",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/retopology/retopo-01.png", aspect: 0.846 },
            { type: "video", src: "assets/characters/assassin-elf/retopology/process-01.mp4",
              poster: "assets/characters/assassin-elf/retopology/process-01-poster.jpg", aspect: 0.578 }
          ]
        }
        // ... more stages
      ]
    },

    // GALLERY project (e.g. props / sfx / any category)
    {
      id: "kelsier",
      category: "sfx",
      type: "gallery",
      name: "Kelsier (Misfits)",
      tools: [],
      hero: {
        type: "image",
        src: "assets/sfx/kelsier/kelsier-04.jpg",
        aspect: 0.753
      },
      media: [
        { type: "image", src: "assets/sfx/kelsier/kelsier-01.jpg", aspect: 0.753 }
        // ...
      ]
    }
  ]
};
```

**Optional project / hero fields (production):** `pinned`, `description` (HTML fragments allowed), `highlights` (staged — media strip after renders), `rendersStageLabel` (`null` = no promoted renders block), `openFullscreenOnly` (mosaic cards), `hero.hasAudio` / `media[].hasAudio` for fullscreen playback with sound where applicable.

### 2.2 Project types

| `type` | Description | Used by |
|--------|-------------|---------|
| `"staged"` | Has named stages. Each stage has a `media` array. Optional `highlights` media strip and `rendersStageLabel` control how the “renders” stage is promoted. | Characters, Creatures, Props, some SFX |
| `"gallery"` | Single mosaic of mixed media, no stage labels. Has a top-level `media` array. | e.g. Bone Dagger (props), Kelsier (sfx) |

### 2.3 Media item shape

```ts
type Media =
  | { type: "image"; src: string; alt?: string; aspect?: number }
  | { type: "video"; src: string; poster: string; alt?: string; aspect?: number; hasAudio?: boolean };
```

`aspect` = width ÷ height. Optional but strongly recommended — reserves correct space before load and eliminates CLS. Populated via `scripts/fill-aspect-ratios.mjs`.

### 2.4 Backward-compatibility normalizers

`normalizeStage(stage)` and `normalizeProject(project)` in `scripts.js` convert old-style `{ label, image }` stages to `{ label, media: [...] }` so the renderer never sees raw v1 data.

---

## 3. Page Structure (HTML Sections)

```
<body>
  <header id="info-section">       ← landing / artist block (filled by JS)
  <nav class="site-nav" id="site-nav"></nav>   ← sticky section nav (filled by JS)
  <main>
    <section id="characters"></section>
    <section id="creatures"></section>
    <section id="props"></section>
    <section id="generalist"></section>   ← mosaic layout (card grid) in data
    <section id="sfx"></section>          ← mosaic layout (card grid) in data
    <section id="contact" class="contact-section"></section>
  </main>
</body>
```

Category `<section>` shells are declared in `index.html`; inner HTML is replaced by `renderCategorySection`. IDs must match `category.id` exactly. Legacy URLs `#makeup` / `#sculpture` redirect to `#sfx` in `init()`.

---

## 4. Section Specifications

### 4.1 Info Section (`#info-section`)

**Layout:** Desktop (`≥1024px`) is a **locked editorial grid**: fixed-width personal column + a **right stack** (≈65% / 35% height split) with **three flagship tiles** (Characters, Creatures, Props) on top and **two wider tiles** (Generalist, SFX) on the bottom row. Tablet and mobile use stacked / banded variants — see `styles.css` (`.info-layout`, `.info-flagship`, `.info-bottom`).

| Region | Desktop behavior | Content |
|--------|------------------|---------|
| Left — Personal | Fixed width `var(--info-left-width)` | Avatar via `background-image: cover`, name + title + hint; hover overlay shows bio + contact meta + social pills |
| Right — Flagship | 3-column grid | Three `.info-tile--flagship` buttons |
| Right — Bottom | 2-column grid | Two `.info-tile--bottom` buttons |

**Personal block (`.info-personal`):**
- **Desktop (≥ 1024px):** On hover, overlay shows “Contact” header, bio, mail/phone/languages/location list, Instagram / ArtStation / LinkedIn pills.
- **Sub-1024px:** Hover is **completely disabled** via `@media (max-width: 1023px)` — this is width-based so it applies to any browser (including a desktop browser at half-screen), not just touch devices. Click / tap navigates to `#contact` via JS (`window.innerWidth < 1024` check). The overlay links are permanently `pointer-events: none` at this width to prevent iOS sticky-hover from triggering invisible links.

**Category tiles (`.info-tile`):**
- Background from `category.thumbnail` with `background-position` from `focalPoint` (or `focalX` / `focalY`).
- Indexed label + arrow; hover shows centered `hoverText` and scales background slightly.
- Click scrolls to `#${id}-scroll` when present (section banners), else `#${id}` — `scrollIntoView({ behavior: 'smooth', block: 'start' })`.

**Overlay behavior:**
```css
/* Base — hidden and non-interactive by default */
.overlay { opacity: 0; pointer-events: none; transition: opacity var(--transition-default); }
/* Desktop: hover reveals overlay */
.info-personal:hover .overlay,
.info-tile:hover .overlay { opacity: 1; pointer-events: auto; }
/* Sub-1024px: hover suppressed regardless of input device */
@media (max-width: 1023px) {
  .info-personal .overlay,
  .info-personal:hover .overlay { opacity: 0; pointer-events: none; }
}
```

Never use `display: none / block` for overlay show/hide — always `opacity`.

---

### 4.2 Category Section

**Default (`layout` omitted):** vertical stack per project:

```
[Section banner — category label, id="${category.id}-scroll"]
[Project 1 Hero]
[Project 1 Body]         ← About (if description) + stages or gallery; collapsed until “Show More”
[Project 2 Hero]
[Project 2 Body]
...
```

**Mosaic mode (`category.layout === "mosaic"`):** `renderCategoryMosaic` — a **section banner**, a **grid of `.project-card`** tiles (poster or video hover-play on cards), and **hidden project bodies** expanded one-at-a-time under the grid. Bodies include an inner project banner, optional About, optional solo hero video when not already in gallery `media`, then gallery/staged content.

**Section label source:** `.section-banner` at the top of each category (and inner project banner in mosaic bodies). The sticky **`.site-nav`** reflects the active section via `IntersectionObserver`.

---

### 4.3 Project Hero

- Full-width hero block with id `project.id` for deep links.
- Image heroes (`.project-hero--image`) use aspect from `hero.aspect` and `background-image` + `contain` fitting.
- Video heroes (`.project-hero--video`) render `<video autoplay muted loop playsinline preload="metadata" poster>` inside an aspect-ratio container (`--project-hero-aspect`); `object-fit: contain`. Optional **fullscreen** control (`.project-hero__fullscreen-btn`) uses the Fullscreen API; with `hero.hasAudio`, exiting fullscreen restores muted autoplay loop.
- Dark overlay: `.project-hero__overlay`
- Title and **tool badges** (`.project-hero__tool` — uppercase labels via `TOOL_DISPLAY_NAMES`, not PNG icons) positioned per `styles.css`.
- Actions (top): `#` deep-link button (`history.replaceState` to `#projectId`) and optional fullscreen for video heroes.
- **Show More** (`.project-hero__expand-btn`) toggles `.project-body--visible` on `#body-${id}` and syncs label “Show More” / “Hide”.

---

### 4.4 Staged Projects (`type: "staged"`)

The project body is hidden by default behind a "Show More" button on the hero. When expanded, the body renders in two parts:

**1. Renders block (`.stage-block--renders`) — when present, visible once body opens**

`pickRendersStage(stages, project.rendersStageLabel)` decides promotion:

- `rendersStageLabel === null` → **no** renders block; every stage becomes an accordion.
- `rendersStageLabel` string → promote the stage whose `label` matches exactly.
- Otherwise → prefer a stage whose label matches `/^render/i`, else promote the **last** stage (legacy behavior).

Promoted stage renders **without** a visible heading (context comes from placement under the hero). Media via `renderStageMedia`.

**1b. Highlights (`.stage-block--highlights`)** — optional `project.highlights` media array rendered after the renders block with a “HIGHLIGHTS” label.

**2. Per-stage accordions — closed by default**

Every **non-promoted** stage is wrapped in a native `<details class="stage-accordion">` element:

```
─────────────  H I G H   P O L Y  ▾  ─────────────   ← <summary class="stage-accordion__summary stage-block__label">
    [mosaic or solo tile — hidden until opened]
```

- Clicking the summary row expands/collapses the panel natively (no JS required).
- The `▾` chevron rotates 180° when `[open]` via CSS: `details[open] > .stage-accordion__summary .stage-accordion__chevron`.
- `@media (prefers-reduced-motion: reduce)` disables the chevron transition.

**Stage label style (shared by both `.stage-block__label` and `.stage-accordion__summary`):**
- `font-family: var(--font-display)`, `font-size: 0.9rem`, `color: var(--color-accent)`, `letter-spacing: 0.4em`
- Thin horizontal rules on either side via `::before` / `::after` pseudo-elements (`height: 1px`, `background: var(--color-accent)`, `opacity: 0.3`)

**Stage media rendering:**
- 1 item → `renderMediaSolo` (full-width centered, `max-width: 70vw`)
- 2+ items → `renderMediaMosaic` (CSS columns masonry)

---

### 4.5 Gallery Projects (`type: "gallery"`)

- No stage labels
- Hero renders identically to staged projects
- Body is a single `renderMediaMosaic` (or `renderMediaSolo` if only 1 item) of `project.media`

---

### 4.6 Media Mosaic

**Implementation: pure CSS grid — no JS masonry library.**

```css
.media-mosaic {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
}
@media (max-width: 1024px) {
  .media-mosaic { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .media-mosaic { grid-template-columns: 1fr; }
}
```

A lone last tile spanning an odd row may be centered via `:last-child:nth-child(3n+1)` on desktop; that rule resets on narrower breakpoints.

---

### 4.7 Media Tiles

Each mosaic item is a `<figure class="media-tile">` with `tabindex="0"` and `data-type` / `data-src` / `data-poster` attributes for the lightbox.

**Image tiles:** `<img loading="lazy" decoding="async" width="800" height="...">` inside the figure.
- Image tiles use `object-fit: contain` so thumbnails are not clipped.

**Video tiles:**
- Idle state: poster visible, no controls, `▶` badge (`.media-tile__play-badge`)
- Hover (pointer devices): `mouseenter` → `video.play()`, `mouseleave` → `video.pause(); video.currentTime = 0`
- No-hover devices (`@media (hover: none)`): `autoplay` attribute set by JS
- `@media (prefers-reduced-motion: reduce)`: hover-play disabled entirely
- Video tiles keep `object-fit: cover` for a denser mosaic layout.

```html
<video muted loop playsinline preload="metadata" poster="...-poster.jpg">
  <source src="....mp4" type="video/mp4">
</video>
```

Hero videos autoplay unconditionally (they are the "look at me" moment).

---

### 4.8 Lightbox

Clicking any `.media-tile` outside the lightbox itself opens a fullscreen overlay.

- Black/92% backdrop, click-outside or Esc to close
- Prev / Next arrows (←/→ keys also work) cycle through the current group (stage mosaic or gallery mosaic)
- Counter: `3 / 7` bottom-center
- Videos in lightbox get `controls` and `autoplay`
- Mounted once globally via `mountLightbox()` (builds DOM + listeners; not a string template)
- CSS class: `.lightbox` / `.lightbox--open` (toggled via class, not `display`)

---

## 5. Navigation & Scroll Behavior

- **Site nav:** `.site-nav` links use `href="#..."` for native semantics but **`preventDefault`** + `scrollIntoView({ behavior: 'smooth', block: 'start' })` to avoid jarring instant jumps. Targets prefer `${id}-scroll` elements when section banners define them.
- **Category tiles:** same smooth scroll behavior from the info section buttons.
- **Hash deep-links:** hero `#` button writes `history.replaceState(null, '', '#' + projectId)`. On load, `location.hash` scrolls the matching element into view. Legacy `#makeup` / `#sculpture` map to `#sfx`.
- **Back-to-top:** `.back-to-top` visibility toggled when `#info-section` leaves the viewport (`IntersectionObserver`). Click → `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## 6. Responsive Breakpoints

Test viewports: 1440, 1024, 820, 414, 390, 360 px wide.

| Range | Info section | Project heroes | Nav |
|-------|--------------|----------------|-----|
| **Wide desktop** ≥ 1280px | `#info-section` 100 vh; `.info-layout` row: 320 px personal + `.info-right` (65 % flagship / 35 % bottom); flagship **3-column**; bottom **2-column** | Full desktop — unchanged | Full desktop — unchanged |
| **Narrow desktop** 1024 – 1279px | Same row layout; flagship drops to **2-column** (`repeat(2, 1fr)`); odd trailing flagship tile spans full width | Full desktop — unchanged | Full desktop — unchanged |
| **Tablet** 768 – 1023px | Full-width personal tile (`38vh` min 240 px); flagship + bottom each **2-column** `aspect-ratio: 4/3`; last bottom tile full-width when odd | Image heroes: `cover; center top`. Video heroes: cinematic top-vignette. Title + tools retain absolute desktop layout | Compact gaps; `font-size: 0.78rem`; right-edge fade mask; `min-width: 44px` per link |
| **Mobile** ≤ 767px | 1-column stack; all tiles `aspect-ratio: 16/9`. Contact section padding reduced | `height: auto; min-height: 62vh`; title stays `position: absolute`, `clamp(1.6rem, 8vw, 2.4rem)`, `max-width: 80%`. **Tool pills hidden** (`display: none`) on both `.project-hero__tools` and `.project-card__tools` | Gap `0.75rem`; `min-width: 44px` per link |

**Mosaic grid:** `.media-mosaic` and `.category-mosaic__grid` use **3 → 2 → 1** columns at default / `≤ 1024px` / `≤ 640px`.

**Nav:** `overflow: hidden` on `.site-nav` prevents fixed-bar content from contributing to page scroll width. List scrolls horizontally inside (`overflow-x: auto`, hidden scrollbar). Right-edge `mask-image` fade. No hamburger. Each link `min-width: 44px` × 48 px height (HIG 44 × 44).

**About Me tile:** Hover disabled at ≤ 1023px (width-based, not device-based). Click/tap scrolls to `#contact`. Overlay has `pointer-events: none` unconditionally at this width.

**Overflow prevention:** `body { overflow-x: clip }` globally. Uses `clip` not `hidden` to avoid breaking `position: fixed` in Safari.

**Lightbox:** Keyboard (Esc/Arrow) + pointer swipe (`deltaX > 50px` in `< 500ms`; skipped on video taps). Buttons 48 × 48 px on mobile, repositioned to `bottom: 20%` for thumb reach.

**Touch visibility:** `@media (hover: none) and (pointer: coarse)` keeps `.project-hero__actions` always visible.

**Ultra-wide:** Tested to 3440 × 1440px (21:9). `1fr` columns and `background-size: cover` scale cleanly. Contact capped at `max-width: 980px`.
---

## 7. CSS Conventions

- **CSS custom properties** for all colors, fonts, and spacing — never hardcode literal values.
- **BEM naming**: `.block__element--modifier`. Class selectors only — no `id` selectors in CSS.
- No utility frameworks (no Tailwind, no Bootstrap).
- **Mixed query style:** many layout-critical rules use **`max-width`** tablets/mobile overrides alongside `min-width` desktop locks for the info hero. Prefer variables over raw pixels when introducing new breakpoints.
- Animations via CSS `transition` / `@keyframes`. No JS animation libraries.

Core palette / typography / spacing (always use variables; extend `:root` rather than literals):

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

  /* Layout / UI tokens — see full list in styles.css */
  --info-left-width: 320px;
  --nav-height: 48px;
  --color-surface-translucent: rgba(26, 26, 26, 0.85);
  --color-accent-soft: rgba(200, 169, 110, 0.3);
  --color-tool-badge-bg: rgba(14, 14, 14, 0.7);
  --color-tool-badge-border: rgba(240, 240, 240, 0.15);
  /* …and more (hero max-height, nav scroll offset, etc.) */
}
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## 8. JS Architecture

`scripts.js` is organized into data, normalizers, render helpers (mostly **HTML string** builders), and `init()`. **`mountLightbox()`** is the intentional exception: it creates and wires the lightbox DOM once.

```js
// 1. DATA
const portfolioData = { ... };

// 2. NORMALIZERS
function normalizeStage(stage) {}     // v1 → v2 schema compat
function normalizeProject(project) {} // v1 → v2 schema compat

// 3. RENDER FUNCTIONS
function renderMediaTile(mediaItem, altText) {}      // one image or video figure
function attachHoverPlay(container) {}               // wires hover/autoplay on video tiles
function renderMediaSolo(mediaItem, altText) {}      // single centered tile
function renderMediaMosaic(mediaArray, altText) {}   // CSS grid mosaic
function renderStageMedia(mediaArray, altText) {}    // dispatches solo vs mosaic
function mountLightbox() {}                          // mounts lightbox DOM + wires all events

function renderInfoPersonal(artist) {}
function renderInfoTile(cat, n, modifier) {}
function renderInfoFlagship(categories) {}           // characters / creatures / props
function renderInfoBottom(categories) {}             // generalist / sfx
function renderInfoSection(data) {}                  // composes personal + flagship + bottom
function renderContactSection(artist) {}             // #contact inner HTML
function renderCategoryMosaic(category, projects) {} // card grid + expandable bodies
function renderProjectCard(project) {}               // mosaic category card + trigger
function renderCategorySection(category, projects) {}// banner + stack OR mosaic
function renderProjectAbout(project) {}              // optional ABOUT block (HTML body)
function renderProjectHero(project) {}               // hero + Show More expand-btn
function renderProjectBody(project) {}               // about + staged|gallery + collapse control
function pickRendersStage(stages, rendersStageLabel) {}
function renderRendersBlock(stage, projectName) {}
function renderHighlightsBlock(mediaArray, projectName) {}
function renderStageAccordion(stage, projectName) {}
function renderProjectStages(project) {}             // renders + highlights + accordions
function renderStageBlock(stage, projectName) {}     // labeled block (non-accordion)
function renderProjectGallery(project) {}            // mosaic from project.media
function attachCardVideoPlay(container) {}            // mosaic card video hover play

// 4. INIT
function init() {}  // called on DOMContentLoaded
```

**`renderProjectBody`:** normalizes the project, prepends `renderProjectAbout`, dispatches inner content to `renderProjectGallery` or `renderProjectStages`, and appends an always-visible **Hide** control for the expanded body state.

**`init` flow (summary):**
1. Legacy hash remap (`#makeup`, `#sculpture` → `#sfx`).
2. Render `#info-section` + tile click listeners (smooth scroll to section or `-scroll` anchor).
3. Each category section: sort by `pinned`, `innerHTML = renderCategorySection(...)`.
4. Render `#contact` from `renderContactSection`.
5. `mountLightbox()`, `attachHoverPlay(document.body)`, `attachCardVideoPlay(document.body)`, `updateContainedHeroInsets` + resize listener.
6. Delegated listeners: hero expand/collapse, mosaic card expand, hash link button, hero fullscreen, fullscreen API sync.
7. `location.hash` scroll-into-view on load.
8. Build `.site-nav` from categories + Contact; link `preventDefault` + smooth `scrollIntoView`; `IntersectionObserver` for active link state.
9. Back-to-top button + observer on `#info-section`.

---

## 9. Tool labels

Hero and mosaic card tools are **text badges** (`.project-hero__tool` / `.project-card__tool` with nested fallback/label spans), driven by the `tools: string[]` array and `TOOL_DISPLAY_NAMES` in `scripts.js`. Add a slug → display name entry there for nice typography; unknown slugs render as-is (e.g. `"rizom UV"`).

Optional PNG icons may live under `assets/icons/[tool-slug].png` for future use, but the current UI does not render `<img>` tool icons in the hero.

---

## 10. Deployment (GitHub Pages)

1. Push all files to a GitHub repository (public, or private with Pages enabled)
2. **Settings → Pages → Source → Deploy from branch → `main` / root**
3. Site live at `https://[username].github.io/[repo-name]/`
4. Custom domain: add a `CNAME` file to the root, configure DNS at registrar

**All asset paths must be relative** (`assets/avatar.png`, not `/assets/avatar.png`) — GitHub Pages serves from a subdirectory path when no custom domain is set.
