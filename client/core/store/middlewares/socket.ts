import { changeOpenGame } from 'client/features/start-game/slice';
import { createSocketClient, SOCKET_EVENTS } from 'client/utils/socketClient';
import { push } from 'connected-react-router';
import { StoreProps } from '../store.types';

const createAgentStatusUpdatedHandler = (dispatch: any) => (
  props: any,
) => console.log(dispatch, props);

export const socketMiddleware = ({ dispatch, getState }: any) => {
  const socket = createSocketClient(
    {
      host: '',
      options: {},
      handlers: {
        [SOCKET_EVENTS.AGENT_NOTIFICATIONS_UPDATED]: createAgentStatusUpdatedHandler(dispatch),
      },
    },
  );

  socket.on('connect', () => {
    console.log(getState());
    // const userId = getAuthAgentId(getState());

    // if (userId) {
    //   sendJoinEvent(socket, userId);
    // }
  });

  return (next: any) => (action: any) => {
    const {
      startGame: { typeGame, name, isOpen },
    } = getState() as StoreProps;

    if (typeGame && !isOpen) {
      socket.emit('join', { roomName: name, context: {} });
      next(changeOpenGame());
      next(push(`/game?name=${name}`));
    }
    next(action);
  };
};
