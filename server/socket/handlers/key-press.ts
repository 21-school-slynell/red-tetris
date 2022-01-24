import { ContextProps } from '../routes';
import { NAME_EVENT } from '../config';

export default function handle({ key }: any, callback?: Function) {
  // @ts-ignore
  const { socketContext: { socket }, gameController } = this as ContextProps;
  const { id } = socket;
  const player = gameController.getPlayer(id);
  const game = gameController.getGame(player?.roomName || '');

  if (player && game) {
    const { pieces, board } = player;

    if (pieces?.length - 1) {
      let piece = pieces[pieces.length - 1];
      piece.move(board, key);
      if (piece.isDown) {
        board.setPiece(piece);
        pieces.pop();
        socket.emit(NAME_EVENT.board, board.serialize());
        piece = pieces[pieces.length - 1];
      }

      socket.emit(NAME_EVENT.pressKey, piece.serialize());
    }
  }

  if (callback) {
    callback({ result: true });
  }
}
