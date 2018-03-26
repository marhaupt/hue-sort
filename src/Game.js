import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Square from './Square';

const GameContainer = styled.main`
  background-color: hsl(${props => props.hue}, 90%, 80%);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Squares = styled.div`
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
  padding: 10vmin 15vmin 20vmin 10vmin;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${show} 500ms ease-in-out 150ms forwards;
`;

const Score = ({ moves }) => (
  <Scorish>
    You won<br />in {moves} move{(moves > 1 || moves === 0) && 's'}
  </Scorish>
);

class Game extends Component {
  state = {
    size: 6,
    hue: 100,
    squares: [],
    moves: 0,
    selectedIndex: -1
  };

  gameSetup = () => {
    const { size } = this.state;

    const hue = Math.floor(Math.random() * 360);

    const minS = 20;
    const maxS = 90;

    const minL = 25;
    const maxL = 80;

    const stepS = (maxS - minS) / (size - 1);
    const stepL = (maxL - minL) / (size - 1);

    let squares = new Array(size ** 2).fill(0).map((cell, i) => {
      const saturation = Math.floor(maxS - Math.floor(i / size) * stepS);
      const lightness = Math.floor(maxL - (i % size) * stepL);
      return { saturation, lightness, position: i, selected: false };
    });

    squares = this.randomizeSquares(squares);

    this.setState({ squares, hue });
  };

  componentDidMount() {
    this.gameSetup();
  }

  toggleSelected = e => {
    let { squares, selectedIndex, moves } = this.state;

    const id = e.target.id;
    const prevSel = squares[id].selected;

    if (selectedIndex === -1) {
      squares[id].selected = !prevSel;
      selectedIndex = id;
    } else if (selectedIndex === id) {
      squares[id].selected = !prevSel;
      selectedIndex = -1;
    } else {
      squares = this.switchSquares(squares, id, selectedIndex);
      moves++;
      selectedIndex = -1;
    }

    this.setState({ squares, selectedIndex, moves });
  };

  switchSquares = (squares, first, second) => {
    const firstSquare = Object.assign({}, squares[first]);
    const secondSquare = Object.assign({}, squares[second]);

    squares[first] = secondSquare;
    squares[second] = firstSquare;

    squares[first].selected = false;
    squares[second].selected = false;

    return squares;
  };

  randomizeSquares = (squares, difficulty) => {
    const size = Math.sqrt(squares.length);

    difficulty = difficulty || size;

    let problemIndex = [0, size - 1, squares.length - size, squares.length - 1];

    for (let i = 0; i < difficulty; i++) {
      let first = 0;
      while (problemIndex.includes(first)) {
        first = Math.floor(Math.random() * size ** 2);
      }

      let second = 0;
      while ([...problemIndex, first].includes(second)) {
        second = Math.floor(Math.random() * size ** 2);
      }

      squares = this.switchSquares(squares, first, second);
    }

    return squares;
  };

  checkWin = squares => {
    let troubles = 0;
    squares.forEach((sq, i) => {
      if (sq.position !== i) troubles++;
    });

    return troubles > 0 ? false : true;
  };

  render() {
    const { size, squares, hue, moves } = this.state;
    return (
      <GameContainer hue={hue}>
        <Squares size={size}>
          {squares.map((sq, i) => (
            <Square
              hue={hue}
              saturation={sq.saturation}
              lightness={sq.lightness}
              key={sq.position}
              position={sq.position}
              selected={sq.selected}
              index={i}
              toggleSelected={this.toggleSelected}
              size={size}
            />
          ))}
          {this.checkWin(squares) && <Score moves={moves} />}
        </Squares>
      </GameContainer>
    );
  }
}

export default Game;
