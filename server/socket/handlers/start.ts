/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { addUser, getUsers } from '../utils/users';
import { NAME_EVENT } from '../config';

export default function handle(payload: any) {
  // @ts-ignore
  const { io } = this as ContextProps;

  const room = `${PREFIX}${payload.room}`;

  io.in(room).emit(NAME_EVENT.start);
}
