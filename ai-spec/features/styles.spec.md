# styles.spec.md — CSS Architecture

> Covers: `src/styles.css` (single file, ~1706 lines)

---

## Architecture

All styles live in **one file**: `src/styles.css`. There are no CSS modules, no CSS-in-JS, and no external CSS framework.

Components reference CSS classes directly via `className` strings. Theming is done via CSS custom properties on `:root` and `[data-theme="light"]`.

---

## Custom Properties (Design Tokens)

### Dark Theme (`:root` — default)

| Variable | Value | Purpose |
|---|---|---|
| `--bg` | `#0b0f19` | Page background |
| `--card` | `#121a2a` | Card/surface background |
| `--text` | `#e8eefc` | Primary text color |
| `--muted` | `#a9b4d0` | Secondary/muted text |
| `--accent` | `#7aa2ff` | Links, buttons, highlights |
| `--border` | `rgba(255,255,255,.12)` | Borders and dividers |
| `--max` | `1000px` | Container max-width |

### Light Theme (`[data-theme="light"]`)

| Variable | Value |
|---|---|
| `--bg` | `#f8f9fa` |
| `--card` | `#ffffff` |
| `--text` | `#1a1a1a` |
| `--muted` | `#6b7280` |
| `--accent` | `#2563eb` |
| `--border` | `rgba(0,0,0,.12)` |

---

## Major Sections (by line range, approximate)

| Section | Lines | Description |
|---|---|---|
| Root variables + reset | 1–40 | Custom properties, box-sizing, body styles |
| Header / Navbar | 40–100 | `header` (sticky, `z-index:100`, solid `var(--bg)` background), `.nav`, `.brand`, nav links |
| Hero | 100–240 | `.hero`, `.hero-content`, `.hero-tags`, `.hero-cta` |
| Responsive (768px) | 239–310 | Mobile adaptations for hero, nav |
| Scroll animations | 310–400 | `.animate-fade`, `.animate-on-scroll`, `.animated` class |
| Micro-interactions | 400–510 | Button effects, card hover, link hover, tag hover, input focus, nav link effects, project image hover |
| Page transitions | 515–545 | `@keyframes pageLoad`, `pageExit` |
| Theme toggle | 545–645 | `.theme-toggle`, sun/moon icon visibility |
| Language switcher | 645–750 | `.language-toggle`, `.language-menu`, `.language-option` |
| Modals | 750–875 | `.modal`, `.modal-content`, `@keyframes modalFadeIn/modalSlideIn` |
| Image modal | 875–910 | `.image-modal`, `.image-modal-content` |
| Form validation | 910–980 | `.form-error`, `@keyframes errorShake/successSlide`, `.form-message` |
| Loading & buttons | 980–1020 | `.btn-loading`, `@keyframes spin` |
| Portfolio filters | 1020–1100 | `.filter-bar`, `.filter-btn` |
| Project cards | 1100–1180 | `.project-card-clickable`, `.project-img` |
| Carousel | 1180–1240 | `.carousel-wrapper`, `.carousel-track`, expanded card states |
| Skill cards | 1240–1310 | `.skill-card`, `.skill-header`, `.skill-details`, expanded state |
| Strength cards | 1310–1370 | `.strength-card`, `.strength-header`, `.strength-details` |
| Accessibility | 1370–1450 | `prefers-reduced-motion`, `focus-visible`, `.skip-to-main`, `prefers-contrast: high`, `.sr-only` |
| Backoffice | 1450–1706 | `.login-page`, `.backoffice-*`, `.icon-btn`, `.confirm-modal`, responsive backoffice |

---

## Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| `max-width: 768px` | Hero layout → single column, nav font size, carousel sizing |
| `min-width: 1200px` | Large desktop adjustments (grid columns) |
| `max-width: 600px` | Backoffice table responsive (stacked rows), login card padding |

---

## Keyframe Animations

| Name | Purpose | Used by |
|---|---|---|
| `wave` | Waving hand emoji | `.wave` in hero |
| `pageLoad` | Fade + slide in on route change | `body` (triggered by Layout) |
| `pageExit` | Fade + slide out | `.page-exit` |
| `modalFadeIn` | Modal backdrop appearance | `.modal.active` |
| `modalSlideIn` | Modal content slide in | `.modal-content` |
| `errorShake` | Shake effect on error | `.form-error.active` |
| `successSlide` | Slide in for success message | `.form-message.active.success` |
| `spin` | Infinite rotation | `.btn-loading::before` (spinner) |

---

## Scroll Animation CSS Classes

| Class | Pre-animated State | Post-animated (`.animated`) |
|---|---|---|
| `.animate-fade` | `opacity: 0; translateY(30px)` | `opacity: 1; translateY(0)` |
| `.animate-on-scroll` | `opacity: 0; translateY(30px)` | `opacity: 1; translateY(0)` |
| `.animate-slide-left` | `opacity: 0; translateX(-50px)` | `opacity: 1; translateX(0)` |
| `.animate-slide-right` | `opacity: 0; translateX(50px)` | `opacity: 1; translateX(0)` |

Transition: `0.6s ease-out` (disabled if `prefers-reduced-motion: reduce`).

---

## Accessibility

### `prefers-reduced-motion: reduce`
- Disables all animations and transitions
- Sets `animation: none !important`, `transition: none !important`

### `prefers-contrast: high`
- Increases border opacity/weight
- Enhances text contrast

### Focus
- `*:focus-visible` — accent-colored outline with offset
- Interactive elements (`button`, `a`, `input`, `textarea`) get `outline: 2px solid var(--accent)`

### Skip-to-Main
- `.skip-to-main` — visually hidden, positions into view on `:focus`
- Links to `#main-content`

### Screen Reader Only
- `.sr-only` — standard visually-hidden utility class

---

## Naming Conventions

- **BEM-like for backoffice:** `.backoffice-header`, `.backoffice-table-wrap`, `.icon-btn--danger`
- **Simple kebab-case elsewhere:** `.hero-content`, `.filter-btn`, `.form-error`
- **State modifiers:** `.active`, `.expanded`, `.animated`, `.error`, `.success`
- **Component scope:** `.skill-card`, `.strength-card`, `.project-card-clickable`

---

## Rules for Adding CSS

1. Add new styles to the appropriate section of `styles.css`
2. Use existing custom properties (`var(--accent)`, etc.) for colors
3. Respect dark/light theme — test both
4. Use existing animation patterns for consistency
5. Add `prefers-reduced-motion` override for new animations
6. Use existing `.card`, `.btn-primary`, `.btn-secondary`, `.btn-danger` base classes where applicable
