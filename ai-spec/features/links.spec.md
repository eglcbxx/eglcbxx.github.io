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
- `resource.title` (h3) — brand names, not translated
- Image: `resource.image` (prepends `/` if path starts with `assets/`)
- `localize(resource.description)` (small text — multilingual)
- `t('ui.visit')` external link (`target="_blank"`)

Additional classes: `.card .no-modal .animate-on-scroll`

Individual `useScrollAnimation()` ref for fade-in on scroll.

---

## Data Schema

### resources.json

Description field is a multilingual object `{ en, fr, vn }`:

```json
{
  "resources": [
    {
      "title": "string (brand name, not translated)",
      "description": { "en": "...", "fr": "...", "vn": "..." },
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
- `ui.visit` (ResourceCard link text)

Resource descriptions use `localize()` for multilingual content.
