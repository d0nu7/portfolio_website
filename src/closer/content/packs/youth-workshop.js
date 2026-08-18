import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const question = (id, de, en) => ({ id: `youth-workshop-${id}`, de, en });

const YOUTH_WORKSHOP_ACTS = [
  {
    id: 'warm-up',
    title: { de: 'ANKOMMEN', en: 'WARM UP' },
    intro: {
      de: 'Startet mit leichten Vorlieben und Fantasie. Ihr könnt jederzeit passen; niemand muss eine private Geschichte erzählen.',
      en: 'Start with light preferences and imagination. You can always pass; nobody has to share a private story.',
    },
    breakText: { de: 'Ihr seid ins Gespräch gekommen.', en: 'You have started the conversation.' },
    breakSub: { de: 'Jetzt geht es um Ideen und Zusammenarbeit.', en: 'Next come ideas and cooperation.' },
    questions: [
      question('q01', 'Welche kleine Sache macht einen gewöhnlichen Tag für dich ein bisschen besser?', 'What small thing makes an ordinary day a little better for you?'),
      question('q02', 'Wenn du für heute einen harmlosen Feiertag erfinden könntest: Was würde gefeiert?', 'If you could invent a harmless holiday for today, what would it celebrate?'),
      question('q03', 'Welche Pause lädt deinen Akku eher auf: Ruhe, Bewegung, Musik, Reden oder etwas anderes?', 'What kind of break tends to recharge you: quiet, movement, music, talking, or something else?'),
      question('q04', 'Welches komplett nutzlose Talent wäre trotzdem lustig zu haben?', 'What completely useless talent would still be fun to have?'),
      question('q05', 'Welches Geräusch, Wort oder Emoji passt heute am besten zu deiner Stimmung?', 'What sound, word, or emoji best matches your mood today?'),
      question('q06', 'Welche Art von Aufgabe macht dir eher Spaß: etwas bauen, erklären, erfinden, ordnen oder präsentieren?', 'What kind of task do you tend to enjoy: building, explaining, inventing, organising, or presenting?'),
      question('q07', 'Wenn dieser Raum einen geheimen Bonus-Level hätte: Wie würde er aussehen?', 'If this room had a secret bonus level, what would it look like?'),
      question('q08', 'Was ist eine kleine Sache, auf die du dich diese Woche freust?', 'What is one small thing you are looking forward to this week?'),
    ],
  },
  {
    id: 'team-up',
    title: { de: 'ZUSAMMENSPIEL', en: 'TEAM UP' },
    intro: {
      de: 'Tauscht Ideen darüber aus, was Zusammenarbeit angenehm macht. Es geht nicht um Leistung, Noten oder darum, wer besser ist.',
      en: 'Share ideas about what makes cooperation feel good. This is not about performance, grades, or who is better.',
    },
    breakText: { de: 'Unterschiedliche Stärken können gut zusammenspielen.', en: 'Different strengths can work well together.' },
    breakSub: { de: 'Zum Schluss blickt ihr auf eine gute gemeinsame Gruppe.', en: 'To finish, look at what makes a group feel good.' },
    questions: [
      question('q09', 'Woran merkst du bei einer Gruppenaufgabe, dass deine Idee willkommen ist?', 'During a group task, what tells you that your idea is welcome?'),
      question('q10', 'Welche Rolle übernimmst du in einer Gruppe manchmal gern – zum Beispiel Ideen finden, zuhören, strukturieren oder Mut machen?', 'What role do you sometimes enjoy in a group—for example, finding ideas, listening, organising, or encouraging others?'),
      question('q11', 'Was hilft dir, eine noch unfertige Idee laut auszusprechen?', 'What helps you say an unfinished idea out loud?'),
      question('q12', 'Erfindet gemeinsam eine Maschine, die ein kleines Alltagsproblem löst. Was kann sie?', 'Together, invent a machine that solves one small everyday problem. What can it do?'),
      question('q13', 'Welche Reaktion hilft dir, wenn du bei einer Aufgabe gerade nicht weiterweißt?', 'What kind of response helps when you are stuck on a task?'),
      question('q14', 'Was macht eine Erklärung für dich leichter verständlich?', 'What makes an explanation easier for you to understand?'),
      question('q15', 'Welche Stärke kannst du in eine Gruppe einbringen, ohne darin die beste Person sein zu müssen?', 'What strength can you bring to a group without needing to be the best at it?'),
      question('q16', 'Wenn ihr zehn Minuten und unbegrenzte Bastelmaterialien hättet: Was würdet ihr gemeinsam erfinden?', 'If you had ten minutes and unlimited craft materials, what would you invent together?'),
    ],
  },
  {
    id: 'belong',
    title: { de: 'DABEI SEIN', en: 'BELONG' },
    intro: {
      de: 'Zum Schluss geht es darum, wie eine Gruppe offen und angenehm bleibt. Kleine, freiwillige Wünsche reichen vollkommen.',
      en: 'Finish by considering what keeps a group open and comfortable. Small, voluntary hopes are plenty.',
    },
    questions: [
      question('q17', 'Was kann eine Gruppe tun, damit neue oder stille Personen leichter mitmachen können?', 'What can a group do to make it easier for new or quiet people to join in?'),
      question('q18', 'Welche einfache Gruppenregel macht Zusammenarbeit fairer oder entspannter?', 'What simple group rule makes working together fairer or more relaxed?'),
      question('q19', 'Wie kann jemand freundlich nachfragen, ohne eine Person zum Reden zu drängen?', 'How can someone check in kindly without pressuring a person to speak?'),
      question('q20', 'Welche Art von Humor bringt Menschen zusammen, ohne jemanden zum Witz zu machen?', 'What kind of humour brings people together without turning anyone into the joke?'),
      question('q21', 'Was hilft, wenn zwei gute Ideen unterschiedlich sind und nicht beide sofort umgesetzt werden können?', 'What helps when two good ideas differ and cannot both be used right away?'),
      question('q22', 'Welche kleine Geste kann einer Person zeigen: Du gehörst hier dazu?', 'What small gesture can show someone: you belong here?'),
      question('q23', 'Was möchtest du in diesem Workshop gern einmal ausprobieren – ohne dass du es perfekt können musst?', 'What would you like to try once in this workshop without needing to do it perfectly?'),
      question('q24', 'Welchen kleinen Beitrag könntest du heute zu einer angenehmen Gruppe leisten, wenn es für dich passt?', 'What small contribution could you make to a comfortable group today, if it feels right for you?'),
    ],
  },
];

YOUTH_WORKSHOP_ACTS[2].questions[7].last = true;

const YOUTH_WORKSHOP_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    title: { de: 'ICEBREAKER', en: 'ICEBREAKER' },
    meta: { de: 'Leicht und kurz', en: 'Light and short' },
    minutes: 10,
    actIndices: [[0, 1, 3], [0, 3, 6], [0, 3, 5]],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    title: { de: 'WORKSHOP', en: 'WORKSHOP' },
    meta: { de: 'Mehr Austausch', en: 'More exchange' },
    minutes: 20,
    actIndices: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 6], [0, 1, 2, 3, 4, 5]],
  },
};

export const YOUTH_WORKSHOP_PACK = {
  id: 'youth-workshop',
  title: { de: 'YOUTH WORKSHOP', en: 'YOUTH WORKSHOP' },
  meta: { de: 'Für Peers von 14 bis 17', en: 'For peers aged 14 to 17' },
  blurb: {
    de: 'Leichte Fragen für freiwillige Zweiergespräche in Gruppen.',
    en: 'Light prompts for voluntary paired conversations in groups.',
  },
  positioning: {
    de: 'YOUTH WORKSHOP ist ein Icebreaker für zwei gleichaltrige Jugendliche von 14 bis 17 Jahren. Es ist keine Bewertung, Therapie oder Konfliktklärung. Verwendet nur Spitznamen oder Initialen. Antworten bleiben im Gespräch und dürfen von der Leitung weder verlangt noch ausgewertet werden. Bei einem echten Problem nutzt bitte die bekannten Ansprech- und Schutzwege der Einrichtung.',
    en: 'YOUTH WORKSHOP is an icebreaker for two peers aged 14 to 17. It is not an assessment, therapy, or conflict intervention. Use nicknames or initials only. Answers stay within the conversation and must not be requested or evaluated by facilitators. For a real concern, use the organisation’s established support and safeguarding channels.',
  },
  discoverability: 'menu-unlock',
  libraryGroup: 'situations',
  privateMoment: 'none',
  persistRun: false,
  introPrivacy: {
    de: 'Eure Antworten werden weder eingegeben noch aufgenommen. Dieser Jugendmodus speichert auch Namen und Spielfortschritt nicht als fortsetzbare Sitzung. Die allgemeine Pack-Auswahl bleibt als Einstellung auf dem Gerät gespeichert.',
    en: 'Your answers are never typed in or recorded. This youth mode also does not save names or progress as a resumable session. The general pack selection remains stored on the device as a preference.',
  },
  defaultTimerEnabled: false,
  acts: YOUTH_WORKSHOP_ACTS,
  modes: [{
    id: 'peer',
    title: { de: 'PEER', en: 'PEER' },
    meta: { de: 'Freiwillig und ohne Bewertung', en: 'Voluntary and unassessed' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: NO_TWISTS,
  }],
  actStyle: [
    { accent: '#73C8F0', chrome: 1, progress: 'full', glow: 0.24 },
    { accent: '#8ED081', chrome: 0.52, progress: 'count', glow: 0.14 },
    { accent: '#F2C66D', chrome: 0.24, progress: 'number', glow: 0.07 },
  ],
  q37: { neither: { de: '', en: '' }, one: () => '', both: { de: '', en: '' } },
  directFinale: {
    de: 'Die Runde endet hier. Eure Antworten bleiben bei euch; für den Workshop müsst ihr nichts daraus berichten.',
    en: 'The round ends here. Your answers stay with you; you do not have to report anything from them to the workshop.',
  },
  // Required by the shared pack shape; no private moment is enabled.
  secretAtIndex: 7,
  routes: YOUTH_WORKSHOP_ROUTES,
  defaultRouteId: 'quick',
};
