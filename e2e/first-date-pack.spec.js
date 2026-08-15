const { test, expect } = require('@playwright/test');
const { seedAndResume, STORAGE_KEY } = require('./helpers');

/*
 * FIRST DATE (iteration 8 catalog rollout, FR8-01/FR8-03) -- CLOSER's first
 * pack beyond CLASSIC, and the new Pack-Auswahl screen that makes choosing
 * it possible at all. These pin the UI-level behavior the Jest coverage in
 * closer.test.js can't reach: the pack card actually renders and is
 * selectable, picking it actually swaps the routes/style/questions shown
 * on every later screen, and its own quick route plays through end to end
 * with its own act boundaries and secret-question position.
 */
test.describe('Pack selection (FR8-03)', () => {
  test('choosing FIRST DATE swaps routes, style and the first question away from CLASSIC', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack

    await expect(page.getByText('Welches Pack?')).toBeVisible();
    await expect(page.getByText('CLASSIC')).toBeVisible();
    await expect(page.getByText('FIRST DATE')).toBeVisible();

    await page.getByText('FIRST DATE', { exact: true }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack -> duration

    // FIRST DATE's own route subtitles, distinct from CLASSIC's ("etwa 15
    // Minuten" for Quick) -- proves the duration screen is reading the
    // newly selected pack's routes, not CLASSIC's.
    await expect(page.getByText('12 Fragen · 3 Akte · etwa 18 Minuten')).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click(); // duration (default Quick) -> mode

    // Only CALM exists for FIRST DATE (no twist content has been assigned
    // yet -- see the block comment above FIRST_DATE_MODES in closer.js).
    await expect(page.getByText('CALM')).toBeVisible();
    await expect(page.getByText('PLAYFUL')).toHaveCount(0);

    await page.getByRole('button', { name: 'Weiter' }).click(); // mode -> intro
    await page.getByRole('button', { name: 'Los geht’s' }).click(); // intro -> act

    await expect(page.getByRole('heading', { name: 'NEUGIER', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click(); // act -> first question

    await expect(
      page.getByText('Wie sieht für dich ein perfekter ungeplanter Abend aus?')
    ).toBeVisible();

    const stored = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
    expect(stored.packId).toBe('first-date');
    expect(stored.routeId).toBe('quick');
    expect(stored.modeId).toBe('calm');
  });

  test('CLASSIC stays selectable and unaffected if the pack screen is passed through without choosing', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack (untouched) -> duration

    // CLASSIC's own route subtitle, proving the default packId (classic)
    // survived passing through the new screen without a selection.
    await expect(page.getByText('12 Fragen · 3 Akte · etwa 15 Minuten')).toBeVisible();
  });
});

test.describe('FIRST DATE quick route (12 questions, 4 per act)', () => {
  test('the act break fires after only 4 questions', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'first-date',
      routeId: 'quick',
      modeId: 'calm',
      qIndex: 3,
      skipsRemaining: 3,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
  });

  test('finishing all 12 shows the route-aware "that\'s all 12" copy', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'first-date',
      routeId: 'quick',
      modeId: 'calm',
      qIndex: 11,
      skipsRemaining: 3,
      secretSeen: [true, true],
      hasSecretQuestion: [true, true],
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 12.')).toBeVisible();
  });

  test('the secret question interrupts at this route\'s own position (index 10)', async ({
    page,
  }) => {
    await seedAndResume(page, {
      packId: 'first-date',
      routeId: 'quick',
      modeId: 'calm',
      qIndex: 9,
      skipsRemaining: 3,
      secretSeen: [false, false],
    });
    // Unlike CLASSIC's quick route (BF8-02), FIRST DATE has no twists at
    // all, so a single "Weiter" advances straight to the secret handoff.
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/GIB DAS HANDY AN ALEX/i)).toBeVisible();
  });
});
