export const checkWin = squares => {
  let troubles = 0;
  squares.forEach((sq, i) => {
    if (sq.position !== i) troubles++;
  });

  return troubles > 0 ? false : true;
};

export const switchSquares = (squares, first, second) => {
  const firstSquare = Object.assign({}, squares[first]);
  const secondSquare = Object.assign({}, squares[second]);

  squares[first] = secondSquare;
  squares[second] = firstSquare;

  squares[first].selected = false;
  squares[second].selected = false;

  return squares;
};

export const randomizeSquares = (squares, difficulty) => {
  const size = Math.sqrt(squares.length);

  difficulty = difficulty || 1;

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

    squares = switchSquares(squares, first, second);
  }

  return squares;
};
