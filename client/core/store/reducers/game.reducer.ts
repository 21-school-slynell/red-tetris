import { GameProps } from '..';
import { ActionProps, GAME } from '../actions';

export const initialGameState = {
  rooms: {}
} as GameProps;

export const gameReducer = (state = initialGameState, action: ActionProps) => {
  switch (action.type) {
    case GAME.SET_ROOMS:
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
};
