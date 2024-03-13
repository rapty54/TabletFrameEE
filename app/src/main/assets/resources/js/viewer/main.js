var docInfoPage = 1;
var docInfoIndex = 0;
var DEFAULT_PERCENT_VALUE = 'zoom1';
var isDraggable = false; // 드래그 적용여부
var isScrollbar = false;
$(function() {
	// 우측 사이드바 접기 이벤트
	$(".side_btn").click(function() {
		$(this).toggleClass('on');
		if ($('.side_btn').hasClass('on')) {
			$('.view_wrap').addClass('hide');
		} else if (!$('.side_btn').hasClass('on')) {
			$('.view_wrap').removeClass('hide');
		}
	});
	// UI 공통 컨트롤 핸들링..
	var handleControl = function(options) {

		var previous = options.previous;
		var next = options.next;
		var $preview = options.$preview;
		var pageview = options.pageview;
		// 1면, 2면 보기 값
		var pageviewValue = $('input[name=pageview]:checked').val();
		if (previous) {
			docInfoPage = docInfoPage - 1;
		}
		if (next) {
			docInfoPage = docInfoPage + 1;
		}
		docInfoIndex = docInfoPage - 1;
		// 우측 미리보기
		if ($preview != null) {
			var $li = $preview.closest('li');
			$('#page-view-pagewrap li').removeClass('on');
			$li.addClass('on');
			docInfoIndex = $('#page-view-pagewrap li').index($li);
			docInfoPage = (docInfoIndex + 1);
		}
		$('#pagewrap img').hide();
		$('#pagewrap img').eq(docInfoIndex).show();
		$('#slide-page').text(docInfoPage);
		// 우측 미리보기 on처리 효과
		$('#page-view-pagewrap li').removeClass('on');
		$('#page-view-pagewrap li:eq(' + docInfoIndex + ')').addClass('on');
		if (previous || $preview != null) {
			$('#btn-next').removeClass('disabled');
			// 첫번째페이지는 버튼 disabled 처리
			if (docInfoPage == 1) {
				$('#btn-previous').addClass('disabled');
			} else {
				$('#btn-previous').removeClass('disabled');
			}
		}
		if (next || $preview != null) {
			$('#btn-previous').removeClass('disabled');
			// 마지막페이지는 버튼 disabled 처리
			if (docInfoPage == docInfoDetailListSize) {
				$('#btn-next').addClass('disabled');
			} else {
				$('#btn-next').removeClass('disabled');
			}
		}
		// 1면 보기
		if (pageviewValue == 1) {
			// 짝수
			if (NumberUtils.isEvenNumber(docInfoIndex)) {
				$('#pagewrap img').eq(docInfoIndex + 1).hide();
			} else {
				$('#pagewrap img').eq(docInfoIndex - 1).hide();
			}
		} else {
			var findIndex = 0;
			// 짝수
			if (NumberUtils.isEvenNumber(docInfoIndex)) {
				findIndex = docInfoIndex + 1;
			} else {
				findIndex = docInfoIndex - 1;
			}
			$('#pagewrap img').eq(findIndex).show();
			// 우측 미리보기 2개 활성화 처리
			$('#page-view-pagewrap li').eq(findIndex).addClass('on');
			// 이미지가 2개 노출시 아래로 떨어지는 현상 패치
			$('#pagewrap img').each(function() {
				if ($(this).css('display') != 'none') {
					$(this).css({
						display: 'inline-block'
					});
				}
			});
		}
		// 1면, 2면 보기 버튼 클릭인 경우
		if (pageview) {
			if (pageviewValue == 1) {
				$('#viewdoc').removeClass('page2');
			} else {
				$('#viewdoc').addClass('page2');
			}
		}
	};

	// 상단 이전 클릭 이벤트
	$('#btn-previous').bind('click', function() {
		if (!$(this).hasClass('disabled')) {
			handleControl({
				previous: true,
				next: false,
				pageview: false,
				$preview: null
			});
		}
	});

	// 상단 다음 클릭 이벤트
	$('#btn-next').bind('click', function() {
		if (!$(this).hasClass('disabled')) {
			handleControl({
				previous: false,
				next: true,
				pageview: false,
				$preview: null
			});
		}
	});
	// 상단 퍼센트 이벤트
	$('select[name=percent]').bind('change', function() {
		$('#pagewrap img').removeClass();
		$('#pagewrap img').addClass($(this).val());
	});
	// 우측 미리보기 클릭 이벤트
	$('#page-view-pagewrap li a').bind('click', function() {
		handleControl({
			previous: false,
			next: false,
			pageview: false,
			$preview: $(this)
		});
	});
	// 상단 1페이지 2페이지 보기 기능
	$('input[name=pageview]').bind('click', function() {
		if ($(this).val() == '2') {
			$('select[name=percent]').val('zoom1').trigger('change');
			$('#select-parent-container').hide();
		} else {
			$('select[name=percent]').prop('disabled', false);
			$('#select-parent-container').show();
			$('select[name=percent]').val('zoom1').trigger('change');
		}
		handleControl({
			previous: false,
			next: false,
			pageview: true,
			$preview: null,
		});
	});
	// 상단 우측 담기 버튼 클릭 이벤트
	$('#btn-folder-layer-open').bind('click', function() {
		var content = masterContent.contentGubun + '-' + masterContent.contentId;
		Layer.openFolderMain({
			menu: parameter.referMenu,
			type: 'VIEWER',
			parameter: {
				textbookCd: null,
				code2: content,
			}
		});
	});
	// 상단 우측 다운로드 클릭 이벤트
	$('#btn-download').bind('click', function() {
		var content = masterContent.contentGubun + '-' + masterContent.contentId;
		// pdf 설치안내 레이어를 보여줌...
		if (masterContent.fileType == 'FT212' || (masterContent.fileType == 'FT207' && masterContent.mediaKind == 'FT359')) {
			Layer.openLayer({
				url: '/textbook/pdf.popup',
				callback: function() {
					setTimeout(function() {
						Popup.openFileDownloadDext(content);
					}, 1000);
				}
			});
		} else {
			// 새창으로 다운로드 호출
			Popup.openFileDownloadDext(content);
		}
	});
	// 상단 공유하기 버튼
	$('#btn-share').bind('click', function() {
		CopyShortUrl.getUrl('content', masterContent.contentId);
	});
	// 이미지일경우 슬라이드
	if (isImageViewer) {
		if ($('#data-relation-list li.swiper-slide').length > 0) {
			new Swiper('.gallery-thumbs', {
				spaceBetween: 10,
				slidesPerView: 4,
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});
		}
	}
	// 문서, 이미지뷰어 인경우만..
	if (isDocViewer || isImageViewer) {
		// 스크롤 생성
		$('#wrapviewer').mCustomScrollbar({
			axis: 'yx',
			advanced: {
				autoExpandHorizontalScroll: true, // 가로 스크롤 리사이즈 감지
			}
		});
	}
	// 음원 뷰어는 사이즈 고정으로
	if (isAudioViewer) {
		$(window).resize(function() {
			window.resizeTo(PopupSize.VIEWER_AUDIO.width, PopupSize.VIEWER_AUDIO.height);
		});		
	}
	$(document).bind('contextmenu selectstart dragstart', function(e) {
		return false;
	});

	$('img').bind('contextmenu selectstart', function(e) {
		return false;
	});

});