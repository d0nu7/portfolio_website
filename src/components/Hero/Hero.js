import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Multimedia<br/>
          Developer
        </SectionTitle>
        <SectionText>
          I am a passionate developer and lecturer with a research background. Check out my site to find out more about me and my projects or contact me for a custom offer.
        </SectionText>
        <Button onClick={
          (e) => {
            window.location = "mailto:contact@radi.solutions";
            e.preventDefault();
          }}>Contact Me</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;