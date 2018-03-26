import React, { Component } from 'react';
import Square from './Square';
import Score from './Score';
import { GameContainer, Squares } from './GameContainer';
import { checkWin, switchSquares, randomizeSquares } from './logic';

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

    const minS = 10;
    const maxS = 90;

    const minL = 20;
    const maxL = 85;

    const stepS = (maxS - minS) / (size - 1);
    const stepL = (maxL - minL) / (size - 1);

    let squares = new Array(size ** 2).fill(0).map((cell, i) => {
      const saturation = Math.floor(maxS - Math.floor(i / size) * stepS);
      const lightness = Math.floor(maxL - (i % size) * stepL);
      return { saturation, lightness, position: i, selected: false };
    });

    squares = randomizeSquares(squares);

    this.setState({ squares, hue, moves: 0, selectedIndex: -1 });
  };

  componentDidMount() {
    this.gameSetup();
  }

  newGame = () => {
    this.gameSetup();
  };

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
      squares = switchSquares(squares, id, selectedIndex);
      moves++;
      selectedIndex = -1;
    }

    this.setState({ squares, selectedIndex, moves });
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
          {checkWin(squares) && (
            <Score moves={moves} newGame={this.newGame} hue={hue} />
          )}
        </Squares>
      </GameContainer>
    );
  }
}

export default Game;
