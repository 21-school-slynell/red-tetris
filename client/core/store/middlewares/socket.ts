import { createSocketClient } from 'client/utils/socketClient';
import { NAME_EVENT } from 'server/socket/config';
import { changeOpenGame, createGame, joinGame, setId } from 'client/features/home-page/slice';
import { STATE_GAME } from 'client/core/config/game';
import { changeStatusGame, pressedKey, setBoard, setKey, setStartGame, setUserResult, setUsers, setUsersBoard } from 'client/features/game-page/slice';
import { StoreProps } from '../store.types';
import { showSnackBarAction } from '..';

const handlerSetUsers = (dispatch: any) => ({ users, name, login, id }: any) => {
  dispatch(changeOpenGame());
  window.location.assign(`#${name}[${login}]`);
  dispatch(setId(id));
  dispatch(setUsers(users));
};

const handlerStartGame = (dispatch: any) => () => {
  dispatch(changeStatusGame(STATE_GAME.START));
};

const handlerError = (dispatch: any) => ({ error }: any) => {
  dispatch(showSnackBarAction({ type: 'error', msg: error }));
  setTimeout(() => {
    window.location.assign('/');
  }, 100);
};

const handlerKeyPress = (dispatch: any) => (payload: any) => {
  dispatch(setKey(payload));
};

const handlerBoard = (dispatch: any) => (payload: any) => {
  dispatch(setBoard(payload));
};

const handlerUsersBoard = (dispatch: any) => (payload: any) => {
  dispatch(setUsersBoard(payload));
};

const handlerUserResult = (dispatch: any) => (payload: any) => {
  dispatch(setUserResult(payload));
};

export const socketMiddleware = ({ dispatch, getState }: any) => {
  const socket = createSocketClient(
    {
      host: '',
      options: {},
      handlers: {
        [NAME_EVENT.users]: handlerSetUsers(dispatch),
        [NAME_EVENT.start]: handlerStartGame(dispatch),
        [NAME_EVENT.error]: handlerError(dispatch),
        [NAME_EVENT.pressKey]: handlerKeyPress(dispatch),
        [NAME_EVENT.board]: handlerBoard(dispatch),
        [NAME_EVENT.update]: handlerUsersBoard(dispatch),
        [NAME_EVENT.finish]: handlerUserResult(dispatch),
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
      const user = { roomName: name, login, description };
      socket.emit(NAME_EVENT.join, user);
    }

    if (action.type === joinGame.type) {
      const user = { roomName: name, login, description };
      socket.emit(NAME_EVENT.join, user);
    }

    if (action.type === setStartGame.type) {
      socket.emit(NAME_EVENT.start, { roomName: name });
    }

    if (action.type === pressedKey.type) {
      socket.emit(NAME_EVENT.pressKey, { key: action.payload });
    }
    next(action);
  };
};
