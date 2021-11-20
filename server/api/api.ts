import { OptionsType, OptionsWithoutMethodType, queryStringify } from 'client/core/api/api';
import { BASE_URL, METHOD } from 'client/core/api/api.consts';
import fetch from 'node-fetch';

export class ServerHTTP {
  basePath: string;

  constructor(path = '', basePath = BASE_URL) {
    this.basePath = basePath + path;
  }

  get<Req, Res>(
    url: string,
    options: OptionsWithoutMethodType = {},
  ): Promise<Res> {
    return this.request<Req, Res>(url, { ...options, method: METHOD.GET });
  }

  post<Req, Res>(
    url: string,
    options: OptionsWithoutMethodType = {},
  ): Promise<Res> {
    return this.request<Req, Res>(url, { ...options, method: METHOD.POST });
  }

  put<Req, Res>(
    url: string,
    options: OptionsWithoutMethodType = {},
  ): Promise<Res> {
    return this.request<Req, Res>(url, { ...options, method: METHOD.PUT });
  }

  delete<Req, Res>(
    url: string,
    options: OptionsWithoutMethodType = {},
  ): Promise<Res> {
    return this.request<Req, Res>(url, {
      ...options,
      method: METHOD.DELETE,
    });
  }

  request<Req, Res>(
    url: string,
    options: OptionsType = { method: METHOD.GET },
  ): Promise<Res> {
    function serializeBody(method: METHOD, data: Req) {
      if (method === METHOD.GET) {
        return;
      }

      return JSON.stringify(data);
    }

    function serializeHeader({ data, method, headers }: OptionsType<Req>) {
      if (method === METHOD.GET || data instanceof FormData) {
        return headers;
      }

      return {
        ...headers,
        'Content-Type': 'application/json',
      };
    }

    const { method, data } = options;
    const basePath = `${this.basePath}${url}`;
    const path = method === METHOD.GET
      ? `${basePath}${queryStringify(data)}`
      : basePath;

    return fetch(path, {
      method,
      body: serializeBody(method, data),
      headers: serializeHeader(options),
    }).then((response: any) => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response;
    });
  }
}
