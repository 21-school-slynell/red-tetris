import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { addUser, getUsers } from '../utils/users';
import { NAME_EVENT } from '../config';

export default function handle(payload: any, callback?: Function) {
  // @ts-ignore
  const { socket, io } = this as ContextProps;

  const room = `${PREFIX}${payload.room}`;

  const { error } = addUser({ ...payload, room, io, id: socket.id });

  if (error) {
    socket.emit(NAME_EVENT.error, { error });
    return;
  }

  socket.join(room);
  io.in(room).emit(NAME_EVENT.users, { users: getUsers({ room, io }), name: payload.room });

  if (callback) {
    callback({ result: true });
  }
}
