$(function () {
	getList();
	
	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
	   $target: $('#list')
	});
	
	$('#list').on('click','.detailPage',function(){
		var page  = $('#list').find('input[name=number]').val();
	   if (SessionUtils.isLogin()) {
	      location.href = "/creative/edu/economy/detail?boardId=" + $(this).data('seq')+"&page="+page;
	   }
	});
	
	// 선생님 소개 클릭 이벤트
	$('#btn-teacher-about-layer').bind('click', function() {
		Layer.openLayer({
			url: '/creative/edu/economy/teacher/about.popup',
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


function clickTypeTab(value) {
	/*
	*
	 */
	// if (value == 'CR306') {
	// 	alert("준비 중입니다.");
	// 	return false;
	// } else {
	// 	$('input[name=category11Cd]').val(value);
	// 	getList();
	// }

	$('input[name=category11Cd]').val(value);
	getList();

}

function getList() {

	var $tabConts = null;
	$tabConts = $('#list');
	Ajax.execute({
		url: '/creative/edu/economy/economyList',
		data: {
			boardManageId : boardManageId,
			category11Cd : $('input[name=category11Cd]').val() ==  null ? '' : $('input[name=category11Cd]').val(),
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
};

function openTearchPop() {
	alert("준비중입니다.");
}
