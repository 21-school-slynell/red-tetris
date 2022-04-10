import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { NAME_EVENT } from '../config';
import { Game } from '../models/game';
import { Player } from '../models/player';

export default function handle(payload: any, callback?: Function) {
  // @ts-ignore
  const { socketContext: { socket, io }, gameController } = this as ContextProps;
  const { login, description } = payload;

  const roomName = `${PREFIX}${payload.roomName}`;

  if (!gameController.isGameExists(roomName)) {
    gameController.addGame(new Game(roomName));
  }

  const game = gameController.getGame(roomName);
  if (game) {
    const player = new Player(socket.id, login, description, roomName, game?.pieces);

    gameController.addPlayer(player);
    game.connectPlayer(player);
    socket.join(roomName);

    io.in(roomName).emit(NAME_EVENT.users, {
      users: game.getPlayersList(),
      name: payload.roomName,
      login,
      id: player.id,
    });
  }

  if (callback) {
    callback({ result: true });
  }
}
