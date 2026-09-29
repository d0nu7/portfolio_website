import styled from "styled-components";

import { cardSurface } from "../../styles/GlobalComponents";

export const Box = styled.section`
  ${cardSurface}
  max-width: 1040px;
  margin: 72px auto 24px;
  padding: 48px 48px 8px;

  > div:last-child { margin-bottom: 40px; }

  @media ${(props) => props.theme.breakpoints.lg} {
    margin: 64px 48px 24px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    margin: 48px 16px 16px;
    padding: 32px 20px 0;
  }
`;

export const Title = styled.h2`
  max-width: 720px;
  color: var(--c-text-strong);
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -.02em;

  @media ${(props) => props.theme.breakpoints.sm} { font-size: 28px; }
`;

export const Text = styled.p`
  max-width: 640px;
  margin: 16px 0 28px;
  color: rgba(255, 255, 255, .72);
  font-size: 18px;
  line-height: 1.6;

  @media ${(props) => props.theme.breakpoints.sm} { font-size: 15px; }
`;
