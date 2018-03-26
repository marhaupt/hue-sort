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
  height: 100vmin;
  width: 100vmin;
  box-sizing: border-box;
  padding: 2vmin;
  /* margin: 3vmin; */
  display: grid;
  grid-gap: 1.5vmin;
  grid-template: repeat(${props => props.size}, 1fr) / repeat(
      ${props => props.size},
      1fr
    );
`;

class Game extends Component {
  state = {
    size: 6,
    hue: 100,
    squares: []
  };

  componentDidMount() {
    const { size } = this.state;
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

    this.setState({ squares });
  }

  toggleSelected = e => {
    let { squares } = this.state;

    const prevSel = squares[e.target.id].selected;

    squares[e.target.id].selected = !prevSel;

    this.setState({ squares });
    console.log(e.target.id);
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
