import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  CONTENT_VERSION,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  LANGS,
  PACKS,
  actIndexFor,
  actStartIndices,
  classifySecretAsked,
  finalQuestionIndex,
  getPack,
  getRoute,
  pick,
  questionAt,
  resolvedActs,
  routeSubtitleFor,
  routeTimingFor,
  runFingerprintFor,
  runQuestionIdsFor,
  secretAtIndexFor,
  starterFor,
  totalQuestions,
} from '../../constants/closer';
import COPY from '../../constants/closerCopy';
import ClosePulse from './ClosePulse';
import CloserDialog from './CloserDialog';
import CloserInstallHint from './CloserInstallHint';
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
// Must match CloserInstallHint.js's own DISMISS_KEY -- duplicated as a
// literal rather than imported to avoid a cross-component constant just for
// this one deleteAllLocalData() use (bugfix-report iteration 7, BF-01).
const INSTALL_HINT_DISMISS_KEY = 'closer:installHintDismissed';
const ENDING_BEATS = ['endingOne', 'endingTwo', 'endingThree', 'endingFour'];
// Bumped only if the saved shape changes in a way old saves can't safely
// merge into (bugfix-report iteration 7, BF-12). A saved stateVersion that
// doesn't match this is treated as incompatible rather than guessed at.
const STATE_VERSION = 1;
const END_REASONS = new Set(['completed', 'userEnded', 'consentDeclined']);
const VALID_PHASES = new Set([
  'players', 'pack', 'duration', 'mode', 'intro', 'act', 'break', 'q',
  'secretPass1', 'secret1', 'secretPass2', 'secret2', 'secretPassBack',
  'lastIntro', 'all36',
  'checkPass1', 'check1', 'checkPass2', 'check2', 'checkPassBack',
  'q37intro', 'q37', 'q37a', 'q37b', 'ending',
  // Per-pack consent gate (see the block comment above where it's rendered):
  // dead phases today, since no registered pack sets pack.consentGate --
  // kept valid here so a future pack that does isn't fighting phase
  // validation on top of everything else.
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
  // routeId (iteration 7, Phase 2/FR-01): which curated time route this
  // playthrough uses. Defaults to DEFAULT_ROUTE_ID ('full') -- the same
  // full 36-question game as every save written before routes existed,
  // which simply has no routeId key at all and inherits this default via
  // the `{ ...initialState, ...saved }` merge in loadSaved().
  routeId: route.id,
  modeId: pack.modes[0].id,
  timerEnabled: options.timerEnabled ?? true,
  qIndex: 0,
  pending: 0,
  breakAct: 0,
  // secretSeen: has this person completed their private secret-question
  // screen (secret1/secret2), regardless of what they chose there.
  // hasSecretQuestion: did they actually form one ('Ich hab eine') rather
  // than decline ('Heute keine' -- bugfix-report iteration 7, BF-08/FR-07).
  // Renamed from the previous single `secretReady` array, which conflated
  // "screen completed" with "question exists" -- there was no way to
  // decline honestly. A save from before this rename simply has no
  // secretSeen key, so the merge below falls back to [false, false] and
  // that person is asked again, same as a fresh game.
  secretSeen: [false, false],
  hasSecretQuestion: [null, null],
  secretAsked: [null, null],
  starterOffset: 0,
  // Aktive Gespraechszeit des laufenden Akts (siehe Timer-Effekt).
  actElapsedMs: 0,
  completed: false,
  endReason: null,
  // Whether the first real question has actually begun -- distinct from
  // "a save exists" (iteration-8 holistic review, BF8-01). Every phase
  // before this (players/duration/mode/intro/the very first act-intro
  // screen) still gets persisted like anything else, but loadSaved() only
  // offers "Spiel fortsetzen" once this is true, so reloading mid-setup
  // (no names entered, no route/style picked yet, first question not
  // started) lands back on a normal Start, not a resume of nothing. Set
  // once, true for the rest of the game, at the same 'act' -> 'q'
  // transition that starts the act timer for real.
  hasStarted: false,
  // FR8-06 / Refactoringplan Phase 1: beim tatsaechlichen Spielstart
  // festgehalten (derselbe Moment, in dem hasStarted true wird).
  // runFingerprint verdichtet Contentrevision, Pack, Route und die
  // Reihenfolge der aufgeloesten Frage-IDs; loadSaved() bildet ihn neu und
  // verwirft den Spielstand bei Abweichung, statt still auf verschobenem
  // Inhalt weiterzuspielen. Siehe runFingerprintFor() in closer.js.
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
// an uncaught exception or an empty screen; bugfix-report iteration 7, BF-12).
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
  // Altformat: Spielstaende vor dem Fingerprint speicherten die volle
  // ID-Liste. Sie bleiben gueltig und werden unten weiterhin verglichen.
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

// Phases where nothing about the actual game has happened yet -- setup
// only, nothing worth resuming (BF8-01). 'act' is deliberately not in this
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

// A save written before `hasStarted` existed has no such field -- this is
// its migration, inferred from phase/progress rather than trusted blindly,
// so the BF8-01 fix also takes effect for saves already sitting on a
// device. A save that DOES carry `hasStarted` is trusted directly (it's
// set once, at the same 'act' -> 'q' transition below, and never reset
// except by restart()).
function hasRealProgress(saved) {
  if (typeof saved.hasStarted === 'boolean') return saved.hasStarted;
  if (SETUP_ONLY_PHASES.has(saved.phase)) return false;
  if (saved.phase === 'act') return (saved.pending || 0) > 0 || (saved.qIndex || 0) > 0;
  return true;
}

// `{ ...initialState, ...saved }` is the resume-state migration for a save
// written before packId existed: it simply has no such key, so the spread
// leaves initialState's `DEFAULT_PACK_ID` in place untouched. The
// canonicalization below handles the other case -- a packId/modeId that IS
// present but no longer valid.
function loadSaved() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!isPlausibleSaved(saved)) return null;
    if (saved.phase === 'start' || saved.completed) return null;
    if (!hasRealProgress(saved)) return null;
    if (saved.contentVersion !== CONTENT_VERSION) return null;
    const merged = { ...initialState, ...saved, stateVersion: STATE_VERSION };
    delete merged.skipsRemaining;
    // hasRealProgress() just proved this game is genuinely underway, so
    // write that back explicitly rather than leaving a pre-BF8-01 save's
    // missing field to fall through to initialState's `false` -- otherwise
    // a resumed legacy save would (harmlessly, but incorrectly) skip the
    // wake lock for the rest of whatever act it resumed into.
    merged.hasStarted = true;
    // Canonicalize packId/modeId/qIndex rather than trusting them verbatim
    // (regression-test iteration 5, P2.4): a hand-edited save, an old save
    // whose packId pointed at a pack since removed from the registry, or a
    // modeId that doesn't exist in the resolved pack could otherwise pair
    // "classic" content with a foreign id, or land on a style screen with
    // nothing marked active. getPack() already falls back silently for
    // reads elsewhere in this file, but the *stored* packId itself was
    // never corrected -- this fixes that once, on load, rather than at
    // every call site.
    const pack = getPack(merged.packId);
    merged.packId = pack.id;
    // Same canonicalization, extended to routeId (iteration 7, Phase 2):
    // getRoute() already falls back to DEFAULT_ROUTE_ID for an unrecognised
    // id, same as getPack() does for packId -- this just makes the
    // *stored* value correct too, not just every read of it.
    merged.routeId = getRoute(pack.id, merged.routeId).id;
    if (!pack.modes.some((m) => m.id === merged.modeId)) {
      merged.modeId = pack.modes[0].id;
    }
    const consentPhases = merged.phase.startsWith('consent');
    if (consentPhases && !pack.consentGate) return null;
    // Contentdrift-Schutz. Weicht der Lauf von dem ab, der beim Start
    // festgehalten wurde -- Frage umsortiert, ersetzt, aus der Route
    // gefallen -- wird der Spielstand verworfen statt still auf
    // verschobenem Inhalt fortgesetzt.
    //
    // Zwei Formate, weil bereits ausgelieferte Spielstaende weiterlaufen
    // sollen: neu ist der kompakte runFingerprint, alt die volle ID-Liste.
    // Ein Spielstand ganz ohne beides (vor FR8-06) ueberspringt die
    // Pruefung; ihn deckt der CONTENT_VERSION-Vergleich weiter oben ab.
    if (typeof saved.runFingerprint === 'string' && saved.runFingerprint.length > 0) {
      if (saved.runFingerprint !== runFingerprintFor(merged.packId, merged.routeId)) {
        return null;
      }
    } else if (Array.isArray(saved.runQuestionIds) && saved.runQuestionIds.length > 0) {
      const expected = runQuestionIdsFor(merged.packId, merged.routeId);
      const matchesExpected =
        expected.length === saved.runQuestionIds.length &&
        expected.every((id, i) => id === saved.runQuestionIds[i]);
      if (!matchesExpected) return null;
    }
    const lastQuestion = finalQuestionIndex(pack.id, merged.routeId);
    if (merged.qIndex > lastQuestion || merged.pending > lastQuestion) return null;
    if (merged.breakAct > 1) return null;
    return merged;
  } catch (err) {
    return null;
  }
}

// Bugfix-report iteration 7, BF-01's storage-copy acceptance criteria:
// distinct from restart() (which clears the save and immediately starts a
// fresh game) -- this is the explicit privacy action, wiping every key
// CLOSER writes to this device (game state and the install-hint dismissal)
// and landing back on the plain start screen rather than a new game.
function deleteAllLocalData() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
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

  // Screen-local state: none of this is worth persisting.
  const [step, setStep] = useState('ask'); // twist | counting | ask | deeper | deeperOpen
  const [count, setCount] = useState(0);
  const [justDeclined, setJustDeclined] = useState(false);
  const [staying, setStaying] = useState(false);
  const [stayReady, setStayReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [beat, setBeat] = useState(0);
  const [now, setNow] = useState(0);
  // A per-second speaking live region would be disruptive, so the countdown
  // only ever announces twice -- once when it starts, once at zero -- via
  // this offscreen polite region, never a per-tick aria-live on the number
  // itself (see Counter below, which stays a plain, non-live element).
  const [announce, setAnnounce] = useState('');
  // In-game menu (bugfix-report iteration 7, BF-04): reachable from every
  // question/countdown/act-break/secret-question/Q37 phase, deliberately
  // not from STAY (see the `menu` frame() option below). `menuStep` picks
  // which sub-view of the sheet is showing; null is the top-level list.
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuStep, setMenuStep] = useState(null); // null | 'end' | 'restart' | 'delete'
  // Focus targets for BF-06/BF-07-adjacent a11y: move focus to the flash
  // message while it's the only interactive content on screen, and to the
  // next question once it lands, rather than leaving focus on a button
  // that's no longer there.
  const flashRef = useRef(null);
  const questionHeadingRef = useRef(null);

  // CLOSER PULSE (iteration 8 feature requests, FR8-04): a quiet milestone
  // overlay, never persisted (purely decorative, resets on reload same as
  // any other transient UI state) and never announced as its own thing --
  // it's a visual accent on top of whatever screen would render anyway.
  const [pulseStage, setPulseStage] = useState(null);
  const dismissPulse = useCallback(() => setPulseStage(null), []);
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
    setMounted(true);
    const saved = loadSaved();
    setResumable(saved);
    if (saved) set({ lang: saved.lang });
  }, [set]);

  // CLOSER PULSE's trigger detection: only fires on a phase change that
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
    // Geeignete Trigger (FR8-04): Start des eigentlichen Spiels; jeder
    // Aktabschluss; die abgeschlossene Secret-Question-Übergabe;
    // Finale. Restart and any decline/skip/end path deliberately fire
    // nothing -- "keine negative oder enttäuschte Animation" for those.
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

  // Keep the screen awake while the phone is lying between two people --
  // only once a real question is actually up, not during setup (BF8-01: the
  // old `s.phase !== 'start'` check requested a wake lock through the whole
  // players/duration/mode/intro flow too).
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
   * Aktive Gespraechszeit statt Wandzeit (Iteration-9-Review P1-09,
   * CR-P1-03).
   *
   * Vorher lief die Aktzeit ab `actStartedAt` einfach weiter: auf dem
   * Resume-Screen, im Hintergrund, waehrend das Handy weggelegt war. Nach
   * einer laengeren Unterbrechung zeigte ein fortgesetztes Spiel deshalb
   * sofort eine unbrauchbare Overtime-Meldung.
   *
   * Jetzt wird nur akkumuliert, waehrend tatsaechlich gespielt wird:
   * eine Frage steht auf dem Schirm, das Tab ist sichtbar, kein Dialog
   * ist offen. `actElapsedMs` ist die gesicherte Summe, `runningSinceRef`
   * der Beginn des laufenden Abschnitts (bewusst nicht persistiert -- ein
   * Resume startet immer pausiert).
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

  const timerRunning = s.timerEnabled && s.phase === 'q' && visible && !menuOpen;

  useEffect(() => {
    if (!timerRunning) return undefined;
    const startedAt = Date.now();
    setRunningSince(startedAt);
    const id = setInterval(() => setNow(Date.now()), 1000);
    setNow(Date.now());
    return () => {
      clearInterval(id);
      setRunningSince(null);
      // Den gelaufenen Abschnitt in die gesicherte Summe uebernehmen.
      // Funktionale Form, weil der Cleanup sonst einen veralteten Wert
      // von actElapsedMs saehe.
      const ran = Date.now() - startedAt;
      if (ran > 0) {
        setS((prev) => ({ ...prev, actElapsedMs: (prev.actElapsedMs || 0) + ran }));
      }
    };
  }, [timerRunning]);

  // Everything pack-specific (acts, style modes, per-act look, question-37
  // wording, secret-question placement) is looked up once per render from
  // s.packId -- getPack() falls back to the default pack for any packId it
  // doesn't recognise, so this never needs its own guard.
  const pack = getPack(s.packId);
  const route = getRoute(s.packId, s.routeId);
  // The route-resolved acts (iteration 7, Phase 2) -- same shape as
  // pack.acts, but each act's `questions` is filtered to the route's
  // curated subset (identical to pack.acts, question-for-question, when
  // s.routeId is DEFAULT_ROUTE_ID). Every act-rendering read below goes
  // through this, never pack.acts directly, so a shortened route actually
  // shows its own shortened acts rather than the pack's full ones.
  const acts = resolvedActs(s.packId, s.routeId);
  const total = totalQuestions(s.packId, s.routeId);
  // Secret question / question 37 / ending all share the last act's look.
  // Derived rather than the bare `finalStyle` this used to be
  // (regression-test iteration 5, P1.2): every pack is validated to have
  // exactly 3 acts (see ACTS_PER_PACK in closer.js), so the value is the
  // same either way, but this stays correct on its own terms rather than
  // coincidentally, and doesn't silently go out of bounds if that
  // invariant were ever violated despite the test coverage.
  const finalStyle = pack.actStyle[pack.actStyle.length - 1];

  const mode = useMemo(
    () => pack.modes.find((m) => m.id === s.modeId) || pack.modes[0],
    [pack, s.modeId]
  );
  const actIdx = actIndexFor(s.packId, s.qIndex, s.routeId);
  const style = pack.actStyle[actIdx];
  const question = questionAt(s.packId, s.qIndex, s.routeId);
  const isLast = s.qIndex === finalQuestionIndex(s.packId, s.routeId);

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
    const p = getPack(state.packId);
    const q = questionAt(state.packId, index, state.routeId);
    const m = p.modes.find((x) => x.id === state.modeId) || p.modes[0];
    const tw = q?.twist && m.twists[q.twist] ? q.twist : null;
    // 'deeper' is a post-answer twist; the rest open with a lead-in screen.
    setStep(tw && tw !== 'deeper' ? 'twist' : 'ask');
    setJustDeclined(false);
    setStaying(false);
    setStayReady(false);
    // A countdown's "Los."/"Go." used to linger in the offscreen status
    // region for the rest of the game, not just past a restart (bugfix-
    // report iteration 7, BF-07 -- the restart-only fix was regression-test
    // iteration 5's P2.3). Every path into a new question goes through here,
    // so clearing it here clears it before any later question could
    // re-announce a stale result.
    setAnnounce('');
  }, []);

  /*
   * Everything between questions routes through here. Act breaks, the secret
   * question and the staged last question all interrupt on the way past.
   */
  const goTo = useCallback(
    (index, patch = {}) => {
      const base = { ...s, ...patch };
      const baseTotal = totalQuestions(base.packId, base.routeId);
      if (index >= baseTotal) {
        set({ ...patch, phase: 'all36' });
        return;
      }
      // Route-relative act boundaries (iteration 7, Phase 2), not a bare
      // `% QUESTIONS_PER_ACT`: a route's acts aren't necessarily 12
      // questions each, so the break has to fire at wherever THIS route's
      // acts actually start, not at every 12th absolute index.
      // actStartIndices()[0] is always 0 (Act I's own start), so
      // `boundaryActIdx > 0` below is exactly "this is the start of Act II
      // or later, not the very first question."
      const starts = actStartIndices(base.packId, base.routeId);
      const boundaryActIdx = starts.indexOf(index);
      if (boundaryActIdx > 0) {
        buzz([18, 60, 18]);
        set({ ...patch, phase: 'break', breakAct: boundaryActIdx - 1, pending: index });
        return;
      }
      if (
        base.routeId !== 'quick' &&
        index === secretAtIndexFor(base.packId, base.routeId) &&
        !base.secretSeen[0]
      ) {
        set({ ...patch, phase: 'secretPass1', pending: index });
        return;
      }
      if (index === baseTotal - 1) {
        buzz(20);
        set({ ...patch, phase: 'lastIntro', pending: index });
        return;
      }
      set({ ...patch, phase: 'q', qIndex: index });
      enterQuestion(index, base);
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
  useEffect(() => () => {
    clearInterval(countRef.current);
    clearTimeout(flipRef.current);
  }, []);

  // STAY hides the game. CONTINUE appears once, quietly, and then waits as
  // long as it has to -- no timer, nothing counting down.
  useEffect(() => {
    if (!staying) return undefined;
    setStayReady(false);
    const id = setTimeout(() => setStayReady(true), 6000);
    return () => clearTimeout(id);
  }, [staying]);

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

  // The closing sequence plays itself out, one line at a time.
  useEffect(() => {
    if (s.phase !== 'ending' || beat >= ENDING_BEATS.length - 1) return undefined;
    const id = setTimeout(() => setBeat((b) => b + 1), 2000);
    return () => clearTimeout(id);
  }, [s.phase, beat]);

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
    // Without this, a countdown's "Los."/"Go." lingered in the offscreen
    // status region through a full restart -- silent visually, but a
    // screen reader on the new game's first question could announce a
    // leftover countdown result from the previous language (regression-
    // test iteration 5, P2.3).
    setAnnounce('');
    setMenuOpen(false);
    setMenuStep(null);
    setS((prev) => createInitialState({
      lang: prev.lang,
      packId: prev.packId,
      routeId: prev.routeId,
      timerEnabled: prev.timerEnabled,
    }));
  }, []);

  // Bugfix-report iteration 7, BF-06: while the flash overlay is the only
  // thing on screen (see the early-return branch near the bottom of the
  // question render), move focus onto its own message rather than leaving
  // it on a Pass/decline button that's no longer in the DOM.
  useEffect(() => {
    if (justDeclined && flashRef.current) {
      flashRef.current.focus();
    }
  }, [justDeclined]);

  // ...and once a new question actually lands, move focus onto it -- the
  // same "danach auf die neue Frage" requirement, satisfied for every
  // transition into a question (a fresh skip/decline, an act break, a
  // secret-question handoff, resuming), not just the flash case above.
  useEffect(() => {
    if (s.phase === 'q' && step === 'ask' && questionHeadingRef.current) {
      questionHeadingRef.current.focus();
    }
  }, [s.phase, s.qIndex, step]);

  // Gesicherte Summe plus der gerade laufende Abschnitt.
  const elapsed =
    (s.actElapsedMs || 0) + (runningSince && now ? Math.max(0, now - runningSince) : 0);
  // The selected route owns the time promise; use the same per-act allocation
  // as the route copy so slow, reflective packs and fast, playful packs do not
  // inherit CLASSIC's pacing by accident.
  const actMs = routeTimingFor(s.packId, s.routeId).actMinutes[actIdx] * 60 * 1000;
  const overtime = s.timerEnabled && elapsed > actMs;
  const pct = Math.round((s.qIndex / (total - 1)) * 100);

  const handleDeleteLocalData = () => {
    deleteAllLocalData();
    setResumable(null);
    setMenuOpen(false);
    setMenuStep(null);
    setS(createInitialState({ lang: s.lang }));
  };

  // Rendered inside every frame() call that passes { menu: true } -- see
  // its call sites below. Kept as one shared implementation rather than
  // duplicated per phase (bugfix-report iteration 7, BF-04).
  // Jeder Menueschritt ist ein eigener Dialog mit eigener Ueberschrift --
  // CloserDialog rendert sie selbst und haengt aria-labelledby daran, statt
  // dass jeder Zweig sein eigenes <h2> mitbringt.
  const menuTitle = {
    null: t('menuTitle'),
    end: t('menuEndConfirm'),
    restart: t('startOverConfirm'),
    delete: t('deleteLocalDataConfirm'),
  }[menuStep ?? 'null'];

  const menuOverlay = (
    <>
      <MenuTrigger type="button" onClick={() => { setMenuStep(null); setMenuOpen(true); }}>
        {t('menuOpen')}
      </MenuTrigger>
      {menuOpen && (
        <CloserDialog title={menuTitle} onClose={() => setMenuOpen(false)}>
          <>
            {menuStep === null && (
              <>
                <Toggle
                  $on={s.timerEnabled}
                  $accent={style.accent}
                  aria-pressed={s.timerEnabled}
                  onClick={() => set({ timerEnabled: !s.timerEnabled })}
                >
                  {t('timer')}
                  <b>{s.timerEnabled ? t('on') : t('off')}</b>
                </Toggle>
                <div style={{ marginTop: '2rem' }}>
                  <GhostButton onClick={() => setMenuStep('restart')}>
                    {t('menuRestart')}
                  </GhostButton>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <GhostButton onClick={() => setMenuStep('end')}>{t('menuEnd')}</GhostButton>
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
          </>
        </CloserDialog>
      )}
    </>
  );

  const frame = (content, opts = {}) => (
    <Screen $accent={opts.accent || style.accent} $glow={opts.glow ?? style.glow}>
      <CloserGlobal />
      {content}
      {opts.menu && menuOverlay}
      {pulseStage && (
        <ClosePulse
          stage={pulseStage}
          accent={opts.accent || style.accent}
          reducedMotion={prefersReducedMotion}
          onDone={dismissPulse}
        />
      )}
    </Screen>
  );

  const A0 = pack.actStyle[0].accent;

  // Bugfix-report iteration 7, BF-08/FR-07: only a person who actually
  // formed a secret question (hasSecretQuestion !== false) gets the private
  // "did they ask it?" check after "that's all 36" -- someone who chose
  // "Heute keine" has nothing to ask about, so their checkPass/check screens
  // are skipped entirely rather than asking a question that can't apply.
  const secretQuestionApplicable = (i) => s.hasSecretQuestion[i] !== false;
  // Where the "that's all 36" continue button goes: the first applicable
  // person's handoff screen, or straight to Question 37 if neither has
  // anything to check.
  const nextCheckPhase = () => {
    if (secretQuestionApplicable(0)) return 'checkPass1';
    if (secretQuestionApplicable(1)) return 'checkPass2';
    return 'q37intro';
  };
  // Where check1 goes once person 0 has answered: person 1's own handoff if
  // applicable, otherwise straight to the shared handoff-back screen.
  const afterCheck1 = () => (secretQuestionApplicable(1) ? 'checkPass2' : 'checkPassBack');

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
        { accent: A0, glow: 0.3 }
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
              <Button $accent={A0} onClick={() => set({ phase: 'players' })}>
                {t('start')}
              </Button>
              <Small style={{ textAlign: 'center' }}>{t('aboutMinutes')}</Small>
            </>
          )}
        </Foot>
        <CloserInstallHint lang={lang} accent={A0} />
      </>,
      { accent: A0, glow: 0.3 }
    );
  }

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
            onClick={() =>
              set({ phase: 'pack', starterOffset: Math.random() < 0.5 ? 0 : 1 })
            }
          >
            {t('continue')}
          </Button>
          <Small style={{ textAlign: 'center' }}>{t('namesOptional')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  /* ================================================================== */
  /* PACK (iteration 8 catalog rollout, FR8-03)                         */
  /* ================================================================== */

  if (s.phase === 'pack') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickPack')}</Kicker>
          {Object.values(PACKS).map((p) => (
            <Choice
              key={p.id}
              $on={s.packId === p.id}
              $accent={A0}
              aria-pressed={s.packId === p.id}
              onClick={() =>
                set({
                  packId: p.id,
                  routeId: p.defaultRouteId || DEFAULT_ROUTE_ID,
                  modeId: p.modes[0].id,
                })
              }
            >
              <strong>{pick(p.title, lang)}</strong>
              <em>{pick(p.meta, lang)}</em>
              <span>{pick(p.blurb, lang)}</span>
            </Choice>
          ))}
        </Body>
        <Foot>
          <Button $accent={A0} onClick={() => set({ phase: 'duration' })}>
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  /* ================================================================== */
  /* DURATION / ROUTE (iteration 7, Phase 2, FR-01/FR-02)               */
  /* ================================================================== */

  if (s.phase === 'duration') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{t('pickDuration')}</Kicker>
          {Object.values(pack.routes).map((r) => (
            <Choice
              key={r.id}
              $on={s.routeId === r.id}
              $accent={A0}
              aria-pressed={s.routeId === r.id}
              onClick={() => set({ routeId: r.id })}
            >
              <strong>{pick(r.title, lang)}</strong>
              <em>{pick(r.meta, lang)}</em>
              <span>{pick(routeSubtitleFor(s.packId, r.id), lang)}</span>
            </Choice>
          ))}
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
            onClick={() => {
              const hasStyleChoice = pack.modes.length > 1;
              set({
                modeId: hasStyleChoice ? s.modeId : pack.modes[0].id,
                phase: hasStyleChoice
                  ? 'mode'
                  : pack.consentGate
                  ? 'consentGatePassA'
                  : 'intro',
              });
            }}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
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
          {/* Scope/time shown once here, straight from the route picked on
              the previous screen (BF8-03) -- style copy itself no longer
              claims any fixed question count or duration. */}
          <Small style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {pick(route.title, lang)} · {pick(routeSubtitleFor(s.packId, route.id), lang)}
          </Small>
          {pack.modes.map((m) => (
            <Choice
              key={m.id}
              $on={s.modeId === m.id}
              $accent={A0}
              aria-pressed={s.modeId === m.id}
              onClick={() => set({ modeId: m.id })}
            >
              <strong>{pick(m.title, lang)}</strong>
              <em>{pick(m.meta, lang)}</em>
              <span>{pick(m.blurb, lang)}</span>
            </Choice>
          ))}
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() =>
              set({ phase: pack.consentGate ? 'consentGatePassA' : 'intro' })
            }
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  /* ================================================================== */
  /* CONSENT GATE (dead today -- no registered pack sets consentGate;    */
  /* see LATE_NIGHT_PACK in closer.js, deliberately not in PACKS yet)    */
  /* ================================================================== */

  if (s.phase === 'consentGatePassA' || s.phase === 'consentGatePassB') {
    const who = s.phase === 'consentGatePassA' ? 0 : 1;
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{tf('passPhoneTo', nameOf(who))}</Kicker>
        </Body>
        <Foot>
          <Button
            $accent={A0}
            onClick={() =>
              set({ phase: s.phase === 'consentGatePassA' ? 'consentGateA' : 'consentGateB' })
            }
          >
            {tf('iAm', nameOf(who))}
          </Button>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
    );
  }

  if (s.phase === 'consentGateA' || s.phase === 'consentGateB') {
    const me = s.phase === 'consentGateA' ? 0 : 1;
    // Declining either gate ends the pack neutrally -- "Wird nicht zweimal
    // aktiv zugestimmt, endet der Pack neutral" (the catalog's own words).
    // Not a restart, not a delete -- the ordinary ending sequence, same as
    // any other "End now" in the game.
    const decide = (agreed) => {
      if (!agreed) {
        finish('consentDeclined');
        return;
      }
      set({ phase: me === 0 ? 'consentGatePassB' : 'intro' });
    };
    return frame(
      <>
        <Body $center>
          <Kicker $accent={A0}>{tf('forOnly', nameOf(me))}</Kicker>
          <Lede>{pick(pack.consentGate.notice, lang)}</Lede>
        </Body>
        <Foot>
          <Row>
            <Button $accent={A0} onClick={() => decide(true)}>
              {t('consentAgree')}
            </Button>
            <GhostButton onClick={() => decide(false)}>{t('endHere')}</GhostButton>
          </Row>
        </Foot>
      </>,
      { accent: A0, glow: 0.28 }
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
          <Button $accent={A0} onClick={() => set({ phase: 'act', pending: 0, qIndex: 0 })}>
            {t('begin')}
          </Button>
          <Small style={{ textAlign: 'center' }}>{t('privacy')}</Small>
        </Foot>
      </>,
      { accent: A0, glow: 0.24 }
    );
  }

  /* ================================================================== */
  /* ACT INTRO / BREAK                                                  */
  /* ================================================================== */

  if (s.phase === 'act') {
    const idx = actIndexFor(s.packId, s.pending, s.routeId);
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
            onClick={() => {
              const index = s.pending;
              const next = {
                ...s,
                phase: 'q',
                qIndex: index,
                actElapsedMs: 0,
                hasStarted: true,
                // Bei jedem Aktbeginn idempotent neu berechnet (wie
                // hasStarted darueber) -- Pack und Route aendern sich im
                // laufenden Spiel nicht, es ist also immer derselbe Wert,
                // nur frueh genug geschrieben fuer den naechsten Resume.
                runFingerprint: runFingerprintFor(s.packId, s.routeId),
                contentVersion: CONTENT_VERSION,
              };
              buzz(16);
              setS(next);
              enterQuestion(index, next);
            }}
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
            onClick={() =>
              set({
                phase: pack.consentGate && s.breakAct === 0 ? 'consentAct2PassA' : 'act',
                actElapsedMs: 0,
              })
            }
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  /* ================================================================== */
  /* CONSENT GATE -- renewed opt-in before Act II (dead today, see the   */
  /* pre-pack gate's own comment above)                                 */
  /* ================================================================== */

  if (s.phase === 'consentAct2PassA' || s.phase === 'consentAct2PassB') {
    const who = s.phase === 'consentAct2PassA' ? 0 : 1;
    const st = pack.actStyle[1];
    return frame(
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{tf('passPhoneTo', nameOf(who))}</Kicker>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() =>
              set({
                phase: s.phase === 'consentAct2PassA' ? 'consentAct2A' : 'consentAct2B',
              })
            }
          >
            {tf('iAm', nameOf(who))}
          </Button>
        </Foot>
      </>,
      { accent: st.accent, glow: st.glow, menu: true }
    );
  }

  if (s.phase === 'consentAct2A' || s.phase === 'consentAct2B') {
    const me = s.phase === 'consentAct2A' ? 0 : 1;
    const st = pack.actStyle[1];
    const decide = (agreed) => {
      if (!agreed) {
        finish('consentDeclined');
        return;
      }
      // Die Aktzeit wird nur auf dem Uebergang zurueckgesetzt, der
      // lands on the act-intro screen (person 1 agreeing); person 0's own
      // "yes" just moves on to the next handoff.
      if (me === 0) {
        set({ phase: 'consentAct2PassB' });
      } else {
        set({ phase: 'act', actElapsedMs: 0 });
      }
    };
    return frame(
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{tf('forOnly', nameOf(me))}</Kicker>
          <Lede>{pick(pack.consentGate.act2OptIn, lang)}</Lede>
        </Body>
        <Foot>
          <Row>
            <Button $accent={st.accent} onClick={() => decide(true)}>
              {t('consentAgree')}
            </Button>
            <GhostButton onClick={() => decide(false)}>{t('endHere')}</GhostButton>
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
        <>
          <Body $center>
            <Kicker $accent={st.accent}>
              {p === 'secretPass1' ? tf('passPhoneTo', nameOf(0)) : t('passPhone')}
            </Kicker>
            {p === 'secretPass2' && (
              <Lede>{tf('passPhoneText', nameOf(1), s.hasSecretQuestion[0] === true)}</Lede>
            )}
          </Body>
          <Foot>
            <Button
              $accent={st.accent}
              onClick={() => set({ phase: p === 'secretPass1' ? 'secret1' : 'secret2' })}
            >
              {p === 'secretPass1' ? tf('iAm', nameOf(0)) : t('done')}
            </Button>
          </Foot>
        </>,
        { accent: st.accent, glow: st.glow, menu: true }
      );
    }

    if (p === 'secret1' || p === 'secret2') {
      const me = p === 'secret1' ? 0 : 1;
      // "Heute keine" is an equally valid choice, not a fallback (bugfix-
      // report iteration 7, BF-08/FR-07) -- both buttons advance the phone-
      // handoff sequence identically; only hasSecretQuestion[me] differs,
      // which later decides whether this person gets a private check-in
      // screen after "that's all 36" and whether Question 37 treats their
      // slot as pending.
      const choose = (has) => {
        const seen = [...s.secretSeen];
        seen[me] = true;
        const have = [...s.hasSecretQuestion];
        have[me] = has;
        set({
          secretSeen: seen,
          hasSecretQuestion: have,
          phase: me === 0 ? 'secretPass2' : 'secretPassBack',
        });
      };
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
      <>
        <Body $center>
          <Kicker $accent={st.accent}>{t('passPhoneBack')}</Kicker>
          <Lede>{t('passPhoneBackText')}</Lede>
        </Body>
        <Foot>
          <Button
            $accent={st.accent}
            onClick={() => {
              const index = s.pending;
              const next = { ...s, phase: 'q', qIndex: index };
              setS(next);
              enterQuestion(index, next);
            }}
          >
            {t('continue')}
          </Button>
        </Foot>
      </>,
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
          {revealSecond && !isQuick && secretCount > 0 && (
            <Lede style={{ marginTop: '3.2rem' }}>{tf('secretSummary', secretCount)}</Lede>
          )}
        </Body>
        <Foot>
          {revealSecond && (
            <GhostButton
              onClick={() => (isQuick ? finish('completed') : set({ phase: nextCheckPhase() }))}
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
      <>
        <Body $center>
          <Kicker $accent={finalStyle.accent}>{tf('passPhoneTo', nameOf(who))}</Kicker>
        </Body>
        <Foot>
          <Button
            $accent={finalStyle.accent}
            onClick={() => set({ phase: who === 0 ? 'check1' : 'check2' })}
          >
            {tf('iAm', nameOf(who))}
          </Button>
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  if (s.phase === 'checkPassBack') {
    return frame(
      <>
        <Body $center>
          <Kicker $accent={finalStyle.accent}>{t('passPhoneBack')}</Kicker>
          <Lede>{t('passPhoneBackText')}</Lede>
        </Body>
        <Foot>
          <Button $accent={finalStyle.accent} onClick={() => set({ phase: 'q37intro' })}>
            {t('continue')}
          </Button>
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: 0.03, menu: true }
    );
  }

  if (s.phase === 'check1' || s.phase === 'check2') {
    const me = s.phase === 'check1' ? 0 : 1;
    const answer = (value) => {
      const asked = [...s.secretAsked];
      asked[me] = value;
      set({ secretAsked: asked, phase: me === 0 ? afterCheck1() : 'checkPassBack' });
    };
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
    // hasSecretQuestion is passed through as of bugfix-report iteration 7,
    // BF-08/FR-07 -- a person who chose "Heute keine" never counts as
    // "still waiting" for a question that was never formed.
    const { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion } = classifySecretAsked(
      s.secretAsked,
      s.hasSecretQuestion
    );

    if (s.phase === 'q37intro') {
      let kicker = t('q37OneMore');
      let text = pick(pack.q37.neither, lang);
      if (noneHaveSecretQuestion) {
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
            {bothAsked || noneHaveSecretQuestion ? (
              // Nobody has a secret question waiting either way here --
              // "bothAsked" offers the ordinary bonus prompt, and so does
              // "noneHaveSecretQuestion" (there's nothing secret-question-
              // specific left to offer instead).
              <Row>
                <GhostButton onClick={() => set({ phase: 'q37' })}>{t('yes')}</GhostButton>
                <GhostButton onClick={() => finish('userEnded')}>
                  {t('end')}
                </GhostButton>
              </Row>
            ) : (
              // Every q37intro branch offers an end option now (iteration-6
              // content review, P1) -- a self-chosen secret question can be
              // more intimate than anything scripted, so nobody should be
              // funneled toward speaking it just because the UI only ever
              // offered "continue".
              <Row>
                <GhostButton onClick={() => set({ phase: neither ? 'q37a' : 'q37' })}>
                  {neither ? finaleButton : t('continue')}
                </GhostButton>
                <GhostButton onClick={() => finish('userEnded')}>
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
              // Bugfix-report iteration 7, BF-09: consent can change between
              // the two people's turns -- q37a used to only offer
              // "continue" into q37b, with no way to stop before the second
              // person's turn.
              <Row>
                <Button $accent={finalStyle.accent} onClick={() => set({ phase: 'q37b' })}>
                  {t('continue')}
                </Button>
                <GhostButton onClick={() => finish('userEnded')}>
                  {t('end')}
                </GhostButton>
              </Row>
            ) : (
              <TextButton onClick={() => finish('completed')}>
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
    if (!neither && !bothAsked && !noneHaveSecretQuestion) {
      prompt = pack.q37.one(lang, nameOf(pendingPlayer), nameOf(1 - pendingPlayer));
    }

    return frame(
      <>
        <Body $center>
          <Kicker>{finaleLabel}</Kicker>
          <Question>{prompt}</Question>
        </Body>
        <Foot>
          <TextButton onClick={() => finish('completed')}>
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
    const isFinal = beat === ENDING_BEATS.length - 1;
    return frame(
      <>
        <Body $center onClick={() => !isFinal && setBeat((b) => b + 1)}>
          <Question key={beat}>{t(ENDING_BEATS[beat])}</Question>
        </Body>
        <Foot>
          {isFinal && (
            <>
              <Small style={{ textAlign: 'center', letterSpacing: '.3em' }}>CLOSER</Small>
              <TextButton onClick={restart}>{t('playAgain')}</TextButton>
            </>
          )}
        </Foot>
      </>,
      { accent: finalStyle.accent, glow: isFinal ? 0.1 : 0.02 }
    );
  }

  /* ================================================================== */
  /* STAY                                                               */
  /* ================================================================== */

  if (staying) {
    return (
      <Screen $accent={style.accent} $glow={0.02}>
        <CloserGlobal />
        <Stay>
          <StayDot $accent={style.accent} />
          <Lede style={{ textAlign: 'center' }}>{t('stayTitle')}</Lede>
          {stayReady && (
            <TextButton
              onClick={() => {
                setStaying(false);
                leaveQuestion();
              }}
            >
              {t('continue')}
            </TextButton>
          )}
        </Stay>
      </Screen>
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
        </Foot>
      </>
    );
  } else if (step === 'counting') {
    // The question (and, for NO THINKING, the starter) appears together
    // with the count and stays put through to zero -- nobody answers
    // something they have not seen.
    inner = (
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
          {/* Response Cards (iteration 8 catalog, FRIENDS/OLD FRIENDS/DEEP):
              an optional listening hint attached to specific questions --
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
          <TextButton onClick={() => { buzz(14); setJustDeclined(true); }}>
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
