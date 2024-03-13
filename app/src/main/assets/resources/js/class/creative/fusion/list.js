$(function() {

	var reset = false;

	var getList = function() {

		var $tabConts = null;
		$tabConts = $('#fusionContent');
		Ajax.execute({
			url: '/class/creative/fusion/fusionList',
			data: {
				page: $('input[name=page2]').val()
			},
			type: 'get',
			dataType: 'html',
			success: function(html) {
				console.log("html : ", html);
				$tabConts.empty();
				$tabConts.append($(html));
				reset = false;
			}
		});
	};

	getList();

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#fusionContent')
	});
	$('.btn_popup').on('click', function () {
		alert("준비중입니다.");
	});

	$('#fusionContent').on('click', '.detailPage', function() {
		var page  = $('#fusionContent').find('input[name=number]').val();
		if (SessionUtils.isLogin(location.href)) {
			location.href = "/class/creative/fusion/detail?teacherId=" + $(this).data('seq')+"&page="+page;
		}
	});

	// 선생님 소개 클릭 이벤트
	$('#btn-teacher-about-layer').bind('click', function() {
		Layer.openLayer({
			url: '/class/creative/fusion/teacher/about.popup',
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

function downloadPopup(contentId) {
	console.log("$target : ", contentId);
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId);

}
