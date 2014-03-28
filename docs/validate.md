Jquery Form Validate
==================

### Summary

this is a form validate plugin .


### Requirement

jQuery


### Usage


    <script type="text/javascript">
        $(function(){
            $("#myform").validate({
                ruleList : [{
                    elementId : 'username',
                    defaultTips : 'please input username',
                    successTips : 'input ok',
                    allowEmpty : false,
                    emptyTips : 'please input username',
                    minLength : 4,
                    maxLength : 20,
                    lengthTips : 'length must between {%min} and {%max}',
                    type : 'alphanum',
                    typeTips : 'error format'
                }],
                successCallback : function(form){
                    return true;
                },
                errorCallback : function(form){}
            });
        });
    </script>



### Parameters List


...
