$(function () {
	
	var fullDownload = $('input[name=fullDownload]').val();


	try {
		var active = window.globals.config.activeEnv == undefined ? "prod" : window.globals.config.activeEnv;
	} catch (e) {
		var active ="prod";
	}

	try {
		var menu = window.globals.menu == undefined ? "CREATIVE_EXP_TRIP" : window.globals.menu;
	} catch (e) {
		var menu ="CREATIVE_EXP_TRIP";
	}

	// 댓글 로드
	loadReply(_idx, menu, "replySection", active, false);
	$(".data-replyCnt").text(ReplyInfo.totalCnt);

	//수업자료 다운로드
	loadClassData(_idx, _menuGubun, fullDownload, "classData", active, false);

	//비바샘 테마자료
	loadClassTheme(_idx, _menuGubun, "themeData", "ES", active, false);
});

//다운로드
function downloadFile2(contentId) {
	Popup.openFileDownloadDext(contentId);
}