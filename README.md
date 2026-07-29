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
