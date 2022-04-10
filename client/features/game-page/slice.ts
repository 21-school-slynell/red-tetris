/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';
import { STATE_GAME } from 'client/core/config/game';
import { StoreProps } from 'client/core/store';
import { PieceSerializeProps } from 'server/socket/models/piece';
import { getCurrentLoginUser, UserProps } from '../home-page/slice';

export const NAMESPACE = 'game-page';

export type GamePageProps = {
  users: UserProps[],
  command?: string;
  state: string,
  key?: string;
  piece?: PieceSerializeProps;
  board?: PieceSerializeProps[];
  usersBoard: Record<string, PieceSerializeProps[]>;
  score?: number;
  fillRow?: number;
};

export const pressedKey = createAction(`${NAMESPACE}/pressedKey`, (key: string) => ({ payload: key }));

export const initialState: GamePageProps = {
  users: [],
  command: undefined,
  state: STATE_GAME.INIT,
  key: undefined,
  usersBoard: {},
  score: undefined,
  fillRow: undefined,
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.piece = action.payload;
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setUsersBoard: (state, { payload }) => {
      state.usersBoard[payload.user] = payload.board;
    },
    setStartGame: (state) => {
      state.state = STATE_GAME.START;
      state.command = STATE_GAME.START;
    },
    changeStatusGame: (state, action) => {
      state.state = action.payload;
    },
    setCommand: (state, action) => {
      state.command = action.payload;
    },
    clearCommand: (state) => {
      state.command = undefined;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserResult: (state, action) => {
      state.score = action.payload.score;
      state.fillRow = action.payload.fillRow;
    },
  },
});

export default slice.reducer;

export const {
  setStartGame,
  setUsers,
  setCommand,
  clearCommand,
  setBoard,
  changeStatusGame,
  setKey,
  setUsersBoard,
  setUserResult,
} = slice.actions;

export const getGamePageData = (store: StoreProps) => store.gamePage;

export const getUsers = (store: StoreProps) => store.gamePage.users;

export const getIsLeaderCurrentUser = (store: StoreProps) => {
  const login = getCurrentLoginUser(store);
  const users = getUsers(store) as UserProps[];
  const user = users.find((obj) => obj.login === login);
  if (user?.isLeader) {
    return user?.isLeader;
  }
  return false;
};

export const getIsStatusInitGame = (store: StoreProps) => store.gamePage.state === STATE_GAME.INIT;

export const getIsStatusStartGame = (
  store: StoreProps,
) => store.gamePage.state === STATE_GAME.START;

export const getIsStatusFinishGame = (
  store: StoreProps,
) => store.gamePage.state === STATE_GAME.FINISH;
