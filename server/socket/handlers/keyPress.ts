import { Piece } from 'server/essence/piece';
import { Board } from 'server/essence/board';
import { ContextProps } from '../routes';
import { NAME_EVENT } from '../config';

export default function handle({ key }: any, callback?: Function) {
  // @ts-ignore
  const { socket, io } = this as ContextProps;
  // @ts-ignore
  const pieces = io.pieces as Pieces;
  // @ts-ignore
  const board = io.board as Board;
  if (pieces?.length - 1) {
    let piece = pieces[pieces.length - 1] as Piece;
    piece.move(board, key);

    if (piece.isDown) {
      board.setPiece(piece);
      pieces.pop();
      socket.emit(NAME_EVENT.board, board.serialize());
      piece = pieces[pieces.length - 1] as Piece;
    }

    socket.emit(NAME_EVENT.pressKey, piece.serialize());
  }
  if (callback) {
    callback({ result: true });
  }
}
