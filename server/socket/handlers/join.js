import { PREFIX } from 'server/server.utils';

export default function handle(payload, callback) {
  this.socket.join(`${PREFIX}${payload.roomName}`);
  this.socket.data.context = payload.context;
  this.socket.data.tabIsActive = true;

  if (callback) {
    callback({ result: true });
  }
}
