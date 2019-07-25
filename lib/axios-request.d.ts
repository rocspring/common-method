import { AxiosRequestConfig } from 'axios';
interface AxiosRequestInterface {
    options?: Object;
    request: Function;
    get: Function;
    post: Function;
}
export default class AxiosRequest implements AxiosRequestInterface {
    options: AxiosRequestConfig;
    constructor(options?: AxiosRequestConfig);
    request(opt?: AxiosRequestConfig): Promise<unknown>;
    get(url: String, opt: AxiosRequestConfig): Promise<unknown>;
    post(url: String, opt: AxiosRequestConfig): Promise<unknown>;
}
export {};
