/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { StoreProps } from 'client/core/store';

export const NAMESPACE = 'start-page';

export type ChartOptionsProps = {
  typeGame?: 'new-game' | 'existing-games';
  name?: string;
  login?: string
};

export const initialState = {
  typeGame: undefined,
  name: undefined,
  login: undefined,
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
    changeOpenGame: (state) => {
      state.isOpen = true;
    },
  },
});

export default slice.reducer;
export const { changeTypeGame, changeNameGame, changeLogin, changeOpenGame } = slice.actions;
export const getInitDataGame = (store: StoreProps) => store.startGame;
