import styled from "styled-components";

export const ResearchAuthors = styled.div`
  padding-left: 1rem;
  color: grey;
  font-size: 1rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    line-height: 15px;
    padding-top: 1rem;
  }
`;

export const ResearchTitle = styled.div`
  padding-left: 1rem;
  margin-bottom: -1rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    line-height: 20px;
  }
`;
export const ResearchYear = styled.div``;
export const ResearchHeaderYear = styled.div``;
export const ResearchHeaderTitle = styled.div``;

export const Table = styled.div`
display: block;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 4rem auto;
  place-items: left;

  cursor: pointer;

  font-size: 1.5rem;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.75);
  transition: 0.4s ease;
  &:hover {
    color: #fff;
    opacity: 1;
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.5rem;
  }
`;

export const TableCell = styled.div`
`;

export const DoiLink = styled.span`
  color: #5165ff;

`;
