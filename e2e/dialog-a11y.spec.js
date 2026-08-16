const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

/*
 * Focus and dialog foundations (refactoring roadmap phase 0, CR-P1-08).
 *
 * The in-game menu used to be a plain <div> overlay without a role,
 * aria-modal or focus management. These tests preserve the four dialog
 * fundamentals as the interface evolves.
 */
test.describe('Menu dialog foundations', () => {
  test('the menu is a named semantic modal dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    // The dialog's own heading supplies its accessible name.
    await expect(dialog).toHaveAccessibleName('Menü');
  });

  test('opening the menu moves focus into the dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    const focusInside = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return !!dlg && dlg.contains(document.activeElement);
    });
    expect(focusInside).toBe(true);
  });

  test('Escape closes the dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('closing the dialog returns focus to the menu trigger', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    // First prove that focus left the trigger; otherwise the assertion could
    // pass even without focus restoration because clicking focuses the button.
    const leftTrigger = await page.evaluate(
      () => document.activeElement?.textContent?.trim() !== 'Menü'
    );
    expect(leftTrigger).toBe(true);

    await page.keyboard.press('Escape');

    const backOnTrigger = await page.evaluate(
      () => document.activeElement?.textContent?.trim()
    );
    expect(backOnTrigger).toBe('Menü');
  });

  test('Tab remains trapped inside the dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    // Use more Tab presses than there are focusable elements. Without a focus
    // trap, focus would necessarily escape the dialog.
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
    }

    const stillInside = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return !!dlg && dlg.contains(document.activeElement);
    });
    expect(stillInside).toBe(true);
  });

  test('the confirmation step is also a named dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAccessibleName('Spiel jetzt beenden?');
  });
});
