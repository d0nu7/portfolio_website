import styled from 'styled-components';

export const StyledTable = styled.table`
  width: auto;
  flex: 1;
  display: grid;
  border-collapse: collapse;

`;

export const THead = styled.thead`

`;

export const TFoot = styled.tfoot`

`;

export const TBody = styled.tbody`

`;

export const TR = styled.tr`

`;

export const TH = styled.th`
text-align: left;



`;

export const TD = styled.td`

`;

// Navigation Links
export const NavLink = styled.a`
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