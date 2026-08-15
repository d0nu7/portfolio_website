const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * DATE NIGHT (iteration 8 catalog rollout). Mirrors first-date-pack.spec.js's
 * quick-route coverage -- the UI mechanism is already proven generic there
 * and by the Jest registry-conformance tests; this just confirms this
 * specific pack's own route boundaries and secret-question position behave
 * correctly through real phase transitions, not just via closer.js's pure
 * functions.
 */
test.describe('DATE NIGHT quick route (12 questions, 4 per act)', () => {
  test('the act break fires after only 4 questions', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'date-night',
      routeId: 'quick',
      modeId: 'warm',
      qIndex: 3,
      skipsRemaining: 3,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 12 shows the route-aware "that\'s all 12" copy', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'date-night',
      routeId: 'quick',
      modeId: 'warm',
      qIndex: 11,
      skipsRemaining: 3,
      secretSeen: [true, true],
      hasSecretQuestion: [true, true],
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 12.')).toBeVisible();
  });

  test('the secret question interrupts at this route\'s own position (index 9)', async ({
    page,
  }) => {
    await seedAndResume(page, {
      packId: 'date-night',
      routeId: 'quick',
      modeId: 'warm',
      qIndex: 8,
      skipsRemaining: 3,
      secretSeen: [false, false],
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
  });
});
