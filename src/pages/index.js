import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
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
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const TITLE = 'Radomir Dinic · Games, AI & Interactive Systems | Salzburg';
const DESCRIPTION = 'Senior Lecturer at FH Salzburg, developer and AI trainer. Teaching game development, computer vision and AI, building interactive prototypes and making generative AI understandable for teams and administrations.';

const jsonLd = [
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
    '@id': `${SITE_URL}/#profile`,
    url: `${SITE_URL}/`,
    name: TITLE,
    inLanguage: 'en',
    mainEntity: { '@id': `${SITE_URL}/#person` },
  },
  {
    ...personJsonLd(),
    award: [
      'Honorable Mention for Best Paper, ACM CHI 2022 (AirRes Mask)',
      'Austrian CG Award 2015, Best Game (Yokaisho)',
      'Austrian CG Award 2016, Best Game and Best Student Project (NIVA)',
      'Order for Disaster Relief, State of Salzburg',
      'Science Award 2017, AK Salzburg',
    ],
    subjectOf: Publications.map((p) => ({
      '@type': 'ScholarlyArticle',
      headline: p.title.replace(/\.$/, ''),
      datePublished: String(p.year),
      sameAs: p.doi,
    })),
  },
];

const Home = () => {
  return (
    <Layout>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        image="/og/home.png"
        imageAlt="Radomir Dinic: Games, AI & interactive systems"
        jsonLd={jsonLd}
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

export default Home;
