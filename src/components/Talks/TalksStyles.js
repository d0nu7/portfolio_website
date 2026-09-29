import styled from "styled-components";

// Shared by Talks and Recognition: a year column plus title and meta line.
export const RowList = styled.ol`
  margin: 16px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, .08);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 16px;
  padding: 16px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  color: rgba(255, 255, 255, .82);
  transition: background-color .2s ease, color .2s ease;

  ${({ $link }) => $link && `
    &:hover { color: var(--c-text-strong); background-color: rgba(255, 255, 255, .03); }
  `}

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 66px minmax(0, 1fr);
    gap: 10px;
    padding: 14px 4px;
  }
`;

export const RowYear = styled.span`
  color: var(--c-accent);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
`;

export const RowMain = styled.span`
  display: block;
`;

export const RowTitle = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.5;

  @media ${(props) => props.theme.breakpoints.sm} { font-size: 14px; }
`;

export const RowMeta = styled.span`
  display: block;
  margin-top: 3px;
  color: rgba(255, 255, 255, .5);
  font-size: 13px;
  line-height: 1.5;

  @media ${(props) => props.theme.breakpoints.sm} { font-size: 12px; }
`;

// Small type label ("TALK", "MEDIA", ...) in front of the organisation.
export const RowType = styled.span`
  display: inline-block;
  margin-right: 8px;
  padding: 1px 7px;
  border-radius: 999px;
  color: var(--c-accent-soft);
  background: var(--c-chip-bg);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  vertical-align: 1px;
`;

export const SubTitle = styled.h3`
  margin-top: 8px;
  color: var(--c-label);
  font-size: 20px;
  font-weight: 700;
`;
