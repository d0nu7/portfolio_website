// UI strings for the homepage and the shared chrome. Data (projects, talks,
// ...) lives in constants/constants.js with the same { en, de } shape.
// German addresses visitors with "du"; the training page keeps "Sie".
const home = {
  en: {
    hero: {
      title: 'Games, AI & interactive systems.',
      tagline: 'Teaching it. Building it. Making it understandable.',
      text: 'Senior Lecturer at FH Salzburg, developer and AI trainer. I teach game development, computer vision and AI, build interactive prototypes and help organisations understand what generative AI can actually do for them.',
      contact: 'Get in touch',
      training: 'AI training for teams',
    },
    work: { title: 'What I do' },
    now: {
      title: "What I'm working on now",
      intro: 'The older projects further down show where I come from. This is where my head is at today.',
    },
    projects: { title: 'Selected work', imageAlt: (title) => `${title} project screenshot`, tags: 'Tags' },
    talks: { title: 'Talks, Workshops & Media' },
    recognition: { title: 'Awards & Publications', awards: 'Selected awards & recognition', publications: 'Publications' },
    about: {
      title: 'About Me',
      paragraphs: [
        'I like technology most when it becomes tangible.',
        'I teach game development, computer vision and AI at Salzburg University of Applied Sciences, build interactive prototypes and help organisations understand what generative AI can actually do for them.',
        'My background runs from sales and consulting through computer vision and mixed reality research to games, software development and AI education. Much of my early applied research sat at the intersection of interactive technology and digital health, including work on diabetes, nutrition, behavioural research and VR-based health applications.',
        'That mix shapes how I work: technically curious, hands-on, and usually more interested in building and testing something than in talking about it in the abstract. (Says the person who gives talks. I know.)',
      ],
    },
    contact: {
      title: 'Got something to build, teach or untangle?',
      text: 'A course, a workshop for your team, a prototype or just a question about AI. Write me, I answer my own email.',
      training: 'AI training for teams',
    },
    nav: {
      work: 'What I do', now: 'Now', projects: 'Selected work', talks: 'Talks & Media',
      recognition: 'Awards & Publications', about: 'About', contact: 'Contact', training: 'AI training',
      menu: 'Menu', close: 'Close menu', skip: 'Skip to content',
    },
    footer: { legal: 'Legal notice', email: 'Email', services: 'Services', training: 'AI training' },
  },
  de: {
    hero: {
      title: 'Games, KI & interaktive Systeme.',
      tagline: 'Unterrichten. Bauen. Verständlich machen.',
      text: 'Senior Lecturer an der FH Salzburg, Entwickler und KI-Trainer. Ich unterrichte Game Development, Computer Vision und KI, baue interaktive Prototypen und helfe Organisationen zu verstehen, was generative KI für sie tatsächlich leisten kann.',
      contact: 'Schreib mir',
      training: 'KI-Schulungen für Teams',
    },
    work: { title: 'Was ich mache' },
    now: {
      title: 'Woran ich gerade arbeite',
      intro: 'Die älteren Projekte weiter unten zeigen, woher ich komme. Hier steht, was mich heute beschäftigt.',
    },
    projects: { title: 'Ausgewählte Projekte', imageAlt: (title) => `Screenshot des Projekts ${title}`, tags: 'Schlagworte' },
    talks: { title: 'Talks, Workshops & Medien' },
    recognition: { title: 'Auszeichnungen & Publikationen', awards: 'Ausgewählte Auszeichnungen', publications: 'Publikationen' },
    about: {
      title: 'Über mich',
      paragraphs: [
        'Technik gefällt mir am meisten, wenn sie greifbar wird.',
        'Ich unterrichte Game Development, Computer Vision und KI an der FH Salzburg, baue interaktive Prototypen und helfe Organisationen zu verstehen, was generative KI für sie tatsächlich leisten kann.',
        'Mein Weg führte von Sales und Beratung über Research in Computer Vision und Mixed Reality zu Games, Softwareentwicklung und KI-Lehre. Ein großer Teil meiner frühen angewandten Forschung lag an der Schnittstelle von interaktiver Technologie und Digital Health, etwa zu Diabetes, Ernährung, Verhaltensforschung und VR-basierten Gesundheitsanwendungen.',
        'Diese Mischung prägt, wie ich arbeite: technisch neugierig, hands-on und meistens mehr daran interessiert, etwas zu bauen und zu testen, als abstrakt darüber zu reden. (Sagt einer, der Vorträge hält. Ich weiß.)',
      ],
    },
    contact: {
      title: 'Du willst etwas bauen, lernen oder entwirren?',
      text: 'Eine Lehrveranstaltung, ein Workshop für dein Team, ein Prototyp oder einfach eine Frage zu KI. Schreib mir, ich beantworte meine E-Mails selbst.',
      training: 'KI-Schulungen für Teams',
    },
    nav: {
      work: 'Was ich mache', now: 'Aktuell', projects: 'Ausgewählte Projekte', talks: 'Talks & Medien',
      recognition: 'Auszeichnungen & Publikationen', about: 'Über mich', contact: 'Kontakt', training: 'KI-Schulungen',
      menu: 'Menü', close: 'Menü schließen', skip: 'Zum Inhalt springen',
    },
    footer: { legal: 'Impressum', email: 'E-Mail', services: 'Angebot', training: 'KI-Schulungen' },
  },
};

export default home;
