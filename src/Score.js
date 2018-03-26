import React from 'react';
import styled, { keyframes } from 'styled-components';

const show = keyframes`
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
`;

const Scorish = styled.div`
  background-color: rgba(50, 50, 50, 0.5);
  grid-area: 1 / 1 / -1 / -1;
  text-transform: uppercase;
  font-size: 14vmin;
  color: rgba(240, 240, 240, 0.9);
  text-align: center;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  padding: 10vmin 15vmin;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${show} 500ms ease-in-out 250ms forwards;
  text-shadow: 0 0 0.4em rgba(50, 50, 50, 0.2);
`;

const NewGame = styled.button`
  border: none;
  background-color: rgba(240, 240, 240, 0.9);
  color: rgba(50, 50, 50, 0.85);
  font-size: 0.8em;
  font-family: inherit;
  text-transform: uppercase;
  padding: 0.15em 0.4em;
  margin-top: 0.3em;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  box-shadow: 0 0.1em 0.5em rgba(50, 50, 50, 0.5);

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${props => props.color};
    transform: translateY(-0.05em);
    box-shadow: 0 0.25em 0.6em 0.05em rgba(50, 50, 50, 0.5);
  }
`;

const Score = ({ moves, hue, newGame }) => {
  const color = `hsla(${hue}, 50%, 50%)`;

  return (
    <Scorish>
      You won<br />in {moves} move{(moves > 1 || moves === 0) && 's'}
      <NewGame onClick={newGame} color={color}>
        Again?
      </NewGame>
    </Scorish>
  );
};

export default Score;
