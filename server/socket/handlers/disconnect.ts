import { ContextProps } from '../routes';
import { deleteUser, getUsers, getUser } from '../utils/users';
import { NAME_EVENT } from '../config';

export default function handle(payload: any, callback?: Function) {
  // @ts-ignore
  const { socket, io } = this as ContextProps;

  const user = getUser({ socket, io });
  deleteUser({ socket, io });

  if (user) {
    const { room } = user;
    const users = getUsers({ room, io });
    io.in(room).emit(NAME_EVENT.users, users);
  }

  if (callback) {
    callback({ result: true });
  }
}
