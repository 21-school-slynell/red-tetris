import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { socketMiddleware } from './socket';

export const middlewares = (history: History) => ([
  socketMiddleware,
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: true,
  }),
  routerMiddleware(history),
]);
