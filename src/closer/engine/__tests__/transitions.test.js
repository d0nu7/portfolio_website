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
  QUESTION_EVENTS,
  SETUP_EVENTS,
  actIndexAt,
  resolveQuestionDestination,
  transitionSetup,
  transitionConsent,
  transitionFinale,
  transitionGlobal,
  transitionPrivateMoment,
  transitionQuestion,
  transitionQ37,
  transitionAct,
} from '../transitions';

const state = (patch = {}) => ({
  privateMomentStatus: 'not-started',
  privateQuestionState: ['unseen', 'unseen'],
  consentDecisions: [null, null],
  starterOffset: 0,
  ...patch,
});

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
    const triggerIndex = full.questions.findIndex(
      (question) => question.id === full.privateMoment.trigger.questionId
    );
    expect(resolveQuestionDestination(full, state(), triggerIndex)).toEqual({
      patch: { phase: 'secretOffer', pending: triggerIndex },
      effect: QUESTION_DESTINATION_EFFECTS.NONE,
    });
    expect(resolveQuestionDestination(full, state({ privateMomentStatus: 'armed' }), triggerIndex))
      .toEqual({
        patch: { phase: 'q', qIndex: triggerIndex },
        effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
      });
    expect(resolveQuestionDestination(quick, state(), triggerIndex).patch.phase)
      .not.toBe('secretOffer');
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
    const current = Object.freeze({
      privateMomentStatus: 'not-started',
    });
    const before = JSON.stringify(full);
    resolveQuestionDestination(full, current, 1);
    expect(JSON.stringify(full)).toBe(before);
  });
});

describe('question completion transition core', () => {
  const run = compileRun('classic', 'full', 'playful');

  it.each([QUESTION_EVENTS.ANSWER_DONE, QUESTION_EVENTS.PASS])(
    '%s advances through the same compiled destination rules',
    (type) => {
      const current = state({ phase: 'q', qIndex: 0 });
      expect(transitionQuestion(run, current, { type }))
        .toEqual(resolveQuestionDestination(run, current, 1));
    }
  );

  it('rejects completion outside a question or for an unknown event', () => {
    expect(transitionQuestion(run, state({ phase: 'act', qIndex: 0 }), {
      type: QUESTION_EVENTS.ANSWER_DONE,
    })).toBeNull();
    expect(transitionQuestion(run, state({ phase: 'q', qIndex: 0 }), {
      type: 'UNKNOWN',
    })).toBeNull();
  });

  it('consumes the CHAOS sparks only when Q16 is left', () => {
    const chaos = compileRun('chaos', 'standard', 'playful');
    const sparkIndex = chaos.questions.findIndex(
      (question) => question.id === chaos.privateMoment.use.questionId
    );
    const result = transitionQuestion(chaos, state({
      phase: 'q',
      qIndex: sparkIndex,
      privateMomentStatus: 'armed',
    }), { type: QUESTION_EVENTS.ANSWER_DONE });
    expect(result.patch.privateMomentStatus).toBe('consumed');
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
      .toEqual({
        modeId: 'explicit',
        phase: 'consentGatePassA',
        consentDecisions: [null, null],
      });
    expect(transitionSetup(lateNight, { phase: 'mode' }, { type: SETUP_EVENTS.CONTINUE }))
      .toEqual({ phase: 'consentGatePassA', consentDecisions: [null, null] });
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
    ['consentGateA', 'consentGatePassB'],
    ['consentAct2A', 'consentAct2PassB'],
  ])('records the first private decision and always continues to person B from %s', (
    phase,
    nextPhase
  ) => {
    expect(transitionConsent(lateNight, state({ phase }), {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toEqual({ phase: nextPhase, consentDecisions: ['yes', null] });
    expect(transitionConsent(lateNight, state({ phase }), {
      type: CONSENT_EVENTS.DECLINE_CONSENT,
    })).toEqual({ phase: nextPhase, consentDecisions: ['no', null] });
  });

  it.each([
    ['consentGateB', 'consentGateAccepted'],
    ['consentAct2B', 'consentAct2Accepted'],
  ])('reveals only the collective accepted result from %s', (phase, nextPhase) => {
    expect(transitionConsent(lateNight, state({
      phase,
      consentDecisions: ['yes', null],
    }), {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toEqual({ phase: nextPhase, consentDecisions: [null, null] });
  });

  it.each([
    ['consentGateB', 'entry'],
    ['consentAct2B', 'act2'],
  ])('ends neutrally after B when either private decision is no from %s', (
    phase,
    consentDeclinedAt
  ) => {
    expect(transitionConsent(lateNight, state({
      phase,
      consentDecisions: ['no', null],
    }), {
      type: CONSENT_EVENTS.CONFIRM_CONSENT,
    })).toEqual(expect.objectContaining({
      phase: 'ending',
      completed: true,
      endReason: 'consentDeclined',
      consentDeclinedAt,
      consentDecisions: [null, null],
    }));
    expect(transitionConsent(lateNight, state({
      phase,
      consentDecisions: ['yes', null],
    }), {
      type: CONSENT_EVENTS.DECLINE_CONSENT,
    })).toEqual(expect.objectContaining({
      phase: 'ending',
      completed: true,
      endReason: 'consentDeclined',
      consentDeclinedAt,
      consentDecisions: [null, null],
    }));
  });

  it('continues only from a collective accepted screen', () => {
    expect(transitionConsent(lateNight, { phase: 'consentGateAccepted' }, {
      type: CONSENT_EVENTS.CONTINUE_AFTER_CONSENT,
    })).toEqual({ phase: 'intro' });
    expect(transitionConsent(lateNight, { phase: 'consentAct2Accepted' }, {
      type: CONSENT_EVENTS.CONTINUE_AFTER_CONSENT,
    })).toEqual({ phase: 'act', actElapsedMs: 0 });
  });

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
      patch: {
        phase: 'consentAct2PassA',
        actElapsedMs: 0,
        consentDecisions: [null, null],
      },
      effect: ACT_EFFECTS.NONE,
    });
    expect(transitionAct(lateNight, { phase: 'break', breakAct: 1 }, {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'act', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
  });

  it('offers First Date after Act I and uses Couples after Act II when armed', () => {
    const firstDate = compileRun('first-date', 'standard', 'calm');
    const couples = compileRun('couples', 'standard', 'tender');
    expect(transitionAct(firstDate, state({ phase: 'break', breakAct: 0 }), {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'secretOffer', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
    expect(transitionAct(couples, state({
      phase: 'break',
      breakAct: 1,
      privateMomentStatus: 'armed',
    }), {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'privateUse', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
  });

  it.each([
    ['first-date', 'standard', 'calm', 0],
    ['date-night', 'standard', 'warm', 0],
    ['couples', 'standard', 'grounded', 0],
    ['friends', 'standard', 'easy', 1],
    ['old-friends', 'standard', 'easy', 0],
    ['deep', 'standard', 'still', 0],
  ])('%s offers its configured after-act moment on %s', (
    packId,
    routeId,
    modeId,
    breakAct
  ) => {
    const configuredRun = compileRun(packId, routeId, modeId);
    expect(transitionAct(configuredRun, state({
      phase: 'break',
      breakAct,
      privateMomentStatus: 'not-started',
    }), {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'secretOffer', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    });
  });

  it.each([
    ['couples', 'grounded'],
    ['deep', 'still'],
  ])('%s consumes its armed intention after Act II', (packId, modeId) => {
    const configuredRun = compileRun(packId, 'standard', modeId);
    expect(transitionAct(configuredRun, state({
      phase: 'break',
      breakAct: 1,
      privateMomentStatus: 'armed',
    }), {
      type: ACT_EVENTS.CONTINUE_FROM_BREAK,
    })).toEqual({
      patch: { phase: 'privateUse', actElapsedMs: 0 },
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
  const triggerIndex = full.questions.findIndex(
    (question) => question.id === full.privateMoment.trigger.questionId
  );
  const privateState = (patch = {}) => ({
    phase: 'secretOffer',
    pending: triggerIndex,
    privateMomentStatus: 'not-started',
    privateQuestionState: ['unseen', 'unseen'],
    starterOffset: 0,
    ...patch,
  });

  it('starts only from the shared offer and keeps a shared skip available', () => {
    expect(transitionPrivateMoment(full, privateState(), {
      type: PRIVATE_MOMENT_EVENTS.START,
    })).toEqual({
      patch: { phase: 'secretPass1', privateMomentStatus: 'in-progress' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
    expect(transitionPrivateMoment(full, privateState({ phase: 'secret1' }), {
      type: PRIVATE_MOMENT_EVENTS.SKIP_ALL,
    })).toEqual({
      patch: {
        phase: 'q',
        qIndex: triggerIndex,
        privateMomentStatus: 'skipped',
        privateQuestionState: ['discarded', 'discarded'],
      },
      effect: PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION,
    });
  });

  it('shared skip discards a Classic category already selected by A', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'secretPass2',
      privateMomentStatus: 'in-progress',
      privateQuestionState: ['pending', 'unseen'],
    }), {
      type: PRIVATE_MOMENT_EVENTS.SKIP_ALL,
    }).patch).toEqual(expect.objectContaining({
      privateMomentStatus: 'skipped',
      privateQuestionState: ['discarded', 'discarded'],
    }));
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

  it('arms Classic and returns to the triggered compiled question', () => {
    expect(transitionPrivateMoment(full, privateState({ phase: 'secretPassBack' }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toEqual({
      patch: {
        phase: 'q',
        qIndex: triggerIndex,
        privateMomentStatus: 'armed',
      },
      effect: PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION,
    });
  });

  it.each([
    ['secret1', 0, 'secretPass2'],
    ['secret2', 1, 'secretPassBack'],
  ])('records only the Classic categorical state for %s without mutating state', (
    phase,
    player,
    nextPhase
  ) => {
    const current = privateState({ phase });
    const result = transitionPrivateMoment(full, current, {
      type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
      accepted: true,
    });
    expect(result.patch.privateQuestionState).toEqual(
      player === 0 ? ['pending', 'unseen'] : ['unseen', 'pending']
    );
    expect(result.patch.phase).toBe(nextPhase);
    expect(current.privateQuestionState).toEqual(['unseen', 'unseen']);
  });

  it('maps Classic A/B roles to the actual players selected at setup', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'secret1',
      starterOffset: 1,
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
      accepted: false,
    }).patch).toEqual({
      phase: 'secretPass2',
      privateQuestionState: ['unseen', 'none'],
    });
  });

  it('does not retain a non-Classic person’s accept/decline choice', () => {
    const firstDate = compileRun('first-date', 'standard', 'calm');
    const current = privateState({ phase: 'secret1' });
    const accepted = transitionPrivateMoment(firstDate, current, {
      type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
      accepted: true,
    });
    const declined = transitionPrivateMoment(firstDate, current, {
      type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
      accepted: false,
    });
    expect(accepted).toEqual(declined);
    expect(accepted.patch).not.toHaveProperty('privateQuestionState');
  });

  it('shows and consumes an immediate-use moment before resuming the next act', () => {
    const oldFriends = compileRun('old-friends', 'standard', 'warm');
    expect(transitionPrivateMoment(oldFriends, privateState({ phase: 'secretPassBack' }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toEqual({
      patch: {
        phase: 'privateUse',
        privateMomentStatus: 'armed',
      },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
    expect(transitionPrivateMoment(oldFriends, privateState({ phase: 'privateUse' }), {
      type: PRIVATE_MOMENT_EVENTS.COMPLETE_USE,
    })).toEqual({
      patch: { phase: 'act', privateMomentStatus: 'consumed', actElapsedMs: 0 },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
  });

  it('routes finale, skipped-finale, Quick, and direct-finale outcomes explicitly', () => {
    const firstDate = compileRun('first-date', 'standard', 'calm');
    expect(transitionPrivateMoment(firstDate, privateState({
      phase: 'all36',
      privateMomentStatus: 'armed',
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    }).patch.phase).toBe('privateFinaleIntro');
    expect(transitionPrivateMoment(firstDate, privateState({
      phase: 'all36',
      privateMomentStatus: 'skipped',
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    }).patch.phase).toBe('privateFinaleSkipped');
    expect(transitionPrivateMoment(quick, privateState({ phase: 'all36' }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    }).patch).toEqual(expect.objectContaining({
      phase: 'ending', completed: true, endReason: 'completed',
    }));
    expect(transitionPrivateMoment(noPrivateMoment, privateState({ phase: 'all36' }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({ patch: { phase: 'directFinale' }, effect: PRIVATE_MOMENT_EFFECTS.NONE });
  });

  it.each([
    ['first-date', 'calm'],
    ['date-night', 'warm'],
    ['friends', 'easy'],
  ])('%s sends an armed Standard run to its two-turn finale', (packId, modeId) => {
    const configuredRun = compileRun(packId, 'standard', modeId);
    expect(transitionPrivateMoment(configuredRun, privateState({
      phase: 'all36',
      privateMomentStatus: 'armed',
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({
      patch: { phase: 'privateFinaleIntro' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
  });

  it('checks pending Classic cards in A/B role order before the finale', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'all36',
      privateQuestionState: ['pending', 'pending'],
      starterOffset: 1,
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({ patch: { phase: 'checkPass2' }, effect: PRIVATE_MOMENT_EFFECTS.NONE });
    expect(transitionPrivateMoment(full, privateState({
      phase: 'check2',
      privateQuestionState: ['pending', 'pending'],
      starterOffset: 1,
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_STATUS,
      status: 'asked',
    })).toEqual({
      patch: {
        phase: 'checkPass1',
        privateQuestionState: ['pending', 'asked'],
      },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    });
    expect(transitionPrivateMoment(full, privateState({
      phase: 'check1',
      privateQuestionState: ['pending', 'asked'],
      starterOffset: 1,
    }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_STATUS,
      status: 'discarded',
    }).patch).toEqual({
      phase: 'checkPassBack',
      privateQuestionState: ['discarded', 'asked'],
    });
  });

  it('skips Classic checks when no private question remains pending', () => {
    expect(transitionPrivateMoment(full, privateState({
      phase: 'all36',
      privateQuestionState: ['asked', 'discarded'],
    }), {
      type: PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS,
    })).toEqual({ patch: { phase: 'q37intro' }, effect: PRIVATE_MOMENT_EFFECTS.NONE });
  });

  it('rejects private phases for packs whose compiled policy disables them', () => {
    expect(transitionPrivateMoment(noPrivateMoment, privateState({ phase: 'secretPass1' }), {
      type: PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED,
    })).toBeNull();
  });

  it('rejects malformed choices and phase/event mismatches', () => {
    expect(transitionPrivateMoment(full, privateState({ phase: 'secret1' }), {
      type: PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE,
      accepted: 'yes',
    })).toBeNull();
    expect(transitionPrivateMoment(full, privateState({ phase: 'q' }), {
      type: PRIVATE_MOMENT_EVENTS.SET_QUESTION_STATUS,
      status: 'asked',
    })).toBeNull();
  });
});

describe('Question 37 transition core', () => {
  const full = compileRun('classic', 'full', 'original');
  const noPrivateMoment = compileRun('late-night', 'full', 'explicit');
  const q37State = (patch = {}) => ({
    phase: 'q37intro',
    privateQuestionState: ['unseen', 'unseen'],
    ...patch,
  });

  it('opens two sequential turns only when both applicable questions remain', () => {
    expect(transitionQ37(full, q37State({
      privateQuestionState: ['pending', 'pending'],
    }), { type: Q37_EVENTS.ACCEPT_FINALE })).toEqual({ phase: 'q37a' });
  });

  it.each([
    { privateQuestionState: ['pending', 'asked'] },
    { privateQuestionState: ['asked', 'discarded'] },
    { privateQuestionState: ['none', 'none'] },
  ])('opens one final prompt for categorical state $privateQuestionState', ({
    privateQuestionState,
  }) => {
    expect(transitionQ37(full, q37State({ privateQuestionState }), {
      type: Q37_EVENTS.ACCEPT_FINALE,
    })).toEqual({ phase: 'q37' });
  });

  it('uses the ordinary shared bonus when the compiled run has no private moment', () => {
    expect(transitionQ37(noPrivateMoment, q37State({
      privateQuestionState: ['pending', 'pending'],
    }), { type: Q37_EVENTS.ACCEPT_FINALE })).toEqual({ phase: 'q37' });
  });

  it('runs an armed pack-specific finale in two explicit turns', () => {
    const firstDate = compileRun('first-date', 'standard', 'calm');
    expect(transitionQ37(firstDate, q37State({ phase: 'privateFinaleIntro' }), {
      type: Q37_EVENTS.ACCEPT_FINALE,
    })).toEqual({ phase: 'privateFinaleA' });
    expect(transitionQ37(firstDate, q37State({ phase: 'privateFinaleA' }), {
      type: Q37_EVENTS.CONTINUE_SECOND_TURN,
    })).toEqual({ phase: 'privateFinaleB' });
    expect(transitionQ37(firstDate, q37State({ phase: 'privateFinaleB' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toEqual(expect.objectContaining({
      phase: 'ending', completed: true, endReason: 'completed',
    }));
  });

  it('allows an optional end from the intro and between two sequential turns', () => {
    expect(transitionQ37(full, q37State(), { type: Q37_EVENTS.END_OPTIONAL }))
      .toEqual(expect.objectContaining({
        phase: 'ending', completed: true, endReason: 'userEnded',
      }));
    expect(transitionQ37(full, q37State({ phase: 'q37a' }), {
      type: Q37_EVENTS.END_OPTIONAL,
    })).toEqual(expect.objectContaining({
      phase: 'ending', completed: true, endReason: 'userEnded',
    }));
  });

  it('continues the sequential branch and completes both final prompt forms', () => {
    expect(transitionQ37(full, q37State({ phase: 'q37a' }), {
      type: Q37_EVENTS.CONTINUE_SECOND_TURN,
    })).toEqual({ phase: 'q37b' });
    expect(transitionQ37(full, q37State({ phase: 'q37b' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toEqual(expect.objectContaining({
      phase: 'ending', completed: true, endReason: 'completed',
    }));
    expect(transitionQ37(full, q37State({ phase: 'q37' }), {
      type: Q37_EVENTS.COMPLETE,
    })).toEqual(expect.objectContaining({
      phase: 'ending', completed: true, endReason: 'completed',
    }));
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
      })).toEqual({
        phase: 'ending',
        completed: true,
        endReason: reason,
        privateMomentStatus: 'consumed',
        privateQuestionState: ['discarded', 'discarded'],
        consentDecisions: [null, null],
      });
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
