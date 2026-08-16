const { test, expect } = require('./fixtures');

/*
 * FR-007 (setup simplification and navigation): setup had no way back --
 * a wrong pack or duration choice meant restarting from the very top.
 * These tests cover the three concrete requirements: a Back action at
 * every setup stage, choices surviving a step back and forward again, and
 * Back correctly mirroring each screen's own singleton-skip logic instead
 * of landing on a screen that would immediately skip itself.
 */
test.describe('Setup Back navigation', () => {
  test('Back from Players returns to Start', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByText('Wer spielt?')).toBeVisible();

    await page.getByRole('button', { name: 'Zurück' }).click();
    await expect(page.getByRole('heading', { name: 'CLOSER' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  });

  /*
   * FRIENDS has exactly one style, so its forward flow already skips the
   * style screen entirely (duration -> intro directly). Back has to
   * mirror that -- landing on 'mode' here would show a screen the forward
   * flow itself never shows for this pack.
   */
  test('Back from Intro skips the style screen for a single-style pack, matching the forward flow', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByText('FRIENDS', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await page.getByRole('button', { name: 'Weiter' }).click(); // duration -> intro (no style screen)
    await expect(page.getByRole('button', { name: 'Los geht’s' })).toBeVisible();

    await page.getByRole('button', { name: 'Zurück' }).click();
    await expect(page.getByText('Wie viel Zeit habt ihr?')).toBeVisible();
    await expect(page.getByText('Modus wählen')).toHaveCount(0);
  });

  test('Back from Intro returns to the style screen for a multi-style pack', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack (default CLASSIC)
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await page.getByRole('button', { name: 'Weiter' }).click(); // duration -> mode
    await page.getByRole('button', { name: 'Weiter' }).click(); // mode -> intro
    await expect(page.getByRole('button', { name: 'Los geht’s' })).toBeVisible();

    await page.getByRole('button', { name: 'Zurück' }).click();
    await expect(page.getByText('Modus wählen')).toBeVisible();
  });

  test('choices survive stepping back through the whole setup flow and forward again', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();

    await page.getByLabel('Person 1 – Name (optional)').fill('Robin');
    await page.getByLabel('Person 2 – Name (optional)').fill('Toni');
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack

    await page.getByText('FRIENDS', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await page.getByText('STANDARD').click();

    // Walk all the way back to Players.
    await page.getByRole('button', { name: 'Zurück' }).click(); // duration -> pack
    await page.getByRole('button', { name: 'Zurück' }).click(); // pack -> players
    await expect(page.getByLabel('Person 1 – Name (optional)')).toHaveValue('Robin');
    await expect(page.getByLabel('Person 2 – Name (optional)')).toHaveValue('Toni');

    // Forward again: the earlier pack and route are still marked selected.
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await expect(page.getByRole('button', { name: /^FRIENDS / })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await expect(page.getByRole('button', { name: /STANDARD/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  /*
   * LATE NIGHT's Intro is only ever reached after both required consent
   * confirmations -- deliberately no Back button there, so stepping back
   * can never bypass having to re-consent. discoverLateNight mirrors
   * late-night.spec.js's own unlockLateNight/reachEntryConsent helpers.
   */
  test('no Back button appears on Intro for a pack with a consent gate', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByRole('button', { name: 'LATE NIGHT anzeigen' }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByRole('button', { name: /^LATE NIGHT/ }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration
    await page.getByRole('button', { name: 'Weiter' }).click(); // duration -> consent gate
    await page.getByRole('button', { name: 'Ich bin Person 1' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await page.getByRole('button', { name: 'Ich bin Person 2' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();

    await expect(page.getByRole('button', { name: 'Los geht’s' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zurück' })).toHaveCount(0);
  });
});
