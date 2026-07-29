# Portfolio Site — Design Spec

**Date:** 2026-07-29
**Repo:** `YashuLanki/Portfolio` → served at `https://yashulanki.github.io/Portfolio/`

## Purpose

A single-page professional portfolio site showcasing Yashu Lanki's six public
GitHub projects, built to a standard that reads as credible to a hiring manager
or engineer at a large tech company. Link is meant to be sent directly to
employers — no separate resume site or LinkedIn substitute, just this page.

## Scope

- One static site: `index.html` + `style.css` + `script.js` + `assets/`.
- No framework, no build step, no dependencies — same operating model as the
  user's existing AMC_website / community_site projects: edit the files, push
  to `main`, GitHub Pages rebuilds automatically.
- Hosted from a **project repo** named `Portfolio` (not the special
  `<user>.github.io` user-site repo), so the live URL is
  `https://yashulanki.github.io/Portfolio/`.
- Content covers exactly six real projects, described accurately from each
  repo's own README — no invented features or metrics.

## Content inventory (source of truth: each repo's own README, checked 2026-07-29)

| Project | Repo | Tags | Live link | Notes |
|---|---|---|---|---|
| Vaulter AI Property Intelligence System | `YashuLanki/Vaulter_AI` | Python · MCP · Claude API · RAG | — (internal tool) | Local-first AI system for a real-estate investment firm; RAG-backed document search + listing screener, each teammate's instance fully local/private. |
| CoStar Listing Screener | `YashuLanki/Costar_screener` | Python · Claude API · Google Maps | — | 4-phase pipeline: hard-rule elimination → composite ranking → Claude qualitative analysis → Google Maps ground-truth verification. Real funnel: 216 raw listings → 9 verified candidates. |
| Proximity Mapper | `YashuLanki/Proximity-Intel` | Python · Google Places API · GeoJSON | — | Given a property, finds nearby employers/anchors, computes distance & direction, exports GeoJSON/CSV for due diligence. |
| Arizona Marshallese Community Website | `YashuLanki/community_site` | HTML · CSS · JavaScript | `https://azmarshallese.github.io/community_site/` | Official site for a 501(c)(3) nonprofit; single hand-built page, zero build tooling. |
| Bilingual Resume Builder | `YashuLanki/resume_builder` | JavaScript · Express · Client-side PDF | — (no public frontend URL found) | Free English/Marshallese resume builder; guided form, optional AI-assisted writing help, one-click PDF export, all client-side. |
| Airline Fare Prediction | `YashuLanki/AirlineRoutesAndPricing` | Python · scikit-learn · Regression | — | ML project predicting airline ticket prices from route/schedule features; compares decision tree & random forest, evaluated on MAE/MSE/R². Originated as a guided course project — framed honestly as such. |

No README rewrites are needed — all six already have solid documentation.
Descriptions above are condensed/adapted from each repo's real README, not
invented.

## Visual design

**Thesis (revised after user review):** the initial direction built the hero
around an animated "216 raw listings → 9 verified acquisitions" pipeline bar.
User feedback: it read as confusing rather than impressive, and the
supporting paragraph felt "cheesy." Both were replaced with plain, direct
copy — a straightforward headline and a first-person paragraph explaining
what the site is and what's in it, no visual metaphor. The real 216→9 number
still lives inside the CoStar Listing Screener project card, where it's
concrete rather than abstract.

**Palette** (dark, engineering-console feel):
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B0D12` | page background |
| `panel` | `#14171D` | card/section surfaces |
| `paper` | `#E9E8E3` | primary text |
| `wire` | `#2A2F3A` | hairline borders/dividers |
| `signal` | `#D9A441` | amber accent — links, active states, hero pipeline (sole "action" color) |
| `data` | `#6FD6C4` | teal — tech-tag pills / metrics only |

**Type:**
- Display: **Space Grotesk** (headlines)
- Body: **IBM Plex Sans**
- Utility/mono: **IBM Plex Mono** (nav labels, tech tags, pipeline counts)

**Layout:**
- Slim top bar: name/mark + mono-caps nav (`PROJECTS`, `STACK`, `CONTACT`).
- Hero: headline + one-line positioning statement, and a literal animated
  pipeline bar showing `216 raw listings → 9 verified acquisitions` (segments
  narrow and fill on load).
- Projects: responsive card grid, one card per project above. Each card:
  mono-caps tech eyebrow, title, 2-3 sentence description, hairline divider,
  GitHub link (+ Live link only where one genuinely exists).
  Small 4-6px corner radius. Hover: subtle lift + amber-edge glow.
- Stack section: short, real list of languages/tools that actually appear
  across the six repos (no padded buzzword list).
- Footer: email, GitHub, resume link (if/when one exists).

**Motion:** one orchestrated hero pipeline-bar animation on load; gentle
scroll-reveal per section; hover micro-interactions on cards/links.
`prefers-reduced-motion` respected throughout. Nothing scattered.

**Accessibility / quality floor:** responsive down to mobile width, visible
keyboard focus states, semantic HTML landmarks, alt text on any images,
color contrast checked against the dark palette above.

## Out of scope

- No live GitHub API calls at runtime — project data is a static array in
  `script.js`, authored by hand from the table above.
- No CMS, no multi-page site, no build tooling.
- Not fixing the unrelated repo-hygiene issue noticed in
  `AirlineRoutesAndPricing` (a `venv/` folder appears committed to the repo,
  based on its GitHub language stats) — flagged to the user separately, not
  part of this site's build.

## Open items resolved during brainstorming

- Scope: all 6 repos included (user confirmed).
- Hosting: GitHub Pages from a new repo (user confirmed).
- Repo name: `Portfolio` (user confirmed, revised from the initial
  `<user>.github.io` recommendation).
- README changes: none needed — all repos already documented.
- Visual direction: dark engineering-console palette + Space
  Grotesk/Plex Sans/Plex Mono + real-funnel hero, distinct from AMC_website's
  warm nonprofit identity (user confirmed).
