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
