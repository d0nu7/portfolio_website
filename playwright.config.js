// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/*
 * E2E coverage for CLOSER's critical branches (review 2026-08-15, P2 item):
 * countdown question-visibility, skip tokens, secret-question handoffs, all
 * four Question-37 combinations, and the timer. This tests the actual static
 * export (see the webServer below) rather than the dev server, so it's
 * exercising exactly what ships.
 *
 * Tests jump into mid-game phases via localStorage (see e2e/helpers.js)
 * rather than playing through from the start screen every time -- this is
 * the same resume mechanism the app itself uses, not a test-only backdoor.
 */

const PORT = 4174;

module.exports = defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: { timeout: 7 * 1000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    launchOptions: {
      // This sandbox pins its own Chromium build outside node_modules --
      // see AGENTS/environment notes. Falls back to Playwright's own
      // resolution if the path doesn't exist (e.g. on a normal machine).
      executablePath: require('fs').existsSync('/opt/pw-browsers/chromium')
        ? '/opt/pw-browsers/chromium'
        : undefined,
    },
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    // A tiny dependency-free static server (see scripts/serve-static.js) --
    // `serve`/`http-server` from npm both make an update-check network call
    // on startup that can hang indefinitely in network-restricted
    // environments, which this sidesteps entirely.
    command: `node scripts/serve-static.js out ${PORT}`,
    url: `http://localhost:${PORT}/closer/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30 * 1000,
  },
});
