var envDomain = {
	dev: "//dev-e.vivasam.com",
	local: "//localhost:8080",
	prod: "//e.vivasam.com",
	winProd: "//e.vivasam.com",
	winDev: "//dev-e.vivasam.com",
	prodbatch : "//e.vivasam.com"
}

$(function() {
	// 메인 슬라이더 적용
	var swiper = new Swiper('.main_visual', {
		// initialSlide: 0,
		effect: 'fade',
		slidesPerView: '1',
		centeredSlides: true,
		loop: true,
		loopAdditionalSlides: 1,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			stopOnLast: false,
		},
	});

	$('.rolling_wrap .rolling_item').each((idx, val) => {
		let slider = $(val).find('.swiper-container');
		var swiper2 = new Swiper(slider, {
			slidesPerView: '1',
			loop: true,
			direction: 'vertical',
			loopAdditionalSlides: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
	});

	var swiper4 = new Swiper('.institute_wrap', {
		effect: 'fade',
		slidesPerView: '1',
		loop: true,
		loopAdditionalSlides: 1,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// 교과자료 시간표
	const $timeTableBtn = $('.open_timetable_popup');
	const $timeTablePop = $('.timetable_popup');

	$timeTableBtn.on('click', function(){
		$timeTablePop.addClass('active');
		gtag('event', '시간표', {
			'event_category' : '메인_내수업시간표_버튼',
			'event_label' : '시간표 팝업',
			'value': 1
		});
	});

	$timeTablePop.on('click','.btn_close', function(){
		$timeTablePop.removeClass('active');
	});

	// 로그인 상태에서만 이벤트 처리
	if (window.globals.login) {
		// 내 교과서 클릭 이벤트
		$('#mytxtbook').click(function() {

			if(!prerequisite()){ return false; }

			$(this).toggleClass('on');
			if ($('#mytxtbook').hasClass('on')) {
				$('#mytxtbook-box').show();
				var x = document.getElementsByClassName("slider-wrap-product");
				for (var i = 0; i < x.length; i++) {
					var el = x[i];
					var swiper3 = el.getElementsByClassName("swiper-container")[0];
					var nx = el.getElementsByClassName("btn__right")[0];
					var pr = el.getElementsByClassName("btn__left")[0];
					new Swiper(swiper3, {
						slidesPerView: 'auto',
						spaceBetween: 10,
						loopFillGroupWithBlank: true,
						scrollbar: {
							el: '.mytxtbook_slidebar',
							draggable: true,
							dragSize: 17,
						}
						// navigation: {
						// 	nextEl: nx,
						// 	prevEl: pr
						// }
					});
				}
			} else if (!$('#mytxtbook').hasClass('on')) {
				$('#mytxtbook-box').hide();
			}
			$('#mychasi').removeClass('on');
			$('#mychasi-box').hide();
			showHideSpecialProposals();
		});

		// 내 차시 클릭 이벤트
		$('#mychasi').click(function() {

			if(!prerequisite()){ return false; }

			$(this).toggleClass('on');
			if ($('#mychasi').hasClass('on')) {
				$('#mychasi-box').show();
			} else if (!$('#mychasi').hasClass('on')) {
				$('#mychasi-box').hide();
			}
			$('#mytxtbook').removeClass('on');
			$('#mytxtbook-box').hide();
			showHideSpecialProposals();
		});
	}
	// 오늘 볼만한 비바샘이 있는경우
	if ($('#todayviva').length > 0) {
		new Swiper('.todayviva', {
			slidesPerView: '7',
			loopFillGroupWithBlank: true,
			spaceBetween: 4,
			scrollbar: {
				el: '.todayvivaBar',
				draggable: true,
				dragSize: 30
			}
		});
	}
	// 오늘 수업 뭐하지? 탭 클릭 이벤트
	$('#subject-schtype-tab-list li a').bind('click', function() {

		var $li = $(this).closest('li');
		// 탭 비활성화 및 현재 탭 활성화
		$('#subject-schtype-tab-list li').removeClass('on');
		$li.addClass('on');
		var data = $li.data();
		Ajax.execute({
			url: '/main/subject/list?schtypeCd=' + data.schtypeCd,
			type: 'get',
			dataType: 'html',
			success: function(html) {
				$('#subject-list').html(html);
			}
		});
	});

	// 수업 연구소 리스트 클릭시
	$('.class_wrap').on('click', 'ul li a', function (e) {
		var data = $(this).data();

		// 공모전 수상작 클릭시
		if (data.type === "award") {
			location.href = '/class/alive/award/detail?seqCode=' + data.id;
			return;
		}

		// 매주 순차 노출 자료 클릭시
		if (data.type === "rotate") {
			location.href = data.url;
			return;
		}

		// 쌤채널 클릭시
		if (!StringUtils.isEmpty(data.manageId) && !StringUtils.isEmpty(data.id)) {
			location.href = '/main/forsam/redirect?boardManageId=' + data.manageId + '&boardId=' + data.id;
			return;
		}
	});

	// 창의적 체험활동 리스트 클릭시
	$('.create_wrap').on('click', 'ul li a', function (e) {
		var data = $(this).data();
		if (!StringUtils.isEmpty(data.type) && !StringUtils.isEmpty(data.id)) {
			location.href = '/main/forsam/redirect?boardManageId=' + data.type + '&boardId=' + data.id;
		}
	});

	/*	230116 개편으로 인한 미사용
	// 오늘 수업 뭐하지? 컨텐츠 내용 클릭 이벤트
	$('#subject-list').on('click', 'li a', function(e) {
		e.preventDefault();
		if (!SessionUtils.isLogin(location.href, '로그인이 필요한 서비스입니다.')) {
			return false;
		} else {
			Popup.openPeriodViewerUrl($(this).attr('href'));
		}

	});

	$('#forsam-tag-list div.tag_chk').on('click', function(){
		var channal = $(this).data('channal');
		Ajax.execute({
			url: '/main/forsam/list?channal=' + channal,
			type: 'get',
			dataType: 'html',
			success: function(html) {
				$('#forsam-list').html(html);

				$('#forsam-list').find('a').on('click', function(){
					var data = $(this).data();
					if(!StringUtils.isEmpty(data.type) && !StringUtils.isEmpty(data.id)) {
						location.href = '/main/forsam/redirect?boardManageId='+data.type+'&boardId='+data.id;
					}
				});
			}
		});
	});
	*/
	// 내 교과서 가져오기
	Ajax.execute({
		url: '/main/textbook/list',
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$('#data-textbook-list').html(html);
		}
	});
	// 내 차시 가져오기
	if (isSchoolElementary) {
		getMainPeriodList(0);
	}
	// 최초 로딩시 첫번째 탭 가져오게 강제 트리거 이벤트 발생
	$('#forsam-tag-list div.tag_chk:eq(0)').trigger('click');

	// 2021-06-27 초등 오픈 레이어 팝업
	var $tab = $('#popOpenEl');
	if(!$.cookie("popOpenEl") && $tab.length > 0) {
		//$tab.show();
		var $tabCtrlWrap = $tab.find('.btnElTab');
		var $tabCtrl = $tabCtrlWrap.find('>.btnTab');
		var $tabViewWrap = $tab.find('.elTabCont');
		var $tabView = $tabViewWrap.find('.tabCont');
		var $tabCloseCtrl = $tab.find('>.btnClose');

		$tabCtrl.on('click', function() {
			var idx = $(this).index();
			$tab.addClass('tabon');
			$(this).addClass('on').siblings().removeClass('on');
			$tabView.eq(idx).addClass('on').siblings().removeClass('on');
		});

		$tabCloseCtrl.on('click', function() {
			$tab.removeClass('on tabon').find('.btnElTab, .elTabCont').hide();
		});
	} else {
		$tab.hide();
	}

	// 2021-08-20 비바샘 2학기 온라인 수업 자료 팝업 8월 31일 까지만 게시
	if (!$.cookie('semester2online')) {
        var today = new Date();
        var chkDate = new Date(2021, 8, 1);
        if(today.getTime() < chkDate.getTime()){
            $("#semester2online").show();
        }
	}else{
		$("#semester2online").hide();
	}

	// 2022-08-30 초등 검정 교과서 팝업
	// if (!$.cookie('popVisangtextbook0830')) {
	// 	$("#popVisangtextbook0830").css("display", "block");
	// }

	// 팝업 처리
	if ($.cookie('main_pop210225')) {
		$("#main_pop210225").css("display", "block");
		$.removeCookie('main_pop210225', {  path: '/ ' });
	}

	// 비번 변경 만료
	if (globals.login && expirationPWChange === 'N' && !$.cookie("popPwChange")) {
		$("#popPwChange").css("display", "block");
	}

	/*
	 * 요청사항 [RMS-9798] :[개발] 비바샘 팝업 2종 게시 중단 요청
	 * 2022-07-01 김인수
	 */
	console.log(globals.login ,ssoType, !$.cookie("popIntegratedMem"));
	if (globals.login && ssoType != '통합회원' && !$.cookie("popIntegratedMem")) {
		$("#popInfoUpdate").hide();
	 	$("#popIntegratedMem").css("display", "block");
	}

	// 필수 정보 입력 여부
	/*
	* 요청사항 [RMS-9282] :[개발] 회원 필수정보 입력 안내 팝업창 노출 로직 변경
	* 2022-04-25 김인수
 	 */
	// if (globals.login && globals.sso.certify && !globals.sso.required) {
	// 	$("#popInfoUpdate").css("display", "block");
	// }
	validationPopupCheck();

	// 학교 정보 입력 여부
	/*
	* 요청사항 [RMS-9282] :[개발] 회원 필수정보 입력 안내 팝업창 노출 로직 변경
	* 해당 팝업 표시 중지
	* 2022-02-28 김인수
 	 */
	// if (globals.login && !globals.member.schoolName) {
	// 	$("#popSchoolInfoUpdate").css("display", "block");
	// }

	// 마케팅 동의 여부
	if (globals.login && marketingAgreeCnt < 0) {
		$("#popMarketAgree").css("display", "block");
	}

	// 2022-01 신학기 시즌 팝업 추가 - 관리자 연동
	if (!$.cookie("popSeason")) {
		Layer.openLayer({
			url: '/season.popup',
			callback: function ($div) {
				// 다시 보지 않기
				$div.find('input[name=display]').bind('click', function () {
					if ($(this).prop('checked')) {
						// 일자만 저장
						$.cookie('popSeason', true, {expires: 7, path: '/'});
					}
				});
				$div.find('.popup_close').bind('click', function () {
					$div.remove();
				});
			}
		});
	}

	// 2023-01 캐릭터 공모전 투표 팝업 추가
	// if (!$.cookie("popCharacterCompetition2023")) {
	// 	Layer.openLayer({
	// 		url: '/competition.popup',
	// 		callback: function ($div) {
	// 			// 다시 보지 않기
	// 			$div.find('input[name=display]').bind('click', function () {
	// 				if ($(this).prop('checked')) {
	// 					// 일자만 저장
	// 					$.cookie('popCharacterCompetition2023', true, {expires: 365, path: '/'});
	// 				}
	// 			});
	// 			$div.find('.popup_close').bind('click', function () {
	// 				$div.remove();
	// 			});
	// 		}
	// 	});
	// }

	// 2022-04 vMagazine 다시 보지 않기
	// if (!$.cookie("vPop")) {
	// 	$("#vPopWrap").css("display", "block");
	// }
});

function validationPopupCheck() {
	if(globals.login == true) {
		Ajax.execute({
			url: "/my/info/checkMyinfoPopup.json",
			method: 'post',
			dataType : "json",
			data : {memberId : globals.member.memberId, vivasamformat : "json"},
			success: function (data) {
				var cookieUserId = $.cookie('popInfoUpdate');
				var popIntegratedMemYn = $("#popIntegratedMem").css('display') == 'block' ? false : true;

				if(data.response == true && StringUtils.isEmpty(cookieUserId) && popIntegratedMemYn) {
					$("#popInfoUpdate").css("display", "block");
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				return false;
			}
		});
	}
}

function prerequisite() {
	// 교사 인증 체크
	if (this.teacherCertifiedYn !== 'Y') {
		if (!confirm('교사 인증을 해 주세요. 지금 인증을 진행하시겠습니까?')) {
			return false;
		}
		location.href='/member/memberReCertify';
		return false;
	}

	//초등회원 전용 체크
	if(!isSchoolElementary){
		alert("초등 회원 전용 서비스입니다.");
		return false;
	}

	return true;
}

var DATE_CURRENT = new Date();
var DATE_PREV_MONTH_FIRST_DAY = new Date(DATE_CURRENT.getFullYear(), DATE_CURRENT.getMonth()-1, 1); // 전월첫날짜
var DATE_NEXT_MONTH_LAST_DAY = new Date(DATE_CURRENT.getFullYear(), DATE_CURRENT.getMonth()+2, 0); // 익월말일날짜

// 메인화면 정보 가져오기
function getMainPeriodList(idx) {
	var mmdd = $("#nowDate").html();
	if (idx !== 0) {
		// 좌,우 내비게이션 시 최대 조회기간은 전월1일~익월말일 까지임. 아닌 경우 튕겨냄
		var dTarget;
		var mm = mmdd.substr(0,2);
		if (idx > 0) {
			if (mm === '12' && DATE_CURRENT.getMonth() === 0) {
				// 현재 12월이고, 시작점이 1월일 때
				dTarget = new Date(DATE_PREV_MONTH_FIRST_DAY.getFullYear()+'.'+mmdd);
			} else if (mm === '01') {
				dTarget = new Date(DATE_NEXT_MONTH_LAST_DAY.getFullYear()+'.'+mmdd);
			} else {
				dTarget = new Date(DATE_CURRENT.getFullYear()+'.'+mmdd);
			}
			dTarget.setDate(dTarget.getDate()+1);
			if (dTarget > DATE_NEXT_MONTH_LAST_DAY) {
				return alert('전월 1일부터 익월 마지막일까지 조회가 가능합니다.');
			}
		} else {
			if (mm === '01' && DATE_CURRENT.getMonth() === 11) {
				// 현재 1월이고, 시작점이 12월일 때
				dTarget = new Date(DATE_NEXT_MONTH_LAST_DAY.getFullYear()+'.'+mmdd);
			}
			else if (mm === '12') {
				dTarget = new Date(DATE_PREV_MONTH_FIRST_DAY.getFullYear()+'.'+mmdd);
			} else {
				dTarget = new Date(DATE_CURRENT.getFullYear()+'.'+mmdd);
			}
			dTarget.setDate(dTarget.getDate()-1);
			if (dTarget < DATE_PREV_MONTH_FIRST_DAY) {
				return alert('전월 1일부터 익월 마지막일까지 조회가 가능합니다.');
			}
		}
	}

	Ajax.execute({
		url: '/main/period/list',
		type: 'get',
		dataType: 'html',
		data: {'mmdd': mmdd, 'idx': idx},
		success: function(html) {
			$('#data-timetable-list').html(html);

			// 내 차시 클릭 이벤트
			$('.btn-period-viewer').bind('click', function() {
				var data = $(this).data();
				Popup.openPeriodViewer(data.periodId, '', data.lnbCode);
			});
		}
	});
}

// 에듀테크 특화관 노출여부 결정
function showHideSpecialProposals() {
	if (!$("#mychasi").hasClass("on") && !$("#mytxtbook").hasClass("on")) {
		$("p.main_bnr_tit").css("display", "");
		$("div.recom_ch").css("display", "");
	} else {
		$("p.main_bnr_tit").css("display", "none");
		$("div.recom_ch").css("display", "none");
	}
}

// 수업시간표 영상 재생 모달
function helpTimetableVideo() {
	$("#timetablePopWrap").css("display", "block");
	// $("#mychasi").toggleClass("on");
	var videoTag = $("#timetablePop .video")[0];
	videoTag.currentTime = 0;
	$('#timetablePopWrap .thumb').show();
	$('#timetablePopWrap .btn_play').show();
}
