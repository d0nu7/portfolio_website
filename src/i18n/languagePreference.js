/*
 * The visitor's preferred language, used only to offer the other language
 * version (see components/LanguageHint). Nothing redirects: a URL always
 * shows the language it names, as Google recommends for multilingual sites.
 *
 * - A saved choice (the DE/EN switch, or dismissing the hint) wins.
 * - Otherwise the first German or English entry in the browser languages.
 * - Anything else gives null, so no hint is shown.
 */
export const LANGUAGE_STORAGE_KEY = 'radi-language';

export const savedLanguage = () => {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === 'de' || value === 'en' ? value : null;
  } catch (e) {
    return null;
  }
};

export const browserLanguage = () => {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
  for (const entry of list) {
    const code = String(entry).slice(0, 2).toLowerCase();
    if (code === 'de' || code === 'en') return code;
  }
  return null;
};

export const preferredLanguage = () => savedLanguage() ?? browserLanguage();
