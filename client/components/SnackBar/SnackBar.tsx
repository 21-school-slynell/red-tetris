import React, { memo, FC, useCallback } from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { hideSnackBarAction } from '@core/store/actions';

export interface SnackBarDataProps {
  msg?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

type SnackBarProps = SnackBarDataProps & SnackbarProps;

export const SnackBar: FC<SnackBarProps> = memo(({ open, msg = '', type }) => {
  const dispatch = useDispatch();
  const onClose = useCallback(() => dispatch(hideSnackBarAction()), []);

  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={2000}>
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {msg}
      </MuiAlert>
    </Snackbar>
  );
});
