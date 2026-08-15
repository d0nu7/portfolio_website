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
 * Fixed schema, deliberately (regression-test iteration 5, P1.1/P1.3):
 * every pack MUST have exactly ACTS_PER_PACK acts of QUESTIONS_PER_ACT
 * questions each (3 x 12 = 36), a secret question, and a question 37. This
 * is enforced by the registry-conformance tests in closer.test.js, not just
 * assumed -- a pack that doesn't fit isn't added to PACKS. The alternative
 * (a fully variable engine that derives act breaks from each pack's own
 * question count) was considered and deliberately not built: every pack
 * planned so far (FIRST DATE, COUPLES, FRIENDS, OLD FRIENDS, LATE NIGHT,
 * DEEP, CHAOS -- spec 55) fits this shape, and CloserGame.js's act-break
 * logic, global copy ("Das waren alle 36.", "FRAGE 37", "Etwa 45 Minuten"),
 * skip-token count and act timer all rely on it being fixed rather than
 * reading it per-pack. If a pack that genuinely needs a different shape
 * ever comes up, that's the trigger to revisit this, not before.
 *
 * See questionAt/actIndexFor/totalQuestions/finalQuestionIndex below, all
 * of which take a packId as their first argument (kept pack-aware even
 * though every pack is the same shape, since packId is still how a pack's
 * own question wording/acts/style/secret index/Q37 copy differ), and
 * CloserGame.js's `packId` field in saved state (defaults to 'classic' for
 * any save written before this existed, and is canonicalized on load --
 * see loadSaved()).
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
    breakText: {
      de: 'Ihr wisst jetzt wahrscheinlich Dinge voneinander, die ihr vor 15 Minuten noch nicht wusstet.',
      en: "You probably know things about each other now that you didn't know 15 minutes ago.",
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
        de: 'Wenn du ein enger Freund deines Gegenübers werden solltest, was wäre für sie oder ihn wichtig, über dich zu wissen?',
        en: 'If you were to become a close friend of the other person, what would be important for them to know about you?',
      },
      {
        de: 'Sag deinem Gegenüber, was du an ihm oder ihr magst. Sei dabei sehr ehrlich und sag etwas, das du wahrscheinlich nicht zu jemandem sagen würdest, den du gerade getroffen hast.',
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
        de: 'Teile ein persönliches Problem und frage dein Gegenüber, wie er oder sie damit umgehen würde. Und bitte dein Gegenüber ebenso, darüber zu reflektieren, wie du wohl zu dem Problem stehst, das du gewählt hast.',
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
    blurb: {
      de: '36 Fragen · 3 Akte · etwa 45 Minuten',
      en: '36 questions · 3 acts · about 45 minutes',
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
    blurb: {
      de: 'Dieselben 36 tiefen Fragen – mit spielerischeren Twists.',
      en: 'The same 36 deep questions — with more playful twists.',
    },
    twists: { predict: true, both: true, nothinking: true, deeper: true, stay: true },
  },
];

// The secret question interrupts between question 27 and question 28.
const CLASSIC_SECRET_AT_INDEX = 27;

export const SKIP_TOKENS = 3;

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
  },
};

export const DEFAULT_PACK_ID = 'classic';

export function getPack(packId) {
  return PACKS[packId] || PACKS[DEFAULT_PACK_ID];
}

export function totalQuestions(packId) {
  return getPack(packId).acts.reduce((n, a) => n + a.questions.length, 0);
}

export function finalQuestionIndex(packId) {
  return totalQuestions(packId) - 1;
}

export function actIndexFor(packId, questionIndex) {
  const acts = getPack(packId).acts;
  let n = 0;
  for (let i = 0; i < acts.length; i += 1) {
    n += acts[i].questions.length;
    if (questionIndex < n) return i;
  }
  return acts.length - 1;
}

export function questionAt(packId, questionIndex) {
  const acts = getPack(packId).acts;
  let n = questionIndex;
  for (let i = 0; i < acts.length; i += 1) {
    if (n < acts[i].questions.length) return acts[i].questions[n];
    n -= acts[i].questions.length;
  }
  return null;
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
 * true/false/null) into the three cases question 37 branches on:
 *  - neither: nobody's question got asked -- each of you gets an explicit
 *    turn to ask it now (spec: double-NO sequential turns).
 *  - bothAsked: both already happened, question 37 is a pure bonus.
 *  - pendingPlayer: exactly one is still unasked -- that person asks it.
 * secretAsked defaults to [null, null] before either check completes, which
 * classifies as neither/bothAsked both false and pendingPlayer null.
 */
export function classifySecretAsked(secretAsked) {
  const [a0, a1] = secretAsked || [null, null];
  const neither = a0 === false && a1 === false;
  const bothAsked = a0 === true && a1 === true;
  const pendingPlayer = a0 === false ? 0 : a1 === false ? 1 : null;
  return { neither, bothAsked, pendingPlayer };
}
