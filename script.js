const PROJECTS = [
  {
    title: "Vaulter AI — Property Intelligence System",
    tags: ["Python", "MCP", "Claude Desktop", "SQLite"],
    description: "The firm's day-to-day intelligence system: instant search across ~493,000 shared deal documents, a built-in CoStar listing screener ranked against the existing portfolio, and a proximity tool for comparing candidates to current holdings — combining the ideas behind the two projects below into one system, exposed as MCP tools each teammate uses directly through their own Claude Desktop.",
    github: "https://github.com/YashuLanki/Vaulter_AI",
    live: null
  },
  {
    title: "CoStar Listing Screener",
    tags: ["Python", "Claude API", "Google Maps"],
    description: "A more elaborate, standalone version of Vaulter AI's screening idea: a 4-phase pipeline — hard-rule filtering, composite ranking, Claude-written qualitative analysis, and Google Maps ground-truth verification — that narrows 216 raw listings down to 5 fully-vetted acquisition candidates.",
    github: "https://github.com/YashuLanki/Costar_screener",
    live: null
  },
  {
    title: "Proximity Mapper",
    tags: ["Python", "Google Places API", "GeoJSON"],
    description: "The standalone version of the proximity tool built into Vaulter AI: given a property, it finds nearby employers and businesses across 17 categories, computes distance and direction from the site, and exports ready-to-use GeoJSON (for Felt) and CSV (for due-diligence reports).",
    github: "https://github.com/YashuLanki/Proximity-Intel",
    live: null
  },
  {
    title: "Arizona Marshallese Community Website",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "The official site for a 501(c)(3) nonprofit serving Marshallese families across Arizona — a single hand-built page covering leadership, news, scholarships, and community events, with zero build tooling.",
    github: "https://github.com/YashuLanki/community_site",
    live: "https://azmarshallese.github.io/community_site/"
  },
  {
    title: "Bilingual Resume Builder",
    tags: ["JavaScript", "Express", "Client-side PDF"],
    description: "A free, bilingual (English/Marshallese) resume builder: a guided form, optional AI-assisted writing help, and a one-click, one-page PDF export, entirely in the browser.",
    github: "https://github.com/YashuLanki/resume_builder",
    live: null
  },
  {
    title: "Airline Fare Prediction",
    tags: ["Python", "scikit-learn", "Regression"],
    description: "A machine-learning project predicting airline ticket prices from route, airline, and schedule features, comparing decision-tree and random-forest regressors (best model: R² 0.81) and evaluating on MAE, MSE, and R².",
    github: "https://github.com/YashuLanki/AirlineRoutesAndPricing",
    live: null
  }
];

const STACK = ["Python", "JavaScript", "Claude API / MCP", "SQLite", "scikit-learn", "Google Maps & Places API", "Express", "HTML/CSS"];

function renderProjects(){
  const grid = document.getElementById("project-grid");
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal">
      <p class="project-tags">${p.tags.join(" · ")}</p>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-links">
        <a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}
      </div>
    </article>
  `).join("");
}

function renderStack(){
  const list = document.getElementById("stack-list");
  list.innerHTML = STACK.map(s => `<li>${s}</li>`).join("");
}

function initReveal(){
  const targets = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => obs.observe(t));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderStack();
  initReveal();
});
