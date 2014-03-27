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
        uploadUrl : '',// upload url
        type : 'image/gif,image/jpeg,image/png,image/jpg,image/bmp',// file type
        btnBackgroundImage : 'upload_btn_img.png', //button background image 
        btnStyleClass : '', //button style class 
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

                //upload start callback
                settings.startCallback && settings.startCallback();
            
                //crete a hidden ifreme simulate ajax
                var iframe = $('<iframe id="' + settings.target + '" name="' + settings.target + '" style="display: none"></iframe>');
                var form = $(this).parent()[0];
                iframe.appendTo($('body'));

                //set iframe onload event to deal upload result
                iframe.load(function(){
                    //get upload result
                    var response = this.contentWindow.document.body.innerHTML;
                    response = Utils.String.ReplaceAll(response, '&amp;', '&');
                    form.reset();
                    iframe.remove();
                    //clear variable iframe's reference
                    iframe = null; 

                    //parse upload result to json object
                    var responseData = {
                        status : 0,
                        info : '',
                        data : null
                    };
                    try{
                        responseData = $.parseJSON(response);
                    } catch (e){

                    }

                    //deal upload result
                    if(responseData && responseData.status == 1) {
                        //upload success callback
                        settings.successCallback && settings.successCallback(responseData);
                    } else {
                        //upload error callback
                        settings.errorCallback && settings.errorCallback(responseData);
                    }
                });

                //submit form to upload file
                form.submit();
            }
        });
    };
}(window.jQuery);
