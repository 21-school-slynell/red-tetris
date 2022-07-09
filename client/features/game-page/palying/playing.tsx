import React, { FC, memo, useEffect } from 'react';
import { isServer } from 'client/core/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { PLAYER_STATUSES } from '@server/socket/constants';
import { useKeyPress } from './use-keypress';
import {
  getCurrentUser,
  getGamePageData,
  getIsLeaderCurrentUser,
  pressedKey,
} from '../slice';
import { Board } from './board/board';
import { UsersBoard } from './user-boards';
import { LineSvg } from './line';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column-reverse',
  },
  board: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    overflow: 'hidden',
  },

  score: {
    position: 'absolute',
    top: -40,
    fontFamily: 'Oswald',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '36px',
    /* identical to box height, or 150% */
    textTransform: 'uppercase',
    /* Краснотища */
    color: theme.palette.primary.main,
    right: 7,
  },
  decr: {
    position: 'absolute',
    top: -32,
    fontFamily: 'Oswald',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: theme.palette.action.active,
    fontStretch: 'ultra-condensed',
    left: 7,
  },
}));

export const WrapperPlaying: FC = memo(() => {
  const classes = useStyles();

  const { piece, board = [] } = useSelector(getGamePageData);
  const user = useSelector(getCurrentUser);

  const isLeader = useSelector(getIsLeaderCurrentUser);
  const key = useKeyPress(user?.status);
  const dispatch = useDispatch();

  const currentBoard = piece ? [...board, piece] : [...board];

  useEffect(() => {
    if (key && user?.status !== PLAYER_STATUSES.FINISHED) {
      dispatch(pressedKey(key));
    }
  }, [key]);

  const handleRedirect = () => window.location.reload();

  return (
    <div className={classes.root}>
      <div className={classes.board}>
        <div style={{ position: 'absolute', bottom: '20%', left: '20%' }}>
          <LineSvg />
          <span className={classes.score}>
            {user?.score}
          </span>

          <span className={classes.decr}>point</span>
        </div>
        <Board board={currentBoard} isSmall={false} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%' }}>
          <span className={classes.score}>{user?.fillRow}</span>
          <span className={classes.decr}>row</span>
          <LineSvg />
        </div>
        <Button
          onClick={handleRedirect}
          disabled={
                        !(user?.status === PLAYER_STATUSES.FINISHED && isLeader)
                    }
        >
          Reset
        </Button>
      </div>
      <UsersBoard />
    </div>
  );
});

const NullFC: FC = () => <></>;

export const Playing = !isServer ? WrapperPlaying : NullFC;
