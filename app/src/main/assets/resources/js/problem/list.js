$(function() {
	// 초기 학년별 과목노출 처리
	$('#tab-menu li').each(function() {
		if($(this).hasClass('on')){
			var codelistId = $(this).children('a').data().codelistId;
			if(codelistId == '107001' || codelistId == '107002'){
				$('#subject-tab-list li:eq(3)').hide();
				$('#subject-tab-list li:eq(4)').hide();
			}else{
				$('#subject-tab-list li:eq(3)').show();
				$('#subject-tab-list li:eq(4)').show();
			}
		}
	});
	
	// 학년 클릭 이벤트
	$('#tab-menu li a').bind('click', function() {
		var data = $(this).data();
		// 현재메뉴 활성화
		$('#tab-menu li').removeClass('on');
		$(this).closest('li').addClass('on');
		// 과목 전체로 선택
		$('#subject-tab-list li').removeClass('on');
		$('#subject-tab-list li:eq(0)').addClass('on');

		// 1학년, 2학년일 경우 사회, 과확 미노출
		if(data.codelistId == '107001' || data.codelistId == '107002'){
			$('#subject-tab-list li:eq(3)').hide();
			$('#subject-tab-list li:eq(4)').hide();
		}else{
			$('#subject-tab-list li:eq(3)').show();
			$('#subject-tab-list li:eq(4)').show();
		}

		// 컨텐츠 보여주기
		$('#problem-list li').hide();
		$('#problem-list li[data-codelist-id="' + data.codelistId + '"]').show();
	});

	// 과목 클릭 이벤트
	$('#subject-tab-list li a').bind('click', function() {
		var data = $(this).data();
		// 현재메뉴 활성화
		$('#subject-tab-list li').removeClass('on');
		$(this).closest('li').addClass('on');
		// 컨텐츠 보여주기
		if (data.groupSub == 'all') {
			$('#problem-list li').hide();
			$('#problem-list li[data-codelist-id="' + $('#tab-menu li.on a').data().codelistId + '"]').show();	
		} else {
			$('#problem-list li').hide();
			$('#problem-list li[data-codelist-id="' + $('#tab-menu li.on a').data().codelistId + '"][data-group-sub="' + data.groupSub + '"]').show();
		}
	});			
	// 책 클릭 이벤트
	$('#problem-list li a').bind('click', function() {
		// 로그인 인증 추가
		if (!SessionUtils.isLogin(location.href)) {
			return false;
		}

		var $li = $(this).closest('li');
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				var data = $li.data();
				gtag('event', 'Step1 문제은행 교과서 선택', {
					'event_category': '초등 문제은행',
					'event_label': '초등_' + data.course2Year + '_' + data.course2Name,
					'value': 1
				});
				var url = '/problem/wizard?course2Code=' + data.course2Code + '&course=' + data.course + '&course2=' + data.course2 + '&course2Year=' + data.course2Year + '&textbookCd=' + data.textbookCd + '&term=' + data.term;
				location.href = url;						
			}
		});
	});
	// 저작권법 위배 사례 버튼 클릭 이벤트
	$('#btn-licence').bind('click', function() {
		Layer.openLayer({
			url: '/problem/license.popup',
			callback: function() {
			}
		});
	});
});