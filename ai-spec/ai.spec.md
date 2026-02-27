# ai.spec.md — Master Project Specification

> This is the orchestrator document. It describes the project, its conventions, and links to every feature spec.
> AI agents should read this file first to understand the full codebase before making changes.

---

## Project Overview

**Name:** Coach E.T @ Codeboxx — Portfolio
**Type:** Single-page application (React + Vite), deployed to GitHub Pages
**Repo:** `eglcbxx/eglcbxx.github.io` (branch: `development`, deploys from: `main`)

A personal portfolio website showcasing skills, projects, and resources. Includes a multilingual system (EN/FR/VN), dark/light theme, a Supabase-powered contact form, and a secret admin backoffice for managing messages.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | ^19.2.0 |
| Build tool | Vite | ^7.3.1 |
| Routing | react-router-dom (MemoryRouter) | ^7.13.1 |
| Backend | Supabase (Auth + Postgres) | ^2.98.0 |
| Styling | Pure CSS (custom properties) | — |
| Hosting | GitHub Pages | — |

No CSS framework, no state management library, no testing framework.

---

## Project Structure

```
├── index.html                # Vite entry point
├── vite.config.js            # Vite config (base: "/")
├── package.json              # Dependencies & scripts
├── .env                      # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (git-ignored)
├── .gitignore
├── README.md                 # Setup, backoffice docs, SQL policies
├── ai-spec/
│   ├── ai.spec.md            # THIS FILE — master orchestrator
│   └── features/
│       ├── home.spec.md
│       ├── portfolio.spec.md
│       ├── links.spec.md
│       ├── contact.spec.md
│       ├── backoffice.spec.md
│       ├── i18n.spec.md
│       ├── theme.spec.md
│       ├── routing.spec.md
│       ├── ui-components.spec.md
│       └── styles.spec.md
├── public/
│   └── assets/images/        # Static images (logo, hero, projects, resources)
└── src/
    ├── main.jsx              # App entry (StrictMode)
    ├── App.jsx               # MemoryRouter, routes, SecretShortcut
    ├── styles.css            # All styles (~1700 lines, single file)
    ├── lib/
    │   └── supabaseClient.js # Supabase init + fallback stub
    ├── hooks/
    │   ├── LanguageContext.js # React context for i18n
    │   ├── useLanguage.jsx   # LanguageProvider (context provider)
    │   ├── useLanguage.js    # useLanguage hook (context consumer)
    │   ├── useTheme.js       # Dark/light theme hook
    │   └── useScrollAnimation.js
    ├── data/
    │   ├── translations.json # i18n dictionary (en, fr, vn)
    │   ├── skills.json       # 8 skills
    │   ├── strengths.json    # 4 strengths
    │   ├── projects.json     # 9 projects with modal data
    │   └── resources.json    # 2 external resources
    ├── pages/
    │   ├── Home.jsx
    │   ├── Portfolio.jsx
    │   ├── Links.jsx
    │   ├── Contact.jsx
    │   ├── NotFound.jsx
    │   └── SecretBackoffice.jsx
    └── components/
        ├── Layout.jsx
        ├── Navbar.jsx
        ├── Footer.jsx
        ├── Carousel.jsx
        ├── ThemeToggle.jsx
        ├── LanguageSwitcher.jsx
        ├── ScrollProgress.jsx
        ├── SkillCard.jsx
        ├── StrengthCard.jsx
        ├── ProjectCard.jsx
        ├── ProjectModal.jsx
        ├── ResourceCard.jsx
        ├── ImageModal.jsx
        ├── ui/
        │   ├── Modal.jsx
        │   ├── ConfirmModal.jsx
        │   └── IconButton.jsx
        ├── auth/
        │   └── LoginForm.jsx
        └── backoffice/
            └── MessagesTable.jsx
```

---

## Conventions

### Code Style
- Functional components only, hooks for state/effects
- One default export per file (component name matches filename)
- Props destructured in function signature
- Single `styles.css` — no CSS modules, no CSS-in-JS
- Theming via CSS custom properties on `:root` / `[data-theme="light"]`
- Inline SVGs for icons (no icon library)
- No direct DOM manipulation (exception: `Carousel.jsx` for performance)

### Naming
- Components: `PascalCase.jsx`
- Hooks: `useCamelCase.js`
- Data: `kebab-case.json`
- CSS classes: `kebab-case` (`.backoffice-table`, `.btn-primary`)

### State Management
- React `useState` / `useEffect` / `useCallback` / `useRef`
- Context API for language (`LanguageContext`)
- No external state library

### Data Flow
- Static data: JSON files imported directly
- Dynamic data: Supabase client for contact messages
- i18n: `translations.json` via `useLanguage()` hook's `t()` function

### Environment Variables
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public JWT key
- Stored in `.env` (git-ignored). App runs with safe stub fallback if missing.

---

## Feature Specs Index

| Feature | Spec File | Key Files |
|---|---|---|
| Home page | `features/home.spec.md` | `Home.jsx`, `Carousel.jsx`, `SkillCard.jsx`, `StrengthCard.jsx` |
| Portfolio page | `features/portfolio.spec.md` | `Portfolio.jsx`, `ProjectCard.jsx`, `ProjectModal.jsx`, `ImageModal.jsx` |
| Links page | `features/links.spec.md` | `Links.jsx`, `ResourceCard.jsx` |
| Contact form | `features/contact.spec.md` | `Contact.jsx`, `supabaseClient.js` |
| Admin backoffice | `features/backoffice.spec.md` | `SecretBackoffice.jsx`, `LoginForm.jsx`, `MessagesTable.jsx` |
| Internationalization | `features/i18n.spec.md` | `useLanguage.jsx`, `LanguageSwitcher.jsx`, `translations.json` |
| Theme (dark/light) | `features/theme.spec.md` | `useTheme.js`, `ThemeToggle.jsx` |
| Routing & navigation | `features/routing.spec.md` | `App.jsx`, `Layout.jsx`, `Navbar.jsx`, `Footer.jsx`, `NotFound.jsx` |
| Shared UI components | `features/ui-components.spec.md` | `Carousel.jsx`, `ScrollProgress.jsx`, `Modal.jsx`, `ImageModal.jsx` |
| CSS architecture | `features/styles.spec.md` | `styles.css` |

---

## Rules for AI Agents

1. **Read this file first** before making any changes.
2. **Read the relevant feature spec** before modifying a feature.
3. **Never add dependencies** without explicit user approval.
4. **Keep all styles in `styles.css`** — do not create per-component CSS.
5. **Reuse existing CSS classes** before creating new ones.
6. **Use `useLanguage()` hook** for all user-facing text in public pages.
7. **Backoffice is English-only** — no i18n required there.
8. **Never expose Supabase `service_role` key** in frontend code.
9. **Run `npm run build`** after changes to verify compilation.
10. **MemoryRouter** — URLs are hidden; no hash or path in the address bar.
11. **Secret backoffice** is accessed via `Cmd+Shift+K` (Mac) / `Ctrl+Shift+K`.
12. **Update the relevant spec** if you add or change a feature.
