/*
 * Globaler Console-Guard (Refactoringplan Phase 4).
 *
 * Erweitert Playwrights `page`-Fixture: jeder Test, der `test`/`expect`
 * aus DIESER Datei statt direkt aus '@playwright/test' importiert, laesst
 * seine Seite automatisch auf zwei Dinge ueberwachen und schlaegt am Ende
 * fehl, falls eines davon auftrat:
 *
 *   - ein nicht abgefangener Laufzeitfehler (`pageerror`) -- eine echte
 *     Exception im Browser, die sonst nur im Playwright-Trace sichtbar
 *     waere, nicht im Testergebnis selbst.
 *   - ein `console.error`-Aufruf -- typischerweise ein React-Warning
 *     (fehlender key, ein Hook-Regel-Verstoss, eine unerwartete Prop),
 *     das bisher lautlos in der Konsole verschwand, obwohl 182/109 Tests
 *     "gruen" waren.
 *
 * Ein Test, der einen Fehler bewusst provoziert (etwa garbage-storage.spec
 * fuer kaputtes JSON), traegt seinen erwarteten Fehler explizit in
 * `expectedConsoleErrors` ein, statt den Guard global abzuschalten -- so
 * bleibt jede Ausnahme sichtbar und dokumentiert, statt implizit zu sein.
 */
const base = require('@playwright/test');

const test = base.test.extend({
  // eslint-disable-next-line no-empty-pattern
  expectedConsoleErrors: [[], { option: true }],

  page: async ({ page, expectedConsoleErrors }, use) => {
    const problems = [];
    const isExpected = (text) => expectedConsoleErrors.some((pattern) => pattern.test(text));

    page.on('pageerror', (err) => {
      problems.push(`pageerror: ${err.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (isExpected(text)) return;
      problems.push(`console.error: ${text}`);
    });

    await use(page);

    base
      .expect(problems, `Unerwartete Konsolenfehler waehrend des Tests:\n${problems.join('\n')}`)
      .toEqual([]);
  },
});

module.exports = { test, expect: base.expect };
