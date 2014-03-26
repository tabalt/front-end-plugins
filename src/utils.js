/**
 * @file utils.js
 * @desc 静态工具函数
 */
var Utils = {
    /**
     *     类型判断
     */
    Type : {
        CheckType : function (element, typeName) {
            if (typeof (element) == typeName ) {
                return true;
            } else {
                return false;
            }
        },
        IsObject : function (element) {
            return this.CheckType(element, 'object');
        },
        IsString : function (element) {
            return this.CheckType(element, 'string');
        },
        IsBoolean : function (element) {
            return this.CheckType(element, 'boolean');
        },
        IsNumber : function (element) {
            return this.CheckType(element, 'number');
        },
    },
    String : {
        LTrim : function (str) {
            var i;
            for (i = 0; i < str.length; i++) {
                if (str.charAt(i) != " " && str.charAt(i) != " "){
                    break;
                }
            }
            str = str.substring(i, str.length);
            return str;
        },
        RTrim : function (str) {
            var i;
            for (i = str.length - 1; i >= 0; i--) {
                if (str.charAt(i) != " " && str.charAt(i) != " "){
                    break;
                }
            }
            str = str.substring(0, i + 1);
            return str;
        },
        Trim : function (str) {
            return this.RTrim(this.LTrim(str));
        },
        ReplaceAll : function(str, search, replace) {
            return str.replace(new RegExp(search, "gm"), replace); 
        }
    },
    Random : {
        GetRandomNum : function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        },
        GetRandomId : function () {
            return this.GetRandomNum(1, 99999) + this.GetRandomNum(1, 99999) + this.GetRandomNum(1, 99999);
        }
    },
    Broswer : {
        IsFirefox : /firefox/.test(navigator.userAgent.toLowerCase()),
        IsWebkit :  /webkit/.test(navigator.userAgent.toLowerCase()),
        IsOpera : /opera/.test(navigator.userAgent.toLowerCase()),
        IsIe : /msie/.test(navigator.userAgent.toLowerCase()),
    },
    
};
