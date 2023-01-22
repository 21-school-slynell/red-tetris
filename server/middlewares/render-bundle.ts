import {
  composeStore,
  defaultState,
} from 'client/core/store';
import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

import { renderHtml } from './render-html';

if (!global.fetch) {
  // @ts-ignore
  global.fetch = fetch;
}

export function renderBundle(req: Request, res: Response, next: NextFunction) {
  res.renderBundle = async (url: string) => {
    const store = composeStore(defaultState);

    const state = store.getState();
    const { html } = renderHtml(url, state, store);
    res.send(html);
  };

  next();
}
