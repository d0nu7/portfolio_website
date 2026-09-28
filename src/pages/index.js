import Acomplishments from '../components/Acomplishments/Acomplishments';
import BgAnimation from '../components/BackgrooundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Teaching from '../components/Teaching/Teaching';
import Research from '../components/Research/Research';
import Skills from '../components/Skills/Skills';
import Timeline from '../components/TimeLine/TimeLine';
import Seo from '../components/Seo/Seo';
import { Publications } from '../constants/constants';
import { SITE_URL, personJsonLd } from '../constants/site';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const TITLE = 'Radomir Dinic · Games, Mixed Reality & AI | Salzburg';
const DESCRIPTION = 'Senior Lecturer for Game & Mixed Reality at FH Salzburg. Interactive prototypes, applied research and hands-on AI trainings for teams in Salzburg and online.';

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
        imageAlt="Radomir Dinic: Games, Mixed Reality & AI"
        jsonLd={jsonLd}
      />
      <Section grid $noreveal>
        <Hero />
        <BgAnimation />
      </Section>
      
      <Timeline />
      <Skills />
      <Teaching />
      <Acomplishments />
      <Projects /> 
       <Research />
    </Layout>
  );
};

export default Home;
