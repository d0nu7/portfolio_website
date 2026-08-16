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
    return { phase: 'ending', completed: true, endReason: 'consentDeclined' };
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
