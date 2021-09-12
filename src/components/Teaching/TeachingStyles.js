import styled from 'styled-components';


export const GridContainer = styled.section`
display: flex;
flex-wrap: wrap;
justify-content: center;
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
padding: 3rem;
place-items: center;
column-gap: 2rem;
row-gap: 3rem;
@media ${(props) => props.theme.breakpoints.sm} {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 0;
}

`
export const TeachingCard = styled.div`

  border-radius: 10px;
  //box-shadow: 3px 3px 20px rgba(80, 78, 78, 0.5);
  width: 400px;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;
export const TitleContent = styled.div`
  text-align: center;
  z-index: 20;
  width: 100%;

`;


export const HeaderThree = styled.h3`
  font-weight: 500;
  letter-spacing: 2px;
  color: #9cc9e3;
  padding: .5rem 0;
  font-size: ${(props) => props.title ? '4rem' : '3rem'};
`;

export const Hr = styled.hr`
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: #d0bb57;
`;

export const ClassTitle = styled.div`
text-align: center;
font-size: ${(props) => props.title ? '3rem' : '2rem'};

`;

export const ClassLink = styled.a`
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




