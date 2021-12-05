export const NAME_EVENT = {
  users: 'users',
};

export const createUserEventStatus = (userId: string, error: string) => {
  if (error) {
    return { userId, error, success: false };
  }

  return { userId, success: true };
};
