const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

const QUICK_PACKS = [
  { packId: 'first-date', modeId: 'calm', formerSecretIndex: 9 },
  { packId: 'date-night', modeId: 'warm', formerSecretIndex: 8 },
  { packId: 'couples', modeId: 'grounded', formerSecretIndex: 8 },
  { packId: 'friends', modeId: 'easy', formerSecretIndex: 8 },
  { packId: 'old-friends', modeId: 'easy', formerSecretIndex: 8 },
  { packId: 'chaos', modeId: 'playful', formerSecretIndex: 9 },
  { packId: 'late-night', modeId: 'explicit', formerSecretIndex: 9 },
];

test.describe('Quick pack flow', () => {
  for (const config of QUICK_PACKS) {
    test(`${config.packId}: act break after four questions`, async ({ page }) => {
      await seedAndResume(page, {
        packId: config.packId,
        routeId: 'quick',
        modeId: config.modeId,
        qIndex: 3,
      });

      await page.getByRole('button', { name: 'Weiter' }).click();
      await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
    });

    test(`${config.packId}: all twelve questions finish the route`, async ({ page }) => {
      await seedAndResume(page, {
        packId: config.packId,
        routeId: 'quick',
        modeId: config.modeId,
        qIndex: 11,
      });

      await page.getByRole('button', { name: 'Fertig' }).click();
      await expect(page.getByText('Das waren alle 12.')).toBeVisible();
    });

    test(`${config.packId}: no long secret handoff in Quick`, async ({ page }) => {
      await seedAndResume(page, {
        packId: config.packId,
        routeId: 'quick',
        modeId: config.modeId,
        qIndex: config.formerSecretIndex,
        privateMomentStatus: 'not-started',
      });

      await page.getByRole('button', { name: 'Weiter' }).click();
      await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toHaveCount(0);
      await expect(page.getByRole('button', { name: /Weiter|Fertig|Lieber nicht/ }).first())
        .toBeVisible();
    });
  }
});
