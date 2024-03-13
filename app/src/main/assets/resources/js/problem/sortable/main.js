var STORAGE_DISPLAY = 'STORAGE_DISPLAY';
var SEPARATOR = '|';
var $form = null;
var $chapterBody = null;
var isSave = false;
$(function () {
	$form = $('#form');
	$chapterBody = $('#chapter-body');
	// 다시 보지 않기
	$('input[name=display]').bind('click', function() {
		if ($(this).prop('checked')) {
			$('.popup_close').trigger('click');
			// $(this).prop('checked', false);
		}
	});
	// 다운로드 클릭
	$chapterBody.on('click', '.btn-sortable-download', function() {
		location.href = '/problem/download/excel?itemId=' + encodeURIComponent(getItemId()) + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2;
	});
	// 순서 저장
	$chapterBody.on('click', '.btn-sortable-save', function() {
		// 콜백
		if (qbankInfo == null) {
			opener.ProblemWizard.callbackSortable(getItemId());
			self.close();
		} else {
			Ajax.execute({
				url: '/problem/sortable/update.json',
				type: 'post',
				data: {
					qbId: qbankInfo.qbId,
					itemsId: getItemId()
				},
				dataType: 'json',
				success: function() {
					alert('현재 순서로 저장되었습니다.');
					self.close();
				}
			});
		}
	});
	// 컨텐츠 제거 클릭
	$chapterBody.on('click', '.onquiz li .btn-item-remove', function() {
		if ($('.onquiz li').length == 1) {
			alert('마지막 문제는 제거하실 수 없습니다.');
			return false;
		}
		if (!confirm('정말 제거 하시겠습니까?')) {
			return false;
		}
		$(this).closest('li').remove();
		render(getItemId());
	});
	// 컨텐츠 교체 클릭
	$chapterBody.on('click', '.btn-item-change', function() {
		var itemId = $(this).data().itemId;
		var excludeItemId = encodeURIComponent(getItemId());
		var parameter = $form.serialize();
		parameter += '&excludeItemId=' + excludeItemId + '&control=SINGLE';
		parameter += '&changeItemId=' + itemId;
		Popup.openWindow({
			url: '/problem/data/main.popup?' + parameter,
			popupSize: PopupSize.PROBLEM_DATA_MAIN,
			name: 'problemDataMainPopup',
		});
	});	
	// 컨텐츠 문의 클릭
	$chapterBody.on('click', '.btn-item-question', function() {
		var data = $(this).data();
		Popup.openWindow({
			url: '/problem/question/form.popup?chapter1=' + encodeURIComponent(parameter.chapter1) + '&chapter2=' + encodeURIComponent(parameter.chapter2) + '&itemId=' + data.itemId + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2,
			width: 1200,
			height: 900,
			name: 'problemErrorFormPopup',
		});
	});
	// 컨텐츠 스크랩 클릭
	$chapterBody.on('click', '.btn-item-scrap', function() {
		var data = $(this).data();
		Layer.openLayer({
			url: '/problem/scrap/main.popup?itemId=' + data.itemId + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2,
			callback: function($div) {
				var $scrapForm = $div.find('form');
				// 저장
				$scrapForm.bind('submit', function() {
					// 아이템 정보를 리턴
					Ajax.execute({
						url: '/problem/scrap/save.json',
						type: 'get',
						data: $scrapForm.serialize(),
						dataType: 'json',
						success: function() {
							alert('문항이 정상적으로 스크랩 되었습니다.');
							$div.remove();
						}
					});
					return false;
				});
				// 분류 선택
				$scrapForm.find('select[name=gubun]').bind('change', function() {
					if ($(this).val().length > 0) {
						$scrapForm.find('input[name=addGubun]').val('');
						$scrapForm.find('.tr-add-gubun').hide();
					}
				});
				// 분류 신규 입력
				$scrapForm.find('input[name=addGubun]').bind('input', function() {
					if ($(this).val().length > 0) {
						$scrapForm.find('select[name=gubun]').val('').prop('selected', true);
					}
				});
				// 분류 신규 추가
				$scrapForm.find('.btn-gubun-add').bind('click', function() {
					$scrapForm.find('.tr-add-gubun').show();
				});										
			}
		});
	});			
	// 닫기
	$chapterBody.on('click', '.btn-sortable-close', function() {
		// self.close();
		$('.layer_pop_wrap').hide();		
	});
	// 초기화면 렌더링
	render(null);
});

// 아이템 아이디 리턴
function getItemId() {
	var itemIds = [];
	$chapterBody.find('.onquiz li').each(function() {
		itemIds.push($(this).data().itemId);
	});
	return itemIds.join(SEPARATOR);
}

// 아이템 아이디 체크
function render(itemId) {
	if (itemId != null) {
		$form.find('input[name=itemId]').val(itemId);
	}
	// 서버에 출제정보 확인 요청
	Ajax.execute({
		url: '/problem/sortable/list.html',
		type: 'get',
		data: $form.serialize(),
		dataType: 'html',
		success: function(html) {
			$('#chapter-body').html(html);
			$('.ui-sortable').sortable({
				connectWith: '.ui-sortable',
				placeholder: 'quiz_sortable_place',
				handle: '.btn_drag_quiz',
				cancel: '',
				stop: function() {
					var count = 0;
					// 순서 재정렬
					$chapterBody.find('.onquiz li').each(function() {
						count++;
						$(this).find('em.num').text(count);
					});
				},
			});
			$('.btn_img_q_all').mouseover(function () {
				$(this).siblings('.pop_view_quiz').show();
			});
			$('.btn_img_q_all').mouseleave(function () {
				$(this).siblings('.pop_view_quiz').hide();
			});
			$('.btn_guide').click(function () {
				return false;
				$('.guide_layout').show();
				$('.dimmed').show();
			});
			$('.popup_close').click(function () {
				$('.guide_layout').hide();
				$('.dimmed').hide();
			});
			// 최초로딩시 가이드 보여주기
			if (itemId == null) {
				$('input[name=display]').bind('click', function() {
					StorageUtils.setValue(STORAGE_DISPLAY, $(this).prop('checked'));
				});
				var isDisplay = StorageUtils.getBoolean(STORAGE_DISPLAY);
				if (isDisplay) {
					// 가이드 보여주기
					$chapterBody.find('.btn-sortable-guide').trigger('click');
				} else {
					// 체크박스 선택 상태로
					$('input[name=display]').prop('checked', true);
				}
			}
		}
	});
}

/**
 * 아이템 교체 및 추가 팝업창에서의 콜백
 * @param _control 교체 / 여러개 추가
 * @param changeItemId 교체할 아이템 아이디
 * @param selectItemId 팝업에서 선택한 아이템 아이디
 */
function callbackData(_control, changeItemId, selectItemId) {
	// 다시 조회할 아이템 아이디는 순서를 보장하기 위해 조건 처리
	var itemId = '';
	var itemIds = [];
	$chapterBody.find('.onquiz li').each(function() {
		var data = $(this).data();
		// 교체할 대상인 경우는 새로 선택된 아이디로.
		if (data.itemId == changeItemId) {
			itemIds.push(selectItemId);
		} else {
			itemIds.push(data.itemId);
		}
	});
	itemId = itemIds.join(SEPARATOR);
	render(itemId);
}