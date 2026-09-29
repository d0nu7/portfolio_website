import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/*
 * Site-wide DE/EN language.
 *
 * Order of precedence on the client: the visitor's saved choice
 * (localStorage "radi-language", shared with /ki-schulungen since 2026-08),
 * then the browser's preferred languages, then English.
 *
 * The static HTML is rendered in each page's `defaultLang` (English for the
 * homepage, German for /ki-schulungen) and switches after hydration.
 */
export const LANGUAGES = ['en', 'de'];
const STORAGE_KEY = 'radi-language';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

const readSaved = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : null;
  } catch (e) {
    return null;
  }
};

export const detectLanguage = (languages) => {
  const hit = (languages || [])
    .map((l) => String(l).toLowerCase().slice(0, 2))
    .find((l) => LANGUAGES.includes(l));
  return hit || 'en';
};

// `fixed` pins a page to one language (e.g. the German-first CLOSER notice).
export const LanguageProvider = ({ defaultLang = 'en', fixed = false, children }) => {
  const [lang, setLangState] = useState(defaultLang);

  useEffect(() => {
    if (fixed) return;
    const browser = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    setLangState(readSaved() || detectLanguage(browser));
  }, [fixed]);

  useEffect(() => {
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

// Picks the current language from a { en, de } value; plain strings pass through.
export const tr = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value);
