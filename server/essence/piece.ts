import { getRandomInt } from 'client/utils/random';
import { BOARD } from 'server/config/board';
import { CEIL_TYPES } from 'server/config/cell-types';
import { COLORS } from 'server/config/colors';
import { pieces } from 'server/config/pieces';
import { Board } from './board';

export type PieceSerializeProps = {
  data: Record<string, number[]>;
  color: string;
};

class Piece {
  blocks: number[][];

  y: number;

  x: number;

  color: string;

  isDown: boolean;

  constructor() {
    this.blocks = pieces[getRandomInt(0, pieces.length - 1)];
    this.y = 0;
    this.x = 0;
    this.color = COLORS[getRandomInt(0, COLORS.length - 1)];
    this.isDown = false;
  }

  getBorder() {
    let height = 0;
    let width = 0;

    for (let i = 0; i < this.blocks.length; i += 1) {
      for (let j = 0; j < this.blocks[0].length; j += 1) {
        if (this.blocks[i][j] === CEIL_TYPES.FILLED) {
          if (height < i + 1) {
            height = i + 1;
          }
          if (width < j + 1) {
            width = j + 1;
          }
        }
      }
    }
    return { height, width };
  }

  static generatePieces(number: number) {
    const piecs = [] as Piece[];
    for (let i = 0; i < number; i += 1) {
      piecs.push(new Piece());
    }
    return piecs;
  }

  move(
    board: Board,
    key: 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' | 'Space',
  ) {
    switch (key) {
    case 'ArrowDown':
      this.moveDown(board, true);
      break;
    case 'ArrowLeft':
      this.moveLeft(board, true);
      break;
    case 'ArrowRight':
      this.moveRight(board, true);
      break;
    case 'ArrowUp':
      this.rotate(board);
      break;
    case 'Space':
      this.down(board);
      break;
    default:
      break;
    }
  }

  setDown() {
    this.isDown = true;
  }

  moveDown(board: Board, isStep: boolean) {
    if (this.y + this.getBorder().height < BOARD.ROW
      && !this.checkPiece(board, this.blocks, this.x, this.y + 1)) {
      if (isStep) { this.y += 1; }
      return true;
    }
    this.isDown = true;
    return false;
  }

  moveLeft(board: Board, isStep: boolean) {
    if (this.x > 0 && !this.checkPiece(board, this.blocks, this.x - 1, this.y)) {
      if (isStep) { this.x -= 1; }
      return true;
    }
    return false;
  }

  moveRight(board: Board, isStep: boolean) {
    if (this.x + this.getBorder().width < BOARD.COL
      && !this.checkPiece(board, this.blocks, this.x + 1, this.y)) {
      if (isStep) { this.x += 1; }
      return true;
    }
    return false;
  }

  down(board: Board) {
    while (this.moveDown(board, true));
  }

  rotate(board: Board) {
    const width = this.blocks.length;
    const height = this.blocks[0].length;

    const rotateBlocks = new Array(height);
    const { blocks } = this;

    for (let y = 0; y < height; y += 1) {
      rotateBlocks[y] = new Array(width);
      for (let x = 0; x < width; x += 1) {
        rotateBlocks[y][x] = this.blocks[width - 1 - x][y];
      }
    }

    this.blocks = rotateBlocks;
    if (!(this.moveDown(board, false)
      && this.moveLeft(board, false)
      && this.moveRight(board, false))) {
      this.blocks = blocks;
    }
  }

  checkPiece(board: Board, blocks: number[][], x: number, y: number) {
    for (let i = 0; i < blocks.length; i += 1) {
      for (let j = 0; j < blocks[i].length; j += 1) {
        if (blocks[i][j] === CEIL_TYPES.FILLED) {
          const x1 = j + x;
          const y1 = i + y;
          console.log(x1, y1);
          if (x1 < 0 || x1 >= BOARD.COL || y1 < 0 || y1 >= BOARD.ROW || board.board[y1][x1] !== '') {
            return true;
          }
        }
      }
    }
    return false;
  }

  serialize() {
    const data = {} as Record<string, number[]>;
    this.blocks.forEach((cols, rowCeil) => {
      const rowId = rowCeil + this.y;
      if (!(rowId in data)) {
        data[rowId] = [];
      }
      cols.forEach((isSelect, colCeil) => {
        if (isSelect === CEIL_TYPES.FILLED) {
          data[rowId].push(colCeil + this.x);
        }
      });
    });
    return { data, color: this.color };
  }
}

export { Piece };
