/**
 * 필수 라이브러리 : JQuery
 */

var envDomain = {
	dev: "//dev-e.vivasam.com",
	local: "//localhost:8080",
	prod: "//e.vivasam.com",
	winProd: "//e.vivasam.com",
	winDev: "//dev-e.vivasam.com",
	prodbatch : "//e.vivasam.com"
}

var ClassDataInfo2 = {
	isAdmin: false,
	env: "prod",
	teacherId: "",
	elementId: "",
	fullDownload: "",
	menuGubun: "",
	totalCnt: 0,
	cntUpTarget: null,
	adminId: ""
}



function login() {
	location.href = envDomain[ClassDataInfo2.env] + "/member/login"; // TODO 중등에 url 매핑 추가
}

/**
 * 수업자료 다운로드
 */
function loadClassData(teacherId, menuGubun, fullDownload, elementId, env, adminId, cb) {

	var param = {
		teacherId: teacherId,
		menuGubun: menuGubun,
		fullDownload: fullDownload,
		admin: !!adminId,
	}

	$.ajax({
		type: "GET",
		url: envDomain[env] + "/classData",
		dataType: "html",
		cache: false,
		async: false,
		data: param,
		success: function (data) {
			$("#" + elementId).html(data);
			ClassDataInfo2.teacherId = teacherId;
			ClassDataInfo2.fullDownload = fullDownload;
			ClassDataInfo2.elementId = elementId;
			ClassDataInfo2.isAdmin = !!adminId;
			ClassDataInfo2.adminId = adminId;
			ClassDataInfo2.env = env;
			ClassDataInfo2.menuGubun = menuGubun;


			if (cb) {
				cb();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}


/**
 * 비바샘 테마자료
 */
function loadClassTheme(teacherId, menuGubun, elementId, type, env, adminId, cb) {

	var param = {
		teacherId: teacherId,
		menuGubun: menuGubun,
		admin: !!adminId,
		type: type,
	}

	$.ajax({
		type: "GET",
		url: envDomain[env] + "/classData/classTheme",
		dataType: "html",
		cache: false,
		async: false,
		data: param,
		success: function (data) {
			$("#" + elementId).html(data);
			ClassDataInfo2.articleId = teacherId;
			ClassDataInfo2.elementId = elementId;
			ClassDataInfo2.isAdmin = !!adminId;
			ClassDataInfo2.adminId = adminId;
			ClassDataInfo2.env = env;
			ClassDataInfo2.menuGubun = menuGubun;


			if (cb) {
				cb();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
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


// 다운로드
function classDataDownloadFile(target) {
	var $target = $(target);

	var content = $target.data('content');
	var contentGubun = $target.data('contentGubun');
	var contentId = contentGubun+"-"+content;
	Popup.openFileDownloadDext(contentId);
}

// 전체 다운로드
function downloadTotalFile() {
	var contentId = "";
	var iLoop = 1;
	$("#contentTable tr ").each(function () {
		if (iLoop > 1)
		{
			contentId += ",";
		}
		contentId += $(this).data('contentGubun') + "-" +$(this).data('content');
		iLoop++;

	});
	console.log("contentId : ", contentId);
	Popup.openFileDownloadDext(contentId);
}

