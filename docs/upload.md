Jquery Upload Plugin
==================

### Summary

this is a upload file plugin which is written by javascript and has nothing with flash.


### Requirement

jQuery


### Usage


1. Put the code bellow into your document's head tag (`<head>...</head>`)  :


        <script type="text/javascript" src="path/to/jquery.upload.js"></script>

2. Create a div to container your upload plugin

        <div id="upImage1"></div>

3. Call the function to activate as follows:

        <script type="text/javascript">
            $(function(){
                $("#upImage1").upload({
                    width : 15, 
                    height : 15, 
                    name : 'upfile1',
                    uploadUrl : 'upload.php',
                    type : 'image/gif,image/jpeg,image/png,image/jpg,image/bmp',
                    btnBackgroundImage : 'images/grape-editor-image.png', 
                    btnStyleClass : '', 
                    target: 'grape-upload-target-upImage1' ,
                    startCallback : function(){
                        console.log("start upload");
                    },
                    successCallback : function(){
                        console.log("upload success");
                    },
                    errorCallback : function(){
                        console.log("upload error");
                    }
                });
            });
        </script>



### Parameters List


| Parameter | Explanation | 
|:-----:|:--------|
| width | |
| height | |
| name | |
| uploadUrl | |
| type | |
| btnBackgroundImage | |
| btnStyleClass | |
| startCallback | |
| successCallback | |
| errorCallback | |