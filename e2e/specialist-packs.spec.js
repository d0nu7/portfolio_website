const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

test.describe('Configurable pack library', () => {
  test('specialist packs start hidden and can be enabled independently', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('button', { name: /^FAMILY/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByRole('button', { name: /^FAMILY/ }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    await expect(page.getByRole('button', { name: /^FAMILY/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^ROAD TRIP/ })).toHaveCount(0);
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
