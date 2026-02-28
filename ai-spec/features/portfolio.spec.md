# portfolio.spec.md — Portfolio Page

> Covers: `src/pages/Portfolio.jsx`, `ProjectCard.jsx`, `ProjectModal.jsx`, `ImageModal.jsx`

---

## Route

| Path | Layout | Component |
|---|---|---|
| `/portfolio` | `Layout` | `Portfolio` |

---

## Features

### 1. Category Filters

A filter bar lets users filter projects by category.

| Key | i18n Key | Meaning |
|---|---|---|
| `all` | `portfolio.allProjects` | Show all |
| `web` | `portfolio.frontend` | Frontend / web |
| `fullstack` | `portfolio.fullstack` | Full-stack |
| `backend` | `portfolio.backend` | Back-end |
| `mobile` | `portfolio.mobile` | Mobile |

- Filters defined as a `FILTERS` constant array inside `Portfolio.jsx`
- Active filter tracked via `useState('all')`
- When `all`: show `projectsData.projects` unfiltered
- Otherwise: `.filter((p) => p.category === activeFilter)`
- Active button gets `.filter-btn.active` class

### 2. Project Cards Grid

Projects rendered in a `.grid` container.

Each `ProjectCard` renders:
- `localize(project.title)` (h3)
- Image: `project.image` (prepends `/` if starting with `assets/`)
- `localize(project.description)` (small text)
- `t('ui.viewDetails')` link to `project.link` (opens in new tab)

**Interactions:**
- **Click card** → opens `ProjectModal` (via `onOpenModal` prop)
- **Click image** → opens `ImageModal` (lightbox) — click is stopped from propagating to card
- **Click "View Details" link** → opens external URL — propagation stopped

### 3. Project Modal (Case Study)

`ProjectModal` opens as a full-screen overlay when a project card is clicked.

**Sections displayed:**
| Section | Heading key | Data field |
|---|---|---|
| Problem | `t('projectModal.problem')` | `localize(modalData.problem)` |
| Solution | `t('projectModal.solution')` | `localize(modalData.solution)` |
| Technologies | `t('projectModal.technologies')` | `modalData.tech` (array → tag chips, not translated) |
| Key Learnings | `t('projectModal.keyLearnings')` | `localize(modalData.lessons)` (array → bullet list) |
| GitHub link | — | `t('ui.viewOnGithub')` + `project.link` |

**Close triggers:**
- Click `×` button
- Click overlay backdrop
- Press `Escape`

### 4. Image Modal (Lightbox)

`ImageModal` opens a fullscreen image view when a project image is clicked.

**Close triggers:**
- Click `×` button
- Click overlay backdrop
- Press `Escape`

---

## Data Schema

### projects.json

All text fields are multilingual objects `{ en, fr, vn }`:

```json
{
  "projects": [
    {
      "id": "string",
      "title": { "en": "...", "fr": "...", "vn": "..." },
      "description": { "en": "...", "fr": "...", "vn": "..." },
      "image": "string (path)",
      "link": "string (URL)",
      "category": "web | fullstack | backend | mobile",
      "modalData": {
        "problem": { "en": "...", "fr": "...", "vn": "..." },
        "solution": { "en": "...", "fr": "...", "vn": "..." },
        "tech": ["string"],
        "lessons": { "en": ["..."], "fr": ["..."], "vn": ["..."] }
      }
    }
  ]
}
```

Currently **9 projects** in the data file.

---

## Scroll Animations

- Page title (`h1`) and description: `animate-fade`
- Filter bar: `animate-fade`
- Each `ProjectCard`: `animate-on-scroll` via individual `useScrollAnimation()` ref

---

## i18n Keys Used

- `portfolio.title`, `portfolio.description`
- `portfolio.allProjects`, `portfolio.frontend`, `portfolio.fullstack`, `portfolio.backend`, `portfolio.mobile`
- `ui.viewDetails` (ProjectCard link text)
- `ui.closeModal` (ProjectModal aria-label)
- `ui.viewOnGithub` (ProjectModal GitHub link)
- `projectModal.problem`, `projectModal.solution`, `projectModal.technologies`, `projectModal.keyLearnings`

All project content uses `localize()` for multilingual title/description/problem/solution/lessons fields.
