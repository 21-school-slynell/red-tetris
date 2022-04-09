import React, { FC, memo, useEffect, useMemo } from 'react';
import { isServer } from 'client/core/store';
import { useDispatch, useSelector } from 'react-redux';
import { getInitDataGame } from 'client/features/home-page/slice';
import { Paper, Typography } from '@material-ui/core';
import { useKeyPress } from './use-keypress';
import { getGamePageData, pressedKey } from '../slice';
import { Board } from './board/board';

export const WrapperPlaying: FC = memo(() => {
  const key = useKeyPress();
  const dispatch = useDispatch();

  const { piece, board = [], usersBoard } = useSelector(getGamePageData);
  const { login } = useSelector(getInitDataGame);

  const currentBoard = piece ? [...board, piece] : [...board];

  useEffect(() => {
    if (key) {
      dispatch(pressedKey(key));
    }
  }, [key]);

  const boards = useMemo(() => {
    const users = Object.keys(usersBoard).filter((user) => user !== login);

    return users.map((user) => (
      <Paper
        elevation={3}
        style={{
                    height: 288,
                    padding: 8,
                    width: 136,
                }}
      >
        <Typography variant="h6" color="primary" style={{ overflow: 'hidden' }}>
          {user}
        </Typography>
        <Board board={usersBoard[user]} isSmall />
      </Paper>
    ));
  }, [usersBoard]);

  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <div
        style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
      >
        <h1>начало игры</h1>
        <Board board={currentBoard} isSmall={false} />
      </div>
      <div
        style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'overlay',
                    padding: 8,
                    paddingRight: 24,
                    gap: 16,
                }}
      >
        {boards}
      </div>
    </div>
  );
});

const NullFC: FC = () => <></>;

export const Playing = !isServer ? WrapperPlaying : NullFC;
