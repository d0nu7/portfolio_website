// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/*
 * Smoke coverage for the portfolio and /ki-schulungen, run against the
 * actual static export (see webServer below), so it exercises what ships.
 * CLOSER's suite moved with the game to github.com/d0nu7/Closer.
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
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
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
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30 * 1000,
  },
});
