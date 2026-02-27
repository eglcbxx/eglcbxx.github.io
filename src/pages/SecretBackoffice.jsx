import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import LoginForm from '../components/auth/LoginForm';
import MessagesTable from '../components/backoffice/MessagesTable';

/**
 * /secret-backoffice route page.
 *
 * Auth guard:
 * - Not authenticated → LoginForm
 * - Authenticated     → Backoffice (MessagesTable + modals)
 *
 * Uses supabase.auth.getSession() on mount and
 * onAuthStateChange() to stay in sync.
 */
export default function SecretBackoffice() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true); // initial session check

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const sessionRef = useRef(null);

  /* ── Fetch messages helper (no state deps) ── */
  const fetchMessages = useCallback(async () => {
    setLoadingMessages(true);
    const { data, error } = await supabase
      .from('contact_form')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoadingMessages(false);
  }, []);

  /* ── Auth: check session on mount + listen for changes ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      sessionRef.current = data.session;
      setChecking(false);
      if (data.session) fetchMessages();
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const wasLoggedIn = !!sessionRef.current;
      sessionRef.current = newSession;
      setSession(newSession);
      /* Fetch messages when user just logged in */
      if (newSession && !wasLoggedIn) fetchMessages();
    });

    return () => listener?.subscription?.unsubscribe();
  }, [fetchMessages]);

  /* ── Logout handler ── */
  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setMessages([]);
  }

  /* ── Initial session check loading ── */
  if (checking) {
    return (
      <div className="backoffice-loading">
        <span className="btn-loading">Checking session…</span>
      </div>
    );
  }

  /* ── Not authenticated → show login ── */
  if (!session) {
    return <LoginForm />;
  }

  /* ── Authenticated → show backoffice ── */
  return (
    <div className="backoffice">
      <header className="backoffice-header">
        <h1>📬 Backoffice</h1>
        <div className="backoffice-header-actions">
          <span className="small" style={{ color: 'var(--muted)' }}>
            {session.user?.email}
          </span>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <MessagesTable
        messages={messages}
        loading={loadingMessages}
        onRefresh={fetchMessages}
      />
    </div>
  );
}
