$(function () {
	// 전체 페이지 일경우 checkbox, radio disable 시킨다.
	if($('#queryForm input[name=type]').val == 'total') {
		$('input[type=checkbox]').prop('disabled', false);
		$('input[type=radio]').prop('disabled', false);
		$('input[type=radio]').each(function() {
			$(this).prop('disabled', false);
		});
	}

	// 연관 검색 링크
	$('.related-link').on('click', function () {
		SearchHanlder.search($(this).attr("id"), $(this).attr("id").length > 0);
	});

	// 결과내 검색 엔터 키 이벤트
	$("#reSearch").on('keypress', function () {
		//alert("keypress");
		if(window.event.keyCode == 13) {
			goReSearch();
		}
	});

	// 결과내 검색 버튼 클릭
	$("#reSearchBtn").on('click', function () {
		goReSearch();
	});

	// 검색 리스트 받아 오기
	var getContentLidst = function(page, isFilter, isTotal) {
		$('#filterForm [name=filter]').val(isFilter);
		if (isFilter == "N") { // 필터 검색이 아니면 소팅 기능 초기화
			$("input[name = sort]").prop("checked", false);
			$("input[name = menuCd]").prop("checked", false);
		}

		var queryData = $('#queryForm').serialize();
		var filterData = $('#filterForm').serialize();

		if(page) {
			filterData += "&page="+page;
		}

		var $tabConts = (isFilter == 'Y') ? $('.tab-contents-area .search_cont') : $('.tab-contents-area');

		Ajax.execute({
			url: '/search/content.html',
			data: filterData + "&" + queryData,
			type: 'get',
			dataType: 'html',
			success: function(html) {
				//console.log(html);
				$tabConts.empty().show().append(html).find(".tab_conts").show();// 검색 2중 생성 제거
				//search_cont
				// 페이징 이벤트
				if(isTotal != 'Y') {
					PaginationHandler.render({
						$target: $('.tab-contents-area .search_cont')
						, callback : removeSearch
					});
				}
				//console.log("#################################################################")
				//console.log($('.tab-contents-area .search_cont').find('.category').html());
				//console.log("#################################################################")
				$('.tab-contents-area .search_cont').find('.category').remove();
				//console.log("#################################################################")

				$("input[type=checkbox]").off().on("change", function(e){
					e.preventDefault();

					var v = $(this).val();
					var checked = $(this).is(":checked");
					var $targetDiv = $(this).closest("div");

					if(v == "") {	// 전체
						if(checked) {	// 나머지 체크 해제
							$targetDiv.find("input[type=checkbox][value!='']").prop("checked", "");
						} else {	// 전체 체크일때  클릭하면 체크가 풀리지 않도록..
							$(this).prop("checked", "checked");
						}
					} else { // 나머지
						if(checked) {	// 전체 체크 해제
							$targetDiv.find("input[type=checkbox][value='']").prop("checked", "");
						} else {	// 나머지 체크 해제시 체크된게 없으면 전체 체크
							var checkedLen = $targetDiv.find("input[type=checkbox][value!='']:checked").length;
							if(checkedLen == 0) {
								$targetDiv.find("input[type=checkbox][value='']").prop("checked", "checked");
							}
						}
					}
				});
			}
		});
	}

	// 결과내 검색
	var goReSearch = function() {
		var query = $.trim($('input#reSearch').val());

		if(!query){
			alert('검색어를 입력해주세요');
			return false;
		}

		if($('#queryForm [name=prevQuery]').length >= 5){
			alert('결과내 검색은 최대 5회까지 가능합니다.');
			return false;
		}

		prevQuery = $("#queryForm [name=query]").val();
		// 검색어 저장
		/*if(memberId != "" && query != "") {
			//saveCookie(query, true);
		}*/

		$('#queryForm [name=type]').val('total');
		$('#queryForm').append('<input type="hidden" name="prevQuery" value="'+ replaceQuot(prevQuery) +'" />');
		$("#queryForm [name=query]").val(replaceQuot(query));

		var newURL = location.href.split('?')[0] + "?" + $('#queryForm').serialize().replace(/\+/g, '%20');

		location.href = newURL;
	}

	// 쌍따음표 치환
	var replaceQuot = function(str){
		return str.replace(/"/gi, "&quot;").replace(/'/gi, "&apos;");
	}

	// 검색 탭 클릭
	$('.search_tab li').on('click', function() {
		var $type = $(this).attr('type');
		var isTotal = $type == 'total' ? 'Y' : 'N';

		$('#queryForm input[name=type]').val($type);
		$('#filterForm input[name=isTab]').val('Y');

		getContentLidst(1, 'N', isTotal);

		$('.search_tab li').removeClass('on');
		$(this).addClass('on');
	});

	// checkbox, radio 변경시 재검색
	$(document).on('change', 'input[type=checkbox], input[type=radio]', function(){

		// 공통팝업 다시보지않기에 대한 이벤트일 경우 무시
		if($(this).prop('name') == 'display'){
			return;
		}
		// 교과 자료
		/*if ($(this).attr('name') == 'subject' && $('input[name=subject]:checked').length > 3) {
			alert('교과서 선택은 최대 3개까지 가능 합니다.');
			$(this).prop('checked', false);
			return;
		}*/

		// 라이브 러리
		if ($(this).attr('name') == 'fileType') {

			var fileTypeChecked = $(this).closest('div').find("input[name=fileType]").is(":checked");
			if(!fileTypeChecked) {
				$(this).prop("checked", true);
				return;
			}

			// 교실아트 분류
			if ($(this).parent().find("#libSubject01").is(":checked")) {
				$(".libSubject01Area").show();
			} else {
				$(".libSubject01Area").hide().find("input[name=libType01]").prop("checked", false);
				var checkedLen = $(".libSubject02Area").find("input[name=libType01]:checked").length;
				if(checkedLen == 0) {
					$("input[name=libType01][value='']").prop("checked", true);
				}
			}

			// 이미지/동영상 분류
			if ($(this).parent().find("#libSubject02").is(":checked") || $(this).parent().find("#libSubject03").is(":checked")) {
				$(".libSubject02Area").show();
			} else {
				$(".libSubject02Area").hide().find("input[name=libType01]").prop("checked", false);
				var checkedLen = $(".libSubject01Area").find("input[name=libType01]:checked").length;
				if(checkedLen == 0) {
					$("input[name=libType01][value='']").prop("checked", true);
				}
			}

			// 분류 체크
			if( $(this).closest('div').find("input[name=fileType]").is(":checked") ) {
				$(".libSubjectArea").show();
			} else {
				$(".libSubjectArea").hide().find("input[name=libType01]").prop("checked", false);
			}
		}
		getContentLidst(1, 'Y', 'N');
	});

	// 더보기 처리
	$(document).on('click', '.more a', function(){
		var type = $(this).data('type');

		$('#queryForm input[name=type]').val(type);
		$('#filterForm input[name=isTab]').val('Y');

		getContentLidst(1, 'N', 'N');

		$('.search_tab li').removeClass('on');
		$('.search_tab li[type=' + type + ']').addClass('on');
	});

	// 초기 데이터 받아 오기
	getContentLidst(0, 'N', 'Y');
});

function removeSearch() {
	$('.tab-contents-area .search_cont').find('.category').remove();
}

// 담기 버튼 이벤트
function insertFolderMov(target) {
	var $target = $(target);
	var contentId = $target.data('content');
	console.log("contentId : ", contentId);
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'LIBRARY',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});
}

// 검색 상단 탭의 검색 리스트 수 보여 주기
var setCountsCount = function(total, educourse, creative, laboratory, library, themeplace, breaktime, cs) {
	$('.search_tab li[type=total]').find('span').text(total); // 전체
	$('.search_tab li[type=educourse]').find('span').text(educourse); // 교과자료
	$('.search_tab li[type=creative]').find('span').text(creative); // 창의적 체험활동
	$('.search_tab li[type=laboratory]').find('span').text(laboratory); // 수업연구소 (신규)
	$('.search_tab li[type=library]').find('span').text(library); // 라이브러리
	$('.search_tab li[type=themeplace]').find('span').text(themeplace); // 에듀테크 테마관
	$('.search_tab li[type=breaktime]').find('span').text(breaktime); // 쉬는시간 (신규)
	$('.search_tab li[type=cs]').find('span').text(cs); // 고객센터
}