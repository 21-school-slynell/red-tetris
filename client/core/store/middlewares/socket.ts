import { createSocketClient } from 'client/utils/socketClient';
import { push } from 'connected-react-router';
import { NAME_EVENT } from 'server/socket/config';
import { changeOpenGame } from '~features/start-game/slice';
import { StoreProps } from '../store.types';

const setUsers = (dispatch: any) => (
  props: any,
) => console.log(dispatch, props);

export const socketMiddleware = ({ dispatch, getState }: any) => {
  const socket = createSocketClient(
    {
      host: '',
      options: {},
      handlers: {
        [NAME_EVENT.users]: setUsers(dispatch),
      },
    },
  );

  return (next: any) => (action: any) => {
    const {
      startGame: { typeGame, name, isOpen, login },
    } = getState() as StoreProps;

    if (typeGame && !isOpen) {
      const user = { room: name, login, isMain: false };
      if (typeGame === 'new-game') {
        user.isMain = true;
      }
      socket.emit('join', user);
      next(changeOpenGame());
      next(push(`/game?name=${name}`));
    }
    next(action);
  };
};
