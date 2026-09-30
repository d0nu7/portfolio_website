import React from 'react';
import styled from 'styled-components';

import Seo from '../components/Seo/Seo';
import { useLanguage } from '../i18n/LanguageContext';
import { legal, privacy } from '../i18n/legal';
import { ROUTES } from '../i18n/routes';
import { Layout } from '../layout/Layout';
import { Section, SectionDivider, SectionTitle } from '../styles/GlobalComponents';

const Prose = styled.div`
  max-width: 760px;
  padding-bottom: 48px;
  color: rgba(255, 255, 255, .78);
  font-size: 16px;
  line-height: 1.7;

  h2 {
    margin: 36px 0 10px;
    color: var(--c-text-strong);
    font-size: 20px;
  }

  p + p { margin-top: 12px; }

  a {
    color: var(--c-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Rows = styled.dl`
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  margin: 20px 0 0;
  border-top: 1px solid rgba(255, 255, 255, .08);

  dt, dd {
    margin: 0;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255, 255, 255, .08);
  }

  dt { color: rgba(255, 255, 255, .6); padding-right: 16px; }
  dd { color: var(--c-text-strong); }

  @media ${(p) => p.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    dt { padding-bottom: 0; border-bottom: 0; font-size: 13px; }
    dd { padding-top: 2px; }
  }
`;

const Stand = styled.p`
  margin-top: 36px !important;
  color: rgba(255, 255, 255, .55);
  font-size: 13px;
`;

// A value is a string, a { text, href } link, or an array of both.
const Inline = ({ value }) => {
  if (Array.isArray(value)) return value.map((v, i) => <Inline key={i} value={v} />);
  if (value && typeof value === 'object') {
    const external = value.href.startsWith('http');
    return <a href={value.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{value.text}</a>;
  }
  return value;
};

const DOCS = { legal, privacy };

// Rendered by the legal-notice / impressum and privacy / datenschutz pages.
const LegalPage = ({ doc }) => {
  const { lang } = useLanguage();
  const c = DOCS[doc][lang];
  return (
    <Layout>
      <Seo title={`${c.title} | radi.solutions`} description={c.description} path={ROUTES[doc][lang]} locale={lang === 'de' ? 'de_AT' : 'en_GB'} />
      <Section>
        <SectionDivider divider />
        <SectionTitle as="h1">{c.title}</SectionTitle>
        <Prose>
          <p>{c.intro}</p>
          {c.sections.map((s, i) => (
            <React.Fragment key={s.heading || i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.rows && (
                <Rows>
                  {s.rows.map(([label, value]) => (
                    <React.Fragment key={label}>
                      <dt>{label}</dt>
                      <dd><Inline value={value} /></dd>
                    </React.Fragment>
                  ))}
                </Rows>
              )}
              {s.paragraphs && s.paragraphs.map((para, j) => <p key={j}><Inline value={para} /></p>)}
            </React.Fragment>
          ))}
          <Stand>{c.stand}</Stand>
        </Prose>
      </Section>
    </Layout>
  );
};

export default LegalPage;
