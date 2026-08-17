const { test, expect } = require('./fixtures');
const { seedAndResume } = require('./helpers');

test.describe('Classic Full Private Moment — capture', () => {
  test('offers a shared skip, shows genuinely different cards, and returns to Q28', async ({
    page,
  }) => {
    await seedAndResume(page, {
      phase: 'secretOffer',
      pending: 27,
      qIndex: 26,
      privateMomentStatus: 'not-started',
    });

    await expect(page.getByText('KURZ PRIVAT')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Für beide auslassen' })).toBeVisible();
    await page.getByRole('button', { name: 'Karten zeigen' }).click();

    await expect(page.getByText('GIB DAS HANDY AN ALEX', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await expect(page.getByText(/ehrlich neugierig/)).toBeVisible();
    await page.getByRole('button', { name: 'Ich habe eine Frage' }).click();

    await expect(page.getByText('GIB DAS HANDY AN SAM', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await expect(page.getByText(/noch keinen Raum hatte/)).toBeVisible();
    await page.getByRole('button', { name: 'Heute nicht' }).click();

    await expect(page.getByText('ZURÜCK ZU EUCH')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('28', { exact: true })).toBeVisible();
    await expect(page.getByText('NUR FÜR')).toHaveCount(0);
  });

  test('shared skip bypasses both cards without exposing an individual choice', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'secretOffer',
      pending: 27,
      qIndex: 26,
      privateMomentStatus: 'not-started',
    });
    await page.getByRole('button', { name: 'Für beide auslassen' }).click();
    await expect(page.getByText('28', { exact: true })).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/i)).toHaveCount(0);
  });

  test('resume covers a direct private card with its named handoff', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'secret2',
      pending: 27,
      qIndex: 26,
      privateMomentStatus: 'in-progress',
      privateQuestionState: ['pending', 'unseen'],
    });
    await expect(page.getByText('GIB DAS HANDY AN SAM', { exact: true })).toBeVisible();
    await expect(page.getByText('NUR FÜR SAM')).toHaveCount(0);
  });
});

test.describe('Classic Full Private Moment — resolution', () => {
  test('checks both pending categories privately before the finale', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'all36',
      qIndex: 35,
      pending: 35,
      privateMomentStatus: 'armed',
      privateQuestionState: ['pending', 'pending'],
    });
    await page.waitForTimeout(1800);
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('GIB DAS HANDY AN ALEX', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Alex' }).click();
    await expect(page.getByText('Was ist aus deiner vorgemerkten Frage geworden?')).toBeVisible();
    await page.getByRole('button', { name: 'Noch offen' }).click();

    await expect(page.getByText('GIB DAS HANDY AN SAM', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Ich bin Sam' }).click();
    await page.getByRole('button', { name: 'Verwerfen' }).click();

    await expect(page.getByText('ZURÜCK ZU EUCH')).toBeVisible();
    await page.getByRole('button', { name: 'Weiter' }).click();
    await expect(page.getByText('EINE FRAGE FEHLT NOCH')).toBeVisible();
  });

  test('no pending category skips all private checks', async ({ page }) => {
    await seedAndResume(page, {
      phase: 'all36',
      qIndex: 35,
      pending: 35,
      privateMomentStatus: 'armed',
      privateQuestionState: ['none', 'discarded'],
    });
    await page.waitForTimeout(1800);
    await page.getByRole('button', { name: 'Weiter' }).click();

    await expect(page.getByText('KEINE GEHEIMFRAGEN')).toBeVisible();
    await expect(page.getByText(/GIB DAS HANDY AN/i)).toHaveCount(0);
  });
});
