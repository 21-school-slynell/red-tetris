import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC, memo } from 'react';
import { isServer } from 'client/core/store';
import { useDispatch, useSelector } from 'react-redux';
import { getInitDataGame } from 'client/features/home-page/slice';
import UserList from '../user-list/user-list';
import { getIsLeaderCurrentUser, setStartGame } from '../slice';

const useStyles = makeStyles({
  grid: {
    textAlign: 'center',
  },
});

export const WrapperGame: FC = memo(() => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { name } = useSelector(getInitDataGame);
  const isLeader = useSelector(getIsLeaderCurrentUser);

  const handleStartGame = () => {
    dispatch(setStartGame());
  };

  return (
    <Grid item xs={12} md={12} className={classes.grid}>
      <Typography align="center" variant="h6">
        {`Game: ${name}`}
      </Typography>
      <Divider variant="middle" />
      <UserList />
      <Button
        variant="contained"
        color="primary"
        disabled={!isLeader}
        onClick={handleStartGame}
      >
        start
      </Button>
    </Grid>
  );
});

const NullFC: FC = () => <></>;

export const InitGame = !isServer ? WrapperGame : NullFC;
