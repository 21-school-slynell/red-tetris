import { UserError } from '../errors/user-error';
import { GameError } from '../errors/game-error';
import { IPlayer } from './player';
import { Game } from './game';

class GameController {
  games: Map<string, Game>;

  players: IPlayer[];

  constructor() {
    this.games = new Map();
    this.players = [];
  }

  addPlayer(player: IPlayer) {
    this.players.push(player);
  }

  getPlayer(id: string) {
    return this.players.find((player) => player.id === id);
  }

  removePlayer(id: string) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  addGame(game: any) {
    if (this.isGameExists(game.roomName)) {
      throw new GameError('The game with this name already exists');
    }

    this.games.set(game.roomName, game);
  }

  isGameExists(roomName: string) {
    return this.games.has(roomName);
  }

  getGame(roomName: string) {
    return this.games.get(roomName);
  }

  removeGame(roomName: string) {
    this.games.delete(roomName);
  }

  authPlayer(player: any) {
    if (player || !this.isGameExists(player.roomName)) {
      throw new UserError('You cannot perform a player command');
    }
    return true;
  }

  authAdmin(player: any) {
    this.authPlayer(player);
    if (!player.isLeader) {
      throw new UserError('You cannot perform an admin command');
    }
    return true;
  }
}

export { GameController };
