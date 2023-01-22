import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import { createServer } from 'http';
import JiraApi from 'jira-client';
import * as dotenv from 'dotenv';
import * as webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/render-bundle';
import { routing } from './routing';

dotenv.config();

const compiler = webpack(webpackConfig as Configuration);

const { env } = process;
export class Server {
  private app;

  private server;

  jira: JiraApi;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.jira = new JiraApi({
      protocol: 'https',
      host: env.HOST || '',
      username: env.USERNAME,
      password: env.PASSWORD,
      apiVersion: '2',
      strictSSL: true,
    });

    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.set('jira', this.jira);
    this.app.use(cookieParser());
    this.app.use(devMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
      publicPath: '/',
    }));

    this.app.get('/api/_info', async (req, res) => {
      res.jsonp({ result: 'ok' });
    });

    this.app.use(hotMiddleware(compiler));
    this.app.use(renderBundle);
  }

  private routerConfig() {
    routing(this.app);
  }

  public start = (port: number) => new Promise((resolve, reject) => {
    this.server.listen(port, () => {
      resolve(port);
    }).on('error', (err: Object) => reject(err));
  });
}
