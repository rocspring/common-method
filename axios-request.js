import axios from 'axios';

export default class AxiosRequest {
  constructor(options = {}) {
    options.withCredentials = options.withCredentials || true;
    this.options = options;
  }

  request(opt) {
    const options = Object.assign(this.options, opt);
    return new Promise((resolve, reject) => {
      axios(options).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.errno === 0) {
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
      }).catch((err) => {
        // eslint-disable-next-line
        reject({
          errno: -1111,
          errmsg: (err && err.message) ? err.message : 'Unknow Error',
          data: {},
        });
      });
    });
  }

  get(url, opt) {
    const options = Object.assign(this.options, opt, {
      url,
      method: 'get',
    });
    return this.request(options);
  }

  post(url, opt) {
    const options = Object.assign(this.options, opt, {
      url,
      method: 'post',
    });
    return this.request(options);
  }
}
