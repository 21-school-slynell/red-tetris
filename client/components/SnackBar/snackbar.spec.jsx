/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { mount } from 'enzyme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { snackbarReducer } from 'client/core/store/reducers/snackbar.reducer';
import { createWrapperUpdater } from '../../utils/tests';
import { SnackBar } from './index';

const agentStatusList = [
  { id: 2, name: 'В работе, письмо', uiIsVisible: true, uiPosition: 1 },
  {
    id: 12,
    name: 'В работе, входящие звонки',
    uiIsVisible: true,
    uiPosition: 2,
  },
  {
    id: 13,
    name: 'В работе, исходящие звонки',
    uiIsVisible: true,
    uiPosition: 3,
  },
  { id: 300, name: 'В работе, чат', uiPosition: 4 },
  { id: 3, name: 'Перерыв', uiIsVisible: true, uiPosition: 7 },
  { id: 4, name: 'Обед', uiIsVisible: true, uiPosition: 8 },
  { id: 5, name: 'Встреча', uiIsVisible: true, uiPosition: 9 },
  { id: 6, name: 'Наставничество', uiIsVisible: true, uiPosition: 10 },
  { id: 7, name: 'Обучение', uiIsVisible: true, uiPosition: 11 },
  { id: 8, name: 'Самообучение', uiIsVisible: true, uiPosition: 12 },
  { id: 11, name: 'Завершение смены', uiIsVisible: true, uiPosition: 20 },
  { id: 1, name: 'Авторизация', uiPosition: 22 },
  { id: 303, name: 'Низкий поток, чат', uiPosition: 35 },
  { id: 302, name: 'Хочу на перерыв', uiIsVisible: true, uiPosition: 36 },
];

describe('SnackBar', () => {
  let store;

  const updateWrapper = createWrapperUpdater();

  const createWrapper = async (props = {}) => {
    // Делаем прокси компонент для изменения просов дочернего компонента
    const ProxyComponent = (props) => (
      <Provider store={store}>
        <SnackBar {...props} />
      </Provider>
    );

    const wrapper = mount(<ProxyComponent {...props} />);

    // await updateWrapper(wrapper);

    return wrapper;
  };

  beforeEach(() => {
    store = configureStore({ reducer: { snackbarReducer } });
  });
  test('dfsf', async () => {
    const wrapper = createWrapper({ open: true });
    console.log(store);
    expect(2).toEqual(2);
  });
  //   test('Загрузка списка статусов', async () => {
  //     let resolveFn;

  //     api.agent.statuses.mockImplementation(() => new Promise((resolve) => {
  //       resolveFn = resolve;
  //     }));

  //     // Загружаем список статусов и открываем модалку
  //     store.dispatch(loadAgentStatuses());
  //     await store.dispatch(toggleIsModalVisible(true));

  //     const wrapper = await createWrapper();

  //     // Проверяем есть ли spin на в модалке
  //     expect(wrapper.find(spinMarker.selector)).toHaveLength(1);

  //     resolveFn({ statuses: agentStatusList });
  //     await updateWrapper(wrapper);
  //     expect(wrapper.find(spinMarker.selector)).toHaveLength(0);
  //   });

  //   test('Рендерит спискок статусов', async () => {
  //     // Загружаем список статусов и открываем модалку
  //     await store.dispatch(loadAgentStatuses());
  //     await store.dispatch(toggleIsModalVisible(true));

  //     const wrapper = await createWrapper();

  //     // Отрендерился список статусов
  //     const listComponent = wrapper.find(listMarker.selector);
  //     expect(listComponent).toHaveLength(1);

  //     const commonStatuses = getCommonStatuses(store.getState());
  //     expect(listComponent.first().children()).toHaveLength(
  //       commonStatuses.length,
  //     );
  //   });

  //   test('Рендерит предупреждения о завершении работы', async () => {
  //     // Загружаем список статусов, открываем модалку и устанавливаем статус
  //     await store.dispatch(loadAgentStatuses());
  //     await store.dispatch(toggleIsModalVisible(true));
  //     await store.dispatch(setCurrentStatusId(agentStatusesIds.wantBreak));
  //     const wrapper = await createWrapper();

  //     // Отрендерилось предупреждение о завершении работы
  //     expect(
  //       wrapper.find(wantBreakWarningMarker.selector).hostNodes(),
  //     ).toHaveLength(1);

  //     // Смена статуса
  //     await store.dispatch(setCurrentStatusId(agentStatusesIds.workOnChat));
  //     await updateWrapper(wrapper);
  //     expect(
  //       wrapper.find(wantBreakWarningMarker.selector).hostNodes(),
  //     ).toHaveLength(0);
  //   });

  //   test('Отработка события хочу на перерыв', async () => {
  //     // Загружаем список статусов, открываем модалку и устанавливаем статус
  //     await store.dispatch(loadAgentStatuses());
  //     await store.dispatch(toggleIsModalVisible(true));
  //     await store.dispatch(setCurrentStatusId(agentStatusesIds.workOnChat));

  //     const wrapper = await createWrapper();
  //     const button = wrapper.find(wantBreakMarker.selector).hostNodes();
  //     expect(button).toHaveLength(1);

  //     // Кликаем на кнопку "хочу на перерыв"
  //     button.simulate('click');
  //     await updateWrapper(wrapper);

  //     expect(wrapper.isEmptyRender()).toEqual(true);
  //   });
});
