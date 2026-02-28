# backoffice.spec.md — Secret Admin Backoffice

> Covers: `src/pages/SecretBackoffice.jsx`, `src/components/auth/LoginForm.jsx`, `src/components/backoffice/MessagesTable.jsx`

---

## Route

| Path | Layout | Component |
|---|---|---|
| `/secret-backoffice` | **None** (standalone, no Navbar/Footer) | `SecretBackoffice` |

---

## Access

The backoffice is **not linked** anywhere in the public UI. It can only be reached via:

- **Keyboard shortcut:** `Cmd+Shift+K` (macOS) / `Ctrl+Shift+K` (other OS)
- This is handled by the `SecretShortcut` component in `App.jsx`

Since the app uses `MemoryRouter`, no URL is exposed in the address bar.

---

## Authentication Flow

### Session Check (Mount)

1. `supabase.auth.getSession()` — checks for existing session
2. `supabase.auth.onAuthStateChange()` — subscribes to auth events
3. Uses `useRef` to track previous session (avoids re-triggering fetchMessages on redundant events)
4. During initial check: shows "Checking session…" loading spinner

### States

| Session | Rendered Component |
|---|---|
| `null` (not authenticated) | `LoginForm` |
| valid session | Backoffice view (header + `MessagesTable`) |

---

## LoginForm (`LoginForm.jsx`)

### Fields
- Email (`type="email"`, autocomplete: `email`)
- Password (`type="password"`, autocomplete: `current-password`)

### Behavior
1. Client-side check: both fields must be non-empty
2. Calls `supabase.auth.signInWithPassword({ email, password })`
3. On success: parent receives via `onAuthStateChange` — no explicit callback needed
4. On error: maps Supabase error messages to friendly text:
   - `"invalid login"` → "Invalid email or password. Please try again."
   - `"email not confirmed"` → "Email not confirmed. Check your inbox."
   - Other → raw message or "Login failed. Please try again."

### Extra UI
- "← Back to website" link (`<Link to="/">`) below the submit button
- Loading state disables both inputs and button, shows "Signing in…"

---

## Backoffice View (Authenticated)

### Header
- Title: "📬 Backoffice"
- Shows logged-in user email (`session.user?.email`)
- Logout button (calls `supabase.auth.signOut()`, clears session + messages)

### MessagesTable (`MessagesTable.jsx`)

Fetches from `public.contact_form` table (via parent — data passed as `messages` prop).

#### Table Columns

| Column | Data |
|---|---|
| Name | `msg.name` |
| Email | `msg.email` |
| Date | `msg.created_at` (formatted with `toLocaleDateString()`) |
| Actions | Read (eye icon) + Delete (trash icon) |

#### Action Buttons

Icon buttons using `IconButton` component with inline SVGs:
- **Eye icon** → opens Read Modal
- **Trash icon** (variant: `danger`) → opens Delete Confirmation

#### Read Modal

Uses `Modal` component (from `ui/Modal.jsx`).

Displays:
- Name, Email (as `mailto:` link), Message (in a styled box), Received date (`toLocaleString()`)
- Close button + Delete button (opens confirmation from within Read modal)

#### Delete Confirmation

Uses `ConfirmModal` component.

- Title: "Delete message?"
- Message: describes which message (name + email)
- Confirms: `supabase.from('contact_form').delete().eq('id', target.id)`
- On success: closes all modals, calls `onRefresh()` to re-fetch
- On failure: `alert()` with error message
- Loading state on confirm button

#### Empty State

"📭 No messages yet." shown when `messages.length === 0`.

#### Loading State

"Loading messages…" spinner during initial data fetch.

---

## Supabase Requirements

### Table: `public.contact_form`

| Column | Type |
|---|---|
| `id` | `uuid` (primary key, auto-generated) |
| `name` | `text` |
| `email` | `text` |
| `message` | `text` |
| `created_at` | `timestamptz` (default: `now()`) |

### RLS Policies Needed

| Policy | Role | Operation |
|---|---|---|
| Allow anonymous inserts | `anon` | `INSERT` |
| Allow authenticated reads | `authenticated` | `SELECT` |
| Allow authenticated deletes | `authenticated` | `DELETE` |

### Auth

- Supabase Auth (email/password)
- Admin user must be created manually in Supabase Dashboard or via SQL

---

## i18n

The backoffice is **English-only**. No i18n keys are used. All text is hard-coded.

---

## Language

- All UI text in `LoginForm`, `MessagesTable`, and `SecretBackoffice` is English
- This is intentional — the backoffice is an internal admin tool
