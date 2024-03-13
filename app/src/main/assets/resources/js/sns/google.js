function onSignIn(response) {
    const responsePayload = parseJwt(response.credential);

    var infoCheck = menuType == 'infoCheck' || menuType == 'leave' ? true : false;
    var data = {
        "type": "GOOGLE",
        infoCheck: infoCheck,
        "id": responsePayload.sub,              //구) googleUser.Ba
        "accessToken": response.credential,
        "idToken": response.credential          //구) googleUser.getAuthResponse().id_token
    };
    data.via = $('#joinSelectFrm [name=via]').val();
    data.reco = $('#joinSelectFrm [name=reco]').val();

    var url = '/member/sns/login';

    // 연동 또는 연동해제의 경우
    if (menuType === 'linkSns' || menuType === 'unlinkSns') {

        // 현재 클릭한 SNS가 연동하기인지 연동해제인지 재확인 후 URL 설정
        setMenuTypeBySnsLink("GOOGLE");
        if (menuType === 'linkSns') {
            url = '/my/info/sns/link';
        } else if (menuType === 'unlinkSns') {
            url = '/my/info/sns/unlink';
        }
    }

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
                    alert("구글 연결이 완료되었습니다.");
                    getMySnsMemberInfoList();
                }
            } else if (menuType == 'unlinkSns') {
                if (response.code != null && response.code == 'sns_fail') {
                    alert(response.msg);
                } else {
                    alert("구글 연결이 해제되었습니다.");
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
            } else if (response.code != null && response.code == 'sns_success_identification') {
                var form = document.createElement('form');
                form.setAttribute('method', 'post');
                if (menuType == 'quick') {
                    form.setAttribute('action', joinDomain + response.redirectURL);
                } else {
                    form.setAttribute('action', response.redirectURL);
                }
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', "isSsoMember");
                hiddenField.setAttribute('value', "N");
                form.appendChild(hiddenField);
                document.body.appendChild(form);
                form.submit();
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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}