import React, { Component } from 'react';
import styled from 'styled-components';
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

class Game extends Component {
  state = {
    size: 6,
    hue: 100,
    squares: [],
    selectedIndex: -1
  };

  componentDidMount() {
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

    squares = this.randomizeField(squares);

    this.setState({ squares, hue });
  }

  toggleSelected = e => {
    let { squares, selectedIndex } = this.state;

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
      selectedIndex = -1;
    }

    if (this.checkWin(squares)) {
      console.log('WINNER');
    }

    this.setState({ squares, selectedIndex });
  };

  switchSquares = (squares, first, second) => {
    const firstSquare = Object.assign({}, squares[first]);
    const secondSquare = Object.assign({}, squares[second]);

    squares[first] = secondSquare;
    squares[second] = firstSquare;

    squares[first].selected = false;
    squares[second].selected = false;

    console.log(first + ' <=> ' + second);

    return squares;
  };

  randomizeField = squares => {
    const { size } = this.state;

    let problemIndex = [0, size - 1, squares.length - size, squares.length - 1];

    for (let i = 0; i < 1; i++) {
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

    console.log(troubles);
    return troubles > 0 ? false : true;
  };

  render() {
    const { size, squares, hue } = this.state;
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
            />
          ))}
        </Squares>
      </GameContainer>
    );
  }
}

export default Game;
