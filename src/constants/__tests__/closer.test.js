import {
  ACTS_PER_PACK,
  CONTENT_VERSION,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  LATE_NIGHT_PACK,
  PACKS,
  QUESTIONS_PER_ACT,
  actIndexFor,
  actStartIndices,
  classifySecretAsked,
  compileRun,
  finalQuestionIndex,
  getPack,
  getRoute,
  originalIndexFor,
  pick,
  questionAt,
  questionIdFor,
  resolvedActs,
  routeSubtitleFor,
  routeTimingFor,
  runFingerprintFor,
  runQuestionIdsFor,
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

  it('registers LATE NIGHT for saved-game recovery while marking it for discreet discovery', () => {
    expect(getPack('late-night')).toBe(LATE_NIGHT_PACK);
    expect(PACKS['late-night']).toBe(LATE_NIGHT_PACK);
    expect(LATE_NIGHT_PACK.discoverability).toBe('menu-unlock');
    expect(LATE_NIGHT_PACK.privateMoment).toBe('none');
  });

  it("LATE_NIGHT_PACK's consentGate has both required, non-empty prompts", () => {
    expect(LATE_NIGHT_PACK.consentGate).toBeDefined();
    expect(pick(LATE_NIGHT_PACK.consentGate.notice, 'de')).toBeTruthy();
    expect(pick(LATE_NIGHT_PACK.consentGate.notice, 'en')).toBeTruthy();
    expect(pick(LATE_NIGHT_PACK.consentGate.act2OptIn, 'de')).toBeTruthy();
    expect(pick(LATE_NIGHT_PACK.consentGate.act2OptIn, 'en')).toBeTruthy();
  });

  it('only LATE NIGHT requires the additional consent gate', () => {
    expect(Object.values(PACKS).filter((pack) => pack.consentGate)).toEqual([
      LATE_NIGHT_PACK,
    ]);
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

  // Question IDs belong to content, not positions, so reordered routes and
  // resumed games keep stable identities across every registered pack.
  const ALL_PACKS = PACKS;

  it('every question in every pack has an explicit id', () => {
    // Collect missing IDs so a failure reports every location at once.
    const missing = [];
    Object.entries(ALL_PACKS).forEach(([packId, pack]) => {
      pack.acts.forEach((act, actIndex) => {
        act.questions.forEach((q, i) => {
          if (typeof q.id !== 'string' || q.id.length === 0) {
            missing.push(`${packId} act ${actIndex + 1} question ${i + 1}`);
          }
        });
      });
    });
    expect(missing).toEqual([]);
  });

  it('IDs are globally unique and prefixed with their pack id', () => {
    const seen = new Set();
    Object.entries(ALL_PACKS).forEach(([packId, pack]) => {
      pack.acts.forEach((act) => {
        act.questions.forEach((q) => {
          expect(q.id.startsWith(`${packId}-`)).toBe(true);
          expect(seen.has(q.id)).toBe(false);
          seen.add(q.id);
        });
      });
    });
    expect(seen.size).toBe(324);
  });

  it('questionIdFor matches the stored id of every registered question', () => {
    Object.keys(PACKS).forEach((packId) => {
      const total = totalQuestions(packId);
      for (let i = 0; i < total; i += 1) {
        expect(questionIdFor(packId, i)).toBe(questionAt(packId, i).id);
      }
    });
  });

  /*
   * The preceding test alone does not prove that the explicit ID is used.
   * Real IDs intentionally match their positions so existing saves still
   * recognize their stored runQuestionIds. Explicit and position-derived
   * implementations therefore return the same values there.
   *
   * This stub assigns IDs out of position. Only reading the stored `id`
   * satisfies the assertions.
   */
  it('questionIdFor reads the stored id rather than deriving the position', () => {
    const stub = {
      id: 'stub',
      acts: [
        {
          questions: [
            { id: 'stub-zulu', de: 'a', en: 'a' },
            { id: 'stub-alpha', de: 'b', en: 'b' },
          ],
        },
      ],
      routes: { full: { id: 'full', actIndices: [null] } },
    };
    const original = PACKS.stub;
    PACKS.stub = stub;
    try {
      expect(questionIdFor('stub', 0)).toBe('stub-zulu');
      expect(questionIdFor('stub', 1)).toBe('stub-alpha');
    } finally {
      if (original === undefined) delete PACKS.stub;
      else PACKS.stub = original;
    }
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
   * docs/closer/content/question-catalog.de-en.md's CLASSIC section, so
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
   * docs/closer/content/question-catalog.de-en.md section 3's curated-routes
   * line.
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

  it('FIRST DATE has exactly 3 acts of 12 questions each, 36 total', () => {
    const acts = PACKS['first-date'].acts;
    expect(acts).toHaveLength(3);
    acts.forEach((act) => expect(act.questions).toHaveLength(12));
    expect(totalQuestions('first-date')).toBe(36);
  });

  /*
   * Twists were assigned to the iteration-8 packs in a second pass (RaDi's
   * explicit go-ahead to make the call, same as the accent-color choices):
   * a small, restrained set per pack, matching CLASSIC's own founding
   * principle that the app must never be more interesting than the
   * conversation. This guards two things generically, for every pack --
   * including any future one -- rather than pinning exact counts per pack
   * (which would need updating every time a pack's twists are revisited):
   *   1. Any twist type a question uses must actually be turned on by at
   *      least one of the pack's own modes -- a mismatch here would mean
   *      the twist silently never fires (CloserGame.js only activates a
   *      twist when both the question AND the active mode agree).
   *   2. Twist-bearing questions stay sparse -- at most one per act on
   *      average, generous enough not to fight a future deliberate
   *      increase, tight enough to catch an accidental mass-assignment.
   */
  it('every pack only assigns twist types its own modes actually turn on', () => {
    Object.values(PACKS).forEach((pack) => {
      const enabledTwistTypes = new Set();
      pack.modes.forEach((mode) => {
        Object.entries(mode.twists).forEach(([type, on]) => {
          if (on) enabledTwistTypes.add(type);
        });
      });
      pack.acts.forEach((act) =>
        act.questions.forEach((q) => {
          if (q.twist) expect(enabledTwistTypes.has(q.twist)).toBe(true);
        })
      );
    });
  });

  // CLASSIC keeps its own, larger, already-reviewed twist density (spec
  // feedback 11: five in Act I, three in Act II, one in Act III originally)
  // -- this sparseness bound is about the iteration-8 packs specifically,
  // assigned in a single restrained pass rather than reviewed per-question
  // the way CLASSIC's were.
  it('every non-CLASSIC pack keeps its twist-bearing questions sparse (at most one per act on average)', () => {
    Object.values(PACKS)
      .filter((pack) => pack.id !== 'classic')
      .forEach((pack) => {
        let twistCount = 0;
        pack.acts.forEach((act) =>
          act.questions.forEach((q) => {
            if (q.twist) twistCount += 1;
          })
        );
        expect(twistCount).toBeLessThanOrEqual(ACTS_PER_PACK);
      });
  });

  /*
   * Every route -- current and any future one, in any pack -- must place
   * the secret-question interrupt strictly inside its own bounds, not at
   * or past the end (see closer.js's own comment on secretAtIndexFor for
   * why this is derived, not hand-set, per route). Iterates every
   * registered pack (not just classic, since iteration 8 added first-date
   * and beyond) so a future pack's routes get this coverage automatically
   * just by being added to PACKS.
   *
   * The pack's closing (`last: true`) question only has to be the actual
   * last question of its FULL route, not every route: several iteration-8
   * packs (COUPLES, FRIENDS, OLD FRIENDS, CHAOS) deliberately end Quick/
   * Standard one or more questions short of that closer by the catalog's
   * own curation -- e.g. FRIENDS' Q36 is marked Full-only in
   * docs/closer/content/question-catalog.de-en.md, reserving its
   * closing "REFLECT" question for the complete experience. The app
   * itself never reads `.last` at runtime (CloserGame.js's `isLast` is
   * already route-relative, via finalQuestionIndex) -- this was always
   * just an extra content-integrity check, not something the engine
   * depends on, so relaxing it to the full route is safe.
   */
  Object.values(PACKS).forEach((pack) => {
    Object.entries(pack.routes).forEach(([routeId, route]) => {
      describe(`${pack.id} route "${routeId}"`, () => {
        if (routeId === DEFAULT_ROUTE_ID) {
          it('ends on the pack\'s actual closing question', () => {
            const total = totalQuestions(pack.id, routeId);
            expect(questionAt(pack.id, total - 1, routeId).last).toBe(true);
          });
        }

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

  it('uses each route\'s explicit editorial duration for copy and overtime thresholds', () => {
    Object.values(PACKS).forEach((pack) => {
      Object.values(pack.routes).forEach((route) => {
        expect(Number.isInteger(route.minutes)).toBe(true);
        expect(route.minutes).toBeGreaterThan(0);

        const timing = routeTimingFor(pack.id, route.id);
        expect(timing.totalMinutes).toBe(route.minutes);
        expect(timing.actMinutes).toHaveLength(ACTS_PER_PACK);
        expect(timing.actMinutes.reduce((sum, minutes) => sum + minutes, 0)).toBe(route.minutes);
      });
    });
  });

  it('does not force slow DEEP or fast CHAOS routes into CLASSIC pacing', () => {
    expect(routeTimingFor('deep', 'full').actMinutes).toEqual([25, 25, 25]);
    expect(routeTimingFor('chaos', 'quick').actMinutes).toEqual([4, 3, 3]);
    expect(routeSubtitleFor('deep', 'full').de).toBe('36 Fragen · 3 Akte · etwa 75 Minuten');
    expect(routeSubtitleFor('chaos', 'quick').en).toBe('12 questions · 3 acts · about 10 minutes');
  });

  it('actIndexFor/questionAt/finalQuestionIndex/totalQuestions default to the full route when called with 2 args (backward compatibility)', () => {
    expect(totalQuestions('classic')).toBe(totalQuestions('classic', 'full'));
    expect(finalQuestionIndex('classic')).toBe(finalQuestionIndex('classic', 'full'));
    expect(actIndexFor('classic', 20)).toBe(actIndexFor('classic', 20, 'full'));
    expect(questionAt('classic', 20)).toBe(questionAt('classic', 20, 'full'));
  });
});

/*
 * FR8-06 (iteration 8 feature requests): runQuestionIdsFor() is what
 * CloserGame.js snapshots into a save when a game starts, and re-derives
 * on every resume to detect drift. These pin its shape rather than the
 * resume-rejection behavior itself (that's CloserGame.js's own concern,
 * covered by Playwright in e2e/resume-validation.spec.js).
 */
/*
 * The run fingerprint (refactoring roadmap phase 1) condenses the content
 * revision, pack, route and question order. These tests cover both what must
 * change it (order, route, pack and ID) and what must not (copy edits under
 * the same ID).
 */
describe('runFingerprintFor (Phase 1)', () => {
  const stubPack = (questions, routes) => ({
    id: 'fp',
    acts: [{ questions }],
    routes,
    modes: [{ id: 'default' }],
  });
  const withStub = (pack, fn) => {
    const original = PACKS.fp;
    PACKS.fp = pack;
    try {
      return fn();
    } finally {
      if (original === undefined) delete PACKS.fp;
      else PACKS.fp = original;
    }
  };
  const fullRoute = { full: { id: 'full', actIndices: [null] } };

  it('is stable across repeated calls', () => {
    expect(runFingerprintFor('classic', 'quick')).toBe(runFingerprintFor('classic', 'quick'));
  });

  it('distinguishes routes and packs', () => {
    expect(runFingerprintFor('classic', 'quick')).not.toBe(runFingerprintFor('classic', 'full'));
    expect(runFingerprintFor('classic', 'full')).not.toBe(runFingerprintFor('friends', 'full'));
  });

  it('changes when two questions swap positions', () => {
    const a = { id: 'fp-q01', de: 'a', en: 'a' };
    const b = { id: 'fp-q02', de: 'b', en: 'b' };
    const before = withStub(stubPack([a, b], fullRoute), () => runFingerprintFor('fp', 'full'));
    const after = withStub(stubPack([b, a], fullRoute), () => runFingerprintFor('fp', 'full'));
    expect(after).not.toBe(before);
  });

  it('changes when a question is replaced with another ID', () => {
    const base = [{ id: 'fp-q01', de: 'a', en: 'a' }];
    const before = withStub(stubPack(base, fullRoute), () => runFingerprintFor('fp', 'full'));
    const after = withStub(stubPack([{ id: 'fp-q99', de: 'a', en: 'a' }], fullRoute), () =>
      runFingerprintFor('fp', 'full')
    );
    expect(after).not.toBe(before);
  });

  it('does not change for a copy edit under the same ID', () => {
    // Copy fixes remain compatible; meaning changes require an ID or version
    // change. A typo fix must not invalidate active games.
    const before = withStub(stubPack([{ id: 'fp-q01', de: 'Tipfehler', en: 'typo' }], fullRoute), () =>
      runFingerprintFor('fp', 'full')
    );
    const after = withStub(stubPack([{ id: 'fp-q01', de: 'Tippfehler', en: 'typo' }], fullRoute), () =>
      runFingerprintFor('fp', 'full')
    );
    expect(after).toBe(before);
  });

  it('includes the content revision in its prefix', () => {
    // A CONTENT_VERSION bump must change the fingerprint (CR-P1-05).
    expect(runFingerprintFor('classic', 'full')).toMatch(new RegExp(`^r${CONTENT_VERSION}-`));
  });

  /*
   * BUG-007: style/mode identity was missing from the fingerprint, so a
   * resumed run could look compatible after a behavior-relevant style
   * change even though twists would now play differently.
   */
  it('distinguishes styles (BUG-007)', () => {
    const [first, second] = PACKS.classic.modes;
    expect(first.id).not.toBe(second.id);
    expect(runFingerprintFor('classic', 'full', first.id)).not.toBe(
      runFingerprintFor('classic', 'full', second.id)
    );
  });

  it('resolves a missing or unrecognised modeId to the pack\'s first style, matching compileRun()', () => {
    const firstModeId = PACKS.classic.modes[0].id;
    const omitted = runFingerprintFor('classic', 'full');
    const explicit = runFingerprintFor('classic', 'full', firstModeId);
    const invalid = runFingerprintFor('classic', 'full', 'does-not-exist');
    expect(omitted).toBe(explicit);
    expect(invalid).toBe(explicit);
  });
});

/*
 * compileRun() (refactoring roadmap phase 3) combines resolvedActs,
 * routeTimingFor, runFingerprintFor and originalIndexFor into a RunDefinition.
 * These tests compare the composition against its source functions instead
 * of hard-coding one monolithic snapshot.
 */
describe('compileRun (Phase 3, RunDefinition)', () => {
  it('matches routeTimingFor and runFingerprintFor for the same route', () => {
    const run = compileRun('classic', 'quick');
    expect(run.timing).toEqual(routeTimingFor('classic', 'quick'));
    expect(run.fingerprint).toBe(runFingerprintFor('classic', 'quick'));
    expect(run.contentRevision).toBe(CONTENT_VERSION);
  });

  it('questions has one entry per resolved question in the same order', () => {
    const run = compileRun('classic', 'quick');
    const flatIds = resolvedActs('classic', 'quick').flatMap((a) => a.questions.map((q) => q.id));
    expect(run.questions.map((q) => q.id)).toEqual(flatIds);
  });

  it('actStarts matches actStartIndices', () => {
    const run = compileRun('classic', 'quick');
    expect(run.actStarts).toEqual(actStartIndices('classic', 'quick'));
  });

  it('each sourceIndex matches originalIndexFor at the same route position', () => {
    const run = compileRun('classic', 'quick');
    run.questions.forEach((q, i) => {
      expect(q.sourceIndex).toBe(originalIndexFor('classic', i, 'quick'));
    });
  });

  it('each actIndex matches its position relative to actStarts', () => {
    const run = compileRun('classic', 'quick');
    run.questions.forEach((q, i) => {
      const expectedActIndex = run.actStarts.filter((start) => start <= i).length - 1;
      expect(q.actIndex).toBe(expectedActIndex);
    });
  });

  it('defaults to the first pack style and preserves a valid modeId', () => {
    expect(compileRun('classic', 'full').modeId).toBe(PACKS.classic.modes[0].id);
    const second = PACKS.classic.modes[1].id;
    expect(compileRun('classic', 'full', second).modeId).toBe(second);
    // An invalid modeId falls back like a missing one, matching loadSaved()
    // canonicalization for persisted values.
    expect(compileRun('classic', 'full', 'does-not-exist').modeId).toBe(PACKS.classic.modes[0].id);
  });

  it('carries pack private-moment policy and freezes the result', () => {
    const run = compileRun('classic', 'full');
    expect(run.privateMoment).toBeNull();
    expect(compileRun('late-night', 'quick').privateMoment).toBe('none');
    expect(Object.isFrozen(run)).toBe(true);
    expect(Object.isFrozen(run.questions)).toBe(true);
    expect(Object.isFrozen(run.actStarts)).toBe(true);
  });

  it('distinguishes packs and routes', () => {
    expect(compileRun('classic', 'quick').fingerprint).not.toBe(
      compileRun('classic', 'full').fingerprint
    );
    expect(compileRun('classic', 'full').fingerprint).not.toBe(
      compileRun('friends', 'full').fingerprint
    );
  });

  it('distinguishes styles in its fingerprint (BUG-007)', () => {
    const [first, second] = PACKS.classic.modes;
    expect(compileRun('classic', 'full', first.id).fingerprint).not.toBe(
      compileRun('classic', 'full', second.id).fingerprint
    );
  });
});

describe('runQuestionIdsFor (FR8-06)', () => {
  it('CONTENT_VERSION is a number', () => {
    expect(typeof CONTENT_VERSION).toBe('number');
  });

  it('returns one id per resolved question, in route order, for the full route', () => {
    const ids = runQuestionIdsFor('classic', 'full');
    expect(ids).toHaveLength(36);
    expect(ids[0]).toBe('classic-q01');
    expect(ids[35]).toBe('classic-q36');
  });

  it('matches the route length for a curated route', () => {
    expect(runQuestionIdsFor('classic', 'quick')).toHaveLength(12);
    expect(runQuestionIdsFor('first-date', 'quick')).toHaveLength(12);
  });

  it('defaults to the full route when called with one arg', () => {
    expect(runQuestionIdsFor('classic')).toEqual(runQuestionIdsFor('classic', 'full'));
  });

  it('is stable across calls for the same pack/route (deterministic, not random)', () => {
    expect(runQuestionIdsFor('classic', 'standard')).toEqual(
      runQuestionIdsFor('classic', 'standard')
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
});

/*
 * Response Cards (iteration 8 catalog: FRIENDS/OLD FRIENDS/DEEP). Every
 * question.responseCard, wherever one is attached, must have the shape
 * CloserGame.js's render branch expects -- a { de, en } label and a
 * { de, en } text, both non-empty. The catalog states that cards do not
 * count as questions, confirmed here by requiring their question's real text.
 */
describe('Response Cards', () => {
  it('every responseCard across every pack has a well-formed label and text', () => {
    Object.values(PACKS).forEach((pack) => {
      pack.acts.forEach((act) => {
        act.questions.forEach((q) => {
          if (!q.responseCard) return;
          expect(pick(q.responseCard.label, 'de')).toBeTruthy();
          expect(pick(q.responseCard.label, 'en')).toBeTruthy();
          expect(pick(q.responseCard.text, 'de')).toBeTruthy();
          expect(pick(q.responseCard.text, 'en')).toBeTruthy();
          expect(q.de).toBeTruthy();
        });
      });
    });
  });

  it('FRIENDS, OLD FRIENDS and DEEP each carry at least one response card; other packs currently carry none', () => {
    const countCards = (pack) =>
      pack.acts.reduce(
        (n, act) => n + act.questions.filter((q) => q.responseCard).length,
        0
      );
    expect(countCards(PACKS.friends)).toBeGreaterThan(0);
    expect(countCards(PACKS['old-friends'])).toBeGreaterThan(0);
    expect(countCards(PACKS.deep)).toBeGreaterThan(0);
    ['classic', 'first-date', 'date-night', 'couples', 'chaos'].forEach((id) => {
      expect(countCards(PACKS[id])).toBe(0);
    });
  });
});
