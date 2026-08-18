import {
  ACTS_PER_PACK,
  CONTENT_VERSION,
  DEFAULT_PACK_ID,
  DEFAULT_ROUTE_ID,
  LATE_NIGHT_PACK,
  POWER_BY_CHOICE_PACK,
  PACKS,
  QUESTIONS_PER_ACT,
  actIndexFor,
  actStartIndices,
  compileRun,
  finalQuestionIndex,
  getPack,
  getRoute,
  originalIndexFor,
  pick,
  privateMomentFor,
  questionAt,
  questionIdFor,
  resolvedActs,
  routeSubtitleFor,
  routeTimingFor,
  runFingerprintFor,
  runQuestionIdsFor,
  secretAtIndexFor,
  SLOW_BURN_PACK,
  starterFor,
  totalQuestions,
  voiceSrc,
} from '../closer';
import COPY from '../closerCopy';

/*
 * These cover the extractable pure logic behind CLOSER's state machine --
 * question sequencing, turn alternation, and the question-37 truth table --
 * plus the pack registry itself. Everything else (phase transitions, timers,
 * persistence) lives inline in CloserGame.js and is exercised manually/via
 * Playwright; see the repo's project notes for what's covered where.
 */

const ACTS = PACKS.classic.acts;
const MODES = PACKS.classic.modes;
const questionById = (id) => Object.values(PACKS)
  .flatMap((pack) => pack.acts)
  .flatMap((act) => act.questions)
  .find((question) => question.id === id);

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
    expect(LATE_NIGHT_PACK).toMatchObject({
      contentGroup: 'adult',
      discoveryNoticeKey: 'lateNightMenuIntro',
    });
    expect(LATE_NIGHT_PACK.discoverability).toBe('menu-unlock');
    expect(LATE_NIGHT_PACK.privateMoment).toBe('none');
  });

  it('keeps device-mediated consent gates out of every current pack', () => {
    expect(Object.values(PACKS).filter((pack) => pack.consentGate)).toEqual([]);
  });

  it('keeps POWER, BY CHOICE conversational and SLOW BURN verbally coordinated', () => {
    expect(POWER_BY_CHOICE_PACK).toMatchObject({
      contentGroup: 'adult',
      discoverability: 'menu-unlock',
      privateMoment: 'none',
      defaultTimerEnabled: false,
    });
    expect(POWER_BY_CHOICE_PACK.touchExperience).toBeUndefined();
    expect(Object.values(POWER_BY_CHOICE_PACK.routes).map((route) =>
      compileRun('power-by-choice', route.id).questions.length
    )).toEqual([12, 24, 36]);

    expect(SLOW_BURN_PACK).toMatchObject({
      contentGroup: 'adult',
      discoverability: 'menu-unlock',
      privateMoment: 'none',
      defaultTimerEnabled: false,
    });
    expect(Object.values(SLOW_BURN_PACK.routes).map((route) =>
      compileRun('slow-burn', route.id).questions.length
    )).toEqual([9, 15, 21]);

    const physicalCards = SLOW_BURN_PACK.acts
      .flatMap((act) => act.questions)
      .filter((question) => ['touch', 'kiss'].includes(question.kind));
    expect(physicalCards.length).toBeGreaterThan(0);
    physicalCards.forEach((question) => expect(question.requiresVerbalAgreement).toBe(true));
    expect(POWER_BY_CHOICE_PACK.consentGate).toBeUndefined();
    expect(SLOW_BURN_PACK.consentGate).toBeUndefined();
    expect(LATE_NIGHT_PACK.consentGate).toBeUndefined();
  });

  it('registers OFF SCRIPT and YOUTH WORKSHOP with short direct-finale routes', () => {
    const offScript = PACKS['off-script'];
    const youth = PACKS['youth-workshop'];

    expect(offScript).toMatchObject({
      libraryGroup: 'activities',
      privateMoment: 'none',
      defaultRouteId: 'quick',
    });
    expect(youth).toMatchObject({
      libraryGroup: 'situations',
      privateMoment: 'none',
      persistRun: false,
      defaultRouteId: 'quick',
    });

    [offScript, youth].forEach((pack) => {
      expect(pack.acts.flatMap((act) => act.questions)).toHaveLength(24);
      expect(compileRun(pack.id, 'quick').questions).toHaveLength(9);
      expect(compileRun(pack.id, 'standard').questions).toHaveLength(18);
      expect(compileRun(pack.id, 'quick').directFinale).toBeDefined();
      expect(Object.values(pack.modes[0].twists).every((enabled) => !enabled)).toBe(true);
    });

    expect(compileRun('off-script', 'standard').questions.map(({ id }) => id)).toEqual([
      'off-script-q01', 'off-script-q02', 'off-script-q03', 'off-script-q04',
      'off-script-q05', 'off-script-q06', 'off-script-q09', 'off-script-q10',
      'off-script-q11', 'off-script-q12', 'off-script-q13', 'off-script-q14',
      'off-script-q17', 'off-script-q18', 'off-script-q19', 'off-script-q20',
      'off-script-q21', 'off-script-q24',
    ]);
    expect(offScript.positioning.en).toContain('Nothing has to be fast, simultaneous');
    expect(offScript.directFinale.en).toContain('or simply finish the round here');

    expect(compileRun('youth-workshop', 'quick').questions.map(({ id }) => id)).toEqual([
      'youth-workshop-q01', 'youth-workshop-q02', 'youth-workshop-q04',
      'youth-workshop-q09', 'youth-workshop-q12', 'youth-workshop-q14',
      'youth-workshop-q17', 'youth-workshop-q20', 'youth-workshop-q22',
    ]);
    expect(compileRun('youth-workshop', 'standard').questions.map(({ id }) => id)).not.toContain(
      'youth-workshop-q15'
    );
    expect(youth.positioning.en).toContain('cannot guarantee secrecy between people');
    expect(youth.introPrivacy.en).toContain('Your answers are never typed in or recorded');
    expect(youth.directFinale.en).toContain('the app does not record answers');
  });

  it('registers STUDENTS and its compact unofficial FH Salzburg edition', () => {
    const students = PACKS.students;
    const fhSalzburg = PACKS['fh-salzburg'];

    expect(students).toMatchObject({
      libraryGroup: 'situations',
      discoverability: 'menu-unlock',
      privateMoment: 'none',
      defaultRouteId: 'quick',
    });
    expect(students.acts.flatMap((act) => act.questions)).toHaveLength(36);
    expect(compileRun('students', 'quick').questions).toHaveLength(12);
    expect(compileRun('students', 'standard').questions).toHaveLength(24);

    expect(fhSalzburg).toMatchObject({
      libraryGroup: 'situations',
      discoverability: 'menu-unlock',
      privateMoment: 'none',
      defaultRouteId: 'quick',
    });
    expect(fhSalzburg.acts.flatMap((act) => act.questions)).toHaveLength(12);
    expect(Object.keys(fhSalzburg.routes)).toEqual(['quick']);
    expect(compileRun('fh-salzburg', 'quick').questions).toHaveLength(12);
    expect(fhSalzburg.positioning.en).toContain('neither published nor endorsed');

    [students, fhSalzburg].forEach((pack) => {
      expect(compileRun(pack.id, 'quick').directFinale).toBeDefined();
      expect(Object.values(pack.modes[0].twists).every((enabled) => !enabled)).toBe(true);
    });
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

describe('17 August 2026 full question-bank audit', () => {
  const revisedQuestions = [
    ['first-date-q25',
      'Was hoffst du, dass eine Person an dir bemerkt, ohne dass du es beweisen musst?',
      'What do you hope someone notices about you without making you prove it?'],
    ['first-date-q34',
      'Was möchtest du, dass dein Gegenüber von dir aus diesem Abend in Erinnerung behält?',
      'What do you hope the other person remembers about you from tonight?'],
    ['date-night-q03',
      'Wie kann eine Person für dich klar zeigen, dass sie flirtet, und zugleich nachfragen, ob das willkommen ist?',
      'How can someone make it clear to you that they are flirting while also checking whether it is welcome?'],
    ['date-night-q25',
      'Was hilft dir, dich bei Nähe sicher und ungezwungen zu fühlen?',
      'What helps you feel safe and at ease with closeness?'],
    ['couples-q20',
      'Was hilft dir nach einem Missverständnis, wieder neugierig auf die Sicht deines Gegenübers zu werden?',
      'What helps you become curious about your partner’s perspective again after a misunderstanding?'],
    ['couples-q28',
      'Welche kleine Veränderung könnte euch diese Woche guttun, ohne dass daraus eine Verpflichtung wird?',
      'What small change might feel helpful to the two of you this week without becoming an obligation?'],
    ['friends-q14',
      'Wie möchtest du gefragt werden, ob du gerade Rat, Gesellschaft oder etwas anderes möchtest?',
      'How would you like a friend to ask whether you want advice, company, or something else?'],
    ['friends-q24',
      'Welches aktuelle Thema würdest du gern mit einer befreundeten Person teilen können, ohne dass es gelöst werden muss?',
      'What current topic would you like to be able to share with a friend without it needing to be solved?'],
    ['old-friends-q13',
      'Was hat sich in deinem Leben seit der Zeit, aus der ihr euch kennt, am stärksten verändert?',
      'What has changed most in your life since the period when the two of you first knew each other?'],
    ['old-friends-q19',
      'Wie hast du die Zeit mit weniger oder anderem Kontakt erlebt – falls das auf euch zutrifft?',
      'How did you experience the period of less or different contact, if that applies to the two of you?'],
    ['old-friends-q22',
      'Gibt es etwas, das sich zwischen euch heute mühelos anfühlt – und wenn ja, was?',
      'Is there anything between the two of you that feels effortless today—and if so, what?'],
    ['deep-q34',
      'Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes?',
      'After this conversation, how can the other person best be there for you: through listening, questions, quiet, or something else?'],
    ['chaos-q24',
      'Plant ein tatsächlich machbares Mini-Abenteuer mit dem, was euch zur Verfügung steht – ohne Mutprobe und ohne jemanden bloßzustellen.',
      'Plan a genuinely doable mini-adventure using what is available to you—with no dares and no embarrassing anyone.'],
    ['chaos-q26',
      'Welche kurze Nachricht würdest du deinem Ich in fünf Jahren schicken?',
      'What short message would you send to yourself five years from now?'],
    ['late-night-q22',
      'Welche Mischung aus Tempo, Druck, Rhythmus, Wiederholung, Pausen oder Edging bringt dich besonders in Fahrt?',
      'What mix of pace, pressure, rhythm, repetition, pauses, or edging gets you especially worked up?'],
    ['late-night-q26',
      'Welchen Satz würdest du in einem sehr aufgeladenen Moment besonders gern hören oder sagen?',
      'What sentence would you especially like to hear or say in a highly charged moment?'],
    ['late-night-q27',
      'Welche Lust oder Fantasie fällt dir leichter zu denken als laut auszusprechen?',
      'What desire or fantasy is easier for you to think about than to say aloud?'],
    ['family-q01',
      'Gibt es eine kleine Sache, die dich im Alltag mit der anderen Person verbindet oder an sie denken lässt – auch wenn ihr nicht am selben Ort lebt?',
      'Is there a small thing that connects you with the other person in everyday life or brings them to mind—even if you do not live in the same place?'],
    ['family-q05',
      'Welches Essen, Ritual, Ereignis oder Alltagsdetail verbindest du mit deiner persönlichen Vorstellung von Familie?',
      'What food, ritual, occasion, or everyday detail do you associate with your own idea of family?'],
    ['family-q14',
      'Wie soll die andere Person nachfragen, ob du gerade Unterstützung oder lieber Freiraum möchtest?',
      'How would you like the other person to ask whether you want support or would prefer some space?'],
  ];

  it.each(revisedQuestions)('%s retains its approved bilingual wording', (id, de, en) => {
    expect(questionById(id)).toMatchObject({ de, en });
  });

  it('keeps Classic questions intact while narrowing the claim and distinguishing extracts', () => {
    expect(PACKS.classic.blurb).toEqual({
      de: 'Die vollständige Route folgt eng einer Forschungsaufgabe zu unmittelbarer zwischenmenschlicher Nähe. Kürzere Routen sind CLOSER-Auszüge.',
      en: 'The Full route closely follows a research task on immediate interpersonal closeness. Shorter routes are CLOSER extracts.',
    });
    expect(PACKS.classic.positioning.de).toContain('Liebe, Kompatibilität oder dauerhafte Wirkung wurden nicht gezeigt.');
    expect(PACKS.classic.positioning.en).toContain('Love, compatibility, and lasting effects were not demonstrated.');
    expect(PACKS.classic.routes.quick.title).toEqual({
      de: 'Quick · CLOSER-Auszug', en: 'Quick · CLOSER extract',
    });
    expect(PACKS.classic.routes.standard.title).toEqual({
      de: 'Standard · CLOSER-Auszug', en: 'Standard · CLOSER extract',
    });
    expect(PACKS.classic.routes.full.title).toEqual({
      de: 'Full · vollständige 36-Fragen-Abfolge',
      en: 'Full · complete 36-question sequence',
    });
  });

  it('applies the checking-in label and removes Couples Q29 PREDICT', () => {
    expect(PACKS.couples.acts[1].title).toEqual({ de: 'ABSTIMMEN', en: 'CHECKING IN' });
    expect(questionById('couples-q29')).not.toHaveProperty('twist');
  });

  it('applies the audited route swaps without changing route sizes', () => {
    const ids = (packId, routeId) => compileRun(packId, routeId).questions
      .map((question) => question.id);

    expect(ids('friends', 'quick')).toEqual(expect.arrayContaining(['friends-q36']));
    expect(ids('friends', 'quick')).not.toContain('friends-q34');
    expect(ids('friends', 'standard')).toContain('friends-q34');
    expect(ids('friends', 'standard')).not.toContain('friends-q36');
    expect(ids('old-friends', 'quick')).toContain('old-friends-q36');
    expect(ids('old-friends', 'quick')).not.toContain('old-friends-q28');
    expect(ids('old-friends', 'standard')).toContain('old-friends-q36');
    expect(ids('old-friends', 'standard')).not.toContain('old-friends-q28');
    expect(ids('deep', 'standard')).toContain('deep-q15');
    expect(ids('deep', 'standard')).not.toContain('deep-q17');
    expect(ids('late-night', 'standard')).toContain('late-night-q34');
    expect(ids('late-night', 'standard')).not.toContain('late-night-q30');

    expect(ids('friends', 'quick')).toHaveLength(12);
    expect(ids('friends', 'standard')).toHaveLength(24);
    expect(ids('old-friends', 'quick')).toHaveLength(12);
    expect(ids('old-friends', 'standard')).toHaveLength(24);
    expect(ids('deep', 'standard')).toHaveLength(24);
    expect(ids('late-night', 'standard')).toHaveLength(24);
  });

  it('suppresses Chaos Q16 BOTH only on routes with Private Sparks', () => {
    const q16 = (routeId) => compileRun('chaos', routeId, 'playful').questions
      .find((question) => question.id === 'chaos-q16').content;
    expect(q16('quick').twist).toBe('both');
    expect(q16('standard').twist).toBeUndefined();
    expect(q16('full').twist).toBeUndefined();
  });

  it('uses the revised response cards and removes the Friends Q36 card', () => {
    expect(questionById('friends-q36')).not.toHaveProperty('responseCard');
    expect(questionById('old-friends-q34').responseCard.text).toEqual({
      de: 'Was daran wäre dir wichtig?',
      en: 'What about that would matter to you?',
    });
    ['deep-q01', 'deep-q21'].forEach((id) => {
      expect(questionById(id).responseCard.text).toEqual({
        de: 'Würdige kurz, was der Person daran wichtig ist.',
        en: 'Take a moment to acknowledge what matters to the person about it.',
      });
    });
    expect(questionById('deep-q34').responseCard.text).toEqual({
      de: 'Wenn du möchtest: Sag in einem Satz, was du verstanden hast. Daraus entsteht keine Zusage.',
      en: 'If you like, say in one sentence what you understood. This creates no commitment.',
    });
  });

  it('clarifies the private-card action and compiles Road Trip Quick safety copy only there', () => {
    expect(COPY.showPrivateCards).toEqual({
      de: 'Private Karten ansehen', en: 'View private cards',
    });
    expect(compileRun('road-trip', 'quick').directFinale).toEqual({
      de: 'Hier endet die Runde. Wenn eine teilnehmende Person weiterfährt, legt das Smartphone weg; die sichere Weiterreise hat Vorrang.',
      en: 'This round ends here. If either participant resumes driving, put the phone away; a safe onward journey comes first.',
    });
    expect(compileRun('road-trip', 'standard').directFinale).toBeNull();
    expect(compileRun('road-trip', 'full').directFinale).toBeNull();
  });
});

describe('pack-aware PLAYFUL actions', () => {
  const playfulPackIds = ['date-night', 'couples', 'friends'];
  const actionTypes = new Set(['predict', 'both', 'nothinking']);

  it.each(playfulPackIds)('%s exposes an optional PLAYFUL style', (packId) => {
    const pack = PACKS[packId];
    expect(pack.modes.map(({ id }) => id)).toContain('playful');
    expect(pack.modes[0].id).not.toBe('playful');
  });

  it.each([...playfulPackIds, 'chaos'])('%s keeps action density sparse on every route', (packId) => {
    const pack = PACKS[packId];
    const styleId = packId === 'chaos' ? pack.modes[0].id : 'playful';
    Object.keys(pack.routes).forEach((routeId) => {
      const run = compileRun(packId, routeId, styleId);
      const actionIndices = run.questions
        .map(({ content }, index) => (actionTypes.has(content.twist) ? index : -1))
        .filter((index) => index >= 0);

      if (routeId === 'quick') expect(actionIndices.length).toBeLessThanOrEqual(3);
      actionIndices.slice(1).forEach((index, position) => {
        expect(index - actionIndices[position]).toBeGreaterThan(1);
      });
      run.acts.forEach((act) => {
        const count = act.questions.filter((question) => actionTypes.has(question.twist)).length;
        expect(count).toBeLessThanOrEqual(2);
      });
    });
  });

  it('keeps sensitive and professional packs free of pressure actions', () => {
    ['deep', 'late-night', 'road-trip', 'family', 'colleagues'].forEach((packId) => {
      PACKS[packId].acts.flatMap((act) => act.questions).forEach((question) => {
        expect(actionTypes.has(question.twist)).toBe(false);
      });
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
    expect(seen.size).toBe(Object.values(PACKS)
      .reduce((total, pack) => total + pack.acts.flatMap((act) => act.questions).length, 0));
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
  it('DEFAULT_ROUTE_ID is "full" while packs may intentionally omit that route', () => {
    expect(DEFAULT_ROUTE_ID).toBe('full');
    expect(PACKS.classic.routes[DEFAULT_ROUTE_ID]).toBeDefined();
    expect(PACKS.colleagues.routes[DEFAULT_ROUTE_ID]).toBeUndefined();
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
        const ceiling = pack.modes.some(({ id }) => id === 'playful') ? ACTS_PER_PACK * 2 : ACTS_PER_PACK;
        expect(twistCount).toBeLessThanOrEqual(ceiling);
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
   * packs deliberately end Quick/Standard on a different curated closer.
   * FRIENDS and OLD FRIENDS now intentionally include Q36 in Quick after
   * the 17 August 2026 full-bank audit, while their Standard routes differ.
   * The app
   * itself never reads `.last` at runtime (CloserGame.js's `isLast` is
   * already route-relative, via finalQuestionIndex) -- this was always
   * just an extra content-integrity check, not something the engine
   * depends on, so relaxing it to the full route is safe.
   */
  Object.values(PACKS).forEach((pack) => {
    Object.entries(pack.routes).forEach(([routeId, route]) => {
      describe(`${pack.id} route "${routeId}"`, () => {
        if (routeId === DEFAULT_ROUTE_ID && pack.routes[DEFAULT_ROUTE_ID]) {
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
            const masterQuestions = pack.acts.flatMap((act) => act.questions);
            expect(original).toBeLessThan(masterQuestions.length);
            const masterQuestion = masterQuestions[original];
            expect(questionAt(pack.id, i, routeId)).toBe(masterQuestion);
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

  it('carries route structure and private-moment policy in the frozen result', () => {
    const run = compileRun('classic', 'full');
    expect(run.acts).toEqual(resolvedActs('classic', 'full'));
    expect(run.secretAtIndex).toBe(secretAtIndexFor('classic', 'full'));
    expect(run.privateMoment.id).toBe('classic-saved-questions');
    expect(compileRun('late-night', 'quick').privateMoment).toBe('none');
    expect(Object.isFrozen(run)).toBe(true);
    expect(Object.isFrozen(run.questions)).toBe(true);
    expect(run.questions.every(Object.isFrozen)).toBe(true);
    expect(Object.isFrozen(run.acts)).toBe(true);
    expect(Object.isFrozen(run.actStarts)).toBe(true);
    expect(Object.isFrozen(run.timing)).toBe(true);
  });

  it('compiles the approved pack/route Private Moment matrix', () => {
    const expected = {
      classic: { quick: 'none', standard: 'none', full: 'classic-saved-questions' },
      'first-date': {
        quick: 'none', standard: 'first-date-curiosities', full: 'first-date-curiosities',
      },
      'date-night': {
        quick: 'none', standard: 'date-night-appreciation', full: 'date-night-appreciation',
      },
      couples: { quick: 'none', standard: 'couples-listening', full: 'couples-listening' },
      friends: {
        quick: 'none', standard: 'friends-memory-celebration', full: 'friends-memory-celebration',
      },
      'old-friends': { quick: 'none', standard: 'old-friends-memory-lenses', full: 'none' },
      deep: { standard: 'deep-listening', full: 'deep-listening' },
      chaos: { quick: 'none', standard: 'chaos-private-sparks', full: 'chaos-private-sparks' },
      'late-night': { quick: 'none', standard: 'none', full: 'none' },
      'road-trip': { quick: 'none', standard: 'none', full: 'none' },
      family: { quick: 'none', standard: 'none', full: 'none' },
      colleagues: { quick: 'none', standard: 'none', full: 'none' },
    };

    Object.entries(expected).forEach(([packId, routes]) => {
      Object.entries(routes).forEach(([routeId, momentId]) => {
        const moment = privateMomentFor(packId, routeId);
        expect(moment === 'none' ? moment : moment.id).toBe(momentId);
      });
    });
  });

  it('keeps enabled cards genuinely asymmetric and fully bilingual', () => {
    Object.values(PACKS).forEach((pack) => {
      if (!pack.privateMoment || pack.privateMoment === 'none') return;
      const [cardA, cardB] = pack.privateMoment.cards;
      expect(cardA.body.de).not.toBe(cardB.body.de);
      expect(cardA.body.en).not.toBe(cardB.body.en);
      [cardA, cardB].forEach((card) => {
        expect(card.body.de.trim()).not.toBe('');
        expect(card.body.en.trim()).not.toBe('');
        expect(card.action.de.trim()).not.toBe('');
        expect(card.action.en.trim()).not.toBe('');
      });
    });
  });

  it('resolves every question-based trigger and use point by stable ID', () => {
    Object.values(PACKS).forEach((pack) => {
      Object.keys(pack.routes).forEach((routeId) => {
        const run = compileRun(pack.id, routeId);
        if (run.privateMoment === 'none') return;
        const ids = run.questions.map((question) => question.id);
        if (run.privateMoment.trigger.kind === 'before-question') {
          expect(ids).toContain(run.privateMoment.trigger.questionId);
        }
        if (run.privateMoment.use.kind === 'question') {
          expect(ids).toContain(run.privateMoment.use.questionId);
        }
      });
    });
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
