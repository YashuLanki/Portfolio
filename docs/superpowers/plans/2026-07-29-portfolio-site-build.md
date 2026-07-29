# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a single-page static portfolio site at `https://yashulanki.github.io/Portfolio/` showcasing six real GitHub projects.

**Architecture:** Three hand-authored files (`index.html`, `style.css`, `script.js`) with no framework and no build step — project content lives as a plain JS array rendered client-side into a card grid. Deployed via GitHub Pages from a new `YashuLanki/Portfolio` repo.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts CDN (Space Grotesk, IBM Plex Sans, IBM Plex Mono), GitHub Pages.

## Global Constraints

- No build tooling, no npm dependencies, no framework — plain static files only (spec: Scope).
- Exactly six projects, content adapted from each repo's real README, no invented features/metrics (spec: Content inventory).
- Color tokens: `ink #0B0D12`, `panel #14171D`, `paper #E9E8E3`, `wire #2A2F3A`, `signal #D9A441`, `data #6FD6C4` (spec: Visual design).
- Fonts: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (utility/mono) (spec: Visual design).
- `prefers-reduced-motion` must be respected; keyboard focus must be visible; semantic landmarks and alt text required (spec: Accessibility / quality floor).
- Contact links: GitHub `https://github.com/YashuLanki`, email `yashulanki23@gmail.com`, LinkedIn `https://www.linkedin.com/in/yashulanki`.
- No live GitHub API calls at runtime — project data is a static array (spec: Out of scope).

---

## File Structure

- `index.html` — page shell, nav, hero (with pipeline bar markup), empty project-grid/stack containers, footer.
- `style.css` — design tokens + all styling (single file; site is small enough that splitting CSS would add indirection without benefit).
- `script.js` — `PROJECTS` data array, `STACK` array, render functions, pipeline-bar + scroll-reveal `IntersectionObserver` logic.
- `assets/favicon.svg` — small amber-on-ink "YL" monogram.
- `README.md` — repo-root README for the Portfolio project itself.
- `tests/check_site.sh` — zero-dependency grep-based structural assertions (this is a static content site; there's no application logic to unit test, so "tests" here means "does the shipped markup/data actually contain what the spec requires," which is real regression coverage against a common failure mode: a future edit silently drops a project or a required link).

---

### Task 1: Page shell, design tokens, and base styles

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `tests/check_site.sh`

**Interfaces:**
- Produces: DOM ids `#project-grid` and `#stack-list` (empty containers) that Task 3 will render into. CSS custom properties `--ink`, `--panel`, `--paper`, `--wire`, `--signal`, `--data`, `--font-display`, `--font-body`, `--font-mono` that all later tasks' CSS rules depend on.

- [ ] **Step 1: Write the failing structural test**

Create `tests/check_site.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0
check() {
  if ! grep -qF "$1" "$2"; then
    echo "FAIL: expected to find '$1' in $2"
    fail=1
  fi
}
check '<div class="project-grid" id="project-grid">' index.html
check '<ul class="stack-list' index.html
check -- '--signal:#D9A441' style.css
check '--font-mono' style.css
if [ "$fail" -eq 0 ]; then echo "ALL CHECKS PASSED"; else exit 1; fi
```

```bash
chmod +x tests/check_site.sh
```

- [ ] **Step 2: Run test to verify it fails**

Run: `./tests/check_site.sh`
Expected: fails with `index.html: No such file or directory` (files don't exist yet).

- [ ] **Step 3: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yashu Lanki — Systems Engineer</title>
<meta name="description" content="Portfolio of Yashu Lanki — data & AI pipelines, from RAG-backed document search to automated listing screeners.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<meta property="og:title" content="Yashu Lanki — Systems Engineer">
<meta property="og:description" content="Data & AI pipelines that ship in production, not just notebooks.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="topbar">
  <a class="mark" href="#top">YL</a>
  <nav aria-label="Primary">
    <a href="#projects">Projects</a>
    <a href="#stack">Stack</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main id="main">
  <section class="hero" id="top">
    <p class="eyebrow">YASHU LANKI</p>
    <h1>Systems that turn raw data into decisions.</h1>
    <p class="lede">I build data &amp; AI pipelines — from RAG-backed document search to automated listing screeners — that ship in production, not just notebooks.</p>

    <div class="pipeline" role="img" aria-label="Pipeline diagram: 216 raw listings narrowed down to 9 verified acquisitions across four screening phases">
      <span class="pipeline-figure pipeline-in">216 raw listings</span>
      <div class="pipeline-track"><div class="pipeline-fill"></div></div>
      <span class="pipeline-figure pipeline-out">9 verified acquisitions</span>
    </div>
    <p class="pipeline-caption">Real funnel from the CoStar Listing Screener, below.</p>

    <div class="hero-links">
      <a href="https://github.com/YashuLanki" target="_blank" rel="noopener">GitHub ↗</a>
      <a href="mailto:yashulanki23@gmail.com">Email</a>
      <a href="https://www.linkedin.com/in/yashulanki" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>
  </section>

  <section class="projects" id="projects">
    <h2 class="reveal">Projects</h2>
    <div class="project-grid" id="project-grid"></div>
  </section>

  <section class="stack" id="stack">
    <h2 class="reveal">Stack</h2>
    <ul class="stack-list reveal" id="stack-list"></ul>
  </section>
</main>

<footer class="site-footer" id="contact">
  <p>Yashu Lanki</p>
  <div class="footer-links">
    <a href="https://github.com/YashuLanki" target="_blank" rel="noopener">GitHub</a>
    <a href="mailto:yashulanki23@gmail.com">yashulanki23@gmail.com</a>
    <a href="https://www.linkedin.com/in/yashulanki" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</footer>

<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 4: Write `style.css`**

```css
:root{
  --ink:#0B0D12;
  --panel:#14171D;
  --paper:#E9E8E3;
  --wire:#2A2F3A;
  --signal:#D9A441;
  --data:#6FD6C4;
  --font-display:'Space Grotesk',system-ui,sans-serif;
  --font-body:'IBM Plex Sans',system-ui,sans-serif;
  --font-mono:'IBM Plex Mono',ui-monospace,monospace;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;
  background:var(--ink);
  color:var(--paper);
  font-family:var(--font-body);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
}
h1,h2{font-family:var(--font-display);line-height:1.1;margin:0 0 .5em}
a{color:var(--signal)}
a:hover{color:#f0b962}
:focus-visible{outline:2px solid var(--signal);outline-offset:3px;border-radius:2px}

.skip-link{position:absolute;left:-999px;top:0;background:var(--signal);color:var(--ink);padding:.5em 1em;z-index:100}
.skip-link:focus{left:1em;top:1em}

.topbar{
  position:sticky;top:0;z-index:10;
  display:flex;justify-content:space-between;align-items:center;
  padding:1.25rem 2rem;
  background:rgba(11,13,18,.85);backdrop-filter:blur(6px);
  border-bottom:1px solid var(--wire);
}
.mark{font-family:var(--font-mono);font-weight:600;letter-spacing:.05em;text-decoration:none;color:var(--paper)}
.topbar nav{display:flex;gap:1.5rem;font-family:var(--font-mono);font-size:.8rem;letter-spacing:.08em;text-transform:uppercase}
.topbar nav a{color:var(--paper);text-decoration:none}
.topbar nav a:hover{color:var(--signal)}

.hero{max-width:860px;margin:0 auto;padding:6rem 2rem 4rem;text-align:left}
.eyebrow{font-family:var(--font-mono);letter-spacing:.15em;color:var(--data);font-size:.8rem;margin:0 0 1rem}
.hero h1{font-size:clamp(2.2rem,5vw,3.4rem);max-width:14ch}
.lede{max-width:56ch;color:#C6C9D0;font-size:1.05rem}

.pipeline{display:flex;align-items:center;gap:1rem;margin:2.5rem 0 .5rem;flex-wrap:wrap}
.pipeline-figure{font-family:var(--font-mono);font-size:.9rem;white-space:nowrap}
.pipeline-in{color:var(--paper)}
.pipeline-out{color:var(--signal);font-weight:600}
.pipeline-track{flex:1;min-width:140px;height:8px;background:var(--wire);border-radius:4px;overflow:hidden}
.pipeline-fill{height:100%;width:0;background:linear-gradient(90deg,var(--data),var(--signal));border-radius:4px;transition:width 1.4s cubic-bezier(.16,1,.3,1)}
.pipeline.is-visible .pipeline-fill{width:4%}
.pipeline-caption{font-family:var(--font-mono);font-size:.75rem;color:#6B7078;margin:0 0 2rem}

.hero-links{display:flex;gap:1.5rem;font-family:var(--font-mono);font-size:.85rem}
.hero-links a{text-decoration:none}

section{max-width:1080px;margin:0 auto;padding:4rem 2rem}
section h2{font-size:1.6rem;margin-bottom:2rem}

.reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}
.reveal.is-visible{opacity:1;transform:translateY(0)}

.project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
.project-card{
  background:var(--panel);border:1px solid var(--wire);border-radius:6px;
  padding:1.5rem;display:flex;flex-direction:column;gap:.75rem;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.project-card:hover,.project-card:focus-within{
  transform:translateY(-3px);
  border-color:var(--signal);
  box-shadow:0 0 0 1px rgba(217,164,65,.25),0 12px 24px rgba(0,0,0,.35);
}
.project-tags{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.06em;color:var(--data);text-transform:uppercase;margin:0}
.project-card h3{font-family:var(--font-display);font-size:1.15rem;margin:0}
.project-card p{margin:0;color:#C6C9D0;font-size:.92rem}
.project-links{display:flex;gap:1rem;margin-top:auto;padding-top:.75rem;border-top:1px solid var(--wire);font-family:var(--font-mono);font-size:.8rem}
.project-links a{text-decoration:none}

.stack-list{display:flex;flex-wrap:wrap;gap:.6rem;list-style:none;margin:0;padding:0;font-family:var(--font-mono);font-size:.8rem}
.stack-list li{border:1px solid var(--wire);border-radius:999px;padding:.35rem .9rem;color:var(--paper)}

.site-footer{
  border-top:1px solid var(--wire);
  padding:2.5rem 2rem;max-width:1080px;margin:0 auto;
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;
  font-family:var(--font-mono);font-size:.85rem;color:#9AA0A8;
}
.footer-links{display:flex;gap:1.5rem}
.footer-links a{text-decoration:none}

@media (max-width:640px){
  .topbar{padding:1rem 1.25rem}
  .hero{padding:4rem 1.25rem 3rem}
  section{padding:3rem 1.25rem}
  .site-footer{flex-direction:column}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .pipeline-fill{transition:none}
  .reveal{transition:none;opacity:1;transform:none}
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `./tests/check_site.sh`
Expected: `ALL CHECKS PASSED`

- [ ] **Step 6: Commit**

```bash
git add index.html style.css tests/check_site.sh
git commit -m "Add page shell, design tokens, and base styles"
```

---

### Task 2: Project data and card rendering

**Files:**
- Create: `script.js`
- Modify: `tests/check_site.sh` (add checks for project data)

**Interfaces:**
- Consumes: `#project-grid`, `#stack-list` from Task 1.
- Produces: global `PROJECTS` array (each item: `{title, tags: string[], description, github, live: string|null}`), global `STACK` array (`string[]`), and a `renderProjects()` / `renderStack()` pair called on `DOMContentLoaded`. Task 3 depends on these two function names existing.

- [ ] **Step 1: Extend the test**

Append to `tests/check_site.sh` (before the final `if` block):

```bash
check_count() {
  local n
  n=$(grep -oF "$1" "$2" | wc -l | tr -d ' ')
  if [ "$n" -ne "$3" ]; then
    echo "FAIL: expected $3 occurrences of '$1' in $2, found $n"
    fail=1
  fi
}
check_count 'github: "https://github.com/YashuLanki/' script.js 6
check 'function renderProjects' script.js
check 'function renderStack' script.js
```

- [ ] **Step 2: Run test to verify it fails**

Run: `./tests/check_site.sh`
Expected: fails — `script.js: No such file or directory`.

- [ ] **Step 3: Write `script.js`**

```javascript
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

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderStack();
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `./tests/check_site.sh`
Expected: `ALL CHECKS PASSED`

- [ ] **Step 5: Commit**

```bash
git add script.js tests/check_site.sh
git commit -m "Add project data and card/stack rendering"
```

---

### Task 3: Pipeline-bar and scroll-reveal animation

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `.pipeline` element and `.reveal`-classed elements from Task 1/2's markup.
- Produces: `initPipeline()` and `initReveal()`, both called on `DOMContentLoaded` alongside `renderProjects()`/`renderStack()`.

- [ ] **Step 1: Write the failing test**

Add to `tests/check_site.sh`:

```bash
check 'function initPipeline' script.js
check 'function initReveal' script.js
check 'IntersectionObserver' script.js
```

Run: `./tests/check_site.sh` — expect FAIL (functions don't exist yet).

- [ ] **Step 2: Add the animation functions to `script.js`**

Insert after `renderStack()` and before the `DOMContentLoaded` listener:

```javascript
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
```

Update the `DOMContentLoaded` listener to:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderStack();
  initPipeline();
  initReveal();
});
```

- [ ] **Step 3: Run test to verify it passes**

Run: `./tests/check_site.sh`
Expected: `ALL CHECKS PASSED`

- [ ] **Step 4: Commit**

```bash
git add script.js tests/check_site.sh
git commit -m "Add pipeline-bar and scroll-reveal animations"
```

---

### Task 4: Favicon, README, and final checks

**Files:**
- Create: `assets/favicon.svg`
- Create: `README.md`
- Modify: `tests/check_site.sh`

**Interfaces:** none (leaf task).

- [ ] **Step 1: Write the failing test**

```bash
check '<rect' assets/favicon.svg
check '# Portfolio' README.md
```

Run: `./tests/check_site.sh` — expect FAIL.

- [ ] **Step 2: Write `assets/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0B0D12"/>
  <text x="32" y="41" font-family="IBM Plex Mono, monospace" font-size="24" font-weight="600" fill="#D9A441" text-anchor="middle">YL</text>
</svg>
```

- [ ] **Step 3: Write `README.md`**

```markdown
# Portfolio

Personal portfolio site for Yashu Lanki — a single hand-built page (no
framework, no build step) showcasing projects from
[github.com/YashuLanki](https://github.com/YashuLanki).

**Live:** https://yashulanki.github.io/Portfolio/

## Structure

- `index.html` — markup and content
- `style.css` — all styling (design tokens as CSS custom properties)
- `script.js` — project data, rendering, and scroll/pipeline animations
- `assets/` — favicon
- `tests/check_site.sh` — structural regression checks (run with `./tests/check_site.sh`)

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Update the project list

Edit the `PROJECTS` array in `script.js` — no other file needs to change.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `./tests/check_site.sh`
Expected: `ALL CHECKS PASSED`

- [ ] **Step 5: Commit**

```bash
git add assets/favicon.svg README.md tests/check_site.sh
git commit -m "Add favicon and README"
```

---

### Task 5: Visual verification and publish

**Files:** none created; this task verifies the built site and publishes it.

- [ ] **Step 1: Serve locally and screenshot desktop + mobile**

```bash
python3 -m http.server 8123 --directory /Users/ylanki/Portfolio &
```

Open `http://localhost:8123/` in the browser tool at desktop width (1280x800) and mobile width (375x812). Confirm: hero renders with fonts loaded, pipeline bar animates in on scroll, all 6 project cards render with correct titles/links, stack pills render, footer links are correct (`mailto:yashulanki23@gmail.com`, LinkedIn, GitHub), no console errors.

- [ ] **Step 2: Check keyboard navigation and reduced motion**

Tab through the page; confirm visible focus outlines on nav links, project card links, and footer links. Toggle OS "reduce motion" (or emulate via browser devtools) and confirm the pipeline bar and reveal animations no longer transition.

- [ ] **Step 3: Stop the local server**

```bash
kill %1
```

- [ ] **Step 4: Confirm with the user before publishing**

Ask: "Site looks good locally — ready for me to create the `YashuLanki/Portfolio` GitHub repo, push, and enable GitHub Pages (this makes it publicly live)?" Wait for explicit yes — creating a public repo and enabling Pages is a publish action.

- [ ] **Step 5: Create the repo, push, enable Pages**

```bash
gh repo create YashuLanki/Portfolio --public --source=/Users/ylanki/Portfolio --remote=origin --push
gh api -X POST repos/YashuLanki/Portfolio/pages -f "source[branch]=main" -f "source[path]=/"
```

- [ ] **Step 6: Verify the live URL**

```bash
curl -sI https://yashulanki.github.io/Portfolio/ | head -1
```

Expected: `HTTP/2 200` (may take 1-2 minutes after enabling Pages to go live — retry if it 404s immediately).

---

## Self-Review

- **Spec coverage:** Content inventory → Tasks 2/4 (README); Visual design tokens/type/layout → Task 1 (tokens/shell/CSS), Task 2 (cards/stack), Task 3 (motion); Accessibility floor → Task 1 (focus-visible, skip link, reduced-motion CSS) + Task 5 Step 2 (manual keyboard/reduced-motion check); Out-of-scope (no live API calls) → satisfied by Task 2's static `PROJECTS` array. All spec sections have a task.
- **Placeholder scan:** no TBD/TODO; every code block above is complete, runnable content.
- **Type consistency:** `PROJECTS` item shape (`title, tags, description, github, live`) defined in Task 2 is the only shape used — Task 3 doesn't touch project objects, just DOM selectors (`.pipeline`, `.reveal`) already emitted by Tasks 1-2. `renderProjects`/`renderStack`/`initPipeline`/`initReveal` names are consistent between their definition (Tasks 2-3) and their call site in the single `DOMContentLoaded` listener (updated in Task 3 Step 2, superseding Task 2 Step 3's version).
