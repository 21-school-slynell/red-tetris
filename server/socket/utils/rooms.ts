import { PREFIX } from 'server/server.utils';

export const getNameRooms = (rooms: Map<string, any>) => {
  const names = Array.from(rooms.keys());
  return names.filter((name: string) => name.indexOf(PREFIX) === 0);
};
