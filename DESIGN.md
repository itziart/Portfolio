# Portfolio Design Document — Itziar Martín Molina · 3D Artist

> **This file is the source of truth for visual identity, CSS conventions, and render-function contracts.** Keep it open while developing. For schema details and the extension roadmap, see `EXTENSION_PLAN.md` (takes precedence over this file if they conflict).

---

## 1. Project Overview

A **static Single Page Application** portfolio for a 3D artist.  
Hosted on **GitHub Pages**. No framework — plain HTML + CSS + JS.  
One HTML file (`index.html`), one CSS file (`styles.css`), one JS file (`scripts.js`). All content is data-driven from a JS object.

**File structure:**
```
portfolio/
├── index.html
├── styles.css
├── scripts.js
├── DESIGN.md
├── EXTENSION_PLAN.md
├── CLAUDE.md
└── assets/
    ├── avatar.png
    ├── icons/
    │   ├── zbrush.png
    │   ├── maya.png
    │   ├── substance.png
    │   ├── marmoset.png
    │   ├── xgen.png
    │   ├── blender.png
    │   ├── unity.png
    │   └── photoshop.png
    ├── characters/
    │   └── assassin-elf/
    │       ├── hero.mp4
    │       ├── hero-poster.jpg
    │       ├── blockout/
    │       ├── highpoly/
    │       ├── retopology/
    │       ├── bakes/
    │       ├── textures/
    │       ├── xgen/
    │       └── render/
    ├── creatures/
    │   └── alien/
    │       ├── hero.mp4
    │       ├── hero-poster.jpg
    │       ├── 360.mp4
    │       ├── 360-poster.jpg
    │       ├── blockout/
    │       ├── highpoly/
    │       ├── textures/
    │       ├── udims/
    │       └── render/
    ├── props/
    │   ├── crime-shoes/
    │   │   ├── hero.mp4
    │   │   ├── hero-poster.jpg
    │   │   ├── highpoly/
    │   │   ├── retopology/
    │   │   ├── textures/
    │   │   └── render/
    │   └── bone-dagger/
    │       ├── render.jpg
    │       └── wireframe.jpg
    ├── makeup/
    │   ├── kelsier/
    │   ├── the-doll/
    │   ├── old-skin/
    │   ├── beast-book/
    │   ├── clay-face/
    │   └── dolfo/
    └── generalist/
        ├── showreel/
        ├── the-foot/
        ├── xali/
        ├── black-lodge/
        ├── dolfo-snake/
        ├── tiger/
        └── player/
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
      artstation: "https://...",
      linkedin: "https://..."
    }
  },

  categories: [
    { id: "characters",  label: "Characters",          thumbnail: "assets/...", hoverText: "View Characters" },
    { id: "creatures",   label: "Creatures",            thumbnail: "assets/...", hoverText: "View Creatures"  },
    { id: "props",       label: "Props",                thumbnail: "assets/...", hoverText: "View Props"      },
    { id: "makeup",      label: "Makeup & Sculpture",   thumbnail: "assets/...", hoverText: "View Makeup"     },
    { id: "generalist",  label: "Generalist",           thumbnail: "assets/...", hoverText: "View Generalist" }
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

    // GALLERY project (Makeup / Generalist)
    {
      id: "kelsier",
      category: "makeup",
      type: "gallery",
      name: "Kelsier",
      tools: [],
      hero: {
        type: "image",
        src: "assets/makeup/kelsier/kelsier-01.jpg",
        aspect: 0.753
      },
      media: [
        { type: "image", src: "assets/makeup/kelsier/kelsier-01.jpg", aspect: 0.753 },
        { type: "image", src: "assets/makeup/kelsier/kelsier-02.png", aspect: 0.753 }
        // ...
      ]
    }
  ]
};
```

### 2.2 Project types

| `type` | Description | Used by |
|--------|-------------|---------|
| `"staged"` | Has named stages (Blockout, High Poly, …). Each stage has a `media` array. | Characters, Creatures, Props |
| `"gallery"` | Single mosaic of mixed media, no stage labels. Has a top-level `media` array. | Makeup, Generalist |

### 2.3 Media item shape

```ts
type Media =
  | { type: "image"; src: string; alt?: string; aspect?: number }
  | { type: "video"; src: string; poster: string; alt?: string; aspect?: number };
```

`aspect` = width ÷ height. Optional but strongly recommended — reserves correct space before load and eliminates CLS. Populated via `scripts/fill-aspect-ratios.mjs`.

### 2.4 Backward-compatibility normalizers

`normalizeStage(stage)` and `normalizeProject(project)` in `scripts.js` convert old-style `{ label, image }` stages to `{ label, media: [...] }` so the renderer never sees raw v1 data.

---

## 3. Page Structure (HTML Sections)

```
<body>
  <header id="info-section">         ← full-viewport info / landing section
  <main>
    <section id="characters">        ← staged category
    <section id="creatures">         ← staged category
    <section id="props">             ← staged category (also has a gallery project: bone-dagger)
    <section id="makeup">            ← gallery category
    <section id="generalist">        ← gallery category
  </main>
</body>
```

Each `<section id="[category-id]">` is generated by JS from `portfolioData`. Section IDs must match `category.id` exactly.

---

## 4. Section Specifications

### 4.1 Info Section (`#info-section`)

**Layout:** Two columns, full viewport height.

| Column | Width | Content |
|--------|-------|---------|
| Left — Personal | 30% | Avatar image + name + title |
| Right — Tiles | 70% | Grid of 5 category tiles |

**Left column — Personal block:**
- Avatar fills the column height via `background-image: cover`
- Name and title text positioned at bottom-left, always visible in white
- On hover: dark semi-transparent overlay appears, showing bio + social links
- CSS class: `.info-personal`

**Right column — Category tiles:**
- 5 tiles in a **3 + 2 asymmetric grid** on desktop (see Section 6)
- Each tile has a background image (`background-size: cover`)
- Category label always visible at bottom of tile, white text
- On hover: dark overlay, label becomes `hoverText`, cursor pointer
- On click: smooth-scroll to `<section id="[category-id]">` via `scrollIntoView({ behavior: 'smooth' })`
- CSS class: `.info-tile`

**Hover behavior (both columns):**
```css
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity var(--transition-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.info-personal:hover .overlay,
.info-tile:hover .overlay { opacity: 1; }
```

Never use `display: none / block` for overlay show/hide — always `opacity`.

---

### 4.2 Category Section

**Layout:** Vertical stack.

```
[Project 1 Hero]
[Project 1 Body]         ← stages or gallery, depending on project.type
[Project 2 Hero]
[Project 2 Body]
...
```

**Section label source:**
- No category banner is rendered above project heroes.
- The pinned navbar active state communicates the current section.

---

### 4.3 Project Hero

- Full-viewport-width
- Image heroes (`.project-hero--image`) use `80vh` container height and `background-image: project.hero.src` with `background-size: contain` (no clipping).
- Video heroes (`.project-hero--video`) render a `<video>` element with `autoplay muted loop playsinline preload="metadata"` and `poster`, inside an aspect-ratio-driven container (`--project-hero-aspect`).
- Video heroes use `object-fit: contain` so the full frame remains visible.
- Dark overlay: `var(--color-overlay)` — CSS class `.project-hero__overlay`
- Project name: bottom-left, `font-family: var(--font-display)`, `font-size: 4rem`, white
- Tool icons: bottom-right, PNG from `assets/icons/[tool].png`, white via `filter: brightness(0) invert(1)`
- Deep-link anchor button `#` appears on hover (top-right), writes `location.hash` on click
- CSS class: `.project-hero`

---

### 4.4 Staged Projects (`type: "staged"`)

Each stage renders as a `.stage-block`:

```
─────────────  H I G H   P O L Y  ─────────────   ← .stage-block__label
    [mosaic or solo tile]
```

**Stage label style:**
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

**Implementation: pure CSS columns — no JS masonry library.**

```css
.media-mosaic {
  column-count: 3;
  column-gap: var(--spacing-sm);
  padding: var(--spacing-md);
}
.media-mosaic .media-tile {
  break-inside: avoid;
  margin-bottom: var(--spacing-sm);
}
@media (max-width: 1024px) { .media-mosaic { column-count: 2; } }
@media (max-width: 640px)  { .media-mosaic { column-count: 1; } }
```

Items fill top-to-bottom by column (Pinterest-style). Acceptable trade-off for a portfolio — no JS dependency.

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
- Mounted once globally via `mountLightbox()` — wired with a delegated click listener on `document.body`
- CSS class: `.lightbox` / `.lightbox--open` (toggled via class, not `display`)

---

## 5. Navigation & Scroll Behavior

- Clicking a category tile scrolls to `#[category-id]` via `scrollIntoView({ behavior: 'smooth' })`.  
  **Never use `<a href="#section">` anchor jumps.**
- **Hash deep-links:** clicking the `#` anchor on a project hero writes `history.replaceState(null, '', '#' + projectId)`. On page load, `location.hash` is read and the target element is scrolled into view.
- **Back-to-top button:** a fixed `.back-to-top` button appears (`.back-to-top--visible`) once `#info-section` leaves the viewport, detected via `IntersectionObserver`. It sits higher than the default bottom edge spacing to avoid overlapping section labels. Clicking it calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## 6. Responsive Breakpoints

| Breakpoint | Info section layout | Tiles layout |
|------------|---------------------|--------------|
| Mobile (`< 768px`) | Single column: personal top, tiles below stacked | Single column |
| Tablet (`768px – 1023px`) | Two columns | 2-column grid; 5th tile spans 2 |
| Desktop (`≥ 1024px`) | Two columns, locked to `100vh` | 6-column grid, **3 + 2 asymmetric**: tiles 1–3 `span 2`, tiles 4–5 `span 3` |

Desktop tile CSS:
```css
.info-tiles-container {
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
}
.info-tile:nth-child(1) { grid-column: span 2; }  /* Characters */
.info-tile:nth-child(2) { grid-column: span 2; }  /* Creatures  */
.info-tile:nth-child(3) { grid-column: span 2; }  /* Props      */
.info-tile:nth-child(4) { grid-column: span 3; }  /* Makeup     */
.info-tile:nth-child(5) { grid-column: span 3; }  /* Generalist */
```

---

## 7. CSS Conventions

- **CSS custom properties** for all colors, fonts, and spacing — never hardcode literal values.
- **BEM naming**: `.block__element--modifier`. Class selectors only — no `id` selectors in CSS.
- No utility frameworks (no Tailwind, no Bootstrap).
- **Mobile-first** media queries (`min-width`), except for legacy overrides.
- Animations via CSS `transition` / `@keyframes`. No JS animation libraries.

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

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## 8. JS Architecture

`scripts.js` contains four sections:

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
function renderMediaMosaic(mediaArray, altText) {}   // CSS-columns mosaic
function renderStageMedia(mediaArray, altText) {}    // dispatches solo vs mosaic
function mountLightbox() {}                          // mounts lightbox DOM + wires all events

function renderInfoSection(data) {}                  // #info-section: personal + tiles
function renderCategorySection(category, projects) {}// all projects in a section (no category banner)
function renderProjectHero(project) {}               // project hero div
function renderProjectBody(project) {}               // dispatches → staged or gallery
function renderProjectStages(project) {}             // loops stages → renderStageBlock
function renderStageBlock(stage, projectName) {}     // label + media
function renderProjectGallery(project) {}            // single mosaic from project.media

// 4. INIT
function init() {}  // called on DOMContentLoaded
```

**`renderProjectBody` dispatcher:**
```js
function renderProjectBody(project) {
  const normalized = normalizeProject(project);
  if (normalized.type === "gallery") return renderProjectGallery(normalized);
  return renderProjectStages(normalized);
}
```

**`init` flow:**
1. Render `#info-section` → wire tile click listeners
2. For each category: find matching projects, render `renderCategorySection`, set `innerHTML`
3. `mountLightbox()` — once, globally
4. `attachHoverPlay(document.body)` — once, globally
5. Wire `.project-hero__anchor` click listeners (hash deep-links)
6. Handle `location.hash` on load (scroll to project)
7. Mount back-to-top button + `IntersectionObserver`

---

## 9. Tool Icons

Store PNG files in `assets/icons/[tool-slug].png`.  
Render as `<img>` tags inside `.project-hero__tools`:

```css
.project-hero__tool-icon {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}
```

Supported tool slugs (extend as needed):
- `zbrush`
- `maya`
- `substance`
- `marmoset`
- `xgen`
- `blender`
- `unity`
- `photoshop`
- `unreal`
- `cinema4d`
- `houdini`

---

## 10. Deployment (GitHub Pages)

1. Push all files to a GitHub repository (public, or private with Pages enabled)
2. **Settings → Pages → Source → Deploy from branch → `main` / root**
3. Site live at `https://[username].github.io/[repo-name]/`
4. Custom domain: add a `CNAME` file to the root, configure DNS at registrar

**All asset paths must be relative** (`assets/avatar.png`, not `/assets/avatar.png`) — GitHub Pages serves from a subdirectory path when no custom domain is set.
