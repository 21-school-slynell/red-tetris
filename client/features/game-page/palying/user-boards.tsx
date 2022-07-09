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
    overflow: 'overlay',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    gap: theme.spacing(4),
    minHeight: 202,
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export const WrapperUsersBoard: FC = memo(() => {
  const classes = useStyles();

  const { usersBoard } = useSelector(getGamePageData);
  const { login } = useSelector(getInitDataGame);

  const boards = useMemo(() => {
    const users = Object.keys(usersBoard).filter((user) => user !== login);

    return users.map((user) => (
      <Paper
        elevation={0}
        style={{ padding: 8, height: 202, width: 97 }}
      >
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
          className={classes.text}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
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
