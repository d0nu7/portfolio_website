import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaResearchgate } from "react-icons/fa";

import { Container, Div1, Div2, Div3, NavLink, SocialIcons } from './HeaderStyles';
import SvgRadiFace from '../../CustomIcons/RadiFace';


const Header = () =>  (
  <Container>
    <Div1>
      <Link href="/">
        <span style={{ display: 'flex', alignItems: 'center', color:"white" }}>
          <SvgRadiFace  height="6rem"  /> <span style={{marginLeft: "1rem"} } ><b>Ra</b>domir<br/><b>Di</b>nic</span>
        </span>
      </Link>
    </Div1>
    <Div2>
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
    </Div2>
      <Div3>
        <SocialIcons href="https://github.com/d0nu7">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/radomir-dinic-830507a0/">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.researchgate.net/profile/Radomir-Dinic">
          <FaResearchgate size="3rem"/>
        </SocialIcons>
      </Div3>
    </Container>
);

export default Header;
