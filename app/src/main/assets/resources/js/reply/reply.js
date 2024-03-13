/**
 * 필수 라이브러리 : JQuery
 */

var envDomain = {
	dev: "//dev-e.vivasam.com",
	// dev: "//dev.vivasam.com",
	local: "//localhost:8080",
	prod: "//e.vivasam.com",
	// prod: "//vivasam.com",
	winProd: "//e.vivasam.com",
	winDev: "//dev-e.vivasam.com",
	// winDev: "//dev.vivasam.com",
	prodbatch: "//e.vivasam.com"
}

var ReplyInfo = {
	isAdmin: false,
	env: "prod",
	articleId: "",
	elementId: "",
	menu: "",
	pageNo: 1,
	pageSize: 10,
	totalCnt: 0,
	cntUpTarget: null,
	adminId: ""
}

var _moreReplyDom = "";
var _rereplyWriteDom = "";
var _isLoading = false;
var _isSearch = false;
var _searchValue = "";

/**
 * 댓글 로드 후 각종 이벤트 세팅
 */
function initMoreReply() {
	_rereplyWriteDom = $("#rereplyWriteDom").html();
	_moreReplyDom = $("#moreReply").html();

	if (!_isSearch && ReplyInfo.totalCnt > $(".cmList").children("li").length) {
		$(".cmList").after(_moreReplyDom);
	}
	setReplyTextCntEvent();
}

/**
 * textarea 문자 카운트 이벤트
 */
function setReplyTextCntEvent() {

	// 글자 수
	$(".replyText").keyup(function (e) {

		var textarea = $(this);
		var countHolder = textarea.hasClass("rereply") ?
			textarea.parent().find(".count") :
			textarea.parent().parent().find(".count");

		countHolder.text(textarea.val().length);
	});
}

// 수정 버튼 클릭 시 폼 변경
function modifyMode(self) {

	var comment = $(self).parents(".info").siblings(".comment");
	var modify = $(self).parents(".info").siblings(".modifyForm");
	var bottom = $(self).parents(".cmContents").children('.cm_btnBox');

	comment.hide();
	bottom.hide();
	modify.show();

}

// 수정 모드일 때 취소 버튼
function cancelModify(self) {

	var comment = $(self).parent().siblings(".comment");
	var modify = $(self).parent();

	modify.hide();
	comment.show();
}

function login() {
	var url = envDomain[ReplyInfo.env] + "/member/login";
	var goURL = window.location.href;
	if(goURL != "") {
		url += "?goURL=" + goURL;
	}
	location.href = url; // TODO 중등에 url 매핑 추가
}

/**
 * 댓글 load
 *
 * @param articleId
 * @param menuCd
 * @param elementId
 * @param env (local, dev, prod)
 * @param adminId
 * @param cntUpTarget (댓글 수 증가 element)
 * @param cb (콜백)
 */
function loadReply(articleId, menuCd, elementId, env, adminId, cntUpTarget, cb) {

	var param = {
		articleId: articleId,
		menu: menuCd,
		pageSize: ReplyInfo.pageSize,
		pageNo: 1,
		admin: !!adminId,
		searchValue: _searchValue,
	}

	$.ajax({
		type: "GET",
		url: envDomain[env] + "/reply",
		dataType: "html",
		cache: false,
		async: false,
		data: param,
		xhrFields: {withCredentials: true},
		success: function (data) {

			if (data.indexOf('{"code"') != -1) { // 오류 메시지
				return;
			}

			$("#" + elementId).html(data);
			ReplyInfo.articleId = articleId;
			ReplyInfo.elementId = elementId;
			ReplyInfo.totalCnt = $("#reply-totalCnt").val() || 0;
			ReplyInfo.isAdmin = !!adminId;
			ReplyInfo.adminId = adminId;
			ReplyInfo.env = env;
			ReplyInfo.menu = menuCd;
			ReplyInfo.cntUpTarget = cntUpTarget;
			initMoreReply();

			if (ReplyInfo.cntUpTarget) {
				ReplyInfo.cntUpTarget.text(ReplyInfo.totalCnt);
			}

			if (_isSearch) {
				$(".userID").each(function (index, element) {
					if ($(element).text().trim().indexOf(_searchValue) != -1) {
						if ($(element).find("a").length > 0) {
							$(element).find("a").css("color", "red");
						} else {
							$(element).css("color", "red");
						}
					}
				});
			}

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

// 댓글/답글 검색
function searchReply() {

	_searchValue = $("#reply-searchValue").val().trim();

	_isSearch = _searchValue.length != 0;

	loadReply(ReplyInfo.articleId, ReplyInfo.menu, ReplyInfo.elementId, ReplyInfo.env, ReplyInfo.adminId, ReplyInfo.cntUpTarget);
}

/**
 * 댓글, 답글 작성
 *
 * @param self
 * @param type
 */
function writeReply(self, type) {

	var isReply = type === 'reply'; // 댓글인지

	// 어드민에서의 호출일 경우 인증,준회원 여부 서버에서 체크
	if (!ReplyInfo.isAdmin) {
		if (!SessionUtils.isAccessLevel('reply')) {
			alert("준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
			return;
		}

		if (!SessionUtils.isValidMember()) {
			if (confirm("교사 인증을 해주세요.\n지금 인증을 진행하시겠습니까?")) {
				location.href = envDomain[ReplyInfo.env] + "/my/info/check?goURL=" + location.pathname + location.search;
			}
			return;
		}
	}

	var textarea = $(self).parents(".inputBox").find('textarea');

	if (!textarea.val().trim()) {
		alert("내용을 입력해주세요.");
		textarea.focus();
		return;
	}

	var param = {
		articleId: ReplyInfo.articleId, // 게시글 id
		menu: ReplyInfo.menu, // 메뉴 cd
		contents: textarea.val(),
		refUrl: location.href,
		level: isReply ? 0 : 1,
		parentId: isReply ? ReplyInfo.articleId : $(self).parents(".reply_wrap").parents("li").attr("id"),
	}

	$.ajax({
		type: "POST",
		url: envDomain[ReplyInfo.env] + "/reply",
		contentType: 'application/json',
		dataType: "json",
		cache: false,
		async: false,
		data: JSON.stringify(param),
		xhrFields: {withCredentials: true},
		success: function (data) {
			ReplyInfo.pageNo = 1;
			loadReply(ReplyInfo.articleId, ReplyInfo.menu, ReplyInfo.elementId, ReplyInfo.env, ReplyInfo.adminId, ReplyInfo.cntUpTarget);
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 댓글 수정
function modifyReply(self) {

	var textarea = $(self).parents(".inputBox").find("textarea");

	if (!textarea.val()) {
		alert("내용을 입력해주세요.");
		textarea.focus();
		return;
	}

	var replyId = $(self).parents("li").attr("id");

	var param = {
		articleId: ReplyInfo.articleId, // 게시글 id
		menu: ReplyInfo.menu, // 메뉴 cd
		contents: textarea.val(),
		refUrl: location.href,
		replyId: replyId,
	}

	$.ajax({
		type: "POST",
		url: envDomain[ReplyInfo.env] + "/reply/" + replyId,
		contentType: 'application/json',
		dataType: "json",
		cache: false,
		async: false,
		data: JSON.stringify(param),
		xhrFields: {withCredentials: true},
		success: function (data) {
			loadReply(ReplyInfo.articleId, ReplyInfo.menu, ReplyInfo.elementId, ReplyInfo.env, ReplyInfo.adminId, ReplyInfo.cntUpTarget);
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 댓글, 답글 상태 업데이트
function updateStatusReply(replyId, type, status) {

	var call = function (changeStatus) {
		$.ajax({
			type: "GET",
			url: envDomain[ReplyInfo.env] + "/reply/" + replyId + "/status?menu=" + ReplyInfo.menu +
				"&status=" + changeStatus + "&admin=" + ReplyInfo.isAdmin + "&regMemberId=" + ReplyInfo.adminId,
			cache: false,
			async: false,
			xhrFields: {withCredentials: true},
			success: function (data) {
				ReplyInfo.pageNo = 1;
				loadReply(ReplyInfo.articleId, ReplyInfo.menu, ReplyInfo.elementId, ReplyInfo.env, ReplyInfo.adminId, ReplyInfo.cntUpTarget);
			},
			error: function (xhr, ajaxOptions, thrownError) {
			},
			complete: function (xhr, textStatus) {
			}
		});
	}

	if (status === "DELETE" && confirm((type === "reply" ? "댓글" : "답글") + "을 삭제하시겠습니까?")) {
		call(status);
	} else if (status === "BLIND") {
		call($("#check" + replyId).is(":checked") ? "NORMAL" : status);
	}
}

// 답글 작성 폼 생성
function writeRereplyForm(self) {
	$(self).hide();

	var target = $(self).parent().parent().next();
	target.prepend(_rereplyWriteDom);
	//target.find("textarea").focus();
	setReplyTextCntEvent();
	$('.reply_inputBox').find('textarea[placeholder]').val(''); // textarea 값을 초기화
}

// 댓글 쓰기 폼 취소
function cancelReply(self) {
	$(self).parents(".reply_wrap").siblings(".cmContents").find(".reply_write").show();
	$(self).parents(".reply_inputBox").remove();
}

// 댓글 수정 폼 취소
function cancelModifyReply(self) {

	$(self).parents(".modifyForm").hide();
	$(self).parents(".modifyForm").siblings(".comment").show();
	$(self).parents(".cmContents").children('.cm_btnBox').show();

}

// 더보기
function moreReply() {

	if (_isLoading) {
		return;
	}

	_isLoading = true;

	var param = {
		articleId: ReplyInfo.articleId,
		menu: ReplyInfo.menu,
		pageSize: ReplyInfo.pageSize,
		pageNo: ++ReplyInfo.pageNo,
		admin: ReplyInfo.isAdmin
	}

	$.ajax({
		type: "GET",
		url: envDomain[ReplyInfo.env] + "/reply/more.html",
		dataType: "html",
		cache: false,
		async: false,
		data: param,
		xhrFields: {withCredentials: true},
		success: function (data) {

			$(".more").remove();
			$(".cmList").append(data);
			setReplyTextCntEvent();

			if (ReplyInfo.totalCnt > $(".cmList").children("li").length) {
				$(".cmList").after(_moreReplyDom);
			}
			_isLoading = false;
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}