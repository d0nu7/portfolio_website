const { test, expect } = require('./fixtures');
const { STORAGE_KEY, seedAndResume } = require('./helpers');

const PREFERENCES_KEY = 'closer:preferences:v2';

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

async function acceptEntryGate(page) {
  await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
  await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
  await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
  await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
}

async function reachFirstSlowBurnTouch(page) {
  await enableAdultPacks(page);
  await choosePack(page, 'SLOW BURN', 'KURZ');
  await acceptEntryGate(page);
  await page.getByRole('button', { name: 'Los geht’s' }).click();
  await expect(page.getByText('AKT I', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
  await expect(page.getByText('02 / 9')).toBeVisible();
  await page.getByRole('button', { name: 'Getrennt entscheiden' }).click();
}

async function chooseMasked(page, first, second) {
  await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
  await page.getByRole('button', { name: first, exact: true }).click();
  await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
  await page.getByRole('button', { name: second, exact: true }).click();
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
    const power = page.getByRole('button', { name: /^POWER, BY CHOICE/ });
    const slow = page.getByRole('button', { name: /^SLOW BURN/ });
    const late = page.getByRole('button', { name: 'LATE NIGHT anzeigen' });
    const [powerBox, slowBox, lateBox] = await Promise.all([
      power.boundingBox(), slow.boundingBox(), late.boundingBox(),
    ]);
    expect(powerBox.y).toBeLessThan(lateBox.y);
    expect(slowBox.y).toBeLessThan(lateBox.y);
  });

  test('POWER, BY CHOICE is conversation-only and renews consent before Act II', async ({ page }) => {
    await enableAdultPacks(page);
    await choosePack(page, 'POWER, BY CHOICE', 'KURZ');
    await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
    await expect(page.getByText('Möchtest du dieses Gespräch jetzt freiwillig führen?'))
      .toBeVisible();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    await page.getByRole('button', { name: /^Ich bin Person [12]$/ }).click();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText(/Keine Antwort erlaubt eine Handlung/)).toBeVisible();
    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('01 / 12')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Getrennt entscheiden' })).toHaveCount(0);

    await seedAndResume(page, {
      packId: 'power-by-choice',
      routeId: 'quick',
      modeId: 'conversation',
      qIndex: 3,
      timerEnabled: false,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('ABGESCHLOSSEN')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: /^Ich bin (Alex|Sam)$/ }).click();
    await expect(page.getByText(/direkteren Gespräch über Absprachen und Grenzen/))
      .toBeVisible();
  });

  test('SLOW BURN reveals an action only after two masked yes choices', async ({ page }) => {
    await reachFirstSlowBurnTouch(page);
    await chooseMasked(page, 'Ja', 'Ja');
    await expect(page.getByText('JA + JA', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sanfter' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Langsamer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stopp' })).toBeVisible();
  });

  test('SLOW BURN never reveals who skipped and stores no resumable session', async ({ page }) => {
    await reachFirstSlowBurnTouch(page);
    await chooseMasked(page, 'Ja', 'Auslassen');
    await expect(page.getByText('AUSGELASSEN', { exact: true })).toBeVisible();
    await expect(page.getByText('Es geht nichts verloren. Diese Option bleibt geschlossen.'))
      .toBeVisible();
    expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBeNull();

    await page.reload();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
    expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), PREFERENCES_KEY))
      .toEqual(expect.objectContaining({ visiblePackIds: expect.arrayContaining(['slow-burn']) }));
  });

  test('SLOW BURN adjustment and pause both require a fresh bilateral choice', async ({ page }) => {
    await reachFirstSlowBurnTouch(page);
    await chooseMasked(page, 'Anpassen', 'Ja');
    await expect(page.getByText('ETWAS ÄNDERN', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Neue Option steht fest' }).click();
    await expect(page.getByText(/^GIB DAS HANDY AN PERSON [12]$/)).toBeVisible();

    await chooseMasked(page, 'Ja', 'Ja');
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect(page.getByText('Der Kontakt endet jetzt.', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Neu entscheiden' }).click();
    await expect(page.getByText(/^GIB DAS HANDY AN PERSON [12]$/)).toBeVisible();
  });

  test('SLOW BURN renews the private bilateral opt-in before Act II', async ({ page }) => {
    await reachFirstSlowBurnTouch(page);
    await chooseMasked(page, 'Auslassen', 'Ja');
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText(/^GIB DAS HANDY AN PERSON [12]$/)).toBeVisible();
    await chooseMasked(page, 'Ja', 'Ja');
    await expect(page.getByText(/Jede konkrete Einladung braucht weiterhin/)).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
  });
});
