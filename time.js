var methods = {

  // 随机延迟执行一个方法
  randomDelayExecuteMethod: function (maxTime, method) {
    maxTime = Number(maxTime) || 60;
    var randomNum = getRandomIntInclusive(0, maxTime);

    clearTimeout(randomDelayTimer);

    randomDelayTimer = setTimeout(function () {
      method && method();
    }, randomNum * 1000);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  }
};

module.exports = methods;