const PROJECTS = [
  {
    title: "M.S. in Artificial Intelligence — Coursework",
    tags: ["Python", "NumPy", "PyMC", "scikit-learn"],
    bullets: [
      "Weekly projects from my Master of Science in AI at Grand Canyon University, each built in Python on real-world datasets",
      "<strong>Mathematics for AI (AIT 525):</strong> regression, SVD &amp; PCA, NLP document similarity, graph-based influence prediction, fuzzy logic, PDEs, and a Naive Bayes spam classifier",
      "<strong>Statistics &amp; Data Analysis for AI (AIT 530):</strong> probability distributions, confidence intervals, and Bayesian inference"
    ],
    github: "https://github.com/YashuLanki/Masters-of-Science-in-AI",
    live: null
  },
  {
    title: "Vaulter AI — Property Intelligence System",
    tags: ["Python", "MCP", "Claude Desktop", "SQLite"],
    bullets: [
      "The day-to-day intelligence system for a real estate investment firm",
      "Instant search across the shared deal document library",
      "Built-in CoStar listing screener that ranks candidates against the existing portfolio",
      "Proximity tool for comparing candidates to current holdings",
      "Exposed as MCP tools each teammate uses directly through their own Claude Desktop"
    ],
    github: "https://github.com/YashuLanki/Vaulter_AI",
    live: null
  },
  {
    title: "Resume Tools",
    tags: ["JavaScript", "Claude Code", "Client-side PDF"],
    bullets: [
      "<strong>Bilingual Resume Builder:</strong> a free English/Marshallese resume builder for the Arizona Marshallese Community, with a guided form, ChatGPT-assisted writing help, and a one-click, one-page PDF export, all in the browser",
      "<strong>Claude Resume Kit:</strong> my adapted copy of the open-source claude-resume-kit, a Claude Code skill kit that tailors resumes, CVs, and cover letters to each job posting from a verified knowledge base, with provenance flags and verb-discipline rules that block overclaiming"
    ],
    github: "https://github.com/YashuLanki/Resume",
    live: null
  },
  {
    title: "Honolulu → Majuro Fare Predictor",
    tags: ["Python", "Streamlit", "Linear Regression"],
    bullets: [
      "A personal project: I'm Marshallese, born and raised in Hawaii, and United is the only airline flying home to Majuro, so fares swing wildly with no competition to check them",
      "Hand-collected 38 real fare quotes",
      "Fit a small, honestly-sized Linear Regression (not a bigger model that would just memorize noise) to predict round-trip cost by date",
      "Wrapped in a Streamlit app and a CLI tool that share one prediction path"
    ],
    github: "https://github.com/YashuLanki/Honolulu_Majuro_UnitedAirline",
    live: null
  }
];

const STACK = ["Python", "JavaScript", "Claude API / MCP", "SQLite", "scikit-learn", "NumPy & pandas", "PyMC", "Streamlit", "Google Maps & Places API", "Express", "HTML/CSS"];

function renderProjects(){
  const grid = document.getElementById("project-grid");
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal">
      <p class="project-tags">${p.tags.join(" · ")}</p>
      <h3>${p.title}</h3>
      <ul class="project-bullets">${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
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
