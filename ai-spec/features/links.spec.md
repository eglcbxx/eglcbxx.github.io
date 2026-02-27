# links.spec.md — Links / Resources Page

> Covers: `src/pages/Links.jsx`, `ResourceCard.jsx`

---

## Route

| Path | Layout | Component |
|---|---|---|
| `/links` | `Layout` | `Links` |

---

## Description

A simple page displaying external resource links as cards in a grid.

---

## Component Behavior

### Links Page (`Links.jsx`)

- Renders page title and description via i18n: `links.title`, `links.description`
- Maps `resourcesData.resources` array into `ResourceCard` components
- Parent container has `useScrollAnimationGroup()` ref for scroll animations

### ResourceCard (`ResourceCard.jsx`)

Each card renders:
- `resource.title` (h3)
- Image: `resource.image` (prepends `/` if path starts with `assets/`)
- `resource.description` (small text)
- "Visit →" external link (`target="_blank"`)

Additional classes: `.card .no-modal .animate-on-scroll`

Individual `useScrollAnimation()` ref for fade-in on scroll.

---

## Data Schema

### resources.json

```json
{
  "resources": [
    {
      "title": "string",
      "description": "string",
      "image": "string (path)",
      "link": "string (URL)"
    }
  ]
}
```

Currently **2 resources** in the data file.

---

## i18n Keys Used

- `links.title`, `links.description`

## Non-Translated Text

- "Visit →" (hard-coded in `ResourceCard.jsx`)
- All resource data (title, description) is English-only
