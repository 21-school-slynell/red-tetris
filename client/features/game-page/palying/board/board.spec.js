/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from 'react';
import renderer from 'react-test-renderer';
import { Board } from './board';

const mockBoard = {
  color: 'pink',
  data: {
    18: [2],
    19: [0, 1, 2],
  },
};

describe('Board', () => {
  test('Снапшот - маленькая плашка', async () => {
    const tree = renderer.create(<Board isSmall board={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Снапшот - маленькая плашка + фигурки', async () => {
    const tree = renderer.create(<Board isSmall board={[mockBoard]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Снапшот - большая плашка', async () => {
    const tree = renderer.create(<Board board={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Снапшот - большая плашка + фигурки', async () => {
    const tree = renderer.create(<Board board={[mockBoard]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
