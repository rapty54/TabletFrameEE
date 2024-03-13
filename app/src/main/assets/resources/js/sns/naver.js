var naver_id_login = new naver_id_login(naverKey, headUrl + "/member/sns/login/callback");
var state = naver_id_login.getUniqState();
naver_id_login.setDomain(headUrl);
naver_id_login.setState(state);

function naverLogin(response) {
	var infoCheck = menuType == 'infoCheck' || menuType == 'leave' ? true : false;

	var url = '/member/sns/login';

	// 연동 또는 연동해제의 경우
	if (menuType === 'linkSns' || menuType === 'unlinkSns') {
		// 현재 클릭한 SNS가 연동하기인지 연동해제인지 재확인 후 URL 설정
		setMenuTypeBySnsLink("NAVER");
		if (menuType === 'linkSns') {
			url = '/my/info/sns/link';
		} else if (menuType === 'unlinkSns') {
			url = '/my/info/sns/unlink';
		}
	}

	var data = {
		"type": "NAVER",
		"infoCheck": infoCheck,
		"accessToken": response.oauthParams.access_token
	};
	data.via = $('#joinSelectFrm [name=via]').val();
	data.reco = $('#joinSelectFrm [name=reco]').val();

	Ajax.execute({
		url: url,
		data: JSON.stringify(data),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function (data) {
			var response = data.response;
			if (menuType == 'infoCheck') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					location.href = response.redirectURL;
				}
			} else if (menuType == 'linkSns') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					alert("네이버 연결이 완료되었습니다.");
					getMySnsMemberInfoList();
				}
			} else if (menuType == 'unlinkSns') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					alert("네이버 연결이 해제되었습니다");
					getMySnsMemberInfoList();
				}
			} else if (menuType == 'leave') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					$(".member_sns_wrap").hide();
					$("#leaveRequest").show();
					$("#userSecedMsg").focus();
				}
			} else if (response.code != null && response.code == 'sns_fail') {
				alert(response.msg);
			} else if (response.code != null && response.code == 'sns_success_mapping') {
				location.href = response.redirectURL;
			} else if (response.code != null && response.code == 'sns_join') {
				location.href = response.redirectURL;
			} else {
				if (menuType == 'quick') {
					quickSnsLoginInPage(response.object);
				} else {
					snsLoginFunction(response.object);
				}
			}
		}
	});
}