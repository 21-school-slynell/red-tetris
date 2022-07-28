// @ts-nocheck
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import homePage from 'client/features/home-page/slice';
import gamePage from 'client/features/game-page/slice';
import { gameReducer } from './game.reducer';
import { snackbarReducer } from './snackbar.reducer';
import { themeReducer } from './theme.reducer';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  snackbar: snackbarReducer,
  theme: themeReducer,
  game: gameReducer,
  homePage,
  gamePage,
});
