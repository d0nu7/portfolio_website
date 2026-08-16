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
