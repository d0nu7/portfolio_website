const { test, expect } = require('@playwright/test');
const { BASE_STATE, STORAGE_KEY } = require('./helpers');

/*
 * Bugfix-report iteration 7, BF-12: a saved value that is *present* but the
 * wrong shape/type used to be trusted verbatim past the packId/modeId/
 * qIndex canonicalization added in regression-test iteration 5 -- an
 * invalid phase, a stringified qIndex, NaN, a wrong-length array, or an
 * unknown stateVersion could each pair into a partial or contradictory
 * state. isPlausibleSaved() in CloserGame.js now rejects the whole save in
 * any of those cases; these pin that the app falls back to a normal, fresh
 * start screen instead -- never an uncaught exception, never an empty
 * screen, and never a false "Spiel fortsetzen" offer for a save that can't
 * actually be trusted.
 */
async function seedRaw(page, value) {
  await page.goto('/closer/');
  await page.evaluate(
    ({ key, value: v }) => window.localStorage.setItem(key, JSON.stringify(v)),
    { key: STORAGE_KEY, value }
  );
  await page.reload();
}

async function expectFreshStartScreen(page) {
  await expect(page.getByRole('heading', { name: 'CLOSER', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await expect(page.getByText('Willkommen zurück.')).toHaveCount(0);
  await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
}

test.describe('Resume-state validation (BF-12)', () => {
  test('an unrecognised phase falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, phase: 'not-a-real-phase' });
    await expectFreshStartScreen(page);
  });

  test('a stringified qIndex falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, qIndex: '7' });
    await expectFreshStartScreen(page);
  });

  test('a NaN qIndex falls back to a fresh start screen', async ({ page }) => {
    // JSON has no NaN literal -- seed it as a string the app would have to
    // coerce, which is exactly the case that must be rejected rather than
    // silently coerced.
    await seedRaw(page, { ...BASE_STATE, qIndex: 'NaN' });
    await expectFreshStartScreen(page);
  });

  test('a wrong-length players array falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, players: ['OnlyOne'] });
    await expectFreshStartScreen(page);
  });

  test('a wrong-length secretAsked array falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, secretAsked: [true] });
    await expectFreshStartScreen(page);
  });

  test('an unknown stateVersion falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, stateVersion: 999 });
    await expectFreshStartScreen(page);
  });

  test('garbage (non-JSON) storage falls back to a fresh start screen, no crash', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key }) => window.localStorage.setItem(key, 'not json at all {{{'),
      { key: STORAGE_KEY }
    );
    await page.reload();
    await expectFreshStartScreen(page);
  });

  test('a plausible save still resumes normally (no false-positive rejection)', async ({
    page,
  }) => {
    await seedRaw(page, { ...BASE_STATE, qIndex: 3 });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });
});
