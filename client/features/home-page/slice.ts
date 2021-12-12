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
  typeGame?: typeof TYPE_GAME;
  name?: string;
};

export const initialState = {
  typeGame: undefined,
  name: undefined,
  login: undefined,
  description: undefined,
  isOpen: false,
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    changeTypeGame: (state, action) => {
      state.typeGame = action.payload;
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
  changeTypeGame,
  changeNameGame,
  changeLogin,
  changeOpenGame,
  changeDescription,
} = slice.actions;
export const getInitDataGame = (store: StoreProps) => store.homePage;
export const getCurrentLoginUser = (store: StoreProps) => store.homePage.login;
