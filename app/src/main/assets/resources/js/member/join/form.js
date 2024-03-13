$(function() {
	
	if(birthStateDesc == 'L' || birthStateDesc == 'H') {
		/* 생년월일 20세 이상 65세 이하로 가입 제한 변경 2022-01-18 김인수  */
		//20세이상
		var bday ="${sBirthDate}";
		var birthYear = bday.substr(0, 4);
		var d = new Date();
		var nowyyyy = d.getFullYear();
		var pyyyy = nowyyyy - birthYear;
		//if(pyyyy < 20 || pyyyy > 65) {

		var minyyyy = nowyyyy - 20;
		alert(minyyyy + "년 이 후 출생자만 가입 가능합니다.(20세 이상)");
		location.href="/main";

	}
	if(birthStateDesc == 'X') {
		alert("가입 불가능한 회원입니다.(생년월일 형식오류)");
		location.href="/main";
	}
	
	// 이메일 뒷부분 셀렉박스 변경시
	$("#emailSB").change(function() {
		if ( $(this).val() == 'w' ) {
			$("#email2").attr("readonly",false);
			$("#email2").val("");
			$("#email2").focus();
		} else {
			$("#email2").attr("readonly",true);
			$("#email2").val( $(this).val() );
		}
	});
	
	if(sMobileNo != null && sMobileNo != '') {
		var pattern2 = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
		var parseMobileNo = sMobileNo.replaceAll("-", "").split(pattern2);

		$("#displayCellphone").hide();
		$('#cellphone1').val(parseMobileNo[1]);
		$('#cellphone2').val(parseMobileNo[2]);
		$('#cellphone3').val(parseMobileNo[3]);
	}

	if(usePassword != null && usePassword != 'V') {
		if(snsMemberId != null &&  snsMemberId != '') {
			$('#displayPwd').hide();
			$('#displayPwdConfirm').hide();
		}
	}

	/* 재직학교 */
	$('#schName').val( $("#sch_name_searchedv").val() );
	$('#schCode').val( $("#sch_code_searchedv").val() );

	$('#certified01').on('click', function() {
		openJoinEpkPop();
	});

	$('#schoolSearch').on('click',function() {
		setSchoolFunc();
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
		//Layer.openLayerSchoolSearch();
		setSchoolFunc();
	});

	// 교사 인증
	$('input[name="certified"]').on('change', function() {
		changeCertified();
	});

	$("#btnSendCert").on('click', function() {
		sendCertMail();
	});
	$("#btnCheckCert").on('click', function() {
		checkCertMail();
	});


});

//비밀번호 정규식
var pattern1 = /[0-9]/;
var pattern2 = /[a-zA-Z]/;
var pattern3 = /[!@#$%^&*()?_~]/;     // 원하는 특수문자 추가 제거

//통합 아이디 중복 확인
function checkId(){
	var reg_id = /^[a-z]+[a-z0-9]{3,11}$/g;
	var id_fd = $("#id_fd").val();
	if(id_fd.search(reg_id) == -1) {
		//아이디 조건에 맞는지 확인
		$("#check_id_layer").removeClass().addClass('errorMsg').text('영문 또는 영문, 숫자 조합시 4~12자 이내로 입력해 주세요.');
	} else {
		//입력한 아이디가 통합, 비바샘, 티스쿨db에 존재하는지 확인
		Ajax.execute({
			url: '/member/join/getCheckAvailableSsoId.json',
			data: JSON.stringify({
				ssoId : id_fd
			}),
			contentType: 'application/json',
			method: 'post',
			dataType: 'json',
			success: function(result) {
				if (result.response == true) {
					$("#check_id_layer").removeClass().addClass("okMsg").text("사용 가능한 아이디입니다.");
					$("#id_bak").val($("#id_fd").val());
				} else {
					$("#check_id_layer").removeClass().addClass("errorMsg").text("이미 사용중인 아이디 입니다.");
					//id_dup_check=false;
				}
			}
		});
	}
}

// 비밀번호
function checkpassword2() {
	var pass =  $("#pwdin").val();

	var chk = 0;
	if(pass.search(/[0-9]/g) != -1 ) chk ++;
	if(pass.search(/[a-zA-Z]/ig)  != -1 ) chk ++;
	if(pass.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;

	if(pass.length < 8 ) {
	    $("#check_pwd1_layer").removeClass().addClass('errorMsg').text('최소	 8자리 이상으로 입력해주세요.');
    } else if(chk < 2) {
		$("#check_pwd1_layer").removeClass().addClass('errorMsg').text('숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다.');
		return;
	} else if(pattern1.test(pass) && pattern2.test(pass) && pattern3.test(pass) && pass.length < 8) {
		$("#check_pwd1_layer").removeClass().addClass('errorMsg').text('영문+숫자+특수문자인 경우 8자리 이상으로 입력해 주세요.');
		return;
	} else if(pattern1.test(pass) && pattern2.test(pass) && !pattern3.test(pass) && pass.length < 10) {
		$("#check_pwd1_layer").removeClass().addClass('errorMsg').text('영문+숫자인 경우 10자리 이상으로 입력해 주세요.');
		return;
		} else if ($("#id_fd").val() != "" && pass.indexOf($("#id_fd").val()) > -1) {
		$("#check_pwd1_layer").removeClass().addClass('errorMsg').text('아이디를 포함할 수 없습니다.');
		return;
	} else {
		$("#check_pwd1_layer").removeClass().addClass('okMsg').text('사용 가능한 비밀번호입니다.');
	}

	checkpassword();
}

// 비밀번호 confirm 일치 확인
function checkpassword() {
	var pass =  $("#pwdin").val();
	var compass = $("#password_confirm").val();

	if(compass != null && compass != '') {
        if (pass != compass) {
           $("#check_pwd2_layer").removeClass().addClass('errorMsg').text('입력하신 비밀번호와 일치하지 않습니다.');
        } else {
            $("#check_pwd2_layer").removeClass().addClass('okMsg').text('동일한 비밀번호 입니다.');
        }
    }
}

// 이메일 중복 확인
function clickcheck_email() {
	//이메일 형식 확인
	var reg_email=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;
	// var email_fd = $("#emailip").val();
	var email_fd = $("#email1").val() + '@' + $('#email2').val();

	if(email_fd.search(reg_email) == -1){
		$("#check_email_layer").removeClass().addClass('errorMsg').text('올바른 이메일 형식이 아닙니다.');
		return ;
	}

	// //이메일 중복 확인 CI 필수 사용으로 중복 체크 하지 않음
	// Ajax.execute({
	// 	url: '/member/join/getCheckExistPerson.json',
	// 	data: JSON.stringify({
	// 		name : $('input[name="check_name"]').val(),
	// 		email : email_fd
	// 	}),
	// 	contentType: 'application/json',
	// 	method: 'post',
	// 	dataType: 'json',
	// 	success: function(result) {
	// 		if (result.response == true) {
	// 	        $("#check_email_layer").removeClass().addClass('okMsg').text('사용 가능한 이메일입니다.');
	// 	        $('#email_bak').val(email_fd);
	// 		} else {
	// 	        $("#check_email_layer").removeClass().addClass('errorMsg').text('이미 사용중인 이메일입니다.');
	// 		}
	// 	}
	// });
}

//우편번호찾기
function searchAddressPopup(){
	var url = "/my/info/juso.popup?obj=postNo_1&obj=address1&obj=address2";
	Popup.openWindow({
		url: url,
		callback: function($div) {
			
		}
	});
}

// 학교 검색 레이어 팝업
function popSchoolFindLayer() {
	if($("#schoolFindPop").css("display") == "none") {
		$("#schoolFindPop").css("display", "block");
		$("#sch_name_input_01").focus();
	} else {
		$("#schoolFindPop").css("display", "none");
		$("#sch_name_searchedv").focus();
	}
}

//재직 학교 검색 레이어 - 학교 검색 목록
//학교 검색 팝업
function layerSchoolSearch(){
	Layer.openLayerSchoolSearch(function(data) {
		$('#myGradeArea').show();
		if (data.tab == 'E' || data.tab == 'ES') {
			$('#mySubjectArea').hide();
		} else {
			Ajax.execute({
				url: '/my/info/subject/list.json',
				data: {
					tab: data.tab
				},
				type: 'get',
				dataType: 'json',
				success: function(data) {
					$('#mySubjectArea').show();
					$('select[name=mainSubjectv] option.data').remove();
					$('select[name=secondSubjectv] option.data').remove();
					$('#addsubjectv').hide();
					var subjectList = data.response;
					console.log(subjectList)
					for (var i = 0; i < subjectList.length; i++) {
						var subject = subjectList[i];
						$('select[name=mainSubjectv]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
						$('select[name=secondSubjectv]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
					}
				}
			});				
		}
	});
}

//학교 값 선택 시
function choiceSchool(obj){
	var parents = $(obj).parents("li");
	var arrayId = $(parents).attr("id").split("|");
	
	$('#sch_code_searchedv').val(arrayId[0]);
	$('#fkareacode').val(arrayId[1]);
	$('#fkbranchcode').val(arrayId[2]);
	$("#sch_kind_sel_1").val(arrayId[3]);
	$('#sch_name_searchedv').val(arrayId[4]);
	$('#schoolFindPop').remove();
	$("input[name=myGrade]").prop("checked",false);
    $("#sch_kind_directley").val("0");
	
	//초등학교 및 중.고등학교 구분
    if(arrayId[3] == 'E'){
        $("#schFlagHiddenId").show();
        $("#mySubjectArea").hide();
        $("#mainSubjectv").val('');
        $("#secondSubjectv").val('');
		$("#addsubjectv").css("display","none");
    }else{
        $("#schFlagHiddenId").hide();
        $("#mySubjectArea").show();
    }
}

//구/군 조회
function schoolSearchArea() {
	var fkCode = $('#schoolSearchArea1Cd').val();
	Ajax.execute({
		data: {
			'fkCode': fkCode
		},
		url: "/my/info/search/area.json",
		success: function(response) {
			var addHtml ="<option value=''>선택해주세요</option>";
			$('#schoolSearchArea2Cd').empty();
			if (response.response != null) { 
				for (var i = 0; i < response.response.length ; i++){
					addHtml += "<option value = '"+response.response[i].pkcode+"'>" +
											response.response[i].codename+"</option>";
				}
			}
			$('#schoolSearchArea2Cd').append(addHtml);
		}
	});
}

// 내 교과 추가 버튼 이벤트
function viewaddsubjtect() {
	$("#addsubjectv").css("display","");
}

/**
 * 회원 가입 검증
 */
function userin() {

	if(birthStateDesc != 'Y') return;
	
    /* 본인인증 정보 (성명, 생년월일, 성별) */
    if(DataCheck_One($('#sName').val()) || DataCheck_One($('#sBirthDate').val()) || DataCheck_One($('#sex').val())) {
        //alert("본인 인증 정보가 누락되었습니다. 처음부터 다시 진행해주세요.");
        //return;
    }

    /* 아이디 */
	if($('#newId').val() == null || $('#newId').val() == '') {
		if ($("#id_bak").val() != $("#id_fd").val()) {
			alert("아이디 중복확인을 해주세요.");
			$("#id_fd").focus();
			return;
		} else {
			var newId = $("#id_fd").val();
			$('#newId').val(newId);
		}
	}
    if(DataCheck_One($('#newId').val())) {
        alert("아이디는 필수입력항목입니다.");
        $("#id_fd").focus();
		return;
    }

    /* 비밀번호 */
	if(  (snsJoin != null && snsJoin != '') && usePassword != 'V') {
		if(snsMemberId != null &&  snsMemberId != '') {
			$('displayPwd').hide();
			$('displayPwdConfirm').hide();
		}
	}else {
		if (!passwordValidCheck()) {
			return;
		}
	}



    /* 이메일 */
	var _email1         = $("#email1").val();																		//	이메일1
	var _email2         = $("#email2").val();																		//	이메일2
	var email          = _email1 + "@" + _email2;																		//	이메일
	var reg_email = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;

	if( _email1 == "" || _email1 == null ){
		alert("이메일 주소는 필수 입력 항목입니다.");
		$("#email1").val("");
		$("#email1").focus();
		return;
	}
	if( _email2 == "" || _email2 == null ){
		alert("이메일 주소는 필수 입력 항목입니다.");
		$("#email2").val("");
		$("#email2").focus();
		return;
	}
	if(!reg_email.test(email)) {
		alert("정확한 이메일 주소를 입력해 주세요.");
		$("#email1").focus();
		return;
	}
	// if($("#email_bak").val() != email) {
	// 	alert("이메일 중복확인을 해주세요.");
	// 	$("#email1").focus();
	// 	return;
	// }

	$('#email').val($.trim(email));

    if(DataCheck_One($('#email').val())){
        alert("이메일은 필수 입력 항목입니다.");
        // $("#emailip").focus();
        $("#email1").focus();
        return;
    }

    /* 휴대전화번호 */
    var _cellphone1 = $("#cellphone1").val();
    var _cellphone2 = $("#cellphone2").val();
    var _cellphone3 = $("#cellphone3").val();
    console.log(_cellphone1, _cellphone2, _cellphone3);
    if(_cellphone1 == "" || _cellphone1.length != 3) {
        alert("휴대전화번호는 필수 입력 항목입니다.");
        $("#cellphone1").focus();
        return;
    }
    if(_cellphone2 == "" || (_cellphone2.length != 3 && _cellphone2.length != 4)) {
        alert("휴대전화번호는 필수 입력 항목입니다.");
        $("#cellphone2").focus();
        return;
    }
    if(_cellphone3 == "" || _cellphone3.length != 4) {
        alert("휴대전화번호는 필수 입력 항목입니다.");
        $("#cellphone3").focus();
        return;
    }

    if($("#cellPhoneChk").val() == "N") {
		alert("휴대전화번호 인증을 해주세요.");
		return false;
	}

    $('#cellphone').val(_cellphone1 + "-" + _cellphone2 + "-" + _cellphone3);

    if (phonecheck( $('#cellphone').val()) == false) {
        alert("휴대전화번호가 형식에 일치하지 않습니다.");
        return;
    }

	/* 생년월일 */
	// 생년월일 20세 이상 65세 이하로 가입 제한 변경 2022-01-18 김인수
	var bday = $('#sBirthDate').val();
	var birthYear = bday.substr(0, 4);
	var d = new Date();
	var nowyyyy = d.getFullYear();
	pyyyy = nowyyyy - birthYear;
	//if(pyyyy < 20 || pyyyy > 65) {
	if(pyyyy < 20) {
		var minyyyy = nowyyyy - 20;
		var maxyyyy = nowyyyy - 65;
		//alert(maxyyyy + "~" + minyyyy + "년 출생자만 가입 가능합니다.(19세 이상 65세 이하)");
		alert(minyyyy + "년 이 후 출생자만 가입 가능합니다.(20세 이상)");
		return;
	}


    /* 재직학교 */
	$('#schoolName').val( $("#sch_name_searchedv").val() );
	$('#schoolCode').val( $("#sch_code_searchedv").val() );
	
	$('#locDept1').val( $("#fkareacode").val() );
	$('#locDept2').val( $("#fkbranchcode").val() );
	if(memberTypeCode != '3') {
		if (DataCheck_One($('#schoolName').val())) {
			alert("소속은 필수 입력 항목입니다.");
			$("#sch_name_searchedv").focus();
			return;
		}
	}

	if(memberTypeCode == '0' || memberTypeCode == '2' ) {

			/* 담당학년 */
			var $_myGrades = $("input:checkbox[name=_myGrade]:checked");
			if ($_myGrades.length > 0) {
				var myGrade = "";
				$_myGrades.each(function (i) {
					myGrade += $(this).val();
					if ($_myGrades.length > (i + 1)) {
						myGrade += ",";
					}
				});

				$('#myGrade').val(myGrade);
			} else {
				if((schoolGrade == 'E' || schoolGrade == 'ES' || schoolGrade == 'M' || schoolGrade == 'H') && memberTypeCode == '0' ) {
					alert("담당학년은 필수 선택 항목입니다.");
					$("input#myGrade1").focus();
					return;
				}
			}


		if ($("input[name='certified']:checked").val() == undefined && certifiedYn == 'N') {
			if(memberTypeCode == '0') {
				alert("교사인증 방법을 선택 해 주세요");
			}else {
				alert("학생인증 방법을 선택 해 주세요");
			}

			return;
		}

		if ($('#memberTypeCode').val() == '0' && $("input[name='certified']:checked").val() == 'EPKI' && $('#validYn').val() != 'Y'   ) {
			alert("EPKI/GPKI 인증을 진행해 주세요");
			return;

		}
		if ($('#memberTypeCode').val() == '0' && $("input[name='certified']:checked").val() == 'mail' && $('#certMailValidYn').val() != 'Y') {
			alert("공직자 메일 인증을 진행해 주세요");
			return;
		}

		if ( $("input[name='certified']:checked").val() == 'doc') {
			documentUpload();
			return;
		}
	}
	/* 내 교과 (초등학교가 아닌 경우) -- 입력 제외 */
	// var sch_kind = $("#sch_kind_sel_1").val();
	// if(sch_kind == "M" || sch_kind == "H") {
	// 	$('#mainSubject').val( $("#mainSubjectv").val() );
	// 	$('#secondSubject').val( $("#secondSubjectv").val() );
	// 	if(DataCheck_One($('#mainSubject').val())) {
	// 		alert("내 교과 설정(대표)은 필수 입력 항목입니다.");
	// 		$("#mainSubjectv").focus();
	// 		return;
	// 	}
	// }

    /* 비상교과서 채택여부 */
	// $('#visangTbYn').val( $.trim($('input:radio[name="_visangTbYn"]:checked').val()) );
	// if(DataCheck_One($('#visangTbYn').val())) {
	// 	alert("비상교과서 채택여부는 필수 입력 항목입니다.");
	// 	$($('input[name="_visangTbYn"]').get(0)).focus();
	// 	return;
	// }

    /* 개인정보 유효기간 설정 */
	/*var _expTerm = $("input:radio[name=rdoExpiryTermNum]:checked").val();
	if(typeof _expTerm == 'undefined') {
		alert("개인정보 유효기간 설정은 필수 선택 항목입니다.");
		$($("input[name=rdoExpiryTermNum]").get(0)).focus();
		return;
	} else {
		$('#expiryTermNum').val( $("input:radio[name=rdoExpiryTermNum]:checked").val() );
	}*/


	// 스승의날 선물대잔치 이벤트 임시 코드
	var reco = $('#reco').val();
	$('#err-msg-reco').hide();
	if (reco) {
		Ajax.execute({
			data: {reco: reco.trim()},
			url: "/member/checkReco.json",
			success: function (data) {
				if (data.response.code === '0') {
					saveJoinInfo();
				} else {
					$('#reco').focus();
					$('#err-msg-reco').show();
				}
			},
			error: function (re) {
				alert('추천 코드 확인중 오류가 발생했습니다.\n관리자에게 문의하세요.');
			}
		});
	} else {
		// 추천인 코드 입력하지 않았을 경우는 바로 회원가입 처리
		saveJoinInfo();
	}
}

function checkEmpty(checkVal) {
	if(checkVal == nulL) return true;
	if(checkVal == undefined) return true;
	if(checkVal == '') return true;

	return false;
}
function documentUpload() {

	if ($("#uploadfile1").val() == "") {
		alert("인증서류 파일을 등록해 주세요.");
		reg_btn_click = false;
		$("#uploadfile1").focus();
		return;
	} else {
		if (reg_btn_click == false) {
			//if (confirm("서류인증에는 3~4일정도 소요될 수 있습니다.")) {
			if (confirm("서류인증에는 1~2일정도 소요될 수 있습니다.(주말,공휴일 제외)")) {
				$('#gnb-depth-dimmed').show();
				Ajax.loadingStart();
				$("#verifyFrm").submit();
			}
		}
	}
	/*[- 입력글자 제한 -]*/
	$('#comment').on('keyup', function (e) {
		var $el = $(e.target);
		var comment = $el.val();
		if (comment.length >= 300) {
			comment = comment.substr(0, 300);
			$('#comment').val(comment);
		}
		$('#commentTextCnt').html(comment.length);
	});
}


/* 휴대전화번호 형식 확인 */
function phonecheck(fld) {
    var pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
	// var pattern = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
    // 전화번호(휴대전화번호) 올바르면 TRUE, 틀리면 FALSE

    if(!pattern.test(fld)) {
      return;
    } else {
		return true;
    }
}

function DataCheck_One(val) {
    if( val == "" || val == null ){
        return true;
    }
}

var nowLoading = {
	state : false
};

var serverError = {
	state : false
}
//저장
function saveJoinInfo(){
	if(nowLoading.state){
		alert("처리중입니다. 잠시만 기다려주세요");
		return false;
	}
	if(serverError.state) {
		alert("서비스가 원할하지 않습니다.\n잠시후 다시 시도해 주세요\n문제가 지속될 경우 고객센터(1544-7714)로 문의 바랍니다.")
		return false;
	}

	nowLoading.state = true;

	Ajax.execute({
		data: $('#joinFrm').serialize(),
		url: "/member/join/saveJoinInfo.json",
		success: function(response) {
			nowLoading.state = false;
			//$("#joinFrm").attr("action", "/member/complete").submit();
			// var popupX = (window.screen.width / 2) - (600 / 2);
			// var popupY= (window.screen.height / 2) - (600 / 2);
			// var objPop = window.open('/member/join/complete','POP','left='+popupX+', top='+popupY+', scrollbars=no,toolbar=no,resizable=no,width=600,height=600');
			Layer.openLayer({url : '/member/join/complete'});
		},
		error: function (re){

		},
		complete: function(response) {
			nowLoading.state = false;
			if(re != "E") {
				serverError.state = true;
			}


		}
	});
}

// 비밀번호 유효성 검증
function passwordValidCheck() {
	var _pass = $('#pwdin').val();
	if(_pass != null && _pass != '') {
		var chk = 0;
		if(_pass.search(/[0-9]/g) != -1 ) chk ++;
		if(_pass.search(/[a-zA-Z]/ig)  != -1 ) chk ++;
		if(_pass.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;

		if (_pass.length < 8) {
			alert("비밀번호는 8자리 이상으로 입력해주세요.");
			$('#pwdin').focus();
			return false;
		} else if(chk < 2) {
			alert("비밀번호는 숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다.");
			$('#pwdin').focus();
			return false;

		} else if(pattern1.test(_pass) && pattern2.test(_pass) && pattern3.test(_pass) && _pass.length < 8) {
			alert("비밀번호는 영문+숫자+특수문자인 경우 8자리 이상으로 입력해 주세요.");
			$('#pwdin').focus();
			return false;
		} else if(pattern1.test(_pass) && pattern2.test(_pass) && !pattern3.test(_pass) && _pass.length < 10) {
			alert("비밀번호는 영문+숫자인 경우 10자리 이상으로 입력해 주세요.");
			$('#pwdin').focus();
			return false;
		} else if (_pass.indexOf($("#id_fd").val()) > -1 && $("#id_fd").val() != "") {
			alert("비밀번호는 아이디를 포함할 수 없습니다.");
			$('#pwdin').focus();
			return false;
		}
	}
	if (_pass ==  $("#password_confirm").val()) {
		$('#password').val(_pass);
	} else {
		alert("비밀번호가 다르게 입력되었습니다.");
		$("#password_confirm").focus();
		return false;
	}

	if(DataCheck_One($('#password').val())){
		alert("비밀번호는 필수 입력 항목입니다.");
		$("#pwdin").focus();
		return false;
	}

	return true;
}


//가입전 EPK인증 ID 없음 ( 결과값 return 받음 )
function openJoinEpkPop() {
	if( $('#memberTypeCode').val() != '0') {
		alert("선택 하실 수 없습니다.");
	}
	var popupX = (window.screen.width / 2) - (600 / 2);
	var popupY= (window.screen.height / 2) - (600 / 2);
	var objPop = window.open('/member/intergratedJoinEPK?key='+encodeURIComponent(key),'POP','left='+popupX+', top='+popupY+', scrollbars=no,toolbar=no,resizable=no,width=600,height=600');
}
//EPK 인증 후 인증값 등록
function setEpkCertValue(obj) {
	if (obj.data.VALID_YN == "Y") {
		$('#epkiCertDn').val(obj.data.EPKI_CERTDN);
		$('#epkiCertSn').val(obj.data.EPKI_CERTSN);
		$('#validYn').val(obj.data.VALID_YN);
	}

	console.log($('#validYn').val());
}
function returnJoinEpkPop(returnObj) {
	console.log(returnObj);

}

// 교사 인증
function changeCertified() {
	$("#certified").val($('input[name="certified"]:checked').val());
	console.log($("#certified").val());
	if( $('input[name="certified"]:checked').val() == 'mail' ) {
		$('#addCertified03').hide().siblings('#addCertified02').show();
	} else if( $('input[name="certified"]:checked').val() == 'doc' ) {
		$('#addCertified02').hide().siblings('#addCertified03').show();
		if(memberTypeCode == '0') {
			console.log($('#teacher_info'));
			$('#teacher_info').show();
			$('#student_info').hide();
		}else {
			console.log($('#teacher_info'));
			console.log($('#student_info'), $('#student_info').show());
			$('#student_info').show();
			$('#teacher_info').hide();
		}
	} else {
		$('#addCertified02, #addCertified03').hide();
	}
}

// 통합회원 전환하기 버튼 클릭 시 동작
function convertSsoProcBtn() {
	/* 비밀번호 */
	if (!passwordValidCheck()) {
		return;
	}

	if(nowLoading.state){
		alert("처리중입니다. 잠시만 기다려주세요");
		return false;
	}

	nowLoading.state = true;

	Ajax.execute({
		data: $('#joinFrm').serialize(),
		url: "/member/sso/convertSsoProc.json",
		success: function(response) {
			alert('통합회원 전환이 완료되었습니다. 이제 비바샘과 비바샘 연수원 서비스를 하나의 아이디로 이용하실 수 있습니다.');
			if ($.cookie('gate') == 'V') {
				location.href = "https://" + window.globals.config.siteDomainMiddleHigh;
			} else {
				location.href = "https://" + window.globals.config.siteDomain + "/main";
			}
		},
		error: function (re){
			nowLoading.state = false;
		}
	});
}

isSendCertMail = false;
//공직자 메일 인증 번호 확인
function checkCertMail() {
	if(isSendCertMail) {
		if($("#inputCertMailKey").val() == "") {
			alert("인증코드를 입력해 주세요");
			return false;
		}else {
			var email = $.trim($("#certMail").val()) + "@" + $("#certMailDomain").val();
			var inputCertMailKey = $("#inputCertMailKey").val();
			Ajax.execute({
				url: '/member/join/checkCertificationMail.json',
				data: JSON.stringify({
					certMailAddr: email,
					certMailKey:inputCertMailKey
				}),
				contentType: 'application/json',
				method: 'post',
				dataType: 'json',
				success: function(result) {
					console.log(result);
					sneCertMail = true;
					if(result == null || result.message != "인증완료") {
						alert(result.message);
					} else {
						$("#certMailKey").val( $("#inputCertMailKey").val());
						$("#certMailAddr").val($.trim($("#certMail").val()) + "@" + $("#certMailDomain").val());
						$("#certMailValidYn").val("Y");
						$("#certMailMsg").text("인증완료")
					}
				},
				error : function(request, status, error) {
					console.log(request, status, error);
				}
			});
		}
	}else {
		alert("인증코드 발송을 클릭해 주세요");
	}

}
//공직자 메일 발송
function sendCertMail() {
	if($("#certMail").val() == "") {
		alert("메일 주소를 입력해 주세요");
		return false;
	}
	if($("#certMail").val() == "") {
		alert("메일 주소를 입력해 주세요");
		return false;
	}
	if($("#certMailDomain").val() == "" || $("#certMailDomain").val()  == "w" ) {
		alert("메일 주소를 선택해 주세요");
		return false;
	}
	if(isSendCertMail) {
		alert("메일이 이미 발송되었습니다.");
		return false;
	}
	//certMailKey
	var name = $("#sName").val();
	var email = $.trim($("#certMail").val()) + "@" + $("#certMailDomain").val();
	Ajax.execute({
		url: '/member/join/sendCertificationMail.json',
		data: JSON.stringify({
			sName: name,
			certMailAddr: email
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			console.log(result);
			if(result == null || result.code != "SUCCESS") {
				alert(result.message);
			} else {
				isSendCertMail = true;
				$("#certMailDomain").attr("disabled","disabled");
				$("#certMail").attr("readonly", true);
				$("#certMailMsg").text("인증코드를 입력해 주세요")
				alert(result.message); // 성공 시 안내 알럿
				console.log(result.message);
			}
		},
		error : function(a, b, c) {
			console.log(a, b, c);
		}
	});

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

var schoolGrade = "";
//재직학교명 조회
function setSchoolFunc(){
	console.log("!!");
	Layer.openLayerSchoolSearch(function(data) {
		data.tab = data.tab.substr(0, 1);
		schoolGrade = data.tab;
		if((data.tab == 'E' || data.tab == 'ES' || data.tab == 'M' || data.tab == 'H') && memberTypeCode == '0') {
			$('#myGradeArea').show();
		}else {
			console.log("---else");
			$('#myGradeArea').val("");
			$('#myGradeArea').hide();
		}

		// if (data.tab == 'E' || data.tab == 'ES') {
		// 	$('#mySubjectArea').hide();
		// } else {
		// 	Ajax.execute({
		// 		url: '/my/info/subject/list.json',
		// 		data: {
		// 			tab: data.tab
		// 		},
		// 		type: 'get',
		// 		dataType: 'json',
		// 		success: function(data) {
		// 			$('#mySubjectArea').show();
		// 			$('select[name=mainSubject] option.data').remove();
		// 			$('select[name=secondSubject] option.data').remove();
		// 			//학교 변경시 hidden 학교 정보 설정
		// 			$('#schName').val( $("#sch_name_searchedv").val());
		// 			$('#schCode').val( $("#sch_code_searchedv").val());
		// 			$('#li-subject-second').hide();
		// 			var subjectList = data.response;
		// 			for (var i = 0; i < subjectList.length; i++) {
		// 				var subject = subjectList[i];
		// 				$('select[name=mainSubjectv]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
		// 				$('select[name=secondSubjectv]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
		// 			}
		// 		}
		// 	});
		// }
	});
}

