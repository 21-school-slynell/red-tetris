import { ThemeProps } from 'client/core/api';
import { ActionProps, THEME } from '../actions/action.types';

export const initialStateTheme: ThemeProps = {
  type: 'light',
};

export const themeReducer = (
  state: ThemeProps = initialStateTheme,
  action: ActionProps<ThemeProps>,
) => {
  switch (action.type) {
  case THEME.CHANGE_TYPE: {
    return { ...state, ...action.payload };
  }
  default:
    return state;
  }
};
