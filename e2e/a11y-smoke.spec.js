const { test, expect } = require('./fixtures');

/*
 * Accessibility-/Keyboard-Smoke (Refactoringplan Phase 4).
 *
 * dialog-a11y.spec.js prueft schon den Fokus-Mechanismus des Menues im
 * Detail; ending.spec.js die Tastaturaktion des Ending-Screens. Was noch
 * fehlte: ein Nachweis, dass der GESAMTE kritische Pfad -- vom Start bis
 * zur ersten Frage -- ohne Maus durchspielbar ist, statt sich Screen fuer
 * Screen isoliert auf einen Resume-Sprung zu verlassen (wie es die
 * uebrigen Specs per seedAndResume tun, was Tastaturbedienbarkeit gar
 * nicht pruefen kann -- sie ueberspringen ja gerade jede Interaktion).
 *
 * Bewusst kein Tab-Ketten-Nachbau (brittle bei jeder Layoutverschiebung).
 * Stattdessen: jede Aktion laeuft ueber einen rollenbasierten Locator
 * plus `.press('Enter')`/`.press(' ')` -- das setzt echten Tastaturfokus
 * UND loest den nativen Keydown-Handler des Elements aus. Ein <button>
 * ohne funktionierende Tastaturbedienung (z.B. divs mit nur onClick)
 * wuerde hier durchfallen, nicht nur optisch "sichtbar" sein.
 */
test('der komplette Setup-Flow bis zur ersten Frage ist ohne Maus bedienbar', async ({ page }) => {
  await page.goto('/closer/');

  await page.getByRole('button', { name: 'Start' }).press('Enter');

  // PLAYERS: echte <label>-Inputs, per Tab erreichbar und beschriftet.
  await page.getByLabel('Person 1 – Name (optional)').focus();
  await page.keyboard.type('Alex');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Sam');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // PACK: eine Karte auswaehlen (Enter auf einer Choice, nicht Klick).
  await page.getByRole('button', { name: /CLASSIC/i }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // DURATION
  await page.getByRole('button', { name: /VOLL/i }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // MODE (CLASSIC hat zwei Style-Optionen)
  const modeButtons = page.getByRole('button', { name: /ORIGINAL|PLAYFUL/i });
  await modeButtons.first().press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // INTRO ("Los geht's") -> AKT-I-INTRO ("Weiter")
  await page.getByRole('button', { name: 'Los geht’s' }).press('Enter');
  await page.getByRole('button', { name: 'Weiter' }).press('Enter');

  // Angekommen: die erste echte Frage steht auf dem Schirm.
  await expect(page.getByText('Alex', { exact: false }).first()).toBeVisible();
});

/*
 * Stichprobe statt Vollerhebung: keine der auf dem ersten Fragenscreen
 * sichtbaren interaktiven Kontrollen (Menu-Trigger, Pass/Weiter, ...) ist
 * ein Button ohne zugaenglichen Namen. getByRole('button') findet nur
 * Elemente, die ARIA ueberhaupt als Button erkennt; ein leerer Name
 * waere trotzdem ein Treffer mit accessibleName === ''.
 */
test('keine sichtbare Schaltflaeche auf der ersten Frage ist namenlos', async ({ page }) => {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /CLASSIC/i }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /VOLL/i }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: /ORIGINAL|PLAYFUL/i }).first().click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();

  const buttons = page.getByRole('button');
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i += 1) {
    const btn = buttons.nth(i);
    if (!(await btn.isVisible())) continue;
    const name = await btn.evaluate((el) => el.getAttribute('aria-label') || el.textContent || '');
    expect(name.trim().length).toBeGreaterThan(0);
  }
});
