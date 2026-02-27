import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function LanguageSwitcher() {
  const { language, changeLanguage, LANGUAGES } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        className="language-toggle"
        aria-label="Change language"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        {language.toUpperCase()}
      </button>

      <div ref={menuRef} className={`language-menu${open ? ' active' : ''}`}>
        {LANGUAGES.map((lang) => (
          <div
            key={lang.code}
            className={`language-option${lang.code === language ? ' active' : ''}`}
            onClick={() => {
              changeLanguage(lang.code);
              setOpen(false);
            }}
          >
            <span className="lang-code">{lang.code.toUpperCase()}</span>
            <span className="lang-name">{lang.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
