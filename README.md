# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Admin Backoffice

### How to access

The backoffice is a hidden admin page — it is **not** linked anywhere on the public site.

Navigate to:

```
https://<your-domain>/#/secret-backoffice
```

For local development:

```
http://localhost:5173/#/secret-backoffice
```

### How to create an admin user

1. Go to your **Supabase Dashboard** → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter the admin email and a strong password
4. (Optional) Toggle **Auto Confirm User** so no email confirmation is needed
5. Click **Create user**

> **Important:** Only users created here can log in to the backoffice. There is no public sign-up.

### Supabase setup — Table & RLS policies

#### 1. Create the `contact_messages` table (if not already done)

```sql
CREATE TABLE public.contact_messages (
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name      text NOT NULL,
  email     text NOT NULL,
  message   text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
```

#### 2. RLS policies

**Allow anonymous users to INSERT (contact form):**

```sql
CREATE POLICY "Allow anon insert"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Allow authenticated users to SELECT (read messages in backoffice):**

```sql
CREATE POLICY "Allow authenticated select"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);
```

**Allow authenticated users to DELETE (delete messages in backoffice):**

```sql
CREATE POLICY "Allow authenticated delete"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (true);
```

#### 3. Environment variables

Create a `.env` file in the project root (it is git-ignored):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Never** use the `service_role` key in the frontend. The anon key + RLS is sufficient.

### Troubleshooting

| Problem | Fix |
|---|---|
| Messages don't load in backoffice | Verify the **SELECT** RLS policy exists for the `authenticated` role. Check that you are logged in (session active). |
| Contact form submissions fail | Verify the **INSERT** RLS policy exists for the `anon` role. Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set. |
| Delete fails | Verify the **DELETE** RLS policy exists for the `authenticated` role. |
| Login returns "Invalid login credentials" | The user may not exist. Create one in Supabase Dashboard → Authentication → Users. |
| Login returns "Email not confirmed" | Toggle **Auto Confirm** when creating the user, or confirm the email manually in the dashboard. |
