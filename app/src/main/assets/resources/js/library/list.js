const detailSearch = {
	depth1: {
		code: '',
		name: ''
	},
	depth2: {
		code: '',
		name: ''
	},
	depth3: [],
	keyword: ''
}

let firstInit = true; // 페이지 최초 접속시에만 파일 유형을 전체로 해주기 위해서
let totCount = 0;
let firstSearch = true;

let $depthCodeList1;
let $depthCodeList2;
let $depthCodeList3;

$(function () {

	const $codeDepth2 = $('#codeDepth2');
	const $codeDepth3 = $('#codeDepth3');
	$depthCodeList1 = $('input[name="depthCode1"]');
	$depthCodeList2 = $('input[name="depthCode2"]');
	$depthCodeList3 = $('input[name="depthCode3"]');

	$('.subcontents').on('click', function (e) {
		if (isDuringLoading()) {
			e.preventDefault();
			return false;
		}
	});
	if (type1 != "") {
		$(document).find("#ul li").each(function () {
			if (type1 == $(this).val()) {
				$(this).addClass('current');
			}
		});
	}

	// 검색창에서 엔터키 입력 이벤트
	$('input[name=photoKeyword]').on("keypress", function (key) {
		if (key.keyCode == 13) {
			if ($('#detailSearchLayer').hasClass('on')) {
				$('#detailSearchFilter').empty();
				resetDetailSearchValue();
				if ($('input[name="depthCode1"]:checked').length > 0) {
					for (let depth = 1; depth <= 2; depth++) {
						const $depth = $('input[name="depthCode' + depth + '"]:checked');
						detailSearch['depth' + depth] = {code: $depth.val(), name: $depth.siblings('label').text()};
						if ($depth.val() == null || $depth.val() == '') {
							break;
						}
					}
					detailSearch.depth3 = [];
					if ($('input[name="depthCode3"]:checked').length > 0) {
						$.each($('input[name="depthCode3"]:checked'), function (idx3, code3) {
							if ($(code3).val() != '' && $(code3).prop('disabled') == false) {
								detailSearch.depth3.push({
									code: $(code3).val(),
									name: $(code3).siblings('label').text()
								});
							}
						});
					}
				}
				renderDetailSearchFilter();
			}
			resetSearchFileType();
			$('#detailSearchLayer').removeClass('on');
			firstSearch = true;
			getList(1);
		}
	});

	// 검색 버튼 이벤트
	$('#searchBtn').on('click', function () {
		if ($('#detailSearchLayer').hasClass('on')) {
			$('#detailSearchFilter').empty();
			resetDetailSearchValue();
			if ($('input[name="depthCode1"]:checked').length > 0) {
				for (let depth = 1; depth <= 2; depth++) {
					const $depth = $('input[name="depthCode' + depth + '"]:checked');
					detailSearch['depth' + depth] = {code: $depth.val(), name: $depth.siblings('label').text()};
					if ($depth.val() == null || $depth.val() == '') {
						break;
					}
				}
				detailSearch.depth3 = [];
				if ($('input[name="depthCode3"]:checked').length > 0) {
					$.each($('input[name="depthCode3"]:checked'), function (idx3, code3) {
						if ($(code3).val() != '' && $(code3).prop('disabled') == false) {
							detailSearch.depth3.push({
								code: $(code3).val(),
								name: $(code3).siblings('label').text()
							});
						}
					});
				}
			}
			renderDetailSearchFilter();
		}
		resetSearchFileType();
		$('#detailSearchLayer').removeClass('on');
		firstSearch = true;
		getList(1);
	});

	//소팅(최신순, 인기순, 좋아요순) 변경 이벤트
	$('#contsTotal').on('change', '#searchSelect', function () {
		$('input[name=searchSelect]').val($(this).val());
		getList(1);
	});

	// 탭 더보기 클릭 이벤트
	$('#contsTotal .btn-more').bind('click', function () {
		page++;
		getList(page);
	});

	getList(1);

	//selectBox 클릭 이벤트
	$('.seelectLevel1').on('click', function () {
		clickSelect($(this));
	});


	//selectBox 처리 함수
	var clickSelect = function (obj) {
		var ckView = obj.data('view');

		// 선택한 메뉴의 서브 메뉴 이벤트
		if (ckView == 'off') {
			obj.data('view', 'on').find('.drop_list').show();
		} else {
			obj.data('view', 'off').find('.drop_list').hide();
		}
	};

	//selectBox 클릭 이벤트
	$(document).on('click', "#ul li", function () {
		$('.drop_list').show();
		var text = $(this).html();
		$("#select").html(text);
		type1 = $(this).val();
		title = $(this).html();
		$(".drop_list").hide();

		// li 리스트 초기화 - 하일라이트 제거
		tabClassReset('drop_list');
		// 선택 li 하일라이트
		$(this).addClass('current');

	});

	//selectBox 리스트 클래스 초기화
	var tabClassReset = function (cl) {
		$('.' + cl + ' ').find('li').eaçch(function () {
			$(this).removeClass('current');
		});
	};

	//셀렉트 박스 이외 선택시 보이지 않게 하기
	$("body").on("click", function (e) {
		if ($(".drop_list").css("display") == "block") {
			if ($("#select-wrap").has(e.target).length == 0) {
				$(".drop_list").hide()
			}
		}
	});

	//다시 검색하기 버튼
	$('#contsTotal').on('click', '#reSearch', function () {
		$('input[name=photoKeyword]').focus();
		$('input[name=photoKeyword]').val('');
	});

	//통합뷰어
	$('#contsTotal').on('click', '.btn-viewer-main-open', function () {
		var data = $(this).data();
		// ZIP 컨텐츠는 새창으로 띄워주기
		if (data.file == 'FT207') {
			// FT359	iPDF (복합파일(ZIP)
			if (data.mediaType == 'FT359') {
				Popup.openSimpleSViewer(data.siteUrl);
				return false;
			}
			// FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
			if (data.mediaType == 'FT360') {
				Popup.openHtmlViewer(data.siteUrl);
				return false;
			}
		}
		Popup.openViewerMain(data.content, data.contentGubun);
	});

	$('#contsTotal').on('click', '.link_box', function () {
		var data = $(this).data();
		// ZIP 컨텐츠는 새창으로 띄워주기
		if (data.file == 'FT207') {
			// FT359	iPDF (복합파일(ZIP)
			if (data.mediaType == 'FT359') {
				Popup.openSimpleSViewer(data.siteUrl);
				return false;
			}
			// FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
			if (data.mediaType == 'FT360') {
				Popup.openHtmlViewer(data.siteUrl);
				return false;
			}
		}
		Popup.openViewerMain(data.content, data.contentGubun);
	});

	//<p class="chk_cont"> 안에 체크시  li 클래스 추가,제거
	$('input[name=cbchannel]').on('change', function () {
		if ($(this).is(":checked")) {
			$(this).parent('span').parent('p').parent('li').addClass('active');
		} else {
			$(this).parent('span').parent('p').parent('li').removeClass('active');
		}
	});

	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 30,
		slidesPerGroup: 3,
		loop: true,
		loopFillGroupWithBlank: true,
		speed: 800,
		navigation: {
			nextEl: '.button-next',
			prevEl: '.button-prev',
		},
	});

	// 2023 2학기 초등개편 - 상세 검색
	$('.btnSrcDetail').on('click', function () {

		// 상세검색 팝업 열때 기존에 선택한 값이 있다면 재선택 처리해줘야함..
		$('#detailSearchLayer').toggleClass('on');

		if($('#detailSearchLayer').hasClass('on')) {

			resetCodeDepth1();
			resetCodeDepth2();
			resetCodeDepth3();

			$codeDepth2.hide();
			$codeDepth3.hide();

			// 이전에 선택한 상세검색 데이터가 있으면 선택되었던 데이터를 재선택해줌
			if (detailSearch.depth1.code != '') {
				$('#applyDetailSearchBtn').show();
				$.each($('input[name="depthCode1"]'), function (index, checkbox) {
					const $checkbox = $(checkbox);
					if ($checkbox.data('codeGroupId') == detailSearch.depth1.code) {
						$checkbox.prop('checked', true);
					}
				});
				$codeDepth2.show();
				$.each($codeDepth2.children('.code'), function (index, span) {
					const $span = $(span);
					if ($span.data('codeGroupId') == detailSearch.depth1.code) {
						$span.show();
						const $depth2Box = $span.find('input[type="checkbox"]');
						if ($depth2Box.val() == detailSearch.depth2.code) {
							$('input[name="depthCode2"]:checked').prop('checked', false);
							$depth2Box.prop('checked', true);
							if (detailSearch.depth1.code != '634') {
								$codeDepth3.show();
								let code3ListLength = 0;
								$.each($codeDepth3.children('.code'), function (index, span2) {
									const $span2 = $(span2);
									if ($span2.data('codeGroupId') == $depth2Box.val()) {
										$span2.show();

										const $depth3Box = $span2.find('input[type="checkbox"]');
										if ($depth3Box.prop('disabled') == false) {
											code3ListLength++;
										}
										if (detailSearch.depth3.length > 0) {
											let checked = false;
											for (const depthCode3 of detailSearch.depth3) {
												if (depthCode3.code == $depth3Box.val()) {
													$depth3Box.prop('checked', true);
													checked = true;
												}
											}
											if (checked == false) {
												$depth3Box.prop('checked', false);
											}
										} else {
											$depth3Box.prop('checked', false);
										}
									} else {
										$span2.hide();
									}
								});
								const $checkedList = $('input[name="depthCode3"]:checked');
								let allChecked = $('#chkData3_all').prop('checked');
								if ($checkedList.length - (allChecked ? 1 : 0) >= code3ListLength) {
									$('#chkData3_all').prop('checked', true);
								} else {
									$('#chkData3_all').prop('checked', false);
								}
							}
						}
					} else {
						$span.hide();
					}
				});
			} else if(detailSearch.keyword != '' && totCount > 0) {
				// 09.21 추가 요청 - 선택한 상세검색 항목이 없는 경우 값이 있는 항목중 첫번째 1depth만 선택해줌.
				$.each($depthCodeList1, function (index1, depth1) {
					const $depth1 = $(depth1);
					if($depth1.prop('disabled') == false) {
						$depth1.prop('checked', true);
						$.each($codeDepth2.children('.code'), function (index, span) {
							const $span = $(span);
							if($span.data('codeGroupId') == $depth1.val()) {
								$span.show();
							}
						});
						return false;
					}
				});
				$codeDepth2.show();
				$('#applyDetailSearchBtn').show();
			} else {
				$('input[name="depth1"]').prop('checked', false);
				resetCodeDepth2();
				resetCodeDepth3();
				$('#applyDetailSearchBtn').hide();
			}
		}
	});

	// 파일 타입 체크박스 변경 이벤트
	$('input[name="searchFileType"]').on('change', function () {
		getList(1);
	});

	// 상세검색 - Depth 1 변경 이벤트
	$('input[name="depthCode1"]').on('change', function () {
		const $checkedList = $('input[name="depthCode1"]:checked');
		resetCodeDepth2();
		resetCodeDepth3();
		$codeDepth3.hide();
		if ($checkedList.length > 0) {
			$('#applyDetailSearchBtn').show();
			const $this = $(this);
			$checkedList.prop('checked', false);
			$this.prop('checked', true);
			const depth1CodeGroupId = $this.data('codeGroupId');
			$.each($codeDepth2.children('.code'), function (index, span) {
				const $span = $(span);
				if ($span.data('codeGroupId') == depth1CodeGroupId) {
					$span.show();
				} else {
					$span.hide();
				}
			});
			$codeDepth2.show();
		} else {
			$('#applyDetailSearchBtn').hide();
			$codeDepth2.hide();
		}
	});

	$('input[name="depthCode2"]').on('change', function () {
		const $checkedList = $('input[name="depthCode2"]:checked');
		resetCodeDepth3();
		if ($checkedList.length > 0) {
			const $this = $(this);
			$checkedList.prop('checked', false);
			$this.prop('checked', true);
			const depth2CodelistId = $this.val();
			if (depth2CodelistId == '') {
				$codeDepth3.hide();
				return false;
			}
			if ($('input[name="depthCode1"]:checked').val() != '634') {

				$('#chkData3_all').prop('checked', false);
				$.each($codeDepth3.children('.code'), function (index, span) {
					const $span = $(span);
					if ($span.data('codeGroupId') == depth2CodelistId) {
						$span.show();
						if ($span.find('input[type="checkbox"]').prop('disabled') == false) {
							$span.find('input[type="checkbox"]').prop('checked', false);
						}
					} else {
						$span.hide();
					}
				});
				$codeDepth3.show();
			}

		} else {
			$codeDepth3.hide();
		}
	});

	$('input[name="depthCode3"]').on('change', function () {
		if ($(this).prop('id') == 'chkData3_all') {
			$('#codeDepth3 > span:visible > input[type="checkbox"]').prop('checked', $(this).prop('checked'));
		} else {
			const $checkedList = $('input[name="depthCode3"]:checked');
			const allChecked = $('#chkData3_all').prop('checked');
			let disabledCount = 0;
			let checkedCount = $checkedList.length;
			$.each($('#codeDepth3 > span:visible > input'), function (index3, code3) {
				if ($(code3).prop('disabled')) {
					disabledCount++;
				}
			})
			$.each($checkedList, function (index3, code3) {
				if ($(code3).prop('disabled')) {
					checkedCount--;
				}
			});

			if (checkedCount - (allChecked ? 1 : 0) >= $('#codeDepth3 > span:visible').length - disabledCount - 1) {
				$('#chkData3_all').prop('checked', true);
			} else {
				$('#chkData3_all').prop('checked', false);
			}
		}
	});

	// 상세검색 - 적용 버튼
	$('#applyDetailSearchBtn').on('click', function () {
		resetDetailSearchValue();
		$('#detailSearchFilter').empty();
		if ($('input[name="depthCode1"]:checked').length > 0) {
			for (let depth = 1; depth <= 2; depth++) {
				const $depth = $('input[name="depthCode' + depth + '"]:checked');
				detailSearch['depth' + depth] = {code: $depth.val(), name: $depth.siblings('label').text()};
				if ($depth.val() == null || $depth.val() == '') {
					break;
				}
			}

			detailSearch.depth3 = [];
			if ($('input[name="depthCode3"]:checked').length > 0) {
				$.each($('input[name="depthCode3"]:checked'), function (idx3, code3) {
					if ($(code3).val() != '' && $(code3).prop('disabled') == false) {
						detailSearch.depth3.push({code: $(code3).val(), name: $(code3).siblings('label').text()});
					}
				});
			}
		}
		renderDetailSearchFilter();
		resetSearchFileType();
		$('#detailSearchLayer').toggleClass('on');
		firstSearch = true;
		getList(1);
	});

	// 상세검색 - 취소 버튼
	$('#cancelDetailSearchBtn').on('click', function () {
		$('#detailSearchLayer').toggleClass('on');
	});

	// 상세검색 - 초기화 버튼
	$('#search-detail-reset-btn').on('click', function () {

		resetCodeDepth1();
		resetCodeDepth2();
		resetCodeDepth3();
		$codeDepth2.hide();
		$codeDepth3.hide();
		$('#applyDetailSearchBtn').hide();
		if(detailSearch.keyword != '' && totCount > 0) {
			// 09.21 추가 요청 - 선택한 상세검색 항목이 없는 경우 값이 있는 항목중 첫번째 1depth만 선택해줌.
			$.each($depthCodeList1, function (index1, depth1) {
				const $depth1 = $(depth1);
				if($depth1.prop('disabled') == false) {
					$depth1.prop('checked', true);
					$.each($codeDepth2.children('.code'), function (index, span) {
						const $span = $(span);
						if($span.data('codeGroupId') == $depth1.val()) {
							$span.show();
						}
					});
					return false;
				}
			});
			$codeDepth2.show();
			$('#applyDetailSearchBtn').show();
		}
	});

	// 검색창 밑 초기화 버튼 이벤트
	$('#detailSearchFilter').on('click', '.btnReset', function (e) {
		$('#applyDetailSearchBtn').hide();
		$('#detailSearchFilter').empty();
		resetDetailSearchValue();
		resetSearchFileType();
		resetCodeDepth1();
		resetCodeDepth2();
		resetCodeDepth3();
		$('input[name="photoKeyword"]').val('');
		$('#lbtype3').prop('disabled', false);
		$('#lbtype2').prop('disabled', false);
		$('#lbtype4').prop('disabled', false);
		$codeDepth2.hide();
		$codeDepth3.hide();
		firstSearch = true;
		getList(1);
	});

});


/**
 * 상세검색 설정값 초기화
 */
function resetDetailSearchValue() {
	for (let depth = 1; depth <= 2; depth++) {
		detailSearch['depth' + depth] = {code: '', name: ''};
	}
	detailSearch.depth3 = [];
	detailSearch.keyword = '';
}

/**
 * 상세검색 1뎁스 초기화
 */
function resetCodeDepth1() {
	$('input[name="depthCode1"]').removeAttr('checked');
}

/**
 * 상세검색 2뎁스 초기화
 */
function resetCodeDepth2() {

	$('input[name="depthCode2"]').removeAttr('checked');
	$('#chkData2_all').prop('checked', true);
	$('#codeDepth2 .code').hide();
}

/**
 * 상세검색 3뎁스 초기화
 */
function resetCodeDepth3() {

	$('input[name="depthCode3"]').removeAttr('checked');
	$('#chkData3_all').prop('checked', false);
	$('#codeDepth3 .code').hide();
}

/**
 * 파일 타입 체크박스 초기화
 */
function resetSearchFileType() {
	$('input[name="searchFileType"]').removeAttr('checked');
}

function renderDetailSearchFilter() {

	let text = '';
	$('#detailSearchFilter').empty();
	if(detailSearch['depth1'].code == null || detailSearch['depth1'].code == '') {
		return false;
	}
	for (let i = 1; i <= 2; i++) {
		if (detailSearch['depth' + i].name != null && detailSearch['depth' + i].name != '') {
			text += (i > 1 ? ' > ' + detailSearch['depth' + i].name : detailSearch['depth' + i].name);
		}
	}
	if (detailSearch.depth3.length > 0) {
		text += " > ";
		const depth3NameList = [];

		let allChecked = $('#chkData3_all').prop('checked');
		if (allChecked) {
			text += "전체"
		} else {
			for (const depth3 of detailSearch.depth3) {
				depth3NameList.push(depth3.name);
			}
			text += depth3NameList.join(', ');
		}
	}
	const $html = $('<p class="txt">' + text + '</p><button type="button" class="btnReset">초기화</button>');
	$('#detailSearchFilter').append($html);
}


function popBookmark(obj, val) {
	if (val == 0) {
		$("#" + obj).css("height", "auto");
		$("#" + obj).css("display", "none");
		bgLayerClose();
	} else {
		$("#" + obj).css({"display": "block"});
		bgLayerH();
	}
}

function popup() {
	var popup = $('.alarm_wrap .popup_desc_wrap'),
		popOn = $('.alarm_wrap .popup_type01'),
		popCloz = $('.alarm_wrap .popup_close');

	popup.hide();
	popOn.click(function () {
		$(this).addClass('on');
		popup.show();
	});
	popCloz.click(function () {
		popOn.removeClass('on');
		popup.hide();
	});
}

//자료 요청 게시판 바로가기 및 로그인 체크
function goSupportQuestion() {
	if (!window.globals.login) {
		Layer.openLayerLogin(function () {
			$('.dimmed').hide();
			window.open("/support/question/form");
		});
	} else {
		window.open("/support/question/form");
	}
}

function downloadPopup(target) {
	var $target = $(target);
	var contentId = $target.data('content');
	var downyn = $target.data('downyn');
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId, downyn);

}

// 통합뷰어 팝업 오픈
function viewDataContents(target) {

	var $target = $(target);
	var contentId = $target.data('content');
	var contentGubun = $target.data('contentGubun');
	var fileType = $target.data('file');
	var siteUrl = $target.data('siteUrl');

	// ZIP 컨텐츠는 새창으로 띄워주기
	if (fileType == 'FT207') {
		// FT359	iPDF (복합파일(ZIP)
		if (mediaType == 'FT359') {
			Popup.openSimpleSViewer(siteUrl);
			return false;
		}
		// FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
		if (mediaType == 'FT360') {
			Popup.openHtmlViewer(siteUrl);
			return false;
		}
	}
	Popup.openViewerMain(contentId, contentGubun);

}

function checkBoxAll() {

	$("input[name=cbchannel]:checkbox").each(function () {
		if ($("#chk_all").is(":checked")) {
			$(this).prop("checked", true);
			$(this).parent('span').parent('p').parent('li').addClass('active');
		} else {
			$(this).prop("checked", false);
			$(this).parent('span').parent('p').parent('li').removeClass('active');
		}
	});
	ccnthtml();
}

function ccnthtml() {
	var iloop = 0;

	$("input[name=cbchannel]:checked").each(function () {
		var totLength = $('input[name="cbchannel"][id!="chk_all"]').length;
		var chkLength = $('input[name="cbchannel"][id!="chk_all"]:checked').length;

		if (totLength == chkLength) $('input[id="chk_all"]').prop('checked', true);
		else $('input[id="chk_all"]').prop('checked', false);
		iloop++;
	});

	$("#ccnt").html(iloop)
}

function allDown() {
	var contentId = "";
	var iLoop = 1;
	$("input[name=cbchannel]:checked").each(function () {

		if (iLoop > 1) {
			contentId += ",";
		}

		contentId += $(this).val();
		iLoop++;
	});

	if (contentId == "") {
		alert("자료를 선택해 주세요.")
		return;
	}

	Popup.openFileDownloadDext(contentId);

}


function insertFolderChk(target) {
	var $target = $(target);
	var contentId = $target.data('content');
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'LIBRARY',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});
}

// 탭 컨텐츠 담기 이벤트
function allBookMark() {
	var contentId = "";
	var iLoop = 1;
	$("input[name=cbchannel]:checked").each(function () {

		if (iLoop > 1) {
			contentId += ",";
		}

		contentId += $(this).val();
		iLoop++;
	});

	if (contentId == "") {
		alert("자료를 선택해 주세요.")
		return;
	}

	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'LIBRARY',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});

}

function getList(curPage) {

	var $tabConts = null;
	$tabConts = $('#contsTotal');

	const parameter = {
		type1: type1,
		title: title,
		photoKeyword: $('input[name=photoKeyword]').val() == null ? '' : $('input[name=photoKeyword]').val(),
		searchSelect: $('input[name=searchSelect]').val() == null ? '' : $('input[name=searchSelect]').val(),
		page: curPage != '' ? curPage : 1
	}
	detailSearch.keyword = parameter.photoKeyword;
	const isFirstSearch = parameter.page == 1;

	// 파일 타입 필터링을 체크한 경우, 파라미터에 추가
	const $checkedFileTypeList = $('input[name="searchFileType"]:checked');
	if ($checkedFileTypeList.length > 0) {
		parameter.searchFileTypeList = [];
		$.each($checkedFileTypeList, function (index, fileType) {
			const TYPE = $(fileType).val();
			if (TYPE === 'img') {
				parameter.searchFileTypeList.push('FT203');
			} else if (TYPE === 'mov') {
				parameter.searchFileTypeList.push('FT201');
			} else if (TYPE === 'doc') {
				parameter.searchFileTypeList.push('FT205');
				parameter.searchFileTypeList.push('FT207');
			}
		});
	}

	// -------------------- 상세검색 파라미터 생성 (Optional)

	// 1depth
	if (detailSearch.depth1.code != null && detailSearch.depth1.code != '') {

		if(detailSearch.depth1.code == 304) { parameter.searchLibraryType = 'img'}
		else if(detailSearch.depth1.code == 600) { parameter.searchLibraryType = 'art'}
		else { parameter.searchLibraryType = 'material'}

		parameter.depthCode2 = detailSearch.depth2.code == '' ? null : detailSearch.depth2.code;
		parameter.depthCode3 = [];
		if (detailSearch.depth3.length > 0) {
			for (const depth3 of detailSearch.depth3) {
				parameter.depthCode3.push(depth3.code);
			}
		}
	}

	if (firstSearch) {
		if (parameter.photoKeyword != null && parameter.photoKeyword != '') {
			getTypeListCount(parameter);
		} else {
			$depthCodeList1.prop('disabled', false);
			$depthCodeList2.prop('disabled', false);
			$depthCodeList3.prop('disabled', false);
			$('input[name="searchFileType"]').prop('disabled', false);
		}
	}
	getListCountInfo(curPage, parameter);
	$('#library-ajax-loading').show();
	// --------------------
	Ajax.execute({
		url: '/library/list',
		data: parameter,
		type: 'get',
		loading: false,
		dataType: 'html',
		success: function (response) {
			if (isFirstSearch) {
				$tabConts.find('.data_list ul').empty();
			}

			// 리스트 처리
			var html = $(response).find('ul').html();
			$tabConts.find('.data_list ul').append(html);
			if (isFirstSearch) {
				if ($tabConts.find('.data_list li').length == 0) {
					var photoKeyword = $('input[name=photoKeyword]').val() || $('#detailSearchFilter .txt').text();
					$('.nodata').find('span').text(photoKeyword);
					$('.nodata').show();
				} else {
					$('.nodata').hide();
				}
			}

			$('#library-ajax-loading').hide();
		}
	});
};

function getListCountInfo(curPage, parameter) {

	var $tabConts = null;
	$tabConts = $('#contsTotal');

	Ajax.execute({
		url: '/library/list/cnt.json',
		data: parameter,
		type: 'get',
		loading: false,
		dataType: 'json',
		success: function (response) {

			response = response.response;
			// 상세검색으로 나온 결과에 맞춰서 분류 선택 - 선택이나 키워드가 있는 경우에만 분류 선택 연동
			if (firstSearch && ((parameter.searchLibraryType != null && parameter.searchLibraryType != '') || (parameter.photoKeyword != null && parameter.photoKeyword != ''))) {
				$('#lbtype3').prop('checked', response.imgCount > 0);
				$('#lbtype2').prop('checked', response.movCount > 0);
				$('#lbtype4').prop('checked', response.docCount > 0);
				$('#lbtype3').prop('disabled', response.imgCount == 0);
				$('#lbtype2').prop('disabled', response.movCount == 0);
				$('#lbtype4').prop('disabled', response.docCount == 0);


			}
			firstSearch = false;
			// 더보기 남은 갯수 표시 처리
			if ($('input[name="searchFileType"]:checked').length == 0) {
				totCount = response.count;
			} else {
				totCount = 0;
				totCount += $('#lbtype3').prop('checked') ? response.imgCount : 0;
				totCount += $('#lbtype2').prop('checked') ? response.movCount : 0;
				totCount += $('#lbtype4').prop('checked') ? response.docCount : 0;
			}


			var listCount = curPage * 20;
			var moreCount = Number(totCount) - Number(listCount);
			$tabConts.find('.btn-more span').text("(" + moreCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ")");
			// 더보기 버튼 노출/숨김 처리
			if (moreCount <= 0) {
				$tabConts.find('.btn-more').hide();
			} else {
				$tabConts.find('.btn-more').show();
			}

			// 리스트 헤더 타이틀 처리
			var name = title != null ? title : '전체';

			var headerTitle = '<h3>' + name + '<span>(' + totCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ')</span></h3>';
			$('#headerTitle').empty().append(headerTitle);
			page = curPage;
		}
	});
}

function getTypeListCount(parameter) {

	Ajax.execute({
		url: '/library/type/cnt.json',
		data: parameter,
		type: 'get',
		loading: false,
		dataType: 'json',
		success: function (response) {

			response = response.response;
			$depthCodeList1.prop('disabled', true);
			$depthCodeList2.prop('disabled', true);
			$depthCodeList3.prop('disabled', true);

			$('#chkData2_all').prop('disabled', false);
			$('#chkData3_all').prop('disabled', false);

			if(response == null || response.length == 0) {
				return false;
			}
			$.each(response, function (index, item) {

				if (item.count > 0) {
					// 1depth 처리
					$.each($depthCodeList1, function (i, depth1) {
						if ($(depth1).data('searchLibraryType') == item.libraryType) {
							$(depth1).prop('disabled', false);
						}
					});

					// 2depth 처리
					$.each($depthCodeList2, function (i, depth2) {
						if ($(depth2).val() == item.type1) {
							$(depth2).prop('disabled', false);
						}
					})

					// 3depth 처리
					$.each($depthCodeList3, function (i, depth3) {
						if ($(depth3).val() == item.type2) {
							$(depth3).prop('disabled', false);
						}
					})
				}
			});


		}
	});
}

function isDuringLoading() {
	return $('#library-ajax-loading:visible').length > 0;
}