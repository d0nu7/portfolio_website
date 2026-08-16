import { parseSaved } from '../engine/persistence';

export const GAME_STORAGE_KEY = 'closer:v1';
export const PREFERENCES_STORAGE_KEY = 'closer:preferences:v1';
export const INSTALL_HINT_DISMISS_KEY = 'closer:installHintDismissed';
export const DEFAULT_PREFERENCES = Object.freeze({ lateNightVisible: false });

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
    if (state.completed) {
      storage.removeItem(GAME_STORAGE_KEY);
    } else if (state.hasStarted && state.phase !== 'start') {
      storage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
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
    const parsed = JSON.parse(storage.getItem(PREFERENCES_STORAGE_KEY) || '{}');
    return { lateNightVisible: parsed?.lateNightVisible === true };
  } catch (error) {
    return DEFAULT_PREFERENCES;
  }
}

export function persistPreferences(storage, preferences) {
  if (!storage) return;
  try {
    storage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    // Preferences are optional; the game remains usable without storage.
  }
}

export function clearAllCloserData(storage) {
  if (!storage) return;
  try {
    storage.removeItem(GAME_STORAGE_KEY);
    storage.removeItem(PREFERENCES_STORAGE_KEY);
    storage.removeItem(INSTALL_HINT_DISMISS_KEY);
  } catch (error) {
    // The UI still resets its in-memory state if storage is unavailable.
  }
}
