# radi.solutions portfolio

Personal portfolio for Radomir Dinic and a focused AI-training landing page.

## Routes

Every page exists in English and German, each at its own URL:

| Page | English | German |
| --- | --- | --- |
| Portfolio | `/` | `/de/` |
| AI training / KI-Schulungen | `/ai-training/` | `/de/ki-schulungen/` |

- `/ki-schulungen/` (old URL) permanently redirects to `/de/ki-schulungen/` (vercel.json).
- `/closer/` is a German-first moving notice pointing to [closer.radi.solutions](https://closer.radi.solutions/); the game lives in [d0nu7/Closer](https://github.com/d0nu7/Closer).
- First-time visitors are sent to their browser language (German or English, English as fallback) by a tiny inline script before render; a saved DE/EN choice wins, and crawlers are never redirected. Pages link each other with hreflang.

## Local development

```text
npm install
npm run dev
```

Production export:

```text
npm run build
```

## Testing

Unit tests:

```text
npm test
```

Lint:

```text
npm run lint
```

End-to-end tests use Playwright. Install its Chromium binary once per machine or after a Playwright version change:

```text
npm run test:e2e:install
```

Run the complete E2E command:

```text
npm run test:e2e
```

`npm run test:e2e` creates a fresh static export before Playwright runs. Use `npm run test:e2e:run` only when `out/` is already known to match the current source. `playwright.config.js` serves the export with `scripts/serve-static.js` and runs the specs under `e2e/`.

## Repository conventions

- Documentation, source comments, test descriptions, and new commit messages are English.
- Colours come from `src/themes/palette.js`; components use the generated CSS variables, never hard-coded brand colours.
- Everything user-facing is bilingual. Routes and language pairs are defined once in `src/i18n/routes.js`; page files in `src/pages` only set `lang` and `route` and render a view from `src/views`. Homepage strings live in `src/i18n/home.js`, localised data fields in `src/constants/constants.js` use `{ en, de }`, and the training page keeps its own `copy` object. The homepage German uses "du", the training page uses "Sie".
- The site menu (`src/components/Nav`) is a small in-house component; don't reintroduce react-burger-menu, it bundled ~150 KB of Snap.svg.
