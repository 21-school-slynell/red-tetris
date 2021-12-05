import { Response, Request } from 'express';
import { PREFIX } from 'server/server.utils';

export class GameController {
  public static getRooms(req: Request, res: Response) {
    const socket = req.app.get('socket');
    const { rooms } = socket.of('/').adapter;

    const nameRooms = (Array.from(rooms.keys()) as string[]).filter((name: string) => name.indexOf(PREFIX) === 0);

    const result = {} as any;

    nameRooms.forEach((name) => {
      result[name] = rooms.get(name).size;
    });

    res.send(result);
  }
}
