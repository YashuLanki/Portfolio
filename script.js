const PROJECTS = [
  {
    title: "Vaulter AI — Property Intelligence System",
    tags: ["Python", "MCP", "Claude Desktop", "SQLite"],
    description: "The firm's day-to-day intelligence system: instant search across the shared deal document library, a built-in CoStar listing screener ranked against the existing portfolio, and a proximity tool for comparing candidates to current holdings — exposed as MCP tools each teammate uses directly through their own Claude Desktop.",
    github: "https://github.com/YashuLanki/Vaulter_AI",
    live: null
  },
  {
    title: "Bilingual Resume Builder",
    tags: ["JavaScript", "Express", "Client-side PDF"],
    description: "A free, bilingual (English/Marshallese) resume builder for the Arizona Marshallese Community: a guided form, ChatGPT-assisted writing help, and a one-click, one-page PDF export, entirely in the browser.",
    github: "https://github.com/YashuLanki/Resume/tree/main/ChatGPT_Resume_Marshallese_Assistance",
    live: null
  },
  {
    title: "Claude Resume Kit",
    tags: ["Claude Code", "Skills", "DOCX/PDF"],
    description: "My working copy of the open-source claude-resume-kit, adapted for my own job search: a Claude Code skill kit that builds a knowledge base from your papers, code, and past resumes once, then tailors a resume, CV, or cover letter to each job posting from that verified material instead of rewriting a pasted resume. Provenance flags and verb-discipline rules block overclaiming, and it builds .docx and .pdf output locally.",
    github: "https://github.com/YashuLanki/Resume/tree/main/Claude_Resume_kit",
    live: null
  },
  {
    title: "Honolulu → Majuro Fare Predictor",
    tags: ["Python", "Streamlit", "Linear Regression"],
    description: "A personal project: I'm Marshallese, born and raised in Hawaii, and United is the only airline flying home to Majuro, so fares swing wildly with no competition to check them. I hand-collected 38 real fare quotes and fit a small, honestly-sized Linear Regression — not a bigger model that would just memorize noise — to predict round-trip cost by date, wrapped in a Streamlit app and CLI tool that share one prediction path.",
    github: "https://github.com/YashuLanki/Honolulu_Majuro_UnitedAirline",
    live: null
  },
  {
    title: "M.S. in Artificial Intelligence — Coursework",
    tags: ["Python", "NumPy", "PyMC", "scikit-learn"],
    description: "Weekly projects from my Master of Science in AI at Grand Canyon University. Mathematics for AI (AIT 525) covers regression, SVD and PCA, NLP document similarity, graph-based influence prediction, fuzzy logic, PDEs, and a Naive Bayes spam classifier. Statistics & Data Analysis for AI (AIT 530) covers probability distributions, confidence intervals, and Bayesian inference, all on real UCI datasets.",
    github: "https://github.com/YashuLanki/Masters-of-Science-in-AI",
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
