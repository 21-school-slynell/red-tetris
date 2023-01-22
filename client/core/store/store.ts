// @ts-nocheck
import { createHashHistory, createMemoryHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import { StoreProps } from './store.types';
import { rootReducer } from './reducers/root.reducer';
import { getReduxDevToolsOptions } from './devtools';

export const isServer = !(typeof window !== 'undefined' && window?.document && window?.document?.createElement);

export const history = !isServer ? createHashHistory({ basename: '', hashType: 'noslash' }) : createMemoryHistory();

export const defaultState = {} as StoreProps;

export const composeStore = (initialState: {}) => configureStore(
  {
    reducer: rootReducer({}),
    preloadedState: initialState,
    devTools: getReduxDevToolsOptions(),
  },
);
