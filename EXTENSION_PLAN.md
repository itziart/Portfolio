# Portfolio Extension Plan — Itziar Martín Molina

> **Purpose:** Historical roadmap and answered product questions for the portfolio extension. **`DESIGN.md` + `CLAUDE.md`** describe the **current shipped behavior**; when this plan disagrees with the code, **update the docs** (do not treat outdated plan text as authoritative).

---

## 0. TL;DR — shipped vs original plan

**Implemented (current codebase):**

1. **Categories:** `characters`, `creatures`, `props`, **`generalist`**, **`sfx`** (SFX Makeup & Sculpting). The original `makeup` **category id** is replaced by **`sfx`**; `init()` remaps legacy hashes `#makeup` / `#sculpture` → `#sfx`.
2. **Stages are media groups** with `normalizeStage` / `normalizeProject` for v1 `{ label, image }` compat.
3. **Mosaic media** uses a **CSS grid** (not column-count masonry). Single-item stages use `renderMediaSolo`.
4. **`generalist` and `sfx`** use **`layout: "mosaic"`** — project **card grid** + expandable bodies instead of stacked full-width heroes only.
5. **Lightbox** via **`mountLightbox()`** (DOM mount + delegated clicks), prev/next, Esc, video controls in viewer.
6. **Extras vs original outline:** sticky **`.site-nav`**, **`#contact`** section, optional **`highlights`** strip + **`rendersStageLabel`** on staged projects, **hero fullscreen** + optional **`hasAudio`**, **`pinned`** sort, **About** blocks with HTML descriptions, **text tool badges** (not PNG icons in hero).

**Original plan items partially deferred / changed:** optional `.webm` sources; some early folder-level naming examples differ from the final `assets/` tree — follow `portfolioData` paths as truth.

---

## 1. New Information Architecture

### 1.1 Categories (shipped list)

| ID | Label | Default section layout | Notes |
|---|---|---|---|
| `characters` | Characters | Stacked heroes | Staged projects |
| `creatures` | Creatures | Stacked heroes | Staged projects |
| `props` | Props | Stacked heroes | Staged + gallery (e.g. Bone Dagger) |
| `generalist` | Generalist | **`layout: "mosaic"`** — card grid | Mostly gallery projects; showreel etc. |
| `sfx` | SFX Makeup & Sculpting | **`layout: "mosaic"`** — card grid | Replaces legacy **`makeup`** id |

Two **project types** — declared per project, not per category:

- `"type": "staged"` — named stages + optional `highlights` + `rendersStageLabel` behavior (see `DESIGN.md` §4.4).
- `"type": "gallery"` — single `media` mosaic (no stage labels).

### 1.2 Generalist — implemented project ids (reference)

See `portfolioData` in `scripts.js` for the canonical list (e.g. **The Foot**, **Xali**, **Showreel**, **Black Lodge**, **Dolfo + Snake**, **Tiger**, **Player**, etc.). Sketches were split per Section 10 answer (separate projects, not one mega-mosaic).

### 1.3 SFX — implemented direction

Physical SFX / sculpt / makeup work lives under **`assets/sfx/`** with category id **`sfx`**. Projects include gallery items (e.g. **Kelsier**) and staged work (e.g. combined doll + clay face) using `highlights` and custom `rendersStageLabel` where needed. Original “makeup” naming in this document maps to this category.

---

## 2. Asset reorganization

The current folder layout (`assets/Portfolio/Alien/`, capitalized, mixed conventions) doesn't match the convention in `DESIGN.md` (`assets/[category]/[project-slug]/`). Two options:

### Option A — full rename (recommended)

Mirror the spec exactly. One-time pain, clean forever.

```
assets/
├── avatar.jpg
├── icons/
│   ├── zbrush.png, maya.png, substance.png, marmoset.png, blender.png,
│   ├── unreal.png, xgen.png, photoshop.png, unity.png
├── characters/
│   ├── thumb.jpg
│   └── assassin-elf/
│       ├── thumb.jpg
│       ├── hero.mp4              ← MA1_..._Character_01.mp4
│       ├── hero-poster.jpg       ← first frame of hero.mp4 (extracted)
│       ├── blockout/             ← elf.jpg, elf02.jpg
│       ├── highpoly/             ← bru.jpg, ornamentos.jpg, etc.
│       ├── retopology/           ← image (4..7).png + screen recording
│       ├── bakes/                ← image (2..8).png
│       ├── textures/             ← image (6..18).png + screen recordings
│       ├── xgen/                 ← image (12).png + screen recordings
│       └── render/               ← MA1_..._Character_01..06.png
├── creatures/
│   ├── thumb.jpg
│   └── alien/
│       ├── thumb.jpg
│       ├── hero.mp4              ← MA1_..._Creature_01.mp4
│       ├── hero-poster.jpg
│       ├── blockout/, highpoly/, textures/, udims/, render/
│       └── 360.mp4               ← 360video.mp4
├── props/
│   ├── thumb.jpg
│   ├── bone-dagger/
│   │   ├── render.jpg            ← BoneDagger_Render_*.jpg
│   │   └── wireframe.jpg
│   └── crime-shoes/
│       ├── thumb.jpg
│       ├── hero.mp4
│       ├── hero-poster.jpg
│       ├── blockout/ (empty, omit stage)
│       ├── highpoly/, retopology/, textures/, render/
├── sfx/
│   └── (project folders — see portfolioData)
└── generalist/
    ├── thumb.jpg
    ├── the-foot/, xali/, showreel/, black-lodge/, dolfo-snake/, tiger/, player/, …
```

**Naming rules (enforce in the rename script):**
- All lowercase, hyphens not underscores or spaces.
- Strip the `MA1_CHAR_2526_ItziarMartinMolina_` prefix from filenames.
- Strip ` - copia` / ` (1)` / ` (2)` duplicates after manually picking the keeper.
- Rename screen recordings to something semantic: `process-01.mp4`, `process-02.mp4`.
- Rename "weird" filenames (`aaaaaaaa...jpg`, `Sin título-1.png`, `hehehehe.png`) — they'll show up in URLs.

### Option B — keep current folders, abstract via data

Leave assets where they are, let `portfolioData` reference them with their current paths. Faster to start, but you'll regret it the first time you ship a URL with `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg` in a network tab.

**Recommended:** Option A. Write the rename as a shell script so it's reversible and reviewable. See Section 8.

### 2.1 Video posters

Every video needs a poster image (the still frame shown when the video isn't playing). Generate them once with ffmpeg:

```bash
ffmpeg -ss 00:00:01 -i hero.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
```

Bake this into the rename script so every `.mp4` gets a sibling `.jpg` poster automatically.

### 2.2 Video size & web optimization

Your raw screen recordings are likely 1080p / 60fps and big. For a portfolio:

- **Hero/showreel videos**: re-encode to H.264 1080p, ~3–5 Mbps, max ~10 MB each.
  ```bash
  ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 23 -vf "scale=1920:-2" -an out.mp4
  ```
  (`-an` strips audio — autoplay-muted means audio is dead weight.)
- **Process clips inside stages**: 720p, even smaller. Aim for <5 MB each.
- Consider also outputting `.webm` with VP9 for ~30% smaller files; serve via `<video><source>` tags.

Anything over ~20 MB per clip will hurt mobile load. The Assassin Elf folder alone has 7+ screen recordings — that adds up.

---

## 3. Updated data schema

### 3.1 Schema (v2)

The snippet below is **illustrative** (`year`, nested `thumbnail`, etc. may be absent in the live `portfolioData`). Trust **`scripts.js`** for exact fields in use.

```js
const portfolioData = {
  artist: { /* unchanged */ },
  categories: [
    { id: "characters",  label: "Characters",          thumbnail: "assets/characters/thumb.jpg",  hoverText: "View Characters" },
    { id: "creatures",   label: "Creatures",           thumbnail: "assets/creatures/thumb.jpg",   hoverText: "View Creatures" },
    { id: "props",       label: "Props",               thumbnail: "assets/props/thumb.jpg",       hoverText: "View Props" },
    { id: "sfx",         label: "SFX Makeup & Sculpting", thumbnail: "assets/...", hoverText: "View SFX", layout: "mosaic" },
    { id: "generalist",  label: "Generalist",          thumbnail: "assets/...",  hoverText: "View Generalist", layout: "mosaic" },
  ],

  projects: [
    // STAGED PROJECT — Characters / Creatures / Props
    {
      id: "assassin-elf",
      category: "characters",
      type: "staged",
      name: "Assassin Elf",
      year: 2026,                                              // optional, shown small under title
      description: "Stylized character, real-time pipeline.",  // optional, shown in hero
      tools: ["zbrush", "maya", "substance", "xgen", "marmoset"],

      // hero can be image or video; if video, poster is required
      hero: {
        type: "video",
        src: "assets/characters/assassin-elf/hero.mp4",
        poster: "assets/characters/assassin-elf/hero-poster.jpg"
      },
      // thumbnail used in category index tiles — falls back to hero if absent
      thumbnail: {
        type: "video",
        src: "assets/characters/assassin-elf/hero.mp4",
        poster: "assets/characters/assassin-elf/hero-poster.jpg"
      },

      stages: [
        {
          label: "Blockout",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf.jpg" },
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf-02.jpg" }
          ]
        },
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/highpoly/bru.jpg" },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/ornamentos.jpg" },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/skin.jpg" },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/done.jpg" }
          ]
        },
        {
          label: "Retopology",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/retopology/04.png" },
            { type: "video", src: "assets/characters/assassin-elf/retopology/process.mp4",
              poster: "assets/characters/assassin-elf/retopology/process-poster.jpg" }
          ]
        }
        // ...Bakes, Textures, XGen, Render
      ]
    },

    // GALLERY PROJECT — e.g. sfx / props / generalist
    {
      id: "kelsier",
      category: "sfx",
      type: "gallery",
      name: "Kelsier",
      year: 2025,
      description: "Clay sculpture study.",
      tools: [],                                  // gallery projects often have no tool icons
      hero: {
        type: "image",
        src: "assets/sfx/kelsier/kelsier-04.jpg"
      },

      // gallery projects use `media` directly — no stages
      media: [
        { type: "image", src: "assets/sfx/kelsier/01.png" },
        { type: "image", src: "assets/sfx/kelsier/02.png" },
        { type: "image", src: "assets/sfx/kelsier/03.jpg" },
        { type: "image", src: "assets/sfx/kelsier/04.png" }
      ]
    }
  ]
};
```

### 3.2 Media item shape (the only new primitive)

```ts
type Media =
  | { type: "image"; src: string; alt?: string; aspect?: number }
  | { type: "video"; src: string; poster: string; alt?: string; aspect?: number; hasAudio?: boolean };
```

`aspect` is optional but nice-to-have: if you populate it, the grid can reserve correct space *before* the image loads, eliminating layout shift. A small build-time script (Section 8.3) can fill it automatically.

### 3.3 Backward compatibility (transitional)

Keep normalizers in `scripts.js` so old-style stages (`{ label, image }`) still work during the migration:

```js
function normalizeStage(stage) {
  if (stage.media) return stage;
  if (stage.image) return { label: stage.label, media: [{ type: "image", src: stage.image }] };
  return { label: stage.label, media: [] };
}
```

Run every stage through this on render. Once all data is migrated, you can delete the function.

---

## 4. Visual / interaction design

This is the part that most needs to feel intentional. The portfolio is a 3D artist's storefront — recruiters scroll fast, so the visuals carry the weight.

### 4.1 Mosaic (CSS grid)

**Library decision: don't use one.** The shipped site uses a **CSS grid** mosaic (`repeat(3, 1fr)` → 2 → 1 columns). See `DESIGN.md` §4.6 for the exact rules.

**Single-item fallback:** if a stage has 1 media item, render it full-width centered (max-width ~70vw) instead of a 1-column mosaic — avoids the "lonely tile" look.

```js
function renderStageMedia(mediaArray, altText) {
  if (mediaArray.length === 1) return renderMediaSolo(mediaArray[0], altText);
  return renderMediaMosaic(mediaArray, altText);
}
```

### 4.2 Stage labels

For staged projects, each stage gets a small label *above* its mosaic — minimal type, accent-colored, generous space:

```
─────────────  H I G H   P O L Y  ─────────────
    [mosaic]
```

Use `letter-spacing: 0.4em; font-family: var(--font-display); color: var(--color-accent);`. The thin rules on either side preserve visual rhythm between stage blocks and hero sections.

Gallery projects don't render stage labels (no stages), they just show one mosaic under the hero.

### 4.3 Video tiles

Default state: poster image visible, no controls, no autoplay.

On hover: video begins playing muted + looping. On mouse-leave: pause and reset to poster.

```js
function attachHoverPlay(videoEl) {
  videoEl.addEventListener("mouseenter", () => videoEl.play());
  videoEl.addEventListener("mouseleave", () => { videoEl.pause(); videoEl.currentTime = 0; });
}
```

A small "▶" badge in the corner makes it obvious the tile is video, even before hover. Also: on touch devices (`@media (hover: none)`), fall back to autoplay-muted-loop with `playsinline` — phones don't have hover.

```html
<video class="media-video" muted loop playsinline preload="metadata"
       poster="...-poster.jpg" src="....mp4"></video>
```

Use `preload="metadata"` (not `auto`) so the page doesn't download every video upfront — just enough for dimensions and the poster.

### 4.4 Lightbox

Clicking any mosaic item opens a fullscreen overlay:

- Black/95% backdrop, click-outside or Esc to close
- Prev / Next arrows + arrow keys cycle through the *current stage's* media (or current gallery's media)
- Index indicator: `3 / 7` bottom-center
- Videos in the lightbox get real `controls`

Implemented as **`mountLightbox()`** — creates the overlay DOM once and wires delegated clicks / keyboard handlers (not an HTML string `renderLightbox()`).

### 4.5 Hero with video

When `project.hero.type === "video"`, replace the hero's `background-image` div with a stacked `<video>` element + dark overlay + name + tools. The video autoplays muted, looped, on the project hero (this is the "look at me" moment, autoplay is fine here even on mobile because the user has scrolled to the project).

### 4.6 Tool labels

**Shipped:** uppercase **text badges** on the hero and mosaic cards, mapped through `TOOL_DISPLAY_NAMES`. Extend that map (and optionally add PNGs under `assets/icons/` for future use).

### 4.7 Category landing tiles — five categories

**Shipped:** `renderInfoFlagship` (Characters, Creatures, Props) + `renderInfoBottom` (Generalist, SFX) inside `.info-right`, with a **65% / 35%** vertical split on desktop — see `DESIGN.md` §4.1 and `styles.css` (`.info-flagship`, `.info-bottom`). This replaces the older single `.info-tiles` six-column `nth-child` sketch.

---

## 5. Updated render functions

```js
renderInfoSection / renderInfoPersonal / renderInfoFlagship / renderInfoBottom
renderContactSection
renderCategorySection / renderCategoryMosaic / renderProjectCard
renderProjectHero / renderProjectAbout / renderProjectBody
renderProjectStages / renderProjectGallery
pickRendersStage / renderRendersBlock / renderHighlightsBlock / renderStageAccordion / renderStageBlock
renderMediaTile / renderMediaSolo / renderMediaMosaic / renderStageMedia
attachHoverPlay / attachCardVideoPlay
mountLightbox
```

Dispatcher in `renderProjectBody`:

```js
function renderProjectBody(project) {
  const normalized = normalizeProject(project);
  const aboutHtml = renderProjectAbout(normalized);
  const inner = normalized.type === "gallery"
    ? renderProjectGallery(normalized)
    : renderProjectStages(normalized);
  return `<div class="project-body" id="body-${project.id}">${aboutHtml}${inner}<!-- + collapse button --></div>`;
}
```

`init()` (simplified — see `scripts.js` for the full sequence): render info + categories + contact, `mountLightbox()`, `attachHoverPlay` / `attachCardVideoPlay`, hero and mosaic interaction handlers, hash scroll, `.site-nav` + observers, back-to-top.

---

## 6. Performance & accessibility (don't skip)

- **Lazy-load images**: `<img loading="lazy" decoding="async">` on every mosaic item.
- **Lazy-load videos**: `preload="metadata"` only; consider `IntersectionObserver` to swap `src` in once the tile enters viewport for very heavy projects.
- **Width/height attributes** on every `<img>` — eliminates CLS. Populate via the build-time aspect script.
- **Alt text**: at minimum `alt="${project.name} — ${stage.label}"`. Empty alt only for purely decorative items.
- **Keyboard navigation**: lightbox must respond to Esc, ←, →. Tile focus-visible ring.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` should disable hover-video and overlay transitions.
- **Color contrast**: white-on-image text needs a gradient scrim, not just a flat 55% black overlay, so it stays readable on both bright and dark images. Add `linear-gradient(to top, rgba(0,0,0,0.85), transparent 40%)` to the hero overlay.

---

## 7. Routing / deep-linking

**Shipped:** hero `#` button writes `history.replaceState` to `#projectId`; on load, `location.hash` triggers `scrollIntoView`. Legacy `#makeup` / `#sculpture` remap to `#sfx`. Section nav uses smooth scrolling (not raw anchor jumps).

---

## 8. Implementation order (concrete steps for Claude Code)

This is the order I'd recommend running through. Each step is small enough to be one Claude Code task.

### Phase 1 — Asset reorganization (mostly bash, no JS)

1. **Confirm SFX project groupings with Itziar** — answered historically (Section 10); adjust `portfolioData` if scope changes.
2. **Write `scripts/reorganize-assets.sh`**: a shell script that reads a manifest (CSV or JSON of "old path → new path") and `git mv`s files into the new structure. Reviewable, reversible.
3. **Write `scripts/generate-posters.sh`**: walks `assets/`, finds every `.mp4`, generates a `*-poster.jpg` via ffmpeg if missing.
4. **Write `scripts/optimize-videos.sh`**: re-encodes all `.mp4` to web-friendly H.264, strips audio, caps at 5 MB-ish.
5. **(Optional) `scripts/fill-aspect-ratios.mjs`**: a Node script that reads every image, computes width/height, and emits a JSON `{path: aspect}` map you can paste into `portfolioData`.

### Phase 2 — Schema migration (JS only)

6. **Update `portfolioData` to v2 schema** (Section 3.1). **Done** — five categories (`sfx` not `makeup`), staged + gallery projects, mosaic layouts where needed.
7. **Add `normalizeStage` and `normalizeProject`** so the renderer never sees raw old data.

### Phase 3 — Render layer

8. **`renderMediaTile` + `renderMediaMosaic` + `renderMediaSolo`** — the new media primitives. Includes hover-play wiring.
9. **`renderStageBlock` + `renderProjectStages`** — staged projects.
10. **`renderProjectGallery`** — gallery projects.
11. **Update `renderProjectHero`** to handle video heroes.
12. **Update `renderInfoSection`** for flagship + bottom tile layout (Section 4.7).

### Phase 4 — Polish

13. **Lightbox** — `mountLightbox()` + event wiring.
14. **Hash-based deep links** (Section 7).
15. **Reduced-motion + lazy-load + alt text audit.**
16. **Cross-browser test pass** with Playwright (Chromium + WebKit at minimum — Safari handles autoplay video differently).

---

## 9. Setting up Claude Code for this project

A few pieces will make the Claude Code experience much better:

### 9.1 `CLAUDE.md` at the repo root

**Status:** `CLAUDE.md` exists and is the primary agent instructions file. **`.github/copilot-instructions.md`** should stay aligned for GitHub Copilot (shorter mirror).

Contents should include: project context, guardrails, `DESIGN.md` pointer, lint/screenshot commands, asset scripts, and schema notes (or pointers to `DESIGN.md` §2).

### 9.2 Use Plan Mode for the big steps

In Claude Code, use **Plan Mode** (`Shift+Tab` to toggle) when starting Phase 1, 2, and 3. It'll outline its approach before touching files — much easier to course-correct than after.

### 9.3 One subtask at a time

Claude Code does best with focused asks. Work the Implementation Order top-to-bottom, one numbered item per session. After each:

- Skim the diff
- Run `htmlhint` / `stylelint` (your existing convention)
- Run a Playwright screenshot to eyeball the result
- Commit with a clear message

### 9.4 Use the `/init` and slash commands

If you haven't already: `/init` in a fresh Claude Code session will bootstrap a `CLAUDE.md` from the existing repo state, which you can then edit. Also worth setting up:
- `/clear` between phases — keeps the context tight, faster + cheaper
- A custom slash command `.claude/commands/screenshot.md` with the Playwright screenshot recipe baked in

### 9.5 Skeleton `CLAUDE.md` template

The literal contents I'd put at the repo root — see the second file in this output.

---

## 10. Answered product questions (historical)

1. **Makeup groupings** — do the 6 proposed projects in Section 1.3 match how Itziar thinks about them, or should it be fewer/more?
**ANSWER** = YES THEY MATCH.

2. **Sketches as one project or many?** — currently planned as one big mosaic. Could be split (Snake / Tiger / Dolfo / Player)
if she wants to label them.
**ANSWER** = THE SKETCHES CAN BE DIVIDED INTO THE FOLLOWING PROJECTS (DOLFO+SNAKE / TIGER / PLAYER)

3. **The Foot's storyboard PDF** — link it as a downloadable, embed via `<object>`, or omit?

**ANSWER** = OMIT THE PDF, I EXPORTED IT INTO 3 JPGS (ONE PER PAGE).

4. **Bone Dagger and the empty Crime_Shoes/Blockout** — Bone Dagger only has 2 images total (render + wireframe). Treat as a tiny staged project (one stage "Render", one stage "Wireframe") or as a 2-image gallery? Latter is probably cleaner.

**ANSWER** = BONE DAGGER IS A SMALL PROJECT, TREAT IT AS A 2-IMAGE GALLERY.

5. **Showreel placement** — is the 1-min showreel important enough to also live on the landing page (info section), or is it fine buried inside Generalist?

**ANSWER** = THE SHOWREEL IS OLD, IT SHOULD BE AUTOPLAYING AS A THUMBNAIL OF THE GENERALIST SECTION.

---

## 11. What this plan deliberately does NOT change

- The dark / gold-accent / Bebas Neue + DM Sans visual language.
- The single-page, no-framework, no-build-step constraint.
- The BEM CSS naming convention.
- The "all content lives in `portfolioData`" rule.
- Hosting on GitHub Pages.
- The render-functions-return-strings architecture (exception: **`mountLightbox()`** builds DOM imperatively once at startup).

The extension was additive. **If this plan conflicts with `DESIGN.md` or with the code, update `DESIGN.md` / `CLAUDE.md` / this file to match reality** — the running site and `portfolioData` are the behavioral source of truth.

---

## 12. Responsive rebuild (Apr 2026)

Full CSS-only responsive pass targeting all viewports from 360px up. Desktop (≥1024px) styles were locked throughout.

**What changed:**

- **Info section (≤1023px):** Desktop's 320px avatar column + 65/35 flagship/bottom split replaced with a vertical stack — full-width personal tile on top, then a 2-column `aspect-ratio: 4/3` category grid below. At ≤767px drops to single column with `aspect-ratio: 16/9` tiles.
- **Site nav (≤1023px):** Compact spacing + right-edge `mask-image` fade affordance. Each link enforces `min-width: 44px` + 48px height (HIG 44×44). No hamburger.
- **Project heroes:** Image heroes switch to `background-size: cover; background-position: center top` at ≤1023px. Video heroes gain a cinematic top-vignette overlay. At ≤767px, hero is `height: auto; min-height: 62vh`; title un-absoluted and font-scaled to `clamp(2rem, 9vw, 2.75rem)`; tools un-absoluted to a full-width flex row below the title.
- **Tool pills:** `min-height: 44px` at ≤767px.
- **Lightbox:** Pointer swipe added in `mountLightbox()` (pointerdown/pointerup, deltaX > 50px in < 500ms). Buttons resized to 48×48 on mobile and repositioned to bottom-20%.
- **Hero actions:** `@media (hover: none) and (pointer: coarse)` keeps `.project-hero__actions` always visible on touch.
- **Verification script:** `scripts/verify-responsive.mjs` — asserts no horizontal scroll + 44×44 tap-target audit at all 6 viewports.
