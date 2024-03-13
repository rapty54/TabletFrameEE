// https://developers.kakao.com/docs/latest/ko/kakaologin/js
$(function () {
	Kakao.init(kakaoKey);
});

function kakaoLogin() {
	var infoCheck = menuType == 'infoCheck' || menuType == 'leave' ? true : false;

	var url = '/member/sns/login';

	// 연동 또는 연동해제의 경우
	if (menuType === 'linkSns' || menuType === 'unlinkSns') {

		// 현재 클릭한 SNS가 연동하기인지 연동해제인지 재확인 후 URL 설정
		setMenuTypeBySnsLink("KAKAO");
		if (menuType === 'linkSns') {
			url = '/my/info/sns/link';
		} else if (menuType === 'unlinkSns') {
			url = '/my/info/sns/unlink';
		}
	}

	Kakao.Auth.login({
		success: function (authObj) {
			Kakao.API.request({
				url: '/v2/user/me',
				success: function (res) {
					var data = {  "type" : "KAKAO",
						infoCheck : infoCheck,
						"id": res.id,
						"accessToken" : Kakao.Auth.getAccessToken()
					};
					data.via = $('#joinSelectFrm [name=via]').val();
					data.reco = $('#joinSelectFrm [name=reco]').val();

					Ajax.execute({
						url : url,
						data :
							JSON.stringify(data),
						contentType: 'application/json',
						method: 'post',
						dataType: 'json',
						success : function(data){
							var response = data.response;
							if (menuType == 'infoCheck') {
								if (response.code != null && response.code == 'sns_fail') {
									alert(response.msg);
								}
								else {
									location.href = response.redirectURL;
								}
							}
							else if (menuType == 'linkSns') {
								if (response.code != null && response.code == 'sns_fail') {
									alert(response.msg);
								}
								else {
									alert("카카오 연결이 완료되었습니다.");
									getMySnsMemberInfoList();
								}
							}
							else if (menuType == 'unlinkSns') {
								if (response.code != null && response.code == 'sns_fail') {
									alert(response.msg);
								}
								else {
									alert("카카오 연결이 해제되었습니다.");
									getMySnsMemberInfoList();
								}
							}
							else if (menuType == 'leave') {
								if (response.code != null && response.code == 'sns_fail') {
									alert(response.msg);
								}
								else {
									$(".member_sns_wrap").hide();
									$("#leaveRequest").show();
									$("#userSecedMsg").focus();
								}
							}
							else if (response.code != null && response.code == 'sns_fail') {
								alert(response.msg);
							}
							else if (response.code != null && response.code == 'sns_success_mapping') {
								location.href = response.redirectURL;
							}
							else if (response.code != null && response.code == 'sns_join') {
								location.href = response.redirectURL;
							}
							else {
								if (menuType == 'quick') {
									quickSnsLoginInPage(response.object);
								}
								else {
									snsLoginFunction(response.object);
								}
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