/* eslint-disable import/no-unresolved */
import { PREFIX } from 'server/server.utils';
import { addUser, getUsers } from '../utils/users';

export default function handle(payload, callback) {
  const { socket, io } = this;

  const room = `${PREFIX}${payload.room}`;

  addUser({
    room,
    login: payload.login,
    io,
    id: socket.id,
  });

  socket.join(room);
  io.in(room).emit('users', getUsers({ room, socket, io }));

  if (callback) {
    callback({ result: true });
  }
}
