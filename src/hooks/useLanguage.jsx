import { useState, useEffect, useCallback } from 'react';
import { LanguageContext } from './LanguageContext';
import translationsData from '../data/translations.json';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'vn', name: 'Tiếng Việt' },
];

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translationsData[language];
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          return key;
        }
      }
      return value;
    },
    [language]
  );

  const changeLanguage = useCallback((code) => {
    setLanguage(code);
  }, []);

  const localize = useCallback(
    (obj) => {
      if (obj == null) return '';
      if (typeof obj === 'string') return obj;
      if (Array.isArray(obj)) return obj;
      return obj[language] || obj.en || obj;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, localize, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}
