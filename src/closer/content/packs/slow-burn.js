import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const card = (de, en, requiresVerbalAgreement = false, kind = 'orientation') => ({
  de,
  en,
  requiresVerbalAgreement,
  kind,
});

const actCards = [
  [
    card('Vor jeder Berührung wählt ihr jeweils eine Option: ruhiger · heller oder dunkler · wärmer oder kühler · mehr Abstand · andere Unterlage · keine Änderung. Nutzt nur Änderungen, die für euch beide passen.', 'Before any touch, each choose one: quieter · brighter or dimmer · warmer or cooler · more space · different surface · no change. Use only changes that work for both.'),
    card('Wählt jeweils eine Position, die ihr leicht verlassen oder ändern könnt: sitzend, liegend, stehend oder eine andere gut gestützte Position. Keine Position ist Teil einer Herausforderung.', 'Each choose a position you can leave or change easily: sitting, lying, standing, or another supported position. No position is part of the challenge.'),
    card('Ohne Berührung wählt jede Person einen Abstand. Verwendet den größeren gewünschten Abstand. Beide Personen können jederzeit mehr Abstand schaffen. Blickkontakt ist optional.', 'With no touch, each person chooses a distance. Use the greater requested distance. Either person can create more space at any time. Looking at each other is optional.'),
    card('Zieht eine ruhige Berührung von Hand zu Hand in Betracht. Die empfangende Person benennt Handfläche, Handrücken oder eine andere gut erreichbare Stelle sowie eine Höchstdauer. Beide Personen können früher stoppen.', 'Consider one still hand-to-hand touch. The receiver names palm, back of hand, or another reachable part of the hand and a maximum duration. Either person may stop sooner.', true, 'touch'),
    card('Die empfangende Person zeigt an der eigenen Hand – oder sagt bzw. tippt –, wie sanft oder fest es angenehm ist. Die gebende Person kann genau diesen Druck an der gewählten Stelle der Hand ausprobieren.', 'The receiver shows on their own hand—or says or taps—how light or firm feels welcome. The giver may try that exact pressure on the chosen hand area.', true, 'touch'),
    card('Zieht eine Berührung an einer bequem erreichbaren Stelle des Unterarms in Betracht – über der Kleidung, falls dort Kleidung ist. Die empfangende Person benennt Stelle, ruhigen Kontakt oder eine Bewegung und eine Höchstdauer.', 'Consider touch on one comfortably reachable part of the forearm, over clothing if present. The receiver names the place, still contact or one movement, and a maximum duration.', true, 'touch'),
    card('Was passt jetzt? Ohne Berührung bleiben · eine bereits gewählte Berührung genau wiederholen · mehr Abstand schaffen · zum nächsten Akt wechseln · beenden. Keine Wahl ist besser oder höher.', 'What fits now? Stay with no touch · repeat an already chosen touch exactly · create more space · move to the next act · end. No choice is better or higher.', false, 'direction'),
  ],
  [
    card('Zieht eine Form von Körperkontakt in Betracht: seitlicher Kontakt · eine kurze Umarmung · eine andere zugängliche Form, bei der beide das eigene Gewicht tragen · keine. Benennt Position und Höchstdauer.', 'Consider one form of body contact: side-by-side contact · a brief embrace · another accessible form where each person supports their own weight · none. Name the position and maximum duration.', true, 'touch'),
    card('Zieht eine Stelle im Gesicht, an der Kopfhaut oder an den Haaren in Betracht – oder lasst diese Kategorie aus. Die empfangende Person benennt die genaue Stelle und ruhigen Kontakt oder eine sanfte Bewegung. Nicht ziehen.', 'Consider one place on the face, scalp, or hair—or skip this category. The receiver names the exact place and still contact or one gentle movement. Avoid pulling.', true, 'touch'),
    card('Zieht eine äußerliche Stelle an Bauch, seitlichem Oberkörper, Hüften oder Außenseiten der Beine über der Kleidung in Betracht. Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien und Anus sind ausgeschlossen. Die empfangende Person benennt eine genaue Stelle.', 'Consider one external area on the abdomen, side of the torso, hips, or outer legs, over clothing. This excludes chest/breasts, buttocks, inner thighs, genitals, and anus. The receiver names one exact place.', true, 'touch'),
    card('Zieht einen Kuss an Stirn, Wange, Hand, Schulter oder einer anderen bereits geöffneten äußerlichen Stelle in Betracht – oder wählt keinen Kuss. Die empfangende Person benennt die genaue Stelle. Stoppt nach einem Kuss.', 'Consider one kiss on the forehead, cheek, hand, shoulder, or another already opened external area—or choose no kiss. The receiver names the exact place. Stop after one kiss.', true, 'kiss'),
    card('Zieht einen Kuss auf den Mund in Betracht. Das ist eine eigene Entscheidung, auch wenn ein anderer Kuss bereits gewählt wurde. Küsst euch einmal und stoppt; beide Personen können vorher oder währenddessen stoppen.', 'Consider one kiss on the mouth. This is a separate choice even if another kiss was already chosen. Kiss once and stop; either person may stop before or during contact.', true, 'kiss'),
    card('Benennt eine frühere Handlung ohne Berührung oder mit Berührung, zu der ihr zurückkehren möchtet. Bei einer Berührung entscheidet ihr neu über die genaue Handlung. Zurückzukehren ist kein Rückschritt.', 'Name one earlier no-touch or touch action to return to. For touch, choose again on the exact action. Returning is not a step backward.', true, 'touch'),
    card('Was passt jetzt? Hier bleiben · etwas Angenehmes genau wiederholen · Optionen aus Akt III in Betracht ziehen · mehr Abstand schaffen · beenden.', 'What fits now? Stay here · repeat an exact favorite · consider Act III choices · create more space · end.', false, 'direction'),
  ],
  [
    card('Wählt getrennt: bei den derzeit gewählten Optionen bleiben · eine andere passende Kategorie in Betracht ziehen · mehr Abstand schaffen · zum Abschluss wechseln · jetzt beenden. Keine Richtung ist das „höhere“ Ergebnis.', 'Choose separately: stay with the currently chosen options · consider one different fitting category · create more space · move to a close · end now. No direction is the “higher” result.', false, 'direction'),
    card('Wählt eine bereits gewählte Handlung und wiederholt sie genauso wie zuvor. Verstärkt sie nicht. Die empfangende Person legt die Höchstdauer fest; beide Personen können früher stoppen.', 'Choose one already selected action to repeat exactly as it was. Do not intensify it. The receiver sets the maximum duration; either person may stop sooner.', true, 'touch'),
    card('Zieht für eine bereits gewählte äußerliche Stelle nur diese Änderung in Betracht: über der Kleidung bleiben · direkt auf der Haut berühren · diese Stelle schließen. Direkter Hautkontakt schließt Brust/Brüste, Gesäß, Innenseiten der Oberschenkel, Genitalien und Anus aus.', 'For one already selected external area, consider only this change: stay over clothing · touch directly on skin · close this area. Direct skin contact excludes chest/breasts, buttocks, inner thighs, genitals, and anus.', true, 'touch'),
    card('Für eine bereits gewählte äußerliche Stelle kann die empfangende Person einen Weg führen, zeigen oder beschreiben. Die gebende Person geht nicht darüber hinaus und stoppt, wenn die Führung endet.', 'For one already selected external area, the receiver may guide, point out, or describe one path. The giver does not continue beyond it and stops when the guidance ends.', true, 'touch'),
    card('Zieht bei einem bereits gewählten Kuss auf den Mund in Betracht, ohne Zeitvorgabe weiterzumachen. Beide Personen können jederzeit Abstand schaffen; Abstand bedeutet stoppen und nachfragen, nicht folgen.', 'For an already selected mouth kiss, consider continuing without a timer. Either person can create distance at any moment; distance means stop and check, not follow.', true, 'kiss'),
    card('Wählt eine Pause ohne Berührung. Beide Personen finden eine bequeme Position und einen passenden Abstand. Danach muss nichts passieren.', 'Choose a no-touch pause. Each person finds a comfortable position and distance. Nothing needs to happen next.'),
    card('Wechselt zum Abschluss, ohne eine neue Berührungskategorie hinzuzufügen: Abstand · ruhige Nähe · bereits gewähltes Händehalten · bereits gewählte Umarmung · Wasser oder praktische Bequemlichkeit · ein kurzer Check-in-Satz · jetzt beenden.', 'Move to a close without adding a new touch category: space · quiet nearness · an already selected handhold · an already selected embrace · water or practical comfort · one check-in sentence · end now.', false, 'direction'),
  ],
];

const actMeta = [
  {
    id: 'arrive',
    title: { de: 'ANKOMMEN', en: 'ARRIVE' },
    intro: { de: 'Umgebung, Abstand und erste klar gewählte Berührung.', en: 'Setting, distance, and first clearly chosen touch.' },
    breakText: { de: 'Ihr habt euren eigenen Anfang gewählt.', en: 'You chose your own beginning.' },
  },
  {
    id: 'build',
    title: { de: 'AUFBAU', en: 'BUILD' },
    intro: { de: 'Nähe, äußerliche Berührung und Küsse – fragt einander direkt, bevor ihr etwas Neues beginnt.', en: 'Closeness, external touch, and kissing—ask each other directly before beginning something new.' },
    breakText: { de: 'Aufbau bedeutet bessere Abstimmung, nicht automatisch mehr Intensität.', en: 'Building means better responsiveness, not automatically more intensity.' },
  },
  {
    id: 'choose',
    title: { de: 'WÄHLEN', en: 'CHOOSE' },
    intro: { de: 'Bleiben, verändern, zurückgehen oder abschließen – ohne vorgegebenes Ziel.', en: 'Stay, vary, step back, or close—with no required destination.' },
    breakText: { de: 'Ihr habt die Richtung selbst gewählt.', en: 'You chose the direction yourselves.' },
  },
];

const acts = actMeta.map((act, actIndex) => ({
  ...act,
  questions: actCards[actIndex].map((question, questionIndex) => ({
    ...question,
    id: `slow-burn-q${String(actIndex * 7 + questionIndex + 1).padStart(2, '0')}`,
    ...(actIndex === 2 && questionIndex === 6 ? { last: true } : {}),
  })),
}));

const localized = (de, en) => ({ de, en });

export const SLOW_BURN_PACK = {
  id: 'slow-burn',
  discoverability: 'menu-unlock',
  contentGroup: 'adult',
  discoveryNoticeKey: 'slowBurnMenuIntro',
  privateMoment: 'none',
  title: { de: 'SLOW BURN', en: 'SLOW BURN' },
  meta: { de: '18+ · Berührung, Tempo und Küsse', en: '18+ · Touch, tempo, and kissing' },
  blurb: {
    de: 'Eine körperliche Anleitung, bei der ihr Wünsche und Grenzen direkt miteinander besprecht. Kein vorgegebenes Ziel.',
    en: 'A physical guide where you discuss wishes and boundaries directly with each other. No required destination.',
  },
  positioning: {
    de: 'SLOW BURN ist eine berührungsorientierte Anleitung für zwei Erwachsene. Sprecht vor dem Start kurz miteinander ab, ob ihr das beide möchtet. Fragt vor jeder neuen Berührung direkt nach, hört auf ein klares Ja und sagt Wünsche wie sanfter, langsamer, anders, nicht dort, Pause oder Stopp zueinander – nicht zur App. Es gibt kein Ziel und ihr könnt jederzeit auslassen oder beenden. Enthalten sind optionale Nähe, äußerliche Berührungen und Küsse, aber keine Penetration, Atem- oder Halsspiele, Fesseln, Schläge oder Überraschungsberührungen.',
    en: 'SLOW BURN is a touch-forward guide for two adults. Before starting, briefly agree with each other that you both want this. Ask directly before each new touch, wait for a clear yes, and say wishes such as softer, slower, different, not there, pause, or stop to each other—not to the app. There is no goal, and you can skip or end at any time. It includes optional closeness, external touch, and kissing, but no penetration, breath or neck play, restraint, impact, or surprise touch.',
  },
  acts,
  modes: [{
    id: 'touch',
    title: { de: 'BERÜHRUNG', en: 'TOUCH' },
    meta: { de: 'Körperlich und selbstbestimmt', en: 'Physical and self-directed' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: NO_TWISTS,
  }],
  actStyle: [
    { accent: '#FF9A76', chrome: 1, progress: 'full', glow: 0.24 },
    { accent: '#F06F8B', chrome: 0.5, progress: 'count', glow: 0.14 },
    { accent: '#C7609D', chrome: 0.22, progress: 'number', glow: 0.06 },
  ],
  q37: { neither: localized('', ''), one: () => '', both: localized('', '') },
  secretAtIndex: 6,
  routes: {
    quick: {
      ...ROUTE_PRESETS.quick,
      minutes: 20,
      meta: localized('9 Einladungen', '9 invitations'),
      actIndices: [[0, 3, 6], [0, 3, 6], [0, 4, 6]],
    },
    standard: {
      ...ROUTE_PRESETS.standard,
      minutes: 40,
      meta: localized('15 Einladungen', '15 invitations'),
      actIndices: [[0, 1, 2, 3, 6], [0, 1, 2, 3, 6], [0, 1, 2, 4, 6]],
    },
    unhurried: {
      id: 'unhurried',
      title: localized('OHNE EILE', 'UNHURRIED'),
      meta: localized('Alle 21 Einladungen', 'All 21 invitations'),
      minutes: 60,
      actIndices: [null, null, null],
    },
  },
  defaultRouteId: 'standard',
  defaultTimerEnabled: false,
  directFinale: localized('Diese Session ist beendet. Eure Antworten und Entscheidungen wurden nicht gespeichert. Was danach passiert, ist eine neue Entscheidung.', 'This session is closed. Your answers and choices were not saved. What happens next is a new choice.'),
};
