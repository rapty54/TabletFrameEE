$(function () {
	getList();

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#create')
	});

	$('#create').on('click','.detailPage',function(){
		var page  = $('#create').find('input[name=number]').val();
		if (SessionUtils.isLogin(location.href)) {
			location.href = "/class/creative/game/detail?boardId=" + $(this).data('seq')+"&page="+page;
		}
	});

});


function getList() {

	var $tabConts = null;
	$tabConts = $('#create');
	Ajax.execute({
		url: '/class/creative/game/gameList',
		data: {
			boardManageId : boardManageId,
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
	// 선생님 소개 클릭 이벤트
	$('#btn-teacher-about-layer').bind('click', function() {
		Layer.openLayer({
			url: '/class/creative/game/teacher/about.popup',
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
};




