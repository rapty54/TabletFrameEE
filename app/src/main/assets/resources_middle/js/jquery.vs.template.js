(function($) {
    // vsTemplate plug-in 구현
	$.vsTemplate = function(el, options) {
		var base = this;
		base.$el = $(el);
		base.el = el;
		base.$el.data("vsTemplate", base);

		//member function
		base.init = function() {
            options.containerId = base.$el.attr('id');
            base.options = $.extend({},$.vsTemplate.defaultOptions, options);
		};

		//member function
        base.fetch = function() {
        	$.ajax({
        		type: "GET",
        		url: base.options.dataUrl,
        		cache: false,
        		async: true,
        		dataType: "html",
        		data: base.options.dataCondition,
        		success: function(resultData){
        			if (base.options.returnType == 'innerHTML') {
            			putHtmlToContainer(base.$el, $.trim(resultData));
        			} else if (base.options.returnType == 'customFunction') {
        				window[base.options.callbackId](true,$.trim(resultData));
        			} else if (base.options.returnType == 'append') {
        				_templateDataSuccessCallbackForMore(base.options.callbackId, $.trim(resultData), base);
        			} else {
        				_templateDataSuccessCallback(base.options.callbackId, $.trim(resultData), base);
        			}
        		},
                error: function (xhr, ajaxOptions, thrownError){
        			if (base.options.returnType == 'innerHTML') {
        			} else if (base.options.returnType == 'customFunction') {
        				window[base.options.callbackId](false,'');
        			} else {
        				_templateDataErrorCallback(base.options.callbackId);
        			}
//                    alert(xhr + '\n' + ajaxOptions + '\n' + thrownError);
                },
                complete:function (xhr, textStatus){
//                    alert(xhr + '\n' + textStatus);
                    // 포커스
                	if(base.options.forcus){
	                	if((base.options.callbackId).indexOf('type_') > -1){
	                		var offsetstr = $('#'+base.options.callbackId).offset();
	                		$('html, body').animate({scrollTop : offsetstr.top-130}, 1);
	                	}else{
	                		var offsetstr = $('#'+base.options.callbackId).offset();
	                		$('html, body').animate({scrollTop : offsetstr.top-10}, 1);
	                	}
                	}
                }
        	});
        };

        // vsTemplate 함수가 처음 실행될때 처리될 내용

        // 초기화 및 생성
        base.init();

        base.fetch();

        //추가 처리
        /*
        base.$el.find('.tsNav a').live('click', function() {
            if (base.options.isInputText) {
            	$("#" + base.options.inputTextId).val($(this).parent().attr('id'));
            } else {
                var itemName = getItemFullName($(this));
                base.addSelectedItem($(this).parent().attr('id'), itemName, false);
            }
            return false;
        });
        */

	};

    //private function
    function putHtmlToContainer(containerObj, data) {
    	containerObj.html(data);
    };

    //기본 설정 정보
    $.vsTemplate.defaultOptions = {
    		dataUrl : null,	// [필수] data 처리 URL,
    		dataCondition : { // 조회 조건에 필요한 값을 Javascript Literal Object로 지정한다.
    			templateType : null	//[필수] template 종류
    		},
    		returnType : 'innerHTML',
    		containerId : null	// [자동설정] html을 담을 container element의 ID
    };

    //vsTemplate plug-in 생성
    $.fn.vsTemplate = function(options){
        return this.each(function(){
            (new $.vsTemplate(this, options));
        });
    };

    // This function breaks the chain, but returns
    // the testClass if it has been attached to the object.
    $.fn.gettestClass = function(){
        this.data("vsTemplate");
    };
})(jQuery);