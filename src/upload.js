/**
 * @file upload.js
 * @desc Jquery File Upload Plugin
 * @licensed http://www.apache.org/licenses/LICENSE-2.0
 * @auth Tabalt <tabalt@actphp.com>
 * @version 1.1 
 * @update 2014.03.26
 * @import utils.js
 */

!function($){

    var defaults = {
        width : 100, 
        height : 30, 
        name : 'upfile',
        uploadUrl : '',//上传地址
        type : 'image/gif,image/jpeg,image/png,image/jpg,image/bmp',//选择的类型
        btnBackgroundImage : 'upload_btn_img.png', //上传按钮背景图片
        btnStyleClass : '', //上传按钮样式
        target: 'grape-upload-target-' + Utils.Random.GetRandomId(),
        startCallback : null,
        successCallback : null,
        errorCallback : null
    };

    $.fn.upload = function(options){

        var settings = $.extend({}, defaults, options);
        var uploader = $(this);
        var uploadHtml = '<div class="grape-upload-box" style="width:' + settings.width + 'px;height:' + settings.height 
            + 'px;" ><form class="grape-upload-form" method="post" enctype="multipart/form-data" '
            + ' target="' + settings.target + '" action="' + settings.uploadUrl +'">' 
            + '<input contentEditable="false" style="display:none;" id="grape-upload-file" class="grape-upload-file" type="file" ' 
            + ' hidefocus="" title="" name="' + settings.name +'" accept="' + settings.type + '" />'
            + '<input class="grape-upload-button ' + settings.btnStyleClass +'" style="background:url('+ settings.btnBackgroundImage +') no-repeat; width:' + settings.width + 'px;height:' + settings.height 
            + 'px; /* filter: alpha(opacity=0);opacity:0;*/ border:none; cursor:pointer;" type="button" value="" />'
            + '</form></div>';

        var uploadHtmlForIe = '<div class="' + settings.btnStyleClass +'" style="background:url('+ settings.btnBackgroundImage +') no-repeat; width:' + settings.width 
            + 'px;height:' + settings.height  + 'px;" >'
            + '<form class="grape-upload-form" method="post" enctype="multipart/form-data" '
            + ' target="' + settings.target + '" action="' + settings.uploadUrl +'">' 
            + '<input contentEditable="false" style="filter: alpha(opacity=0);opacity:0; border:none;width:' + settings.width 
            + 'px;height:' + settings.height + 'px;" class="grape-upload-file" type="file" ' 
            + ' hidefocus="" title="" name="' + settings.name +'" accept="' + settings.type + '" /></form></div>';
        
        if( Utils.Broswer.IsFirefox || Utils.Broswer.IsWebkit || Utils.Broswer.IsOpera ) {
            $(uploadHtml).appendTo(uploader);
            uploader.find(".grape-upload-button").click(function(){
                uploader.find(".grape-upload-file").click();
            });
        } else {
            $(uploadHtmlForIe).appendTo(uploader);
        }

        uploader.find(".grape-upload-file").change(function(){
            if($(this).val()) {

                //上传开始 回调
                settings.startCallback && settings.startCallback();
            
                //生成一个隐藏iframe，并设置form的target为该iframe，模拟ajax效果
                var iframe = $('<iframe id="' + settings.target + '" name="' + settings.target + '" style="display: none"></iframe>');
                var form = $(this).parent()[0];
                iframe.appendTo($('body'));

                //设置 上传完毕iframe onload事件
                iframe.load(function(){
                    //获取上传结果
                    var response = this.contentWindow.document.body.innerHTML;
                    response = Utils.String.ReplaceAll(response, '&amp;', '&');
                    form.reset();
                    iframe.remove();
                    //清除引用
                    iframe = null; 

                    //解析上传结果
                    var responseData = {
                        status : 0,
                        info : '',
                        data : null
                    };
                    try{
                        responseData = $.parseJSON(response);
                    } catch (e){

                    }

                    //处理上传结果
                    if(responseData && responseData.status == 1) {
                        //上传成功  回调
                        settings.successCallback && settings.successCallback(responseData);
                    } else {
                        //上传失败  回调
                        settings.errorCallback && settings.errorCallback(responseData);
                    }
                });

                //提交表单上传文件
                form.submit();
            }
        });
    };
}(window.jQuery);