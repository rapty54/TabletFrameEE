$(function () {
	// 댓글 로드
	loadReply(_idx, window.globals.menu, "replySection", window.globals.config.activeEnv, false);
	$(".data-replyCnt").text(ReplyInfo.totalCnt);
});