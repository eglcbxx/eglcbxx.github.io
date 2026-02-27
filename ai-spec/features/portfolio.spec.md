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
- `project.title` (h3)
- Image: `project.image` (prepends `/` if starting with `assets/`)
- `project.description` (small text)
- "View Details →" link to `project.link` (opens in new tab)

**Interactions:**
- **Click card** → opens `ProjectModal` (via `onOpenModal` prop)
- **Click image** → opens `ImageModal` (lightbox) — click is stopped from propagating to card
- **Click "View Details" link** → opens external URL — propagation stopped

### 3. Project Modal (Case Study)

`ProjectModal` opens as a full-screen overlay when a project card is clicked.

**Sections displayed:**
| Section | Icon | Data field |
|---|---|---|
| Problem | 🎯 | `modalData.problem` |
| Solution | 💡 | `modalData.solution` |
| Technologies | 🛠️ | `modalData.tech` (array → tag chips) |
| Key Learnings | 📚 | `modalData.lessons` (array → bullet list) |
| GitHub link | — | `project.link` |

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

```json
{
  "projects": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "image": "string (path)",
      "link": "string (URL)",
      "category": "web | fullstack | backend | mobile",
      "modalData": {
        "problem": "string",
        "solution": "string",
        "tech": ["string"],
        "lessons": ["string"]
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

## Non-Translated Text

- "View Details →" (hard-coded in `ProjectCard.jsx`)
- All `modalData` content (project data is English-only)
- "View on GitHub →" (hard-coded in `ProjectModal.jsx`)
