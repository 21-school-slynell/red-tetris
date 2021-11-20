import { Response, Request, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;
  const isAuth = cookies?.includes('authCookie') && cookies?.includes('uuid');

  if (!isAuth) {
    res.status(401).send('Unauthorized');
  }

  next();
};
