# ui-components.spec.md — Shared UI Components

> Covers: `Carousel.jsx`, `ScrollProgress.jsx`, `Modal.jsx`, `ConfirmModal.jsx`, `IconButton.jsx`, `ImageModal.jsx`, `useScrollAnimation.js`

---

## Carousel (`src/components/Carousel.jsx`)

### Purpose
Infinite auto-scrolling horizontal carousel. Used on Home page for skills and strengths.

### Props

| Prop | Type | Description |
|---|---|---|
| `id` | `string` | HTML id for the wrapper div |
| `children` | `ReactNode` | Card components to display |

### Implementation

**Strategy:** Renders two sets of children (original + clones via `cloneElement`) in a single track. Animates via `translate3d` using `requestAnimationFrame`.

**Seamless loop:** When scroll position exceeds the width of one complete set, it jumps back by exactly that width. Since clone set is identical, no visual seam appears.

**Measurement:** On mount, measures one card's `offsetWidth` + CSS gap to calculate total set width. Uses `requestAnimationFrame` retry if cards haven't painted yet.

**Speed:** 1.5px per frame (~90px/s at 60fps).

### Expand Interaction

When a `.skill-card` or `.strength-card` inside the carousel is clicked:

1. **If not expanded:** Pause animation, add `.expanded` class, center the card in view with a 0.3s ease transition
2. **If already expanded:** Remove `.expanded`, resume animation
3. **If clicking a link inside a card:** Event propagation stops — no expand/collapse

The wrapper gets `.has-expanded-card` class when a card is expanded.

### Key Refs
- `wrapperRef` — outer `.carousel-wrapper` div
- `trackRef` — inner `.carousel-track` div
- `posRef` — current scroll position (number)
- `rafRef` — requestAnimationFrame ID
- `pausedRef` — boolean, pauses animation loop
- `setWidthRef` — total width of one set of cards

---

## ScrollProgress (`src/components/ScrollProgress.jsx`)

### Purpose
Horizontal progress bar at the top of the page showing scroll percentage.

### Implementation
- Listens to `window.scroll` event
- Calculates: `(scrollY / (scrollHeight - clientHeight)) * 100`
- Renders: `<div className="scroll-progress" style={{ width: '${pct}%' }} />`
- CSS: fixed top-left, height ~3px, accent color, z-index above other content

---

## useScrollAnimation Hook (`src/hooks/useScrollAnimation.js`)

### `useScrollAnimation(options?)`

Returns a `ref` to attach to a single element.

- Creates an `IntersectionObserver` with `threshold: 0.1`, `rootMargin: '0px 0px -50px 0px'`
- When element enters viewport: adds CSS class `animated`
- Observes once (does not remove class when leaving viewport)

### `useScrollAnimationGroup(selector?)`

Returns a `ref` to attach to a parent container.

- Default selector: `.animate-on-scroll, .animate-fade, .animate-slide-left, .animate-slide-right`
- Queries all matching children and observes each with IntersectionObserver
- Same behavior: adds `animated` class when each child enters viewport

---

## Modal (`src/components/ui/Modal.jsx`)

### Purpose
Generic reusable modal overlay.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility |
| `onClose` | `function` | — | Called on Escape or overlay click |
| `className` | `string` | `''` | Extra class on `.modal-content` |
| `children` | `ReactNode` | — | Modal body |

### Behavior
- Renders `null` when `!open`
- Overlay: `.modal.active` — click calls `onClose`
- Content: `.modal-content` — click stops propagation
- Escape key: closes modal
- Does NOT render its own close button (consumer must add one)

---

## ConfirmModal (`src/components/ui/ConfirmModal.jsx`)

### Purpose
Confirmation dialog built on top of `Modal`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controls visibility |
| `onCancel` | `function` | — | Called on cancel or overlay close |
| `onConfirm` | `function` | — | Called on confirm button click |
| `title` | `string` | `'Are you sure?'` | Dialog heading |
| `message` | `string` | `''` | Dialog body text |
| `confirmLabel` | `string` | `'Delete'` | Confirm button text |
| `loading` | `boolean` | `false` | Disables buttons, shows spinner |

### Render
- `<h3>{title}</h3>`
- `<p>{message}</p>`
- Two buttons: Cancel (`.btn-secondary`) and Confirm (`.btn-danger`)
- Class: `.confirm-modal` on `.modal-content`

---

## IconButton (`src/components/ui/IconButton.jsx`)

### Purpose
Small icon-only button with accessible label.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClick` | `function` | — | Click handler |
| `icon` | `ReactNode` | — | Inline SVG or element |
| `label` | `string` | — | `aria-label` and `title` |
| `variant` | `string` | `'default'` | `'default'` or `'danger'` |
| `disabled` | `boolean` | `false` | Disables the button |

### CSS Classes
- `.icon-btn` (base)
- `.icon-btn--default` or `.icon-btn--danger` (variant modifier)

---

## ImageModal (`src/components/ImageModal.jsx`)

### Purpose
Fullscreen image lightbox overlay.

### Props

| Prop | Type | Description |
|---|---|---|
| `src` | `string` | Image URL |
| `alt` | `string` | Alt text |
| `onClose` | `function` | Called on close |

### Behavior
- Overlay: `.image-modal.active` — click calls `onClose`
- Close button: `×` in top corner, `aria-label={t('ui.closeImage')}`
- Content: `.image-modal-content` — click stops propagation
- Escape key: closes modal
- Image renders at full size within the viewport
- Uses `useLanguage` hook for translated aria-label

### Usage
Used in `ProjectCard` — clicking a project image opens the lightbox.
