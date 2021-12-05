import { FC } from 'react';

export type PAGES = 'home' | 'game' | 'not-found';

export type RouteType = { path: string, component: FC, name: PAGES };
