$(document).ready(function () {
	// 선생님 소개 클릭 이벤트
	$('#btn-teacher-about-layer').bind('click', function() {
		Layer.openLayer({
			url: '/creative/exp/trip/teacher/about.popup',
			callback: function(_$div) {
				var $samPop = $('body .sam_pop');
				var $wrap = $samPop.find('.sam_info_wrap');
				if ($samPop.outerHeight() < 800) {
					$wrap.css('padding', '40px');
				} else {
					$wrap.css('padding', '40px 22px 40px 40px');
				}
			}
		});
	});
});

function downloadFile(contentId) {
	Popup.openFileDownloadDext(contentId);
}