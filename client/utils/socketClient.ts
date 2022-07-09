import io from 'socket.io-client';
import { pick } from 'ramda';
import { NAME_EVENT } from '@server/socket/config';

export type CreateSocketClientProps = {
  host: string,
  options: any,
  handlers: Record<string, any>
};

export function createSocketClient({ host = '', options = {}, handlers = {} }: CreateSocketClientProps) {
  const resolvedOptions = {
    path: '/socket/',
    withCredentials: true,
    ...options,
  };

  const socket = io(host, resolvedOptions);

  const resolvedHandlers = pick(Object.values(NAME_EVENT), handlers);
  Object.keys(resolvedHandlers).forEach((event) => socket.on(event, resolvedHandlers[event]));

  return socket;
}
