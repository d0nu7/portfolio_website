import Link from "next/link";
import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaResearchgate } from "react-icons/fa";
import Head from "next/head";
import {
  Container,
  Div1,
  Div3,
  LogoLink,
  LogoText,
  SocialIcons,
} from "./HeaderStyles";
import SvgRadiFace from "../../CustomIcons/RadiFace";
import Nav from "../Nav/Nav";

const Header = ({ lang = 'en' }) => (
  <>
    <Head>
      {/* Page-specific metadata lives in each page's <Seo />. */}
      <meta charSet="utf-8" />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <link key="icon" rel="icon" href="/favicon.ico" sizes="any" />
      <link key="icon-svg" rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link key="apple-touch-icon" rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>

    <Container id="header">
      <Div1>
        <Link href="/" passHref legacyBehavior>
          <LogoLink>
            <SvgRadiFace />
            <LogoText>
              <b>Ra</b>domir
              <br />
              <b>Di</b>nic
            </LogoText>
          </LogoLink>
        </Link>
      </Div1>
      <Div3>
        <SocialIcons
          href="https://github.com/d0nu7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons
          href="https://www.linkedin.com/in/radomir-dinic-830507a0/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons
          href="https://www.researchgate.net/profile/Radomir-Dinic"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ResearchGate"
        >
          <FaResearchgate size="3rem" />
        </SocialIcons>
      </Div3>
      <Nav lang={lang} />
    </Container>
  </>
);

export default Header;
