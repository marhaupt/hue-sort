import React from 'react';
import styled from 'styled-components';

const Squarish = styled.p`
  margin: 0;
  border-radius: 1%;
  box-shadow: 0.1vmin 0.3vmin
    ${props =>
      props.selected
        ? '0.1vmin 0.3vmin rgba(30,30,30,0.7)'
        : '1vmin 0 rgba(80,80,80,0.5)'};
  background-color: hsl(
    ${props => props.hue},
    ${props => props.saturation}%,
    ${props => props.lightness}%
  );
  transition: all 200ms ease-in-out;

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
