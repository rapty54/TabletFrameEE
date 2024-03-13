$(function () {
	var reset = false;

	/* 2023 2학기 초등개편 포토존(오늘의 쉬는시간) 주석처리
	var getPhotoZone = function() {

		var $tabConts = null;
		$tabConts = $('#photozone');
		Ajax.execute({
			url: '/break/photo/zone/data',
			data: {
				photoIdx : $('input[name=photoIdx]').val(),
				schooltab : "ES",
				photozoneType : "B"
			},
			type: 'get',
			dataType: 'html',
			success: function(html) {
				$tabConts.empty();
				$tabConts.append($(html));
				var swiper = new Swiper('.swiper-container', {
					slidesPerView: 7,
					//centeredSlides: true,
					threshold: 20,
					spaceBetween: 10,
					slidesPerGroup: 7,
					//longSwipesRatio: 0.1,
					loop: true,
					//loopFillGroupWithBlank : true,
					//speed: 800,
					navigation: {
						nextEl: '.button-next',
						prevEl: '.button-prev',
					},
				});
				reset = false;
			}
		});
	};
	*/

	// 초기 설정
	clickTypeTab($('.break_cont_menu > li.on > a'));

	// 탭 더보기 클릭 이벤트
	$('#contsTotal .btn-more').bind('click', function() {
		page++;
		getList(page);
	});

	//소팅(최신순, 인기순, 좋아요순)
	$('#contsTotal').on('change','#searchSelect',function(){
		$('input[name=searchSelect]').val($(this).val());
		getList(1);
	});

	// 동영상 시간 검색 조건 변경시
	$('input[name="searchPlayTimeList"]').on('change', function () {
		getList(1);
	});

	$('#contsTotal').on('click','#goMainSearch',function(){
		var searchSelect = $('#contsTotal').find('#searchSelect option:selected').val();
		var photoKeyword = $('#contsTotal').find('input[name=photoKeyword]').val();
		$('input[name=photoKeyword]').val(photoKeyword);
		$('input[name=searchSelect]').val(searchSelect);
		getList(1);

	});


	$('#contsTotal').on('keydown','#mainsearch',function(key){

		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			var searchSelect = $('#contsTotal').find('#searchSelect option:selected').val();
			var photoKeyword = $('#contsTotal').find('input[name=photoKeyword]').val();
			$('input[name=photoKeyword]').val(photoKeyword);
			$('input[name=searchSelect]').val(searchSelect);
			getList(1);
		}

	});

	/*  2023 2학기 초등개편 포토존(오늘의 쉬는시간) 주석처리
	//포토존 이전날짜 가져오기
	$('#photozone').on('click','#prePhotoIdxBtn',function(){
		$('input[name=photoIdx]').val($(this).data('preidx'));
		getPhotoZone();

	});

	//포토존 다음날짜 가져오기
	$('#photozone').on('click','#nextPhotoIdxBtn',function(){
		$('input[name=photoIdx]').val($(this).data('nextidx'));
		getPhotoZone();

	});
	*/

	//포토존 불러오기 함수.
	// getPhotoZone();


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

		//조회수가 필요하다 하여 통합뷰어 열때 조회수 insert
		if (SessionUtils.isLogin(location.href)) {
			Ajax.execute({
				url: '/break/contentCnt.json',
				data: JSON.stringify({
					contentId: data.content,
					contentGubun: data.contentGubun,
					fileType: data.file
				}),
				contentType: 'application/json',
				method: 'post',
				dataType: 'json',
				success: function(result) {
					//location.reload();
				}
			});
		}

		Popup.openViewerMain(data.content, data.contentGubun);
	});


	//통합뷰어
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

		//조회수가 필요하다 하여 통합뷰어 열때 조회수 insert
		if (SessionUtils.isLogin(location.href)) {
			Ajax.execute({
				url: '/break/contentCnt.json',
				data: JSON.stringify({
					contentId: data.content,
					contentGubun: data.contentGubun,
					fileType: data.file
				}),
				contentType: 'application/json',
				method: 'post',
				dataType: 'json',
				success: function(result) {
					//location.reload();
				}
			});
		} else {
			return false;
		}

		Popup.openViewerMain(data.content, data.contentGubun);
	});


	//좋아요버튼 클릭 이벤트
	/*$('#contsTotal').on('click','.likeOn',function(){
		var data = $(this).data();

		if (SessionUtils.isLogin(location.href)) {
			Ajax.execute({
				url: '/break/contentLike.json',
				data: JSON.stringify({
					contentId: data.content,
					contentGubun: data.contentGubun,
					fileType: data.file
				}),
				contentType: 'application/json',
				method: 'post',
				dataType: 'json',
				success: function(result) {
					if(result.code == "SUCCESS") {
						//alert("콘텐츠를 좋아요! 하였습니다.");
						//location.reload();
						var dls = "#like_" + data.idx;
						$(dls).removeClass("likeOn");

						$(dls).addClass("likeDelete on");

					} else {
						alert("요청하신 업무를 실패하였습니다. 담당자에게 문의 해주세요.");
						return false;
					}
				}
			});
		}
	});*/


	//좋아요버튼 취소 클릭 이벤트
	/*$('#contsTotal').on('click','.likeDelete',function(){
		var data = $(this).data();

		if (SessionUtils.isLogin(location.href)) {
			Ajax.execute({
				url: '/break/contentLikeDelete.json',
				data: JSON.stringify({
					likeIdx: data.likeIdx,
					contentId: data.content,
					contentGubun: data.contentGubun,
					fileType: data.file
				}),
				contentType: 'application/json',
				method: 'post',
				dataType: 'json',
				success: function(result) {
					if(result.code == "SUCCESS") {
					//	alert("콘텐츠 좋아요!를 취소하였습니다.");
						var dls = "#like_" + data.idx;

						$(dls).removeClass("on likeDelete");

						$(dls).addClass("likeOn");
					} else {
						alert("요청하신 업무를 실패하였습니다. 담당자에게 문의 해주세요.");
						return false;
					}
				}
			});
		}
	});*/

	$('.lnb li h5').click(function () {
		if ($(this).parent('li').hasClass('on')) {
			$(this).parent('li').removeClass('on');
		} else if (!$(this).parent('li').hasClass('on')) {
			$('.lnb li').removeClass('on');
			$(this).parent('li').addClass('on');
		}

	});
	$('.lnb li .debth a').click(function (e) {
		e.preventDefault();
		if ($(this).parent('.debth').hasClass('on')) {
			$(this).parent('.debth').removeClass('on');
		} else if (!$(this).parent('.debth').hasClass('on')) {
			$('.lnb li .debth a').parent('.debth').removeClass('on');
			$(this).parent('.debth').addClass('on');
		}
	});

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
	popup();

	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 30,
		slidesPerGroup: 3,
		loop: true,
		loopFillGroupWithBlank: true,
		speed: 800,
		longSwipesRatio: 0.1,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.button-next',
			prevEl: '.button-prev',
		},
	});
	$('.tab_conts').hide();
	/*$('.like_btn').click(function(){
		$(this).toggleClass('on');
	})*/


	// [RMS-9908] [개발] 비바샘 초등 쉬는시간 팝업 게시 중단 요청 (2022-07-25 송태현)
	// 2021-12-07 쉬는시간 신규 자료 업데이트 팝업
	// if (StorageUtils.isOpened('BREAK-UPDATE-CLOSE')) {
	// 	Layer.openLayer({
	// 		url: '/break/break-data-update.popup',
	// 		callback: function ($div) {
	// 			// 다시 보지 않기
	// 			$div.find('input[name=display]').bind('click', function () {
	// 				if ($(this).prop('checked')) {
	// 					// 일자만 저장
	// 					StorageUtils.setValueDate('BREAK-UPDATE-CLOSE');
	// 				} else {
	// 					StorageUtils.remove('BREAK-UPDATE-CLOSE');
	// 				}
	// 			});
	// 			$div.find('.popup_close').bind('click', function () {
	// 				$div.remove();
	// 			});
	// 		}
	// 	});
	// }

	//쉬는시간 자료 업데이트 팝업 하루보지않기
	$('#update-noshow').click(function(e) {
		checkNoShowCheck($('#update-noshow'), 'popBreakWrap1Day', 1);
		$('.popBreakWrap').hide();
	});

	//쉬는시간 자료 업데이트 팝업 하루보지않기 쿠키 확인
	if(!$.cookie("popBreakWrap1Day")) {
		$('.popBreakWrap').show();
	}

});


function downloadPopup(target){
	var $target = $(target);
	var contentId = $target.data('content');
	var downyn = $target.data('downyn');
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

function allDown() {
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


//팝업
function popBookmark(obj, val) {
	if (val == 0) {
		$("#" + obj).css("height", "auto");
		$("#" + obj).css("display", "none");
		bgLayerClose();
	} else {
		$("#" + obj).css({ "display": "block" });
		bgLayerH();
	}
}


function clickTypeTab(target) {
	var $target = $(target);
	var codeId = typeof $target.data('id') === 'undefined' ? "" : $target.data('id');
	var idx = $target.data('idx');
	initSearchPlayTimeList();

	if (codeId == '') {
		type1 = codeId;
		type2 = '';
		getList(1);

		$('[id^=cont0]').empty();
	} else {

		Ajax.execute({
			url : '/break/typeList.json',
			data : {
				refCode : codeId
			},
			success : function(data){
				var list = data.response;

				if ($('input[name=count]').val() != idx) {
					$('[id^=cont0]').empty();
				}

				if(list.length==0){
					type1 = codeId;
					type2 = '';
					getList(1);

					$('[id^=cont0]').empty();
				} else {
					var addHtml ="";
					addHtml += "<div>";
					for (var i=0; i< list.length; i++) {
						addHtml += "<input type='hidden' name='codelistId' value='"+list[i].codelistId+"'/>";
						addHtml +="<a href=\"javascript:void(0);\" onclick=\"javascript: clickTypeTabSearch(this);\" data-code='"+list[i].codelistId+"' data-code1='"+codeId+"' data-name='"+list[i].codeName+"'>"+list[i].codeName+"</a>";
					}
					addHtml +="</div>";
					$('#cont0'+idx).append(addHtml);
					type1 = codeId;
					type2 = '';
					getList(1);
				}
			}
		});

	}
};


function clickTypeTabSearch(target) {
	var $target = $(target);
	var codeId = $target.data('code');
	var codeId2 = $target.data('code1');
	var name = $target.data('name');

	initSearchPlayTimeList();
	type1 = codeId2;
	type2 = codeId;
	getList(1);

	$target.addClass('on').siblings().removeClass('on');

}

function getCheckedPlayTimeList (){
	let searchPlayTimeList = [];

	if ($('input[name="searchPlayTimeList"]:checked').length > 0) {
		$.each($('input[name="searchPlayTimeList"]:checked'), function (index, checkbox) {
			searchPlayTimeList.push($(checkbox).val());
		});
	}

	return searchPlayTimeList;
}

function getList(curPage) {
	var $tabConts = null;
	$tabConts = $('#contsTotal');
	Ajax.execute({
		url: '/break/list/breakList',
		data: {
			type1 : type1,
			type2 : type2,
			photoKeyword : $('input[name=photoKeyword]').val() == null ? '' : $('input[name=photoKeyword]').val() ,
			searchSelect : $('input[name=searchSelect]').val() == null ? '' : $('input[name=searchSelect]').val() ,
			page : curPage != '' ? curPage : 1,
			searchPlayTimeList: getCheckedPlayTimeList()
		},
		type: 'get',
		dataType: 'html',
		success: function(response) {
			if(curPage <= 1) {
				$tabConts.find('.break_list ul').empty();

				var dataCnt = $(response).find('.data_cont').length;
				if (dataCnt == 0) {
					var photoKeyword = $('input[name=photoKeyword]').val();
					$('.nodata').show();
				} else {
					$('.nodata').hide();
				}
			}

			// 리스트 처리
			var html = $(response).find('ul').html();
			$tabConts.find('.break_list ul').append(html);

			// 더보기 남은 갯수 표시 처리
			var totCount = $(response).find('input[name="totCount"]').val();
			var listCount = $tabConts.find('.break_list li').length;
			var moreCount = Number(totCount) - Number(listCount);
			$tabConts.find('.btn-more span').text("("+moreCount+")");

			// 더보기 버튼 노출/숨김 처리
			if(moreCount <= 0) {
				$tabConts.find('.btn-more').hide();
			} else {
				$tabConts.find('.btn-more').show();
			}

			page = curPage;
			reset = false;
		}
	});
};

function getDuration(target) {
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

	$(target).siblings('em.duration').text("(" + hour + min + ":" + sec + ")");

};

function initSearchPlayTimeList() {
	if($('input[name="searchPlayTimeList"]:checked').length > 0) {
		$('input[name="searchPlayTimeList"]').prop('checked', false);
	}
}