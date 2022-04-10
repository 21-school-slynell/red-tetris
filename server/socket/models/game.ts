/* eslint-disable no-param-reassign */
import { UserError } from '../errors/user-error';
import { GAME_STATUSES, PLAYER_STATUSES } from '../constants';
import { IPlayer } from './player';
import { Piece } from './piece';
// import { IPiece } from './piece';

type PlayerProps = IPlayer;

class Game {
  roomName: string;

  players: PlayerProps[];

  pieces: Piece[];

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = [];
    this.pieces = Piece.generatePieces(1000);
  }

  get activePlayers() {
    return this.players.filter((player) => player.status !== PLAYER_STATUSES.LEFT);
  }

  isFinish() {
    return this.activePlayers.find((player) => player.status !== PLAYER_STATUSES.FINISHED);
  }

  isEmpty() {
    return this.activePlayers.length === 0;
  }

  get status() {
    const isPending = this.players.every((player) => player.status === PLAYER_STATUSES.WAITING);
    const isCompleted = this.players.every((player) => (
      player.status === PLAYER_STATUSES.FINISHED || player.status === PLAYER_STATUSES.LEFT
    ));

    if (isPending) {
      return GAME_STATUSES.PENDING;
    } if (isCompleted) {
      return GAME_STATUSES.COMPLETED;
    }
    return GAME_STATUSES.RUNNING;
  }

  get admin() {
    return this.players.find((player) => player.isLeader);
  }

  assignAdmin() {
    const admin = this.activePlayers.find((player) => !player.isLeader);
    if (admin) {
      admin.isLeader = true;
    }

    return admin;
  }

  getPlayersList() {
    const scores = [...new Set(this.players.map(({ score }) => score))];
    scores.sort((a, b) => b - a);

    return this.players
      .map((player) => ({
        position: scores.findIndex((score) => score === player.score),
        id: player.id,
        login: player.login,
        status: player.status,
        score: player.score,
        isLeader: player.isLeader,
        description: player?.description,
      }))
      .sort((a, b) => (a.isLeader > b.isLeader || a.login - b.login ? -1 : 1));
  }

  connectPlayer(player: PlayerProps) {
    if (this.status !== GAME_STATUSES.PENDING) {
      throw new UserError(`The game in the room '${this.roomName}' is already running`);
    }

    player.roomName = this.roomName;
    this.players.push(player);

    if (!this.admin) {
      this.assignAdmin();
    }
  }

  disconnectPlayer(player: PlayerProps) {
    if (this.status === GAME_STATUSES.PENDING) {
      this.players = this.players.filter(({ id }) => id !== player.id);
    } else {
      player.status = PLAYER_STATUSES.LEFT;
    }

    if (!this.isEmpty() && player.isLeader) {
      player.isLeader = false;

      this.assignAdmin();
    }
  }

  start() {
    if (this.status !== GAME_STATUSES.PENDING) {
      throw new UserError(`The game in the room '${this.roomName}' is already started`);
    }

    this.players.forEach((player) => {
      player.status = PLAYER_STATUSES.PLAYING;
    });
  }

  reset() {
    if (this.status !== GAME_STATUSES.COMPLETED) {
      throw new UserError(`The game in the room '${this.roomName}' is in progress`);
    }

    this.players = this.players.filter((player) => player.status !== PLAYER_STATUSES.LEFT);
    this.players.forEach((player) => player.reset());
  }

  // addPieces(pieces: IPiece) {
  //   this.players.forEach((player) => {
  //     player.addPieces(pieces);
  //   });
  // }

  //   static getNumberOfBlockedRows(numberOfFilledRows) {
  //     return numberOfFilledRows > 0 ? numberOfFilledRows - 1 : 0;
  //   }

  //   static addBlockedRows(players, numberOfBlockedRows) {
  //     players.forEach((player) => {
  //       player.status = player.board.canAddBlockedRows(numberOfBlockedRows) ? PLAYING : FINISHED;
  //       player.board.addBlockedRows(numberOfBlockedRows);
  //     });
  //   }

  //   static getScore(numberOfDeletedRows) {
  //     const scoreMap = {
  //       0: 0,
  //       1: 40,
  //       2: 100,
  //       3: 300,
  //       4: 1200,
  //     };

  //     return scoreMap[numberOfDeletedRows];
  //   }
}

export { Game };
