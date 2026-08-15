/*
 * CLOSER -- game data.
 *
 * The 36 questions are RaDi's list, in his wording, with an English rendering
 * alongside. Every user-visible string in this file is a { de, en } pair; the
 * interface strings live in closerCopy.js.
 *
 * Per the spec, a question carries at most ONE twist plus an independent
 * stayEnabled flag, and twists are deliberately sparse: five in Act I, three
 * in Act II, one in Act III (six in Act I originally -- see the content-
 * review note on the "how will you die" question below, which lost its
 * PREDICT twist without losing the question itself). The game is not
 * supposed to be more interesting than the conversation.
 *
 *   twist: 'predict'    -- the other person guesses the answer first
 *          'both'       -- the question appears, then a 3-2-1, then answer together
 *          'nothinking' -- the question appears, then a 5-4-3-2-1, then answer immediately
 *          'deeper'     -- afterwards, offers one follow-up of your own
 *   stayEnabled         -- afterwards, offers STAY instead of only NEXT
 *
 * ORIGINAL mode runs 'predict', 'deeper' and stayEnabled -- a restrained
 * enough twist that it still fits ORIGINAL's tone (spec feedback 11). 'both'
 * and 'nothinking' stay more playful and exclusive to the other style
 * (id `'datenight'`, displayed as PLAYFUL since the content review -- see
 * PACKS.classic.modes below for why only the label changed, not the id).
 *
 * --- Pack architecture (added ahead of further game packs) ----------------
 *
 * "Pack" (this file's PACKS registry) and "Style" (a pack's own `modes`,
 * formerly the top-level MODES) are two separate axes and were previously
 * conflated -- there was only ever one pack, so nobody had to say so.
 *   pack  = WHAT is being asked: the questions, their acts, their per-act
 *           look, the secret-question placement, the question-37 wording.
 *           E.g. classic, first-date, friends.
 *   style = HOW those questions play: which twists are active. This is the
 *           existing ORIGINAL/PLAYFUL distinction, now scoped inside a
 *           pack's `modes` rather than global, since a future pack may want
 *           its own style options rather than reusing ORIGINAL/PLAYFUL
 *           verbatim.
 * All of CLOSER's original content now lives under PACKS.classic unchanged
 * -- this refactor is additive, not a content change. New packs are added by
 * inserting another entry into PACKS.
 *
 * The current, single binding schema for any pack in PACKS (iteration 8
 * holistic review, BF8-06 -- consolidated here after two earlier passes on
 * this comment drifted out of sync with each other):
 *   - Every pack has exactly ACTS_PER_PACK (3) acts. No exceptions today;
 *     if a pack ever genuinely needs a different act count, that's the
 *     trigger to revisit ACTS_PER_PACK itself, not to special-case around
 *     it (regression-test iteration 5, P1.1/P1.3).
 *   - Each act may have 1 to QUESTIONS_PER_ACT (12) master questions --
 *     12 is a ceiling, not a mandate (iteration 7, Phase 3, per FR-01's
 *     "bis zu zwölf Fragen pro Akt" / "up to twelve questions per act").
 *     CLASSIC itself has exactly 12 per act, 36 total, unchanged; a newer
 *     pack (e.g. a FIRST DATE pilot) can have fewer.
 *   - A pack only offers the routes it actually has curated content for
 *     (e.g. DEEP intentionally has no `quick` route) -- see getRoute()'s
 *     fallback-to-first-defined-route behavior below. A route that IS
 *     offered must still satisfy both invariants above CLASSIC_ROUTES'
 *     own comment describes (ends on the real closing question; secret
 *     interrupt lands strictly inside its own bounds).
 *   - Every pack MUST define its own secret-question placement
 *     (`secretAtIndex`) and its own question-37 wording (`q37`) -- these
 *     are per-pack, never inherited or defaulted from CLASSIC.
 *   - `full` (every question, unrouted) is only required if the pack ships
 *     as a complete 36-question pack; a pack that's deliberately launched
 *     smaller (e.g. a quick-route-only pilot) is not required to define it
 *     -- see getRoute()'s fallback chain.
 * All of this is enforced by the registry-conformance tests in
 * closer.test.js, not just assumed -- a pack that doesn't fit isn't added
 * to PACKS.
 *
 * See questionAt/actIndexFor/totalQuestions/finalQuestionIndex below, all
 * of which take a packId as their first argument (kept pack-aware even
 * though every pack is the same shape, since packId is still how a pack's
 * own question wording/acts/style/secret index/Q37 copy differ), and
 * CloserGame.js's `packId` field in saved state (defaults to 'classic' for
 * any save written before this existed, and is canonicalized on load --
 * see loadSaved()).
 *
 * --- Time routes (bugfix/feature-request iteration 7, Phase 2, FR-01/
 * FR-02) --------------------------------------------------------------
 *
 * A pack's fixed 3x12 schema above is still exactly what its full content
 * looks like -- a route does not change that. What a route adds is a
 * second, optional axis: which curated subset of a pack's questions a
 * given playthrough actually uses, and how long that takes. Every pack
 * MUST define a `routes` map with at least a `full` entry (every question,
 * in original order -- the only route that existed before this, and still
 * the default for any save or call site that doesn't ask for another one).
 * `standard` and `quick` are hand-curated subsets, not an algorithmic
 * sample -- picking, say, "every third question" would flatten CLASSIC's
 * deliberate escalation instead of preserving it at a shorter length. Each
 * route's `actIndices` is an array with one entry per act: either `null`
 * (use every question in that act, unchanged -- what `full` does for all
 * three) or an array of local indices (0-based, into that act's own
 * `questions` array) listing exactly which ones to use and in what order.
 *
 * Two invariants every curated route (including any added for a future
 * pack) must keep, enforced by the registry-conformance tests in
 * closer.test.js:
 *   1. The last act's local index carrying `last: true` must be the LAST
 *      entry of that act's own actIndices -- the closing question has to
 *      stay the actual last question of the route, not just of the pack.
 *   2. secretAtIndexFor() (below) must land strictly inside the resolved
 *      route (not at or past its end) -- see that function's own comment
 *      for how a route-relative interrupt point is derived automatically
 *      from the pack's own absolute secretAtIndex, rather than needing to
 *      be hand-computed and kept in sync per route.
 *
 * resolvedActs()/totalQuestions()/finalQuestionIndex()/actIndexFor()/
 * questionAt()/actStartIndices() all take an optional trailing `routeId`
 * (defaulting to DEFAULT_ROUTE_ID, `'full'`) rather than reordering their
 * existing packId-first parameters -- every pre-Phase-2 call site (and
 * every pre-Phase-2 test) that only ever cared about the full 36 keeps
 * working completely unchanged.
 */

export const ACTS_PER_PACK = 3;
export const QUESTIONS_PER_ACT = 12;

export const LANGS = ['de', 'en'];

export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? '';
  }
  return value;
}

const CLASSIC_ACTS = [
  {
    id: 'curious',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'NEUGIERIG', en: 'CURIOUS' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    // Reworded per the iteration-6 content review's P2 finding: "start
    // light" undersold what's actually here -- question 7 asks about your
    // own death, question 10 about how you were raised. Still an honest
    // on-ramp, just not a promise the act doesn't keep.
    intro: {
      de: 'Fangt neugierig an. Einige Fragen werden schon hier persönlicher. Ihr könnt jederzeit weitergehen.',
      en: "Start with curiosity. Some questions here already get personal. You can move on whenever you're ready.",
    },
    // Time-neutral on purpose (iteration-8 holistic review, BF8-04): "vor
    // 15 Minuten" was always wrong for a shorter route's Act I, which is
    // only a few minutes long, and even in Full, pacing varies enough
    // between couples that a specific elapsed time is a claim the app
    // can't actually back up.
    breakText: {
      de: 'Ihr wisst jetzt wahrscheinlich Dinge voneinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You probably know things about each other now that you didn't know before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Streckt euch. Atmet.',
      en: 'Take a sip. Stretch. Breathe.',
    },
    questions: [
      {
        de: 'Wenn du jeden und jede auf der Welt einladen könntest, mit wem würdest du gerne essen gehen?',
        en: 'If you could invite anyone in the world, who would you want to have dinner with?',
        twist: 'predict',
      },
      {
        de: 'Wärst du gerne berühmt? Wenn ja, wie?',
        en: 'Would you like to be famous? If so, in what way?',
        twist: 'nothinking',
      },
      {
        de: 'Probst du manchmal vor einem Telefonat, was du sagen wirst? Warum?',
        en: 'Do you ever rehearse what you are going to say before a phone call? Why?',
      },
      {
        de: 'Wie würde dein perfekter Tag aussehen?',
        en: 'What would your perfect day look like?',
      },
      {
        de: 'Wann hast du zuletzt für dich gesungen? Und für jemand anderen?',
        en: 'When did you last sing to yourself? And to someone else?',
      },
      {
        de: 'Wenn du bis 90 leben könntest und du entweder den Körper oder den Geist eines Dreißigjährigen die restlichen 60 Jahre behalten könntest – wofür würdest du dich entscheiden?',
        en: 'If you could live to 90 and keep either the body or the mind of a thirty-year-old for the last 60 years — which would you choose?',
        twist: 'both',
      },
      {
        // No twist here on purpose (regression-test iteration 6, content
        // review): PREDICT means guessing what the other person is about to
        // say out loud, which turns their own mortality into a guessing
        // game -- tonally wrong for this question, even though it's a
        // deliberate, legitimate part of CLASSIC otherwise. The question
        // itself is unchanged.
        de: 'Hast du eine Vorahnung, wie du sterben wirst?',
        en: 'Do you have a hunch about how you are going to die?',
      },
      {
        de: 'Nenne drei Dinge, die du und dein Gegenüber scheinbar gemeinsam haben.',
        en: 'Name three things you and the other person seem to have in common.',
        twist: 'both',
      },
      {
        de: 'Wofür bist du in deinem Leben am dankbarsten?',
        en: 'What are you most grateful for in your life?',
      },
      {
        de: 'Wenn du etwas daran ändern könntest, wie du aufgezogen wurdest, was wäre das?',
        en: 'If you could change one thing about the way you were raised, what would it be?',
      },
      {
        de: 'Erzähle deinem Gegenüber innerhalb von vier Minuten deine Lebensgeschichte – so detailreich wie möglich!',
        en: 'Tell the other person your life story in four minutes — in as much detail as you can.',
      },
      {
        de: 'Wenn du morgen aufwachst und eine Eigenschaft oder Fähigkeit dazugewonnen hast, welche hättest du dann gerne?',
        en: 'If you woke up tomorrow having gained one quality or ability, which would you want?',
        twist: 'nothinking',
      },
    ],
  },
  {
    id: 'closer',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'NÄHER', en: 'CLOSER' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Die Fragen werden jetzt ein bisschen persönlicher.',
      en: 'The questions get a little more personal now.',
    },
    breakText: {
      de: 'Keine Eile.',
      en: 'No rush.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Wenn dir eine Kristallkugel die Wahrheit über dich, dein Leben, deine Zukunft oder irgendetwas sonst verraten könnte, was würdest du wissen wollen?',
        en: 'If a crystal ball could tell you the truth about yourself, your life, your future or anything else — what would you want to know?',
        twist: 'predict',
      },
      {
        de: 'Gibt es etwas, von dem du schon lange träumst, es zu tun? Warum hast du es noch nicht getan?',
        en: 'Is there something you have dreamed of doing for a long time? Why have you not done it yet?',
        twist: 'deeper',
      },
      {
        de: 'Was ist deine größte Leistung in deinem Leben?',
        en: 'What is the greatest achievement of your life?',
      },
      {
        de: 'Was schätzt du an einer Freundschaft am meisten?',
        en: 'What do you value most in a friendship?',
        twist: 'predict',
      },
      {
        de: 'Was ist deine wertvollste Erinnerung?',
        en: 'What is your most treasured memory?',
      },
      {
        de: 'Was ist deine schrecklichste Erinnerung?',
        en: 'What is your most terrible memory?',
      },
      {
        de: 'Wenn du wüsstest, dass du in einem Jahr plötzlich sterben wirst, würdest du irgendetwas daran ändern, wie du jetzt lebst? Warum?',
        en: 'If you knew you would die suddenly in one year, would you change anything about how you are living now? Why?',
        stayEnabled: true,
      },
      {
        de: 'Was bedeutet dir Freundschaft?',
        en: 'What does friendship mean to you?',
      },
      {
        de: 'Welche Rolle spielen Liebe und Zuneigung in deinem Leben?',
        en: 'What role do love and affection play in your life?',
      },
      {
        de: 'Wechselt euch ab, jeweils fünf positive Eigenschaften eures Gegenübers aufzuzählen.',
        en: 'Take turns naming five positive qualities of the other person.',
      },
      {
        de: 'Wie nahe und warmherzig ist deine Familie? Glaubst du, dass deine Kindheit glücklicher war als die anderer Menschen?',
        en: "How close and warm is your family? Do you think your childhood was happier than most people's?",
      },
      {
        de: 'Wie ist die Beziehung zu deiner Mutter?',
        en: 'What is your relationship with your mother like?',
        stayEnabled: true,
      },
    ],
  },
  {
    id: 'open',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'OFFEN', en: 'OPEN' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    // Content warning, not just a mood-setter (iteration-6 content review,
    // P1): the previous "this part gets personal" was true but nonspecific
    // -- Act III is where family, difficult memories, loss and death
    // questions concentrate (18, 19, 23, 24, 33, 35, 36).
    intro: {
      de: 'Dieser Akt berührt Familie, schwierige Erinnerungen, Verlust und Tod. Ihr müsst nichts beantworten. Überspringt oder beendet das Spiel jederzeit – ohne Erklärung.',
      en: "This act touches on family, difficult memories, loss and death. You don't have to answer anything. Skip or end the game anytime -- no explanation needed.",
    },
    questions: [
      {
        de: 'Macht jeweils drei wahre Aussagen, die "wir" beinhalten. Beispielsweise: "Wir sind beide in diesem Raum und fühlen …"',
        en: 'Each make three true statements using "we". For example: "We are both in this room and feeling …"',
      },
      {
        de: 'Vervollständige diesen Satz: Ich wünschte, ich hätte jemanden, mit dem ich … teilen kann.',
        en: 'Complete this sentence: I wish I had someone I could share … with.',
        twist: 'deeper',
      },
      {
        // Genderneutral rewording (bugfix-report iteration 7, BF-11/FR-08):
        // "für sie oder ihn" -> "für diese Person". Content, order and
        // meaning are unchanged -- only the binary pronoun is gone. English
        // was already neutral ("them").
        de: 'Wenn du mit deinem Gegenüber eng befreundet wärst: Was wäre für diese Person wichtig, über dich zu wissen?',
        en: 'If you were to become a close friend of the other person, what would be important for them to know about you?',
      },
      {
        // Same rewording as above: "an ihm oder ihr" -> "an dieser Person".
        de: 'Sag deinem Gegenüber, was du an dieser Person magst. Sei dabei sehr ehrlich und sag etwas, das du wahrscheinlich nicht zu jemandem sagen würdest, den du gerade getroffen hast.',
        en: 'Tell the other person what you like about them. Be very honest — say something you probably would not say to someone you had just met.',
      },
      {
        de: 'Teile einen peinlichen Moment deines Lebens.',
        en: 'Share an embarrassing moment from your life.',
      },
      {
        de: 'Wann hast du zuletzt vor einer anderen Person geweint? Und wann alleine?',
        en: 'When did you last cry in front of another person? And when alone?',
        stayEnabled: true,
      },
      {
        de: 'Was magst du jetzt schon an deinem Gegenüber?',
        en: 'What do you already like about the other person?',
      },
      {
        de: 'Was ist zu ernst, sodass man darüber keine Witze machen sollte?',
        en: 'What is too serious to joke about?',
      },
      {
        de: 'Wenn du heute Abend sterben würdest und keine Gelegenheit mehr hättest, mit jemandem zu reden, was würdest du am meisten bereuen, nicht gesagt zu haben? Und warum hast du es noch nicht gesagt?',
        en: 'If you were to die this evening with no chance to speak to anyone, what would you most regret not having said? And why have you not said it yet?',
        stayEnabled: true,
      },
      {
        de: 'Dein Haus und darin alles, was du besitzt, brennt. Menschen und Tiere sind in Sicherheit, und du hast die Möglichkeit, noch ein Ding zu retten. Was wäre das und wieso?',
        en: 'Your house, and everything you own in it, is burning. People and pets are safe, and you can save one more object. What would it be and why?',
      },
      {
        de: 'Von all den Menschen in deiner Familie, wessen Tod würde dich am meisten treffen? Warum?',
        en: 'Of everyone in your family, whose death would affect you most? Why?',
        stayEnabled: true,
      },
      {
        // Same rewording as questions 27/28: "wie er oder sie" -> "wie
        // diese Person".
        de: 'Teile ein persönliches Problem und frage dein Gegenüber, wie diese Person damit umgehen würde. Bitte dein Gegenüber außerdem darum, zu spiegeln, wie du dich mit dem Problem zu fühlen scheinst.',
        en: 'Share a personal problem and ask the other person how they would handle it. Then ask them to reflect back how you seem to feel about the problem you chose.',
        last: true,
      },
    ],
  },
];

/*
 * Question 37 is not a fixed question. It is the moment the game hands the
 * asking over, and which prompt appears depends on whether each person's
 * secret question actually got asked (spec 39).
 */
const CLASSIC_Q37 = {
  neither: {
    de: 'Stellt euch die Frage, von der ihr gehofft habt, dass sie kommt.',
    en: 'Ask the question you hoped they would ask.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell die Frage, von der du gehofft hast, dass ${other} sie dir stellt.`
      : `${who}, ask the question you hoped ${other} would ask you.`,
  both: {
    de: 'Stellt die Frage, von der ihr euch gewünscht hättet, dass sie heute Abend vorgekommen wäre.',
    en: 'Ask the question you wish had appeared tonight.',
  },
};

const CLASSIC_MODES = [
  {
    id: 'original',
    title: { de: 'ORIGINAL', en: 'ORIGINAL' },
    meta: { de: 'Zurückhaltend', en: 'Understated' },
    // Route-neutral on purpose (iteration-8 holistic review, BF8-03): a
    // hardcoded "36 Fragen/45 Minuten" here contradicted whatever route
    // (Quick/Standard/Full) was actually chosen one screen earlier. Scope
    // and time live on the route object and are shown once from there --
    // see route.subtitle and the Style screen in CloserGame.js.
    blurb: {
      de: 'Zurückhaltende Inszenierung, ausgewählte Route.',
      en: 'Understated presentation for your selected route.',
    },
    // Act I isn't twist-free any more (spec feedback 11): PREDICT is
    // restrained enough to fit ORIGINAL's tone -- it's still just reading
    // and guessing out loud, nothing performative -- so it stays on, giving
    // Act I its one remaining predict question (a second, on the "how will
    // you die" question, was removed -- see that question's own comment
    // above). BOTH and NO THINKING are more playful in character and stay
    // exclusive to the other style below.
    twists: { predict: true, both: false, nothinking: false, deeper: true, stay: true },
  },
  {
    // id stays 'datenight' on purpose (regression-test iteration 6, content
    // review): only the *displayed* name was misleading -- DATE NIGHT reads
    // as a lighter, more romantic question set, when this is actually the
    // same intense CLASSIC questions with more playful mechanics layered on
    // top. Renaming the id too would silently reassign anyone's saved,
    // in-progress game to a different style on resume (loadSaved()'s P2.4
    // normalization would fall back to pack.modes[0] for a modeId that no
    // longer exists) for a change that's purely about what's shown, not
    // what's stored. A real, separate DATE NIGHT *pack* with its own more
    // romantic/sensual questions is the review's actual recommendation for
    // that experience -- not this style being renamed to claim the name.
    id: 'datenight',
    title: { de: 'PLAYFUL', en: 'PLAYFUL' },
    meta: { de: 'Gleiche Tiefe', en: 'Same depth' },
    // Same route-neutral reasoning as ORIGINAL's blurb above (BF8-03).
    blurb: {
      de: 'Dieselben ausgewählten Fragen – mit spielerischeren Twists.',
      en: 'The same selected questions — with more playful twists.',
    },
    twists: { predict: true, both: true, nothinking: true, deeper: true, stay: true },
  },
];

// The secret question interrupts between question 27 and question 28.
const CLASSIC_SECRET_AT_INDEX = 27;

export const SKIP_TOKENS = 3;

/*
 * Time routes for CLASSIC (iteration 7, Phase 2). Curated by hand against
 * the same "kuratierter Auszug, nicht algorithmisch" requirement the
 * review itself sets: each shortened route keeps a taste of all three acts
 * (curious -> closer -> open) rather than just truncating the end, keeps a
 * mix of twist types rather than dropping them all, and keeps local index
 * 11 (the closing, `last: true` question) as Act III's final entry.
 * `standard` also keeps Act III's local indices 2 and 3 (questions 27/28,
 * the pair the secret question sits between) adjacent and in order; `quick`
 * is short enough that it doesn't include that pair at all, and relies on
 * secretAtIndexFor()'s own derivation (see its comment) to place the
 * interrupt correctly regardless. `full` is exactly the pre-Phase-2 game:
 * every question, unchanged order -- `actIndices: [null, null, null]` means
 * "every local index of that act, in order" (see resolvedActs() below).
 *
 * The exact index lists below are the iteration-8 holistic review's
 * verbatim correction (BF8-02): the original Phase-2 curation put Q07 (a
 * premonition about one's own death) and Q10 (what you'd change about your
 * upbringing) third and fourth in Quick's Act I -- too hard an intensity
 * jump for a 12-question route meant as a light on-ramp. These indices are
 * the redactionally-reviewed selection in
 * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md and are the single
 * source of truth for any future change to this curation -- edit the
 * catalog first, then mirror it here.
 */
const CLASSIC_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 15 Minuten',
      en: '12 questions · 3 acts · about 15 minutes',
    },
    // Q01, Q04, Q09, Q12 · Q13, Q14, Q16, Q17 · Q25, Q26, Q31, Q36
    actIndices: [
      [0, 3, 8, 11],
      [0, 1, 3, 4],
      [0, 1, 6, 11],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 30 Minuten',
      en: '24 questions · 3 acts · about 30 minutes',
    },
    // Q01-Q04, Q08, Q09, Q11, Q12 · Q13-Q18, Q20, Q21 · Q25-Q31, Q36
    actIndices: [
      [0, 1, 2, 3, 7, 8, 10, 11],
      [0, 1, 2, 3, 4, 5, 7, 8],
      [0, 1, 2, 3, 4, 5, 6, 11],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 45 Minuten',
      en: '36 questions · 3 acts · about 45 minutes',
    },
    actIndices: [null, null, null],
  },
};

/*
 * Per-act look. The interface withdraws as the conversation takes over:
 * Act I carries a count and a progress marker in a bright accent, Act II drops
 * the marker and dims, Act III shows a bare number. Question 36 shows nothing
 * at all (handled in the component).
 */
const CLASSIC_ACT_STYLE = [
  { accent: '#13ADC7', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#945DD6', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#8b93a3', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/*
 * The PACKS registry. Each entry is everything CloserGame.js needs to run a
 * full playthrough: acts (and their questions), style modes, per-act look,
 * question-37 wording, and where the secret question interrupts. `classic`
 * is CLOSER as it has always been; it is the default and the fallback for
 * any packId this registry doesn't recognise (including saves from before
 * packId existed -- see getPack()).
 *
 * Adding a pack means adding another entry here with its own acts/modes/
 * actStyle/q37/secretAtIndex -- nothing in CloserGame.js hardcodes `classic`
 * or assumes there is only one pack.
 */
export const PACKS = {
  classic: {
    id: 'classic',
    title: { de: 'CLASSIC', en: 'CLASSIC' },
    blurb: {
      de: 'Die 36 Fragen. Der Ursprung.',
      en: 'The original 36 questions.',
    },
    acts: CLASSIC_ACTS,
    modes: CLASSIC_MODES,
    actStyle: CLASSIC_ACT_STYLE,
    q37: CLASSIC_Q37,
    secretAtIndex: CLASSIC_SECRET_AT_INDEX,
    routes: CLASSIC_ROUTES,
  },
};

export const DEFAULT_PACK_ID = 'classic';
export const DEFAULT_ROUTE_ID = 'full';

export function getPack(packId) {
  return PACKS[packId] || PACKS[DEFAULT_PACK_ID];
}

// Falls back the same way getPack() does: an unrecognised or missing
// routeId (including every save written before routes existed) resolves
// to DEFAULT_ROUTE_ID -- the full, unshortened game, so nobody's
// in-progress or already-bookmarked game gets silently cut short by this
// existing. A pack that doesn't (yet) define DEFAULT_ROUTE_ID itself --
// e.g. a pilot pack with only a hand-curated `quick` set so far, iteration
// 7 Phase 3 -- falls back further, to whichever route it DOES define
// (Object.values() order == declaration order, so this is that pack's
// first/only route) rather than crashing on a route that doesn't exist for
// it. Every pack must still define at least one route -- see
// closer.test.js's registry-conformance coverage.
export function getRoute(packId, routeId) {
  const pack = getPack(packId);
  const requested = pack.routes && pack.routes[routeId];
  if (requested) return requested;
  return pack.routes[DEFAULT_ROUTE_ID] || Object.values(pack.routes)[0];
}

// Roughly each act's own pre-existing pacing (12 questions / ~15 minutes).
// Shared by actSubtitle() below and CloserGame.js's route-aware act timer,
// so the "about N minutes" promise and the timer's own overtime threshold
// can never drift apart from each other.
export const MINUTES_PER_QUESTION = 15 / QUESTIONS_PER_ACT;

function actSubtitle(count) {
  const minutes = Math.round(count * MINUTES_PER_QUESTION);
  return {
    de: `${count} Fragen · etwa ${minutes} Minuten`,
    en: `${count} question${count === 1 ? '' : 's'} · about ${minutes} minutes`,
  };
}

function resolvedLocalIndices(act, route, actNum) {
  return route.actIndices[actNum] || act.questions.map((_, i) => i);
}

/*
 * A pack's acts, filtered down to whichever route is active. For
 * DEFAULT_ROUTE_ID this reproduces the original, pre-Phase-2 acts exactly
 * (same questions, same order, same count) -- routes are additive, not a
 * replacement for the pack's own full content.
 */
export function resolvedActs(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  return pack.acts.map((act, actNum) => {
    const questions = resolvedLocalIndices(act, route, actNum).map((li) => act.questions[li]);
    return { ...act, questions, subtitle: actSubtitle(questions.length) };
  });
}

export function totalQuestions(packId, routeId = DEFAULT_ROUTE_ID) {
  return resolvedActs(packId, routeId).reduce((n, a) => n + a.questions.length, 0);
}

export function finalQuestionIndex(packId, routeId = DEFAULT_ROUTE_ID) {
  return totalQuestions(packId, routeId) - 1;
}

// The resolved question index each act starts at -- e.g. [0, 8, 16] for a
// route with 8 questions per act. Route-length-agnostic on purpose (unlike
// the old bare `% QUESTIONS_PER_ACT`), so CloserGame.js's act-break check
// works the same way whether every act is the pack's full 12 or a route's
// own, possibly uneven, curated count.
export function actStartIndices(packId, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = 0;
  return acts.map((a) => {
    const start = n;
    n += a.questions.length;
    return start;
  });
}

export function actIndexFor(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = 0;
  for (let i = 0; i < acts.length; i += 1) {
    n += acts[i].questions.length;
    if (questionIndex < n) return i;
  }
  return acts.length - 1;
}

export function questionAt(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const acts = resolvedActs(packId, routeId);
  let n = questionIndex;
  for (let i = 0; i < acts.length; i += 1) {
    if (n < acts[i].questions.length) return acts[i].questions[n];
    n -= acts[i].questions.length;
  }
  return null;
}

// Flat, route-relative-index -> original-pack-absolute-index mapping.
// Shared by originalIndexFor() and secretAtIndexFor() below; kept private
// since both of those already say everything a caller needs.
function flattenOriginalIndices(pack, route) {
  const result = [];
  let actStart = 0;
  pack.acts.forEach((act, actNum) => {
    resolvedLocalIndices(act, route, actNum).forEach((li) => result.push(actStart + li));
    actStart += act.questions.length;
  });
  return result;
}

/*
 * Maps a route-relative question index back to its absolute index in the
 * pack's full, unrouted question list -- e.g. so a future caller (the
 * voice branch, per its documented pack-namespaced contract) can still key
 * off the actual question asked (questionIdFor(packId, originalIndex))
 * rather than its position within whichever route happened to be playing.
 * Not yet called anywhere at runtime -- feat/closer-voice is untouched and
 * on hold -- but kept here rather than reinvented later, next to the
 * function that shares its logic.
 */
export function originalIndexFor(packId, questionIndex, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const flat = flattenOriginalIndices(pack, route);
  return flat[questionIndex] ?? null;
}

/*
 * The route-relative point at which the secret question interrupts,
 * derived automatically from the pack's own absolute secretAtIndex rather
 * than hand-computed per route (and so kept correct even if a route's
 * curated selection ever changes): it's the resolved position of the
 * first question, in route order, whose original absolute index is at or
 * past the pack's secretAtIndex. For DEFAULT_ROUTE_ID this always equals
 * the pack's own secretAtIndex unchanged (every original index is present,
 * in order). If a route's curation ever failed to include anything at or
 * past that threshold (not true of any route defined above), this falls
 * back to the route's own length -- registry-conformance tests assert
 * that never actually happens.
 */
export function secretAtIndexFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const pack = getPack(packId);
  const route = getRoute(packId, routeId);
  const flat = flattenOriginalIndices(pack, route);
  const pos = flat.findIndex((absoluteIndex) => absoluteIndex >= pack.secretAtIndex);
  return pos === -1 ? flat.length : pos;
}

/*
 * A stable, deterministic id for a given pack + question position -- e.g.
 * 'classic-q01' .. 'classic-q36'. Derived rather than stored on each
 * question object, so there is nothing to keep in sync by hand across 36+
 * questions per pack and no risk of a typo'd or duplicate id.
 */
export function questionIdFor(packId, questionIndex) {
  return `${packId}-q${String(questionIndex + 1).padStart(2, '0')}`;
}

/*
 * The agreed contract for pack-namespaced voice audio, so the voice branch
 * (feat/closer-voice, developed separately and not touched by this change)
 * has a fixed path convention to adopt once further packs exist. Before
 * this, audio was implicitly single-pack; new TTS generation should target
 * this layout going forward.
 */
export function voiceSrc(packId, lang, questionId) {
  return `/audio/closer/${packId}/${lang}/${questionId}.mp3`;
}

/*
 * Strict alternation: the same person never opens two questions running.
 * starterOffset is the one coin flip (made once, at player setup) that
 * decides who goes first overall; every question after that just walks the
 * parity forward. Question 37, which has no qIndex of its own, reuses this
 * with qIndex = totalQuestions(packId) to continue the same sequence rather
 * than flipping a fresh coin.
 */
export function starterFor(questionIndex, starterOffset) {
  return (questionIndex + starterOffset) % 2;
}

/*
 * Classifies the two answers from the private "did they ask your secret
 * question?" check (secretAsked = [person0Answer, person1Answer], each
 * true/false/null) into the cases question 37 branches on:
 *  - neither: nobody's question got asked -- each of you gets an explicit
 *    turn to ask it now (spec: double-NO sequential turns).
 *  - bothAsked: both already happened, question 37 is a pure bonus.
 *  - pendingPlayer: exactly one is still unasked -- that person asks it.
 *  - noneHaveSecretQuestion: neither person formed a secret question in the
 *    first place (bugfix-report iteration 7, BF-08/FR-07 -- "Heute keine"
 *    is an equally valid choice at the secret-question step, tracked
 *    separately in hasSecretQuestion). Distinct from `neither`: `neither`
 *    means two real questions exist and are still waiting; this means
 *    there is nothing to ask about, so Q37's "still waiting" copy would be
 *    false.
 * secretAsked defaults to [null, null] before either check completes.
 * hasSecretQuestion defaults to [null, null] before the secret-question
 * step; null there is treated the same as true (has one, not yet resolved)
 * so a save from before this option existed still classifies exactly as it
 * did before -- only an explicit `false` opts a person out of this
 * accounting.
 */
export function classifySecretAsked(secretAsked, hasSecretQuestion) {
  const [a0, a1] = secretAsked || [null, null];
  const [h0, h1] = hasSecretQuestion || [null, null];
  const noneHaveSecretQuestion = h0 === false && h1 === false;
  // A person who opted out has nothing pending -- treat their slot as
  // "resolved" so they never register as a still-waiting turn.
  const effective0 = h0 === false ? true : a0;
  const effective1 = h1 === false ? true : a1;
  const neither = !noneHaveSecretQuestion && effective0 === false && effective1 === false;
  const bothAsked = !noneHaveSecretQuestion && effective0 === true && effective1 === true;
  const pendingPlayer = effective0 === false ? 0 : effective1 === false ? 1 : null;
  return { neither, bothAsked, pendingPlayer, noneHaveSecretQuestion };
}
