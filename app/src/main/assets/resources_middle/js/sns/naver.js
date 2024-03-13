var naver_id_login = new naver_id_login(naverKey, headUrl + naverCallBackUrl);
var state = naver_id_login.getUniqState();
naver_id_login.setDomain(headUrl);
naver_id_login.setState(state);


function naverLogin(response) {
	var data = {
				"type" : "NAVER",
				"accessToken" : response.oauthParams.access_token
			};
	$.ajax({
		url : '/member/sns/login.do',
		data : JSON.stringify(data),
		contentType: 'application/json',
		type: 'POST',
		dataType: 'json',
		success : function(data) {
			if (data.code != null && data.code == 'sns_goLogin') {
				// 로그인 go
				$('#quickLoginFrmGnb').find('input[name="goURL"]').val(window.location.href);
				$('#quickLoginFrmGnb').submit();
			}
			else if (data.code != null && data.code == 'sns_fail') {
				alert(data.msg);
			}
			else if (data.code != null && data.code == 'sns_success_mapping') {
				location.href =  snsApiDomain +  data.redirectURL;
			}
			else if (data.code != null && data.code == 'sns_join') {
				location.href =  snsApiDomain + data.redirectURL;
			}
			else {
				location.href = snsApiDomain + data.redirectURL;
			}
		}
	});
}
