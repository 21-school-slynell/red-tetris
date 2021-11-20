import { SnackBarDataProps } from '@components/SnackBar';
import { RouterState } from 'connected-react-router';
import { ThemeProps } from '../api/theme.api';

export interface StoreProps {
    router: RouterState;
    snackbar: StoreSnackBarProps;
    theme: ThemeProps;
    game: GameProps;
}

export interface StoreSnackBarProps extends SnackBarDataProps {
    isVisible: boolean;
}

export type GameProps = {
    rooms: Record<string, number>;
};
