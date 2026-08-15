const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * Response Cards (iteration 8 catalog: FRIENDS/OLD FRIENDS/DEEP). Quiet by
 * design -- shown alongside the question itself, nothing to tap through.
 * See closer.test.js for the data-shape coverage; this pins that it
 * actually renders, and that a question without one doesn't show a stray
 * empty card.
 */
test.describe('Response Cards', () => {
  test('a question with a response card shows its label and hint text', async ({ page }) => {
    // FRIENDS Q08 (absolute index 7, full route) carries a CELEBRATE card.
    await seedAndResume(page, {
      packId: 'friends',
      routeId: 'full',
      modeId: 'easy',
      qIndex: 7,
      skipsRemaining: 3,
    });
    await expect(page.getByText('CELEBRATE', { exact: true })).toBeVisible();
    await expect(
      page.getByText('Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.')
    ).toBeVisible();
  });

  test('a question without a response card shows none', async ({ page }) => {
    // FRIENDS Q01 (absolute index 0) has no response card.
    await seedAndResume(page, {
      packId: 'friends',
      routeId: 'full',
      modeId: 'easy',
      qIndex: 0,
      skipsRemaining: 3,
    });
    await expect(page.getByText('CELEBRATE', { exact: true })).toHaveCount(0);
    await expect(page.getByText('FOLLOW UP', { exact: true })).toHaveCount(0);
    await expect(page.getByText('VALIDATE', { exact: true })).toHaveCount(0);
    await expect(page.getByText('REFLECT', { exact: true })).toHaveCount(0);
  });

  test('a pack with no response cards defined (CLASSIC) never shows one', async ({ page }) => {
    await seedAndResume(page, { qIndex: 0, skipsRemaining: 3 });
    await expect(page.getByText('CELEBRATE', { exact: true })).toHaveCount(0);
  });
});
