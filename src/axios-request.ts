import axios, { AxiosRequestConfig } from 'axios';

interface AxiosRequestInterface {
  options?: Object,
  request: Function,
  get: Function,
  post: Function,
}
 

export default class AxiosRequest implements AxiosRequestInterface {
  options: AxiosRequestConfig;

  constructor(options : AxiosRequestConfig = {}) {
    options.withCredentials = options.withCredentials || true;
    this.options = options;
  }

  request(opt: AxiosRequestConfig = {}) {
    const options = Object.assign(this.options, opt);
    return new Promise((resolve: Function, reject: Function) => {
      axios(options).then((res: any) => {
        if (res.status === 200) {
          if (res.data) {
            resolve(res.data);
          }
          reject(res.data);
        }
        // eslint-disable-next-line
        reject({
          errno: res.status,
          errmsg: res.statusText,
          data: {},
        });
      }).catch((err: any) => {
        // eslint-disable-next-line
        reject({
          errno: -1111,
          errmsg: (err && err.message) ? err.message : 'Unknow Error',
          data: {},
        });
      });
    });
  }

  get(url: String, opt: AxiosRequestConfig) {
    const options = Object.assign(this.options, opt, {
      url,
      method: 'get',
    });
    return this.request(options);
  }

  post(url: String, opt: AxiosRequestConfig) {
    const options = Object.assign(this.options, opt, {
      url,
      method: 'post',
    });
    return this.request(options);
  }
}
