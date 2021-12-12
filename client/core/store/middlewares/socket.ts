import { createSocketClient } from 'client/utils/socketClient';
import { push } from 'connected-react-router';
import { NAME_EVENT } from 'server/socket/config';
import { changeOpenGame, createGame, joinGame } from 'client/features/home-page/slice';
import { STATE_GAME } from 'client/core/config/game';
import { changeStatusGame, setStartGame, setUsers } from 'client/features/game-page/slice';
import { StoreProps } from '../store.types';
import { showSnackBarAction } from '..';

const handlerSetUsers = (dispatch: any) => ({ users, name }: any) => {
  dispatch(changeOpenGame());
  dispatch(push(`/game?name=${name}`));
  dispatch(setUsers(users));
};

const handlerStartGame = (dispatch: any) => () => dispatch(changeStatusGame(STATE_GAME.START));

const handlerError = (dispatch: any) => ({ error }: any) => dispatch(showSnackBarAction({ type: 'error', msg: error }));

export const socketMiddleware = ({ dispatch, getState }: any) => {
  const socket = createSocketClient(
    {
      host: '',
      options: {},
      handlers: {
        [NAME_EVENT.users]: handlerSetUsers(dispatch),
        [NAME_EVENT.start]: handlerStartGame(dispatch),
        [NAME_EVENT.error]: handlerError(dispatch),
      },
    },
  );

  return (next: any) => (action: any) => {
    const state = getState() as StoreProps;

    const {
      homePage: { name, login, description },
    } = state;

    // Логика создания/подключения пользователя к игре
    if (action.type === createGame.type) {
      const user = { room: name, login, description, isLeader: true };
      socket.emit(NAME_EVENT.join, user);
    }

    if (action.type === joinGame.type) {
      const user = { room: name, login, description, isLeader: false };
      socket.emit(NAME_EVENT.join, user);
    }

    if (action.type === setStartGame.type) {
      socket.emit(NAME_EVENT.start, { room: name });
    }
    next(action);
  };
};
