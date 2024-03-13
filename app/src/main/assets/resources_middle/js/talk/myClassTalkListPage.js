	function pagingView(pageNo, targetId, pageSize, totCount, pageTotal, callbackId){
		
		//	alert(pageNo+":"+pageSize+":"+totCount+":"+pageTotal);
		
		var templateOption = {
		        dataUrl : CONTEXTPATH + "/template/paging.do",
		        returnType : 'html',
		        callbackId : callbackId,	//	'#pageHtmlView',  //어떤 vsTemplate인지 구분하기 위한 유일값을 넣어 주시면됩니다.
		        dataCondition : {
		        	pageNo : pageNo,
		        	targetId : targetId,
		        	pageSize : pageSize,
		        	totCount : totCount,
		        	pageTotal : pageTotal
		        }
			};
			$('#pageHtmlView').vsTemplate(templateOption);
	}
	
	// templateOption에서 지정해주신 callbackId값이 그대로 넘어오게 됩니다.
    function _templateDataSuccessCallback(callbackId, resultData) {
		
    	$(callbackId).empty();
    	$(callbackId).append(resultData);
    	pageCenter();
    	$("iframe", parent.document).attr("height",$("#content").height());
    }
	
    function _templateDataErrorCallback(callbackId, resultData) {
    	//	alert("ajax 오류 | " + callbackId + " | " + resultData);
    }
    
    function go_page( goPageNo ) {
    	
    	pageNo = goPageNo;
    	
		if ( showGubun == "CT" ) {
			comViewTalkList();
		} else {
			myClassTalkList();
		}
    }
    