import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * Email + Password login form using Supabase Auth.
 * Displays friendly validation / auth errors.
 */
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    /* Client-side validation */
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      /* Map Supabase error messages to friendlier text */
      const msg = authError.message?.toLowerCase() ?? '';
      if (msg.includes('invalid login')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.includes('email not confirmed')) {
        setError('Email not confirmed. Check your inbox.');
      } else {
        setError(authError.message || 'Login failed. Please try again.');
      }
    }
    /* On success, onAuthStateChange in the parent will update state automatically */
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>
        <p className="small" style={{ color: 'var(--muted)', marginBottom: 24 }}>
          Sign in to access the backoffice.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="form-message error active">{error}</div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: 16 }}
          >
            {loading ? <span className="btn-loading">Signing in…</span> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
