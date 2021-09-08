import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          &gt;Teaching  <br />
          &gt;Research <br/>
          &gt;Development 
        </SectionTitle>
        <SectionText>
          I am a passionate developer and lecturer with a research background. I'm offering custom digital solutions and consulting in many technology-related fields.
        </SectionText>
        <Button onClick={
          (e) => {
            window.location = "mailto:r.dinic@gmx.at";
            e.preventDefault();
          }}>Contact Me</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;