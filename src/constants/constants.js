// Localised fields are { en, de }; see i18n/LanguageContext `tr`.
// Project texts follow: what it is, what was built, why it mattered.
export const projects = [
  {
    title: "Yokaisho",
    description: {
      en: "A board game with a tablet as its second layer: the physical board stays on the table while Unity and Vuforia AR bring Japanese y\u014dkai myths to life on screen. Student team project at FH Salzburg, winner of the Austrian CG Award 2015 for Best Game.",
      de: "Ein Brettspiel mit dem Tablet als zweiter Ebene: Das Spielbrett bleibt am Tisch, Unity und Vuforia AR erwecken japanische Y\u014dkai-Mythen am Bildschirm zum Leben. Studentisches Teamprojekt an der FH Salzburg, ausgezeichnet mit dem Austrian CG Award 2015 f\u00fcr das beste Spiel.",
    },
    image: "/images/yoka.webp",
    tags: [{ en: "Board game", de: "Brettspiel" }, "AR", "Android"],
    source: "https://realities.fh-salzburg.ac.at/projects/yokaisho",
    id: 0,
  },
  {
    title: "NIVA",
    description: {
      en: "A calm, non-violent exploration game: as a forest god, the player frees an enchanted forest from a mysterious infestation. Master's project at FH Salzburg, winner of the Austrian CG Awards 2016 for Best Game and Best Student Project.",
      de: "Ein ruhiges, gewaltfreies Exploration-Game: Als Waldgott befreit man einen verzauberten Wald von einem r\u00e4tselhaften Befall. Masterprojekt an der FH Salzburg, ausgezeichnet mit den Austrian CG Awards 2016 f\u00fcr das beste Spiel und das beste Studierendenprojekt.",
    },
    image: "/images/niva.webp",
    tags: [{ en: "Master's project", de: "Masterprojekt" }, "Game"],
    source: "https://www.nivagame.com/",
    id: 1,
  },
  {
    title: "EatAR",
    description: {
      en: "Mobile AR research prototype for estimating food portions for people with diabetes. Developed as part of my master's thesis using depth sensing and computer vision, and published at ISMAR and MobileHCI.",
      de: "Mobiler AR-Forschungsprototyp, der Menschen mit Diabetes beim Sch\u00e4tzen von Essensportionen hilft. Entstanden im Rahmen meiner Masterarbeit mit Depth Sensing und Computer Vision, publiziert bei ISMAR und MobileHCI.",
    },
    image: "/images/eat_ar.webp",
    tags: ["Tango", "Android"],
    source: "https://realities.fh-salzburg.ac.at/projects/eat-ar-tango",
    id: 2,
  },
  {
    title: "SmartSignCapture",
    description: {
      en: "Research project funded by netidee: sign language is captured with an ordinary smartphone and replayed by a 3D avatar on the web, with adjustable facial expressions. The aim was to make publishing content in sign language online much easier.",
      de: "Von netidee gef\u00f6rdertes Forschungsprojekt: Geb\u00e4rden werden mit einem normalen Smartphone erfasst und von einem 3D-Avatar im Web wiedergegeben, inklusive anpassbarer Mimik. Ziel war, Inhalte in Geb\u00e4rdensprache viel einfacher online ver\u00f6ffentlichen zu k\u00f6nnen.",
    },
    image: "/images/smartsigncapture.webp",
    tags: ["Android", "Web"],
    source: "https://realities.fh-salzburg.ac.at/projects/smart-sign-capture",
    id: 3,
  },
  {
    title: "Ecomedicine VR",
    description: {
      en: "VR breathing exergame from a joint research project of Paracelsus Medical University and FH Salzburg. It recreates the Krimml Waterfalls with photogrammetry and aims to bring their positive effects on the airways into a VR training.",
      de: "VR-Atem-Exergame aus einem gemeinsamen Forschungsprojekt der Paracelsus Medizinischen Privatuniversit\u00e4t und der FH Salzburg. Es bildet die Krimmler Wasserf\u00e4lle per Photogrammetrie nach und soll deren positive Wirkung auf die Atemwege in ein VR-Training holen.",
    },
    image: "/images/ecovr.webp",
    tags: ["VR", { en: "Photogrammetry", de: "Photogrammetrie" }],
    source: "https://realities.fh-salzburg.ac.at/projects/ecomedicine-vr",
    id: 4,
  },
];

export const Publications = [
  {
    year: 2022,
    title:
      "AirRes Mask: A Precise and Robust Virtual Reality Breathing Interface Utilizing Breathing Resistance as Output Modality.",
    authors:
      "Tatzgern, M., Domhardt, M., Wolf, M., Cenger, M., Emsenhuber, G., Dinic, R., Gerner, N. & Hartl, A.",
    webref:
      "https://dl.acm.org/doi/abs/10.1145/3491102.3502090",
    apaCite:
      "Tatzgern, M., Domhardt, M., Wolf, M., Cenger, M., Emsenhuber, G., Dinic, R., Gerner, N. & Hartl, A. (2022). AirRes Mask: A Precise and Robust Virtual Reality Breathing Interface Utilizing Breathing Resistance as Output Modality. In S. Barbosa, C. Lampe, C. Appert, D. A. Shamma, S. Drucker, J. Williamson & K. Yatani (eds.), Proceedings of the 2022 CHI Conference on Human Factors in Computing Systems (p./pp. 1-14), New York: ACM. ISBN: 9781450391573",
    doi: "https://doi.org/10.1145/3491102.3502090",
  },  
  {
    year: 2021,
    title:
      "Assessment of approach-avoidance tendencies in body image using a novel touchscreen paradigm.",
    authors:
      "Dondzilo L., Basanovic J., Bell J., Mills C., Dinic R., Blechert J.",
    webref:
      "https://www.sciencedirect.com/science/article/abs/pii/S0005791620301385?via%3Dihub",
    apaCite:
      "Dondzilo, L., Basanovic, J., Bell, J., Mills, C., Dinic, R., Blechert, J. (2021). Assessment of approach-avoidance tendencies in body image using a novel touchscreen paradigm. Journal of Behavior Therapy and Experimental Psychiatry, 70, 101612.",
    doi: "https://doi.org/10.1016/j.jbtep.2020.101612",
  },
  {
    year: 2020,
    title:
      "Measuring approach–avoidance tendencies towards food with touchscreen-based arm movements.",
    authors:
      "Meule A., Richard A., Lender A., Dinic R., Brockmeyer T., Rinck M., Blechert J.",
    webref: "https://link.springer.com/article/10.1007/s00426-019-01195-1",
    apaCite:
      "Meule, A., Richard, A., Lender, A., Dinic, R., Brockmeyer, T., Rinck, M., & Blechert, J. (2020). Measuring approach–avoidance tendencies towards food with touchscreen-based arm movements. Psychological research, 84(7), 1789-1800.",
    doi: "https://doi.org/10.1007/s00426-019-01195-1",
  },
  {
    year: 2019,
    title:
      "Approach–avoidance tendencies towards food: Measurement on a touchscreen and the role of attention and food craving.",
    authors: "Meule A., Lender A., Richard A., Dinic R., Blechert J.",
    webref:
      "https://www.sciencedirect.com/science/article/abs/pii/S0195666318314326",
    apaCite:
      "Meule, A., Lender, A., Richard, A., Dinic, R., Blechert, J. (2019). Approach–avoidance tendencies towards food: Measurement on a touchscreen and the role of attention and food craving. Appetite, 137, 145-151.",
    doi: "https://doi.org/10.1016/j.appet.2019.03.002",
  },
  {
    year: 2019,
    title:
      "Effects of a smartphone-based approach-avoidance intervention on chocolate craving and consumption: Randomized controlled trial.",
    authors: "Meule A., Richard A., Dinic R., Blechert J.",
    webref: "https://mhealth.jmir.org/2019/11/e12298",
    apaCite:
      "Meule, A., Richard, A., Dinic, R., & Blechert, J. (2019). Effects of a smartphone-based approach-avoidance intervention on chocolate craving and consumption: Randomized controlled trial. JMIR mHealth and uHealth, 7(11), e12298.",
    doi: "https://doi.org/10.2196/12298",
  },
  {
    year: 2017,
    title: "EatAR tango: results on the accuracy of portion estimation.",
    authors: "Dinic R., Stütz T.",
    webref: "https://ieeexplore.ieee.org/abstract/document/8088506",
    apaCite:
      "Dinic, R., & Stütz, T. (2017, October). EatAR tango: results on the accuracy of portion estimation. In 2017 IEEE International Symposium on Mixed and Augmented Reality (ISMAR-Adjunct) (pp. 284-287). IEEE.",
    doi: "https://doi.org/10.1109/ISMAR-Adjunct.2017.90",
  },
  {
    year: 2017,
    title:
      "EatAR tango: portion estimation on mobile devices with a depth sensor.",
    authors: "Dinic R., Domhardt M., Ginzinger S., Stütz T.",
    webref: "https://dl.acm.org/doi/abs/10.1145/3098279.3125434",
    apaCite:
      "Dinic, R., Domhardt, M., Ginzinger, S., & Stütz, T. (2017, September). EatAR tango: portion estimation on mobile devices with a depth sensor. In Proceedings of the 19th International Conference on Human-Computer Interaction with Mobile Devices and Services (pp. 1-7).",
    doi: "https://doi.org/10.1145/3098279.3125434",
  },
  {
    year: 2015,
    title:
      "Training of carbohydrate estimation for people with diabetes using mobile augmented reality.",
    authors:
      "Domhardt M., Tiefengrabner M., Dinic R., Fötschl U., Oostingh G. J., Stütz T.",
    webref: "https://journals.sagepub.com/doi/full/10.1177/1932296815578880",
    apaCite:
      "Domhardt, M., Tiefengrabner, M., Dinic, R., Fötschl, U., Oostingh, G. J., Stütz, T., ... & Ginzinger, S. W. (2015). Training of carbohydrate estimation for people with diabetes using mobile augmented reality. Journal of diabetes science and technology, 9(3), 516-524.",
    doi: "https://doi.org/10.1177/1932296815578880",
  },
  {
    year: 2014,
    title: "Evaluation der Interaktion mit einer AR-basierten Smartphone-App.",
    authors: "Domhardt M., Dinic R., Stütz T., Ginzinger S.",
    webref:
      "https://www.degruyter.com/document/doi/10.1524/9783110344486.165/html",
    apaCite:
      "Domhardt, M., Dinic, R., Stütz, T., & Ginzinger, S. (2014). Evaluation der Interaktion mit einer AR-basierten Smartphone-App. In Mensch und Computer 2014–Tagungsband (pp. 165-174). De Gruyter Oldenbourg.",
    doi: "https://doi.org/10.1524/9783110344486.165",
  },
  {
    year: 2014,
    title: "A mobile augmented reality system for portion estimation.",
    authors: "Stütz T., Dinic R., Domhardt M., Ginzinger S.",
    webref: "https://ieeexplore.ieee.org/abstract/document/6948496",
    apaCite:
      "Stütz, T., Dinic, R., Domhardt, M., & Ginzinger, S. (2014, September). A mobile augmented reality system for portion estimation. In 2014 IEEE International Symposium on Mixed and Augmented Reality (ISMAR) (pp. 375-376). IEEE.",
    doi: "https://doi.org/10.1109/ISMAR.2014.6948496",
  },
  {
    year: 2014,
    title:
      "Can mobile augmented reality systems assist in portion estimation? A user study.",
    authors: "Stütz T., Dinic R., Domhardt M., Ginzinger S.",
    webref: "https://ieeexplore.ieee.org/abstract/document/6935438",
    apaCite:
      "Stütz, T., Dinic, R., Domhardt, M., & Ginzinger, S. (2014, September). Can mobile augmented reality systems assist in portion estimation? A user study. In 2014 IEEE international symposium on mixed and augmented reality-media, art, social science, humanities and design (ISMAR-MASH'D) (pp. 51-57). IEEE.",
    doi: "https://doi.org/10.1109/ISMAR-AMH.2014.6935438",
  },
];

// "What I do": the three things people come to this site for.
export const services = [
  {
    id: "teaching",
    title: { en: "Teaching & Research", de: "Lehre & Forschung" },
    text: {
      en: "Senior Lecturer at FH Salzburg. I teach how games, vision systems and AI actually work, with a research background in mixed reality, HCI and digital health.",
      de: "Senior Lecturer an der FH Salzburg. Ich unterrichte, wie Games, Vision-Systeme und KI tats\u00e4chlich funktionieren, mit Research-Hintergrund in Mixed Reality, HCI und Digital Health.",
    },
    items: [
      "Game Development, Game Production Environments (Unity 6)",
      "Artificial Intelligence for Games",
      "Computer Vision",
      "AI Literacy",
      { en: "Rapid Prototyping, bachelor's and master's projects", de: "Rapid Prototyping, Bachelor- und Masterprojekte" },
    ],
  },
  {
    id: "training",
    title: { en: "AI Training", de: "KI-Schulungen" },
    text: {
      en: "Hands-on AI training for teams, public administration and leadership. Clear, practical, EU AI Act included.",
      de: "Praxisnahe KI-Schulungen f\u00fcr Teams, \u00f6ffentliche Verwaltung und F\u00fchrungskr\u00e4fte. Klar, praktisch, inklusive EU AI Act.",
    },
    items: [
      { en: "Salzburg Administration Academy (SVAK)", de: "Salzburger Verwaltungsakademie (SVAK)" },
      { en: "Salzburg municipalities", de: "Salzburger Gemeinden" },
      { en: "Companies and leadership teams", de: "Unternehmen und F\u00fchrungsteams" },
      { en: "Talks for schools, adult education and alumni", de: "Vortr\u00e4ge f\u00fcr Schulen, Erwachsenenbildung und Alumni" },
    ],
    link: { href: { en: "/ai-training/", de: "/de/ki-schulungen/" }, label: { en: "Formats & prices", de: "Formate & Preise" } },
  },
  {
    id: "development",
    title: { en: "Development", de: "Entwicklung" },
    text: {
      en: "Interactive prototypes and tools, from game mechanics to computer vision pipelines, built with a small network of collaborators.",
      de: "Interaktive Prototypen und Tools, von Game-Mechaniken bis zu Computer-Vision-Pipelines, gebaut mit einem kleinen Netzwerk an Kolleg:innen.",
    },
    items: [
      { en: "Games and interactive installations", de: "Games und interaktive Installationen" },
      { en: "AR / VR applications", de: "AR-/VR-Anwendungen" },
      { en: "Computer vision and AI tools", de: "Computer-Vision- und KI-Tools" },
      { en: "Research prototypes", de: "Forschungsprototypen" },
    ],
  },
];

// "Now": what currently takes up the brain space.
export const nowTopics = [
  {
    title: { en: "Generative AI & AI Literacy", de: "Generative KI & AI Literacy" },
    text: {
      en: "Teaching, workshops, workflows and responsible use, for students and public-sector teams alike.",
      de: "Lehre, Workshops, Workflows und verantwortungsvoller Einsatz, f\u00fcr Studierende genauso wie f\u00fcr Teams in der Verwaltung.",
    },
  },
  {
    title: "AI for Games",
    text: {
      en: "Agents, behaviour, generative systems and a lot of experimentation.",
      de: "Agents, Verhalten, generative Systeme und viel Experimentieren.",
    },
  },
  {
    title: "Computer Vision",
    text: {
      en: "From classic OpenCV pipelines to modern vision models.",
      de: "Von klassischen OpenCV-Pipelines bis zu modernen Vision-Modellen.",
    },
  },
  {
    title: { en: "Teaching & Prototyping", de: "Lehre & Prototyping" },
    text: {
      en: "Turning emerging technology into something students and teams can actually try.",
      de: "Neue Technologie so aufbereiten, dass Studierende und Teams sie wirklich ausprobieren k\u00f6nnen.",
    },
  },
];

// Labels for the talk types, shown as small tags.
export const talkTypes = {
  talk: { en: "Talk", de: "Vortrag" },
  workshop: { en: "Workshop", de: "Workshop" },
  training: { en: "Training", de: "Schulung" },
  interview: { en: "Interview", de: "Interview" },
  media: { en: "Media", de: "Medien" },
};

// "Talks, Workshops & Media". Newest first; within a year talks and
// workshops before media. `href` only where a public page exists.
export const talks = [
  {
    year: "2026",
    type: "talk",
    org: { en: "WIFI Salzburg, Ausbilder:innen-Network 2026 (about 200 apprenticeship trainers)", de: "WIFI Salzburg, Ausbilder:innen-Network 2026 (rund 200 Lehrlingsausbilder:innen)" },
    title: { en: "How AI is changing the future of learning", de: "Wie KI die Zukunft des Lernens verändert" },
    href: "https://www.wifisalzburg.at/blog/detail/82-ausbilderinnen-network-2026-zweihundert-teilnehmerinnen-diskutierten-die-zukunft-der-lehre",
  },
  {
    year: "2026",
    type: "workshop",
    org: { en: "Salzburg Administration Academy (SVAK), Kompetenzwerkstatt", de: "Salzburger Verwaltungsakademie (SVAK), Kompetenzwerkstatt" },
    title: { en: "AI: vibe prompting for everyday leadership", de: "KI: Vibe Prompting f\u00fcr den F\u00fchrungsalltag" },
    href: "https://online.flippingbook.com/view/685043442/",
  },
  {
    year: "2026",
    type: "media",
    org: "Salzburger Nachrichten",
    title: {
      en: "Quoted on AI doomsday scenarios: \u201cDiese Horrorgeschichten bringen den Firmen Geld\u201d",
      de: "Zitiert zu KI-Weltuntergangsszenarien: \u201eDiese Horrorgeschichten bringen den Firmen Geld\u201c",
    },
    href: "https://www.sn.at/salzburg/chronik/diese-horrorgeschichten-bringen-den-firmen-geld-salzburger-experten-ueber-die-ki-weltuntergangsszenarien-art-674177",
  },
  {
    year: "2025\u201326",
    type: "training",
    org: { en: "Salzburg Administration Academy (SVAK)", de: "Salzburger Verwaltungsakademie (SVAK)" },
    title: { en: "AI training for public administration", de: "KI-Schulungen f\u00fcr die \u00f6ffentliche Verwaltung" },
    href: "https://www.svak.at/user/11358",
  },
  {
    year: "2025",
    type: "interview",
    org: "Salzburger Nachrichten",
    title: {
      en: "Schule und KI: \u201cKritisches Denken bleibt unerl\u00e4sslich\u201d",
      de: "Schule und KI: \u201eKritisches Denken bleibt unerl\u00e4sslich\u201c",
    },
    href: "https://www.sn.at/leben/karriere/schule-ki-kritisches-denken-180698800",
  },
  {
    year: "2024",
    type: "talk",
    org: { en: "St. Virgil Salzburg, AI conference", de: "St. Virgil Salzburg, KI-Fachtagung" },
    title: "K\u00fcnstliche Intelligenz heute. Anwendungen, Prognosen und die Grenzen der Vorhersage",
    href: "https://www.ots.at/presseaussendung/OTS_20240610_OTS0050/kuenstliche-intelligenz-gemischte-bilanz-ueber-chancen-und-gefahren-bild",
  },
  {
    year: "2024",
    type: "talk",
    org: "FH Salzburg Alumni & Career",
    title: "Von Sprachassistenten zu Denkfabriken",
    href: "https://www.fh-salzburg.ac.at/fhs/aktuelles/veranstaltungen/2024/04/alumni-career-vortrag-ki-online",
  },
];

export const awards = [
  { year: "2022", title: "Honorable Mention for Best Paper", org: "ACM CHI 2022, AirRes Mask", href: "https://doi.org/10.1145/3491102.3502090" },
  { year: "2017", title: { en: "Science Award", de: "Wissenschaftspreis" }, org: "AK Salzburg" },
  { year: "2016", title: { en: "Austrian CG Award: Best Game & Best Student Project", de: "Austrian CG Award: Bestes Spiel & Bestes Studierendenprojekt" }, org: "NIVA" },
  { year: "2015", title: { en: "Austrian CG Award: Best Game", de: "Austrian CG Award: Bestes Spiel" }, org: "Yokaisho" },
  { title: { en: "Medal for Disaster Relief", de: "Katastrophenhilfe-Medaille" }, org: { en: "State of Salzburg", de: "Land Salzburg" } },
];

export const TimeLineData = [
  { year: 2002, text: { en: "Sales and consulting", de: "Sales und Beratung" } },
  { year: 2014, text: "BSc MultiMediaTechnology" },
  { year: 2017, text: { en: "MSc, then research & teaching at MMT", de: "MSc, dann Forschung & Lehre am MMT" } },
  { year: 2020, text: { en: "Ludwig Boltzmann Institute for Digital Health", de: "Ludwig Boltzmann Institut f\u00fcr Digital Health" } },
  { year: 2021, text: { en: "Back at FH Salzburg as lecturer", de: "Zur\u00fcck an der FH Salzburg als Lecturer" } },
  { year: { en: "Today", de: "Heute" }, text: { en: "Senior Lecturer & AI trainer", de: "Senior Lecturer & KI-Trainer" } },
];
