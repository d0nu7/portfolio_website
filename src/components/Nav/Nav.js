import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import React from "react";

const StyledAnchor = styled.a`
  padding: 1rem 1rem;
  display: block;
  width:100%;
  align-items: center;
  position: relative;
  //text-transform: uppercase;
  font-weight: 900;
  font-size: 1em;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  color: #b8b7ad;
  &:hover {
    color: #fff;
    opacity: 1;
    cursor: pointer;
    transition: 0.4s ease;

  }
`;

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: 'rgba(255, 255, 255, 0.75)'
  },
  bmBurgerBarsHover: {
    background: '#fff',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#212D45',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }
  render() {
    return (
      <Menu right styles={styles}
        noOverlay
        width={280}
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
      >
          <StyledAnchor key="0" href="#header" onClick={() => this.closeMenu()}><span><b>Radomir Dinic</b></span></StyledAnchor>
          <StyledAnchor key="1" href="#about" onClick={() => this.closeMenu()}><span>About</span></StyledAnchor>
          <StyledAnchor key="2" href="#tech" onClick={() => this.closeMenu()}><span>Skills</span></StyledAnchor>
          <StyledAnchor key="3" href="#teaching" onClick={() => this.closeMenu()}><span>Teaching</span></StyledAnchor>
          <StyledAnchor key="4" href="#acomplishments" onClick={() => this.closeMenu()}><span>Acomplishments</span></StyledAnchor>
          <StyledAnchor key="5" href="#projects" onClick={() => this.closeMenu()}><span>Projects</span></StyledAnchor>
          <StyledAnchor key="6" href="#research" onClick={() => this.closeMenu()}><span>Publications</span></StyledAnchor>
      </Menu>
    );
  }
}

export default Nav;
