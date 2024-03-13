$(function() {
	console.log(sCoInfo1);
	console.log(result);
	if (isSsoMember === '1') {
		// 이미 통합회원인 경우
		$('.stitle').text("본인 인증 결과");
		$('.txt_top').html('<p class="c_b">이미 비바샘 통합회원으로 가입되어 있습니다.</p><p>아래의 아이디로 로그인 해주세요.</p>');

		hideIdentificationInfo();
	} else if(result != null && result !== ""){

		$('#identificationResult').val(result);
		$('#sName').val(sName);
		$("#sCoInfo1").val(sCoInfo1);
		$('#sGenderCode').val(sGenderCode);
		$('#sex').val(sex);
		$('#sBirthDate').val(sBirthDate);
		$('#sMobileNo').val(sMobileNo);
		$("#isIpin").val(isIpin);

        var sRtnMsg = "";
		if (result != 1 && tschoolUserCnt === 0) { // 최초 가입인 경우 폼으로 바로 이동
			$("#afterCertificationFrm").attr("action", "/member/join/form").submit();
			return false;
		}

		//통합회원 가입하는 경우 연수원 아이디 존재 여부 확인(회원 가입시 사용 가능한지도)
		$('.stitle').text("본인 인증 결과");
		hideIdentificationInfo();

		/*
		* 통합회원 가입 가능 여부 문구 셋팅
		* 1. 비바샘 계정이 있지만, 휴면상태인 경우
		* 2. 비바샘 연수원 계정이 여러개인 경우
			* 3. 비바샘 연수원 계정이 1개이지만, 휴면상태인 경우 */
		var resultText;
		var isNewIdTextAreaHide = false;
		var bottomText;
		if (result > 0) {
			if (existIdActive === 'N') { // 1. 비바샘 계정이 있지만, 휴면상태인 경우
				resultText = '<p><span class="c_b">현재 보유하고 계신 비바샘 아이디가 휴면 상태입니다.</span><br>비바샘 사이트에서 휴면 상태를 해지하고 다시 통합회원으로 가입해 주세요.</p>';
			} else if (tschoolUserCnt > 1) { // 비바샘 계정이 있지만, 연수원 아이디 여러개인 경우
				resultText = '<p><span class="c_b">현재 비바샘 연수원에 2개 이상의 아이디를 보유하고 계십니다.</span><br>비바샘 연수원에서 사용하실 1개의 아이디를 제외한 나머지 아이디는 탈퇴 하신 후 다시 통합회원으로 가입하여 주세요.</p>';
				isNewIdTextAreaHide = true;
			} else if (tschoolUserCnt > 0) { // 비바샘 계정이 있고, 연수원 아이디 한 개인 경우
				if(isActiveT === 'false') {
					//연수원 아이디 휴면
					resultText = '<p><span class="c_b">현재 보유하고 계신 비바샘 연수원 아이디 중 휴면 아이디가 존재합니다.</span><br>비바샘 연수원 사이트에서 휴면 상태를 해지하고 다시 통합회원으로 가입해 주세요.</p>';
					$('#existTschoolId').val(tUserId);
					isNewIdTextAreaHide = true;
				} else if(existIdInVivasam === 'true' && existIdInTschool === 'true') {
					//비바샘 및 연수원 아이디 사용 불가
					resultText = '<p><span class="c_b">이미 비바샘과 비바샘 연수원 회원으로 가입되어 있습니다.</span><br>통합회원 가입을 위해 새로운 아이디를 입력해 주세요.</p>';
					bottomText = '이 아이디는 비바샘 연수원에서(비바샘에서) 이미 사용 중입니다.<br>신규 아이디를 입력하고 지금 바로 통합회원으로 전환하세요!';
					$('#existTschoolId').val(tUserId);
				} else {
					resultText = '<p><span class="c_b">이미 비바샘과 비바샘 연수원 회원으로 가입되어 있습니다.</span><br>지금 통합회원으로 전환하세요.</p>';
					bottomText = '현재 비바샘과 비바샘 연수원에 모두 가입되어 있습니다.<br>원하시는 아이디를 선택하고 지금 바로 통합회원으로 전환하세요!';
					$('#existTschoolId').val(tUserId);
				}
			} else if (existIdInTschool === 'true') {
				// 티스쿨 아이디만 있는데, 사용이 불가능한 경우
				resultText = '<p><span class="c_b">이미 비바샘 회원으로 가입되어 있습니다.</span><br>통합회원 가입을 위해 새로운 아이디를 입력해 주세요.</p>';
				bottomText = '이 아이디는 비바샘 연수원에서(비바샘에서) 이미 사용 중입니다.<br>신규 아이디를 입력하고 지금 바로 통합회원으로 전환하세요!';
			} else {
				// 비바샘 아이디만 있고, 사용이 가능함
				resultText = '<p><span class="c_b">이미 비바샘 회원으로 가입되어 있습니다.</span><br>지금 통합회원으로 전환하세요.</p>';
				bottomText = '이 아이디로 통합회원 전환이 가능합니다. 지금 바로 전환하세요!';
			}
		} else { // 비바샘 계정이 없음
			if (tschoolUserCnt > 1) { // 비바샘 계정이 없고, 연수원 아이디 여러개인 경우
				resultText = '<p><span class="c_b">현재 비바샘 연수원에 2개 이상의 아이디를 보유하고 계십니다.</span><br>비바샘 연수원에서 사용하실 1개의 아이디를 제외한 나머지 아이디는 탈퇴 하신 후 다시 통합회원으로 가입하여 주세요.</p>';
				isNewIdTextAreaHide = true;
			} else if (tschoolUserCnt > 0) { // 비바샘 계정이 없고, 연수원 아이디 한 개인 경우
				if(isActiveT === 'false') {
					//연수원 아이디 휴면
					resultText = '<p><span class="c_b">현재 보유하고 계신 비바샘 연수원 아이디 중 휴면 아이디가 존재합니다.</span><br>비바샘 연수원 사이트에서 휴면 상태를 해지하고 다시 통합회원으로 가입해 주세요.</p>';
					$('#existTschoolId').val(tUserId);
					isNewIdTextAreaHide = true;
				} else if(existIdInVivasam === 'true' && existIdInTschool === 'true') {
					//비바샘 및 연수원 아이디 사용 불가
					resultText = '<p><span class="c_b">이미 비바샘 연수원 회원으로 가입되어 있습니다.</span><br>통합회원 가입을 위해 새로운 아이디를 입력해 주세요.</p>';
					bottomText = '이 아이디는 비바샘 연수원에서(비바샘에서) 이미 사용 중입니다.<br>신규 아이디를 입력하고 지금 바로 통합회원으로 전환하세요!';
					$('#existTschoolId').val(tUserId);
				} else {
					resultText = '<p><span class="c_b">이미 비바샘 연수원 회원으로 가입되어 있습니다.</span><br>지금 통합회원으로 전환하세요.</p>';
					$('#existTschoolId').val(tUserId);
				}
			} else {
				// 비바샘 연수원 아이디만 있고, 사용이 가능함
				resultText = '<p><span class="c_b">이미 비바샘 연수원 회원으로 가입되어 있습니다.</span><br>지금 통합회원으로 전환하세요.</p>';
			}
		}

		$('.txt_top > p').html(resultText);
		$('#info_bottom').html(bottomText);
		if (isNewIdTextAreaHide) {
			$("dl.newIdWrap").hide();
		}
	} else {
		if(sMessage != null && sMessage != 'null' && sMessage != "") {
			alert(sMessage);
			location.href = "/main";
		}
		$('#identificationResult').val(result);
		$('#sName').val(sName);
		$("#sCoInfo1").val(sCoInfo1);
		$('#sGenderCode').val(sGenderCode);
		$('#sex').val(sex);
		$('#sBirthDate').val(sBirthDate);
		$('#sMobileNo').val(sMobileNo);
		$("#isIpin").val(isIpin);
	}


	//휴대폰 인증
	$("#cellphone").click(function(){
		//window.document.domain="www.vivasam.com";
		if(checkAgree()) {
			window.name = "Parent_window";
			fnPopupCell();
		}
	});


	//아이핀 인증
	$("#ipin").click(function(){
		if(checkAgree() ) {
			//도메인 설정
			//window.document.domain="www.vivasam.com";
			window.name = "Parent_window";
			fnPopup();
		}
	});

	//새로운 통합 아이디 입력란에 엔터 submit 방지
	$('input[type="text"]').keydown(function(e) {
		isNewSsoIdOk = false;
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	});

});

var isNewSsoIdOk = false;

function checkAgree() {
	var isSsoMember = $('input[name=isSsoMember]').val();

	// 통합회원
	if(isSsoMember == 'Y') {
		//통합회원 특별약관
		var agree1 = $("#lbAgree1").is(':checked');
		//비바샘
		var agree2 = $("#TermAgree").is(':checked');
		var agree3 = $("#PrivacyAgree").is(':checked');
		// var agree4 = $("#tschoolPromoAgree").is(':checked');
		//티스쿨
		var agree5 = $("#lbAgree3_1").is(':checked');
		var agree6 = $("#lbAgree3_2").is(':checked'); //선택
		// var agree7 = $("#lbAgree3_4").is(':checked'); 2022.04 제3자제공에 대한 동의 삭제

		//if(agree1 && agree2 && agree3 && agree5 && agree6){
		if(agree2 && agree3){	//서비스이용약관,개인정보수집이용
			//$("#joinFrm").attr("action", "/member/sso/form").submit();
			//$("#joinFrm").submit();
			return true;
		} else{
			alert("회원가입을 위해 필수 약관에 동의해 주세요.");
			return false;
		}
	} else {
		var agree1 = $("#TermAgree").is(':checked');
		var agree2 = $("#PrivacyAgree").is(':checked');
		if(agree1 && agree2) {
			return true;
			//$("#joinFrm").attr("action", "/member/sso/form").submit();
			//$("#joinFrm").submit();
		} else{
			alert("회원가입을 위해 필수 약관에 동의해 주세요.");
			return false;
		}
	}
}

function nextStepBtn() {
	if(agree5 == "Y") {
		if(isActiveT == 'false' || tschoolUserCnt > 1) {
			return false;
		} else if(isActiveT == 'true' && tschoolUserCnt == 1) {
			if(CheckSelectedId()) {
				$("#joinFrm").attr("action", "/member/join/form").submit();
			}
		} else if(tschoolUserCnt == 0) {
			$("#joinFrm").attr("action", "/member/join/form").submit();
		}
	} else {
		$("#joinFrm").attr("action", "/member/join/form").submit();
	}
}

function popUpLocatin(w, h) {
	var obj = {
		pLeft :0, pTop : 0
	};
	obj.pLeft = Math.ceil(( window.screen.width - w )/2);
	obj.pTop  = Math.ceil(( window.screen.height - h )/2);
	return obj;
}

//아이핀 인증 팝업
function fnPopup(){
	var loc = popUpLocatin(450, 550);
	document.domain= ipinDocumentDomain;
	window.open('', 'popupIPIN2', 'width=450, height=550, top='+loc.pTop + ', left='+loc.pLeft+ ',fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes,location=no, scrollbar=no');
	document.form_ipin.target = "popupIPIN2";
	document.form_ipin.action = "https://cert.vno.co.kr/ipin.cb";
	document.form_ipin.submit();
}


//휴대폰 인증 팝업
function fnPopupCell(){
	var loc = popUpLocatin(500, 550);
	document.domain= ipinDocumentDomain;
	window.open('', 'popupChk', 'width=500, height=550, top='+loc.pTop + ', left='+loc.pLeft+ ', fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
	document.form_chk.target = "popupChk";
	document.form_chk.submit();
}

//본인 인증 hide
function hideIdentificationInfo() {
	$('#checkExistIdentification, .footnote, .info_box').css('display', 'none');
}

//아이디 중복 확인 처리.
function CheckSelectedId() {
	if(isActiveT == 'true' && tschoolUserCnt == 1 && tUserAvailable == 'true') {
		$('#newId').val(tUserId);
		return true;
	} else {
		var newSsoId = $('input#ssoId').val();
		if(newSsoId == null || newSsoId == '') {
			alert('통합회원으로 전환시 사용할 새로운 아이디를 입력해주세요.');
		} else if ($("#id_bak").val() != newSsoId) {
			alert('중복 확인을 해주세요.');
		} else {
			$('#newId').val($('#ssoId').val());
			return true;
		}
	}
	return false;
}

//새로운 아이디 사용 가능 여부 확인
function clickcheck_id() {
	var id_fd =  $('input#ssoId').val();

	if(!mycheck(id_fd)) {
		$("#check_id_layer").text('영문 또는 영문, 숫자 조합시 4~12자 이내로 입력해 주세요.');
		$("#check_id_layer").addClass("red");
	} else {
		checkId(id_fd);
	}
}

function mycheck(p) {
	//아이디가 유효한 형식인지 확인
	var reg_id = /^[a-z]+[a-z0-9]{3,11}$/g;
	return reg_id.test(p);
}

function checkId(id){
	//입력한 아이디가 통합, 비바샘, 연수원db에 존재하는지 확인
	Ajax.execute({
		url: '/member/join/getCheckAvailableSsoId.json',
		data: JSON.stringify({
			ssoId : id
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			if (result.response == true) {
				isNewSsoIdOk = true;
				$("#check_id_layer").text("사용 가능한 아이디입니다.");
				$("#check_id_layer").removeClass("red");
				$("#id_bak").val($("#ssoId").val());
			} else {
				isNewSsoIdOk = false;
				$("#check_id_layer").text("이미 사용중인 아이디 입니다.");
				$("#check_id_layer").addClass("red");
			}
		}
	});
}

// 통합회원 전환하기 버튼 클릭 시 동작
function convertSsoProcBtn() {
	console.log(apiDataObj);
	var checkedSsoId = $("input:radio[name=ssoId]:checked").val();
	var checkedSsoIdText = $("input:text[name=ssoId]").val();

	console.log(isNewSsoIdOk, checkedSsoId, checkedSsoIdText);
	if (checkedSsoIdText !== undefined) {
		if (checkedSsoIdText === '') {
			alert('신규 통합 ID를 입력해주세요.');
			$("input:text[name=ssoId]").focus();
			return;
		} else if (!isNewSsoIdOk) {
			alert('중복 확인을 해주세요.');
			return;
		}

		checkedSsoId = checkedSsoIdText;
	}

	if (checkedSsoId === undefined || checkedSsoId === '') {
		alert('전환할 ID를 선택해주세요.');
		return;
	}

	if(!mycheck(checkedSsoId)) {
		alert('영문 또는 영문, 숫자 조합시 4~12자 이내로 입력해 주세요.');
		return;
	}

	if ($("dl.newIdWrap").length > 0 && !isNewSsoIdOk) {
		alert('중복 확인을 해주세요.');
		return;
	}
	var changeidInfo;
	if(apiDataObj.length == 1) {
		changeidInfo = apiDataObj[0];
	}else {
		for(var i = 0 ; i < apiDataObj.length ; i++) {
			if(checkedSsoId == apiDataObj[i].memberId ) {
				changeidInfo = apiDataObj[i];
			}else  {
				if(srcProcSite == apiDataObj[i].srcProcSite) {
					changeidInfo = apiDataObj[i];
				}
			}
		}
	}



	if($("#sMobileNo").val() == "" ) {
		$("#sMobileNo").val(changeidInfo.memberHp);
		$("#cellphone").val(changeidInfo.memberHp);

	}

	if($("#email").val() == "" ) {
		$("#email").val(changeidInfo.memberEmail);
	}

	$("#processStr").val(changeidInfo.processStr);
	$("#memberRegCase").val(changeidInfo.memberRegCase);
	$("#newId").val(checkedSsoId);
	$("#_ssoId").val(checkedSsoId);
	$("#_vId").val($("#vId").val());
	$("#_tId").val($("#tId").val());
	$("#isSsoDirect").val("1");

	$("#afterCertificationFrm").attr("action", "/member/join/form").submit();
}