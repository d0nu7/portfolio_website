import BgAnimation from '../components/BackgroundAnimation/BackgroundAnimation';
import Contact from '../components/Contact/Contact';
import Hero from '../components/Hero/Hero';
import Now from '../components/Now/Now';
import Projects from '../components/Projects/Projects';
import Recognition from '../components/Recognition/Recognition';
import Talks from '../components/Talks/Talks';
import Timeline from '../components/TimeLine/TimeLine';
import WhatIDo from '../components/WhatIDo/WhatIDo';
import Seo from '../components/Seo/Seo';
import { Publications } from '../constants/constants';
import { SITE_URL, personJsonLd } from '../constants/site';
import { useLanguage } from '../i18n/LanguageContext';
import { ROUTES } from '../i18n/routes';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const META = {
  en: {
    title: 'Radomir Dinic · Games, AI & Interactive Systems | Salzburg',
    description: 'Senior Lecturer at FH Salzburg, developer and AI trainer. Games, computer vision and AI, interactive prototypes and generative AI training for teams.',
  },
  de: {
    title: 'Radomir Dinic · Games, KI & interaktive Systeme | Salzburg',
    description: 'Senior Lecturer an der FH Salzburg, Entwickler und KI-Trainer: Lehre in Games, Computer Vision und KI, interaktive Prototypen, KI-Schulungen für Teams.',
  },
};
const buildJsonLd = (lang) => {
  const url = `${SITE_URL}${ROUTES.home[lang]}`;
  return [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'radi.solutions',
      inLanguage: ['en', 'de'],
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${url}#profile`,
      url,
      name: META[lang].title,
      inLanguage: lang,
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
    {
      ...personJsonLd(),
      award: [
        'Honorable Mention for Best Paper, ACM CHI 2022 (AirRes Mask)',
        'Austrian CG Award 2015, Best Game (Yokaisho)',
        'Austrian CG Award 2016, Best Game and Best Student Project (NIVA)',
        'Medal for Disaster Relief (Katastrophenhilfe-Medaille), State of Salzburg, for flood relief in Hallein',
        'Science Award 2017, AK Salzburg',
      ],
    },
    // Co-authored papers point to the person as author (subjectOf would mean
    // works *about* him).
    ...Publications.map((p) => ({
      '@type': 'ScholarlyArticle',
      headline: p.title.replace(/\.$/, ''),
      datePublished: String(p.year),
      url: p.doi,
      author: { '@id': `${SITE_URL}/#person` },
    })),
  ];
};

// Rendered by pages/index.js (EN) and pages/de/index.js (DE).
const HomePage = () => {
  const { lang } = useLanguage();
  const meta = META[lang] || META.en;
  return (
    <Layout>
      <Seo
        title={meta.title}
        description={meta.description}
        locale={lang === 'de' ? 'de_AT' : 'en_GB'}
        path={ROUTES.home[lang]}
        image={lang === 'de' ? '/og/home-de.png' : '/og/home.png'}
        imageAlt={meta.title}
        jsonLd={buildJsonLd(lang)}
      />
      <Section grid $noreveal>
        <Hero />
        <BgAnimation />
      </Section>
      
      <WhatIDo />
      <Now />
      <Projects />
      <Talks />
      <Recognition />
      <Timeline />
      <Contact />
    </Layout>
  );
};

export default HomePage;
