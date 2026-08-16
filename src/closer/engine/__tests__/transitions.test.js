import { compileRun } from '../../../constants/closer';
import {
  ACT_EFFECTS,
  ACT_EVENTS,
  CONSENT_EVENTS,
  QUESTION_DESTINATION_EFFECTS,
  SETUP_EVENTS,
  actIndexAt,
  resolveQuestionDestination,
  transitionSetup,
  transitionConsent,
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
