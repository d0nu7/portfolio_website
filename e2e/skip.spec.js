const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * Spec 13: running out of skips is silent -- the control just disappears,
 * never "no skips left". These pin the confirm/cancel flow and that exact
 * disappearance.
 */
test.describe('Skip tokens', () => {
  test('cancelling a skip consumes nothing', async ({ page }) => {
    // Act I, question index 2: no twist, plain question.
    await seedAndResume(page, { qIndex: 2, skipsRemaining: 3 });
    await expect(page.locator('[aria-label="3/3"]')).toBeVisible();

    await page.locator('button', { hasText: 'Skip' }).first().click();
    await expect(page.getByText('Diese Frage überspringen?')).toBeVisible();
    await page.getByRole('button', { name: 'Zurück' }).click();

    await expect(page.locator('[aria-label="3/3"]')).toBeVisible();
  });

  test('confirming a skip consumes exactly one token', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, skipsRemaining: 3 });

    await page.locator('button', { hasText: 'Skip' }).first().click();
    await expect(page.getByText('Diese Frage überspringen?')).toBeVisible();
    // Two "Skip"-labelled buttons exist while the sheet is open: the
    // original control behind the overlay, and the sheet's own confirm
    // button, appended after it in the DOM.
    await page.locator('button', { hasText: 'Skip' }).nth(1).click();

    await expect(page.getByText('Skipped.').or(page.getByText('Übersprungen.'))).toBeVisible();
    await page.waitForTimeout(1800); // the flash's own 1600ms advance timer

    await expect(page.locator('[aria-label="2/3"]')).toBeVisible();
  });

  test('the skip control disappears once tokens hit zero -- no "0 left" message', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, skipsRemaining: 1 });
    await expect(page.locator('[aria-label="1/3"]')).toBeVisible();

    await page.locator('button', { hasText: 'Skip' }).first().click();
    await page.locator('button', { hasText: 'Skip' }).nth(1).click();
    await page.waitForTimeout(1800);

    await expect(page.locator('[aria-label="0/3"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skip' })).toHaveCount(0);
    await expect(page.getByText(/kein.*skip/i)).toHaveCount(0);
  });

  /*
   * Iteration-6 content review, P1: consent to decline a question must
   * never be a scarce resource -- both of these pin that the free "Lieber
   * nicht" path is unaffected by the token Skip's own state.
   */
  test('the token Skip control is available even on the last question (36)', async ({ page }) => {
    // Act III, question index 35: the last question, no chrome shown, but
    // Skip must still work here -- consent doesn't run out at question 36.
    await seedAndResume(page, { qIndex: 35, skipsRemaining: 2 });
    await expect(page.getByRole('button', { name: 'Skip', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Skip', exact: true }).click();
    await page.locator('button', { hasText: 'Skip' }).nth(1).click();
    await page.waitForTimeout(1800);

    // A skipped last question still lands on the "all 36" screen, same as
    // clicking "Fertig" would.
    await expect(page.getByText('Das waren alle 36.')).toBeVisible();
  });

  test('the free "Lieber nicht" opt-out works at zero tokens and on the last question', async ({ page }) => {
    await seedAndResume(page, { qIndex: 35, skipsRemaining: 0 });
    // The token Skip button is gone (0 left), but the free opt-out isn't.
    await expect(page.getByRole('button', { name: 'Skip', exact: true })).toHaveCount(0);

    const decline = page.getByRole('button', { name: 'Lieber nicht' });
    await expect(decline).toBeVisible();
    await decline.click();
    await page.waitForTimeout(1800);

    await expect(page.getByText('Das waren alle 36.')).toBeVisible();
  });

  test('declining does not spend a token', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, skipsRemaining: 3 });
    await page.getByRole('button', { name: 'Lieber nicht' }).click();
    await page.waitForTimeout(1800);
    await expect(page.locator('[aria-label="3/3"]')).toBeVisible();
  });
});
