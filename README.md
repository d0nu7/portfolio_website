# radi.solutions portfolio

Personal portfolio of Radomir Dinic and a focused, shareable landing page for AI training offers.

## Routes

- `/` – portfolio
- `/ki-schulungen/` – modular AI training, pricing and Article 4 EU AI Act information

The training page defaults to German, detects non-German browser languages on first visit and offers a persistent DE/EN switch. It is linked subtly from the menu and footer so the portfolio remains the primary homepage.

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

Unit tests (Jest):

```text
npm test
```

End-to-end tests (Playwright, mobile-viewport Chromium). Playwright manages
its own browser binary separately from `npm install`, so the first time on a
machine (or after a Playwright version bump), install it once:

```text
npm run test:e2e:install
```

Then, and on every run after that:

```text
npm run build
npm run test:e2e
```

`playwright.config.js` serves the static export (`out/`) via
`scripts/serve-static.js` and runs the specs under `e2e/` against it.
