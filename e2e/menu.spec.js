const { test, expect } = require('./fixtures');
const { seedAndResume, STORAGE_KEY } = require('./helpers');

/*
 * Bugfix-report iteration 7, BF-04: Act III promised "skip or end the game
 * anytime", but the only way to actually stop was closing the PWA. These
 * pin the reachable-everywhere in-game menu's three real actions: ending
 * now (through the existing, already neutral ending sequence -- same
 * mechanism Question 37's own end buttons use), restarting, and the
 * distinct "delete local data" privacy action from BF-01.
 */
test.describe('In-game menu', () => {
  test('is reachable during a normal question and can end the game now', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('heading', { name: 'Menü' })).toBeVisible();

    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();
    await expect(page.getByText('Spiel jetzt beenden?')).toBeVisible();
    await page.getByRole('button', { name: 'Spiel jetzt beenden', exact: true }).click();

    await expect(page.getByText('Das war’s.')).toBeVisible();
  });

  test('cancelling out of the end-game confirm changes nothing', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    // Back on the ordinary question screen, nothing ended.
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
  });

  test('"Von vorne beginnen" from the menu restarts mid-game', async ({ page }) => {
    await seedAndResume(page, { qIndex: 10 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Von vorne beginnen' }).click();
    await expect(page.getByText('Von vorne anfangen?')).toBeVisible();
    await page.getByRole('button', { name: 'Von vorne', exact: true }).click();

    // restart() lands back on the plain start screen.
    await expect(page.getByRole('heading', { name: 'CLOSER', exact: true })).toBeVisible();
    await expect(page.getByText('Willkommen zurück.')).toHaveCount(0);
  });

  test('"Lokale Spieldaten löschen" wipes the save and returns to a fresh start screen', async ({
    page,
  }) => {
    await seedAndResume(page, { qIndex: 10 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Lokale Spieldaten löschen' }).click();
    await expect(page.getByText('Lokale Spieldaten löschen?')).toBeVisible();
    await page.getByRole('button', { name: 'Lokale Spieldaten löschen', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'CLOSER', exact: true })).toBeVisible();
    await expect(page.getByText('Willkommen zurück.')).toHaveCount(0);
    const stored = await page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY);
    expect(stored).toBeNull();
  });

  test('the menu is reachable from a Question-37 phase too', async ({ page }) => {
    await seedAndResume(page, { phase: 'q37intro', secretAsked: [true, true] });
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('heading', { name: 'Menü' })).toBeVisible();
  });
});
