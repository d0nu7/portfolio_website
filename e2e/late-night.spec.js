const { test, expect } = require('./fixtures');
const { BASE_STATE, seedAndResume } = require('./helpers');

async function unlockLateNight(page, language = 'de') {
  await page.goto('/closer/');
  if (language === 'en') await page.getByRole('button', { name: 'en', exact: true }).click();
  await page.getByRole('button', { name: language === 'de' ? 'Menü' : 'Menu' }).click();
  await page
    .getByRole('button', { name: language === 'de' ? 'Zusätzliche Inhalte' : 'Additional content' })
    .click();
  await page
    .getByRole('button', { name: language === 'de' ? 'LATE NIGHT anzeigen' : 'Show LATE NIGHT' })
    .click();
  await page.getByRole('button', { name: language === 'de' ? 'Zurück' : 'Back' }).click();
  await page.getByRole('button', { name: language === 'de' ? 'Schließen' : 'Close' }).click();
}

async function reachEntryConsent(page, language = 'de') {
  const labels = language === 'de'
    ? { start: 'Start', next: 'Weiter' }
    : { start: 'Start', next: 'Continue' };
  await unlockLateNight(page, language);
  await page.getByRole('button', { name: labels.start }).click();
  await page.getByRole('button', { name: labels.next }).click();
  await page.getByRole('button', { name: /^LATE NIGHT/ }).click();
  await page.getByRole('button', { name: labels.next }).click();
  await page.getByRole('button', { name: labels.next }).click();
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

test.describe('LATE NIGHT consent and runtime', () => {
  test('entry consent offers equally prominent choices and decline ends neutrally', async ({ page }) => {
    await reachEntryConsent(page);
    await page.getByRole('button', { name: 'Ich bin Person 1' }).click();

    const accept = page.getByRole('button', { name: 'Ich stimme zu' });
    const decline = page.getByRole('button', { name: 'Hier enden' });
    await expect(accept).toBeVisible();
    await expect(decline).toBeVisible();
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
    await expect(page.getByRole('heading', { name: 'Alles gut.' })).toBeVisible();
    await expect(page.getByText('Ihr müsst nichts erklären.')).toBeVisible();
    await expect(page.getByText('Ihr braucht das Spiel nicht mehr.')).toHaveCount(0);
  });

  test('both entry confirmations are required before any question appears', async ({ page }) => {
    await reachEntryConsent(page);
    await page.getByRole('button', { name: 'Ich bin Person 1' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await expect(page.getByText('GIB DAS HANDY AN PERSON 2')).toBeVisible();
    await expect(page.locator('text=/^\\d{2} \\/ \\d{2}$/')).toHaveCount(0);

    await page.getByRole('button', { name: 'Ich bin Person 2' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await page.getByRole('button', { name: 'Los geht’s' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('01 / 24')).toBeVisible();
  });

  test('the second person can decline entry just as neutrally', async ({ page }) => {
    await reachEntryConsent(page);
    await page.getByRole('button', { name: 'Ich bin Person 1' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await page.getByRole('button', { name: 'Ich bin Person 2' }).click();
    await page.getByRole('button', { name: 'Hier enden' }).click();
    await expect(page.getByRole('heading', { name: 'Alles gut.' })).toBeVisible();
  });

  test('English entry copy and neutral decline are complete', async ({ page }) => {
    await reachEntryConsent(page, 'en');
    await page.getByRole('button', { name: "I'm Player 1" }).click();
    await expect(page.getByText('For adults aged 18 and over only.', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'End here' }).click();
    await expect(page.getByRole('heading', { name: 'All good.' })).toBeVisible();
    await expect(page.getByText('No explanation is needed.', { exact: false })).toBeVisible();
  });

  test('a saved LATE NIGHT run resumes even while discovery is hidden', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'quick',
      modeId: 'explicit',
      qIndex: 2,
    });
    await expect(page.getByText('03 / 12')).toBeVisible();
    await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('button', { name: 'Zusätzliche Inhalte' }).click();
    await expect(page.getByText(/LATE NIGHT bleibt .* verborgen/)).toBeVisible();
  });

  test('Act II content remains behind a renewed two-person opt-in', async ({ page }) => {
    await reachActTwoConsent(page);
    await expect(page.getByText('GIB DAS HANDY AN ALEX')).toBeVisible();

    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await expect(page.getByText('Ich möchte freiwillig mit expliziteren', { exact: false }))
      .toBeVisible();
    await page.getByRole('button', { name: 'Hier enden' }).click();
    await expect(page.getByRole('heading', { name: 'Alles gut.' })).toBeVisible();
  });

  test('the second person can decline the renewed Act II opt-in', async ({ page }) => {
    await reachActTwoConsent(page);
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await page.getByRole('button', { name: 'Hier enden' }).click();
    await expect(page.getByRole('heading', { name: 'Alles gut.' })).toBeVisible();
  });

  test('two renewed confirmations unlock only the Act II introduction', async ({ page }) => {
    await reachActTwoConsent(page);
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await page.getByRole('button', { name: 'Ich stimme zu' }).click();
    await expect(page.getByText('AKT II', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeVisible();
  });

  test('the renewed Act II opt-in is complete in English', async ({ page }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      {
        key: 'closer:v1',
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
    await expect(page.getByText('I freely choose to continue with more explicit', { exact: false }))
      .toBeVisible();
    await page.getByRole('button', { name: 'I agree' }).click();
    await page.getByRole('button', { name: "I'm Sam" }).click();
    await page.getByRole('button', { name: 'I agree' }).click();
    await expect(page.getByText('ACT II', { exact: true })).toBeVisible();
  });

  test('Standard route skips the universal secret handoff', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'standard',
      modeId: 'explicit',
      qIndex: 18,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('20', { exact: true })).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/)).toHaveCount(0);
    await expect(page.getByText(/GEHEIME FRAGE/)).toHaveCount(0);
  });

  test('Full route also skips the universal secret handoff', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'full',
      modeId: 'explicit',
      qIndex: 26,
    });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('28', { exact: true })).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/)).toHaveCount(0);
  });

  test('the optional finale works without inventing a saved question', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'standard',
      modeId: 'explicit',
      phase: 'all36',
      qIndex: 23,
      pending: 23,
    });
    await expect(page.getByText('Das waren alle 24.')).toBeVisible();
    await page.waitForTimeout(1700);
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('Trotzdem noch eine?')).toBeVisible();
    await expect(page.getByText(/vorgemerkte Frage wartet/)).toHaveCount(0);
    await page.getByRole('button', { name: 'Ja' }).click();
    await expect(page.getByText('Was würde zukünftige Gespräche über Sex', { exact: false }))
      .toBeVisible();
  });

  test('Quick ends directly without a saved-question or Question 37 ceremony', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'quick',
      modeId: 'explicit',
      phase: 'all36',
      qIndex: 11,
      pending: 11,
    });
    await expect(page.getByText('Das waren alle 12.')).toBeVisible();
    await page.waitForTimeout(1700);
    await page.getByRole('button', { name: 'Ende' }).click();
    await expect(page.locator('[data-testid="close-pulse"][data-stage="finale"]')).toBeVisible();
    await expect(page.getByText('FRAGE 37')).toHaveCount(0);
  });

  test('Full route reaches the consent-safe Question 37 bonus', async ({ page }) => {
    await seedAndResume(page, {
      packId: 'late-night',
      routeId: 'full',
      modeId: 'explicit',
      phase: 'all36',
      qIndex: 35,
      pending: 35,
    });
    await expect(page.getByText('Das waren alle 36.')).toBeVisible();
    await page.waitForTimeout(1700);
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.getByRole('button', { name: 'Ja' }).click();
    await expect(page.getByText('FRAGE 37')).toBeVisible();
    await expect(page.getByText('Was würde zukünftige Gespräche über Sex', { exact: false }))
      .toBeVisible();
  });
});
