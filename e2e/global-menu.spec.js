const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

async function unlockLateNight(page) {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Menü' }).click();
  await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
  await page.getByText('Inhalte ab 18', { exact: true }).click();
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
    await expect(page.getByRole('button', { name: 'LATE NIGHT anzeigen' })).toHaveCount(0);
    await page.getByText('Inhalte ab 18', { exact: true }).click();
    const colleaguesBox = await page.getByRole('button', { name: /^COLLEAGUES/ }).boundingBox();
    const lateNightBox = await page
      .getByRole('button', { name: 'LATE NIGHT anzeigen' })
      .boundingBox();
    expect(lateNightBox.y).toBeGreaterThan(colleaguesBox.y);
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
    await expect(imprint.getByText('ATU77589478')).toBeVisible();
    await expect(imprint.getByText('+43 699 10867695')).toBeVisible();
    await expect(imprint.getByRole('link', { name: 'radomir.dinic@radi.solutions' }))
      .toHaveAttribute('href', 'mailto:radomir.dinic@radi.solutions');
  });

  test('the start screen points to optional packs in both languages', async ({ page }) => {
    await page.goto('/closer/');
    await expect(page.getByText('Weitere Gesprächsmodi kannst du jederzeit im Menü einblenden.'))
      .toBeVisible();
    await page.getByRole('button', { name: 'en', exact: true }).click();
    await expect(page.getByText('You can show more conversation packs from the Menu at any time.'))
      .toBeVisible();
  });

  test('STAY keeps an immediate exit and the global menu available', async ({ page }) => {
    await seedAndResume(page, { qIndex: 18, modeId: 'datenight' });
    await page.getByRole('button', { name: 'Bleiben' }).click();
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
    await page.getByRole('button', { name: 'Menü' }).click();
    await expect(page.getByRole('dialog', { name: 'Menü' })).toBeVisible();
  });
});
