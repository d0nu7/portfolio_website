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
      question('q05', 'Welches Geräusch, Wort oder Emoji passt zu der Stimmung, die ihr für diesen Workshop gern hättet?', 'What sound, word, or emoji fits the atmosphere you would like for this workshop?'),
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
      question('q09', 'Wie kann eine Gruppe nach einer Idee fragen und zugleich zeigen, dass Auslassen okay ist?', 'How can a group invite an idea while also showing that it is okay to pass?'),
      question('q10', 'Welche Rolle übernimmst du in einer Gruppe manchmal gern – zum Beispiel Ideen finden, zuhören, strukturieren oder Mut machen?', 'What role do you sometimes enjoy in a group—for example, finding ideas, listening, organising, or encouraging others?'),
      question('q11', 'Was kann es leichter machen, eine unfertige Idee zu teilen – gesprochen, gebärdet, aufgeschrieben oder auf eine andere passende Weise?', 'What can make it easier to share an unfinished idea—spoken, signed, written, or in another suitable way?'),
      question('q12', 'Erfindet gemeinsam eine Maschine, die ein kleines Alltagsproblem löst. Was kann sie?', 'Together, invent a machine that solves one small everyday problem. What can it do?'),
      question('q13', 'Welche Reaktion hilft dir, wenn du bei einer Aufgabe gerade nicht weiterweißt?', 'What kind of response helps when you are stuck on a task?'),
      question('q14', 'Welche Arten von Erklärung können etwas leichter verständlich machen?', 'What kinds of explanation can make something easier to understand?'),
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
      question('q17', 'Was kann eine Gruppe tun, damit alle freiwillig mitmachen oder ohne Erklärung auslassen können?', 'What can a group do so everyone can join voluntarily or pass without explaining?'),
      question('q18', 'Welche einfache Gruppenregel macht Zusammenarbeit fairer oder entspannter?', 'What simple group rule makes working together fairer or more relaxed?'),
      question('q19', 'Wie kann jemand freundlich nachfragen, ohne eine Person zum Reden zu drängen?', 'How can someone check in kindly without pressuring a person to speak?'),
      question('q20', 'Welche Art von Humor bringt Menschen zusammen, ohne jemanden zum Witz zu machen?', 'What kind of humour brings people together without turning anyone into the joke?'),
      question('q21', 'Was hilft, wenn zwei gute Ideen unterschiedlich sind und nicht beide sofort umgesetzt werden können?', 'What helps when two good ideas differ and cannot both be used right away?'),
      question('q22', 'Welche kleine Geste oder Handlung kann zeigen: Du bist willkommen – ohne zu erwarten, dass jemand mitmacht?', 'What small gesture or action can show that someone is welcome without expecting them to join in?'),
      question('q23', 'Was möchtest du in diesem Workshop gern einmal ausprobieren – ohne dass du es perfekt können musst?', 'What would you like to try once in this workshop without needing to do it perfectly?'),
      question('q24', 'Was könnte heute zu einer angenehmen Gruppe beitragen, ohne dass eine bestimmte Person es übernehmen muss?', 'What could help the group feel comfortable today without assigning it to any one person?'),
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
    actIndices: [[0, 1, 3], [0, 3, 5], [0, 3, 5]],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    title: { de: 'WORKSHOP', en: 'WORKSHOP' },
    meta: { de: 'Mehr Austausch', en: 'More exchange' },
    minutes: 20,
    actIndices: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]],
  },
};

export const YOUTH_WORKSHOP_PACK = {
  id: 'youth-workshop',
  title: { de: 'YOUTH WORKSHOP', en: 'YOUTH WORKSHOP' },
  meta: { de: 'Für Jugendliche von 14 bis 17', en: 'For ages 14 to 17' },
  blurb: {
    de: 'Leichte Fragen für freiwillige Zweiergespräche in Gruppen.',
    en: 'Light prompts for voluntary paired conversations in groups.',
  },
  positioning: {
    de: 'YOUTH WORKSHOP ist ein Icebreaker für zwei Jugendliche von 14 bis 17 Jahren auf vergleichbarer Ebene; keine Person bewertet, beaufsichtigt oder entscheidet über die andere. Es ist keine Bewertung, Therapie oder Konfliktklärung. Verwendet keinen Namen, einen Spitznamen oder Initialen. Die App zeichnet eure Antworten nicht auf. Eure Partnerperson hört oder sieht jedoch, was ihr teilt; Geheimhaltung zwischen Personen kann die App nicht garantieren. Die Leitung darf Antworten weder verlangen noch auswerten. Bei einem echten Problem nutzt bitte die bekannten Ansprech- und Schutzwege der Einrichtung.',
    en: 'YOUTH WORKSHOP is an icebreaker for two peers aged 14 to 17 on comparable footing; neither person assesses, supervises, or makes decisions about the other. It is not an assessment, therapy, or conflict intervention. Use no name, a nickname, or initials. The app does not record your answers. Your partner can still hear or see what you share; the app cannot guarantee secrecy between people. Facilitators must not request or evaluate answers. For a real concern, use the organisation’s established support and safeguarding channels.',
  },
  discoverability: 'menu-unlock',
  libraryGroup: 'situations',
  privateMoment: 'none',
  persistRun: false,
  introPrivacy: {
    de: 'Eure Antworten werden weder eingegeben noch aufgenommen. Teilt nur, was eure Partnerperson hören oder sehen darf; Geheimhaltung zwischen Personen kann die App nicht garantieren. Dieser Jugendmodus speichert auch Namen und Spielfortschritt nicht als fortsetzbare Sitzung. Die allgemeine Pack-Auswahl bleibt als Einstellung auf dem Gerät gespeichert.',
    en: 'Your answers are never typed in or recorded. Share only what your partner may hear or see; the app cannot guarantee secrecy between people. This youth mode also does not save names or progress as a resumable session. The general pack selection remains stored on the device as a preference.',
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
    de: 'Die Runde endet hier. Ihr müsst dem Workshop nichts daraus berichten. Teilt nur, was eure Partnerperson hören oder sehen darf; die App zeichnet Antworten nicht auf.',
    en: 'The round ends here. You do not have to report anything from it to the workshop. Share only what your partner may hear or see; the app does not record answers.',
  },
  // Required by the shared pack shape; no private moment is enabled.
  secretAtIndex: 7,
  routes: YOUTH_WORKSHOP_ROUTES,
  defaultRouteId: 'quick',
};
