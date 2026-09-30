import React from 'react';

import { ROUTES } from '../../i18n/routes';
import useHomeCopy from '../../i18n/useHomeCopy';
import { ButtonLink, ButtonRow, Eyebrow, Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { LeftSection, Tagline } from './HeroStyles';

const Hero = () => {
  const { lang, t } = useHomeCopy();
  return (
    <Section row nopadding $noreveal>
      <LeftSection>
        <Eyebrow>Radomir Dinic · Salzburg</Eyebrow>
        <SectionTitle as="h1" main>{t.hero.title}</SectionTitle>
        <Tagline>{t.hero.tagline}</Tagline>
        <SectionText>{t.hero.text}</SectionText>
        <ButtonRow>
          <ButtonLink href="mailto:contact@radi.solutions">{t.hero.contact}</ButtonLink>
          <ButtonLink href={ROUTES.training[lang]} variant="secondary">{t.hero.training}</ButtonLink>
        </ButtonRow>
      </LeftSection>
    </Section>
  );
};

export default Hero;
