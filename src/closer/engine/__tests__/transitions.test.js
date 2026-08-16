import { compileRun } from '../../../constants/closer';
import {
  QUESTION_DESTINATION_EFFECTS,
  actIndexAt,
  resolveQuestionDestination,
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
