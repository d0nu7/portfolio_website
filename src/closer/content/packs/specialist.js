import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';
import {
  COLLEAGUES_QUESTIONS,
  FAMILY_QUESTIONS,
  ROAD_TRIP_QUESTIONS,
} from './specialist-question-data';

const calmMode = (meta) => [{
  id: 'calm',
  title: { de: 'RUHIG', en: 'CALM' },
  meta,
  blurb: ROUTE_NEUTRAL_BLURB,
  twists: NO_TWISTS,
}];

const makeActs = (questions, definitions) => definitions.map((definition, index) => ({
  ...definition,
  questions: questions.slice(index * 12, index * 12 + 12),
}));

const directQ37 = (both, byRoute = {}) => ({
  neither: both,
  one: () => '',
  both,
  byRoute,
});

const ROAD_TRIP_ACTS = makeActs(ROAD_TRIP_QUESTIONS, [
  {
    id: 'on-the-road',
    title: { de: 'UNTERWEGS', en: 'ON THE ROAD' },
    intro: {
      de: 'Kommt leicht ins Gespräch: über das Unterwegssein, kleine Vorlieben und spielerische Ideen. Niemand muss dafür etwas suchen, anschauen oder bedienen.',
      en: 'Ease into the conversation through the journey, small preferences, and playful ideas. Nobody needs to search for, look at, or operate anything.',
    },
    breakText: { de: 'Ihr seid ins Gespräch gekommen.', en: 'The conversation is moving.' },
    breakSub: { de: 'Macht weiter, wenn es für euch passt.', en: 'Continue when it feels right.' },
  },
  {
    id: 'stories',
    title: { de: 'GESCHICHTEN', en: 'STORIES' },
    intro: {
      de: 'Tauscht konkrete Erinnerungen und Reisegewohnheiten aus. Eine gute Geschichte darf klein sein; jede Frage darf warten.',
      en: 'Share specific memories and travel habits. A good story can be small, and every question can wait.',
    },
    breakText: { de: 'Ein paar Wege liegen jetzt offen.', en: 'A few paths are open now.' },
    breakSub: { de: 'Kein Wunsch ist eine Verabredung.', en: 'A wish is not a commitment.' },
  },
  {
    id: 'horizon',
    title: { de: 'HORIZONT', en: 'HORIZON' },
    intro: {
      de: 'Blickt auf mögliche nächste Wege und darauf, was gemeinsame Reisezeit wertvoll macht. Ein Wunsch ist keine Verabredung.',
      en: 'Look toward possible future journeys and what makes shared travel time meaningful. A wish is not a commitment.',
    },
  },
]);
ROAD_TRIP_ACTS[2].questions[11].last = true;

const ROAD_TRIP_ROUTES = {
  quick: { ...ROUTE_PRESETS.quick, minutes: 18, actIndices: [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]] },
  standard: { ...ROUTE_PRESETS.standard, minutes: 38, actIndices: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]] },
  full: { ...ROUTE_PRESETS.full, minutes: 60 },
};

const ROAD_TRIP_Q37 = directQ37(
  {
    de: 'Welche Antwort der anderen Person hat dich heute neugieriger gemacht – und was möchtest du dazu noch fragen?',
    en: 'Which of the other person’s answers made you more curious today, and what would you like to ask next?',
  },
  {
    standard: {
      de: 'Etwas, das ich jetzt besser über dich verstehe, ist …',
      en: 'Something I understand better about you now is …',
    },
  }
);

const ROAD_TRIP_PACK = {
  id: 'road-trip',
  title: { de: 'ROAD TRIP', en: 'ROAD TRIP' },
  meta: { de: 'Für gemeinsame Wege', en: 'For journeys together' },
  blurb: {
    de: 'Gegenwart, Reisegeschichten und nächste Horizonte.',
    en: 'The present journey, travel stories and new horizons.',
  },
  positioning: {
    de: 'ROAD TRIP ist in dieser ersten Version nur für ein geparktes Fahrzeug oder Situationen gedacht, in denen keine teilnehmende Person fährt. Wer fährt, bedient oder liest niemals das Smartphone. Pausiert sofort, sobald die Umgebung Aufmerksamkeit verlangt.',
    en: 'In this first release, ROAD TRIP is only for a parked vehicle or situations in which neither participant is driving. A driver must never handle or read the phone. Pause immediately whenever the surroundings require attention.',
  },
  discoverability: 'menu-unlock',
  privateMoment: 'none',
  acts: ROAD_TRIP_ACTS,
  modes: calmMode({ de: 'Ohne Ablenkungsaktionen', en: 'No distracting actions' }),
  actStyle: [
    { accent: '#5EC7B7', chrome: 1, progress: 'full', glow: 0.25 },
    { accent: '#F4A261', chrome: 0.5, progress: 'count', glow: 0.14 },
    { accent: '#E9C46A', chrome: 0.22, progress: 'number', glow: 0.06 },
  ],
  q37: ROAD_TRIP_Q37,
  directFinaleByRoute: {
    quick: {
      de: 'Hier endet die Runde. Wenn eine teilnehmende Person weiterfährt, legt das Smartphone weg; die sichere Weiterreise hat Vorrang.',
      en: 'This round ends here. If either participant resumes driving, put the phone away; a safe onward journey comes first.',
    },
  },
  secretAtIndex: 27,
  routes: ROAD_TRIP_ROUTES,
  defaultRouteId: 'quick',
};

const FAMILY_ACTS = makeActs(FAMILY_QUESTIONS, [
  {
    id: 'everyday',
    title: { de: 'ALLTAG', en: 'EVERYDAY' },
    intro: {
      de: 'Beginnt mit kleinen Geschichten und Alltagsdetails, die zu eurer eigenen Version von Familie gehören. Unterschiedliche Erinnerungen dürfen nebeneinanderstehen.',
      en: 'Begin with small stories and everyday details that belong to your own version of family. Different memories may stand side by side.',
    },
    breakText: { de: 'Eure Version von Familie hat viele Details.', en: 'Your version of family has many details.' },
    breakSub: { de: 'Es gibt keine einzig richtige Erinnerung.', en: 'There is no single correct memory.' },
  },
  {
    id: 'roles',
    title: { de: 'ROLLEN', en: 'ROLES' },
    intro: {
      de: 'Schaut jetzt auf Rollen, Unterstützung und Veränderung. Hört zu, ohne die andere Person einzuordnen oder für sie zu entscheiden.',
      en: 'Now look at roles, support, and change. Listen without defining the other person or deciding for them.',
    },
    breakText: { de: 'Rollen dürfen sich verändern.', en: 'Roles are allowed to change.' },
    breakSub: { de: 'Nehmt euch einen ruhigen Moment.', en: 'Take a quiet moment.' },
  },
  {
    id: 'shaping',
    title: { de: 'GESTALTEN', en: 'SHAPING' },
    intro: {
      de: 'Zum Schluss geht es um Wertschätzung, Grenzen und eine frei gewählte Zukunft. Nähe kann auch bedeuten, Freiraum und Unterschiede zu respektieren.',
      en: 'The final act is about appreciation, boundaries, and a freely chosen future. Closeness can also mean respecting space and difference.',
    },
  },
]);
FAMILY_ACTS[2].questions[11].last = true;

const FAMILY_ROUTES = {
  quick: { ...ROUTE_PRESETS.quick, minutes: 20, actIndices: [[0, 1, 3, 4], [0, 1, 2, 3], [0, 2, 7, 11]] },
  standard: { ...ROUTE_PRESETS.standard, minutes: 40, actIndices: [[0, 1, 2, 3, 4, 5, 7, 10], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 6, 7, 11]] },
  full: { ...ROUTE_PRESETS.full, minutes: 70 },
};

const FAMILY_Q37 = directQ37({
  de: 'Was soll in eurer Art, Familie zu sein, künftig mehr Platz haben?',
  en: 'What would you like your way of being family to make more room for in the future?',
});

const FAMILY_PACK = {
  id: 'family',
  title: { de: 'FAMILY', en: 'FAMILY' },
  meta: { de: 'Für erwachsene Familie', en: 'For adult family' },
  blurb: {
    de: 'Alltag, Rollen, Grenzen und frei gewählte Verbindung.',
    en: 'Everyday life, roles, boundaries and chosen connection.',
  },
  positioning: {
    de: 'FAMILY ist für zwei erwachsene Menschen, die einander als Familie verstehen – biologisch, rechtlich, angeheiratet, adoptiert oder selbst gewählt. Es setzt weder Nähe noch gemeinsame Kindheit oder den Wunsch voraus, etwas zu klären. Es ist keine Therapie oder Mediation.',
    en: 'FAMILY is for two adults who understand each other as family—through biology, law, partnership, adoption or choice. It assumes neither closeness, a shared childhood nor a wish to resolve anything. It is not therapy or mediation.',
  },
  discoverability: 'menu-unlock',
  privateMoment: 'none',
  acts: FAMILY_ACTS,
  modes: calmMode({ de: 'Zuhören ohne Zuschreibungen', en: 'Listen without assumptions' }),
  actStyle: [
    { accent: '#E7A977', chrome: 1, progress: 'full', glow: 0.24 },
    { accent: '#B78ACB', chrome: 0.5, progress: 'count', glow: 0.14 },
    { accent: '#79B8A8', chrome: 0.22, progress: 'number', glow: 0.06 },
  ],
  q37: FAMILY_Q37,
  secretAtIndex: 27,
  routes: FAMILY_ROUTES,
  defaultRouteId: 'standard',
};

const COLLEAGUES_ACTS = makeActs(COLLEAGUES_QUESTIONS, [
  {
    id: 'rhythm',
    title: { de: 'RHYTHMUS', en: 'RHYTHM' },
    intro: {
      de: 'Beginnt beim Arbeitsalltag, nicht bei Leistung: kleine gute Momente, Fokus, Kommunikation und Rhythmus. Namen und Organisationen müssen nicht genannt werden.',
      en: 'Begin with everyday work, not performance: small positive moments, focus, communication and rhythm. Names and organizations need not be identified.',
    },
    breakText: { de: 'Arbeitsweisen dürfen verschieden sein.', en: 'Working styles can be different.' },
    breakSub: { de: 'Hier wird nichts bewertet.', en: 'Nothing here is being assessed.' },
  },
  {
    id: 'coordination',
    title: { de: 'ABSTIMMUNG', en: 'COORDINATION' },
    intro: {
      de: 'Sprecht über Zusammenarbeit, nicht über konkrete andere Personen oder laufende Konflikte. Beschreibt, was euch hilft.',
      en: 'Discuss collaboration, not specific other people or active conflicts. Describe what helps you.',
    },
    breakText: { de: 'Verstehen ist noch keine Vereinbarung.', en: 'Understanding is not an agreement.' },
    breakSub: { de: 'Macht weiter, wenn es freiwillig bleibt.', en: 'Continue while it remains voluntary.' },
  },
  {
    id: 'contribution',
    title: { de: 'BEITRAG', en: 'CONTRIBUTION' },
    intro: {
      de: 'Blickt auf Stärken, Lernen, Anerkennung und gesunde Grenzen. Aus keiner Antwort entsteht ein Versprechen, eine Aufgabe oder eine Beurteilung.',
      en: 'Look at strengths, learning, recognition and healthy boundaries. No answer creates a promise, assignment or assessment.',
    },
  },
]);

const COLLEAGUES_ROUTES = {
  quick: { ...ROUTE_PRESETS.quick, minutes: 20, actIndices: [[0, 1, 5, 11], [0, 2, 5, 11], [0, 4, 7, 11]] },
  standard: { ...ROUTE_PRESETS.standard, minutes: 40, actIndices: [[0, 1, 2, 3, 5, 7, 9, 11], [0, 1, 2, 3, 5, 7, 9, 11], [0, 1, 2, 4, 6, 7, 9, 11]] },
};

const COLLEAGUES_Q37 = directQ37({
  de: 'Welche Arbeitspräferenz der anderen Person verstehst du jetzt klarer? Spiegeln reicht; ihr müsst nichts vereinbaren.',
  en: 'Which of the other person’s working preferences do you understand more clearly now? Reflection is enough; you do not need to agree on anything.',
});

const COLLEAGUES_PACK = {
  id: 'colleagues',
  title: { de: 'COLLEAGUES', en: 'COLLEAGUES' },
  meta: { de: 'Für freiwillige Gespräche unter Peers', en: 'For voluntary conversations between peers' },
  blurb: {
    de: 'Arbeitsweisen verstehen – ohne Bewertung oder Verpflichtung.',
    en: 'Understand working preferences—without assessment or obligation.',
  },
  positioning: {
    de: 'Dieses Gespräch ist freiwillig und keine Bewertung. Es ist nur für möglichst gleichgestellte Kolleg:innen gedacht, nicht für direkte Abhängigkeiten. Vertrauliche Informationen und konkrete Beschwerden gehören nicht in dieses Spiel. Antworten sind keine Zusagen und keine Grundlage für berufliche Entscheidungen.',
    en: 'This conversation is voluntary and is not an assessment. It is for colleagues on as equal a footing as possible, not direct dependent relationships. Confidential information and specific complaints do not belong in this game. Answers are not commitments or a basis for employment decisions.',
  },
  discoverability: 'menu-unlock',
  privateMoment: 'none',
  defaultTimerEnabled: false,
  acts: COLLEAGUES_ACTS,
  modes: calmMode({ de: 'Keine Bewertung, kein Zeitdruck', en: 'No assessment, no time pressure' }),
  actStyle: [
    { accent: '#72A7D8', chrome: 1, progress: 'full', glow: 0.22 },
    { accent: '#6BB6A4', chrome: 0.5, progress: 'count', glow: 0.12 },
    { accent: '#B59BD8', chrome: 0.22, progress: 'number', glow: 0.05 },
  ],
  q37: COLLEAGUES_Q37,
  secretAtIndex: 8,
  routes: COLLEAGUES_ROUTES,
  defaultRouteId: 'quick',
};

export { ROAD_TRIP_PACK, FAMILY_PACK, COLLEAGUES_PACK };
