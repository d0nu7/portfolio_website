import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

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
          <LinkItem href="mailto:r.dinic@gmx.at">
            r.dinic@gmx.at
          </LinkItem>
        </LinkColumn>    
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
          <Slogan>Connecting Realities</Slogan>
        </CompanyContainer>
        <SocialContainer>
          <SocialIcons href="https://github.com/d0nu7">
            <AiFillGithub size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.linkedin.com/in/radomir-dinic-830507a0/">
            <AiFillLinkedin size="3rem" />
          </SocialIcons>
          <SocialIcons href="https://www.researchgate.net/profile/Radomir-Dinic">
            <FaResearchgate size="3rem" />
          </SocialIcons>
        </SocialContainer>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
