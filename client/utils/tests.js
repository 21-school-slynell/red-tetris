/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { act } from 'react-dom/test-utils';
/**
 * Функция для выполнения всех ожидающих промисов в EventLoop
 *
 * @example
 * // Act smth
 * await flushPromises();
 * // Assert smth
 *
 * @returns {Promise}
 */
export const flushPromises = () => new Promise(setImmediate);

/**
 * Функция обновления смонтированного компонента после действий над компонентом
 *
 * @param {Object} options { withTimers }
 * @returns {Function}
 */
export const createWrapperUpdater = ({ withTimers = true } = {}) => {
  if (withTimers) {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  }

  return async (wrapper) => {
    await act(async () => {
      // Завершаем все микротаски
      await flushPromises();
      // // Завершаем все макротаски
      if (withTimers) {
        jest.runOnlyPendingTimers();
      }

      // Обновляем разметку
      wrapper.update();
    });
  };
};
