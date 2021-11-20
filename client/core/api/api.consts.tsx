export const BASE = 'https://ya-praktikum.tech/';
export const BASE_URL = `${BASE}api/v2`;

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const MESSAGES = {
  SIGNIN_FAIL_MESSAGE: 'Что-то пошло не так!\nПроверьте правильность введённых данных.',
  PROFILE_CHANGE_SUCCESS_MESSAGE: 'Данные успешное обновлены!',
  PROFILE_CHANGE_FAIL_MESSAGE: 'Не удалось обновить данные.\nЧто-то пошло не так!',
  FAIL_MESSAGE_500_DEFAULT: 'Ошибка сервера!',
  FAIL_MESSAGE_DEFAULT: 'Что-то пошло не так!',
};
