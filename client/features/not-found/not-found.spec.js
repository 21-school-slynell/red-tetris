/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from 'react';
import renderer from 'react-test-renderer';
import { WrapperNotFound } from './not-found';

describe('WrapperNotFound', () => {
  test('Снапшот для страницы not found', async () => {
    const tree = renderer.create(<WrapperNotFound open />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
