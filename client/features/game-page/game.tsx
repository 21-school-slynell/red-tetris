import { makeStyles, Paper } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { isServer } from 'client/core/store';
import { useSelector } from 'react-redux';
import { getInitDataGame } from '../home-page/slice';
import { getIsStatusInitGame } from './slice';
import { InitGame } from './init-game/init-game';
import { Playing } from './palying/playing';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: 24,
  },
});

export const WrapperGame: FC = memo(() => {
  const classes = useStyles();

  const { name, login } = useSelector(getInitDataGame);
  const isInitGame = useSelector(getIsStatusInitGame);

  if (!(name && login)) {
    window.location.assign('#not-found');
  }

  if (isInitGame) {
    return (
      <Paper
        className={classes.root}
        style={{ maxWidth: 600, minWidth: 600, margin: 'auto' }}
      >
        <InitGame />
      </Paper>
    );
  }

  return (
    <Paper className={classes.root} style={{ minHeight: 800 }}>
      <Playing />
    </Paper>
  );
});

const NullFC: FC = () => <></>;

export const Game = !isServer ? WrapperGame : NullFC;
