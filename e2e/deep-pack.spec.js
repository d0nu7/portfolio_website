const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

/*
 * DEEP (iteration 8 catalog rollout). Deliberately has no Quick route
 * (the catalog's own call -- DEEP is meant for a genuinely intensive
 * conversation, not a fast on-ramp), so these use Standard (24 questions,
 * 8 per act) instead of Quick, unlike every other pack's own spec file.
 */
test.describe('DEEP standard route (24 questions, 8 per act)', () => {
  test('has no quick route at all', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByText('DEEP', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await expect(page.getByText('KURZ')).toHaveCount(0);
    await expect(page.getByText('STANDARD')).toBeVisible();
    await expect(page.getByText('VOLL')).toBeVisible();
  });

  test('the act break fires after 8 questions, not 12', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'deep',
      routeId: 'standard',
      modeId: 'still',
      qIndex: 7,
    });
    // Standard's 8th Act I question (index 7) is Q12, which carries the
    // 'deeper' twist -- the first "Weiter" only opens that question's own
    // optional follow-up screen, so it takes a second "Weiter" (the
    // follow-up screen's own skip-it option) to actually advance.
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 24 shows the route-aware "that\'s all 24" copy', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'deep',
      routeId: 'standard',
      modeId: 'still',
      qIndex: 23,
      privateMomentStatus: 'consumed',
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 24.')).toBeVisible();
  });

  test('the listening-intention Private Moment is offered after Act I', async ({
    page,
  }) => {
    await seedAndResume(page, {
      packId: 'deep',
      routeId: 'standard',
      modeId: 'still',
      phase: 'break',
      breakAct: 0,
      pending: 8,
      qIndex: 7,
      privateMomentStatus: 'not-started',
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('KURZ PRIVAT')).toBeVisible();
    await expect(page.getByText(/eine andere, freiwillige Karte/)).toBeVisible();
  });
});
