$(function () {
	var reset = false;


	$('#imgPage').on('click', function () {
		location.href = "/library/img/list";
	})

	//동영상 자료 페이지로 이동
	$('#movPage').on('click', function () {
		location.href = "/library/video/list";
	})

	//동영상 자료 페이지로 이동
	$('.typeSearchBtn').on('click', function () {
		console.log("$(this).data() : ", $(this).data());
	})



	$('#searchBtn').on('click', function() {
		reset = true;
		getList('category', 1);
	});

	$('#contsTotal').on('click','#goMainSearch',function(){
		var photoKeyword = $('#contsTotal').find('input[name=photoKeyword]').val();
		$('input[name=photoKeyword]').val(photoKeyword);

		if($('.lb_cont_menu').find('li.on').length == 0) {
			$('.lb_cont_menu').find('li').eq(0).addClass('on');
		}

		getList('category', 1);

		$('.keywords').find('li').removeClass('on');

	});

	$('#contsTotal').on('keydown','#mainsearch',function(key){

		if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
			$('#goMainSearch').click();
		}

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


	$('#contsTotal').on('click','.link_box',function(){
		var data = $(this).data();
		// ZIP 컨텐츠는 새창으로 띄워주기
		if (data.file == 'FT207') {
			alert('본 자료는 파일이 함께 있어야 하는 압축(zip) 형태로 제공해 드리며, 미리보기는 제공되지 않습니다.');
			return false;
		} else {
			Popup.openViewerMain(data.content, data.contentGubun);
		}

	});

	//다시 검색하기 버튼
	$('#contsTotal').on('click','#reSearch',function(){
		$('input[name=photoKeyword]').focus();
		$('input[name=photoKeyword]').val('');
	});


	$('.tab_conts').hide();
	$('.keywords li a').click(function(){
		if(!$(this).parent('li').hasClass('on')){
			$('.keywords li').removeClass('on');
			$(this).parent('li').addClass('on');
		}else if($(this).parent('li').hasClass('on')){
			$(this).parent('li').removeClass('on');
		}
		/*if($('.keywords li a').parent('li').hasClass('on')){
			$('.lb_art_tab').hide();
		}else{
			$('.lb_art_tab').show();
		}*/
	});


	//통합뷰어
	$('.keyWordClick').on('click',function(){
		var data = $(this).data();
		$('input[name=artIdx]').val(data.idx);
		$('input[name=searchKeyword]').val(data.keyword);
		$('input[name=photoKeyword]').val('');

		$('.lb_art_tab ul').children('li').each(function(index){
			if ($(this).attr('class') == 'on') {
				$(this).removeClass('on');
				$(this).find('.lb_cont_list div').hide();
			}

			if ($(this).find('a').attr('href') == '#all') {
				$(this).addClass('on');
			}
		});

		$('.lb_cont_menu').find('li').removeClass('on');

		getList('keyword', 1);
	});


	//<p class="chk_cont"> 안에 체크시  li 클래스 추가,제거
	$('input[name=cbchannel]').on('change', function(){
		if ($(this).is(":checked")) {

			$(this).parent('span').parent('p').parent('li').addClass('active');
		} else {

			$(this).parent('span').parent('p').parent('li').removeClass('active');
		}

	});

	// 탭 더보기 클릭 이벤트
	$('#contsTotal .btn-more').bind('click', function() {
		page++;
		getList(listType, page);
	});

	//getList('category', 1);
	// 키워드 랜덤 선택으로 리스트 노출
	var keywordCnt = $('.keyWordClick').length;
	var randomNumber = Math.floor(Math.random() * keywordCnt);
	$('.keyWordClick').eq(randomNumber).trigger('click');
});

// 자료 요청 게시판 바로가기 및 로그인 체크
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
	console.log("$target : ", $target.data('content'));
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId);

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


function insertFolderChkArt(target) {
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



function clickTypeTab(target) {
	var $target = $(target);
	var codeId = typeof $target.data('id') === 'undefined' ? "" : $target.data('id');
	var idx = $target.data('idx');
	if (codeId == '123') {
		type1 = codeId;
		type2 = '';
		getList('category', 1);
		$('[id^=cont0]').empty();

		//	var pageTotal = $('input[name=pageTotal]').val();
		//	$('.keywords').find('li').removeClass('on');
		//	$('.tit_wrap').empty();
		//	$('.tit_wrap').append($('<h3>전체 <span>('+pageTotal+')</span></h3>'));

	} else {
		Ajax.execute({
			url : '/library/art/typeList.json',
			data : {
				refCode : codeId
			},
			success : function(data){
				var list = data.response;

				if ($('input[name=count]').val() != idx) {
					$('[id^=cont0]').empty();
				}

				if(list.length==0){

				} else {
					var addHtml ="";
					addHtml += "<div>";
					for (var i=0; i< list.length; i++) {
						addHtml += "<input type='hidden' name='codelistId' value='"+list[i].codelistId+"'/>";
						addHtml +="<a href=\"javascript:void(0);\" onclick=\"javascript: clickTypeTabSearch(this);\" data-code='"+list[i].codelistId+"' data-code1='"+codeId+"' data-name='"+list[i].codeName+"'>"+list[i].codeName+"</a>";
					}
					addHtml +="</div>";
					$('#cont0'+idx).append(addHtml);
					$('#cont0'+idx).find('a').eq(0).trigger('click');
				}

			}
		});
	}

	$('.keywords').find('li').removeClass('on');
};

function clickTypeTabSearch(target) {
	var $target = $(target);
	var codeId = $target.data('code');
	var codeId2 = $target.data('code1');
	type1 = codeId2;
	type2 = codeId;
	getList('category', 1);


	$target.addClass('on').siblings().removeClass('on');

}

function getList(type, curPage) {

	var url = '';
	var paramter = {};

	if(type == 'keyword') {
		url = '/library/list/artList';
		parameter = {
				searchKeyword : $('input[name=searchKeyword]').val() == null ? '' : $('input[name=searchKeyword]').val() ,
				artIdx : $('input[name=artIdx]').val() == null ? '' : $('input[name=artIdx]').val() ,
				page : curPage != '' ? curPage : 1
		};
	} else {
		url = '/library/list/artList2';
		parameter = {
				photoKeyword : $('input[name=photoKeyword]').val() == null ? '' : $('input[name=photoKeyword]').val() ,
				type1 : type1,
				type2 : type2,
				page : curPage != '' ? curPage : 1
		};
	}

	var $tabConts = null;
	$tabConts = $('#contsTotal');
	Ajax.execute({
		url: url,
		data: parameter,
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
			var headerTitle = "<h3>";
			if(type == 'keyword') {
				var name = $('input[name=searchKeyword]').val();
				headerTitle += name + '<span>(' + totCount + ')</span>';
			} else {
				var name = $('.lb_cont_menu').find('li.on').children('a').text();
				headerTitle += name;
				var name2 = $('.lb_cont_menu').find('li.on').find('a.on').text();
				if(name2 != undefined && name2 != '') {
					headerTitle += '(' + name2  + ')';
				}
				headerTitle += ' <span>(' + totCount + ')</span>';
			}
			headerTitle += "</h3>";
			$('#headerTitle').empty().append(headerTitle);

			listType = type;
			page = curPage;
			reset = false;

		}
	});
};
