import { SnackBarDataProps } from '@components/SnackBar';
import { RouterState } from 'connected-react-router';
import { initialState as InitialStateHomePage } from 'client/features/home-page/slice';
import { initialState as InitialStateGamePage } from 'client/features/game-page/slice';
import { ThemeProps } from '../api/theme.api';

export interface StoreProps {
  router: RouterState;
  snackbar: StoreSnackBarProps;
  theme: ThemeProps;
  game: GameProps;
  homePage: typeof InitialStateHomePage;
  gamePage: typeof InitialStateGamePage;
}

export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}

export type GameProps = {
  rooms: Record<string, number>;
};
