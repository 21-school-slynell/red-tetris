import { NotFound } from 'client/features/not-found/not-found';
import { Game } from 'client/features/game-page/game';
import { HomePage } from 'client/features/home-page/home-page';
import { PAGES, RouteType } from './Routing.types';

export const ROUTES: Record<PAGES, RouteType> = {
  home: {
    path: '/',
    component: HomePage,
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
