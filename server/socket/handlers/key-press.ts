import { ContextProps } from '../routes';
import { NAME_EVENT } from '../config';
import { PLAYER_STATUSES } from '../constants';
import { Player } from '../models/player';

export default function handle({ key }: any, callback?: Function) {
  // @ts-ignore
  const { socketContext: { socket, io }, gameController } = this as ContextProps;
  const { id } = socket;
  const player = gameController.getPlayer(id);
  const game = gameController.getGame(player?.roomName || '');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFinishGame = (player: Player) => {
    const { board } = player;
    const { score, fillRow } = board.update(player.fillRow);
    player.finish();
    player.setFillRow(fillRow);
    player.setScore(score);
    socket.emit(NAME_EVENT.finish, { score: player.score, fillRow: player.fillRow });
    if (game?.isFinish()) {
      io.in(player?.roomName || '').emit(NAME_EVENT.allFinish);
    }
  };

  if (player && game) {
    const { pieces, board } = player;
    if (player.status !== PLAYER_STATUSES.FINISHED) {
      let piece = pieces[pieces.length - 1];
      // eslint-disable-next-line max-len
      const isMove = piece.move(board, key);
      if (!isMove && piece.y - piece.getBorder().height < 0 && key === 'ArrowDown') {
        handleFinishGame(player);
      }
      if (piece.isDown) {
        board.setPiece(piece);
        pieces.pop();
        socket.emit(NAME_EVENT.board, board.serialize());
        // Делаем оповещение всем остальным игрокам какое состояние доски и их соперника
        io.in(player?.roomName || '').emit(NAME_EVENT.update, {
          user: player.login,
          board: board.serialize(),
        });

        const { score, fillRow, isFinish } = board.update(player.fillRow);
        if (isFinish) {
          player.finish();
          socket.emit(NAME_EVENT.finish, isFinish);
        }
        player.setFillRow(fillRow);
        player.setScore(score);

        // Удаляем заполненую строку и отправляем всем
        setTimeout(() => {
          io.in(player?.roomName || '').emit(NAME_EVENT.update, {
            user: player.login,
            board: board.serialize(),
          });
          socket.emit(NAME_EVENT.board, board.serialize());
        }, 50);

        piece = pieces[pieces.length - 1];
      }
      socket.emit(NAME_EVENT.pressKey, piece.serialize(), pieces.length);
    } else {
      player.finish();
      socket.emit(NAME_EVENT.finish, { score: player.score, fillRow: player.fillRow });
      if (game.isFinish()) {
        io.in(player?.roomName || '').emit(NAME_EVENT.allFinish);
      }
    }
  }

  if (callback) {
    callback({ result: true });
  }
}
