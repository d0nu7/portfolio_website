import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  compileRun,
  getPack,
  getRoute,
  pick,
  starterFor,
} from '../../constants/closer';
import {
  ACT_EFFECTS,
  ACT_EVENTS,
  CONSENT_EVENTS,
  FINALE_EVENTS,
  GLOBAL_EVENTS,
  PRIVATE_MOMENT_EFFECTS,
  PRIVATE_MOMENT_EVENTS,
  QUESTION_DESTINATION_EFFECTS,
  QUESTION_EVENTS,
  SETUP_EVENTS,
  actIndexAt,
  transitionAct,
  transitionConsent,
  transitionFinale,
  transitionGlobal,
  transitionPrivateMoment,
  transitionQuestion,
  transitionQ37,
  transitionSetup,
} from '../../closer/engine/transitions';
import {
  createInitialState,
  createRestartState,
  resumeSavedState,
} from '../../closer/engine/persistence';
import {
  DEFAULT_PREFERENCES,
  clearAllCloserData,
  clearSavedGame,
  getBrowserStorage,
  loadPreferences,
  loadSavedGame,
  persistGameState,
  persistPreferences,
} from '../../closer/infrastructure/storage';
import COPY from '../../constants/closerCopy';
import CloserActView, { ACT_VIEW_PHASES, actViewStyle } from './CloserActView';
import CloserConsentView, { CONSENT_VIEW_PHASES } from './CloserConsentView';
import CloserFinaleView, {
  ENDING_BEATS,
  FINALE_VIEW_PHASES,
  finaleViewGlow,
} from './CloserFinaleView';
import { LEGAL_TITLES } from './CloserLegal';
import CloserMenu from './CloserMenu';
import CloserPrivateMomentView, {
  PRIVATE_MOMENT_VIEW_PHASES,
} from './CloserPrivateMomentView';
import CloserQuestionView, { questionFrameOptions } from './CloserQuestionView';
import CloserScreenFrame from './CloserScreenFrame';
import CloserSetupView from './CloserSetupView';
import CloserStartView from './CloserStartView';

export { SAVE_REJECT_REASONS, parseSaved } from '../../closer/engine/persistence';

// BUG-009: how often the active timer segment is folded into persisted
// actElapsedMs while still running, bounding how much active time an
// abrupt kill can lose. Small enough to keep that loss window tight,
// large enough to avoid excessive re-renders/localStorage writes.
const ACTIVE_SEGMENT_CHECKPOINT_MS = 5000;

const initialState = createInitialState();

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
  const dispatchGlobal = useCallback((event) => {
    setS((prev) => {
      const patch = transitionGlobal(prev, event);
      return patch ? { ...prev, ...patch } : prev;
    });
  }, []);
  const finish = useCallback((endReason = 'completed') => {
    dispatchGlobal({ type: GLOBAL_EVENTS.END_RUN, reason: endReason });
  }, [dispatchGlobal]);

  const lang = s.lang;
  const t = useCallback((key) => pick(COPY[key], lang), [lang]);
  const tf = useCallback((key, ...args) => COPY[key](lang, ...args), [lang]);

  // Render the server markup first, then look for a saved game, so the static
  // export and the first client render stay identical. The resume screen
  // (and a straight "Continue game") should come back in whatever language
  // the saved game was in, not silently fall back to German -- the language
  // toggle on this screen still lets someone switch before continuing.
  useEffect(() => {
    const storage = getBrowserStorage(window);
    setPreferences(loadPreferences(storage));
    setMounted(true);
    const saved = loadSavedGame(storage);
    setResumable(saved);
    if (saved) dispatchGlobal({ type: GLOBAL_EVENTS.SET_LANGUAGE, lang: saved.lang });
  }, [dispatchGlobal]);

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
    } else if (prev !== 'ending' && s.phase === 'ending' && s.endReason === 'completed') {
      setPulseStage('finale');
    }
  }, [mounted, s.phase, s.breakAct, s.qIndex, s.endReason]);

  useEffect(() => {
    if (!mounted) return;
    persistGameState(getBrowserStorage(window), s);
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

  // Never leave a private card exposed in an app-switcher snapshot. Returning
  // to the app requires the named person to confirm the handoff again.
  useEffect(() => {
    if (visible) return;
    const coverPhase = {
      secret1: 'secretPass1',
      secret2: 'secretPass2',
      check1: 'checkPass1',
      check2: 'checkPass2',
      consentGateA: 'consentGatePassA',
      consentGateB: 'consentGatePassB',
      consentAct2A: 'consentAct2PassA',
      consentAct2B: 'consentAct2PassB',
    }[s.phase];
    if (coverPhase) set({ phase: coverPhase });
  }, [visible, s.phase, set]);

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
  const privateSupplement = run.privateMoment !== 'none' &&
    run.privateMoment.use.kind === 'question' &&
    s.privateMomentStatus === 'armed' &&
    run.questions[s.qIndex]?.id === run.privateMoment.use.questionId
    ? run.privateMoment.use.supplement
    : null;

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
   * Everything between questions routes through here. Act breaks, explicit
   * Private Moment triggers, and the staged last question can interrupt.
   */
  const advanceQuestion = useCallback(
    (eventType) => {
      const destination = transitionQuestion(run, s, { type: eventType });
      if (!destination) return;

      if (destination.effect === QUESTION_DESTINATION_EFFECTS.ACT_BREAK) {
        buzz([18, 60, 18]);
      } else if (destination.effect === QUESTION_DESTINATION_EFFECTS.LAST_QUESTION) {
        buzz(20);
      }

      set(destination.patch);
      if (destination.effect === QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION) {
        enterQuestion(s.qIndex + 1, s);
      }
    },
    [run, s, set, enterQuestion]
  );

  const leaveQuestion = useCallback(() => {
    if (twist === 'deeper' && step !== 'deeper' && step !== 'deeperOpen') {
      setStep('deeper');
      return;
    }
    advanceQuestion(QUESTION_EVENTS.ANSWER_DONE);
  }, [twist, step, advanceQuestion]);

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
      advanceQuestion(QUESTION_EVENTS.PASS);
    }, 1600);
    return () => clearTimeout(id);
  }, [justDeclined, advanceQuestion]);

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
    clearSavedGame(getBrowserStorage(window));
    setResumable(null);
    setConfirmReset(false);
    setBeat(0);
    setStep('ask');
    // A restart must not carry a stale countdown announcement into a new run.
    setAnnounce('');
    setMenuOpen(false);
    setMenuStep(null);
    setStaying(false);
    setS((prev) => createRestartState(prev, preferences));
  }, [preferences]);

  // While the pass flash is the only content, move focus to its message.
  useEffect(() => {
    if (justDeclined && flashRef.current) {
      flashRef.current.focus();
    }
  }, [justDeclined]);

  // Once a new question lands, move focus onto it for every
  // transition into a question (a fresh pass, an act break, a Private Moment
  // return, or resume), not just the flash case above.
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
    clearAllCloserData(getBrowserStorage(window));
    setPreferences(DEFAULT_PREFERENCES);
    setResumable(null);
    setMenuOpen(false);
    setMenuStep(null);
    setS(createInitialState({ lang: s.lang }));
  };

  const setPackVisible = (packId, visible) => {
    const visiblePackIds = visible
      ? [...new Set([...preferences.visiblePackIds, packId])]
      : preferences.visiblePackIds.filter((id) => id !== packId);
    if (!visiblePackIds.length) return;
    const nextPreferences = { ...preferences, visiblePackIds };
    setPreferences(nextPreferences);
    persistPreferences(getBrowserStorage(window), nextPreferences);

    // Hiding the pack during setup must not leave an invisible selection
    // active. An already-started or resumable LATE NIGHT run remains valid.
    if (!visible && !s.hasStarted && s.packId === packId) {
      const fallback = getPack(visiblePackIds[0] || DEFAULT_PACK_ID);
      set({
        phase: ['duration', 'mode', 'intro'].includes(s.phase) ? 'pack' : s.phase,
        packId: fallback.id,
        routeId: fallback.defaultRouteId || DEFAULT_ROUTE_ID,
        modeId: fallback.modes[0].id,
      });
    }
  };

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
    <CloserMenu
      open={menuOpen}
      step={menuStep}
      title={menuTitle}
      state={s}
      preferences={preferences}
      lang={lang}
      accent={style.accent}
      t={t}
      onOpen={() => { setMenuStep(null); setMenuOpen(true); }}
      onClose={() => setMenuOpen(false)}
      onSetStep={setMenuStep}
      onToggleTimer={() => dispatchGlobal({
        type: GLOBAL_EVENTS.SET_TIMER,
        enabled: !s.timerEnabled,
      })}
      onFinish={() => {
        setMenuOpen(false);
        setMenuStep(null);
        finish('userEnded');
      }}
      onRestart={restart}
      onDeleteLocalData={handleDeleteLocalData}
      onSetPackVisible={setPackVisible}
    />
  );

  const frame = (content, opts = {}) => (
    <CloserScreenFrame
      accent={opts.accent || style.accent}
      glow={opts.glow ?? style.glow}
      frameContentRef={frameContentRef}
      menuOpen={menuOpen}
      menuOverlay={menuOverlay}
      showMenu={opts.menu}
      pulseStage={pulseStage}
      pulseLabel={pulseStage ? tf('milestoneLabel', pulseStage) : null}
      pulseDetail={pulseStage ? tf('milestoneDetail', pulseStage) : null}
      prefersReducedMotion={prefersReducedMotion}
      onPulseDone={dismissPulse}
    >
      {content}
    </CloserScreenFrame>
  );

  const A0 = pack.actStyle[0].accent;

  // Route compilation is the single authority for whether this run owns a
  // Private Moment. Quick and explicit pack-level `none` decisions resolve
  // to the same disabled value before the controller sees them.
  const privateMomentEnabled = run.privateMoment !== 'none';

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
  const dispatchFinale = (event) => {
    const result = transitionFinale(run, s, event);
    if (!result) return;
    if (result.effect === QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION) {
      const next = { ...s, ...result.patch };
      setS(next);
      enterQuestion(next.qIndex, next);
    }
  };

  /* ================================================================== */
  /* START                                                              */
  /* ================================================================== */

  if (!mounted || s.phase === 'start') {
    return frame(
      <CloserStartView
        mounted={mounted}
        resumable={resumable}
        confirmReset={confirmReset}
        lang={lang}
        accent={A0}
        t={t}
        onLanguage={(nextLang) => dispatchGlobal({
          type: GLOBAL_EVENTS.SET_LANGUAGE,
          lang: nextLang,
        })}
        onResume={() => {
          const resumed = resumeSavedState(resumable, lang);
          if (!resumed) return;
          setS(resumed);
          setResumable(null);
          if (resumed.phase === 'q') enterQuestion(resumed.qIndex, resumed);
        }}
        onStart={() => dispatchSetup({ type: SETUP_EVENTS.START_SETUP })}
        onRestart={() => {
          if (confirmReset) restart();
          else setConfirmReset(true);
        }}
        onCancelReset={() => setConfirmReset(false)}
      />,
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
  /* SETUP CHOICES                                                      */
  /* ================================================================== */

  if (['players', 'pack', 'duration', 'mode'].includes(s.phase)) {
    return frame(
      <CloserSetupView
        state={s}
        pack={pack}
        route={route}
        lang={lang}
        accent={A0}
        preferences={preferences}
        t={t}
        onPatch={set}
        onContinue={(options = {}) => dispatchSetup({
          type: SETUP_EVENTS.CONTINUE,
          ...options,
        })}
        onBack={goBackFromSetup}
        onToggleTimer={() => dispatchGlobal({
          type: GLOBAL_EVENTS.SET_TIMER,
          enabled: !s.timerEnabled,
        })}
      />,
      { accent: A0, glow: 0.28, menu: true }
    );
  }

  /* ================================================================== */
  /* CONSENT                                                           */
  /* ================================================================== */

  if (CONSENT_VIEW_PHASES.has(s.phase)) {
    const consentStyle = s.phase.startsWith('consentAct2')
      ? pack.actStyle[1]
      : { accent: A0, glow: 0.28 };
    return frame(
      <CloserConsentView
        state={s}
        pack={pack}
        lang={lang}
        accent={consentStyle.accent}
        nameOf={nameOf}
        t={t}
        tf={tf}
        onHandoff={() => dispatchConsent({ type: CONSENT_EVENTS.HANDOFF_CONFIRMED })}
        onConfirm={() => dispatchConsent({ type: CONSENT_EVENTS.CONFIRM_CONSENT })}
        onDecline={() => dispatchConsent({ type: CONSENT_EVENTS.DECLINE_CONSENT })}
        onContinueAccepted={() => dispatchConsent({
          type: CONSENT_EVENTS.CONTINUE_AFTER_CONSENT,
        })}
      />,
      { accent: consentStyle.accent, glow: consentStyle.glow, menu: true }
    );
  }

  /* ================================================================== */
  /* INTRO / ACT / BREAK                                                */
  /* ================================================================== */

  if (ACT_VIEW_PHASES.has(s.phase)) {
    const viewStyle = actViewStyle(s, run, pack);
    return frame(
      <CloserActView
        state={s}
        run={run}
        pack={pack}
        acts={acts}
        lang={lang}
        t={t}
        onBegin={() => dispatchSetup({ type: SETUP_EVENTS.BEGIN_RUN })}
        onBack={goBackFromSetup}
        onStartAct={() => dispatchAct({ type: ACT_EVENTS.START_ACT })}
        onContinueFromBreak={() => dispatchAct({ type: ACT_EVENTS.CONTINUE_FROM_BREAK })}
      />,
      { ...viewStyle, menu: true }
    );
  }

  /* ================================================================== */
  /* PRIVATE MOMENT                                                     */
  /* ================================================================== */

  if (PRIVATE_MOMENT_VIEW_PHASES.has(s.phase)) {
    return frame(
      <CloserPrivateMomentView
        state={s}
        moment={run.privateMoment}
        lang={lang}
        accent={finalStyle.accent}
        nameOf={nameOf}
        t={t}
        tf={tf}
        onStart={() => dispatchPrivateMoment({ type: PRIVATE_MOMENT_EVENTS.START })}
        onSkipAll={() => dispatchPrivateMoment({ type: PRIVATE_MOMENT_EVENTS.SKIP_ALL })}
        onHandoff={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
        })}
        onSetCardChoice={(accepted) => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
          accepted,
        })}
        onSetQuestionStatus={(status) => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_STATUS,
          status,
        })}
        onCompleteUse={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.COMPLETE_USE,
        })}
      />,
      { accent: finalStyle.accent, glow: s.phase.startsWith('secret') ? finalStyle.glow : 0.03, menu: true }
    );
  }

  /* ================================================================== */
  /* FINALE                                                             */
  /* ================================================================== */

  if (FINALE_VIEW_PHASES.has(s.phase)) {
    return frame(
      <CloserFinaleView
        state={s}
        pack={pack}
        route={route}
        lang={lang}
        accent={finalStyle.accent}
        total={total}
        beat={beat}
        revealSecond={revealSecond}
        privateMomentEnabled={privateMomentEnabled}
        moment={run.privateMoment === 'none' ? null : run.privateMoment}
        nameOf={nameOf}
        t={t}
        tf={tf}
        onRevealLast={() => dispatchFinale({ type: FINALE_EVENTS.REVEAL_LAST })}
        onContinueAfterQuestions={() => dispatchPrivateMoment({
          type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
        })}
        onQ37={(type) => dispatchQ37({ type })}
        onAdvanceBeat={() => setBeat((current) => current + 1)}
        onRestart={restart}
      />,
      {
        accent: finalStyle.accent,
        glow: finaleViewGlow(s, beat),
        menu: true,
      }
    );
  }

  return frame(
    <CloserQuestionView
      state={s}
      question={question}
      lang={lang}
      style={style}
      total={total}
      starter={starter}
      twist={twist}
      step={step}
      count={count}
      announce={announce}
      isLast={isLast}
      canStay={canStay}
      staying={staying}
      justDeclined={justDeclined}
      overtime={overtime}
      elapsedLabel={clockOf(elapsed)}
      progressPercent={pct}
      privateSupplement={privateSupplement}
      flashRef={flashRef}
      questionHeadingRef={questionHeadingRef}
      nameOf={nameOf}
      t={t}
      tf={tf}
      onContinueStay={() => {
        setStaying(false);
        leaveQuestion();
      }}
      onPass={passQuestion}
      onCountdown={runCountdown}
      onSetStep={setStep}
      onAdvance={() => advanceQuestion(QUESTION_EVENTS.ANSWER_DONE)}
      onLeaveQuestion={leaveQuestion}
      onStay={() => setStaying(true)}
    />,
    questionFrameOptions({ justDeclined, staying, style })
  );
}
