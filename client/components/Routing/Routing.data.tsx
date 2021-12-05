import { NotFound } from 'client/features/not-found/not-found';
import { Game } from 'client/features/game/game';
import { StartGame } from 'client/features/start-game/start-game';
import { PAGES, RouteType } from './Routing.types';

export const ROUTES: Record<PAGES, RouteType> = {
  home: {
    path: '/',
    component: StartGame,
    name: 'home',
  },
  game: {
    path: '/game',
    component: Game,
    name: 'game',
  },
  'not-found': {
    path: '/not-found',
    component: NotFound,
    name: 'not-found',
  },
};
