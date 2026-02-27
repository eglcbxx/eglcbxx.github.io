import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const { t } = useLanguage();
  const mainRef = useScrollAnimationGroup();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [statusMsg, setStatusMsg] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const trimEmail = email.trim();
    const trimMessage = message.trim();
    let valid = true;

    if (!trimEmail || !validateEmail(trimEmail)) {
      setEmailError(true);
      valid = false;
    }
    if (!trimMessage || trimMessage.length < 10) {
      setMessageError(true);
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    setStatus(null);
    setStatusMsg('');

    try {
      const { error } = await supabase.from('contact_messages').insert([
        { name: name.trim(), email: trimEmail, message: trimMessage },
      ]);

      if (error) throw error;

      setStatus('success');
      setStatusMsg(t('contact.success'));
      setName('');
      setEmail('');
      setMessage('');
      setEmailError(false);
      setMessageError(false);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setStatusMsg(t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={mainRef}>
      <h1 className="animate-fade">{t('contact.title')}</h1>
      <p className="small animate-fade">{t('contact.description')}</p>

      <div className="card no-modal animate-on-scroll">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="small" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="small" htmlFor="email">
              {t('contact.emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              className={emailError ? 'error' : email && validateEmail(email) ? 'success' : ''}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError && validateEmail(e.target.value.trim())) setEmailError(false);
                setStatus(null);
              }}
              onBlur={() => {
                if (!email.trim() || !validateEmail(email.trim())) setEmailError(true);
              }}
              required
            />
            {emailError && (
              <div className="form-error active">{t('contact.invalidEmail')}</div>
            )}
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="small" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message (min 10 characters)"
              value={message}
              className={messageError ? 'error' : ''}
              onChange={(e) => {
                setMessage(e.target.value);
                if (messageError && e.target.value.trim().length >= 10) setMessageError(false);
                setStatus(null);
              }}
              onBlur={() => {
                if (!message.trim() || message.trim().length < 10) setMessageError(true);
              }}
              required
            />
            {messageError && (
              <div className="form-error active">Message must be at least 10 characters</div>
            )}
          </div>

          <div style={{ height: 16 }} />

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="btn-loading">{t('contact.sending')}</span>
            ) : (
              <span className="btn-text">{t('contact.sendButton')}</span>
            )}
          </button>

          {status && (
            <div className={`form-message active ${status}`}>
              {statusMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
