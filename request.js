'use strict';
var _request = function(options) {
  var defer = $.Deferred();
  var defaultOpts = {
    method: 'GET',
    dataType: 'JSON'
  };
  options = $.extend(defaultOpts, options || {});
  $.ajax(options).then(function(res) {
    if (res.errno == 0) {
      defer.resolve(res.data);
    } else {
      defer.reject(res.errmsg);
    }
  }).fail(function(errmsg) {
    defer.reject(errmsg);
  });
  return defer.promise();
};

var _get = function(url, data, options) {
  return _request($.extend({
    url: url,
    data: data
  }, options));
};

var _post = function(url, data, options) {
  return _request($.extend({
    url: url,
    data: data,
    method: 'POST'
  }, options));
};

var _jsonp = function(url, data, options) {
  return _request($.extend({
    url: url,
    dataType: 'JSONP',
    // 设置15秒超时，不然接口挂了进不到fail
    timeout: 15000,
    data: data
  }, options));
};

module.exports = {
  get: _get,
  post: _post,
  jsonp: _jsonp
};
