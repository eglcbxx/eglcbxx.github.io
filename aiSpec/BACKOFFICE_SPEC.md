ROLE
You are GitHub Copilot acting as a senior full-stack engineer (React + Supabase).

GOAL
Implement a hidden admin backoffice accessible at /secret-backoffice for viewing and managing contact form messages stored in Supabase table public.contact_messages (name, email, message, created_at). The site is hosted statically (GitHub Pages). The backoffice must be protected with Supabase Auth + RLS and include email verification.

IMPORTANT ARCHITECTURE DECISIONS (DO NOT IGNORE)
1) Use Supabase Auth for admin accounts (email + password). Admin users will be created manually in Supabase (Dashboard -> Authentication -> Users -> Add user) OR via invite flow.
2) DO NOT create a custom "admin" or "user" table for authentication. Auth already provides users + email verification.
3) Enforce security with RLS on contact_messages:
   - Public (anon) can INSERT only (already used by the public contact form).
   - Only authenticated users can SELECT and DELETE (admins).
4) Email verification:
   - Use Supabase Auth email confirmation / magic link / OTP verification features (do not invent your own token table unless absolutely necessary).
   - After user confirms email, only then allow access to /secret-backoffice.
5) Replying to messages:
   - The frontend must NOT send emails directly (cannot safely store SMTP/API keys in a static site).
   - Implement a Supabase Edge Function (extra-mile inside this feature) that sends email using an email provider (Resend, SendGrid, Mailgun, etc.). Store provider key as a Supabase secret, not in the frontend.
   - The reply UI should call the edge function with: toEmail, subject, body, messageId.

TECH STACK
- React + Vite + .jsx
- React Router
- @supabase/supabase-js
- Reusable components
- Minimal, consistent UI matching existing site styling

ROUTES / PAGES
- /login (admin login page)
- /verify (optional verification step if needed; otherwise rely on Supabase email confirmation flow)
- /secret-backoffice (protected route; redirect to /login if not authenticated OR email not confirmed)

FEATURE REQUIREMENTS
A) Login page (/login)
- Fields: email, password
- Uses supabase.auth.signInWithPassword
- Show friendly errors
- If the user is not email-confirmed, show a message and a button to resend verification email (supabase.auth.resend() or equivalent)
- On success -> navigate to /secret-backoffice

B) Protected backoffice (/secret-backoffice)
- Single page layout
- Main content: a table of contact messages
  - Columns: created_at (optional), name, email, actions
  - Actions:
    - Read (eye icon)
    - Delete (trash icon)
- Read action opens a modal (scrollable if long message) showing:
  - name, email, message, created_at
  - Buttons: Close, Delete (requires confirmation modal), Reply (opens reply section/modal)
- Delete requires a confirmation modal ALWAYS (from both table and read modal)
- Reply UI:
  - show "Reply" arrow icon
  - fields: subject + body (textarea)
  - Send calls an edge function endpoint (do NOT attempt SMTP from frontend)
  - After successful send, show success feedback (optional: mark message as "replied" if you add a column later)

C) Reusability
Create reusable UI components:
- ProtectedRoute.jsx (or AuthGuard.jsx)
- AdminLayout.jsx
- DataTable.jsx (or MessagesTable.jsx)
- IconButton.jsx
- Modal.jsx (generic)
- ConfirmModal.jsx (generic)
- MessageDetailsModal.jsx
- ReplyModal.jsx (or ReplyPanel.jsx)
- Toast/Alert component (optional but nice)

SUPABASE SETUP TASKS (GENERATE SQL + INSTRUCTIONS)
1) contact_messages table exists with: id uuid PK default gen_random_uuid(), name text, email text, message text, created_at timestamptz default now()
2) Enable RLS
3) Policies:
   - Allow anonymous inserts to anon role
   - Allow authenticated select to authenticated role
   - Allow authenticated delete to authenticated role
(Provide SQL to create/replace these policies.)

EDGE FUNCTION (Reply)
- Create a supabase edge function: send-reply
- Accept JSON: { toEmail, subject, body, messageId }
- Validate inputs
- Send email via provider (use a placeholder provider implementation; provide instructions to plug in Resend/SendGrid)
- Return { ok: true } or error
- IMPORTANT: store provider API key as Supabase secret (supabase secrets set ...), not in frontend

ENV VARS (Frontend)
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
Never use service_role key in frontend.

IMPLEMENTATION PLAN (DO THIS IN ORDER)
1) Create src/lib/supabaseClient.js
2) Create auth utilities/hooks:
   - useAuth() hook that tracks session and user
3) Add routes: /login and /secret-backoffice
4) Implement ProtectedRoute that checks:
   - session exists
   - user.email_confirmed_at (or equivalent) is present (confirmed)
5) Implement Backoffice UI:
   - fetch messages on load (select id, name, email, message, created_at)
   - render table, read modal, confirm delete modal
   - delete uses supabase.from('contact_messages').delete().eq('id', ...)
6) Implement Reply UI + call edge function endpoint
7) Add logout button in backoffice (supabase.auth.signOut)

NOW GENERATE CODE
Start by generating:
- src/lib/supabaseClient.js
- src/auth/useAuth.js (or similar)
- src/routes/ProtectedRoute.jsx
- src/pages/Login.jsx
- src/pages/SecretBackoffice.jsx with table + modals (read + confirm delete + reply UI skeleton)
- Provide SQL policies for RLS in a file docs/supabase_policies.sql
- Provide edge function stub in supabase/functions/send-reply/index.ts (or similar)