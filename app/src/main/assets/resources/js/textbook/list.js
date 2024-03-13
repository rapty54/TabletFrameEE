var STORAGE_NAME_PPT_CLOSE = 'TEXTBOOK_PPT_CLOSE';
var STORAGE_NAME_MATHEMATICS_CLOSE = 'TEXTBOOK_MATHEMATICS_CLOSE';
var STORAGE_NAME_MATHEMATICSHIGH_CLOSE = 'TEXTBOOK_MATHEMATICSHIGH_CLOSE';
var STORAGE_NAME_SCIENCELAB_CLOSE = 'TEXTBOOK_SCIENCELAB_CLOSE';
var STORAGE_NAME_SCIENCELABHIGH_CLOSE = 'TEXTBOOK_SCIENCELABHIGH_CLOSE';
var STORAGE_NAME_LOCALLIBRARY_CLOSE = 'TEXTBOOK_LOCALLIBRARY_CLOSE';
var STORAGE_NAME_LOCALLIBRARYHIGH_CLOSE = 'TEXTBOOK_LOCALLIBRARYHIGH_CLOSE';
var STORAGE_NAME_LOCALLIBRARY_CLOSE_AGAIN = 'TEXTBOOK_LOCALLIBRARY_CLOSE_AGAIN';
var STORAGE_NAME_YEARLY_TOAST_CLOSE = 'TEXTBOOK_YEARLY_TOAST_CLOSE';

$(function () {

	//유형분류1 인덱스 값 변수
	let tabIdx2 = 0;

	//유형분류2 높이 값 변수
	let tabH2 = 0;

	//특화자료 유형 분류 2높이
	let tabH = $('.special').outerHeight();

	let tabIdx = 0;

	// 팝업 변수
	var GUGUN_CD_SPECIAL = 'special';
	var reset = false;
	var data = null;
	var firstRendering = true;
	var getList = function (first) {
		var code = null;
		var $tabConts = null;
		// 특화자료 인경우에 특화자료는 탭이 없음.
		if (currentClassInfo.gubunCd == 'S') {
			var $li = $('#tab-educourse li.on');
			var index = $li.index();
			$tabConts = $('#tab-contents').find('.tab_conts:eq(' + index + ')');
			data = $li.find('a').data();
			code = GUGUN_CD_SPECIAL;
		} else {
			// 탭이 있는경우.. 특화자료 제외
			var $li = $('#tab-educourse li.on');
			var index = $li.index();
			$tabConts = $('#tab-contents').find('.tab_conts:eq(' + index + ')');
			// html tag의 data를 활용하여 각 페이지 정보를 관리
			data = $li.find('a').data();
			code = data.code;
		}
		var url = null;
		var _parameter = {};
		// 초기화 인경우
		if (reset) {
			data.page = 1;
		}
		// 차시창
		if (code == 'PERIOD') {
			url = '/textbook/list/period';
			_parameter = {
				textbook: currentClassInfo.textbookCd,
				class1Cd: currentClassInfo.class1Cd,
				gubunCd: currentClassInfo.gubunCd,
				educourseId: parameter.educourseId,
				periodId: parameter.periodId,
				page: data.page,
			};
		}
		// 수업 자료
		if (code == '1110001') { // 수업자료는 기존에 음원자료+이미지자료를 같이 모아서 같이 처리
			if ($("div.accoItem.on").eq(index).hasClass('loaded')) return; // 이미 데이터 로드된 경우에는 로직 진행하지 않음

			url = '/textbook/list/class';
			var yearGubunCd;
			if ($("div.accoItem.yearData").hasClass("on")) {
				yearGubunCd = $("div.accoItem.yearData").children("a").eq(0).data().gubunCd; // 연간 수업 자료를 조회 (히스토리 통해 진입하지 않는 경우)
			}
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				class1Cd: currentClassInfo.class1Cd,
				educourseId: parameter.educourseId,
				gubunCd: yearGubunCd !== undefined ? yearGubunCd : currentClassInfo.gubunCd,
				type1: code,
				page: data.page,
				periodId: parameter.periodId,
				unitNum: $("div.accoItem.on").eq(index).children('a.btnAcco').data("unit-num"),
			};
		}
		// 평가 자료
		if (code == '1110002') {
			url = '/textbook/list/appraisal';
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				class1Cd: currentClassInfo.class1Cd,
				educourseId: parameter.educourseId,
				gubunCd: currentClassInfo.gubunCd,
				type1: code,
				page: data.page,
				periodId: parameter.periodId,
			};
		}
		// 멀티미디어 자료
		if (code == '1110003') {
			url = '/textbook/list/multimedia';
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				educourseId: parameter.educourseId,
				gubunCd: currentClassInfo.gubunCd,
				type1: code,
				page: data.page,
			};
		}
		// 음원 자료
		if (code == '1110004') {
			url = '/textbook/list/sound';
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				educourseId: parameter.educourseId,
				gubunCd: currentClassInfo.gubunCd,
				type1: code,
				page: data.page,
			};
		}
		// 이미지 자료
		if (code == '1110005') {
			url = '/textbook/list/image';
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				educourseId: parameter.educourseId,
				gubunCd: currentClassInfo.gubunCd,
				type1: code,
				page: data.page,
			};
		}
		// 특화 자료
		if (code == GUGUN_CD_SPECIAL) {
			if (data.thumbnail) {
				url = '/textbook/list/special/thumbnail';
			} else {
				url = '/textbook/list/special/table';
			}
			_parameter = {
				codelistId: currentClassInfo.textbookCd,
				gubunCd: currentClassInfo.gubunCd,
				type1: data.class1cd,
				type2: data.class2cd,
				page: data.page,
			};
		}

		//유형분류2가 옵션일때 코드

		// // 자료분류 옵션 목록 조회
		// if (($tabConts.find('select[name=type2] option').length <= 1)
		// 		&& (code == '1110001' || code == '1110002' || code == '1110003' || code == '1110004' || code == '1110005')) {
		//
		// 	if(contGroup2 != "") {
		// 		_parameter.contGroup2 = contGroup2
		// 	}
		//
		// 	Ajax.execute({
		// 		url: '/textbook/list/optionList',
		// 		data: _parameter,
		// 		type: 'get',
		// 		async: false,
		// 		dataType: 'html',
		// 		success: function (html) {
		// 			$tabConts.find('select[name=type2]').append($(html));
		// 		}
		// 	});
		// }
		//
		// // 탭 컨텐츠에 2차 분류가 있는 경우만
		// if ($tabConts.find('select[name=type2]').length > 0) {
		// 	_parameter.type2 = $tabConts.find('select[name=type2]').val();
		// }


		// 자료분류 체크박스 목록 조회
		if (($tabConts.find(".tab_second ul li").length <= 1)
			&& (code == '1110001' || code == '1110002' || code == '1110003' || code == '1110004' || code == '1110005')) {

			if(contGroup2 != "" && contGroup2 != null && firstRendering) {
				_parameter.contGroup2 = contGroup2;
				$tabConts.find(".tab_second ul li #category0").prop('checked', false);
				$tabConts.find(".tab_second ul li #category0").removeClass('on');
			}

			Ajax.execute({
				url: '/textbook/list/checkboxList',
				data: _parameter,
				type: 'get',
				async: false,
				dataType: 'html',
				success: function (html) {
					$tabConts.find(".tab_second ul").append($(html));

					$tabConts.find(".tab_second ul li").off("click").on('click', function (e) {
						e.preventDefault();
						reset = true;

						var $input = $(this).find('input');
						var $li = $(this).closest('li');
						var $index = $(this).index();


						if($index === 0) {
							//전체 버튼인 경우
							if($input.prop('checked')) {
								return;
							} else {
								$input.addClass('on');
								$input.prop('checked', true);
								//나머지 버튼은 on 해제
								$tabConts.find(".tab_second ul li .type2_each").removeClass('on');
								$tabConts.find(".tab_second ul li .type2_each").prop('checked', false);
							}
							//나머지 버튼인 경우
						} else {
							if($input.prop('checked')) {
								$input.removeClass('on');
								$input.prop('checked', false);
								if(!$tabConts.find(".tab_second ul li .type2_each").hasClass('on')) {
									$tabConts.find(".tab_second ul li .type2_all").addClass('on');
									$tabConts.find(".tab_second ul li .type2_all").prop('checked', true);
								}
							} else {
								$input.addClass('on');
								$input.prop('checked', true);
								//전체 버튼은 on 해제
								if($tabConts.find(".tab_second ul li .type2_all").hasClass('on')){
									$tabConts.find(".tab_second ul li .type2_all").removeClass('on');
									$tabConts.find(".tab_second ul li .type2_all").prop('checked', false);
								}
							}
						}

						getList();
					});
				}
			});
		}

		// 탭 컨텐츠에 2차 분류가 있는 경우만
		if ($tabConts.find(".tab_second ul li").length > 0) {
			_parameter.type2List = [];
			var type2IndexList = [];

			$($tabConts.find(".tab_second ul li .type2_each:checked").map(function() {
				_parameter.type2List.push(this.value);
				type2IndexList.push(this.dataset.index);
			}));
			setUrlByContGroup($('#tab-educourse .on').closest('li').index()+1, type2IndexList);

			//단건인 경우에만 contGroup2가 있는 url 생성
			// if(_parameter.type2List.length === 1){
			// 	setUrlByContGroup($('#tab-educourse .on').closest('li').index()+1, $tabConts.find(".tab_second ul li .type2_each:checked").closest('li').index());
			// } else {
			// 	setUrlByContGroup($('#tab-educourse .on').closest('li').index()+1);
			// }
		}

		//정렬 타입 지정
		//유형분류2가 전체일때만 나오게
		// if($tabConts.find(".tab_second ul li .type2_all").prop("checked")){
		// 	$tabConts.find('.module_right').show();
		// 	if($tabConts.find('select[name=order_type]').val() === 'recently') {
		// 		_parameter.orderType = 'recently';
		// 	} else {
		// 		_parameter.orderType = null;
		// 	}
		// } else {
		// 	$tabConts.find('.module_right').hide();
		// }


		Ajax.execute({
			url: url,
			data: _parameter,
			type: 'get',
			dataType: 'html',
			success: function (html) {
				var totCount = $('#tab-educourse li.on a').data('count'); // 총 목록 카운트
				var listCount = 0;	// 현재 목록 카운트
				// 차시별 자료
				if (code == 'PERIOD') {
					$tabConts.find('div.accoItem.on').find('tbody').append($(html));
					listCount = $tabConts.find('tbody tr').length;
				}
				// 수업 자료
				if (code == '1110001') {
					if (reset) {
						// 초기화는 기존 데이터 삭제
						$tabConts.find('div.accoItem.on').find('div.accoCont').empty();
					}
					$tabConts.find('div.accoItem.on').find('div.accoCont').append($(html));
					$tabConts.find('div.accoItem.on').addClass('loaded');
					listCount = $tabConts.find('tbody tr').length;
				}
				// 평가 자료 (새로운 GNB로 이동되어 사용 안함)
				if (code == '1110002') {
					if (reset) {
						// 초기화는 기존 데이터 삭제
						$tabConts.find('div.accoItem.on').find('div.accoCont').empty();
					}
					$tabConts.find('div.accoItem.on').find('div.accoCont').append($(html));
					listCount = $tabConts.find('tbody tr').length;
				}
				// 멀티미디어 자료
				if (code == '1110003') {
					if (reset) {
						// 초기화는 기존 데이터 삭제
						$tabConts.find('ul.multimedia_list').find('li').remove();
					}
					$tabConts.find('ul.multimedia_list').append($(html));
					listCount = $tabConts.find('ul.multimedia_list').find('li').length;
					// 더이상 없음
					if (html.length == 0) {
						$tabConts.find('.btn-more').hide();
					} else {
						// 가져온 목록과 전체 카운트 비교
						if ($tabConts.find('ul.multimedia_list').find('li:last').data().nextCount == 0) {
							$tabConts.find('.btn-more-wrapper').hide();
						} else {
							data.page++;
							$tabConts.find('.btn-more-wrapper').show();
						}
					}
				}
				// 음원 자료
				if (code == '1110004') {
					if (reset) {
						// 초기화는 기존 데이터 삭제
						$tabConts.find('tbody tr').remove();
					}
					$tabConts.find('tbody').append($(html));
					listCount = $tabConts.find('tbody tr').length;
					// 더이상 없음
					if (html.length == 0) {
						$tabConts.find('.btn-more').hide();
					} else {
						// 가져온 목록과 전체 카운트 비교
						if ($tabConts.find('tbody tr:last').data().nextCount == 0) {
							$tabConts.find('.btn-more-wrapper').hide();
						} else {
							data.page++;
							$tabConts.find('.btn-more-wrapper').show();
						}
					}
				}
				// 이미지 자료
				if (code == '1110005') {
					if (reset) {
						// 초기화는 기존 데이터 삭제
						$tabConts.find('ul.image_list').find('li').remove();
					}
					$tabConts.find('ul.image_list').append($(html));
					listCount = $tabConts.find('ul.image_list').find('li').length;
					// 더이상 없음
					if (html.length == 0) {
						$tabConts.find('.btn-more').hide();
					} else {
						// 가져온 목록과 전체 카운트 비교
						if ($tabConts.find('ul.image_list').find('li:last').data().nextCount == 0) {
							$tabConts.find('.btn-more-wrapper').hide();
						} else {
							data.page++;
							$tabConts.find('.btn-more-wrapper').show();
						}
					}
				}
				// 특화 자료
				if (code == GUGUN_CD_SPECIAL) {
					// 썸네일 타입인경우
					if (data.thumbnail) {
						$tabConts.find('ul').append($(html));
						listCount = $tabConts.find('ul li').length;
						// 더이상 없음
						if (html.length == 0) {
							$tabConts.find('.btn-more').hide();
						} else {
							// 가져온 목록과 전체 카운트 비교
							if ($tabConts.find('li:last').data().nextCount == 0) {
								$tabConts.find('.btn-more-wrapper').hide();
							} else {
								data.page++;
								$tabConts.find('.btn-more-wrapper').show();
							}
						}
					} else {
						$tabConts.find('tbody').append($(html));
						listCount = $tabConts.find('tbody tr').length;
						// 더이상 없음
						if (html.length == 0) {
							$tabConts.find('.btn-more').hide();
						} else {
							// 가져온 목록과 전체 카운트 비교
							if ($tabConts.find('tbody tr:last').data().nextCount == 0) {
								$tabConts.find('.btn-more-wrapper').hide();
							} else {
								data.page++;
								$tabConts.find('.btn-more-wrapper').show();
							}
						}
					}
				}

				// 유형분류2 선택값에 따른 자료 카운트 변경
				if ($tabConts.find('ul li:last').data('count') !== undefined &&
					totCount !== $tabConts.find('ul li:last').data('count')) {
					totCount = $tabConts.find('ul li:last').data('count');
				} else if ($tabConts.find('tbody tr:last').data('count') !== undefined &&
					totCount !== $tabConts.find('tbody tr:last').data('count')) {
					totCount = $tabConts.find('tbody tr:last').data('count');
				}

				// 남은 목록 카운트
				var moreCount = Number(totCount) - Number(listCount);
				$tabConts.find('.btn-more span').text("(" + moreCount + ")");

				data.load = true;
				reset = false;

				if (first) {
					// 탭까지 스크롤
					initScroll(function(){

					});
				}

				//전체 다운로드 마우스 오버
				$('.tblist td .period-all-down').on('mouseover', function () {
					$(this).siblings('.btn_type1.btn-download').addClass('on');
				});
				$('.tblist td .period-all-down').on('mouseout', function () {
					$(this).siblings('.btn_type1.btn-download').removeClass('on');
				});



			}
		});

		firstRendering = false;

		$(window).scrollTop(0);

		setTimeout(function(){
			tabH2 = $('.subcontents .tab_conts').eq(tabIdx2).find('.tab_second').outerHeight();
		}, 1000);



	};


	// 탭 클릭 이벤트
	$('#tab-educourse li a').bind('click', function () {
		deleteUrlQueryString();

		var $li = $(this).closest('li');
		var index = $li.index();
		$('#tab_educourse li').removeClass('on');
		$li.addClass('on');

		$('#tab-contents .tab_conts').hide();
		var $tabConts = $('#tab-contents').find('.tab_conts:eq(' + index + ')');
		$tabConts.show();

		$(window).scrollTop(0);

		var data = $(this).data();

		// 로드가 안된경우
		if (!data.load) {
			getList();
		}

		setUrlByContGroup(index+1);

		tabIdx2 = $(this).parent('li').index();

	});



	// 탭 더보기 클릭 이벤트
	$('#tab-contents .btn-more').bind('click', function () {

		getList();
	});


	// 유형분류2가 옵션일때 코드
	// // 탭 컨텐츠 우측 분류 변경 이벤트
	// $('#tab-contents select[name=type2]').bind('change', function () {
	// 	reset = true;
	//
	// 	// 선택된 분류 값이 있을때 select2 색상 변경 처리
	// 	var target = $(this).closest('.ui-select-parent').find('span[id^="select2-type2"]');
	// 	var index = $(this).find("option:selected").index();
	// 	var type2Cd = $(this).val();
	// 	if (type2Cd == '') {
	// 		$(target).css('background', '');
	// 		$(target).css('color', '');
	// 	} else {
	// 		$(target).css('background', '#ffd563');
	// 		$(target).css('color', '#393d49');
	// 	}
	//
	// 	getList();
	// 	setUrlByContGroup($('#tab-educourse .on').closest('li').index()+1, index);
	// });


	// 탭 컨텐츠 전체선택 이벤트
	$(document).on('change', '#tab-contents input.input-checkbox-all',function () {
		var $accoTblWrap = $(this).parent().parent('div.module_tb').next('div');

		// 현재 차시 내 다운로드 가능한 항목이 있을 경우에만 동작한다 (else는 차시 내 다운로드 자료가 없는 것)
		if ($accoTblWrap.hasClass('accoTblWrap')) {
			if ($(this).prop('checked')) {
				$accoTblWrap.find('input[name=contentId]').prop('checked', true);
			} else {
				$accoTblWrap.find('input[name=contentId]').prop('checked', false);
			}

			ctrlBarCount();
		}
	});

	// 컨텐츠 개별 선택 이벤트
	$(document).on('change', 'input[name=contentId]', function () {
		ctrlBarCount();

		// 해당 자료 영역에 전부 선택되었는지 체크하여 전체체크 INPUT 눌리도록 함
		var $accoTblWrap = $(this).closest('div.accoTblWrap');
		if ($accoTblWrap.find('input:checkbox[name=contentId]:checked').length === $accoTblWrap.find('input:checkbox[name=contentId]').length) {
			$accoTblWrap.prev('div.module_tb').find('input:checkbox.input-checkbox-all').prop('checked', true);
		} else {
			$accoTblWrap.prev('div.module_tb').find('input:checkbox.input-checkbox-all').prop('checked', false);
		}
	});

	// 탭 컨텐츠 담기 이벤트
	$('#tab-contents .btn-module-folder-save').bind('click', function () {
		var $accordionItem = $(this).parent().parent().prev('div.accordion');
		if ($accordionItem.find('input[name=contentId]:checked').length == 0) {
			alert('담을 자료를 선택해 주세요.');
			return false;
		}

		var contentArray = []; // 컨텐츠 임시 담기 배열
		$accordionItem.find('input[name=contentId]:checked').each(function () {
			contentArray.push($(this).val());
		});
		var contentSet = new Set(contentArray); // 컨텐츠 중복 제거
		var content = '';
		if (contentSet.size > 0) content = Array.from(contentSet).join(',');

		Layer.openFolderMain({
			menu: window.globals.menu,
			type: 'TEXTBOOK',
			parameter: {
				textbookCd: currentClassInfo.textbookCd,
				code2: content,
			}
		});
	});

	// 탭 컨텐츠 다운로드 이벤트
	$('#tab-contents .btn-module-download').bind('click', function () {
		var $accordionItem = $(this).parent().parent().prev('div.accordion');
		if ($accordionItem.find('input[name=contentId]:checked').length == 0) {
			alert('다운로드할 자료를 선택해 주세요.');
			return false;
		}

		var contentArray = []; // 컨텐츠 임시 담기 배열
		$accordionItem.find('input[name=contentId]:checked').each(function () {
			contentArray.push($(this).val());
		});
		var contentSet = new Set(contentArray); // 컨텐츠 중복 제거
		var content = '';
		if (contentSet.size > 0) content = Array.from(contentSet).join(',');

		Popup.openFileDownloadDext(content);
	});
	// 문서자료 이벤트
	$('#tab-contents').on('click', '.btn-site-url', function (e) {
		if (SessionUtils.isLogin()) {
			SessionUtils.confirmValidMember(function (valid) {
				if (!valid) {
					e.preventDefault();
				}
			});
		} else {
			e.preventDefault();
		}
	});
	// 컨텐츠 다운로드
	$('#tab-contents').on('click', '.btn-download', function () {

		var data = $(this).data();
		var content = data.content + '';
		var fileType = data.fileType;
		var mediaKind = data.mediatype;
		var url = data.url;
		if (!content) {
			alert('자료가 없습니다.');
			return false;
		}

		/*
		// 차시자료 문서자료 다운로드 에서 차시 PPT 인 경우 준비 중 알럿처리
		try {

			var title = data.title;
			if ($.trim(data.title) == '차시 PPT') {
				var checkTextbookCd = '106339,106338,106268,106340,106267,106341';
				var textbookCd = data.textbookCd
				if (checkTextbookCd.indexOf(textbookCd) > -1) {
					alert('준비 중입니다.');
					return;
				}
			}
		}catch(e){console.log(e)}
		*/

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

	// 컨텐츠 담기
	$('#tab-contents').on('click', '.btn-folder-layer-open', function () {
		var content = $(this).data().content;
		Layer.openFolderMain({
			menu: window.globals.menu,
			type: 'TEXTBOOK',
			parameter: {
				textbookCd: currentClassInfo.textbookCd,
				code2: content,
			}
		});
	});

	// 다운로드 선택 초기화
	$("button.ico.reset").click(function () {
		var $accordionItem = $(this).parent().parent().prev('div.accordion');
		if ($accordionItem.find('input[name=contentId]:checked').length > 0) {
			$accordionItem.find('input[name=contentId]:checked').attr("checked", false);
			$accordionItem.find('input.input-checkbox-all:checked').attr("checked", false);
			ctrlBarCount();
		}
	});

	// 통합뷰어 팝업 오픈
	$('#tab-contents').on('click', '.btn-viewer-main-open', function () {
		var data = $(this).data();
		if (data.fileType === 'FT207') {
			return;
		}
		Popup.openViewerMain(data.contentId, data.contentGubun, currentClassInfo.gubunCd);
	});

	// 컨텐츠 티칭뷰어
	$('#tab-contents').on('click', '.btn-teaching-open', function () {
		var content = $(this).data().content;
		var eduCourseId = $(this).data().eduCourseId;
		Popup.openTeachingNoteViewer(eduCourseId, content);
	});

	// 좌측 메뉴 h5 클릭시 하위 링크로 이동
	$('.data-textbook-lnb h5').bind('click', function () {
		location.href = $(this).find('a').attr('href');
	});

	// 내 교과서 등록
	$('#input-member-textbook').bind('click', function (e) {
		SessionUtils.confirmValidMember(function (valid) {
			if (valid) {

				var schCode = window.globals.member.schCode;
				if (schCode != 'ES') {
					alert("내 학교급이 아닙니다.");
					// 체크 취소
					$('#input-member-textbook').prop('checked', false);
					return false;
				}

				Ajax.execute({
					url: '/textbook/save.json',
					data: {
						educourseId: currentClassInfo.textbookCd
					},
					type: 'post',
					success: function (data) {
						// 실패인경우
						if (data.code != 'SUCCESS') {
							alert(data.message);
							// 체크 취소
							$('#input-member-textbook').prop('checked', false);
						}
					}
				});
			} else {
				e.preventDefault();
			}
		});
	});

	// 단원별 자료 다운로드
	$('#btn-download').bind('click', function () {
		// 팝업창 호출
		Layer.openLayer({
			url: '/textbook/download.popup?textbookCd=' + currentClassInfo.textbookCd,
			callback: function ($div) {
				// 다운로드 클릭 이벤트
				$div.find('.mCustomScrollbar').mCustomScrollbar();
				$div.find('.file_wrap a').bind('click', function () {
					var contentId = $(this).data().contentId;
					if (!contentId) {
						alert('자료가 없습니다.');
						return false;
					}
					// 새창으로 다운로드 호출
					Popup.openFileDownloadDext(contentId);
				});
			}
		});
	});


	// 전자 저작물 다운로드
	$('#btn-license-download').bind('click', function (e) {
		var data = $(this).data();
		// 검인정 홍보 교과서의 경우
		if (data.isVisangTextbook) {
			if (SessionUtils.isLogin()) {
				SessionUtils.confirmValidMember(function (valid) {
					if (valid) {
						// 다운로드 처리
						var win = window.open(data.url, '_blank');
						win.focus();
					}
				});
			}else{
				e.preventDefault();
			}
		} else {
			// 기존교과서일 경우
			if (!SessionUtils.isLogin(location.href)) {
				e.preventDefault();
			} else {
				var win = window.open(data.url, '_blank');
				win.focus();
			}
		}
	});

	// 스마트 교수자료 DVD 다운로드
	$('#btn-download-dvd').bind('click', function () {
		// 새창으로 다운로드 호출
		Popup.openTextbookDownloadDvd(gradeTerm);
	});

	// 저자소개
	$('#btn-author').bind('click', function () {
		Popup.openWindow({
			name: 'openTextbookAuthor',
			//fullscreen: true,
			width: 1076,
			height: 690,
			url: '/textbook/author.popup?codelistId=' + currentClassInfo.textbookCd
		});
	});

	// 주목할 페이지
	$('#btn-attention').bind('click', function () {
		Popup.openWindow({
			name: 'openTextbookAttention',
			width: 1076,
			height: 690,
			url: '/textbook/attention.popup?codelistId=' + currentClassInfo.textbookCd
		});
	});

	// 정오표
	$('#btn-errata').bind('click', function () {
		// 팝업창 호출
		Layer.openLayer({
			url: '/textbook/errata.popup?codelistId=' + currentClassInfo.textbookCd,
			callback: function ($div) {
				// 미리보기
				$div.find('#btn-preview').bind('click', function () {
					Popup.openWindow({
						name: 'openTextbookErrataPreview',
						fullscreen: true,
						url: '/textbook/errata/preview.popup?mediaId=' + $(this).data().contentId + '&textbookCd=' + currentClassInfo.textbookCd
					});
				});
				// 다운로드
				$div.find('#btn-download').bind('click', function () {
					Popup.openFileDownloadDext($(this).data().contentId);
				});
			}
		});
	});

	// 함께한 선생님
	$('#btn-teacher-layer-open').bind('click', function () {
		// 팝업창 호출
		Layer.openLayer({
			url: '/textbook/teacher/' + currentClassInfo.textbookCd + '.popup',
			callback: function () {
			}
		});
	});

	// 차시창 소개
	$('#btn-period-about-layer-open').bind('click', function () {
		var url = $(this).data().url;
		var textbookCd = $(this).data().textbookCd;
		//요청사항 [RMS-9145] :[개발] 비바샘 초등 봄,여름 '차시창 소개' 영상 삽입 요청 106351, 106352, 106353 교과서 제외 2022-02-03 김인수
		/*
		if (textbookCd == '106354') {
			alert('준비 중입니다.');
			return false;
		}
		*/
		if (StringUtils.isEmpty(url)) {
			// alert('9월 중 오픈 됩니다!');
			alert('차시창 소개에 연결된 URL 정보가 없습니다.');
			return false;
		}
		Popup.openWindowTab(window.globals.config.cdnDomain + '/Smart/player/video.html?t=' + url, 'openPeriodAboutLayer');
	});

	// 어떤 친구들과 공부할까요
	$('#btn-friend-layer-open').bind('click', function () {
		// 팝업창 호출
		Layer.openLayer({
			url: '/textbook/friend/' + currentClassInfo.textbookCd + '.popup',
			callback: function () {
			}
		});
	});

	// 0차시창 호출
	$('#btn-popup-period-open').bind('click', function () {
		// 국어 1-1 가, 국어 2-1 가, 국어 5-1 가, 국어 6-1 가 > 0차시
		/*
		var data = $(this).data();
		if(data.textbookCd == '106177' || data.textbookCd == '106179' || data.textbookCd == '106322' || data.textbookCd == '106326'){
			alert('준비 중입니다.');
			return false;
		}else{
			// 팝업창 호출
			Popup.openPeriodViewer(periodZeroSiteUrlFirst.periodId, currentClassInfo.textbookCd, currentClassInfo.class1Cd);
		}
		*/

		var lnbCode = 'A' + currentClassInfo.textbookCd + '-' + currentClassInfo.class1Cd;
		// 팝업창 호출
		Popup.openPeriodViewer(periodZeroSiteUrlFirst.periodId, currentClassInfo.textbookCd, lnbCode);
	});

	// 탭 컨텐츠 차시열기 버튼 이벤트
	$('#tab-contents').on('click', '.btn-period-open', function () {
		if (!SessionUtils.isLogin(location.href)) {
			return;
		}

		// 차시가 선택된 경우 '교과 자료 모음' 탭으로 이동 시 '교과 공통 자료' 선택이 해제되고 해당 단원이 펼쳐지게 함.
		if ($("div.accoItem.yearData").hasClass("on")) {
			$("div.accoItem.yearData").removeClass("on").find('.accoCont').slideUp();
			var class1Cd = $(this).closest("div.accoItem").find("a.btnAcco").data('class1Cd');
			$("a.btnAcco[data-class1-cd="+class1Cd+"]").eq(1).closest("div.accoItem").addClass("on");
		}

		var data = $(this).data();
		var periodId = data.periodId;
		var lnbCode = 'A' + currentClassInfo.textbookCd + '-' + currentClassInfo.class1Cd;
		parameter.periodId = periodId;
		Popup.openPeriodViewer(periodId, '', lnbCode);
	});

	$("#textbookSelect").on('change', function() {
		if($("#textbookSelect").val() != '') {
			location.href = $("#textbookSelect").val();
		}
	});

	// PPT 팝업
	if (isPptPopup) {
		// if (StorageUtils.isOpened(STORAGE_NAME_PPT_CLOSE)) {
		// 	Layer.openLayer({
		// 		url: '/textbook/ppt.popup',
		// 		callback: function($div) {
		// 			// 다시 보지 않기
		// 			$div.find('input[name=display]').bind('click', function() {
		// 				if ($(this).prop('checked')) {
		// 					// 일자만 저장
		// 					StorageUtils.setValueDate(STORAGE_NAME_PPT_CLOSE);
		// 				} else {
		// 					StorageUtils.remove(STORAGE_NAME_PPT_CLOSE);
		// 				}
		// 			});
		// 		}
		// 	});
		// }
	}

	// Theme 팝업
	if (isThemePopup) {
		/*
		Layer.openLayer({
			url: '/textbook/theme.popup',
			callback: function() {
			}
		});
		*/
	}

	// 수학 팝업
	/*
	if (isMathematicsPopup) {
		if (StorageUtils.isOpenedForever(STORAGE_NAME_MATHEMATICS_CLOSE)) {
			Layer.openLayer({
				url: '/textbook/mathematics.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_MATHEMATICS_CLOSE);
						} else {
							StorageUtils.remove(STORAGE_NAME_MATHEMATICS_CLOSEE);
						}
					});

					$div.find('.down_list_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	//초등 수사과 수학 팝업
	/*
	if (isMathematicsHighPopup) {
		if (StorageUtils.isOpenedForever(STORAGE_NAME_MATHEMATICSHIGH_CLOSE)) {
			Layer.openLayer({
				url: '/textbook/mathematicsHigh.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_MATHEMATICSHIGH_CLOSE);
						} else {
							StorageUtils.remove(STORAGE_NAME_MATHEMATICSHIGH_CLOSEE);
						}
					});

					$div.find('.down_list_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	// 과학 실험실 팝업
	/*
	if (isScienceLabPopup) {
		if (StorageUtils.isOpenedForever(STORAGE_NAME_SCIENCELAB_CLOSE)) {
			Layer.openLayer({
				url: '/textbook/scienceLab.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_SCIENCELAB_CLOSE);
						} else {
							StorageUtils.remove(STORAGE_NAME_SCIENCELAB_CLOSE);
						}
					});

					$div.find('.btn_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	// 초등 수사과 과학 팝업
	/*
	if (isScienceLabHighPopup) {
		if (StorageUtils.isOpenedForever(STORAGE_NAME_SCIENCELABHIGH_CLOSE)) {
			Layer.openLayer({
				url: '/textbook/scienceLabHigh.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_SCIENCELABHIGH_CLOSE);
						} else {
							StorageUtils.remove(STORAGE_NAME_SCIENCELABHIGH_CLOSE);
						}
					});

					$div.find('.btn_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	// 링크 체크
	if (StringUtils.isNotEmpty(currentClassInfo.urlLink)) {
		// 교과서 메인 이미지 클릭 이벤트
		$('#btn-url-link').bind('click', function () {
			Popup.openWindowTab(currentClassInfo.urlLink);
		});
	}

	// 교과서 장점 체크
	if (StringUtils.isNotEmpty(currentClassInfo.mergeLinkUrl5)) {
		$('#btn-advantage').bind('click', function () {
			console.log(currentClassInfo.mergeLinkUrl5)
			if (currentClassInfo.mergeLinkUrl5 == "POPUP") {
				// 검정 교과서용 이미지 팝업
				Popup.openWindow({
					name: 'openTextbookAttention',
					width: 1076,
					height: 690,
					url: '/textbook/advantage.popup?codelistId=' + currentClassInfo.textbookCd
				});
			} else {
				// 기존 뷰어 팝업
				Popup.openWindow({
					name: 'openTextbookAdvantage',
					url: currentClassInfo.mergeLinkUrl5,
					fullscreen: true
				});
			}

		});
	}

	// 지역화자료실 팝업
	/*
	if (isLocalLibraryPopup) {
		//원래 사용하던 '다시 보지 않기' 스토리지 비활성화 후 팝업 다시 나오게
		if(StorageUtils.getValue(STORAGE_NAME_LOCALLIBRARY_CLOSE) !== null) {
			StorageUtils.remove(STORAGE_NAME_LOCALLIBRARY_CLOSE);
		}

		if (StorageUtils.isOpenedForever(STORAGE_NAME_LOCALLIBRARY_CLOSE_AGAIN)) {
			Layer.openLayer({
				url: '/textbook/localLibrary.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_LOCALLIBRARY_CLOSE_AGAIN);
						} else {
							StorageUtils.remove(STORAGE_NAME_LOCALLIBRARY_CLOSE_AGAIN);
						}
					});

					$div.find('.btn_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	// 초등 수사과 사회 팝업
	/*
	if (isLocalLibraryHighPopup) {
		if (StorageUtils.isOpenedForever(STORAGE_NAME_LOCALLIBRARYHIGH_CLOSE)) {
			Layer.openLayer({
				url: '/textbook/localLibraryHigh.popup',
				callback: function ($div) {
					// 다시 보지 않기
					$div.find('input[name=display]').bind('click', function () {
						if ($(this).prop('checked')) {
							// 일자만 저장
							StorageUtils.setValueDate(STORAGE_NAME_LOCALLIBRARYHIGH_CLOSE);
						} else {
							StorageUtils.remove(STORAGE_NAME_LOCALLIBRARYHIGH_CLOSE);
						}
					});

					$div.find('.btn_close').bind('click', function () {
						$div.remove();
					});
				}
			});
		}
	}
	*/
	// 연간수업자료 안내 공지 토스트 팝업
	if (isYearlyToastPopup) {
		if (StorageUtils.isOpened(STORAGE_NAME_YEARLY_TOAST_CLOSE) || isFirst) {
			$('#yearlyToastPop').show();

			// 최초 진입시 "다시 보지 않음" 처리 제거
			if (isFirst) {
				StorageUtils.remove(STORAGE_NAME_YEARLY_TOAST_CLOSE);
			}

			// 연간 수업 자료 안내 팝업
			$('#yearlyToastPop .pop_close').on('click', function () {
				// 팝업 닫을때 "다시 보지 않음" 처리
				StorageUtils.setValueDate(STORAGE_NAME_YEARLY_TOAST_CLOSE);
				$('#yearlyToastPop').hide();
			});
		}
	}

	// 최초 목록 조회
	getList(1);

	// 내 진도 차시 도움말 팝업
	$('.my_chasi_bar .btn_info').on('click', function(){
		$(this).next('.info_pop').toggleClass('on');
	});

	// 내 차시 클릭 이벤트
	$('.btn-period-viewer').bind('click', function() {
		var data = $(this).data();
		Popup.openPeriodViewer(data.periodId, '', data.lnbCode);
	});

	//1110001 ~ 1110005 자료정렬기준 적용
	$('#tab-contents select[name=order_type]').bind('change', function () {
		reset = true;
		getList();
	})






	/*CSS관련 코드 */


	//tab_conts의
	for(let i=0; i<$('#tab-educourse li').length; i++){
		if($('.tab_conts').eq(i).css('display') == "block"){
			tabH2=$('.tab_conts').eq(i).find('.tab_second').outerHeight();
			break;
		}
	}

	//유형분류2 앵커처리
	$(window).scroll(function(){

		for(let i=0; i<$('#tab-educourse li').length; i++){
			if($('.tab_conts').eq(i).css('display') == "block"){
				tabH2=$('.tab_conts').eq(i).find('.tab_second').outerHeight();
				break;
			}
		}

		if($(window).scrollTop() > 765){
			$('.tab_second, .special').addClass('fix');
			$('.special').siblings('.tab_conts').css('padding-top',tabH);
			$('.tab_wrap').siblings('.tab_conts').css('padding-top',tabH2);
		}

		if($(window).scrollTop() < 766) {
			$('.tab_second, .special').removeClass('fix');
			$('.special').siblings('.tab_conts').css('padding-top',0);
			$('.tab_wrap').siblings('.tab_conts').css('padding-top',0);
		}
	});

	$('.lnb.textbookLnb .menu_new ul li .debth a i').click(function(e){

		e.preventDefault();

		if($(this).parents('.debth').siblings().has('.sub_depth')){
			$('.sub_depth').hide();
			$(this).parent('a').siblings('.sub_depth').css('display','block');
		} else {
			$(this).parent('a').siblings('.sub_depth').css('display','block');
		}

	});

	$('.sub_depth_tit i').click(function(){
		$(this).parents('.sub_depth').hide();
	});

	$(".lnb.textbookLnb .menu_new ul li .debth a i").click(function(){
		$(this).parents('.depth').find(".sub_depth").toggleClass("on");
	});

	$(function(){

		//LNB홍보배너
		if($('.banner_prom a').length === 0){
			$('.banner.eleClass').addClass('mb100');

			$('.banner_prom').hide();
		}else {
			$('.banner.eleClass').removeClass('mb100');
		}


		if($('.banner.eleClass .banner_group a').length === 0){
			$('.banner.eleClass').hide();
		}

	});

	// 학년 선택 시 동작
	$("input[name=grade]").click(function () {
		location.href = "/textbook/list?grade="+$(this).val()+"&term="+$("input[name=semester]:checked").val();
	});
	// 학기 선택 시 동작
	$("input[name=semester]").click(function () {
		location.href = "/textbook/list?grade="+$("input[name=grade]:checked").val()+"&term="+$(this).val();
	});

	// 교과서 선택 시 동작
	$("a.textbookOpt").click(function () {
		location.href = "/textbook/list?textbookCd="+$(this).data().codelistId+"&term="+$("input[name=semester]:checked").val();
	})

	// 큐레이션 클릭 시 동작
	$(document).on('click', 'a.btn.btnCuration', function () {
		var cuData = $(this).data();
		if (cuData === '지역화 자료실') {
			gtag('event', '교과서 자료실', {
				'event_category': '지역화',
				'event_label': '추천 자료',
				'value': 1
			});
		}

		/*
		 * 2023-03-06 강남구
		 * gtag 추가(사회 3~6학년)
		 */
		var goUrl = $(this).data('go-url');
		if (goUrl.indexOf('/themeplace/localLibrary/main') > -1 || goUrl.indexOf('/themeplace/govTextbookStat/main') > -1) {	//지역화 자료실, 교과 통계 시각화
			var checkTextBookCd = location.href.substring(location.href.indexOf('textbookCd=') + 11, location.href.indexOf('textbookCd=') + 11 + 6);
			var title = "";
			var subTitle = "지역화 자료실";
			if(goUrl.indexOf('/themeplace/govTextbookStat/main') > -1){
				subTitle = "교과 통계 시각화";
			}
			if (checkTextBookCd == 106347) {
				title = "사회 3-1(설규주)";
			} else if (checkTextBookCd == 106345) {
				title = "사회 3-1(김현섭)";
			} else if (checkTextBookCd == 106348) {
				title = "사회 4-1(설규주)";
			} else if (checkTextBookCd == 106346) {
				title = "사회 4-1(김현섭)";
			} else if (checkTextBookCd == 106367) {
				title = "사회 5-1(설규주)";
			} else if (checkTextBookCd == 106365) {
				title = "사회 5-1(김현섭)";
			} else if (checkTextBookCd == 106368) {
				title = "사회 6-1(설규주)";
			} else if (checkTextBookCd == 106366) {
				title = "사회 6-1(김현섭)";
			} else if (checkTextBookCd == 106359) {
				title = "사회 3-2(설규주)";
			} else if (checkTextBookCd == 106357) {
				title = "사회 3-2(김현섭)";
			} else if (checkTextBookCd == 106360) {
				title = "사회 4-2(설규주)";
			} else if (checkTextBookCd == 106358) {
				title = "사회 4-2(김현섭)";
			}
			gtag('event', '에듀테크 테마관', {
				'event_category': '교과 자료',
				'event_label': title + '_' + subTitle
			});
		}

		if (cuData.linkType === 'P') {
			recommendPopup(cuData.goUrl);
		} else {
			if (cuData.target === '_blank') {
				var win = window.open(cuData.goUrl, cuData.target);
				win.focus();
			} else { // _self
				location.href = cuData.goUrl;
			}
		}
	});

	// LNB 학년명 셋팅
	$("#gradeName").html($("input:radio[name=grade]:checked").data('grade-num')+"학년");

	/*CSS관련 코드 */

	// onCurationSwiper();
	onAccordion();
});


function initScroll() {
	var gnbHeight = $('#gnb').outerHeight();
	var top = $(".subcontents").offset().top - gnbHeight + (48 - 4); // (여백 - boxshadow값)

	$('html, body').scrollTop(top);

	// var $quickMenu = $('#quickMenu');
	// var $header = $('.wrap .header');
	// var $wrap = $('.wrap');
	//
	// if (!$header.is('.type02, .type03')) {
	// 	if ($(this).scrollTop() > 191) {
	// 		$header.addClass('fix');
	// 		$wrap.find('.logo').prependTo($('.gnb article'));
	// 		$wrap.css('paddingTop', '214px');
	// 	} else if ($(this).scrollTop() < 191) {
	// 		$header.removeClass('fix');
	// 		$wrap.find('.logo').prependTo($('.top article'));
	// 		$wrap.css('paddingTop', 0);
	// 	}
	// }
}

//뷰어
function popPeriodViewer(contentId, contentGubun, tocNo, fileType, siteUrl, periodId) {
	var availWidth = window.screen.availWidth;
	var availHeight = window.screen.availHeight;
	var browserLeftPos = window.screenLeft || window.screenX;
	var availLeft = window.screen.availLeft != undefined ? window.screen.availLeft : browserLeftPos > availWidth ? availWidth : 0;
	var availTop = window.screen.availTop != undefined ? window.screen.availTop : 0;

	//http://www.vivasam.com

	if (tocNo == '') { //개별뷰어

		// var options = 'top=' + availTop + ',left=' + availLeft + ',width=' + availWidth + ',height=' + availHeight + ',screenX=' + availLeft + ',screenY=' + availTop + ',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';
		// var popViewer = window.open(url, "popViewer", options);

		if (fileType === 'FT207' || contentGubun === 'UTUBE' || fileType === 'FT206') {

			if (fileType === 'FT206' && siteUrl) {
				contentId = getYoutubeId(siteUrl);
				contentGubun = "UTUBE";
			}

			Popup.openWindow({
				name: "컨텐츠 뷰어",
				url: "//" + location.host + '/period/content.popup?contentGubun=' + contentGubun + '&contentId=' + contentId,
				fullscreen: true
			});
		} else if (fileType === 'TOOL') {
			Popup.openWindow({
				name: "컨텐츠 뷰어",
				url: "//" + location.host + '/period/tool.popup?contentGubun=' + contentGubun + '&contentId=' + contentId + '&periodId=' + periodId,
				fullscreen: true
			});
		} else {
			Popup.openViewerMain(contentId, contentGubun);
		}
		// if (window.focus) {
		// 	popViewer.focus();
		// }
	} else { //통합뷰어
		var data = setTocData();
		if (data == _tocData) {
			var url = '/period/total.popup?periodId=' + _periodId + '&tocNo=' + tocNo + '&contentGubun=' + contentGubun + '&contentId=' + contentId;
			var options = 'top=' + availTop + ',left=' + availLeft + ',width=' + availWidth + ',height=' + availHeight + ',screenX=' + availLeft + ',screenY=' + availTop + ',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,scrolling=0,scrollbars=no';

			//$('.bgMask').show();
			var popPeriodViewer = window.open(url, "popPeriodViewer", options);
			if (window.focus) {
				popPeriodViewer.focus();
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
					alert("저장되었습니다.");
				});
			}
		}
	}
}

function openLocalLibrary() {
	var url = "/themeplace/localLibrary/main";
	if (SessionUtils.isLogin()) {
		url = "/themeplace/localLibrary/sub";
	}
	Popup.openWindowTab(url);

}

function recommendPopup(url) {
	window.open(url, '', "width=901, height=678, resizable=yes, scrollbars=yes, status=yes");
}

//페이지 이동없이 유형분류1 & 유형분류2 선택시 URL 생성
function setUrlByContGroup(contGroup1, contGroup2) {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var url = window.location.href.split("?")[0];

	if(param.has("contGroup")) {
		param.set("contGroup", contGroup1);
	} else {
		param.append("contGroup", contGroup1);
	}


	if(contGroup2 !== undefined && contGroup2.length !== 0) {
		if(param.has("contGroup2")) {
			param.set("contGroup2", contGroup2);
		} else {
			param.append("contGroup2", contGroup2);
		}
	} else {
		param.delete("contGroup2");
	}

	history.pushState({}, null, url + "?" + param.toString());
}

function deleteUrlQueryString() {
	var query = window.location.search;
	var param = new URLSearchParams(query);
	var url = window.location.href.split("?")[0];

	param.delete("contGroup");
	param.delete("contGroup2");

	history.pushState({}, null, url + "?" + param.toString());
}

// 2023-02-20 큐레이션 롤링
// function onCurationSwiper() {
// 	var curationSwiper = new Swiper('.curationSwiper', {
// 		slideClass: 'curationSlide',
// 		slidesPerView: '1',
// 		spaceBetween: 0,
// 		autoplay: {
// 			delay: 3000
// 		},
// 		speed: 0,
// 		loop: true,
// 		loopAdditionalSlides:1,
// 		allowTouchMove: false
// 	});
// }

// 2023-02-20 아코디언
function onAccordion() {
	var $accordion = $('.accordion');
    var $accoCtrl = $accordion.find('.btnAcco');

    $accoCtrl.on('click', function(e) {
		e.preventDefault();
		onScrollMove();
		/*
		* TODO: 56사회2단원막음 232 신규교과오픈 시 사회56학년 2학기-2단원은 탭클릭 시 진입불가 알럿처리
		* */
		// var class1Cd = $(this).data("class1-cd");
		// if (class1Cd === 20102383 || class1Cd === 20102379 || class1Cd === 20102385 || class1Cd === 20102381) {
		// 	alert('8.12일에 업데이트 예정입니다.');
		// 	return;
		// }

		if( $(this).parent('.accoItem').hasClass('on') ) {
			$(this).parent('.accoItem').removeClass('on').find('.accoCont').slideUp();
		} else {
			$(this).parent().siblings('.accoItem').removeClass('on').find('.accoCont').slideUp();
			var nextAccoCont = $(this).next('.accoCont');
			nextAccoCont.slideDown().parent('.accoItem').addClass('on');

			// 목록 가져오기 ajax
			var dataCode = $("#tab-educourse li.on").children("a").data("code");
			var gubunCd = currentClassInfo.gubunCd;
			var url;
			var _parameter;
			var selector;
			currentClassInfo.class1Cd = $(this).data("class1-cd");
			parameter.educourseId = $(this).data("class1-cd");
			$("ul.gnbmenu").find("a.evaluation").attr('href'
				, '/evaluation/list?textbookCd='+currentClassInfo.textbookCd
				+'&class1Cd='+$(this).data("class1-cd")
				+'&term='+parameter.term
			); // 대단원 선택할때마다 평가자료 링크 동적 변경
			if (dataCode === 'PERIOD') { // 단원별 보기
				/* 2023-04-04 songth 수정
				* 단원별 보기의 차시 이동 시마다 '교과 자료 모음'의 활성화 탭도 옮겨주기 */
				$(".tab_conts").slice(1).find("div.accoItem.on").children("div.accoCont").hide();
				$(".tab_conts").slice(1).find("div.accoItem.on").removeClass("on");
				$(".tab_conts").slice(1).find("a.btnAcco[data-class1-cd='"+$(this).data("class1-cd")+"']").each(function () {
					$(this).next("div.accoCont").show();
					$(this).parent("div.accoItem").addClass("on");
				});
				$('#tab-educourse li a').slice(1).data("load", false);

				url = '/textbook/list/period';
				_parameter = {
					textbook: currentClassInfo.textbookCd,
					class1Cd: currentClassInfo.class1Cd,
					gubunCd: gubunCd,
					educourseId: parameter.educourseId,
					periodId: parameter.periodId,
					page: 1,
				};
				selector = '.periodItemArea';
			} else if (dataCode === 1110001) { // 교과 자료 모음
				// 수업자료는 기존에 음원자료+이미지자료를 같이 모아서 같이 처리
				url = '/textbook/list/class';
				var yearGubunCd = $(this).data("gubun-cd");
				if (yearGubunCd !== undefined) gubunCd = yearGubunCd;

				_parameter = {
					codelistId: currentClassInfo.textbookCd,
					textbook: currentClassInfo.textbookCd,
					gubunCd: gubunCd,
					educourseId: currentClassInfo.class1Cd,
					type1: dataCode,
					page: 1,
					periodId: parameter.periodId,
					unitNum: $(this).data("unit-num"),
				};
			}

			if (nextAccoCont.parent('.accoItem').hasClass('loaded')) {
				return; // 이미 데이터가 존재하는 경우에는 다시 데이터 로드 하지 않음
			}

			Ajax.execute({
				url: url,
				data: _parameter,
				type: 'get',
				dataType: 'html',
				success: function (html) {
					if (selector === undefined) {
						nextAccoCont.empty();
						nextAccoCont.html($(html));
					} else {
						nextAccoCont.find(selector).empty();
						nextAccoCont.find(selector).html($(html));
					}
					nextAccoCont.parent('.accoItem').addClass('loaded');
					onScrollMove();
				}
			});
		}
    });
}

function onScrollMove() {
	var onTabIdx = $('#tab-educourse li.on').index();
	setTimeout(function() {
		var gnbHeight = $('.gnb').outerHeight() - 5; // boxshadow값
		var onScrollTop = $('.tab_conts').eq(onTabIdx).find('.accoItem.on').offset().top - gnbHeight;
		$('html, body').scrollTop(onScrollTop);
	}, 500);
}

// 담기, 다운로드 고정바 갯수 및 퍼블 동적 변환
function ctrlBarCount() {
	var $dataCtrlBar = $('.dataCtrlBar');
	var $cidCheckedItems = $(".tab_conts").eq($("#tab-educourse li.on").index()).find("input[name=contentId]:checked");
	var $dataCtrlBarTotalCnt = $('.dataCtrlBar #dataCtrlTotalCnt');
	var $dataCtrlTip = $dataCtrlBar.find('.dataCtrlTip');
	var $btnTipClose = $dataCtrlTip.find('.btnClose');

	if ($cidCheckedItems.length > 0) {
		$dataCtrlBar.addClass('on');
		$dataCtrlTip.addClass('on');
	} else {
		$dataCtrlBar.removeClass('on');
		$dataCtrlTip.removeClass('on');
	}

	$dataCtrlBarTotalCnt.data('ctrl-total-cnt', $cidCheckedItems.length);
	$dataCtrlBarTotalCnt.html('['+$cidCheckedItems.length+']');

	$btnTipClose.on('click', function() {
		$dataCtrlTip.hasClass('on') && $dataCtrlTip.removeClass('on');
	});
}

// 차시창 > 차시뷰어 수업 시작하기 클릭 시 해당 차시 타이틀 활성화 표시 (부모창 period.js 에서 호출함)
function periodTitleHighlight(periodId) {
	$('[data-period-id="'+periodId+'"]').closest("table.textbookList").find("tr").removeClass("recent"); // 전체 하이라이트 삭제
	$('[data-period-id="'+periodId+'"]').closest('tr').addClass('recent'); // 클릭한 차시에 하이라이트 주기

	var query = window.location.search;
	var param = new URLSearchParams(query);
	var url = window.location.href.split("?")[0];
	param.set("periodId", periodId)
	history.pushState({}, null, url + "?" + param.toString());
}