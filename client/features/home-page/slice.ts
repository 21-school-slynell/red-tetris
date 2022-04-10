/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TYPE_GAME } from 'client/core/config/game';
import { StoreProps } from 'client/core/store';

export const NAMESPACE = 'home-page';

export type UserProps = {
  login?: string,
  description?: string,
  isLeader?: boolean,
};

export type HomePageProps = UserProps & {
  typeGame?: string;
  name?: string;
  isOpen: boolean;
  id?: string;
};

export const initialState: HomePageProps = {
  typeGame: undefined,
  name: undefined,
  login: undefined,
  id: undefined,
  description: undefined,
  isOpen: false,
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    joinGame: (state) => {
      state.typeGame = TYPE_GAME.EXISTING_GAME;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    createGame: (state) => {
      state.typeGame = TYPE_GAME.NEW_GAME;
    },
    changeNameGame: (state, action) => {
      state.name = action.payload;
    },
    changeLogin: (state, action) => {
      state.login = action.payload;
    },
    changeDescription: (state, action) => {
      state.description = action.payload;
    },
    changeOpenGame: (state) => {
      state.isOpen = true;
    },
  },
});

export default slice.reducer;
export const {
  joinGame,
  createGame,
  changeNameGame,
  changeLogin,
  changeOpenGame,
  changeDescription,
  setId,
} = slice.actions;
export const getInitDataGame = (store: StoreProps) => store.homePage;
export const getCurrentLoginUser = (store: StoreProps) => store.homePage.login;
