import { ActionProps, SNACKBAR } from '../actions/action.types';
import { StoreSnackBarProps } from '../store.types';

export const initialStateSnackBar: StoreSnackBarProps = {
  isVisible: false,
  msg: '',
  type: 'info',
};

export const snackbarReducer = (
  state: StoreSnackBarProps = initialStateSnackBar,
  action: ActionProps<StoreSnackBarProps>,
) => {
  switch (action.type) {
  case SNACKBAR.SHOW_SNACKBAR: {
    return { ...state, ...action.payload, isVisible: true };
  }
  case SNACKBAR.HIDE_SNACKBAR: {
    return { ...state, isVisible: false };
  }
  default:
    return state;
  }
};
