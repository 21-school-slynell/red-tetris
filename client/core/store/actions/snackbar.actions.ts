import { SnackBarDataProps } from '@components/SnackBar';
import { SNACKBAR } from './action.types';

export const showSnackBarAction = (payload: SnackBarDataProps) => ({
  type: SNACKBAR.SHOW_SNACKBAR,
  payload,
});

export const hideSnackBarAction = () => ({
  type: SNACKBAR.HIDE_SNACKBAR,
});
