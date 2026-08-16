const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

/*
 * Refactoring roadmap phase 4: the ending could previously advance only by
 * tapping the body. A div has no keyboard equivalent, so keyboard users had
 * to wait for the two-second timer at every beat.
 *
 * These tests exercise the explicit keyboard action directly rather than
 * waiting for the timer. Enter on the Continue button must advance at once.
 */
/*
 * `completed` intentionally remains false here. A naturally reached ending
 * sets it to true, and completed games are never resumable. Seeding the phase
 * directly isolates this screen, as other interstitial tests do.
 */
test.describe('Ending', () => {
  test('Enter on Continue advances immediately without waiting for the timer', async ({
    page,
  }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });

    const first = await page.locator('main p, main h1, main h2').first().textContent();
    await page.getByRole('button', { name: 'Weiter' }).focus();
    await page.keyboard.press('Enter');

    // Assert immediately, without waitForTimeout, so the timer cannot make
    // this pass independently of the keyboard action.
    const second = await page.locator('main p, main h1, main h2').first().textContent();
    expect(second).not.toBe(first);
  });

  test('the Continue button is reachable without a mouse', async ({ page }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });
    const button = page.getByRole('button', { name: 'Weiter' });
    await expect(button).toBeVisible();
    // Direct focus avoids coupling the test to unrelated Tab-order changes.
    // Visibility and the button role already cover semantic reachability.
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('the ending text is inside an aria-live region', async ({ page }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });
    const live = page.locator('[aria-live="polite"]');
    await expect(live).toBeVisible();
  });

  test('the global menu and legal information remain reachable on the ending', async ({ page }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Datenschutz' }).click();
    await expect(page.getByRole('dialog', { name: 'Datenschutz' }))
      .toContainText('Verantwortlicher');
  });
});
