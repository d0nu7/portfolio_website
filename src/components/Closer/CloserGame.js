import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  CONTENT_VERSION,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  LANGS,
  PACKS,
  classifySecretAsked,
  compileRun,
  getPack,
  getRoute,
  pick,
  routeSubtitleFor,
  starterFor,
} from '../../constants/closer';
import {
  ACT_EFFECTS,
  ACT_EVENTS,
  CONSENT_EVENTS,
  PRIVATE_MOMENT_EFFECTS,
  PRIVATE_MOMENT_EVENTS,
  Q37_EVENTS,
  QUESTION_DESTINATION_EFFECTS,
  SETUP_EVENTS,
  actIndexAt,
  resolveQuestionDestination,
  transitionAct,
  transitionConsent,
  transitionPrivateMoment,
  transitionQ37,
  transitionSetup,
} from '../../closer/engine/transitions';
import COPY from '../../constants/closerCopy';
import ClosePulse from './ClosePulse';
import CloserChoiceList from './CloserChoiceList';
import CloserDialog from './CloserDialog';
import CloserHandoff from './CloserHandoff';
import CloserInstallHint from './CloserInstallHint';
import CloserLegal, { LEGAL_TITLES } from './CloserLegal';
import {
  ActNumeral,
  ActTitle,
  Bar,
  Body,
  Button,
  CloserGlobal,
  Choice,
  Count,
  Counter,
  Elapsed,
  Field,
  Flash,
  Foot,
  FrameContent,
  GhostButton,
  Kicker,
  LangSwitch,
  Lede,
  MenuTrigger,
  Question,
  ResponseCard,
  ResponseCardLabel,
  Row,
  Screen,
  Sheet,
  SheetPanel,
  Small,
  Stay,
  StayDot,
  TextButton,
  Toggle,
  TopBar,
  Track,
  TurnBadge,
  TurnName,
  TurnVerb,
  TwistLabel,
  VisuallyHidden,
  Wordmark,
} from './CloserStyles';

const STORAGE_KEY = 'closer:v1';
const PREFERENCES_KEY = 'closer:preferences:v1';
const DEFAULT_PREFERENCES = Object.freeze({ lateNightVisible: false });
// Must match CloserInstallHint.js's own key. Keeping the literal here avoids
// coupling data deletion to another component's implementation.
const INSTALL_HINT_DISMISS_KEY = 'closer:installHintDismissed';
const ENDING_BEATS = ['endingOne', 'endingTwo', 'endingThree', 'endingFour'];
// Bump only when an older saved shape cannot be migrated safely.
const STATE_VERSION = 1;
const END_REASONS = new Set(['completed', 'userEnded', 'consentDeclined']);
// BUG-009: how often the active timer segment is folded into persisted
// actElapsedMs while still running, bounding how much active time an
// abrupt kill can lose. Small enough to keep that loss window tight,
// large enough to avoid excessive re-renders/localStorage writes.
const ACTIVE_SEGMENT_CHECKPOINT_MS = 5000;
const VALID_PHASES = new Set([
  'players', 'pack', 'duration', 'mode', 'intro', 'act', 'break', 'q',
  'secretPass1', 'secret1', 'secretPass2', 'secret2', 'secretPassBack',
  'lastIntro', 'all36',
  'checkPass1', 'check1', 'checkPass2', 'check2', 'checkPassBack',
  'q37intro', 'q37', 'q37a', 'q37b', 'ending',
  // Per-pack consent gates. LATE NIGHT uses both the entry gate and the
  // renewed opt-in before Act II.
  'consentGatePassA', 'consentGateA', 'consentGatePassB', 'consentGateB',
  'consentAct2PassA', 'consentAct2A', 'consentAct2PassB', 'consentAct2B',
]);

/*
 * Nothing about the conversation is stored -- answers are never typed in. What
 * persists is only enough to survive a closed tab.
 */
function createInitialState(options = {}) {
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
    // Capture completion and existence are separate so declining a private
    // question never creates a fictional pending question at the finale.
    secretSeen: [false, false],
    hasSecretQuestion: [null, null],
    secretAsked: [null, null],
    starterOffset: 0,
    // Accumulated active conversation time for the current act.
    actElapsedMs: 0,
    completed: false,
    endReason: null,
    // Setup state is persisted, but only a real question makes a game
    // resumable. This remains true for the rest of the run.
    hasStarted: false,
    // Captured when the first question starts so changed content cannot be
    // resumed at a different position silently.
    contentVersion: CONTENT_VERSION,
    runFingerprint: null,
  };
}

const initialState = createInitialState();

// A saved value that is *present* but the wrong shape/type cannot be
// safely merged or coerced -- rather than silently produce a partial or
// contradictory state (e.g. a phase the render tree has no branch for, or
// a qIndex that is a string), isPlausibleSaved() rejects the whole save so
// loadSaved() falls back to null (a normal, fresh start screen -- never an
// an uncaught exception or an empty screen.
// A field that's simply *missing* (e.g. packId on a pre-Pack-architecture
// save) is fine here -- that's the `{ ...initialState, ...saved }` merge's
// job below, not this check's.
function isPlausibleSaved(saved) {
  if (!saved || typeof saved !== 'object') return false;
  if (typeof saved.phase !== 'string' || !VALID_PHASES.has(saved.phase)) return false;
  if (saved.stateVersion !== undefined && saved.stateVersion !== STATE_VERSION) return false;
  const isNonNegativeInteger = (v) => Number.isInteger(v) && v >= 0;
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
  // Legacy saves stored the complete question ID list before fingerprints.
  if (
    saved.runQuestionIds !== undefined &&
    !(Array.isArray(saved.runQuestionIds) && saved.runQuestionIds.every((id) => typeof id === 'string'))
  ) {
    return false;
  }
  if (saved.lang !== undefined && !LANGS.includes(saved.lang)) return false;
  const isPairOf = (v, predicate) =>
    Array.isArray(v) && v.length === 2 && v.every(predicate);
  const isBooleanOrNull = (v) => typeof v === 'boolean' || v === null;
  if (saved.players !== undefined && !isPairOf(saved.players, (v) => typeof v === 'string')) return false;
  if (saved.secretSeen !== undefined && !isPairOf(saved.secretSeen, (v) => typeof v === 'boolean')) return false;
  if (saved.secretAsked !== undefined && !isPairOf(saved.secretAsked, isBooleanOrNull)) return false;
  if (
    saved.hasSecretQuestion !== undefined &&
    !isPairOf(saved.hasSecretQuestion, isBooleanOrNull)
  ) return false;
  if (saved.endReason !== undefined && saved.endReason !== null && !END_REASONS.has(saved.endReason)) {
    return false;
  }
  return true;
}

// Phases where nothing about the actual game has happened yet. 'act' is
// deliberately not in this
// set: it's ambiguous on its own, since Act I's very first intro screen is
// state-shape-identical to Act II/III's after a real act break. See
// hasRealProgress() below for how that ambiguity is resolved.
// The pre-pack consent gate is setup-only (hasStarted is still false at
// that point); the Act II renewed opt-in is NOT -- it happens after
// hasStarted has already flipped true, so it's real in-progress game
// state, same as any other mid-game phase.
const SETUP_ONLY_PHASES = new Set([
  'players', 'pack', 'duration', 'mode', 'intro',
  'consentGatePassA', 'consentGateA', 'consentGatePassB', 'consentGateB',
]);

// A save written before `hasStarted` existed is migrated from its phase and
// progress. A save that carries `hasStarted` is trusted directly (it's
// set once, at the same 'act' -> 'q' transition below, and never reset
// except by restart()).
function hasRealProgress(saved) {
  if (typeof saved.hasStarted === 'boolean') return saved.hasStarted;
  if (SETUP_ONLY_PHASES.has(saved.phase)) return false;
  if (saved.phase === 'act') return (saved.pending || 0) > 0 || (saved.qIndex || 0) > 0;
  return true;
}

/*
 * Parsing returns a discriminated result so tests and future migration UI
 * can distinguish an absent save from a specific validation failure.
 */
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
});

/*
 * Phase families for the phase-specific stage below (BUG-008). A family is a
 * group of phases that share one structural precondition -- something that
 * is true of every reachable save on any phase in the group, derived
 * directly from the transitions in this file rather than guessed. Each
 * family's check runs only once its members' shared dependency (the
 * canonicalized pack, in both cases below) is available.
 *
 * This list is deliberately not exhaustive: only relationships traced with
 * high confidence from the transition code, and confirmed compatible with
 * every existing save fixture, are enforced. A stricter but unverified rule
 * would risk rejecting a legitimate resume, which is worse than the gap it
 * would close. Extend it the same way -- trace the real transition, check it
 * against e2e/*.spec.js fixtures, add a named reason -- rather than
 * inferring a schema from field types alone.
 */
// secretPass1..secretPassBack (capturing a private question) and
// checkPass1..checkPassBack (resolving it after the last question) are only
// ever entered when goTo()/nextCheckPhase() have already confirmed the
// route is not Quick and the pack's privateMoment is not 'none'. A pack or
// route content edit that turns this off after a save was written would
// not otherwise be caught -- the run fingerprint does not hash
// privateMoment, only question identity.
const PRIVATE_MOMENT_PHASES = new Set([
  'secretPass1', 'secret1', 'secretPass2', 'secret2', 'secretPassBack',
  'checkPass1', 'check1', 'checkPass2', 'check2', 'checkPassBack',
]);
// The renewed Act II consent gate is only ever entered from the 'break'
// screen's continue action while s.breakAct still holds Act I's value (0);
// nothing after that transition changes it before these phases render.
// breakAct 1 (the Act II/III boundary) can never legitimately coexist with
// them.
const ACT2_CONSENT_PHASES = new Set([
  'consentAct2PassA', 'consentAct2A', 'consentAct2PassB', 'consentAct2B',
]);

export function parseSaved(raw) {
  // Stage 1: versioned envelope. Reject anything that is not well-formed
  // JSON in a shape this state version understands, before any field is
  // trusted enough to look up content with.
  if (!raw) return { ok: false, reason: SAVE_REJECT_REASONS.EMPTY };
  let saved;
  try {
    saved = JSON.parse(raw);
  } catch (err) {
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
  // Make the migrated progress flag explicit for wake-lock and resume logic.
  merged.hasStarted = true;
  // Canonicalize registry identifiers once instead of carrying invalid saved
  // IDs through every render lookup.
  const pack = getPack(merged.packId);
  merged.packId = pack.id;
  merged.routeId = getRoute(pack.id, merged.routeId).id;
  if (!pack.modes.some((m) => m.id === merged.modeId)) {
    merged.modeId = pack.modes[0].id;
  }
  const run = compileRun(merged.packId, merged.routeId, merged.modeId);

  // Stage 2: the immutable run reference. Once pack/route/style are
  // canonicalized, reject a save whose stored fingerprint no longer matches
  // what the current content resolves to -- this is the run's identity
  // check, prior to and independent of any single phase's own fields.
  if (typeof saved.runFingerprint === 'string' && saved.runFingerprint.length > 0) {
    // merged.modeId is already canonicalized above, so a style that no
    // longer exists cannot slip past this check as if nothing changed.
    if (saved.runFingerprint !== run.fingerprint) {
      return { ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT };
    }
  } else if (Array.isArray(saved.runQuestionIds) && saved.runQuestionIds.length > 0) {
    // Legacy saves predate the fingerprint and carried the full ID list.
    const expected = run.questions.map((question) => question.id);
    const matchesExpected =
      expected.length === saved.runQuestionIds.length &&
      expected.every((id, i) => id === saved.runQuestionIds[i]);
    if (!matchesExpected) return { ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT };
  }
  const lastQuestion = run.questions.length - 1;
  if (merged.qIndex > lastQuestion || merged.pending > lastQuestion) {
    return { ok: false, reason: SAVE_REJECT_REASONS.INDEX_OUT_OF_RANGE };
  }
  if (merged.breakAct > 1) {
    return { ok: false, reason: SAVE_REJECT_REASONS.BREAK_ACT_OUT_OF_RANGE };
  }

  // Stage 3: phase-specific required/forbidden fields (BUG-008). A phase
  // that type-checks and stays within the run's own bounds can still
  // combine with a pack/route configuration it could never have been
  // reached from -- see the family comments above for exactly which
  // relationship each check enforces and why it is safe to require.
  const consentPhases = merged.phase.startsWith('consent');
  if (consentPhases && !pack.consentGate) {
    return { ok: false, reason: SAVE_REJECT_REASONS.CONSENT_PHASE_WITHOUT_GATE };
  }
  if (PRIVATE_MOMENT_PHASES.has(merged.phase)) {
    const privateMomentEnabled = run.routeId !== 'quick' && run.privateMoment !== 'none';
    if (!privateMomentEnabled) {
      return { ok: false, reason: SAVE_REJECT_REASONS.PRIVATE_MOMENT_PHASE_UNAVAILABLE };
    }
  }
  if (ACT2_CONSENT_PHASES.has(merged.phase) && merged.breakAct !== 0) {
    return { ok: false, reason: SAVE_REJECT_REASONS.ACT2_CONSENT_PHASE_INVALID_BREAK_ACT };
  }

  return { ok: true, value: merged };
}

// `{ ...initialState, ...saved }` is the resume-state migration for a save
// written before packId existed: it simply has no such key, so the spread
// leaves initialState's `DEFAULT_PACK_ID` in place untouched. The
// canonicalization above handles the other case -- a packId/modeId that IS
// present but no longer valid.
function loadSaved() {
  if (typeof window === 'undefined') return null;
  try {
    const result = parseSaved(window.localStorage.getItem(STORAGE_KEY));
    return result.ok ? result.value : null;
  } catch (err) {
    return null;
  }
}

function loadPreferences() {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PREFERENCES_KEY) || '{}');
    return {
      lateNightVisible: parsed?.lateNightVisible === true,
    };
  } catch (err) {
    return DEFAULT_PREFERENCES;
  }
}

function savePreferences(preferences) {
  try {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (err) {
    /* Preferences are optional; the game remains usable without storage. */
  }
}

// This explicit privacy action removes every key written by CLOSER and
// returns to a plain start screen. It is intentionally broader than restart.
function deleteAllLocalData() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(PREFERENCES_KEY);
    window.localStorage.removeItem(INSTALL_HINT_DISMISS_KEY);
  } catch (err) {
    /* ignore */
  }
}

function buzz(pattern) {
  if (typeof window === 'undefined') return;
  if (typeof window.navigator?.vibrate === 'function') {
    try {
      window.navigator.vibrate(pattern);
    } catch (err) {
      /* vibration is a nicety, never a requirement */
    }
  }
}

function clockOf(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export default function CloserGame() {
  const [mounted, setMounted] = useState(false);
  const [resumable, setResumable] = useState(null);
  const [s, setS] = useState(initialState);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  // Screen-local state: none of this is worth persisting.
  const [step, setStep] = useState('ask'); // twist | counting | ask | deeper | deeperOpen
  const [count, setCount] = useState(0);
  const [justDeclined, setJustDeclined] = useState(false);
  const [staying, setStaying] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [beat, setBeat] = useState(0);
  const [now, setNow] = useState(0);
  // A per-second speaking live region would be disruptive, so the countdown
  // only ever announces twice -- once when it starts, once at zero -- via
  // this offscreen polite region, never a per-tick aria-live on the number
  // itself (see Counter below, which stays a plain, non-live element).
  const [announce, setAnnounce] = useState('');
  // Global menu. It is available before setup as well as during play so
  // legal information and discreet content preferences are always reachable.
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuStep, setMenuStep] = useState(null);
  // Focus targets for BF-06/BF-07-adjacent a11y: move focus to the flash
  // message while it's the only interactive content on screen, and to the
  // next question once it lands, rather than leaving focus on a button
  // that's no longer there.
  const flashRef = useRef(null);
  const questionHeadingRef = useRef(null);
  const frameContentRef = useRef(null);

  // Milestone celebrations are transient, decorative, and never persisted
  // or announced as additional content.
  const [pulseStage, setPulseStage] = useState(null);
  const dismissPulse = useCallback(() => {
    setPulseStage(null);
    if (typeof window === 'undefined' || menuOpen) return;
    window.requestAnimationFrame(() => {
      const target = s.phase === 'q'
        ? questionHeadingRef.current
        : frameContentRef.current?.querySelector('button');
      target?.focus();
    });
  }, [menuOpen, s.phase]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const set = useCallback((patch) => setS((prev) => ({ ...prev, ...patch })), []);
  const finish = useCallback(
    (endReason = 'completed') => set({ phase: 'ending', completed: true, endReason }),
    [set]
  );

  const lang = s.lang;
  const t = useCallback((key) => pick(COPY[key], lang), [lang]);
  const tf = useCallback((key, ...args) => COPY[key](lang, ...args), [lang]);

  // Render the server markup first, then look for a saved game, so the static
  // export and the first client render stay identical. The resume screen
  // (and a straight "Continue game") should come back in whatever language
  // the saved game was in, not silently fall back to German -- the language
  // toggle on this screen still lets someone switch before continuing.
  useEffect(() => {
    setPreferences(loadPreferences());
    setMounted(true);
    const saved = loadSaved();
    setResumable(saved);
    if (saved) set({ lang: saved.lang });
  }, [set]);

  // Milestone trigger detection only fires on a phase change that
  // actually happens during this live session, never on whatever phase a
  // resumed/reloaded game happens to land on. pulsePrevPhaseRef starts at
  // null and is set to the current phase on the first run after mount
  // (skipped as a trigger); only phase changes AFTER that count.
  const pulsePrevPhaseRef = useRef(null);
  useEffect(() => {
    if (!mounted) return;
    const prev = pulsePrevPhaseRef.current;
    pulsePrevPhaseRef.current = s.phase;
    if (prev === null || prev === s.phase) return;
    // Start, act completion, a completed private handoff, and the finale are
    // positive milestones. Decline, pass, restart, and early exit never fire.
    if (prev === 'act' && s.phase === 'q' && s.qIndex === 0) {
      setPulseStage('start');
    } else if (s.phase === 'break' && s.breakAct === 0) {
      setPulseStage('actI');
    } else if (s.phase === 'break' && s.breakAct === 1) {
      setPulseStage('actII');
    } else if (prev === 'secretPassBack' && s.phase === 'q') {
      setPulseStage('secret');
    } else if (prev !== 'ending' && s.phase === 'ending' && s.endReason === 'completed') {
      setPulseStage('finale');
    }
  }, [mounted, s.phase, s.breakAct, s.qIndex, s.endReason]);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (s.completed) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else if (s.hasStarted && s.phase !== 'start') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      }
    } catch (err) {
      /* private mode, quota, whatever -- the game still works */
    }
  }, [s, mounted]);

  // Keep the shared phone awake during a real run, never during setup.
  const wakeRef = useRef(null);
  useEffect(() => {
    const playing = mounted && s.hasStarted && !s.completed;
    if (!playing || typeof navigator === 'undefined' || !navigator.wakeLock) return undefined;
    let cancelled = false;

    const requestWakeLock = () => {
      if (cancelled || document.visibilityState !== 'visible') return;
      if (wakeRef.current && !wakeRef.current.released) return;
      navigator.wakeLock
        .request('screen')
        .then((lock) => {
          if (cancelled) lock.release().catch(() => {});
          else wakeRef.current = lock;
        })
        .catch(() => {});
    };

    requestWakeLock();
    document.addEventListener('visibilitychange', requestWakeLock);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', requestWakeLock);
      wakeRef.current?.release().catch(() => {});
      wakeRef.current = null;
    };
  }, [mounted, s.hasStarted, s.completed]);

  // CLOSER switches language within the same route, so the static lang
  // attribute _document.js sets at build time can't track it -- keep it
  // honest for screen readers and translation tools.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';
  }, [lang]);

  /*
   * Count active conversation time, not wall time. The clock runs only while
   * a question is visible, the document is visible, and no dialog or
   * celebration is covering it. `actElapsedMs` is persisted; the in-memory
   * segment start (`runningSince`) is not, so a resumed game always starts
   * paused. The running segment is periodically checkpointed into
   * `actElapsedMs` rather than only flushed when it ends -- see
   * ACTIVE_SEGMENT_CHECKPOINT_MS and BUG-009.
   */
  const [runningSince, setRunningSince] = useState(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const timerRunning =
    s.timerEnabled && s.phase === 'q' && visible && !menuOpen && !pulseStage;

  // BUG-009: the running segment previously folded into persisted
  // actElapsedMs only when it ended (visibility loss, menu open, phase
  // change). An abrupt kill in between -- a crash, an OS-level app-switcher
  // kill, or a background suspension too fast for a normal React render to
  // catch up with -- lost the whole unflushed segment. A short periodic
  // checkpoint bounds that loss to a few seconds instead. `pagehide` is
  // added on top because it can fire closer to an actual termination than
  // `visibilitychange` guarantees on every platform; `beforeunload` is
  // deliberately not used since it is unreliable on mobile and disables the
  // back/forward cache. Both paths call the same idempotent flush, so
  // whichever fires first "wins" and a later call commits zero extra time.
  useEffect(() => {
    if (!timerRunning) return undefined;
    const segmentRef = { current: Date.now() };
    setRunningSince(segmentRef.current);
    const displayId = setInterval(() => setNow(Date.now()), 1000);
    setNow(Date.now());

    const flush = () => {
      const flushedAt = Date.now();
      const ran = flushedAt - segmentRef.current;
      segmentRef.current = flushedAt;
      setRunningSince(flushedAt);
      if (ran > 0) {
        setS((prev) => ({ ...prev, actElapsedMs: (prev.actElapsedMs || 0) + ran }));
      }
    };

    const checkpointId = setInterval(flush, ACTIVE_SEGMENT_CHECKPOINT_MS);
    window.addEventListener('pagehide', flush);

    return () => {
      clearInterval(displayId);
      clearInterval(checkpointId);
      window.removeEventListener('pagehide', flush);
      flush();
      setRunningSince(null);
    };
  }, [timerRunning]);

  // Compile every behavior-defining selection once. Runtime question order,
  // act boundaries, timing, private-moment placement and fingerprinting now
  // share this immutable definition instead of resolving parallel helpers.
  const run = useMemo(
    () => compileRun(s.packId, s.routeId, s.modeId),
    [s.packId, s.routeId, s.modeId]
  );
  const pack = getPack(run.packId);
  const route = getRoute(run.packId, run.routeId);
  const acts = run.acts;
  const total = run.questions.length;
  // Private resolution, finale, and ending share the last act's look.
  const finalStyle = pack.actStyle[pack.actStyle.length - 1];

  const mode = useMemo(
    () => pack.modes.find((m) => m.id === run.modeId) || pack.modes[0],
    [pack, run.modeId]
  );
  const actIdx = actIndexAt(run, s.qIndex);
  const style = pack.actStyle[actIdx];
  const question = run.questions[s.qIndex]?.content || null;
  const isLast = s.qIndex === total - 1;

  const nameOf = useCallback(
    (i) =>
      (s.players[i] || '').trim() || (i === 0 ? t('playerOne') : t('playerTwo')),
    [s.players, t]
  );

  // Strict alternation, so the same person never has to open twice running.
  const starter = starterFor(s.qIndex, s.starterOffset);

  const twist = question?.twist && mode.twists[question.twist] ? question.twist : null;
  const canStay = Boolean(question?.stayEnabled && mode.twists.stay);

  const enterQuestion = useCallback((index, state) => {
    const nextRun = compileRun(state.packId, state.routeId, state.modeId);
    const p = getPack(nextRun.packId);
    const q = nextRun.questions[index]?.content || null;
    const m = p.modes.find((x) => x.id === nextRun.modeId) || p.modes[0];
    const tw = q?.twist && m.twists[q.twist] ? q.twist : null;
    // 'deeper' is a post-answer twist; the rest open with a lead-in screen.
    setStep(tw && tw !== 'deeper' ? 'twist' : 'ask');
    setJustDeclined(false);
    setStaying(false);
    // Clear any countdown announcement before the next question can repeat it.
    setAnnounce('');
  }, []);

  /*
   * Everything between questions routes through here. Act breaks, the secret
   * question and the staged last question all interrupt on the way past.
   */
  const goTo = useCallback(
    (index, patch = {}) => {
      const base = { ...s, ...patch };
      const nextRun = compileRun(base.packId, base.routeId, base.modeId);
      const destination = resolveQuestionDestination(nextRun, base, index);

      if (destination.effect === QUESTION_DESTINATION_EFFECTS.ACT_BREAK) {
        buzz([18, 60, 18]);
      } else if (destination.effect === QUESTION_DESTINATION_EFFECTS.LAST_QUESTION) {
        buzz(20);
      }

      set({ ...patch, ...destination.patch });
      if (destination.effect === QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION) {
        enterQuestion(index, base);
      }
    },
    [s, set, enterQuestion]
  );

  const leaveQuestion = useCallback(() => {
    if (twist === 'deeper' && step !== 'deeper' && step !== 'deeperOpen') {
      setStep('deeper');
      return;
    }
    goTo(s.qIndex + 1);
  }, [twist, step, goTo, s.qIndex]);

  // BOTH / NO THINKING lead-in count. The question itself is already on
  // screen for the whole count -- see the 'counting' step below -- so this
  // only ever gates when answering starts, never whether the question is
  // known yet.
  const countRef = useRef(null);
  const flipRef = useRef(null);
  const runCountdown = useCallback((from) => {
    setCount(from);
    setStep('counting');
    setAnnounce(tf('countdownStart', from));
    clearInterval(countRef.current);
    countRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(countRef.current);
          buzz(20);
          // A beat on zero -- long enough to register as "now", short enough
          // not to feel like a pause -- before the question screen's own
          // controls (Next, Stay, Pass) become available.
          clearTimeout(flipRef.current);
          flipRef.current = setTimeout(() => setStep('ask'), 400);
          setAnnounce(t('countdownGo'));
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [t, tf]);

  const passQuestion = useCallback(() => {
    clearInterval(countRef.current);
    clearTimeout(flipRef.current);
    setAnnounce('');
    buzz(14);
    setJustDeclined(true);
  }, []);
  useEffect(() => () => {
    clearInterval(countRef.current);
    clearTimeout(flipRef.current);
  }, []);

  // Passing is free and unlimited. A brief neutral beat prevents an
  // accidental double-tap from advancing more than one question.
  useEffect(() => {
    if (!justDeclined) return undefined;
    const id = setTimeout(() => {
      setJustDeclined(false);
      goTo(s.qIndex + 1);
    }, 1600);
    return () => clearTimeout(id);
  }, [justDeclined, goTo, s.qIndex]);

  // The standard closing sequence plays itself out one line at a time.
  // A declined consent gate uses a dedicated neutral ending instead.
  useEffect(() => {
    if (
      s.phase !== 'ending' ||
      s.endReason === 'consentDeclined' ||
      pulseStage ||
      beat >= ENDING_BEATS.length - 1
    ) return undefined;
    const id = setTimeout(() => setBeat((b) => b + 1), 2000);
    return () => clearTimeout(id);
  }, [s.phase, s.endReason, beat, pulseStage]);

  const [revealSecond, setRevealSecond] = useState(false);
  useEffect(() => {
    if (s.phase !== 'all36') return undefined;
    setRevealSecond(false);
    const id = setTimeout(() => setRevealSecond(true), 1600);
    return () => clearTimeout(id);
  }, [s.phase]);

  const restart = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
    setResumable(null);
    setConfirmReset(false);
    setBeat(0);
    setStep('ask');
    // A restart must not carry a stale countdown announcement into a new run.
    setAnnounce('');
    setMenuOpen(false);
    setMenuStep(null);
    setStaying(false);
    setS((prev) => createInitialState({
      lang: prev.lang,
      packId:
        prev.packId === 'late-night' && !preferences.lateNightVisible
          ? DEFAULT_PACK_ID
          : prev.packId,
      routeId: prev.routeId,
      timerEnabled: prev.timerEnabled,
    }));
  }, [preferences.lateNightVisible]);

  // While the pass flash is the only content, move focus to its message.
  useEffect(() => {
    if (justDeclined && flashRef.current) {
      flashRef.current.focus();
    }
  }, [justDeclined]);

  // Once a new question lands, move focus onto it for every
  // transition into a question (a fresh skip/decline, an act break, a
  // secret-question handoff, resuming), not just the flash case above.
  useEffect(() => {
    if (s.phase === 'q' && step === 'ask' && questionHeadingRef.current) {
      questionHeadingRef.current.focus();
    }
  }, [s.phase, s.qIndex, step]);

  // Persisted time plus the segment currently in progress.
  const elapsed =
    (s.actElapsedMs || 0) + (runningSince && now ? Math.max(0, now - runningSince) : 0);
  // The selected route owns the time promise; use the same per-act allocation
  // as the route copy so slow, reflective packs and fast, playful packs do not
  // inherit CLASSIC's pacing by accident.
  const actMs = run.timing.actMinutes[actIdx] * 60 * 1000;
  const overtime = s.timerEnabled && elapsed > actMs;
  const pct = Math.round((s.qIndex / (total - 1)) * 100);

  const handleDeleteLocalData = () => {
    deleteAllLocalData();
    setPreferences(DEFAULT_PREFERENCES);
    setResumable(null);
    setMenuOpen(false);
    setMenuStep(null);
    setS(createInitialState({ lang: s.lang }));
  };

  const setLateNightVisible = (visible) => {
    const nextPreferences = { ...preferences, lateNightVisible: visible };
    setPreferences(nextPreferences);
    savePreferences(nextPreferences);

    // Hiding the pack during setup must not leave an invisible selection
    // active. An already-started or resumable LATE NIGHT run remains valid.
    if (!visible && !s.hasStarted && s.packId === 'late-night') {
      const fallback = getPack(DEFAULT_PACK_ID);
      set({
        phase: s.phase === 'pack' ? 'pack' : 'start',
        packId: fallback.id,
        routeId: fallback.defaultRouteId || DEFAULT_ROUTE_ID,
        modeId: fallback.modes[0].id,
      });
    }
  };

  // Every menu view has its own dialog title. CloserDialog owns the heading
  // and updates focus whenever a subview replaces the menu root.
  const menuTitle = {
    null: t('menuTitle'),
    end: t('menuEndConfirm'),
    restart: t('startOverConfirm'),
    delete: t('deleteLocalDataConfirm'),
    additional: t('menuAdditionalContentTitle'),
    imprint: LEGAL_TITLES.imprint[lang],
    privacy: LEGAL_TITLES.privacy[lang],
  }[menuStep ?? 'null'];

  const menuOverlay = (
    <>
      <MenuTrigger
        type="button"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        onClick={() => { setMenuStep(null); setMenuOpen(true); }}
      >
        {t('menuOpen')}
      </MenuTrigger>
      {menuOpen && (
        <CloserDialog
          title={menuTitle}
          viewKey={menuStep ?? 'root'}
          onClose={() => setMenuOpen(false)}
        >
          <>
            {menuStep === null && (
              <>
                {s.phase !== 'start' && (
                  <Toggle
                    $on={s.timerEnabled}
                    $accent={style.accent}
                    aria-pressed={s.timerEnabled}
                    onClick={() => set({ timerEnabled: !s.timerEnabled })}
                  >
                    {t('timer')}
                    <b>{s.timerEnabled ? t('on') : t('off')}</b>
                  </Toggle>
                )}
                {s.phase !== 'start' && (
                  <div style={{ marginTop: '2rem' }}>
                    <GhostButton onClick={() => setMenuStep('restart')}>
                      {t('menuRestart')}
                    </GhostButton>
                  </div>
                )}
                {s.hasStarted && (
                  <div style={{ marginTop: '1.2rem' }}>
                    <GhostButton onClick={() => setMenuStep('end')}>{t('menuEnd')}</GhostButton>
                  </div>
                )}
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => setMenuStep('additional')}>
                    {t('menuAdditionalContent')}
                  </GhostButton>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => setMenuStep('privacy')}>
                    {t('menuPrivacy')}
                  </GhostButton>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => setMenuStep('imprint')}>
                    {t('menuImprint')}
                  </GhostButton>
                </div>
                <TextButton style={{ width: '100%', marginTop: '1.6rem' }} onClick={() => setMenuStep('delete')}>
                  {t('deleteLocalData')}
                </TextButton>
                <TextButton style={{ width: '100%' }} onClick={() => setMenuOpen(false)}>
                  {t('menuClose')}
                </TextButton>
              </>
            )}
            {menuStep === 'end' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('menuEndSub')}</Small>
                <Button
                  $accent={style.accent}
                  onClick={() => {
                    setMenuOpen(false);
                    setMenuStep(null);
                    finish('userEnded');
                  }}
                >
                  {t('menuEnd')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => setMenuStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {menuStep === 'restart' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('startOverWarn')}</Small>
                <Button $accent={style.accent} onClick={restart}>
                  {t('startOver')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => setMenuStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {menuStep === 'delete' && (
              <>
                <Small style={{ marginBottom: '2.4rem' }}>{t('deleteLocalDataSub')}</Small>
                <Button $accent={style.accent} onClick={handleDeleteLocalData}>
                  {t('deleteLocalData')}
                </Button>
                <TextButton style={{ width: '100%' }} onClick={() => setMenuStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {menuStep === 'additional' && (
              <>
                <Small style={{ marginBottom: '1.4rem' }}>{t('lateNightMenuIntro')}</Small>
                <Small style={{ marginBottom: '2.4rem' }}>
                  {preferences.lateNightVisible ? t('lateNightShown') : t('lateNightHidden')}
                </Small>
                <GhostButton
                  onClick={() => setLateNightVisible(!preferences.lateNightVisible)}
                >
                  {preferences.lateNightVisible ? t('lateNightHide') : t('lateNightShow')}
                </GhostButton>
                <TextButton style={{ width: '100%' }} onClick={() => setMenuStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
            {(menuStep === 'imprint' || menuStep === 'privacy') && (
              <>
                <CloserLegal view={menuStep} lang={lang} accent={style.accent} />
                <TextButton style={{ width: '100%', marginTop: '1.6rem' }} onClick={() => setMenuStep(null)}>
                  {t('goBack')}
                </TextButton>
              </>
            )}
          </>
        </CloserDialog>
      )}
    </>
  );

  // Covered whenever something else owns the screen: the milestone
  // celebration, or the menu dialog. menuOverlay renders as FrameContent's
  // sibling, not its child, so this only hides what's actually behind it --
  // it also stops an ambiguous accessible name behind the dialog (e.g. a
  // setup screen's own "Go back") from matching alongside the dialog's own
  // control of the same name.
  const contentCovered = Boolean(pulseStage) || menuOpen;

  const frame = (content, opts = {}) => (
    <Screen $accent={opts.accent || style.accent} $glow={opts.glow ?? style.glow}>
      <CloserGlobal />
      <FrameContent
        ref={frameContentRef}
        $blocked={contentCovered}
        inert={contentCovered ? '' : undefined}
        aria-hidden={contentCovered ? 'true' : undefined}
        data-testid="closer-frame-content"
      >
        {content}
      </FrameContent>
      {opts.menu && menuOverlay}
      {pulseStage && (
        <ClosePulse
          stage={pulseStage}
          accent={opts.accent || style.accent}
          label={tf('milestoneLabel', pulseStage)}
          detail={tf('milestoneDetail', pulseStage)}
          reducedMotion={prefersReducedMotion}
          onDone={dismissPulse}
        />
      )}
    </Screen>
  );

  const A0 = pack.actStyle[0].accent;

  // Only a person who actually formed a saved question gets the private
  // "did they ask it?" check after "that's all 36" -- someone who chose
  // "Heute keine" has nothing to ask about, so their checkPass/check screens
  // are skipped entirely rather than asking a question that can't apply.
  const privateMomentEnabled = run.routeId !== 'quick' && run.privateMoment !== 'none';

  const dispatchSetup = (event) => {
    const patch = transitionSetup(run, s, event);
    if (patch) set(patch);
  };
  const dispatchConsent = (event) => {
    const patch = transitionConsent(run, s, event);
    if (patch) set(patch);
  };
  const dispatchAct = (event) => {
    const result = transitionAct(run, s, event);
    if (!result) return;
    if (result.effect === ACT_EFFECTS.ENTER_QUESTION) {
      const next = { ...s, ...result.patch };
      buzz(16);
      setS(next);
      enterQuestion(next.qIndex, next);
      return;
    }
    set(result.patch);
  };
  const dispatchPrivateMoment = (event) => {
    const result = transitionPrivateMoment(run, s, event);
    if (!result) return;
    if (result.effect === PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION) {
      const next = { ...s, ...result.patch };
      setS(next);
      enterQuestion(next.qIndex, next);
      return;
    }
    set(result.patch);
  };
  const dispatchQ37 = (event) => {
    const patch = transitionQ37(run, s, event);
    if (patch) set(patch);
  };

  /* ================================================================== */
  /* START                                                              */
  /* ================================================================== */

  if (!mounted || s.phase === 'start') {
    if (confirmReset) {
      return frame(
        <>
          <Body $center>
            <Question>{t('startOverConfirm')}</Question>
            <Lede style={{ marginTop: '2.4rem' }}>{t('startOverWarn')}</Lede>
          </Body>
          <Foot>
            <Button $accent={A0} onClick={restart}>
              {t('startOver')}
            </Button>
            <TextButton onClick={() => setConfirmReset(false)}>{t('goBack')}</TextButton>
          </Foot>
        </>,
        { accent: A0, glow: 0.3, menu: true }
      );
    }
    return frame(
      <>
        <LangSwitch $accent={A0}>
          {LANGS.map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => set({ lang: l })}>
              {l}
            </button>
          ))}
        </LangSwitch>
        <Body $center>
          <Wordmark>CLOSER</Wordmark>
          <Lede>{t('tagline')}</Lede>
        </Body>
        <Foot>
          {mounted && resumable ? (
            <>
              <Small style={{ textAlign: 'center' }}>{t('welcomeBack')}</Small>
              <Button
                $accent={A0}
                onClick={() => {
                  const r = { ...resumable, lang };
                  setS(r);
                  setResumable(null);
                  if (r.phase === 'q') enterQuestion(r.qIndex, r);
                }}
              >
                {t('continueGame')}
              </Button>
              <TextButton onClick={() => setConfirmReset(true)}>{t('startOver')}</TextButton>
            </>
          ) : (
            <>
              <Button
                $accent={A0}
                onClick={() => dispatchSetup({ type: SETUP_EVENTS.START_SETUP })}
              >
                {t('start')}
              </Button>
              <Small style={{ textAlign: 'center' }}>{t('aboutMinutes')}</Small>
            </>
          )}
        </Foot>
        <CloserInstallHint lang={lang} accent={A0} />
      </>,
      { accent: A0, glow: 0.3, menu: true }
    );
  }

  /*
   * FR-007: internal Back navigation through setup. Choices already made
   * (players, packId, routeId, modeId) are never cleared by a phase change
   * alone, so stepping back and then forward again shows them exactly as
   * left. The reverse mapping mirrors each forward transition's own
   * singleton-skip logic (the style screen is skipped whenever a pack has
   * only one style) so Back never lands on a screen that would immediately
   * skip itself.
   *
   * Deliberately no Back button on 'intro' for a pack with a consent gate:
   * that 'intro' is only ever reached after both required consent
   * confirmations, and reversing into that flow is a distinct, safety-
   * sensitive concern this feature does not take on.
   */
  const goBackFromSetup = () => dispatchSetup({ type: SETUP_EVENTS.BACK });

  /* ================================================================== */
  /* PLAYER SETUP                                                       */
  /* ================================================================== */

  if (s.phase === 'players') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('whosPlaying')}</Kicker>
          <Field $accent={A0}>
            <span>{t('yourName')}</span>
            <input
              value={s.players[0]}
              maxLength={18}
              autoComplete="off"
              onChange={(e) => set({ players: [e.target.value, s.players[1]] })}
            />
          </Field>
          <Field $accent={A0}>
            <span>{t('theirName')}</span>
            <input
              value={s.players[1]}
              maxLength={18}
              autoComplete="off"
              onChange={(e) => set({ players: [s.players[0], e.target.value] })}
            />
          </Field>
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() => dispatchSetup({
              type: SETUP_EVENTS.CONTINUE,
              starterOffset: Math.random() < 0.5 ? 0 : 1,
            })}
          >
            {t('continue')}
          </Button>
          <TextButton onClick={goBackFromSetup}>{t('goBack')}</TextButton>
          <Small style={{ textAlign: 'center' }}>{t('namesOptional')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* PACK                                                              */
  /* ================================================================== */

  if (s.phase === 'pack') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickPack')}</Kicker>
          <CloserChoiceList
            accent={A0}
            items={Object.values(PACKS)
              .filter(
                (p) => p.discoverability !== 'menu-unlock' || preferences.lateNightVisible
              )
              .map((p) => ({
              id: p.id,
              selected: s.packId === p.id,
              title: pick(p.title, lang),
              meta: pick(p.meta, lang),
              blurb: pick(p.blurb, lang),
              onSelect: () =>
                set({
                  packId: p.id,
                  routeId: p.defaultRouteId || DEFAULT_ROUTE_ID,
                  modeId: p.modes[0].id,
                }),
              }))}
          />
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() => dispatchSetup({ type: SETUP_EVENTS.CONTINUE })}
          >
            {t('continue')}
          </Button>
          <TextButton onClick={goBackFromSetup}>{t('goBack')}</TextButton>
        </Foot>
      </>,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* DURATION / ROUTE                                                  */
  /* ================================================================== */

  if (s.phase === 'duration') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickDuration')}</Kicker>
          <CloserChoiceList
            accent={A0}
            items={Object.values(pack.routes).map((r) => ({
              id: r.id,
              selected: s.routeId === r.id,
              title: pick(r.title, lang),
              meta: pick(r.meta, lang),
              blurb: pick(routeSubtitleFor(s.packId, r.id), lang),
              onSelect: () => set({ routeId: r.id }),
            }))}
          />
          <Toggle
            $on={s.timerEnabled}
            $accent={A0}
            aria-pressed={s.timerEnabled}
            onClick={() => set({ timerEnabled: !s.timerEnabled })}
          >
            {t('timer')}
            <b>{s.timerEnabled ? t('on') : t('off')}</b>
          </Toggle>
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() => dispatchSetup({ type: SETUP_EVENTS.CONTINUE })}
          >
            {t('continue')}
          </Button>
          <TextButton onClick={goBackFromSetup}>{t('goBack')}</TextButton>
        </Foot>
      </>,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* MODE                                                               */
  /* ================================================================== */

  if (s.phase === 'mode') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickMode')}</Kicker>
          {/* Route scope and time are shown here; style copy stays independent
              of a fixed question count or duration. */}
          <Small style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {pick(route.title, lang)} · {pick(routeSubtitleFor(s.packId, route.id), lang)}
          </Small>
          <CloserChoiceList
            accent={A0}
            items={pack.modes.map((m) => ({
              id: m.id,
              selected: s.modeId === m.id,
              title: pick(m.title, lang),
              meta: pick(m.meta, lang),
              blurb: pick(m.blurb, lang),
              onSelect: () => set({ modeId: m.id }),
            }))}
          />
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() => dispatchSetup({ type: SETUP_EVENTS.CONTINUE })}
          >
            {t('continue')}
          </Button>
          <TextButton onClick={goBackFromSetup}>{t('goBack')}</TextButton>
        </Foot>
      </>,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* CONSENT GATE — both people decide privately before entry            */
  /* ================================================================== */

  if (s.phase === 'consentGatePassA' || s.phase === 'consentGatePassB') {
    const who = s.phase === 'consentGatePassA' ? 0 : 1;
    return frame(
      <CloserHandoff
        accent={A0}
        kicker={tf('passPhoneTo', nameOf(who))}
        action={tf('iAm', nameOf(who))}
        onAction={() => dispatchConsent({ type: CONSENT_EVENTS.HANDOFF_CONFIRMED })}
      />,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  if (s.phase === 'consentGateA' || s.phase === 'consentGateB') {
    const me = s.phase === 'consentGateA' ? 0 : 1;
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{tf('forOnly', nameOf(me))}</Kicker>
          <Lede>{pick(pack.consentGate.notice, lang)}</Lede>
        </Body>
        <Foot>
          <Row>
            <GhostButton
              onClick={() => dispatchConsent({ type: CONSENT_EVENTS.CONFIRM_CONSENT })}
            >
              {t('consentAgree')}
            </GhostButton>
            <GhostButton
              onClick={() => dispatchConsent({ type: CONSENT_EVENTS.DECLINE_CONSENT })}
            >
              {t('endHere')}
            </GhostButton>
          </Row>
        </Foot>
      </>,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* INTRO                                                              */
  /* ================================================================== */

  if (s.phase === 'intro') {
    return frame(
      <>
        <Body $center>
          <Lede>{pick(pack.positioning || pack.blurb, lang)}</Lede>
          <Lede style={{ marginTop: '3.2rem' }}>{t('introLines')}</Lede>
          <Lede style={{ marginTop: '3.2rem' }}>{t('introPass')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() => dispatchSetup({ type: SETUP_EVENTS.BEGIN_RUN })}
          >
            {t('begin')}
          </Button>
          {/* No Back button when a consent gate is involved -- this
              screen is only reached after both required confirmations;
              see goBackFromSetup()'s own comment. */}
          {!pack.consentGate && (
            <TextButton onClick={goBackFromSetup}>{t('goBack')}</TextButton>
          )}
          <Small style={{ textAlign: 'center' }}>{t('privacy')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.24, menu: true }
    );
  }

  /* ================================================================== */
  /* ACT INTRO / BREAK                                                  */
  /* ================================================================== */

  if (s.phase === 'act') {
    const idx = actIndexAt(run, s.pending);
    const act = acts[idx];
    const st = pack.actStyle[idx];
    return frame(
      <>
        <Body $center>
          <ActNumeral>{pick(act.numeral, lang)}</ActNumeral>
          <ActTitle $accent={st.accent}>{pick(act.title, lang)}</ActTitle>
          <Lede>{pick(act.intro, lang)}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => dispatchAct({ type: ACT_EVENTS.START_ACT })}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow + 0.1, menu: true }
    );
  }

  if (s.phase === 'break') {
    const done = acts[s.breakAct];
    const st = pack.actStyle[s.breakAct];
    return frame(
      <>
        <Body $center>
          <ActNumeral>
            {pick(done.numeral, lang)} {t('complete')}
          </ActNumeral>
          <ActTitle $accent={st.accent} style={{ fontSize: '3.2rem', marginBottom: '3.2rem' }}>
            {pick(done.title, lang)}
          </ActTitle>
          <Lede>{pick(done.breakText, lang)}</Lede>
          {done.breakSub && (
            <Lede style={{ marginTop: '2rem' }}>{pick(done.breakSub, lang)}</Lede>
          )}
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => dispatchAct({ type: ACT_EVENTS.CONTINUE_FROM_BREAK })}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  /* ================================================================== */
  /* CONSENT GATE — renewed private opt-in before Act II                 */
  /* ================================================================== */

  if (s.phase === 'consentAct2PassA' || s.phase === 'consentAct2PassB') {
    const who = s.phase === 'consentAct2PassA' ? 0 : 1;
    const st = pack.actStyle[1];
    return frame(
      <CloserHandoff
        accent={st.accent}
        kicker={tf('passPhoneTo', nameOf(who))}
        action={tf('iAm', nameOf(who))}
        onAction={() => dispatchConsent({ type: CONSENT_EVENTS.HANDOFF_CONFIRMED })}
      />,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  if (s.phase === 'consentAct2A' || s.phase === 'consentAct2B') {
    const me = s.phase === 'consentAct2A' ? 0 : 1;
    const st = pack.actStyle[1];
    return frame(
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{tf('forOnly', nameOf(me))}</Kicker>
          <Lede>{pick(pack.consentGate.act2OptIn, lang)}</Lede>
        </Body>
        <Foot>
          <Row>
            <GhostButton
              onClick={() => dispatchConsent({ type: CONSENT_EVENTS.CONFIRM_CONSENT })}
            >
              {t('consentAgree')}
            </GhostButton>
            <GhostButton
              onClick={() => dispatchConsent({ type: CONSENT_EVENTS.DECLINE_CONSENT })}
            >
              {t('endHere')}
            </GhostButton>
          </Row>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  /* ================================================================== */
  /* SECRET QUESTION                                                    */
  /* ================================================================== */

  if (s.phase.startsWith('secret')) {
    const st = finalStyle;
    const p = s.phase;

    if (p === 'secretPass1' || p === 'secretPass2') {
      const who = p === 'secretPass1' ? 0 : 1;
      return frame(
        <CloserHandoff
          accent={st.accent}
          kicker={p === 'secretPass1' ? tf('passPhoneTo', nameOf(0)) : t('passPhone')}
          body={
            p === 'secretPass2'
              ? tf('passPhoneText', nameOf(1), s.hasSecretQuestion[0] === true)
              : null
          }
          action={p === 'secretPass1' ? tf('iAm', nameOf(0)) : t('done')}
          onAction={() => dispatchPrivateMoment({
            type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
          })}
        />,
        { accent: st.accent, glow: st.glow, menu: true }
      );
    }

    if (p === 'secret1' || p === 'secret2') {
      const me = p === 'secret1' ? 0 : 1;
      // Declining a saved question is an equal choice. Both actions advance the phone-
      // handoff sequence identically; only hasSecretQuestion[me] differs,
      // which later decides whether this person gets a private check-in
      // screen after "that's all 36" and whether Question 37 treats their
      // slot as pending.
      const choose = (hasQuestion) => dispatchPrivateMoment({
        type: PRIVATE_MOMENT_EVENTS.SET_PRIVATE_QUESTION,
        hasQuestion,
      });
      return frame(
        <>
          <Body $center>
            <Kicker $accent={st.accent}>{tf('forOnly', nameOf(me))}</Kicker>
            <Lede>{tf('secretTask', nameOf(1 - me))}</Lede>
          </Body>
          <Foot>
            <Button $accent={st.accent} onClick={() => choose(true)}>
              {t('iHaveOne')}
            </Button>
            <TextButton onClick={() => choose(false)}>{t('noSecretToday')}</TextButton>
          </Foot>
        </>,
        { accent: st.accent, glow: st.glow, menu: true }
      );
    }

    // secretPassBack
    return frame(
      <CloserHandoff
        accent={st.accent}
        kicker={t('passPhoneBack')}
        body={t('passPhoneBackText')}
        action={t('continue')}
        onAction={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
        })}
      />,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  /* ================================================================== */
  /* LAST QUESTION STAGING                                              */
  /* ================================================================== */

  if (s.phase === 'lastIntro') {
    return frame(
      <>
        <Body $center>
          <Question>{t('oneLastQuestion')}</Question>
        </Body>
        <Foot>
          <GhostButton
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index };
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('reveal')}
          </GhostButton>
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  if (s.phase === 'all36') {
    const secretCount = s.hasSecretQuestion.filter((value) => value === true).length;
    const isQuick = route.id === 'quick';
    return frame(
      <>
        <Body $center>
          <Question>{tf('allThirtySix', total)}</Question>
          {revealSecond && privateMomentEnabled && secretCount > 0 && (
            <Lede style={{ marginTop: '3.2rem' }}>{tf('secretSummary', secretCount)}</Lede>
          )}
        </Body>
        <Foot>
          {revealSecond && (
            <GhostButton
              onClick={() => dispatchPrivateMoment({
                type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
              })}
            >
              {isQuick ? t('end') : t('continue')}
            </GhostButton>
          )}
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  /* ================================================================== */
  /* SECRET QUESTION RESOLUTION                                         */
  /* ================================================================== */

  // The phone is lying between both of them again after "that's all 36" --
  // each private check needs its own handoff first, same as capturing the
  // secret questions did, or the check isn't actually private.
  if (s.phase === 'checkPass1' || s.phase === 'checkPass2') {
    const who = s.phase === 'checkPass1' ? 0 : 1;
    return frame(
      <CloserHandoff
        accent={finalStyle.accent}
        kicker={tf('passPhoneTo', nameOf(who))}
        action={tf('iAm', nameOf(who))}
        onAction={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
        })}
      />,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  if (s.phase === 'checkPassBack') {
    return frame(
      <CloserHandoff
        accent={finalStyle.accent}
        kicker={t('passPhoneBack')}
        body={t('passPhoneBackText')}
        action={t('continue')}
        onAction={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
        })}
      />,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  if (s.phase === 'check1' || s.phase === 'check2') {
    const me = s.phase === 'check1' ? 0 : 1;
    const answer = (asked) => dispatchPrivateMoment({
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED,
      asked,
    });
    return frame(
      <>
        <Body $center>
          <Kicker>{tf('forOnly', nameOf(me))}</Kicker>
          <Question>{tf('didYouAsk', nameOf(1 - me))}</Question>
        </Body>
        <Foot>
          <Row>
            <GhostButton onClick={() => answer(true)}>{t('yes')}</GhostButton>
            <GhostButton onClick={() => answer(false)}>{t('no')}</GhostButton>
          </Row>
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  /* ================================================================== */
  /* QUESTION 37                                                        */
  /* ================================================================== */

  if (s.phase === 'q37intro' || s.phase === 'q37' || s.phase === 'q37a' || s.phase === 'q37b') {
    const finaleLabel = route.id === 'full' ? t('q37Label') : t('finalQuestionLabel');
    const finaleButton = route.id === 'full' ? t('q37Button') : t('finalQuestionButton');
    // Exactly one person's question went unasked -- that person asks it now.
    // A person who declined to save a question never counts as
    // "still waiting" for a question that was never formed.
    const { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion } = classifySecretAsked(
      s.secretAsked,
      s.hasSecretQuestion
    );

    if (s.phase === 'q37intro') {
      let kicker = t('q37OneMore');
      let text = pick(pack.q37.neither, lang);
      if (!privateMomentEnabled) {
        text = t('q37StillWantOne');
      } else if (noneHaveSecretQuestion) {
        kicker = t('q37NoSecretQuestions');
        text = t('q37NoSecretQuestionsText');
      } else if (bothAsked) {
        kicker = t('q37AlreadyAsked');
        text = t('q37StillWantOne');
      } else if (!neither) {
        kicker = t('q37OneRemains');
        text = t('q37OneText');
      }
      return frame(
        <>
          <Body $center>
            <Kicker>{kicker}</Kicker>
            <Question>{text}</Question>
          </Body>
          <Foot>
            {bothAsked || noneHaveSecretQuestion || !privateMomentEnabled ? (
              // Nobody has a secret question waiting either way here --
              // "bothAsked" offers the ordinary bonus prompt, and so does
              // "noneHaveSecretQuestion" (there's nothing secret-question-
              // specific left to offer instead).
              <Row>
                <GhostButton onClick={() => dispatchQ37({ type: Q37_EVENTS.ACCEPT_FINALE })}>
                  {t('yes')}
                </GhostButton>
                <GhostButton onClick={() => dispatchQ37({ type: Q37_EVENTS.END_OPTIONAL })}>
                  {t('end')}
                </GhostButton>
              </Row>
            ) : (
              // Every finale branch offers an end option because a self-chosen question can be
              // more intimate than anything scripted, so nobody should be
              // funneled toward speaking it just because the UI only ever
              // offered "continue".
              <Row>
                <GhostButton onClick={() => dispatchQ37({ type: Q37_EVENTS.ACCEPT_FINALE })}>
                  {neither ? finaleButton : t('continue')}
                </GhostButton>
                <GhostButton onClick={() => dispatchQ37({ type: Q37_EVENTS.END_OPTIONAL })}>
                  {t('end')}
                </GhostButton>
              </Row>
            )}
          </Foot>
        </>,
        { accent: finalStyle.accent, glow: 0.03, menu: true }
      );
    }

    if (s.phase === 'q37a' || s.phase === 'q37b') {
      // Nobody's question got asked during the game, so there is no
      // "pending player" to anchor on -- continue the same strict
      // alternation the whole game has used, one step past question 36, so
      // the order is fixed rather than a coin flip made twice.
      const opener = starterFor(total, s.starterOffset);
      const asker = s.phase === 'q37a' ? opener : 1 - opener;
      return frame(
        <>
          <Body $center>
            <Kicker>{finaleLabel}</Kicker>
            <Question>{tf('q37AskSecret', nameOf(asker))}</Question>
          </Body>
          <Foot>
            {s.phase === 'q37a' ? (
              // Consent can change between the two people's turns, so the first turn offers
              // "continue" into q37b, with no way to stop before the second
              // person's turn.
              <Row>
                <Button
                  $accent={finalStyle.accent}
                  onClick={() => dispatchQ37({ type: Q37_EVENTS.CONTINUE_SECOND_TURN })}
                >
                  {t('continue')}
                </Button>
                <GhostButton onClick={() => dispatchQ37({ type: Q37_EVENTS.END_OPTIONAL })}>
                  {t('end')}
                </GhostButton>
              </Row>
            ) : (
              <TextButton onClick={() => dispatchQ37({ type: Q37_EVENTS.COMPLETE })}>
                {t('done')}
              </TextButton>
            )}
          </Foot>
        </>,
        { accent: finalStyle.accent, glow: 0.03, menu: true }
      );
    }

    // 'one' and 'both' still land on a single shared prompt -- there is
    // exactly one question left to ask (or, for 'both'/noneHaveSecretQuestion,
    // one optional bonus), so there is nothing to sequence.
    let prompt = pick(pack.q37.both, lang);
    if (privateMomentEnabled && !neither && !bothAsked && !noneHaveSecretQuestion) {
      prompt = pack.q37.one(lang, nameOf(pendingPlayer), nameOf(1 - pendingPlayer));
    }

    return frame(
      <>
        <Body $center>
          <Kicker>{finaleLabel}</Kicker>
          <Question>{prompt}</Question>
        </Body>
        <Foot>
          <TextButton onClick={() => dispatchQ37({ type: Q37_EVENTS.COMPLETE })}>
            {t('done')}
          </TextButton>
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  /* ================================================================== */
  /* ENDING                                                             */
  /* ================================================================== */

  if (s.phase === 'ending') {
    if (s.endReason === 'consentDeclined') {
      return frame(
        <>
          <Body $center>
            <Question>{t('consentDeclinedTitle')}</Question>
            <Lede style={{ marginTop: '2.4rem' }}>{t('consentDeclinedBody')}</Lede>
          </Body>
          <Foot>
            <TextButton onClick={restart}>{t('playAgain')}</TextButton>
          </Foot>
        </>,
        { accent: finalStyle.accent, glow: 0.03, menu: true }
      );
    }

    const isFinal = beat === ENDING_BEATS.length - 1;
    const advance = () => setBeat((b) => b + 1);
    return frame(
      <>
        {/* Keep the live region on a stable wrapper so screen readers detect
            each line change. The explicit footer button provides a keyboard
            equivalent to tapping the body. */}
        <Body $center onClick={() => !isFinal && advance()} aria-live="polite" aria-atomic="true">
          <Question key={beat}>{t(ENDING_BEATS[beat])}</Question>
        </Body>
        <Foot>
          {isFinal ? (
            <>
              <Small style={{ textAlign: 'center', letterSpacing: '.3em' }}>CLOSER</Small>
              <TextButton onClick={restart}>{t('playAgain')}</TextButton>
            </>
          ) : (
            <TextButton onClick={advance}>{t('continue')}</TextButton>
          )}
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: isFinal ? 0.1 : 0.02, menu: true }
    );
  }

  /* ================================================================== */
  /* STAY                                                               */
  /* ================================================================== */

  if (staying) {
    return frame(
      <>
        <Stay>
          <StayDot $accent={style.accent} />
          <Lede style={{ textAlign: 'center' }}>{t('stayTitle')}</Lede>
          <TextButton
            onClick={() => {
              setStaying(false);
              leaveQuestion();
            }}
          >
            {t('continue')}
          </TextButton>
        </Stay>
      </>,
      { accent: style.accent, glow: 0.02, menu: true }
    );
  }

  /* ================================================================== */
  /* QUESTION                                                           */
  /* ================================================================== */

  const questionText = pick(question, lang);

  // While a pass flash is
  // showing, render ONLY the flash -- not the question's own controls
  // (Next/Stay/Pass/decline) underneath it, and not the in-game menu
  // trigger either. Those used to stay mounted, just visually covered by
  // the flash, which left them reachable by keyboard/screen reader (an
  // extra tap or Enter could advance more than one question, racing the
  // flash's own 1.6s auto-advance) and kept them in the accessibility tree
  // during what's meant to be a brief, controls-free beat. Focus moves onto
  // the flash message itself via the effect above.
  if (justDeclined) {
    return frame(
      <Flash>
        <Question ref={flashRef} tabIndex={-1} style={{ textAlign: 'center', outline: 'none' }}>
          {t('passed')}
        </Question>
      </Flash>
    );
  }

  // Whose turn it is reads the same whether the question is still behind a
  // twist screen, mid-countdown, or already the live question -- computed
  // once and reused everywhere, so it never has to agree with itself.
  let badge = (
    <TurnBadge $accent={style.accent}>
      <TurnName $accent={style.accent}>{nameOf(starter)}</TurnName>
      <TurnVerb>{t('turnFirst')}</TurnVerb>
    </TurnBadge>
  );
  if (twist === 'both') {
    badge = (
      <TurnBadge $accent={style.accent}>
        <TurnName $accent={style.accent}>{t('turnBoth')}</TurnName>
        <TurnVerb>{t('turnBothVerb')}</TurnVerb>
      </TurnBadge>
    );
  } else if (twist === 'predict') {
    badge = (
      <TurnBadge $accent={style.accent}>
        <TurnName $accent={style.accent}>{nameOf(starter)}</TurnName>
        <TurnVerb>{t('turnAnswers')}</TurnVerb>
      </TurnBadge>
    );
  }

  let inner;

  if (step === 'twist' && twist === 'both') {
    // BOTH shows the real question right away -- there is nothing to guess
    // and nothing to hide, only a moment to read before answering together.
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('bothLabel')}</TwistLabel>
          {badge}
          <Question>{questionText}</Question>
          <Lede style={{ marginTop: '2.4rem' }}>{t('bothText')}</Lede>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => runCountdown(3)}>
            {t('ready')}
          </Button>
          <TextButton onClick={passQuestion}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'twist') {
    // PREDICT and NO THINKING both still open on an explanation screen,
    // deliberately without the question -- PREDICT because the guess has to
    // come first, NO THINKING because the question is meant to land at the
    // same moment the count starts, not before.
    const copy = {
      predict: {
        label: t('predictLabel'),
        text: tf('predictText', nameOf(1 - starter), nameOf(starter)),
      },
      nothinking: { label: t('nothinkingLabel'), text: t('nothinkingText') },
    }[twist];
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{copy.label}</TwistLabel>
          <Question>{copy.text}</Question>
        </Body>
        <Foot>
          <Button
            $accent={style.accent}
            onClick={() => {
              if (twist === 'predict') setStep('ask');
              else runCountdown(5);
            }}
          >
            {t('ready')}
          </Button>
          <TextButton onClick={passQuestion}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'counting') {
    // The question (and, for NO THINKING, the starter) appears together
    // with the count and stays put through to zero -- nobody answers
    // something they have not seen.
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>
            {twist === 'both' ? t('bothLabel') : t('nothinkingLabel')}
          </TwistLabel>
          {badge}
          <Question>{questionText}</Question>
          {/* role="timer" describes what this is to assistive tech without
              making it a live region -- see the `announce` state above for
              the two announcements that actually get spoken. */}
          <Counter
            $accent={style.accent}
            style={{ marginTop: '3.2rem' }}
            role="timer"
            aria-atomic="true"
          >
            {count}
          </Counter>
        </Body>
        <Foot>
          <TextButton onClick={passQuestion}>{t('declineToAnswer')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'deeper') {
    inner = (
      <>
        <Body $center>
          <TwistLabel $accent={style.accent}>{t('deeperLabel')}</TwistLabel>
          <Question>{t('deeperText')}</Question>
        </Body>
        <Foot>
          <Button $accent={style.accent} onClick={() => setStep('deeperOpen')}>
            {t('deeperAsk')}
          </Button>
          <TextButton onClick={() => goTo(s.qIndex + 1)}>{t('next')}</TextButton>
        </Foot>
      </>
    );
  } else if (step === 'deeperOpen') {
    inner = (
      <>
        <Body $center>
          <Lede>{t('deeperOpen')}</Lede>
        </Body>
        <Foot>
          <GhostButton onClick={() => goTo(s.qIndex + 1)}>{t('continue')}</GhostButton>
        </Foot>
      </>
    );
  } else {
    inner = (
      <>
        <Body $center>
          {!isLast && badge}
          <Question ref={questionHeadingRef} tabIndex={-1} style={{ outline: 'none' }}>
            {questionText}
          </Question>
          {isLast && <Lede style={{ marginTop: '3.2rem' }}>{t('takeYourTime')}</Lede>}
          {/* Response cards are optional listening hints attached to specific questions --
              always visible when present, nothing to tap through, no
              button of its own. See its own note in CloserStyles.js. */}
          {question?.responseCard && (
            <ResponseCard $accent={style.accent}>
              <ResponseCardLabel $accent={style.accent}>
                {pick(question.responseCard.label, lang)}
              </ResponseCardLabel>
              <Small>{pick(question.responseCard.text, lang)}</Small>
            </ResponseCard>
          )}
        </Body>
        <Foot>
          {canStay ? (
            <Row>
              <GhostButton onClick={() => setStaying(true)}>{t('stay')}</GhostButton>
              <Button $accent={style.accent} onClick={leaveQuestion}>
                {t('next')}
              </Button>
            </Row>
          ) : (
            <Button $accent={style.accent} onClick={leaveQuestion}>
              {isLast ? t('done') : t('next')}
            </Button>
          )}
          {/* Free, unlimited and available on the last question too. */}
          <TextButton onClick={passQuestion}>
            {t('declineToAnswer')}
          </TextButton>
        </Foot>
      </>
    );
  }

  const progress = style.progress;
  const showChrome = !isLast && step !== 'counting';

  return frame(
    <>
      {showChrome && (
        <>
          <TopBar $chrome={style.chrome}>
            <Count>
              {progress === 'number'
                ? String(s.qIndex + 1).padStart(2, '0')
                : `${String(s.qIndex + 1).padStart(2, '0')} / ${total}`}
            </Count>
            {s.timerEnabled && s.hasStarted ? (
              <Elapsed $long={overtime}>{overtime ? t('timerOver') : clockOf(elapsed)}</Elapsed>
            ) : null}
          </TopBar>
          {progress === 'full' && (
            <Bar $chrome={style.chrome}>
              <Track $pct={pct} $accent={style.accent} />
            </Bar>
          )}
        </>
      )}

      {inner}

      {/* One polite announcement at the start of a countdown and one at
          zero -- never per tick. This element stays mounted across every
          step of a question (twist/counting/ask/deeper) so its content
          changes are picked up as live-region updates rather than a fresh
          element appearing. */}
      <VisuallyHidden role="status" aria-live="polite">
        {announce}
      </VisuallyHidden>
    </>,
    { menu: true }
  );
}
