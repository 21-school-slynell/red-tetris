import { ContextProps } from '../routes';
import { NAME_EVENT } from '../config';

export default function handle(payload: any, callback?: Function) {
  // @ts-ignore
  const { socketContext: { socket, io }, gameController } = this as ContextProps;

  const { id } = socket;
  const player = gameController.getPlayer(id);

  if (player && player.roomName) {
    if (player.isLeader) {
      gameController.removeGame(player.roomName);
      io.in(player.roomName).emit(NAME_EVENT.error, { error: 'Admin left' });
      return;
    }

    const game = gameController.getGame(player.roomName);
    if (!game || game.isEmpty()) {
      io.in(player.roomName).emit(NAME_EVENT.error, { error: 'Game is empty' });
      return;
    }

    game.disconnectPlayer(player);
    io.in(player.roomName).emit(NAME_EVENT.users, {
      users: game.getPlayersList(),
      name: payload.roomName,
    });
  }

  if (callback) {
    callback({ result: true });
  }
}
