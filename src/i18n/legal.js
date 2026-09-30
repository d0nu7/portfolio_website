// Legal notice (Impressum) and privacy policy, DE and EN.
// Facts per WKO member record (GISA 34062265) and the WKO sample imprint for
// sole traders not registered in the Firmenbuch. The EU ODR platform notice
// is deliberately absent: the ODR regulation was repealed as of 20 July 2025.
// Items are either [label, value] rows or paragraphs; a value may be
// { text, href } for a link.
const EMAIL = { text: 'contact@radi.solutions', href: 'mailto:contact@radi.solutions' };
const RIS = { text: 'www.ris.bka.gv.at', href: 'https://www.ris.bka.gv.at/' };
const DSB = { text: 'www.dsb.gv.at', href: 'https://www.dsb.gv.at/' };
const STAND = { de: 'Stand: September 2026', en: 'Last updated: September 2026' };

export const legal = {
  de: {
    title: 'Impressum',
    description: 'Impressum und Offenlegung von radi.solutions, Radomir Dinic, Hallein.',
    intro: 'Informationen gemäß § 5 E-Commerce-Gesetz, § 14 Unternehmensgesetzbuch und § 63 Gewerbeordnung sowie Offenlegung gemäß § 25 Mediengesetz.',
    sections: [
      {
        rows: [
          ['Name', 'Radomir Dinic, BSc MSc'],
          ['Rechtsform', 'Einzelunternehmer, nicht im Firmenbuch eingetragen'],
          ['Anschrift', 'Pingitzzerkai 6a/6, 5400 Hallein, Österreich'],
          ['E-Mail', EMAIL],
          ['Unternehmensgegenstand', 'KI-Schulungen, Workshops und Vorträge sowie Entwicklung interaktiver Anwendungen'],
          ['UID-Nummer', 'ATU77589478'],
          ['GISA-Zahl', '34062265'],
          ['Gewerbe', 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik (freies Gewerbe)'],
          ['Gewerbebehörde', 'Bezirkshauptmannschaft Hallein'],
          ['Kammerzugehörigkeit', 'Mitglied der Wirtschaftskammer Salzburg, Fachgruppe Unternehmensberatung, Buchhaltung und Informationstechnologie'],
          ['Berufsrecht', ['Gewerbeordnung, abrufbar unter ', RIS]],
        ],
      },
      {
        heading: 'Offenlegung gemäß § 25 Mediengesetz',
        paragraphs: [
          'Medieninhaber: Radomir Dinic, Hallein. Unternehmensgegenstand wie oben angeführt.',
          'Diese Website informiert über die berufliche Tätigkeit und die Leistungen von Radomir Dinic.',
        ],
      },
      {
        heading: 'Haftung für Links',
        paragraphs: [
          'Diese Website enthält Links zu externen Websites. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar; sollten solche bekannt werden, wird der Link umgehend entfernt.',
        ],
      },
    ],
    stand: STAND.de,
  },
  en: {
    title: 'Legal notice',
    description: 'Legal notice (Impressum) and disclosure for radi.solutions, Radomir Dinic, Hallein, Austria.',
    intro: 'Information pursuant to § 5 of the Austrian E-Commerce Act, § 14 of the Austrian Commercial Code and § 63 of the Austrian Trade Act, and disclosure pursuant to § 25 of the Austrian Media Act.',
    sections: [
      {
        rows: [
          ['Name', 'Radomir Dinic, BSc MSc'],
          ['Legal form', 'Sole trader, not registered in the Austrian commercial register'],
          ['Address', 'Pingitzzerkai 6a/6, 5400 Hallein, Austria'],
          ['Email', EMAIL],
          ['Business purpose', 'AI training, workshops and talks, and development of interactive applications'],
          ['VAT ID', 'ATU77589478'],
          ['GISA number', '34062265'],
          ['Trade licence', 'Services in automatic data processing and information technology (unregulated trade)'],
          ['Supervisory authority', 'District Authority of Hallein (Bezirkshauptmannschaft Hallein)'],
          ['Chamber membership', 'Member of the Salzburg Chamber of Commerce (Wirtschaftskammer Salzburg), trade group for management consulting, accounting and IT'],
          ['Professional regulations', ['Austrian Trade Act (Gewerbeordnung), available at ', RIS]],
        ],
      },
      {
        heading: 'Disclosure pursuant to § 25 of the Austrian Media Act',
        paragraphs: [
          'Media owner: Radomir Dinic, Hallein. Business purpose as stated above.',
          'This website provides information about the professional work and services of Radomir Dinic.',
        ],
      },
      {
        heading: 'Liability for links',
        paragraphs: [
          'This website contains links to external websites whose content is the sole responsibility of their operators. No legal violations were apparent at the time of linking; should any become known, the link will be removed promptly.',
        ],
      },
    ],
    stand: STAND.en,
  },
};

export const privacy = {
  de: {
    title: 'Datenschutzerklärung',
    description: 'Wie radi.solutions mit personenbezogenen Daten umgeht: keine Cookies, kein Tracking, Hosting bei Vercel.',
    intro: 'Der Schutz Ihrer Daten ist mir wichtig. Diese Website kommt ohne Cookies, Tracking, Analyse-Tools, Werbung und externe Schriftarten aus. Im Folgenden steht, welche Daten trotzdem verarbeitet werden und warum.',
    sections: [
      {
        heading: 'Verantwortlicher',
        rows: [
          ['Name', 'Radomir Dinic, BSc MSc'],
          ['Anschrift', 'Pingitzzerkai 6a/6, 5400 Hallein, Österreich'],
          ['E-Mail', EMAIL],
        ],
      },
      {
        heading: 'Hosting und Server-Logfiles',
        paragraphs: [
          'Die Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf einer Seite verarbeitet Vercel technisch notwendige Daten, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, zuvor besuchte Seite (Referrer) sowie Browser und Betriebssystem.',
          'Zweck ist die Auslieferung der Website sowie ihr stabiler und sicherer Betrieb. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und zuverlässigen Webauftritt). Vercel speichert diese Daten nur so lange, wie es dafür erforderlich ist.',
          'Vercel ist nach dem EU-U.S. Data Privacy Framework zertifiziert. Die Übermittlung in die USA erfolgt damit auf Grundlage des Angemessenheitsbeschlusses der EU-Kommission (Art. 45 DSGVO).',
        ],
      },
      {
        heading: 'Speicherung im Browser',
        paragraphs: [
          'Wenn Sie die Sprache (DE/EN) umschalten, wird diese Wahl im lokalen Speicher Ihres Browsers (localStorage, Eintrag „radi-language“) abgelegt, damit die Website Sie beim nächsten Besuch in Ihrer Sprache begrüßt. Die Information bleibt auf Ihrem Gerät, wird nicht an mich übermittelt und lässt sich jederzeit über die Browsereinstellungen löschen. Rechtsgrundlage ist § 165 Abs. 3 TKG 2021 (für den von Ihnen gewünschten Dienst unbedingt erforderlich).',
        ],
      },
      {
        heading: 'Kontakt per E-Mail',
        paragraphs: [
          'Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben (etwa Name, E-Mail-Adresse und Inhalt der Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung oder Erfüllung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO (Beantwortung allgemeiner Anfragen). Die Daten werden gelöscht, sobald sie nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.',
        ],
      },
      {
        heading: 'Externe Links',
        paragraphs: [
          'Links zu anderen Websites (etwa LinkedIn, GitHub, ResearchGate oder Medienberichte) werden erst beim Anklicken aufgerufen. Ab dann gilt die Datenschutzerklärung des jeweiligen Anbieters.',
        ],
      },
      {
        heading: 'Easter Egg in der Entwicklerkonsole',
        paragraphs: [
          'Nur wenn Sie in der Entwicklerkonsole Ihres Browsers den Befehl „radi.takeover()“ eingeben, ruft Ihr Browser aktuelle Schlagzeilen über die öffentliche Hacker-News-Suche von Algolia (hn.algolia.com) ab; dabei wird Ihre IP-Adresse an Algolia übermittelt. Ohne diesen Befehl findet keine solche Anfrage statt.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung, auf Datenübertragbarkeit sowie auf Widerspruch (Art. 15 bis 21 DSGVO). Wenden Sie sich dafür einfach per E-Mail an mich.',
          ['Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Österreichischen Datenschutzbehörde beschweren (Barichgasse 40–42, 1030 Wien, ', DSB, ').'],
        ],
      },
    ],
    stand: STAND.de,
  },
  en: {
    title: 'Privacy policy',
    description: 'How radi.solutions handles personal data: no cookies, no tracking, hosted on Vercel.',
    intro: 'Your privacy matters to me. This website uses no cookies, tracking, analytics, advertising or external fonts. Below is what data is still processed, and why.',
    sections: [
      {
        heading: 'Controller',
        rows: [
          ['Name', 'Radomir Dinic, BSc MSc'],
          ['Address', 'Pingitzzerkai 6a/6, 5400 Hallein, Austria'],
          ['Email', EMAIL],
        ],
      },
      {
        heading: 'Hosting and server logs',
        paragraphs: [
          'The website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. When a page is requested, Vercel processes technically necessary data, in particular the IP address, date and time, requested address, referring page, and browser and operating system.',
          'This serves to deliver the website and keep it stable and secure. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in a secure and reliable website). Vercel keeps this data only as long as needed for that purpose.',
          'Vercel is certified under the EU-U.S. Data Privacy Framework, so transfers to the USA are based on the European Commission\'s adequacy decision (Art. 45 GDPR).',
        ],
      },
      {
        heading: 'Storage in your browser',
        paragraphs: [
          'When you switch the language (DE/EN), your choice is saved in your browser\'s local storage (entry "radi-language") so the site greets you in your language next time. It stays on your device, is never sent to me, and can be deleted at any time in your browser settings. The legal basis is § 165(3) of the Austrian Telecommunications Act 2021 (strictly necessary for the service you requested).',
        ],
      },
      {
        heading: 'Contact by email',
        paragraphs: [
          'If you email me, I process your details (such as name, email address and message) to answer your enquiry. The legal basis is Art. 6(1)(b) GDPR (steps prior to or performance of a contract) or Art. 6(1)(f) GDPR (answering general enquiries). The data is deleted once it is no longer needed, unless statutory retention periods apply.',
        ],
      },
      {
        heading: 'External links',
        paragraphs: [
          'Links to other websites (such as LinkedIn, GitHub, ResearchGate or media reports) are only loaded when you click them. From then on, that provider\'s privacy policy applies.',
        ],
      },
      {
        heading: 'Developer console easter egg',
        paragraphs: [
          'Only if you type "radi.takeover()" into your browser\'s developer console does your browser fetch current headlines from Algolia\'s public Hacker News search (hn.algolia.com); this sends your IP address to Algolia. Without that command, no such request is made.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right of access, rectification, erasure, restriction of processing, data portability and objection (Art. 15 to 21 GDPR). Just email me.',
          ['If you believe the processing of your data violates data protection law, you can lodge a complaint with the Austrian Data Protection Authority (Barichgasse 40–42, 1030 Vienna, ', DSB, ').'],
        ],
      },
    ],
    stand: STAND.en,
  },
};
