import { createBrowserHistory, createMemoryHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import { StoreProps } from './store.types';
import { initialStateSnackBar } from './reducers/snackbar.reducer';
import { initialStateTheme } from './reducers/theme.reducer';
import { initialGameState } from './reducers/game.reducer';
import { rootReducer } from './reducers/root.reducer';
import { getReduxDevToolsOptions } from './devtools';
import { middlewares } from './middlewares';
import { initialState as InitialStateStartGame } from '~features/start-game/slice';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

export const history = !isServer ? createBrowserHistory() : createMemoryHistory();

export const defaultState = {
  snackbar: initialStateSnackBar,
  theme: initialStateTheme,
  game: initialGameState,
  startGame: InitialStateStartGame,
} as StoreProps;

export const composeStore = (initialState: {}) => configureStore(
  {
    reducer: rootReducer(history),
    preloadedState: initialState,
    devTools: getReduxDevToolsOptions(),
    middleware: middlewares(history),
  },
);
