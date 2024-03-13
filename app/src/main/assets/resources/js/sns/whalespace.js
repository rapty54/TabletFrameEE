var AUTHORIZE_URL = 'https://auth.whalespace.io/oauth2/v1.1/authorize';
var CLIENT_ID = whalespaceClientId;
var CLIENT_SECRET = whalespaceClientSecret;
var ACTIVE_ENV = window.globals.config.activeEnv;
var REDIRECT_URI = '';
var WHALESPACE_CALLBACK = whalespaceCallback;
if(ACTIVE_ENV == 'local'){
	REDIRECT_URI = encodeURI(WHALESPACE_CALLBACK);
}else if(ACTIVE_ENV == 'localdev'){
    REDIRECT_URI = encodeURI('https://local-e.vivasam.com/member/whalespace/login/callback');
}else if(ACTIVE_ENV == 'dev'){
	if(menuType == 'quick'){
		REDIRECT_URI = encodeURI('https://dev-e.vivasam.com/member/whalespace/login/callback');
	}else{
		REDIRECT_URI = encodeURI('https://dev.vivasam.com/member/whalespace/login/callback');
	}
}else if(ACTIVE_ENV == 'dev2') {
		REDIRECT_URI = encodeURI(WHALESPACE_CALLBACK);

}else if(ACTIVE_ENV == 'prod' || ACTIVE_ENV == 'prodbatch'){
	if(menuType == 'quick'){
		REDIRECT_URI = encodeURI('https://e.vivasam.com/member/whalespace/login/callback');
	}else{
		REDIRECT_URI = encodeURI('https://www.vivasam.com/member/whalespace/login/callback');
	}
}

//웨일스페이스 로그인 화면(새창)
function whalespaceOAuth(){
	var state = getUniqState();
	var url = AUTHORIZE_URL+ '?response_type=code&client_id=' + CLIENT_ID +
		'&redirect_uri=' + REDIRECT_URI +
		'&state=' + state + '&scope=https%3A//whalespace.io/directory/user.profile.readonly';

	var win = window.open(url, 'whalespaceloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=600, height=720');
}

/**
 * oauth 2.0 spec 의 state 값 자동 생성
 * @ignore
 * @returns {*}
 * @private
 */
function getUniqState(){
	var stat_str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8); return v.toString(16); });
	return stat_str;
}

function whalespaceGetToken(code, state, infoCheck){
	var data = {
		grant_type: 'authorization_code',
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		code: code,
		refresh_token: ''
	};

	Ajax.execute({
		url : 'https://auth.whalespace.io/oauth2/v1.1/token',
		data : data,
		contentType: 'application/x-www-form-urlencoded',
		type: 'post',
		dataType: 'json',
		success : function(data) {
			console.log(data);
			var access_token = data.access_token;
			var refresh_token = data.refresh_token;
			var token_type = data.token_type;
			var expires_in = data.expires_in;
			whalespaceLogin(access_token, infoCheck);
		}
	});
}

function whalespaceLogin(access_token) {
	var infoCheck = menuType == 'infoCheck' || menuType == 'leave' ? true : false;

	var url = '/member/sns/login';

	// 연동 또는 연동해제의 경우
	if (menuType === 'linkSns' || menuType === 'unlinkSns') {
		// 현재 클릭한 SNS가 연동하기인지 연동해제인지 재확인 후 URL 설정
		setMenuTypeBySnsLink("WHALESPACE");
		if (menuType === 'linkSns') {
			url = '/my/info/sns/link';
		} else if (menuType === 'unlinkSns') {
			url = '/my/info/sns/unlink';
		}
	}

	var data = {
		type : 'WHALESPACE',
		infoCheck : infoCheck,
		accessToken : access_token
	};
	data.via = $('#joinSelectFrm [name=via]').val();
	data.reco = $('#joinSelectFrm [name=reco]').val();

	Ajax.execute({
		url : url,
		data : JSON.stringify(data),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success : function(data) {
			var response = data.response;
			console.log(response);
			if (menuType == 'infoCheck') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				}
				else {
					location.href = response.redirectURL;
				}
			} else if (menuType == 'linkSns') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					alert("웨일스페이스 연결이 완료되었습니다.");
					getMySnsMemberInfoList();
				}
			} else if (menuType == 'unlinkSns') {
				if (response.code != null && response.code == 'sns_fail') {
					alert(response.msg);
				} else {
					alert("웨일스페이스 연결이 해제되었습니다");
					getMySnsMemberInfoList();
				}
			} else if (menuType == 'leave') {
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
}
/*
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

 */