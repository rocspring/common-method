/**
 * @file   验证器，主要用来验证表单的提交，即一次性验证多个字段，或单个想校验的字段，例如邮箱
 * @example
 *      1. 用法例子如下：
 *          引用文件: var validator = require('order:widget/validator/validator.js');
 *          获取一个单例: var single = validator.getInstance();
 *          验证邮箱： var data = {email: '这里是你的邮箱值'}；
 *          执行结果: var result = single.validate(data),result为true,数据验证没有问题，false数据不合法;
 *          可以输出错误提示：console.log(single.messages);
 *          表单提交的时候一次性多次验证：
 *          var data = {email: '你的邮箱',phone: '你的号码值',empty: '要传的值'},如果返回结果为true，才会提交,
 *          可以输出错误提示：console.log(single.messages)进行调示
 *      2. 本验证器易扩展：
 *          1). 比如我难证的某个字段，插件里没有提供，我的代码逻辑要验证某个对象是不是个美女,请按下面规则添加
 *
 *              a). 获取单例对象：var single = validator.getInstance();
 *              b). single.configs ={girl: 'isBeautifulGirl'}
 c). single.handlers.isBeautifulGirl = {
                        validate: function(value){
                        //.....你的验证逻辑在这里
                        return ....;
                        },
                    errorInfo: '不是美女！'
                }
 2). 还可以覆盖错误提示信息或验证逻辑
 a) 我想覆盖手机号码的错误提示信息
 single.configs.handlers.phone.errorTip = '你的手机呈码错了'
 b) 也可以重写覆盖手机号码验证逻辑
 single.configs.handlers.phone.validate = function(){........}
 *      3. 后面还可以添加其他验证逻辑,只需根据例子添加，不用修改太多的代码
 *
 * @exports
 *        getInstance()
 * @author xiongjun
 * @since  2014/03/26
 */


module.exports = (function () {

    var unique;

    function Singleton() {
        //配置
        this.configs = {
            //邮箱是不是合法
            email: 'emailValidator',
            //手机号码
            phone: 'phoneValidator',
            //值是否非空
            empty: 'emptyValidator',
            //是否是数字
            number: 'numberValidator',
            //是否是正整数
            positiveIntNum: 'positiveIntNumValidator',
            // 短信验证码 by zhaoran04
            smscode: 'smscodeValidator',
            //邮政编码
            postalcode: 'postalcodeValidator',
            // 中文姓名
            chinesename: 'isChineseName',
            // 身份证号
            IDCardNo: 'idnumberValidator'
            //后续还可以添加其他要校验的....
        };
        //与configs配对的处理函数
        this.handlers = {};
        //错误信息提示数组
        this.messages = [];
    }

    Singleton.prototype.initHandlers = function () {
        //邮箱处理handler
        this.handlers[this.configs.email] = {
            validate: function (data) {
                var regEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                return regEmail.test(data);
            },
            errorTip: '邮箱不合法'
        };

        //处理手机号码handler
        this.handlers[this.configs.phone] = {
            validate: function (data) {
                //在国外打回中国就要先拨+86或0086,现在补充上，但向后端提交手机号时一定要取将86后面的11位
                var regEmail = /^((\+86)|(0086))?1[0-9]{10}$/;
                return regEmail.test(data);
            },
            errorTip: '请输入正确的手机号码'
        };

        //是否为空值的handler
        this.handlers[this.configs.empty] = {
            validate: function (data) {
                return (data !== '' && data !== undefined && data !== null);
            },
            errorTip: '值不能为空'
        };
        //校验值是否是数字
        this.handlers[this.configs.number] = {
            validate: function (data) {
                return !isNaN(data);
            },
            errorTip: '值不是数字'
        };
        //校验值是否是正整数
        this.handlers[this.configs.positiveIntNum] = {
            validate: function (data) {
                var reg = /^\d+$/;
                return reg.test(data);
            },
            errorTip: '值不是正整数'
        };
        //校验值是否是数字
        this.handlers[this.configs.smscode] = {
            validate: function (data) {
                // 6位数字
                var reg = /^\d{6}$/;
                return reg.test(data);
            },
            errorTip: '不是有效的短信验证码'
        };
        //校验邮政编码
        this.handlers[this.configs.postalcode] = {
            validate: function (data) {
                return /^\d{6}$/.test(data);
            },
            errorTip: '不是有效的邮政编码'
        };

        this.handlers[this.configs.chinesename] = {
            validate: function (data) {
                var regChineseName = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
                return regChineseName.test(data);
            },
            errorTip: '请核对身份证姓名'
        };

        this.handlers[this.configs.IDCardNo] = {
            validate: function (data) {
                /*
                 根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
                 地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
                 出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
                 顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
                 校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

                 出生日期计算方法。
                 15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
                 2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
                 下面是正则表达式:
                 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
                 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
                 15位校验规则 6位地址编码+6位出生日期+3位顺序号
                 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

                 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                 公式(1)中：
                 i----表示号码字符从由至左包括校验码在内的位置序号；
                 ai----表示第i位置上的号码字符值；
                 Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                 i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                 Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

                 */
                //身份证号合法性验证
                //支持15位和18位身份证号
                //支持地址编码、出生日期、校验位验证
                var city = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江 ",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北 ",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏 ",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外 "
                };
                var pass = true;
                if (!data || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x)$/i.test(data)) {
                    this.errorTip = "为空或格式不正确";
                    pass = false;
                } else if (!city[data.substr(0, 2)]) {
                    this.errorTip = "省份位错误";
                    pass = false;
                } else {
                    //18位身份证需要验证最后一位校验位
                    if (data.length == 18) {
                        data = data.split('');
                        //∑(ai×Wi)(mod 11)
                        //加权因子
                        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                        //校验位
                        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                        var sum = 0;
                        var ai = 0;
                        var wi = 0;
                        for (var i = 0; i < 17; i++) {
                            ai = data[i];
                            wi = factor[i];
                            sum += ai * wi;
                        }
                        var last = parity[sum % 11];
                        if (parity[sum % 11] != data[17]) {
                            this.errorTip = "校验位错误";
                            pass = false;
                        }
                    }
                }
                return pass;
            },
            errorTip: '请核对身份证号码'
        };
        //按照上面的例子后续还可以添加与config中配对的处理函数....

    };
    Singleton.prototype.hasErrors = function () {
        return this.messages.length > 0;
    };
    Singleton.prototype.validate = function (data) {

        var self = this;
        self.initHandlers();
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var type = self.configs[i];
                var checker = self.handlers[type];
                if (!type) {
                    continue;
                }
                if (!checker) {
                    throw {
                        name: '较验异常',
                        message: '没有与' + type + '相关的较验函数'
                    };
                }

                var result = checker.validate(data[i]);
                if (!result) {
                    var msg = i + '的值:' + checker.errorTip;
                    self.messages.push(msg);
                } else {
                    //清空错误信息
                    self.messages.splice(0, self.messages.length);
                }
            }
        }

        return !self.hasErrors();
    };

    function getInstance() {
        if (unique === undefined) {
            unique = new Singleton();
        }
        return unique;
    }

    return {
        getInstance: getInstance
    };
})();
