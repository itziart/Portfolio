# Portfolio Extension Plan — Itziar Martín Molina

> **Purpose:** Source-of-truth planning document for extending the existing portfolio with new categories, multi-image stages, and video support. Pairs with `DESIGN.md` (existing) and feeds Claude Code via `CLAUDE.md` (new, see Section 9).

---

## 0. TL;DR — what changes

1. **Two new top-level categories**: `makeup` (Makeup & Sculpture) and `generalist` (Animations, Scene, Sketches, Games).
2. **Stages become media groups**: each stage holds an array of media items (images or videos), not a single image. Rendered as a **masonry mosaic**, with a single-item fallback that doesn't look broken.
3. **Project thumbnails support video**: if a project has a final `.mp4`, it becomes the thumbnail. Static poster frame when idle, autoplay muted + loop on hover.
4. **Generalist & Makeup keep the project model but skip stages**: each project is just a hero + a single mosaic of media. No `Blockout / HighPoly / etc.` labels.
5. **Lightbox added**: clicking any mosaic item opens a fullscreen overlay with prev/next.
6. **One small data migration**: existing projects' `stages[].image` becomes `stages[].media: [{type, src}]`. Backward-compatible loader keeps old data working during the transition.

Nothing about the visual identity changes — the dark, gold-accent, Bebas Neue / DM Sans palette stays. The new sections inherit the same tone.

---

## 1. New Information Architecture

### 1.1 Categories (final list)

| ID | Label | Type | Notes |
|---|---|---|---|
| `characters` | Characters | staged | existing, e.g. Assassin Elf |
| `props` | Props | staged | existing, e.g. Bone Dagger, Crime Shoes |
| `creatures` | Creatures | staged | existing, e.g. Alien |
| `makeup` | Makeup & Sculpture | gallery | NEW — physical work, photos only |
| `generalist` | Generalist | gallery | NEW — Animations, Scene, Sketches, Games |

Two **project types** — declared per project, not per category, so the system stays flexible:

- `"type": "staged"` — has named stages (Blockout, HighPoly, Textures, …). Used by Characters / Props / Creatures.
- `"type": "gallery"` — single mosaic of mixed media, no stage labels. Used by Makeup and Generalist.

### 1.2 Generalist sub-projects (proposed mapping from your folder dump)

The Generalist folder has internal structure (`Animations/`, `Scene/`, `Sketches/`, `Games/`). Map each into one or more gallery projects:

| Folder | Proposed projects |
|---|---|
| `Animations/The Foot/` | one project: **The Foot** (animation) — `THE_FOOT_.mp4` as hero, plus screen recordings + storyboard PDF as a stretch item |
| `Animations/Xali/` | one project: **Xali** — model PNGs + screen recordings, the cleanest render as hero |
| `Animations/GeneralistShowReel.mp4` + `ItziarMartinMolina_Animacion10s.mp4` | one project: **Showreel** — both videos in the mosaic |
| `Scene/` | one project: **Black Lodge** (the Twin Peaks scene — clearly themed); pick one `BLACKLODGEOFFICIALrenderdia.jpg` as hero, wireframes + night renders in mosaic |
| `Sketches/` | one project: **Concept Sketches** — flat mosaic of all sketches, no hero distinction needed |
| `Games/` | empty for now — **omit until populated** |

### 1.3 Makeup & Sculpture sub-projects (proposed mapping)

The folder is currently flat with mixed subjects. Inferring groupings from filenames:

| Proposed project | Likely files |
|---|---|
| **Kelsier** (clay sculpture) | `modeladokelsier*`, `modelokelsier3.png`, `modeladoskelsier.jpg` |
| **The Doll** | `DOLL.png`, `DOLL2…6.png`, `DOLL1 - copia.png` |
| **Old Skin** (FX makeup) | `OldSkin1…4.jpeg`, `prosthethic.jpg`, `prosthethic.png` |
| **Beast Book** | `BeastBook.jpeg`, `BeastBook2.jpeg`, `BeastBook3.jpeg` |
| **Clay Face** | `clayface.*`, `clayfacesquare.png`, `face.jpg`, `face.png`, `PAINTEDFCE.png`, `detailsface.jpg`, `sideface.jpg`, `leftside.png` |
| **Dolfo Makeup** | `dolfomakinfof.jpg`, `MEWORKIGFINALSLIDE.jpg`, the 2024-02-24 screenshots |

> **Action item for Itziar:** confirm or correct these groupings before the asset rename pass. This is the only step that genuinely needs her input — everything else is mechanical.

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
├── makeup/
│   ├── thumb.jpg
│   ├── kelsier/, the-doll/, old-skin/, beast-book/, clay-face/, dolfo/
└── generalist/
    ├── thumb.jpg
    ├── the-foot/, xali/, showreel/, black-lodge/, sketches/
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

```js
const portfolioData = {
  artist: { /* unchanged */ },
  categories: [
    { id: "characters",  label: "Characters",          thumbnail: "assets/characters/thumb.jpg",  hoverText: "View Characters" },
    { id: "creatures",   label: "Creatures",           thumbnail: "assets/creatures/thumb.jpg",   hoverText: "View Creatures" },
    { id: "props",       label: "Props",               thumbnail: "assets/props/thumb.jpg",       hoverText: "View Props" },
    { id: "makeup",      label: "Makeup & Sculpture",  thumbnail: "assets/makeup/thumb.jpg",      hoverText: "View Makeup" },
    { id: "generalist",  label: "Generalist",          thumbnail: "assets/generalist/thumb.jpg",  hoverText: "View Generalist" },
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
      // thumbnail used in category banner / index — falls back to hero if absent
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

    // GALLERY PROJECT — Makeup / Generalist
    {
      id: "kelsier",
      category: "makeup",
      type: "gallery",
      name: "Kelsier",
      year: 2025,
      description: "Clay sculpture study.",
      tools: [],                                  // gallery projects often have no tool icons
      hero: {
        type: "image",
        src: "assets/makeup/kelsier/hero.jpg"
      },
      thumbnail: { type: "image", src: "assets/makeup/kelsier/hero.jpg" },

      // gallery projects use `media` directly — no stages
      media: [
        { type: "image", src: "assets/makeup/kelsier/01.png" },
        { type: "image", src: "assets/makeup/kelsier/02.png" },
        { type: "image", src: "assets/makeup/kelsier/03.jpg" },
        { type: "image", src: "assets/makeup/kelsier/04.png" }
      ]
    }
  ]
};
```

### 3.2 Media item shape (the only new primitive)

```ts
type Media =
  | { type: "image"; src: string; alt?: string; aspect?: number }   // aspect = width/height, optional, helps masonry
  | { type: "video"; src: string; poster: string; alt?: string; aspect?: number };
```

`aspect` is optional but nice-to-have: if you populate it, the masonry can reserve correct space *before* the image loads, eliminating layout shift. A small build-time script (Section 8.3) can fill it automatically.

### 3.3 Backward compatibility (transitional)

Keep a tiny normalizer in `script.js` so old-style stages (`{ label, image }`) still work during the migration:

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

### 4.1 Mosaic (masonry)

**Library decision: don't use one.** Pure CSS masonry is good enough for this scale and avoids a JS dependency:

```css
.media-mosaic {
  column-count: 3;
  column-gap: var(--spacing-sm);
}
.media-mosaic > * {
  break-inside: avoid;
  margin-bottom: var(--spacing-sm);
  width: 100%;
}
@media (max-width: 1024px) { .media-mosaic { column-count: 2; } }
@media (max-width: 640px)  { .media-mosaic { column-count: 1; } }
```

This gives a Pinterest-style layout that handles any number of images and any aspect ratios. Tradeoff: items fill top-to-bottom by column (not strict left-to-right reading order). For a portfolio, this is fine and arguably better.

**Single-item fallback:** if a stage has 1 media item, render it full-width centered (max-width ~70vw) instead of a 1-column mosaic — avoids the "lonely tile" look.

```js
function renderStageMedia(stage) {
  if (stage.media.length === 1) return renderMediaSolo(stage.media[0]);
  return renderMediaMosaic(stage.media);
}
```

### 4.2 Stage labels

For staged projects, each stage gets a small label *above* its mosaic — minimal type, accent-colored, generous space:

```
─────────────  H I G H   P O L Y  ─────────────
    [mosaic]
```

Use `letter-spacing: 0.4em; font-family: var(--font-display); color: var(--color-accent);`. The thin rules on either side echo the category banner style so the rhythm stays consistent.

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

Build this from scratch — ~80 lines of vanilla JS, no dependency. Spec it as a separate render function `renderLightbox()` and event-wire it once globally.

### 4.5 Hero with video

When `project.hero.type === "video"`, replace the hero's `background-image` div with a stacked `<video>` element + dark overlay + name + tools. The video autoplays muted, looped, on the project hero (this is the "look at me" moment, autoplay is fine here even on mobile because the user has scrolled to the project).

### 4.6 Tool icons — extend the set

From the folder evidence you'll need at minimum: `zbrush`, `maya`, `substance`, `marmoset`, `blender`, `unreal`, `xgen`, `photoshop`, `unity`. Source pngs from each tool's brand kit or use generic glyphs. Keep the white-filter convention from the existing spec.

### 4.7 Category landing tiles — 5 categories now

The current info section does "2 top + 1 bottom". With 5 categories that breaks. Options:

1. **3 top + 2 bottom** asymmetric grid (recommended — visually interesting)
2. **2 + 2 + 1** three rows
3. **2-column scrolling tile column on the right** (mobile-friendly)

Recommended is option 1, with custom column spans:

```css
.info-tiles {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
  gap: var(--spacing-xs);
  height: 100%;
}
.info-tile:nth-child(1) { grid-column: span 2; }   /* Characters */
.info-tile:nth-child(2) { grid-column: span 2; }   /* Creatures */
.info-tile:nth-child(3) { grid-column: span 2; }   /* Props */
.info-tile:nth-child(4) { grid-column: span 3; }   /* Makeup */
.info-tile:nth-child(5) { grid-column: span 3; }   /* Generalist */
```

Result: top row has three equal tiles (her 3D specialty), bottom row has two wider tiles (her broader work). Reads as a hierarchy.

---

## 5. Updated render functions

```js
// existing-ish
renderInfoSection(data)
renderCategorySection(category, projects)
renderProjectHero(project)            // updated: handles video hero
renderProjectFinal(project)           // can be removed — final render is just the last stage / gallery item now

// new
renderProjectStages(project)          // staged projects only — loops through stages
renderProjectGallery(project)         // gallery projects only — single mosaic
renderStageBlock(stage)               // label + media renderer
renderMediaMosaic(mediaArray)         // grid of <picture> / <video> tiles
renderMediaSolo(mediaItem)            // single centered tile
renderMediaTile(mediaItem)            // one tile, image or video, with hover-play wiring
renderLightbox()                      // mounted once, opened on tile click
```

Dispatcher in `renderProjectBody`:

```js
function renderProjectBody(project) {
  if (project.type === "gallery") return renderProjectGallery(project);
  return renderProjectStages(project);   // default = staged
}
```

`init()` becomes:

```js
function init() {
  renderInfoSection(portfolioData);
  portfolioData.categories.forEach(cat => {
    const projects = portfolioData.projects.filter(p => p.category === cat.id);
    if (projects.length === 0) return;            // hide empty categories
    renderCategorySection(cat, projects);
  });
  mountLightbox();
  wireScrollBehavior();
}
```

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

## 7. Routing / deep-linking (optional but recommended)

Right now everything is one long scroll. For a portfolio, that's fine — but consider:

- **Hash-based deep links per project**: `index.html#assassin-elf` scrolls to and highlights that project on load. Trivial to add (`location.hash` on click, `scrollIntoView` on load), and lets her share specific work in Instagram bio / DMs.
- **Project IDs become URLs.** That's another reason the rename in Section 2 matters.

---

## 8. Implementation order (concrete steps for Claude Code)

This is the order I'd recommend running through. Each step is small enough to be one Claude Code task.

### Phase 1 — Asset reorganization (mostly bash, no JS)

1. **Confirm Makeup project groupings with Itziar** (see Section 1.3).
2. **Write `scripts/reorganize-assets.sh`**: a shell script that reads a manifest (CSV or JSON of "old path → new path") and `git mv`s files into the new structure. Reviewable, reversible.
3. **Write `scripts/generate-posters.sh`**: walks `assets/`, finds every `.mp4`, generates a `*-poster.jpg` via ffmpeg if missing.
4. **Write `scripts/optimize-videos.sh`**: re-encodes all `.mp4` to web-friendly H.264, strips audio, caps at 5 MB-ish.
5. **(Optional) `scripts/fill-aspect-ratios.mjs`**: a Node script that reads every image, computes width/height, and emits a JSON `{path: aspect}` map you can paste into `portfolioData`.

### Phase 2 — Schema migration (JS only)

6. **Update `portfolioData` to v2 schema** (Section 3.1). Add the 5 categories. Add at least one staged project (Assassin Elf) and one gallery project (Kelsier) end-to-end as the proof points.
7. **Add `normalizeStage` and `normalizeProject`** so the renderer never sees raw old data.

### Phase 3 — Render layer

8. **`renderMediaTile` + `renderMediaMosaic` + `renderMediaSolo`** — the new media primitives. Includes hover-play wiring.
9. **`renderStageBlock` + `renderProjectStages`** — staged projects.
10. **`renderProjectGallery`** — gallery projects.
11. **Update `renderProjectHero`** to handle video heroes.
12. **Update `renderInfoSection`** for the 5-tile grid (Section 4.7).

### Phase 4 — Polish

13. **Lightbox** — `renderLightbox` + event wiring.
14. **Hash-based deep links** (Section 7).
15. **Reduced-motion + lazy-load + alt text audit.**
16. **Cross-browser test pass** with Playwright (Chromium + WebKit at minimum — Safari handles autoplay video differently).

---

## 9. Setting up Claude Code for this project

A few pieces will make the Claude Code experience much better:

### 9.1 `CLAUDE.md` at the repo root

Claude Code reads this automatically on every session. Replace the existing `copilot-instructions.md` with a `CLAUDE.md` that combines:

- **Project context** (lifted from `copilot-instructions.md` — it's already excellent)
- **Pointer to `DESIGN.md` and `EXTENSION_PLAN.md` as sources of truth**
- **The "What Claude Should Never Do" list** (rename from "Copilot")
- **Commands Claude should know**: how to run the local server, lint, screenshot, run the asset scripts
- **Schema v2 reference** (or just point to Section 3 of this doc)

A skeleton is in `CLAUDE.md.template` (Section 9.5 below).

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

## 10. Open questions before coding starts

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
- The render-functions-return-strings architecture.

The extension is additive. If at any point a change here conflicts with `DESIGN.md`, `DESIGN.md` should be updated first to match — keep one source of truth, don't let the two drift.
