import { CONTENT_VERSION, compileRun } from '../../../constants/closer';
import {
  DEFAULT_PREFERENCES,
  GAME_STORAGE_KEY,
  INSTALL_HINT_DISMISS_KEY,
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
    stateVersion: 1,
    contentVersion: CONTENT_VERSION,
    phase: 'q',
    qIndex: 5,
    pending: 5,
    hasStarted: true,
    packId: run.packId,
    routeId: run.routeId,
    modeId: run.styleId,
    runFingerprint: run.fingerprint,
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
    expect(JSON.parse(storage.valueFor(GAME_STORAGE_KEY))).toEqual(active);

    persistGameState(storage, { ...active, completed: true });
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();

    persistGameState(storage, { ...active, phase: 'start', hasStarted: false });
    expect(storage.setItem).toHaveBeenCalledTimes(1);
  });

  it('normalizes, persists, and defaults preferences', () => {
    const storage = createStorage({
      [PREFERENCES_STORAGE_KEY]: JSON.stringify({ lateNightVisible: true, ignored: true }),
    });
    expect(loadPreferences(storage)).toEqual({ lateNightVisible: true });

    persistPreferences(storage, { lateNightVisible: false });
    expect(JSON.parse(storage.valueFor(PREFERENCES_STORAGE_KEY))).toEqual({
      lateNightVisible: false,
    });
    expect(loadPreferences(createStorage({ [PREFERENCES_STORAGE_KEY]: '{broken' })))
      .toBe(DEFAULT_PREFERENCES);
  });

  it('clears the game alone or every CLOSER-owned key', () => {
    const storage = createStorage({
      [GAME_STORAGE_KEY]: 'game',
      [PREFERENCES_STORAGE_KEY]: 'preferences',
      [INSTALL_HINT_DISMISS_KEY]: 'hint',
      unrelated: 'keep',
    });

    clearSavedGame(storage);
    expect(storage.valueFor(GAME_STORAGE_KEY)).toBeUndefined();
    clearAllCloserData(storage);
    expect(storage.valueFor(PREFERENCES_STORAGE_KEY)).toBeUndefined();
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
