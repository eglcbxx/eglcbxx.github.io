# mobile-layout.spec.md — Mobile App-Style Layout

> Covers: `src/components/Navbar.jsx`, `src/components/Layout.jsx`, `src/styles.css`

---

## Purpose

Transform the website into a mobile-app-like experience on small screens (≤ 768px). The desktop navbar at the top is replaced by a **bottom tab bar** with icons, mimicking native phone applications. The desktop layout remains unchanged.

---

## Breakpoint

| Condition | Layout |
|---|---|
| `min-width: 769px` | **Desktop** — top sticky navbar with text links, no bottom bar |
| `max-width: 768px` | **Mobile** — top navbar hidden, bottom tab bar with icons + labels |

---

## Bottom Tab Bar (Mobile)

### Structure

The `Navbar` component renders **two** navigation elements:

1. **Desktop nav** (`<header className="desktop-nav">`) — existing top navbar, hidden on mobile via CSS
2. **Mobile bottom bar** (`<nav className="mobile-bottom-nav">`) — fixed to the bottom of the viewport, visible only on mobile

### Tab Items

| Route | Icon | Label (i18n key) |
|---|---|---|
| `/` | Home icon (house) | `nav.home` |
| `/portfolio` | Briefcase icon | `nav.portfolio` |
| `/links` | Link icon | `nav.links` |
| `/contact` | Envelope icon | `nav.contact` |

Each tab is a `<NavLink>` with:
- An inline SVG icon (24×24, stroke-based, 2px stroke width)
- A small label below the icon
- Active state: accent color + filled/bold appearance

### Visual Spec

| Property | Value |
|---|---|
| Position | `fixed`, `bottom: 0`, `left: 0`, `right: 0` |
| Height | `64px` |
| Background | `var(--bg)` with top border `1px solid var(--border)` |
| Z-index | `1000` (same level as floating buttons) |
| Layout | Flexbox, `justify-content: space-around`, `align-items: center` |
| Icon size | `24px` |
| Label font | `10px`, `var(--muted)` color; active: `var(--accent)` |
| Safe area | `padding-bottom: env(safe-area-inset-bottom)` for iPhone notch |
| Backdrop | `backdrop-filter: blur(12px)` + semi-transparent background |

---

## Layout Adjustments (Mobile)

### Body Padding

On mobile, `<main>` gets `padding-bottom: 80px` to prevent content from being hidden behind the bottom nav bar.

### Floating Buttons

On mobile (≤ 768px):
- `.theme-toggle` moves from `bottom-left` → above the bottom nav: `bottom: 80px`
- `.language-toggle` moves to: `bottom: 140px`
- `.language-menu` repositions to: `bottom: 200px`

### Top Header

On mobile (≤ 768px):
- The `<header>` element with class `desktop-nav` is hidden (`display: none`)
- The brand/logo row is optionally shown inside the mobile layout or omitted for screen space

### Footer

On mobile, the footer gets additional `margin-bottom: 64px` so it's not obscured by the bottom bar.

---

## CSS Classes

| Class | Element | Purpose |
|---|---|---|
| `.desktop-nav` | `<header>` | Top navbar, hidden on mobile |
| `.mobile-bottom-nav` | `<nav>` | Bottom tab bar, hidden on desktop |
| `.bottom-nav-item` | `<NavLink>` | Individual tab (icon + label) |
| `.bottom-nav-icon` | `<svg>` | 24×24 icon |
| `.bottom-nav-label` | `<span>` | Small text label below icon |

---

## Active State

The active tab uses `var(--accent)` color for both icon stroke and label text. Inactive tabs use `var(--muted)`.

React Router's `<NavLink>` provides the `isActive` boolean via the `className` callback:
```jsx
className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
```

---

## Transitions

- Tab icons have `transition: color 0.2s ease`
- The bottom bar has `transition: background 0.3s ease` to match theme switching
- No entry/exit animation for the bar itself (it's always present on mobile)

---

## Accessibility

- `role="navigation"` and `aria-label="Main navigation"` on the mobile `<nav>`
- Each tab has an `aria-label` derived from the i18n label
- Active tab has `aria-current="page"`
- Touch targets are at least 44×44px (achieved via padding)

---

## Files Modified

| File | Changes |
|---|---|
| `src/components/Navbar.jsx` | Add mobile bottom nav markup with SVG icons |
| `src/styles.css` | Add `.mobile-bottom-nav` styles, media queries for show/hide, spacing adjustments |
| `src/components/Layout.jsx` | No structural changes needed (Navbar already rendered) |
