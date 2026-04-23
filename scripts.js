// 1. DATA
const portfolioData = {
  artist: {
    name: "Itziar Martín Molina",
    title: "3D Artist",
    avatar: "assets/avatar.png",
    bio: "Passionate 3D Artist specializing in Characters, Props, and Creatures. Dedicated to bringing high-quality digital art to life.",
    contact: {
      email: "email@example.com",
      artstation: "https://artstation.com/",
      linkedin: "https://linkedin.com/"
    }
  },

  categories: [
    { id: "characters", label: "Characters",             thumbnail: "assets/characters/assassin-elf/hero-poster.jpg", hoverText: "View Characters", focalPoint: "15% 50%" },
    { id: "creatures",  label: "Creatures",              thumbnail: "assets/creatures/alien/hero-poster.jpg",         hoverText: "View Creatures", focalPoint: "15% 100%" },
    { id: "props",      label: "Props",                  thumbnail: "assets/props/crime-shoes/hero-poster.jpg",       hoverText: "View Props", focalPoint: "40% 50%" },
    { id: "generalist", label: "Generalist",             thumbnail: "assets/generalist/the-foot/hero-poster.jpg", hoverText: "View Generalist", focalPoint: "50% 50%" },
    { id: "sfx",        label: "SFX Makeup & Sculpting", thumbnail: "assets/makeup/clay-face/details-face.jpg",           hoverText: "View SFX", focalPoint: "50% 30%" }
  ],

  projects: [

    // ── CHARACTERS ──────────────────────────────────────────────────────────
    {
      id: "assassin-elf",
      category: "characters",
      type: "staged",
      name: "Assassin Elf",
      tools: ["zbrush", "maya", "substance", "xgen", "marmoset"],
      hero: { type: "video", src: "assets/characters/assassin-elf/hero.mp4", poster: "assets/characters/assassin-elf/hero-poster.jpg", aspect: 1.778 },
      stages: [
        {
          label: "Blockout",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf.jpg",    aspect: 2.38  },
            { type: "image", src: "assets/characters/assassin-elf/blockout/elf-02.jpg", aspect: 2.273 }
          ]
        },
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/highpoly/bru.jpg",              aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/skin.jpg",             aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/solo.jpg",             aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/orna.jpg",             aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/ornamentos.jpg",       aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/ornaments-try-01.jpg", aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/ornaments-try-02.jpg", aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/shoes.jpg",            aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/dudas.jpg",            aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/dudas-02.jpg",         aspect: 1.631 },
            { type: "image", src: "assets/characters/assassin-elf/highpoly/done.jpg",             aspect: 1.631 }
          ]
        },
        {
          label: "Retopology",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/retopology/retopo-01.png", aspect: 0.846 },
            { type: "image", src: "assets/characters/assassin-elf/retopology/retopo-02.png", aspect: 0.472 },
            { type: "image", src: "assets/characters/assassin-elf/retopology/retopo-03.png", aspect: 0.701 },
            { type: "image", src: "assets/characters/assassin-elf/retopology/retopo-04.png", aspect: 0.711 },
            { type: "video", src: "assets/characters/assassin-elf/retopology/process-01.mp4", poster: "assets/characters/assassin-elf/retopology/process-01-poster.jpg", aspect: 0.578 }
          ]
        },
        {
          label: "Bakes",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/bakes/bake-01.png", aspect: 0.573  },
            { type: "image", src: "assets/characters/assassin-elf/bakes/bake-02.png", aspect: 0.521  },
            { type: "image", src: "assets/characters/assassin-elf/bakes/bake-03.png", aspect: 1.49   },
            { type: "image", src: "assets/characters/assassin-elf/bakes/bake-04.png", aspect: 1.516  }
          ]
        },
        {
          label: "Textures",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-01.png", aspect: 1.077 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-02.png", aspect: 1.228 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-03.png", aspect: 1.882 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-04.png", aspect: 0.569 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-05.png", aspect: 0.342 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-06.png", aspect: 1     },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-07.png", aspect: 0.532 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-08.png", aspect: 1.037 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-09.png", aspect: 0.521 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-10.png", aspect: 1.186 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-11.png", aspect: 1.007 },
            { type: "image", src: "assets/characters/assassin-elf/textures/texture-12.png", aspect: 0.521 },
            { type: "video", src: "assets/characters/assassin-elf/textures/process-01.mp4", poster: "assets/characters/assassin-elf/textures/process-01-poster.jpg", aspect: 1.002 },
            { type: "video", src: "assets/characters/assassin-elf/textures/process-02.mp4", poster: "assets/characters/assassin-elf/textures/process-02-poster.jpg", aspect: 0.582 },
            { type: "video", src: "assets/characters/assassin-elf/textures/process-03.mp4", poster: "assets/characters/assassin-elf/textures/process-03-poster.jpg", aspect: 1.155 },
            { type: "video", src: "assets/characters/assassin-elf/textures/process-04.mp4", poster: "assets/characters/assassin-elf/textures/process-04-poster.jpg", aspect: 0.554 },
            { type: "video", src: "assets/characters/assassin-elf/textures/process-05.mp4", poster: "assets/characters/assassin-elf/textures/process-05-poster.jpg", aspect: 0.865 }
          ]
        },
        {
          label: "XGen",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/xgen/xgen-01.png",                                                                                    aspect: 0.759 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-01.mp4", poster: "assets/characters/assassin-elf/xgen/process-01-poster.jpg", aspect: 2.618 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-02.mp4", poster: "assets/characters/assassin-elf/xgen/process-02-poster.jpg", aspect: 0.674 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-03.mp4", poster: "assets/characters/assassin-elf/xgen/process-03-poster.jpg", aspect: 1.044 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-04.mp4", poster: "assets/characters/assassin-elf/xgen/process-04-poster.jpg", aspect: 1.227 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-05.mp4", poster: "assets/characters/assassin-elf/xgen/process-05-poster.jpg", aspect: 1.053 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-06.mp4", poster: "assets/characters/assassin-elf/xgen/process-06-poster.jpg", aspect: 0.911 }
          ]
        },
        {
          label: "Render",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/render/render-01.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-02.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-03.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-04.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-05.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-06.png", aspect: 1.778 }
          ]
        }
      ]
    },

    // ── CREATURES ──────────────────────────────────────────────────────────
    {
      id: "alien",
      category: "creatures",
      type: "staged",
      name: "Alien",
      tools: ["zbrush", "maya", "substance", "marmoset"],
      hero: { type: "video", src: "assets/creatures/alien/hero.mp4", poster: "assets/creatures/alien/hero-poster.jpg", aspect: 1.778 },
      stages: [
        {
          label: "Blockout",
          media: [
            { type: "image", src: "assets/creatures/alien/blockout/alien.jpg",            aspect: 3.111 },
            { type: "image", src: "assets/creatures/alien/blockout/alien-cual.jpg",       aspect: 2.051 },
            { type: "image", src: "assets/creatures/alien/blockout/blocking-02.jpg",      aspect: 1.579 },
            { type: "image", src: "assets/creatures/alien/blockout/blocking-05.jpg",      aspect: 1.616 },
            { type: "image", src: "assets/creatures/alien/blockout/closeup.jpg",          aspect: 1.631 },
            { type: "image", src: "assets/creatures/alien/blockout/persp-vs-neutral.jpg", aspect: 1.631 },
            { type: "image", src: "assets/creatures/alien/blockout/teeth.jpg",            aspect: 1.631 },
            { type: "image", src: "assets/creatures/alien/blockout/uvs.jpg",              aspect: 1.631 }
          ]
        },
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-01.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-02.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-03.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-04.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-05.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-06.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-07.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/apof.jpg",        aspect: 1.626 },
            { type: "image", src: "assets/creatures/alien/highpoly/head.jpg",        aspect: 1.626 },
            { type: "image", src: "assets/creatures/alien/highpoly/veins.jpg",       aspect: 1.626 }
          ]
        },
        {
          label: "Textures",
          media: [
            { type: "image", src: "assets/creatures/alien/textures/texture-01.png",                                                                             aspect: 0.623 },
            { type: "video", src: "assets/creatures/alien/textures/process-01.mp4", poster: "assets/creatures/alien/textures/process-01-poster.jpg", aspect: 0.936 }
          ]
        },
        {
          label: "UDIMs",
          media: [
            { type: "image", src: "assets/creatures/alien/udims/udim-01.png", aspect: 3.306 },
            { type: "image", src: "assets/creatures/alien/udims/udim-02.png", aspect: 0.956 }
          ]
        },
        {
          label: "Render",
          media: [
            { type: "image", src: "assets/creatures/alien/render/render-01.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-02.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-03.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-04.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-05.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-06.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-07.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/render/render-08.png", aspect: 1.778 },
            { type: "video", src: "assets/creatures/alien/360.mp4",              poster: "assets/creatures/alien/360-poster.jpg",              aspect: 1.778 }
          ]
        }
      ]
    },

    // ── PROPS ───────────────────────────────────────────────────────────────
    {
      id: "crime-shoes",
      category: "props",
      type: "staged",
      name: "Crime Shoes",
      tools: ["zbrush", "maya", "substance", "marmoset"],
      hero: { type: "video", src: "assets/props/crime-shoes/hero.mp4", poster: "assets/props/crime-shoes/hero-poster.jpg", aspect: 1.778 },
      stages: [
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/props/crime-shoes/highpoly/reference.jpg",   aspect: 1.631 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-01.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-02.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-03.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-04.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-05.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-06.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-07.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-08.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/highpoly/highpoly-09.png", aspect: 1.778 }
          ]
        },
        {
          label: "Retopology",
          media: [
            { type: "video", src: "assets/props/crime-shoes/retopology/process-01.mp4", poster: "assets/props/crime-shoes/retopology/process-01-poster.jpg", aspect: 1.11 }
          ]
        },
        {
          label: "Textures",
          media: [
            { type: "video", src: "assets/props/crime-shoes/textures/process-01.mp4", poster: "assets/props/crime-shoes/textures/process-01-poster.jpg", aspect: 1.614 },
            { type: "video", src: "assets/props/crime-shoes/textures/process-02.mp4", poster: "assets/props/crime-shoes/textures/process-02-poster.jpg", aspect: 1.728 }
          ]
        },
        {
          label: "Render",
          media: [
            { type: "image", src: "assets/props/crime-shoes/render/render-01.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-02.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-03.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-04.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-05.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-06.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-07.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-08.png", aspect: 1.778 },
            { type: "image", src: "assets/props/crime-shoes/render/render-09.png", aspect: 1.778 }
          ]
        }
      ]
    },
    {
      id: "bone-dagger",
      category: "props",
      type: "gallery",
      name: "Bone Dagger",
      tools: ["zbrush", "maya", "substance", "marmoset"],
      hero: { type: "image", src: "assets/props/bone-dagger/render.jpg", aspect: 1.778 },
      media: [
        { type: "image", src: "assets/props/bone-dagger/render.jpg",    aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/wireframe.jpg", aspect: 1.778 }
      ]
    },

    // ── SFX ─────────────────────────────────────────────────────────────────
    {
      id: "kelsier",
      category: "sfx",
      type: "gallery",
      name: "Kelsier",
      tools: [],
      hero: { type: "image", src: "assets/makeup/kelsier/kelsier-01.jpg", aspect: 0.753 },
      media: [
        { type: "image", src: "assets/makeup/kelsier/kelsier-01.jpg", aspect: 0.753 },
        { type: "image", src: "assets/makeup/kelsier/kelsier-02.png", aspect: 0.753 },
        { type: "image", src: "assets/makeup/kelsier/kelsier-03.png", aspect: 0.753 },
        { type: "image", src: "assets/makeup/kelsier/kelsier-04.jpg", aspect: 0.799 },
        { type: "image", src: "assets/makeup/kelsier/kelsier-05.png", aspect: 0.726 }
      ]
    },
    {
      id: "the-doll",
      category: "sfx",
      type: "gallery",
      name: "The Doll",
      tools: [],
      hero: { type: "image", src: "assets/makeup/the-doll/doll-01.png", aspect: 1.001 },
      media: [
        { type: "image", src: "assets/makeup/the-doll/doll-01.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-02.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-03.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-04.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-05.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-06.png", aspect: 1.001 },
        { type: "image", src: "assets/makeup/the-doll/doll-07.png", aspect: 1.001 }
      ]
    },
    {
      id: "old-skin",
      category: "sfx",
      type: "gallery",
      name: "Old Skin",
      tools: [],
      hero: { type: "image", src: "assets/makeup/old-skin/old-skin-01.jpg", aspect: 0.75 },
      media: [
        { type: "image", src: "assets/makeup/old-skin/old-skin-01.jpg", aspect: 0.75 },
        { type: "image", src: "assets/makeup/old-skin/old-skin-02.jpg", aspect: 0.75 },
        { type: "image", src: "assets/makeup/old-skin/old-skin-03.jpg", aspect: 0.75 },
        { type: "image", src: "assets/makeup/old-skin/old-skin-04.jpg", aspect: 0.75 }
      ]
    },
    {
      id: "beast-book",
      category: "sfx",
      type: "gallery",
      name: "Beast Book",
      tools: [],
      hero: { type: "image", src: "assets/makeup/beast-book/beast-book-01.jpg", aspect: 1.333 },
      media: [
        { type: "image", src: "assets/makeup/beast-book/beast-book-01.jpg", aspect: 1.333 },
        { type: "image", src: "assets/makeup/beast-book/beast-book-02.jpg", aspect: 1.333 },
        { type: "image", src: "assets/makeup/beast-book/beast-book-03.jpg", aspect: 1.333 }
      ]
    },
    {
      id: "clay-face",
      category: "sfx",
      type: "gallery",
      name: "Clay Face",
      tools: [],
      hero: { type: "image", src: "assets/makeup/clay-face/clay-face-01.jpg", aspect: 0.75 },
      media: [
        { type: "image", src: "assets/makeup/clay-face/clay-face-01.jpg",     aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/clay-face-02.png",     aspect: 1.778 },
        { type: "image", src: "assets/makeup/clay-face/clay-face-square.png", aspect: 1     },
        { type: "image", src: "assets/makeup/clay-face/details-face.jpg",     aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/face-01.jpg",          aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/face-02.png",          aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/prosthetic.jpg",       aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/prosthetic.png",       aspect: 1     },
        { type: "image", src: "assets/makeup/clay-face/painted-face.png",     aspect: 1     },
        { type: "image", src: "assets/makeup/clay-face/side-face.jpg",        aspect: 0.75  },
        { type: "image", src: "assets/makeup/clay-face/wip-01.png",           aspect: 1.778 },
        { type: "image", src: "assets/makeup/clay-face/wip-02.png",           aspect: 1.778 }
      ]
    },
    {
      id: "dolfo-makeup",
      category: "sfx",
      type: "gallery",
      name: "Dolfo",
      tools: [],
      hero: { type: "image", src: "assets/makeup/dolfo/dolfo-01.jpg", aspect: 1.333 },
      media: [
        { type: "image", src: "assets/makeup/dolfo/dolfo-01.jpg", aspect: 1.333 },
        { type: "image", src: "assets/makeup/social-makeup/dolfo-02.jpg", aspect: 1.39  },
        { type: "image", src: "assets/makeup/social-makeup/dolfo-03.png", aspect: 0.767 },
        { type: "image", src: "assets/makeup/social-makeup/dolfo-04.png", aspect: 0.736 },
        { type: "image", src: "assets/makeup/social-makeup/dolfo-05.png", aspect: 2.307 },
        { type: "image", src: "assets/makeup/social-makeup/dolfo-06.png", aspect: 1.483 }
      ]
    },

    // ── GENERALIST ──────────────────────────────────────────────────────────
    {
      id: "showreel",
      category: "generalist",
      type: "gallery",
      pinned: true,
      name: "Showreel",
      tools: [],
      hero: { type: "video", src: "assets/generalist/showreel/showreel.mp4", poster: "assets/generalist/showreel/showreel-poster.jpg", aspect: 1.778 },
      media: [
        { type: "video", src: "assets/generalist/showreel/showreel.mp4",      poster: "assets/generalist/showreel/showreel-poster.jpg",      aspect: 1.778 },
        { type: "video", src: "assets/generalist/showreel/animation-10s.mp4", poster: "assets/generalist/showreel/animation-10s-poster.jpg", aspect: 1.778 }
      ]
    },
    {
      id: "the-foot",
      category: "generalist",
      type: "gallery",
      name: "The Foot",
      tools: ["maya"],
      hero: { type: "video", src: "assets/generalist/the-foot/hero.mp4", poster: "assets/generalist/the-foot/hero-poster.jpg", aspect: 1.778 },
      media: [
        { type: "image", src: "assets/generalist/the-foot/ants-concept.png",  aspect: 1.778 },
        { type: "image", src: "assets/generalist/the-foot/storyboard-01.jpg", aspect: 1.294 },
        { type: "image", src: "assets/generalist/the-foot/storyboard-02.jpg", aspect: 1.294 },
        { type: "image", src: "assets/generalist/the-foot/storyboard-03.jpg", aspect: 1.294 },
        { type: "video", src: "assets/generalist/the-foot/process-01.mp4", poster: "assets/generalist/the-foot/process-01-poster.jpg", aspect: 1.984 },
        { type: "video", src: "assets/generalist/the-foot/process-02.mp4", poster: "assets/generalist/the-foot/process-02-poster.jpg", aspect: 2.007 },
        { type: "video", src: "assets/generalist/the-foot/process-03.mp4", poster: "assets/generalist/the-foot/process-03-poster.jpg", aspect: 1.606 },
        { type: "video", src: "assets/generalist/the-foot/process-04.mp4", poster: "assets/generalist/the-foot/process-04-poster.jpg", aspect: 1.856 }
      ]
    },
    {
      id: "xali",
      category: "generalist",
      type: "gallery",
      name: "Xali",
      tools: ["maya", "blender"],
      hero: { type: "image", src: "assets/generalist/xali/hero.png", aspect: 1.741 },
      media: [
        { type: "image", src: "assets/generalist/xali/xali.png",       aspect: 1.778 },
        { type: "image", src: "assets/generalist/xali/model.png",      aspect: 1.778 },
        { type: "image", src: "assets/generalist/xali/model-side.png", aspect: 1.669 },
        { type: "image", src: "assets/generalist/xali/maps.png",       aspect: 1.778 },
        { type: "image", src: "assets/generalist/xali/reference.png",  aspect: 1.778 },
        { type: "image", src: "assets/generalist/xali/versions.png",   aspect: 1.74  },
        { type: "image", src: "assets/generalist/xali/retopo-02.png",  aspect: 1.012 },
        { type: "image", src: "assets/generalist/xali/retopo-03.png",  aspect: 1.066 },
        { type: "image", src: "assets/generalist/xali/retopo-04.png",  aspect: 1.032 },
        { type: "image", src: "assets/generalist/xali/uvs-map.png",    aspect: 1     },
        { type: "video", src: "assets/generalist/xali/process-01.mp4", poster: "assets/generalist/xali/process-01-poster.jpg", aspect: 1.898 },
        { type: "video", src: "assets/generalist/xali/process-02.mp4", poster: "assets/generalist/xali/process-02-poster.jpg", aspect: 3.097 },
        { type: "video", src: "assets/generalist/xali/process-03.mp4", poster: "assets/generalist/xali/process-03-poster.jpg", aspect: 1.874 },
        { type: "video", src: "assets/generalist/xali/process-04.mp4", poster: "assets/generalist/xali/process-04-poster.jpg", aspect: 1.77  },
        { type: "video", src: "assets/generalist/xali/process-05.mp4", poster: "assets/generalist/xali/process-05-poster.jpg", aspect: 1.403 },
        { type: "video", src: "assets/generalist/xali/process-06.mp4", poster: "assets/generalist/xali/process-06-poster.jpg", aspect: 1.339 },
        { type: "video", src: "assets/generalist/xali/process-07.mp4", poster: "assets/generalist/xali/process-07-poster.jpg", aspect: 1.238 },
        { type: "video", src: "assets/generalist/xali/process-08.mp4", poster: "assets/generalist/xali/process-08-poster.jpg", aspect: 2.252 }
      ]
    },
    {
      id: "black-lodge",
      category: "generalist",
      type: "gallery",
      name: "Black Lodge",
      tools: ["blender"],
      hero: { type: "image", src: "assets/generalist/black-lodge/hero.jpg", aspect: 1.778 },
      media: [
        { type: "image", src: "assets/generalist/black-lodge/render-night-01.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/wireframe-01.jpg",    aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/wireframe-02.jpg",    aspect: 1.778 }
      ]
    },
    {
      id: "dolfo-snake",
      category: "generalist",
      type: "gallery",
      name: "Dolfo & Snake",
      tools: [],
      hero: { type: "image", src: "assets/generalist/dolfo-snake/concept-dolfo.jpg", aspect: 0.726 },
      media: [
        { type: "image", src: "assets/generalist/dolfo-snake/concept-dolfo.jpg",    aspect: 0.726 },
        { type: "image", src: "assets/generalist/dolfo-snake/concept-misc.jpg",     aspect: 0.726 },
        { type: "image", src: "assets/generalist/dolfo-snake/concept-snake.jpg",    aspect: 0.726 },
        { type: "image", src: "assets/generalist/dolfo-snake/dolfo-poses.jpg",      aspect: 0.726 },
        { type: "image", src: "assets/generalist/dolfo-snake/expression-snake.jpg", aspect: 0.726 }
      ]
    },
    {
      id: "tiger",
      category: "generalist",
      type: "gallery",
      name: "Tiger",
      tools: [],
      hero: { type: "image", src: "assets/generalist/tiger/concept-tiger.jpg", aspect: 0.726 },
      media: [
        { type: "image", src: "assets/generalist/tiger/concept-tiger.jpg",    aspect: 0.726 },
        { type: "image", src: "assets/generalist/tiger/expression-tiger.jpg", aspect: 0.726 }
      ]
    },
    {
      id: "player",
      category: "generalist",
      type: "gallery",
      name: "Player",
      tools: ["unity"],
      hero: { type: "image", src: "assets/generalist/player/game-player-04.png", aspect: 1 },
      media: [
        { type: "image", src: "assets/generalist/player/game-player-04.png", aspect: 1 },
        { type: "image", src: "assets/generalist/player/death-player.png",   aspect: 1 },
        { type: "image", src: "assets/generalist/player/game-player.gif",    aspect: 1 }
      ]
    }

  ]
};

// 2. NORMALIZERS

function normalizeStage(stage) {
  if (stage.media) return stage;
  if (stage.image) return { label: stage.label, media: [{ type: "image", src: stage.image }] };
  return { label: stage.label, media: [] };
}

function normalizeProject(project) {
  const type = project.type || "staged";
  if (type === "staged" && project.stages) {
    return { ...project, type, stages: project.stages.map(normalizeStage) };
  }
  return { ...project, type };
}

// 3. RENDER FUNCTIONS

function renderMediaTile(mediaItem, altText) {
  const alt = altText || '';
  const aspectStyle = mediaItem.aspect ? ` style="aspect-ratio: ${mediaItem.aspect}"` : '';

  if (mediaItem.type === 'video') {
    return `
      <figure class="media-tile media-tile--video" tabindex="0"
        data-type="video" data-src="${mediaItem.src}" data-poster="${mediaItem.poster || ''}"${aspectStyle}>
        <video muted loop playsinline preload="metadata" poster="${mediaItem.poster || ''}">
          <source src="${mediaItem.src}" type="video/mp4">
        </video>
        <span class="media-tile__play-badge" aria-hidden="true">▶</span>
      </figure>
    `;
  }

  return `
    <figure class="media-tile" tabindex="0"
      data-type="image" data-src="${mediaItem.src}"${aspectStyle}>
      <img src="${mediaItem.src}" alt="${alt}" loading="lazy" decoding="async"${mediaItem.aspect ? ` width="800" height="${Math.round(800 / mediaItem.aspect)}"` : ''}>
    </figure>
  `;
}

function attachHoverPlay(container) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const noHover = window.matchMedia('(hover: none)').matches;
  const videoTiles = container.querySelectorAll('.media-tile--video video');

  videoTiles.forEach(video => {
    if (noHover) {
      video.setAttribute('autoplay', '');
    } else {
      video.addEventListener('mouseenter', () => video.play());
      video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
}

function renderMediaSolo(mediaItem, altText) {
  return `<div class="media-solo">${renderMediaTile(mediaItem, altText)}</div>`;
}

function renderMediaMosaic(mediaArray, altText) {
  const tilesHtml = mediaArray.map(m => renderMediaTile(m, altText)).join('');
  return `<div class="media-mosaic">${tilesHtml}</div>`;
}

function renderStageMedia(mediaArray, altText) {
  if (mediaArray.length === 1) return renderMediaSolo(mediaArray[0], altText);
  return renderMediaMosaic(mediaArray, altText);
}

function mountLightbox() {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Media viewer');
  lb.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <div class="lightbox__content"></div>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8592;</button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8594;</button>
    <button class="lightbox__close" aria-label="Close">&#215;</button>
    <div class="lightbox__counter"></div>
  `;
  document.body.appendChild(lb);

  let items = [];
  let currentIndex = 0;

  function getGroup(tile) {
    const group = tile.closest('.media-mosaic') || tile.closest('.media-solo');
    if (!group) return [tile];
    return Array.from(group.querySelectorAll('.media-tile'));
  }

  function showItem(index) {
    const tile = items[index];
    const { type, src, poster = '' } = tile.dataset;
    const content = lb.querySelector('.lightbox__content');
    const prevVideo = content.querySelector('video');
    if (prevVideo) prevVideo.pause();

    if (type === 'video') {
      content.innerHTML = `
        <video controls autoplay muted loop playsinline poster="${poster}">
          <source src="${src}" type="video/mp4">
        </video>
      `;
    } else {
      content.innerHTML = `<img src="${src}" alt="">`;
    }

    lb.querySelector('.lightbox__counter').textContent = `${index + 1} / ${items.length}`;
    currentIndex = index;
  }

  function open(tiles, index) {
    items = tiles;
    showItem(index);
    lb.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    const video = lb.querySelector('video');
    if (video) video.pause();
    setTimeout(() => { lb.querySelector('.lightbox__content').innerHTML = ''; }, 300);
  }

  function navigate(dir) {
    showItem((currentIndex + dir + items.length) % items.length);
  }

  document.body.addEventListener('click', e => {
    const tile = e.target.closest('.media-tile');
    if (!tile || tile.closest('.lightbox')) return;
    const group = getGroup(tile);
    open(group, group.indexOf(tile));
  });

  lb.querySelector('.lightbox__backdrop').addEventListener('click', close);
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__nav--prev').addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
  lb.querySelector('.lightbox__nav--next').addEventListener('click', e => { e.stopPropagation(); navigate(1); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

function renderInfoPersonal(artist) {
  let socialsHtml = '';
  if (artist.contact) {
    const { email, artstation, linkedin } = artist.contact;
    if (email) socialsHtml += `<a href="mailto:${email}" class="info-personal__social-link">Email</a>`;
    if (artstation) socialsHtml += `<a href="${artstation}" target="_blank" rel="noopener noreferrer" class="info-personal__social-link">ArtStation</a>`;
    if (linkedin) socialsHtml += `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="info-personal__social-link">LinkedIn</a>`;
  }
  return `
    <aside class="info-personal">
      <div class="info-personal__bg" style="background-image: url('${artist.avatar}');"></div>
      <div class="overlay">
        <p class="info-personal__bio">${artist.bio}</p>
        <div class="info-personal__socials">${socialsHtml}</div>
      </div>
      <div class="info-personal__content">
        <span class="info-personal__eyebrow">Portfolio</span>
        <h1 class="info-personal__name">${artist.name}</h1>
        <h2 class="info-personal__title">${artist.title}</h2>
      </div>
    </aside>
  `;
}

function renderInfoTile(cat, n, modifier) {
  const hasFocalAxes = cat.focalX !== undefined || cat.focalY !== undefined;
  const backgroundPosition = cat.focalPoint || (hasFocalAxes
    ? `${cat.focalX ?? 50}% ${cat.focalY ?? 50}%`
    : 'center');
  return `
    <button class="info-tile ${modifier}" data-target="${cat.id}">
      <div class="info-tile__bg" style="background-image: url('${cat.thumbnail}'); background-position: ${backgroundPosition};"></div>
      <div class="overlay"><span class="info-tile__hover-text">${cat.hoverText}</span></div>
      <div class="info-tile__header">
        <span class="info-tile__index">${n}</span>
      </div>
      <div class="info-tile__footer">
        <h3 class="info-tile__label">${cat.label}</h3>
        <span class="info-tile__arrow" aria-hidden="true">&rarr;</span>
      </div>
    </button>`;
}

function renderInfoFlagship(categories) {
  const ids = ["characters", "creatures", "props"];
  return `
    <div class="info-flagship">
      ${ids.map((id, i) => {
        const cat = categories.find(c => c.id === id);
        if (!cat) return '';
        const n = String(i + 1).padStart(2, '0');
        return renderInfoTile(cat, n, 'info-tile--flagship');
      }).join('')}
    </div>
  `;
}

function renderInfoBottom(categories) {
  const ids = ["generalist", "sfx"];
  return `
    <div class="info-bottom">
      ${ids.map((id, i) => {
        const cat = categories.find(c => c.id === id);
        if (!cat) return '';
        const n = String(i + 4).padStart(2, '0');
        return renderInfoTile(cat, n, 'info-tile--bottom');
      }).join('')}
    </div>
  `;
}

function renderInfoSection(data) {
  const { artist, categories } = data;
  const personal = renderInfoPersonal(artist);
  const flagship = renderInfoFlagship(categories);
  const bottom = renderInfoBottom(categories);
  return `
    <div class="info-layout">
      ${personal}
      <div class="info-right">
        ${flagship}
        ${bottom}
      </div>
    </div>
  `;
}

function renderCategorySection(category, projects) {
  let projectsHtml = '';
  projects.forEach(project => {
    projectsHtml += renderProjectHero(project);
    projectsHtml += renderProjectBody(project);
  });

  return projectsHtml;
}

function renderProjectBody(project) {
  const normalized = normalizeProject(project);
  const inner = normalized.type === "gallery"
    ? renderProjectGallery(normalized)
    : renderProjectStages(normalized);
  const collapseBtn = `
    <div class="project-body__collapse">
      <button class="project-hero__expand-btn project-hero__expand-btn--open" type="button"
        data-target="body-${project.id}" aria-expanded="true" aria-controls="body-${project.id}">
        <span class="project-hero__expand-label">Hide</span>
        <span class="project-hero__expand-chevron" aria-hidden="true">▾</span>
      </button>
    </div>`;
  return `<div class="project-body" id="body-${project.id}">${inner}${collapseBtn}</div>`;
}

function renderStageBlock(stage, projectName) {
  const normalized = normalizeStage(stage);
  const altText = `${projectName} — ${normalized.label}`;
  return `
    <div class="stage-block">
      <div class="stage-block__label"><span>${normalized.label.toUpperCase()}</span></div>
      ${renderStageMedia(normalized.media, altText)}
    </div>
  `;
}

function renderProjectStages(project) {
  if (!project.stages || project.stages.length === 0) return '';
  return project.stages.map(stage => renderStageBlock(stage, project.name)).join('');
}

function renderProjectGallery(project) {
  return renderStageMedia(project.media || [], project.name);
}

const TOOL_DISPLAY_NAMES = Object.freeze({
  blender: 'Blender',
  marmoset: 'Marmoset',
  maya: 'Maya',
  photoshop: 'Photoshop',
  substance: 'Substance',
  unity: 'Unity',
  xgen: 'XGen',
  zbrush: 'ZBrush'
});

function getToolDisplayName(tool) {
  return TOOL_DISPLAY_NAMES[tool] || tool;
}

function renderProjectHero(project) {
  const toolsHtml = project.tools.map(tool => {
    const toolName = getToolDisplayName(tool);
    return `
    <span class="project-hero__tool" data-tool="${tool}">
      <span class="project-hero__tool-fallback">${toolName}</span>
    </span>
  `;
  }).join('');

  const isVideo = project.hero?.type === "video";
  const heroClass = isVideo ? 'project-hero project-hero--video' : 'project-hero project-hero--image';
  const heroStyle = isVideo
    ? `style="--project-hero-aspect: ${project.hero?.aspect ?? 1.778};"`
    : `style="background-image: url('${project.hero?.src ?? ''}');"`;
  const videoHtml = isVideo ? `
    <video class="project-hero__video" autoplay muted loop playsinline preload="metadata" poster="${project.hero.poster}">
      <source src="${project.hero.src}" type="video/mp4">
    </video>` : '';

  return `
    <div id="${project.id}" class="${heroClass}" ${heroStyle}>
      ${videoHtml}
      <div class="project-hero__overlay"></div>
      <button class="project-hero__anchor" aria-label="Copy link to ${project.name}">#</button>
      <h3 class="project-hero__title">${project.name}</h3>
      <div class="project-hero__tools">${toolsHtml}</div>
      <button class="project-hero__expand-btn" type="button"
        data-target="body-${project.id}" aria-expanded="false" aria-controls="body-${project.id}">
        <span class="project-hero__expand-label">Show More</span>
        <span class="project-hero__expand-chevron" aria-hidden="true">▾</span>
      </button>
    </div>
  `;
}

function renderProjectStage(stage) {
  const src = stage.media?.[0]?.src ?? '';
  return `
    <div class="project-stage" style="background-image: url('${src}');"></div>
  `;
}


// 4. INIT

function init() {
  const legacyHashes = { '#makeup': '#sfx', '#sculpture': '#sfx' };
  if (legacyHashes[location.hash]) {
    history.replaceState(null, '', legacyHashes[location.hash]);
  }

  // 1. Render Info Section
  const infoSection = document.getElementById('info-section');
  if (infoSection) {
    infoSection.innerHTML = renderInfoSection(portfolioData);
    
    // Attach event listeners for smooth scrolling
    const tiles = infoSection.querySelectorAll('.info-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const targetId = tile.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 2. Render Project Categories
  portfolioData.categories.forEach(cat => {
    const categoryElement = document.getElementById(cat.id);
    if (categoryElement) {
      const projectsInCategory = portfolioData.projects
        .filter(p => p.category === cat.id)
        .slice()
        .sort((a, b) => (b.pinned === true) - (a.pinned === true));
      categoryElement.innerHTML = renderCategorySection(cat, projectsInCategory);
    }
  });

  mountLightbox();
  attachHoverPlay(document.body);

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.project-hero__expand-btn');
    if (!btn) return;
    const body = document.getElementById(btn.dataset.target);
    if (!body) return;
    const willOpen = !body.classList.contains('project-body--visible');
    body.classList.toggle('project-body--visible', willOpen);
    document.querySelectorAll(`.project-hero__expand-btn[data-target="${btn.dataset.target}"]`).forEach(b => {
      b.classList.toggle('project-hero__expand-btn--open', willOpen);
      b.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      b.querySelector('.project-hero__expand-label').textContent = willOpen ? 'Hide' : 'Show More';
    });
    if (willOpen) {
      requestAnimationFrame(() => {
        body.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (!willOpen) {
      const hero = document.getElementById(btn.dataset.target.replace('body-', ''));
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.querySelectorAll('.project-hero__anchor').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.stopPropagation();
      const projectId = anchor.closest('.project-hero').id;
      history.replaceState(null, '', '#' + projectId);
    });
  });

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
    }
  }

  // 3. Sticky nav
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.innerHTML = `<ul class="site-nav__list">
      <li class="site-nav__item"><a class="site-nav__link" href="#info-section" data-target="info-section">Home</a></li>
      ${portfolioData.categories.map(c =>
        `<li class="site-nav__item"><a class="site-nav__link" href="#${c.id}" data-target="${c.id}">${c.label}</a></li>`
      ).join('')}
    </ul>`;

    siteNav.addEventListener('click', e => {
      const link = e.target.closest('.site-nav__link');
      if (!link) return;
      e.preventDefault();
      document.getElementById(link.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    });

    const navLinks = siteNav.querySelectorAll('.site-nav__link');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('site-nav__link--active'));
          const active = siteNav.querySelector(`.site-nav__link[data-target="${entry.target.id}"]`);
          if (active) active.classList.add('site-nav__link--active');
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('main > section').forEach(s => sectionObserver.observe(s));
    const infoSection = document.getElementById('info-section');
    if (infoSection) sectionObserver.observe(infoSection);
  }

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.textContent = '↑';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver(([entry]) => {
    backToTop.classList.toggle('back-to-top--visible', !entry.isIntersecting);
  }, { threshold: 0 });
  observer.observe(document.getElementById('info-section'));
}

document.addEventListener('DOMContentLoaded', init);
