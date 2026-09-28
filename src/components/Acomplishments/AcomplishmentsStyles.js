import styled from "styled-components"

import { cardSurface } from "../../styles/GlobalComponents"

export const Boxes = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin: 24px 0 40px;

  @media ${props => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

export const Box = styled.li`
  ${cardSurface}
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  min-height: 150px;
  padding: 24px;

  @media ${props => props.theme.breakpoints.sm} {
    min-height: 0;
    padding: 20px;
    align-items: center;
  }
`

export const BoxNum = styled.h3`
  margin-bottom: 8px;
  color: var(--c-text-strong);
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 22px;
  }
  @media ${props => props.theme.breakpoints.sm} {
    font-size: 19px;
  }
`

export const BoxText = styled.p`
  color: rgba(255, 255, 255, .68);
  font-size: 15px;
  line-height: 1.5;

  span { display: block; }

  @media ${props => props.theme.breakpoints.sm} {
    font-size: 14px;
  }
`

export const BoxIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: var(--c-accent);

  svg { width: 56px; height: 56px; }

  @media ${props => props.theme.breakpoints.sm} {
    svg { width: 40px; height: 40px; }
  }
`
