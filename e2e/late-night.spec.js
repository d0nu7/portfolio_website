const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

async function unlockLateNight(page, language = 'de') {
  await page.goto('/closer/');
  if (language === 'en') await page.getByRole('button', { name: 'en', exact: true }).click();
  await page.getByRole('button', { name: language === 'de' ? 'Menü' : 'Menu' }).click();
  await page
    .getByRole('button', { name: language === 'de' ? 'Zusätzliche Inhalte' : 'Additional content' })
    .click();
  await page.getByText(language === 'de' ? 'Inhalte ab 18' : '18+ content', { exact: true }).click();
  await page
    .getByRole('button', { name: language === 'de' ? 'LATE NIGHT anzeigen' : 'Show LATE NIGHT' })
    .click();
  await page.getByRole('button', { name: language === 'de' ? 'Zurück' : 'Back' }).click();
  await page.getByRole('button', { name: language === 'de' ? 'Schließen' : 'Close' }).click();
}

async function reachIntro(page, language = 'de') {
  const next = language === 'de' ? 'Weiter' : 'Continue';
  await unlockLateNight(page, language);
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: next }).click();
  await page.getByRole('button', { name: /^LATE NIGHT/ }).click();
  await page.getByRole('button', { name: next }).click();
  await page.getByRole('button', { name: next }).click();
}

test.describe('LATE NIGHT low-attention participation flow', () => {
  test('German setup uses one shared introduction and no device-mediated ritual', async ({ page }) => {
    await reachIntro(page);

    await expect(page.getByText(/für zwei Erwachsene ab 18 Jahren/)).toBeVisible();
    await expect(page.getByText(/Klärt vor dem Start direkt miteinander/)).toBeVisible();
    await expect(page.getByText(/keine Zustimmung zu einer Handlung/)).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/)).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Ja, freiwillig' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('01 / 24')).toBeVisible();
  });

  test('English setup carries the complete shared participation contract', async ({ page }) => {
    await reachIntro(page, 'en');

    await expect(page.getByText(/for two adults aged 18 or over/)).toBeVisible();
    await expect(page.getByText(/check directly with each other/)).toBeVisible();
    await expect(page.getByText(/not consent to an action/)).toBeVisible();
    await expect(page.getByText(/PASS THE PHONE TO/)).toHaveCount(0);
  });

  test('Act II starts without another confirmation sequence', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'standard',
      modeId: 'explicit',
      qIndex: 7,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/)).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Ja, freiwillig' })).toHaveCount(0);
  });

  test('a saved LATE NIGHT run resumes even while discovery is hidden', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'quick',
      modeId: 'explicit',
      qIndex: 2,
    });
    await expect(page.getByText('03 / 12')).toBeVisible();
  });

  for (const [routeId, qIndex, pending, continueLabel] of [
    ['quick', 11, 11, 'Ende'],
    ['standard', 23, 23, 'Weiter'],
    ['full', 35, 35, 'Weiter'],
  ]) {
    test(`${routeId} ends through the direct safety finale without Question 37`, async ({
      page,
    }) => {
      await seedAndResume(page, {
        packId: 'late-night',
        routeId,
        modeId: 'explicit',
        phase: 'all36',
        qIndex,
        pending,
      });
      await page.waitForTimeout(1700);
      await page.getByRole('button', { name: continueLabel }).click();
      await expect(page.getByText(/Was ihr gesagt habt, ist Information/)).toBeVisible();
      await expect(page.getByText('FRAGE 37')).toHaveCount(0);
    });
  }
});
