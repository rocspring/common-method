var util = {

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
  getStrLen: function (val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) !== null) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  }
};