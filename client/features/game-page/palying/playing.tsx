import React, { FC, memo, useEffect } from 'react';
import { isServer } from 'client/core/store';
import { useKeyPress } from './use-keypress';

export const WrapperPlaying: FC = memo(() => {
  const key = useKeyPress();

  useEffect(() => {
    console.log(key);
  }, [key]);

  return <span>начало игры</span>;
});

const NullFC: FC = () => <></>;

export const Playing = !isServer ? WrapperPlaying : NullFC;
