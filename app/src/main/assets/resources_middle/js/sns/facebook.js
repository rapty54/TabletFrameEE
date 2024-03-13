$(function() {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : facebookKey,
			cookie     : true,                     // Enable cookies to allow the server to access the session.
			xfbml      : true,                     // Parse social plugins on this webpage.
			version    : 'v2.7'           // Use this Graph API version for this call.
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
	FB.api('/me?fields=token_for_business', function(response) {
		var target = response;
		var data = {
			"type" : "FACEBOOK",
			"id" : target.token_for_business,
			"accessToken" : accessToken,
			"apiId" : target.id
		};
		$.ajax({
			url : '/member/sns/login.do',
			data : JSON.stringify(data),
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
				else if (data.code != null && data.code == 'sns_success_identification') {
					var form = document.createElement('form');
					form.setAttribute('method', 'post');
					form.setAttribute('action', snsApiDomain + data.redirectURL);
					var hiddenField = document.createElement('input');
					hiddenField.setAttribute('type', 'hidden');
					hiddenField.setAttribute('name', "isSsoMember");
					hiddenField.setAttribute('value', "N");
					form.appendChild(hiddenField);
					document.body.appendChild(form);
					form.submit();
				}
				else {
					location.href = snsApiDomain + data.redirectURL;
				}
			}
		});
	});
}
