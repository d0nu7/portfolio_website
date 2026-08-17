/*
 * Pure navigation rules for moving between route questions. The caller owns
 * side effects such as vibration and question-screen setup; this module only
 * decides the next persisted state patch and reports the requested effect.
 */

export const QUESTION_DESTINATION_EFFECTS = Object.freeze({
  NONE: null,
  ACT_BREAK: 'act-break',
  LAST_QUESTION: 'last-question',
  ENTER_QUESTION: 'enter-question',
});

export const QUESTION_EVENTS = Object.freeze({
  ANSWER_DONE: 'ANSWER_DONE',
  PASS: 'PASS',
});

export const GLOBAL_EVENTS = Object.freeze({
  END_RUN: 'END_RUN',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_TIMER: 'SET_TIMER',
});

const END_REASONS = new Set(['completed', 'userEnded', 'consentDeclined']);
const SUPPORTED_LANGUAGES = new Set(['de', 'en']);

export function transitionGlobal(state, event) {
  if (!event || typeof event.type !== 'string') return null;
  if (event.type === GLOBAL_EVENTS.SET_LANGUAGE) {
    return SUPPORTED_LANGUAGES.has(event.lang) ? { lang: event.lang } : null;
  }
  if (event.type === GLOBAL_EVENTS.SET_TIMER) {
    return typeof event.enabled === 'boolean' ? { timerEnabled: event.enabled } : null;
  }
  if (event.type === GLOBAL_EVENTS.END_RUN && END_REASONS.has(event.reason)) {
    return {
      phase: 'ending',
      completed: true,
      endReason: event.reason,
      privateMomentStatus: 'consumed',
      privateQuestionState: ['discarded', 'discarded'],
      consentDecisions: [null, null],
    };
  }
  return null;
}

export const FINALE_EVENTS = Object.freeze({
  REVEAL_LAST: 'REVEAL_LAST',
});

export function transitionFinale(run, state, event) {
  if (!event || event.type !== FINALE_EVENTS.REVEAL_LAST || state.phase !== 'lastIntro') {
    return null;
  }
  if (!Number.isInteger(state.pending) || !run.questions[state.pending]) return null;
  return {
    patch: { phase: 'q', qIndex: state.pending },
    effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
  };
}

export const SETUP_EVENTS = Object.freeze({
  START_SETUP: 'START_SETUP',
  CONTINUE: 'CONTINUE',
  BACK: 'BACK',
  BEGIN_RUN: 'BEGIN_RUN',
});

export const CONSENT_EVENTS = Object.freeze({
  HANDOFF_CONFIRMED: 'HANDOFF_CONFIRMED',
  CONFIRM_CONSENT: 'CONFIRM_CONSENT',
  DECLINE_CONSENT: 'DECLINE_CONSENT',
  CONTINUE_AFTER_CONSENT: 'CONTINUE_AFTER_CONSENT',
});

export const ACT_EVENTS = Object.freeze({
  START_ACT: 'START_ACT',
  CONTINUE_FROM_BREAK: 'CONTINUE_FROM_BREAK',
});

export const ACT_EFFECTS = Object.freeze({
  NONE: null,
  ENTER_QUESTION: 'enter-question',
});

export const PRIVATE_MOMENT_EVENTS = Object.freeze({
  START: 'START',
  SKIP_ALL: 'SKIP_ALL',
  HANDOFF_CONFIRMED: 'HANDOFF_CONFIRMED',
  SET_CARD_CHOICE: 'SET_CARD_CHOICE',
  COMPLETE_USE: 'COMPLETE_USE',
  CONTINUE_AFTER_QUESTIONS: 'CONTINUE_AFTER_QUESTIONS',
  SET_QUESTION_STATUS: 'SET_QUESTION_STATUS',
});

export const PRIVATE_MOMENT_EFFECTS = Object.freeze({
  NONE: null,
  ENTER_QUESTION: 'enter-question',
});

export function privateMomentEnabled(run) {
  return Boolean(run.privateMoment && run.privateMoment !== 'none');
}

export function classifyPrivateQuestions(questionState = ['unseen', 'unseen']) {
  const pendingPlayers = questionState
    .map((value, index) => (value === 'pending' ? index : null))
    .filter((value) => value !== null);
  return {
    pendingPlayers,
    pendingCount: pendingPlayers.length,
    pendingPlayer: pendingPlayers.length === 1 ? pendingPlayers[0] : null,
  };
}

export const Q37_EVENTS = Object.freeze({
  ACCEPT_FINALE: 'ACCEPT_FINALE',
  END_OPTIONAL: 'END_OPTIONAL',
  CONTINUE_SECOND_TURN: 'CONTINUE_SECOND_TURN',
  COMPLETE: 'COMPLETE',
});

export function transitionQ37(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;
  const q37Phase = [
    'q37intro', 'q37', 'q37a', 'q37b',
    'privateFinaleIntro', 'privateFinaleA', 'privateFinaleB',
    'privateFinaleSkipped', 'directFinale',
  ].includes(state.phase);
  if (!q37Phase) return null;

  if (event.type === Q37_EVENTS.END_OPTIONAL) {
    if (!['q37intro', 'q37a', 'privateFinaleIntro', 'privateFinaleA'].includes(state.phase)) {
      return null;
    }
    return transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'userEnded' });
  }

  if (event.type === Q37_EVENTS.ACCEPT_FINALE && state.phase === 'privateFinaleIntro') {
    return { phase: 'privateFinaleA' };
  }

  if (event.type === Q37_EVENTS.ACCEPT_FINALE && state.phase === 'q37intro') {
    const classicFinale = privateMomentEnabled(run) && run.privateMoment.use.kind === 'classic-finale';
    const { pendingCount } = classifyPrivateQuestions(state.privateQuestionState);
    return { phase: classicFinale && pendingCount === 2 ? 'q37a' : 'q37' };
  }

  if (event.type === Q37_EVENTS.CONTINUE_SECOND_TURN && state.phase === 'q37a') {
    return { phase: 'q37b' };
  }

  if (event.type === Q37_EVENTS.CONTINUE_SECOND_TURN && state.phase === 'privateFinaleA') {
    return { phase: 'privateFinaleB' };
  }

  if (
    event.type === Q37_EVENTS.COMPLETE &&
    ['q37', 'q37b', 'privateFinaleB', 'privateFinaleSkipped', 'directFinale'].includes(state.phase)
  ) {
    return transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'completed' });
  }

  return null;
}

function resumeAfterPrivateMoment(run, state, status) {
  const basePatch = {
    privateMomentStatus: status,
    ...(status === 'skipped' && run.privateMoment.use.kind === 'classic-finale'
      ? { privateQuestionState: ['discarded', 'discarded'] }
      : {}),
  };
  if (run.privateMoment.trigger.kind === 'before-question') {
    if (!Number.isInteger(state.pending) || !run.questions[state.pending]) return null;
    return {
      patch: { ...basePatch, phase: 'q', qIndex: state.pending },
      effect: PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION,
    };
  }
  return {
    patch: { ...basePatch, phase: 'act', actElapsedMs: 0 },
    effect: PRIVATE_MOMENT_EFFECTS.NONE,
  };
}

export function transitionPrivateMoment(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;
  const enabled = privateMomentEnabled(run);
  const privatePhase = state.phase.startsWith('secret') ||
    state.phase.startsWith('check') || state.phase === 'privateUse';
  if (privatePhase && !enabled) return null;

  if (event.type === PRIVATE_MOMENT_EVENTS.START && state.phase === 'secretOffer') {
    return {
      patch: { phase: 'secretPass1', privateMomentStatus: 'in-progress' },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    };
  }

  if (
    event.type === PRIVATE_MOMENT_EVENTS.SKIP_ALL &&
    ['secretOffer', 'secretPass1', 'secret1', 'secretPass2', 'secret2'].includes(state.phase)
  ) {
    return resumeAfterPrivateMoment(run, state, 'skipped');
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.HANDOFF_CONFIRMED) {
    const simpleTarget = {
      secretPass1: 'secret1',
      secretPass2: 'secret2',
      checkPass1: 'check1',
      checkPass2: 'check2',
      checkPassBack: 'q37intro',
    }[state.phase];
    if (simpleTarget) {
      return { patch: { phase: simpleTarget }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
    }
    if (state.phase === 'secretPassBack') {
      const use = run.privateMoment.use;
      if (use.kind === 'immediate') {
        return {
          patch: {
            phase: 'privateUse',
            privateMomentStatus: 'armed',
          },
          effect: PRIVATE_MOMENT_EFFECTS.NONE,
        };
      }
      return resumeAfterPrivateMoment(run, state, 'armed');
    }
    return null;
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.SET_CARD_CHOICE) {
    if (typeof event.accepted !== 'boolean') return null;
    const roleIndex = state.phase === 'secret1' ? 0 : state.phase === 'secret2' ? 1 : null;
    if (roleIndex === null) return null;
    const starterOffset = state.starterOffset === 1 ? 1 : 0;
    const playerIndex = roleIndex === 0 ? starterOffset : 1 - starterOffset;
    const patch = {
      phase: roleIndex === 0 ? 'secretPass2' : 'secretPassBack',
    };
    if (run.privateMoment.use.kind === 'classic-finale') {
      const privateQuestionState = [...state.privateQuestionState];
      privateQuestionState[playerIndex] = event.accepted ? 'pending' : 'none';
      patch.privateQuestionState = privateQuestionState;
    }
    return { patch, effect: PRIVATE_MOMENT_EFFECTS.NONE };
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.COMPLETE_USE && state.phase === 'privateUse') {
    return {
      patch: { phase: 'act', privateMomentStatus: 'consumed', actElapsedMs: 0 },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    };
  }

  if (
    event.type === PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS &&
    state.phase === 'all36'
  ) {
    if (run.directFinale) {
      return { patch: { phase: 'directFinale' }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
    }
    if (run.routeId === 'quick') {
      return {
        patch: transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'completed' }),
        effect: PRIVATE_MOMENT_EFFECTS.NONE,
      };
    }
    if (enabled && run.privateMoment.use.kind === 'finale') {
      const phase = state.privateMomentStatus === 'armed'
        ? 'privateFinaleIntro'
        : 'privateFinaleSkipped';
      return { patch: { phase }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
    }
    if (enabled && run.privateMoment.use.kind === 'classic-finale') {
      const { pendingPlayers } = classifyPrivateQuestions(state.privateQuestionState);
      const starterOffset = state.starterOffset === 1 ? 1 : 0;
      const orderedPlayers = [starterOffset, 1 - starterOffset];
      const firstPending = orderedPlayers.find((player) => pendingPlayers.includes(player));
      const phase = firstPending === undefined ? 'q37intro' : `checkPass${firstPending + 1}`;
      return { patch: { phase }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
    }
    return { patch: { phase: 'q37intro' }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.SET_QUESTION_STATUS) {
    const allowed = new Set(['asked', 'pending', 'discarded']);
    if (!allowed.has(event.status)) return null;
    const playerIndex = state.phase === 'check1' ? 0 : state.phase === 'check2' ? 1 : null;
    if (playerIndex === null || state.privateQuestionState[playerIndex] !== 'pending') return null;
    const privateQuestionState = [...state.privateQuestionState];
    privateQuestionState[playerIndex] = event.status;
    const starterOffset = state.starterOffset === 1 ? 1 : 0;
    const orderedPlayers = [starterOffset, 1 - starterOffset];
    const currentRoleIndex = orderedPlayers.indexOf(playerIndex);
    const nextPending = orderedPlayers
      .slice(currentRoleIndex + 1)
      .find((player) => privateQuestionState[player] === 'pending');
    return {
      patch: {
        privateQuestionState,
        phase: nextPending === undefined ? 'checkPassBack' : `checkPass${nextPending + 1}`,
      },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    };
  }

  return null;
}

export function transitionAct(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;

  if (event.type === ACT_EVENTS.START_ACT && state.phase === 'act') {
    if (!Number.isInteger(state.pending) || !run.questions[state.pending]) return null;
    return {
      patch: {
        phase: 'q',
        qIndex: state.pending,
        actElapsedMs: 0,
        hasStarted: true,
        runFingerprint: run.fingerprint,
        contentVersion: run.contentRevision,
      },
      effect: ACT_EFFECTS.ENTER_QUESTION,
    };
  }

  if (event.type === ACT_EVENTS.CONTINUE_FROM_BREAK && state.phase === 'break') {
    if (state.breakAct !== 0 && state.breakAct !== 1) return null;
    const completedAct = state.breakAct + 1;
    if (run.requiresConsent && completedAct === 1) {
      return {
        patch: { phase: 'consentAct2PassA', actElapsedMs: 0, consentDecisions: [null, null] },
        effect: ACT_EFFECTS.NONE,
      };
    }
    if (privateMomentEnabled(run)) {
      const { trigger, use } = run.privateMoment;
      if (
        state.privateMomentStatus === 'armed' &&
        use.kind === 'after-act' &&
        use.act === completedAct
      ) {
        return {
          patch: { phase: 'privateUse', actElapsedMs: 0 },
          effect: ACT_EFFECTS.NONE,
        };
      }
      if (
        state.privateMomentStatus === 'not-started' &&
        trigger.kind === 'after-act' &&
        trigger.act === completedAct
      ) {
        return {
          patch: { phase: 'secretOffer', actElapsedMs: 0 },
          effect: ACT_EFFECTS.NONE,
        };
      }
    }
    return {
      patch: { phase: 'act', actElapsedMs: 0 },
      effect: ACT_EFFECTS.NONE,
    };
  }

  return null;
}

export function transitionConsent(run, state, event) {
  if (!run.requiresConsent || !event || typeof event.type !== 'string') return null;

  const handoffTarget = {
    consentGatePassA: 'consentGateA',
    consentGatePassB: 'consentGateB',
    consentAct2PassA: 'consentAct2A',
    consentAct2PassB: 'consentAct2B',
  }[state.phase];
  if (event.type === CONSENT_EVENTS.HANDOFF_CONFIRMED) {
    return handoffTarget ? { phase: handoffTarget } : null;
  }

  if (event.type === CONSENT_EVENTS.CONTINUE_AFTER_CONSENT) {
    if (state.phase === 'consentGateAccepted') return { phase: 'intro' };
    if (state.phase === 'consentAct2Accepted') return { phase: 'act', actElapsedMs: 0 };
    return null;
  }

  const decisionPhases = new Set([
    'consentGateA',
    'consentGateB',
    'consentAct2A',
    'consentAct2B',
  ]);
  if (!decisionPhases.has(state.phase)) return null;

  const choice = event.type === CONSENT_EVENTS.CONFIRM_CONSENT
    ? 'yes'
    : event.type === CONSENT_EVENTS.DECLINE_CONSENT
    ? 'no'
    : null;
  if (!choice) return null;

  const firstPerson = state.phase.endsWith('A');
  const act2 = state.phase.startsWith('consentAct2');
  const consentDecisions = [...(state.consentDecisions || [null, null])];
  if (firstPerson) {
    consentDecisions[0] = choice;
    return {
      phase: act2 ? 'consentAct2PassB' : 'consentGatePassB',
      consentDecisions,
    };
  }

  consentDecisions[1] = choice;
  if (consentDecisions.includes('no')) {
    return {
      ...transitionGlobal(state, {
        type: GLOBAL_EVENTS.END_RUN,
        reason: 'consentDeclined',
      }),
      consentDeclinedAt: act2 ? 'act2' : 'entry',
    };
  }
  return {
    phase: act2 ? 'consentAct2Accepted' : 'consentGateAccepted',
    consentDecisions: [null, null],
  };
}

export function transitionSetup(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;

  if (event.type === SETUP_EVENTS.START_SETUP && state.phase === 'start') {
    return { phase: 'players' };
  }

  if (event.type === SETUP_EVENTS.BACK) {
    if (state.phase === 'intro') {
      if (run.requiresConsent) return null;
      return { phase: run.hasStyleChoice ? 'mode' : 'duration' };
    }
    const target = {
      players: 'start',
      pack: 'players',
      duration: 'pack',
      mode: 'duration',
    }[state.phase];
    return target ? { phase: target } : null;
  }

  if (event.type === SETUP_EVENTS.BEGIN_RUN && state.phase === 'intro') {
    return { phase: 'act', pending: 0, qIndex: 0 };
  }

  if (event.type !== SETUP_EVENTS.CONTINUE) return null;

  if (state.phase === 'players') {
    if (event.starterOffset !== 0 && event.starterOffset !== 1) return null;
    return { phase: 'pack', starterOffset: event.starterOffset };
  }
  if (state.phase === 'pack') return { phase: 'duration' };
  if (state.phase === 'duration') {
    return {
      modeId: run.modeId,
      phase: run.hasStyleChoice ? 'mode' : run.requiresConsent ? 'consentGatePassA' : 'intro',
      ...(run.hasStyleChoice || !run.requiresConsent ? {} : { consentDecisions: [null, null] }),
    };
  }
  if (state.phase === 'mode') {
    return {
      phase: run.requiresConsent ? 'consentGatePassA' : 'intro',
      ...(run.requiresConsent ? { consentDecisions: [null, null] } : {}),
    };
  }

  return null;
}

export function actIndexAt(run, questionIndex) {
  let result = 0;
  for (let i = 0; i < run.actStarts.length; i += 1) {
    if (questionIndex >= run.actStarts[i]) result = i;
    else break;
  }
  return result;
}

export function resolveQuestionDestination(run, state, index) {
  const total = run.questions.length;

  if (index >= total) {
    return { patch: { phase: 'all36' }, effect: QUESTION_DESTINATION_EFFECTS.NONE };
  }

  const boundaryActIndex = run.actStarts.indexOf(index);
  if (boundaryActIndex > 0) {
    return {
      patch: { phase: 'break', breakAct: boundaryActIndex - 1, pending: index },
      effect: QUESTION_DESTINATION_EFFECTS.ACT_BREAK,
    };
  }

  const moment = privateMomentEnabled(run) ? run.privateMoment : null;
  if (
    moment &&
    (state.privateMomentStatus || 'not-started') === 'not-started' &&
    moment.trigger.kind === 'before-question' &&
    run.questions[index]?.id === moment.trigger.questionId
  ) {
    return {
      patch: { phase: 'secretOffer', pending: index },
      effect: QUESTION_DESTINATION_EFFECTS.NONE,
    };
  }

  if (index === total - 1) {
    return {
      patch: { phase: 'lastIntro', pending: index },
      effect: QUESTION_DESTINATION_EFFECTS.LAST_QUESTION,
    };
  }

  return {
    patch: { phase: 'q', qIndex: index },
    effect: QUESTION_DESTINATION_EFFECTS.ENTER_QUESTION,
  };
}

export function transitionQuestion(run, state, event) {
  if (
    state.phase !== 'q' ||
    !event ||
    (event.type !== QUESTION_EVENTS.ANSWER_DONE && event.type !== QUESTION_EVENTS.PASS) ||
    !Number.isInteger(state.qIndex)
  ) {
    return null;
  }
  const result = resolveQuestionDestination(run, state, state.qIndex + 1);
  if (!result) return null;
  const moment = privateMomentEnabled(run) ? run.privateMoment : null;
  if (
    moment?.use.kind === 'question' &&
    state.privateMomentStatus === 'armed' &&
    run.questions[state.qIndex]?.id === moment.use.questionId
  ) {
    return {
      ...result,
      patch: { ...result.patch, privateMomentStatus: 'consumed' },
    };
  }
  return result;
}
