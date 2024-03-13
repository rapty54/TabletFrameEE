$(function () {


	var fullDownload = $('input[name=fullDownload]').val();


	// 댓글 로드
	loadReply(_idx, window.globals.menu, "replySection", window.globals.config.activeEnv, false);
	$(".data-replyCnt").text(ReplyInfo.totalCnt);

	//수업자료 다운로드
	loadClassData(_idx, _menuGubun, fullDownload, "classData", window.globals.config.activeEnv, false);

	//비바샘 테마자료
	loadClassTheme(_idx, _menuGubun, "themeData", "ES", window.globals.config.activeEnv, false);



});


