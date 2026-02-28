# theme.spec.md — Dark / Light Theme

> Covers: `src/hooks/useTheme.js`, `src/components/ThemeToggle.jsx`, CSS custom properties in `src/styles.css`

---

## Overview

The site supports two themes: **dark** (default) and **light**. Theme is toggled via a floating button and persisted in `localStorage`.

---

## Hook: `useTheme()`

| Export | Type | Description |
|---|---|---|
| `theme` | `string` | Current theme: `'dark'` or `'light'` |
| `toggleTheme` | `function` | Switches between dark and light |

**Initialization:** `localStorage.getItem('theme')` or `'dark'`

**Effects on change:**
- Sets `document.documentElement.setAttribute('data-theme', theme)`
- Persists to `localStorage.setItem('theme', theme)`

---

## ThemeToggle Component

- **Position:** Fixed on screen (CSS: `.theme-toggle`)
- **Render:** Two inline SVGs (sun + moon icons)
  - `.sun-icon` — visible in dark mode (click to go light)
  - `.moon-icon` — visible in light mode (click to go dark)
- **Accessibility:** `aria-label="Toggle theme"`
- **Placement:** Rendered inside `Layout` component (appears on all public pages, not on backoffice)

---

## CSS Implementation

### Dark Theme (Default — `:root`)

```css
:root {
  --bg: #0a0a0f;
  --card: #1a1a2e;
  --text: #e0e0e0;
  --muted: #888;
  --accent: #64ffda;
  --border: #333;
}
```

### Light Theme (`[data-theme="light"]`)

```css
[data-theme="light"] {
  --bg: #f5f5f5;
  --card: #ffffff;
  --text: #1a1a2e;
  --muted: #666;
  --accent: #0d7377;
  --border: #ddd;
}
```

All components reference these custom properties (e.g., `color: var(--text)`, `background: var(--card)`), so the entire UI responds to the `data-theme` attribute automatically.

### Toggle Button Styling

```css
.theme-toggle {
  position: fixed;
  top: 80px;
  right: 20px;
  /* ... */
}
```

- In dark mode: `.sun-icon` visible, `.moon-icon` hidden
- In light mode: `.moon-icon` visible, `.sun-icon` hidden
- Transition animation on icon swap

---

## localStorage

| Key | Value | Default |
|---|---|---|
| `theme` | `dark` / `light` | `dark` |
