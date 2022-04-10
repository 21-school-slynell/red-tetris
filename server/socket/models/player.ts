import { PLAYER_STATUSES } from '../constants';
import { Board } from './board';
import { Piece } from './piece';

interface IPlayer {
  id: any;
  login: any;
  description?: string;
  roomName: string;
  isLeader: boolean;
  status: any;
  score: number;
  fillRow: number;
  pieces: Piece[];
  placedPiecesCount: number;
  board: Board;
  reset: () => void;
  finish: () => void;
  setFillRow: (fillRow: number) => void;
  setScore: (score: number) => void;
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

  fillRow: number;

  description?: string;

  constructor(id: string, login: string, description: string, roomName: string, pieces: Piece[]) {
    this.id = id;
    this.login = login;
    this.isLeader = false;
    this.status = PLAYER_STATUSES.WAITING;
    this.roomName = roomName;
    this.score = 0;
    this.pieces = pieces.map((piece) => Piece.copy(piece));
    this.placedPiecesCount = 0;
    this.fillRow = 0;
    this.board = new Board();
    this.description = description;
  }

  reset() {
    this.status = PLAYER_STATUSES.WAITING;
    this.score = 0;
    this.pieces = [];
    this.placedPiecesCount = 0;
  }

  finish() {
    this.status = PLAYER_STATUSES.FINISHED;
  }

  setScore(score: number) {
    this.score = score;
  }

  setFillRow(fillRow: number) {
    this.fillRow = fillRow;
  }
}

export { Player };
export type { IPlayer };
