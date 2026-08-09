import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import {
  ActChecklist,
  ActPanel,
  Actions,
  AddOnGrid,
  Eyebrow,
  FaqList,
  FinalCta,
  Hero,
  HeroCopy,
  HeroTitle,
  LanguageBar,
  LanguageSwitch,
  LegalNote,
  ModuleCard,
  ModuleGrid,
  Page,
  Price,
  PriceCard,
  PriceGrid,
  PricingNote,
  PrimaryAction,
  ProcessGrid,
  Recommended,
  SecondaryAction,
  Section,
  SectionHeading,
  Shell,
  Transparency,
  TrustRow,
} from "../styles/TrainingPageStyles";

const copy = {
  de: {
    title: "KI-Schulungen für Unternehmen und öffentliche Organisationen",
    description: "Praxisnahe Inhouse-Schulungen zu generativer KI, sicherer Anwendung und KI-Kompetenz nach Art. 4 EU AI Act.",
    eyebrow: "KI-SCHULUNGEN · SALZBURG · INHOUSE & ONLINE",
    heroTitle: "KI verstehen. Sicher anwenden. Arbeit erleichtern.",
    heroCopy: "Praxisnahe Schulungen für Teams, die generative KI nicht nur ausprobieren, sondern reflektiert, transparent und produktiv in ihren Arbeitsalltag integrieren möchten.",
    request: "Unverbindlich anfragen",
    packagesLink: "Pakete ansehen",
    trust: [
      ["Modular aufgebaut", "Vom kompakten Impuls bis zum zweitägigen Intensivformat"],
      ["Bis 15 Personen", "Geschlossene Gruppe mit Raum für die eigenen Fragen"],
      ["Dokumentiert", "Unterlagen und Teilnahmebestätigung inklusive"],
    ],
    priceEyebrow: "FORMATE & PREISE",
    priceTitle: "Klare Pakete. Genug Raum für Besonderheiten.",
    priceIntro: "Briefing, Modulauswahl und eine leichte Anpassung vorhandener Beispiele sind bereits enthalten. Zusätzliche Recherche und eigene Use Cases werden transparent ergänzt.",
    recommended: "Beliebtestes Format",
    from: "Fixpreis",
    net: "umsatzsteuerfrei · bis 15 Personen",
    pricingNote: "Alle Preise sind Orientierungswerte für geschlossene Gruppen. Gemäß § 6 Abs. 1 Z 27 UStG wird aufgrund der Kleinunternehmerregelung keine Umsatzsteuer berechnet. Raum, besondere Reisekosten und Nächtigung sind nicht enthalten. Ein verbindliches Angebot folgt nach einem kurzen Briefing.",
    packages: [
      { name: "KI-Impuls", price: "790 €", description: "Kompakter Einstieg für Teams und Entscheider:innen.", features: ["bis 2 Stunden", "Grundlagen und Einordnung", "Live-Demos und Fragerunde"] },
      { name: "Halbtags-Workshop", price: "1.290 €", description: "Praxisnaher Einstieg mit ersten eigenen Aufgaben.", features: ["bis 4 Stunden", "Prompting und Qualität", "Übungen und Teilnahmebestätigung"] },
      { name: "Ganztags-Workshop", price: "1.990 €", description: "Die vollständige Basisschulung mit ausreichend Praxis.", features: ["bis 8 Stunden", "Recht, Datenschutz und AI Act", "Übungen und Teilnahmebestätigung"], featured: true },
      { name: "Zwei-Tages-Intensiv", price: "3.490 €", description: "Vertiefung mit Workflows und konkreten Use Cases.", features: ["bis 16 Stunden", "mehr Hands-on-Phasen", "persönlicher Aktionsplan"] },
    ],
    addons: [
      ["Branchenpaket · +390 €", "Bis zu drei Stunden gezielte Anpassung an Fachbereich und Zielgruppe."],
      ["Eigene Use Cases · +790 €", "Bis zu sechs Stunden Vorbereitung mit Aufgaben der Organisation."],
      ["Neues Thema · 125 €/Std.", "Vorab geschätzter und schriftlich gedeckelter Rechercheaufwand."],
    ],
    moduleEyebrow: "MODULARER BAUKASTEN",
    moduleTitle: "Inhalte, die zu Zielgruppe und Alltag passen.",
    moduleIntro: "Nicht jede Gruppe braucht jede Folie. Aus dem gepflegten Schulungssystem entsteht ein passender Ablauf statt eines starren Standardvortrags.",
    modules: [
      ["01", "Grundlagen & Orientierung", "Was generative KI ist, wie Sprachmodelle arbeiten und wo ihre Grenzen liegen.", "#13adc7"],
      ["02", "Prompting & Workflows", "Klare Aufträge formulieren, Ergebnisse iterieren und wiederverwendbare Abläufe entwickeln.", "#945dd6"],
      ["03", "Recherche & Qualität", "Quellen prüfen, Halluzinationen erkennen und KI als Denkpartner statt Orakel nutzen.", "#f46737"],
      ["04", "Medien & Kreativität", "Text, Bild, Audio und Video sinnvoll einsetzen – inklusive transparenter Kennzeichnung.", "#2f946d"],
      ["05", "Recht, Datenschutz & AI Act", "Datenschutz-Ampel, Urheberrecht, Transparenz und angemessene KI-Kompetenz.", "#c94b78"],
      ["06", "Strategie & Umsetzung", "Use Cases priorisieren, Spielregeln festlegen und nächste Schritte realistisch planen.", "#3e7bd6"],
    ],
    actEyebrow: "ART. 4 EU AI ACT",
    actTitle: "KI-Kompetenz aufbauen und nachvollziehbar machen.",
    actCopy: "Anbieter und Betreiber von KI-Systemen müssen Maßnahmen ergreifen, welche die Entwicklung von KI-Kompetenz bei Personen unterstützen, die in ihrem Auftrag KI-Systeme betreiben oder nutzen. Die Schulung verbindet technisches Verständnis, praktische Anwendung, Risiken und Nutzungskontext – ohne aus einem Schulungstag ein juristisches Pflichtprogramm zu machen.",
    actItems: [
      ["Lernziele und Agenda", "Inhalte und Zielsetzung der Schulung werden nachvollziehbar festgehalten."],
      ["Kontextbezogene Praxis", "Übungen orientieren sich an Werkzeugen, Rollen und Risiken der Zielgruppe."],
      ["Teilnahmebestätigung", "Die Teilnahme wird in einem einheitlichen radi.solutions Nachweis dokumentiert."],
      ["Transparenter KI-Einsatz", "Verwendete generative Werkzeuge und menschliche Prüfung werden offengelegt."],
    ],
    legal: "Die Schulung unterstützt Maßnahmen zur Entwicklung und Dokumentation von KI-Kompetenz gemäß Art. 4 EU AI Act. Sie stellt keine Rechtsberatung, Zertifizierung oder Garantie vollständiger Compliance dar; die konkrete organisatorische und rechtliche Umsetzung bleibt Aufgabe der jeweiligen Organisation.",
    actSource: "Offizielle Informationen der Europäischen Kommission",
    processEyebrow: "SO LÄUFT ES AB",
    processTitle: "Vom Briefing zum passenden Schulungstag.",
    processIntro: "Ein schlanker Prozess hält die Vorbereitung effizient und gibt trotzdem Raum für relevante Beispiele.",
    process: [
      ["01", "Briefing", "Zielgruppe, Vorwissen, Werkzeuge, Ziele und sensible Themen klären."],
      ["02", "Konfiguration", "Module auswählen, Zeitbudget abstimmen und Beispiele vorbereiten."],
      ["03", "Schulung", "Verständliche Inputs, Live-Demos, Übungen und ehrliche Diskussion."],
      ["04", "Nachweis", "Unterlagen, Teilnahmebestätigung und optionaler Review-Termin."],
    ],
    faqEyebrow: "HÄUFIGE FRAGEN",
    faqTitle: "Was vor der Buchung oft wichtig ist.",
    faqIntro: "Die wichtigsten Antworten in kompakter Form. Alles Weitere lässt sich in einem kurzen Gespräch klären.",
    faq: [
      ["Brauchen die Teilnehmenden Vorkenntnisse?", "Nein. Die Basisschulung beginnt verständlich und wird an das vorhandene Wissen angepasst. Für Aufbauformate wird ein gemeinsames Grundverständnis vorausgesetzt."],
      ["Welche KI-Werkzeuge werden verwendet?", "Die Auswahl richtet sich nach Zielgruppe und Freigaben der Organisation. Typische Beispiele sind ChatGPT, Microsoft Copilot, Gemini, Claude sowie spezialisierte Bild-, Audio- und Recherchewerkzeuge."],
      ["Welchen Nachweis erhalten die Teilnehmenden?", "Alle Teilnehmenden erhalten eine personalisierte Teilnahmebestätigung mit Datum, Umfang und behandelten Themen. Sie unterstützt die Dokumentation von KI-Kompetenzmaßnahmen gemäß Art. 4 EU AI Act. Der AI Act schreibt dafür kein bestimmtes Zertifikat vor; die konkrete organisatorische Umsetzung bleibt Aufgabe der jeweiligen Organisation."],
      ["Können eigene Aufgaben eingebaut werden?", "Ja. Bestehende Branchenbeispiele oder eigene Use Cases können als klar kalkulierte Zusatzleistung vorbereitet werden. Vertrauliche Daten werden dabei nicht ungeprüft in öffentliche KI-Dienste eingegeben."],
      ["Findet die Schulung auch online statt?", "Ja. Impuls, Halbtag und Ganztag sind online oder in Präsenz möglich. Für längere Praxisformate ist Präsenz oft didaktisch stärker."],
    ],
    ctaTitle: "Welche KI-Kompetenz braucht Ihr Team wirklich?",
    ctaCopy: "In einem kurzen Vorgespräch klären wir Zielgruppe, Format und gewünschte Individualisierung. Danach erhalten Sie einen nachvollziehbaren Fixpreis.",
    ctaButton: "Gespräch anfragen",
    transparency: "Transparenzhinweis: Konzeption und Text dieser Seite wurden mit generativer KI unterstützt und von Radomir Dinic fachlich, didaktisch und redaktionell geprüft und freigegeben.",
  },
  en: {
    title: "AI training for companies and public organisations",
    description: "Practical in-house training on generative AI, responsible use and AI literacy under Article 4 of the EU AI Act.",
    eyebrow: "AI TRAINING · SALZBURG · IN-HOUSE & ONLINE",
    heroTitle: "Understand AI. Use it responsibly. Make work easier.",
    heroCopy: "Practical training for teams that want to move beyond experimentation and integrate generative AI into daily work in a productive, transparent and responsible way.",
    request: "Request a consultation",
    packagesLink: "View packages",
    trust: [
      ["Modular format", "From a focused impulse session to a two-day intensive"],
      ["Up to 15 people", "A closed group with room for your own questions"],
      ["Documented", "Materials and confirmation of attendance included"],
    ],
    priceEyebrow: "FORMATS & PRICING",
    priceTitle: "Clear packages. Enough room for your context.",
    priceIntro: "The briefing, module selection and light adaptation of existing examples are already included. Additional research and custom use cases are priced transparently.",
    recommended: "Most popular",
    from: "Fixed price",
    net: "VAT-exempt · up to 15 people",
    pricingNote: "All prices are indicative for closed groups. No Austrian VAT is charged under the small-business exemption in Section 6(1)(27) UStG 1994. Venue, exceptional travel expenses and accommodation are not included. A binding quote follows a short briefing.",
    packages: [
      { name: "AI impulse", price: "€790", description: "A focused introduction for teams and decision-makers.", features: ["up to 2 hours", "foundations and context", "live demos and Q&A"] },
      { name: "Half-day workshop", price: "€1,290", description: "A practical introduction using first real tasks.", features: ["up to 4 hours", "prompting and quality", "exercises and attendance confirmation"] },
      { name: "Full-day workshop", price: "€1,990", description: "The complete foundation course with sufficient practice.", features: ["up to 8 hours", "law, privacy and the AI Act", "exercises and attendance confirmation"], featured: true },
      { name: "Two-day intensive", price: "€3,490", description: "Deeper practice with workflows and concrete use cases.", features: ["up to 16 hours", "extended hands-on sessions", "personal action plan"] },
    ],
    addons: [
      ["Industry package · +€390", "Up to three hours of targeted adaptation to your field and audience."],
      ["Custom use cases · +€790", "Up to six hours of preparation with tasks from your organisation."],
      ["New topic · €125/hour", "Research effort estimated and capped in writing before work begins."],
    ],
    moduleEyebrow: "MODULAR CURRICULUM",
    moduleTitle: "Content that fits your audience and daily work.",
    moduleIntro: "Not every group needs every slide. The maintained training system creates a suitable flow instead of forcing a rigid standard presentation.",
    modules: [
      ["01", "Foundations & orientation", "What generative AI is, how language models work and where their limits are.", "#13adc7"],
      ["02", "Prompting & workflows", "Write clear instructions, iterate results and develop reusable processes.", "#945dd6"],
      ["03", "Research & quality", "Verify sources, recognise hallucinations and use AI as a thinking partner rather than an oracle.", "#f46737"],
      ["04", "Media & creativity", "Use text, images, audio and video purposefully – including transparent disclosure.", "#2f946d"],
      ["05", "Law, privacy & the AI Act", "Data traffic light, copyright, transparency and appropriate AI literacy.", "#c94b78"],
      ["06", "Strategy & implementation", "Prioritise use cases, set rules and plan realistic next steps.", "#3e7bd6"],
    ],
    actEyebrow: "ARTICLE 4 EU AI ACT",
    actTitle: "Build AI literacy and make it traceable.",
    actCopy: "Providers and deployers of AI systems must take measures that support the development of AI literacy for people operating or using AI systems on their behalf. The training combines technical understanding, practical application, risks and context of use – without turning the day into a legal compliance lecture.",
    actItems: [
      ["Learning goals and agenda", "Content and purpose of the training are documented in a traceable format."],
      ["Context-based practice", "Exercises reflect the tools, roles and risks relevant to the audience."],
      ["Attendance confirmation", "Participation is documented using a consistent radi.solutions record."],
      ["Transparent use of AI", "Generative tools used and the human review process are disclosed."],
    ],
    legal: "The training supports measures to develop and document AI literacy under Article 4 of the EU AI Act. It is not legal advice, certification or a guarantee of complete compliance; organisational and legal implementation remains the responsibility of each organisation.",
    actSource: "Official information from the European Commission",
    processEyebrow: "HOW IT WORKS",
    processTitle: "From briefing to a training day that fits.",
    processIntro: "A lean process keeps preparation efficient while creating room for relevant examples.",
    process: [
      ["01", "Briefing", "Clarify audience, prior knowledge, tools, goals and sensitive topics."],
      ["02", "Configuration", "Select modules, align the time budget and prepare examples."],
      ["03", "Training", "Clear input, live demos, exercises and honest discussion."],
      ["04", "Documentation", "Materials, attendance confirmation and an optional review session."],
    ],
    faqEyebrow: "FREQUENTLY ASKED QUESTIONS",
    faqTitle: "What often matters before booking.",
    faqIntro: "The key answers in a compact format. Everything else can be clarified in a short conversation.",
    faq: [
      ["Do participants need prior knowledge?", "No. The foundation course starts at an accessible level and adapts to existing knowledge. Advanced formats assume a shared basic understanding."],
      ["Which AI tools are used?", "The selection depends on the audience and the organisation’s approved tools. Typical examples include ChatGPT, Microsoft Copilot, Gemini, Claude and specialised image, audio and research tools."],
      ["What documentation do participants receive?", "Every participant receives a personalised confirmation of attendance stating the date, duration and topics covered. It supports the documentation of AI literacy measures under Article 4 of the EU AI Act. The AI Act does not require a specific certificate; organisational implementation remains the responsibility of each organisation."],
      ["Can we include our own tasks?", "Yes. Existing industry examples or custom use cases can be prepared as a clearly priced add-on. Confidential data is never entered into public AI services without prior review."],
      ["Is online training available?", "Yes. Impulse, half-day and full-day formats can be delivered online or in person. In-person delivery is often stronger for extended practical formats."],
    ],
    ctaTitle: "What AI literacy does your team actually need?",
    ctaCopy: "A short initial call clarifies the audience, format and desired level of customisation. You then receive a transparent fixed-price quote.",
    ctaButton: "Request a call",
    transparency: "Transparency notice: The concept and copy for this page were supported by generative AI and professionally, didactically and editorially reviewed and approved by Radomir Dinic.",
  },
};

const mailSubject = {
  de: "Anfrage KI-Schulung",
  en: "AI training enquiry",
};

export default function KiSchulungen() {
  const [language, setLanguage] = useState("de");
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("radi-language");
    const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || "de";
    const initial = saved === "de" || saved === "en" ? saved : browserLanguage.toLowerCase().startsWith("de") ? "de" : "en";
    setLanguage(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "de" ? "de" : "en";
  }, [language]);

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("radi-language", nextLanguage);
  };

  const contactHref = `mailto:contact@radi.solutions?subject=${encodeURIComponent(mailSubject[language])}`;

  return (
    <Layout>
      <Head>
        <title>{t.title} | radi.solutions</title>
        <meta key="description" name="description" content={t.description} />
        <meta key="keywords" name="keywords" content="KI Schulung, generative KI, AI Act, KI Kompetenz, Inhouse Workshop, Salzburg, ChatGPT Training" />
        <link key="canonical" rel="canonical" href="https://radi.solutions/ki-schulungen/" />
        <meta key="og-title" property="og:title" content={`${t.title} | radi.solutions`} />
        <meta key="og-description" property="og:description" content={t.description} />
        <meta key="og-url" property="og:url" content="https://radi.solutions/ki-schulungen/" />
        <meta key="og-type" property="og:type" content="website" />
      </Head>

      <Page>
        <Shell>
          <LanguageBar>
            <LanguageSwitch aria-label="Language selection">
              <button type="button" aria-pressed={language === "de"} onClick={() => changeLanguage("de")}>DE</button>
              <button type="button" aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button>
            </LanguageSwitch>
          </LanguageBar>

          <Hero>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <HeroTitle>{t.heroTitle}</HeroTitle>
            <HeroCopy>{t.heroCopy}</HeroCopy>
            <Actions>
              <PrimaryAction href={contactHref}>{t.request}</PrimaryAction>
              <SecondaryAction href="#preise">{t.packagesLink}</SecondaryAction>
            </Actions>
            <TrustRow>
              {t.trust.map(([title, description]) => <div key={title}><strong>{title}</strong><span>{description}</span></div>)}
            </TrustRow>
          </Hero>

          <Section id="preise">
            <Eyebrow>{t.priceEyebrow}</Eyebrow>
            <SectionHeading><h2>{t.priceTitle}</h2><p>{t.priceIntro}</p></SectionHeading>
            <PriceGrid>
              {t.packages.map((item) => (
                <PriceCard key={item.name} featured={item.featured}>
                  {item.featured && <Recommended>{t.recommended}</Recommended>}
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <Price><span>{t.from}</span><strong>{item.price}</strong><small>{t.net}</small></Price>
                </PriceCard>
              ))}
            </PriceGrid>
            <AddOnGrid>{t.addons.map(([title, description]) => <div key={title}><strong>{title}</strong><span>{description}</span></div>)}</AddOnGrid>
            <PricingNote>{t.pricingNote}</PricingNote>
          </Section>

          <Section id="module">
            <Eyebrow>{t.moduleEyebrow}</Eyebrow>
            <SectionHeading><h2>{t.moduleTitle}</h2><p>{t.moduleIntro}</p></SectionHeading>
            <ModuleGrid>
              {t.modules.map(([number, title, description, accent]) => (
                <ModuleCard key={number} accent={accent}><span>{number}</span><h3>{title}</h3><p>{description}</p></ModuleCard>
              ))}
            </ModuleGrid>
          </Section>

          <Section id="ai-act">
            <ActPanel>
              <div><Eyebrow>{t.actEyebrow}</Eyebrow><h2>{t.actTitle}</h2><p>{t.actCopy}</p></div>
              <ActChecklist>{t.actItems.map(([title, description]) => <div key={title}><strong>{title}</strong><span>{description}</span></div>)}</ActChecklist>
              <LegalNote>{t.legal} <a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" rel="noreferrer">{t.actSource}</a></LegalNote>
            </ActPanel>
          </Section>

          <Section id="ablauf">
            <Eyebrow>{t.processEyebrow}</Eyebrow>
            <SectionHeading><h2>{t.processTitle}</h2><p>{t.processIntro}</p></SectionHeading>
            <ProcessGrid>{t.process.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ProcessGrid>
          </Section>

          <Section id="faq">
            <Eyebrow>{t.faqEyebrow}</Eyebrow>
            <SectionHeading><h2>{t.faqTitle}</h2><p>{t.faqIntro}</p></SectionHeading>
            <FaqList>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</FaqList>
          </Section>

          <FinalCta>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaCopy}</p>
            <PrimaryAction href={contactHref}>{t.ctaButton}</PrimaryAction>
          </FinalCta>
          <Transparency>{t.transparency}</Transparency>
        </Shell>
      </Page>
    </Layout>
  );
}
