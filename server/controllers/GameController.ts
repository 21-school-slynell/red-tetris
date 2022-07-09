import { Response, Request } from 'express';
import { getNameRooms } from '@server/socket/utils/rooms';

export class GameController {
  public static getRooms(req: Request, res: Response) {
    const socket = req.app.get('socket');

    const { rooms } = socket.of('/').adapter;
    const nameRooms = getNameRooms(rooms);

    const result = {} as Record<string, number>;
    nameRooms.forEach((name) => {
      result[name] = rooms.get(name).size;
    });

    res.send(result);
  }
}
