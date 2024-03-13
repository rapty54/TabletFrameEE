function onSignIn(response) {
    const responsePayload = parseJwt(response.credential);

    var data = {
        "type": "GOOGLE",
        "id": responsePayload.sub,              //구) googleUser.Ba
        "accessToken": response.credential,
        "idToken": response.credential          //구) googleUser.getAuthResponse().id_token
    };

    $.ajax({
        url: '/member/sns/login.do',
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.code != null && data.code == 'sns_goLogin') {
                // 로그인 go
                $('#quickLoginFrmGnb').find('input[name="goURL"]').val(window.location.href);
                $('#quickLoginFrmGnb').submit();
            } else if (data.code != null && data.code == 'sns_fail') {
                alert(data.msg);
            } else if (data.code != null && data.code == 'sns_success_mapping') {
                location.href = snsApiDomain + data.redirectURL;
            } else if (data.code != null && data.code == 'sns_join') {
                location.href = snsApiDomain + data.redirectURL;
            } else if (data.code != null && data.code == 'sns_success_identification') {
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
            } else {
                location.href = snsApiDomain + data.redirectURL;
            }
        }
    });
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}