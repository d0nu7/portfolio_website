import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import { SocialIcons } from '../Header/HeaderStyles';
import { FaResearchgate } from "react-icons/fa";

import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer, SpanItem } from './FooterStyles';

const labels = {
  en: { legal: 'Legal notice', email: 'Email', services: 'Services', training: 'AI trainings' },
  de: { legal: 'Impressum', email: 'E-Mail', services: 'Angebot', training: 'KI-Schulungen' },
};

const Footer = ({ lang = 'en' }) => {
  const t = labels[lang] || labels.en;

  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>{t.legal}</LinkTitle>
          <SpanItem>
            Radomir Dinic BSc MSc <br/>
            Pingitzzerkai 6a/6<br/>
            A-5400 Hallein<br/>
            AUSTRIA
          </SpanItem>
        </LinkColumn>    
        <LinkColumn>
          <LinkTitle>{t.email}</LinkTitle>
          <LinkItem href="mailto:contact@radi.solutions">
            contact@radi.solutions
          </LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>{t.services}</LinkTitle>
          <LinkItem href="/ki-schulungen/">
            {t.training}
          </LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>Connecting Realities...</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons href="https://github.com/d0nu7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.linkedin.com/in/radomir-dinic-830507a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.researchgate.net/profile/Radomir-Dinic" target="_blank" rel="noopener noreferrer" aria-label="ResearchGate">
            <FaResearchgate size="3rem" />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
