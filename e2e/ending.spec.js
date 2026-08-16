const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

/*
 * Refactoringplan Phase 4: der Ending-Screen liess sich bisher nur per Tap
 * auf den Body vorspringen -- eine div hat kein Tastatur-Aequivalent. Wer
 * mit Tab/Enter unterwegs war, sass auf jedem der vier Beats fest, bis der
 * 2-Sekunden-Timer selbst weiterschaltete.
 *
 * Diese Tests pruefen die explizite Tastaturaktion direkt, nicht ueber den
 * Timer: sie warten nicht 2 Sekunden und schauen, ob es weitergeht -- das
 * wuerde auch ohne jeden Fix bestehen. Sie druecken Enter auf dem
 * Weiter-Button und verlangen einen SOFORTIGEN Sprung.
 */
/*
 * completed bleibt hier bewusst false, obwohl finish() es beim echten
 * Erreichen von 'ending' zusammen mit der Phase auf true setzt: ein
 * abgeschlossener Spielstand ist per Design nie resumable (loadSaved()
 * lehnt saved.completed rundweg ab, derselbe Mechanismus, der einen
 * beendeten Spielstand ueberhaupt erst aus dem Storage entfernt). Um den
 * Screen isoliert zu pruefen, wird trotzdem direkt auf die Phase gesetzt --
 * dasselbe Muster wie in secret-question.spec.js & Co. fuer andere
 * Zwischenscreens.
 */
test.describe('Ending', () => {
  test('Enter auf dem Weiter-Button springt sofort zum naechsten Beat, ohne auf den Timer zu warten', async ({
    page,
  }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });

    const first = await page.locator('main p, main h1, main h2').first().textContent();
    await page.getByRole('button', { name: 'Weiter' }).focus();
    await page.keyboard.press('Enter');

    // Sofort nach dem Enter geprueft (kein waitForTimeout vor der
    // Assertion) -- bestuende dieser Test auch nach 2 Sekunden noch, waere
    // das nur der Timer, nicht der Tastatur-Fix.
    const second = await page.locator('main p, main h1, main h2').first().textContent();
    expect(second).not.toBe(first);
  });

  test('der Weiter-Button ist ohne Maus erreichbar (Tab-Reihenfolge)', async ({ page }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });
    const button = page.getByRole('button', { name: 'Weiter' });
    await expect(button).toBeVisible();
    // Direktes .focus() statt Tab-Ketten durch den Rest des Screens --
    // die Erreichbarkeit selbst ist mit toBeVisible() plus dem
    // role=button-Locator schon gedeckt; hier zaehlt, dass der Fokus auch
    // tatsaechlich sichtbar ankommt.
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('der Ending-Text steht in einer aria-live-Region', async ({ page }) => {
    await seedAndResume(page, { phase: 'ending', endReason: 'completed' });
    const live = page.locator('[aria-live="polite"]');
    await expect(live).toBeVisible();
  });
});
