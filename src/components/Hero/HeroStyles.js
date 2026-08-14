import styled from 'styled-components';

/*
 * There used to be an `sm` block here followed by an `md` block. Both match on
 * a phone and the later one wins, so the `sm` rules never applied. Collapsed
 * into the single rule that was actually in effect.
 */
export const LeftSection = styled.div`
  width: 100%;

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
`;
