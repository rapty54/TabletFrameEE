$(function(){
	/* 재직학교 */
	$('#schName').val( $("#sch_name_searchedv").val() );
	$('#schCode').val( $("#sch_code_searchedv").val() );

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

	// 교사인증 파일 첨부 영역
	// [DEV] 기존 교사인증 파일첨부 영역 가져옴 - EPKIFileUpload.html
	var FileUploadCreate = {
		cnt : 1,
		createFileInput : function (){
			var html = "";
			html = '<input type="text" id="uploadfileText' + this.cnt + '" readOnly class="fileName" placeholder="파일을 첨부해 주세요!">';
			html += '<label for="uploadfile' + this.cnt + '" class="file_btn">파일 첨부</label>';
			html += "<input type=\"file\" name=\"uploadfile\" id=\"uploadfile" + this.cnt + "\" class=\"uploadBtn\" onChange=\"validCheckAndSetFileVal("+this.cnt+")\" accept=\".jpg, .gif, .png, .pdf\">";

			this.cnt += 1;
			return html;
		}
	}

	$('#fileUploadDiv').append(FileUploadCreate.createFileInput());
	$("#btnAdd").click(function(e) {
		if(FileUploadCreate.cnt <= 3){
			$('#fileUploadDiv').append(FileUploadCreate.createFileInput());
		}else{
			alert("파일은 최대 3개까지만 등록됩니다.");
		}
	});

	$(document).on('click',"input[id^='uploadfileText']", function(e){
		e.preventDefault();
		$(this).next().next().click();
	});
});

//첨부파일 체크
function validCheckAndSetFileVal(cnt) {
	var nowItem = $("#uploadfile"+cnt);
	var fileLimitFormat = /(.*?)\.(jpg|png|gif|pdf)$/;
	if (!nowItem.val().match(fileLimitFormat)) {
		alert('파일 첨부는 jpg, gif, png, pdf 파일만 가능합니다.');
		$('#uploadfileText' + cnt).val('');
		$('#uploadfile' + cnt).val('');
		return;
	}
	$('#uploadfileText' + cnt).val(nowItem.val());
}

//재직학교명 조회
function setSchoolFunc(){
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
					$('select[name=mainSubject] option.data').remove();
					$('select[name=secondSubject] option.data').remove();
					//학교 변경시 hidden 학교 정보 설정
					$('#schName').val( $("#sch_name_searchedv").val());
					$('#schCode').val( $("#sch_code_searchedv").val());
					$('#li-subject-second').hide();
					var subjectList = data.response;
					for (var i = 0; i < subjectList.length; i++) {
						var subject = subjectList[i];
						$('select[name=mainSubject]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
						$('select[name=secondSubject]').append($('<option class="data" value="' + subject.code + '">' + subject.name + '</option>'));
					}
				}
			});
		}
	});
}

//내 교과 추가 버튼 이벤트
function viewaddsubjtect() {
	$("#addsubjectv").css("display","");
}

//비밀번호 정규식
var pattern1 = /[0-9]/;
var pattern2 = /[a-zA-Z]/;
var pattern3 = /[!@#$%^&*()?_~]/;     // 원하는 특수문자 추가 제거

// 비밀번호
function checkpassword2() {
	var pass =  $("#password").val();

	var chk = 0;
	if(pass.search(/[0-9]/g) != -1 ) chk ++;
	if(pass.search(/[a-zA-Z]/ig)  != -1 ) chk ++;
	if(pass.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;

	if(pass.length < 8 ) {
		    $("#check_pwd1_layer").removeClass().addClass('errorMsg').text('최소 8자리 이상으로 입력해주세요.');
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
	var pass =  $("#password").val();
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
	//이메일 중복 확인
	Ajax.execute({
		url: '/member/join/getCheckExistPerson.json',
		data: JSON.stringify({
			name : $('input[name="check_name"]').val(),
			email : email_fd
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			if (result.response == true) {
		        $("#check_email_layer").removeClass().addClass('okMsg').text('사용 가능한 이메일입니다.');
		        $('#email').val(email_fd);
			} else {
		        $("#check_email_layer").removeClass().addClass('errorMsg').text('이미 사용중인 이메일입니다.');
			}
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
			name : $('input[name="check_name"]').val(),
			email : email_fd
		}),
		contentType: 'application/json',
		method: 'post',
		dataType: 'json',
		success: function(result) {
			if (result.response == true) {
		        $("#check_email_layer").removeClass().addClass('okMsg').text('사용 가능한 이메일입니다.');
		        $('#email').val(email_fd);
			} else {
		        $("#check_email_layer").removeClass().addClass('errorMsg').text('이미 사용중인 이메일입니다.');
			}
		}
	});
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
		$('#email2').attr("disabled", true);
	}
	else {
		$('#email2').attr("disabled", false);
		$('#email2').val('');
		$('#email2').focus();
	}
}
/**
 * 회원 가입 검증
 */
function userin() {

    /* 비밀번호 */
    var _pass = $('#password').val();
    if(_pass != null && _pass != '') {
        var chk = 0;
        if(_pass.search(/[0-9]/g) != -1 ) chk ++;
        if(_pass.search(/[a-zA-Z]/ig)  != -1 ) chk ++;
        if(_pass.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;

        if (_pass.length < 8) {
            alert("비밀번호는 8자리 이상으로 입력해주세요.");
            $('#password').focus();
            return;
        } else if(chk < 2) {
            alert("비밀번호는 숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다.");
            $('#password').focus();
            return;

        } else if(pattern1.test(_pass) && pattern2.test(_pass) && pattern3.test(_pass) && _pass.length < 8) {
            alert("비밀번호는 영문+숫자+특수문자인 경우 8자리 이상으로 입력해 주세요.");
            $('#password').focus();
            return;
        } else if(pattern1.test(_pass) && pattern2.test(_pass) && !pattern3.test(_pass) && _pass.length < 10) {
            alert("비밀번호는 영문+숫자인 경우 10자리 이상으로 입력해 주세요.");
            $('#password').focus();
            return;
        } else if (_pass.indexOf($("#id_fd").val()) > -1 && $("#id_fd").val() != "") {
            alert("비밀번호는 아이디를 포함할 수 없습니다.");
            $('#password').focus();
            return;
        }
    }
    if (_pass ==  $("#password_confirm").val()) {
        $('#password').val(_pass);
    } else {
        alert("비밀번호가 다르게 입력되었습니다.");
        $("#password_confirm").focus();
        return;
    }

    if(DataCheck_One($('#password').val())){
        alert("비밀번호는 필수 입력 항목입니다.");
        $("#password").focus();
        return;
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
	if($("#email").val() != email) {
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

    /* 주소 */
	var postNo_1 = $("#postNo_1").val();							//  우편번호 : zip
	var address1 = $.trim($("#address1").val());				//	주소1 : address1
	var address2 = $("#address2").val();						//	주소2 : address2
	if( postNo_1 == "" || postNo_1 == null ) {
		alert("우편번호는 필수 입력 항목입니다.");
		$("#postNo_1").val("");
		$("#postNo_1").focus();
		return;
	}
	if( address1 == "" || address1 == null ) {
		alert("주소는 필수 입력 항목입니다.");
		$("#address1").val("");
		$("#address1").focus();
		return;
	}
	if( address2 == "" || address2 == null ) {
		alert("주소는 필수 입력 항목입니다.");
		$("#address2").val("");
		$("#address2").focus();
		return;
	}

	$("#addr1").val($("#address1").val());
	$("#addr2").val($("#address2").val());
	$("#zip").val($("#postNo_1").val());

	if(DataCheck_One($('#schName').val())) {
		alert("재직학교명은 필수 입력 항목입니다.");
		$("#schName").focus();
		return;
	}

    /* 담당학년 */
	var $_myGrades = $("input:checkbox[name=_myGrade]:checked");
	if($_myGrades.length > 0) {
		var myGrade = "";
		$_myGrades.each(function(i){
			myGrade += $(this).val();
			if($_myGrades.length > (i+1)) {
				myGrade += ",";
			}
		});

		$('#myGrade').val(myGrade);
	} else {
		alert("담당학년은 필수 선택 항목입니다.");
		$("input#myGrade1").focus();
		return;
	}

    // 학교 검색
    if($("#schKindDirectley").val() == "0"){
    	saveJoinInfo();
    } else {
        //학교 직접 등록신청
    	var sch_kind_sel_2 = $(':radio[name="sch_kind_sel_2"]:checked').val();
		var directly_school = $("#directly_school").val();
		var school_area1 = $("#schoolArea1Cd option:selected").val();
		var school_area2 = $("#schoolArea2Cd option:selected").val();
		var school_area1_text = $("#schoolArea1Cd option:selected").text();
		var school_area2_text = $("#schoolArea2Cd option:selected").text();
		var directly_agree = $("input:checkbox[id='directly_agree']").is(":checked") == true ? "Y" : "N";
		var requestedTerm  = $("#requestedTerm").val();
		var kind_name ="";
		if(sch_kind_sel_2 == "ES") {
		    kind_name = "초등";
		} else if(sch_kind_sel_2 == "MS") {
		 kind_name = "중학";
		} else {
		 kind_name = "고등";
		}
		if(school_area2 == "") {
		 school_area2_text = "";
		}else{
		 school_area2_text = ' > '+ school_area2_text;
		}
		if(requestedTerm == "별도 요청사항이 있으신 경우, 의견을 남겨 주세요."){
		    requestedTerm = "";
		}else{
		    requestedTerm = '- 별도 요청사항  : '+requestedTerm+'<br/>';
		}
		var qnaCd = 'QA011';
		var qnaTitle = directly_school+'_학교등록신청';
		var qnaContents = '학교등록 신청</br></br>'+'- 학교급  : '+kind_name+'<br/>'+'- 학교명  : '+directly_school+'<br/>'+'- 학교지역  : '+school_area1_text+school_area2_text+'<br/>'+requestedTerm+ '- 학교변경 동의여부  : '+directly_agree+'<br/>';

		$('#qnaSchLvlCd').val(sch_kind_sel_2);
		$('#qnaTitle').val(qnaTitle);
		$('#qnaContents').val(qnaContents);

		//임시추가
		if($('input[name=agree2]').val() == "on"){
			$('input[name=agree2]').val("Y");
		}

		if($('input[name=agree5]').val() == "on"){
			$('input[name=agree5]').val("Y");
		}


		saveJoinInfo();
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
		data: $('#ssoFrm').serialize(),
		url: "/member/sso/saveSsoInfo.json",
		success: function(response) {
			$("#ssoFrm").attr("action", "/member/sso/complete").submit();
		},
		error: function (re){

		},
		complete: function(response) {
			nowLoading.state = false;
		}
	});
}
// 우편번호 검색 후 콜백정보
function callbackJuso(data) {
	$('#postNo_1').val(data.zip);
	$('#address1').val(data.addr);
}

// 교사 인증
function changeCertified() {
	if( $('input[name="certified"]:checked').val() == '공직자메일' ) {
		$('#addCertified03').hide().siblings('#addCertified02').show();
	} else if( $('input[name="certified"]:checked').val() == '서류' ) {
		$('#addCertified02').hide().siblings('#addCertified03').show();
	} else {
		$('#addCertified02, #addCertified03').hide();
	}
}