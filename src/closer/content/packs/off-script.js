import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const activity = (id, de, en) => ({ id: `off-script-${id}`, de, en });

const OFF_SCRIPT_ACTS = [
  {
    id: 'notice',
    title: { de: 'ENTDECKEN', en: 'NOTICE' },
    intro: {
      de: 'Schaut euch um und macht aus gewöhnlichen Details etwas herrlich Unsinniges. Bleibt, wo ihr seid; nichts muss bewegt oder angefasst werden.',
      en: 'Look around and turn ordinary details into something delightfully absurd. Stay where you are; nothing needs to be moved or touched.',
    },
    breakText: { de: 'Die Umgebung ist offiziell verdächtig interessant.', en: 'Your surroundings are officially suspiciously interesting.' },
    breakSub: { de: 'Weiter geht’s mit kleinen Auftritten.', en: 'Next up: tiny performances.' },
    questions: [
      activity('q01', 'Wählt etwas Sichtbares und gebt ihm den Titel eines viel zu dramatischen Films.', 'Choose something you can see and give it the title of an excessively dramatic movie.'),
      activity('q02', 'Findet zwei Dinge oder Farben, die absolut nicht zusammenpassen. Erfindet ihr gemeinsames Abenteuer.', 'Find two things or colours that absolutely do not belong together. Invent their shared adventure.'),
      activity('q03', 'Wählt einen gewöhnlichen Gegenstand. Eine Person verkauft ihn als absurdes Luxusprodukt, die andere erfindet den Preis.', 'Choose an ordinary object. One person sells it as an absurd luxury product; the other invents the price.'),
      activity('q04', 'Eine Person beschreibt oder zeichnet in der Luft die Form von etwas in der Nähe. Die andere rät. Wählt eine Form, die ihr beide wahrnehmen könnt.', 'One person describes or traces the shape of something nearby. The other guesses. Choose a form you can both perceive.'),
      activity('q05', 'Zeigt einander ein leicht übersehbares Detail und gebt ihm eine völlig unpassende Superkraft.', 'Show each other an easily missed detail and give it a completely unsuitable superpower.'),
      activity('q06', 'Wählt etwas Sichtbares und erfindet eine harmlose neue Verwendung dafür. Ihr müsst sie nicht ausprobieren.', 'Choose something visible and invent a harmless new use for it. You do not have to try it.'),
      activity('q07', 'Wählt drei wahrnehmbare Details und erfindet den Ort, zu dem sie als festliches Erkennungszeichen gehören.', 'Choose three details you can perceive and invent the place where they belong as a festive symbol.'),
      activity('q08', 'Beschreibt eine Oberfläche in eurer Nähe wie einen Wetterbericht – nur anschauen, nichts anfassen nötig.', 'Describe a nearby surface like a weather forecast—looking is enough; no touching required.'),
    ],
  },
  {
    id: 'perform',
    title: { de: 'SPIELEN', en: 'PERFORM' },
    intro: {
      de: 'Jetzt kommen kurze Pantomimen, Geräusche und Minirollen. Wählt jeweils eine kleine, sichere Ausdrucksform, die für euch beide und eure Umgebung passt.',
      en: 'Now come short mimes, sounds, and tiny roles. Each time, choose a small, safe form of expression that works for both of you and your setting.',
    },
    breakText: { de: 'Kleine Bühne, erstaunlich großes Drama.', en: 'Tiny stage, surprisingly big drama.' },
    breakSub: { de: 'Zum Schluss erschafft ihr etwas gemeinsam.', en: 'To finish, you will create something together.' },
    questions: [
      activity('q09', 'Stellt eine harmlose Alltagstätigkeit mit einer kleinen Bewegung, einem Geräusch oder einem kurzen Hinweis dar. Die andere Person rät.', 'Portray a harmless everyday activity with a small movement, a sound, or a short clue. The other person guesses.'),
      activity('q10', 'Macht nacheinander ein Geräusch dafür, wie ein sichtbarer Gegenstand zum Leben erwacht. In ruhiger Umgebung: flüstern oder nur die Bewegung zeigen.', 'Take turns making a sound for a visible object coming alive. In a quiet setting, whisper or show only the movement.'),
      activity('q11', 'Erfindet einen Beruf. Eine Person zeigt ihn mit Pose, Geste, Geräusch oder kurzem Hinweis; die andere gibt ihm einen Namen.', 'Invent a job. One person shows it with a pose, gesture, sound, or short clue; the other gives it a name.'),
      activity('q12', 'Spielt nacheinander eine kurze, übertriebene Zeitlupenreaktion auf ein völlig gewöhnliches Ereignis. Stimme, Gesicht, Geste oder Beschreibung zählen; es gibt kein Zeitlimit.', 'Take turns making a short, exaggerated slow-motion reaction to a completely ordinary event. Voice, expression, gesture, or description all count; there is no time limit.'),
      activity('q13', 'Stellt ein Tier oder einen Gegenstand mit einer Geste, einem Geräusch oder einem kurzen Hinweis dar. Die andere Person rät.', 'Portray an animal or object with a gesture, sound, or short clue. The other person guesses.'),
      activity('q14', 'Eine Person schlägt eine absurde Ein-Satz-Regieidee vor. Die andere entscheidet, ob sie sie klein und sicher umsetzt, verändert oder auslässt; dann wechselt.', 'One person suggests an absurd one-sentence stage idea. The other decides whether to perform a small safe version, change it, or pass; then switch.'),
      activity('q15', 'Stellt dasselbe neutrale Wort oder Zeichen in drei verschiedenen Stimmungen dar. Wählt eine Ausdrucksform, die ihr beide wahrnehmen könnt; die andere Person rät.', 'Express the same neutral word or sign in three different moods. Choose a form you can both perceive; the other person guesses.'),
      activity('q16', 'Erfindet aus einer Geste, einem Geräusch oder einer Beschreibung eine Kreatur. Die andere Person tauft sie und beschreibt ihre Spezialfähigkeit.', 'Create a creature from a gesture, sound, or description. The other person names it and describes its special ability.'),
    ],
  },
  {
    id: 'create',
    title: { de: 'ERSCHAFFEN', en: 'CREATE' },
    intro: {
      de: 'Verbindet eure Einfälle zu kleinen Geschichten, Erfindungen und einem gemeinsamen Finale. Keine Punkte, nur eure beste schräge Idee.',
      en: 'Combine your ideas into tiny stories, inventions, and a shared finale. No points—just your best strange idea.',
    },
    questions: [
      activity('q17', 'Wählt jeweils ein sichtbares Ding oder eine Farbe. Verbindet beides zu einem Produkt und erfindet gemeinsam den Werbespruch.', 'Each choose one visible thing or colour. Combine them into a product and invent its slogan together.'),
      activity('q18', 'Gebt drei sichtbaren Dingen Rollen in einer Mini-Szene. Erzählt gemeinsam, was passiert – ohne etwas zu bewegen.', 'Give three visible things roles in a tiny scene. Tell what happens together—without moving anything.'),
      activity('q19', 'Beginnt mit einem sichtbaren Detail eine Geschichte. Wechselt euch Satz für Satz ab, bis ihr vier Sätze habt.', 'Start a story from one visible detail. Alternate one sentence at a time until you have four sentences.'),
      activity('q20', 'Erfindet eine Folge aus drei kleinen Signalen – Gesten, Geräusche oder Wörter. Ihr könnt euch abwechseln; Gleichzeitigkeit und Körperkontakt sind nicht nötig.', 'Invent a sequence of three small signals—gestures, sounds, or words. You can take turns; synchronization and physical contact are not required.'),
      activity('q21', 'Macht einen kurzen Trailer für diesen Ort. Wählt jeweils Stimme, Geräusch, Geste oder Beschreibung; es gibt kein Zeitlimit.', 'Make a short trailer for this place. Each choose voice, sound, gesture, or description; there is no time limit.'),
      activity('q22', 'Erfindet gemeinsam ein viel zu bedeutungsvolles Museumsschild für einen gewöhnlichen Gegenstand in eurer Nähe. Drückt es so aus, wie ihr beide es nutzen könnt.', 'Together, invent an excessively meaningful museum label for an ordinary object nearby. Express it in a way you can both use.'),
      activity('q23', 'Erfindet ein Mini-Spiel mit genau einer verrückten, aber sicheren Regel. Ihr müsst es nicht ausprobieren.', 'Invent a mini-game with exactly one strange but safe rule. You do not have to try it.'),
      activity('q24', 'Gebt eurer gemeinsamen Runde einen Titel und erfindet das vollkommen unnötige Motto dazu.', 'Give your shared round a title and invent its completely unnecessary motto.'),
    ],
  },
];

OFF_SCRIPT_ACTS[2].questions[7].last = true;

const OFF_SCRIPT_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 12,
    actIndices: [[0, 2, 5], [0, 2, 4], [0, 2, 4]],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 24,
    actIndices: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 7]],
  },
};

export const OFF_SCRIPT_PACK = {
  id: 'off-script',
  title: { de: 'OFF SCRIPT', en: 'OFF SCRIPT' },
  meta: { de: 'Kooperative Mini-Aktivitäten', en: 'Cooperative mini activities' },
  blurb: {
    de: 'Sehen, spielen, erfinden – albern, gemeinsam und ohne Punkte.',
    en: 'Notice, perform, and invent—silly, cooperative, and unscored.',
  },
  positioning: {
    de: 'OFF SCRIPT besteht aus kurzen Aktivitäten für zwei Menschen. Bleibt in eurem sicheren Bereich, verwendet nur Dinge, die euch gehören oder frei benutzt werden dürfen, und lasst jede Karte aus, die nicht zur Umgebung oder zu euren Möglichkeiten passt. Nichts muss aufgenommen, gepostet oder vor anderen aufgeführt werden. Wählt für jede Karte eine Form, die ihr beide gut wahrnehmen und nutzen könnt: sprechen, gebärden, schreiben, zeigen, beschreiben, ein Geräusch oder eine kleine Bewegung. Nichts muss schnell, gleichzeitig oder sichtbar gelöst werden; eine Beschreibung zählt immer.',
    en: 'OFF SCRIPT contains short activities for two people. Stay within your safe area, use only things you own or may freely use, and pass on any card that does not suit the setting or your abilities. Nothing needs to be recorded, posted, or performed for other people. For each card, choose a form you can both perceive and use: speaking, signing, writing, pointing, describing, a sound, or a small movement. Nothing has to be fast, simultaneous, or solved visually; a description always counts.',
  },
  discoverability: 'menu-unlock',
  libraryGroup: 'activities',
  privateMoment: 'none',
  defaultTimerEnabled: false,
  acts: OFF_SCRIPT_ACTS,
  modes: [{
    id: 'cooperative',
    title: { de: 'GEMEINSAM', en: 'COOPERATIVE' },
    meta: { de: 'Ohne Punkte oder Gewinner', en: 'No points or winners' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: NO_TWISTS,
  }],
  actStyle: [
    { accent: '#F6C453', chrome: 1, progress: 'full', glow: 0.26 },
    { accent: '#F184A1', chrome: 0.55, progress: 'count', glow: 0.16 },
    { accent: '#76D6C5', chrome: 0.25, progress: 'number', glow: 0.08 },
  ],
  q37: { neither: { de: '', en: '' }, one: () => '', both: { de: '', en: '' } },
  directFinale: {
    de: 'OFF SCRIPT endet hier. Wenn ihr möchtet, gebt irgendeinem absurden Einfall noch einen letzten Gruß – oder beendet die Runde einfach hier.',
    en: 'OFF SCRIPT ends here. If you like, give any absurd idea one last nod—or simply finish the round here.',
  },
  // Required by the shared pack shape; no private moment is enabled.
  secretAtIndex: 7,
  routes: OFF_SCRIPT_ROUTES,
  defaultRouteId: 'quick',
};
