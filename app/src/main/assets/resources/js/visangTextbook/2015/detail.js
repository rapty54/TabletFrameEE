$(function() {
	$('.visangtextbook ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

	$(window).scroll(
		function(){
			//스크롤의 위치가 상단에서 450보다 크면
			if($(window).scrollTop() > 1200){
				/* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */
				$('.quickMenu').addClass("fix");
				//위의 if문에 대한 조건 만족시 fix라는 class를 부여함
			}else{
				$('.quickMenu').removeClass("fix");
				//위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함
			}
		}
	);
});

// 교사인증 체크 후 다운로드
function authChkFileDown(url){
	if (SessionUtils.isLoginLayerPop()) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				// 다운로드 처리
				var win = window.open(url, '_blank');
				win.focus();
			}
		});
	}
}

function showLayerPop(targetId){
	$('#'+targetId).show();
}

function hideLayerPop(targetId){
	$('#'+targetId).hide();
}

function visangTextBookGa(category, action, label){
	gtag('event', action, {
		'event_category': category,
		'event_label': label,
		'value': 1
	});
}