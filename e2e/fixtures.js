/*
 * Global console guard (refactoring roadmap phase 4).
 *
 * Extends Playwright's `page` fixture. Any test importing `test` and
 * `expect` from this file automatically monitors its page for:
 *
 *   - an uncaught runtime error (`pageerror`);
 *   - a `console.error`, which commonly indicates a React warning.
 *
 * A test that deliberately causes an error lists it in
 * `expectedConsoleErrors` instead of disabling the guard globally.
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
      .expect(problems, `Unexpected console errors during the test:\n${problems.join('\n')}`)
      .toEqual([]);
  },
});

module.exports = { test, expect: base.expect };
