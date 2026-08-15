import {
  ACTS,
  MODES,
  SECRET_AT_INDEX,
  SKIP_TOKENS,
  TOTAL_QUESTIONS,
  actIndexFor,
  classifySecretAsked,
  questionAt,
  starterFor,
} from '../closer';

/*
 * These cover the extractable pure logic behind CLOSER's state machine --
 * question sequencing, turn alternation, and the question-37 truth table.
 * Everything else (phase transitions, timers, persistence) lives inline in
 * CloserGame.js and is exercised manually/via Playwright; see the repo's
 * project notes for what's covered where.
 */

describe('ACTS content invariants', () => {
  it('has exactly 3 acts of 12 questions each, 36 total', () => {
    expect(ACTS).toHaveLength(3);
    ACTS.forEach((act) => expect(act.questions).toHaveLength(12));
    expect(TOTAL_QUESTIONS).toBe(36);
  });

  it('gives every question non-empty de and en text', () => {
    ACTS.forEach((act) => {
      act.questions.forEach((q) => {
        expect(typeof q.de).toBe('string');
        expect(q.de.trim().length).toBeGreaterThan(0);
        expect(typeof q.en).toBe('string');
        expect(q.en.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('only flags the very last question as `last`', () => {
    const allQuestions = ACTS.flatMap((act) => act.questions);
    const lastFlagged = allQuestions.filter((q) => q.last);
    expect(lastFlagged).toHaveLength(1);
    expect(allQuestions[allQuestions.length - 1].last).toBe(true);
  });

  it('only uses recognised twist values', () => {
    const valid = new Set(['predict', 'both', 'nothinking', 'deeper']);
    ACTS.forEach((act) => {
      act.questions.forEach((q) => {
        if (q.twist) expect(valid.has(q.twist)).toBe(true);
      });
    });
  });
});

describe('MODES', () => {
  it('defines twists for every act-referenced twist type in both modes', () => {
    const usedTwists = new Set(
      ACTS.flatMap((act) => act.questions.map((q) => q.twist)).filter(Boolean)
    );
    MODES.forEach((mode) => {
      usedTwists.forEach((twist) => {
        expect(typeof mode.twists[twist]).toBe('boolean');
      });
    });
  });

  it('ORIGINAL keeps BOTH and NO THINKING off, but predict/deeper/stay on', () => {
    const original = MODES.find((m) => m.id === 'original');
    expect(original.twists).toMatchObject({
      predict: true,
      both: false,
      nothinking: false,
      deeper: true,
      stay: true,
    });
  });

  it('DATE NIGHT enables every twist', () => {
    const dateNight = MODES.find((m) => m.id === 'datenight');
    Object.values(dateNight.twists).forEach((on) => expect(on).toBe(true));
  });
});

describe('actIndexFor', () => {
  it('maps question indices to the correct act', () => {
    expect(actIndexFor(0)).toBe(0);
    expect(actIndexFor(11)).toBe(0);
    expect(actIndexFor(12)).toBe(1);
    expect(actIndexFor(23)).toBe(1);
    expect(actIndexFor(24)).toBe(2);
    expect(actIndexFor(35)).toBe(2);
  });

  it('clamps out-of-range indices to the last act rather than throwing', () => {
    expect(actIndexFor(999)).toBe(2);
  });
});

describe('questionAt', () => {
  it('returns the first and last question correctly', () => {
    expect(questionAt(0)).toBe(ACTS[0].questions[0]);
    expect(questionAt(TOTAL_QUESTIONS - 1)).toBe(ACTS[2].questions[11]);
  });

  it('returns the right question across an act boundary', () => {
    expect(questionAt(12)).toBe(ACTS[1].questions[0]);
  });

  it('returns null past the end', () => {
    expect(questionAt(TOTAL_QUESTIONS)).toBeNull();
    expect(questionAt(999)).toBeNull();
  });
});

describe('starterFor', () => {
  it('alternates strictly from one question to the next', () => {
    for (let offset = 0; offset <= 1; offset += 1) {
      for (let i = 0; i < 10; i += 1) {
        expect(starterFor(i, offset)).not.toBe(starterFor(i + 1, offset));
      }
    }
  });

  it('starterOffset flips who opens the very first question', () => {
    expect(starterFor(0, 0)).toBe(0);
    expect(starterFor(0, 1)).toBe(1);
  });

  it('is only ever 0 or 1', () => {
    for (let i = 0; i < 40; i += 1) {
      expect([0, 1]).toContain(starterFor(i, 0));
    }
  });
});

describe('classifySecretAsked', () => {
  it('treats [null, null] (nothing answered yet) as neither/bothAsked false, no pending player', () => {
    expect(classifySecretAsked([null, null])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: null,
    });
  });

  it('flags neither when both said no (pendingPlayer is unused in this branch)', () => {
    // pendingPlayer falls out of the same `a0 === false ? 0 : ...` expression
    // used for the one-pending case, so it comes back as 0 here too -- every
    // call site only reads it when `!neither`, so this is harmless, but the
    // test pins the actual behaviour rather than an assumed one.
    const result = classifySecretAsked([false, false]);
    expect(result.neither).toBe(true);
    expect(result.bothAsked).toBe(false);
  });

  it('flags bothAsked when both said yes', () => {
    expect(classifySecretAsked([true, true])).toEqual({
      neither: false,
      bothAsked: true,
      pendingPlayer: null,
    });
  });

  it('identifies player 0 as pending when only they said no', () => {
    expect(classifySecretAsked([false, true])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: 0,
    });
  });

  it('identifies player 1 as pending when only they said no', () => {
    expect(classifySecretAsked([true, false])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: 1,
    });
  });
});

describe('other constants', () => {
  it('SECRET_AT_INDEX sits between question 27 and 28 (0-indexed 27)', () => {
    expect(SECRET_AT_INDEX).toBe(27);
  });

  it('SKIP_TOKENS is 3, per spec', () => {
    expect(SKIP_TOKENS).toBe(3);
  });
});
