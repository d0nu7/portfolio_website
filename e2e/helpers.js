/*
 * Shared setup for CLOSER's E2E specs: seed a saved game straight into
 * localStorage (closer:v1) and resume it, rather than clicking through
 * player setup and mode selection every time. This is the exact mechanism
 * the app itself uses for "Spiel fortsetzen" on a closed tab -- not a
 * test-only shortcut -- so it's a faithful way to land on any phase.
 */

const STORAGE_KEY = 'closer:v1';

const BASE_STATE = {
  // 'start' is deliberately never resumable (see loadSaved() in
  // CloserGame.js) -- default to a plain question phase so specs that only
  // override qIndex/skipsRemaining/etc. still land on "Spiel fortsetzen".
  // Specs targeting a specific interstitial (secretPass1, q37intro, ...)
  // override this explicitly.
  //
  // No `packId` here on purpose: it exercises the same migration path a
  // real pre-pack-architecture save goes through (CloserGame.js's
  // loadSaved() defaults a missing packId to the classic pack), rather than
  // every spec asserting against an explicitly-set value.
  phase: 'q',
  lang: 'de',
  players: ['Alex', 'Sam'],
  modeId: 'datenight', // has every twist enabled; override per test as needed
  timerEnabled: true,
  qIndex: 0,
  pending: 0,
  breakAct: 0,
  skipsRemaining: 3,
  // secretSeen tracks whether a person completed their private secret-
  // question screen; hasSecretQuestion tracks whether they actually formed
  // one there rather than choosing "Heute keine" (bugfix-report iteration
  // 7, BF-08/FR-07 -- renamed from a single `secretReady` array that
  // conflated the two).
  secretSeen: [false, false],
  hasSecretQuestion: [null, null],
  secretAsked: [null, null],
  starterOffset: 0,
  actStartedAt: null,
  completed: false,
};

async function seedAndResume(page, overrides = {}) {
  const state = {
    ...BASE_STATE,
    ...overrides,
    actStartedAt: overrides.actStartedAt !== undefined ? overrides.actStartedAt : Date.now(),
  };
  await page.goto('/closer/');
  await page.evaluate(
    ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
    { key: STORAGE_KEY, value: state }
  );
  await page.reload();
  await page.getByText('Spiel fortsetzen').click();
  return state;
}

module.exports = { BASE_STATE, seedAndResume, STORAGE_KEY };
