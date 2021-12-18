import { Server, Socket } from 'socket.io';
import { NAME_EVENT } from './config';
import {
  handlerJoin,
  handlerStart,
  handlerDisconnect,
  handlerPressKey,
} from './handlers';

export type ContextProps = {
  socket: Socket,
  io: Server
};

export function setupRoutes(io: Server) {
  const context = { io };

  io.on('connection', (socket) => {
    const socketContext = { ...context, socket };

    socket.on(NAME_EVENT.join, handlerJoin.bind(socketContext));
    socket.on(NAME_EVENT.start, handlerStart.bind(socketContext));
    socket.on(NAME_EVENT.pressKey, handlerPressKey.bind(socketContext));
    socket.on('disconnect', handlerDisconnect.bind(socketContext));
  });
}
