# Repository Guidelines

## Project Structure & Assets
- `index.html` is the public landing page rendering the catalog with Simile Exhibit; a further `info.html` page holds the background/usage notes.  
- `css/` contains shipped Bootstrap builds and the custom overrides in `css/style.css` (edit here first).  
- `less/` stores the upstream Bootstrap sources for reference; they are not auto-compiled.  
- `js/` bundles vendor scripts (`jquery.min.js`, `bootstrap.min.js`, `js/dist/exhibit-api.js`) plus an empty `scripts.js` placeholder for future tweaks.  
- `img/`, `fonts/`, `data/`, `demo/` host static assets used by the pages.

## Build, Serve, and Quick Checks
- No build step is required; pages are static.  
- Serve locally from the repo root to avoid CORS/font issues: `python -m http.server 8000` then open `http://localhost:8000/index.html`.  
- If you ever adjust the Bootstrap Less sources, compile manually: `lessc less/bootstrap.less css/bootstrap.css && lessc less/bootstrap.less css/bootstrap.min.css --clean-css`.

## Coding Style & Naming
- HTML: keep tab-indented blocks as in existing files; prefer Bootstrap classes over inline styling when possible.  
- CSS: add tweaks in `css/style.css`; use lowercase hex colors and avoid important unless matching current patterns.  
- JS: keep dependencies vanilla (jQuery + Exhibit); prefer unobtrusive patterns and namespace any new helpers under a single global if added to `scripts.js`.  
- Content is Italian-facing; keep labels and copy in Italian unless explicitly adding bilingual text.

## Testing Guidelines
- Smoke test locally: page loads without console errors; the Exhibit table renders rows from the Google Sheets CSV; search facet responds.  
- After CSS changes, verify table striping, navbar responsiveness, and that icons in `img/logo-soft-skills.png` still appear.  
- There is no automated test suite; manual browser check is expected before opening a PR.

## Data & Configuration Notes
- Data is pulled at runtime from the public Google Sheets CSV linked in the `<link rel="exhibit/data">` tag inside `index.html`. Do not break or rename that tag; changes to the sheet URL should be highlighted in the PR.  
- Exhibit locale is set via `js/dist/exhibit-api.js?locale=it`; keep this parameter unless you are explicitly localizing.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages (e.g., “Fix column labels”, “Tweak navbar colors”) following the existing history.  
- Scope commits narrowly and avoid mixing style tweaks with data/source rewiring.  
- PRs should include: brief summary, what changed, how you tested (browser + URL), and screenshots or GIFs if the UI shifts. Link related issues when available.  
- Keep diffs small; favor incremental improvements over large refactors for static assets.
