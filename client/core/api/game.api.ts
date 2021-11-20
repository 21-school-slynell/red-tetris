import { BaseAPI } from './base.api';
import { HTTP } from './api';

const GameAPIInstance = new HTTP('/game', '/api');

export type CreateRoomProps = {
  name: string
}

export class GameAPI extends BaseAPI {
  static getRooms() {
    return GameAPIInstance.get<any, any>('/room', {});
  }
}
