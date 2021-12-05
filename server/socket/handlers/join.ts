import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { addUser, getUsers } from '../utils/users';
import { NAME_EVENT } from '../config';

export default function handle(payload: any, callback?: Function) {
  // @ts-ignore
  const { socket, io } = this as ContextProps;

  const room = `${PREFIX}${payload.room}`;

  addUser({ ...payload, room, io, id: socket.id });

  socket.join(room);
  io.in(room).emit(NAME_EVENT.users, getUsers({ room, io }));

  if (callback) {
    callback({ result: true });
  }
}
