import Link from "next/link";
import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaResearchgate } from "react-icons/fa";
import Head from "next/head";
import { Container, Div1, Div3, NavLink, SocialIcons } from "./HeaderStyles";
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
        name="description"
        content="Portfolio of a Freelance MultiMedia Developer"
      />
      <meta
        name="keyword"
        content="Portfolio, Freelancer, Unity, Salzburg, MultiMediaTechnology, Software, Programming, Development, Virtual Reality, Augumented Reality, Medical Product, Radomir Dinic"
      />

      <meta
        property="og:title"
        content="Radomir Dinic | MultiMedia Developer"
      />
      <meta
        property="og:description"
        content="Portfolio of a Freelance MultiMedia Developer"
      />
      {/* <meta property="og:url" content="https://example.com" /> */}
      <meta property="og:type" content="website" />
    </Head>

    <Container id="header">
      <Div1>
        <Link href="/">
          <span
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
            <SvgRadiFace height="6rem" />{" "}
            <span style={{ marginLeft: "1rem" }}>
              <b>Ra</b>domir
              <br />
              <b>Di</b>nic
            </span>
          </span>
        </Link>
      </Div1>
      {/* <Div2>
      <li>
        <Link href="#projects">
          <NavLink>Projects</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#research">
          <NavLink>Research</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#teaching">
          <NavLink>Teaching</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#tech">
          <NavLink>Skills</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#about">
          <NavLink>About</NavLink>
        </Link>
      </li>
    </Div2> */}
      <Div3>
        <SocialIcons href="https://github.com/d0nu7">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/radomir-dinic-830507a0/">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.researchgate.net/profile/Radomir-Dinic">
          <FaResearchgate size="3rem" />
        </SocialIcons>
      </Div3>
      <Nav />
    </Container>
  </>
);

export default Header;
