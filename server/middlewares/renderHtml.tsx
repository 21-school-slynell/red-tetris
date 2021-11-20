import { ServerStyleSheets } from '@material-ui/core';
import { App } from 'client/App';
import { StoreProps } from 'client/core/store';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Store } from 'redux';
import { STATIC_DIR } from '../../env';

interface PageHtmlProps {
  html: string;
  state: StoreProps;
  helmet: HelmetData;
  css: string;
}

function getPageHtml({ html, state, helmet, css }: PageHtmlProps) {
  const staticMarkup = renderToStaticMarkup(
    <html lang="ru">
      <base href="/" />
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        <style id="jss-server-side">${css}</style>
      </head>

      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
        <script
          dangerouslySetInnerHTML={{
                        __html: `window.__INITIAL_STATE__ = ${JSON.stringify(
                            state,
                        )}`,
                    }}
        />
        <script src={`/${STATIC_DIR}/main.js`} />
        <script src="/start_sw.js" />
      </body>
    </html>,
  );

  return `<!DOCTYPE html> ${staticMarkup}`;
}

export const renderHtml = (reqUrl: string, state: StoreProps, store: Store) => {
  const sheets = new ServerStyleSheets();

  const html = renderToString(
    sheets.collect(
      <ReduxProvider store={store}>
        <StaticRouter context={{}} location={reqUrl}>
          <App />
        </StaticRouter>
      </ReduxProvider>,
    ),
  );

  const css = sheets.toString();

  const helmet = Helmet.rewind();

  return {
    html: getPageHtml({ html, state, helmet, css }),
  };
};
