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
  }
};

module.exports = methods;