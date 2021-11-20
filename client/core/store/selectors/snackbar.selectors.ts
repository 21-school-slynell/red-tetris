import { StoreProps } from '../store.types';

export const snackbarSelector = (store: StoreProps) => ({
  ...store.snackbar,
});
