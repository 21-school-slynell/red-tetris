import express, { Express } from 'express';
import path from 'path';
import { ThemeController, JiraController } from '@server/controllers';
import { BUILD_DIR } from '../../env';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, BUILD_DIR)));

  const jsonParser = express.json();

  // Api для jira
  app.post('/api/jira/searchIssue', JiraController.searchIssue);
  app.post('/api/jira/issueUpdate', jsonParser, JiraController.updateIssue);
  //  TODO: спилить
  app.put('/api/v2/theme', jsonParser, ThemeController.change);

  app.get('*', (req, res) => {
    res.renderBundle(req.url);
  });
}
