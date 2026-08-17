import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const card = (de, en, requiresVerbalAgreement = false, kind = 'orientation') => ({
  de,
  en,
  requiresVerbalAgreement,
  kind,
});

const actCards = [
  [
    card('Macht den Raum gemeinsam angenehmer: Licht, Temperatur, Musik, Stille oder etwas anderes. Verändert nur, was für euch beide passt.', 'Make the space feel better together: light, temperature, music, quiet, or something else. Change only what works for both of you.'),
    card('Findet eine Position, in der ihr euch entspannt ansehen und leicht näherkommen oder wieder Abstand nehmen könnt.', 'Find a position where you can look at each other comfortably and easily move closer or create space again.'),
    card('Schaut einander für ein paar Atemzüge an, wenn es sich gut anfühlt. Achtet darauf, was die Stille und der Abstand mit der Spannung zwischen euch machen.', 'Look at each other for a few breaths if it feels good. Notice what the silence and distance do to the tension between you.'),
    card('Bringt eure Hände langsam zueinander. Die empfangende Person sagt, wo und wie der erste Kontakt angenehm wäre; beginnt erst dann.', 'Bring your hands slowly towards each other. The receiver says where and how the first contact would feel good; only then begin.', true, 'touch'),
    card('Erkundet eine Hand langsam mit Fingerspitzen oder Handfläche. Die empfangende Person führt mit Worten zu Druck, Tempo und Stelle.', 'Explore one hand slowly with fingertips or palm. The receiver guides pressure, pace, and location with words.', true, 'touch'),
    card('Lasst eine Berührung langsam über Unterarm und Ellbogen wandern – über Stoff oder Haut. Die empfangende Person bestimmt Richtung und Tempo.', 'Let a touch travel slowly along the forearm and elbow—over fabric or skin. The receiver sets direction and pace.', true, 'touch'),
    card('Haltet kurz inne und sagt einander nur, was jetzt passt: genauso · langsamer · näher · mehr Abstand · etwas anderes · Abschluss.', 'Pause briefly and tell each other only what fits now: just like this · slower · closer · more space · something different · close.', false, 'direction'),
  ],
  [
    card('Kommt so nah zusammen, wie es für euch beide gut ist: Schulter an Schulter, in einer Umarmung oder auf eine andere Weise. Bleibt einen Moment dort.', 'Come as close as feels good for both of you: shoulder to shoulder, in an embrace, or another way. Stay there for a moment.', true, 'touch'),
    card('Die empfangende Person wählt Gesicht, Haaransatz, Haare oder Nacken und beschreibt eine langsame Berührung, die dort gut wäre.', 'The receiver chooses face, hairline, hair, or nape and describes a slow touch that would feel good there.', true, 'touch'),
    card('Die empfangende Person wählt Rücken, Taille, Bauch, Hüfte oder Außenseite eines Beins und sagt, ob sie dort ruhigen Kontakt oder eine langsame Bewegung möchte.', 'The receiver chooses back, waist, abdomen, hip, or outer leg and says whether they want still contact or slow movement there.', true, 'touch'),
    card('Die empfangende Person nennt eine Stelle, an der sie jetzt einen langsamen Kuss möchte. Lasst den Kuss einen Moment länger dauern als erwartet.', 'The receiver names a place where they want a slow kiss now. Let the kiss last a moment longer than expected.', true, 'kiss'),
    card('Wenn ihr beide möchtet, küsst euch auf den Mund. Beginnt langsam, trennt euch nach einem Kuss wieder und sagt einander, was ihr beim nächsten gern anders oder genauso hättet.', 'If you both want to, kiss on the mouth. Begin slowly, separate after one kiss, and tell each other what you would like differently or the same next time.', true, 'kiss'),
    card('Die empfangende Person führt eine Hand zu einer Stelle, an der sie gerade gern berührt werden möchte, oder beschreibt die Stelle mit Worten. Bleibt genau dort.', 'The receiver guides a hand to a place where they would like to be touched now, or describes the place in words. Stay exactly there.', true, 'touch'),
    card('Wählt gemeinsam den Moment aus diesem Akt, den ihr länger wiederholen möchtet. Verändert nur das, was ihr einander direkt sagt.', 'Choose together the moment from this act that you want to repeat for longer. Change only what you say directly to each other.', false, 'direction'),
  ],
  [
    card('Sagt einander direkt, wo ihr jetzt gern berührt oder geküsst werden möchtet. Brust oder Brüste, Gesäß und Innenseiten der Oberschenkel dürfen genannt werden; Genitalien und Anus bleiben in diesem Guide außen vor.', 'Tell each other directly where you would like to be touched or kissed now. Chest or breasts, buttocks, and inner thighs may be named; genitals and anus remain outside this guide.', false, 'direction'),
    card('Wählt eine eben genannte Stelle. Berührt sie über Kleidung oder direkt auf der Haut und lasst die empfangende Person Druck, Rhythmus und Bewegung führen.', 'Choose one place just named. Touch it over clothing or directly on skin, and let the receiver guide pressure, rhythm, and movement.', true, 'touch'),
    card('Die empfangende Person legt ihre Hand auf die Hand der gebenden Person und führt sie langsam auf einem gewünschten Weg. Wenn die Führung endet, bleibt die Hand stehen.', 'The receiver places their hand over the giver’s hand and slowly guides it along a desired path. When the guidance ends, the hand becomes still.', true, 'touch'),
    card('Kehrt zu einem Kuss zurück. Eine Person gibt zunächst Tempo und Tiefe vor; danach könnt ihr wechseln oder genau dort bleiben.', 'Return to a kiss. One person sets the pace and depth at first; then you may switch or stay exactly there.', true, 'kiss'),
    card('Verbindet einen längeren Kuss mit genau einer Berührung, die ihr bereits miteinander benannt habt. Lasst alles andere weg und spürt, was die Kombination verändert.', 'Combine a longer kiss with exactly one touch you have already named together. Leave everything else out and notice what the combination changes.', true, 'kiss'),
    card('Macht eine Pause, ohne sofort Abstand zu nehmen. Sagt einander einen Moment, eine Berührung oder einen Kuss, den ihr besonders gern hattet.', 'Take a pause without immediately moving apart. Tell each other one moment, touch, or kiss you especially enjoyed.'),
    card('Entscheidet gemeinsam, wie der Guide endet: noch einen Lieblingsmoment wiederholen · ruhig nah bleiben · Abstand nehmen · ohne Guide privat weitermachen · jetzt abschließen. Danach moderiert das Smartphone nichts mehr.', 'Decide together how the guide ends: repeat one favourite moment · stay quietly close · create space · continue privately without the guide · close now. After that, the phone no longer moderates.'),
  ],
];

const actMeta = [
  {
    id: 'arrive',
    title: { de: 'SPANNUNG', en: 'TENSION' },
    intro: { de: 'Raum, Blick und die erste Berührung – langsam genug, um Vorfreude zu spüren.', en: 'Space, gaze, and the first touch—slow enough to feel the anticipation.' },
    breakText: { de: 'Aus Nähe ist spürbare Spannung geworden.', en: 'Closeness has become palpable tension.' },
  },
  {
    id: 'build',
    title: { de: 'NÄHE', en: 'CLOSENESS' },
    intro: { de: 'Mehr Körperkontakt, geführte Berührung und erste Küsse.', en: 'Closer body contact, guided touch, and first kisses.' },
    breakText: { de: 'Ihr habt herausgefunden, wie ihr einander näherkommen möchtet.', en: 'You found how you want to move closer to each other.' },
  },
  {
    id: 'choose',
    title: { de: 'HINGABE', en: 'SURRENDER' },
    intro: { de: 'Deutlicher sagen, sinnlicher führen und nur das vertiefen, was zwischen euch funktioniert.', en: 'Speak more clearly, guide more sensually, and deepen only what works between you.' },
    breakText: { de: 'Ihr habt euren eigenen Weg durch die Spannung gewählt.', en: 'You chose your own path through the tension.' },
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
  meta: { de: '18+ · Spannung, Berührung und Küsse', en: '18+ · Tension, touch, and kissing' },
  blurb: {
    de: 'Ein sinnlicher Guide, der von Blicken und ersten Berührungen zu intensiverer Nähe führt.',
    en: 'A sensual guide from looks and first touches towards more intense closeness.',
  },
  positioning: {
    de: 'SLOW BURN ist ein berührungsorientierter Guide für zwei Erwachsene. Sprecht vor dem Start kurz miteinander ab, ob ihr das beide möchtet. Sagt Wünsche, Änderungen, Pause und Stopp direkt zueinander – nicht zur App. Der Guide kann sinnliche Berührung, Küsse sowie Berührung an Brust oder Brüsten, Gesäß und Innenseiten der Oberschenkel enthalten. Genitalien, Anus, Penetration, Atem- oder Halsspiele, Fesseln, Schläge und Überraschungsberührungen sind nicht Teil dieses Guides. Ihr entscheidet selbst, wo er endet.',
    en: 'SLOW BURN is a touch-forward guide for two adults. Before starting, briefly agree with each other that you both want this. Say wishes, changes, pause, and stop directly to each other—not to the app. The guide may include sensual touch, kissing, and touch to the chest or breasts, buttocks, and inner thighs. Genitals, anus, penetration, breath or neck play, restraint, impact, and surprise touch are not part of this guide. You decide where it ends.',
  },
  acts,
  modes: [{
    id: 'touch',
    title: { de: 'BERÜHRUNG', en: 'TOUCH' },
    meta: { de: 'Sinnlich und selbstbestimmt', en: 'Sensual and self-directed' },
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
  directFinale: localized('Der Guide endet hier. Eure Worte und Entscheidungen wurden nicht gespeichert. Was danach passiert, entscheidet ihr ohne das Smartphone.', 'The guide ends here. Your words and choices were not saved. What happens next is for you to decide without the phone.'),
};
