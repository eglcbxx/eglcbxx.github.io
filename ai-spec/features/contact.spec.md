# contact.spec.md — Contact Page & Form

> Covers: `src/pages/Contact.jsx`, `src/lib/supabaseClient.js`

---

## Route

| Path | Layout | Component |
|---|---|---|
| `/contact` | `Layout` | `Contact` |

---

## Form Fields

| Field | Input Type | Validation Rules |
|---|---|---|
| Name | `text` | Required. 2–80 chars. No numbers. Letters, spaces, hyphens, apostrophes only (`/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/`). |
| Email | `email` | Required. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. |
| Message | `textarea` | Required. Min 10 chars. Min 3 words. Max 2000 chars. |

### Validation Constants

```
MIN_NAME_LENGTH   = 2
MAX_NAME_LENGTH   = 80
MIN_MESSAGE_CHARS = 10
MIN_MESSAGE_WORDS = 3
MAX_MESSAGE_LENGTH = 2000
```

---

## Validation Behavior

### Trigger Model: Blur-then-Live

1. **Before first blur** — no validation shown (field appears neutral)
2. **On blur** — field is marked as `touched`, validation runs, error shown if invalid
3. **After touch** — validation runs on every keystroke (live feedback)

### Visual Feedback

| State | CSS Class | Indicator |
|---|---|---|
| Neutral | (none) | Default border |
| Error | `.error` | Red border + error message below field |
| Valid | `.success` | Green border |

`fieldClass(err, value, touched)` helper determines the class.

### Character / Word Counter

Below the message textarea, a counter shows:
```
{charCount}/{MAX_MESSAGE_LENGTH} {t('contact.chars')} · {wordCount} {t('contact.word')|t('contact.words')}
```
Styled with `opacity: 0.5`, right-aligned. Counter text is fully translated.

---

## Form Submission

1. All fields validated on submit (sets `touched` to all true)
2. If any errors → abort, show all errors
3. If valid → `supabase.from('contact_form').insert([{ name, email, message }])`
4. **On success:**
   - Show success message: `contact.success` (i18n)
   - Clear all fields and reset touched/error state
5. **On error:**
   - Show error message: `contact.error` (i18n)
   - Log to console

### Supabase Table

| Table | `public.contact_form` |
|---|---|
| Columns | `id` (auto), `name`, `email`, `message`, `created_at` |
| RLS | INSERT allowed for `anon` role |

---

## Loading State

- Submit button shows `contact.sending` (i18n) text with `.btn-loading` class
- Button is `disabled` during submission

---

## i18n Keys Used

- `contact.title`, `contact.description`
- `contact.nameLabel`, `contact.namePlaceholder`
- `contact.emailLabel`, `contact.emailPlaceholder`
- `contact.messageLabel`, `contact.messagePlaceholder`
- `contact.sendButton`, `contact.sending`
- `contact.success`, `contact.error`
- `contact.chars`, `contact.word`, `contact.words`
- `validation.nameRequired`, `validation.nameMinLength`, `validation.nameMaxLength`
- `validation.nameNoNumbers`, `validation.nameLettersOnly`
- `validation.emailRequired`, `validation.emailInvalid`
- `validation.messageRequired`, `validation.messageMinChars`
- `validation.messageMinWords`, `validation.messageMaxLength`

### Validation Key Pattern

Validators return **translation keys** (not English strings):
```js
function validateName(val) {
  if (!v) return 'validation.nameRequired';  // key, not string
  ...
}
```
Keys are resolved in JSX: `{nameErr && <div>{t(nameErr)}</div>}`

All form labels, placeholders, validation errors, and counter text are fully translated.

---

## Supabase Client (`supabaseClient.js`)

Initializes `createClient(url, key)` using:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

If either env var is missing, exports a **stub** object that mimics the Supabase API:
- `from(table).insert(data)` → returns `{ data: null, error: null }`
- `from(table).select(cols).order(col, opts)` → returns `{ data: [], error: null }`
- `from(table).delete().eq(col, val)` → returns `{ data: null, error: null }`
- `auth.getSession()` → `{ data: { session: null } }`
- `auth.signInWithPassword()` → `{ error: { message: 'Supabase not configured' } }`
- `auth.signOut()` → `{}`
- `auth.onAuthStateChange()` → `{ data: { subscription: { unsubscribe() {} } } }`
