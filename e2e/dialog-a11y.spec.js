const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

/*
 * Fokus-/Dialog-Grundlagen (Refactoringplan Phase 0, Code Review CR-P1-08).
 *
 * Das In-Game-Menue war zuvor ein reines <div>-Overlay ohne Rolle, ohne
 * aria-modal und ohne Fokusmanagement: Screenreader kuendigten keinen
 * Dialog an, und der Tastaturfokus konnte hinter das geoeffnete Menue
 * wandern. Diese Tests halten die vier Grundlagen fest, damit sie beim
 * spaeteren Phase-4-Ausbau nicht unbemerkt verloren gehen.
 */
test.describe('Dialog-Grundlagen (Menue)', () => {
  test('das Menue ist ein semantischer, benannter Modal-Dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    // Der zugaengliche Name kommt aus der eigenen Ueberschrift des Dialogs.
    await expect(dialog).toHaveAccessibleName('Menü');
  });

  test('beim Oeffnen wandert der Fokus in den Dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    const focusInside = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return !!dlg && dlg.contains(document.activeElement);
    });
    expect(focusInside).toBe(true);
  });

  test('Escape schliesst den Dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('nach dem Schliessen kehrt der Fokus auf den Menue-Button zurueck', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    // Erst belegen, dass der Fokus den Ausloeser ueberhaupt verlassen hat --
    // sonst wuerde dieser Test auch ohne Fokusrueckgabe bestehen, weil der
    // Browser den geklickten Button ohnehin fokussiert laesst.
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

  test('Tab bleibt innerhalb des Dialogs gefangen', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();

    // Deutlich mehr Tabs als der Dialog fokussierbare Elemente hat -- ohne
    // Fokusfalle landet der Fokus dabei zwangslaeufig ausserhalb.
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
    }

    const stillInside = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      return !!dlg && dlg.contains(document.activeElement);
    });
    expect(stillInside).toBe(true);
  });

  test('auch der Bestaetigungsschritt ist ein benannter Dialog', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2 });
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Spiel jetzt beenden' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAccessibleName('Spiel jetzt beenden?');
  });
});
