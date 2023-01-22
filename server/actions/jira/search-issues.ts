/* eslint-disable @typescript-eslint/no-use-before-define */
import JiraApi from 'jira-client';

const config = {
  label: 'test-next-sprint',
  project: 'SS',
};

const timeType = {
  back: 'back',
  front: 'front',
  test: 'test',
  autoTestBack: 'autoTestBack',
  autoTestFront: 'autoTestFront',
} as const;

type KeyTimeType = keyof typeof timeType;

const keyTimeTypes = Object.keys(timeType) as KeyTimeType[];

const regExpByType: Record<KeyTimeType, string> = {
  back: '\\r\\nback.-.(.{0,10})\\r\\n',
  front: '\\r\\nfront.-.(.{0,10})\\r\\n',
  test: '\\r\\nmanual.test.-.(.{0,10})\\r\\n',
  autoTestBack: '\\r\\nauto.test.back.-.(.{0,10})\\r\\n',
  autoTestFront: '\\r\\nauto.test.front.-.(.{0,10})\\r\\n',
};

export const searchIssues = async (jira: JiraApi) => {
  try {
    const result = await jira.searchJira(`project=${config.project} AND labels=${config.label}`);
    if (result?.issues) {
      const issues = result.issues.map(({ id, fields }: any) => {
        const bisnessValue = fields.customfield_10213 || 0;
        const remainingEstimate = fields?.timetracking?.remainingEstimate || '0m';
        const summary = fields?.summary || `Описание задачи ${id}`;
        const description = fields?.description;
        const epic = fields?.customfield_10216;
        const times = getTimes(description);

        return { id, bisnessValue, remainingEstimate, summary, times, epic };
      });

      return { issues };
    }
  } catch (err) {
    return { result: false };
  }
};

const getTimes = (description: string) => {
  const times: Record<KeyTimeType, number> = {
    back: 0,
    front: 0,
    test: 0,
    autoTestBack: 0,
    autoTestFront: 0,
  };

  keyTimeTypes.forEach((type) => {
    const match = description.match(regExpByType[type]);
    if (match && match?.length > 0 && match[1]) {
      // eslint-disable-next-line prefer-destructuring
      times[type] = durationH(match[1]);
    } else {
      times[type] = 0;
    }
  });

  return times;
};

const durationH = (time: string) => {
  const units = { d: 3600 * 8, h: 3600, m: 60, s: 1 };
  const regex = /(\d+)([dhms])/g;

  let seconds = 0;
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(time))) {
    let unit = units.h;
    if (match[2] && match[2] in units) {
      unit = units[match[2] as keyof typeof units];
    }
    seconds += parseInt(match[1], 10) * unit;
  }

  // eslint-disable-next-line no-mixed-operators
  return Math.round(seconds / units.h * 100) / 100;
};
