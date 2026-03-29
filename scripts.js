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
    {
      id: "characters",
      label: "Characters",
      thumbnail: "assets/character/thumb.jpg",
      hoverText: "View Characters"
    },
    {
      id: "props",
      label: "Props",
      thumbnail: "assets/props/thumb.jpg",
      hoverText: "View Props"
    },
    {
      id: "creatures",
      label: "Creatures",
      thumbnail: "assets/creatures/thumb.jpg",
      hoverText: "View Creatures"
    }
  ],

  projects: [
    {
      id: "dummy-project",
      category: "characters",
      name: "Dummy Project",
      finalImage: "assets/character/dummy-project/final.jpg",
      tools: ["zbrush", "maya", "substance"],
      stages: [
        { label: "High Poly", image: "assets/character/dummy-project/highpoly.jpg" },
        { label: "Low Poly", image: "assets/character/dummy-project/lowpoly.jpg" },
        { label: "Texture", image: "assets/character/dummy-project/textures.jpg" }
      ],
      renderImage: "assets/character/dummy-project/final.jpg"
    },
    {
      id: "ancient-relic",
      category: "props",
      name: "Ancient Relic",
      finalImage: "assets/props/ancient-relic/final.jpg",
      tools: ["maya", "substance", "marmoset"],
      stages: [
        { label: "High Poly", image: "assets/props/ancient-relic/highpoly.jpg" },
        { label: "Texture", image: "assets/props/ancient-relic/texture.jpg" }
      ],
      renderImage: "assets/props/ancient-relic/render.jpg"
    },
    {
      id: "forest-beast",
      category: "creatures",
      name: "Forest Beast",
      finalImage: "assets/creatures/forest-beast/final.jpg",
      tools: ["zbrush", "substance", "blender"],
      stages: [
        { label: "Sculpt", image: "assets/creatures/forest-beast/highpoly.jpg" },
        { label: "Topology", image: "assets/creatures/forest-beast/lowpoly.jpg" }
      ],
      renderImage: "assets/creatures/forest-beast/render.jpg"
    }
  ]
};

// 2. RENDER FUNCTIONS

function renderInfoSection(data) {
  const { artist, categories } = data;
  
  // Social links HTML
  let socialsHtml = '';
  if (artist.contact) {
    const { email, artstation, linkedin } = artist.contact;
    if (email) socialsHtml += `<a href="mailto:${email}" class="info-personal__social-link">Email</a>`;
    if (artstation) socialsHtml += `<a href="${artstation}" target="_blank" rel="noopener noreferrer" class="info-personal__social-link">ArtStation</a>`;
    if (linkedin) socialsHtml += `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="info-personal__social-link">LinkedIn</a>`;
  }

  // Build the personal block
  const personalBlockHtml = `
    <div class="info-personal" style="background-image: url('${artist.avatar}');">
      <div class="overlay">
        <p class="info-personal__bio">${artist.bio}</p>
        <div class="info-personal__socials">${socialsHtml}</div>
      </div>
      <div class="info-personal__content">
        <h1 class="info-personal__name">${artist.name}</h1>
        <h2 class="info-personal__title">${artist.title}</h2>
      </div>
    </div>
  `;

  // Build category tiles
  const tilesHtml = categories.map(cat => `
    <div class="info-tile" data-target="${cat.id}" style="background-image: url('${cat.thumbnail}');">
      <div class="overlay">
        <span class="info-tile__hover-text">${cat.hoverText}</span>
      </div>
      <h3 class="info-tile__label">${cat.label}</h3>
    </div>
  `).join('');

  const tilesContainerHtml = `
    <div class="info-tiles-container">
      ${tilesHtml}
    </div>
  `;

  return personalBlockHtml + tilesContainerHtml;
}

function renderCategorySection(category, projects) {
  const bannerHtml = `
    <div class="category-banner">
      <h2 class="category-banner__label">${category.label}</h2>
    </div>
  `;

  let projectsHtml = '';
  projects.forEach(project => {
    projectsHtml += renderProjectHero(project);
    
    if (project.stages && project.stages.length > 0) {
      project.stages.forEach(stage => {
        projectsHtml += renderProjectStage(stage);
      });
    }

    if (project.renderImage) {
      projectsHtml += renderProjectFinal(project);
    }
  });

  return bannerHtml + projectsHtml;
}

function renderProjectHero(project) {
  const toolsHtml = project.tools.map(tool => 
    `<img src="assets/icons/${tool}.svg" alt="${tool} icon" class="project-hero__tool-icon">`
  ).join('');

  return `
    <div class="project-hero" style="background-image: url('${project.finalImage}');">
      <div class="project-hero__overlay"></div>
      <h3 class="project-hero__title">${project.name}</h3>
      <div class="project-hero__tools">${toolsHtml}</div>
    </div>
  `;
}

function renderProjectStage(stage) {
  return `
    <div class="project-stage" style="background-image: url('${stage.image}');"></div>
  `;
}

function renderProjectFinal(project) {
  // If we just want a background image covering the screen:
  return `
    <div class="project-final" style="background-image: url('${project.renderImage}');"></div>
  `;
  // Alternative using standard img tag, but background-image respects DESIGN.md better for full bleed usually
  // return `
  //   <div class="project-final">
  //     <img src="${project.renderImage}" alt="${project.name} Final Render" class="project-final__image">
  //   </div>
  // `;
}

// 3. INIT

function init() {
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
      const projectsInCategory = portfolioData.projects.filter(p => p.category === cat.id);
      categoryElement.innerHTML = renderCategorySection(cat, projectsInCategory);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
