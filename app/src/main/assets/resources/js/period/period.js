var _gaCourse = "";
var _gaHak = "";
var _filterData = ""; // 내 저장차시 필터용 데이터 json
var _allMyPeriod = "";
var _isViewer = false;

if (_gaString.length >= 2) {
	_gaHak = _gaString[0];
	_gaCourse = _gaString[1];
}

var _tocData = "";
var _isMobile = false;

// 페이징 전역변수
var _resultCnt = 0;
var _sMode = "vivasam";
var _sWord = "";
var _sPageno = 1;
var _ing = false;
var _noMore = false;
var ie = false;
var isTitleChange = false;
var PERIOD_VIEWER_INDEX = 1;

$(function () {


	_isMobile = fnMobile();

	//모바일 구분
	if (_isMobile) {
		//모바일에서 드래그 영역 터치시, 버튼은 click을 발생시킴
		$("#pkg,#recommendDataResult,#searchDataResult,#myDataResult").on('touchstart', 'button', function () {
			$(this).click();
		});
		//다운로드 제거
		$(".btn_down").hide();
	} else {
		//팝업 리사이즈
		if ($("#resize") == "Y") {
			window.resizeTo(window.screen.availWidth, window.screen.availHeight);
		}
	}

	// 2022-11-28 차시창 이용안내 디폴트 OFF
	// if (!$.cookie('periodGuideNoshow')) {
	// 	toggleGuide();
	// } else {
	// 	$("#noshow").prop("checked", true);
	// }

	window.onload = function () {
		if (hasMyPeriodToc && !(location.search.indexOf("my") > 0)) {
			if (confirm("저장된 차시가 있습니다.\n저장된 차시를 불러오시겠습니까?")) {
				$("#pkg").load("/period/memberToc", {
					memberId: window.globals.member.memberId,
					periodId: _periodId
				}, function () {
					setSortData();
					_tocData = setTocData();
					isMyscrap("save");
					setTitle();
				});
			} else {
				hasMyPeriodToc = false;
			}
		} else if (hasMyPeriodToc && location.search.indexOf("my") > 0) {
			isMyscrap("save");
		}
	}

	$('.btn_close').click(function () {

		$(".current_period_menu").text("내 차시");

		$('.pop_chasi').hide();
		$('.dimmed2').hide();
		$('.btn_chasi_slide').removeClass('on');
		$('#btn_myprogress').removeClass('on');
		$('#btn_savechasi').removeClass('on');
	});

	// 내 차시 드롭 박스
	$('#btn_mychasi').on('click', function(){
		$(this).toggleClass('on');
		$(this).next('.my_chasi_menu').toggleClass('on');
	});

	// 내 저장 차시
	$('#btn_savechasi').click(function () {
		return false;

		$(".current_period_menu").text("내 저장 차시");

		$(this).toggleClass('on');

		$('.my_chasi_menu').removeClass('on');
		$('#btn_mychasi').removeClass('on');

		if ($("#allChasi").hasClass("on")) {
			$('#pop_all_chasi').hide();
			$("#allChasi").removeClass("on");
		}

		if ($("#btn_myprogress").hasClass("on")) {
			$('#pop_myprogress').hide();
			$("#btn_myprogress").removeClass("on");
		}

		if ($('#btn_savechasi').hasClass('on')) {

			callMySavedPeriodList({}, function () {

				$('#pop_mysave').show();
				$('.dimmed2').show().css('top', '80px');

				var textbookSelectBox = $("#textbookSel");
				var unit1SelectBox = $("#unit1Sel");

				textbookSelectBox.empty().append("<option value=''>교과서 선택</option>");
				unit1SelectBox.empty().append("<option value=''>대단원 선택</option>");
				// 이상하게 IE에서 최초에 select2 선택된 기본 텍스트가 안보임
				textbookSelectBox.val("");
				unit1SelectBox.val("");

				if (_filterData) {
					_filterData = JSON.parse($("#myPeriodDataResultJson").val());
				} else {
					_filterData = JSON.parse($("#myPeriodDataResultJson").val());
					_allMyPeriod = JSON.parse($("#myPeriodDataResultJson").val());
				}

				$.each(JSON.parse($("#myPeriodDataForFilter").val()), function (index, data) {
					textbookSelectBox.append("<option value='" + data.textbook + "'>" + data.labTextbook + "</option>");
				});

				var duplCheckArr = [];

				$.each(_allMyPeriod, function (index, data) {
					duplCheckArr.push(data.unit1);
				});

				const uniqueArr = duplCheckArr.filter(function (element, index) {
					return duplCheckArr.indexOf(element) === index;
				});

				$.each(uniqueArr, function (index, v) {

					for (var i = 0; i < _allMyPeriod.length; i++) {
						if (v == _allMyPeriod[i].unit1) {
							unit1SelectBox.append("<option value='" + _filterData[i].unit1 + "'>" + _filterData[i].cnm + "</option>");
							break;
						}
					}
				})
			});
		} else if (!$('#btn_savechasi').hasClass('on')) {
			$('#pop_mysave').hide();
			if (!$("#allChasi").hasClass("on")) {
				$('.dimmed2').hide();
			}
			if (!$("#btn_myprogress").hasClass("on")) {
				$('.dimmed2').hide();
			}
		}
	});

	// 전체 차시
	$('#allChasi').click(function () {
		return false;
		$(this).toggleClass('on');

		if ($("#btn_savechasi").hasClass("on")) {
			$('#pop_mysave').hide();
			$('#pop_myprogress').hide();
			$("#btn_savechasi").removeClass("on");
		}

		if ($("#btn_myprogress").hasClass("on")) {
			$('#pop_myprogress').hide();
			$("#btn_myprogress").removeClass("on");
		}

		if ($('#allChasi').hasClass('on')) {
			$('#pop_all_chasi').show();
			$('.dimmed2').show().css('top', '80px');
		} else if (!$('#allChasi').hasClass('on')) {
			$('#pop_all_chasi').hide();
			if (!$("#btn_savechasi").hasClass("on")) {
				$('.dimmed2').hide();
			}
		}
	});
	// 내 진도 차시
	$('#btn_myprogress').click(function () {

		$(".current_period_menu").text("내 진도 차시");

		$(this).toggleClass('on');

		$('.my_chasi_menu').removeClass('on');
		$('#btn_mychasi').removeClass('on');

		if ($("#btn_savechasi").hasClass("on")) {
			$('#pop_mysave').hide();
			$('#pop_myprogress').hide();
			$("#btn_savechasi").removeClass("on");
		}

		if ($("#allChasi").hasClass("on")) {
			$('#pop_all_chasi').hide();
			$("#allChasi").removeClass("on");
		}

		if ($('#btn_myprogress').hasClass('on')) {

			callMyProgressPeriodList({}, function () {
				$('#pop_myprogress').show();
				$('.dimmed2').show().css('top', '80px');
			});

		} else if (!$('#btn_myprogress').hasClass('on')) {
			$('#pop_myprogress').hide();
			if (!$("#btn_savechasi").hasClass("on")) {
				$('.dimmed2').hide();
			}
			if (!$("#allChasi").hasClass("on")) {
				$('.dimmed2').hide();
			}
		}
	});


	// 전체차시보기 현재값을 복사해놓음
	$("#myCourse").html($("#searchCourse").html());

	$('.tip_edit').click(function () {
		$('.edit').show();
		$('.tit_view').hide();
	});

	$('.btn_enter').click(function () {

		isTitleChange = true;

		$("#periodTitle").text($("#periodTitleHolder").val());
		hasMyPeriodToc = false;
		saveTocList();

		$('.edit').hide();
		$('.tit_view').show();
	});

	$('.btn_cancel').click(function () {
		$('.edit').hide();
		$('.tit_view').show();
		$("#periodTitleHolder").val($("#periodTitle").text());
	});

	$('.addlayer > .btn_close').click(function () {
		$('.addlayer').hide();
	});

	Period.init();

	_tocData = setTocData();
	setSortData();
	draggable("subData");
	draggable("recommendDataResult");

	if (isPreview) {
		$(".pop_chasiguide").hide();
	}

	// 자료 부가설명 개행 처리
	$(".newLineArea").each(function () {
		$(this).html($(this).html().replaceAll('\n', '<br/>'));
	});

	var tabMenu = $(".tab_menu:not(.tab_menu_event_ignore) li a"),
		tabPanel = $(".tab_conts");
	tabMenu.click(function(e) {
		e.preventDefault();
		var current = $(this).attr("href");
		tabPanel.hide().removeClass('on');
		$(current).show().addClass('on');

		tabMenu.parent().removeClass("on")
		$(this).parent().addClass("on");
	});

	// 비바샘 수업도움자료 탭스와이프
	var swiper1 = new Swiper('.recomTabSwiper1', {
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.btn_recom_next',
			prevEl: '.btn_recom_prev',
		},
		observer: true,
		observeParents: true,
	});
	// 비바샘 담은자료 탭스와이프
	var swiper2 = new Swiper('.recomTabSwiper2', {
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.btn_recom_next2',
			prevEl: '.btn_recom_prev2',
		},
		observer: true,
		observeParents: true,
	});

	//수업도움자료 탭
	$(".rcmdSubTypeArea").click(function () {
		$(".rcmdSubTypeArea").removeClass("on");
		$(this).addClass("on");
		var rcmdSubType = $(this).data("rcmd-sub-type");
		var rcmdArea = $("#recommendDataResult");
		if (rcmdSubType === 'ALL') {
			rcmdArea.children('div').css("display", "");
		} else {
			rcmdArea.children('div').css("display", "none");
			rcmdArea.children('div[data-content-sub-type-cd="'+rcmdSubType+'"]').css("display", "");
		}
	});
	//담은자료 탭
	$(document).on("click", ".rcmdSubTypeArea2", function () {
		$(".rcmdSubTypeArea2").removeClass("on");
		$(this).addClass("on");
		var rcmdSubType2 = $(this).data("rcmd-sub-type");
        var rcmdArea2 = $("#myDataResult");
        if (rcmdSubType2 === 'ALL' ) {
            rcmdArea2.children('div').css("display", "");
        } else {
			rcmdArea2.children('div').css("display", "none");
			rcmdArea2.children('div[data-folder-id="'+rcmdSubType2+'"]').css("display", "");
		}
	});

	// 컨텐츠 다운로드
	$('.btn-download').click(function () {
		return false;

		var data = $(this).data();
		var content = data.content + '';
		var fileType = data.fileType;
		var mediaKind = data.mediatype;
		var url = data.url;
		if (!content) {
			alert('자료가 없습니다.');
			return false;
		}

		// pdf 설치안내 레이어를 보여줌...
		if (fileType == 'FT212' || (fileType == 'FT207' && mediaKind == 'FT359')) {

			// FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
			Layer.openLayer({
				url: '/textbook/pdf.popup',
				callback: function () {
					setTimeout(function () {
						Popup.openFileDownloadDext(content);
					}, 1000);
				}
			});

		} else {
			if (mediaKind == 'FT360') {

				if (!window.globals.login) {
					location.href = '/member/login';
					alert('로그인해주세요.');
					return false;
				} else {
					Popup.openHtmlViewer(url);
					return false;
				}

			} else {
				// 새창으로 다운로드 호출
				Popup.openFileDownloadDext(content);
			}


		}
	});
});

// 정렬 세팅
function setSortData() {
	return false;
	$("div.ui-sortable").sortable({
		connectWith: "div.ui-sortable",
		// items: ".wrap_chasi",
		containment: "#pkg",
		cancel: ".sTitle",
		// placeholder: "ui-sortable-placeholder",
		revert: true,
		axis: "Y",
		start: function (event, ui) {
			// console.log($(ui.helper));
			// console.log($(ui.placeholder));
			// $(".ui-sortable-placeholder").
			// console.log($(".ui-sortable-placeholder"));
			if ($(".ui-sortable-placeholder").length > 1) {
				$($(".ui-sortable-placeholder")[0]).remove();
			}
		},
		stop: function (event, ui) {

			// console.log($(ui.placeholder));

			// 드래그 해서 놓았을때의 위치에 해당하는 단원tocNo
			var parTocNo = $($(ui.item).prevAll(".sTitle:first")).attr("data-tocNo");
			var compareId = parTocNo + '-' + $(ui.item).attr("data-gubun") + '-' + $(ui.item).attr("data-id"); //드래그 한 div의 컨텐츠정보

			// 꾸러미에 있는컨텐츠들
			var isExist = false;
			var existId = "";

			$(ui.item).siblings().each(function () {
				if (!($(this).hasClass("ui-sortable-helper") || $(this).hasClass("ui-sortable-placeholder"))) {
					parTocNo = $($(this).prevAll(".sTitle:first")).attr("data-tocNo");
					existId = parTocNo + '-' + $(this).attr("data-gubun") + '-' + $(this).attr("data-id");

					if (compareId === existId) {
						alert("이미 담긴 자료입니다.");
						isExist = true;
						$(ui.item).remove();
						return false;
					}
				}
			});
			$(ui.item).find(".btn_share").show();
			if(!isExist) {
				isMyscrap("change");
			}
		}
	});
}

//드래그 이벤트
function draggable(id) {
	return false;
	$("#" + id + " .drag").draggable({
		connectToSortable: ".ui-sortable",
		cancel: ".handle_module, .btn_del",
		helper: "clone",
		revert: "invalid",
		start: function (event, ui) {
			// $(ui.helper).css("width", 'auto');
			$(this).addClass("selector");
		},
		stop: function (event, ui) {
			$(this).removeClass("selector");
			$(ui.helper).css("width", 'auto');
		}
	});
}

// 차시 이동
function movePeriod(pId, action) {
	return false;

	if (pId === "") {
		if (action === "prev") {
			alert("해당 교과서의 첫 차시입니다.");
		} else if (action === "next") {
			alert("해당 교과서의 마지막 차시입니다.");
		}
		return;
	}/* else {
		if(pId === '105713' || pId === '105741' || pId === '105743' //수학 5-1(신항균) 4,5,6 단원 막기
			|| pId === '105483' //사회 5-1(설규주) 2 단원 막기
			|| pId === '105516' //사회 5-1(김현섭) 2 단원 막기
			|| pId === '105770' || pId === '105794' || pId === '105796' //수학 6-1(신항균) 4,5,6 단원 막기
			|| pId === '105548' //사회 6-1(설규주) 2 단원 막기
			|| pId === '105582' //사회 6-1(김현섭) 2 단원 막기
		){
			alert("2월 중 오픈됩니다.");
			return;
		}
	}*/

	location.href = "/period/package.popup?periodId=" + pId + "&lnbCode=" + _lnbCode;
}

// 차시꾸러미에서 항목 삭제
function delToc(obj) {
	return false;
	if (confirm("차시꾸러미에서 삭제하시겠습니까?")) {
		$(obj).parent().parent().parent().remove();
		// deletePeriodTocBlankHeader();
		isMyscrap("change");
	}
}

// 차시 목차 차례 항목에 아무것도 없을 경우 차례 제목 삭제 처리
function deletePeriodTocBlankHeader() {
	/*$("#pkg > div").each(function () {
		if ($(this).children().length == 1) {
			$(this).remove();
		}
	});*/
}

function toggleGuide() {
	$(".pop_chasiguide").toggle();
	$('.btn_chasi_slide').removeClass('on');
	$('.pop_chasi').hide();
	$('.dimmed2').hide();
}

function noshowGuide() {
	if ($("#noshow").is(":checked")) {
		$.cookie('periodGuideNoshow', true, {expires: 365, path: '/'});
	} else {
		$.removeCookie('periodGuideNoshow', {path: '/'});
	}
}

// 뷰어
function popPeriodViewer(object, _contentId, _contentGubun, _tocNo) {
	return false;
	
	var curPeriod = $(object);
	var isAuthorized = curPeriod.data('isauthorized');
	var contentId = curPeriod.data('contentid');
	var contentGubun = curPeriod.data('contentgubun');
	var tocNo = curPeriod.data('tocno');
	var fileType = curPeriod.data('filetype');
	var mediaKind = curPeriod.data('mediakind');
	var siteUrl = curPeriod.data('siteurl');
	var periodId = curPeriod.data('periodid');

	if (object === null) {
		contentId = _contentId;
		contentGubun = _contentGubun;
		tocNo = _tocNo;
	}

	if (isAuthorized !== undefined && !isAuthorized) {
		alert('정회원만 이용가능합니다.');
		return;
	}

	var availWidth = window.screen.availWidth;
	var availHeight = window.screen.availHeight;
	var browserLeftPos = window.screenLeft || window.screenX;
	var availLeft = window.screen.availLeft !== undefined ? window.screen.availLeft : browserLeftPos > availWidth ? availWidth : 0;
	var availTop = window.screen.availTop !== undefined ? window.screen.availTop : 0;

	if (tocNo === '') { //개별뷰어
		if(fileType === 'FT207' && (mediaKind !== 'FT359' && mediaKind !== 'FT360' && mediaKind !== 'FT361' && mediaKind !== 'subData')) {
			alert('본 자료는 파일이 함께 있어야 하는 압축(zip) 형태로 제공해 드리며, 미리보기는 제공되지 않습니다.');
			return;
		}

		if (contentGubun === 'UTUBE' || fileType === 'FT206' || fileType === 'FT207') {

			if (fileType === 'FT206' && siteUrl) {
				contentId = getYoutubeId(siteUrl);
				contentGubun = "UTUBE";
			}

			Popup.openWindow({
				name: "컨텐츠 뷰어" + PERIOD_VIEWER_INDEX++,
				url: "//" + location.host + '/period/content.popup?contentGubun=' + contentGubun + '&contentId=' + contentId + '&lnbCode=' + _lnbCode,
				fullscreen: true
			});
		} else if (fileType === 'TOOL') {
			Popup.openWindow({
				name: "컨텐츠 뷰어" + PERIOD_VIEWER_INDEX++,
				url: "//" + location.host + '/period/tool.popup?contentGubun=' + contentGubun + '&contentId=' + contentId + '&lnbCode=' + _lnbCode + '&periodId=' + periodId,
				fullscreen: true
			});
		} else {
			Popup.openViewerMain(contentId, contentGubun, '', '', PERIOD_VIEWER_INDEX++);
		}
	} else { //통합뷰어
		var data = setTocData();
		if (data === _tocData) {
			var url = '/period/total.popup?periodId=' + _periodId + '&tocNo=' + tocNo + '&contentGubun=' + contentGubun + '&contentId=' + contentId + '&lnbCode=' + _lnbCode + '&hasMyPeriodToc=' + hasMyPeriodToc;
			var options = 'top=' + availTop + ',left=' + availLeft + ',width=' + availWidth + ',height=' + availHeight + ',screenX=' + availLeft + ',screenY=' + availTop + ',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';

			var popPeriodViewer = window.open(url, "popPeriodViewer" + PERIOD_VIEWER_INDEX++, options);
			if (window.focus) {
				popPeriodViewer.focus();
			}
			if (!isStartPeriod) { // 최근본 차시 저장
				saveRecentlyView();
				opener.periodTitleHighlight(_periodId);
				isStartPeriod = true;
			}
		} else {
			if (confirm("먼저 편집중인 차시꾸러미를 저장해주세요.\n저장하시겠습니까?")) {
				callUpdateMemberToc({
					periodId: _periodId,
					memberId: window.globals.member.memberId,
					tocListStr: data,
					periodName: $("#periodTitle").text().trim() || $("#periodName").val()
				}, function () {
					_tocData = data;
					setSortData();
					setTitle();
					isMyscrap("save");
					alert("저장되었습니다.");

					if (!isStartPeriod) { // 최근본 차시 저장
						saveRecentlyView();
						opener.periodTitleHighlight(_periodId);
						isStartPeriod = true;
					}
				});
			}
		}
	}

}

// 차시목록 저장
function saveTocList() {
	return false;

	if ($("#pkg > div").length == 0) {
		alert("차시 꾸러미에 최소한 1개 이상의 자료가 있어야 합니다.");
		return;
	}

	var data = setTocData();
	/*if (data == _tocData && !isTitleChange) {
		alert("편집 내역이 없습니다.\n차시 꾸러미를 편집 후 저장해 주세요.");
		return;
	}*/

	if(hasMyPeriodToc) {
		if (confirm("해제 하시겠습니까?")) {
			_tocData = setTocData();
			setSortData();
			isMyscrap("none");
			setTitle();
		}
	} else {
		if (confirm("저장 하시겠습니까?")) {
			_tocData = data;
			setSortData();
			setTitle();
			isMyscrap("save");
		}
	}
}

// 제목 세팅
function setTitle() {
	$("#periodTitle").text($("#periodName").val());
	$("#periodTitleHolder").val($("#periodName").val());
	isTitleChange = false;
}

// 차시 초기화
function resetTocList() {
	return false;
	if (confirm("편집하신 꾸러미를 초기화 하시겠습니까?")) {
		callUpdateMemberToc({periodId: _periodId}, function () {
			_tocData = setTocData();
			setSortData();
			isMyscrap("none");
			setTitle();
		});
	}
}

// 목차데이터 set
function setTocData() {

	var parTocNo = 0;
	var tocNo = 0;
	var data = [];
	var level = "";

	$("#pkg").children().each(function (i, obj) {
		$(obj).children().each(function (i, obj) {
			if ($(obj).hasClass("sTitle")) {
				//바로앞의 목차에 아무 컨텐츠가 없으면 저장안함
				if (level == "1") {
					data.splice(data.length - 1);
				} else {
					level = "1";
					parTocNo = ++tocNo;
				}
				data.push(level
					+ "," + (parTocNo) //
					+ "," + (tocNo)
					+ "," + $(obj).attr("data-cd")
					+ ","
					+ ","
					+ ",Y");
			} else {
				level = "2";
				var gubun = $(obj).attr("data-gubun");
				if(gubun != undefined && gubun == "RCMDUTUBE") {
					gubun = gubun.replace("RCMDUTUBE", "UTUBE");
				}
				data.push(level
					+ "," + (parTocNo) //
					+ "," + (++tocNo)
					+ ","
					+ "," + $(obj).attr("data-id")
					+ "," + gubun
					+ "," + $(obj).attr("data-tmplt"));
			}
		});
	});

	//마지막에는 level 1 이 올 수 없음
	if (level == "1") {
		data.splice(data.length - 1);
	}

	return data.join("|");
}

// 차시 저장 call
function callUpdateMemberToc(param, cb) {

	if (param.tocListStr && param.tocListStr.indexOf("&feature=youtu.be") > 0) {
		param.tocListStr = param.tocListStr.replace("&feature=youtu.be", "");
	}
	$("#pkg").load("/period/updateMemberToc", param, cb);
}

// 차시 시작
function startPeriod() {

	var data = setTocData();
	if (data != _tocData) {
		if (confirm("먼저 편집중인 차시꾸러미를 저장해주세요.\n저장하시겠습니까?")) {
			callUpdateMemberToc(
				{
					periodId: _periodId,
					memberId: window.globals.member.memberId,
					tocListStr: data,
					periodName: $("#periodTitle").text().trim() || $("#periodName").val()
				}, function () {
					_tocData = data;
					setSortData();
					isMyscrap("save");
					setTitle();
					alert("저장되었습니다.");

					var firstPeriod = _tocData.split("|")[1].split(",");
					popPeriodViewer(null, firstPeriod[4], firstPeriod[5], 2);
					// if (!isStartPeriod) { // 최근본 차시 저장
					// 	saveRecentlyView();
					// 	opener.periodTitleHighlight(_periodId);
					// 	isStartPeriod = true;
					// }
				});
		}
	} else {
		var firstPeriod = _tocData.split("|")[1].split(",");
		popPeriodViewer(null, firstPeriod[4], firstPeriod[5], 2);
		// if (!isStartPeriod) { // 최근본 차시 저장
		// 	saveRecentlyView();
		// 	opener.periodTitleHighlight(_periodId);
		// 	isStartPeriod = true;
		// }
	}
}

// 검색어 길이 체크
function checkSearchText() {
	if ($("#searchWord").val().length > 20) {
		alert("검색어는 20자 이내로 입력 가능합니다.");
		$("#searchWord").val($("#searchWord").val().substr(0, 20));
	}
}

// 자료검색
function searchData() {

	$("#searchTab").click();

	var regExp = /[\,|\'\"]/gi

	if ($.trim($("#searchWord").val()) == "") {
		alert("검색어를 입력해 주세요.");
		$("#searchWord").focus();
		return;
	} else if (regExp.test($("#searchWord").val())) {
		alert("검색할 수 없는 특수문자( | , \\ ' \" )가 포함되어 있습니다.");
		$("#searchWord").focus();
		return;
	}

	//spin
	// $(".frame.right").append().spin('main');

	var searchType = $("input[name=searchType]:checked").val();
	var searchWord = $.trim($("#searchWord").val());

	var param = {channel: "search",
				type1: searchType,
				word: searchWord,
				pageSize: 8,
				pageNo: 1};

	$('#pop-ajax-loading').show();
	Ajax.execute({
		type: "POST",
		url: "/period/search.html",
		dataType: "html",
		cache: false,
		async: true,
		loading: false,
		data: param,
		success: function (data) {

			$("#searchDataResult").empty();
			$("#searchDataResult").append(data);

			_resultCnt = $("#searchDataResult").children("div").length;

			if (_resultCnt == 0) {
				$("#searchDataResult").append('<div class="nodata"><span>검색 결과가 없습니다.</span></div>');
			} else {

				draggable("searchDataResult");

				//더보기세팅
				_sMode = searchType;
				_sWord = searchWord;
				_sPageno = 1;
				_noMore = false;

				if ((_resultCnt % 8) == 0) {
					$("#searchDataResult").append('<a href="javascript:void(0);" class="btn_more" onClick="moreSearchData()"><span>더보기</span></a>');
				}
			}

			//$("#searchTitle").html((searchType == "utube" ? "유튜브" : "비바샘") + "자료 <span>(" + _resultCnt + "건)</span>");
			// 자료건수 영역 제거
			$("#searchTitle").html((searchType == "utube" ? "유튜브" : "비바샘") + " 자료");
			gtag('event', (searchType == "utube" ? "Youtube" : "비바샘") + ' 자료 검색', {
				'event_category': _gaHak,
				'event_label': _gaCourse
			});

			$('#pop-ajax-loading').hide();
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 자료검색 - 더보기
function moreSearchData() {

	//비바샘 자료검색 일때만 실행
	if (_ing || _noMore) { //검색중이거나 더이상 없을때
		return;
	} else {
		_ing = true; //중복방지

		var searchType = _sMode;
		var searchWord = _sWord;

		if (searchType == "utube") { //유튜브검색
			_sPageno = $(".pageToken").last().val();
		} else {
			_sPageno += 1;
		}

		var param = {channel: "search",
					type1: searchType,
					word: searchWord,
					pageSize: 8,
					pageNo: _sPageno};

		$('#pop-ajax-loading').show();
		Ajax.execute({
			type: "POST",
			url: "/period/search.html",
			dataType: "html",
			cache: false,
			async: true,
			loading: false,
			data: param,
			success: function (data) {

				$(".btn_more").remove();

				$("#searchDataResult").append(data);

				if (_resultCnt == $("#searchDataResult").children("div").length) {
					_noMore = true;
				} else {

					draggable("searchDataResult");

					_resultCnt = $("#searchDataResult").children("div").length;
					//$("#searchTitle").html((searchType == "utube" ? "유튜브" : "비바샘") + "자료 <span>(" + _resultCnt + "건)</span>");
					// 자료건수 영역 제거
					$("#searchTitle").html((searchType == "utube" ? "유튜브" : "비바샘") + "자료");

					if ((_resultCnt % 8) == 0) {
						$("#searchDataResult").append('<a href="javascript:void(0);" class="btn_more" onClick="moreSearchData()"><span>더보기</span></a>');
					}
				}

				_ing = false;

				$('#pop-ajax-loading').hide();
			},
			error: function (xhr, ajaxOptions, thrownError) {
			},
			complete: function (xhr, textStatus) {
			}
		});
	}
}

// 다운로드
function pDownloadFile(contentId, isAuthorized) {
	return false;
	
	if (!isAuthorized) {
		alert('정회원이 아니거나 다운로드 가능한 대상이 아닙니다.');
		return;
	}

	Popup.openFileDownloadDext(contentId);
}

// 담기
function pInsertFolder(id, isAuthorized) {
	return false;
	
	if (!isAuthorized) {
		alert('정회원이 아니거나 담기 가능한 대상이 아닙니다.');
		return;
	}

	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'PERIOD',
		parameter: {
			code2: id
		}
	});
}

// 담은자료
function getMyDataList() {
	return false;
	Ajax.execute({
		type: "POST",
		url: "/period/mydata.html",
		dataType: "html",
		cache: false,
		async: false,
		success: function (data) {
			$("#myDataResult").empty();
			$("#myDataResult").append(data);
			draggable("myDataResult");
			$("#myDataCnt").text("(" + $("#_myDataCnt").val() + "건)");
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}


// 새창 이동
function go_url(url) {
	return false;
	//window.open(decodeURIComponent(url), '_blank');
	Popup.openWindow({
		name: "외부링크",
		url: decodeURIComponent(url),
		fullscreen: true
	});
}

// 새창 이동
function go_samquizUrl(url) {
	return false;
	if (url === undefined || url === '') {
		alert('샘퀴즈 주소가 잘못되었습니다.');
		return;
	}

	gtag('event', '샘퀴즈', {
		'event_category' : '차시창',
		'event_label' : '추천자료',
		'value': 1
	});
	window.open(decodeURIComponent(url), '_blank');
}

// 브라우저 체크
function isIE() {
	return ((navigator.appName == 'Microsoft Internet Explorer')
		|| ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]+[\.0-9]*)").exec(navigator.userAgent) != null)));
}

function fnMobile() {

	var filter = "win16|win32|win64|mac|macintel|mac68k|macppc";
	if (navigator.platform) {
		if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			// moblie
			return true;
		} else {
			// pc
			return false;
		}
	}
	// pc
	return false;
}

function isMyscrap(type) {
	if(type == "save") {
		$(".btn_save_chasi").addClass('on').children('span').text("내 저장 차시 해제");
		hasMyPeriodToc = true;
	} else if(type == "change") {
		$(".btn_save_chasi").removeClass('on').children('span').text("내 차시로 저장");
		hasMyPeriodToc = false;
	} else if(type == "none") {
		$(".btn_save_chasi").removeClass('on').children('span').text("내 차시로 저장");
		hasMyPeriodToc = false;
	}
}

function getDuration(target) {
	var title = $(target).attr("title");
	if(!title){
		title = "";
	} else {
		title += " ";
	}
	var duration = $(target)[0].duration;
	duration = Math.floor(parseInt(duration));
	var seconds = Math.floor(duration % 60);
	var minutes = Math.floor((duration / 60) % 60);
	var hours = Math.floor((duration / 60) / 60);
	var hour = "";
	var min = "00";
	var sec = "00";

	if(hours > 0) {
    	hour = String(hours) + ":";
    }
    if(minutes > 0) {
    	min = String(minutes);
    	if(min.length < 2) {
    		min = "0" + min;
    	}
    }
    if(seconds > 0) {
    	sec = String(seconds);
    	if(sec.length < 2) {
    		sec = "0" + sec;
    	}
    }

	$(target).siblings('span.duration').text("(" + hour + min + ":" + sec + ")");
	$(target).siblings('div.newLineArea').text(title+"(" + hour + min + ":" + sec + ")");

}

function defaultYoutubeImg(object){
	var youtubeId = $(object).data("id");
	var source = "https://i.ytimg.com/vi/"+youtubeId+"/default.jpg";
	object.src = source;
}

function youtubeForIframe(object){
	return false;
	
	var url = decodeURIComponent($(object).data("url"));
	var regExp = /(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)(?:\?start\=([0-9]+))?/;

	//^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)
	//var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	//https://www.youtube.com/embed/imG-hvylsjA?start=30 에서 ID,시간 추출
	//var regExp = /^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:watch\?)?(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+)(?:\?t\=(?:[0-9a-zA-Z]+))?.start=([0-9]+)/;
	//var regExp = /^.*(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:.)?([a-zA-Z0-9_-]+)?.start=([0-9]+)/;

	var matchs = url.match(regExp);
	//console.log("matchs >> "+matchs);
	var youtubeId = matchs[1];
	var youtubeUrl = "https://www.youtube.com/embed/"+youtubeId;
	if(matchs[2]){
		youtubeUrl += "?start="+matchs[2];
	}
	//console.log("youtubeUrl >> "+youtubeUrl);
	onPlayer("youtube", youtubeUrl);
}

/**
 * 썸네일 실물파일 없어서 엑박 뜨게 하는 대신 대체 클래스 추가
 * 외부링크: external, 수업자료: commonThumb
 * @param object
 */
function classAppend(object) {
	if (object !== undefined) {
		var aChasiThumb = $(object).parent('a.chasi_thumb');
		if (aChasiThumb.data('filetype') === 'S') {
			aChasiThumb.addClass('external');
		} else {
			aChasiThumb.addClass('commonThumb');
		}
		$(object).remove();
	}
}

/**
 * 최근본 차시 저장 (수업 시작하기 버튼과 동기화)
 */
function saveRecentlyView() {
	var param = {periodId: _periodId,
		periodName: _periodName,
		labTextbook: _bookName,
		orderNoUnit1: _orderNoUnit1,
		lnbCode: _lnbCode};
	Ajax.execute({
		type: "POST",
		url: "/period/saveRecentlyView.json",
		dataType: "json",
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			console.log(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}