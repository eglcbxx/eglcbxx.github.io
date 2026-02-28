import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { supabase } from '../lib/supabaseClient';

/* ── Validation helpers ── */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_HAS_NUMBER = /\d/;
const RE_ONLY_LETTERS_SPACES = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 80;
const MIN_MESSAGE_CHARS = 10;
const MIN_MESSAGE_WORDS = 3;
const MAX_MESSAGE_LENGTH = 2000;

function validateName(val) {
  const v = val.trim();
  if (!v) return 'validation.nameRequired';
  if (v.length < MIN_NAME_LENGTH) return 'validation.nameMinLength';
  if (v.length > MAX_NAME_LENGTH) return 'validation.nameMaxLength';
  if (RE_HAS_NUMBER.test(v)) return 'validation.nameNoNumbers';
  if (!RE_ONLY_LETTERS_SPACES.test(v)) return 'validation.nameLettersOnly';
  return null;
}

function validateEmail(val) {
  const v = val.trim();
  if (!v) return 'validation.emailRequired';
  if (!RE_EMAIL.test(v)) return 'validation.emailInvalid';
  return null;
}

function validateMessage(val) {
  const v = val.trim();
  if (!v) return 'validation.messageRequired';
  if (v.length < MIN_MESSAGE_CHARS) return 'validation.messageMinChars';
  const wordCount = v.split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_MESSAGE_WORDS) return 'validation.messageMinWords';
  if (v.length > MAX_MESSAGE_LENGTH) return 'validation.messageMaxLength';
  return null;
}

/* ── Component ── */
export default function Contact() {
  const { t } = useLanguage();
  const mainRef = useScrollAnimationGroup();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [statusMsg, setStatusMsg] = useState('');

  // Per-field error messages (null = valid)
  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [messageErr, setMessageErr] = useState(null);

  // Tracks whether each field has been touched (blur)
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  /* ── Field-level class helper ── */
  const fieldClass = (err, value, touchedField) => {
    if (err) return 'error';
    if (touchedField && value.trim()) return 'success';
    return '';
  };

  /* ── Live validation on change ── */
  const handleNameChange = (val) => {
    setName(val);
    if (touched.name) setNameErr(validateName(val));
    setStatus(null);
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (touched.email) setEmailErr(validateEmail(val));
    setStatus(null);
  };

  const handleMessageChange = (val) => {
    setMessage(val);
    if (touched.message) setMessageErr(validateMessage(val));
    setStatus(null);
  };

  /* ── Blur handlers ── */
  const handleNameBlur = () => {
    setTouched((p) => ({ ...p, name: true }));
    setNameErr(validateName(name));
  };
  const handleEmailBlur = () => {
    setTouched((p) => ({ ...p, email: true }));
    setEmailErr(validateEmail(email));
  };
  const handleMessageBlur = () => {
    setTouched((p) => ({ ...p, message: true }));
    setMessageErr(validateMessage(message));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const mErr = validateMessage(message);

    setNameErr(nErr);
    setEmailErr(eErr);
    setMessageErr(mErr);
    setTouched({ name: true, email: true, message: true });

    if (nErr || eErr || mErr) return;

    setLoading(true);
    setStatus(null);
    setStatusMsg('');

    try {
      const { error } = await supabase.from('contact_form').insert([
        { name: name.trim(), email: email.trim(), message: message.trim() },
      ]);

      if (error) throw error;

      setStatus('success');
      setStatusMsg(t('contact.success'));
      setName('');
      setEmail('');
      setMessage('');
      setNameErr(null);
      setEmailErr(null);
      setMessageErr(null);
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setStatusMsg(t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  /* ── Character / word counter for message ── */
  const charCount = message.trim().length;
  const wordCount = message.trim() ? message.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div ref={mainRef}>
      <h1 className="animate-fade">{t('contact.title')}</h1>
      <p className="small animate-fade">{t('contact.description')}</p>

      <div className="card no-modal animate-on-scroll">
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="small" htmlFor="name">
              {t('contact.nameLabel')}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t('contact.namePlaceholder')}
              value={name}
              className={fieldClass(nameErr, name, touched.name)}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
            />
            {nameErr && <div className="form-error active">{t(nameErr)}</div>}
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
              value={email}
              className={fieldClass(emailErr, email, touched.email)}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {emailErr && <div className="form-error active">{t(emailErr)}</div>}
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="small" htmlFor="message">
              {t('contact.messageLabel')}
            </label>
            <textarea
              id="message"
              placeholder={t('contact.messagePlaceholder')}
              value={message}
              className={fieldClass(messageErr, message, touched.message)}
              onChange={(e) => handleMessageChange(e.target.value)}
              onBlur={handleMessageBlur}
              rows={5}
            />
            <div
              className="small"
              style={{ textAlign: 'right', marginTop: 4, opacity: 0.5 }}
            >
              {charCount}/{MAX_MESSAGE_LENGTH} {t('contact.chars')} · {wordCount} {wordCount !== 1 ? t('contact.words') : t('contact.word')}
            </div>
            {messageErr && <div className="form-error active">{t(messageErr)}</div>}
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
