import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import { SocialIcons } from '../Header/HeaderStyles';
import { FaResearchgate } from "react-icons/fa";

import { CompanyContainer, FooterWrapper, LinkColumn, LinkItem, LinkList, LinkTitle, Slogan, SocialContainer, SocialIconsContainer, SpanItem } from './FooterStyles';

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Impressum</LinkTitle>
          <SpanItem>
            Radomir Dinic BSc MSc <br/>
            Pingitzzerkai 6a/6<br/>
            A-5400 Hallein<br/>
            AUSTRIA
          </SpanItem>
        </LinkColumn>    
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href="mailto:contact@radi.solutions">
            contact@radi.solutions
          </LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Angebot</LinkTitle>
          <LinkItem href="/ki-schulungen/">
            KI-Schulungen
          </LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>Connecting Realities...</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons href="https://github.com/d0nu7" aria-label="GitHub">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.linkedin.com/in/radomir-dinic-830507a0/" aria-label="LinkedIn">
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.researchgate.net/profile/Radomir-Dinic" aria-label="ResearchGate">
            <FaResearchgate size="3rem" />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
