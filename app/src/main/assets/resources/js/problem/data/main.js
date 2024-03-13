var SEPARATOR = '|';
// 선택한 아이템 아이디
var selectItemId = '';
// 초기값 저장
var ALL_CHAPTER1 = parameter.chapter1;
var ALL_CHAPTER2 = parameter.chapter2;
var ALL_CHAPTER2_BY_CHAPTER1 = '';
$(function() {
	var $form = $('#search-form');
	// 단원 선택 이벤트
	$form.find('select[name=unit1Code]').bind('change', function(e) {
		var unit = null;
		for (var i = 0; i < unitList.length; i++) {
			unit = unitList[i];
			if (unit.unit1Code == $(this).val()) {
				break;
			}
		}
		$form.find('select[name=unit2Code] option.data').remove();
		if (unit != null && $(this).val().length > 0) {
			var items = unit.items;
			ALL_CHAPTER2_BY_CHAPTER1 = '';
			for (var i = 0; i < items.length; i++) {
				var unit2 = items[i];
				var $option = $('<option class="data" value="' + unit2.unit2Code + '">' + unit2.unit2LabCustom + '. ' + unit2.unit2 + '</option>');
				$form.find('select[name=unit2Code]').append($option);
				// 중단원 값들 저장
				if(unit2.unit2Code != ''){
					if(ALL_CHAPTER2_BY_CHAPTER1 == ''){
						ALL_CHAPTER2_BY_CHAPTER1 = unit2.unit2Code;
					}else{
						ALL_CHAPTER2_BY_CHAPTER1 += '|'+unit2.unit2Code;
					}
				}
			}
		}
		// 중단원 초기화
		parameter.chapter2 = ALL_CHAPTER2;
		// 대단원 선택시 자동 조회
		$form.submit();
	});
	// 검색하기
	$form.submit(function() {
		// 검색조건 다시 set
		if (!$form.find('input[name=directLevel1]').prop('checked') &&
			!$form.find('input[name=directLevel2]').prop('checked') &&
			!$form.find('input[name=directLevel3]').prop('checked')) {
			alert('난이도가 한개라도 설정이되어야 합니다.');
			return false;
		}
		if ($form.find('input[name=types]:checked').length == 0) {
			alert('문항 구분이 한개라도 설정이되어야 합니다.');
			return false;
		}
		if ($form.find('input[name=typeIds]:checked').length == 0) {
			alert('문항 유형이 한개라도 설정이되어야 합니다.');
			return false;
		}
		// 난이도
		if ($form.find('input[name=directLevel1]').prop('checked')) {
			parameter.directLevel1 = 'Y';			
		} else {
			parameter.directLevel1 = 'N';
		}
		if ($form.find('input[name=directLevel2]').prop('checked')) {
			parameter.directLevel2 = 'Y';			
		} else {
			parameter.directLevel2 = 'N';
		}
		if ($form.find('input[name=directLevel3]').prop('checked')) {
			parameter.directLevel3 = 'Y';			
		} else {
			parameter.directLevel3 = 'N';
		}
		// 단원 1차 선택
		if ($form.find('select[name=unit1Code]').val().length > 0) {
			parameter.chapter1 = $form.find('select[name=unit1Code]').val();
		}else{
			parameter.chapter1 = ALL_CHAPTER1;
		}
		// 단원 2차 선택
		if ($form.find('select[name=unit2Code]').val().length > 0) {
			parameter.chapter2 = $form.find('select[name=unit2Code]').val();
		}else{
			if(parameter.chapter1 == ALL_CHAPTER1){
				parameter.chapter2 = ALL_CHAPTER2;
			}else{
				parameter.chapter2 = ALL_CHAPTER2_BY_CHAPTER1;
			}
		}
		// 문항 구분
		var types = [];
		$form.find('input[name=types]:checked').each(function() {
			types.push($(this).val());
		});
		parameter.types = types;
		// 문항 유형
		var typeIds = [];
		$form.find('input[name=typeIds]:checked').each(function() {
			typeIds.push($(this).val());
		});
		parameter.typeIds = typeIds;
		// 아이템 정보를 리턴
		Ajax.execute({
			url: '/problem/data/search/list.html',
			type: 'get',
			data: parameter,
			dataType: 'html',
			async: false,
			success: function(html) {
				$('#data-search-list').html(html);
				if ($('#data-search-list').find('li').length == 0) {
					$('#data-scroll-area').addClass('nodata');
				} else {
					$('#data-scroll-area').removeClass('nodata');
				}
				// 최초 빈페이지
				// renderSelectItem('');
			}
		});		
		return false;
	});
	// 선택 문항 추가하기
	$form.on('click', '.btn-item-save', function() {
		// 선택한 문항 정보가 없을 때
		if(getItemId() != ''){
			// 콜백처리
			opener.callbackData(parameter.control, parameter.changeItemId, getItemId());
			self.close();
		}else{
			alert('선택한 문항이 없습니다.');
		}

	});
	// 검색 결과 선택 이벤트
	$form.on('click', '.btn-item-select', function() {
		var data = $(this).data();
		var isFind = false;
		var selectItemCount = 0;
		$form.find('.data-select-item-list li').each(function() {
			if ($(this).data().itemId == data.itemId) {
				isFind = true;
			}
			selectItemCount++;
		});
		if (isFind) {
			alert('동일한 문제를 등록 할수 없습니다.');
			return false;	
		}
		var itemId = '';
		if (parameter.control == 'SINGLE') {
			itemId = data.itemId;
		} else {
			itemId = getItemId();
			// 최초 추가인경우
			if (itemId.length == 0) {
				itemId = data.itemId;
			} else {
				itemId += SEPARATOR + data.itemId;
			}
			// 갯수 제한
			if (selectItemCount >= addCount) {
				alert('최대 ' + addCount + '문항까지 문항을 선택하실 수 있습니다.');
				return false;
			}
		}
		renderSelectItem(itemId);
	});
	// 선택 아이템 삭제 이벤트
	$form.on('click', '.btn-item-remove', function() {
		$(this).closest('li').remove();
		// 다시 렌더링
		renderSelectItem(getItemId());
	});	
	// 전체 제거 클릭 이벤트
	$form.on('click', '.btn-item-all-delete', function() {
		$form.find('.data-select-item-list').empty();
		renderSelectItem(getItemId());
	});
	// 팝업창 크기 조절 강제로 막음
	$(window).resize(function() {
		window.resizeTo(PopupSize.PROBLEM_DATA_MAIN.width, PopupSize.PROBLEM_DATA_MAIN.height);
	});		
	// 최초 로딩시 목록 조회
	// $form.submit();
	// 선택 문항 화면 다시 렌더링
	function renderSelectItem(itemId) {
		parameterSelect.itemId = itemId;
		Ajax.execute({
			url: '/problem/data/select/info.html',
			type: 'get',
			data: parameterSelect,
			dataType: 'html',
			success: function(html) {
				$('#select-info').html(html);
			}
		});		
	}
	
	// 아이템 아이디 리턴
	function getItemId() {
		var itemIds = [];
		$form.find('.data-select-item-list li').each(function() {
			itemIds.push($(this).data().itemId);
		});
		return itemIds.join(SEPARATOR);
	};

	// 중단원 select 박스 선택
	$form.on('change', '#unit2Code', function() {
		$form.submit();
	});
	
	// 초기 자동 조회
	$form.submit();
});

