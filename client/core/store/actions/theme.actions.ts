import { ThemeAPI, ThemeProps } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { THEME } from './action.types';

export const changeTypeTheme = (payload: ThemeProps) => ({
  type: THEME.CHANGE_TYPE,
  payload,
});

export const changeTypeThemeThunk = (
  theme: ThemeProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  const result = await ThemeAPI.change(theme);
  dispatch(changeTypeTheme(result));
};
