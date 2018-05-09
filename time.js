var methods = {
  /**
   * @desc 随机延迟执行一个方法
   * @param maxTime {number} 延迟的最大时间(单位s)
   * @param method {function} 延迟执行的回调方法
   */
  randomDelayExecuteMethod: function(maxTime, method) {
    maxTime = Number(maxTime) || 60;
    var randomNum = getRandomIntInclusive(0, maxTime);

    setTimeout(function() {
      method && method();
    }, randomNum * 1000);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },

  /**
   * 格式化日期
   * @param {string|number} date, 日期的时间戳(单位:ms)
   * @param {string} format, 格式化需要的模版
   * @return {string} 格式化后的日期
   */
  dateformat: function(timer, format) {
    timer = new Date(Number(timer));
    if (format) {
      timer = format
        .replace("%Y", timer.getFullYear())
        .replace("%m", formatter(timer.getMonth() + 1))
        .replace("%d", formatter(timer.getDate()))
        .replace("%H", formatter(timer.getHours()))
        .replace("%M", formatter(timer.getMinutes()))
        .replace("%S", formatter(timer.getSeconds()));
    }
    return timer;

    /**
     * 数字标准化，个位数前面补0
     * @param {(string|number)} n, 要标准化的数字
     * @return {number} 标准化后的数字
     */
    function formatter(n) {
      if (typeof n === "string") {
        n = parseInt(n, 10);
      }

      if (n < 10) {
        return "0" + n;
      }
      return n;
    }
  },

    /**
   * 函数节流函数
   * @param  {Function} func  需要节流的目标函数
   * @param  {?Object} wait 间隔时间
   */
  throttle: function(func, wait) {
    var context, args, timeout, result, previous, later;
    previous = 0;
    later = function() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date(),
        remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }
};

module.exports = methods;
