import styled from "styled-components";

import { cardSurface } from "../../styles/GlobalComponents";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 24px 0 40px;

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const Card = styled.article`
  ${cardSurface}
  display: flex;
  flex-direction: column;
  padding: 28px 26px 24px;
`;

export const CardTitle = styled.h3`
  color: var(--c-text-strong);
  font-size: 22px;
  font-weight: 700;
`;

export const CardText = styled.p`
  margin: 12px 0 18px;
  color: rgba(255, 255, 255, .72);
  font-size: 15px;
  line-height: 1.6;
`;

export const CardList = styled.ul`
  display: grid;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, .08);

  li {
    position: relative;
    padding-left: 16px;
    color: rgba(255, 255, 255, .62);
    font-size: 14px;
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

export const CardLink = styled.a`
  margin-top: auto;
  padding-top: 20px;
  color: var(--c-accent);
  font-size: 15px;
  font-weight: 700;
  transition: color .2s ease;

  &:hover { color: var(--c-accent-soft); }
`;
