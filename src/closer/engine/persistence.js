import {
  CONTENT_VERSION,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  LANGS,
  compileRun,
  getPack,
  getRoute,
} from '../../constants/closer';
import { isPackVisible, normalizeVisiblePackIds } from '../content';

// Bump only when an older saved shape cannot be migrated safely.
export const STATE_VERSION = 2;

const END_REASONS = new Set(['completed', 'userEnded', 'consentDeclined']);

const VALID_PHASES = new Set([
  'players', 'pack', 'duration', 'mode', 'intro', 'act', 'break', 'q',
  'secretOffer', 'secretPass1', 'secret1', 'secretPass2', 'secret2', 'secretPassBack',
  'privateUse',
  'lastIntro', 'all36',
  'checkPass1', 'check1', 'checkPass2', 'check2', 'checkPassBack',
  'q37intro', 'q37', 'q37a', 'q37b',
  'privateFinaleIntro', 'privateFinaleA', 'privateFinaleB', 'privateFinaleSkipped',
  'directFinale', 'ending',
  'consentGatePassA', 'consentGateA', 'consentGatePassB', 'consentGateB',
  'consentAct2PassA', 'consentAct2A', 'consentAct2PassB', 'consentAct2B',
  'consentGateAccepted', 'consentAct2Accepted',
]);

/*
 * Conversation answers never enter application state. This factory contains
 * only the navigation data needed to survive a closed tab.
 */
export function createInitialState(options = {}) {
  const lang = LANGS.includes(options.lang) ? options.lang : 'de';
  const pack = getPack(options.packId || DEFAULT_PACK_ID);
  const requestedRoute = options.routeId || pack.defaultRouteId || DEFAULT_ROUTE_ID;
  const route = getRoute(pack.id, requestedRoute);

  return {
    stateVersion: STATE_VERSION,
    phase: 'start',
    lang,
    players: ['', ''],
    packId: pack.id,
    routeId: route.id,
    modeId: pack.modes[0].id,
    timerEnabled: options.timerEnabled ?? true,
    qIndex: 0,
    pending: 0,
    breakAct: 0,
    privateMomentStatus: 'not-started',
    privateQuestionState: ['unseen', 'unseen'],
    consentDecisions: [null, null],
    consentDeclinedAt: null,
    starterOffset: 0,
    actElapsedMs: 0,
    completed: false,
    endReason: null,
    hasStarted: false,
    contentVersion: CONTENT_VERSION,
    runFingerprint: null,
  };
}

export function createRestartState(currentState = {}, preferences = {}) {
  const hiddenPack = !isPackVisible(preferences, currentState.packId);
  const fallbackPackId = normalizeVisiblePackIds(preferences.visiblePackIds)[0] || DEFAULT_PACK_ID;

  return createInitialState({
    lang: currentState.lang,
    packId: hiddenPack ? fallbackPackId : currentState.packId,
    routeId: currentState.routeId,
    timerEnabled: currentState.timerEnabled,
  });
}

export function resumeSavedState(savedState, lang) {
  if (!savedState || typeof savedState !== 'object') return null;
  const resumed = {
    ...savedState,
    lang: LANGS.includes(lang) ? lang : savedState.lang,
    consentDecisions: [null, null],
  };
  resumed.phase = {
    secret1: 'secretPass1',
    secret2: 'secretPass2',
    check1: 'checkPass1',
    check2: 'checkPass2',
    consentGateA: 'consentGatePassA',
    consentGateB: 'consentGatePassA',
    consentGatePassB: 'consentGatePassA',
    consentAct2A: 'consentAct2PassA',
    consentAct2B: 'consentAct2PassA',
    consentAct2PassB: 'consentAct2PassA',
  }[resumed.phase] || resumed.phase;
  return resumed;
}

const initialState = createInitialState();

function isPlausibleSaved(saved) {
  if (!saved || typeof saved !== 'object') return false;
  if (typeof saved.phase !== 'string' || !VALID_PHASES.has(saved.phase)) return false;
  if (saved.stateVersion !== undefined && saved.stateVersion !== STATE_VERSION) return false;
  const isNonNegativeInteger = (value) => Number.isInteger(value) && value >= 0;
  if (saved.qIndex !== undefined && !isNonNegativeInteger(saved.qIndex)) return false;
  if (saved.pending !== undefined && !isNonNegativeInteger(saved.pending)) return false;
  if (saved.breakAct !== undefined && !isNonNegativeInteger(saved.breakAct)) return false;
  if (saved.starterOffset !== undefined && saved.starterOffset !== 0 && saved.starterOffset !== 1) {
    return false;
  }
  if (
    saved.actElapsedMs !== undefined &&
    !(typeof saved.actElapsedMs === 'number' && Number.isFinite(saved.actElapsedMs) && saved.actElapsedMs >= 0)
  ) {
    return false;
  }
  if (saved.timerEnabled !== undefined && typeof saved.timerEnabled !== 'boolean') return false;
  if (saved.completed !== undefined && typeof saved.completed !== 'boolean') return false;
  if (saved.hasStarted !== undefined && typeof saved.hasStarted !== 'boolean') return false;
  if (saved.contentVersion !== undefined && !Number.isInteger(saved.contentVersion)) return false;
  if (
    saved.runFingerprint !== undefined &&
    saved.runFingerprint !== null &&
    typeof saved.runFingerprint !== 'string'
  ) {
    return false;
  }
  if (
    saved.runQuestionIds !== undefined &&
    !(Array.isArray(saved.runQuestionIds) && saved.runQuestionIds.every((id) => typeof id === 'string'))
  ) {
    return false;
  }
  if (saved.lang !== undefined && !LANGS.includes(saved.lang)) return false;
  const isPairOf = (value, predicate) =>
    Array.isArray(value) && value.length === 2 && value.every(predicate);
  if (saved.players !== undefined && !isPairOf(saved.players, (value) => typeof value === 'string')) {
    return false;
  }
  if (
    saved.privateQuestionState !== undefined &&
    !isPairOf(saved.privateQuestionState, (value) =>
      ['unseen', 'none', 'pending', 'asked', 'discarded'].includes(value))
  ) {
    return false;
  }
  if (
    saved.consentDecisions !== undefined &&
    !isPairOf(saved.consentDecisions, (value) => ['yes', 'no', null].includes(value))
  ) return false;
  if (
    saved.privateMomentStatus !== undefined &&
    !['not-started', 'in-progress', 'armed', 'skipped', 'consumed'].includes(
      saved.privateMomentStatus
    )
  ) return false;
  if (
    saved.consentDeclinedAt !== undefined &&
    !['entry', 'act2', null].includes(saved.consentDeclinedAt)
  ) return false;
  if (saved.endReason !== undefined && saved.endReason !== null && !END_REASONS.has(saved.endReason)) {
    return false;
  }
  return true;
}

const SETUP_ONLY_PHASES = new Set([
  'players', 'pack', 'duration', 'mode', 'intro',
]);

const ENTRY_CONSENT_PHASES = new Set([
  'consentGatePassA', 'consentGateA', 'consentGatePassB', 'consentGateB',
  'consentGateAccepted',
]);

function hasRealProgress(saved) {
  if (ENTRY_CONSENT_PHASES.has(saved.phase)) return true;
  if (typeof saved.hasStarted === 'boolean') return saved.hasStarted;
  if (SETUP_ONLY_PHASES.has(saved.phase)) return false;
  if (saved.phase === 'act') return (saved.pending || 0) > 0 || (saved.qIndex || 0) > 0;
  return true;
}

export const SAVE_REJECT_REASONS = Object.freeze({
  EMPTY: 'empty',
  INVALID_JSON: 'invalid-json',
  IMPLAUSIBLE_SHAPE: 'implausible-shape',
  SETUP_PHASE: 'setup-phase',
  COMPLETED: 'completed',
  NO_PROGRESS: 'no-progress',
  CONTENT_VERSION_MISMATCH: 'content-version-mismatch',
  CONSENT_PHASE_WITHOUT_GATE: 'consent-phase-without-gate',
  PRIVATE_MOMENT_PHASE_UNAVAILABLE: 'private-moment-phase-unavailable',
  ACT2_CONSENT_PHASE_INVALID_BREAK_ACT: 'act2-consent-phase-invalid-break-act',
  CONTENT_DRIFT: 'content-drift',
  INDEX_OUT_OF_RANGE: 'index-out-of-range',
  BREAK_ACT_OUT_OF_RANGE: 'break-act-out-of-range',
  NON_RESUMABLE_PACK: 'non-resumable-pack',
});

const PRIVATE_MOMENT_PHASES = new Set([
  'secretOffer', 'secretPass1', 'secret1', 'secretPass2', 'secret2', 'secretPassBack',
  'privateUse',
  'checkPass1', 'check1', 'checkPass2', 'check2', 'checkPassBack',
  'privateFinaleIntro', 'privateFinaleA', 'privateFinaleB', 'privateFinaleSkipped',
]);

const ACT2_CONSENT_PHASES = new Set([
  'consentAct2PassA', 'consentAct2A', 'consentAct2PassB', 'consentAct2B',
  'consentAct2Accepted',
]);

/*
 * Parsing returns a discriminated result so callers can distinguish an absent
 * save from a specific validation failure without depending on browser APIs.
 */
export function parseSaved(raw) {
  if (!raw) return { ok: false, reason: SAVE_REJECT_REASONS.EMPTY };
  let saved;
  try {
    saved = JSON.parse(raw);
  } catch (error) {
    return { ok: false, reason: SAVE_REJECT_REASONS.INVALID_JSON };
  }
  if (!isPlausibleSaved(saved)) {
    return { ok: false, reason: SAVE_REJECT_REASONS.IMPLAUSIBLE_SHAPE };
  }
  if (saved.phase === 'start') return { ok: false, reason: SAVE_REJECT_REASONS.SETUP_PHASE };
  if (saved.completed) return { ok: false, reason: SAVE_REJECT_REASONS.COMPLETED };
  if (!hasRealProgress(saved)) return { ok: false, reason: SAVE_REJECT_REASONS.NO_PROGRESS };
  if (saved.contentVersion !== CONTENT_VERSION) {
    return { ok: false, reason: SAVE_REJECT_REASONS.CONTENT_VERSION_MISMATCH };
  }

  const merged = { ...initialState, ...saved, stateVersion: STATE_VERSION };
  delete merged.skipsRemaining;
  merged.hasStarted = true;

  const pack = getPack(merged.packId);
  merged.packId = pack.id;
  if (pack.nonResumable) {
    return { ok: false, reason: SAVE_REJECT_REASONS.NON_RESUMABLE_PACK };
  }
  merged.routeId = getRoute(pack.id, merged.routeId).id;
  if (!pack.modes.some((mode) => mode.id === merged.modeId)) {
    merged.modeId = pack.modes[0].id;
  }
  const run = compileRun(merged.packId, merged.routeId, merged.modeId);

  if (typeof saved.runFingerprint === 'string' && saved.runFingerprint.length > 0) {
    if (saved.runFingerprint !== run.fingerprint) {
      return { ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT };
    }
  } else if (Array.isArray(saved.runQuestionIds) && saved.runQuestionIds.length > 0) {
    const expected = run.questions.map((question) => question.id);
    const matchesExpected =
      expected.length === saved.runQuestionIds.length &&
      expected.every((id, index) => id === saved.runQuestionIds[index]);
    if (!matchesExpected) return { ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT };
  }

  const lastQuestion = run.questions.length - 1;
  if (merged.qIndex > lastQuestion || merged.pending > lastQuestion) {
    return { ok: false, reason: SAVE_REJECT_REASONS.INDEX_OUT_OF_RANGE };
  }
  if (merged.breakAct > 1) {
    return { ok: false, reason: SAVE_REJECT_REASONS.BREAK_ACT_OUT_OF_RANGE };
  }

  const consentPhase = merged.phase.startsWith('consent');
  if (consentPhase && !pack.consentGate) {
    return { ok: false, reason: SAVE_REJECT_REASONS.CONSENT_PHASE_WITHOUT_GATE };
  }
  if (PRIVATE_MOMENT_PHASES.has(merged.phase)) {
    const privateMomentEnabled = run.privateMoment !== 'none';
    if (!privateMomentEnabled) {
      return { ok: false, reason: SAVE_REJECT_REASONS.PRIVATE_MOMENT_PHASE_UNAVAILABLE };
    }
  }
  if (ACT2_CONSENT_PHASES.has(merged.phase) && merged.breakAct !== 0) {
    return { ok: false, reason: SAVE_REJECT_REASONS.ACT2_CONSENT_PHASE_INVALID_BREAK_ACT };
  }

  return { ok: true, value: merged };
}
