import { AxiosRequestConfig } from 'axios';
interface IResponse {
    errno: number;
    data: {} | [] | null;
    errmsg: string;
}
export interface IAxiosRequest {
    request(params: AxiosRequestConfig): Promise<IResponse>;
    get(url: string, params: AxiosRequestConfig): Promise<IResponse>;
    post(url: string, params: AxiosRequestConfig): Promise<IResponse>;
}
export default class AxiosRequest implements IAxiosRequest {
    private options;
    constructor(options?: AxiosRequestConfig);
    request(opt?: AxiosRequestConfig): Promise<IResponse>;
    get(url: String, opt: AxiosRequestConfig): Promise<IResponse>;
    post(url: String, opt: AxiosRequestConfig): Promise<IResponse>;
}
export {};
