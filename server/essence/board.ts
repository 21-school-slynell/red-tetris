import { BOARD } from 'server/config/board';
import { CEIL_TYPES } from 'server/config/cell-types';
import { Piece } from './piece';

export class Board {
  board: string[][];

  constructor() {
    this.board = Board.createMap();
  }

  setPiece(piece: Piece) {
    const { blocks } = piece;
    if (piece.isDown) {
      for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks[i].length; j += 1) {
          if (blocks[i][j] === CEIL_TYPES.FILLED) {
            const x = j + piece.x;
            const y = i + piece.y;
            if (this.board[y][x] === '') {
              this.board[y][x] = piece.color;
            }
          }
        }
      }
    }
  }

  static createMap() {
    const board = [];
    for (let i = 0; i < BOARD.ROW; i += 1) {
      const row = [];
      for (let j = 0; j < BOARD.COL; j += 1) {
        row.push('');
      }
      board.push(row);
    }
    return board;
  }

  serialize() {
    const ser = {} as Record<string, Record<string, number[]>>;
    const { board } = this;
    for (let i = 0; i < BOARD.ROW; i += 1) {
      for (let j = 0; j < BOARD.COL; j += 1) {
        const color = board[i][j];
        if (color.length) {
          if (!(color in ser)) {
            ser[color] = {};
          }
          if (!(i in ser[color])) {
            ser[color][i] = [];
          }
          ser[color][i].push(j);
        }
      }
    }

    return Object.keys(ser).map((color) => ({ color, data: ser[color] }));
  }
}
