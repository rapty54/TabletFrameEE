/**
* html 컨텐츠 로딩시 로그인 체크 기능 부여
*
*/
/*
$(window).load(function() {
	$.ajax({
		type : "POST",
		url : "/doCheckLogin.do",
		cache : false,
		async : false,
		dataType : "json",
		data : {
			val1 : '',
			vivasamformat : "json"
		},
		success : function(data) {
			if (data == "FALSE") {
				location.href = "/";
				alert("로그인 후 접근가능합니다.");
				return;
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {//
		},
		complete : function(xhr, textStatus) {
			return;
		}
	});
});
*/

/**
 * 부모창에 높이 전송
 *
 */
window.onload = function() {
	var innerBody = document.body;
	var innerHeight = innerBody.scrollHeight;
	window.parent.postMessage({"load":"loaded", "height":innerHeight}, '*');
};