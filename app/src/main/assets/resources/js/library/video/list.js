$(function () {
	var reset = false;
	if (type1 != "") {
		$(document).find("#ul li").each(function() {
			if (type1 == $(this).val()) {
				$(this).addClass('current');
			}
		});
	}

	$('input[name=photoKeyword]').on("keyup",function(key){
		if(key.keyCode==13) {
			getList(1);
		}
	});

	var getPhotoZone = function() {

		var $tabConts = null;
		$tabConts = $('#photozone');
		Ajax.execute({
			url: '/library/video/photo/zone/data',
			data: {
				photoIdx : $('input[name=photoIdx]').val(),
				schooltab : "ES",
				photozoneType : "M"
			},
			type: 'get',
			dataType: 'html',
			success: function(html) {
				$tabConts.empty();
				$tabConts.append($(html));
				var swiper = new Swiper('.swiper-container2', {
					slidesPerView: 'auto',
					centeredSlides: true,
					spaceBetween: 30,
					slidesPerGroup: 3,
					longSwipesRatio: 0.1,
					loop: true,
					loopFillGroupWithBlank : true,
					speed: 800,
					navigation: {
						nextEl: '.button-next',
						prevEl: '.button-prev',
					},
				});
				reset = false;
			}
		});
	};



	$('#searchBtn').bind('click', function() {
		reset = true;
		getList(1);
	});

	//소팅(최신순, 인기순, 좋아요순)
	$('#contsTotal').on('change','#searchSelect',function(){
		$('input[name=searchSelect]').val($(this).val());
		getList(1);

	});

	//통합뷰어
	$('#contsTotal').on('click','.btn-viewer-main-open',function(){
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

	//통합뷰어
	$('#photozone').on('click','.btn-viewer-main-open',function(){
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


	$('#contsTotal').on('click','.link_box',function(){
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

	// 탭 더보기 클릭 이벤트
	$('#contsTotal .btn-more').bind('click', function() {
		page++;
		getList(page);
	});

	getList(1);
	//포토존 불러오기 함수.
	getPhotoZone();

	$('#imgPage').on('click', function () {
		location.href = "/library/img/list";
	})

	//교실아트 페이지로 이동
	$('#artPage').on('click', function () {
		location.href = "/library/art/list";
	})

	// L클릭 이벤트
	$('.seelectLevel1').on('click', function () {
		clickSelect($(this));
	});

	$('#photozone').on('click','#prePhotoIdxBtn',function(){
		console.log("$(this).data('prePhotoIdx'); : ", $(this).data('preidx'));
		$('input[name=photoIdx]').val($(this).data('preidx'));
		getPhotoZone();

	});

	$('#photozone').on('click','#nextPhotoIdxBtn',function(){
		console.log("$(this).data('nextidx'); : ", $(this).data('nextidx'));
		$('input[name=photoIdx]').val($(this).data('nextidx'));
		getPhotoZone();

	});

	// 처리 함수
	var clickSelect = function(obj) {
		var ckView = obj.data('view');

		// 선택한 메뉴의 서브 메뉴 이벤트
		if(ckView == 'off') {
			obj.data('view', 'on').find('.drop_list').show();
		} else {
			obj.data('view', 'off').find('.drop_list').hide();
		}
	};

	// 클릭 이벤트
	$(document).on('click',"#ul li",function(){
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
	// 리스트 클래스 초기화
	var tabClassReset = function(cl){
		$('.' + cl + ' ').find('li').each(function(){
			$(this).removeClass('current');
		});
	};

	//셀렉트 박스 이외 선택시 보이지 않게 하기
	$("body").on("click", function(e){
		if($(".drop_list").css("display") == "block"){
			if($("#select-wrap").has(e.target).length == 0){
				$(".drop_list").hide()
			}
		}

	});

	//다시 검색하기 버튼
	$('#contsTotal').on('click','#reSearch',function(){
		$('input[name=photoKeyword]').focus();
		$('input[name=photoKeyword]').val('');
	});

	popup();

	//<p class="chk_cont"> 안에 체크시  li 클래스 추가,제거
	$('input[name=cbchannel]').on('change', function(){
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
		loopFillGroupWithBlank : true,
		speed: 800,
		navigation: {
			nextEl: '.button-next',
			prevEl: '.button-prev',
		},
	});


});


function popBookmark(obj,val)
{
	if(val==0)
	{
		$("#"+obj).css("height","auto");
		$("#"+obj).css("display","none");
		bgLayerClose();
	} else {
		$("#"+obj).css({"display": "block"});
		bgLayerH();
	}
}

function popup(){
	var popup = $('.alarm_wrap .popup_desc_wrap'),
		popOn = $('.alarm_wrap .popup_type01'),
		popCloz = $('.alarm_wrap .popup_close');

	popup.hide();
	popOn.click(function(){
		$(this).addClass('on');
		popup.show();
	});
	popCloz.click(function(){
		popOn.removeClass('on');
		popup.hide();
	});
}

//자료 요청 게시판 바로가기 및 로그인 체크
function goSupportQuestion() {
	if (!window.globals.login) {
		Layer.openLayerLogin(function() {
			$('.dimmed').hide();
			window.open("/support/question/form");
		});
	} else {
		window.open("/support/question/form");
	}
}

function downloadPopup(target){
	var $target = $(target);
	var contentId = $target.data('content');
	var downyn = $target.data('downyn');
	console.log("$target : ", $target.data('content'));
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId,downyn);

}

function checkBoxAll()
{

	$("input[name=cbchannel]:checkbox").each(function() {
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

function ccnthtml()
{
	var iloop = 0;

	$("input[name=cbchannel]:checked").each(function() {
		var totLength = $('input[name="cbchannel"][id!="chk_all"]').length;
		var chkLength = $('input[name="cbchannel"][id!="chk_all"]:checked').length;

		if(totLength == chkLength) $('input[id="chk_all"]').prop('checked',true);
		else $('input[id="chk_all"]').prop('checked',false);


		iloop++;

	});


	$("#ccnt").html(iloop)
}

function allDown()
{
	var contentId = "";
	var iLoop = 1;
	$("input[name=cbchannel]:checked").each(function() {

		if (iLoop > 1)
		{
			contentId += ",";
		}

		contentId += $(this).val();
		iLoop++;
	});

	if (contentId == "")
	{
		alert("자료를 선택해 주세요.")
		return;
	}
	console.log("contentId : ", contentId);

	Popup.openFileDownloadDext(contentId);

}

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

// 탭 컨텐츠 담기 이벤트
function allBookMark() {
	var contentId = "";
	var iLoop = 1;
	$("input[name=cbchannel]:checked").each(function() {

		if (iLoop > 1)
		{
			contentId += ",";
		}

		contentId += $(this).val();
		iLoop++;
	});

	if (contentId == "")
	{
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


// 통합뷰어 팝업 오픈
function viewDataContents(target) {

	var $target = $(target);
	var contentId = $target.data('content');
	var contentGubun = $target.data('contentGubun');
	var fileType = $target.data('file');
	var siteUrl = $target.data('siteUrl');

	console.log("contentId : ", contentId);
	console.log("contentGubun : ", contentGubun);
	console.log("fileType : ", fileType);

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

function getList(curPage) {

	var $tabConts = null;
	$tabConts = $('#contsTotal');
	Ajax.execute({
		url: '/library/list/videoList',
		data: {
			type1 : type1,
			title : title,
			photoKeyword : $('input[name=photoKeyword]').val() == null ? '' : $('input[name=photoKeyword]').val() ,
			searchSelect : $('input[name=searchSelect]').val() == null ? '' : $('input[name=searchSelect]').val() ,
			page : curPage != '' ? curPage : 1
		},
		type: 'get',
		dataType: 'html',
		success: function(response) {
			if(curPage <= 1) {
				$tabConts.find('.data_list ul').empty();

				var dataCnt = $(response).find('.data_cont').length;
				if (dataCnt == 0) {
					var photoKeyword = $('input[name=photoKeyword]').val()
					$('.nodata').find('span').text(photoKeyword);
					$('.nodata').show();
				} else {
					$('.nodata').hide();
				}
			}

			// 리스트 처리
			var html = $(response).find('ul').html();
			$tabConts.find('.data_list ul').append(html);

			// 더보기 남은 갯수 표시 처리
			var totCount = $(response).find('input[name="totCount"]').val();
			var listCount = $tabConts.find('.data_list li').length;
			var moreCount = Number(totCount) - Number(listCount);
			$tabConts.find('.btn-more span').text("("+moreCount+")");

			// 더보기 버튼 노출/숨김 처리
			if(moreCount <= 0) {
				$tabConts.find('.btn-more').hide();
			} else {
				$tabConts.find('.btn-more').show();
			}

			// 리스트 헤더 타이틀 처리
			var name = title != null ? title : '전체';
			var headerTitle = '<h3>' + name + '<span>(' + totCount + ')</span></h3>';
			$('#headerTitle').empty().append(headerTitle);

			page = curPage;
			reset = false;
		}
	});
};
