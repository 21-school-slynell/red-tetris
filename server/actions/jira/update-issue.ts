import JiraApi from 'jira-client';

export const updateIssue = async (jira: JiraApi, id: string) => {
  try {
    const update = {
      fields: {
        customfield_10213: 14,
        timetracking: {
          remainingEstimate: '3h',
        },
      },
    };

    await jira.updateIssue(id, update);

    return { result: true };
  } catch (err) {
    return { result: false };
  }
};
