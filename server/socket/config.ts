export const NAME_EVENT = {
  users: 'users',
  start: 'start',
  error: 'error',
  join: 'join',
  pressKey: 'pressKey',
  board: 'board',
};

export const createUserEventStatus = (userId: string, error: string) => {
  if (error) {
    return { userId, error, success: false };
  }

  return { userId, success: true };
};
