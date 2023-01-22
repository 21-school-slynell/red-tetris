import { actions } from '@server/actions';
import { Response, Request } from 'express';
import JiraApi from 'jira-client';
// import { getNameRooms } from '@server/socket/utils/rooms';

export class JiraController {
  public static async updateIssue(req: Request, res: Response) {
    console.log('-----------------------updateIssue-------------------------------');
    if (!req.body || !req.body?.id) {
      return res.sendStatus(400);
    }

    const { id } = req.body;
    const jira: JiraApi = req.app.get('jira');
    const result = await actions.jira.updateIssue(jira, id);
    res.send(result);
  }

  public static async searchIssue(req: Request, res: Response) {
    console.log('---------------------searchIssue---------------------------------');
    const jira: JiraApi = req.app.get('jira');
    const result = await actions.jira.searchIssues(jira);
    res.send({ result });
  }
}
