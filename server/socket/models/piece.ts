import { getRandomInt } from 'client/utils/random';
import { BOARD } from '@server/socket/config/board';
import { CEIL_TYPES } from '@server/socket/config/cell-types';
import { COLORS } from '@server/socket/config/colors';
import { pieces } from '@server/socket/config/pieces';
import { Board } from './board';

export type PieceSerializeProps = {
  data: Record<string, number[]>;
  color: string;
};

type KeyType = 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' | 'Space';

interface IPiece {
  blocks: number[][];

  y: number;

  x: number;

  color: string;

  isDown: boolean;
}

class Piece implements IPiece {
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

  static copy(piece: Piece): Piece {
    const temp = new Piece();
    temp.blocks = piece.blocks;
    temp.color = piece.color;
    temp.y = 0;
    temp.x = 0;
    temp.isDown = false;
    return temp;
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

  move(board: Board, key: KeyType) {
    switch (key) {
    case 'ArrowDown':
      return this.moveDown(board, true);
    case 'ArrowLeft':
      return this.moveLeft(board, true);
    case 'ArrowRight':
      return this.moveRight(board, true);
    case 'ArrowUp':
      return this.rotate(board);
    case 'Space':
      return this.down(board);
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
    if (this.y - this.getBorder().height >= 0) {
      this.isDown = true;
    }
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

    if (!(
      this.moveLeft(board, false)
      && this.moveRight(board, false)
      && this.moveDown(board, false))) {
      this.blocks = blocks;
    }
  }

  checkPiece(board: Board, blocks: number[][], x: number, y: number) {
    for (let i = 0; i < blocks.length; i += 1) {
      for (let j = 0; j < blocks[i].length; j += 1) {
        if (blocks[i][j] === CEIL_TYPES.FILLED) {
          const x1 = j + x;
          const y1 = i + y;
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
export type { IPiece };
