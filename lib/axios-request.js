"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var AxiosRequest = /** @class */ (function () {
    function AxiosRequest(options) {
        if (options === void 0) { options = {}; }
        options.withCredentials = options.withCredentials || true;
        this.options = options;
    }
    AxiosRequest.prototype.request = function (opt) {
        if (opt === void 0) { opt = {}; }
        var options = Object.assign(this.options, opt);
        return new Promise(function (resolve, reject) {
            axios_1.default(options).then(function (res) {
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
            }).catch(function (err) {
                // eslint-disable-next-line
                reject({
                    errno: -1111,
                    errmsg: (err && err.message) ? err.message : 'Unknow Error',
                    data: {},
                });
            });
        });
    };
    AxiosRequest.prototype.get = function (url, opt) {
        var options = Object.assign(this.options, opt, {
            url: url,
            method: 'get',
        });
        return this.request(options);
    };
    AxiosRequest.prototype.post = function (url, opt) {
        var options = Object.assign(this.options, opt, {
            url: url,
            method: 'post',
        });
        return this.request(options);
    };
    return AxiosRequest;
}());
exports.default = AxiosRequest;
