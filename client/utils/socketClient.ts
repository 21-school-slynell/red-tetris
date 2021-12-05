import io from 'socket.io-client';
import { pick } from 'ramda';

// Зарегистрированные события
export const SOCKET_EVENTS = {
  TELEPHONY_STATUS_UPDATED: 'telephony:statusUpdated',
  AGENT_STATUS_UPDATED: 'agent:statusUpdated',
  AGENT_NOTIFICATIONS_UPDATED: 'agent:notificationsUpdated',
};

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

  const resolvedHandlers = pick(Object.values(SOCKET_EVENTS), handlers);
  Object.keys(resolvedHandlers).forEach((event) => socket.on(event, resolvedHandlers[event]));

  return socket;
}
