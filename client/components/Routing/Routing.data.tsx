import { StartPage } from '~features/start-page/start-page';
import { PAGES, RouteType } from './Routing.types';

export const ROUTES: Record<PAGES, RouteType> = {
    game: {
        path: '/',
        component: StartPage,
        name: 'game',
    },
};
