// Facts about the site and its owner that more than one place needs:
// <head> metadata, JSON-LD structured data and public/llms.txt.
// Keep public/llms.txt in sync when changing anything here.
export const SITE_URL = 'https://radi.solutions';
export const SITE_NAME = 'radi.solutions';

export const PERSON = {
  name: 'Radomir Dinic',
  alternateName: 'RaDi',
  honorificSuffix: 'BSc MSc',
  jobTitle: 'Senior Lecturer for Game & Mixed Reality',
  email: 'contact@radi.solutions',
  locality: 'Hallein',
  region: 'Salzburg',
  country: 'AT',
  employer: {
    name: 'Salzburg University of Applied Sciences (FH Salzburg)',
    url: 'https://www.fh-salzburg.ac.at/',
  },
  sameAs: [
    'https://github.com/d0nu7',
    'https://www.linkedin.com/in/radomir-dinic-830507a0/',
    'https://www.researchgate.net/profile/Radomir-Dinic',
  ],
  knowsAbout: [
    'Game development',
    'Mixed reality',
    'Augmented reality',
    'Virtual reality',
    'Computer vision',
    'Unity',
    'Artificial intelligence for games',
    'Generative AI',
    'AI literacy training',
    'EU AI Act Article 4',
    'Rapid prototyping',
    'Human-computer interaction',
    'Digital health',
  ],
  languages: ['de', 'en', 'sr'],
};

export const personJsonLd = () => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: PERSON.name,
  alternateName: PERSON.alternateName,
  honorificSuffix: PERSON.honorificSuffix,
  jobTitle: PERSON.jobTitle,
  email: `mailto:${PERSON.email}`,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og/home.png`,
  worksFor: {
    '@type': 'CollegeOrUniversity',
    name: PERSON.employer.name,
    url: PERSON.employer.url,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: PERSON.employer.name,
    url: PERSON.employer.url,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: PERSON.locality,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  knowsAbout: PERSON.knowsAbout,
  knowsLanguage: PERSON.languages,
  sameAs: PERSON.sameAs,
});
