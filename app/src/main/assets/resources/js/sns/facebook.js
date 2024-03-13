$(function() {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : facebookKey,
			cookie     : true,                     // Enable cookies to allow the server to access the session.
			xfbml      : true,                     // Parse social plugins on this webpage.
			version    : 'v13.0'                     // Use this Graph API version for this call.
		});
	};
})

function checkLoginState() {
	alert("페이스북 로그인은 현재 점검 중입니다. 다른 SNS 간편 로그인을 이용부탁드립니다.\n이용에 불편을 드려 대단히 죄송합니다.");
	/*
	FB.login(function(response) {
		if (response.authResponse) {
			statusChangeCallback(response);
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {scope: 'email'});
	*/
}

function statusChangeCallback(response) {
	if (response.status === 'connected') {
		var target = response.authResponse;
		testAPI(target.accessToken);
	}
}

function testAPI(accessToken) {
	var infoCheck = menuType == 'infoCheck' || menuType == 'leave' ? true : false;
	FB.api('/me?fields=token_for_business', function(response) {
		var target = response;
		var data = {  "type" : "FACEBOOK",
			infoCheck : infoCheck,
			"id" : target.token_for_business,
			"accessToken" : accessToken,
			"apiId" : target.id
		};
		data.via = $('#joinSelectFrm [name=via]').val();
		data.reco = $('#joinSelectFrm [name=reco]').val();

		var url = '/member/sns/login';

		// 연동 또는 연동해제의 경우
		if (menuType === 'linkSns' || menuType === 'unlinkSns') {

			// 현재 클릭한 SNS가 연동하기인지 연동해제인지 재확인 후 URL 설정
			setMenuTypeBySnsLink("FACEBOOK");
			if (menuType === 'linkSns') {
				url = '/my/info/sns/link';
			} else if (menuType === 'unlinkSns') {
				url = '/my/info/sns/unlink';
			}
		}

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
						alert("페이스북 연결이 완료되었습니다.");
						getMySnsMemberInfoList();
					}
				}
				else if (menuType == 'unlinkSns') {
					if (response.code != null && response.code == 'sns_fail') {
						alert(response.msg);
					}
					else {
						alert("페이스북 연결이 해제되었습니다.");
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
				else if (response.code != null && response.code == 'sns_success_identification') {
					var form = document.createElement('form');
					form.setAttribute('method', 'post');
					if (menuType == 'quick') {
						form.setAttribute('action', joinDomain + response.redirectURL);
					}
					else {
						form.setAttribute('action', response.redirectURL);
					}
					var hiddenField = document.createElement('input');
					hiddenField.setAttribute('type', 'hidden');
					hiddenField.setAttribute('name', "isSsoMember");
					hiddenField.setAttribute('value', "N");
					form.appendChild(hiddenField);
					document.body.appendChild(form);
					form.submit();
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
	});
}