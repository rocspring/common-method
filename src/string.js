var methods = {

  /**
   * @desc 验证特殊字符
   */
  verifySpecialCharacter: function(str) {
    var reg = new RegExp("[`~!@#$^&%*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】《》‘；：”“'。，、？ ]", 'ig');

    return reg.test(str);
  },

  /**
   * @desc 计算字符串的长度，支持中文
   */
  getStrLen: function (str) {
    var result = 0;
    var tempCharacter;

    for (var i = 0, len = str.length; i < len; i++) {
      var tempCharacter = str.charAt(i);
      if (tempCharacter.match(/[^\x00-\xff]/ig) !== null) {
        result += 2;
      } else {
        result += 1;
      }
    }
    return result;
  },

  /**
   * @desc 解析URL
   * source: https://segmentfault.com/a/1190000006215495
   */
  parseURL: function (url) {
    if (typeof url != 'string') {
      return {};
    }
    url = url.toString();
    var a = document.createElement('a');
    a.href = url;

    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [undefined, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [undefined, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/'),
      params: (function () {
        var ret = {};
        var seg = a.search.replace(/^\?/, '').split('&').filter(function (v, i) {
          if (v !== '' && v.indexOf('=')) {
            return true;
          }
        });
        seg.forEach(function (element, index) {
          var idx = element.indexOf('=');
          var key = element.substring(0, idx);
          var val = element.substring(idx + 1);
          ret[key] = val;
        });
        return ret;
      })()
    };
  }
};

module.exports = methods;