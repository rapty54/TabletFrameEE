$(function () {
	$('#goURL').val($(location).attr('href'));

	$("#userId").keypress(function(e){
		if (e.keyCode == 13) {
			$('.cont .pw').hide();
			$('.cont input[type="password"]').show();
			$('.cont input[type="password"]').focus();
			return false;
		}
	});

	$("#userPwd,#loginBtn").keypress(function(e){
		if (e.keyCode == 13) {
			_login('quickLoginFrm');
			return false;
		}
	});

	$('form[id=quickLoginFrm]').find('input:text').focus(function() {
		if ($.trim(($.cookie('user_id') != 'null' && $.cookie('user_id') != 'undefined' ? $.cookie('user_id') : '')) == '' && $(this).val() == '아이디' ) {
			$(this).val('');
		}
	});

	$('form[id=quickLoginFrm]').find('input:password').focus(function() {
		$(this).val('');
	});

	$('form[id=quickLoginFrm]').find('input:password').keyup(function(e){
		if (e.keyCode == 13) {
			_login('quickLoginFrm');
		}
	});
});

var isLogging = false;

/*[# th:if="${@sessionUtils.isLogin()}"]*/
function _logout() {
	if (isLogging) return;

	isLogging = true;

	Ajax.execute({
		url: '/member/logout.json',
		data: JSON.stringify({
			type : "logout"
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(data){

			if(data.result == "SUCCESS"){
				location.reload();
			}

			isLogging = false;
			localStorage.quickMenu = "open";
		},
		error: function (xhr, ajaxOptions, thrownError){
		},
		complete:function (xhr, textStatus){
			isLogging = false;
		}
	});
}
/*[/]*/
/*[# th:if="${!@sessionUtils.isLogin()}"]*/
function _login(formId) {

	if (isLogging) return;

	isLogging = true;

	var id = $.trim($('form[id=' + formId + ']').find('input:text').eq(0).val());
	var pwd = $('form[id=' + formId + ']').find('input:password').val();
	console.log($('form[id=' + formId + ']').find('input:text').eq(0));
	console.log($('form[id=' + formId + ']').find('input:password'));
	if (id == '' || pwd == '') {
		isLogging = false;
		alert('사용자ID 혹은 비밀번호를 입력해 주시기 바랍니다.');
		return;
	}

	$('#' + formId).find('input:text').eq(0).val(id);
	$('#' + formId).find('input:password').val(pwd);

	Ajax.execute({
		url: '/member/signInVivasam.json',
		data: JSON.stringify({
			memberId : id,
			passwd: pwd
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			var code = result.response.code;
			var msg = result.response.msg;
			if(code != 'fail') {
				location.reload();
			} else {
				if(msg != null && msg != '') {
					alert(msg);
					isLogging = false;
				}
			}
		}
	});
}