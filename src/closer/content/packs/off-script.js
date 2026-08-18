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
      activity('q04', 'Eine Person zeichnet die Form von etwas Sichtbarem mit dem Finger in die Luft. Die andere rät – ohne aufzustehen.', 'One person draws the shape of something visible in the air with a finger. The other guesses—without standing up.'),
      activity('q05', 'Zeigt einander ein leicht übersehbares Detail und gebt ihm eine völlig unpassende Superkraft.', 'Show each other an easily missed detail and give it a completely unsuitable superpower.'),
      activity('q06', 'Wählt etwas Sichtbares und erfindet eine harmlose neue Verwendung dafür. Ihr müsst sie nicht ausprobieren.', 'Choose something visible and invent a harmless new use for it. You do not have to try it.'),
      activity('q07', 'Sucht drei sichtbare Farben aus und benennt den erfundenen Ort, an dem sie die Nationalfarben sind.', 'Pick three visible colours and name the imaginary place where they are the national colours.'),
      activity('q08', 'Beschreibt eine Oberfläche in eurer Nähe wie einen Wetterbericht – nur anschauen, nichts anfassen nötig.', 'Describe a nearby surface like a weather forecast—looking is enough; no touching required.'),
    ],
  },
  {
    id: 'perform',
    title: { de: 'SPIELEN', en: 'PERFORM' },
    intro: {
      de: 'Jetzt kommen kurze Pantomimen, Geräusche und Minirollen. Alles funktioniert sitzend, leise oder nur mit den Händen.',
      en: 'Now come short mimes, sounds, and tiny roles. Everything can be done seated, quietly, or with hands only.',
    },
    breakText: { de: 'Kleine Bühne, erstaunlich großes Drama.', en: 'Tiny stage, surprisingly big drama.' },
    breakSub: { de: 'Zum Schluss erschafft ihr etwas gemeinsam.', en: 'To finish, you will create something together.' },
    questions: [
      activity('q09', 'Stellt eine harmlose Alltagstätigkeit pantomimisch dar. Die andere Person rät. Eine Handbewegung reicht vollkommen.', 'Mime a harmless everyday activity. The other person guesses. A single hand movement is plenty.'),
      activity('q10', 'Macht nacheinander ein Geräusch dafür, wie ein sichtbarer Gegenstand zum Leben erwacht. In ruhiger Umgebung: flüstern oder nur die Bewegung zeigen.', 'Take turns making a sound for a visible object coming alive. In a quiet setting, whisper or show only the movement.'),
      activity('q11', 'Nehmt eine Pose für einen erfundenen Beruf ein. Die andere Person gibt dem Beruf einen Namen. Sitzend ist perfekt.', 'Strike a pose for an imaginary job. The other person names the job. Seated is perfect.'),
      activity('q12', 'Spielt jeweils drei Sekunden lang eine übertriebene Zeitlupenreaktion auf ein völlig gewöhnliches Ereignis.', 'Each perform a three-second exaggerated slow-motion reaction to a completely ordinary event.'),
      activity('q13', 'Stellt nur mit euren Händen ein Tier oder einen Gegenstand dar. Die andere Person rät.', 'Use only your hands to portray an animal or object. The other person guesses.'),
      activity('q14', 'Eine Person erzählt eine absurde Ein-Satz-Regieanweisung. Die andere setzt sie nur so klein, leise und sicher um, wie es gerade passt; dann wechselt.', 'One person gives an absurd one-sentence stage direction. The other performs it only as small, quiet, and safe as the setting allows; then switch.'),
      activity('q15', 'Sagt dasselbe neutrale Wort in drei völlig verschiedenen Stimmungen. Die andere Person errät die Stimmungen.', 'Say the same neutral word in three completely different moods. The other person guesses the moods.'),
      activity('q16', 'Macht aus einer Handbewegung eine erfundene Kreatur. Die andere Person tauft sie und beschreibt ihre Spezialfähigkeit.', 'Turn a hand movement into an imaginary creature. The other person names it and describes its special ability.'),
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
      activity('q20', 'Erfindet eine kurze gemeinsame Bewegungsfolge aus drei Gesten. Kein Aufstehen und kein Körperkontakt nötig.', 'Invent a short shared sequence of three gestures. No standing or physical contact required.'),
      activity('q21', 'Macht einen Zehn-Sekunden-Trailer für diesen Ort: eine Person spricht die dramatische Stimme, die andere liefert Geräusch oder stumme Spezialeffekte.', 'Make a ten-second trailer for this place: one person provides the dramatic voice; the other adds a sound or silent special effect.'),
      activity('q22', 'Schreibt mündlich ein viel zu bedeutungsvolles Museumsschild für einen gewöhnlichen Gegenstand in eurer Nähe.', 'Compose an excessively meaningful museum label out loud for an ordinary object nearby.'),
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
    actIndices: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]],
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
    de: 'OFF SCRIPT besteht aus kurzen Aktivitäten für zwei Menschen. Bleibt in eurem sicheren Bereich, verwendet nur Dinge, die euch gehören oder frei benutzt werden dürfen, und lasst jede Karte aus, die nicht zur Umgebung oder zu euren Möglichkeiten passt. Nichts muss aufgenommen, gepostet oder vor anderen aufgeführt werden.',
    en: 'OFF SCRIPT contains short activities for two people. Stay within your safe area, use only things you own or may freely use, and pass on any card that does not suit the setting or your abilities. Nothing needs to be recorded, posted, or performed for other people.',
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
    de: 'OFF SCRIPT endet hier. Welcher absurde Einfall verdient einen letzten Ehrenapplaus?',
    en: 'OFF SCRIPT ends here. Which absurd idea deserves one final honorary round of applause?',
  },
  // Required by the shared pack shape; no private moment is enabled.
  secretAtIndex: 7,
  routes: OFF_SCRIPT_ROUTES,
  defaultRouteId: 'quick',
};
