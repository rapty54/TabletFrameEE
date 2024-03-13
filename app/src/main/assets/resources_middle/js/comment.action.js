/*의견 댓글 관련 js*/

function cmtViewData(callbackId, cmtSetupId, cmtKeyId, cmtKeyScndId, pageNo) {
	var templateOption = {
        dataUrl : CONTEXTPATH + "/common/commentList.do",
        returnType : 'html',
        callbackId : callbackId,  //어떤 vsTemplate인지 구분하기 위한 유일값을 넣어 주시면됩니다.
        dataCondition : {
        	cmtSetupId : cmtSetupId,
        	cmtKeyId : cmtKeyId,
        	cmtKeyScndId : cmtKeyScndId,
            pageNo : pageNo
        }
	};
	
	$('#' + callbackId).vsTemplate(templateOption);
}

function cmtViewDataNew(callbackId, cmtSetupId, cmtKeyId, cmtKeyScndId, pageNo) {
	var templateOption = {
        dataUrl : CONTEXTPATH + "/common/commentNewList.do",
        returnType : 'html',
        callbackId : callbackId,  //어떤 vsTemplate인지 구분하기 위한 유일값을 넣어 주시면됩니다.
        dataCondition : {
        	cmtSetupId : cmtSetupId,
        	cmtKeyId : cmtKeyId,
        	cmtKeyScndId : cmtKeyScndId,
            pageNo : pageNo
        }
	};
	
	$('#' + callbackId).vsTemplate(templateOption);
}

// templateOption에서 지정해주신 callbackId값이 그대로 넘어오게 됩니다.
function _templateDataSuccessCallback(callbackId, resultData) {
	//alert(callbackId + " | " + resultData);
	if (resultData == "") {
		$('#' + callbackId).html('');
	}
	else {
		$('#' + callbackId).html(resultData);
	}
	
	//pageCenter();
	
	//창체 공통뷰에서는 실행 안되게... 통페이지로 전부 변경되면 삭제, 심원보
	if (location.pathname.indexOf("creativeView.do") == -1) {
		$("iframe", parent.document).attr("height",$("#content").height());	
	}
}

function _templateDataErrorCallback(callbackId, resultData) {
	//alert("ajax 오류 | " + callbackId + " | " + resultData);
}