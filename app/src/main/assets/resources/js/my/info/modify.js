// 기존 sns 정보 리스트
let existingSnsMemberInfoList = [];

// 변경된 sns 정보 리스트
let changedSnsMemberInfoList = [];

// 비밀번호 변경 여부 확인
let changePwdCheck = false;

$(document).ready(function(){

	if (menuType != null && menuType == 'linkSns') {
		getMyExistingSnsMemberInfoList();
		getMySnsMemberInfoList();
	}
	$('#btnPwd').on('click',function(){
		popupPassword();
	});

	// 네이버만 API 구조상 HTML을 한번에 묶을수 없어서 따로 처리함
	$('#naver_tab').on('click', '.btn_link, .btn_complete', function () {
		$('#naver_id_login').find('img').click();
	});

	// 구글도 API변경으로 인해 '연결하기'버튼 별도 처리 진행
	// $('#GgCustomLogin').on('click', '.btn_link', function () {
	// 	// document.getElementById($('iframe').attr('id')).contentWindow.document.getElementById('button-label').click();
	// 	$('iframe').find('button-label').click();
	// 	console.log($('iframe').find('button-label'))
	// });
	$('#schoolSearch').on('click',function() {
		schoolSearchLayer();
	});

	$('#check_email').on('click',function(){
		chkEmail();
	});
	$('#emailSB').on('change',function() {
		changeEmail();
	});
	$('#searchAddress').on('click',function(){
		Popup.openJuso();
	});
	$('#myInfoConfirm').on('click',function() {
		saveMyInfo();
	});
	$('#sch_name_searchedv').on('click',function(){
		schoolSearchLayer();

	});
	if(memberTypeCode != '0' || (memberInfo.schFlag == 'K' || memberInfo.schFlag == 'O' || memberInfo.schFlag == 'C') ){
		$("#myGradeArea").hide();
	}
	// 내 교과 추가하기
	$('#btn-subject-second').on('click',function() {
		$('#li-subject-second').show();
	});
})

function schoolSearchLayer() {
	Layer.openLayerSchoolSearch(function(data) {
		data.tab  = data.tab.substr(0, 1);
		if(data.tab == 'K' || data.tab== 'C' || data.tab == 'O' || memberTypeCode != 0) {
			$("#myGradeArea").hide();
		}else {
			$("#myGradeArea").show();
		}
		if ((data.tab == 'M' || data.tab == 'H') && memberTypeCode == '0') {
			console.log("SHOW");
			$('#mySubjectArea').show();
			Ajax.execute({
				url: '/my/info/subject/list.json',
				data: {
					tab: data.tab
				},
				type: 'get',
				dataType: 'json',
				success: function(data) {
					// $('#mySubjectArea').show();
					$('select[name=mainSubject] option.data').remove();
					$('select[name=secondSubject] option.data').remove();
					$('#li-subject-second').hide();
					var subjectList = data.response;
					for (var i = 0; i < subjectList.length; i++) {
						var subject = subjectList[i];
						$('select[name=mainSubject]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
						$('select[name=secondSubject]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
					}
				}
			});
		} else {
			$('#mySubjectArea').hide();

		}
	});
}

$(window).load(function() {
	// 구글도 API변경으로 인해 '연결하기'버튼 별도 처리 진행
	$('#GgCustomLogin').on('click', '.btn_link', function () {
		document.getElementById("button-label").click();
	});
})

//개인정보 변경여부 체크
function checkChangeMyInfo(){

	//비밀번호
	if(changePwdCheck) {
		return false;
	}

	//이메일
	var $email = $('#email1').val() + '@' + $('#email2').val();
	if ($email !== memberInfo.email) {
		return false;
	}

	//휴대전화번호
	var $cellphone1 = $('#cellphone1').val();
	var $cellphone2 = $('#cellphone2').val();
	var $cellphone3 = $('#cellphone3').val();
	if ($cellphone1 !== memberInfo.cellphone1 || $cellphone2 !== memberInfo.cellphone2 || $cellphone3 !== memberInfo.cellphone3) {
		return false;
	}

	//제직학교명
	var $schName = $('#sch_name_searchedv').val();
	if ($schName !== memberInfo.schName) {
		return false;
	}

	//담당학년
	var $myGradeList = {'1': '0', '2': '0', '3': '0', '4': '0', '5': '0', '6': '0'};
	$('input[name="myGrade"]').each(function () {
		if ($(this).is(':checked')) {
			$myGradeList[$(this).val()] = $(this).val();
		}
	});
	if ($myGradeList['1'] !== myGradeList['grade1']
		|| $myGradeList['2'] !== myGradeList['grade2']
		|| $myGradeList['3'] !== myGradeList['grade3']
		|| $myGradeList['4'] !== myGradeList['grade4']
		|| $myGradeList['5'] !== myGradeList['grade5']
		|| $myGradeList['6'] !== myGradeList['grade6']) {
		return false;
	}

	//내교과
	var $mainSubject = $("select[name=mainSubject] option:selected").val();
	var $secondSubject = $("select[name=secondSubject] option:selected").val();
	if ($mainSubject !== memberInfo.mainSubject || $secondSubject !== memberInfo.secondSubject) {
		return false;
	}

	//마케팅 및 광고 활용 동의
	var $marketingSmsYn = $('#marketingSmsYn').is(':checked') ? 'Y' : 'N';
	var $marketingEmailYn = $('#marketingEmailYn').is(':checked') ? 'Y' : 'N';
	var $marketingTelYn = $('#marketingTelYn').is(':checked') ? 'Y' : 'N';
	//if ($marketingSmsYn !== memberInfo.smsYn || $marketingEmailYn !== memberInfo.mailingYn || $marketingTelYn !== memberInfo.telYn) {
		//return false;
	//}

	//연수원 활용동의 수정
	var $marketingSmsYnT = $('#marketingSmsYnT').is(':checked') ? 'Y' : 'N';
	var $marketingEmailYnT = $('#marketingEmailYnT').is(':checked') ? 'Y' : 'N';
	var $marketingTelYnT = $('#marketingTelYnT').is(':checked') ? 'Y' : 'N';
	//if ($marketingSmsYnT !== memberInfo.smsYn || $marketingEmailYnT !== memberInfo.mailingYn || $marketingTelYnT !== memberInfo.telYn) {
		//return false;
	//}
	//비바샘 / 연수원 활용동의 1개도 다르면 false
	if ($marketingSmsYn !== memberInfo.marketingSmsYn || $marketingEmailYn !== memberInfo.marketingEmailYn || $marketingTelYn !== memberInfo.marketingTelYn
		|| $marketingSmsYnT !== memberInfo.marketingSmsYnT || $marketingEmailYnT !== memberInfo.marketingEmailYnT || $marketingTelYnT !== memberInfo.marketingTelYnT) {
		return false;
	}

	// SNS 연동
	if (menuType != null && menuType == 'linkSns') {
		let keys = Object.keys(existingSnsMemberInfoList);
		for (let i = 0; i < keys.length; i++) {
			if (existingSnsMemberInfoList[keys[i]] !== changedSnsMemberInfoList[keys[i]]) {
				return false;
			}
		}
	}
	return true;
}

function checkModifyInfoEventJoin() {
	let eventJoinYn = 'N';
	const eventEndDate = new Date('2023-04-06');
	const nowDate = new Date();

	if(nowDate <= eventEndDate) {
		Ajax.execute({
			url: '/event/chkEventJoin',
			data: {eventId : '440'},
			type: 'post',
			dataType: 'json',
			async: false,
			success: function(data) {
				console.log("data", data)
				if(data.response === 'Y') {
					eventJoinYn = 'Y'
				} else {

				}
			},
			error: function (xhr, status, err) {
				alert('오류가 발생했습니다.');
				console.log(err);
			},
		});
	}
	return eventJoinYn
}

//개인정보 변경하기
function saveMyInfo(){

	if(checkChangeMyInfo()) {
		alert("회원정보를 수정해 주세요.")
		return;
	}

	$('#marketingEmailYn').val($('#marketingEmailYn').is(':checked'));
	$('#marketingTelYn').val($('#marketingTelYn').is(':checked'));
	$('#marketingSmsYn').val($('#marketingSmsYn').is(':checked'));

	$('#marketingEmailYnT').val($('#marketingEmailYnT').is(':checked'));
	$('#marketingTelYnT').val($('#marketingTelYnT').is(':checked'));
	$('#marketingSmsYnT').val($('#marketingSmsYnT').is(':checked'));

	const modifyInfoEventJoinYn = checkModifyInfoEventJoin();  // 개인정보 수정 이벤트 참여 체크 함수입니다. 2023-04-07 이후로 삭제가능
	Ajax.execute({
		data: $('#JoinFrm').serialize(),
		url: "/my/info/savemyinfo.json",
		success: function(response) {

			var obj = response.response;
			if (obj['code'] == 'error') {
				switch(obj['retMsg']) {
					case('chkEmail') :alert('이메일 중복확인을 해주세요.'); break;
					case('emailChkErr') :alert('올바른 이메일 형식이 아닙니다.'); break;
					case('emailCopyError') :alert('이미 사용중인 이메일입니다.'); break;
					case('chkMyGrade') :alert('담당학년 항목에 값을 입력하셔야 합니다.'); break;
					case('cellChkFail') :alert('휴대전화번호 인증을 해주세요.'); break;
					case('mainSubject') : alert('내 교과를 선택 해 주세요');
					case('apiError') : alert('API 통신 오류 입니다.');
					case('dup_email') : alert('이미 사용중인 이메일입니다.');
					default :
				}
			}
			else if (response.response['code'] == 'success') {

				if(modifyInfoEventJoinYn === 'Y') {
					alert('회원정보가 수정되어 이벤트 자동 응모가 완료되었습니다.​');
				} else {
					alert('회원 정보가 수정 되었습니다.');
				}


				if(response.response['redirectUrl']) {
					location.href = response.response['redirectUrl'];
				} else {
					if(memberTypeCode == "0" ) {
						location.href = "/my/classroom/textbook/list"; // 내 교과서
					}else {
						location.href = "/main";
					}
				}
			}
		}
	});

}

// 이메일 확인
function chkEmail() {
	var email1 = $('#email1').val();
	var email2 = $('#email2').val();
	Ajax.execute({
		data: {
			'email1': email1,
			'email2': email2
		},
		url: "/my/info/email.json",
		success: function(response) {
			$('#email_okMsg').empty();
			$('#email_errorMsg').empty();
			if (response.response == 'error') {
				$('#email_errorMsg').append('올바른 이메일 형식이 아닙니다.');
			}
			if (response.response == 'used') {
				$('#email_errorMsg').append('이미 사용중인 이메일입니다.');
			}
			if (response.response == 'success') {
				$('#emailBak').val('Y');
				$('#email_okMsg').append('사용 가능한 이메일입니다.');

			}
		}
	});
}

//이메일 콤보박스 자동변경
function changeEmail(){
	var selEmail = $('#emailSB option:checked').text();
	var selVal = $('#emailSB').val();
	if (selVal != '') {
		$('#email2').val(selEmail);
		$('#email2').attr("readonly", true);
	}
	else {
		$('#email2').attr("readonly", false);
		$('#email2').val('');
		$('#email2').focus();
	}
}

//패스워드 변경 팝업
function popupPassword() {
	//schoolFindPop
	Layer.openLayer({
		url: '/my/info/password.popup',
		callback: function($div) {
			//패스워드 변경
			$('#btnPwdChk').on('click',function(){
				var oldPwd = $('#oldPwd').val();
				var newPwd = $('#newPwd').val();
				var chkPwd = $('#chkPwd').val();
				Ajax.execute({
					data: {
						'oldPwd': oldPwd,
						'newPwd': newPwd,
						'chkPwd': chkPwd
					},
					url: "/my/info/password.json",
					success: function(response) {
						$('#oldPwdMsg').empty();
						$('#newPwdMsg').empty();
						$('#chkPwdMsg').empty();
						//패스워드 입력 여부
						if (response.response['retCode'] == 'pwdBlank') {
							if(response.response['retMsg'] == 'oldPwd') {
								$('#oldPwdMsg').append('현재 비밀번호를 입력해 주세요.');
							}
							else if(response.response['retMsg'] == 'newPwd') {
								$('#newPwdMsg').append('변경 비밀번호를 입력해 주세요. ');
							}
							else if(response.response['retMsg'] == 'chkPwd') {
								$('#chkPwdMsg').append('변경 비밀번호 확인을 입력해 주세요.');
							}
						}
						//계정 패스워드 일치 여부
						if (response.response['retCode'] == 'pwdNotEq') {
							$('#oldPwdMsg').append('현재 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
							//초기화
							$('#oldPwd').val('');
							$('#newPwd').val('');
							$('#chkPwd').val('');
						}
						//패스워드 불일치
						if (response.response['retCode'] == 'chkNotEq') {
							$('#chkPwdMsg').append('새 비밀번호로 입력해 주신 비밀번호가 서로 다릅니다.');
						}
						//패스워드 변경 일치
						if (response.response['retCode'] == 'chkOldNewEq') {
							$('#chkPwdMsg').append('변경 비밀번호는 현재 비밀번호와 같은 것을 사용할 수 없습니다.');
						}
						//패스워드 정규식 불일치
						if (response.response['retCode'] == 'pwdMatch') {
							$('#newPwdMsg').append('비밀번호는 숫자, 영문, 특수문자를 2가지 이상 혼용하여야 합니다.');
						}
						if (response.response['retCode'] == 'pwdLength') {
							$('#newPwdMsg').append("비밀번호는 "+response.response['retMsg']+"자리 이상으로 입력해 주세요.");
						}
						//완료 메세지 노출
						if (response.response['retCode'] == 'success') {
							changePwdCheck = true;
							alert('비밀번호 변경이 완료되었습니다.');
							$div.remove();
						}
						else if (response.response['retCode'] == 'apiError') {
							alert('비밀번호 변경중 오류가 발생하였습니다.');
						}
						else if (response.response['retCode'] == 'error') {
							alert('비밀번호 변경중 오류가 발생하였습니다.');
						}
					}
				});
			});
		}
	});
}

// 전화 입력값에 따른 인증 출력란 이벤트
function changeCellPhone() {
	var chkCell = $('#cellPhoneChk').val();
	if (chkCell == 'Y'){return false;} // 이미 인증을 받았다면 리턴
	var getTel1 = $('#cellphone1').val();
	var getTel2 = $('#cellphone2').val();
	var getTel3 = $('#cellphone3').val();
	if (getTel1 == tel1 && getTel2 == tel2 && getTel3 == tel3) {
		$('#cellPhoneChk').val('');
		$('.cellNumberLine').css('display', 'none');
	}
	else {
		$('#cellPhoneChk').val('N');
		$('.cellNumberLine').css('display', '');
	}
}

// 휴대전화인증
function sendSMS() {
	var phoneSend = $('#cellPhoneChk').val();
	// 1. 휴대전화번호 확인
	var cell1 = $('#cellphone1').val();
	var cell2 = $('#cellphone2').val();
	var cell3 = $('#cellphone3').val();
	if (cell1 == '' || cell2 == '' || cell3 == '') {
		$('#check_cellphone_layer').empty();
		$('#check_cellphone_layerError').empty();
		$('#check_cellphone_layerError').append('휴대전화 번호를 확인해주세요.');
		return false;
	}
	var phoneNumber = cell1+cell2+cell3 ;

	//휴대전화 중복체크
	var phoneNumberChk = cell1+"-"+cell2+"-"+cell3 ;
	var phoneNumResult = true;
	Ajax.execute({
		data: {
			'phoneNumber' : phoneNumberChk
		},
		url: "/my/info/checkexistphone.json",
		async: false,
		success: function(result) {
			if (result.response == true) {

			} else {
				phoneNumResult = false;
			}
		}
	});
	if(!phoneNumResult){
		alert("이미 가입된 휴대전화번호입니다.\n입력한 번호를 다시 확인하시거나, 고객센터(1544-7714)로 문의 바랍니다.");
		return false;
	}


	if (phoneSend == '') { return; }
	else {
		Ajax.execute({
			data: {
				'phoneNumber' : phoneNumber
			},
			url: "/my/info/send/sms.json",
			success: function(response) {
				var obj = response.response.code;
				var randomNum = response.response.randomNumber;

				$('#check_cellphone_layerError').empty();
				$('#check_cellphone_layer').empty();
				if (obj == 'success'){
					$('#check_cellphone_layer').append('인증번호를 발송했습니다.');
					$('#btnSendSMS').attr("href", "javascript:void(0);");
					$('#cellphone1').attr('readonly', true);
					$('#cellphone2').attr('readonly', true);
					$('#cellphone3').attr('readonly', true);
					if (randomNum != null) {
						alert(randomNum);
					}
				}
				else if (obj == 'error'){
					$('#check_cellphone_layerError').append('인증번호 발송 중 문제가 발생하였습니다.');
				}
				else if (obj == 'timeError'){
					$('#check_cellphone_layerError').append('1분후에 다시 시도해 주세요');
				}
			}
		});
	}
}


function reqSMS(){
	var authCode = $('#authCode').val();
	Ajax.execute({
		data: {
			'authCode' : authCode
		},
		url: "/my/info/req/sms.json",
		success: function(data) {
			// 1. 상태 메세지 초기화
			$('#check_cellphone_layer').empty();
			$('#check_cellphone_layerError').empty();
			$('#checkCellphoneAfter').empty();
			$('#checkCellphoneAfterError').empty();
			if (data.code == 'SUCCESS') {
				// 2. 정상적으로 인증완료시
				$('#cellPhoneChk').val('Y');
				$('#authCode').attr('readonly', true); //인증번호 값 수정불가
				$('#checkCellphoneAfter').append('인증이 정상적으로 완료되었습니다.'); //상태 메세지 수정
				$('#btnChkSMS').attr("href", "javascript:void(0);"); //버튼 이벤트 수정
			} else {
				// 3. 인증실패시
				$('#checkCellphoneAfterError').append(data.message);
			}
		}
	});
}

// SNS 연동 또는 연동해제 클릭시 상황에 맞게 menuType을 재설정해줌
function setMenuTypeBySnsLink(snsType) {

	let $snsTab;
	switch (snsType) {
		case "NAVER":
			$snsTab = $('#naver_tab');
			break;
		case "KAKAO":
			$snsTab = $('#kakao_tab');
			break;
		case "FACEBOOK":
			$snsTab = $('#facebook_tab');
			break;
		case "GOOGLE":
			$snsTab = $('#GgCustomLogin');
			break;
		case "WHALESPACE":
			$snsTab = $('#whale_tab');
			break;
		default:
			return;
	}

	// 연동 여부(현재 연동된 상태인지 확인)
	const linked = $snsTab.find('.btn_complete').is(':visible');
	if(linked) {
		menuType = 'unlinkSns';
	} else {
		menuType = 'linkSns';
	}

	changeSns = true;
}

// snsMemberInfoList를 확인하여 연동하기 탭 텍스트 렌더링
function renderSnsLinkText(snsMemberInfoList) {
	const linkSnsList = {
		"NAVER" : false,
		"KAKAO" : false,
		"FACEBOOK" : false,
		"GOOGLE" : false,
		"WHALESPACE" : false,
	};
	$.each(snsMemberInfoList, function (index, sns) {
		const type = sns.snsType;
		linkSnsList[type] = true;
	});

	changedSnsMemberInfoList = linkSnsList;

	$.each(linkSnsList, function(type, linked) {
		console.log(type, linked);
		let $snsTab;
		switch (type) {
			case "NAVER":
				$snsTab = $('#naver_tab');
				break;
			case "KAKAO":
				$snsTab = $('#kakao_tab');
				break;
			case "FACEBOOK":
				$snsTab = $('#facebook_tab');
				break;
			case "GOOGLE":
				$snsTab = $('#GgCustomLogin');
				break;
			case "WHALESPACE":
				$snsTab = $('#whale_tab');
				break;
			default:
				return;
		}
		if (linked) {
			$snsTab.find('.btn_link').hide();
			$snsTab.find('.btn_complete').css('display','block');
		} else {
			$snsTab.find('.btn_link').show();
			$snsTab.find('.btn_complete').hide();
		}
	})

}

function getMySnsMemberInfoList() {
	Ajax.execute({
		url: '/my/info/sns/linkedList.json',
		data: null,
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.response == null) {
				return false;
			}
			renderSnsLinkText(data.response);
		}
	});
}

function getMyExistingSnsMemberInfoList() {
	const linkSnsList = {
		"NAVER" : false,
		"KAKAO" : false,
		"FACEBOOK" : false,
		"GOOGLE" : false,
		"WHALESPACE" : false,
	};

	Ajax.execute({
		url: '/my/info/sns/linkedList.json',
		data: null,
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.response == null) {
				return false;
			}
			$.each(data.response, function (index, sns) {
				const type = sns.snsType;
				linkSnsList[type] = true;
			});

			existingSnsMemberInfoList = linkSnsList;
		}
	});
}