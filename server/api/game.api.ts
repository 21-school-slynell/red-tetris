import { OptionsWithoutMethodType } from 'client/core/api/api';
import { BaseAPI } from 'client/core/api/base.api';
import { CreateRoomProps } from 'client/core/api/game.api';
import { ServerHTTP } from './api';

const GameAPIAPIInstance = new ServerHTTP('/game');

export class GameAPI extends BaseAPI {
  static createRoom(data: CreateRoomProps, options: OptionsWithoutMethodType) {
    return GameAPIAPIInstance.put<any, any>('/room', { data, ...options });
  }

  static getRooms(options: OptionsWithoutMethodType) {
    return GameAPIAPIInstance.get<any, any>('/room', { ...options });
  }
}
