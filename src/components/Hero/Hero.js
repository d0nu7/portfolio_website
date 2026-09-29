import React from 'react';

import { ButtonLink, ButtonRow, Eyebrow, Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { LeftSection, Tagline } from './HeroStyles';

const Hero = () => (
  <Section row nopadding $noreveal>
    <LeftSection>
      <Eyebrow>Radomir Dinic · Salzburg</Eyebrow>
      <SectionTitle as="h1" main>
        AI, games &amp; interactive technology.
      </SectionTitle>
      <Tagline>Teaching it. Building it. Making it understandable.</Tagline>
      <SectionText>
        Senior Lecturer at FH Salzburg, developer and AI trainer. I teach game
        development, computer vision and AI, build interactive prototypes and help
        organisations understand what generative AI can actually do for them.
      </SectionText>
      <ButtonRow>
        <ButtonLink href="mailto:contact@radi.solutions">Get in touch</ButtonLink>
        <ButtonLink href="/ki-schulungen/" variant="secondary">AI trainings for teams</ButtonLink>
      </ButtonRow>
    </LeftSection>
  </Section>
);

export default Hero;
