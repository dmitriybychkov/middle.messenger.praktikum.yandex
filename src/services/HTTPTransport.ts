interface RequestOptions {
  method?: string;
  data?: any;
  headers?: { [key: string]: string };
  timeout?: number;
  retries?: number;
}

function queryStringify(data: StringIndexed = {}, parentKey: string = ''): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object');
  }

  const params: string[] = [];

  Object.keys(data).forEach((key) => {
    const value = data[key];

    const paramKey = parentKey ? `${parentKey}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((item: any, index: number) => {
        params.push(`${paramKey}[${index}]=${encodeURIComponent(item)}`);
      });
    } else if (typeof value === 'object' && value !== null) {
      const nestedParams = queryStringify(value, paramKey);
      if (nestedParams !== '') {
        params.push(nestedParams);
      }
    } else {
      params.push(`${paramKey}=${value}`);
    }
  });

  return params.length > 0 ? `?${params.join('&')}` : '';
}

function onRequestError(xhr : XMLHttpRequest) {
  return `Status: ${xhr.status}${xhr.response ? ', ' : '.'}${xhr.response?.reason || ''}`;
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

type HTTPMethod = (path: string, options?: RequestOptions) => Promise<XMLHttpRequest>

export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE_URL}${endpoint}`;
  }

  get : HTTPMethod = (path, options = {}) => this.request(`${this.endpoint + path}${queryStringify(options.data)}`, { method: METHODS.GET });

  post : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.POST });

  put : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.PUT });

  delete : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.DELETE });

  request = (url: string, options: RequestOptions) => {
    const { method = 'GET', data, headers } = options as RequestOptions;
    console.warn('REQUEST', url, options);

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}, ${xhr.response?.reason || 'Unexpected error.'}`));
        }
      };

      xhr.onabort = () => reject(new Error(`Request aborted. ${onRequestError(xhr)}`));
      xhr.onerror = () => reject(new Error(`Request error. ${onRequestError(xhr)}`));
      xhr.ontimeout = () => reject(new Error(`Request timeout. ${onRequestError(xhr)}`));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
