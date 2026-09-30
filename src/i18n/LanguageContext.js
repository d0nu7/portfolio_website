import React, { createContext, useCallback, useContext } from 'react';

import { LANGUAGE_STORAGE_KEY } from './languagePreference';
import { pathFor } from './routes';

/*
 * The language is part of the URL (see routes.js): each page is rendered in
 * exactly one language, so there is nothing to detect after hydration.
 * Switching navigates to the same page in the other language and remembers
 * the choice, so the language hint (components/LanguageHint) stays quiet.
 */
export const LANGUAGES = ['en', 'de'];

const LanguageContext = createContext({ lang: 'en', route: null, alternate: () => null, remember: () => {} });

export const LanguageProvider = ({ lang = 'en', route = null, children }) => {
  const alternate = useCallback((to) => pathFor(route, to), [route]);

  const remember = useCallback((choice) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, choice);
    } catch (e) {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, route, alternate, remember }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Picks the current language from a { en, de } value; plain strings pass through.
export const tr = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value);
