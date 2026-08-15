const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * CHAOS (iteration 8 catalog rollout). Front-loaded route shape (Quick =
 * mostly the first 4 of each act) rather than the every-third pattern
 * FRIENDS/OLD FRIENDS use -- see closer.js's own comment above
 * CHAOS_ROUTES. Its secret-question position (10) also differs from most
 * other packs' quick routes (9), since Act III's quick selection isn't a
 * simple first-4 slice.
 */
test.describe('CHAOS quick route (12 questions, 4 per act)', () => {
  test('the act break fires after only 4 questions', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'chaos',
      routeId: 'quick',
      modeId: 'playful',
      qIndex: 3,
      skipsRemaining: 3,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 12 shows the route-aware "that\'s all 12" copy', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'chaos',
      routeId: 'quick',
      modeId: 'playful',
      qIndex: 11,
      skipsRemaining: 3,
      secretSeen: [true, true],
      hasSecretQuestion: [true, true],
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 12.')).toBeVisible();
  });

  test('the secret question interrupts at this route\'s own position (index 10)', async ({
    page,
  }) => {
    await seedAndResume(page, {
      packId: 'chaos',
      routeId: 'quick',
      modeId: 'playful',
      qIndex: 9,
      skipsRemaining: 3,
      secretSeen: [false, false],
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
  });
});
