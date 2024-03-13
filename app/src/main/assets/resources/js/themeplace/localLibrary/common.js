$(function () {

});

function goPage(url, bLoginChk){
	// 로그인 체크
	if(bLoginChk) {
		if(loginChk()){
			return false;
		}
	}
	// 학교정보 체크
	if(SCH_NAME == ''){
		// 학교정보 수정 레이어 팝업
		$('.layerPop').show();
		return false;
	}

	if(url == '/themeplace/localLibrary/sub'){
		gtag('event', '메인', {
			'event_category': '지역화',
			'event_label': '지역화 자료실',
			'value': 1
		});

	}

	location.href = url;
}

function loginChk(){
	if(MEMBER_ID == ''){
		Layer.openLayerLogin(function() {
			location.reload();
		});
		return true;
	}
	return false;
}

// 우리 지역 지도 만들기 페이지 이동
function goCreateMap(type) {
	// 로그인 체크
	// if(loginChk()){
	// 	return false;
	// }
	// 학교정보 체크
	if(type !== 'main' && SCH_NAME == ''){
		// 학교정보 수정 레이어 팝업
		$('.layerPop').show();
		return false;
	}

	var url = window.globals.config.cdnDomain + '/VS/THEME/LOCALIZATION/Map/index.html';
	var latitude = '';		// 경도
	var longitude = '';		// 위도
	var isGovUpdate = '';	// 학교알리미 연동 여부(Y: 연동, N: 미연동)

	if(type == 'main'){
		gtag('event', '메인', {
			'event_category': '지역화',
			'event_label': '우리 지역 지도',
			'value': 1
		});

	}else{
		gtag('event', '자료실', {
			'event_category': '지역화',
			'event_label': '지도 만들기',
			'value': 1
		});
	}

	if (SCH_CODE) {
		Ajax.execute({
			type: 'post',
			url: '/themeplace/localLibrary/ajax/selectViewSchoolInfo.json',
			data: {
				schCode: SCH_CODE
			},
			dataType: 'json',
			success: function (result) {
				latitude = result.response.lttud;
				longitude = result.response.lgtud;
				isGovUpdate = result.response.govUpdYn;

				// 학교알리미 연동이 안되어 있다면 파라미터 없이 페이지 이동
				if (SCH_CODE != '' && isGovUpdate == 'Y') {
					url += '?lat=' + latitude + '&long=' + longitude + '&mark=' + SCH_NAME;
				} else {
					url += '?lat=' + '&long=' + '&mark=' + SCH_NAME;
				}

				Popup.openWindowTab(url);
			},
		});
	} else {
		url += '?lat=' + '&long=' + '&mark=' + SCH_NAME;

		Popup.openWindowTab(url);
	}
}