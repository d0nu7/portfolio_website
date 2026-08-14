import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { BURGER } from '../components/Nav/navMetrics';

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

  }
  body {
    font-family: ${props => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${props => props.theme.colors.background1};
    color: ${props => props.theme.colors.primary1};
    cursor: default;

  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${props => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }

  /* Burger button geometry.
     This lives in CSS rather than in the inline style object react-burger-menu
     takes, because inline styles cannot carry media queries -- and the button
     has to shrink and move in on small screens so it stops colliding with the
     social icons. The header reserves matching space via burgerReserve(). */
  .bm-burger-button {
    position: fixed;
    width: ${BURGER.base.width}px;
    height: ${BURGER.base.height}px;
    right: ${BURGER.base.right}px;
    top: ${BURGER.base.top}px;
  }

  @media ${props => props.theme.breakpoints.sm} {
    .bm-burger-button {
      width: ${BURGER.sm.width}px;
      height: ${BURGER.sm.height}px;
      right: ${BURGER.sm.right}px;
      top: ${BURGER.sm.top}px;
    }
  }

  @media ${props => props.theme.breakpoints.xs} {
    .bm-burger-button {
      width: ${BURGER.xs.width}px;
      height: ${BURGER.xs.height}px;
      right: ${BURGER.xs.right}px;
      top: ${BURGER.xs.top}px;
    }
  }
`;

export default GlobalStyles;
