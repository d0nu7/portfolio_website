/*
 * CLOSER -- game data.
 *
 * The 36 questions are RaDi's list, in his wording, with an English rendering
 * alongside. Every user-visible string in this file is a { de, en } pair; the
 * interface strings live in closerCopy.js.
 *
 * Per the spec, a question carries at most ONE twist plus an independent
 * stayEnabled flag, and twists are deliberately sparse: six in Act I, three in
 * Act II, one in Act III. The game is not supposed to be more interesting than
 * the conversation.
 *
 *   twist: 'predict'    -- the other person guesses the answer first
 *          'both'       -- answered together, after a 3-2-1
 *          'nothinking' -- 5-4-3-2-1, then the question, answer immediately
 *          'deeper'     -- afterwards, offers one follow-up of your own
 *   stayEnabled         -- afterwards, offers STAY instead of only NEXT
 *
 * ORIGINAL mode runs only 'deeper' and stayEnabled. DATE NIGHT adds the
 * playful twists on top.
 */

export const LANGS = ['de', 'en'];

export function pick(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? '';
  }
  return value;
}

export const ACTS = [
  {
    id: 'curious',
    numeral: { de: 'AKT I', en: 'ACT I' },
    title: { de: 'NEUGIERIG', en: 'CURIOUS' },
    subtitle: { de: '12 Fragen · etwa 15 Minuten', en: '12 questions · about 15 minutes' },
    intro: {
      de: 'Fangt leicht an. Es gibt noch nichts zu erreichen.',
      en: 'Start light. There is nowhere to get to yet.',
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
        de: 'Hast du eine Vorahnung, wie du sterben wirst?',
        en: 'Do you have a hunch about how you are going to die?',
        twist: 'predict',
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
    intro: {
      de: 'Dieser Teil wird persönlich. Denkt dran: Ihr könnt jederzeit überspringen.',
      en: 'This part gets personal. Remember: you can always skip.',
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
export const Q37 = {
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

export const MODES = [
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
    // and guessing out loud, nothing performative -- so it stays on,
    // giving Act I its two predict questions. BOTH and NO THINKING are
    // more playful in character and stay DATE NIGHT-exclusive.
    twists: { predict: true, both: false, nothinking: false, deeper: true, stay: true },
  },
  {
    id: 'datenight',
    title: { de: 'DATE NIGHT', en: 'DATE NIGHT' },
    meta: { de: 'Verspielt', en: 'Playful' },
    blurb: {
      de: '36 Fragen · mehr verspielte Twists · etwa 45 Minuten',
      en: '36 questions · more playful twists · about 45 minutes',
    },
    twists: { predict: true, both: true, nothinking: true, deeper: true, stay: true },
  },
];

// The secret question interrupts between question 27 and question 28.
export const SECRET_AT_INDEX = 27;

export const TOTAL_QUESTIONS = ACTS.reduce((n, a) => n + a.questions.length, 0);

export const SKIP_TOKENS = 3;

/*
 * Per-act look. The interface withdraws as the conversation takes over:
 * Act I carries a count and a progress marker in a bright accent, Act II drops
 * the marker and dims, Act III shows a bare number. Question 36 shows nothing
 * at all (handled in the component).
 */
export const ACT_STYLE = [
  { accent: '#13ADC7', chrome: 1, progress: 'full', glow: 0.28 },
  { accent: '#945DD6', chrome: 0.5, progress: 'count', glow: 0.15 },
  { accent: '#8b93a3', chrome: 0.22, progress: 'number', glow: 0.05 },
];

export function actIndexFor(questionIndex) {
  let n = 0;
  for (let i = 0; i < ACTS.length; i += 1) {
    n += ACTS[i].questions.length;
    if (questionIndex < n) return i;
  }
  return ACTS.length - 1;
}

export function questionAt(questionIndex) {
  let n = questionIndex;
  for (let i = 0; i < ACTS.length; i += 1) {
    if (n < ACTS[i].questions.length) return ACTS[i].questions[n];
    n -= ACTS[i].questions.length;
  }
  return null;
}
