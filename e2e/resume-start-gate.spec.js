const { test, expect } = require('./fixtures');
const { STORAGE_KEY } = require('./helpers');

/*
 * Setup-only state is not persisted. hasStarted flips at the first real
 * question; only then does the app write a resumable run.
 */

async function clickThroughToFirstQuestion(page, { continueLabel, beginLabel, startLabel }) {
  await page.getByRole('button', { name: startLabel }).click(); // start -> players
  await page.getByRole('button', { name: continueLabel }).click(); // players -> pack
  await page.getByRole('button', { name: continueLabel }).click(); // pack (default CLASSIC) -> duration
  await page.getByRole('button', { name: continueLabel }).click(); // duration -> mode
  await page.getByRole('button', { name: continueLabel }).click(); // mode -> intro
  await page.getByRole('button', { name: beginLabel }).click(); // intro -> act (Act I intro)
  await page.getByRole('button', { name: continueLabel }).click(); // act -> q (first real question)
}

async function seedRaw(page, value) {
  await page.goto('/closer/');
  await page.evaluate(
    ({ key, value: v }) => window.localStorage.setItem(key, JSON.stringify(v)),
    { key: STORAGE_KEY, value }
  );
  await page.reload();
}

// A pre-BF8-01 save shape: every field this state version knows about,
// deliberately missing `hasStarted` -- exactly what a save written before
// this fix existed looks like.
const LEGACY_BASE = {
  stateVersion: 1,
  contentVersion: 3,
  lang: 'de',
  players: ['', ''],
  modeId: 'original',
  timerEnabled: true,
  pending: 0,
  breakAct: 0,
  secretSeen: [false, false],
  hasSecretQuestion: [null, null],
  secretAsked: [null, null],
  starterOffset: 0,
  actStartedAt: null,
  completed: false,
};

test.describe('Resume-start gate (BF8-01)', () => {
  test('DE: a fresh visit shows Start, never a resume offer', async ({ page }) => {
    await page.goto('/closer/');
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('DE: reloading right after name entry does not offer "Spiel fortsetzen"', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByText('Wer spielt?')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Willkommen zurück.')).toHaveCount(0);
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('DE: reloading on the Act I intro screen, before the first question, still does not offer resume', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // pack
    await page.getByRole('button', { name: 'Weiter' }).click(); // duration
    await page.getByRole('button', { name: 'Weiter' }).click(); // mode
    await page.getByRole('button', { name: 'Weiter' }).click(); // intro
    await page.getByRole('button', { name: 'Los geht’s' }).click(); // act intro
    await expect(page.getByRole('heading', { name: 'NEUGIERIG' })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('DE: once the first question has actually begun, a reload offers "Spiel fortsetzen"', async ({ page }) => {
    await page.goto('/closer/');
    await clickThroughToFirstQuestion(page, {
      continueLabel: 'Weiter',
      beginLabel: 'Los geht’s',
      startLabel: 'Start',
    });
    await page.reload();
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });

  test('EN: reloading right after name entry does not offer "Continue game"', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'en', exact: true }).click();
    await page.getByRole('button', { name: 'Start' }).click();
    await expect(page.getByText("Who's playing?")).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Welcome back.')).toHaveCount(0);
    await expect(page.getByText('Continue game')).toHaveCount(0);
  });

  test('EN: once the first question has actually begun, a reload offers "Continue game"', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'en', exact: true }).click();
    await clickThroughToFirstQuestion(page, {
      continueLabel: 'Continue',
      beginLabel: 'Begin',
      startLabel: 'Start',
    });
    await page.reload();
    await expect(page.getByText('Welcome back.')).toBeVisible();
    await expect(page.getByText('Continue game')).toBeVisible();
  });

  test('migration: a legacy setup-only save (no hasStarted, phase "mode") does not offer resume', async ({
    page,
  }) => {
    await seedRaw(page, { ...LEGACY_BASE, phase: 'mode', qIndex: 0 });
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('reloading on the new Pack screen (FR8-03) does not offer resume either', async ({ page }) => {
    await page.goto('/closer/');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); // players -> pack
    await expect(page.getByText('Welches Pack?')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('migration: a legacy save on the Act I intro with no progress yet (no hasStarted, phase "act", pending 0) does not offer resume', async ({
    page,
  }) => {
    await seedRaw(page, { ...LEGACY_BASE, phase: 'act', qIndex: 0, pending: 0 });
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
  });

  test('migration: a legacy save returning to an act intro WITH real progress (no hasStarted, phase "act", pending 8) still resumes', async ({
    page,
  }) => {
    await seedRaw(page, { ...LEGACY_BASE, phase: 'act', qIndex: 8, pending: 8 });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });

  test('migration: a legacy real-game save (no hasStarted, phase "q", mid-game) still resumes normally', async ({
    page,
  }) => {
    await seedRaw(page, {
      ...LEGACY_BASE,
      phase: 'q',
      qIndex: 5,
      players: ['Alex', 'Sam'],
      actStartedAt: Date.now(),
    });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });
});
