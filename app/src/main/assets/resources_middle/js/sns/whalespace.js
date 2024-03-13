var AUTHORIZE_URL = 'https://auth.whalespace.io/oauth2/v1.1/authorize';
var CLIENT_ID = whalespaceClientId;
var CLIENT_SECRET = whalespaceClientSecret;
var ACTIVE_ENV = window.globals.activeEnv;
console.log(ACTIVE_ENV);
var REDIRECT_URI = '';

if(ACTIVE_ENV == 'local'){
	REDIRECT_URI = encodeURI('http://localhost:9090/member/whalespace/login/callback.do');
}else if(ACTIVE_ENV == 'dev'){
		REDIRECT_URI = encodeURI('https://dev-v.vivasam.com/member/whalespace/login/callback.do');

}else if(ACTIVE_ENV == 'dev2') {
	REDIRECT_URI = encodeURI('https://dev2-v.vivasam.com/member/whalespace/login/callback.do');

}else if(ACTIVE_ENV == 'prod' || ACTIVE_ENV == 'prodbatch'){
		REDIRECT_URI = encodeURI('https://v.vivasam.com/member/whalespace/login/callback.do');
}



//웨일스페이스 로그인 화면(새창)
function whalespaceOAuth(){
	var state = getUniqState();
	var url = AUTHORIZE_URL+ '?response_type=code&client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&state=' + state + '&scope=https%3A//whalespace.io/directory/user.profile.readonly';
	console.log(url);
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

	$.ajax({
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
	var data = {
		type : 'WHALESPACE',
		infoCheck : infoCheck,
		accessToken : access_token
	};
	$.ajax({
		url : '/member/sns/login.do',
		data : JSON.stringify(data),
		contentType: 'application/json',
		type: 'post',
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
}