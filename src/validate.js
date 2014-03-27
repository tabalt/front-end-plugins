/**
 * @file validate.js
 * @desc Jquery Form Validate Plugin
 * @licensed http://www.apache.org/licenses/LICENSE-2.0
 * @auth Tabalt <tabalt@actphp.com>
 * @version 1.4 
 * @update 2014.03.27
 * @import utils.js
 */

!function($){

    var defaults = {
        ruleList : [], //validate rule list
        successCallback : function(form){
            // return true to submit this form 
            // return false to cancel form submit and you can submit it by ajax
            return true;
        },
        errorCallback : null
    };

    var defaultRule = {
        elementId : null,
        defaultTips : '',
        successTips : '',
        allowEmpty : true,
        emptyTips : 'required',
        limitLength : null,
        limitTips : 'length must be {%limit}',
        minLength : null,
        maxLength : null,
        lengthTips : 'length must between {%min} and {%max}',
        type : null,
        typeTips : 'type not match',
        regex : null,
        regexTips : 'regex not match',
        match : null,
        matchTips : 'not match',
    };

    $.fn.validate = function(options){

        var settings = $.extend({}, defaults, options);

        var validateForm = $(this);

        // show tips
        var showTips = function(elementId, tips, type) {
            var styleClass = "";
            if (type == 'success') {
                styleClass = "tips-success";
            } else if (type == 'error') {
                styleClass = "tips-error";            
            }
            tips = '<span class="' + styleClass +'">' + tips + '</span>';
            $('#' + elementId +'-tips').html(tips);
        };

        // check empty
        var checkEmpty = function (value, elementId, emptyMsg) {
            if (!value) {
                showTips(elementId, emptyMsg, 'error');
                return false;
            } else {
                return true;
            }
        }

        // check length limit
        var checkLimit = function (value, elementId, limitLength, limitMsg) {
            var len = value.length;
            if (len != limitLength) {
                showTips(elementId, limitMsg.replace('{%limit}', limitLength), 'error');
                return false;
            } else {
                return true;
            }
        }

        // check length range
        var checkLength = function (value, elementId, minLength, maxLength, lengthMsg) {
            var len = value.length;
            if ((len < minLength) || (len > maxLength)) {
                showTips(elementId, lengthMsg.replace('{%min}', minLength).replace('{%max}',
                        maxLength), 'error');
                return false;
            } else {
                return true;
            }
        }

        // check regex
        var checkRegex = function (value, elementId, regex, regexMsg) {
            if (!regex.test(value)) {
                showTips(elementId, regexMsg, 'error');
                return false;
            } else {
                return true;
            }
        }

        // check type
        var checkType = function (value, elementId, type, typeMsg) {
            // TODO  email,qq,alpha,alphanum,cellphone,url,
            var regex = '';
            switch (type) {
                case 'email':
                    regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    break;
                case 'qq':
                    regex = /^[1-9][0-9]{4,9}$/;
                    break;
                case 'alpha':
                    regex = /^[a-zA-Z]*$/;
                    break;
                case 'alphanum':
                    regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
                    break;
                case 'num':
                    regex = /^[0-9]*$/;
                    break;
                case 'tel':
                    regex = /^\d{3,4}-\d{7,8}$/;
                    break;
                case 'cellphone':
                    regex = /^1[3|5|8][0-9]{9}$/;
                    break;
                case 'url':
                    regex = /^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
                    break;
                case 'chinese':
                    regex = /^[\u4e00-\u9fa5]+$/;
                    break;
                default:
                    regex = /.*/
                    break;
            }
            if (checkRegex(value, elementId, regex, typeMsg)){
                return true;
            } else {
                return false;
            }
        }

        // check match 
        var checkMatch = function (value, elementId, matchId, matchMsg) {
            if (value != $('#' + matchId).val()) {
                showTips(elementId, matchMsg, 'error');
                return false;
            } else {
                return true;
            }
        }

        var validateElement = function(value, rule) {
            value = Utils.String.Trim(value);
            // if allow empty and value is empty don't validate item as follow, else validate all
            if(!(rule.allowEmpty == true && value == '')) {
                //check empty
                if (rule.allowEmpty == false && !checkEmpty(value, rule.elementId, rule.emptyTips)) {
                    return false;
                }
                //check type
                if (Utils.Type.IsString(rule.type) && !checkType(value, rule.elementId, rule.type, rule.typeTips)){
                    return false;
                }
                //check length limit
                if (Utils.Type.IsNumber(rule.limitLength) && !checkLimit(value, rule.elementId, rule.limitLength, rule.limitTips)) {
                    return false;
                }
                //check length range
                if (Utils.Type.IsNumber(rule.minLength) && Utils.Type.IsNumber(rule.maxLength)) {
                    if((rule.minLength < rule.maxLength) && !checkLength(value, rule.elementId, rule.minLength, rule.maxLength, rule.lengthTips)) {
                        return false;
                    }
                }
                //check regex
                if ((rule.regex != null) && !checkRegex(value, rule.elementId, rule.regex, rule.regexTips)) {
                    return false;
                }
                //check match
                if (Utils.Type.IsString(rule.match) && !checkMatch(value, rule.elementId, rule.match, rule.matchTips)) {
                    return false;
                }
            }
            // show success tips
            showTips(rule.elementId, rule.successTips, 'success');
            return true;
        };

        $.each(settings.ruleList, function(k, rule){
            rule = settings.ruleList[k] = $.extend({}, defaultRule, rule);
            
            //show default tips
            showTips(rule.elementId, rule.defaultTips);

            //set input's focus and blur event
            $('#' + rule.elementId).focus(function() {
                $(this).removeClass('input-success')
                    .removeClass('input-error')
                    .addClass('input-focus');
            }).blur(function() {
                $(this).removeClass('input-focus');
                //validate one element
                validateElement($(this).val(), rule);
            });
        });

        //validate all element when submit the form
        validateForm.submit(function() {
            var configLength = settings.ruleList.length;
            var crossCount = 0;
            for (var i = 0; i < configLength; i++) {
                var rule = settings.ruleList[i];
                var value = $('#' + rule.elementId).val();
                if (validateElement(value, rule) == false) {
                    //break;
                } else {
                    crossCount += 1;
                }
            };
            if (crossCount == configLength) {
                if(settings.successCallback) {
                    return settings.successCallback(validateForm);
                } else {
                    return true;
                }
            } else {
                settings.errorCallback && settings.errorCallback(validateForm);
                return false;
            }
        });
        
    };
}(window.jQuery);
