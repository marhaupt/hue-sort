import React from 'react';
import styled from 'styled-components';
import { darken, complement } from 'polished';

const Squarish = styled.p`
  margin: 0;
  transition: all 200ms ease-in-out;
  transform: ${props => props.selected && 'scale(1.15)'};
  border: 0.5vmin solid
    ${props =>
      props.position === props.index ? 'transparent' : props.colors.border};
  background-color: ${props => props.colors.normal};
  grid-area: ${props => props.placement};

  &:hover {
    background-color: ${props => props.colors.hover};
    transform: scale(1.15);
  }
`;

const Square = ({ hue, saturation, lightness, index, size, ...props }) => {
  const toggleSelected = props.toggleSelected.bind(this);
  const colors = {};

  colors.normal = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  colors.hover = darken(0.2, colors.normal);

  colors.border = complement(`hsla(${hue}, 65%, 55%, 0.8)`);

  const placement = `${Math.floor(index / size) + 1} / ${index % size +
    1} / span 1 / span 1`;

  return (
    <Squarish
      onClick={toggleSelected}
      id={index}
      colors={colors}
      {...props}
      placement={placement}
      index={index}
    />
  );
};

export default Square;
