import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { StoreProps } from './store.types';
import { initialStateSnackBar, snackbarReducer } from './reducers/snackbar.reducer';
import { initialStateTheme, themeReducer } from './reducers/theme.reducer';
import { gameReducer, initialGameState } from './reducers/game.reducer';

export const isServer = !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

export const history = !isServer
  ? createBrowserHistory()
  : createMemoryHistory();

const middlewares = [
  thunk,
  routerMiddleware(history),
];

const historyReducer = connectRouter(history);

export const rootReducer = combineReducers({
  router: historyReducer,
  snackbar: snackbarReducer,
  theme: themeReducer,
  game: gameReducer,
});

export const defaultState = {
  snackbar: initialStateSnackBar,
  theme: initialStateTheme,
  game: initialGameState,
} as StoreProps;

export const composeStore = (initialState: {}) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);
