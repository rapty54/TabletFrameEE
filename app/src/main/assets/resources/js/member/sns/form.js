$(function() {

	// 이메일 뒷부분 셀렉박스 변경시
	$("#emailSN").change(function() {
		if ( $(this).val() == 'w' ) {
			$("#email2").removeAttr("readonly");
			$("#email2").val("");
			$("#email2").focus();
		} else {
			$("#email2").attr("readonly",true);
			$("#email2").val( $(this).val() );
		}
	});

	// 우편번호 검색
	$('#searchAddress').on('click',function(){
		searchAddressPopup();
	});

	// 학교 검색
	$('#schoolSearch').on('click',function() {
		layerSchoolSearch();
	});

	// 전체 동의
	$('#AllTermsAgree').on('click', function () {
		var chceked = $(this).is(':checked');
		$('input[type=checkbox]').each(function () {
			if($(this).attr('id') != 'AllTermsAgree') {
				$(this).prop('checked', chceked);
			}
		});
	});

	// 전체 동의 제외
	$('input[type=checkbox]').on('click', function () {
		if($(this).attr('id') != 'AllTermsAgree') {
			$('#AllTermsAgree').prop('checked', false);
		}
	});

});

//통합 아이디 중복 확인
function checkId(){
	var reg_id = /^[a-z]+[a-z0-9]{3,12}$/g;
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
				console.log(result);
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

/**
 * 회원 가입 검증
 */
function userin() {

	/* 약관동의 */
	var agree2 = $("#TermAgree").is(':checked');
	var agree3 = $("#PrivacyAgree").is(':checked');
	var agree4 = $("#tschoolPromoAgree").is(':checked');
	if (agree2 && agree3) { }
	else {
		alert("회원가입을 위해 약관에 동의해 주세요.");
		return;
	}

	/* 아이디 */
	if(DataCheck_One($('#name').val())) {
		alert("성명은 필수입력항목입니다.");
		$("#name").focus();
		return ;
	}

	if(DataCheck_One($('#id_fd').val())) {
		alert("아이디는 필수입력항목입니다.");
		$("#id_fd").focus();
		return;
	}
	if($('#id_bak').val() == null || $('#id_bak').val() == '') {
		if ($("#id_bak").val() != $("#id_fd").val()) {
			alert("아이디 중복확인을 해주세요.");
			$("#id_fd").focus();
			return;
		}
	}

    /* 이메일 */
	var _email1 = $("#email1").val();//	이메일1
	var _email2 = $("#email2").val();//	이메일2
	var email = _email1 + "@" + _email2;//	이메일
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
	if($("#email_bak").val() != email) {
		alert("이메일 중복확인을 해주세요.");
		$("#email1").focus();
		return;
	}

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

    $('#cellphone').val(_cellphone1 + "-" + _cellphone2 + "-" + _cellphone3);

    if (phonecheck( $('#cellphone').val()) == false) {
        alert("휴대전화번호가 형식에 일치하지 않습니다.");
        return;
    }

	if ($("#cellPhoneChk").val() == "N") {
		alert("휴대전화번호 인증을 진행해주세요.");
		return;
	}

	// 생년월일
	if (DataCheck_One($("#birth").val())) {
		alert('생년월일을 입력해 주세요.');
		$("#birth").focus();
		return;
	}
	if ($("#birth").val().length != 8) {
		alert('생년월일 8자리를 입력해주세요.');
		$("#birth").focus();
		return;
	}

	var _birth = $("#birth").val();
	var birthday = new Date(_birth.substr(0,4) + "/" + _birth.substr(4, 2) + "/" + _birth.substr(6, 2));
	var today = new Date();
	var years = today.getFullYear() - birthday.getFullYear();
	//if (years < 20 || years > 65) {
	if (years < 20) {
		//alert("비바샘은 20세~65세까지 가입이 가능합니다.");
		alert("비바샘은 20세이상만 가입이 가능합니다.");
		$("#birth").focus();
		return ;
	}

    /* 재직학교 */
	$('#schoolName').val( $("#sch_name_searchedv").val() );
	$('#schoolCode').val( $("#sch_code_searchedv").val() );

	$('#locDept1').val( $("#fkareacode").val() );
	$('#locDept2').val( $("#fkbranchcode").val() );

	if(DataCheck_One($('#schoolName').val())) {
		alert("재직학교명은 필수 입력 항목입니다.");
		$("#sch_name_searchedv").focus();
		return;
	}

    /* 개인정보 유효기간 설정 */
	/*var _expTerm = $("input:radio[name=rdoExpiryTermNum]:checked").val();
	if(typeof _expTerm == 'undefined') {
		alert("개인정보 유효기간 설정은 필수 선택 항목입니다.");
		$($("input[name=rdoExpiryTermNum]").get(0)).focus();
		return;
	} else {
		$('#expiryTermNum').val( $("input:radio[name=rdoExpiryTermNum]:checked").val() );
	}*/

	//임시추가
	if($('input[name=agree2]').val() == "on"){
		$('input[name=agree2]').val("Y");
	}

	if($('input[name=agree5]').val() == "on"){
		$('input[name=agree5]').val("Y");
	}


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

//저장
function saveJoinInfo(){

	if(nowLoading.state){
		alert("처리중입니다. 잠시만 기다려주세요");
		return false;
	}

	nowLoading.state = true;

	Ajax.execute({
		data: $('#joinFrm').serialize(),
		url: "/member/join/sns/saveJoinInfo.json",
		success: function(response) {
			if (response.code == 'SUCCESS') {
				$("#newId").val($("#id_bak").val());
				$("#joinFrm").attr("action", "/member/join/sns/complete").submit();
			}
			else if (response.code == 'cellChkFail') {
				alert('전화번호 인증에 실패하였습니다.');
			}
			else {
				alert('회원가입에 실패하였습니다. 다시시도해주세요.');
			}
			nowLoading.state = false;
		},
		error: function (re){
			nowLoading.state = false;
		}
	});
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
	//이메일 중복 확인
	Ajax.execute({
		url: '/member/join/getCheckExistPerson.json',
		data: JSON.stringify({
			email : email_fd
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			if (result.response == true) {
				$("#check_email_layer").removeClass().addClass('okMsg').text('사용 가능한 이메일입니다.');
				$('#email_bak').val(email_fd);
			} else {
				$("#check_email_layer").removeClass().addClass('errorMsg').text('이미 사용중인 이메일입니다.');
			}
		}
	});
}
