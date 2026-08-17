# radi.solutions portfolio

Personal portfolio for Radomir Dinic, a focused AI-training landing page, and the unlisted CLOSER conversation game.

## Routes

- `/` – portfolio
- `/ki-schulungen/` – modular AI training, pricing, and Article 4 EU AI Act information
- `/closer/` – mobile-first, two-person conversation game

The training page defaults to German, detects non-German browser languages on first visit, and offers a persistent DE/EN switch. CLOSER also supports German and English, stores game progress locally for resume, and never asks users to enter their answers.

CLOSER product, content, review, and engineering documentation starts at [docs/closer/README.md](docs/closer/README.md).

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
- Localized interface and question content remains German/English.
- The question catalog is the editorial source of truth; automated fidelity tests prevent silent content drift.
- Specialist CLOSER question modules are regenerated from that catalog with `npm run content:generate`.
- TTS is shelved indefinitely; the existing voice branch is not planned for merge and its artifacts are outside the active CLOSER scope.
