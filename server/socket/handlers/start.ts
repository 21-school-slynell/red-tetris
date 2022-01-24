import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { NAME_EVENT } from '../config';

export default function handle(payload: any) {
  // @ts-ignore
  const { socketContext: { io }, gameController } = this as ContextProps;

  const roomName = `${PREFIX}${payload.roomName}`;

  const game = gameController.getGame(roomName);
  if (game) {
    game.start();

    io.in(roomName).emit(NAME_EVENT.start);
  }
}
