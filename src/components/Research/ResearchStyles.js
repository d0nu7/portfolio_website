import styled from "styled-components";

export const PubList = styled.ol`
  margin: 16px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, .08);
`;

export const PubLink = styled.a`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 16px;
  padding: 16px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  color: rgba(255, 255, 255, .78);
  transition: background-color .2s ease, color .2s ease;

  &:hover {
    color: var(--c-text-strong);
    background-color: rgba(255, 255, 255, .03);
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 10px;
    padding: 14px 4px;
  }
`;

export const ResearchYear = styled.span`
  color: var(--c-accent);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
`;

export const ResearchTitle = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.5;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 14px;
  }
`;

export const ResearchAuthors = styled.span`
  display: block;
  margin-top: 4px;
  color: rgba(255, 255, 255, .5);
  font-size: 13px;
  line-height: 1.5;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 12px;
  }
`;
