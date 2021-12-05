import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import { createServer } from 'http';
import * as webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import { createSocket } from './socket/server';
import { getNameRooms } from './socket/utils/rooms';

const compiler = webpack(webpackConfig as Configuration);

export class Server {
  private app;

  private server;

  private socket;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.socket = createSocket();

    this.socket.attach(this.server);
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.set('socket', this.socket);

    this.app.use(cookieParser());
    this.app.use(devMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
      publicPath: '/',
    }));

    this.app.get('/_info', async (req, res) => {
      const socket = req.app.get('socket');
      const { rooms } = socket.of('/').adapter;

      const nameRooms = getNameRooms(rooms);
      if (nameRooms.length) {
        socket.to(nameRooms[1]).emit('private message', socket.id, 'Xnj');
      }

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
