import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import startGameReducer from '~features/start-game/slice';
import socketReducer from '~features/socket/slice';
import { gameReducer } from './game.reducer';
import { snackbarReducer } from './snackbar.reducer';
import { themeReducer } from './theme.reducer';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  snackbar: snackbarReducer,
  theme: themeReducer,
  game: gameReducer,
  startGame: startGameReducer,
  socket: socketReducer,
});
