const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

test.describe('Configurable pack library', () => {
  test('specialist packs start hidden and can be enabled independently', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('button', { name: /^FAMILY/ })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^FIRST DATE/ })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^FRIENDS/ })).toBeVisible();

    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByRole('button', { name: /^FAMILY/ }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    await expect(page.getByRole('button', { name: /^FAMILY/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^ROAD TRIP/ })).toHaveCount(0);
  });

  test('the grouped library exposes activity, youth, and student packs independently', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();

    await expect(page.getByRole('heading', { name: 'Aktivitäten' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Situationen' })).toBeVisible();
    await page.getByRole('button', { name: /^OFF SCRIPT/ }).click();
    await page.getByRole('button', { name: /^YOUTH WORKSHOP/ }).click();
    await page.getByRole('button', { name: /^STUDENTS/ }).click();
    await page.getByRole('button', { name: /^FH SALZBURG/ }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('button', { name: /^OFF SCRIPT/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^YOUTH WORKSHOP/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^STUDENTS/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^FH SALZBURG/ })).toBeVisible();
  });

  test('the final visible pack cannot be hidden', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    const enabled = page.getByRole('button', { pressed: true });
    const count = await enabled.count();
    for (let index = count - 1; index > 0; index -= 1) {
      await enabled.nth(index).click();
    }
    await expect(enabled.first()).toBeDisabled();
  });
});

test.describe('Specialist pack runtime', () => {
  for (const packId of ['road-trip', 'family', 'colleagues']) {
    test(`${packId} Quick completes without a private handoff`, async ({ page }) => {
      await seedAndResume(page, {
        packId,
        routeId: 'quick',
        modeId: 'calm',
        qIndex: 11,
      });
      await page.getByRole('button', { name: 'Fertig' }).click();
      await expect(page.getByText('Das waren alle 12.')).toBeVisible();
      await page.getByRole('button', { name: 'Ende' }).click();
      await expect(page.getByText(/GIB DAS HANDY/i)).toHaveCount(0);
      if (packId === 'road-trip') {
        await expect(page.getByText(/Wenn eine teilnehmende Person weiterfährt/)).toBeVisible();
      }
    });
  }

  test('OFF SCRIPT Quick completes through its direct finale', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'off-script',
      routeId: 'quick',
      modeId: 'cooperative',
      qIndex: 8,
    });
    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByText('Das waren alle 9.')).toBeVisible();
    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.getByText(/irgendeinem absurden Einfall noch einen letzten Gruß/)).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY/i)).toHaveCount(0);
  });

  test('YOUTH WORKSHOP runs without creating a resumable session', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByRole('button', { name: /^YOUTH WORKSHOP/ }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: /^YOUTH WORKSHOP/ }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/keine Bewertung, Therapie oder Konfliktklärung/)).toBeVisible();
    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.reload();

    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Spiel fortsetzen' })).toHaveCount(0);
  });

  for (const packId of ['students', 'fh-salzburg']) {
    test(`${packId} Quick completes through its direct finale`, async ({ page }) => {
      await seedAndResume(page, {
        packId,
        routeId: 'quick',
        modeId: 'peer',
        qIndex: 11,
      });
      await page.getByRole('button', { name: 'Fertig' }).click();
      await expect(page.getByText('Das waren alle 12.')).toBeVisible();
      await page.getByRole('button', { name: 'Ende' }).click();
      await expect(page.getByText(/GIB DAS HANDY/i)).toHaveCount(0);
    });
  }
});

test.describe('Pack-aware PLAYFUL', () => {
  test('the same Date Night question is staged only in PLAYFUL', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'date-night',
      routeId: 'quick',
      modeId: 'playful',
      qIndex: 1,
    });
    await expect(page.getByRole('heading', { name: /rate, was Sam sagen wird/ })).toBeVisible();

    await seedAndResume(page, {
      packId: 'date-night',
      routeId: 'quick',
      modeId: 'warm',
      qIndex: 1,
    });
    await expect(page.getByRole('heading', { name: /rate, was Sam sagen wird/ })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
  });
});
