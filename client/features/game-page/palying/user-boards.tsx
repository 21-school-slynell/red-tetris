import React, { FC, memo, useMemo } from 'react';
import { isServer } from 'client/core/store';
import { useSelector } from 'react-redux';
import { getInitDataGame } from 'client/features/home-page/slice';
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { getGamePageData } from '../slice';
import { Board } from './board/board';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'overlay',
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
    gap: theme.spacing(2),
  },
  board: {
    height: 288,
    width: 136,
  },
  text: {
    overflow: 'hidden',
  },
}));

export const WrapperUsersBoard: FC = memo(() => {
  const classes = useStyles();

  const { usersBoard } = useSelector(getGamePageData);
  const { login } = useSelector(getInitDataGame);

  const boards = useMemo(() => {
    const users = Object.keys(usersBoard).filter((user) => user !== login);

    return users.map((user) => (
      <Paper elevation={3} className={classes.board} style={{ padding: 8 }}>
        <Typography
          variant="body1"
          color="primary"
          align="center"
          className={classes.text}
        >
          {user}
        </Typography>
        <Board board={usersBoard[user]} isSmall />
      </Paper>
    ));
  }, [usersBoard]);

  return <div className={classes.root}>{boards}</div>;
});

const NullFC: FC = () => <></>;

export const UsersBoard = !isServer ? WrapperUsersBoard : NullFC;
