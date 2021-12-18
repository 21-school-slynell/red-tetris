import { Piece } from 'server/essence/piece';
import { Board } from 'server/essence/board';
import { ContextProps } from '../routes';
import { PREFIX } from '../../server.utils';
import { NAME_EVENT } from '../config';

export default function handle(payload: any) {
  // @ts-ignore
  const { io } = this as ContextProps;

  const room = `${PREFIX}${payload.room}`;

  const pieces = Piece.generatePieces(10);
  // @ts-ignore
  io.pieces = pieces;
  // @ts-ignore
  io.board = new Board();

  io.in(room).emit(NAME_EVENT.start);
}
