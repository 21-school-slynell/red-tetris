/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { GameAPI } from '@core/api';
import { StoreProps } from '../store.types';
import { GAME } from './action.types';
import { showSnackBarAction } from './snackbar.actions';

export const setStatusRoomsAction = (payload: any) => ({
    type: GAME.SET_ROOMS,
    payload,
});

export const getStatusRooms =
    (): ThunkAction<void, StoreProps, unknown, Action<string>> =>
    async (dispatch) => {
        try {
            const result = await GameAPI.getRooms();
            dispatch(setStatusRoomsAction(result));
        } catch (error) {
            dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
        }
    };
