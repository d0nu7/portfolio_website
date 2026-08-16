const { test, expect } = require('@playwright/test');
const { seedAndResume } = require('./helpers');

test.describe('Act timer', () => {
  test('timer off shows no elapsed indicator at all', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: false, actElapsedMs: 0 });
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toHaveCount(0);
    await expect(page.getByText('Ihr seid über der geplanten Zeit')).toHaveCount(0);
  });

  test('timer on shows a running clock', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    await expect(page.locator('text=/^\\d+:\\d\\d$/')).toBeVisible();
  });

  // Bugfix-report iteration 7, BF-05: the previous wording falsely implied
  // the next act was ready regardless of how far through the current one
  // the couple actually was. This pins the corrected, honest copy.
  test('overtime shows the corrected, honest copy, wrapped within the screen', async ({ page }) => {
    await seedAndResume(page, {
      qIndex: 2,
      timerEnabled: true,
      // Aktive Zeit, nicht mehr ein Startzeitpunkt in der Vergangenheit:
      // deutlich ueber dem 15-Minuten-Budget des Akts.
      actElapsedMs: 20 * 60 * 1000,
    });
    await page.waitForTimeout(1200);

    const message = page.getByText('Ihr seid über der geplanten Zeit. Spielt in eurem Tempo weiter.');
    await expect(message).toBeVisible();

    const messageBox = await message.boundingBox();
    const screenBox = await page.locator('main').boundingBox();
    expect(messageBox).not.toBeNull();
    expect(screenBox).not.toBeNull();
    expect(messageBox.x).toBeGreaterThanOrEqual(screenBox.x);
    expect(messageBox.x + messageBox.width).toBeLessThanOrEqual(screenBox.x + screenBox.width + 1);
  });

  /*
   * Iteration-9-Review P1-09, live reproduziert: Die Aktzeit lief ab
   * `actStartedAt` als reine Wandzeit weiter -- auch waehrend das Spiel auf
   * dem Resume-Screen wartete oder im Hintergrund lag. Nach einer laengeren
   * Unterbrechung zeigte ein fortgesetztes Spiel sofort Overtime.
   *
   * Jetzt zaehlt nur aktiv gespielte Zeit. Diese Tests halten beide Seiten
   * fest: die Uhr steht, solange nicht gespielt wird, und sie laeuft
   * weiter, sobald wieder eine Frage auf dem Schirm ist.
   */
  test('die Aktzeit laeuft auf dem Resume-Screen nicht weiter', async ({ page }) => {
    // Bewusst ueber die SICHTBARE Uhr geprueft, nicht ueber das gespeicherte
    // Feld: ein Test auf actElapsedMs besteht auch gegen die alte
    // Wandzeit-Logik, weil die den Wert unveraendert durchreicht. Was
    // zaehlt, ist was die Spielenden nach der Pause sehen.
    const clock = page.locator('text=/^\\d+:\\d\\d$/');

    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    const beforePause = await clock.textContent();

    // Zurueck auf den Resume-Screen und dort deutlich laenger warten als
    // zuvor gespielt wurde.
    await page.reload();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
    await page.waitForTimeout(4000);
    await page.getByText('Spiel fortsetzen').click();

    const afterPause = await clock.textContent();
    const seconds = (v) => Number(v.split(':')[0]) * 60 + Number(v.split(':')[1]);
    // Die Wartezeit darf nicht in der Aktzeit auftauchen. Ein Spielraum von
    // zwei Sekunden deckt die kurze Spielzeit vor und nach dem Reload ab.
    expect(seconds(afterPause)).toBeLessThanOrEqual(seconds(beforePause) + 2);
  });

  test('die Aktzeit laeuft weiter, sobald wieder eine Frage offen ist', async ({ page }) => {
    await seedAndResume(page, { qIndex: 2, timerEnabled: true, actElapsedMs: 0 });
    await page.waitForTimeout(1200);
    const first = await page.locator('text=/^\\d+:\\d\\d$/').textContent();
    await page.waitForTimeout(2200);
    const second = await page.locator('text=/^\\d+:\\d\\d$/').textContent();
    expect(second).not.toBe(first);
  });
});
