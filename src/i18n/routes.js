/*
 * Every indexable page exists once per language, each at its own URL:
 *
 *   EN  /              /ai-training/
 *   DE  /de/           /de/ki-schulungen/
 *
 * `ROUTES` is the single source for the DE/EN switch, <link rel="alternate"
 * hreflang>, canonical URLs, the sitemap and the early language redirect in
 * _document. Keys of `PAGE_TO_ROUTE` are Next.js page paths.
 */
export const ROUTES = {
  home: { en: '/', de: '/de/' },
  training: { en: '/ai-training/', de: '/de/ki-schulungen/' },
  legal: { en: '/legal-notice/', de: '/de/impressum/' },
  privacy: { en: '/privacy/', de: '/de/datenschutz/' },
};

export const PAGE_TO_ROUTE = {
  '/': { route: 'home', lang: 'en' },
  '/de': { route: 'home', lang: 'de' },
  '/ai-training': { route: 'training', lang: 'en' },
  '/de/ki-schulungen': { route: 'training', lang: 'de' },
  '/legal-notice': { route: 'legal', lang: 'en' },
  '/de/impressum': { route: 'legal', lang: 'de' },
  '/privacy': { route: 'privacy', lang: 'en' },
  '/de/datenschutz': { route: 'privacy', lang: 'de' },
};

export const pathFor = (route, lang) => (ROUTES[route] ? ROUTES[route][lang] : null);

// Section anchors on the homepage, e.g. homeAnchor('de', 'work') -> '/de/#work'.
export const homeAnchor = (lang, id) => `${ROUTES.home[lang]}#${id}`;
