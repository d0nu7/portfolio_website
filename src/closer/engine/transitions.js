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
    return { phase: 'ending', completed: true, endReason: event.reason };
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
  HANDOFF_CONFIRMED: 'HANDOFF_CONFIRMED',
  SET_PRIVATE_QUESTION: 'SET_PRIVATE_QUESTION',
  CONTINUE_AFTER_QUESTIONS: 'CONTINUE_AFTER_QUESTIONS',
  SET_QUESTION_ASKED: 'SET_QUESTION_ASKED',
});

export const PRIVATE_MOMENT_EFFECTS = Object.freeze({
  NONE: null,
  ENTER_QUESTION: 'enter-question',
});

function privateMomentEnabled(run) {
  return run.routeId !== 'quick' && run.privateMoment !== 'none';
}

/*
 * Classifies private "did you ask your saved question?" answers into the
 * Question 37 branches. Null remains applicable for backward compatibility;
 * only an explicit false opts a person out of having a private question.
 */
export function classifySecretAsked(secretAsked, hasSecretQuestion) {
  const [a0, a1] = secretAsked || [null, null];
  const [h0, h1] = hasSecretQuestion || [null, null];
  const noneHaveSecretQuestion = h0 === false && h1 === false;
  const effective0 = h0 === false ? true : a0;
  const effective1 = h1 === false ? true : a1;
  const neither = !noneHaveSecretQuestion && effective0 === false && effective1 === false;
  const bothAsked = !noneHaveSecretQuestion && effective0 === true && effective1 === true;
  const pendingPlayer = effective0 === false ? 0 : effective1 === false ? 1 : null;
  return { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion };
}

export const Q37_EVENTS = Object.freeze({
  ACCEPT_FINALE: 'ACCEPT_FINALE',
  END_OPTIONAL: 'END_OPTIONAL',
  CONTINUE_SECOND_TURN: 'CONTINUE_SECOND_TURN',
  COMPLETE: 'COMPLETE',
});

export function transitionQ37(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;
  const q37Phase = ['q37intro', 'q37', 'q37a', 'q37b'].includes(state.phase);
  if (!q37Phase) return null;

  if (event.type === Q37_EVENTS.END_OPTIONAL) {
    if (state.phase !== 'q37intro' && state.phase !== 'q37a') return null;
    return transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'userEnded' });
  }

  if (event.type === Q37_EVENTS.ACCEPT_FINALE && state.phase === 'q37intro') {
    const { neither } = classifySecretAsked(state.secretAsked, state.hasSecretQuestion);
    return { phase: privateMomentEnabled(run) && neither ? 'q37a' : 'q37' };
  }

  if (event.type === Q37_EVENTS.CONTINUE_SECOND_TURN && state.phase === 'q37a') {
    return { phase: 'q37b' };
  }

  if (event.type === Q37_EVENTS.COMPLETE && (state.phase === 'q37' || state.phase === 'q37b')) {
    return transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'completed' });
  }

  return null;
}

function hasApplicablePrivateQuestion(run, state, playerIndex) {
  return privateMomentEnabled(run) && state.hasSecretQuestion[playerIndex] !== false;
}

export function transitionPrivateMoment(run, state, event) {
  if (!event || typeof event.type !== 'string') return null;
  const privatePhase = state.phase.startsWith('secret') || state.phase.startsWith('check');
  if (privatePhase && !privateMomentEnabled(run)) return null;

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
      if (!Number.isInteger(state.pending) || !run.questions[state.pending]) return null;
      return {
        patch: { phase: 'q', qIndex: state.pending },
        effect: PRIVATE_MOMENT_EFFECTS.ENTER_QUESTION,
      };
    }
    return null;
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.SET_PRIVATE_QUESTION) {
    if (typeof event.hasQuestion !== 'boolean') return null;
    const playerIndex = state.phase === 'secret1' ? 0 : state.phase === 'secret2' ? 1 : null;
    if (playerIndex === null) return null;
    const secretSeen = [...state.secretSeen];
    const hasSecretQuestion = [...state.hasSecretQuestion];
    secretSeen[playerIndex] = true;
    hasSecretQuestion[playerIndex] = event.hasQuestion;
    return {
      patch: {
        secretSeen,
        hasSecretQuestion,
        phase: playerIndex === 0 ? 'secretPass2' : 'secretPassBack',
      },
      effect: PRIVATE_MOMENT_EFFECTS.NONE,
    };
  }

  if (
    event.type === PRIVATE_MOMENT_EVENTS.CONTINUE_AFTER_QUESTIONS &&
    state.phase === 'all36'
  ) {
    if (run.routeId === 'quick') {
      return {
        patch: transitionGlobal(state, { type: GLOBAL_EVENTS.END_RUN, reason: 'completed' }),
        effect: PRIVATE_MOMENT_EFFECTS.NONE,
      };
    }
    const phase = hasApplicablePrivateQuestion(run, state, 0)
      ? 'checkPass1'
      : hasApplicablePrivateQuestion(run, state, 1)
      ? 'checkPass2'
      : 'q37intro';
    return { patch: { phase }, effect: PRIVATE_MOMENT_EFFECTS.NONE };
  }

  if (event.type === PRIVATE_MOMENT_EVENTS.SET_QUESTION_ASKED) {
    if (typeof event.asked !== 'boolean') return null;
    const playerIndex = state.phase === 'check1' ? 0 : state.phase === 'check2' ? 1 : null;
    if (playerIndex === null || !hasApplicablePrivateQuestion(run, state, playerIndex)) return null;
    const secretAsked = [...state.secretAsked];
    secretAsked[playerIndex] = event.asked;
    const phase = playerIndex === 0 && hasApplicablePrivateQuestion(run, state, 1)
      ? 'checkPass2'
      : 'checkPassBack';
    return {
      patch: { secretAsked, phase },
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
    return {
      patch: {
        phase: run.requiresConsent && state.breakAct === 0 ? 'consentAct2PassA' : 'act',
        actElapsedMs: 0,
      },
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

  const decisionPhases = new Set([
    'consentGateA',
    'consentGateB',
    'consentAct2A',
    'consentAct2B',
  ]);
  if (!decisionPhases.has(state.phase)) return null;

  if (event.type === CONSENT_EVENTS.DECLINE_CONSENT) {
    return transitionGlobal(state, {
      type: GLOBAL_EVENTS.END_RUN,
      reason: 'consentDeclined',
    });
  }
  if (event.type !== CONSENT_EVENTS.CONFIRM_CONSENT) return null;

  const confirmedTarget = {
    consentGateA: { phase: 'consentGatePassB' },
    consentGateB: { phase: 'intro' },
    consentAct2A: { phase: 'consentAct2PassB' },
    consentAct2B: { phase: 'act', actElapsedMs: 0 },
  }[state.phase];
  return confirmedTarget || null;
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
    };
  }
  if (state.phase === 'mode') {
    return { phase: run.requiresConsent ? 'consentGatePassA' : 'intro' };
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

  const privateMomentEnabled = run.routeId !== 'quick' && run.privateMoment !== 'none';
  if (privateMomentEnabled && index === run.secretAtIndex && !state.secretSeen[0]) {
    return {
      patch: { phase: 'secretPass1', pending: index },
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
  return resolveQuestionDestination(run, state, state.qIndex + 1);
}
