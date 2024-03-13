$(function() {
	
	var $searchForm = $('#my-classroom-problem-scrap-search-form');
	var $form = $('#my-classroom-problem-scrap-form');
	// 교과서 선택 이벤트
	$searchForm.on('change', 'select[name=curriculumName]', function() {
		$searchForm.submit();
	});
	// 분류 선택 이벤트
	$searchForm.on('change', 'select[name=gubun]', function() {
		$searchForm.submit();
	});
	// 분류관리 클릭
	$searchForm.on('click', '.btn-gubun-form', function() {
		var data = $(this).data();
		Layer.openLayer({
			url: '/my/classroom/problem/scrap/gubun/form',
			callback: function($div) {
				var $scrollbar = $div.find('.mCustomScrollbar');
				$scrollbar.mCustomScrollbar();				
				// 수정
				$div.on('click', '.btn-modify', function() {
					$div.find('li.newList').hide();
					var $next = $(this).closest('li').next();
					$next.find('input[name=changeGubun]').val($(this).data().gubun);
					$next.show();
				});
				// 수정
				$div.on('click', '.btn-delete', function() {
					if (!confirm('분류명을 삭제하시겠습니까? 삭제 시 분류 내에 속해 있던 문항은 삭제되지 않습니다.')) {
						return false;
					}
					Ajax.execute({
						url: '/my/classroom/problem/scrap/gubun/update.json',
						type: 'post',
						data: JSON.stringify({
							gubun: $(this).data().gubun,
							action: 'DELETE'
						}),
						contentType: 'application/json',
						dataType: 'json',
						success: function(data) {
							location.href = '/my/classroom/problem/scrap';
						}
					});
					return false;
				});								
				// 저장
				$div.on('click', '.btn-save', function() {
					Ajax.execute({
						url: '/my/classroom/problem/scrap/gubun/update.json',
						type: 'post',
						data: JSON.stringify({
							gubun: $(this).data().gubun,
							changeGubun: $(this).closest('li').find('input[name=changeGubun]').val(),
							action: 'CHANGE'
						}),
						contentType: 'application/json',
						dataType: 'json',
						success: function(data) {
							// 검색조건 초기화
							location.href = '/my/classroom/problem/scrap';
						}
					});
					return false;
				});
				// 취소
				$div.on('click', '.btn-cancel', function() {
					$(this).closest('li').hide();
				});
			}
		});
	});
	// 리스트 클릭 이벤트
	$form.find('.data-item-list').on('click', '.data-question', function() {
		var $next = $(this).closest('tr').next();
		if ($next.css('display') == 'none') {
			var load = $next.data().load;
			// 최초 한번만 가져오게
			if (!load) {
				Ajax.execute({
					url: '/problem/item/' + $(this).data().itemId + '.json',
					data: {
					},
					type: 'get',
					dataType: 'json',
					success: function(data) {
						var item = data.response;
						if (item == null) {
							alert('아이템 정보가 없습니다.');
							return false;
						}
						if (StringUtils.isEmpty(item.CORRECT_ANSWER_IMAGE)) {
							$next.find('.data-correct-answer-image').remove();
						} else {
							$next.find('.data-correct-answer-image').attr('src', item.CORRECT_ANSWER_IMAGE);
						}
						if (StringUtils.isEmpty(item.EXPLANATION_IMAGE)) {
							$next.find('.data-explanation-image').remove();
						} else {
							$next.find('.data-explanation-image').attr('src', item.EXPLANATION_IMAGE);
						}
						$next.data('load', true);
						$next.slideDown();
						$next.find('.detail_wrap').slideDown(200);
					}
				});
			} else {
				$next.slideDown();
				$next.find('.detail_wrap').slideDown(200);
			}
		} else {
			$next.slideUp();
			$next.find('.detail_wrap').slideUp(200);
		}
	});
	$('.question_detail .cloz').click(function(){
		$(this).parents('.detail_wrap').stop().slideUp(200);
		$(this).parents('.question_detail').stop().slideUp(200);
	});
	// 시다운로드
	$form.on('click', '.btn-download', function() {
		var itemIds = [];		
		$($form.find('.ui-checkbox-all-check:checked').get().reverse()).each(function() {
			itemIds.push($(this).data().itemId);
		});
		if (itemIds.length == 0) {
			alert('문항을 선택해주세요.');
			return false;
		}
		var data = {
			itemIds: itemIds
		};
		var param = $.param(data, true);
		// 다운로드 레이어 띄워줌.
		$('#layer-progress-download').show();
		$.fileDownload('/my/classroom/problem/scrap/vivatem?' + param, {
			successCallback: function (url) {
				$('#layer-progress-download').hide();
			},
			failCallback: function (responseHtml, url) {
				$('#layer-progress-download').hide();
			},
			abortCallback: function (url) {
				$('#layer-progress-download').hide();
			},
		});
		// 응답이 제대로 안와서 시간지연으로 다운로딩 팝업 닫기 처리
		setTimeout(function() {
			$('#layer-progress-download').hide();
		}, 3000);
		
		return false; 
	});


	// 듣기다운로드
	$form.on('click', '.btn-download', function() {

		var multiArr = [];

		$($form.find('.ui-checkbox-all-check:checked').get().reverse()).each(function() {
			var data = $(this).data();
			// if(data.multimediaUse=='Y') {
			// 	multiArr.push(data));
			// }

			multiArr.push(data);
		});

		if (multiArr.length == 0) {
			return false;
		}

		var itemIds = "S";
		var subjects = "S";
		for(var i=0; i<multiArr.length; i++) {
			itemIds += "|" + multiArr[i].itemId;
			subjects += "|" + multiArr[i].subject;
		}

		itemIds = itemIds.replace("S|", "");
		subjects = subjects.replace("S|", "");

		Ajax.execute({
			url: '/my/classroom/problem/listen',
			type: 'post',
			data: {
				itemIds : itemIds,
				subjects : subjects
			},
			dataType: 'text',
			success: function(data) {
				var ufile="";
				var nfile="";
				var filesList = data.split("!!!!");

				for(var i=0; i<filesList.length; i++) {
					if(i==0){
						ufile = filesList[i];
					}else if(i==1) {
						nfile = filesList[i];
					}
				}
				//중고등pc의 듣기 다운로드 페이지로 redirect
				Popup.openFileDownloadListen(ufile, nfile);
			}
		});


	});
	
	// 선택한 시험지 변경
	$form.on('click', '.btn-update-gubun', function() {
		var qbsIds = [];		
		$form.find('.ui-checkbox-all-check:checked').each(function() {
			qbsIds.push($(this).val());
		});
		if (qbsIds.length == 0) {
			alert('문항을 선택해주세요.');
			return false;
		}
		Ajax.execute({
			url: '/my/classroom/problem/scrap/gubun/update.json',
			type: 'post',
			data: JSON.stringify({
				gubun: $form.find('select[name=gubun]').val(),
				qbsIds: qbsIds,
				action: 'QBSID'
			}),
			contentType: 'application/json',
			dataType: 'json',
			success: function() {
				location.href = '/my/classroom/problem/scrap';
			}
		});
	});
	// 선택한 시험지 삭제
	$form.on('click', '.btn-delete', function() {
		var qbsIds = [];		
		$form.find('.ui-checkbox-all-check:checked').each(function() {
			qbsIds.push($(this).val());
		});
		if (qbsIds.length == 0) {
			alert('문항을 선택해주세요.');
			return false;
		}
		Ajax.execute({
			url: '/my/classroom/problem/scrap/gubun/update.json',
			type: 'post',
			data: JSON.stringify({
				qbsIds: qbsIds,
				action: 'DELETE_QBSIDS'
			}),
			contentType: 'application/json',
			dataType: 'json',
			success: function() {
				location.href = '/my/classroom/problem/scrap';
			}
		});
	});	
	
	// 공통 체크박스 컨트롤 함수 사용
	LayoutHandler.checkbox();	
		
});