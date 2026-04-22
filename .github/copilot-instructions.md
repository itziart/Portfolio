# GitHub Copilot Instructions — Itziar Martín Molina · 3D Artist Portfolio

## Project Context

This is a **static Single Page Application** portfolio for a 3D artist.
- Stack: plain HTML + CSS + JavaScript. No frameworks, no build tools, no npm.
- Hosted on GitHub Pages.
- Three files only: `index.html`, `styles.css`, `script.js`.
- All content is data-driven from `portfolioData` in `script.js`. Never hardcode content in HTML.
- Full project spec is in `DESIGN.md`. Always respect it.

---

## Architecture Rules

### Data
- All content (artist info, categories, projects, stages) lives in the `portfolioData` object at the top of `script.js`.
- Never read content from the DOM. Always read from `portfolioData`.
- When adding a new project, only `portfolioData` should need to change — no HTML edits.

### JavaScript
- Use **render functions** that return HTML strings and are injected via `innerHTML` or `insertAdjacentHTML`.
- Function naming convention:
  - `renderInfoSection(data)` — builds the full landing/info section
  - `renderCategorySection(category, projects)` — builds one full category block
  - `renderProjectHero(project)` — returns HTML for the project header
  - `renderProjectStage(stage)` — returns HTML for one full-screen stage image
  - `renderProjectFinal(project)` — returns HTML for the final render image
- All render functions must return a string or a DOM element — never directly mutate the DOM inside them.
- Entry point is `init()`, called on `DOMContentLoaded`.
- No jQuery. No lodash. No external JS libraries unless explicitly asked.

### HTML
- Semantic elements: `<header>`, `<main>`, `<section>`, `<figure>`, `<nav>`.
- Section IDs must match `category.id` values in `portfolioData` exactly (e.g., `id="characters"`).
- All asset paths must be **relative** (e.g., `assets/avatar.jpg`, never `/assets/avatar.jpg`) — required for GitHub Pages.
- Do not use `<form>` elements unless explicitly asked.

### CSS
- Use **CSS custom properties** (variables) for all colors, spacing, fonts, and transitions. Never hardcode values.
- Use **BEM naming**: `.block__element--modifier`. Examples:
  - `.info-personal__overlay`
  - `.info-tile--active`
  - `.project-hero__title`
  - `.project-hero__tools`
  - `.category-banner__label`
- No utility frameworks (no Tailwind, no Bootstrap).
- All variables are defined in `:root` in `styles.css`. If you need a new variable, add it there.
- Animations use `transition` or `@keyframes` — no JS-based animation libraries.

---

## CSS Variables Reference

Always use these variables. Never hardcode equivalent values.

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

---

## Key Behaviors to Always Implement

### Hover overlays (info section)
- Both the personal block and each category tile have a dark overlay that appears on hover.
- Overlay uses `opacity: 0` → `opacity: 1` transition. Never use `display: none/block` for this.
- Overlay is always `position: absolute; inset: 0` inside a `position: relative` parent.

### Scroll-to-section (category tiles)
- Clicking a category tile scrolls to `#[category.id]` using:
  ```js
  document.getElementById(category.id).scrollIntoView({ behavior: 'smooth' });
  ```
- Never use `href="#section"` anchor jumps — always use `scrollIntoView`.

### Tool icons (project hero)
- Icons are `<img>` tags pointing to `assets/icons/[tool].png`.
- Always apply this CSS class to make them white:
  ```css
  .project-hero__tool-icon {
    filter: brightness(0) invert(1);
    opacity: 0.85;
    width: 32px;
    height: 32px;
  }
  ```

### Stage images
- Stage images are full-viewport-width, `100vh` tall.
- No text, no labels, no overlay on stage images — ever.
- Use `background-image` with `background-size: cover; background-position: center`.

### Asset paths
- Always relative. Pattern: `assets/[category]/[project-slug]/[image].jpg`
- Icons: `assets/icons/[tool-name].png`
- Avatar: `assets/avatar.jpg`

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| `> 1024px` | Info section: two columns (30/70). Tiles: 2 top + 1 bottom full-width. |
| `768–1024px` | Info section: two columns. Tiles: stacked vertically. |
| `< 768px` | Single column. Avatar on top, tiles stacked below. |

Always write mobile-first CSS (`min-width` media queries).

---

## What Copilot Should Never Do

- Do not use `var` — use `const` and `let` only.
- Do not use inline styles in JS-generated HTML, except for dynamic values like `background-image: url(...)`.
- Do not hardcode colors, fonts, or spacing values in CSS — use variables.
- Do not add placeholder comments like `// TODO` or `// Add logic here` — write the actual implementation.
- Do not import external libraries unless explicitly requested.
- Do not use `document.write()`.
- Do not use `id` selectors in CSS — use classes only.
- Do not generate framework-specific code (React, Vue, Angular, etc.).
- Do not use absolute asset paths starting with `/`.

---

## When Adding a New Project

Only these steps are needed:
1. Add a new object to the `projects` array in `portfolioData` in `script.js`.
2. Add the image files to `assets/[category]/[project-slug]/`.
3. No HTML changes. No CSS changes. The render functions handle everything.

---

## When Adding a New Tool Icon

1. Add the png file to `assets/icons/[tool-name].png`.
2. Add the tool slug string to the project's `tools` array in `portfolioData`.
3. No other changes needed.

---

## Folder Structure

```
portfolio/
├── .github/
│   └── copilot-instructions.md   ← this file
├── index.html
├── styles.css
├── script.js
├── DESIGN.md                     ← full design spec and wireframe reference
└── assets/
    ├── avatar.jpg
    ├── icons/
    │   ├── zbrush.png
    │   ├── maya.png
    │   ├── substance.png
    │   └── blender.png
    ├── characters/
    │   ├── thumb.jpg
    │   └── [project-slug]/
    ├── props/
    │   ├── thumb.jpg
    │   └── [project-slug]/
    └── creatures/
        ├── thumb.jpg
        └── [project-slug]/
```

## Local Dev & Testing

- Local server: `live-server --port=8080` from the repo root
- HTML validation: `htmlhint index.html`
- CSS validation: `stylelint styles.css`
- Browser testing: Playwright with Chromium, entry point `test.js`
- Always run `htmlhint` and `stylelint` after generating or editing files
- When asked to verify layout, take a Playwright screenshot and save it as `screenshot.png`
