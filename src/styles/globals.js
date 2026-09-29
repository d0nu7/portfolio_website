import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { cssVariables } from '../themes/palette';

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    ${cssVariables()}
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  /* Scroll reveal, see hooks/useReveal. Only active once JS has run. */
  .reveal-ready [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .7s ease, transform .7s cubic-bezier(.2, .7, .2, 1);
  }
  .reveal-ready [data-reveal].is-revealed {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      transition-duration: .01ms !important;
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
    }
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
`;

export default GlobalStyles;
