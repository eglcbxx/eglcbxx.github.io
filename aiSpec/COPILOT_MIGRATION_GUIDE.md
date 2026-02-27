ROLE
You are GitHub Copilot acting as a senior front-end engineer and refactoring assistant.

GOAL
Refactor and migrate my existing static portfolio website (HTML/CSS/JavaScript) into a modern React project using Vite and .jsx files, while preserving the current design, layout, content, and styling as much as possible.

IMPORTANT CONSTRAINTS
- Keep the existing UI/UX and visual appearance unless a change improves reusability or fixes obvious issues.
- Do NOT rewrite everything from scratch. This is a migration/refactor that should keep what already exists.
- Reuse my existing CSS files. Only adjust CSS if needed for React structure or to remove duplication.
- Keep routing and URLs simple and compatible with GitHub Pages.
- Output should be a complete working project that builds and deploys to GitHub Pages.

CURRENT WEBSITE PAGES / SECTIONS (must be preserved)
- Home page: present the student + technical & soft skills
- Portfolio page: project cards with images, text, and links to GitHub repos
- Resume page: professional experience + link/button to download resume PDF
- Links page: favorite sites, each with a short description and link
- Contact page (optional but implement it): currently only email field, must become Name + Email + Message, and submit to Supabase (B1: direct insert)

TARGET STACK
- React + Vite
- .jsx files
- React Router (client-side routing)
- Supabase JS client for contact form
- Deployable to GitHub Pages

DELIVERABLES
1) Create/convert project into a Vite + React structure:
   - /src
     - /pages (Home.jsx, Portfolio.jsx, Resume.jsx, Links.jsx, Contact.jsx)
     - /components (Navbar.jsx, Footer.jsx, Layout.jsx, ProjectCard.jsx, SkillBadge.jsx, Section.jsx, etc.)
     - /data/projects.js or projects.json (if my portfolio is hardcoded today, extract it into a data file)
     - /lib/supabaseClient.js
   - /public (images, resume.pdf, favicon, etc.)

2) Convert each HTML page into a corresponding React page component:
   - Preserve content and structure
   - Replace duplicated markup with reusable components (Navbar, Footer, ProjectCard, Section, etc.)

3) Set up routing:
   - Use React Router with routes:
     /, /portfolio, /resume, /links, /contact
   - Add a NotFound page.
   - Configure Vite base path for GitHub Pages.

4) Supabase Contact Form (B1 direct insert):
   - Create Contact.jsx with a form: name, email, message
   - Validate: required fields, basic email format, message length min (e.g. 10 chars)
   - Show friendly success + error UI states
   - Submit using Supabase client to insert into table `contact_messages` with columns:
     name (text), email (text), message (text), created_at (timestamp default now)
   - Use environment variables:
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
   - Do NOT expose any service role key.
   - Add instructions in README for setting Supabase variables and creating the table + enabling RLS insert-only.

5) Keep existing JavaScript behaviors:
   - If there are any interactive parts (menu, filtering projects, animations), migrate them into React state/effects.
   - Avoid direct DOM manipulation; use React patterns.

6) Provide GitHub Pages deploy setup:
   - Add npm scripts for build/deploy
   - Add either:
     (A) gh-pages package deployment
     OR
     (B) GitHub Actions workflow to build and deploy to gh-pages branch
   - Ensure routing works on refresh (use HashRouter OR include 404.html fallback strategy). Pick one and implement it.

PROCESS / WORK STYLE
- Start by analyzing the existing project structure and listing what files map to what React pages/components.
- Then implement the Vite project scaffold.
- Then migrate page-by-page.
- Finally add Supabase integration and deployment config.

NOW DO IT
Please begin by:
1) creating the Vite + React structure,
2) generating the React Router setup,
3) creating Layout/Navbar/Footer,
4) migrating Home first,
5) then migrate Portfolio with ProjectCard data extraction,
6) then Resume/Links,
7) and finish with Contact + Supabase integration.