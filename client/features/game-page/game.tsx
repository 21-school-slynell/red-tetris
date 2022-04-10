import { makeStyles, Paper } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { isServer } from 'client/core/store';
import { useSelector } from 'react-redux';
import { getInitDataGame } from '../home-page/slice';
import { getIsStatusInitGame, getIsStatusStartGame } from './slice';
import { InitGame } from './init-game/init-game';
import { Playing } from './palying/playing';

const useStyles = makeStyles({
  root: {
    maxHeight: 800,
    minHeight: 600,
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
  const isStartGame = useSelector(getIsStatusStartGame);

  if (!(name && login)) {
    window.location.assign('#not-found');
  }

  let content = null;

  if (isInitGame) {
    content = <InitGame />;
  }

  if (isStartGame) {
    content = <Playing />;
  }

  return <Paper className={classes.root}>{content}</Paper>;
});

const NullFC: FC = () => <></>;

export const Game = !isServer ? WrapperGame : NullFC;
