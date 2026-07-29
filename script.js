const PROJECTS = [
  {
    title: "Vaulter AI — Property Intelligence System",
    tags: ["Python", "MCP", "Claude API", "RAG"],
    description: "A local-first AI system for a real-estate investment firm: RAG-backed search over the firm's deal documents and a 4-phase listing screener, each teammate running their own instance through their own Claude Desktop so no one's files or inbox ever leave their machine.",
    github: "https://github.com/YashuLanki/Vaulter_AI",
    live: null
  },
  {
    title: "CoStar Listing Screener",
    tags: ["Python", "Claude API", "Google Maps"],
    description: "A 4-phase pipeline that narrows a raw CoStar land export down to a handful of fully vetted acquisition candidates: hard-rule elimination, composite ranking, Claude-written qualitative analysis, and Google Maps ground-truth verification.",
    github: "https://github.com/YashuLanki/Costar_screener",
    live: null
  },
  {
    title: "Proximity Mapper",
    tags: ["Python", "Google Places API", "GeoJSON"],
    description: "Given a property, automatically finds nearby employers and anchor businesses, computes distance and direction from the site, and exports ready-to-use GeoJSON and CSV for due-diligence reports.",
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
    description: "A machine-learning project predicting airline ticket prices from route, airline, and schedule features, comparing decision-tree and random-forest regressors and evaluating on MAE, MSE, and R².",
    github: "https://github.com/YashuLanki/AirlineRoutesAndPricing",
    live: null
  }
];

const STACK = ["Python", "JavaScript", "Claude API / MCP", "ChromaDB", "scikit-learn", "Google Maps & Places API", "Express", "HTML/CSS"];

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

function initPipeline(){
  const pipeline = document.querySelector(".pipeline");
  if(!pipeline) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        pipeline.classList.add("is-visible");
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs.observe(pipeline);
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
  initPipeline();
  initReveal();
});
