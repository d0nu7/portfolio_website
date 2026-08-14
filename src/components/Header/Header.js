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

const Header = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,
      shrink-to-fit=no"
      />
      <title>Radomir Dinic</title>
      <meta
        key="description"
        name="description"
        content="Portfolio of a Freelance MultiMedia Developer"
      />
      <meta
        key="keywords"
        name="keywords"
        content="Portfolio, Freelancer, Unity, Salzburg, MultiMediaTechnology, Software, Programming, Development, Virtual Reality, Augmented Reality, Medical Product, Radomir Dinic"
      />

      <meta
        key="og-title"
        property="og:title"
        content="Radomir Dinic | MultiMedia Developer"
      />
      <meta
        key="og-description"
        property="og:description"
        content="Portfolio of a Freelance MultiMedia Developer"
      />
      {/* <meta property="og:url" content="https://example.com" /> */}
      <meta key="og-type" property="og:type" content="website" />
      <link key="canonical" rel="canonical" href="https://radi.solutions" />
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
      <Nav />
    </Container>
  </>
);

export default Header;
