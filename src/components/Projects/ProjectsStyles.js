import styled from 'styled-components';

import { cardHover, cardSurface } from '../../styles/GlobalComponents';

export const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 24px 0 40px;

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const CardLink = styled.a`
  ${cardSurface}
  ${cardHover}
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  color: inherit;

  &:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--c-accent) 60%, transparent);
    outline-offset: 3px;
  }
`;

export const ImgFrame = styled.div`
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--c-surface-2);
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;

  ${CardLink}:hover & { transform: scale(1.04); }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 24px 24px;
`;

export const HeaderThree = styled.h3`
  margin-bottom: 10px;
  color: var(--c-text-strong);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: .01em;
`;

export const CardInfo = styled.p`
  color: rgba(255, 255, 255, .68);
  font-size: 15px;
  line-height: 1.6;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 18px;
`;

export const Tag = styled.li`
  padding: 5px 11px;
  border-radius: 999px;
  color: var(--c-label);
  background: var(--c-chip-bg);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .03em;
`;
