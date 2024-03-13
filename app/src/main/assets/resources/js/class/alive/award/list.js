var textbookKeywordList = [];

$(function () {

	//목록보기 팝업
	$('.popupWrap').hide();

	$('.view_list').click(function(){
		let idx = $(this).parents('.tabCont2').index();

		console.log(idx);


		$('.popupWrap').show();
		$('.popCont' + (idx+1)).show();
	});

	$('.btn_pop_close').click(function(){
		$('.popupWrap').hide();
		$('[class^="popCont"]' ).hide();
	});




	// 탭 메뉴
	$('#cont1').show();

	var tabMenu = $(".tab_menu:not(.tab_menu_event_ignore) li a"),
		tabPanel = $(".tab_conts");
	tabMenu.click(function(e) {
		e.preventDefault();
		var current = $(this).attr("href");
		tabPanel.hide();
		$(current).show();

		tabMenu.parent().removeClass("on")
		$(this).parent().addClass("on");
	});

	$('#cont2-1').css('display','flex');
	var tabMenu2 = $(".tab_menu2:not(.tab_menu_event_ignore) li a"),
		tabPanel2 = $(".tabCont2");
	tabMenu2.click(function(e) {
		e.preventDefault();
		var current = $(this).attr("href");
		tabPanel2.css('display','none');
		$(current).css('display','flex');

		tabMenu2.parent().removeClass("on")
		$(this).parent().addClass("on");
	});

	var reset = false;
	var getList = function() {

		var $tabConts = null;
		$tabConts = $('#contsTotal');
		Ajax.execute({
			url: '/class/alive/award/awardList',
			data: {
				page : $('input[name=page2]').val(),
				textbookKeywordList : textbookKeywordList,
			},
			type: 'get',
			dataType: 'html',
			success: function(html) {
				$tabConts.empty();
				$tabConts.append($(html));
				reset = false;
			}
		});
	};

	getList();

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#contsTotal')
	});

	$('#contsTotal').on('click','.detailPage',function() {
		var seq = $(this).data('seq');
		var page  = $('#contsTotal').find('input[name=number]').val();
		if (SessionUtils.isLogin(location.href)) {
			SessionUtils.confirmValidMember(function(valid) {
				if (valid) {
					location.href = "/class/alive/award/detail?seqCode=" + seq+"&page="+page;
				}
			});
		}
	});


	let ClTab = $(".cl_ma_tab li input");
	//추천 키워드 클릭 이벤트
	$(ClTab).click(function() {
		if($(this).is('checked')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}


		textbookKeywordList = [];
		const checkedKeywordArr = $(".textbook_keyword_li_not_all:checked");
		if($(this).val() === 'ALL' || checkedKeywordArr.length === 0) { // 전체 버튼이 선택되어야할 때
			$(".textbook_keyword_li_not_all").prop("checked", false);

			if(!($('#textbook_li_all').is('checked'))){
				$('#textbook_li_all').prop("checked", true);
			}
		} else { // 나머지 버튼일 때
			$('#textbook_li_all').prop("checked", false);

			checkedKeywordArr.each(function(i){
				textbookKeywordList.push($(this).val())
			});
		}

		getList();
	});

	selectAwardBookByQueryString();
});

function downloadPopup(contentId, awardBookNum){
	// 새창으로 다운로드 호출
	if (SessionUtils.isLogin(location.href + '?awardBookNum=' + awardBookNum)) {
		Popup.openFileDownloadDext(contentId);
	}
}

function popOpen(url, awardBookNum){
	// 새창으로 팝업
	if (SessionUtils.isLogin(location.href + '?awardBookNum=' + awardBookNum)) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				var win = window.open(url, '_blank');
				win.focus();
			}
		});
	}
}

function researchPopup(){
	$('.research_info_popup').parent('div').show();
	$('.dimmed').show();
}
function researchersPopup(){
	$('.researchers_popup').parent('div').show();
	$('.dimmed').show();
}

function selectAwardBookByQueryString() {
	var $awardBookNum = $('#awardBookNum').val();

	if(!isNaN($awardBookNum) && (1 <= $awardBookNum && $awardBookNum <= 4)) {
		$('#tab-educourse li').removeClass('on');
		$('#tab-educourse li:eq(1)').addClass('on');
		$('.tab_conts').css('display', 'none');
		$('#cont2').css('display', 'block');

		$('.awards_list li').removeClass('on');
		$('.awards_list li').eq($awardBookNum - 1).addClass('on');
		$('.tabCont2').css('display', 'none');
		$('#cont2-' + $awardBookNum).css('display', 'flex');

		ClassSwiper($awardBookNum);
	}
}

// 자료집 공유하기
function copyToClipboard(url) {
	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = document.location.origin + url;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
	alert("링크가 복사되었습니다.\n동료 선생님께 비상교육 공모전 수상작 자료집을 공유해 보세요.");

	return;
}