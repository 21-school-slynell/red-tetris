import { SnackBarDataProps } from '@components/SnackBar';
import { RouterState } from 'connected-react-router';
import { ThemeProps } from '../api/theme.api';
import { initialState as InitialStateStartGame } from '~features/start-game/slice';
import { initialState as InitialStateSocket } from '~features/socket/slice';

export interface StoreProps {
  router: RouterState;
  snackbar: StoreSnackBarProps;
  theme: ThemeProps;
  game: GameProps;
  startGame: typeof InitialStateStartGame
  socket: typeof InitialStateSocket,
}

export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}

export type GameProps = {
  rooms: Record<string, number>;
};
