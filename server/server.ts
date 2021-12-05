import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import { Server as ServerIO } from 'socket.io';
import { createServer } from 'http';
import * as webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';
import { createSocket } from './socket/server';
import { PREFIX } from './server.utils';

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

      const nameRooms = (Array.from(rooms.keys()) as string[]).filter((name: string) => name.indexOf(PREFIX) === 0);

      socket.to(nameRooms[1]).emit('private message', socket.id, 'Xnj');
      // console.log(userId, eventId)
      // const statuses = await socket.senders.sendToUsers([userId], 'loadTesting', eventId);

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
