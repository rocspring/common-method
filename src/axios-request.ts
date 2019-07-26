import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

 interface IResponse  {
  errno: number,
  data: {} | [] | null,
  errmsg: string 
}

export interface IAxiosRequest {
  options?: {},
  request(params: AxiosRequestConfig) : Promise<IResponse>,
  get(url: string, params: AxiosRequestConfig) : Promise<IResponse>,
  post(url: string, params: AxiosRequestConfig) : Promise<IResponse>,
}

export default class AxiosRequest implements IAxiosRequest {
  options: AxiosRequestConfig;

  constructor(options : AxiosRequestConfig = {}) {
    options.withCredentials = options.withCredentials || true;
    this.options = options;
  }

  request(opt: AxiosRequestConfig = {}) {
    const options = Object.assign(this.options, opt);
    return new Promise<IResponse>((resolve: Function, reject: Function) => {
      axios(options).then((res: AxiosResponse) => {
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
