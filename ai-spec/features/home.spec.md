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
| Tags | Hard-coded tech names: `JavaScript`, `React`, `HTML/CSS`, `Ruby on Rails`, `SQL`; translated: `t('hero.aiExpert')` | `hero.aiExpert` |
| CTA buttons | "View My Work" → `/portfolio`, "Get In Touch" → `/contact` | `hero.viewWork`, `hero.getInTouch` |
| Image | `/assets/images/egl-picture.jpg` | — |

**Note:** Hero tags are hard-coded tech names (universal, not translated) except `AI Tools Expert` which uses `t('hero.aiExpert')`.

### 2. Skills Carousel

| Data source | `src/data/skills.json` |
|---|---|
| Items | `skillsData.skills` array (8 skills) |
| Card component | `SkillCard` |
| Container | `Carousel` (id: `skills-carousel`) |
| Section heading | `sections.skills` (i18n) |

**SkillCard** renders:
- `skill.emoji` + `localize(skill.name)` (header)
- `localize(skill.level)` (level badge)
- `localize(skill.technologies)` (small text)
- `localize(skill.details)` (bulleted list, shown when expanded)
- `t('ui.clickDetails')` prompt

All skill data fields are multilingual objects resolved via `localize()`.

**Interactions:** Click toggles `.expanded` class. When expanded inside the Carousel, the carousel pauses and centers the card.

### 3. Strengths Carousel

| Data source | `src/data/strengths.json` |
|---|---|
| Items | `strengthsData.strengths` array (4 strengths) |
| Card component | `StrengthCard` |
| Container | `Carousel` (id: `strengths-carousel`) |
| Section heading | `sections.strengths` (i18n) |

**StrengthCard** renders:
- `strength.emoji` + `localize(strength.title)` (header)
- `localize(strength.points)` (bulleted list, shown when expanded)
- `t('ui.clickDetails')` prompt

All strength data fields are multilingual objects resolved via `localize()`.

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

All text fields are multilingual objects `{ en, fr, vn }`:

```json
{
  "skills": [
    {
      "id": "string",
      "emoji": "string",
      "name": { "en": "...", "fr": "...", "vn": "..." },
      "level": { "en": "...", "fr": "...", "vn": "..." },
      "width": "number",
      "technologies": { "en": "...", "fr": "...", "vn": "..." },
      "details": { "en": ["..."], "fr": ["..."], "vn": ["..."] }
    }
  ]
}
```

### strengths.json

All text fields are multilingual objects `{ en, fr, vn }`:

```json
{
  "strengths": [
    {
      "emoji": "string",
      "title": { "en": "...", "fr": "...", "vn": "..." },
      "points": { "en": ["..."], "fr": ["..."], "vn": ["..."] }
    }
  ]
}
```

---

## i18n Keys Used

- `hero.greeting`, `hero.subtitle`, `hero.description`
- `hero.viewWork`, `hero.getInTouch`, `hero.aiExpert`
- `sections.skills`, `sections.strengths`
- `ui.clickDetails` (SkillCard, StrengthCard)

Data content uses `localize()` for multilingual skill/strength fields.
