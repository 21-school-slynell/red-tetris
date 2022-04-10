import React, { FC } from 'react';
import { NotFound } from 'client/features/not-found/not-found';
import {
  changeLogin,
  changeNameGame,
  getInitDataGame,
  joinGame,
} from 'client/features/home-page/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Game } from 'client/features/game-page/game';
import { HomePage } from 'client/features/home-page/home-page';
import { isServer } from 'client/core/store';

export const WrapperRouting: FC = () => {
  const { login } = useSelector(getInitDataGame);

  const dispatch = useDispatch();
  if (window?.location?.hash) {
    const expGame = /^#([\w]*)\[(\w*)]/;
    const result = window.location.hash.match(expGame);
    if (!result) {
      return <NotFound />;
    }

    if (!login) {
      const [, name, logiwn] = result;
      if (logiwn && name) {
        dispatch(changeLogin(logiwn));
        dispatch(changeNameGame(name));
        dispatch(joinGame());
      } else {
        return <NotFound />;
      }
    }
    return <Game />;
  }

  return <HomePage />;
};

const NullFC: FC = () => <></>;

export const Routing = !isServer ? WrapperRouting : NullFC;
