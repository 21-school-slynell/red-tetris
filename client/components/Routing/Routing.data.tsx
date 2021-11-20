import { Game } from '@pages/Game';
import { PAGES, RouteType } from './Routing.types';

export const ROUTES: Record<PAGES, RouteType> = {
    game: {
        path: '/',
        component: Game,
        name: 'game',
    },
};
