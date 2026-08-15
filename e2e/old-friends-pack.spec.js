const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * OLD FRIENDS (iteration 8 catalog rollout). Same rationale and route
 * shape as friends-pack.spec.js (identical Route-column pattern in the
 * catalog, different question content).
 */
test.describe('OLD FRIENDS quick route (12 questions, 4 per act)', () => {
  test('the act break fires after only 4 questions', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'old-friends',
      routeId: 'quick',
      modeId: 'easy',
      qIndex: 3,
      skipsRemaining: 3,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 12 shows the route-aware "that\'s all 12" copy', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'old-friends',
      routeId: 'quick',
      modeId: 'easy',
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
      packId: 'old-friends',
      routeId: 'quick',
      modeId: 'easy',
      qIndex: 8,
      skipsRemaining: 3,
      secretSeen: [false, false],
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
  });
});
