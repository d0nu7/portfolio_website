const { test, expect } = require('@playwright/test');
const { seedAndResume, BASE_STATE, STORAGE_KEY } = require('./helpers');

/*
 * CLOSER PULSE (iteration 8 feature requests, FR8-04). The overlay is
 * transient by design (auto-dismisses within ~800ms, or ~160ms under
 * reduced motion) and purely decorative -- these pin that it actually
 * appears at the right milestones, tap-to-skip works, reduced motion
 * takes the short flash instead of the full animation, and -- just as
 * important per the spec's own "keine negative oder enttäuschte
 * Animation" -- that it does NOT fire on skip/decline, or on a plain
 * resume/reload.
 */
const PULSE = '[data-testid="close-pulse"]';

test.describe('CLOSER PULSE', () => {
  test('fires at the Act I -> Act II boundary (stage "actI")', async ({ page }) => {
    // Quick route (4 questions/act) so index 3 -> 4 is actually a boundary,
    // not just the next of 12 (as it would be on the default full route).
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-stage="actI"]`)).toBeVisible();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('fires at the Act II -> Act III boundary (stage "actII")', async ({ page }) => {
    await seedAndResume(page, { qIndex: 23, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-stage="actII"]`)).toBeVisible();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('fires once the secret-question handoff completes (stage "secret")', async ({ page }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: {
          ...BASE_STATE,
          phase: 'secretPassBack',
          qIndex: 27,
          pending: 27,
          secretSeen: [true, true],
          hasSecretQuestion: [true, true],
        },
      }
    );
    await page.reload();
    await page.getByText('Spiel fortsetzen').click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-stage="secret"]`)).toBeVisible();
  });

  test('fires when the game actually ends (stage "finale")', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden', exact: true }).click();
    await expect(page.locator(`${PULSE}[data-stage="finale"]`)).toBeVisible();
    await expect(page.getByText('Das war’s.')).toBeVisible();
  });

  test('tapping the overlay dismisses it immediately (tap-to-skip)', async ({ page }) => {
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    const pulse = page.locator(PULSE);
    await expect(pulse).toBeVisible();
    await pulse.click({ force: true });
    await expect(pulse).toHaveCount(0);
  });

  test('reduced motion shows the short flash variant, not the full animation', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await seedAndResume(page, { routeId: 'quick', modeId: 'original', qIndex: 3, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.locator(`${PULSE}[data-reduced="true"]`)).toBeVisible();
  });

  test('does not fire on a plain resume/reload', async ({ page }) => {
    await seedAndResume(page, { qIndex: 3, skipsRemaining: 3 });
    await expect(page.locator(PULSE)).toHaveCount(0);
  });

  test('does not fire on a token skip', async ({ page }) => {
    await seedAndResume(page, { qIndex: 3, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Skip', exact: true }).click();
    await page.locator('button', { hasText: 'Skip' }).nth(1).click();
    await expect(page.locator(PULSE)).toHaveCount(0);
  });

  test('does not fire on the free "Lieber nicht" decline', async ({ page }) => {
    await seedAndResume(page, { qIndex: 3, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Lieber nicht' }).click();
    await expect(page.locator(PULSE)).toHaveCount(0);
  });
});
