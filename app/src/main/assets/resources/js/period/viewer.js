var timeout = false;
var delta = 200;
var _filterData;
var _isViewer = true;
var nowZoom = 100;

$(function () {

	/*$(window).resize(function () {
		$('.chasiplan').height($(window).innerHeight() - 140);
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});*/

	$('.btn_close').click(function () {

		$(".current_period_menu").text("내 차시");

		$('.pop_chasi').hide();
		$('.dimmed2').hide();
		$('.btn_chasi_slide').removeClass('on');
		// $('#btn_myprogress').removeClass('on');
		$('#btn_savechasi').removeClass('on');
	});

	// 내 차시 드롭 박스
	// $('#btn_mychasi').on('click', function(){
	// 	$(this).toggleClass('on');
	// 	$(this).next('.my_chasi_menu').toggleClass('on');
	// });

	// 내 저장 차시
	$('#btn_savechasi').click(function () {
		return false;

		$(".current_period_menu").text("내 저장 차시");

		$(this).toggleClass('on');

		$('.my_chasi_menu').removeClass('on');
		// $('#btn_mychasi').removeClass('on');

		if ($("#allChasi").hasClass("on")) {
			$('#pop_all_chasi').hide();
			$("#allChasi").removeClass("on");
		}

		// if ($("#btn_myprogress").hasClass("on")) {
		// 	$('#pop_myprogress').hide();
		// 	$("#btn_myprogress").removeClass("on");
		// }

		if ($('#btn_savechasi').hasClass('on')) {

			callMySavedPeriodList({}, function () {

				$('#pop_mysave').show().css('top', '44px');
				$('.dimmed2').show().css('top', '44px');

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
			// if (!$("#btn_myprogress").hasClass("on")) {
			// 	$('.dimmed2').hide();
			// }
		}
	});

	// 전체 차시
	$('#allChasi').click(function () {
		return false;
		$(this).toggleClass('on');

		if ($("#btn_savechasi").hasClass("on")) {
			$('#pop_mysave').hide();
			//$('#pop_myprogress').hide();
			$("#btn_savechasi").removeClass("on");
		}

		// if ($("#btn_myprogress").hasClass("on")) {
		// 	$('#pop_myprogress').hide();
		// 	$("#btn_myprogress").removeClass("on");
		// }

		if ($('#allChasi').hasClass('on')) {
			$('#pop_all_chasi').show().css('top', '44px');
			$('.dimmed2').show().css('top', '44px');
		} else if (!$('#allChasi').hasClass('on')) {
			$('#pop_all_chasi').hide();
			if (!$("#btn_savechasi").hasClass("on")) {
				$('.dimmed2').hide();
			}
		}
	});

	// 내 진도 차시
	/*
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
				$('#pop_myprogress').show().css('top', '44px');
				$('.dimmed2').show().css('top', '44px');
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
	*/

	$('.mid').click(function () {
		$(this).toggleClass('on');
		if ($('.mid').hasClass('on')) {
			$('.mid_wrap').fadeIn();
		} else if (!$('.mid').hasClass('on')) {
			$('.mid_wrap').fadeOut();
		}
	});

	// 목차 보기
	$('.btn_list').click(function () {
		$('.pop_studylist').show();
		$('.dimmed2').show().css('top', '44px');
	});

	// 목차 닫기
	$('.btn_list.on').click(function () {
		$('.pop_studylist').hide();
		$('.dimmed2').hide();
	});

	$('.btn_helper').click(function () {
		return false;
		$(this).parent('.help_wrap').toggleClass('on');
	});

	// 2023-02-20 전체보기 => 화면 확대
	$('#btnScrFull').on('click', function() {
		$('.help_wrap').hasClass('on') && $('.help_wrap').removeClass('on');
		$('.chasiEdit_viewer').toggleClass('fullScreen');

		var broswer_h = $(window).innerHeight();
		var footer_h = $('.hdr_foot').outerHeight();
		broswer_h = broswer_h - footer_h;
		$('.chasiFrame').css('height', broswer_h + 'px');

		var fullScreenChk = $('.chasiEdit_viewer').hasClass('fullScreen');
		if( fullScreenChk ) {
			$('#btnScrFull > .attention').text('화면 축소');
		} else {
			$('#btnScrFull > .attention').text('화면 확대');
			setZoom('r');
		}
		// $('.chasiEdit_viewer').find('.hdr_foot').toggleClass('on');
	});

	// 2023-07-11 화면 확대 + F11 전체화면일 경우 컨텐츠 사이즈 조정
	$(window).on('resize', function() {
		if($('.chasiEdit_viewer').hasClass('fullScreen')) {
			var broswer_h = $(window).innerHeight();
			var footer_h = $('.hdr_foot').outerHeight();
			broswer_h = broswer_h - footer_h;
			$('.chasiFrame').css('height', broswer_h + 'px');
		} else {
			setZoom('r');
		}
	});
	
	if (!_tocNo) {
		goTopic($('#leaf_toc_0').attr('data-gubun'), $('#leaf_toc_0').attr('data-id'), _lnbCode, '',
					$('#leaf_toc_0').attr('data-site-url'),$('#leaf_toc_0').attr('data-file-type'));
	} else {
		goTopic(_contentGubun, _contentId, _lnbCode, _tocNo, _siteUrl, _fileType);
	}

	window.resizeTo(window.screen.availWidth, window.screen.availHeight);

	$('#totalTocIdx').html($("#tocCnt").val());
	$("#periodName").text($(".drop_list").find(".current").text().trim());
	setFooterToc();
	Period.init();
	app.navAcc();
	setZoom('r');

	setLastErrorRoute($(".now").attr("data-parent"));
});

function setFooterToc() {
	$(".viewer_control").find("a").attr("class", "");
	var CurrentParentTocNo = $(".now").attr("data-parent");
	$(".viewer_control").find("a[data-toc=" + CurrentParentTocNo + "]").attr("class", "now");
}

function resizeend() {
	if (new Date() - rtime < delta) {
		setTimeout(resizeend, delta);
	} else {
		timeout = false;
		viewerResize(false);
	}
}

function viewerResize(isFullSize) {
	var minWidth = 1024;
	var minHeight = 760;

	if (isFullSize) {
		window.resizeTo($(window).innerWidth(), $(window).innerHeight());
	} else {
		if (minWidth > $(window).innerWidth() || minHeight > $(window).innerHeight()) {
			//alert("창을 더이상 줄일 수 없습니다. 최소사이즈 1024 * 760");
			window.resizeTo(minWidth, minHeight);
		}
	}

	$("#contentsFrame").width($(window).innerWidth());
	$("#contentsFrame").height($(window).innerHeight()); // 윈도우 안쪽 사이즈에서 Header, Footer 사이즈 만큼 제외
	resizeDrawLayer();
}

function goTopic(contentGubun, contentId, lnbCode, tocNo, siteUrl, fileType, parentTocNo, htmlUrl) {
	var _tempContentId = contentId;
	var _tempContentGubun = contentGubun;
	// 유튜브 영상의경우 url converting
	if (fileType === 'FT206' && siteUrl) {
			contentId = getYoutubeId(siteUrl);
			contentGubun = "UTUBE";
	}


	lnbCode = encodeURI(lnbCode);

	var selectorName = "#leaf_toc_0";
	// var url = "/period/content.popup?viewerType=PERIOD&contentGubun=" + contentGubun + "&contentId=" + contentId + "&lnbCode=" + lnbCode  + "&ref=" + _ref;
	var url = "./detail/detail2/detail1.html";
	if (!tocNo) {
		selectorName = "#leaf_toc_0";
	} else {
		selectorName = "dd[data-toc='" + tocNo + "']";
	}
	
	if(htmlUrl) {
		url = htmlUrl;
		$("#contentsFrame").attr("src", url);
	}
	$('dd').removeClass("now");
	$(selectorName).addClass("now");

	$('#currTocIdx').text((parseInt($(selectorName).attr("id").substring(9, $(selectorName).attr("id").length)) + 1));
	$("li>button").removeClass("active");
	$("dd[data-toc='" + $(selectorName).attr('data-parent') + "']>button").addClass("active");

	/*
	 차시 변경될때마다 타이틀 및 페이지 변경
	 2021-08-11 김인수
	 */
	var param = {
		periodId: _periodId,
		tocNo : tocNo,
		lnbCode: lnbCode,
		contentId: _tempContentId,
		contentGubun : _tempContentGubun,
		tabType : 'A',
		pageSize : 15,
		pageNo : 1,
		student : false
	}

	// $.ajax({
	// 	type: "GET",
	// 	url: "/period/viewer.title.json",
	// 	data: param,
	// 	success: function (data) {
	// 		if(data.periodViewerTitle == '' || data.periodViewerTitle == null) {
	// 			$(".view_title").text(data.periodName);
	// 		} else {
	// 			if(data.periodPage == '' || data.periodPage == null) {
	// 				$(".view_title").text(data.periodViewerTitle);
	// 			} else {
	// 				$(".view_title").text(data.periodViewerTitle + " (" + data.periodPage + ")");
	// 			}
	// 		}
	// 	},
	// 	error: function (xhr, ajaxOptions, thrownError) {
	// 	},
	// 	complete: function (xhr, textStatus) {
	// 	}
	// });

	setFooterToc();
	setLastErrorRoute(parentTocNo);
}

function goPeriodViewer() {
	location.href = "/period/total.popup?periodId=" + _periodId + "&lnbCode=" + _lnbCode;
}

// 이전
function prev() {
	var totalIdx = parseInt($('#totalTocIdx').text());
	var currIdx = parseInt($('#currTocIdx').text());

	if (currIdx <= 1) {
		alert("첫 페이지입니다.");
		return;
	}

	var parentToc = $('#leaf_toc_' + (currIdx - 2)).attr('data-parent');
	if(typeof parentToc == "undefined" || parentToc == null || parentToc == "") {
		parentToc = $('#leaf_toc_' + (currIdx - 2)).attr('data-toc');
	}

	goTopic($('#leaf_toc_' + (currIdx - 2)).attr('data-gubun'), $('#leaf_toc_' + (currIdx - 2)).attr('data-id'), _lnbCode, $('#leaf_toc_' + (currIdx - 2)).attr('data-toc'),
			$('#leaf_toc_' + (currIdx - 2)).attr('data-site-url'),$('#leaf_toc_' + (currIdx - 2)).attr('data-file-type'), parentToc, `./content/add/ch1/popup/0200/_0${currIdx-1}.html`);
}

// 다음
function next() {

	var totalIdx = parseInt($('#totalTocIdx').text());
	var currIdx = parseInt($('#currTocIdx').text());

	//차시 마지막 페이지
	if (currIdx >= totalIdx) {
		alert("마지막 페이지입니다.");
		// getPrevNextPeriodId('next');
		return;
	}

	var parentToc = $('#leaf_toc_' + (currIdx)).attr('data-parent');
	if(typeof parentToc == "undefined" || parentToc == null || parentToc == "") {
		parentToc = $('#leaf_toc_' + (currIdx)).attr('data-toc');
	}

	goTopic($('#leaf_toc_' + (currIdx)).attr('data-gubun'), $('#leaf_toc_' + (currIdx)).attr('data-id'), _lnbCode, $('#leaf_toc_' + (currIdx)).attr('data-toc'),
				$('#leaf_toc_' + (currIdx)).attr('data-site-url'), $('#leaf_toc_' + (currIdx)).attr('data-file-type'), parentToc, `./content/add/ch1/popup/0200/_0${currIdx+1}.html`);
}

// 차시 변경
function changePeriod(periodId, contentId) {
	var url = '/period/total.popup?periodId=' + periodId + '&lnbCode=' + _lnbCode + '&contentId=' + contentId + '&contentGubun=CN030';
	location.href = url;
}

// 하단 학습 목차 클릭
function goParentToc(parTocNo) {
	$(".viewer_control").find("a").attr("class", "");
	$(".viewer_control").find("a[data-toc=" + parTocNo + "]").attr("class", "now");
	goTopic($("dd[data-parent='" + parTocNo + "']:first").attr("data-gubun"), $("dd[data-parent='" + parTocNo + "']:first").attr("data-id"), _lnbCode, $("dd[data-parent='" + parTocNo + "']:first").attr("data-toc"),
					$("dd[data-parent='" + parTocNo + "']:first").attr("data-site-url"),$("dd[data-parent='" + parTocNo + "']:first").attr("data-file-type"), parTocNo);
}

function changeComplete() {
	//alert("changed");
}

function setZoom(type) {

	if(type == "m") {
		nowZoom = nowZoom + 10;
		if(nowZoom > 500) {
			nowZoom = 500;
		}
	} else if(type == "p") {
		nowZoom = nowZoom - 10;
		if(nowZoom < 30) {
			nowZoom = 30;
		}
	} else if(type == "r") {
		nowZoom = 100;
	}

	//$('html').css("zoom", nowZoom + "%");
	$('.chasiFrame').css("zoom", nowZoom + "%");
	var broswer_w = $(window).innerWidth();
    var broswer_h = $(window).innerHeight();
    var header_h = $('.hdr_chasiedit').outerHeight();
    var footer_h = $('.hdr_foot').outerHeight();
    // console.log(broswer_h, header_h, footer_h);
	broswer_h = broswer_h - (header_h + footer_h);
    $('.chasiFrame').css("width", broswer_w + "px");
    $('.chasiFrame').css("height", broswer_h + "px");

	$('#nowZoom').text(nowZoom + "%");
}

//오류신고 마지막 경로설정
function setLastErrorRoute(parentTocNo) {
	$(".pop_location_txt").text(function(i, oldText) {
		var tmpStr = oldText.slice(0, oldText.lastIndexOf(">")+1);

		return tmpStr + ' ' + $("dt[data-toc=" + parentTocNo + "]").text();
	})
}

function getPrevNextPeriodId(type) {
	let chaciInfo = Period.checkMiddleChaci();
	let tabType = chaciInfo.type;

	Ajax.execute({
		type: "POST",
		url: "/period/prevNextPeriodId.json",
		dataType: "json",
		cache: false,
		async: false,
		data: JSON.stringify({
			periodId: _periodId,
			textbookCd : _textbookCd,
			tabType: tabType
		}),
		contentType: 'application/json',
		success: function (data) {
			if(data.result.length == 0) {
				alert("마지막 페이지입니다.");
				return;
			}
			const prev = data.result[0];
			const next = data.result[1];

			if(type === 'next') {
				if(Object.keys(next).length == 0) {
					alert("마지막 페이지입니다.");
					return;
				} else {
					$.confirm({
						title:'안내',
						content: "차시 마지막 페이지입니다.\n다음 차시로 이어서 수업하시겠습니까?",
						buttons: {
							confirm: {
								text: '이어서 하기',
								btnClass: 'btn-orange',
								action: function () {
									changePeriod(next.periodId, next.contentId);
								}
							},
							cancel: {
								text: '창 닫기',
								btnClass: 'btn-gray',
								action: function () {
									window.close();
								}
							}
						},
					});
					// if(confirm("차시 마지막 페이지입니다.\n다음 차시로 이어서 수업하시겠습니까?")) {
					// 	changePeriod(next.periodId, next.contentId);
					// } else {
					// 	window.close();
					// }
				}
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert("마지막 페이지입니다.");
			return;
		},
		complete: function (xhr, textStatus) {

		}
	});
}