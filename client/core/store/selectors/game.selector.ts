import { StoreProps } from '../store.types';

export const gameSelector = (store: StoreProps) => ({
  ...store.game,
});
