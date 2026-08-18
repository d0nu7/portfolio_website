import { CONTENT_VERSION, compileRun } from '../../../constants/closer';
import { STATE_VERSION } from '../../engine/persistence';
import {
  DEFAULT_PREFERENCES,
  GAME_STORAGE_KEY,
  INSTALL_HINT_DISMISS_KEY,
  LEGACY_PREFERENCES_STORAGE_KEY,
  LEGACY_PREFERENCES_STORAGE_KEY_V2,
  PREFERENCES_STORAGE_KEY,
  clearAllCloserData,
  clearSavedGame,
  getBrowserStorage,
  loadPreferences,
  loadSavedGame,
  persistGameState,
  persistPreferences,
} from '../storage';

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: jest.fn((key) => values.get(key) ?? null),
    setItem: jest.fn((key, value) => values.set(key, value)),
    removeItem: jest.fn((key) => values.delete(key)),
    valueFor: (key) => values.get(key),
  };
}

function resumableState(overrides = {}) {
  const run = compileRun('classic', 'full', 'playful');
  return {
    stateVersion: STATE_VERSION,
    contentVersion: CONTENT_VERSION,
    phase: 'q',
    qIndex: 5,
    pending: 5,
    hasStarted: true,
    packId: run.packId,
    routeId: run.routeId,
    modeId: run.styleId,
    runFingerprint: run.fingerprint,
    privateMomentStatus: 'not-started',
    privateQuestionState: ['unseen', 'unseen'],
    consentDecisions: [null, null],
    ...overrides,
  };
}

describe('CLOSER storage boundary', () => {
  it('loads a valid save through the discriminated parser', () => {
    const saved = resumableState();
    const storage = createStorage({ [GAME_STORAGE_KEY]: JSON.stringify(saved) });

    expect(loadSavedGame(storage)).toEqual(expect.objectContaining({
      phase: 'q',
      qIndex: 5,
      packId: 'classic',
      hasStarted: true,
    }));
  });

  it('returns null for missing, invalid, or unavailable saves', () => {
    expect(loadSavedGame(createStorage())).toBeNull();
    expect(loadSavedGame(createStorage({ [GAME_STORAGE_KEY]: '{broken' }))).toBeNull();
    expect(loadSavedGame(null)).toBeNull();
  });

  it('persists only active runs and removes completed runs', () => {
    const storage = createStorage();
    const active = resumableState();

    persistGameState(storage, active);
    const saved = JSON.parse(storage.valueFor(GAME_STORAGE_KEY));
    expect(saved).toEqual(expect.objectContaining({
      phase: active.phase,
      packId: active.packId,
      privateQuestionState: active.privateQuestionState,
    }));
    expect(saved).not.toHaveProperty('consentDecisions');

    persistGameState(storage, { ...active, completed: true });
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();

    persistGameState(storage, { ...active, phase: 'start', hasStarted: false });
    expect(storage.setItem).toHaveBeenCalledTimes(1);
  });

  it('never persists either person’s partial consent decision', () => {
    const storage = createStorage();
    persistGameState(storage, resumableState({
      phase: 'consentGatePassB',
      consentDecisions: ['no', null],
    }));

    expect(JSON.parse(storage.valueFor(GAME_STORAGE_KEY))).not.toHaveProperty('consentDecisions');
  });

  it('persists the entry consent gate as resumable progress without marking play started', () => {
    const storage = createStorage();
    persistGameState(storage, resumableState({
      phase: 'consentGatePassB',
      hasStarted: false,
      consentDecisions: ['yes', null],
    }));

    const saved = JSON.parse(storage.valueFor(GAME_STORAGE_KEY));
    expect(saved.phase).toBe('consentGatePassB');
    expect(saved.hasStarted).toBe(false);
    expect(saved).not.toHaveProperty('consentDecisions');
  });

  it('normalizes, persists, and defaults preferences', () => {
    const storage = createStorage({
      [PREFERENCES_STORAGE_KEY]: JSON.stringify({
        version: 3,
        visiblePackIds: ['classic', 'late-night', 'unknown'],
      }),
    });
    expect(loadPreferences(storage)).toEqual({
      version: 3,
      visiblePackIds: ['classic', 'late-night'],
    });

    persistPreferences(storage, { visiblePackIds: ['family'] });
    expect(JSON.parse(storage.valueFor(PREFERENCES_STORAGE_KEY))).toEqual({
      version: 3,
      visiblePackIds: ['family'],
    });
    expect(loadPreferences(createStorage({ [PREFERENCES_STORAGE_KEY]: '{broken' })))
      .toBe(DEFAULT_PREFERENCES);
  });

  it('uses the neutral five-pack set only when no preference exists', () => {
    expect(loadPreferences(createStorage())).toEqual({
      version: 3,
      visiblePackIds: ['classic', 'friends', 'old-friends', 'deep', 'chaos'],
    });
  });

  it('migrates version 2 preferences without replacing the selected packs', () => {
    const storage = createStorage({
      [LEGACY_PREFERENCES_STORAGE_KEY_V2]: JSON.stringify({
        version: 2,
        visiblePackIds: ['first-date', 'family'],
      }),
    });

    expect(loadPreferences(storage)).toEqual({
      version: 3,
      visiblePackIds: ['first-date', 'family'],
    });
  });

  it('never persists Youth Workshop as a resumable game', () => {
    const storage = createStorage({ [GAME_STORAGE_KEY]: 'old-run' });
    persistGameState(storage, resumableState({ packId: 'youth-workshop' }));
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();
  });

  it('removes an old Youth Workshop save instead of offering resume', () => {
    const run = compileRun('youth-workshop', 'quick', 'peer');
    const youthState = resumableState({
      packId: run.packId,
      routeId: run.routeId,
      modeId: run.modeId,
      runFingerprint: run.fingerprint,
      qIndex: 2,
      pending: 2,
    });
    const storage = createStorage({ [GAME_STORAGE_KEY]: JSON.stringify(youthState) });

    expect(loadSavedGame(storage)).toBeNull();
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();
  });

  it('migrates the legacy Late Night preference without exposing new specialist packs', () => {
    const storage = createStorage({
      [LEGACY_PREFERENCES_STORAGE_KEY]: JSON.stringify({ lateNightVisible: true }),
    });
    const preferences = loadPreferences(storage);
    expect(preferences.visiblePackIds).toContain('late-night');
    expect(preferences.visiblePackIds).not.toContain('road-trip');
    expect(preferences.visiblePackIds).not.toContain('family');
    expect(preferences.visiblePackIds).not.toContain('colleagues');
  });

  it('never accepts an empty visible-pack list', () => {
    const storage = createStorage({
      [PREFERENCES_STORAGE_KEY]: JSON.stringify({ version: 3, visiblePackIds: [] }),
    });
    expect(loadPreferences(storage).visiblePackIds).toEqual(DEFAULT_PREFERENCES.visiblePackIds);
  });

  it('clears the game alone or every CLOSER-owned key', () => {
    const storage = createStorage({
      [GAME_STORAGE_KEY]: 'game',
      [PREFERENCES_STORAGE_KEY]: 'preferences',
      [LEGACY_PREFERENCES_STORAGE_KEY]: 'legacy-preferences',
      [LEGACY_PREFERENCES_STORAGE_KEY_V2]: 'legacy-v2-preferences',
      [INSTALL_HINT_DISMISS_KEY]: 'hint',
      unrelated: 'keep',
    });

    clearSavedGame(storage);
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();
    clearAllCloserData(storage);
    expect(storage.valueFor(PREFERENCES_STORAGE_KEY)).toBeUndefined();
    expect(storage.valueFor(LEGACY_PREFERENCES_STORAGE_KEY)).toBeUndefined();
    expect(storage.valueFor(LEGACY_PREFERENCES_STORAGE_KEY_V2)).toBeUndefined();
    expect(storage.valueFor(INSTALL_HINT_DISMISS_KEY)).toBeUndefined();
    expect(storage.valueFor('unrelated')).toBe('keep');
  });

  it('never lets storage failures interrupt the in-memory game', () => {
    const failingStorage = {
      getItem: () => { throw new Error('blocked'); },
      setItem: () => { throw new Error('blocked'); },
      removeItem: () => { throw new Error('blocked'); },
    };

    expect(loadSavedGame(failingStorage)).toBeNull();
    expect(loadPreferences(failingStorage)).toBe(DEFAULT_PREFERENCES);
    expect(() => persistGameState(failingStorage, resumableState())).not.toThrow();
    expect(() => persistPreferences(failingStorage, DEFAULT_PREFERENCES)).not.toThrow();
    expect(() => clearSavedGame(failingStorage)).not.toThrow();
    expect(() => clearAllCloserData(failingStorage)).not.toThrow();

    const blockedBrowser = {};
    Object.defineProperty(blockedBrowser, 'localStorage', {
      get: () => { throw new Error('blocked'); },
    });
    expect(getBrowserStorage(blockedBrowser)).toBeNull();
  });
});
