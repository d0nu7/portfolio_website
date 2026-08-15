const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * The review's original P1 finding: NO THINKING/BOTH used to hide the
 * question behind a full-screen numeral until the countdown hit zero.
 * These pin the fix -- the question is on screen throughout -- plus the
 * non-intrusive live-region announcement added alongside it.
 */
test.describe('NO THINKING / BOTH countdown', () => {
  test('NO THINKING keeps the question on screen through the whole countdown', async ({ page }) => {
    // Act I, question index 1: "Wärst du gerne berühmt?" (twist: nothinking)
    await seedAndResume(page, { qIndex: 1 });
    await expect(page.getByText('NICHT NACHDENKEN')).toBeVisible();
    await expect(page.getByText('Antwortet mit dem Ersten')).toBeVisible();

    await page.getByRole('button', { name: 'Bereit' }).click();

    await expect(page.getByRole('timer')).toBeVisible();
    await expect(page.getByText(/berühmt/)).toBeVisible();

    // Stays visible partway through the 5-4-3-2-1 count, not just at the
    // instant the button was pressed.
    await page.waitForTimeout(2000);
    await expect(page.getByText(/berühmt/)).toBeVisible();
  });

  test('BOTH shows the real question before the countdown even starts', async ({ page }) => {
    // Act I, question index 5: "...körper oder den Geist..." (twist: both)
    await seedAndResume(page, { qIndex: 5 });
    await expect(page.getByText('BEIDE', { exact: true })).toBeVisible();
    await expect(page.getByText(/90 leben/)).toBeVisible();

    await page.getByRole('button', { name: 'Bereit' }).click();

    await expect(page.getByRole('timer')).toBeVisible();
    await expect(page.getByText(/90 leben/)).toBeVisible();
  });

  test('the countdown live region announces start and zero, never per tick', async ({ page }) => {
    await seedAndResume(page, { qIndex: 1 });
    await page.getByRole('button', { name: 'Bereit' }).click();

    const region = page.locator('[role="status"]');
    await expect(region).toHaveText(/5 Sekunden/);

    // The visible number is not itself a live region -- only role/atomic.
    const timer = page.getByRole('timer');
    await expect(timer).toHaveAttribute('aria-atomic', 'true');
    await expect(timer).not.toHaveAttribute('aria-live');

    await page.waitForTimeout(5300);
    await expect(region).toHaveText('Los.');
  });

  /*
   * Bugfix-report iteration 7, BF-07: the restart-only fix (regression-test
   * iteration 5, P2.3) left "Los." sitting in the live region for the rest
   * of the same game -- only a full restart cleared it. This pins that a
   * later question in the same game no longer carries the stale
   * announcement over.
   */
  test('the live region is cleared once a later question in the same game is reached', async ({
    page,
  }) => {
    await seedAndResume(page, { qIndex: 1 });
    await page.getByRole('button', { name: 'Bereit' }).click();
    await page.waitForTimeout(5300);

    const region = page.locator('[role="status"]');
    await expect(region).toHaveText('Los.');

    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/rehearse|Telefonat/)).toBeVisible();
    await expect(region).toHaveText('');
  });
});
