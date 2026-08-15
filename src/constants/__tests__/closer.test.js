import {
  ACTS_PER_PACK,
  DEFAULT_PACK_ID,
  PACKS,
  QUESTIONS_PER_ACT,
  SKIP_TOKENS,
  actIndexFor,
  classifySecretAsked,
  finalQuestionIndex,
  getPack,
  questionAt,
  questionIdFor,
  starterFor,
  totalQuestions,
  voiceSrc,
} from '../closer';

/*
 * These cover the extractable pure logic behind CLOSER's state machine --
 * question sequencing, turn alternation, and the question-37 truth table --
 * plus the pack registry itself. Everything else (phase transitions, timers,
 * persistence) lives inline in CloserGame.js and is exercised manually/via
 * Playwright; see the repo's project notes for what's covered where.
 */

const ACTS = PACKS.classic.acts;
const MODES = PACKS.classic.modes;

describe('ACTS content invariants (classic pack)', () => {
  it('has exactly 3 acts of 12 questions each, 36 total', () => {
    expect(ACTS).toHaveLength(3);
    ACTS.forEach((act) => expect(act.questions).toHaveLength(12));
    expect(totalQuestions('classic')).toBe(36);
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

describe('MODES (classic pack)', () => {
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

  it('PLAYFUL (id \'datenight\', renamed from DATE NIGHT -- iteration 6 content review) enables every twist', () => {
    const playful = MODES.find((m) => m.id === 'datenight');
    Object.values(playful.twists).forEach((on) => expect(on).toBe(true));
  });
});

describe('PACKS registry', () => {
  it('DEFAULT_PACK_ID points at a real, registered pack', () => {
    expect(PACKS[DEFAULT_PACK_ID]).toBeDefined();
    expect(PACKS[DEFAULT_PACK_ID].id).toBe(DEFAULT_PACK_ID);
  });

  it('getPack falls back to the default pack for an unknown packId', () => {
    expect(getPack('does-not-exist')).toBe(PACKS[DEFAULT_PACK_ID]);
    expect(getPack(undefined)).toBe(PACKS[DEFAULT_PACK_ID]);
  });

  it('every registered pack has the shape CloserGame.js relies on', () => {
    Object.values(PACKS).forEach((pack) => {
      expect(Array.isArray(pack.acts)).toBe(true);
      expect(Array.isArray(pack.modes)).toBe(true);
      expect(Array.isArray(pack.actStyle)).toBe(true);
      expect(pack.actStyle.length).toBe(pack.acts.length);
      expect(typeof pack.secretAtIndex).toBe('number');
      expect(pack.q37).toBeDefined();
    });
  });

  /*
   * Hard enforcement of the fixed pack schema (regression-test iteration 5,
   * P1.1/P1.3): CloserGame.js's act-break logic (`index % QUESTIONS_PER_ACT`)
   * and CLOSER's global copy ("Das waren alle 36.", "FRAGE 37", "Etwa 45
   * Minuten", three skip tokens, a 15-minute act timer) all assume every
   * pack is exactly ACTS_PER_PACK acts of QUESTIONS_PER_ACT questions each.
   * That assumption is deliberate (see the architecture comment in
   * closer.js), not incidental -- so a pack that doesn't fit must fail here
   * rather than silently misbehave in the running game.
   */
  it('every registered pack matches the fixed ACTS_PER_PACK x QUESTIONS_PER_ACT schema', () => {
    Object.values(PACKS).forEach((pack) => {
      expect(pack.acts).toHaveLength(ACTS_PER_PACK);
      pack.acts.forEach((act) => expect(act.questions).toHaveLength(QUESTIONS_PER_ACT));
      expect(totalQuestions(pack.id)).toBe(ACTS_PER_PACK * QUESTIONS_PER_ACT);
    });
  });

  it('every registered pack places the secret question inside its bounds', () => {
    Object.values(PACKS).forEach((pack) => {
      expect(pack.secretAtIndex).toBeGreaterThan(0);
      expect(pack.secretAtIndex).toBeLessThan(totalQuestions(pack.id));
    });
  });
});

describe('actIndexFor', () => {
  it('maps question indices to the correct act', () => {
    expect(actIndexFor('classic', 0)).toBe(0);
    expect(actIndexFor('classic', 11)).toBe(0);
    expect(actIndexFor('classic', 12)).toBe(1);
    expect(actIndexFor('classic', 23)).toBe(1);
    expect(actIndexFor('classic', 24)).toBe(2);
    expect(actIndexFor('classic', 35)).toBe(2);
  });

  it('clamps out-of-range indices to the last act rather than throwing', () => {
    expect(actIndexFor('classic', 999)).toBe(2);
  });

  it('falls back to the default pack for an unknown packId', () => {
    expect(actIndexFor('nope', 0)).toBe(actIndexFor('classic', 0));
  });
});

describe('questionAt', () => {
  it('returns the first and last question correctly', () => {
    expect(questionAt('classic', 0)).toBe(ACTS[0].questions[0]);
    expect(questionAt('classic', finalQuestionIndex('classic'))).toBe(ACTS[2].questions[11]);
  });

  it('returns the right question across an act boundary', () => {
    expect(questionAt('classic', 12)).toBe(ACTS[1].questions[0]);
  });

  it('returns null past the end', () => {
    expect(questionAt('classic', totalQuestions('classic'))).toBeNull();
    expect(questionAt('classic', 999)).toBeNull();
  });
});

describe('questionIdFor / voiceSrc', () => {
  it('produces stable, 1-indexed, zero-padded ids', () => {
    expect(questionIdFor('classic', 0)).toBe('classic-q01');
    expect(questionIdFor('classic', 35)).toBe('classic-q36');
  });

  it('builds a pack-namespaced audio path from a packId/lang/questionId', () => {
    expect(voiceSrc('classic', 'de', 'classic-q01')).toBe(
      '/audio/closer/classic/de/classic-q01.mp3'
    );
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
  it('the classic pack\'s secretAtIndex sits between question 27 and 28 (0-indexed 27)', () => {
    expect(PACKS.classic.secretAtIndex).toBe(27);
  });

  it('SKIP_TOKENS is 3, per spec', () => {
    expect(SKIP_TOKENS).toBe(3);
  });
});
