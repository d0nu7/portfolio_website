import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  padding-top: 72px;

  @media ${(props) => props.theme.breakpoints.md} {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 48px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding-top: 24px;
  }
`;

export const Tagline = styled.p`
  margin-bottom: 20px;
  color: var(--c-accent-soft);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;

  @media ${(props) => props.theme.breakpoints.md} { font-size: 20px; }
  @media ${(props) => props.theme.breakpoints.sm} { font-size: 17px; margin-bottom: 14px; }
`;
