import { PLAYER_STATUSES } from '../constants';
import { Board } from './board';
import { Piece } from './piece';

interface IPlayer {
  id: any;
  login: any;
  roomName: string;
  isLeader: boolean;
  status: any;
  score: number;
  pieces: Piece[];
  placedPiecesCount: number;
  board: Board;
  reset: () => void;
}

class Player implements IPlayer {
  id: any;

  login: any;

  roomName: string;

  isLeader: boolean;

  status: any;

  score: number;

  pieces: Piece[];

  placedPiecesCount: number;

  board: Board;

  constructor(id: string, login: string, roomName: string, pieces: Piece[]) {
    this.id = id;
    this.login = login;
    this.isLeader = false;
    this.status = PLAYER_STATUSES.WAITING;
    this.roomName = roomName;
    this.score = 0;
    this.pieces = pieces.map((piece) => Piece.copy(piece));
    this.placedPiecesCount = 0;
    this.board = new Board();
    // this.board = new Board(rows, columns);
  }
  // addPieces(pieces) {
  //   const indexedPieces = pieces.map((piece, index) => {
  //     return Object.assign(clone(piece), {
  //       index: this.placedPiecesCount + this.pieces.length + index,
  //       x: Math.floor((this.board.blocks[0].length - piece.blocks[0].length) / 2),
  //     });
  //   });
  //   this.pieces = [...this.pieces, ...indexedPieces];
  // }

  // get activePiece() {
  //   return this.pieces[0];
  // }

  // getNextPieces(count) {
  //   return this.pieces.slice(1, 1 + count);
  // }

  // updateActivePiece() {
  //   if (this.pieces.shift()) {
  //     this.placedPiecesCount++;
  //   }
  // }

  // putPiece(piece) {
  //   this.board.putPiece(piece);
  //   const numberOfFilledRows = this.board.countFilledRows();

  //   this.score += Game.getScore(numberOfFilledRows);
  //   this.board.clearBoard();
  //   this.updateActivePiece();

  //   return numberOfFilledRows;
  // }

  reset() {
    this.status = PLAYER_STATUSES.WAITING;
    this.score = 0;
    this.pieces = [];
    this.placedPiecesCount = 0;
    // this.board.reset();
  }
}

export { Player };
export type { IPlayer };
