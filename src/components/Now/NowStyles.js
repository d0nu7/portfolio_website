import styled from "styled-components";

import { cardHover, cardSurface } from "../../styles/GlobalComponents";

export const Tiles = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 0 0 40px;

  @media ${(props) => props.theme.breakpoints.lg} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media ${(props) => props.theme.breakpoints.sm} { grid-template-columns: 1fr; gap: 12px; }
`;

export const Tile = styled.li`
  ${cardSurface}
  ${cardHover}
  padding: 22px 22px 24px;

  > span {
    display: block;
    margin-bottom: 14px;
    color: var(--c-accent-2);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .12em;
  }
`;

export const TileTitle = styled.h3`
  color: var(--c-text-strong);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
`;

export const TileText = styled.p`
  margin-top: 10px;
  color: rgba(255, 255, 255, .66);
  font-size: 14px;
  line-height: 1.55;
`;
