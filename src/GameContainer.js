import styled from 'styled-components';

export const GameContainer = styled.main`
  background-color: hsl(${props => props.hue}, 90%, 80%);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Squares = styled.div`
  color: #f0f0f0;
  height: 96vmin;
  width: 96vmin;
  /* margin: 3vmin; */
  display: grid;
  /* grid-gap: 1.5vmin; */
  box-shadow: 0.1vmin 0.3vmin 1vmin 0 rgba(80, 80, 80, 0.5);
  grid-template: repeat(${props => props.size}, 1fr) / repeat(
      ${props => props.size},
      1fr
    );
`;
