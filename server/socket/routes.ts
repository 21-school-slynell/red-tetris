import { Server, Socket } from 'socket.io';
import { NAME_EVENT } from './config';
import {
  handlerJoin,
  handlerStart,
  handlerDisconnect,
  handlerPressKey,
} from './handlers';
import { GameController } from './models/game-contoller';

export type ContextProps = {
  socketContext: {
    socket: Socket,
    io: Server
  },
  gameController: GameController
};

export const gameController = new GameController();

export function setupRoutes(io: Server) {
  const context = { io };

  io.on('connection', (socket) => {
    const socketContext = { ...context, socket };

    socket.on(NAME_EVENT.join, handlerJoin.bind({ socketContext, gameController }));
    socket.on(NAME_EVENT.start, handlerStart.bind({ socketContext, gameController }));
    socket.on(NAME_EVENT.pressKey, handlerPressKey.bind({ socketContext, gameController }));
    socket.on('disconnect', handlerDisconnect.bind({ socketContext, gameController }));
  });
}
