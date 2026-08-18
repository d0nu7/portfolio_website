const { test, expect } = require('./fixtures');
const { BASE_STATE, STORAGE_KEY } = require('./helpers');

/*
 * Bugfix-report iteration 7, BF-12: a saved value that is *present* but the
 * wrong shape/type used to be trusted verbatim past the packId/modeId/
 * qIndex canonicalization added in regression-test iteration 5 -- an
 * invalid phase, a stringified qIndex, NaN, a wrong-length array, or an
 * unknown stateVersion could each pair into a partial or contradictory
 * state. isPlausibleSaved() in CloserGame.js now rejects the whole save in
 * any of those cases; these pin that the app falls back to a normal, fresh
 * start screen instead -- never an uncaught exception, never an empty
 * screen, and never a false "Spiel fortsetzen" offer for a save that can't
 * actually be trusted.
 */
async function seedRaw(page, value) {
  await page.goto('/closer/');
  await page.evaluate(
    ({ key, value: v }) => window.localStorage.setItem(key, JSON.stringify(v)),
    { key: STORAGE_KEY, value }
  );
  await page.reload();
}

async function expectFreshStartScreen(page) {
  await expect(page.getByRole('heading', { name: 'CLOSER', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await expect(page.getByText('Willkommen zurück.')).toHaveCount(0);
  await expect(page.getByText('Spiel fortsetzen')).toHaveCount(0);
}

test.describe('Resume-state validation (BF-12)', () => {
  test('an unrecognised phase falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, phase: 'not-a-real-phase' });
    await expectFreshStartScreen(page);
  });

  test('a stringified qIndex falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, qIndex: '7' });
    await expectFreshStartScreen(page);
  });

  test('a NaN qIndex falls back to a fresh start screen', async ({ page }) => {
    // JSON has no NaN literal -- seed it as a string the app would have to
    // coerce, which is exactly the case that must be rejected rather than
    // silently coerced.
    await seedRaw(page, { ...BASE_STATE, qIndex: 'NaN' });
    await expectFreshStartScreen(page);
  });

  test('a wrong-length players array falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, players: ['OnlyOne'] });
    await expectFreshStartScreen(page);
  });

  test('a wrong-length privateQuestionState array falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, privateQuestionState: ['pending'] });
    await expectFreshStartScreen(page);
  });

  test('an unknown stateVersion falls back to a fresh start screen', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, stateVersion: 999 });
    await expectFreshStartScreen(page);
  });

  test('garbage (non-JSON) storage falls back to a fresh start screen, no crash', async ({
    page,
  }) => {
    await page.goto('/closer/');
    await page.evaluate(
      ({ key }) => window.localStorage.setItem(key, 'not json at all {{{'),
      { key: STORAGE_KEY }
    );
    await page.reload();
    await expectFreshStartScreen(page);
  });

  test('a plausible save still resumes normally (no false-positive rejection)', async ({
    page,
  }) => {
    await seedRaw(page, { ...BASE_STATE, qIndex: 3 });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });

  /*
   * FR8-06 (iteration 8 feature requests): a save that snapshotted its
   * resolved runQuestionIds at start time must be re-checked against what
   * the current content actually resolves to on resume -- a mismatch
   * means the content has shifted since the save was written (a question
   * reordered, removed, or moved between routes), and the resume should
   * be rejected outright rather than silently continuing on stale
   * positions. A save with no runQuestionIds at all (pre-FR8-06) skips
   * this check entirely -- covered by the "no routeId key" case in
   * routes.spec.js.
   */
  test('a save whose runQuestionIds match the current content still resumes normally', async ({
    page,
  }) => {
    const runQuestionIds = Array.from({ length: 36 }, (_, i) => `classic-q${String(i + 1).padStart(2, '0')}`);
    await seedRaw(page, { ...BASE_STATE, runQuestionIds, contentVersion: 10 });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });

  test('a save whose runQuestionIds no longer match the current content falls back to a fresh start (FR8-06)', async ({
    page,
  }) => {
    const staleIds = Array.from({ length: 36 }, (_, i) => `classic-q${String(i + 1).padStart(2, '0')}`);
    staleIds[10] = 'classic-q99'; // simulates content that shifted since this save was written
    await seedRaw(page, { ...BASE_STATE, runQuestionIds: staleIds, contentVersion: 10 });
    await expectFreshStartScreen(page);
  });

  test('an older contentVersion is rejected even when positional ids still match', async ({ page }) => {
    const runQuestionIds = Array.from({ length: 36 }, (_, i) =>
      `classic-q${String(i + 1).padStart(2, '0')}`
    );
    await seedRaw(page, { ...BASE_STATE, runQuestionIds, contentVersion: 1 });
    await expectFreshStartScreen(page);
  });

  /*
   * Refactoring roadmap phase 1: new saves store the compact runFingerprint
   * instead of the complete ID list. The list remains valid as a legacy
   * format, but the fingerprint takes precedence whenever it is present.
   *
   * The expected value is not hard-coded because it depends on
   * CONTENT_VERSION and route curation. Instead, a real game creates the
   * fingerprint, which is then replayed unchanged and tampered with.
   */
  test('a save with the matching runFingerprint resumes', async ({ page }) => {
    // The fingerprint is created when an act begins ('act' -> 'q'), not when
    // resuming directly into a question. Load a progressed act intro first.
    await seedRaw(page, {
      ...BASE_STATE,
      phase: 'act',
      qIndex: 12,
      pending: 12,
      contentVersion: 10,
    });
    await page.getByText('Spiel fortsetzen').click();
    await page.getByRole('button', { name: 'Weiter' }).click();

    const written = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw).runFingerprint : null;
    }, STORAGE_KEY);
    // Let the app create the value so legitimate curation or version changes
    // do not require updating this test fixture.
    expect(typeof written).toBe('string');
    expect(written.length).toBeGreaterThan(0);

    await seedRaw(page, { ...BASE_STATE, contentVersion: 10, runFingerprint: written });
    await expect(page.getByText('Willkommen zurück.')).toBeVisible();
    await expect(page.getByText('Spiel fortsetzen')).toBeVisible();
  });

  test('a save with a foreign runFingerprint falls back to the start screen', async ({
    page,
  }) => {
    await seedRaw(page, {
      ...BASE_STATE,
      contentVersion: 10,
      runFingerprint: 'r3-driftedvalue',
    });
    await expectFreshStartScreen(page);
  });

  test('the fingerprint takes precedence over a still-matching legacy ID list', async ({ page }) => {
    // Both values are present but disagree: the list matches and the
    // fingerprint does not. The save must still be rejected.
    const runQuestionIds = Array.from({ length: 36 }, (_, i) =>
      `classic-q${String(i + 1).padStart(2, '0')}`
    );
    await seedRaw(page, {
      ...BASE_STATE,
      contentVersion: 10,
      runQuestionIds,
      runFingerprint: 'r3-driftedvalue',
    });
    await expectFreshStartScreen(page);
  });

  test('non-string player names are rejected', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, players: [1, 2] });
    await expectFreshStartScreen(page);
  });

  test('fractional indices are rejected', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, qIndex: 2.5 });
    await expectFreshStartScreen(page);
  });

  test('a consent phase is rejected for a pack without a consent gate', async ({ page }) => {
    await seedRaw(page, { ...BASE_STATE, phase: 'consentGateA', packId: 'classic' });
    await expectFreshStartScreen(page);
  });
});
