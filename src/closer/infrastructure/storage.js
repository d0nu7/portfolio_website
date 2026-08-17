import { parseSaved } from '../engine/persistence';
import { normalizeVisiblePackIds } from '../content';

export const GAME_STORAGE_KEY = 'closer:v1';
export const PREFERENCES_STORAGE_KEY = 'closer:preferences:v2';
export const LEGACY_PREFERENCES_STORAGE_KEY = 'closer:preferences:v1';
export const INSTALL_HINT_DISMISS_KEY = 'closer:installHintDismissed';
export const DEFAULT_PREFERENCES = Object.freeze({
  version: 2,
  visiblePackIds: Object.freeze(normalizeVisiblePackIds()),
});

export function getBrowserStorage(browser) {
  try {
    return browser?.localStorage ?? null;
  } catch (error) {
    return null;
  }
}

export function loadSavedGame(storage) {
  if (!storage) return null;
  try {
    const result = parseSaved(storage.getItem(GAME_STORAGE_KEY));
    return result.ok ? result.value : null;
  } catch (error) {
    return null;
  }
}

export function persistGameState(storage, state) {
  if (!storage || !state) return;
  try {
    const resumableEntryConsent = state.phase.startsWith('consentGate');
    if (state.completed) {
      storage.removeItem(GAME_STORAGE_KEY);
    } else if ((state.hasStarted || resumableEntryConsent) && state.phase !== 'start') {
      // Consent choices exist only long enough to evaluate a complete private
      // gate. They are deliberately excluded from durable storage; a reload
      // during a partial gate restarts that gate for both people.
      const persisted = { ...state };
      delete persisted.consentDecisions;
      storage.setItem(GAME_STORAGE_KEY, JSON.stringify(persisted));
    }
  } catch (error) {
    // Storage is optional; the in-memory game remains usable.
  }
}

export function clearSavedGame(storage) {
  if (!storage) return;
  try {
    storage.removeItem(GAME_STORAGE_KEY);
  } catch (error) {
    // Storage is optional; the in-memory restart still succeeds.
  }
}

export function loadPreferences(storage) {
  if (!storage) return DEFAULT_PREFERENCES;
  try {
    const current = storage.getItem(PREFERENCES_STORAGE_KEY);
    if (current) {
      const parsed = JSON.parse(current);
      return { version: 2, visiblePackIds: normalizeVisiblePackIds(parsed?.visiblePackIds) };
    }

    const legacy = JSON.parse(storage.getItem(LEGACY_PREFERENCES_STORAGE_KEY) || '{}');
    const migrated = legacy?.lateNightVisible === true
      ? [...normalizeVisiblePackIds(), 'late-night']
      : undefined;
    return { version: 2, visiblePackIds: normalizeVisiblePackIds(migrated) };
  } catch (error) {
    return DEFAULT_PREFERENCES;
  }
}

export function persistPreferences(storage, preferences) {
  if (!storage) return;
  try {
    storage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({
      version: 2,
      visiblePackIds: normalizeVisiblePackIds(preferences?.visiblePackIds),
    }));
  } catch (error) {
    // Preferences are optional; the game remains usable without storage.
  }
}

export function clearAllCloserData(storage) {
  if (!storage) return;
  try {
    storage.removeItem(GAME_STORAGE_KEY);
    storage.removeItem(PREFERENCES_STORAGE_KEY);
    storage.removeItem(LEGACY_PREFERENCES_STORAGE_KEY);
    storage.removeItem(INSTALL_HINT_DISMISS_KEY);
  } catch (error) {
    // The UI still resets its in-memory state if storage is unavailable.
  }
}
