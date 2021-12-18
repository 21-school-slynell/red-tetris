import React, { FC, memo, useEffect } from 'react';
import { isServer } from 'client/core/store';
import { useDispatch } from 'react-redux';
import { useKeyPress } from './use-keypress';
import { pressedKey } from '../slice';
import { Board } from './board/board';

export const WrapperPlaying: FC = memo(() => {
  const key = useKeyPress();
  const dispatch = useDispatch();

  useEffect(() => {
    if (key) {
      dispatch(pressedKey(key));
    }
  }, [key]);

  return (
    <div>
      <h1>начало игры</h1>
      <Board />
    </div>
  );
});

const NullFC: FC = () => <></>;

export const Playing = !isServer ? WrapperPlaying : NullFC;
