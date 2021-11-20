import { StoreProps } from '../store.types';

export const themeSelector = (store: StoreProps) => ({
  ...store.theme,
});
