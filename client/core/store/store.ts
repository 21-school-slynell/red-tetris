import { createHashHistory, createMemoryHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import { initialState as InitialStateHomePage } from 'client/features/home-page/slice';
import { initialState as InitialStateGamePage } from 'client/features/game-page/slice';
import { StoreProps } from './store.types';
import { initialStateSnackBar } from './reducers/snackbar.reducer';
import { initialStateTheme } from './reducers/theme.reducer';
import { initialGameState } from './reducers/game.reducer';
import { rootReducer } from './reducers/root.reducer';
import { getReduxDevToolsOptions } from './devtools';
import { middlewares } from './middlewares';

export const isServer = !(typeof window !== 'undefined' && window?.document && window?.document?.createElement);

export const history = !isServer ? createHashHistory({ basename: '', hashType: 'noslash' }) : createMemoryHistory();

export const defaultState = {
  snackbar: initialStateSnackBar,
  theme: initialStateTheme,
  game: initialGameState,
  homePage: InitialStateHomePage,
  gamePage: InitialStateGamePage,
} as StoreProps;

export const composeStore = (initialState: {}) => configureStore(
  {
    reducer: rootReducer(history),
    preloadedState: initialState,
    devTools: getReduxDevToolsOptions(),
    middleware: middlewares(history),
  },
);
