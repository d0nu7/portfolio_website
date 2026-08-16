const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

async function unlockLateNight(page) {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Menü' }).click();
  await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
  await page.getByRole('button', { name: 'LATE NIGHT anzeigen' }).click();
  await page.getByRole('button', { name: 'Zurück' }).click();
  await page.getByRole('button', { name: 'Schließen' }).click();
}

async function openPackSelection(page) {
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
}

test.describe('Global menu', () => {
  test('LATE NIGHT is hidden by default and can be discreetly enabled', async ({ page }) => {
    await page.goto('/closer/');
    await openPackSelection(page);
    await expect(page.getByRole('button', { name: /^LATE NIGHT/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByRole('button', { name: 'LATE NIGHT anzeigen' }).click();
    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Schließen' }).click();

    await expect(page.getByRole('button', { name: /^LATE NIGHT/ })).toBeVisible();
  });

  test('the discreet visibility preference survives reload and data deletion clears it', async ({
    page,
  }) => {
    await unlockLateNight(page);
    await page.reload();
    await openPackSelection(page);
    await expect(page.getByRole('button', { name: /^LATE NIGHT/ })).toBeVisible();

    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Lokale Spieldaten löschen' }).click();
    await page.getByRole('button', { name: 'Lokale Spieldaten löschen', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();

    await openPackSelection(page);
    await expect(page.getByRole('button', { name: /^LATE NIGHT/ })).toHaveCount(0);
  });

  test('privacy and imprint are reachable before the game starts', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Datenschutz' }).click();

    const privacy = page.getByRole('dialog', { name: 'Datenschutz' });
    await expect(privacy.getByRole('heading', { name: 'Verantwortlicher' })).toBeVisible();
    expect(
      await privacy.evaluate((dialog) => dialog.contains(document.activeElement))
    ).toBe(true);
    await expect(privacy.getByText('Eure Antworten werden weder eingegeben')).toBeVisible();
    await expect(privacy.getByRole('link', { name: 'Österreichischen Datenschutzbehörde' }))
      .toHaveAttribute('href', 'https://dsb.gv.at/');

    await page.getByRole('button', { name: 'Zurück' }).click();
    await page.getByRole('button', { name: 'Impressum' }).click();
    const imprint = page.getByRole('dialog', { name: 'Impressum' });
    await expect(imprint.getByText('Radomir Dinic BSc MSc')).toBeVisible();
    await expect(imprint.getByRole('link', { name: 'contact@radi.solutions' }))
      .toHaveAttribute('href', 'mailto:contact@radi.solutions');
  });

  test('STAY keeps an immediate exit and the global menu available', async ({ page }) => {
    await seedAndResume(page, { qIndex: 18, modeId: 'datenight' });
    await page.getByRole('button', { name: 'Bleiben' }).click();
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('dialog', { name: 'Menü' })).toBeVisible();
  });
});
