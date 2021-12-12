/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { StoreProps } from 'client/core/store';
import { UserProps } from '../home-page/slice';

export const NAMESPACE = 'game-page';

export type GamePageProps = {
  users: UserProps[],
};

export const initialState = {
  users: [],
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  setUsers,
} = slice.actions;

export const getGamePageData = (store: StoreProps) => store.gamePage;
export const getUsers = (store: StoreProps) => store.gamePage.users;
