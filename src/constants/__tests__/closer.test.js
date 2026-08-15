import {
  ACTS_PER_PACK,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  PACKS,
  QUESTIONS_PER_ACT,
  SKIP_TOKENS,
  actIndexFor,
  actStartIndices,
  classifySecretAsked,
  finalQuestionIndex,
  getPack,
  getRoute,
  originalIndexFor,
  questionAt,
  questionIdFor,
  resolvedActs,
  secretAtIndexFor,
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
   * Hard enforcement of the fixed ACT COUNT (regression-test iteration 5,
   * P1.1/P1.3): CloserGame.js's act-break logic and CLOSER's global copy
   * ("FRAGE 37", three skip tokens, a per-act timer) all assume every pack
   * is exactly ACTS_PER_PACK acts. That assumption is deliberate (see the
   * architecture comment in closer.js), not incidental -- so a pack that
   * doesn't fit must fail here rather than silently misbehave in the
   * running game.
   *
   * QUESTIONS_PER_ACT is a ceiling per act, not a mandate every pack must
   * fill (iteration 7, Phase 3, per FR-01's "up to twelve questions per
   * act" -- a newer, smaller pack can have fewer while it's still being
   * written). CLASSIC specifically is pinned to exactly 12 per act, 36
   * total, in its own describe block above -- that invariant is about
   * CLASSIC's content staying the full original experience, not about
   * every pack matching it.
   */
  it('every registered pack has exactly ACTS_PER_PACK acts, each with at most QUESTIONS_PER_ACT questions', () => {
    Object.values(PACKS).forEach((pack) => {
      expect(pack.acts).toHaveLength(ACTS_PER_PACK);
      pack.acts.forEach((act) => {
        expect(act.questions.length).toBeGreaterThan(0);
        expect(act.questions.length).toBeLessThanOrEqual(QUESTIONS_PER_ACT);
      });
    });
  });

  it('CLASSIC specifically is still the full, untouched 3x12 = 36 original experience', () => {
    PACKS.classic.acts.forEach((act) => expect(act.questions).toHaveLength(QUESTIONS_PER_ACT));
    expect(totalQuestions('classic')).toBe(ACTS_PER_PACK * QUESTIONS_PER_ACT);
  });

  it('getRoute falls back to a pack\'s own first route if it has no DEFAULT_ROUTE_ID route (e.g. a smaller, in-progress pack)', () => {
    // No real pack lacks a `full` route today (CLASSIC has one) -- this
    // pins getRoute()'s fallback chain directly rather than waiting for a
    // future pack to exercise it for the first time.
    const stub = { id: 'stub', routes: { quick: { id: 'quick' } } };
    const originalStub = PACKS.stub;
    PACKS.stub = stub;
    try {
      expect(getRoute('stub', 'full').id).toBe('quick');
      expect(getRoute('stub', undefined).id).toBe('quick');
    } finally {
      if (originalStub === undefined) delete PACKS.stub;
      else PACKS.stub = originalStub;
    }
  });

  it('every registered pack defines at least one route', () => {
    Object.values(PACKS).forEach((pack) => {
      expect(pack.routes).toBeDefined();
      expect(Object.keys(pack.routes).length).toBeGreaterThan(0);
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

/*
 * Iteration 7, Phase 2 (FR-01/FR-02): curated time routes layered on top
 * of the still-fixed 3x12 pack schema. `full` must reproduce the pre-
 * Phase-2 game exactly; `quick`/`standard` are hand-curated subsets with
 * their own invariants worth pinning so a future edit to the curated
 * index lists can't silently break the secret question or the closing
 * question without a test failing.
 */
describe('routes (iteration 7, Phase 2)', () => {
  it('DEFAULT_ROUTE_ID is "full" and every registered pack defines it', () => {
    expect(DEFAULT_ROUTE_ID).toBe('full');
    Object.values(PACKS).forEach((pack) => {
      expect(pack.routes[DEFAULT_ROUTE_ID]).toBeDefined();
    });
  });

  it('getRoute falls back to the default route for an unknown or missing routeId', () => {
    expect(getRoute('classic', 'does-not-exist').id).toBe(DEFAULT_ROUTE_ID);
    expect(getRoute('classic', undefined).id).toBe(DEFAULT_ROUTE_ID);
  });

  it('the full route reproduces the pack unchanged -- same total, same acts, same last question', () => {
    expect(totalQuestions('classic', 'full')).toBe(totalQuestions('classic'));
    expect(totalQuestions('classic', 'full')).toBe(36);
    expect(secretAtIndexFor('classic', 'full')).toBe(PACKS.classic.secretAtIndex);
    expect(questionAt('classic', 35, 'full')).toBe(questionAt('classic', 35));
  });

  it('quick and standard are shorter than full, in the expected proportions', () => {
    expect(totalQuestions('classic', 'quick')).toBe(12);
    expect(totalQuestions('classic', 'standard')).toBe(24);
    expect(totalQuestions('classic', 'full')).toBe(36);
  });

  /*
   * BF8-02 (iteration 8 holistic review): the original Phase-2 curation
   * put two hard Act-I questions (Q07 "how will you die", Q10 "what would
   * you change about your upbringing") third and fourth in Quick -- too
   * steep an intensity jump for a 12-question on-ramp. This pins the
   * corrected selection verbatim against
   * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md's CLASSIC section, so
   * a future edit to CLASSIC_ROUTES can't silently drift from the
   * redactionally-reviewed catalog without a test failing.
   */
  it("quick and standard resolve to exactly the iteration-8 catalog's curated question IDs", () => {
    const idsFor = (routeId) => {
      const total = totalQuestions('classic', routeId);
      return Array.from({ length: total }, (_, i) =>
        questionIdFor('classic', originalIndexFor('classic', i, routeId))
      );
    };
    expect(idsFor('quick')).toEqual([
      'classic-q01', 'classic-q04', 'classic-q09', 'classic-q12',
      'classic-q13', 'classic-q14', 'classic-q16', 'classic-q17',
      'classic-q25', 'classic-q26', 'classic-q31', 'classic-q36',
    ]);
    expect(idsFor('standard')).toEqual([
      'classic-q01', 'classic-q02', 'classic-q03', 'classic-q04',
      'classic-q08', 'classic-q09', 'classic-q11', 'classic-q12',
      'classic-q13', 'classic-q14', 'classic-q15', 'classic-q16',
      'classic-q17', 'classic-q18', 'classic-q20', 'classic-q21',
      'classic-q25', 'classic-q26', 'classic-q27', 'classic-q28',
      'classic-q29', 'classic-q30', 'classic-q31', 'classic-q36',
    ]);
  });

  /*
   * FIRST DATE (iteration 8 catalog rollout, FR8-01) -- same pinning
   * approach as CLASSIC's above, verbatim against
   * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 3's own
   * "Kuratierte Routen" line.
   */
  it("FIRST DATE's quick and standard resolve to exactly the catalog's curated question IDs", () => {
    const idsFor = (routeId) => {
      const total = totalQuestions('first-date', routeId);
      return Array.from({ length: total }, (_, i) =>
        questionIdFor('first-date', originalIndexFor('first-date', i, routeId))
      );
    };
    expect(idsFor('quick')).toEqual([
      'first-date-q01', 'first-date-q02', 'first-date-q04', 'first-date-q07',
      'first-date-q13', 'first-date-q15', 'first-date-q17', 'first-date-q21',
      'first-date-q25', 'first-date-q27', 'first-date-q28', 'first-date-q36',
    ]);
    expect(idsFor('standard')).toEqual([
      'first-date-q01', 'first-date-q02', 'first-date-q03', 'first-date-q04',
      'first-date-q05', 'first-date-q07', 'first-date-q08', 'first-date-q12',
      'first-date-q13', 'first-date-q14', 'first-date-q15', 'first-date-q16',
      'first-date-q17', 'first-date-q19', 'first-date-q21', 'first-date-q24',
      'first-date-q25', 'first-date-q26', 'first-date-q27', 'first-date-q28',
      'first-date-q29', 'first-date-q31', 'first-date-q34', 'first-date-q36',
    ]);
  });

  it('FIRST DATE has exactly 3 acts of 12 questions each, 36 total, and no twists assigned', () => {
    const acts = PACKS['first-date'].acts;
    expect(acts).toHaveLength(3);
    acts.forEach((act) => expect(act.questions).toHaveLength(12));
    expect(totalQuestions('first-date')).toBe(36);
    // Deliberate for now (see the block comment above FIRST_DATE_ACTS in
    // closer.js) -- no question carries a twist or stayEnabled until
    // that's an explicit editorial decision, not an assumption baked into
    // this pack's launch.
    acts.forEach((act) =>
      act.questions.forEach((q) => {
        expect(q.twist).toBeUndefined();
        expect(q.stayEnabled).toBeUndefined();
      })
    );
  });

  /*
   * Every route -- current and any future one, in any pack -- must keep
   * the pack's closing (`last: true`) question as its own actual last
   * question, and must place the secret-question interrupt strictly
   * inside its own bounds, not at or past the end (see closer.js's own
   * comment on secretAtIndexFor for why this is derived, not hand-set,
   * per route). Iterates every registered pack (not just classic, since
   * iteration 8 added first-date) so a future pack's routes get this
   * coverage automatically just by being added to PACKS.
   */
  Object.values(PACKS).forEach((pack) => {
    Object.entries(pack.routes).forEach(([routeId, route]) => {
      describe(`${pack.id} route "${routeId}"`, () => {
        it('ends on the pack\'s actual closing question', () => {
          const total = totalQuestions(pack.id, routeId);
          expect(questionAt(pack.id, total - 1, routeId).last).toBe(true);
        });

        it('places the secret-question interrupt strictly inside its own bounds', () => {
          const total = totalQuestions(pack.id, routeId);
          const secretAt = secretAtIndexFor(pack.id, routeId);
          expect(secretAt).toBeGreaterThan(0);
          expect(secretAt).toBeLessThan(total);
        });

        it('still has exactly ACTS_PER_PACK acts', () => {
          expect(resolvedActs(pack.id, routeId)).toHaveLength(ACTS_PER_PACK);
        });

        it('every route question is non-empty and traceable back to the pack\'s original questions', () => {
          const total = totalQuestions(pack.id, routeId);
          for (let i = 0; i < total; i += 1) {
            const original = originalIndexFor(pack.id, i, routeId);
            expect(original).toBeGreaterThanOrEqual(0);
            expect(original).toBeLessThan(totalQuestions(pack.id));
            expect(questionAt(pack.id, i, routeId)).toBe(questionAt(pack.id, original));
          }
        });

        it("route.actIndices has one entry per act", () => {
          expect(route.actIndices).toHaveLength(ACTS_PER_PACK);
        });
      });
    });
  });

  it('actStartIndices always starts at 0 and matches each act\'s own resolved length', () => {
    ['quick', 'standard', 'full'].forEach((routeId) => {
      const starts = actStartIndices('classic', routeId);
      const acts = resolvedActs('classic', routeId);
      expect(starts[0]).toBe(0);
      expect(starts[1]).toBe(acts[0].questions.length);
      expect(starts[2]).toBe(acts[0].questions.length + acts[1].questions.length);
    });
  });

  it('resolvedActs subtitle reflects the route\'s own per-act question count', () => {
    const fullActs = resolvedActs('classic', 'full');
    expect(fullActs[0].subtitle.de).toBe('12 Fragen · etwa 15 Minuten');
    const quickActs = resolvedActs('classic', 'quick');
    expect(quickActs[0].questions).toHaveLength(4);
    expect(quickActs[0].subtitle.de).toMatch(/^4 Fragen/);
  });

  it('actIndexFor/questionAt/finalQuestionIndex/totalQuestions default to the full route when called with 2 args (backward compatibility)', () => {
    expect(totalQuestions('classic')).toBe(totalQuestions('classic', 'full'));
    expect(finalQuestionIndex('classic')).toBe(finalQuestionIndex('classic', 'full'));
    expect(actIndexFor('classic', 20)).toBe(actIndexFor('classic', 20, 'full'));
    expect(questionAt('classic', 20)).toBe(questionAt('classic', 20, 'full'));
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
  // hasSecretQuestion omitted (undefined) in most of these on purpose --
  // bugfix-report iteration 7 added it as a second argument, but every
  // pre-existing call/save has none, and null there must classify exactly
  // as before (default "has a question, not yet resolved" per person).
  it('treats [null, null] (nothing answered yet) as neither/bothAsked false, no pending player', () => {
    expect(classifySecretAsked([null, null])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: null,
      noneHaveSecretQuestion: false,
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
      noneHaveSecretQuestion: false,
    });
  });

  it('identifies player 0 as pending when only they said no', () => {
    expect(classifySecretAsked([false, true])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: 0,
      noneHaveSecretQuestion: false,
    });
  });

  it('identifies player 1 as pending when only they said no', () => {
    expect(classifySecretAsked([true, false])).toEqual({
      neither: false,
      bothAsked: false,
      pendingPlayer: 1,
      noneHaveSecretQuestion: false,
    });
  });

  // hasSecretQuestion (bugfix-report iteration 7, BF-08/FR-07): 'Heute
  // keine' opts a person out of this accounting entirely, not just out of
  // one screen.
  describe('with hasSecretQuestion (BF-08 opt-out)', () => {
    it('flags noneHaveSecretQuestion when both opted out, regardless of secretAsked', () => {
      expect(classifySecretAsked([null, null], [false, false])).toEqual({
        neither: false,
        bothAsked: false,
        pendingPlayer: null,
        noneHaveSecretQuestion: true,
      });
    });

    it('treats an opted-out person as resolved -- the other pending still surfaces', () => {
      // Player 0 opted out; player 1 has a question that hasn't been asked.
      expect(classifySecretAsked([null, false], [false, true])).toEqual({
        neither: false,
        bothAsked: false,
        pendingPlayer: 1,
        noneHaveSecretQuestion: false,
      });
    });

    it('flags bothAsked when the only applicable person was asked and the other opted out', () => {
      expect(classifySecretAsked([null, true], [false, true])).toEqual({
        neither: false,
        bothAsked: true,
        pendingPlayer: null,
        noneHaveSecretQuestion: false,
      });
    });

    it('null (not yet decided) classifies the same as true (has one, unresolved)', () => {
      expect(classifySecretAsked([false, false], [null, null])).toEqual(
        classifySecretAsked([false, false], [true, true])
      );
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
