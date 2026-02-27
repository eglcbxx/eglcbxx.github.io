# home.spec.md — Home Page

> Covers: `src/pages/Home.jsx`, `SkillCard.jsx`, `StrengthCard.jsx`, `Carousel.jsx`

---

## Route

| Path | Layout | Component |
|---|---|---|
| `/` (index) | `Layout` | `Home` |

---

## Sections

### 1. Hero Section

The hero is displayed inside a `<section className="hero animate-fade">` and observed by `useScrollAnimation()`.

| Element | Content | i18n key |
|---|---|---|
| Greeting | "Hi, I'm Coach E.T" + wave emoji | `hero.greeting` |
| Subtitle | Tag line | `hero.subtitle` |
| Description | Paragraph | `hero.description` |
| Tags | Hard-coded: `JavaScript`, `React`, `HTML/CSS`, `Ruby on Rails`, `SQL`, `AI Tools Expert` | — (not translated) |
| CTA buttons | "View My Work" → `/portfolio`, "Get In Touch" → `/contact` | `hero.viewWork`, `hero.getInTouch` |
| Image | `/assets/images/egl-picture.jpg` | — |

**Note:** Hero tags are **hard-coded strings** in JSX (not in a data file, not translated).

### 2. Skills Carousel

| Data source | `src/data/skills.json` |
|---|---|
| Items | `skillsData.skills` array (8 skills) |
| Card component | `SkillCard` |
| Container | `Carousel` (id: `skills-carousel`) |
| Section heading | `sections.skills` (i18n) |

**SkillCard** renders:
- `skill.emoji` + `skill.name` (header)
- `skill.level` (level badge)
- `skill.technologies` (small text)
- `skill.details` (bulleted list, shown when expanded)
- "Click to see details" prompt

**Interactions:** Click toggles `.expanded` class. When expanded inside the Carousel, the carousel pauses and centers the card.

### 3. Strengths Carousel

| Data source | `src/data/strengths.json` |
|---|---|
| Items | `strengthsData.strengths` array (4 strengths) |
| Card component | `StrengthCard` |
| Container | `Carousel` (id: `strengths-carousel`) |
| Section heading | `sections.strengths` (i18n) |

**StrengthCard** renders:
- `strength.emoji` + `strength.title` (header)
- `strength.points` (bulleted list, shown when expanded)
- "Click to see details" prompt

**Interactions:** Same expand/collapse as SkillCard.

---

## Scroll Animations

- Hero section: observed by `useScrollAnimation()` → `animate-fade`
- All child elements with `.animate-on-scroll` or `.animate-fade`: observed by `useScrollAnimationGroup()` via parent `ref={mainRef}`
- Animation trigger: `IntersectionObserver` with `threshold: 0.1` and `rootMargin: '0px 0px -50px 0px'`
- Class added: `animated` when element enters viewport

---

## Data Schema

### skills.json

```json
{
  "skills": [
    {
      "id": "string",
      "emoji": "string",
      "name": "string",
      "level": "string",
      "technologies": "string",
      "details": ["string"]
    }
  ]
}
```

### strengths.json

```json
{
  "strengths": [
    {
      "emoji": "string",
      "title": "string",
      "points": ["string"]
    }
  ]
}
```

---

## i18n Keys Used

- `hero.greeting`, `hero.subtitle`, `hero.description`
- `hero.viewWork`, `hero.getInTouch`
- `sections.skills`, `sections.strengths`
