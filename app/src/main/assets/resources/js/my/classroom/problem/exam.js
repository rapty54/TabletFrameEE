$(function() {

	var $searchForm = $('#my-classroom-problem-exam-search-form');
	var $form = $('#my-classroom-problem-exam-form');
	// 교과서 선택 이벤트
	$searchForm.on('change', 'select[name=subjectname]', function() {
		$searchForm.submit();
	});
	// 분류 선택 이벤트
	$searchForm.on('change', 'select[name=type]', function() {
		$searchForm.submit();
	});
	// 분류관리 클릭
	$searchForm.on('click', '.btn-type-form', function() {
		openExamTypeLayer();
	});
	// 출제정보표 클릭
	$form.on('click', '.btn-sortable-popup', function() {
		Popup.openWindow({
			url: '/problem/sortable/main.popup?qbId=' + $(this).data().qbId,
			width: 1235,
			height: 900,
			name: 'problemSortablePopup',
		});
	});


	// 출제정보표 클릭
	$form.on('click', '.wizard_autoUPdate', function () {
		location.href = "//" + globals.config.siteDomainMiddleHigh + '/qbankv2/wizard_autoUPdate.do?QB_ID=' + $(this).data().qbId;
	});


	// 시험지 저장 후 다운로드
	$form.on('click', '.btn-vivatem-download', function() {
		// 통계 로그
		gtag('event', '다운로드', {
			'event_category' : '문제은행',
			'event_label' : '출제 마법사-내신'
		});
		// 다운로드 레이어 띄워줌.
		$('#layer-progress-download').show();
		var data = $(this).data();
		$.fileDownload('/problem/download/vivatem?qbId=' + data.qbId + '&template=' + data.template, {
			successCallback: function (url) {
				$('#layer-progress-download').hide();
			},
			failCallback: function (responseHtml, url, error) {
				$('#layer-progress-download').hide();
			},
			abortCallback: function (url) {
				$('#layer-progress-download').hide();
			},
		});
		return false;
	});

	// 듣기파일 다운로드
	$form.on('click', '.btn-vivatem-download', function() {

		var data2 = $(this).data();

		if(data2.isMulti == '1'){
			Ajax.execute({
				url: '/problem/download/listen',
				type: 'post',
				data: {
					qbId : data2.qbId,
					subject : data2.subject
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
		}
		return false;
	});



	// 선택한 시험지 변경
	$form.on('click', '.btn-update-type', function() {
		var qbIds = [];
		$form.find('.ui-checkbox-all-check:checked').each(function() {
			qbIds.push($(this).val());
		});
		Ajax.execute({
			url: '/my/classroom/problem/exam/type/update.json',
			type: 'post',
			data: JSON.stringify({
				type: $form.find('select[name=type]').val(),
				qbIds: qbIds,
				action: 'QBID'
			}),
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				location.href = '/my/classroom/problem/exam';
			}
		});
	});
	// 선택한 시험지 삭제
	$form.on('click', '.btn-delete', function() {
		var qbIds = [];
		$form.find('.ui-checkbox-all-check:checked').each(function() {
			qbIds.push($(this).val());
		});
		Ajax.execute({
			url: '/my/classroom/problem/exam/delete.json',
			type: 'post',
			data: JSON.stringify({
				qbIds: qbIds
			}),
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				location.href = '/my/classroom/problem/exam';
			}
		});
	});

	// 공통 체크박스 컨트롤 함수 사용
	LayoutHandler.checkbox();

});

function openExamTypeLayer() {
	Layer.openLayer({
		url: '/my/classroom/problem/exam/type/form',
		callback: function($div) {
			var $scrollbar = $div.find('.mCustomScrollbar');
			$scrollbar.mCustomScrollbar();
			// 추가
			$div.find('.btn-folder-add').bind('click', function() {
				$div.find('.newList').show();
				$div.find('input[name=orgType]').val('');
				$div.find('input[name=changeType]').val('');
				$div.find('input[name=changeType]').focus();
			});
			// 수정
			$div.on('click', '.btn-modify', function() {
				$div.find('.newList').show();
				$div.find('input[name=orgType]').val($(this).data().type);
				$div.find('input[name=changeType]').val($(this).data().type);
				$div.find('input[name=changeType]').focus();
			});
			// 삭제
			$div.on('click', '.btn-delete', function() {
				if (!confirm('분류명을 삭제하시겠습니까? 삭제 시 분류 내에 속해 있던 문항은 삭제되지 않습니다.')) {
					return false;
				}
				Ajax.execute({
					url: '/my/classroom/problem/exam/type/update.json',
					type: 'post',
					data: JSON.stringify({
						type: $(this).data().type,
						action: 'DELETE'
					}),
					contentType: 'application/json',
					dataType: 'json',
					success: function(data) {
						openExamTypeLayer();
					}
				});
				return false;
			});
			// 저장
			$div.on('click', '.btn-save', function() {
				var orgType = $(this).closest('li').find('input[name=orgType]').val();
				var changeType = $(this).closest('li').find('input[name=changeType]').val();
				var action = orgType == '' ? 'INSERT' : 'CHANGE';
				Ajax.execute({
					url: '/my/classroom/problem/exam/type/update.json',
					type: 'post',
					data: JSON.stringify({
						type: orgType,
						changeType: changeType,
						action: action
					}),
					contentType: 'application/json',
					dataType: 'json',
					success: function(data) {
						openExamTypeLayer();
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
}