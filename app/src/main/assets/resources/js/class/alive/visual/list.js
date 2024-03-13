$(function () {

	// 연구진 소개
	$('#btn-researchers-layer-open').bind('click', function() {
		// 팝업창 호출
		Layer.openLayer({
			url: '/class/alive/visual/staffIntroE.popup',
			callback: function() {
			}
		});
	});


});

function downloadPopup(contentId){

	if (!window.globals.login) {
		alert("자료 다운로드는 개인정보 입력 후 가능합니다.\n자료는 ‘학교 및 교육기관의 수업’ 목적을 위해서만\n한정하여 사용되도록 저작권법의 보호를 받고 있습니다.");
		if (StringUtils.isNotEmpty("/class/alive/visual/list")) {
			location.href = '/member/login?goURL=' + "/class/alive/visual/list";
		} else {
			location.href = '/member/login';
		}
		return false;
	} else {
		// 새창으로 다운로드 호출
		Popup.openFileDownloadDext(contentId);
	}




}
