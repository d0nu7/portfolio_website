const { test, expect } = require('./fixtures');
const { STORAGE_KEY, seedAndResume } = require('./helpers');

async function enableAdultPacks(page) {
  await page.goto('/closer/');
  await page.getByRole('button', { name: 'Menü' }).click();
  await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
  await page.getByText('Inhalte ab 18', { exact: true }).click();
  await page.getByRole('button', { name: /^POWER, BY CHOICE/ }).click();
  await page.getByRole('button', { name: /^SLOW BURN/ }).click();
  await page.getByRole('button', { name: 'Zurück' }).click();
  await page.getByRole('button', { name: 'Schließen' }).click();
}

async function choosePack(page, packName, routeName) {
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: new RegExp(`^${packName}`) }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: new RegExp(`^${routeName}`) }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
}

async function beginRun(page) {
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
}

test.describe('adult experience packs', () => {
  test('both new packs stay hidden until enabled and Late Night remains last', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByRole('button', { name: /^POWER, BY CHOICE/ })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^SLOW BURN/ })).toHaveCount(0);

    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await page.getByText('Inhalte ab 18', { exact: true }).click();
    const powerBox = await page.getByRole('button', { name: /^POWER, BY CHOICE/ }).boundingBox();
    const slowBox = await page.getByRole('button', { name: /^SLOW BURN/ }).boundingBox();
    const lateBox = await page.getByRole('button', { name: 'LATE NIGHT anzeigen' }).boundingBox();
    expect(powerBox.y).toBeLessThan(lateBox.y);
    expect(slowBox.y).toBeLessThan(lateBox.y);
  });

  test('POWER, BY CHOICE uses one shared introduction and no device consent ritual', async ({ page }) => {
    await enableAdultPacks(page);
    await choosePack(page, 'POWER, BY CHOICE', 'KURZ');
    await expect(page.getByText(/Klärt vor dem Start kurz miteinander/)).toBeVisible();
    await expect(page.getByText(/^GIB DAS HANDY AN/)).toHaveCount(0);
    await beginRun(page);
    await expect(page.getByText('01 / 12')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lieber nicht' })).toBeVisible();

    await seedAndResume(page, {
      packId: 'power-by-choice',
      routeId: 'quick',
      modeId: 'conversation',
      qIndex: 3,
      timerEnabled: false,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
    await expect(page.getByText(/^GIB DAS HANDY AN/)).toHaveCount(0);
  });

  test('SLOW BURN keeps the phone passive and puts communication between the people', async ({ page }) => {
    await enableAdultPacks(page);
    await choosePack(page, 'SLOW BURN', 'KURZ');
    await expect(page.getByText(/Sprecht vor dem Start kurz miteinander ab/)).toBeVisible();
    await expect(page.getByText(/nicht zur App/)).toBeVisible();
    await beginRun(page);
    await expect(page.getByText('01 / 9')).toBeVisible();

    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('02 / 9')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lieber nicht' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Getrennt entscheiden|Anpassen|Sanfter|Langsamer|Pause|Stopp/ })).toHaveCount(0);
  });

  test('SLOW BURN has no repeated Act-II gate and stores only ordinary progress', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'slow-burn',
      routeId: 'quick',
      modeId: 'touch',
      qIndex: 2,
      timerEnabled: false,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
    await expect(page.getByText(/^GIB DAS HANDY AN/)).toHaveCount(0);

    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.reload();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
    const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
    expect(stored).toEqual(expect.objectContaining({ packId: 'slow-burn', phase: 'q' }));
    expect(stored).not.toHaveProperty('choices');
    expect(stored).not.toHaveProperty('bodyArea');
    expect(stored).not.toHaveProperty('adjustment');
  });
});
