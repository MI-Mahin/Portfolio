# Portfolio — MI‑Mahin

This repository contains a responsive personal portfolio built with React and Vite. The site is designed for clarity, accessibility, and straightforward maintenance.

## Overview

The application is a single-page portfolio comprising the following sections: Hero, Projects, Experience, Education, Skills, and Contact. Components live under `src/components/` and layout/styling is managed in `src/index.css`.

## Requirements

- Node.js (v16 or later) and npm

## Development

### Contact form setup (no backend)

This portfolio uses Formspree for contact form delivery.

1. Create a form at Formspree and copy your endpoint URL (for example, `https://formspree.io/f/abcde123`).
2. Copy `.env.example` to `.env`.
3. Set your endpoint in `.env`:

```powershell
copy .env.example .env
```

Then edit `.env` and set:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

4. Restart the dev server after changing `.env`.

Install dependencies:

```powershell
npm install
```

Start the development server with hot reload:

```powershell
npm run dev
```

Build production assets:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Project layout

- `index.html` — application root
- `src/main.*` — application bootstrap
- `src/App.*` — top-level layout and routes
- `src/components/` — UI components (e.g., `Projects.jsx`, `Experience.jsx`, `Education.jsx`, `Navbar.jsx`, `Hero.jsx`)
- `src/index.css` — global stylesheet
- `public/projects/` — project thumbnails and static assets

## Images and SVGs

- Reference static images and SVGs from `public/` using absolute paths, for example:

```jsx
<img src="/projects/police-positive.svg" alt="Police Positive screenshot" />
```

- Recommended SVG editing workflow:
  1. Create a local backup before editing: `copy file.svg file.svg.orig`.
 2. Edit only the non-essential mockup layers (for example, a white rounded-rect used as a mockup frame).
 3. Test changes with `npm run dev` and review the Projects page.
 4. If the edit causes an issue, restore from the `.orig.svg` backup.

## Styling notes

- Global styles are in `src/index.css`. Prefer small, targeted edits to avoid wide regressions.
- Project thumbnails are displayed inside `.project-media`. Use `object-fit: contain` to show the entire artwork, or `object-fit: cover` to enforce a uniform cropped appearance.
- Experience and Education cards follow a left-logo/right-content pattern; logo styling is defined by `.experience-logo` and `.education-logo`.

## Accessibility

- Provide meaningful `alt` text for images.
- Maintain accessible controls (`aria-controls`, `aria-expanded`) for interactive items such as expandable descriptions.

## Deployment

After building (`npm run build`) the `dist/` directory contains the static site to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

Example: GitHub Pages (optional):

```powershell
npm install --save-dev gh-pages
# Add to package.json scripts: "predeploy": "npm run build", "deploy": "gh-pages -d dist"
npm run deploy
```

## Maintenance and contribution guidelines

- Keep commits small and descriptive. If editing images or SVGs, include a note and keep a `.orig.svg` backup.
- Test layout and visual changes at several viewport widths.

If you would like, I can add a README screenshot, deploy scripts for a specific host, or a `CONTRIBUTING.md` describing commit conventions.

---

Owner: MI‑Mahin

License: This repository is provided as a personal project template. Add a license file if you intend to publish or redistribute publicly.
