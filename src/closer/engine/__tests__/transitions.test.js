import { compileRun } from '../../../constants/closer';
import {
  ACT_EFFECTS,
  ACT_EVENTS,
  CONSENT_EVENTS,
  FINALE_EVENTS,
  GLOBAL_EVENTS,
  PRIVATE_MOMENT_EFFECTS,
  PRIVATE_MOMENT_EVENTS,
  Q37_EVENTS,
  QUESTION_DESTINATION_EFFECTS,
  SETUP_EVENTS,
  actIndexAt,
  resolveQuestionDestination,
  transitionSetup,
  transitionConsent,
  transitionFinale,
  transitionGlobal,
  transitionPrivateMoment,
  transitionQ37,
  transitionAct,
} from '../transitions';

const state = (patch = {}) => ({ secretSeen: [false, false], ...patch });

describe('question destination transition core', () => {
  const full = compileRun('classic', 'full', 'original');
  const quick = compileRun('classic', 'quick', 'original');

  it('maps route-relative indices to the compiled act boundaries', () => {
    expect(full.actStarts).toEqual([0, 12, 24]);
    expect(actIndexAt(full, 0)).toBe(0);
    expect(actIndexAt(full, 11)).toBe(0);
    expect(actIndexAt(full, 12)).toBe(1);
    expect(actIndexAt(full, 35)).toBe(2);

    expect(quick.actStarts).toEqual([0, 4, 8]);
    expect(actIndexAt(quick, 7)).toBe(1);
    expect(actIndexAt(quick, 8)).toBe(2);
  });

  it('enters an ordinary question', () => {
    expect(resolveQuestionDestination(full, state(), 1)).toEqual({
      patch: { phase: 'q', qIndex: 1 },
      effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
    });
  });

  it('stops at each compiled act boundary', () => {
    expect(resolveQuestionDestination(full, state(), 12)).toEqual({
      patch: { phase: 'break', breakAct: 0, pending: 12 },
      effect: QUESTION_DESTINATION_EFFECTS.ACT_BREAK,
    });
    expect(resolveQuestionDestination(quick, state(), 8)).toEqual({
      patch: { phase: 'break', breakAct: 1, pending: 8 },
      effect: QUESTION_DESTINATION_EFFECTS.ACT_BREAK,
    });
  });

  it('enters the private handoff only when the compiled run permits it', () => {
    expect(resolveQuestionDestination(full, state(), full.secretAtIndex)).toEqual({
      patch: { phase: 'secretPass1', pending: full.secretAtIndex },
      effect: QUESTION_DESTINATION_EFFECTS.NONE,
    });
    expect(resolveQuestionDestination(full, state({ secretSeen: [true, true] }), full.secretAtIndex))
      .toEqual({
        patch: { phase: 'q', qIndex: full.secretAtIndex },
        effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
      });
    expect(resolveQuestionDestination(quick, state(), quick.secretAtIndex).patch.phase)
      .not.toBe('secretPass1');
  });

  it('stages the compiled final question before entering it', () => {
    const finalIndex = full.questions.length - 1;
    expect(resolveQuestionDestination(full, state(), finalIndex)).toEqual({
      patch: { phase: 'lastIntro', pending: finalIndex },
      effect: QUESTION_DESTINATION_EFFECTS.LAST_QUESTION,
    });
  });

  it('moves beyond the compiled run into the completion sequence', () => {
    expect(resolveQuestionDestination(full, state(), full.questions.length)).toEqual({
      patch: { phase: 'all36' },
      effect: QUESTION_DESTINATION_EFFECTS.NONE,
    });
  });

  it('does not mutate the run or state inputs', () => {
    const current = Object.freeze({ secretSeen: Object.freeze([false, false]) });
    const before = JSON.stringify(full);
    resolveQuestionDestination(full, current, 1);
    expect(JSON.stringify(full)).toBe(before);
  });
});

describe('setup transition core', () => {
  const classic = compileRun('classic', 'full', 'original');
  const firstDate = compileRun('first-date', 'quick', 'calm');
  const lateNight = compileRun('late-night', 'quick', 'explicit');

  it('starts setup and moves through players and pack', () => {
    expect(transitionSetup(classic, { phase: 'start' }, { type: SETUP_EVENTS.START_SETUP }))
      .toEqual({ phase: 'players' });
    expect(transitionSetup(classic, { phase: 'players' }, {
      type: SETUP_EVENTS.CONTINUE,
      starterOffset: 1,
    })).toEqual({ phase: 'pack', starterOffset: 1 });
    expect(transitionSetup(classic, { phase: 'pack' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ phase: 'duration' });
  });

  it('rejects a player transition without a valid starter offset', () => {
    expect(transitionSetup(classic, { phase: 'players' }, { type: SETUP_EVENTS.CONTINUE }))
      .toBeNull();
    expect(transitionSetup(classic, { phase: 'players' }, {
      type: SETUP_EVENTS.CONTINUE,
      starterOffset: 2,
    })).toBeNull();
  });

  it('keeps the style screen only when the compiled run has a real choice', () => {
    expect(classic.hasStyleChoice).toBe(true);
    expect(transitionSetup(classic, { phase: 'duration' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ modeId: 'original', phase: 'mode' });

    expect(firstDate.hasStyleChoice).toBe(false);
    expect(transitionSetup(firstDate, { phase: 'duration' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ modeId: 'calm', phase: 'intro' });
  });

  it('routes a consent-gated run through its private entry gate', () => {
    expect(lateNight.requiresConsent).toBe(true);
    expect(transitionSetup(lateNight, { phase: 'duration' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ modeId: 'explicit', phase: 'consentGatePassA' });
    expect(transitionSetup(lateNight, { phase: 'mode' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ phase: 'consentGatePassA' });
  });

  it('walks Back through exactly the screens the forward flow can show', () => {
    expect(transitionSetup(classic, { phase: 'players' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'start' });
    expect(transitionSetup(classic, { phase: 'pack' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'players' });
    expect(transitionSetup(classic, { phase: 'duration' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'pack' });
    expect(transitionSetup(classic, { phase: 'mode' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'duration' });
    expect(transitionSetup(classic, { phase: 'intro' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'mode' });
    expect(transitionSetup(firstDate, { phase: 'intro' }, { type: SETUP_EVENTS.BACK }))
      .toEqual({ phase: 'duration' });
    expect(transitionSetup(lateNight, { phase: 'intro' }, { type: SETUP_EVENTS.BACK }))
      .toBeNull();
  });

  it('enters the first act from intro and rejects unrelated phase/event pairs', () => {
    expect(transitionSetup(classic, { phase: 'intro' }, { type: SETUP_EVENTS.BEGIN_RUN }))
      .toEqual({ phase: 'act', pending: 0, qIndex: 0 });
    expect(transitionSetup(classic, { phase: 'q' }, { type: SETUP_EVENTS.CONTINUE }))
      .toBeNull();
    expect(transitionSetup(classic, { phase: 'start' }, { type: 'UNKNOWN' })).toBeNull();
  });
});

describe('consent transition core', () => {
  const lateNight = compileRun('late-night', 'standard', 'explicit');
  const classic = compileRun('classic', 'standard', 'original');

  it.each([
    ['consentGatePassA', 'consentGateA'],
    ['consentGatePassB', 'consentGateB'],
    ['consentAct2PassA', 'consentAct2A'],
    ['consentAct2PassB', 'consentAct2B'],
  ])('confirms the private handoff from %s to %s', (phase, nextPhase) => {
    expect(transitionConsent(lateNight, { phase }, {
      type: CONSENT_EVENTS.HANDOFF_CONFIRMED,
    })).toEqual({ phase: nextPhase });
  });

  it.each([
    ['consentGateA', { phase: 'consentGatePassB' }],
    ['consentGateB', { phase: 'intro' }],
    ['consentAct2A', { phase: 'consentAct2PassB' }],
    ['consentAct2B', { phase: 'act', actElapsedMs: 0 }],
  ])('continues the consent sequence from %s', (phase, expected) => {
    expect(transitionConsent(lateNight, { phase }, {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toEqual(expected);
  });

  it.each(['consentGateA', 'consentGateB', 'consentAct2A', 'consentAct2B'])(
    'ends neutrally when consent is declined from %s',
    (phase) => {
      expect(transitionConsent(lateNight, { phase }, {
        type: CONSENT_EVENTS.DECLINE_CONSENT,
      })).toEqual({ phase: 'ending', completed: true, endReason: 'consentDeclined' });
    }
  );

  it('rejects consent events for runs without a consent gate', () => {
    expect(transitionConsent(classic, { phase: 'consentGateA' }, {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toBeNull();
  });

  it('rejects events that do not belong to the current consent phase', () => {
    expect(transitionConsent(lateNight, { phase: 'consentGatePassA' }, {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toBeNull();
    expect(transitionConsent(lateNight, { phase: 'consentGateA' }, {
      type: CONSENT_EVENTS.HANDOFF_CONFIRMED,
    })).toBeNull();
    expect(transitionConsent(lateNight, { phase: 'q' }, {
      type: CONSENT_EVENTS.DECLINE_CONSENT,
    })).toBeNull();
  });
});

describe('act transition core', () => {
  const classic = compileRun('classic', 'standard', 'original');
  const lateNight = compileRun('late-night', 'standard', 'explicit');

  it('starts the pending question with the compiled run identity', () => {
    expect(transitionAct(classic, { phase: 'act', pending: 8 }, {
      type: ACT_EVENTS.START_ACT,
    })).toEqual({
      patch: {
        phase: 'q',
        qIndex: 8,
        actElapsedMs: 0,
        hasStarted: true,
        runFingerprint: classic.fingerprint,
        contentVersion: classic.contentRevision,
      },
      effect: ACT_EFFECTS.ENTER_QUESTION,
    });
  });

  it('rejects an act start without a valid compiled question', () => {
    expect(transitionAct(classic, { phase: 'act', pending: -1 }, {
      type: ACT_EVENTS.START_ACT,
    })).toBeNull();
    expect(transitionAct(classic, { phase: 'act', pending: classic.questions.length }, {
      type: ACT_EVENTS.START_ACT,
    })).toBeNull();
  });

  it('continues an ordinary break to the next act and resets elapsed time', () => {
    expect(transitionAct(classic, { phase: 'break', breakAct: 0 }, {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'act', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
  });

  it('routes only the first Late Night break through renewed consent', () => {
    expect(transitionAct(lateNight, { phase: 'break', breakAct: 0 }, {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'consentAct2PassA', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
    expect(transitionAct(lateNight, { phase: 'break', breakAct: 1 }, {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'act', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
  });

  it('rejects invalid break state and unrelated event/phase pairs', () => {
    expect(transitionAct(classic, { phase: 'break', breakAct: 2 }, {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toBeNull();
    expect(transitionAct(classic, { phase: 'q', pending: 1 }, {
      type: ACT_EVENTS.START_ACT,
    })).toBeNull();
  });
});

describe('private-moment transition core', () => {
  const full = compileRun('classic', 'full', 'original');
  const quick = compileRun('classic', 'quick', 'original');
  const noPrivateMoment = compileRun('late-night', 'standard', 'explicit');
  const privateState = (patch = {}) => ({
    phase: 'secretPass1',
    pending: full.secretAtIndex,
    secretSeen: [false, false],
    hasSecretQuestion: [null, null],
    secretAsked: [null, null],
    ...patch,
  });

  it.each([
    ['secretPass1', 'secret1'],
    ['secretPass2', 'secret2'],
    ['checkPass1', 'check1'],
    ['checkPass2', 'check2'],
    ['checkPassBack', 'q37intro'],
  ])('confirms the private handoff from %s to %s', (phase, nextPhase) => {
    expect(transitionPrivateMoment(full, privateState({ phase }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toEqual({
      patch: { phase: nextPhase },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
  });

  it('returns from the private capture to the pending compiled question', () => {
    expect(transitionPrivateMoment(full, privateState({ phase: 'secretPassBack' }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toEqual({
      patch: { phase: 'q', qIndex: full.secretAtIndex },
      effect: PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION,
    });
  });

  it.each([
    ['secret1', 0, 'secretPass2'],
    ['secret2', 1, 'secretPassBack'],
  ])('records the private choice for %s without mutating state', (phase, player, nextPhase) => {
    const current = privateState({ phase });
    const result = transitionPrivateMoment(full, current, {
      type: PRIVATE_MOMENT_EVENTS.SET_PRIVATE_QUESTION,
      hasQuestion: false,
    });
    expect(result.patch.secretSeen).toEqual(player === 0 ? [true, false] : [false, true]);
    expect(result.patch.hasSecretQuestion).toEqual(player === 0 ? [false, null] : [null, false]);
    expect(result.patch.phase).toBe(nextPhase);
    expect(current.secretSeen).toEqual([false, false]);
    expect(current.hasSecretQuestion).toEqual([null, null]);
  });

  it('ends Quick directly after its regular questions', () => {
    expect(transitionPrivateMoment(quick, privateState({ phase: 'all36' }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({
      patch: { phase: 'ending', completed: true, endReason: 'completed' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
  });

  it.each([
    [[true, true], 'checkPass1'],
    [[false, true], 'checkPass2'],
    [[false, false], 'q37intro'],
  ])('selects the first applicable post-game check for %j', (hasSecretQuestion, phase) => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'all36',
      hasSecretQuestion,
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({ patch: { phase }, effect: PRIVATE_MOMENT_EFFECTS.NONE });
  });

  it('preserves legacy null as an applicable private question', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'all36',
      hasSecretQuestion: [null, null],
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    }).patch.phase).toBe('checkPass1');
  });

  it('skips private checks for a pack whose compiled policy disables them', () => {
    expect(transitionPrivateMoment(noPrivateMoment, privateState({
      phase: 'all36',
      hasSecretQuestion: [true, true],
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({
      patch: { phase: 'q37intro' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
    expect(transitionPrivateMoment(noPrivateMoment, privateState({ phase: 'secretPass1' }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toBeNull();
  });

  it('records check answers and skips a non-applicable second check', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'check1',
      hasSecretQuestion: [true, false],
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED,
      asked: true,
    })).toEqual({
      patch: { secretAsked: [true, null], phase: 'checkPassBack' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
    expect(transitionPrivateMoment(full, privateState({
      phase: 'check1',
      hasSecretQuestion: [true, true],
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED,
      asked: false,
    }).patch).toEqual({ secretAsked: [false, null], phase: 'checkPass2' });
    expect(transitionPrivateMoment(full, privateState({
      phase: 'check2',
      hasSecretQuestion: [false, true],
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED,
      asked: true,
    }).patch).toEqual({ secretAsked: [null, true], phase: 'checkPassBack' });
  });

  it('rejects malformed choices and phase/event mismatches', () => {
    expect(transitionPrivateMoment(full, privateState({ phase: 'secret1' }), {
      type: PRIVATE_MOMENT_EVENTS.SET_PRIVATE_QUESTION,
      hasQuestion: 'yes',
    })).toBeNull();
    expect(transitionPrivateMoment(full, privateState({ phase: 'q' }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED,
      asked: true,
    })).toBeNull();
  });
});

describe('Question 37 transition core', () => {
  const full = compileRun('classic', 'full', 'original');
  const noPrivateMoment = compileRun('late-night', 'full', 'explicit');
  const q37State = (patch = {}) => ({
    phase: 'q37intro',
    secretAsked: [null, null],
    hasSecretQuestion: [null, null],
    ...patch,
  });

  it('opens two sequential turns only when both applicable questions remain', () => {
    expect(transitionQ37(full, q37State({
      secretAsked: [false, false],
      hasSecretQuestion: [true, true],
    }), { type: Q37_EVENTS.ACCEPT_FINALE })).toEqual({ phase: 'q37a' });
  });

  it.each([
    [[false, true], [true, true]],
    [[true, true], [true, true]],
    [[null, null], [false, false]],
  ])('opens the single shared prompt for asked/opt-out state %j / %j', (
    secretAsked,
    hasSecretQuestion
  ) => {
    expect(transitionQ37(full, q37State({ secretAsked, hasSecretQuestion }), {
      type: Q37_EVENTS.ACCEPT_FINALE,
    })).toEqual({ phase: 'q37' });
  });

  it('uses the ordinary shared bonus when the compiled run has no private moment', () => {
    expect(transitionQ37(noPrivateMoment, q37State({
      secretAsked: [false, false],
      hasSecretQuestion: [true, true],
    }), { type: Q37_EVENTS.ACCEPT_FINALE })).toEqual({ phase: 'q37' });
  });

  it('allows an optional end from the intro and between two sequential turns', () => {
    expect(transitionQ37(full, q37State(), { type: Q37_EVENTS.END_OPTIONAL }))
      .toEqual({ phase: 'ending', completed: true, endReason: 'userEnded' });
    expect(transitionQ37(full, q37State({ phase: 'q37a' }), {
      type: Q37_EVENTS.END_OPTIONAL,
    })).toEqual({ phase: 'ending', completed: true, endReason: 'userEnded' });
  });

  it('continues the sequential branch and completes both final prompt forms', () => {
    expect(transitionQ37(full, q37State({ phase: 'q37a' }), {
      type: Q37_EVENTS.CONTINUE_SECOND_TURN,
    })).toEqual({ phase: 'q37b' });
    expect(transitionQ37(full, q37State({ phase: 'q37b' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toEqual({ phase: 'ending', completed: true, endReason: 'completed' });
    expect(transitionQ37(full, q37State({ phase: 'q37' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toEqual({ phase: 'ending', completed: true, endReason: 'completed' });
  });

  it('rejects events outside their exact Q37 phases', () => {
    expect(transitionQ37(full, q37State({ phase: 'q' }), {
      type: Q37_EVENTS.ACCEPT_FINALE,
    })).toBeNull();
    expect(transitionQ37(full, q37State({ phase: 'q37b' }), {
      type: Q37_EVENTS.END_OPTIONAL,
    })).toBeNull();
    expect(transitionQ37(full, q37State({ phase: 'q37intro' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toBeNull();
  });
});

describe('final-question and global transition core', () => {
  const run = compileRun('classic', 'full', 'original');

  it('reveals the pending final question through the standard enter effect', () => {
    const pending = run.questions.length - 1;
    expect(transitionFinale(run, { phase: 'lastIntro', pending }, {
      type: FINALE_EVENTS.REVEAL_LAST,
    })).toEqual({
      patch: { phase: 'q', qIndex: pending },
      effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
    });
  });

  it('rejects an invalid final-question reveal', () => {
    expect(transitionFinale(run, { phase: 'q', pending: run.questions.length - 1 }, {
      type: FINALE_EVENTS.REVEAL_LAST,
    })).toBeNull();
    expect(transitionFinale(run, { phase: 'lastIntro', pending: run.questions.length }, {
      type: FINALE_EVENTS.REVEAL_LAST,
    })).toBeNull();
  });

  it.each(['completed', 'userEnded', 'consentDeclined'])(
    'ends a run with the supported reason %s',
    (reason) => {
      expect(transitionGlobal({ phase: 'q' }, {
        type: GLOBAL_EVENTS.END_RUN,
        reason,
      })).toEqual({ phase: 'ending', completed: true, endReason: reason });
    }
  );

  it('rejects an unknown end reason or unrelated event', () => {
    expect(transitionGlobal({ phase: 'q' }, {
      type: GLOBAL_EVENTS.END_RUN,
      reason: 'unknown',
    })).toBeNull();
    expect(transitionGlobal({ phase: 'q' }, { type: 'UNKNOWN' })).toBeNull();
  });

  it('sets only supported interface languages', () => {
    expect(transitionGlobal({ lang: 'de' }, {
      type: GLOBAL_EVENTS.SET_LANGUAGE,
      lang: 'en',
    })).toEqual({ lang: 'en' });
    expect(transitionGlobal({ lang: 'de' }, {
      type: GLOBAL_EVENTS.SET_LANGUAGE,
      lang: 'fr',
    })).toBeNull();
  });

  it('sets the timer only from an explicit boolean value', () => {
    expect(transitionGlobal({ timerEnabled: true }, {
      type: GLOBAL_EVENTS.SET_TIMER,
      enabled: false,
    })).toEqual({ timerEnabled: false });
    expect(transitionGlobal({ timerEnabled: true }, {
      type: GLOBAL_EVENTS.SET_TIMER,
      enabled: 'false',
    })).toBeNull();
  });
});
