import { debounce } from '@material-ui/core/utils';
import { SPEED_DOWN } from 'client/core/config/game';
import { KeyboardEvent, useEffect, useState } from 'react';

export function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<string | undefined>(undefined);

  let interval: NodeJS.Timer;

  const downHandler = ({ code }: KeyboardEvent) => {
    setKeyPressed(code);
  };

  const upHandler = () => {
    setKeyPressed(undefined);
  };

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', debounce(downHandler, 150));
    window.addEventListener('keyup', upHandler);

    interval = setInterval(() => {
      setKeyPressed('down');
    }, SPEED_DOWN);

    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);

      clearInterval(interval);
    };
  }, []);
  return keyPressed;
}
