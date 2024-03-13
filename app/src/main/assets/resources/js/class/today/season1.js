function downloadPopup(contentId){
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId);
}

function popOpen(url){
	// 새창으로 팝업
	if (SessionUtils.isLogin(location.href)) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				var win = window.open(url, '_blank');
				win.focus();			
			}
		});
	}
}

function popOpen2(url){
	// 새창으로 팝업
	if (SessionUtils.isLogin(location.href)) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				// alert('다운로드하시는 자료는 \'학교 및 교육기관의 수업\' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.\n수업 외의 목적으로 사용되지 않도록 주의 부탁드립니다.');
				var win = window.open(url, '_blank');
				win.focus();
			}
		});
	}
}

function evtPopOpen(popNum) {
	$('body').css('overflow-x', 'hidden');
	$('#evtPopWrap').css('display', 'block').find('.evtPopCont[data-popNum=' + popNum + ']').css('display', 'block');
	$('#evtPopWrap > .dimmed').show();
}

// EVENT POPUP CLOSE
function evtPopClose(closeTarget) {
	$('body').css('overflow-x', 'auto');
	$(closeTarget).parents('#evtPopWrap, .evtPopCont').css('display', 'none');
	$('#evtPopWrap > .dimmed').hide();
}

function copyToClipboard(txt,alertTxt) {
	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = txt;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
	alert(alertTxt);
	copyYn = "";
	return;
}
