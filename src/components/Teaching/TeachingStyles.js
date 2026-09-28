import styled from 'styled-components';

import { cardSurface } from '../../styles/GlobalComponents';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 24px 0 40px;

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const TeachingCard = styled.div`
  ${cardSurface}
  padding: 26px 26px 22px;
`;

export const CardTitle = styled.h3`
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  color: var(--c-label);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: .02em;
`;

export const CardList = styled.ul`
  display: grid;
  gap: 10px;

  li {
    position: relative;
    padding-left: 16px;
    color: rgba(255, 255, 255, .75);
    font-size: 15px;
    line-height: 1.45;
  }

  li::before {
    content: "";
    position: absolute;
    top: .6em;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--c-accent);
  }
`;

export const ClassLink = styled.a`
  color: inherit;
  transition: color .2s ease;

  &:hover { color: var(--c-text-strong); }
`;
