$(function(){
	// 지역리스트 조회
	selectSchoolAreaList('B', '', true);
	selectSchoolAreaList('S', FKAREACODE, true);
	// 컨텐츠 리스트 조회
	selectContentList();
	// 초기 셋팅
	setStart();
});

// 더보기 버튼 클릭시 기존 조회값으로 조회를 위한 변수
var SEARCH_TYPE = 'photo';
var SEARCH_FKCODE = '';
var SEARCH_PKCODE = '';
var SEARCH_KEYWORD = '';
var SEARCH_L_CATEGORY = '';
var SEARCH_M_CATEGORY = '';
var SEARCH_START_CNT = '0';
var SEARCH_END_CNT = '0';
var SEARCH_TOTAL_CNT = '0';

// 메인검색의 조회 카운트 저장
var JSON_CNT = new Object();
JSON_CNT.photo = '0';
JSON_CNT.video = '0';
JSON_CNT.class = '0';

function setStart(){
	$("#btn-top").hide(); // 탑 버튼 숨김
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) { // 스크롤 내릴 표시
			$('#btn-top').fadeIn();
		} else {
			$('#btn-top').fadeOut();
		}
	});
	// 탑버튼 클릭시 화면 맨위로 이동
	$('#btn-top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	});

	$('.btn_search').bind('click', function(){
		selectContentList();
	});

	$('#tabMenu > li').bind('click', function(e){
		e.preventDefault();
		var isSearch = true;
		var code = $(this).data().code;
		if(JSON_CNT[code] == '0'){
			isSearch = false;
		}
		if(isSearch){
			var gaVal = "";
			if(code == 'photo'){
				gaVal = '사진 자료';
			}else if(code == 'video'){
				gaVal = '영상 자료';
			}else{
				gaVal = '백지도';
			}

			gtag('event', '자료실', {
				'event_category': '지역화',
				'event_label': gaVal,
				'value': 1
			});

			SEARCH_TYPE = code;
			selectTypeContentList();
			$(this).siblings().removeClass('on');
			$(this).addClass('on');



		}else{
			alert('자료가 없습니다.');
		}
	});
	// 엔터키 이벤트
	$('input').on("keyup",function(key){
		if(key.keyCode == 13) {
			selectContentList();
		}
	});
	// 작가관 버튼
	$('.btn_author').bind('click', function(){
		//$('.layerPop').show();
		// 작가관 팝업 띄우기
		Popup.openWindow({
			url: '/themeplace/localLibrary/authorHall/authorList',
			width: 1080,
			height: 830,
			name: 'authorHallPopup',
		});
	});
	// 작가관 레이어팝업 닫기
	$('.pop_close').bind('click', function(){
		$(this).parents('.layerPop').hide();
	});
	//  초기화 클릭
	$('.btn_reset').bind('click', function(){
		reset();
	});
}

function reset(){
	/*
	// 소속학교지역으로 지역 초기화
	selectSchoolAreaList('B', '', true);
	selectSchoolAreaList('S', FKAREACODE, true);
	// 검색어 초기화
	$('#searchKeyword').val('');
	// 대분류 중분류 초기화
	$('#lCategoryNm').text('대분류');
	$('#lCategoryNm').data('code', '');
	$('.lCategory').each(function(){
		if($(this).data().code == ''){
			$(this).addClass('current');
		}else{
			$(this).removeClass('current');
		}
	});
	// 중분류 중분류 초기화
	$('#mCategoryNm').text('중분류');
	$('#mCategoryNm').data('code', '');
	$('.mCategory').each(function(){
		if($(this).data().code == ''){
			$(this).addClass('current');
		}else{
			$(this).remove();
		}
	});
	// 체크박스 초기화
	$('input:checkbox[name=contentChk]').each(function() {
		this.checked = false;
	});
	$('#chk_all').prop('checked', false);

	selectContentList();
	*/
	// 새로고침
	location.href = '/themeplace/localLibrary/sub';
}

function setVideoList(){
	// 영상 자료 슬라이드
	var swiper1 = new Swiper('.videoList1', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		speed: 800,
		pagination: {
			el: '.videoPaging',
			clickable: true,
		},
		autoplay: true,
		disableOnInteraction: true
	})

	var swiper2 = new Swiper('.videoList2', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		speed: 800,
		pagination: {
			el: '.videoPaging',
			clickable: true,
		},
		autoplay: true,
		disableOnInteraction: true
	});

	$('.videoList1, .videoList2').mouseenter(function() {
		if($(this).hasClass('videoList1')){
			swiper1.autoplay.stop();
		}else if($(this).hasClass('videoList2')){
			swiper2.autoplay.stop();
		}
	});

	$('.videoList1, .videoList2').mouseleave(function() {
		if($(this).hasClass('videoList1')){
			swiper1.autoplay.start();
		}else if($(this).hasClass('videoList2')){
			swiper2.autoplay.start();
		}
	});
}

function selectSchoolAreaList(flag, code, isFirst){
	var fkcode = '';
	if(flag == 'S'){
		fkcode = code;
		if(fkcode == ''){
			var strHtml = '<li data-name="시/구/군" data-code="" class="current">시/구/군</li>';
			$('#schBranchList').html(strHtml);
			$('#schBranchName').html('시/구/군');
			$('#schBranchName').data('code', '');
			return false;
		}
	}
	var param = {
		codeflag : flag,
		fkcode : fkcode
	}
	$.ajax({
		type: 'post',
		url: '/themeplace/localLibrary/ajax/schAreaList.json',
		dataType: 'json',
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			var list = data.response;
			makeHtmlAreaList(flag, list, isFirst);
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 지역 리스트 생성
function makeHtmlAreaList(flag, list, isFirst){
	if(flag == 'B'){
		// 도-시
		var strHtml = '';
		var targetCode = '';
		strHtml += '<li data-name="전체" data-code="">전체</li>';
		for (var i = 0; i < list.length; i++) {
			var map = list[i];
			if('AR99000' == map.pkcode){
				continue;
			}
			if(FKAREACODE == map.pkcode){
				// 회원의 지역코드 일 경우
				strHtml += '<li class="current" data-code="'+map.pkcode+'" data-name="'+map.codename+'">'+map.codename+'</li>';
				$('#schAreaName').html(map.codename);
				$('#schAreaName').data('code', map.pkcode);
			}else{
				strHtml += '<li data-code="'+map.pkcode+'" data-name="'+map.codename+'">'+map.codename+'</li>';
			}
		}
		$('#schAreaList').html(strHtml);
		setSchAreaEvent();
	}else if(flag == 'S'){
		// 시-구-군
		var strHtml = '';
		var targetCode = '';
		if(isFirst){
			targetCode = FKBRANCHCODE;
			strHtml += '<li data-name="시/구/군" data-code="">시/구/군</li>';
		}else{
			targetCode = '';
			strHtml += '<li class="current" data-name="시/구/군" data-code="">시/구/군</li>';
			$('#schBranchName').html('시/구/군');
			$('#schBranchName').data('code', '');
		}
		for (var i = 0; i < list.length; i++) {
			var map = list[i];
			if(targetCode == map.pkcode){
				// 회원의 지역코드 일 경우
				strHtml += '<li class="current" data-code="'+map.pkcode+'" data-name="'+map.codename+'">'+map.codename+'</li>';
				$('#schBranchName').html(map.codename);
				$('#schBranchName').data('code', map.pkcode);
			}else{
				strHtml += '<li data-code="'+map.pkcode+'" data-name="'+map.codename+'">'+map.codename+'</li>';
			}
		}
		$('#schBranchList').html(strHtml);
		setSchBranchEvent();
	}
}

function setSchAreaEvent(){
	$('#schAreaList li').unbind('click').bind('click',function() {
		var data = $(this).data();
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('#schAreaName').html(data.name);
		$('#schAreaName').data('code', data.code);
		$(this).parent('#schAreaList').parent('.drop_list').parent('.drop_menu').removeClass('on');
		// 선택한 지역의 소속 지역리스트 조회
		selectSchoolAreaList('S', data.code, false);
		selectContentList('selArea');
	});
}

function setSchBranchEvent(){
	$('#schBranchList li').unbind('click').bind('click',function() {
		var data = $(this).data();
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('#schBranchName').html(data.name);
		$('#schBranchName').data('code', data.code);
		$(this).parent('#schBranchList').parent('.drop_list').parent('.drop_menu').removeClass('on');
		selectContentList();
	});
}

// 컨텐츠 조회(초기 조회와 검색버튼 조회)
function selectContentList(selType){
	/*
	if(selType){
		// 지역선택 자동 조회시 전체선택한 경우 무시
		if(selType == 'selArea'){
			if($('#schAreaName').data().code == ''){
				return;
			}
		}
	}
	*/
	// 전체지역 조회시 검색어 없을 경우 조회 불가 처리
	if($('#schAreaName').data().code == '' && $.trim($('#searchKeyword').val()).length < 2){
		alert('전체 검색 일 경우 검색어 두글자 이상 입력해주세요.');
		return false;
	}
	if($.trim($('#searchKeyword').val()) != '' && $.trim($('#searchKeyword').val()).length < 2){
		alert('검색어 두글자 이상 입력해주세요.');
		return false;
	}
	var param = {
		type: SEARCH_TYPE,
		fkcode: $('#schAreaName').data().code,
		pkcode: $('#schBranchName').data().code,
		keyword: $('#searchKeyword').val(),
		lCategory: '',
		mCategory: ''
	}

	Ajax.execute({
		type: 'post',
		url: '/themeplace/localLibrary/ajax/selectContentList',
		dataType: 'html',
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			$('#cont').empty();
			$('#cont').append(data);
			SEARCH_TYPE = param.type;
			SEARCH_FKCODE = param.fkcode;
			SEARCH_PKCODE = param.pkcode;
			SEARCH_KEYWORD = param.keyword;
			SEARCH_L_CATEGORY = param.lCategory;
			SEARCH_M_CATEGORY = param.mCategory;
			// if(SEARCH_TYPE == 'video'){
			// 	setVideoList();
			// }
		},
	});
}

// 컨텐츠 조회(유형분류 선택시 조회)
function selectContentList2(){
	var lCategory = '';
	var mCategory = '';
	if (SEARCH_TYPE == 'photo'){
		lCategory = $('#lCategoryNm').data().code;
		mCategory = $('#mCategoryNm').data().code;
	} else if (SEARCH_TYPE == 'class'){
		lCategory = $('#lCategoryNm').data().code;
	} else if ( SEARCH_TYPE == 'video') {
		lCategory = '625001';
		mCategory = $('#lCategoryNm').data().code;
	}
	var param = {
		type: SEARCH_TYPE,
		fkcode: SEARCH_FKCODE,
		pkcode: SEARCH_PKCODE,
		keyword: SEARCH_KEYWORD,
		lCategory: lCategory,
		mCategory: mCategory
	}

	Ajax.execute({
		type: 'post',
		url: '/themeplace/localLibrary/ajax/selectContentList',
		dataType: 'html',
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			$('#cont').empty();
			$('#cont').append(data);
			SEARCH_TYPE = param.type;
			SEARCH_FKCODE = param.fkcode;
			SEARCH_PKCODE = param.pkcode;
			SEARCH_KEYWORD = param.keyword;
			SEARCH_L_CATEGORY = param.lCategory;
			SEARCH_M_CATEGORY = param.mCategory;
			// if(SEARCH_TYPE == 'video'){
			// 	setVideoList();
			// }
		},
	});
}

// 탭 선택시
function selectTypeContentList(type){

	var param = {
		type: SEARCH_TYPE,
		fkcode: SEARCH_FKCODE,
		pkcode: SEARCH_PKCODE,
		keyword: SEARCH_KEYWORD,
		lCategory: '',
		mCategory: ''
	}

	Ajax.execute({
		type: 'post',
		url: '/themeplace/localLibrary/ajax/selectContentList',
		dataType: 'html',
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			$('#cont').empty();
			$('#cont').append(data);
			SEARCH_TYPE = param.type;
			SEARCH_FKCODE = param.fkcode;
			SEARCH_PKCODE = param.pkcode;
			SEARCH_KEYWORD = param.keyword;
			SEARCH_L_CATEGORY = param.lCategory;
			SEARCH_M_CATEGORY = param.mCategory;
			// if(SEARCH_TYPE == 'video'){
			// 	setVideoList();
			// }
		},
	});
}

function setTypeCnt(typeCnt){
	JSON_CNT.photo  = typeCnt.photo;
	JSON_CNT.video  = typeCnt.video;
	JSON_CNT.class  = typeCnt.class;
	$('#photoCnt').html('('+JSON_CNT.photo +'개)');
	$('#videoCnt').html('('+JSON_CNT.video+'개)');
	$('#classCnt').html('('+JSON_CNT.class+'개)');
}

function setContentEvent(){
	// 전체선택 클릭이벤트
	$('#chk_all').unbind('click').bind('click',function() {
		var chk = this.checked;
		$('input:checkbox[name=contentChk]').each(function() {
			this.checked = chk;
			if(chk){
				$('.contentHeader').addClass('active');
			}else{
				$('.contentHeader').removeClass('active');
			}
		});
	});
	// 체크박스 클릭이벤트
	$('input:checkbox[name=contentChk]').unbind('click').bind('click',function() {
		var chk = this.checked;
		if(chk){
			$(this).parents('.contentHeader').addClass('active');
		}else{
			$(this).parents('.contentHeader').removeClass('active');
		}

		// 전체선택 컨트롤
		var allChk = true;
		$('input:checkbox[name=contentChk]').each(function() {
			if(!this.checked){
				allChk = false;
			}
		});
		$('#chk_all').prop('checked', allChk);
	});
	// 선택 담기 이벤트
	$('.module_tb .module_left .btn_bookmark').unbind('click').bind('click',function() {
		if ($('input[name=contentChk]:checked').length == 0) {
			alert('담을 자료를 선택해 주세요.');
			return false;
		}
		var content = '';
		$('input[name=contentChk]:checked').each(function() {
			content += $(this).data().content + ',';
		});
		Layer.openFolderMain({
			menu: window.globals.menu,
			type: 'LIBRARY',
			parameter: {
				textbookCd: '',
				code2: content
			}
		});
	});
	// 선택 다운로드 이벤트
	$('.module_tb .module_left .btn_download').unbind('click').bind('click',function() {
		if ($('input[name=contentChk]:checked').length == 0) {
			alert('다운로드 할 자료를 선택해주세요.');
			return false;
		}
		var content = '';
		$('input[name=contentChk]:checked').each(function() {
			content += $(this).data().content + ',';
		});
		Popup.openFileDownloadDext(content);
	});
	// 드롭 닫기로 전파되는걸 방지
	$('.label').unbind('click').bind('click',function() {
		if($(this).parent('.drop_menu').hasClass('on')){
			$(this).parent('.drop_menu').removeClass('on');
		}else{
			$('.drop_menu').removeClass('on');
			$(this).parent('.drop_menu').addClass('on');
		}
	});
	// 드롭 닫기로 전파되는걸 방지
	$('.drop_menu').unbind('click').bind('click',function(e) {
		e.stopPropagation();
	});
	// 드롭메뉴 이벤트
	$('.localLibrary').unbind('click').bind('click',function() {
		$('.drop_menu').each(function() {
			$(this).removeClass('on');
		});
	});
	// 대분류 리스트 드랍
	$('#lCategoryNm').unbind('click').bind('click',function() {
		if($(this).parent('.drop_menu').hasClass('on')){
			$(this).parent('.drop_menu').removeClass('on');
		}else{
			$('.drop_menu').removeClass('on');
			$(this).parent('.drop_menu').addClass('on');
		}
	});
	// 대분류 클릭 이벤트
	$('.drop_menu .lCategory').unbind('click').bind('click',function() {
		var data = $(this).data();
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('#lCategoryNm').html(data.name);
		$('#lCategoryNm').data('code', data.code);
		$(this).parent('ul').parent('.drop_list').parent('.drop_menu').removeClass('on');
		// 컨텐츠리스트 조회
		SEARCH_L_CATEGORY = data.code;
		// 중분류 초기화
		setMCategory();
		selectContentList2();
	});
	// 중분류 리스트 드랍
	$('#mCategoryNm').unbind('click').bind('click',function() {
		if(SEARCH_L_CATEGORY != ''){
			if($(this).parent('.drop_menu').hasClass('on')){
				$(this).parent('.drop_menu').removeClass('on');
			}else{
				$('.drop_menu').removeClass('on');
				$(this).parent('.drop_menu').addClass('on');
			}
		}else{
			alert('대분류를 선택해 주세요.');
		}
	});
	// 중분류 클릭 이벤트
	$('.drop_menu .mCategory').unbind('click').bind('click',function() {
		var data = $(this).data();
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('#mCategoryNm').html(data.name);
		$('#mCategoryNm').data('code', data.code);
		$(this).parent('ul').parent('.drop_list').parent('.drop_menu').removeClass('on');
		selectContentList2();
	});
}

function setMCategory(){
	$('#mCategoryNm').html('중분류');
	$('#mCategoryNm').data('code', '');
}

function setCategorySelectNm() {
	var lData = $('.lCategory.current').data();
	$('#lCategoryNm').html(lData.name);
	$('#lCategoryNm').data('code', lData.code);
	if(SEARCH_TYPE == 'photo'){
		var mData = $('.mCategory.current').data();
		$('#mCategoryNm').html(mData.name);
		$('#mCategoryNm').data('code', mData.code);
	}
}

// 통합뷰어 호출
function viewDataContents(target){
	var data = $(target).data();
	Popup.openViewerMain(data.content, data.contentGubun);
}

// 다운로드 호출
function downloadPopup(target){
	var data = $(target).data();
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(data.content);
}

// 담기
function insertFolderChk(target) {
	var data = $(target).data();
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'LIBRARY',
		parameter: {
			textbookCd: '',
			code2: data.content
		}
	});
}

function addViewContent(type){
	var startCnt = 0;
	var endCnt = 0;

	if(Number(SEARCH_TOTAL_CNT) > Number(SEARCH_END_CNT)){
		startCnt = Number(SEARCH_END_CNT)+1;
	}else{
		console.log('컨텐츠 없음');
		return false;
	}

	if (type == 'photo' || type == 'video') {
		endCnt = startCnt + 9;
	} else if (type == 'class') {
		endCnt = startCnt + 5;
	}

	var param = {
		type: SEARCH_TYPE,
		fkcode: SEARCH_FKCODE,
		pkcode: SEARCH_PKCODE,
		keyword: SEARCH_KEYWORD,
		lCategory: SEARCH_L_CATEGORY,
		mCategory: SEARCH_M_CATEGORY,
		startCnt: startCnt,
		endCnt: endCnt
	}

	Ajax.execute({
		type: 'post',
		url: '/themeplace/localLibrary/ajax/selectAddViewContentList',
		dataType: 'html',
		cache: false,
		async: true,
		data: param,
		success: function (data) {
			$('#baseContent').append(data);

			let loading =
				'<div class="loading-circle">' +
				'<div class="loading" id="ajax-loading">' +
				'<div class="circle">' +
				'<div class="c1"><span></span></div>' +
				'<div class="c2"><span></span></div>' +
				'<div class="c3"><span></span></div>' +
				'<div class="c4"><span></span></div>' +
				'<div class="c5"><span></span></div>' +
				'</div>' +
				'</div>' +
				'</div>';

			$('.loading-circle').empty();
			$('#baseContent li:nth-last-child(4)').append(loading);

			setTimeout(function() {
				var scrollHeight = $(document).height();
				$('body, html').animate({scrollTop: scrollHeight}, 800);
			}, 100);
		},
	});
}

function setBtnAddViewSet(){
	if(Number(SEARCH_TOTAL_CNT) <= Number(SEARCH_END_CNT)){
		// 더보기 버튼 없애기
		$('.more_btn').hide();
	}
}