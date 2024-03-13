$(function () {


	// 연구진 소개
	$('#btn-researchers-layer-open').bind('click', function() {
		// 팝업창 호출
		Layer.openLayer({
			url: '/class/alive/appraisal/researchers.popup',
			callback: function() {
			}
		});
	});


	// 연구 개요 안내
	$('#btn-researchInfo-layer-open').bind('click', function() {
		// 팝업창 호출
		Layer.openLayer({
			url: '/class/alive/appraisal/researchInfo.popup',
			callback: function() {
			}
		});
	});


});

function downloadPopup(contentId){
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId);

}

function popOpen(url){
	/*
	요청사항 [RMS-8247] :[개발]수업연구소 이북 클릭시 교사인증 체크 요청
	교사인증 체크로직 추가
	2021-08-17 김인수
	 */
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