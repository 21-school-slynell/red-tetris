import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { isServer } from 'client/core/store';
import { useLocation } from 'react-router';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getInitDataGame } from '../start-game/slice';

const useStyles = makeStyles({
  root: {
    maxHeight: 1000,
    minHeight: 600,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: 24,
  },
  grid: {
    display: 'grid',
    gap: 16,
  },
});

export const WrapperGame: FC = memo(() => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { name: nameGame, login } = useSelector(getInitDataGame);

  if (!(nameGame && login)) {
    dispatch(push('/not-found'));
  }

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');

  return (
    <Paper className={classes.root}>
      <Grid xs={12} md={6} className={classes.grid}>
        {name}
      </Grid>
    </Paper>
  );
});

const NullFC: FC = () => <></>;

export const Game = !isServer ? WrapperGame : NullFC;
