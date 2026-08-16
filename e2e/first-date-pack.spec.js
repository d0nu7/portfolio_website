const { test, expect } = require('./fixtures');
const { STORAGE_KEY } = require('./helpers');

/*
 * FIRST DATE (iteration 8 catalog rollout, FR8-01/FR8-03) -- CLOSER's first
 * pack beyond CLASSIC, and the new Pack-Auswahl screen that makes choosing
 * it possible at all. These pin the UI-level behavior the Jest coverage in
 * closer.test.js can't reach: the pack card actually renders and is
 * selectable, and picking it swaps the routes/style/questions shown on
 * every later screen.
 */
test.describe('Pack selection (FR8-03)', () => {
  test('choosing FIRST DATE swaps routes, style and the first question away from CLASSIC', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack

    await expect(page.getByText('Welches Pack?')).toBeVisible();
    await expect(page.getByText('CLASSIC')).toBeVisible();
    await expect(page.getByText('FIRST DATE')).toBeVisible();

    await page.getByText('FIRST DATE', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration

    // FIRST DATE's own route subtitles, distinct from CLASSIC's ("etwa 15
    // Minuten" for Quick) -- proves the duration screen is reading the
    // newly selected pack's routes, not CLASSIC's.
    await expect(page.getByText('12 Fragen · 3 Akte · etwa 18 Minuten')).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click(); // one style -> intro directly

    await expect(page.getByText('Modus wählen')).toHaveCount(0);
    await expect(page.getByText('PLAYFUL')).toHaveCount(0);
    await expect(page.getByText(/Neugier und Chemie entdecken/)).toBeVisible();

    await page.getByRole('button', { name: 'Los geht’s' }).click(); // intro -> act

    await expect(page.getByRole('heading', { name: 'NEUGIER', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click(); // act -> first question

    await expect(
      page.getByText('Wie sieht für dich ein perfekter ungeplanter Abend aus?')
    ).toBeVisible();

    const stored = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
    expect(stored.packId).toBe('first-date');
    expect(stored.routeId).toBe('quick');
    expect(stored.modeId).toBe('calm');
  });

  test('CLASSIC stays selectable and unaffected if the pack screen is passed through without choosing', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack (untouched) -> duration

    // CLASSIC's own route subtitle, proving the default packId (classic)
    // survived passing through the new screen without a selection.
    await expect(page.getByText('12 Fragen · 3 Akte · etwa 15 Minuten')).toBeVisible();
  });
});
