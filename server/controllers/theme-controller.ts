import { Response, Request } from 'express';

export class ThemeController {
  public static change(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    res.send(req.body);
  }
}
