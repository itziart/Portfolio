// 1. DATA
const portfolioData = {
  artist: {
    name: "Itziar Martín Molina",
    title: "3D Artist",
    avatar: "assets/avatar.png",
    bio: "Passionate 3D Artist specializing in Characters, Props, and Creatures. Dedicated to bringing high-quality digital art to life.",
    contact: {
      email: "itziarfx@gmail.com",
      phone: "+34 601030660",
      instagram: "https://www.instagram.com/itzi.artt/",
      artstation: "https://www.artstation.com/itziart",
      linkedin: "https://linkedin.com/in/itziart",
      languages: "English, Spanish",
      location: "Madrid, Spain / Wroclaw, Poland, willing to relocate"
    }
  },

  categories: [
    { id: "characters", label: "Characters",             thumbnail: "assets/characters/assassin-elf/hero-poster.jpg", hoverText: "View Characters", focalPoint: "15% 50%" },
    { id: "creatures",  label: "Creatures",              thumbnail: "assets/creatures/alien/hero-poster.jpg",         hoverText: "View Creatures", focalPoint: "15% 100%" },
    { id: "props",      label: "Props",                  thumbnail: "assets/props/crime-shoes/hero-poster.jpg",       hoverText: "View Props", focalPoint: "40% 50%" },
    { id: "generalist", label: "Generalist",             thumbnail: "assets/generalist/the-foot/hero-poster.jpg", hoverText: "View Generalist", focalPoint: "50% 50%", layout: "mosaic" },
    { id: "sfx",        label: "SFX Makeup & Sculpting", thumbnail: "assets/sfx/highlights/details-face.jpg",           hoverText: "View SFX", focalPoint: "50% 30%", layout: "mosaic" }
  ],

  projects: [

    // ── CHARACTERS ──────────────────────────────────────────────────────────
    {
      id: "assassin-elf",
      category: "characters",
      type: "staged",
      name: "Assassin Elf",
      description: "This project marks a big step for me. It's my first time pushing toward realism in a character, and I've learned a lot throughout the process. This character is based on a <a href=\"https://www.artstation.com/artwork/r9911E\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"project-about__link\">concept</a> by BangkuART, which served as the visual foundation for the project.",
      tools: ["zbrush", "maya", "substance", "xgen", "marmoset"],
      hero: { type: "video", src: "assets/characters/assassin-elf/hero.mp4", poster: "assets/characters/assassin-elf/hero-poster.jpg", aspect: 1.778 },
      stages: [
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/highpoly/skin.jpg", aspect: 1.631 }
          ]
        },
        {
          label: "XGen",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/xgen/xgen-01.png", aspect: 0.759 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-01.mp4", poster: "assets/characters/assassin-elf/xgen/process-01-poster.jpg", aspect: 2.618 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-02.mp4", poster: "assets/characters/assassin-elf/xgen/process-02-poster.jpg", aspect: 0.674 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-03.mp4", poster: "assets/characters/assassin-elf/xgen/process-03-poster.jpg", aspect: 1.044 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-04.mp4", poster: "assets/characters/assassin-elf/xgen/process-04-poster.jpg", aspect: 1.227 },
            { type: "video", src: "assets/characters/assassin-elf/xgen/process-05.mp4", poster: "assets/characters/assassin-elf/xgen/process-05-poster.jpg", aspect: 1.053 }
          ]
        },
        {
          label: "Render",
          media: [
            { type: "image", src: "assets/characters/assassin-elf/render/render-01.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-02.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-03.png", aspect: 1.778 },
            { type: "image", src: "assets/characters/assassin-elf/render/render-04.png", aspect: 1.778 }
          ]
        }
      ]
    },

    // ── CREATURES ──────────────────────────────────────────────────────────
    {
      id: "alien",
      category: "creatures",
      type: "staged",
      name: "Neomorph Alien",
      description: "Created from a sphere, based on a <a href=\"https://www.artstation.com/artwork/owGnz\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"project-about__link\">concept</a> by Russell Dongjun Lu. This project helped me push my understanding of creature anatomy, proportions, and silhouette.",
      tools: ["zbrush", "maya", "substance", "marmoset", "rizom UV"],
      hero: { type: "video", src: "assets/creatures/alien/hero.mp4", poster: "assets/creatures/alien/hero-poster.jpg", aspect: 1.778 },
      stages: [
        {
          label: "High Poly",
          media: [
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-01.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-02.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-03.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/highpoly-04.png", aspect: 1.778 },
            { type: "image", src: "assets/creatures/alien/highpoly/apof.jpg",        aspect: 1.626 },
            { type: "image", src: "assets/creatures/alien/highpoly/veins.jpg",       aspect: 1.626 }
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
            { type: "image", src: "assets/creatures/alien/render/render-06.png", aspect: 1.778 }
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
      description: "Based on a <a href=\"https://www.artstation.com/artwork/owGnz\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"project-about__link\">concept</a> by notperera, in this project I wanted to challenge myself modelling something less organic while also trying to give storytelling to a mere prop and with my first handpainted project.",
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
          label: "Textures",
          media: [
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
            { type: "image", src: "assets/props/crime-shoes/render/render-06.png", aspect: 1.778 }
          ]
        }
      ]
    },
    {
      id: "bone-dagger",
      category: "props",
      type: "gallery",
      name: "Bone Dagger",
      tools: ["zbrush", "maya", "substance"],
      hero: { type: "image", src: "assets/props/bone-dagger/render.jpg", aspect: 1.778 },
      media: [
        { type: "image", src: "assets/props/bone-dagger/render.jpg",                        aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/wireframe.jpg",                     aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/itzi-art-anotherrenderneutra.webp", aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/itzi-art-renderneutrob0t.webp",     aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/itzi-art-renderneutroleft.webp",    aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/itzi-art-renderneutroside.webp",    aspect: 1.778 },
        { type: "image", src: "assets/props/bone-dagger/itzi-art-renderneutrotop.webp",     aspect: 1.778 }
      ]
    },

    // ── SFX ─────────────────────────────────────────────────────────────────
    {
      id: "kelsier",
      category: "sfx",
      type: "gallery",
      name: "Kelsier (Misfits)",
      tools: [],
      hero: { type: "image", src: "assets/sfx/kelsier/kelsier-04.jpg", aspect: 0.753 },
      media: [
        { type: "image", src: "assets/sfx/kelsier/kelsier-01.jpg", aspect: 0.753 },
        { type: "image", src: "assets/sfx/kelsier/kelsier-02.png", aspect: 0.753 },
        { type: "image", src: "assets/sfx/kelsier/kelsier-03.png", aspect: 0.753 },
        { type: "image", src: "assets/sfx/kelsier/kelsier-04.jpg", aspect: 0.799 }
      ]
    },
    {
      id: "the-doll-clay-face",
      category: "sfx",
      type: "staged",
      name: "Scary stories to tell in the dark (Miniature Doll + Clay Face)",
      description: "Project based on the movie that was inspired by a book with different stories. I merged 2 of them and designed the character based on it. It helped me understand better what happens to your body while decomposing.",
      tools: [],
      rendersStageLabel: null,
      hero: { type: "image", src: "assets/sfx/highlights/doll-07.png", aspect: 1.001 },
      highlights: [
        { type: "image", src: "assets/sfx/highlights/doll-01.png",      aspect: 1.001 },
        { type: "image", src: "assets/sfx/highlights/doll-07.png",      aspect: 1.001 },
        { type: "image", src: "assets/sfx/highlights/details-face.jpg", aspect: 0.75  },
        { type: "image", src: "assets/sfx/highlights/side-face.jpg",    aspect: 0.75  }
      ],
      stages: [
        {
          label: "Doll Miniature Visualization",
          media: [
            { type: "image", src: "assets/sfx/the-doll/doll-02.png", aspect: 1.001 },
            { type: "image", src: "assets/sfx/the-doll/doll-03.png", aspect: 1.001 },
            { type: "image", src: "assets/sfx/the-doll/doll-04.png", aspect: 1.001 },
            { type: "image", src: "assets/sfx/the-doll/doll-05.png", aspect: 1.001 },
            { type: "image", src: "assets/sfx/the-doll/doll-06.png", aspect: 1.001 }
          ]
        },
        {
          label: "The Clay Face",
          media: [
            { type: "image", src: "assets/sfx/clay-face/clay-face-01.jpg",     aspect: 0.75  },
            { type: "image", src: "assets/sfx/clay-face/face-01.jpg",          aspect: 0.75  },
            { type: "image", src: "assets/sfx/clay-face/prosthetic.jpg",       aspect: 0.75  }
          ]
        }
      ]
    },
    {
      id: "old-skin",
      category: "sfx",
      type: "gallery",
      name: "Aging",
      tools: [],
      hero: { type: "image", src: "assets/sfx/old-skin/old-skin-01.jpg", aspect: 0.75 },
      media: [
        { type: "image", src: "assets/sfx/old-skin/old-skin-01.jpg", aspect: 0.75 },
        { type: "image", src: "assets/sfx/old-skin/old-skin-02.jpg", aspect: 0.75 },
        { type: "image", src: "assets/sfx/old-skin/old-skin-03.jpg", aspect: 0.75 },
        { type: "image", src: "assets/sfx/old-skin/old-skin-04.jpg", aspect: 0.75 }
      ]
    },
    {
      id: "beast-book",
      category: "sfx",
      type: "gallery",
      name: "The Beast Book",
      description: "First time I laser cut a piece of porex which served as the base of this project that I later on sculpted the details with epoxy resin which gave me 20 minutes to work on the different items that assemble the book. It's my own twist to the Beast Book of Harry Potter with some Jujutsu Kaisen reference.",
      tools: [],
      hero: { type: "image", src: "assets/sfx/beast-book/beast-book-01.jpg", aspect: 1.333 },
      media: [
        { type: "image", src: "assets/sfx/beast-book/beast-book-01.jpg", aspect: 1.333 },
        { type: "image", src: "assets/sfx/beast-book/beast-book-02.jpg", aspect: 1.333 },
        { type: "image", src: "assets/sfx/beast-book/beast-book-03.jpg", aspect: 1.333 }
      ]
    },
    // ── GENERALIST ──────────────────────────────────────────────────────────
    {
      id: "showreel",
      category: "generalist",
      type: "gallery",
      pinned: true,
      openFullscreenOnly: true,
      name: "Generalist Showreel",
      tools: [],
      hero: { type: "video", src: "assets/generalist/showreel/showreel.mp4", poster: "assets/generalist/showreel/showreel-poster.jpg", aspect: 1.778, hasAudio: true },
      media: [
        { type: "video", src: "assets/generalist/showreel/showreel.mp4", poster: "assets/generalist/showreel/showreel-poster.jpg", aspect: 1.778, hasAudio: true }
      ]
    },
    {
      id: "animation-10s",
      category: "generalist",
      type: "gallery",
      pinned: true,
      openFullscreenOnly: true,
      name: "10s Frame to Frame Animation",
      tools: [],
      hero: { type: "video", src: "assets/generalist/showreel/animation-10s.mp4", poster: "assets/generalist/showreel/animation-10s-poster.jpg", aspect: 1.778, hasAudio: true },
      media: [
        { type: "video", src: "assets/generalist/showreel/animation-10s.mp4", poster: "assets/generalist/showreel/animation-10s-poster.jpg", aspect: 1.778, hasAudio: true }
      ]
    },
    {
      id: "the-foot",
      category: "generalist",
      type: "gallery",
      name: "The Foot - Group Animation",
      description: "3D Animation Project made from scratch which made us work under pressure and as a real team. We learned the animation pipeline and delivered a comic animation. I designed the ants, built the storyboard, sculpted both of them, animated them and also did the close up scene with textures included.",
      tools: ["zbrush", "blender", "adobe premiere"],
      hero: { type: "video", src: "assets/generalist/the-foot/hero.mp4", poster: "assets/generalist/the-foot/hero-poster.jpg", aspect: 1.778, hasAudio: true },
      media: [
        { type: "image", src: "assets/generalist/the-foot/ants-concept.png",  aspect: 1.778 },
        { type: "image", src: "assets/generalist/the-foot/storyboard.jpg", aspect: 0.431 },
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
      name: "Xali - XR HUB Bavaria VR Mascott",
      tools: ["maya", "zbrush", "Unity (Spatial)", "MetaQuest", "Blender"],
      hero: { type: "video", src: "assets/generalist/xali/xalihello.mp4", poster: "assets/generalist/xali/xalihello-poster.jpg", aspect: 1.741 },
      media: [
        { type: "image", src: "assets/generalist/xali/hero.png",       aspect: 0 },
        { type: "image", src: "assets/generalist/xali/uvs-map.png",    aspect: 1     },
        { type: "image", src: "assets/generalist/xali/xali.png",       aspect: 1.778 },
        { type: "video", src: "assets/generalist/xali/process-05.mp4", poster: "assets/generalist/xali/process-05-poster.jpg", aspect: 1.403 },
        { type: "video", src: "assets/generalist/xali/process-08.mp4", poster: "assets/generalist/xali/process-08-poster.jpg", aspect: 2.252 },
        { type: "video", src: "assets/generalist/xali/xalihello.mp4",  poster: "assets/generalist/xali/xalihello-poster.jpg",  aspect: 1.741 }
      ]
    },
    {
      id: "black-lodge",
      category: "generalist",
      type: "gallery",
      name: "Black Lodge - Twin Peaks Meets Magritte",
      description: "My first scene and big modeling project which made me learn the bases of 3D modelling and texturing in Maya. I wanted to create a dreamy environment, out of this world.",
      tools: ["maya", "photoshop"],
      hero: { type: "video", src: "assets/generalist/black-lodge/turnaorundscene.mp4", poster: "assets/generalist/black-lodge/hero.jpg", aspect: 1.778 },
      media: [
        { type: "image", src: "assets/generalist/black-lodge/hero.jpg", aspect: 1.778 },
        { type: "video", src: "assets/generalist/black-lodge/turnaorundscene.mp4", poster: "assets/generalist/black-lodge/hero.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/render-night-01.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/wireframe-01.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/wireframe-02.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/itzi-art-blacklodgeofficial.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/itzi-art-light.jpg", aspect: 1.778 },
        { type: "image", src: "assets/generalist/black-lodge/itzi-art-noche-background.jpg", aspect: 1.778 }
      ]
    },
    {
      id: "dolfo",
      category: "generalist",
      type: "staged",
      name: "Dolfo (Stop Motion + Character Cards)",
      description: "Stop Motion project executed by my classmates and I, the challenge was to create 9 cm figures with Jovi Clay and being able to animate them. I designed, sculpted and animated every character on this project.",
      tools: [],
      rendersStageLabel: "Stop Motion",
      hero: { type: "video", src: "assets/generalist/dolfo/dolfo.mp4", poster: "assets/generalist/dolfo/dolfo-01.jpg", aspect: 1.333 },
      stages: [
        {
          label: "Stop Motion",
          media: [
            { type: "video", src: "assets/generalist/dolfo/dolfo.mp4", poster: "assets/generalist/dolfo/dolfo-poster.jpg", aspect: 1.778, hasAudio: true },
            { type: "image", src: "assets/generalist/dolfo/dolfo-01.jpg", aspect: 1.333 }
          ]
        },
        {
          label: "Dolfo, Snake & Tiger Sketches",
          media: [
            { type: "image", src: "assets/generalist/dolfo-snake/concept-dolfo.jpg",    aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/concept-misc.jpg",     aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/concept-snake.jpg",    aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/dolfo-poses.jpg",      aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/expression-snake.jpg", aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/concept-tiger.jpg",    aspect: 0.726 },
            { type: "image", src: "assets/generalist/dolfo-snake/expression-tiger.jpg", aspect: 0.726 }
          ]
        }
      ]
    },
    {
      id: "player",
      category: "generalist",
      type: "gallery",
      name: "Player",
      tools: [],
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
    const hasAudioAttr = mediaItem.hasAudio ? ' data-has-audio="true"' : '';
    return `
      <figure class="media-tile media-tile--video" tabindex="0"
        data-type="video" data-src="${mediaItem.src}" data-poster="${mediaItem.poster || ''}"${hasAudioAttr}${aspectStyle}>
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

function attachCardVideoPlay(container) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  const noHover = window.matchMedia('(hover: none)').matches;
  if (noHover) return;

  container.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('.project-card__video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
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
    const { type, src, poster = '', hasAudio = '' } = tile.dataset;
    const content = lb.querySelector('.lightbox__content');
    const prevVideo = content.querySelector('video');
    if (prevVideo) prevVideo.pause();

    if (type === 'video') {
      const mutedAttr = hasAudio === 'true' ? 'muted data-has-audio="true"' : 'muted';
      content.innerHTML = `
        <video controls autoplay ${mutedAttr} loop playsinline poster="${poster}">
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

  // Touch/pointer swipe — skip if originating on video controls to avoid
  // hijacking the seek bar gesture
  let swipeStartX = null;
  let swipeStartTime = null;

  lb.addEventListener('pointerdown', e => {
    if (e.target.closest('video')) return;
    swipeStartX = e.clientX;
    swipeStartTime = Date.now();
  });

  lb.addEventListener('pointerup', e => {
    if (swipeStartX === null) return;
    const dx = e.clientX - swipeStartX;
    const dt = Date.now() - swipeStartTime;
    swipeStartX = null;
    swipeStartTime = null;
    if (Math.abs(dx) > 50 && dt < 500) {
      navigate(dx < 0 ? 1 : -1);
    }
  });
}

function renderInfoPersonal(artist) {
  let metaRowsHtml = '';
  let pillsHtml = '';

  if (artist.contact) {
    const { email, phone, instagram, artstation, linkedin, languages, location } = artist.contact;

    if (email) metaRowsHtml += `
      <li class="info-personal__meta-row">
        <span class="info-personal__meta-label">Mail</span>
        <a href="mailto:${email}" class="info-personal__meta-value info-personal__meta-value--link">${email}</a>
      </li>`;
    if (phone) metaRowsHtml += `
      <li class="info-personal__meta-row">
        <span class="info-personal__meta-label">Phone</span>
        <a href="tel:${phone.replace(/\s+/g, '')}" class="info-personal__meta-value info-personal__meta-value--link">${phone}</a>
      </li>`;
    if (languages) metaRowsHtml += `
      <li class="info-personal__meta-row">
        <span class="info-personal__meta-label">Languages</span>
        <span class="info-personal__meta-value">${languages}</span>
      </li>`;
    if (location) metaRowsHtml += `
      <li class="info-personal__meta-row">
        <span class="info-personal__meta-label">Location</span>
        <span class="info-personal__meta-value">${location}</span>
      </li>`;

    if (instagram) pillsHtml += `<a href="${instagram}" target="_blank" rel="noopener noreferrer" class="info-personal__pill">Instagram</a>`;
    if (artstation) pillsHtml += `<a href="${artstation}" target="_blank" rel="noopener noreferrer" class="info-personal__pill">ArtStation</a>`;
    if (linkedin) pillsHtml += `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="info-personal__pill">LinkedIn</a>`;
  }

  return `
    <aside class="info-personal">
      <div class="info-personal__bg" style="background-image: url('${artist.avatar}');"></div>
      <div class="overlay">
        <div class="info-personal__overlay-header">Contact</div>
        <p class="info-personal__bio">${artist.bio}</p>
        <ul class="info-personal__meta">${metaRowsHtml}</ul>
        <div class="info-personal__pills">${pillsHtml}</div>
      </div>
      <div class="info-personal__content">
        <span class="info-personal__eyebrow">Portfolio</span>
        <h1 class="info-personal__name">${artist.name}</h1>
        <h2 class="info-personal__title">${artist.title}</h2>
        <p class="info-personal__hint" aria-hidden="true">— Contact Me —</p>
      </div>
    </aside>
  `;
}

function renderContactSection(artist) {
  const contact = artist.contact || {};
  const socialLinks = [];
  const contactRows = [];

  if (contact.email) {
    socialLinks.push(`<a href="mailto:${contact.email}" class="contact-section__link">Email</a>`);
    contactRows.push(`<li class="contact-section__item"><span class="contact-section__label">Mail</span><span class="contact-section__value">${contact.email}</span></li>`);
  }
  if (contact.phone) {
    socialLinks.push(`<a href="tel:${contact.phone.replace(/\s+/g, '')}" class="contact-section__link">Phone</a>`);
    contactRows.push(`<li class="contact-section__item"><span class="contact-section__label">Phone</span><span class="contact-section__value">${contact.phone}</span></li>`);
  }
  if (contact.instagram) {
    socialLinks.push(`<a href="${contact.instagram}" target="_blank" rel="noopener noreferrer" class="contact-section__link">Instagram</a>`);
  }
  if (contact.linkedin) {
    socialLinks.push(`<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-section__link">LinkedIn</a>`);
  }
  if (contact.artstation) {
    socialLinks.push(`<a href="${contact.artstation}" target="_blank" rel="noopener noreferrer" class="contact-section__link">ArtStation</a>`);
  }
  if (contact.languages) {
    contactRows.push(`<li class="contact-section__item"><span class="contact-section__label">Languages</span><span class="contact-section__value">${contact.languages}</span></li>`);
  }
  if (contact.location) {
    contactRows.push(`<li class="contact-section__item"><span class="contact-section__label">Location</span><span class="contact-section__value">${contact.location}</span></li>`);
  }

  return `
    <div class="contact-section__inner">
      <p class="contact-section__eyebrow">Get In Touch</p>
      <h2 class="contact-section__title">Contact</h2>
      <ul class="contact-section__list">${contactRows.join('')}</ul>
      <div class="contact-section__links">${socialLinks.join('')}</div>
    </div>
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

function renderProjectCard(project) {
  const isVideoHero = project.hero?.type === "video";
  const openFullscreenOnly = isVideoHero && project.openFullscreenOnly === true;
  const heroSrc = isVideoHero
    ? (project.hero.poster || '')
    : (project.hero?.src || '');
  const focalPoint = project.hero?.focalPoint || 'center';

  const toolsHtml = project.tools.length
    ? `<div class="project-card__tools">${project.tools.map(tool => `
        <span class="project-card__tool" data-tool="${tool}">
          <span class="project-card__tool-label">${getToolDisplayName(tool)}</span>
        </span>`).join('')}</div>`
    : '';

  const cardVideoHtml = isVideoHero ? `
    <video class="project-card__video" muted loop playsinline preload="metadata" poster="${project.hero.poster || ''}">
      <source src="${project.hero.src}" type="video/mp4">
    </video>` : '';

  return `
    <div class="project-card" id="${project.id}">
      <button class="project-card__trigger" type="button"
        data-target="body-${project.id}"
        data-open-fullscreen-only="${openFullscreenOnly ? 'true' : 'false'}"
        data-video-src="${isVideoHero ? project.hero.src : ''}"
        data-video-poster="${isVideoHero ? (project.hero.poster || '') : ''}"
        data-video-has-audio="${isVideoHero && project.hero?.hasAudio ? 'true' : 'false'}"
        aria-expanded="false"
        aria-controls="body-${project.id}">
        <div class="project-card__bg" style="background-image: url('${heroSrc}'); background-position: ${focalPoint};"></div>
        ${cardVideoHtml}
        <div class="project-card__overlay"></div>
        <div class="project-card__content">
          <h3 class="project-card__title">${project.name}</h3>
          ${toolsHtml}
        </div>
      </button>
    </div>
  `;
}

function renderCategoryMosaic(category, projects) {
  const cardsHtml = projects.map(p => renderProjectCard(p)).join('');
  const bodiesHtml = projects.map(p => {
    const normalized = normalizeProject(p);
    const inner = normalized.type === "gallery"
      ? renderProjectGallery(normalized)
      : renderProjectStages(normalized);

    const hero = normalized.hero;
    const alreadyInMedia = normalized.type === "gallery" &&
      (normalized.media || []).some(m => m.src === hero?.src);
    const heroVideoHtml = hero?.type === "video" && !alreadyInMedia
      ? renderMediaSolo(hero, normalized.name)
      : '';

    return `
      <div class="category-mosaic__body project-body" id="body-${p.id}">
        <div class="section-banner section-banner--project"><span>${p.name}</span></div>
        ${renderProjectAbout(normalized)}
        ${heroVideoHtml}
        ${inner}
      </div>`;
  }).join('');

  return `
    <div class="category-mosaic">
      <div class="section-banner" id="${category.id}-scroll"><span>${category.label}</span></div>
      <div class="category-mosaic__grid">${cardsHtml}</div>
      ${bodiesHtml}
    </div>
  `;
}

function renderCategorySection(category, projects) {
  if (category.layout === "mosaic") return renderCategoryMosaic(category, projects);

  let projectsHtml = '';
  projects.forEach(project => {
    if (category.id === 'props' && project.id === 'bone-dagger') {
      projectsHtml += '<div class="project-banner-gap" aria-hidden="true"></div>';
    }
    projectsHtml += renderProjectHero(project);
    projectsHtml += renderProjectBody(project);
  });

  return `
    <div class="section-banner" id="${category.id}-scroll"><span>${category.label}</span></div>
    ${projectsHtml}
  `;
}

function renderProjectBody(project) {
  const normalized = normalizeProject(project);
  const aboutHtml = renderProjectAbout(normalized);
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
  return `<div class="project-body" id="body-${project.id}">${aboutHtml}${inner}${collapseBtn}</div>`;
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

function pickRendersStage(stages, rendersStageLabel) {
  // null means no renders block — all stages become accordions
  if (rendersStageLabel === null) {
    return { rendersStage: null, otherStages: stages };
  }
  // explicit label override
  if (typeof rendersStageLabel === 'string') {
    const idx = stages.findIndex(s => s.label === rendersStageLabel);
    if (idx >= 0) {
      return { rendersStage: stages[idx], otherStages: stages.filter((_, i) => i !== idx) };
    }
  }
  // auto-detect: prefer /^render/i label, fall back to last stage
  const idx = stages.findIndex(s => /^render/i.test(s.label || ''));
  return idx >= 0
    ? { rendersStage: stages[idx], otherStages: stages.filter((_, i) => i !== idx) }
    : { rendersStage: stages[stages.length - 1], otherStages: stages.slice(0, -1) };
}

function renderRendersBlock(stage, projectName) {
  const n = normalizeStage(stage);
  const altText = `${projectName} — ${n.label}`;
  return `<div class="stage-block stage-block--renders">${renderStageMedia(n.media, altText)}</div>`;
}

function renderHighlightsBlock(mediaArray, projectName) {
  if (!mediaArray || mediaArray.length === 0) return '';
  return `
    <div class="stage-block stage-block--highlights">
      <div class="stage-block__label"><span>HIGHLIGHTS</span></div>
      ${renderStageMedia(mediaArray, `${projectName} — Highlights`)}
    </div>`;
}

function renderStageAccordion(stage, projectName) {
  const n = normalizeStage(stage);
  const altText = `${projectName} — ${n.label}`;
  return `
    <details class="stage-accordion">
      <summary class="stage-accordion__summary stage-block__label">
        <span>${n.label.toUpperCase()}</span>
        <span class="stage-accordion__chevron" aria-hidden="true">▾</span>
      </summary>
      <div class="stage-accordion__panel">
        ${renderStageMedia(n.media, altText)}
      </div>
    </details>`;
}

function renderProjectStages(project) {
  if (!project.stages || project.stages.length === 0) return '';
  const { rendersStage, otherStages } = pickRendersStage(project.stages, project.rendersStageLabel);
  const rendersHtml = rendersStage ? renderRendersBlock(rendersStage, project.name) : '';
  const highlightsHtml = renderHighlightsBlock(project.highlights, project.name);
  return rendersHtml + highlightsHtml + otherStages.map(s => renderStageAccordion(s, project.name)).join('');
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

function updateContainedHeroInsets() {
  const containedHeroes = document.querySelectorAll('.project-hero--video, .project-hero--image');

  containedHeroes.forEach(hero => {
    const rect = hero.getBoundingClientRect();
    const heroWidth = rect.width;
    const heroHeight = rect.height;
    if (!heroWidth || !heroHeight) return;

    const style = getComputedStyle(hero);
    const aspectRaw = style.getPropertyValue('--project-hero-aspect').trim();
    const mediaAspect = Number.parseFloat(aspectRaw) || 16 / 9;
    const containerAspect = heroWidth / heroHeight;

    const sideInset = containerAspect > mediaAspect
      ? (heroWidth - heroHeight * mediaAspect) / 2
      : 0;

    hero.style.setProperty('--project-hero-video-side-inset', `${Math.max(0, sideInset)}px`);
  });
}

function setFullscreenVideoControls(video) {
  if (!video) return;
  video.setAttribute('controls', '');
  video.defaultMuted = false;
  const hasAudio = video.dataset.hasAudio === 'true';
  if (hasAudio) {
    video.muted = false;
    video.removeAttribute('muted');
    video.volume = 1;
  } else {
    video.muted = true;
    video.setAttribute('muted', '');
  }
}

function clearFullscreenVideoControls(video) {
  if (!video) return;
  video.removeAttribute('controls');
  video.muted = true;
  video.setAttribute('muted', '');
}

function openFullscreenPlaybackVideo(src, poster, hasAudio) {
  const video = document.createElement('video');
  video.setAttribute('controls', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.preload = 'metadata';
  if (poster) video.poster = poster;
  video.src = src;

  if (hasAudio) {
    video.defaultMuted = false;
    video.muted = false;
    video.volume = 1;
  } else {
    video.muted = true;
    video.setAttribute('muted', '');
  }

  video.style.position = 'fixed';
  video.style.inset = '0';
  video.style.width = '100vw';
  video.style.height = '100vh';
  video.style.objectFit = 'contain';
  video.style.background = '#000';
  video.style.zIndex = '2000';
  document.body.appendChild(video);

  const cleanup = () => {
    if (video.parentNode) {
      video.pause();
      video.parentNode.removeChild(video);
    }
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
  };

  const onFullscreenChange = () => {
    const active = document.fullscreenElement || document.webkitFullscreenElement || null;
    if (!active || (active !== video && !video.webkitDisplayingFullscreen)) {
      cleanup();
    }
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  const enterFullscreen = () => {
    if (video.requestFullscreen) return video.requestFullscreen();
    if (video.webkitRequestFullscreen) return video.webkitRequestFullscreen();
    if (video.mozRequestFullScreen) return video.mozRequestFullScreen();
    cleanup();
    return null;
  };

  enterFullscreen();
  video.play().catch(() => {});
}

function renderProjectAbout(project) {
  if (!project.description) return '';
  return `
    <div class="project-about">
      <div class="project-about__label"><span>ABOUT</span></div>
      <p class="project-about__text">${project.description}</p>
    </div>`;
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
  const heroAspect = project.hero?.aspect ?? 1.778;
  const heroHasAudioAttr = project.hero?.hasAudio ? ' data-has-audio="true"' : '';
  const heroStyle = isVideo
    ? `style="--project-hero-aspect: ${heroAspect};"`
    : `style="--project-hero-aspect: ${heroAspect}; background-image: url('${project.hero?.src ?? ''}');"`;
  const videoHtml = isVideo ? `
    <video class="project-hero__video" autoplay muted loop playsinline preload="metadata" poster="${project.hero.poster}"${heroHasAudioAttr}>
      <source src="${project.hero.src}" type="video/mp4">
    </video>` : '';

  const fullscreenBtn = isVideo ? `
    <button class="project-hero__fullscreen-btn" type="button" aria-label="Watch ${project.name} fullscreen">
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0 4V0h4M8 0h4v4M12 8v4H8M4 12H0V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>` : '';

  return `
    <div id="${project.id}" class="${heroClass}" ${heroStyle}>
      ${videoHtml}
      <div class="project-hero__overlay"></div>
      <div class="project-hero__actions">
        <button class="project-hero__anchor" type="button" aria-label="Copy link to ${project.name}">#</button>
        ${fullscreenBtn}
      </div>
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
        const scrollEl = document.getElementById(targetId + '-scroll') || document.getElementById(targetId);
        if (scrollEl) scrollEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.innerHTML = renderContactSection(portfolioData.artist);
  }

  mountLightbox();
  attachHoverPlay(document.body);
  attachCardVideoPlay(document.body);
  updateContainedHeroInsets();
  window.addEventListener('resize', updateContainedHeroInsets);

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
        body.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    if (!willOpen) {
      const hero = document.getElementById(btn.dataset.target.replace('body-', ''));
      if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.body.addEventListener('click', e => {
    const trigger = e.target.closest('.project-card__trigger');
    if (!trigger) return;

    if (trigger.dataset.openFullscreenOnly === 'true') {
      openFullscreenPlaybackVideo(
        trigger.dataset.videoSrc,
        trigger.dataset.videoPoster || '',
        trigger.dataset.videoHasAudio === 'true'
      );
      return;
    }

    const targetId = trigger.dataset.target;
    const body = document.getElementById(targetId);
    if (!body) return;

    const card = trigger.closest('.project-card');
    const mosaic = trigger.closest('.category-mosaic');
    const isOpen = body.classList.contains('project-body--visible');

    // Collapse all bodies and deactivate all cards in this mosaic section
    mosaic.querySelectorAll('.category-mosaic__body').forEach(b => {
      b.classList.remove('project-body--visible');
    });
    mosaic.querySelectorAll('.project-card').forEach(c => {
      c.classList.remove('project-card--active');
      c.querySelector('.project-card__trigger')?.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      body.classList.add('project-body--visible');
      card.classList.add('project-card--active');
      trigger.setAttribute('aria-expanded', 'true');
      attachHoverPlay(body);
      requestAnimationFrame(() => body.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  });

  document.body.addEventListener('click', e => {
    const anchor = e.target.closest('.project-hero__anchor');
    if (!anchor) return;
    e.stopPropagation();
    const projectId = anchor.closest('.project-hero').id;
    history.replaceState(null, '', '#' + projectId);
  });

  let activeFullscreenHeroVideo = null;

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.project-hero__fullscreen-btn');
    if (!btn) return;
    e.stopPropagation();
    const video = btn.closest('.project-hero')?.querySelector('.project-hero__video');
    if (!video) return;
    activeFullscreenHeroVideo = video;
    setFullscreenVideoControls(video);
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
  });

  const syncFullscreenHeroVideoState = () => {
    const activeFullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || null;
    const activeVideoFromState = activeFullscreenHeroVideo &&
      (activeFullscreenEl === activeFullscreenHeroVideo || activeFullscreenHeroVideo.webkitDisplayingFullscreen)
      ? activeFullscreenHeroVideo
      : null;

    document.querySelectorAll('.project-hero__video[controls]').forEach(video => {
      const isActive = video === activeFullscreenEl || video === activeVideoFromState;
      if (!isActive) {
        clearFullscreenVideoControls(video);
      }
    });

    if (!activeVideoFromState && activeFullscreenEl !== activeFullscreenHeroVideo) {
      activeFullscreenHeroVideo = null;
    }
  };

  document.addEventListener('fullscreenchange', syncFullscreenHeroVideoState);
  document.addEventListener('webkitfullscreenchange', syncFullscreenHeroVideoState);

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
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
      <li class="site-nav__item"><a class="site-nav__link" href="#contact" data-target="contact">Contact</a></li>
    </ul>`;

    siteNav.addEventListener('click', e => {
      const link = e.target.closest('.site-nav__link');
      if (!link) return;
      e.preventDefault();
      const navTarget = link.dataset.target;
      const navScrollEl = document.getElementById(navTarget + '-scroll') || document.getElementById(navTarget);
      navScrollEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // About Me tile: click scrolls to contact section when under the 1024px breakpoint
  const personalEl = document.querySelector('.info-personal');
  if (personalEl) {
    personalEl.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
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
