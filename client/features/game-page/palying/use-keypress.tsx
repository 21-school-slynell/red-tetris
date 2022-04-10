/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from '@material-ui/core/utils';
import { SPEED_DOWN } from 'client/core/config/game';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pressedKey } from '../slice';

export function useKeyPress(score?: number) {
  const [keyPressed, setKeyPressed] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  let interval: NodeJS.Timer;

  const downHandler = ({ code }: KeyboardEvent) => setKeyPressed(code);

  const upHandler = () => setKeyPressed(undefined);

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', debounce(downHandler, 100));
    window.addEventListener('keyup', upHandler);

    interval = setInterval(() => {
      if (Number.isNaN(Number(score))) {
        dispatch(pressedKey('ArrowDown'));
      }
    }, SPEED_DOWN);

    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);

      clearInterval(interval);
    };
  }, [score]);
  return keyPressed;
}
