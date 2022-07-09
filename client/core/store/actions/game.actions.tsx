/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { GameAPI } from '@core/api';
import { PREFIX } from '@server/server.utils';
import { StoreProps } from '../store.types';
import { GAME } from './action.types';
import { showSnackBarAction } from './snackbar.actions';

export const setStatusRoomsAction = (payload: any) => ({
  type: GAME.SET_ROOMS,
  payload,
});

export const getStatusRooms = (): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await GameAPI.getRooms();
    const rooms = Object.keys(result).reduce((res, key) => {
      res[key.split(PREFIX)[1]] = result[key];
      return res;
    }, {} as any);
    dispatch(setStatusRoomsAction(rooms));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
