var STORAGE_PROBLEM_EXCELDOWNLOAD_DISPLAY = 'STORAGE_PROBLEM_EXCELDOWNLOAD_DISPLAY';
var SEPARATOR = '|';
// 아이템 카운트 정보
var itemCount = {
	top: 0,
	middle: 0,
	bottom: 0,
	total: 0,
};
var vivatemItemIds = [];
var $form = null;
// 초기값 저장
var ALL_CHAPTER2_BY_CHAPTER1 = '';
$(function() {
	// 입력 폼
	$form = $('#wizard-form');
	// 학년 선택 이벤트
	$form.find('select[name=codelistId]').bind('change', function() {
		$.ajax({
			type: 'get',
			url: '/problem/code/detail/course2/list.json',
			data: {
				course2Year: $form.find('select[name=course2Year]').val(),
				codelistId: $(this).val()
			},
			success: function(data) {
				$form.find('select[name=course2]').empty();
				var items = data.response;
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var $option = $('<option value="' + item.course2 + '" data-course="' + item.course + '" data-course2="' + item.course2 + '" data-course2-code="' + item.course2Code + '" data-group-sub="' + item.groupSub + '" data-textbook-cd="'+ item.textbookCd +'" data-term="'+ item.term +'">' + item.course2Name + '</option>');
					// 현재 선택된 항목을 선택 처리
					if (item.course2 == parameter.course2) {
						$option.prop('selected', true);
					}
					$form.find('select[name=course2]').append($option);
				}
			},
		});
	});
	// 이전으로 클릭
	$form.on('click', '.btn-step-previous, .btn-step-previous2', function() {
		// 다시 출제하기는 페이지 새로고침
		if ($(this).hasClass('btn-step-previous2')) {
			location.reload();
		} else {
			$form.find('.data-step-check').empty();
			$form.find('.data-step-check').hide();
			$form.find('.data-step-save').empty();
			$form.find('.data-step-save').hide();
			$form.find('.data-step-wizard').show();
			// 중복 필드 다시 활성화
			$form.find('.data-wizard-field').prop('disabled', false);
			// 버튼 숨김
			$(this).hide();
			// 출제하기 탭 on 처리
			$form.find('.step_qbank li').removeClass('on');
			$form.find('.step_qbank li[data-step="wizard"]').addClass('on');
			$form.find('.step_qbank li[data-step="check"] p').text('출제정보 확인');
			// 아이템 갯수 다시 조회
			ProblemWizard.getUnitItemCount();
		}
	});
	// 바로가기 이벤트
	$form.find('.btn-refresh').bind('click', function() {
		var $option = $form.find('select[name=course2] option:selected');
		var data = $option.data();
		location.href = '/problem/wizard?course2Code=' + data.course2Code + '&course=' + data.course + '&course2=' + data.course2 + '&course2Year=' + $('select[name=course2Year]').val() + '&textbookCd=' + data.textbookCd + '&term=' + data.term;
	});
	// 출제 방식 선택 이벤트
	$form.find('input[name=method]').bind('click', function() {
		if ($(this).val() == 'auto') {
			$('#examDirect').hide();
			$('#examAuto').show();
		} else {
			$('#examDirect').show();
			$('#examAuto').hide();
		}
	});
	// 숫자만 입력가능하게 이벤트
	$form.find('input.input-only-number').bind('input', function() {
		// 총 문항수 입력시 초기화
		if ($(this).hasClass('input-total')) {
			$form.find('input.input-level').val('0');
			return false;
		}
		if ($(this).val().length > 0) {
			$(this).val(NumberUtils.removeText($(this).val()));
			var sum = 0;
			$form.find('input.input-level').each(function() {
				if ($(this).val().length > 0) {
					sum += parseInt($(this).val(), 0);
				}
			});
			var current = parseInt($(this).val(), 0);
			if (current > fixedItemCount || sum > fixedItemCount) {
				alert(fixedItemCount + ' 문항 이하로 입력해 주세요!');
				$(this).val('');
				return false;
			}
			var level = parseInt($(this).data().level);
			if (level == 1) {
				// 상
				if (current > itemCount.top) {
					alert('"상" 난이도 문항이 ' + itemCount.top + ' 문항 있습니다.');
					return false;
				}
			} else if (level == 2) {
				// 중
				if (current > itemCount.middle) {
					alert('"중" 난이도 문항이 ' + itemCount.middle + ' 문항 있습니다.');
					return false;
				}
			} else if (level == 3) {
				// 중
				if (current > itemCount.bottom) {
					alert('"하" 난이도 문항이 ' + itemCount.bottom + ' 문항 있습니다.');
					return false;
				}
			}
			// 총 문항수 변경
			$form.find('input.input-total').val(sum);
		}
	});

	var $btnAllCheck = $('#btn-all-check');
	// 출제범위 전체 선택
	$btnAllCheck.bind('click', function() {
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			// $(this).find('span').text('전체해제');
			$('#unit-inner input[name=unit1Codes]').prop('checked', false);
			$('#unit-inner input[name=unit2Codes]').prop('checked', false);
		} else {
			$(this).addClass('on');
			// $(this).find('span').text('전체선택');
			$('#unit-inner input[name=unit1Codes]').prop('checked', true);
			$('#unit-inner input[name=unit2Codes]').prop('checked', true);
		}
		ProblemWizard.getUnitItemCount();
	});
	// 좌측 메뉴 선택 이벤트
	$('#unit-inner span label a').bind('click', function() {
		if ($(this).parents('span').siblings('.btn_acc').hasClass('close')) {
			$(this).parents('span').siblings('.btn_acc').parents('dl').addClass('active');
			$(this).parents('span').siblings('.btn_acc').removeClass('close');
		} else {
			$(this).parents('span').siblings('.btn_acc').parents('dl').removeClass('active');
			$(this).parents('span').siblings('.btn_acc').addClass('close');
		}
	});
	// 좌측 1차 메뉴 체크박스 선택 이벤트
	$('#unit-inner input[name=unit1Codes]').bind('click', function() {
		var value = $(this).val();
		if ($(this).prop('checked')) {
			$('#unit-inner dd[data-unit1-code="' + value + '"] input[name=unit2Codes]').prop('checked', true);
		} else {
			$('#unit-inner dd[data-unit1-code="' + value + '"] input[name=unit2Codes]').prop('checked', false);
		}
		var unit2AllCheckedLength = $('#unit-inner input[name=unit2Codes]:checked').length;
		if (unit2AllCheckedLength != $('#unit-inner input[name=unit2Codes]').length) {
			$btnAllCheck.removeClass('on');
			// $btnAllCheck.find('span').text('전체해제');
		} else {
			$btnAllCheck.addClass('on');
			// $btnAllCheck.find('span').text('전체선택');
		}
		ProblemWizard.getUnitItemCount();
	});
	// 좌측 2차 메뉴 체크박스 선택 이벤트
	$('#unit-inner input[name=unit2Codes]').bind('click', function() {
		var unit1Code = $(this).closest('dd').data().unit1Code;
		var unit2CheckedLength = $(this).closest('dl').find('input[name=unit2Codes]:checked').length;
		if (unit2CheckedLength > 0) {
			$('#unit-inner dt[data-unit1-code="' + unit1Code + '"] input[name=unit1Codes]').prop('checked', true);
		} else {
			$('#unit-inner dt[data-unit1-code="' + unit1Code + '"] input[name=unit1Codes]').prop('checked', false);
		}
		var unit2AllCheckedLength = $('#unit-inner input[name=unit2Codes]:checked').length;
		if (unit2AllCheckedLength != $('#unit-inner input[name=unit2Codes]').length) {
			$btnAllCheck.removeClass('on');
			// $btnAllCheck.find('span').text('전체해제');
		} else {
			$btnAllCheck.addClass('on');
			// $btnAllCheck.find('span').text('전체선택');
		}
		ProblemWizard.getUnitItemCount();
	});
	//
	$('.btn_acc').click(function() {
		if ($(this).hasClass('close')) {
			$(this).parents('dl').addClass('active');
			$(this).removeClass('close');
		} else {
			$(this).parents('dl').removeClass('active');
			$(this).addClass('close');
		}
	});
	// 출제범위 보기 클릭
	$form.on('click', '.btn-chapter-show', function() {
		if (!$(this).hasClass('on')) {
			$form.find('.data-step-check').find('.layer_chapter_pop').show();
			$(this).addClass('on');
		} else {
			$form.find('.data-step-check').find('.layer_chapter_pop').hide();
			$(this).removeClass('on');
		}
	});
	// 출제정보표 클릭
	$form.on('click', '.btn-sortable-popup', function() {
		Popup.openWindow({
			url: '/problem/sortable/main.popup?chapter1=' + encodeURIComponent(ProblemWizard.getChapter1()) + '&chapter2=' + encodeURIComponent(ProblemWizard.getChapter2()) + '&itemId=' + encodeURIComponent(ProblemWizard.getItemId()) + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2,
			width: 1235,
			height: 900,
			name: 'problemSortablePopup',
		});
	});
	// 이원목적분류표드 레이어 닫기
	$form.on('click', '.btn-exceldownload-layer-close', function() {
		StorageUtils.setValue(STORAGE_PROBLEM_EXCELDOWNLOAD_DISPLAY, true);
		$form.find('.layer-exceldownload').hide();
	});
	// 자동출제 : 시험지 저장 클릭
	$form.on('click', '.btn-item-save', function() {
		// 최소 갯수 제한
		if ($form.find('.data-step-check').find('.quizlist ul.onquiz li').length == 1) {
			alert('최소 1개 이상의 문제를 선택하셔야 합니다.');
			return false;
		}
		var label = '초등_' + parameter.course2Year + '_' + codedetail.courseName;
		var category = codedetail.courseName + ' 문제은행';
		gtag('event', 'Step3 문제은행 출제완료', {
			'event_category': category,
			'event_label': label,
			'value': 1
		});
		$form.attr('action', '/problem/step/save.html');
		ProblemWizard.render(ProblemWizard.getItemId());
	});
	// 초기화 클릭
	$form.on('click', '.btn-item-reset', function() {
		$form.find('.btn-step-previous').hide();
		$form.submit();
		//ProblemWizard.render('');
	});
	// 문항 추가 클릭
	$form.on('click', '.btn-item-add', function() {
		// 최대 갯수 제한
		if ($form.find('.data-step-check').find('.quizlist ul.onquiz li').length >= fixedItemCount) {
			alert('출제 가능한 문항 수는 최대 ' + fixedItemCount + '문항입니다.');
			return false;
		}
		var excludeItemId = encodeURIComponent(ProblemWizard.getItemId());
		var parameter = $form.serialize();
		parameter += '&excludeItemId=' + excludeItemId + '&control=MULTIPLE';
		Popup.openWindow({
			url: '/problem/data/main.popup?' + parameter,
			popupSize: PopupSize.PROBLEM_DATA_MAIN,
			name: 'problemDataMainPopup',
		});
	});
	// 해설 함께 보기 클릭
	$form.on('click', 'input[name=explain]', function() {
		if ($(this).prop('checked')) {
			$form.find('.data-step-check').find('.explain_box').show();
		}	else {
			$form.find('.data-step-check').find('.explain_box').hide();
		}
	});
	// 컨텐츠 교체 클릭
	$form.on('click', '.btn-item-change', function() {
		var itemId = $(this).data().itemId;
		var excludeItemId = encodeURIComponent(ProblemWizard.getItemId());
		var parameter = $form.serialize();
		parameter += '&excludeItemId=' + excludeItemId + '&control=SINGLE';
		parameter += '&changeItemId=' + itemId;
		Popup.openWindow({
			url: '/problem/data/main.popup?' + parameter,
			popupSize: PopupSize.PROBLEM_DATA_MAIN,
			name: 'problemDataMainPopup',
		});
	});
	// 컨텐츠 제거 클릭
	$form.on('click', '.btn-item-remove', function() {
		if (!confirm('정말 제거 하시겠습니까?')) {
			return false;
		}
		$(this).closest('li').remove();
		ProblemWizard.render(ProblemWizard.getItemId());
	});
	// 컨텐츠 문의 클릭
	$form.on('click', '.btn-item-question', function() {
		var data = $(this).data();
		Popup.openWindow({
			url: '/problem/question/form.popup?chapter1=' + encodeURIComponent(ProblemWizard.getChapter1()) + '&chapter2=' + encodeURIComponent(ProblemWizard.getChapter2()) + '&itemId=' + data.itemId + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2,
			width: 978,
			height: 736,
			name: 'problemErrorFormPopup',
		});
	});
	// 컨텐츠 스크랩 클릭
	$form.on('click', '.btn-item-scrap', function() {
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
						success: function(data) {
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
	// 직접 출제하기 : 출제정보표 클릭
	$form.on('click', '.btn-direct-sortable-popup', function() {
		var itemIds = [];
		$form.find('.data-select-info li').each(function() {
			itemIds.push($(this).data().itemId);
		});
		// 최소 갯수 제한
		if (itemIds.length == 0) {
			alert('최소 1개 이상의 문제를 선택하셔야 합니다.');
			return false;
		}
		Popup.openWindow({
			url: '/problem/sortable/main.popup?chapter1=' + encodeURIComponent(ProblemWizard.getChapter1()) + '&chapter2=' + encodeURIComponent(ProblemWizard.getChapter2()) + '&itemId=' + encodeURIComponent(itemIds.join(SEPARATOR)) + '&course2Code=' + parameter.course2Code + '&course=' + parameter.course + '&course2Year=' + parameter.course2Year + '&course2=' + parameter.course2,
			width: 1235,
			height: 900,
			name: 'problemDirectSortablePopup',
		});
	});
	// 직접 출제하기 : 검색 결과 선택 이벤트
	$form.on('click', '.btn-item-select', function() {
		// 최대 갯수 제한
		var directMaxItemCount = $("p#directMaxItemInfo").data("direct-max-item-count");
		if ($form.find('.data-step-check').find('.sel_q ul.onquiz li').length >= parseInt(directMaxItemCount)) {
			alert('출제 가능한 문항 수는 최대 ' + directMaxItemCount + '문항입니다.');
			return false;
		}

		var data = $(this).data();
		var isFind = false;
		var itemIds = [];
		// 동일한 문제 찾기와 기존에 선택한 아이템 아이디 추가
		$form.find('.data-select-info li').each(function() {
			var selectData = $(this).data();
			itemIds.push(selectData.itemId);
			if (selectData.itemId == data.itemId) {
				isFind = true;
				return false;
			}
		});
		if (isFind) {
			alert('동일한 문제를 등록 할수 없습니다.');
			return false;
		}
		// 현재 선택한 아이템 아이디
		itemIds.push(data.itemId);
		ProblemWizard.renderSelectInfo(itemIds.join(SEPARATOR));
	});
	// 직젭 출제하기 : 시험지 저장 클릭
	$form.on('click', '.btn-direct-item-save', function() {
		var itemIds = [];
		$form.find('.data-select-info li').each(function() {
			itemIds.push($(this).data().itemId);
		});
		// 최소 갯수 제한
		if (itemIds.length == 0) {
			alert('최소 1개 이상의 문제를 선택하셔야 합니다.');
			return false;
		}
		var label = '초등_' + parameter.course2Year + '_' + codedetail.courseName;
		var category = codedetail.courseName + ' 문제은행';
		gtag('event', 'Step3 문제은행 출제완료', {
			'event_category': category,
			'event_label': label,
			'value': 1
		});
		$form.attr('action', '/problem/step/save.html');
		ProblemWizard.render(itemIds.join(SEPARATOR));
	});
	// 직접 출제하기 : 선택 아이템 삭제 이벤트
	$form.on('click', '.btn-direct-item-remove', function() {
		if (!confirm('정말 제거하시겠습니까?')) {
			return false;
		}
		$(this).closest('li').remove();
		var itemIds = [];
		$form.find('.data-select-info li').each(function() {
			itemIds.push($(this).data().itemId);
		});
		ProblemWizard.renderSelectInfo(itemIds.join(SEPARATOR));
	});
	// 직접 출제하기 : 전체 제거 클릭 이벤트
	$form.on('click', '.btn-item-all-delete', function() {
		$form.find('.data-select-item-list').empty();
		ProblemWizard.renderSelectInfo('');
	});
	// 출체하기
	$form.bind('submit', function() {
		// 수정은 자동으로 화면을 같이 사용.
		if (qbankInfo != null) {
			url = '/problem/step/auto.html';
			$form.attr('action', '/problem/step/auto.html');
			ProblemWizard.render(qbankInfo.itemsId);
			return false;
		}
		// 2021년 출제옵션 추가
		if (!$form.find('input[name=originSearchValue1]').prop('checked') && !$form.find('input[name=originSearchValue2]').prop('checked')) {
			alert('출제 옵션을 선택해 주세요.');
			return false;
		}
		// 문항 품질 체크
		if ($form.find('input[name=types]:checked').length == 0) {
			alert('문항 유형을 선택해 주세요.');
			return false;
		}
		var unit2CodeCheckLength = $form.find('input[name=unit2Codes]:checked').length;
		if (unit2CodeCheckLength == 0) {
			alert('단원을 선택해주세요.');
			return false;
		}
		var lvH = $("#level_high").val();
		var lvM = $("#level_mid").val();
		var lvL = $("#level_row").val();
		var level_code = "S";
		var gaLevel = "";
		if (lvH != "") {
			gaLevel += "[상]";
		} else { lvH = 0; }

		if (lvM != "") {
			gaLevel += "[중]";
		} else { lvM = 0; }

		if (lvL != "") {
			gaLevel += "[하]";
		} else {
			lvL = 0;
		}

		// 자동 출제일 경우에만 문항수 체크
		if ($form.find('input[name=method]:checked').val() == 'auto') {
			if ((parseInt(lvL) + parseInt(lvM) + parseInt(lvH) > 0)) {
				if ($("#level_result").val() != (parseInt(lvL) + parseInt(lvM) + parseInt(lvH))) {
					alert("출제하실 문항수가 일치하지 않습니다. 다시 확인해 주세요.");
					return false;
				}
			}
			if (itemCount.total < parseInt($("#level_result").val(), 0) || lvH > itemCount.top || lvM > itemCount.middle || lvL > itemCount.bottom) {
				//if (!confirm('출제 예정인 문항 수 보다 해당 단원의 문항 수가 적습니다. 가능한 문항수로 진행하시겠습니까?')) {
				if (!confirm('해당 단원의 문항 수가 기본 출제 문항 수보다 적습니다. 출제 가능한 문항수로 진행하시겠습니까?')) {
					return false;
				}

			}
		}

		var qbTypeId = "S";
		$("input[name=typeIds]:checkbox").each(function() {
			if ($(this).is(':checked')) {
				qbTypeId += "|" + $(this).val();
			}
		});
		qbTypeId = qbTypeId.replace("S|", "");
		var valuttext = "";
		$("input[name=valuts]:checked").each(function() {
			valuttext += "[" + $(this).data().name + "]";
		});
		// 초등인 경우 평가용 학습용 구분
		if (qbTypeId == "S") {
			alert("문항유형을 선택해주세요.");
			return false;
		}
		if (valuttext == '') {
			alert("평가영역을 선택해주세요.");
			return false;
		}
		var gatype = "";
		if (qbTypeId.indexOf('21') >= 0) {
			gatype += "[객관식]";
		}
		if (qbTypeId.indexOf('22') >= 0) {
			gatype += "[주관식]";
		}
		var url = '';
		if ($form.find('input[name=method]:checked').val() == 'auto') {
			if ($("#level_result").val() == "") {
				alert("출제 문항 수를 확인해 주세요.");
				return false;
			}

			gtag('set', {'dimension14': '자동출제'});
			gtag('set', {'dimension12': unit2CodeCheckLength});
			gtag('set', {'dimension16': gatype});
			gtag('set', {'dimension11': '내신 ' + codedetail.course2Name});
			gtag('set', {'dimension13': $("#level_result").val()});
			gtag('set', {'dimension17': valuttext});
			if (gaLevel != "") {
				gtag('set', {'dimension15': gaLevel});
			}
			url = '/problem/step/auto.html';
		} else {
			gaLevel = '';
			if ($("#level_03").is(":checked")) {
				gaLevel = "[하]" + gaLevel;
			}
			if ($("#level_02").is(":checked")) {
				gaLevel = "[중]" + gaLevel;
			}
			if ($("#level_01").is(":checked")) {
				gaLevel = "[상]" + gaLevel;
			}
			if (gaLevel == '') {
				alert("난이도를 선택해주세요");
				return false;
			}

			gtag('set', {'dimension14': '직접출제'});
			gtag('set', {'dimension12': unit2CodeCheckLength});
			gtag('set', {'dimension16': gatype});
			gtag('set', {'dimension11': '내신 ' + codedetail.course2Name});
			gtag('set', {'dimension13': $("#level_result").val()});
			gtag('set', {'dimension17': valuttext});

			if (level_code != "") {
				gtag('set', {'dimension15': gaLevel});
			}
			$form.find('input[name=levelHigh]').val(itemCount.top);
			$form.find('input[name=levelMid]').val(itemCount.middle);
			$form.find('input[name=levelRow]').val(itemCount.bottom);
			gtag('config', 'G-HRYH9929GX', {
				'page_path': '/problem/step/direct.html'
			});
			url = '/problem/step/direct.html';
		}
		//GA 이벤트 형식 추가, 20180515, seo
		var courseName = $('#course2 option:selected').text().replace(/ /gi, '').replace(/<br\/>/gi, '');	//빈칸,<br/>태그 제거
		var subjectName = $('#select_course option:selected').text();
		var gradeName = '초등';
		var year = $form.find('select[name=course2Year]').val().slice(-2);
		var label = gradeName + "_" + year + "_" + courseName;
		var category = subjectName + " 문제은행";

		// 구글 통계 로그 남기기..
		gtag('config', 'G-HRYH9929GX', {
			'page_path': url
		});
		$form.attr('action', url);
		gtag('event', 'Step2 문제은행 출제하기', {
			'event_category': category,
			'event_label': label,
			'value': 1
		});

		ProblemWizard.render('');
		return false;
	});

	// 직접 출제 검색하기 클릭 이벤트
	$form.on('click', '.btn-item-search', function() {
		var search = $(this).parent('.search');

		// 검색조건 다시 set
		if (!search.find('input[name=directLevel1]').prop('checked') &&
			!search.find('input[name=directLevel2]').prop('checked') &&
			!search.find('input[name=directLevel3]').prop('checked')) {
			alert('난이도가 한개라도 설정이되어야 합니다.');
			return false;
		}

		if (search.find('input[name=types]:checked').length == 0) {
			alert('문항 구분이 한개라도 설정이되어야 합니다.');
			return false;
		}

		if (search.find('input[name=typeIds]:checked').length == 0) {
			alert('문항 유형이 한개라도 설정이되어야 합니다.');
			return false;
		}
		// 아이템 아이디 다시 검색 및 1페이지로
		ProblemWizard.getItemIdList();
	});
	// 직접 출제 대단원 선택 이벤트
	$form.on('change', 'select[name=directUnit1Code]', function() {
		$form.find('select[name=directUnit2Code] option.data').remove();
		// 출제범위 보기에서 2차를 가져와서 사용
		ALL_CHAPTER2_BY_CHAPTER1 = '';
		$form.find('.data-unit-list dd[data-unit1-code="' + $(this).val() + '"]').each(function() {
			var data = $(this).data();
			var $option = $('<option class="data" value="' + data.unit2Code + '">' + data.unit2LabCustom + '. ' + data.unit2 + '</option>');
			$form.find('select[name=directUnit2Code]').append($option);
			// 중단원 값들 저장
			if(data.unit2Code != ''){
				if(ALL_CHAPTER2_BY_CHAPTER1 == ''){
					ALL_CHAPTER2_BY_CHAPTER1 = data.unit2Code;
				}else{
					ALL_CHAPTER2_BY_CHAPTER1 += '|'+data.unit2Code;
				}
			}
		});

		// 댄단원 선택시 조회
		$('.btn-item-search').trigger('click');
	});
	$form.on('change', 'select[name=directUnit2Code]', function() {
		// 중단원 선택시 조회
		$('.btn-item-search').trigger('click');
	});
	// 직접 출제 갯수 선택 이벤트
	$form.on('change', 'select[name=size]', function() {
		// 1페이지로 초기화
		ProblemWizard.renderSearchInfo(1);
	});

	// 직접 출제 페이징 클릭 이벤트
	$form.on('click', '.data-search-info .paging a', function(e) {
		e.preventDefault();
		var data = $(this).data();
		// 페이지의 아이템 아이디를 가져와 다시 조회..
		ProblemWizard.renderSearchInfo(data.page);
	});

	// 시험지 저장 : 분류 추가
	$form.on('click', '.btn-type-name-add', function() {
		Ajax.execute({
			url: '/problem/type/save.json',
			data: {
				typeName: $form.find('input[name=typeName]').val()
			},
			type: 'post',
			dataType: 'json',
			success: function(data) {
				var typeList = data.response;
				$form.find('select[name=type] option.data').remove();
				for (var i = 0; i < typeList.length; i++) {
					var typeName = typeList[i].typeName;
					var $option = $('<option class="data" value="' + typeName + '">' + typeName + '</option>');
					// 현재 추가된 값과 동일하다면 선택
					if ($form.find('input[name=typeName]').val() == typeName) {
						$option.prop('selected', true);
					}
					$form.find('select[name=type]').append($option);
				}
				// 초기화
				$form.find('input[name=typeName]').val('');
			}
		});
	});
	// 시험지 저장 : 저장하기
	$form.on('click', '.btn-info-save', function() {
		var label = '초등_' + parameter.course2Year + '_' + codedetail.courseName;
		var category = codedetail.courseName + ' 문제은행';
		// 시험지명 체크 ( "," 콤마 포함 시 저장 불가)
		var chkSubejct = $form.find('input[name=subject]').val();
		if(chkSubejct.indexOf(',') >= 0 || chkSubejct.indexOf(';') >= 0){
			alert('콤마( , )와 세미콜론( ; )은 입력 불가합니다.');
			return false;
		}
		gtag('event', 'Step4 문제은행 시험지저장', {
			'event_category': category,
			'event_label': label,
			'value': 1,
		});
		Ajax.execute({
			url: '/problem/save.json',
			data: $form.serialize(),
			type: 'post',
			dataType: 'json',
			success: function(data) {
				qbankInfo = data.response;
				// 완료 컨테이너 보여주기
				$form.find('input[name=qbId]').val(qbankInfo.qbId);
				$form.find('.end-container .data-subject').text(qbankInfo.subject);
				$form.find('.save-container').hide();
				$form.find('.end-container').show();
			}
		});
	});
	// 시험지 저장 후 다운로드
	$form.on('click', '.btn-vivatem-download', function() {
		// 통계 로그
		gtag('event', '다운로드', {
			'event_category': '문제은행',
			'event_label': '출제 마법사-내신'
		});
		// 다운로드 레이어 띄워줌.
		$('#layer-progress-download').show();
		var data = $(this).data();
		$.fileDownload('/problem/download/vivatem?qbId=' + $form.find('input[name=qbId]').val() + '&template=' + data.template, {
			successCallback: function (url) {
				$('#layer-progress-download').hide();
			},
			failCallback: function (responseHtml, url) {
				$('#layer-progress-download').hide();
			}
		});
		return false;
	});
	// 최초 등록할 경우에는
	if (qbankInfo == null) {
		// 최초 화면 진입시 학년의 과목 2차 정보 가져오게 이벤트 발생
		$('select[name=codelistId]').trigger('change');
		ProblemWizard.getUnitItemCount();
	} else {
		// 수정인경우는 다음화면 보이게
		$('#btn-save').trigger('click');
	}
	function testCode() {
		$('input[name=method]:eq(1)').trigger('click');
		setTimeout(function() {
			$('#btn-save').trigger('click');
			setTimeout(function() {
				// $('.btn-item-save').trigger('click');
			}, 1500);
		}, 1500);
	}
	// testcode
	// testCode();
});

/**
 * 아이템 교체 및 추가 팝업창에서의 콜백
 * @param control 교체 / 여러개 추가
 * @param changeItemId 교체할 아이템 아이디
 * @param selectItemId 팝업에서 선택한 아이템 아이디
 */
function callbackData(control, changeItemId, selectItemId) {
	// 다시 조회할 아이템 아이디는 순서를 보장하기 위해 조건 처리
	var itemId = '';
	if (control == 'SINGLE') {
		var itemIds = [];
		$form.find('.data-step-check').find('.onquiz li').each(function() {
			var data = $(this).data();
			// 교체할 대상인 경우는 새로 선택된 아이디로.
			if (data.itemId == changeItemId) {
				itemIds.push(selectItemId);
			} else {
				itemIds.push(data.itemId);
			}
		});
		itemId = itemIds.join(SEPARATOR);
	} else {
		itemId = ProblemWizard.getItemId(selectItemId);
	}
	ProblemWizard.render(itemId);
}

var ProblemWizard = {

	// 아이템 아이디 리턴
	getItemId: function(addItemId) {
		var itemIds = [];
		$form.find('.data-step-check').find('.onquiz li').each(function() {
			itemIds.push($(this).data().itemId);
		});
		if (StringUtils.isNotEmpty(addItemId)) {
			itemIds.push(addItemId);
		}
		return itemIds.join(SEPARATOR);
	},

	/**
	 * 선택한 항목의 아이템 정보 화면을 조회하여 가져옴.
	 * @param itemId
	 */
	renderSelectInfo: function(itemId) {
		$form.find('input[name=itemId]').val(itemId);
		Ajax.execute({
			url: '/problem/step/direct/select/info.html',
			type: 'get',
			data: $form.serialize(),
			dataType: 'html',
			success: function(html) {
				var $dataSelectInfo = $form.find('.data-select-info');
				var $html = $(html);
				$dataSelectInfo.html($html);
				var totalImages = $html.find('img').length;
				var loadedImages = 0;
				// 이미지가 로드된 후에 스크롤 하단으로 정확히 도착.
				$html.find('img').each(function() {
					$(this).on('load', function() {
						loadedImages++;
						if (loadedImages == totalImages) {
							$dataSelectInfo.find('.scroll_area').animate({
								scrollTop: $dataSelectInfo.find('.onquiz').outerHeight(),
							});
						}
					});
				});
			}
		});
	},
	// 챕터1
	getChapter1: function() {
		var ids = [];
		$('input[name=unit1Codes]:checked').each(function() {
			ids.push($(this).val());
		});
		return ids.join(SEPARATOR);
	},

	// 챕터2
	getChapter2: function() {
		var ids = [];
		$('input[name=unit2Codes]:checked').each(function() {
			ids.push($(this).val());
		});
		return ids.join(SEPARATOR);
	},

	/**
	 * 선택한 단원의 아이템 카운트 정보
	 */
	getUnitItemCount: function() {
		Ajax.execute({
			url: '/problem/chapter/item/count.json',
			data: {
				chapterId: ProblemWizard.getChapter2()
			},
			type: 'get',
			dataType: 'json',
			success: function(data) {
				itemCount = data.response;
				if (itemCount.total < fixedItemCount) {
					$('#level_high').val('0');
					$('#level_mid').val('0');
					$('#level_row').val('0');
				} else {
					$('#level_high').val('5');
					$('#level_mid').val('15');
					$('#level_row').val('10');
				}
				$('#level_result').val(fixedItemCount);
				$("#item-count-total").html(itemCount.total);
			}
		});

	},

	getItemIdList: function() {
		// 초기화
		$('input[name=pDirectUnit2Code]').val('');
		// 중단원 코드 넣기
		if($('select[name=directUnit1Code]').val() != '' && $('select[name=directUnit2Code]').val() == ''){
			$('input[name=pDirectUnit2Code]').val(ALL_CHAPTER2_BY_CHAPTER1);
		}
		Ajax.execute({
			url: '/problem/item/id/list.json',
			type: 'get',
			data: $form.serialize(),
			dataType: 'json',
			success: function(data) {
				vivatemItemIds = data.response;
				if (vivatemItemIds.length == 0) {
					alert('데이터가 존재 하지 않습니다. 이전으로 돌아갑니다.');
					return false;
				}
				ProblemWizard.renderSearchInfo(1);
			}
		});
	},

	getPaginationItemId: function(page) {
		var size = 20;
		// 초기에는 검색 영역이 없음.
		if ($form.find('select[name=size]').length > 0) {
			size = parseInt($form.find('select[name=size]').val());
		}
		var total = Math.floor(vivatemItemIds.length / size);
		var startIndex = (page - 1) * size;
		var endIndex = (page * size);
		// 첫 페이지 이외
		if (page > 1) {
			startIndex += 1;
			endIndex += 1;
		}
		// 마지막 페이지
		if (page == total) {
			endIndex = vivatemItemIds.length - 1;
		}
		var itemIds = vivatemItemIds.slice(startIndex, endIndex);
		return itemIds.join(SEPARATOR);
	},

	/**
	 * page 번호의 검색 결과를 조회.
	 * @param page 페이지 번호
	 */
	renderSearchInfo: function(page) {
		$form.find('input[name=page]').val(page);
		$form.find('input[name=itemId]').val(ProblemWizard.getPaginationItemId(page));
		$form.find('input[name=itemSize]').val(vivatemItemIds.length);
		Ajax.execute({
			url: '/problem/step/direct/search/info.html',
			type: 'get',
			data: $form.serialize(),
			dataType: 'html',
			success: function(html) {
				// 검색결과
				$form.find('.data-search-info').html(html);
				// 최초 출제하기에서의 중복되는 필드 disabled 처리
				$form.find('.data-wizard-field').prop('disabled', true);
				// 동적으로 가져온 화면에 select2 적용
				Select2Binder.bind($form);
			}
		});
	},

	/**
	 * 출제 정보 확인 렌더링
	 * @param itemId 아이템 아이디
	 */
	render: function(itemId) {
		// 변경된 아이템으로 다시 조회..
		$form.find('input[name=itemId]').val(itemId);
		$form.find('input[name=chapter1]').val(ProblemWizard.getChapter1());
		$form.find('input[name=chapter2]').val(ProblemWizard.getChapter2());
		// 서버에 출제정보 확인 요청
		Ajax.execute({
			url: $form.attr('action'),
			type: 'get',
			data: $form.serialize(),
			dataType: 'html',
			success: function(html) {
				// 출제정보 및 시험지 저장 컨텐츠 보여주기
				$form.find('.data-step-wizard').hide();
				// 출제정보 및 시험지 저장 탭 on 처리
				$form.find('.step_qbank li').removeClass('on');
				// 시험지 저장인경우
				if ($form.attr('action') == '/problem/step/save.html') {
					$form.find('.data-step-check').hide();
					$form.find('.data-step-save').html(html);
					$form.find('.data-step-save').show();
					$form.find('.btn-step-previous').hide();
					$form.find('.step_qbank li[data-step="save"]').addClass('on');
					// 수정인경우는
					if (qbankInfo != null) {
						// 이전으로 숨김처리
						$form.find('.btn-step-previous2').hide();
					}
				} else {
					$form.find('.data-step-check').html(html);
					$form.find('.data-step-check').show();
					$form.find('.step_qbank li[data-step="check"]').addClass('on');
					var isExceldownloadDisplay = StorageUtils.getBoolean(STORAGE_PROBLEM_EXCELDOWNLOAD_DISPLAY);
					if (!isExceldownloadDisplay) {
						$('#step-contents-check .layer-exceldownload').show();
					}
					$form.find('.btn-step-previous').show();
					var method = $form.find('input[name=method]:checked').val();
					// 직접 출제 인경우
					if (method == 'direct') {
						$form.find('.step_qbank li[data-step="check"] p').text('직접 출제하기');
						ProblemWizard.getItemIdList();
					} else {
						$form.find('.step_qbank li[data-step="check"] p').text('출제정보 확인');
					}
					// 수정인경우는
					if (qbankInfo != null) {
						// 이전으로 숨김처리
						$form.find('.btn-step-previous').hide();
						$form.find('.btn-item-reset').hide();
					}
				}
				// 스크롤 최상위로
				LayoutHandler.scrollTop();
			}
		});
	},

	/**
	 * 순서정렬 팝업창에서의 콜백
	 * @param itemId
	 */
	callbackSortable: function(itemId) {
		// 자동 출제
		if (qbankInfo != null || $form.find('input[name=method]:checked').val() == 'auto') {
			this.render(itemId);
		} else {
			// 직접 출제
			this.renderSelectInfo(itemId);
		}
	}
};