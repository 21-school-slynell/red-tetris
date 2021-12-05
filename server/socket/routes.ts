/* eslint-disable @typescript-eslint/no-shadow */
import { Server } from 'socket.io';
import handlerJoin from './handlers/join';
import handlerTabActivate from './handlers/tabActivate';
import handlerDisconnect from './handlers/disconnect';

export function setupRoutes(io: Server) {
  const context = { io };

  io.on('connection', (socket) => {
    const socketContext = { ...context, socket };

    socket.on('join', handlerJoin.bind(socketContext));
    socket.on('tabActivate', handlerTabActivate.bind(socketContext));
    socket.on('disconnect', handlerDisconnect.bind(socketContext));
  });
}
