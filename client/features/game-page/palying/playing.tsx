import React, { FC, memo, useEffect } from 'react';
import { isServer } from 'client/core/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import { useKeyPress } from './use-keypress';
import { getGamePageData, pressedKey } from '../slice';
import { Board } from './board/board';
import { UsersBoard } from './user-boards';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  board: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    overflow: 'hidden',
  },
}));

export const WrapperPlaying: FC = memo(() => {
  const classes = useStyles();

  const { piece, board = [], score } = useSelector(getGamePageData);

  const key = useKeyPress(score);
  const dispatch = useDispatch();

  const currentBoard = piece ? [...board, piece] : [...board];

  useEffect(() => {
    if (key && Number.isNaN(Number(score))) {
      dispatch(pressedKey(key));
    }
  }, [key]);

  const handleRedirect = () => window.location.reload();

  return (
    <div className={classes.root}>
      <div className={classes.board}>
        <Board board={currentBoard} isSmall={false} />
        <Button
          onClick={handleRedirect}
          disabled={Number.isNaN(Number(score))}
        >Reset
        </Button>
      </div>
      <UsersBoard />
    </div>
  );
});

const NullFC: FC = () => <></>;

export const Playing = !isServer ? WrapperPlaying : NullFC;
