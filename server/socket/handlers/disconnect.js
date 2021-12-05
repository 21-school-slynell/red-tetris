/* eslint-disable import/no-unresolved */
import { deleteUser, getUsers, getUser } from '../utils/users';

export default function handle(_, callback) {
  const { socket, io } = this;

  const user = getUser({ socket, io });
  deleteUser({ socket, io });

  if (user) {
    const { room } = user;
    const users = getUsers({ room, socket, io });
    io.in(room).emit('users', users);
  }

  if (callback) {
    callback({ result: true });
  }
}
