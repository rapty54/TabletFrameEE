// https://developers.kakao.com/docs/latest/ko/kakaologin/js
$(function () {
	Kakao.init(kakaoKey);
});

function kakaoLogin() {
	Kakao.Auth.login({
		success: function (authObj) {
			Kakao.API.request({
				url: '/v2/user/me',
				success: function (res) {
					var data = {
						"type" : "KAKAO",
						"id": res.id,
						"accessToken" : Kakao.Auth.getAccessToken()};
					$.ajax({
						url : '/member/sns/login.do',
						data :
							JSON.stringify(data),
						contentType: 'application/json',
						type: 'POST',
						dataType: 'json',
						success : function(data){
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
				},
				fail: function (error) {

				},
			})
		},
		fail: function (err) {
			alert('failed to login: ' + JSON.stringify(err))
		},
	});
}

