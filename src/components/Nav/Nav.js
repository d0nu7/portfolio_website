import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import React from "react";

const StyledAnchor = styled.a`
  padding: 1rem 1rem;
  display: block;
  width: 100%;
  align-items: center;
  position: relative;
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

// Position and size of the burger button are set in CSS (src/styles/globals.js)
// so they can respond to breakpoints -- inline styles cannot carry media
// queries. Everything below is purely cosmetic.
const styles = {
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
    // Without an explicit top the panel starts at its static position inside
    // the header, so it sat ~36px down and ran the same amount off the bottom.
    top: 0,
    height: '100%'
  },
  bmMenu: {
    background: 'var(--c-surface-2)',
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
        // A fixed 280px panel leaves almost nothing visible on a 320px screen.
        width="min(280px, 85vw)"
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
      >
          <StyledAnchor key="0" href="/" onClick={() => this.closeMenu()}><span><b>Radomir Dinic</b></span></StyledAnchor>
          <StyledAnchor key="1" href="/#work" onClick={() => this.closeMenu()}><span>What I do</span></StyledAnchor>
          <StyledAnchor key="2" href="/#now" onClick={() => this.closeMenu()}><span>Now</span></StyledAnchor>
          <StyledAnchor key="3" href="/#projects" onClick={() => this.closeMenu()}><span>Selected work</span></StyledAnchor>
          <StyledAnchor key="4" href="/#talks" onClick={() => this.closeMenu()}><span>Talks & Media</span></StyledAnchor>
          <StyledAnchor key="5" href="/#recognition" onClick={() => this.closeMenu()}><span>Awards & Publications</span></StyledAnchor>
          <StyledAnchor key="6" href="/#about" onClick={() => this.closeMenu()}><span>About</span></StyledAnchor>
          <StyledAnchor key="8" href="/#contact" onClick={() => this.closeMenu()}><span>Contact</span></StyledAnchor>
          <StyledAnchor key="7" href="/ki-schulungen/" onClick={() => this.closeMenu()}><span>{this.props.lang === 'de' ? 'KI-Schulungen' : 'AI trainings'}</span></StyledAnchor>
      </Menu>
    );
  }
}

export default Nav;
