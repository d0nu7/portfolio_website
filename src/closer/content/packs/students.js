import { NO_TWISTS, ROUTE_NEUTRAL_BLURB, ROUTE_PRESETS } from '../shared';

const question = (packId, id, de, en) => ({ id: `${packId}-${id}`, de, en });

const studentQuestion = (id, de, en) => question('students', id, de, en);

const STUDENT_ACTS = [
  {
    id: 'arrive',
    title: { de: 'ANKOMMEN', en: 'ARRIVE' },
    intro: {
      de: 'Beginnt mit kleinen Vorlieben und eurem Studienalltag. Es gibt keine richtige Art zu studieren.',
      en: 'Start with small preferences and everyday student life. There is no single right way to study.',
    },
    breakText: { de: 'Ihr kennt euren Studienalltag ein bisschen besser.', en: 'You know a little more about each other’s student life.' },
    breakSub: { de: 'Jetzt geht es um Lernen und Zusammenarbeit.', en: 'Next come learning and collaboration.' },
    questions: [
      studentQuestion('q01', 'Welche kleine Sache macht einen gewöhnlichen Studientag für dich besser?', 'What small thing makes an ordinary study day better for you?'),
      studentQuestion('q02', 'Was hilft dir, in den Lernmodus zu kommen?', 'What helps you shift into study mode?'),
      studentQuestion('q03', 'Welche Art von Ort hilft dir beim Denken – und warum?', 'What kind of place helps you think, and why?'),
      studentQuestion('q04', 'Welche Pause lädt dich eher auf: Ruhe, Bewegung, Essen, Reden oder etwas anderes?', 'What kind of break tends to recharge you: quiet, movement, food, talking, or something else?'),
      studentQuestion('q05', 'Welche harmlose Studiengewohnheit ist typisch für dich?', 'What harmless study habit is typical of you?'),
      studentQuestion('q06', 'Was hast du über deinen eigenen Rhythmus erst im Studium gelernt?', 'What did you only learn about your own rhythm after starting higher education?'),
      studentQuestion('q07', 'Welches Thema außerhalb deines Fachs macht dich gerade neugierig?', 'What topic outside your field are you curious about right now?'),
      studentQuestion('q08', 'Wie nimmst du neue Informationen am liebsten auf?', 'How do you most enjoy taking in new information?'),
      studentQuestion('q09', 'Welche unscheinbare Fähigkeit macht den Studienalltag leichter?', 'What underrated skill makes student life easier?'),
      studentQuestion('q10', 'Wie lernst du neue Mitstudierende am liebsten ohne großen Druck kennen?', 'How do you most enjoy getting to know new fellow students without much pressure?'),
      studentQuestion('q11', 'Was macht eine neue Umgebung für dich schneller vertraut?', 'What helps a new environment feel familiar sooner?'),
      studentQuestion('q12', 'Welche kleine Entdeckung aus deinem Studienalltag würdest du gern weiterempfehlen?', 'What small discovery from student life would you like to recommend?'),
    ],
  },
  {
    id: 'collaborate',
    title: { de: 'ZUSAMMEN LERNEN', en: 'LEARN TOGETHER' },
    intro: {
      de: 'Sprecht darüber, was Fragen, Feedback und gemeinsame Projekte angenehm macht. Nicht über Noten oder Vergleiche.',
      en: 'Talk about what makes questions, feedback, and shared projects feel good—not grades or comparisons.',
    },
    breakText: { de: 'Gute Zusammenarbeit darf unterschiedlich aussehen.', en: 'Good collaboration can take different forms.' },
    breakSub: { de: 'Zum Schluss geht es um Stärken, Zugehörigkeit und euren Weg.', en: 'Finish with strengths, belonging, and where you are heading.' },
    questions: [
      studentQuestion('q13', 'Welche Rolle übernimmst du in einem lockeren Team manchmal gern?', 'What role do you sometimes enjoy in a low-pressure team?'),
      studentQuestion('q14', 'Welche Reaktion hilft dir, eine unfertige Idee weiterzudenken?', 'What kind of response helps you develop an unfinished idea?'),
      studentQuestion('q15', 'Wie startet ihr eine gemeinsame Aufgabe so, dass alle gut hineinkommen?', 'How can a shared task begin so everyone can find a way into it?'),
      studentQuestion('q16', 'Was macht es dir leichter, eine Frage zu stellen?', 'What makes it easier for you to ask a question?'),
      studentQuestion('q17', 'Wie kommunizierst du bei gemeinsamer Arbeit am liebsten?', 'How do you prefer to communicate when working with others?'),
      studentQuestion('q18', 'Woran merkst du, dass ein Treffen wirklich hilfreich war?', 'How can you tell that a meeting was genuinely useful?'),
      studentQuestion('q19', 'Wie zeigst du freundlich, dass du gerade Fokus oder Raum brauchst?', 'How do you kindly signal that you need focus or space?'),
      studentQuestion('q20', 'Wie erhältst du Feedback am liebsten, wenn etwas noch nicht fertig ist?', 'How do you prefer to receive feedback when something is still unfinished?'),
      studentQuestion('q21', 'Wie kann jemand helfen, wenn du feststeckst, ohne dir die Aufgabe abzunehmen?', 'How can someone help when you are stuck without taking over the task?'),
      studentQuestion('q22', 'Was lässt einen Beitrag in einer Gruppe willkommen wirken?', 'What makes a contribution feel welcome in a group?'),
      studentQuestion('q23', 'Wie können Entscheidungen in einem Studierendenteam fair aufgeteilt werden?', 'How can decisions be shared fairly in a student team?'),
      studentQuestion('q24', 'Welche hilfreiche Lektion über Zusammenarbeit hast du bisher gelernt?', 'What useful lesson about collaboration have you learned so far?'),
    ],
  },
  {
    id: 'belong',
    title: { de: 'DEIN WEG', en: 'YOUR PATH' },
    intro: {
      de: 'Zum Schluss geht es um Stärken, hilfreiche Grenzen und eine Studiengemeinschaft, in der Menschen Platz haben.',
      en: 'Finish with strengths, useful boundaries, and a student community where people have room to belong.',
    },
    questions: [
      studentQuestion('q25', 'Welche Stärke möchtest du in deinem Studium öfter einsetzen?', 'What strength would you like to use more often in your studies?'),
      studentQuestion('q26', 'Welche neue Fähigkeit würdest du gern erkunden, ohne sie sofort beherrschen zu müssen?', 'What new skill would you like to explore without needing to master it right away?'),
      studentQuestion('q27', 'Was bedeutet Zugehörigkeit in einem Studienumfeld für dich persönlich?', 'What does belonging in a study environment mean to you personally?'),
      studentQuestion('q28', 'Welche Art von Unterstützung durch Mitstudierende ist für dich wirklich hilfreich?', 'What kind of support from fellow students is genuinely useful to you?'),
      studentQuestion('q29', 'Welche Form von Wertschätzung fühlt sich für dich angenehm an?', 'What form of appreciation feels comfortable to you?'),
      studentQuestion('q30', 'Was kann eine Gruppe tun, damit neue oder ruhigere Personen leichter Platz finden?', 'What can a group do to make room for people who are new or quieter?'),
      studentQuestion('q31', 'Welchem Projekt oder Thema würdest du im Studium gern einmal begegnen?', 'What project or topic would you like to encounter during your studies?'),
      studentQuestion('q32', 'Welche Grenze möchtest du in besonders vollen Phasen besser schützen?', 'What boundary would you like to protect better during especially busy periods?'),
      studentQuestion('q33', 'Wie hat das Studium deinen Blick auf etwas verändert?', 'How has higher education changed the way you see something?'),
      studentQuestion('q34', 'Welche kleine Hoffnung hast du für deinen aktuellen Studienabschnitt?', 'What small hope do you have for your current stage of study?'),
      studentQuestion('q35', 'Was würde eine gute Studiengemeinschaft für Menschen leichter machen?', 'What would a good student community make easier for people?'),
      studentQuestion('q36', 'Woran möchtest du dich später erinnern, wenn du an diese Studienphase zurückdenkst?', 'What would you like to remember when you look back on this stage of your studies?'),
    ],
  },
];

STUDENT_ACTS[2].questions[11].last = true;

const STUDENT_ROUTES = {
  quick: {
    ...ROUTE_PRESETS.quick,
    minutes: 15,
    actIndices: [[0, 3, 6, 9], [0, 3, 6, 9], [0, 3, 6, 9]],
  },
  standard: {
    ...ROUTE_PRESETS.standard,
    minutes: 30,
    actIndices: [[0, 1, 3, 4, 6, 7, 9, 10], [0, 1, 3, 4, 6, 7, 9, 10], [0, 1, 3, 4, 6, 7, 9, 10]],
  },
};

const FH_ACTS = [
  {
    id: 'urstein',
    title: { de: 'URSTEIN', en: 'URSTEIN' },
    intro: {
      de: 'Eine leichte, inoffizielle Runde über den Campus Urstein. Ihr braucht kein Insiderwissen.',
      en: 'A light, unofficial round about Campus Urstein. You do not need insider knowledge.',
    },
    breakText: { de: 'Der Campus bekommt langsam Persönlichkeit.', en: 'The campus is starting to gain a personality.' },
    breakSub: { de: 'Jetzt geht es um kreative Disziplinen und Projekte.', en: 'Next come creative disciplines and projects.' },
    questions: [
      question('fh-salzburg', 'q01', 'Was ist dir am Campus Urstein als Erstes aufgefallen?', 'What was the first thing you noticed about Campus Urstein?'),
      question('fh-salzburg', 'q02', 'Welchen Ort würdest du bei einer winzigen, persönlichen Campusführung zeigen?', 'What place would you include in a tiny personal campus tour?'),
      question('fh-salzburg', 'q03', 'Wenn die Ankunft mit der S3 einen Soundtrack hätte: Wie würde er klingen?', 'If arriving on the S3 had a soundtrack, what would it sound like?'),
      question('fh-salzburg', 'q04', 'Welche kleine Campus-Nebenquest würdest du neuen Studierenden geben?', 'What small campus side quest would you give a new student?'),
    ],
  },
  {
    id: 'create',
    title: { de: 'CREATIVE TECHNOLOGIES', en: 'CREATIVE TECHNOLOGIES' },
    intro: {
      de: 'Tauscht Neugier über Gestaltung, Medien und Technologie aus. Es geht nicht darum, wer schon was kann.',
      en: 'Share curiosity about design, media, and technology. This is not about who already knows what.',
    },
    breakText: { de: 'Unterschiedliche Disziplinen können einander überraschen.', en: 'Different disciplines can surprise each other.' },
    breakSub: { de: 'Zum Schluss geht es darum, euren eigenen Platz zu finden.', en: 'Finish by thinking about finding your own place.' },
    questions: [
      question('fh-salzburg', 'q05', 'Welche Mischung aus Code, Design, Film, Audio, Games oder Interaktion würdest du gern einmal in einem Projekt sehen?', 'What mix of code, design, film, audio, games, or interaction would you like to see in a project?'),
      question('fh-salzburg', 'q06', 'Welche Projektrolle würdest du gern einmal ausprobieren, ohne sie schon perfekt können zu müssen?', 'What project role would you like to try without needing to be good at it already?'),
      question('fh-salzburg', 'q07', 'Was macht es leichter, eine unfertige kreative Arbeit herzuzeigen?', 'What makes it easier to show unfinished creative work?'),
      question('fh-salzburg', 'q08', 'Was würde dich eher anziehen: Game Jam, Screening, Gastvortrag, Ausstellung oder etwas ganz anderes?', 'What would draw you in more: a game jam, screening, guest talk, exhibition, or something else entirely?'),
    ],
  },
  {
    id: 'find-your-way',
    title: { de: 'DEIN PLATZ', en: 'YOUR PLACE' },
    intro: {
      de: 'Zum Schluss geht es um Orientierung, Willkommen-Sein und einen guten Start – ohne dass ihr etwas versprechen müsst.',
      en: 'Finish with finding your bearings, feeling welcome, and making a good start—with no promises required.',
    },
    questions: [
      question('fh-salzburg', 'q09', 'Welchen harmlosen Tipp für einen angenehmen Tag in Urstein würdest du gern mit jemandem tauschen?', 'What harmless tip for a pleasant day at Urstein would you like to exchange with someone?'),
      question('fh-salzburg', 'q10', 'Welche Art von Kontakt hilft dir, dich in einer neuen Studienumgebung zu orientieren?', 'What kind of contact helps you find your bearings in a new study environment?'),
      question('fh-salzburg', 'q11', 'Welche kleine Idee könnte neuen Menschen im Department das Ankommen erleichtern?', 'What small idea could make it easier for new people to settle into the department?'),
      question('fh-salzburg', 'q12', 'Was würde dafür sorgen, dass sich dein Start in Urstein nach deinem eigenen anfühlt?', 'What would make your start at Urstein feel like your own?'),
    ],
  },
];

FH_ACTS[2].questions[3].last = true;

const basePack = {
  discoverability: 'menu-unlock',
  libraryGroup: 'situations',
  privateMoment: 'none',
  defaultTimerEnabled: false,
  modes: [{
    id: 'peer',
    title: { de: 'PEER', en: 'PEER' },
    meta: { de: 'Auf Augenhöhe', en: 'On equal footing' },
    blurb: ROUTE_NEUTRAL_BLURB,
    twists: NO_TWISTS,
  }],
  actStyle: [
    { accent: '#67C7B5', chrome: 1, progress: 'full', glow: 0.22 },
    { accent: '#7CA9F5', chrome: 0.52, progress: 'count', glow: 0.13 },
    { accent: '#E8BC65', chrome: 0.24, progress: 'number', glow: 0.07 },
  ],
  q37: { neither: { de: '', en: '' }, one: () => '', both: { de: '', en: '' } },
  secretAtIndex: 7,
};

export const STUDENTS_PACK = {
  ...basePack,
  id: 'students',
  title: { de: 'STUDENTS', en: 'STUDENTS' },
  meta: { de: 'Für erwachsene Mitstudierende', en: 'For adult fellow students' },
  blurb: {
    de: 'Studienalltag, Zusammenarbeit und Zugehörigkeit – ohne Noten oder Vergleiche.',
    en: 'Student life, collaboration, and belonging—without grades or comparisons.',
  },
  positioning: {
    de: 'STUDENTS ist für zwei freiwillig teilnehmende erwachsene Mitstudierende auf vergleichbarer Ebene. Es ist keine Bewertung, Beratung oder Konfliktklärung und nicht für Abhängigkeitsverhältnisse gedacht. Forschung zu Übergängen und sozialer Zugehörigkeit informierte die Themen; dieses Pack und seine Fragen wurden nicht wissenschaftlich validiert.',
    en: 'STUDENTS is for two voluntarily participating adult fellow students on comparable footing. It is not an assessment, advice service, or conflict intervention and is not designed for relationships involving authority or dependency. Research on transitions and social belonging informed the themes; this pack and its questions have not been scientifically validated.',
  },
  acts: STUDENT_ACTS,
  routes: STUDENT_ROUTES,
  defaultRouteId: 'quick',
  directFinale: {
    de: 'Die Runde endet hier. Vielleicht versteht ihr jetzt eine kleine Vorliebe, Stärke oder Art der Unterstützung besser – daraus entsteht keine Verpflichtung.',
    en: 'The round ends here. You may now understand one small preference, strength, or kind of support better—without creating any obligation.',
  },
};

export const FH_SALZBURG_PACK = {
  ...basePack,
  id: 'fh-salzburg',
  title: { de: 'FH SALZBURG', en: 'FH SALZBURG' },
  meta: { de: 'Inoffizielle Urstein-Edition', en: 'Unofficial Urstein edition' },
  blurb: {
    de: 'Ein leichter Einstieg für neue Studierende im Department Creative Technologies.',
    en: 'A light introduction for new students in the Creative Technologies Department.',
  },
  positioning: {
    de: 'Diese inoffizielle, unabhängig erstellte CLOSER-Edition ist für zwei freiwillig teilnehmende erwachsene Studierende auf vergleichbarer Ebene am Campus Urstein. Sie wird von der FH Salzburg weder herausgegeben noch empfohlen. Die Runde prüft kein Campuswissen und ersetzt keine offiziellen Informationen, Beratung oder Anlaufstellen.',
    en: 'This unofficial, independently created CLOSER edition is for two voluntarily participating adult students on comparable footing at Campus Urstein. It is neither published nor endorsed by Salzburg University of Applied Sciences. The round does not test campus knowledge and does not replace official information, advice, or support services.',
  },
  acts: FH_ACTS,
  routes: {
    quick: {
      ...ROUTE_PRESETS.quick,
      title: { de: 'CAMPUS START', en: 'CAMPUS START' },
      meta: { de: '12 Fragen · ca. 15 Min.', en: '12 questions · about 15 min' },
      minutes: 15,
      actIndices: [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]],
    },
  },
  defaultRouteId: 'quick',
  directFinale: {
    de: 'Das war eure inoffizielle Urstein-Runde. Nehmt mit, was hilfreich oder lustig war – mehr müsst ihr daraus nicht machen.',
    en: 'That was your unofficial Urstein round. Keep whatever felt useful or fun—you do not need to make anything more of it.',
  },
};
