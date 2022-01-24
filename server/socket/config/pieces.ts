import { CEIL_TYPES } from './cell-types';

const O = CEIL_TYPES.EMPTY;
const X = CEIL_TYPES.FILLED;

const pieceI = [
  [X, X, X, X],
];

const pieceJ = [
  [X, O, O],
  [X, X, X],
];

const pieceL = [
  [O, O, X],
  [X, X, X],
];

const pieceO = [
  [X, X],
  [X, X],
];

const pieceS = [
  [O, X, X],
  [X, X, O],
];

const pieceT = [
  [O, X, O],
  [X, X, X],
];

const pieceZ = [
  [X, X, O],
  [O, X, X],
];

const pieces = [pieceI, pieceJ, pieceL, pieceO, pieceS, pieceT, pieceZ];

export { pieces };
