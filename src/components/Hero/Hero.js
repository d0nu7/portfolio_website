import React from 'react';

import { ButtonLink, ButtonRow, Eyebrow, Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { LeftSection } from './HeroStyles';

const Hero = () => (
  <Section row nopadding $noreveal>
    <LeftSection>
      <Eyebrow>Radomir Dinic · Salzburg</Eyebrow>
      <SectionTitle as="h1" main>
        Games, Mixed Reality &amp;&nbsp;AI.
      </SectionTitle>
      <SectionText>
        Senior Lecturer at FH Salzburg with a background in applied research.
        I build interactive prototypes and run hands-on AI trainings for teams,
        from students to leadership.
      </SectionText>
      <ButtonRow>
        <ButtonLink href="mailto:contact@radi.solutions">Get in touch</ButtonLink>
        <ButtonLink href="/ki-schulungen/" variant="secondary">AI trainings for teams</ButtonLink>
      </ButtonRow>
    </LeftSection>
  </Section>
);

export default Hero;
