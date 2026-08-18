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
  // override qIndex/etc. still land on "Spiel fortsetzen".
  // Specs targeting a specific interstitial (secretOffer, q37intro, ...)
  // override this explicitly.
  //
  // No `packId` here on purpose: it exercises the same migration path a
  // real pre-pack-architecture save goes through (CloserGame.js's
  // loadSaved() defaults a missing packId to the classic pack), rather than
  // every spec asserting against an explicitly-set value.
  phase: 'q',
  stateVersion: 2,
  contentVersion: 11,
  lang: 'de',
  players: ['Alex', 'Sam'],
  modeId: 'datenight', // has every twist enabled; override per test as needed
  timerEnabled: true,
  qIndex: 0,
  pending: 0,
  breakAct: 0,
  privateMomentStatus: 'not-started',
  privateQuestionState: ['unseen', 'unseen'],
  consentDecisions: [null, null],
  consentDeclinedAt: null,
  starterOffset: 0,
  // Active conversation time for the current act. This replaces the old
  // wall-clock `actStartedAt`; see the timer effect in CloserGame.js.
  actElapsedMs: 0,
  completed: false,
};

async function seedAndResume(page, overrides = {}) {
  const state = { ...BASE_STATE, ...overrides };
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
