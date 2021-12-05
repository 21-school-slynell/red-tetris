import { Server, Socket } from 'socket.io';
import handlerJoin from './handlers/join';
import handlerDisconnect from './handlers/disconnect';

export type ContextProps = {
  socket: Socket,
  io: Server
};

export function setupRoutes(io: Server) {
  const context = { io };

  io.on('connection', (socket) => {
    const socketContext = { ...context, socket };

    socket.on('join', handlerJoin.bind(socketContext));
    socket.on('disconnect', handlerDisconnect.bind(socketContext));
  });
}
