/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { StoreProps } from 'client/core/store';

export const NAMESPACE = 'socket';

export type SocketProps = {
  socket: any
};

export const initialState = {
  socket: undefined,
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export default slice.reducer;
export const { setSocket } = slice.actions;
export const getSocket = (store: StoreProps) => store.socket;
