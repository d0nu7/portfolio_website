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

// Shared by every iteration-8 pack's single style (FIRST DATE, DATE
// NIGHT, COUPLES, FRIENDS, OLD FRIENDS, DEEP, CHAOS, LATE NIGHT): no
// question in any of them carries a twist yet (see e.g. the block
// comment above FIRST_DATE_ACTS for why), so their one style has nothing
// to turn on, and its route-neutral blurb (matching CLASSIC ORIGINAL's
// own BF8-03 wording) is identical every time. Extracted here rather
// than repeated eight times so a future twist added to any one pack
// doesn't require also remembering to touch this boilerplate.
const NO_TWISTS = { predict: false, both: false, nothinking: false, deeper: false, stay: false };
// The two twist combinations the iteration-8 packs actually use, once
// twists were assigned to a restrained handful of their questions: GO
// DEEPER plus STAY (most packs) and GO DEEPER alone (CHAOS, which is
// deliberately low-stakes enough that no question earns a "take a
// moment" pause). PREDICT/BOTH/NO THINKING stay off everywhere outside
// CLASSIC -- those are more elaborate interaction mechanics that would
// need their own dedicated playful-style decision, not something to
// default on while assigning a first, sparse pass of twists.
const DEEPER_AND_STAY = { predict: false, both: false, nothinking: false, deeper: true, stay: true };
const DEEPER_ONLY = { predict: false, both: false, nothinking: false, deeper: true, stay: false };
const ROUTE_NEUTRAL_BLURB = {
  de: 'Zurückhaltende Inszenierung, ausgewählte Route.',
  en: 'Understated presentation for your selected route.',
};

/*
 * Response Card labels (iteration 8 catalog: FRIENDS/OLD FRIENDS/DEEP each
 * recommend one after specific questions). The four category names are
 * identical loanwords in both languages in the catalog itself, same as
 * ORIGINAL/CALM/PLAYFUL elsewhere in this file -- still a { de, en } pair
 * for consistency with the file's own convention that every user-visible
 * string is one. `question.responseCard = { label, text }` on a question
 * object is how CloserGame.js finds these; not every question has one.
 */
const RESPONSE_CARD_LABEL = {
  celebrate: { de: 'CELEBRATE', en: 'CELEBRATE' },
  followUp: { de: 'FOLLOW UP', en: 'FOLLOW UP' },
  validate: { de: 'VALIDATE', en: 'VALIDATE' },
  reflect: { de: 'REFLECT', en: 'REFLECT' },
};

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

/* ======================================================================
 * FIRST DATE (iteration 8 catalog rollout, FR8-01/FR8-03) -- the pilot
 * pack the holistic review recommended shipping first. Content is
 * transcribed verbatim from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md
 * section 3; that file is the source of truth for any future wording
 * change to this pack -- edit it there first, then mirror here.
 *
 * Deliberately no twists (predict/both/nothinking/deeper) or stayEnabled
 * on any question: the catalog doesn't mark any FIRST DATE question with a
 * twist, and assigning one now would be inventing a content decision that
 * belongs to the same editorial review CLASSIC's twists went through
 * (spec feedback 11, iteration 6), not something to guess at while wiring
 * up the pack. FIRST DATE therefore ships with a single CALM style; a
 * second, twist-bearing style can be added later once specific questions
 * are chosen for it.
 * ====================================================================== */

const FIRST_DATE_ACTS = [
  {
    id: 'curiosity',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'NEUGIER', en: 'CURIOSITY' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Fangt leicht an. Es geht um Neugier, nicht um Tiefe – ihr könnt jederzeit weitergehen.',
      en: "Start light. This is about curiosity, not depth -- you can move on whenever you like.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt.',
      en: 'Take a sip. Smile.',
    },
    questions: [
      {
        de: 'Wie sieht für dich ein perfekter ungeplanter Abend aus?',
        en: 'What does your perfect spontaneous evening look like?',
      },
      {
        de: 'Über welches Thema kannst du reden, ohne die Zeit zu bemerken?',
        en: 'What topic can you talk about and completely lose track of time?',
      },
      {
        de: 'Welche Kleinigkeit bringt dich fast immer zum Lachen?',
        en: 'What small thing can almost always make you laugh?',
      },
      {
        de: 'Worauf freust du dich gerade wirklich?',
        en: 'What are you genuinely looking forward to right now?',
      },
      {
        de: 'Welche einfache Freude hat zuletzt einen gewöhnlichen Tag besser gemacht?',
        en: 'What simple pleasure recently made an ordinary day better?',
      },
      {
        de: 'Was machst du gern, ohne darin besonders gut sein zu müssen?',
        en: 'What do you enjoy doing without needing to be particularly good at it?',
      },
      {
        de: 'Auf welchen kleinen Moment der letzten Zeit bist du stolz – und warum?',
        en: 'What small recent moment made you feel proud, and why?',
      },
      {
        de: 'Wofür begeisterst du dich gerade mehr, als andere vielleicht erwarten würden?',
        en: 'What are you more excited about lately than people might expect?',
      },
      {
        de: 'An welchem Ort fühlst du dich überraschend schnell wohl?',
        en: 'Where do you find it surprisingly easy to feel at home?',
      },
      {
        de: 'Welche kleine Gewohnheit macht deinen Alltag spürbar besser?',
        en: 'What small habit makes a real difference to your day?',
      },
      {
        de: 'Was würdest du gern nur zum Vergnügen lernen?',
        en: 'What would you love to learn purely for the fun of it?',
      },
      {
        de: 'Welche kleine Entscheidung hat dir in letzter Zeit überraschend gutgetan?',
        en: 'What small decision has turned out surprisingly well for you lately?',
      },
    ],
  },
  {
    id: 'signal',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'SIGNAL', en: 'SIGNALS' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Jetzt geht es um das, was sich zwischen euch beiden gerade zeigt.',
      en: "Now it's about what's showing up between the two of you right now.",
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Was hilft dir, dich mit einer neuen Person schnell wohlzufühlen?',
        en: 'What helps you feel comfortable around someone new?',
      },
      {
        de: 'Welche Eigenschaft fällt dir an anderen Menschen positiv auf?',
        en: 'What quality in other people tends to catch your attention in a good way?',
      },
      {
        de: 'Was macht ein Date für dich gut – unabhängig davon, wie es danach weitergeht?',
        en: 'What makes a date worthwhile, regardless of what happens afterward?',
      },
      {
        de: 'Was möchtest du über einen Menschen wissen, bevor du dir ein Urteil bildest?',
        en: 'What do you want to know about someone before you form an opinion of them?',
      },
      {
        de: 'Welches Verhalten gibt dir das Gefühl, dass dir wirklich zugehört wird?',
        en: 'What does someone do that makes you feel genuinely heard?',
      },
      {
        de: 'Wie zeigst du, dass dich eine Antwort wirklich interessiert?',
        en: 'How do you show someone that you are genuinely interested in their answer?',
      },
      {
        de: 'Welche Art von Kompliment erreicht dich wirklich?',
        en: 'What kind of compliment truly lands with you?',
      },
      {
        de: 'Welche Art von gemeinsamem Schweigen fühlt sich für dich angenehm an?',
        en: 'What kind of shared silence feels comfortable to you?',
      },
      {
        de: 'Welcher Wert zeigt sich in deinem Alltag besonders deutlich?',
        en: 'Which of your values shows up most clearly in your everyday life?',
      },
      {
        de: 'Welche gute Eigenschaft an dir erkennen Menschen oft erst mit der Zeit?',
        en: 'What good quality in you do people often discover only with time?',
        twist: 'deeper',
      },
      {
        de: 'Welche Mischung aus Planung und Spontaneität passt gut zu dir?',
        en: 'What balance of planning and spontaneity suits you best?',
      },
      {
        de: 'Welche Version von dir lernen neue Menschen meistens zuerst kennen?',
        en: 'Which version of you do new people usually meet first?',
      },
    ],
  },
  {
    id: 'clarity',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'KLARHEIT', en: 'CLARITY' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt bringt Klarheit über Erwartungen und Grenzen. Nichts davon ist ein Versprechen für später.',
      en: "This act brings clarity about expectations and boundaries. None of it is a promise about what comes next.",
    },
    questions: [
      {
        de: 'Was soll eine Person an dir bemerken, ohne dass du es beweisen musst?',
        en: 'What do you hope someone notices about you without making you prove it?',
      },
      {
        de: 'Woran merkst du, dass du jemanden gern wiedersehen möchtest?',
        en: 'How do you know when you would like to see someone again?',
      },
      {
        de: 'Welche Grenze macht Dating für dich leichter und sicherer?',
        en: 'What boundary makes dating feel easier and safer for you?',
      },
      {
        de: 'Welche Art von Verbindung hoffst du zu finden, ohne heute schon mehr versprechen zu müssen?',
        en: 'What kind of connection are you hoping for without having to promise anything tonight?',
      },
      {
        de: 'Welches Tempo fühlt sich beim Kennenlernen für dich gut an?',
        en: 'What pace feels right to you when getting to know someone?',
        stayEnabled: true,
      },
      {
        de: 'Welche Wahrheit über deinen Alltag ist wichtig, um dich gerade gut kennenzulernen?',
        en: 'What truth about your day-to-day life right now would help someone understand you better?',
      },
      {
        de: 'Wie zeigt sich Verlässlichkeit für dich am Anfang eines Kennenlernens?',
        en: 'What does reliability look like to you early on?',
      },
      {
        de: 'Wie soll eine Person nachfragen, wenn sie deine Gefühle nicht sicher einschätzen kann?',
        en: 'How would you like someone to ask when they are unsure how you feel?',
      },
      {
        de: 'Was lässt dich respektiert fühlen, wenn Interessen oder Meinungen auseinandergehen?',
        en: 'What makes you feel respected when interests or opinions differ?',
      },
      {
        de: 'Was soll dein Gegenüber von dir aus diesem Abend in Erinnerung behalten?',
        en: 'What do you hope the other person remembers about you from tonight?',
      },
      {
        de: 'Was hilft dir, ehrlich Nein zu sagen, ohne dich für die Stimmung verantwortlich zu fühlen?',
        en: 'What helps you say an honest no without feeling responsible for the mood?',
        stayEnabled: true,
      },
      {
        de: 'Was würde diesen Abend für dich gut und druckfrei abrunden?',
        en: 'What would make this evening feel complete and pressure-free for you?',
        last: true,
      },
    ],
  },
];

const FIRST_DATE_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander die Frage, von der ihr gehofft habt, dass sie heute noch kommt.',
    en: 'Take turns asking the question you each hoped would come up tonight.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} die Frage, von der du gehofft hast, dass sie dir heute gestellt wird.`
      : `${who}, ask ${other} the question you hoped they would ask you tonight.`,
  both: {
    de: 'Stellt euch noch eine Frage, die diesen ersten Abend gut abrundet.',
    en: 'Ask each other one more question that would bring this first evening to a good close.',
  },
};

// A single style. GO DEEPER and STAY are on, sparingly assigned below
// (one follow-up question, two stayEnabled questions) -- see the block
// comment above FIRST_DATE_ACTS for why twists started at none, and the
// note above DEEPER_AND_STAY for why only these two.
const FIRST_DATE_MODES = [
  {
    id: 'calm',
    title: { de: 'CALM', en: 'CALM' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

// Same relative placement as CLASSIC's (interrupts before absolute index
// 27, i.e. between the 3rd and 4th question of Act III) -- no pack-
// specific placement is given in the catalog, so this keeps a single,
// consistent convention across packs rather than inventing a bespoke one
// per pack.
const FIRST_DATE_SECRET_AT_INDEX = 27;

/*
 * Curated routes, verbatim from the catalog's "Kuratierte Routen" section.
 * Local (0-based, per-act) indices derived from the catalog's absolute
 * Q-numbers: Quick Q01,Q02,Q04,Q07 / Q13,Q15,Q17,Q21 / Q25,Q27,Q28,Q36;
 * Standard Q01-Q05,Q07,Q08,Q12 / Q13-Q17,Q19,Q21,Q24 / Q25,Q26,Q27,Q28,Q29,Q31,Q34,Q36.
 */
const FIRST_DATE_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 18 Minuten',
      en: '12 questions · 3 acts · about 18 minutes',
    },
    actIndices: [
      [0, 1, 3, 6],
      [0, 2, 4, 8],
      [0, 2, 3, 11],
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
    actIndices: [
      [0, 1, 2, 3, 4, 6, 7, 11],
      [0, 1, 2, 3, 4, 6, 8, 11],
      [0, 1, 2, 3, 4, 6, 9, 11],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 50 Minuten',
      en: '36 questions · 3 acts · about 50 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Warm, distinct from CLASSIC's cool teal/purple/grey -- same progressive
// withdrawal (chrome/glow shrink act over act) since that's a general
// CLOSER design principle, not a CLASSIC-specific choice.
const FIRST_DATE_ACT_STYLE = [
  { accent: '#FF8A65', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#F76E9E', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#FFC24B', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/* ======================================================================
 * DATE NIGHT (iteration 8 catalog rollout) -- content transcribed
 * verbatim from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section
 * 4. Same no-twists-yet stance as FIRST_DATE above (no question is marked
 * with a twist in the catalog); a single WARM style for now.
 * ====================================================================== */

const DATE_NIGHT_ACTS = [
  {
    id: 'spark',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'FUNKE', en: 'SPARK' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Es geht um Anziehung und Wärme – prickelnd, aber ohne Druck.',
      en: "This is about attraction and warmth -- a spark, without any pressure.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein bisschen mehr darüber, was zwischen euch funkt.',
      en: "You now know a little more about what sparks between you.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt euch an.',
      en: 'Take a sip. Smile at each other.',
    },
    questions: [
      {
        de: 'Welche kleine Sache findest du überraschend attraktiv?',
        en: 'What small thing do you find surprisingly attractive?',
      },
      {
        de: 'Welches Kompliment bleibt bei dir besonders lange hängen?',
        en: 'What kind of compliment tends to stay with you?',
      },
      {
        de: 'Woran merkst du, dass jemand mit dir flirtet?',
        en: 'How can you tell when someone is flirting with you?',
      },
      {
        de: 'Bei welcher Art von Date vergisst du leicht die Zeit?',
        en: 'What kind of date makes it easy for you to lose track of time?',
      },
      {
        de: 'Welcher konkrete Moment zwischen euch hatte zuletzt einen besonderen Funken?',
        en: 'What recent moment between you had a special spark?',
      },
      {
        de: 'Welche Seite an deinem Gegenüber entdeckst du immer wieder gern neu?',
        en: 'What side of the person across from you do you still enjoy rediscovering?',
      },
      {
        de: 'Welche Art von Ausstrahlung zieht deine Aufmerksamkeit sofort an?',
        en: 'What kind of presence catches your attention immediately?',
      },
      {
        de: 'Welche spielerische Geste lässt dich merken, dass du gemeint bist?',
        en: 'What playful gesture makes you feel singled out in the best way?',
      },
      {
        de: 'Was macht einen gewöhnlichen Moment für dich romantisch?',
        en: 'What turns an ordinary moment into a romantic one for you?',
      },
      {
        de: 'Welche gemeinsame Erinnerung gibt dir sofort ein warmes Gefühl?',
        en: 'What shared memory gives you an instant warm feeling?',
      },
      {
        de: 'Welche Art von Vorfreude genießt du besonders?',
        en: 'What kind of anticipation do you enjoy most?',
      },
      {
        de: 'Welche Kleinigkeit an deinem Gegenüber ist dir heute positiv aufgefallen?',
        en: 'What small thing about the person across from you have you appreciated tonight?',
      },
    ],
  },
  {
    id: 'tension',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'SPANNUNG', en: 'TENSION' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Jetzt geht es um Nähe, Berührung und Wünsche – immer nur, wenn ihr wollt.',
      en: "Now it's about closeness, touch and desire -- only ever if you want to.",
    },
    breakText: {
      de: 'Die Spannung darf bleiben, wo sie gerade ist.',
      en: 'The tension is welcome to stay exactly where it is.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Wann fühlst du dich besonders begehrt?',
        en: 'When do you feel most desired?',
      },
      {
        de: 'Welche Form von Nähe lässt dich entspannen?',
        en: 'What kind of closeness helps you relax?',
      },
      {
        de: 'Was würdest du bei einem Date gern öfter selbst initiieren?',
        en: 'What would you like to initiate more often on a date?',
      },
      {
        de: 'Welche unausgesprochene Spannung zwischen zwei Menschen findest du schön?',
        en: 'What kind of unspoken tension between two people do you enjoy?',
      },
      {
        de: 'Welche verspielte Aufmerksamkeit lässt dich besonders gewählt fühlen?',
        en: 'What kind of playful attention makes you feel especially chosen?',
      },
      {
        de: 'Welche Art von Berührung fühlt sich für dich besonders zärtlich an?',
        en: 'What kind of touch feels especially tender to you?',
      },
      {
        de: 'Welche Atmosphäre spricht deine Sinne besonders an?',
        en: 'What kind of atmosphere awakens your senses?',
      },
      {
        de: 'Falls Küsse für dich dazugehören: Welche Art von Kuss fühlt sich besonders innig an?',
        en: 'If kissing is part of intimacy for you, what kind of kiss feels especially close?',
      },
      {
        de: 'Welche neue gemeinsame Erfahrung könnte zwischen euch einen Funken wecken?',
        en: 'What new experience together could bring out a fresh spark between you?',
        twist: 'deeper',
      },
      {
        de: 'Welches flirtende Kompliment würdest du heute gern hören?',
        en: 'What flirty compliment would you enjoy hearing tonight?',
      },
      {
        de: 'Welches Tempo lässt Anziehung für dich wachsen?',
        en: 'What pace allows attraction to grow for you?',
      },
      {
        de: 'Was lässt Anziehung für dich verspielt statt druckvoll wirken?',
        en: 'What makes attraction feel playful rather than pressured to you?',
      },
    ],
  },
  {
    id: 'openness',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'OFFEN', en: 'OPENNESS' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt öffnet Verlangen und Grenzen ehrlich, ohne dass daraus ein Versprechen für heute wird.',
      en: "This act opens up desire and boundaries honestly, without turning into a promise for tonight.",
    },
    questions: [
      {
        de: 'Was hilft dir, dich sicher genug zu fühlen, um dich fallen zu lassen?',
        en: 'What helps you feel safe enough to let your guard down?',
      },
      {
        de: 'Welche Grenze macht Intimität für dich erst möglich?',
        en: 'What boundary helps make intimacy possible for you?',
      },
      {
        de: 'Was sollte ein Mensch über dein Verlangen verstehen, ohne es persönlich zu nehmen?',
        en: 'What should someone understand about your desire without taking it personally?',
      },
      {
        de: 'Was macht es dir leicht, ein ehrliches Ja oder Nein auszusprechen?',
        en: 'What makes it easier for you to give an honest yes or no?',
      },
      {
        de: 'Welche Form von Nähe fühlt sich gut an, auch wenn sie nirgendwohin führen muss?',
        en: 'What kind of closeness feels good even when it does not have to lead anywhere?',
        stayEnabled: true,
      },
      {
        de: 'Welche romantische Initiative lässt dich wirklich gesehen fühlen?',
        en: 'What romantic initiative makes you feel truly seen?',
      },
      {
        de: 'Welche Reaktion hilft dir, wenn eure Wünsche gerade nicht übereinstimmen?',
        en: 'What kind of response helps when your wishes do not match in the moment?',
      },
      {
        de: 'Welche gute Nachricht oder kleine Freude möchtest du heute gemeinsam feiern?',
        en: 'What piece of good news or small joy would you like to celebrate together tonight?',
      },
      {
        de: 'Welchen Wunsch würdest du gern teilen, wenn daraus keine Erwartung entsteht?',
        en: 'What wish would you like to share if it came with no expectation?',
        stayEnabled: true,
      },
      {
        de: 'Wie sieht für dich ein schöner Ausklang nach einem besonders nahen Date aus?',
        en: 'What does a lovely ending to an especially close date look like to you?',
      },
      {
        de: 'Welche kleine neue Erfahrung würdest du bei einem nächsten Date gern teilen?',
        en: 'What small new experience would you enjoy sharing on a future date?',
      },
      {
        de: 'Welcher Gedanke aus diesem Abend soll noch ein wenig nachklingen?',
        en: 'What thought from tonight would you like to linger a little longer?',
        last: true,
      },
    ],
  },
];

const DATE_NIGHT_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander die Frage, die ihr euch für diesen Abend noch gewünscht habt.',
    en: 'Take turns asking the question you each wished had come up tonight.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} die Frage, die du dir heute Abend insgeheim gewünscht hast.`
      : `${who}, ask ${other} the question you secretly wished for tonight.`,
  both: {
    de: 'Stellt euch noch eine Frage, die den Funken dieses Abends mit in morgen nimmt.',
    en: "Ask each other one more question that carries tonight's spark into tomorrow.",
  },
};

const DATE_NIGHT_MODES = [
  {
    id: 'warm',
    title: { de: 'WARM', en: 'WARM' },
    meta: { de: 'Prickelnd, nicht explizit', en: 'A spark, not explicit' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const DATE_NIGHT_SECRET_AT_INDEX = 27;

/*
 * Q01,Q02,Q05,Q09 / Q13,Q14,Q18,Q24 / Q25,Q28,Q33,Q36 (Quick);
 * Q01-Q02,Q04-Q06,Q09-Q10,Q12 / Q13-Q15,Q18,Q20,Q21,Q23,Q24 /
 * Q25,Q26,Q28-Q30,Q32,Q33,Q36 (Standard) -- verbatim from the catalog's
 * "Kuratierte Routen" list.
 */
const DATE_NIGHT_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 18 Minuten',
      en: '12 questions · 3 acts · about 18 minutes',
    },
    actIndices: [
      [0, 1, 4, 8],
      [0, 1, 5, 11],
      [0, 3, 8, 11],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 32 Minuten',
      en: '24 questions · 3 acts · about 32 minutes',
    },
    actIndices: [
      [0, 1, 3, 4, 5, 8, 9, 11],
      [0, 1, 2, 5, 7, 8, 10, 11],
      [0, 1, 3, 4, 5, 7, 8, 11],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 55 Minuten',
      en: '36 questions · 3 acts · about 55 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Sensual, distinct from FIRST_DATE's lighter coral/rose/gold.
const DATE_NIGHT_ACT_STYLE = [
  { accent: '#FF5C8A', chrome: 1, progress: 'full', glow: 0.3 },
  { accent: '#C24E9E', chrome: 0.5, progress: 'count', glow: 0.17 },
  { accent: '#F2A65A', chrome: 0.22, progress: 'number', glow: 0.06 },
];

/* ======================================================================
 * COUPLES (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 5.
 *
 * Quick and Standard deliberately end on Q35, one question short of the
 * pack's real closer (Q36, `last: true`) -- the catalog's own curation,
 * not an error here. Q36 is reserved for the Full route; see the
 * relaxed "ends on last:true" test in closer.test.js (only enforced for
 * the full route, for exactly this reason).
 * ====================================================================== */

const COUPLES_ACTS = [
  {
    id: 'noticing',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'SEHEN', en: 'NOTICING' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Fangt damit an, was zwischen euch gerade gut läuft.',
      en: "Start with what's already going well between you.",
    },
    breakText: {
      de: 'Ihr habt euch gerade bewusst füreinander Zeit genommen.',
      en: "You've just taken deliberate time for each other.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        de: 'Welcher kleine Moment zwischen euch hat dir zuletzt gutgetan?',
        en: 'What small moment between you felt good to you recently?',
      },
      {
        de: 'Was macht ihr als Paar gerade richtig?',
        en: 'What are the two of you doing well as a couple right now?',
      },
      {
        de: 'Welches Alltagsritual möchtest du unbedingt behalten?',
        en: 'What everyday ritual in your relationship would you really like to keep?',
      },
      {
        de: 'Wann fühlt ihr euch in eurer Beziehung besonders als Team?',
        en: 'When do the two of you feel most like a team?',
      },
      {
        de: 'Welche Eigenschaft deines Gegenübers wurde in einem Moment sichtbar, für den du diese Woche dankbar bist?',
        en: 'Which quality in your partner showed up in a moment you felt grateful for this week?',
      },
      {
        de: 'Welche gute Nachricht oder kleine Freude möchtest du gerade gemeinsam feiern – und welche Reaktion würde sich gut anfühlen?',
        en: 'What piece of good news or small joy would you like to celebrate together right now—and what response would feel good?',
      },
      {
        de: 'Welche alltägliche Bemühung deines Gegenübers bedeutet dir mehr, als diese Person vermutlich merkt?',
        en: 'What everyday effort from your partner means more to you than they probably realize?',
      },
      {
        de: 'Was tut dein Gegenüber beim Zuhören, das dich besonders verstanden fühlen lässt?',
        en: 'What does your partner do while listening that makes you feel especially understood?',
      },
      {
        de: 'Welche kleine Gewohnheit zwischen euch fühlt sich für dich nach Zuhause an?',
        en: 'What small habit between you feels like home to you?',
      },
      {
        de: 'Welcher Moment hat dich zuletzt stolz auf euch als Paar gemacht?',
        en: 'What recent moment made you feel proud of the two of you as a couple?',
      },
      {
        de: 'Welche Seite von dir kommt in eurer Beziehung leichter zum Vorschein?',
        en: 'What part of you comes out more easily in your relationship?',
      },
      {
        de: 'Welches ehrliche Kompliment über eure Beziehung kannst du gut annehmen?',
        en: 'What sincere compliment about your relationship can you truly accept?',
      },
    ],
  },
  {
    id: 'repair',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'REPARIEREN', en: 'REPAIR' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Kein Therapieersatz -- nur ein bisschen mehr Verständnis für das, was manchmal schwer ist.',
      en: "Not a substitute for therapy -- just a little more understanding for what's sometimes hard.",
    },
    breakText: {
      de: 'Auch das gehört zu einer guten Beziehung.',
      en: 'This is part of a good relationship too.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Welche Bitte fällt dir deinem Gegenüber schwer auszusprechen?',
        en: 'What request do you find difficult to make of your partner?',
      },
      {
        de: 'Wie wünschst du dir Trost, wenn es dir nicht gut geht?',
        en: 'How do you like to be comforted when you are having a hard time?',
      },
      {
        de: 'Welches Bedürfnis bleibt hinter einem wiederkehrenden Missverständnis zwischen euch oft unsichtbar?',
        en: 'What need often goes unseen beneath a recurring misunderstanding between you?',
        stayEnabled: true,
      },
      {
        de: 'Woran merkst du, dass eine Entschuldigung bei dir wirklich ankommt?',
        en: 'What tells you that an apology has truly landed?',
      },
      {
        de: 'Welche Reaktion wünschst du dir zuerst, wenn du Stress teilst?',
        en: 'What kind of response do you want first when you share something stressful?',
      },
      {
        de: 'Welche Formulierung hilft dir, um Raum zu bitten, ohne Distanz zu meinen?',
        en: 'What words help you ask for space without meaning emotional distance?',
      },
      {
        de: 'Was macht ein schwieriges Gespräch für dich sicherer?',
        en: 'What helps a difficult conversation feel safer to you?',
      },
      {
        de: 'Wie kann dein Gegenüber auf eine gute Nachricht von dir so reagieren, dass du dich wirklich begleitet fühlst?',
        en: 'How can your partner respond to your good news in a way that makes you feel truly supported?',
      },
      {
        de: 'Welches Signal sollte für euch bedeuten, kurz innezuhalten statt weiterzudrängen?',
        en: 'What signal should tell the two of you to pause rather than push on?',
      },
      {
        de: 'Welcher frühere schwierige Moment zeigt dir, dass ihr wieder zueinanderfinden könnt?',
        en: 'What past difficult moment reminds you that the two of you can find your way back to each other?',
        stayEnabled: true,
      },
      {
        de: 'Welche kleine Veränderung würde in eurem Alltag gerade spürbar Druck herausnehmen?',
        en: 'What small change would noticeably ease the pressure in your everyday life right now?',
      },
      {
        de: 'Was soll dein Gegenüber verstehen, bevor diese Person versucht, ein Problem für dich zu lösen?',
        en: 'What would you like your partner to understand before they try to solve a problem for you?',
      },
    ],
  },
  {
    id: 'choosing',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'WÄHLEN', en: 'CHOOSING' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt schaut nach vorn -- auf das, was ihr als Paar als Nächstes wählt.',
      en: "This act looks ahead -- at what the two of you choose next as a couple.",
    },
    questions: [
      {
        de: 'Wovon möchtest du in den nächsten drei Monaten mehr gemeinsam erleben?',
        en: 'What would you like the two of you to experience more of over the next three months?',
      },
      {
        de: 'Welchen gemeinsamen Wunsch habt ihr zu lange verschoben?',
        en: 'What shared wish have the two of you postponed for too long?',
      },
      {
        de: 'Wie könnt ihr eure Nähe schützen, wenn der Alltag stressig wird?',
        en: 'How can the two of you protect your closeness when everyday life gets stressful?',
      },
      {
        de: 'Welches kleine Versprechen könnt ihr euch für diese Woche geben?',
        en: 'What small promise can the two of you make for this week?',
      },
      {
        de: 'Welche neue gemeinsame Erfahrung würdet ihr im nächsten Monat gern ausprobieren?',
        en: 'What new experience would the two of you like to try in the next month?',
      },
      {
        de: 'Welche neue Tradition würde gut zu euch passen?',
        en: 'What new tradition would suit the two of you?',
      },
      {
        de: 'Wie sieht ein gewöhnlicher gemeinsamer Tag aus, auf den du dich auch in einigen Jahren freuen würdest?',
        en: 'What would an ordinary day together look like if it still felt worth looking forward to years from now?',
        twist: 'deeper',
      },
      {
        de: 'Welche Eigenschaft möchtet ihr als Team stärker entwickeln?',
        en: 'What quality would you like to grow stronger in as a team?',
      },
      {
        de: 'Welche Seite eurer Beziehung möchtest du auch in stressigen Zeiten bewusst wählen?',
        en: 'What part of your relationship do you want to keep choosing even during stressful times?',
      },
      {
        de: 'Zu welchem Gespräch möchtet ihr regelmäßig zurückkehren?',
        en: 'What conversation would you like to return to regularly?',
      },
      {
        de: 'Welche Unterstützung deines Gegenübers würde dir bei einem aktuellen Ziel wirklich helfen?',
        en: 'What support from your partner would genuinely help with one of your current goals?',
      },
      {
        de: 'Welcher Satz aus diesem Gespräch soll euch morgen noch begleiten?',
        en: 'What line from this conversation would you like to carry into tomorrow?',
        last: true,
      },
    ],
  },
];

const COUPLES_Q37 = {
  neither: {
    de: 'Stellt euch nacheinander die Frage, die ihr euch in eurer Beziehung schon länger wünscht.',
    en: 'Take turns asking the question you have each been wishing for in your relationship.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, stell ${other} die Frage, die du dir in eurer Beziehung schon länger gewünscht hast.`
      : `${who}, ask ${other} the question you have been wishing for in your relationship.`,
  both: {
    de: 'Stellt euch noch eine Frage, die euch auch morgen an etwas Wertvolles zwischen euch erinnert.',
    en: 'Ask each other one more question that will remind you tomorrow of something valuable between you.',
  },
};

const COUPLES_MODES = [
  {
    id: 'grounded',
    title: { de: 'GROUNDED', en: 'GROUNDED' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const COUPLES_SECRET_AT_INDEX = 27;

/*
 * Q01,Q02,Q05,Q09 / Q14,Q17,Q20,Q24 / Q25,Q28,Q29,Q35 (Quick);
 * Q01-Q06,Q09,Q10 / Q13-Q17,Q19,Q20,Q24 / Q25,Q26,Q27,Q28,Q29,Q31,Q34,Q35
 * (Standard) -- verbatim from the catalog's "Kuratierte Routen" list. Both
 * end on Q35, not Q36 -- see the block comment above COUPLES_ACTS.
 */
const COUPLES_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Check-in', en: 'Check-in' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 15 Minuten',
      en: '12 questions · 3 acts · about 15 minutes',
    },
    actIndices: [
      [0, 1, 4, 8],
      [1, 4, 7, 11],
      [0, 3, 4, 10],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 32 Minuten',
      en: '24 questions · 3 acts · about 32 minutes',
    },
    actIndices: [
      [0, 1, 2, 3, 4, 5, 8, 9],
      [0, 1, 2, 3, 4, 6, 7, 11],
      [0, 1, 2, 3, 4, 6, 9, 10],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 60 Minuten',
      en: '36 questions · 3 acts · about 60 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Grounded, trust-oriented -- soft green (noticing/gratitude), warm amber
// (repair), calm blue (choosing/future).
const COUPLES_ACT_STYLE = [
  { accent: '#5FBF8B', chrome: 1, progress: 'full', glow: 0.26 },
  { accent: '#E0985B', chrome: 0.5, progress: 'count', glow: 0.14 },
  { accent: '#4D8FD1', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/* ======================================================================
 * FRIENDS (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 6.
 *
 * Quick/Standard end on Q34/Q35 -- Q36 (`last: true`) is marked Full-only
 * in the catalog's own per-question Route column, reserving its closing
 * "REFLECT" response card for the complete experience. See the relaxed
 * "ends on last:true" test in closer.test.js.
 *
 * Response Cards (optional listening prompts the catalog recommends after
 * specific questions) and the pack's own dynamic Q37 wording are
 * transcribed below; Response Cards are not yet a CloserGame.js UI
 * feature (see the housekeeping note in this file's own commit) -- kept
 * here as a comment so the content isn't lost before that's built.
 *
 * Response Cards: after Q08/Q33 CELEBRATE; after Q18 FOLLOW UP; after
 * Q21/Q24 VALIDATE; after Q36 REFLECT (see catalog section 6 for exact
 * wording).
 * ====================================================================== */

const FRIENDS_ACTS = [
  {
    id: 'light',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'LEICHT', en: 'LIGHT' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Ausdrücklich freundschaftlich -- Humor und Wertschätzung, keine romantische Rahmung.',
      en: "Explicitly friendship-toned -- humor and appreciation, no romantic framing.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lacht kurz.',
      en: 'Take a sip. Have a laugh.',
    },
    questions: [
      {
        de: 'Welche kleine Sache macht dir im Moment Freude?',
        en: 'What small thing is bringing you joy at the moment?',
      },
      {
        de: 'Welche Rolle nimmst du in Gruppen oft ganz automatisch ein?',
        en: 'What role do you tend to slip into automatically in a group?',
      },
      {
        de: 'Für welches eher ungewöhnliche Thema kannst du dich überraschend stark begeistern?',
        en: 'What slightly unusual topic can you get surprisingly excited about?',
      },
      {
        de: 'Welche konkrete Erinnerung steckt hinter einem Insider zwischen uns, der immer noch lustig ist?',
        en: 'What specific memory is behind an inside joke between us that is still funny?',
      },
      {
        de: 'Woran merkst du am Ende eines freien Tages, dass du ihn gut verbracht hast?',
        en: 'At the end of a day off, what tells you that you spent it well?',
      },
      {
        de: 'Worin bist du besser, als du dir selbst meistens zugestehst?',
        en: 'What are you better at than you usually give yourself credit for?',
      },
      {
        de: 'Welche Eigenschaft ist dir in einer guten Freundschaft besonders wichtig?',
        en: 'What quality matters most to you in a good friendship?',
      },
      {
        de: 'Welche gute Nachricht aus deinem Leben verdient gerade etwas mehr Aufmerksamkeit – und warum?',
        en: 'What good news in your life deserves a little more attention right now, and why?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.celebrate,
          text: {
            de: 'Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.',
            en: 'Take a moment to celebrate with them before sharing your own story.',
          },
        },
      },
      {
        de: 'Bei welchem konkreten gemeinsamen Moment musstest du besonders ehrlich lachen?',
        en: 'During what specific moment together did you laugh most genuinely?',
      },
      {
        de: 'Welche konkrete Sache hat die andere Person einmal für dich getan – und welche Stärke von ihr wurde darin sichtbar?',
        en: 'What is one specific thing the other person once did for you, and what strength of theirs did it reveal?',
      },
      {
        de: 'Welche Seite von dir hat sich verändert, seit wir uns kennen?',
        en: 'What side of you has changed since we have known each other?',
      },
      {
        de: 'Über welchen Teil deines Lebens würdest du dir von befreundeten Menschen mehr neugierige Fragen wünschen?',
        en: 'What part of your life would you like your friends to ask more curious questions about?',
      },
    ],
  },
  {
    id: 'showingup',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'DA SEIN', en: 'SHOWING UP' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Jetzt geht es um Unterstützung -- wie sie wirklich ankommt.',
      en: "Now it's about support -- how it actually lands.",
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Welche Form von Unterstützung hilft dir wirklich?',
        en: 'What kind of support genuinely helps you?',
      },
      {
        de: 'Woran kann eine befreundete Person erkennen, ob du gerade Rat oder einfach Gesellschaft möchtest?',
        en: 'How can a friend tell whether you want advice or simply some company?',
      },
      {
        de: 'Was tut jemand konkret, wenn du dich in einem Gespräch wirklich gehört fühlst?',
        en: 'What does someone actually do that makes you feel truly heard in a conversation?',
      },
      {
        de: 'Was wird an dir häufig missverstanden?',
        en: 'What do people often misunderstand about you?',
      },
      {
        de: 'Welche Emotion kannst du unter befreundeten Menschen leicht zeigen, und welche eher nicht?',
        en: 'Which emotion can you show easily around friends, and which one is harder to show?',
      },
      {
        de: 'Wann hat eine befreundete Person zuletzt genau die richtige Nachfrage gestellt – und was hat sie bewirkt?',
        en: 'When did a friend last ask exactly the right follow-up question, and what difference did it make?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.followUp,
          text: {
            de: 'Frag nach einem konkreten Detail, das dir hilft, die Antwort besser zu verstehen.',
            en: 'Ask for one specific detail that helps you understand the answer better.',
          },
        },
      },
      {
        de: 'Wann hattest du zuletzt das Gefühl, dass dir eine befreundete Person wirklich den Rücken stärkt?',
        en: 'When did you last feel that a friend truly had your back?',
      },
      {
        de: 'Wie wünschst du dir, dass befreundete Menschen auf eine gute Nachricht von dir reagieren?',
        en: 'How would you like your friends to respond when you share good news?',
      },
      {
        de: 'Wenn du einen schweren Tag teilst: Was hilft zuerst – Zuhören, Trost, Ablenkung, Ideen, praktische Hilfe oder etwas anderes?',
        en: 'When you share that you have had a hard day, what helps first: listening, comfort, distraction, ideas, practical help, or something else?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Keine Lösung nötig. Zeig zuerst, dass du es gehört hast.',
            en: 'No solution is needed. First, show that you heard them.',
          },
        },
      },
      {
        de: 'Welche Eigenschaft der anderen Person schätzt du, die sie selbst vielleicht unterschätzt?',
        en: 'What quality do you appreciate in the other person that they may underestimate in themselves?',
      },
      {
        de: 'Welche Grenze macht Freundschaften für dich verlässlicher und sicherer?',
        en: 'What boundary makes friendships feel more reliable and safe to you?',
      },
      {
        de: 'Welches aktuelle Thema darf eine befreundete Person einfach mit dir aushalten, ohne es lösen zu müssen?',
        en: 'What are you dealing with right now that a friend can simply sit with you in, without having to solve it?',
        stayEnabled: true,
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Keine Lösung nötig. Zeig zuerst, dass du es gehört hast.',
            en: 'No solution is needed. First, show that you heard them.',
          },
        },
      },
    ],
  },
  {
    id: 'ahead',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'WEITER', en: 'AHEAD' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt blickt nach vorn -- auf das, was ihr als Freunde als Nächstes wollt.',
      en: "This act looks ahead -- at what the two of you want next as friends.",
    },
    questions: [
      {
        de: 'Was würdest du dieses Jahr gern gemeinsam machen?',
        en: 'What would you enjoy doing together this year?',
      },
      {
        de: 'Welche neue gemeinsame Erinnerung sollten wir in den nächsten Monaten schaffen?',
        en: 'What new shared memory should we create in the next few months?',
      },
      {
        de: 'Welche Art von Moment zwischen uns fühlt sich für dich besonders nach Freundschaft an?',
        en: 'What kind of moment between us feels most like friendship to you?',
      },
      {
        de: 'Wie hat dich eine Freundschaft in deinem Leben verändert?',
        en: 'How has a friendship changed you?',
      },
      {
        de: 'Was sollte die andere Person über deine heutige Version wissen, das früher noch nicht galt?',
        en: 'What should the other person know about who you are today that was not true before?',
      },
      {
        de: 'Was würdest du gern von der anderen Person lernen – nicht unbedingt als Fähigkeit, sondern als Haltung?',
        en: 'What would you like to learn from the other person, not necessarily as a skill but as a way of approaching life?',
        twist: 'deeper',
      },
      {
        de: 'Was sollten befreundete Menschen einander öfter fragen?',
        en: 'What should friends ask each other more often?',
      },
      {
        de: 'Wie könnte ich in den nächsten Monaten besser für dich da sein, ohne etwas für dich zu entscheiden?',
        en: 'How could I show up for you better over the next few months without deciding anything for you?',
      },
      {
        de: 'Welchen kleinen oder großen Erfolg sollten wir als Nächstes gemeinsam feiern?',
        en: 'What small or big success should we celebrate together next?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.celebrate,
          text: {
            de: 'Freu dich kurz mit, bevor du deine eigene Geschichte erzählst.',
            en: 'Take a moment to celebrate with them before sharing your own story.',
          },
        },
      },
      {
        de: 'Wofür wären wir in einem Jahr dankbar, wenn wir es jetzt gemeinsam planen?',
        en: 'What would we be grateful for a year from now if we planned it together today?',
      },
      {
        de: 'Was hilft unserer Freundschaft, auch in vollen oder anstrengenden Zeiten Raum zu behalten?',
        en: 'What helps our friendship keep a place in our lives when things are busy or difficult?',
      },
      {
        de: 'Wofür möchtest du der anderen Person heute danken – und was sagt das über sie aus?',
        en: 'What would you like to thank the other person for today, and what does it say about who they are?',
        last: true,
        responseCard: {
          label: RESPONSE_CARD_LABEL.reflect,
          text: {
            de: 'Sag in einem Satz, was du an der Antwort verstanden hast.',
            en: 'In one sentence, say what you understood from the answer.',
          },
        },
      },
    ],
  },
];

const FRIENDS_Q37 = {
  neither: {
    de: 'Zwei Fragen haben noch gewartet. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet.',
    en: 'Two questions have been waiting. If it feels right, ask them one at a time now. No answer is owed.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell jetzt die Frage, von der du gehofft hast, dass ${other} sie dir stellt. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask the question you hoped ${other} would ask you. Answering is still optional.`,
  both: {
    de: 'Was möchtest du, dass die andere Person aus diesem Gespräch über dich mitnimmt?',
    en: 'What would you like the other person to take away from this conversation about you?',
  },
};

const FRIENDS_MODES = [
  {
    id: 'easy',
    title: { de: 'EASY', en: 'EASY' },
    meta: { de: 'Locker und ehrlich', en: 'Easygoing and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const FRIENDS_SECRET_AT_INDEX = 27;

// Every third question, repeating (Q/S/F, S/F, F) per act -- verbatim
// from the catalog's per-question Route column in section 6.
const FRIENDS_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 18 Minuten',
      en: '12 questions · 3 acts · about 18 minutes',
    },
    actIndices: [
      [0, 3, 6, 9],
      [0, 3, 6, 9],
      [0, 3, 6, 9],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 35 Minuten',
      en: '24 questions · 3 acts · about 35 minutes',
    },
    actIndices: [
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 60 Minuten',
      en: '36 questions · 3 acts · about 60 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Bright and warm -- sunny yellow, warm orange, friendly green.
const FRIENDS_ACT_STYLE = [
  { accent: '#FFC145', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#FF8C61', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#6FCF97', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/* ======================================================================
 * OLD FRIENDS (iteration 8 catalog rollout) -- content transcribed
 * verbatim from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md
 * section 7. Same route-column shape as FRIENDS (every third question
 * per act); Quick/Standard end on Q34/Q35, Q36 is Full-only -- see the
 * relaxed "ends on last:true" test in closer.test.js.
 *
 * Response Cards (not yet a CloserGame.js feature, see FRIENDS' own note
 * above): after Q02/Q04 FOLLOW UP; after Q12 REFLECT; after Q20/Q30
 * VALIDATE; after Q34 FOLLOW UP (see catalog section 7 for exact wording).
 * ====================================================================== */

const OLD_FRIENDS_ACTS = [
  {
    id: 'then',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'DAMALS', en: 'THEN' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Fangt bei eurer gemeinsamen Geschichte an -- ohne Nähe oder Versöhnung vorauszusetzen.',
      en: "Start with your shared history -- without assuming closeness or reconciliation.",
    },
    breakText: {
      de: 'Ihr habt gerade ein Stück gemeinsame Geschichte wieder aufleben lassen.',
      en: "You've just brought a piece of shared history back to life.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lächelt.',
      en: 'Take a sip. Smile.',
    },
    questions: [
      {
        de: 'Was ist deine erste klare Erinnerung an uns?',
        en: 'What is your first clear memory of us?',
      },
      {
        de: 'Welche einzelne gemeinsame Szene kannst du heute noch besonders deutlich vor dir sehen?',
        en: 'What single moment we shared can you still picture especially clearly?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.followUp,
          text: {
            de: 'Frag nach einem einzigen Detail aus dieser Szene.',
            en: 'Ask for one detail from that moment.',
          },
        },
      },
      {
        de: 'Welcher Ort, Gegenstand, Geruch oder Klang gehört für dich zu einer Erinnerung an uns?',
        en: 'What place, object, smell, or sound belongs to one of your memories of us?',
      },
      {
        de: 'An welches kleine gemeinsame Detail habe ich vielleicht nicht mehr gedacht?',
        en: 'What small detail from something we shared might I have forgotten?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.followUp,
          text: {
            de: 'Frag nach einem einzigen Detail aus dieser Szene.',
            en: 'Ask for one detail from that moment.',
          },
        },
      },
      {
        de: 'Bei welchem konkreten Moment haben wir einmal besonders ehrlich miteinander gelacht?',
        en: 'During what specific moment did we once laugh most genuinely together?',
      },
      {
        de: 'Welcher damals gewöhnliche Moment zwischen uns fühlt sich rückblickend bedeutungsvoll an?',
        en: 'What ordinary moment between us feels meaningful in hindsight?',
      },
      {
        de: 'Welche frühere Version von mir ist dir besonders im Gedächtnis geblieben?',
        en: 'What earlier version of me has stayed in your memory most clearly?',
      },
      {
        de: 'Was hat dir unsere Freundschaft in dieser Phase deines Lebens gegeben?',
        en: 'What did our friendship give you during that phase of your life?',
      },
      {
        de: 'Welche unserer alten Geschichten bedeutet dir heute etwas anderes als damals?',
        en: 'Which story from our past means something different to you now than it did then?',
      },
      {
        de: 'Wofür möchtest du mir aus dieser Zeit danken – und welche Eigenschaft von mir wurde darin sichtbar?',
        en: 'What would you like to thank me for from that time, and what quality of mine did it reveal?',
      },
      {
        de: 'Welche konkrete Erinnerung zeigt, wann wir als Team besonders gut funktioniert haben?',
        en: 'What specific memory shows a time when we worked especially well as a team?',
      },
      {
        de: 'Welche gemeinsame Erinnerung erzählen wir unterschiedlich – und was ist an beiden Versionen interessant?',
        en: 'Which shared memory do we tell differently, and what is interesting about both versions?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.reflect,
          text: {
            de: 'Sucht nicht nach der richtigen Version. Benennt, was jede Erinnerung für euch bedeutet.',
            en: 'Do not look for the correct version. Name what each memory means to you.',
          },
        },
      },
    ],
  },
  {
    id: 'inbetween',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'DAZWISCHEN', en: 'IN BETWEEN' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Jetzt geht es um die Zeit dazwischen -- ohne dass sie erklärt oder gelöst werden muss.',
      en: "Now it's about the time in between -- without needing it explained or solved.",
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Was hat sich in deinem Leben am stärksten verändert, seit wir uns besonders nah waren?',
        en: 'What has changed most in your life since the time when we were especially close?',
      },
      {
        de: 'Welcher Teil deines heutigen Lebens passt am wenigsten zu dem Bild, das ich früher von dir hatte?',
        en: 'What part of your life today fits least with the picture I used to have of you?',
      },
      {
        de: 'Welche Entscheidung aus der Zeit dazwischen hat die heutige Version von dir besonders geprägt?',
        en: 'What decision from the time in between most shaped who you are today?',
      },
      {
        de: 'Was wünschst du dir, dass ich über die Zeit dazwischen verstehe?',
        en: 'What would you like me to understand about the time in between?',
      },
      {
        de: 'Was hast du in dieser Zeit über dich gelernt, das du früher noch nicht wissen konntest?',
        en: 'What did you learn about yourself during that time that you could not have known before?',
      },
      {
        de: 'Was war an unserer Distanz leichter oder schwerer, als du erwartet hattest?',
        en: 'What about the distance between us was easier or harder than you expected?',
      },
      {
        de: 'Was hat dir geholfen, mit weniger Kontakt auf eine für dich gute Weise umzugehen?',
        en: 'What helped you handle having less contact in a way that worked for you?',
      },
      {
        de: 'Gibt es etwas aus der Zeit dazwischen, das du erzählen möchtest, ohne dass es erklärt oder gelöst werden muss?',
        en: 'Is there something from the time in between you would like to share without needing it to be explained or solved?',
        stayEnabled: true,
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Du musst nichts rechtfertigen oder reparieren. Zeig zuerst, dass du es gehört hast.',
            en: 'You do not need to justify or repair anything. First, show that you heard them.',
          },
        },
      },
      {
        de: 'Welche alte Annahme über die andere Person bist du heute bereit zu überprüfen?',
        en: 'What old assumption about the other person are you ready to reconsider today?',
      },
      {
        de: 'Was fühlt sich zwischen uns noch immer mühelos an?',
        en: 'What still feels effortless between us?',
      },
      {
        de: 'Wie hat sich die Art von Unterstützung verändert, die dir heute wirklich hilft?',
        en: 'How has the kind of support that genuinely helps you changed over time?',
      },
      {
        de: 'Welcher Teil deines heutigen Lebens würde mich vermutlich am meisten überraschen?',
        en: 'What part of your life today would probably surprise me most?',
      },
    ],
  },
  {
    id: 'again',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'WIEDER', en: 'AGAIN' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt fragt, was heute stimmig wäre -- ohne eine Wiederannäherung vorauszusetzen.',
      en: "This act asks what would feel right today -- without assuming a reconnection.",
    },
    questions: [
      {
        de: 'Welche Form von Kontakt würde sich heute für dich stimmig anfühlen – ohne etwas für später festlegen zu müssen?',
        en: 'What kind of contact would feel right to you today without deciding anything about the future?',
      },
      {
        de: 'Welche alte Tradition sollten wir behalten, verändern oder bewusst ruhen lassen?',
        en: 'What old tradition should we keep, adapt, or consciously leave at rest?',
      },
      {
        de: 'Welche Gewohnheit oder Erwartung aus früher darf dort bleiben?',
        en: 'What habit or expectation from the past is allowed to stay there?',
      },
      {
        de: 'Welche gemeinsame Tradition wäre schön wiederzubeleben oder neu zu erfinden?',
        en: 'What shared tradition would be good to revive or reinvent?',
      },
      {
        de: 'Über welches Thema von heute wärst du neugierig, ohne dass daraus ein schwieriges Gespräch werden muss?',
        en: 'What present-day topic are you curious to discuss without it having to become a difficult conversation?',
      },
      {
        de: 'Was brauchst du heute, um dich von mir als die Person gesehen zu fühlen, die du inzwischen bist?',
        en: 'What do you need today to feel seen by me as the person you have become?',
        twist: 'deeper',
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Du musst nichts rechtfertigen oder reparieren. Zeig zuerst, dass du es gehört hast.',
            en: 'You do not need to justify or repair anything. First, show that you heard them.',
          },
        },
      },
      {
        de: 'Gibt es ein Gespräch, für das heute mehr Raum wäre als früher?',
        en: 'Is there a conversation that has more room to happen today than it did before?',
      },
      {
        de: 'Falls wir wieder mehr Kontakt haben: Woran würden wir merken, dass er für uns beide gut ist?',
        en: 'If we have more contact again, what would show us that it is good for both of us?',
      },
      {
        de: 'Welche Grenze oder Erwartung sollten wir klar aussprechen, statt sie aus früher abzuleiten?',
        en: 'What boundary or expectation should we say out loud instead of carrying it over from the past?',
      },
      {
        de: 'Wenn wir eine echte neue Erinnerung schaffen: Welche dürfte es sein?',
        en: 'If we create a genuine new memory together, what would you like it to be?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.followUp,
          text: {
            de: 'Was wäre ein kleiner, realistischer erster Schritt?',
            en: 'What would be one small, realistic first step?',
          },
        },
      },
      {
        de: 'Welche Seite der anderen Person möchtest du heute neu kennenlernen?',
        en: 'What side of the other person would you like to get to know again as they are today?',
      },
      {
        de: 'Welche Eigenschaft schätzt du an der Person vor dir heute – unabhängig von eurer gemeinsamen Geschichte?',
        en: 'What quality do you appreciate in the person in front of you today, apart from your shared history?',
        last: true,
      },
    ],
  },
];

const OLD_FRIENDS_Q37 = {
  neither: {
    de: 'Zwei Fragen sind zwischen damals und heute offen geblieben. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Keine Antwort ist geschuldet.',
    en: 'Two questions have remained open between then and now. If it feels right, ask them one at a time. No answer is owed.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell jetzt die Frage, von der du gehofft hast, dass ${other} sie dir stellt. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask the question you hoped ${other} would ask you. Answering is still optional.`,
  both: {
    de: 'Welche Seite der Person vor dir macht dich heute neugierig – unabhängig davon, wie es weitergeht?',
    en: 'What side of the person in front of you makes you curious today, regardless of what happens next?',
  },
};

const OLD_FRIENDS_MODES = [
  {
    id: 'easy',
    title: { de: 'EASY', en: 'EASY' },
    meta: { de: 'Locker und ehrlich', en: 'Easygoing and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const OLD_FRIENDS_SECRET_AT_INDEX = 27;

// Same every-third-question shape as FRIENDS -- verbatim from the
// catalog's per-question Route column in section 7.
const OLD_FRIENDS_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 18 Minuten',
      en: '12 questions · 3 acts · about 18 minutes',
    },
    actIndices: [
      [0, 3, 6, 9],
      [0, 3, 6, 9],
      [0, 3, 6, 9],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 32 Minuten',
      en: '24 questions · 3 acts · about 32 minutes',
    },
    actIndices: [
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
      [0, 1, 3, 4, 6, 7, 9, 10],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 60 Minuten',
      en: '36 questions · 3 acts · about 60 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Nostalgic and warm -- sepia/tan, muted taupe, soft sage.
const OLD_FRIENDS_ACT_STYLE = [
  { accent: '#C99B5F', chrome: 1, progress: 'full', glow: 0.24 },
  { accent: '#8C7A6B', chrome: 0.5, progress: 'count', glow: 0.13 },
  { accent: '#5B8C7B', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/* ======================================================================
 * DEEP (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 8.
 * Deliberately no Quick route ("keine Quick-Route" in the catalog) -- the
 * pack is meant for a genuinely intensive conversation, not a fast
 * on-ramp. Unlike FRIENDS/OLD FRIENDS/COUPLES/CHAOS, Standard here DOES
 * include Q36 (`last: true`), so no route-vs-closer mismatch applies.
 *
 * Response Cards (not yet a CloserGame.js feature): after Q01/Q21
 * CELEBRATE; after Q13 FOLLOW UP; after Q17/Q19/Q24 VALIDATE; after Q34
 * REFLECT (see catalog section 8 for exact wording).
 * ====================================================================== */

const DEEP_ACTS = [
  {
    id: 'beneath',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'DARUNTER', en: 'BENEATH' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Ein bewusst intensives Gespräch -- Tiefe heißt hier nicht Trauma.',
      en: "A deliberately intensive conversation -- depth here doesn't mean trauma.",
    },
    breakText: {
      de: 'Ihr wisst jetzt ein paar Dinge übereinander, die ihr vor diesem Akt noch nicht wusstet.',
      en: "You now know a few things about each other you didn't before this act.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        de: 'Auf welchen konkreten Moment aus der letzten Zeit bist du still stolz – und warum?',
        en: 'What specific recent moment are you quietly proud of, and why?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.celebrate,
          text: {
            de: 'Würdige kurz, was dieser Moment die Person gekostet oder ihr bedeutet hat.',
            en: 'Take a moment to honor what that moment cost the person or meant to them.',
          },
        },
      },
      {
        de: 'Welche Seite von dir wird selten gesehen, obwohl sie eigentlich kein Geheimnis ist?',
        en: 'What side of you is rarely seen even though it is not really a secret?',
      },
      {
        de: 'Welche konkrete Erfahrung kommt deinem Gefühl von Zuhause am nächsten?',
        en: 'What specific experience comes closest to your feeling of home?',
      },
      {
        de: 'Welche Wahrheit über dich selbst hast du erst spät verstanden?',
        en: 'What truth about yourself did you only come to understand later in life?',
      },
      {
        de: 'Welche Rolle spielst du oft, wenn du unsicher bist?',
        en: 'What role do you tend to play when you feel uncertain?',
      },
      {
        de: 'In welchem Umfeld fühlst du dich deiner eigenen Art zu sein am nächsten?',
        en: 'In what setting do you feel most like yourself?',
      },
      {
        de: 'Welche Emotion kannst du leicht zeigen, und welche hältst du eher zurück?',
        en: 'Which emotion can you show easily, and which one do you tend to hold back?',
      },
      {
        de: 'Welche Überzeugung über dich hast du hinter dir gelassen?',
        en: 'What belief about yourself have you left behind?',
      },
      {
        de: 'Wo erlebst du Zugehörigkeit, ohne etwas leisten oder darstellen zu müssen?',
        en: 'Where do you experience belonging without having to achieve or perform anything?',
      },
      {
        de: 'Welchen Wert aus deiner Herkunft oder Prägung hast du bewusst behalten?',
        en: 'What value from your background or upbringing have you consciously kept?',
      },
      {
        de: 'Was schützt du manchmal mit Humor oder Schweigen?',
        en: 'What do you sometimes protect with humor or silence?',
      },
      {
        de: 'Welche Hoffnung beeinflusst gerade mehr deiner Entscheidungen, als andere vermutlich merken?',
        en: 'What hope is shaping more of your decisions right now than other people probably realize?',
        twist: 'deeper',
      },
    ],
  },
  {
    id: 'truth',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'WAHRHEIT', en: 'TRUTH' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Verstandenwerden statt Lösungen -- keine Diagnose, keine Bewertung.',
      en: 'Being understood, not solved -- no diagnosis, no judgment.',
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Wann hast du dich zuletzt wirklich verstanden gefühlt – und was hat die andere Person konkret getan?',
        en: 'When did you last feel truly understood, and what did the other person specifically do?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.followUp,
          text: {
            de: 'Frag, welches konkrete Verhalten den Unterschied gemacht hat.',
            en: 'Ask what specific behavior made the difference.',
          },
        },
      },
      {
        de: 'Welches Bedürfnis fällt dir schwer auszusprechen?',
        en: 'What need do you find difficult to express?',
      },
      {
        de: 'Welches ehrliche Kompliment kannst du nur schwer annehmen – und warum?',
        en: 'What sincere compliment do you find hard to accept, and why?',
      },
      {
        de: 'Was wird an dir von nahestehenden Menschen häufig missverstanden?',
        en: 'What do people close to you often misunderstand about you?',
      },
      {
        de: 'Welche Veränderung oder welcher Verlust hat dich stark geprägt?',
        en: 'What change or loss has had a powerful influence on who you are?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.',
            en: 'No solution and no judgment. First, show that you heard them.',
          },
        },
      },
      {
        de: 'Welche schwierige Emotion kannst du besser aushalten, wenn jemand auf eine bestimmte Weise bei dir bleibt?',
        en: 'What difficult emotion becomes easier to sit with when someone stays with you in a particular way?',
      },
      {
        de: 'Wofür lernst du gerade, dir selbst zu vergeben?',
        en: 'What are you learning to forgive yourself for?',
        stayEnabled: true,
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.',
            en: 'No solution and no judgment. First, show that you heard them.',
          },
        },
      },
      {
        de: 'Bei welchem Thema wünschst du dir, dass Menschen erst zuhören, bevor sie nach einer Lösung suchen?',
        en: 'On what topic do you wish people would listen before looking for a solution?',
      },
      {
        de: 'Welche schwierige Entscheidung macht dich heute stolz auf dich?',
        en: 'What difficult decision makes you proud of yourself today?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.celebrate,
          text: {
            de: 'Würdige kurz, was dieser Moment die Person gekostet oder ihr bedeutet hat.',
            en: 'Take a moment to honor what that moment cost the person or meant to them.',
          },
        },
      },
      {
        de: 'Zwischen welchen zwei wichtigen Werten entsteht in deinem Leben manchmal Spannung?',
        en: 'Which two important values sometimes come into tension in your life?',
      },
      {
        de: 'Welche Frage über dein Leben beschäftigt dich gerade, ohne eine schnelle Antwort zu brauchen?',
        en: 'What question about your life is on your mind right now without needing a quick answer?',
      },
      {
        de: 'Was bedeutet Unterstützung für dich, wenn es keine Lösung gibt?',
        en: 'What does support mean to you when there is no solution?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.validate,
          text: {
            de: 'Keine Lösung und keine Bewertung. Zeig zuerst, dass du es gehört hast.',
            en: 'No solution and no judgment. First, show that you heard them.',
          },
        },
      },
    ],
  },
  {
    id: 'carryforward',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'MITNEHMEN', en: 'CARRY FORWARD' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Dieser Akt fragt, was ihr aus diesem Gespräch mitnehmt -- ohne therapeutische Wirkung zu behaupten.',
      en: "This act asks what you'll carry forward from this conversation -- without claiming any therapeutic effect.",
    },
    questions: [
      {
        de: 'Welche Wahrheit möchtest du in deinem Leben konsequenter leben?',
        en: 'What truth would you like to live by more consistently?',
      },
      {
        de: 'Welche Hoffnung möchtest du schützen, auch wenn du ihren Ausgang nicht kontrollieren kannst?',
        en: 'What hope would you like to protect even though you cannot control how it turns out?',
      },
      {
        de: 'Wovon soll dein nächstes Lebenskapitel mehr enthalten?',
        en: 'What would you like more of in the next chapter of your life?',
      },
      {
        de: 'Woran sollen sich Menschen erinnern, wenn sie an dich denken?',
        en: 'What would you like people to remember when they think of you?',
      },
      {
        de: 'Über welchen Teil deines Lebens würdest du gern öfter sprechen, wenn jemand wirklich neugierig zuhört?',
        en: 'What part of your life would you like to talk about more often if someone listened with genuine curiosity?',
      },
      {
        de: 'Was bedeutet Erfolg für dich, wenn niemand anderes ihn bewertet?',
        en: 'What does success mean to you when nobody else is judging it?',
      },
      {
        de: 'Was möchtest du über dich aussprechen dürfen, ohne dass jemand es sofort lösen oder einordnen muss?',
        en: 'What would you like to be able to say about yourself without anyone immediately trying to solve or categorize it?',
        stayEnabled: true,
      },
      {
        de: 'Womit könntest du heute beginnen, wofür dir dein zukünftiges Ich einmal dankbar wäre?',
        en: 'What could you start today that your future self might thank you for?',
      },
      {
        de: 'Welchen Teil deiner Identität möchtest du in Zukunft bewusster nähren?',
        en: 'What part of your identity would you like to nurture more intentionally in the future?',
      },
      {
        de: 'Wie kann die andere Person nach diesem Gespräch gut für dich da sein – durch Zuhören, Nachfragen, Ruhe oder etwas anderes?',
        en: 'After this conversation, how can the other person best be there for you: by listening, asking questions, giving you space, or something else?',
        responseCard: {
          label: RESPONSE_CARD_LABEL.reflect,
          text: {
            de: 'Sag in einem Satz, was du künftig beachten möchtest.',
            en: 'In one sentence, say what you would like to keep in mind from now on.',
          },
        },
      },
      {
        de: 'Welchen Satz oder Gedanken möchtest du aus diesem Gespräch mitnehmen?',
        en: 'What sentence or thought would you like to carry with you from this conversation?',
      },
      {
        de: 'Was möchtest du dir selbst nach diesem Gespräch mit etwas mehr Freundlichkeit zugestehen?',
        en: 'After this conversation, what would you like to allow yourself with a little more kindness?',
        last: true,
      },
    ],
  },
];

const DEEP_Q37 = {
  neither: {
    de: 'Zwei Fragen sind unter der Oberfläche geblieben. Wenn es sich für euch gut anfühlt, stellt sie jetzt nacheinander. Jede Frage und jede Antwort bleibt freiwillig.',
    en: 'Two questions have remained beneath the surface. If it feels right, ask them one at a time now. Every question and every answer remains optional.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `${who}, wenn es sich für dich gut anfühlt: Stell jetzt die Frage, von der du gehofft hast, dass ${other} sie dir stellt. Eine Antwort bleibt freiwillig.`
      : `${who}, if it feels right, ask the question you hoped ${other} would ask you. Answering is still optional.`,
  both: {
    de: 'Wann hast du dich in diesem Gespräch am meisten verstanden gefühlt – und wodurch?',
    en: 'When did you feel most understood during this conversation, and what made you feel that way?',
  },
};

const DEEP_MODES = [
  {
    id: 'still',
    title: { de: 'STILL', en: 'STILL' },
    meta: { de: 'Ruhig und ehrlich', en: 'Calm and honest' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_AND_STAY,
  },
];

const DEEP_SECRET_AT_INDEX = 27;

// No Quick route by design (see block comment above). Standard = S/F
// column entries verbatim from the catalog's section 8.
const DEEP_ROUTES = {
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 38 Minuten',
      en: '24 questions · 3 acts · about 38 minutes',
    },
    actIndices: [
      [0, 1, 3, 4, 7, 8, 10, 11],
      [0, 1, 3, 4, 7, 8, 9, 11],
      [0, 1, 3, 4, 6, 7, 9, 11],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 75 Minuten',
      en: '36 questions · 3 acts · about 75 minutes',
    },
    actIndices: [null, null, null],
  },
};

// Introspective jewel tones -- deep indigo, deep violet, near-navy grey.
const DEEP_ACT_STYLE = [
  { accent: '#4A5EAA', chrome: 1, progress: 'full', glow: 0.24 },
  { accent: '#7B4B94', chrome: 0.5, progress: 'count', glow: 0.13 },
  { accent: '#2E3A59', chrome: 0.22, progress: 'number', glow: 0.05 },
];

/* ======================================================================
 * CHAOS (iteration 8 catalog rollout) -- content transcribed verbatim
 * from docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 9.
 * Front-loaded route shape (Quick = first 4 of each act, mostly; Standard
 * = first 8), unlike FRIENDS/OLD FRIENDS' every-third pattern -- see the
 * per-question Route column in the catalog. Quick/Standard end on Q31/
 * Q32, Q36 is Full-only -- see the relaxed "ends on last:true" test.
 *
 * Q37 here is RaDi's own longer-form prose (the catalog gives full
 * paragraphs rather than short templates, deliberately restating
 * skippability/end-anywhere inline) -- transcribed verbatim rather than
 * shortened to match other packs' terser style.
 * ====================================================================== */

const CHAOS_ACTS = [
  {
    id: 'weird',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'SELTSAM', en: 'WEIRD' },
    subtitle: { de: '12 Fragen · etwa 10 Minuten', en: '12 questions · about 10 minutes' },
    intro: {
      de: 'Gemeinsames Erfinden und Lachen -- niemand wird bloßgestellt.',
      en: "Inventing things together and laughing -- nobody gets put on the spot.",
    },
    breakText: {
      de: 'Das war herrlich unnötig.',
      en: 'That was gloriously unnecessary.',
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Lacht.',
      en: 'Take a sip. Laugh.',
    },
    questions: [
      {
        de: 'Ihr eröffnet gemeinsam ein völlig unnötiges Museum. Was stellt es aus?',
        en: 'You’re opening a completely unnecessary museum together. What does it display?',
      },
      {
        de: 'Welche völlig unwichtige Meinung würdest du bis zum Äußersten verteidigen?',
        en: 'What utterly unimportant opinion would you defend forever?',
      },
      {
        de: 'Mit welcher fiktiven Figur würdest du für 24 Stunden das Leben tauschen – und was würdest du zuerst tun?',
        en: 'Which fictional character would you swap lives with for 24 hours—and what would you do first?',
      },
      {
        de: 'Welche winzige, seltsame Sache macht deinen Alltag unverhältnismäßig besser?',
        en: 'What tiny, oddly specific thing makes your everyday life disproportionately better?',
      },
      {
        de: 'Welcher Song sollte laufen, wenn du völlig übertrieben einen Raum betrittst?',
        en: 'What song should play when you make an outrageously dramatic entrance?',
      },
      {
        de: 'Welche scheinbar nutzlose Superkraft hättest du gern – und wie würdest du sie doch sinnvoll einsetzen?',
        en: 'What seemingly useless superpower would you want—and how would you put it to surprisingly good use?',
      },
      {
        de: 'Erfindet gemeinsam eine harmlose Verschwörungstheorie darüber, warum einzelne Socken verschwinden.',
        en: 'Invent a harmless conspiracy theory together about why single socks disappear.',
      },
      {
        de: 'Erfindet einen Feiertag für etwas völlig Alltägliches. Was wird gefeiert und wie?',
        en: 'Invent a holiday for something completely ordinary. What does it celebrate, and how?',
      },
      {
        de: 'Welches Tier sollte die Menschheit bei einem Treffen mit Außerirdischen vertreten – und was wäre sein erster Satz?',
        en: 'Which animal should represent humanity at a meeting with aliens—and what would its opening line be?',
      },
      {
        de: 'Ihr eröffnet ein Restaurant mit einer völlig absurden Regel. Wie lautet sie, und warum kommen die Leute trotzdem?',
        en: 'You’re opening a restaurant with one completely absurd rule. What is it, and why do people still come?',
      },
      {
        de: 'Welcher Alltagsgegenstand verdient ein dramatisches Biopic – und wie heißt der Film?',
        en: 'Which everyday object deserves a dramatic biopic—and what is the film called?',
      },
      {
        de: 'Welche absurd spezifische Auszeichnung würdest du dir selbst verleihen?',
        en: 'What absurdly specific award would you give yourself?',
      },
    ],
  },
  {
    id: 'bold',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'MUTIG', en: 'BOLD' },
    subtitle: { de: '12 Fragen · etwa 10 Minuten', en: '12 questions · about 10 minutes' },
    intro: {
      de: 'Kleine, machbare Risiken -- keine Mutproben, niemand wird bloßgestellt.',
      en: "Small, doable risks -- no dares, no one gets embarrassed.",
    },
    breakText: {
      de: 'Ein bisschen Chaos hat euch gutgetan.',
      en: 'A little chaos has been good for you.',
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Welche chaotische Entscheidung war im Nachhinein genau richtig?',
        en: 'What chaotic decision turned out to be exactly right?',
      },
      {
        de: 'Welche Regel des Erwachsenseins würdest du sofort abschaffen?',
        en: 'What rule of adulthood would you abolish immediately?',
      },
      {
        de: 'Welches kleine, überschaubare Risiko möchtest du demnächst eingehen?',
        en: 'What small, manageable risk would you like to take soon?',
      },
      {
        de: 'Erfindet gemeinsam das absurdeste Unternehmen, das überraschend funktionieren könnte.',
        en: 'Invent the most absurd business together that might actually work.',
      },
      {
        de: 'Welche harmlose Fähigkeit von dir verdient viel mehr Fanfare, als sie normalerweise bekommt?',
        en: 'What harmless skill of yours deserves far more fanfare than it usually gets?',
      },
      {
        de: 'Ihr habt spontan drei freie Stunden und dürft nichts vorbereiten. Welches Mini-Abenteuer beginnt jetzt?',
        en: 'You suddenly have three free hours and cannot prepare anything. What mini-adventure starts now?',
      },
      {
        de: 'Welche gesellschaftliche Konvention würdest du gern einen Tag lang ignorieren, wenn niemand dadurch zu Schaden käme?',
        en: 'What social convention would you like to ignore for one day if no one could be harmed by it?',
      },
      {
        de: 'Welche verspielte Seite von dir kommt erst zum Vorschein, wenn du dich wohlfühlst?',
        en: 'What playful side of you only appears when you feel comfortable?',
      },
      {
        de: 'Wie müsste dich jemand einladen, damit du bei einer herrlich albernen Idee sofort mitmachst?',
        en: 'How would someone have to invite you for you to join a delightfully silly idea straight away?',
      },
      {
        de: 'Welches unerwartete Kompliment hat dich gleichzeitig zum Lachen gebracht und wirklich erreicht?',
        en: 'What unexpected compliment both made you laugh and genuinely landed with you?',
      },
      {
        de: 'Welchen harmlosen Plot-Twist würdest du dir für den nächsten Monat wünschen?',
        en: 'What harmless plot twist would you like the next month to bring?',
      },
      {
        de: 'Plant ein tatsächlich machbares Mini-Abenteuer für höchstens zehn Euro – ohne Mutprobe und ohne jemanden bloßzustellen.',
        en: 'Plan a genuinely doable mini-adventure for no more than ten euros—with no dares and no embarrassing anyone.',
      },
    ],
  },
  {
    id: 'surprisinglyreal',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'ÜBERRASCHEND ECHT', en: 'SURPRISINGLY REAL' },
    subtitle: { de: '12 Fragen · etwa 10 Minuten', en: '12 questions · about 10 minutes' },
    intro: {
      de: 'Ein bisschen echte Tiefe, ohne den Spaß zu verlieren.',
      en: "A little genuine depth, without losing the fun.",
    },
    questions: [
      {
        de: 'Wofür wünschst du dir gerade mehr Erlaubnis von dir selbst?',
        en: 'What do you wish you gave yourself more permission to do right now?',
      },
      {
        de: 'Welche kurze Sprachnachricht würdest du deinem Ich in fünf Jahren schicken?',
        en: 'What short voice message would you send to yourself five years from now?',
      },
      {
        de: 'Was würdest du ausprobieren, wenn Peinlichkeit für einen Tag nicht existieren würde?',
        en: 'What would you try if embarrassment did not exist for one day?',
      },
      {
        de: 'Welcher gemeinsame Plan ist so albern, dass er vielleicht großartig wäre?',
        en: 'What could you do together that sounds so silly it might be brilliant?',
      },
      {
        de: 'Welche Begeisterung von dir wird oft unterschätzt oder missverstanden?',
        en: 'What enthusiasm of yours is often underestimated or misunderstood?',
      },
      {
        de: 'Welche Form von Spiel oder Albernheit hilft dir, wieder bei dir anzukommen?',
        en: 'What kind of play or silliness helps you feel like yourself again?',
      },
      {
        de: 'Wann hat gemeinsames Lachen dir zuletzt das Gefühl gegeben, jemandem wirklich nah zu sein?',
        en: 'When did laughing with someone last make you feel genuinely close to them?',
      },
      {
        de: 'Welche Seite von dir dürfte im Alltag mehr Raum bekommen?',
        en: 'What side of you deserves more room in your everyday life?',
      },
      {
        de: 'Wie zeigst du durch Humor, dass dir ein Mensch wichtig ist?',
        en: 'How do you use humour to show someone that they matter to you?',
      },
      {
        de: 'Welche Antwort aus diesem Gespräch würdest du gern noch genauer hören?',
        en: 'Which answer from this conversation would you like to hear more about?',
        twist: 'deeper',
      },
      {
        de: 'Woran würdest du dich von diesem Gespräch gern erinnern?',
        en: 'What would you like to remember about this conversation?',
      },
      {
        de: 'Erfindet ein kleines Ritual, mit dem ihr euch eure Neugier aufeinander bewahren könnt.',
        en: 'Invent a small ritual that could help you stay curious about each other.',
        last: true,
      },
    ],
  },
];

const CHAOS_Q37 = {
  neither: {
    de: 'Zwei erhoffte Fragen warten noch. Wenn es sich für euch beide gut anfühlt, stellt sie nacheinander. Jede Frage und jede Antwort darf ohne Begründung übersprungen werden – und ihr könnt jederzeit hier enden.',
    en: 'Two hoped-for questions are still waiting. If continuing feels good to both of you, ask them one at a time. Either question or answer may be skipped without explanation—and you can end here at any time.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `Eine erhoffte Frage wartet noch. Wenn es sich für euch beide weiterhin gut anfühlt, darf ${who} sie jetzt stellen. ${other} darf sie ohne Begründung überspringen. Ihr könnt auch einfach hier enden.`
      : `One hoped-for question is still waiting. If continuing still feels good to both of you, ${who} may ask it now. ${other} may skip it without giving a reason. You can also simply end here.`,
  both: {
    de: 'Ihr könnt hier enden – oder gemeinsam eine freiwillige Bonusfrage nehmen: Welche Regel sollte euer nächstes absurd gutes Abenteuer haben?',
    en: 'You can end here—or take one optional bonus question together: What rule should your next absurdly good adventure have?',
  },
};

const CHAOS_MODES = [
  {
    id: 'playful',
    title: { de: 'PLAYFUL', en: 'PLAYFUL' },
    meta: { de: 'Leicht und albern', en: 'Light and silly' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: DEEPER_ONLY,
  },
];

const CHAOS_SECRET_AT_INDEX = 27;

// Front-loaded per act (Quick = mostly the first 4, Standard = the first
// 8) -- verbatim from the catalog's per-question Route column in
// section 9. Act III's Quick selection is [Q25,Q26,Q28,Q31], not simply
// the first four, matching the catalog exactly.
const CHAOS_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Ein Ausschnitt', en: 'A taste of it' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 10 Minuten',
      en: '12 questions · 3 acts · about 10 minutes',
    },
    actIndices: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 3, 6],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 21 Minuten',
      en: '24 questions · 3 acts · about 21 minutes',
    },
    actIndices: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 35 Minuten',
      en: '36 questions · 3 acts · about 35 minutes',
    },
    actIndices: [null, null, null],
  },
};

// High-energy and playful -- coral red, turquoise, bright yellow.
const CHAOS_ACT_STYLE = [
  { accent: '#FF6B6B', chrome: 1, progress: 'full', glow: 0.3 },
  { accent: '#4ECDC4', chrome: 0.5, progress: 'count', glow: 0.16 },
  { accent: '#FFD93D', chrome: 0.22, progress: 'number', glow: 0.06 },
];

/* ======================================================================
 * LATE NIGHT (18+) -- content transcribed verbatim from
 * docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md section 10, for a
 * future session to wire up. Every other iteration-8 pack above is
 * registered in PACKS below; this one deliberately ISN'T, and
 * LATE_NIGHT_PACK is not exported. Two things the catalog itself
 * requires are still missing:
 *
 *   1. A technical consent-gate UI this pack specifically needs and no
 *      other pack does: a pre-pack 18+ + voluntary-participation notice
 *      each person confirms SEPARATELY before any question is visible,
 *      and a SECOND, renewed opt-in before Act II specifically (before
 *      touch/fantasy/kink questions appear) -- see the catalog's
 *      "Verbindlicher Hinweis vor dem Pack" and "Erneuter Opt-in vor Akt
 *      II" sections. CloserGame.js has no generic per-pack gating
 *      mechanism today; every other pack only needs the ordinary style/
 *      route selection already built.
 *   2. The catalog's own explicit sign-off is conditional, not granted:
 *      "Vor öffentlicher Freigabe bleibt eine gesonderte österreichische
 *      Jugend-, Medien- und Datenschutzprüfung erforderlich; dieser
 *      Fragenkatalog ist keine rechtliche Freigabe." (A separate Austrian
 *      youth-protection/media/data-protection review is still required
 *      before public release; this catalog is not itself a legal
 *      clearance.) That review is RaDi's to commission, not something
 *      this session can satisfy.
 *
 * The holistic review's own recommended rollout order put LATE NIGHT
 * explicitly last, "nur mit 18+-/Consent-Abnahme aktivieren" (activate
 * only with the 18+/consent gate) -- keeping this pack's data present
 * but unregistered follows that instruction directly: nothing here is
 * reachable in the running app (getPack()'s fallback to `classic` means
 * an unregistered packId is simply treated as an unrecognised one, same
 * as a typo) until both gaps above are actually closed and the pack is
 * deliberately added to PACKS.
 *
 * Also disables `both` for anything touching boundaries/consent/safer
 * sex/fantasies/physical needs, per the catalog's own "Redaktionelle
 * Spielregeln" -- moot today since no question carries any twist yet
 * (same stance as every other iteration-8 pack), but noted here for
 * whoever builds the gate and revisits twists for this pack.
 * ====================================================================== */

const LATE_NIGHT_CONSENT_NOTICE = {
  de: 'Nur für Erwachsene ab 18 Jahren. Beide Personen nehmen freiwillig teil und können jede Frage überspringen oder das Spiel jederzeit beenden. Eine Antwort beschreibt nur Gedanken, Gefühle oder Vorlieben. Sie ist niemals Zustimmung zu einer Handlung. Zustimmung muss außerhalb des Spiels konkret, freiwillig, informiert und jederzeit widerrufbar eingeholt werden.',
  en: 'For adults aged 18 and over only. Both people are taking part voluntarily and may skip any question or end the game at any time. An answer only describes thoughts, feelings or preferences. It is never consent to an action. Consent must be sought outside the game and must be specific, voluntary, informed and withdrawable at any time.',
};

const LATE_NIGHT_ACT_II_OPT_IN = {
  de: 'Ich möchte freiwillig mit expliziteren Gesprächsfragen fortfahren. Ich kann jede Frage überspringen oder hier beenden.',
  en: 'I freely choose to continue with more explicit conversation prompts. I may skip any question or end here.',
};

const LATE_NIGHT_ACTS = [
  {
    id: 'atmosphere',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'ATMOSPHÄRE', en: 'ATMOSPHERE' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Worte, Stimmung und Aufmerksamkeit -- noch nichts Explizites.',
      en: "Words, mood and attention -- nothing explicit yet.",
    },
    breakText: {
      de: 'Ihr habt gerade ehrlich über Anziehung gesprochen.',
      en: "You've just talked honestly about attraction.",
    },
    breakSub: {
      de: 'Trinkt einen Schluck. Atmet.',
      en: 'Take a sip. Breathe.',
    },
    questions: [
      {
        de: 'Woran merkst du, dass ein Gespräch für dich flirtend oder erotisch wird?',
        en: 'What tells you that a conversation is becoming flirtatious or erotic for you?',
      },
      {
        de: 'Welche Art von Blick, Stimme, Worten oder Bewegung kann auf dich besonders anziehend wirken?',
        en: 'What kind of gaze, voice, words or movement can feel especially attractive to you?',
      },
      {
        de: 'Welche Umgebung hilft dir, dich offen für erotische Stimmung zu fühlen?',
        en: 'What kind of setting helps you feel open to an erotic mood?',
      },
      {
        de: 'Wie zeigst du Interesse an mehr Nähe, ohne vorauszusetzen, dass die andere Person dasselbe möchte?',
        en: 'How do you show interest in more intimacy without assuming the other person wants the same thing?',
      },
      {
        de: 'Welche Art von erotischem Kompliment fühlt sich für dich gut an – und welche eher nicht?',
        en: 'What kind of erotic compliment feels good to you—and what kind tends not to?',
      },
      {
        de: 'Welches Tempo fühlt sich beim Flirten oder beim Aufbau von Intimität für dich angenehm an?',
        en: 'What pace feels comfortable to you when flirting or building intimacy?',
      },
      {
        de: 'Was hilft dir, dich sicher genug für ein ausdrücklich sexuelles Gespräch zu fühlen?',
        en: 'What helps you feel safe enough to begin an explicitly sexual conversation?',
      },
      {
        de: 'Welche Stimmung passt bei erotischen Gesprächen zu dir: verspielt, direkt, zärtlich, ernst – oder etwas anderes?',
        en: 'What tone suits you in erotic conversations: playful, direct, tender, serious—or something else?',
      },
      {
        de: 'Welche nichtsexuelle Form von Nähe kann bei dir Lust wecken – falls es eine gibt?',
        en: 'What non-sexual form of closeness can awaken desire in you, if any?',
      },
      {
        de: 'Wie soll jemand prüfen, ob Flirten für dich gerade willkommen ist?',
        en: 'How would you like someone to check whether flirting is welcome for you in that moment?',
      },
      {
        de: 'Wodurch kannst du dich begehrt fühlen, ohne dich unter Druck gesetzt zu fühlen?',
        en: 'What can make you feel desired without making you feel pressured?',
      },
      {
        de: 'Was hilft dir, während wachsender Intimität präsent und mit dir selbst verbunden zu bleiben?',
        en: 'What helps you stay present and connected to yourself as intimacy builds?',
      },
    ],
  },
  {
    id: 'desire',
    numeral: { de: 'AKT II', en: 'ACT II' },
    title: { de: 'WUNSCH', en: 'DESIRE' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    // Requires the renewed opt-in above (LATE_NIGHT_ACT_II_OPT_IN) before
    // this act's questions appear -- not yet enforced anywhere, since the
    // gate itself doesn't exist yet (see the block comment above).
    intro: {
      de: 'Explizitere Fragen zu Wünschen und Fantasien. Ihr entscheidet erneut, ob ihr weitermacht.',
      en: "More explicit questions about desire and fantasy. You choose again whether to continue.",
    },
    breakText: {
      de: 'Kein Tempo ist hier falsch.',
      en: "There's no wrong pace here.",
    },
    breakSub: {
      de: 'Macht weiter, wenn ihr so weit seid.',
      en: "Continue when you're ready.",
    },
    questions: [
      {
        de: 'Welche Art erotischer Berührung könnte sich für dich gut anfühlen – wenn überhaupt und nur wenn du sie ausdrücklich möchtest?',
        en: 'What kind of erotic touch might feel good to you—if any, and only when you explicitly want it?',
      },
      {
        de: 'Wie möchtest du, dass sexuelle Nähe initiiert wird?',
        en: 'How do you like sexual intimacy to be initiated?',
      },
      {
        de: 'Welche Worte oder Laute könnten sich in einer sexuellen Situation für dich gut anfühlen – und welche eher nicht?',
        en: 'What words or sounds might feel good to you in a sexual situation—and which might not?',
      },
      {
        de: 'Welche Fantasie kannst du teilen, ohne dass daraus eine Erwartung für heute oder später entstehen soll?',
        en: 'What fantasy could you share without it creating any expectation for today or later?',
      },
      {
        de: 'Welche Rolle spielen Vorfreude oder spielerisches Hinauszögern für deine Lust?',
        en: 'What role do anticipation or playful delay play in your desire?',
      },
      {
        de: 'Welche Rolle spielen Spielzeuge, erotische Medien oder andere Hilfsmittel in deiner Sexualität – wenn überhaupt?',
        en: 'What role do toys, erotic media or other aids play in your sexuality, if any?',
      },
      {
        de: 'Was kann Sex für dich erfüllend machen, auch unabhängig von einem Orgasmus?',
        en: 'What can make sex fulfilling for you, independently of orgasm?',
      },
      {
        de: 'Gibt es eine erotische Idee oder einen Kink, über den du neugierig sprechen möchtest, ohne heute etwas darüber entscheiden zu müssen?',
        en: 'Is there an erotic idea or kink you are curious to talk about without having to decide anything about it today?',
      },
      {
        de: 'Wie würdest du dich damit fühlen, in einer sexuellen Situation konkrete Wünsche oder Hinweise zu geben oder zu bekommen?',
        en: 'How might you feel about giving or receiving specific requests or guidance in a sexual situation?',
      },
      {
        de: 'Wodurch baut sich Lust für dich eher auf: Tempo, Wiederholung, Abwechslung, Pausen – oder etwas anderes?',
        en: 'What tends to build pleasure for you: pace, repetition, variety, pauses—or something else?',
      },
      {
        de: 'Wie zeigst du gern, dass sich etwas besonders gut anfühlt?',
        en: 'How do you like to show that something feels especially good?',
      },
      {
        de: 'Was würde es dir leichter machen, darüber zu sprechen, was du in einer sexuellen Situation häufiger, seltener oder anders erleben möchtest – falls das für dich relevant ist?',
        en: 'What would make it easier to talk about something you might want more often, less often or differently in a sexual situation, if that is relevant to you?',
      },
    ],
  },
  {
    id: 'trust',
    numeral: { de: 'AKT III', en: 'ACT III' },
    title: { de: 'VERTRAUEN', en: 'TRUST' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Zustimmung, Grenzen, Safer Sex und Aftercare -- konkret, nie als Handlungsaufforderung.',
      en: "Consent, boundaries, safer sex and aftercare -- concretely, never as a call to action.",
    },
    questions: [
      {
        de: 'Woran merkst du in dir selbst ein klares Ja, ein Vielleicht oder ein Nein?',
        en: 'How do you recognise a clear yes, maybe or no within yourself?',
      },
      {
        de: 'Mit welchen Worten oder Zeichen möchtest du Zustimmung, Pause und Stopp ausdrücken?',
        en: 'What words or signals do you want to use to express consent, pause and stop?',
      },
      {
        de: 'Wie soll die andere Person nachfragen, wenn dein Signal nicht eindeutig ist?',
        en: 'How would you like the other person to check in when your signal is unclear?',
      },
      {
        de: 'Was brauchst du nach einem intensiven intimen Moment: Nähe, Abstand, Berührung, Ruhe oder etwas anderes?',
        en: 'What do you need after an intense intimate moment: closeness, space, touch, quiet or something else?',
      },
      {
        de: 'Was hilft dir, ein Nein oder einen Sinneswandel leicht auszusprechen und gut angenommen zu wissen?',
        en: 'What helps you voice a no or a change of mind easily and trust that it will be received well?',
      },
      {
        de: 'Welche Grenze, Verhütung oder Schutzmaßnahme darf niemals bloß angenommen werden?',
        en: 'What boundary, contraception or protection measure must never simply be assumed?',
      },
      {
        de: 'Welche Gespräche über Tests, Barrieren, Verhütung oder andere Schutzmaßnahmen brauchst du, bevor sich sexuelle Nähe sicher genug anfühlt?',
        en: 'What conversations about testing, barriers, contraception or other protection do you need before sexual intimacy feels safe enough?',
      },
      {
        de: 'Wie möchtest du, dass erneut nach Zustimmung gefragt wird, wenn sich eine sexuelle Aktivität verändert oder intensiviert?',
        en: 'How would you like consent to be checked again when a sexual activity changes or becomes more intense?',
      },
      {
        de: 'Welche Absprachen zu Exklusivität, weiteren Kontakten oder Privatsphäre sind für dich wichtig – falls das für eure Situation relevant ist?',
        en: 'What agreements about exclusivity, other partners or privacy matter to you, if they are relevant to your situation?',
      },
      {
        de: 'Gibt es körperliche Bedürfnisse, Empfindlichkeiten oder Zugänglichkeitsaspekte, über die du vor Intimität sprechen möchtest?',
        en: 'Are there any physical needs, sensitivities or accessibility considerations you would want to discuss before intimacy?',
      },
      {
        de: 'Wie wünschst du dir einen Check-in am nächsten Tag – wenn überhaupt?',
        en: 'How would you like to check in the next day, if at all?',
      },
      {
        de: 'Welche eine Sache soll dein Gegenüber aus diesem Gespräch mitnehmen, ohne daraus eine Erwartung für heute oder später abzuleiten?',
        en: 'What is one thing you want the other person to take from this conversation without turning it into an expectation for today or later?',
        last: true,
      },
    ],
  },
];

const LATE_NIGHT_Q37 = {
  neither: {
    de: 'Zwei erhoffte Fragen warten noch. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, stellt ihr sie nacheinander; vor der zweiten Frage entscheidet ihr erneut. Jede Frage und jede Antwort darf übersprungen werden. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.',
    en: 'Two hoped-for questions are still waiting. You can end here. Only if you both freely want to continue, ask them one at a time and choose again before the second question. Either question or answer may be skipped. An answer is information, never consent to an action.',
  },
  one: (lang, who, other) =>
    lang === 'de'
      ? `Eine erhoffte Frage wartet noch, aber niemand schuldet sie oder eine Antwort darauf. Ihr könnt hier enden. Nur wenn ihr beide frei weitermachen möchtet, darf ${who} die Frage stellen. ${other} kann sie ohne Begründung überspringen. Eine Antwort ist Information, niemals Zustimmung zu einer Handlung.`
      : `One hoped-for question is still waiting, but no one owes the question or an answer to it. You can end here. Only if you both freely want to continue may ${who} ask it. ${other} may skip it without giving a reason. An answer is information, never consent to an action.`,
  both: {
    de: 'Ihr könnt hier enden. Wenn ihr beide noch eine freiwillige letzte Gesprächsfrage möchtet: Was würde zukünftige Gespräche über Sex für dich noch ehrlicher und sicherer machen? Auch diese Frage darf übersprungen werden; aus keiner Antwort entsteht eine Handlungserwartung.',
    en: 'You can end here. If you both want one optional final conversation prompt: What would make future conversations about sex feel even more honest and safe for you? You may skip this question too; no answer creates an expectation of action.',
  },
};

const LATE_NIGHT_MODES = [
  {
    id: 'explicit',
    title: { de: 'EXPLICIT', en: 'EXPLICIT' },
    meta: { de: 'Direkt und respektvoll', en: 'Direct and respectful' },
    blurb: ROUTE_NEUTRAL_BLURB,
    // PREDICT and NO THINKING are fully disabled for this pack per the
    // catalog's own "Redaktionelle Spielregeln"; BOTH is disabled too for
    // anything touching consent/boundaries/safer sex. Moot today since no
    // question carries a twist yet (NO_TWISTS already covers that) --
    // kept as its own note for whoever revisits twists for this pack.
    twists: NO_TWISTS,
  },
];

const LATE_NIGHT_SECRET_AT_INDEX = 27;

// Front-loaded 4/4/4 (Quick) and 8/8/8 (Standard) per act -- the
// catalog's own words: "vier Fragen zu Atmosphäre, vier zu Wünschen und
// vier zu Vertrauen. [...] keine zufällige Auswahl expliziter Fragen."
const LATE_NIGHT_ROUTES = {
  quick: {
    id: 'quick',
    title: { de: 'KURZ', en: 'QUICK' },
    meta: { de: 'Eine sichere Steigerung', en: 'A safe escalation' },
    subtitle: {
      de: '12 Fragen · 3 Akte · etwa 18 Minuten',
      en: '12 questions · 3 acts · about 18 minutes',
    },
    actIndices: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
    ],
  },
  standard: {
    id: 'standard',
    title: { de: 'STANDARD', en: 'STANDARD' },
    meta: { de: 'Kuratierte Auswahl', en: 'Curated selection' },
    subtitle: {
      de: '24 Fragen · 3 Akte · etwa 32 Minuten',
      en: '24 questions · 3 acts · about 32 minutes',
    },
    actIndices: [
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
  },
  full: {
    id: 'full',
    title: { de: 'VOLL', en: 'FULL' },
    meta: { de: 'Alle 36 Fragen', en: 'All 36 questions' },
    subtitle: {
      de: '36 Fragen · 3 Akte · etwa 50 Minuten',
      en: '36 questions · 3 acts · about 50 minutes',
    },
    actIndices: [null, null, null],
  },
};

const LATE_NIGHT_ACT_STYLE = [
  { accent: '#B03A5B', chrome: 1, progress: 'full', glow: 0.26 },
  { accent: '#6B3A6B', chrome: 0.5, progress: 'count', glow: 0.14 },
  { accent: '#3A2E44', chrome: 0.22, progress: 'number', glow: 0.05 },
];

// Deliberately NOT exported and NOT added to PACKS -- see the block
// comment above. A future session builds the consent-gate UI (reading
// LATE_NIGHT_CONSENT_NOTICE and LATE_NIGHT_ACT_II_OPT_IN, both already
// transcribed above), confirms the outstanding legal review is done, and
// only then adds `'late-night': LATE_NIGHT_PACK` to the registry below.
const LATE_NIGHT_PACK = {
  id: 'late-night',
  title: { de: 'LATE NIGHT', en: 'LATE NIGHT' },
  meta: { de: '18+ · Für zwei Erwachsene', en: '18+ · For two adults' },
  blurb: {
    de: 'Ausdrücklich sexuelle Gespräche. Keine Handlung wird verlangt.',
    en: 'Explicitly sexual conversation. No action is ever required.',
  },
  acts: LATE_NIGHT_ACTS,
  modes: LATE_NIGHT_MODES,
  actStyle: LATE_NIGHT_ACT_STYLE,
  q37: LATE_NIGHT_Q37,
  secretAtIndex: LATE_NIGHT_SECRET_AT_INDEX,
  routes: LATE_NIGHT_ROUTES,
  defaultRouteId: 'standard',
};
// A bare `void` read, not a real usage -- keeps the constant from tripping
// no-unused-vars while it waits (deliberately) to be added to PACKS below.
void LATE_NIGHT_PACK;

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
 *
 * `title`/`meta`/`blurb` are what the Pack-Auswahl screen (FR8-03) shows on
 * each pack's own card -- the same three-field shape routes and modes
 * already use. `defaultRouteId` is that screen's preselection for a freshly
 * chosen pack (e.g. CLASSIC still opens on Full, FIRST DATE opens on Quick,
 * per the catalog's own per-pack "Default" line) -- distinct from the
 * global DEFAULT_ROUTE_ID constant below, which is getRoute()'s technical
 * fallback for a routeId that's missing or doesn't exist at all, not a
 * per-pack editorial choice.
 */
export const PACKS = {
  classic: {
    id: 'classic',
    title: { de: 'CLASSIC', en: 'CLASSIC' },
    meta: { de: 'Die 36 Fragen', en: 'The 36 questions' },
    blurb: {
      de: 'Für tiefes Kennenlernen – jede Intensität, jede Beziehung.',
      en: 'For deep connection — any intensity, any relationship.',
    },
    acts: CLASSIC_ACTS,
    modes: CLASSIC_MODES,
    actStyle: CLASSIC_ACT_STYLE,
    q37: CLASSIC_Q37,
    secretAtIndex: CLASSIC_SECRET_AT_INDEX,
    routes: CLASSIC_ROUTES,
    defaultRouteId: 'full',
  },
  'first-date': {
    id: 'first-date',
    title: { de: 'FIRST DATE', en: 'FIRST DATE' },
    meta: { de: 'Für ein erstes Date', en: 'For a first date' },
    blurb: {
      de: 'Neugier und Chemie entdecken – leicht, druckfrei.',
      en: 'Explore curiosity and chemistry — light, no pressure.',
    },
    acts: FIRST_DATE_ACTS,
    modes: FIRST_DATE_MODES,
    actStyle: FIRST_DATE_ACT_STYLE,
    q37: FIRST_DATE_Q37,
    secretAtIndex: FIRST_DATE_SECRET_AT_INDEX,
    routes: FIRST_DATE_ROUTES,
    defaultRouteId: 'quick',
  },
  'date-night': {
    id: 'date-night',
    title: { de: 'DATE NIGHT', en: 'DATE NIGHT' },
    meta: { de: 'Für ein bestehendes Date', en: 'For a date already underway' },
    blurb: {
      de: 'Wärme und Anziehung – prickelnd, nie explizit.',
      en: 'Warmth and attraction — a spark, never explicit.',
    },
    acts: DATE_NIGHT_ACTS,
    modes: DATE_NIGHT_MODES,
    actStyle: DATE_NIGHT_ACT_STYLE,
    q37: DATE_NIGHT_Q37,
    secretAtIndex: DATE_NIGHT_SECRET_AT_INDEX,
    routes: DATE_NIGHT_ROUTES,
    defaultRouteId: 'standard',
  },
  couples: {
    id: 'couples',
    title: { de: 'COUPLES', en: 'COUPLES' },
    meta: { de: 'Für eine bestehende Beziehung', en: 'For an existing relationship' },
    blurb: {
      de: 'Wertschätzung, Reparatur und eine gemeinsame Zukunft. Kein Therapieersatz.',
      en: 'Appreciation, repair and a shared future. Not a substitute for therapy.',
    },
    acts: COUPLES_ACTS,
    modes: COUPLES_MODES,
    actStyle: COUPLES_ACT_STYLE,
    q37: COUPLES_Q37,
    secretAtIndex: COUPLES_SECRET_AT_INDEX,
    routes: COUPLES_ROUTES,
    defaultRouteId: 'quick',
  },
  friends: {
    id: 'friends',
    title: { de: 'FRIENDS', en: 'FRIENDS' },
    meta: { de: 'Für Freundschaft', en: 'For friendship' },
    blurb: {
      de: 'Humor, Wertschätzung und Zukunft – ausdrücklich freundschaftlich.',
      en: 'Humor, appreciation and shared plans — explicitly platonic.',
    },
    acts: FRIENDS_ACTS,
    modes: FRIENDS_MODES,
    actStyle: FRIENDS_ACT_STYLE,
    q37: FRIENDS_Q37,
    secretAtIndex: FRIENDS_SECRET_AT_INDEX,
    routes: FRIENDS_ROUTES,
    defaultRouteId: 'standard',
  },
  'old-friends': {
    id: 'old-friends',
    title: { de: 'OLD FRIENDS', en: 'OLD FRIENDS' },
    meta: { de: 'Für eine alte Freundschaft', en: 'For an old friendship' },
    blurb: {
      de: 'Gemeinsame Geschichte und die Person, die heute vor dir steht.',
      en: 'Shared history and the person standing in front of you today.',
    },
    acts: OLD_FRIENDS_ACTS,
    modes: OLD_FRIENDS_MODES,
    actStyle: OLD_FRIENDS_ACT_STYLE,
    q37: OLD_FRIENDS_Q37,
    secretAtIndex: OLD_FRIENDS_SECRET_AT_INDEX,
    routes: OLD_FRIENDS_ROUTES,
    defaultRouteId: 'standard',
  },
  deep: {
    id: 'deep',
    title: { de: 'DEEP', en: 'DEEP' },
    meta: { de: 'Für ein intensives Gespräch', en: 'For an intensive conversation' },
    blurb: {
      de: 'Identität, Bedeutung und Verstandenwerden. Kein Ersatz für Therapie.',
      en: 'Identity, meaning and being understood. Not a substitute for therapy.',
    },
    acts: DEEP_ACTS,
    modes: DEEP_MODES,
    actStyle: DEEP_ACT_STYLE,
    q37: DEEP_Q37,
    secretAtIndex: DEEP_SECRET_AT_INDEX,
    routes: DEEP_ROUTES,
    defaultRouteId: 'standard',
  },
  chaos: {
    id: 'chaos',
    title: { de: 'CHAOS', en: 'CHAOS' },
    meta: { de: 'Für jede Beziehung', en: 'For any relationship' },
    blurb: {
      de: 'Gemeinsames Erfinden und Lachen. Niemand wird bloßgestellt.',
      en: 'Inventing things together and laughing. Nobody gets put on the spot.',
    },
    acts: CHAOS_ACTS,
    modes: CHAOS_MODES,
    actStyle: CHAOS_ACT_STYLE,
    q37: CHAOS_Q37,
    secretAtIndex: CHAOS_SECRET_AT_INDEX,
    routes: CHAOS_ROUTES,
    defaultRouteId: 'quick',
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
 * FR8-06 (iteration 8 feature requests): once several packs with several
 * routes are all in play, a later content edit (a question reordered,
 * removed, or moved to a different route) must never silently re-sort a
 * game someone already has open in a browser tab. The fix isn't a
 * separate version *number* comparison -- it's cheaper and more direct to
 * just snapshot the actual resolved run, once, when a game truly starts
 * (the same moment BF8-01's hasStarted flips true), and re-derive the
 * same list on every resume to compare against. If they no longer match,
 * the content underneath this save has changed since it was written, and
 * CloserGame.js's loadSaved() rejects the resume outright (the same
 * "reject the whole save rather than guess" precedent BF-12/BF8-01 already
 * established) instead of continuing on content that's shifted under it.
 * CONTENT_VERSION is still stored on the save alongside the resolved IDs,
 * per FR8-06's own spec -- useful metadata for a future migration screen,
 * even though the ID-array comparison is what actually gates resumability
 * today. Bump it only for a content change substantial enough to want to
 * invalidate saves outright (a question's meaning changed, a route was
 * recurated); a copy-only fix (spelling, a genderneutral reword) doesn't
 * need to -- the ID it's attached to hasn't changed.
 */
export const CONTENT_VERSION = 1;

export function runQuestionIdsFor(packId, routeId = DEFAULT_ROUTE_ID) {
  const total = totalQuestions(packId, routeId);
  return Array.from({ length: total }, (_, i) =>
    questionIdFor(packId, originalIndexFor(packId, i, routeId))
  );
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
