# routing.spec.md — Routing & Navigation

> Covers: `src/App.jsx`, `src/components/Layout.jsx`, `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/pages/NotFound.jsx`

---

## Router Type

**`MemoryRouter`** from `react-router-dom`.

- The URL bar always shows the base URL (e.g., `localhost:5173/`)
- No hash fragments, no path segments visible to the user
- Navigation is entirely internal via `<Link>`, `<NavLink>`, and `useNavigate()`

---

## Route Table

| Path | Layout | Component | Description |
|---|---|---|---|
| `/` (index) | `Layout` | `Home` | Home page |
| `/portfolio` | `Layout` | `Portfolio` | Portfolio page |
| `/links` | `Layout` | `Links` | Resources page |
| `/contact` | `Layout` | `Contact` | Contact form |
| `*` (catch-all) | `Layout` | `NotFound` | 404 page |
| `/secret-backoffice` | **None** | `SecretBackoffice` | Admin backoffice |

### Route Structure in `App.jsx`

```jsx
<MemoryRouter>
  <SecretShortcut />
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="links" element={<Links />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="secret-backoffice" element={<SecretBackoffice />} />
  </Routes>
</MemoryRouter>
```

- Public routes are children of `<Route element={<Layout />}>` (shared layout)
- Backoffice is a sibling route (no Layout wrapper — no Navbar, Footer, theme toggle, etc.)

---

## Layout Component

Wraps all public pages with shared UI:

1. **Skip-to-main link** — `<a href="#main-content" className="skip-to-main">` (i18n: `aria.skipToMain`)
2. **ScrollProgress** — horizontal scroll progress bar at top
3. **Navbar** — navigation links
4. **Main content** — `<main id="main-content" role="main"><Outlet /></main>`
5. **Footer** — social links + copyright
6. **ThemeToggle** — fixed position dark/light toggle
7. **LanguageSwitcher** — fixed position language dropdown

### Page Transition Effect

On every route change (`location.pathname`), Layout resets `document.body.style.animation` to re-trigger the `pageLoad` CSS animation:

```js
useEffect(() => {
  document.body.style.animation = 'none';
  void document.body.offsetHeight; // force reflow
  document.body.style.animation = '';
}, [location.pathname]);
```

---

## Navbar (`Navbar.jsx`)

- **Sticky header:** `position: sticky; top: 0; z-index: 100` — stays at the top of the viewport on scroll with a solid `var(--bg)` background so content never shows through or overlaps it
- Brand: logo image (`/assets/images/logo.png`) + "Coach E.T @ Codeboxx" text
- Navigation links using `<NavLink>`:
  - Home (`/`, `end` prop for exact match)
  - Portfolio (`/portfolio`)
  - Links (`/links`)
  - Contact (`/contact`)
- Active link gets `.active` class via `NavLink`'s `className` callback
- All labels translated via `t('nav.home')`, etc.

---

## Footer (`Footer.jsx`)

- Social links: LinkedIn (external), GitHub (external), Contact (uses `useNavigate()` to `/contact`)
- Copyright: `© {currentYear} Coach E.T @ Codeboxx`

---

## NotFound Page (`NotFound.jsx`)

- Displays "404" heading and "Page not found." text
- "Go Home" button links to `/`
- Rendered inside Layout (gets Navbar, Footer, etc.)
- **Not translated** — all text is hard-coded English

---

## Secret Shortcut (`SecretShortcut`)

Defined as a component in `App.jsx`, rendered inside `MemoryRouter` (so it has access to `useNavigate`).

| OS | Shortcut |
|---|---|
| macOS | `Cmd+Shift+K` |
| Other | `Ctrl+Shift+K` |

Listens for `keydown` on `document`. Calls `navigate('/secret-backoffice')` and prevents default.

Renders `null` (invisible).
