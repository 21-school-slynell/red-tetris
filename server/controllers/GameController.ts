import { Response, Request } from 'express';

export class GameController {
  public static getRooms(req: Request, res: Response) {

    const socket = req.app.get('socket')
    const rooms = socket.of('/').adapter.rooms;

    const nameRooms = (Array.from(rooms.keys()) as string[]).filter((name: string) => name.indexOf('room:') === 0)

    const result = {} as any;

    nameRooms.forEach((name) => {
      result[name] = rooms.get(name).size
    })

    res.send(result);
  }
}
