$(function () {
	var currMonth = _searchDate == '' ? new Date().getMonth() + 1 : _searchDate;
	console.log(currMonth);
	$("#" + currMonth).addClass("on");
	setContent(currMonth);

	var fctId = $('#fctId').val();

	getList(fctId);

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#monthData')
	});

	// 탭 컨텐츠 전체선택 이벤트
	/*$('#monthData').bind('change','.input-checkbox-all', function() {
		var $checkAll= $(this).children('div .module_left').find('.input-checkbox-all');
		var $tabConts = $(this).children('table');
		if ($checkAll.prop('checked')) {
			$tabConts.find('input[name=contentId]').prop('checked', true);
		} else {
			$tabConts.find('input[name=contentId]').prop('checked', false);
		}
	});*/
});

function setContent(fctMm) {
	$("#key-word").html("<span>" + fctMm + "월</span>" + _monthData[fctMm-1].title);
	$("#subCopy").html(_monthData[fctMm-1].subCopy);
	$("#fctId").val(_monthData[fctMm-1].fctId);
	$("#bannerImg").attr("src", _monthData[fctMm-1].bannerImgPath + _monthData[fctMm-1].bannerImgName);
}

function changeMonth(fctMm, fctId) {
	$(".month_tab").find("li").removeClass("on");
	$("#" + fctMm).addClass("on");
	setContent(fctMm);

	$.ajax({
		type: "POST",
		url: "/creative/subject/month/read",
		contentType: 'application/json',
		dataType: "json",
		cache: false,
		async: false,
		data: JSON.stringify({fctMm:fctMm}),
		success: function (data) {
			// console.log(data);

			getList(fctId);

		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

function getList(fctId) {
	var $tabConts = null;
	$tabConts = $('#monthData');
	Ajax.execute({
		url: '/creative/subject/month/monthList',
		data: {
			page : $('input[name=page2]').val(),
			fctId :  fctId
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append(html);

		}
	});

}


function checkBoxAll()
{

	$("input[name=cbchannel]:checkbox").each(function() {
		if ($("#content-class-checkbox").is(":checked")) {
			$(this).prop("checked", true);
		} else {
			$(this).prop("checked", false);
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

		if(totLength == chkLength) $('input[id="content-class-checkbox"]').prop('checked',true);
		else $('input[id="content-class-checkbox"]').prop('checked',false);


		iloop++;

	});


	$("#ccnt").html(iloop)
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
		type: 'CREATIVE',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});

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

function downloadPopup(target){
	var $target = $(target);
	var contentId = $target.data('content');
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId);

}

function insertFolder(target) {
	var $target = $(target);
	var contentId = $target.data('content');
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'CREATIVE',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});
}