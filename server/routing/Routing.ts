import express, { Express } from 'express';
import path from 'path';
import { ThemeController, GameController } from '@server/controllers';
import { BUILD_DIR } from '../../env';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, BUILD_DIR)));

  const jsonParser = express.json();

  app.get('/api/game/room', GameController.getRooms);
  app.put('/api/v2/theme', jsonParser, ThemeController.change);

  app.get('*', (req, res) => {
    res.renderBundle(req.url);
  });
}
