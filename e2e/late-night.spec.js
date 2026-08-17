const { test, expect } = require('./fixtures');
const { BASE_STATE, seedAndResume, STORAGE_KEY } = require('./helpers');

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

async function reachEntryConsent(page, language = 'de') {
  const next = language === 'de' ? 'Weiter' : 'Continue';
  await unlockLateNight(page, language);
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: next }).click();
  await page.getByRole('button', { name: /^LATE NIGHT/ }).click();
  await page.getByRole('button', { name: next }).click();
  await page.getByRole('button', { name: next }).click();
}

async function reachActTwoConsent(page) {
  await seedAndResume(page, {
    packId: 'late-night',
    routeId: 'standard',
    modeId: 'explicit',
    qIndex: 7,
  });
  await page.getByRole('button', { name: 'Weiter' }).click();
  await page.getByRole('button', { name: 'Weiter' }).click();
}

function entryRoleButton(page, language = 'de') {
  return page.getByRole('button', {
    name: language === 'de' ? /^Ich bin Person [12]$/ : /^I'm Player [12]$/,
  });
}

test.describe('LATE NIGHT independent consent and readiness', () => {
  test('entry choices have equal prominence and A’s choice remains hidden until B decides', async ({
    page,
  }) => {
    await reachEntryConsent(page);
    await entryRoleButton(page).click();

    const accept = page.getByRole('button', { name: 'Ja, freiwillig' });
    const decline = page.getByRole('button', { name: 'Hier enden' });
    const [acceptStyle, declineStyle] = await Promise.all([
      accept.evaluate((node) => ({
        background: getComputedStyle(node).backgroundColor,
        border: getComputedStyle(node).borderColor,
        font: getComputedStyle(node).fontWeight,
      })),
      decline.evaluate((node) => ({
        background: getComputedStyle(node).backgroundColor,
        border: getComputedStyle(node).borderColor,
        font: getComputedStyle(node).fontWeight,
      })),
    ]);
    expect(acceptStyle).toEqual(declineStyle);

    await decline.click();
    await expect(page.getByText(/^GIB DAS HANDY AN PERSON [12]$/)).toBeVisible();
    await expect(page.getByText('Alles gut.')).toHaveCount(0);
    await entryRoleButton(page).click();
    await expect(page.getByText(/Die erste Wahl wird dir nicht gezeigt/)).toBeVisible();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    await expect(page.getByRole('heading', { name: 'Alles gut.' })).toBeVisible();
    await expect(page.getByText(/Niemand muss erklären, wer beendet hat/)).toBeVisible();
  });

  test('two entry yeses reveal only a collective result before the introduction', async ({ page }) => {
    await reachEntryConsent(page);
    await entryRoleButton(page).click();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    await entryRoleButton(page).click();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();

    await expect(page.getByText('BEIDE HABEN GEWÄHLT')).toBeVisible();
    await expect(page.getByText(/nur Zustimmung zum Gespräch/)).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('01 / 24')).toBeVisible();
  });

  test('English entry copy and collective decline are complete', async ({ page }) => {
    await reachEntryConsent(page, 'en');
    await entryRoleButton(page, 'en').click();
    await expect(page.getByText('Decide only for yourself.', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'End here' }).click();
    await entryRoleButton(page, 'en').click();
    await page.getByRole('button', { name: 'Yes, voluntarily' }).click();
    await expect(page.getByRole('heading', { name: 'All good.' })).toBeVisible();
    await expect(page.getByText('Nobody has to explain who ended it or why.', { exact: false }))
      .toBeVisible();
  });

  test('Act II also waits for both private decisions and exposes only the collective result', async ({
    page,
  }) => {
    await reachActTwoConsent(page);
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await expect(page.getByText(/Berührung, Sex, Fantasien und Grenzen/)).toBeVisible();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();

    await expect(page.getByText('BEIDE HABEN GEWÄHLT')).toBeVisible();
    await expect(page.getByText(/Jede einzelne Frage bleibt freiwillig/)).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
  });

  test('a partial consent gate stores no decision and resumes from A', async ({ page }) => {
    await reachEntryConsent(page);
    const roleANumber = (await entryRoleButton(page).innerText()).match(/[12]/)[0];
    await entryRoleButton(page).click();
    await page.getByRole('button', { name: 'Ja, freiwillig' }).click();
    const stored = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)), STORAGE_KEY);
    expect(stored).not.toHaveProperty('consentDecisions');

    await page.reload();
    await page.getByText('Spiel fortsetzen').click();
    await expect(page.getByRole('button', {
      name: new RegExp(`^Ich bin Person ${roleANumber}$`, 'i'),
    })).toBeVisible();
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

  test('English Act II gate can be resumed safely from A', async ({ page }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: {
          ...BASE_STATE,
          lang: 'en',
          packId: 'late-night',
          routeId: 'standard',
          modeId: 'explicit',
          phase: 'consentAct2PassA',
          qIndex: 7,
          pending: 8,
        },
      }
    );
    await page.reload();
    await page.getByText('Continue game').click();
    await expect(page.getByText('PASS THE PHONE TO ALEX')).toBeVisible();
    await page.getByRole('button', { name: "I'm Alex" }).click();
    await expect(page.getByText('Do you freely want to continue', { exact: false })).toBeVisible();
  });

  test('consent role A follows the person selected to open Q1', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'standard',
      modeId: 'explicit',
      phase: 'consentAct2PassA',
      qIndex: 7,
      pending: 8,
      breakAct: 0,
      starterOffset: 1,
      hasStarted: true,
    });
    await expect(page.getByText('GIB DAS HANDY AN SAM', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await expect(page.getByText(/Möchtest du für dich freiwillig/)).toBeVisible();
  });
});
