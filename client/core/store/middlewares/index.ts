// @ts-nocheck
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import { socketMiddleware } from './socket';

export const middlewares = (history: History) => ([
  socketMiddleware,
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: true,
  }),
  routerMiddleware(history),
]);
