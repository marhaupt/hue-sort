import React from 'react';
import styled from 'styled-components';

const Squarish = styled.p`
  margin: 0;
  transition: all 200ms ease-in-out;
  transform: ${props => props.selected && 'scale(1.1)'};
  border: 0.5vmin solid
    ${props =>
      props.position === props.index ? 'transparent' : 'rgba(80, 80, 80, 0.2)'};
  background-color: hsl(
    ${props => props.hue},
    ${props => props.saturation}%,
    ${props => props.lightness}%
  );

  &:hover {
    background-color: hsl(
      ${props => props.hue},
      ${props => 0.8 * props.saturation}%,
      ${props => 0.8 * props.lightness}%
    );
  }
`;

const Square = props => {
  const toggleSelected = props.toggleSelected.bind(this);
  return <Squarish onClick={toggleSelected} id={props.index} {...props} />;
};

export default Square;

// box-shadow: 0.1vmin 0.3vmin
//   ${props =>
//     props.selected
//       ? '0.1vmin 0.3vmin rgba(30,30,30,0.7)'
//       : '1vmin 0 rgba(80,80,80,0.5)'};
