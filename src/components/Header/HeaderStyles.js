import styled from 'styled-components';

import { BURGER, burgerReserve } from '../Nav/navMetrics';

/*
 * The header used to be a 5-column grid whose last column was pushed left with
 * a hard-coded `margin-right`. That only worked at the two widths it was tuned
 * for: below ~500px the reserved column became narrower than the icons inside
 * it, so the icons overflowed their grid area and ended up sitting under the
 * fixed burger button.
 *
 * It is a flex row now. The space for the burger button is reserved as padding
 * derived from the button's own geometry (see ../Nav/navMetrics), so the two
 * can no longer drift apart, and the logo and icons scale down on narrow
 * screens instead of fighting over the leftover width.
 */
export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 1rem 1rem;
  /* Keep the fixed burger button's footprint free. */
  padding-right: ${burgerReserve(BURGER.base)}px;

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 1.6rem 1rem 1rem;
    padding-right: ${burgerReserve(BURGER.sm)}px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 1.2rem 0.8rem 0.8rem;
    padding-right: ${burgerReserve(BURGER.xs)}px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  margin-right: 1.6rem;

  @media ${(props) => props.theme.breakpoints.xs} {
    margin-right: 0.8rem;
  }
`;

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  min-width: 0;

  svg {
    flex-shrink: 0;
    height: 6rem;
    width: auto;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    svg {
      height: 5rem;
    }
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    svg {
      height: 4.2rem;
    }
  }
`;

export const LogoText = styled.span`
  margin-left: 1rem;
  font-size: 1.6rem;
  line-height: 1.3;
  white-space: nowrap;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: 0.8rem;
    font-size: 1.5rem;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    margin-left: 0.6rem;
    font-size: 1.3rem;
  }
`;

/*
 * `margin-left: auto` rather than `justify-content: space-between` on the
 * container: react-burger-menu renders a zero-width wrapper div as a third
 * child of the header, which would otherwise be treated as the last item and
 * leave the icons stranded in the middle.
 */
export const Div3 = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;

  /* Sized here rather than on SocialIcons, which the footer reuses at full
     size where there is room for it. */
  a svg {
    width: 3rem;
    height: 3rem;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    a {
      padding: 6px;
    }
    a svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    a {
      padding: 5px;
    }
    a svg {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`;

// Social Icons
export const SocialIcons = styled.a`
  display: inline-flex;
  transition: 0.3s ease;
  color: white;
  border-radius: 50px;
  padding: 8px;

  &:hover {
    background-color: #212d45;
    transform: scale(1.2);
    cursor: pointer;
  }
`;
