
'use strict';

var methods = {
    isObjInList: function (list, propPath, value) {
      list = list || [];
      var
        i,
        temp,
        propPathArray = propPath.split('.'),
        len = list.length;

      for (i = 0; i < len; i++) {
        temp = getValueByPropPath(list[i], propPathArray);
        if(temp == value) {
          return true;
        }
      }

      return false;

      function getValueByPropPath(obj, propPathArray) {
        var
        i,
        temp,
        length = propPathArray.length;

        for (i = 0; i < length; i++) {
          temp = propPathArray[i];
          if (temp === undefined) {
            return;
          }
        }
        return temp;
      }
    }
};

module.exports = methods;
