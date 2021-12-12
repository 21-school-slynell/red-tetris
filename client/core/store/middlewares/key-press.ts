// import { createSocketClient } from 'client/utils/socketClient';
// import { push } from 'connected-react-router';
// import { NAME_EVENT } from 'server/socket/config';
// import { changeOpenGame, createGame, joinGame } from 'client/features/home-page/slice';
// import { STATE_GAME } from 'client/core/config/game';
// import { changeStatusGame, setStartGame, setUsers } from 'client/features/game-page/slice';
// import { debounce } from 'ramda';
// import { StoreProps } from '../store.types';
// import { showSnackBarAction } from '..';

// const handler = {
//   ArrowUp: () => console.log('UP'),
//   ArrowRight: () => console.log('RIGHT'),
//   ArrowDown: () => console.log('DOWN'),
//   ArrowLeft: () => console.log('LEFT'),
//   Space: () => console.log('SPACE'),
// };

// let interval = 0 as any;

// const keyPressListener = (dispatch: any) => (event: KeyboardEvent) => {
//   if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Space'].includes(event.code)) {
//     return;
//   }

//   event.preventDefault();

//   if (event.code === 'ArrowDown') {
//     clearInterval(interval);
//     interval = setInterval(() => {
//       dispatch(handler.ArrowDown());
//     }, 1500);
//   }

//   // @ts-ignore
//   dispatch(handler[event.code]());
// };

// export const socketMiddleware = ({ dispatch, getState }: any) => {
//   document.addEventListener('keydown', debounce(keyPressListener(dispatch), 150, { maxWait: 150 }));

//   return (next: any) => (action: any) => {
//     const state = getState() as StoreProps;

//     const {
//       homePage: { name, login, description },
//     } = state;

//     // Логика создания/подключения пользователя к игре

//     next(action);
//   };
// };
