$(function(){
	// 카테고리 셋팅
	setCategory();
	// 이벤트 셋팅
	setContentEvent();
});

function setCategory(){
	// 대분류 선택 처리
	var lCategory = L_CATEGORY;
	if(lCategory != ''){
		$('.drop_menu .lCategory').each(function(){
			var data = $(this).data();
			if(data.code == lCategory){
				$(this).siblings().removeClass('current');
				$(this).addClass('current');
				$('#lCategoryNm').html(data.name);
				$('#lCategoryNm').data('code', data.code);
			}
		});
	}
	// 중분류 선택 처리
	var mCategory = M_CATEGORY;
	if(mCategory != ''){
		$('.drop_menu .mCategory').each(function(){
			var data = $(this).data();
			if(data.code == mCategory){
				$(this).siblings().removeClass('current');
				$(this).addClass('current');
				$('#mCategoryNm').html(data.name);
				$('#mCategoryNm').data('code', data.code);
			}
		});
	}
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
		// 중분류 초기화
		setMCategory();
		selectContentList();
	});
	// 중분류 리스트 드랍
	$('#mCategoryNm').unbind('click').bind('click',function() {
		if(true){
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
		selectContentList();
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
	var mData = $('.mCategory.current').data();
	$('#mCategoryNm').html(mData.name);
	$('#mCategoryNm').data('code', mData.code);
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

// 페이지 호출 (파라미터 추가 해서)
function selectContentList(){
	var authorIdx = AUTHOR_IDX;
	var lCategory = $('#lCategoryNm').data().code;
	var mCategory = $('#mCategoryNm').data().code;
	location.href = '/themeplace/localLibrary/authorHall/authorContentList?authorIdx='+authorIdx+'&lCategory='+lCategory+'&mCategory='+mCategory;
}