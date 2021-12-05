/**
 * Получить настройки девтулзов редакса
 *
 * @returns {boolean|Object}
 */

export const getReduxDevToolsOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  return {
    name: 'Support chat',
    latency: 1000,
    maxAge: 100,
    serialize: true,
    shouldRecordChanges: true,
  };
};
