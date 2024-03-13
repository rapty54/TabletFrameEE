//나의교실 메인, 담은 자료 페이지에서 사용
//뷰어
function popPeriodViewer(contentId, contentGubun, tocNo, _lnbCode) {
	var availWidth = window.screen.availWidth;
    var availHeight = window.screen.availHeight;
    var browserLeftPos = window.screenLeft || window.screenX;
    var availLeft = window.screen.availLeft != undefined ? window.screen.availLeft : browserLeftPos > availWidth ? availWidth : 0;
    var availTop = window.screen.availTop != undefined ? window.screen.availTop : 0;
    
	if(tocNo == ''){ //개별뷰어
		var url = 'http://www.vivasam.com/period/popContentsViewer.do?contentGubun='+contentGubun+'&contentId='+contentId+'&lnbCode='+_lnbCode;
   		var options = 'top='+availTop+',left='+availLeft+',width='+availWidth+',height='+availHeight+',screenX='+availLeft+',screenY='+availTop+',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';
   		
   		var popViewer = window.open(url, "popViewer", options);
    		
		if (window.focus) {
			popViewer.focus();
		}
	}else{ //통합뷰어
        var data = setTocData();
		if(data == _tocData){
    		var url = 'http://www.vivasam.com/period/popPeriodViewer.do?periodId='+_periodId+'&tocNo='+tocNo+'&contentGubun='+contentGubun+'&contentId='+contentId+'&lnbCode='+_lnbCode;
    		var options = 'top='+availTop+',left='+availLeft+',width='+availWidth+',height='+availHeight+',screenX='+availLeft+',screenY='+availTop+',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';
    		
    		//$('.bgMask').show();
			var popPeriodViewer = window.open(url, "popPeriodViewer", options);
    		if (window.focus) {
    			popPeriodViewer.focus();
    		}
		}else{
			if(confirm("먼저 편집중인 차시꾸러미를 저장해주세요.\n저장하시겠습니까?")){
				var map = { periodId : _periodId, memberId : LOGIN_ID, tocListStr : data };
				$("#pkg").load("${webRoot}/period/updatePeriodMemberToc.do", map, function(){
					_tocData = data;
					alert("저장되었습니다.");
				});
			}
		}
	}
}