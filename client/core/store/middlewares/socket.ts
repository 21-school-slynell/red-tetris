import { createSocketClient } from 'client/utils/socketClient';
import { push } from 'connected-react-router';
import { NAME_EVENT } from 'server/socket/config';
import { changeOpenGame, UserProps } from 'client/features/home-page/slice';
import { TYPE_GAME } from 'client/core/config/game';
import { setUsers } from 'client/features/game-page/slice';
import { StoreProps } from '../store.types';

const handlerSetUsers = (dispatch: any) => (props: UserProps[]) => dispatch(setUsers(props));

export const socketMiddleware = ({ dispatch, getState }: any) => {
  const socket = createSocketClient(
    {
      host: '',
      options: {},
      handlers: {
        [NAME_EVENT.users]: handlerSetUsers(dispatch),
      },
    },
  );

  return (next: any) => (action: any) => {
    const {
      homePage: { typeGame, name, isOpen, login, description },
    } = getState() as StoreProps;

    if (typeGame && !isOpen) {
      const user = { room: name, login, description, isLeader: false };
      if (typeGame === TYPE_GAME.NEW_GAME) {
        user.isLeader = true;
      }
      socket.emit('join', user);
      next(changeOpenGame());
      next(push(`/game?name=${name}`));
    }
    next(action);
  };
};
