import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import React from "react";

const StyledAnchor = styled.a`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
  //text-transform: uppercase;
  font-weight: 900;
  font-size: 1em;
  border: 0;
  cursor: pointer;
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
        <Link href="#about">
          <StyledAnchor onClick={() => this.closeMenu()}>About</StyledAnchor>
        </Link>
        <Link href="#tech">
          <StyledAnchor onClick={() => this.closeMenu()}>Skills</StyledAnchor>
        </Link>
        <Link href="#teaching">
          <StyledAnchor onClick={() => this.closeMenu()}>Teaching</StyledAnchor>
        </Link>
        <Link href="#acomplishments">
          <StyledAnchor onClick={() => this.closeMenu()}>Acomplishments</StyledAnchor>
        </Link>
        <Link href="#projects">
          <StyledAnchor onClick={() => this.closeMenu()}>Projects</StyledAnchor>
        </Link>        
        <Link href="#research">
          <StyledAnchor onClick={() => this.closeMenu()}>Publications</StyledAnchor>
        </Link>
      </Menu>
    );
  }
}

export default Nav;
