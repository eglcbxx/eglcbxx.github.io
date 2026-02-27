ROLE
You are GitHub Copilot acting as a senior React engineer.

CONTEXT
This is a React + Vite portfolio hosted on GitHub Pages.
Supabase is used for:
- Contact form inserts into table: public.contact_form (name, email, message, created_at)
- Auth for a private admin/backoffice section

GOAL
Create a secret admin backoffice accessible at route: /secret-backoffice
This backoffice must be protected by Supabase Auth (email + password login).
Do NOT rely on the path being “secret” for security; enforce access via auth + RLS.

REQUIREMENTS

A) Routing & Access
1) Add a route: /secret-backoffice
2) If user is not authenticated -> show Login view
3) If authenticated -> show Backoffice view
4) Add a logout button in the backoffice
5) Explain in README how to reach it (enter /secret-backoffice in the URL) and how to create the admin user in Supabase (manual user creation)

B) Login Page
1) Login form with email + password
2) Uses Supabase Auth sign-in with password
3) Displays friendly errors (wrong password, missing fields, etc.)
4) Reusable UI components where possible (Input, Button, Card, etc.)

C) Backoffice (single page + modals)
1) The backoffice is ONE page.
2) Landing: table listing messages with columns:
   - Name
   - Email
   - Actions: Read (eye icon), Delete (trash icon)
3) Clicking Read opens a modal showing:
   - Name, Email, Message
   - Message area scrollable if long
   - Buttons: Close, Delete
4) Delete must ALWAYS show a confirmation modal (to prevent mistakes)
5) After delete, refresh the table and close modals appropriately
6) Add loading states (initial load, deleting) + empty state ("No messages")
7) Ensure components are reusable: Modal, ConfirmModal, DataTable (or MessagesTable), IconButton, etc.

D) Data layer (Supabase)
1) Read messages using Supabase client from table: contact_form
2) Delete messages by id
3) Sort messages by created_at descending

E) Security (CRITICAL)
1) Use Supabase Row Level Security (RLS) so:
   - Public/anon can INSERT (contact form)
   - Only authenticated users can SELECT/DELETE
2) Add/Update SQL policy documentation in README with exact SQL commands
3) Never use service_role or secret key in frontend. Use only publishable anon key.
4) Use supabase.auth.getSession() and onAuthStateChange() to keep UI in sync.

IMPLEMENTATION DETAILS
- Add files with a clean structure:
  - src/pages/SecretBackoffice.jsx (route page)
  - src/components/auth/LoginForm.jsx
  - src/components/backoffice/MessagesTable.jsx
  - src/components/ui/Modal.jsx
  - src/components/ui/ConfirmModal.jsx
  - src/components/ui/IconButton.jsx
  - src/lib/supabaseClient.js (already exists or create if missing)
- Use React hooks and avoid direct DOM manipulation.
- Icons:
  - Prefer inline SVG icons OR lucide-react (choose one). If using lucide-react, install it and use Eye, Trash2 icons.
- Styling:
  - Keep existing CSS approach (reuse classes) and do not redesign the whole site.
  - Make modal accessible (close button, overlay click optional, Escape key optional).

README INSTRUCTIONS (must include)
1) How to navigate to the backoffice:
   - Append /secret-backoffice to the deployed URL
2) How to create an admin user in Supabase:
   - Supabase dashboard -> Authentication -> Users -> Add user
3) SQL policies (provide the SQL):
   - Insert policy for anon (already)
   - Select/Delete policies for authenticated role
4) Troubleshooting section:
   - If messages don’t load: check RLS policies + logged-in session

NOW BUILD IT
Start by:
1) Adding route /secret-backoffice with auth guarding
2) Creating LoginForm
3) Creating Backoffice page with MessagesTable + Read modal + Delete confirmation modal
4) Writing README updates including SQL policies