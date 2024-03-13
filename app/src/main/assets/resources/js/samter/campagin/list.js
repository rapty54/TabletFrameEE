$(function () {
    // 댓글 조회
    getReply();
    //팝업 이벤트 등록
    setApplyPopEvent();
    //학교 검색 팝업 이벤트 등록
    setSchoolSearchPop();
    // 입력양식 변경
    $('#lb_cellphone0, #lb_cellphone1, #lb_cellphone2').on('input', function () {
        phoneCheck()
    });
});


function checkPhoneNum(value){
    if (!value) return false;

    if (value === '' || value.length === 0) {
        return false;
    } else if (value.indexOf("01") !== 0) {
        return false;
    } else if (value.length !== 13) {
        return false;
    }

    return true;
};


// 휴대폰번호 체크
function phoneCheck(e){
    let tel = $('#lb_cellphone0').val()+'-'+ $('#lb_cellphone1').val()+'-'+ $('#lb_cellphone2').val();
    let text = '';
    let checkFlag = false;
    let clazz = 'c_r2 mt5';

    if (tel === '') {
        text = "";
    } else if (!checkPhoneNum(tel)) {
        text = "휴대폰 번호가 유효하지 않습니다.";

    } else {
        clazz = 'c_b2 mt5';
        text = "등록가능한 휴대폰 번호입니다.";
        checkFlag = true;
    }
    $('.useNum').removeClass('c_r2 mt5');
    $('.useNum').removeClass('c_b2 mt5');
    $('.useNum').addClass(clazz);
    $('#useNum').text(text);

    //1.usenum text
    //2.usenum class remove add
}




//팝업 이벤트 등록
function setApplyPopEvent() {
    //학교 정보 불러오기 , 직접입력
    // $('#schoolnName01').on('click', function(){
    // 	$('#schAddr01').attr('style','display:show;');
    // 	$('#schAddr02').attr('style','display:none;');
    // 	$('.btnZipCode').hide();
    // });
    // $('#schoolnName02').on('click', function(){
    // 	$('#schAddr01').attr('style','display:none;');
    // 	$('#schAddr02').attr('style','display:show;');
    // 	$('.btnZipCode').show();
    // });

    // 학교 변경 팝업 호출
    $('#School_Search').on('click', function () {
        //학교 검색레이어 노출
        Layer.openLayerSchoolSearchForEvent(function (data) {
            $("#schCode").val(data.code);
            $("#schNm").val(data.name); //sch_code
            $("#schZipCd").val(data.zip); //fkareacode
            $("#schAddress01").val(data.addr); //fkbranchcode
            $("#schAddress02").val(data.name);

        });
    });
    // 닫기
    $('.popup_close1').on('click', function () {
        $('#storyApply').hide();
    });
    //그룹 선택
    $('#groupName01').on('click', function () {
        $("#groupSel01").show();
        $("#groupSel02").hide();
    });
    $('#groupName02').on('click', function () {
        $("#groupSel01").hide();
        $("#groupSel02").show();
    });
    //신청사연
    $('#opinions').on('keyup', function () {
        if ($('#opinions').val().length > 500) {
            // alert("500자 이내로 입력해주세요.");
            $('#opinions').val($('#opinions').val().substring(0, 500));
        }
        $('#count1').text($('#opinions').val().length);
    });

    // 주소 찾기 팝업 리턴받을 callbackJuso(data) 함수가 전역공간에 설정 필요
    $('#btnSearchAddr').on('click', function () {
        Popup.openSamterJuso();
    });


}




// 주소 검색 callback
function callbackJuso(data) {
    callbackSearchAddr(data);
}

function callbackSearchAddr(data) {
    $('#schZipCd').val(data.zip);
    $('#schAddress01').val(data.addr);
}


function setSchoolSearchPop() {
    // 학교 검색
    $('.pop_close2').on('click', function () {
        $('#schoolFindPop').hide();
    });
}

//팝업 이벤트 START
//재직학교 주소
function schAddrChage() {
    var code = $('#n2schoolnName_val1').val();
    code = code.split("-")[1]; //코드만 가져오기

    Ajax.execute({
        url: '/school/area/list.json',
        data: {
            fkcode: code
        },
        success: function (data) {
            var list = data.response;
            $('#n2schoolnName_val2').empty();
            var addHtml = '<option value="">선택하세요</option>';
            $('#n2schoolnName_val2').append(addHtml);
            for (var i = 0; i < list.length; i++) {
                var query = list[i];
                var $li = $('<option value="' + query.codename + '">' + query.codename + '</option>');
                $('#n2schoolnName_val2').append($li);
            }
        }
    });
}

//이메일 자동완성 선택
function changeEmail(itemCode, itemText) {
    if (itemCode != '') {
        $('#lb_email2').val(itemText);
        $('#lb_email2').attr("readonly", true);
    } else {
        $('#lb_email2').val('');
        $('#lb_email2').attr("readonly", false);
    }
}

//팝업 이벤트 END


//참여전 체크
function prerequisite() {

    // 로그인 안됐을 경우 처리
    if (!window.globals.login) {
        location.href = "/member/login?goURL=" + location.pathname;
        alert('로그인이 필요한 서비스입니다.');
        return true;
    }

    // 교사 인증 체크
    if (teacherCertifiedYn !== 'Y') {
        if (!confirm('교사 인증을 해 주세요. 지금 인증을 진행하시겠습니까?')) {
            return false;
        }
        location.href = '/member/memberReCertify';
        return false;
    }

    // 준회원
    if (!mLevel || mLevel === 'AU400') {
        console.log(mLevel);
        alert("준회원은 이용이 불가능합니다.\n비바샘으로 문의해 주세요. (1544-7714)");
        return false;
    }
    return true;
}


//신청하기
function applyDoing() {
    console.log('신청버튼누름');
    if (!prerequisite()) {
        return;
    }


    Ajax.execute({
        data: {
            'campaignId': campaignId
        },
        url: '/samter/campaign/apply.json',
        success: function (data) {
            if (data.response == 'success') {
                $('#storyApply').show();
            }
        }
    });
}


// 사연 목록
function getReply(page) {
    console.log(campaignId);
    if (typeof page == 'undefined') {
        page = '';
    }
    page = page == '' ? '1' : page;
    Ajax.execute({
        data: {
            'page': page,
            'campaignId': campaignId
        },
        url: '/samter/campaign/reply.html',
        dataType: 'html',
        type: 'get',
        success: function (data) {
            $('.storyListWrap').empty();
            $('.storyListWrap').append(data);
        }
    });
}

// 생생후기 페이지 이동
function reviewPageMove() {
    location.href = "/samter/campaign/review/list";
}

// 저장전 유효성 체크
function validate() {
    var $schNm = $('#schNm');
    var $schZipCd = $('#schZipCd');
    var $schAddress01 = $('#schAddress01');
    var $schAddress02 = $('#schAddress02');

    var $lb_cellphone0 = $('#lb_cellphone0');
    var $lb_cellphone1 = $('#lb_cellphone1');
    var $lb_cellphone2 = $('#lb_cellphone2');

    var $lb_email = $('#lb_email');
    var $lb_email2 = $('#lb_email2');

    var $opinions = $('#opinions');
    var $lb_dream_03 = $('#lb_dream_03');  // 인원수

    // 학교 정보
    if (!$schNm.val()) {
        alert("재직 학교를 입력해 주세요.");
        $schNm.focus();
        return false;
    }

	if (!$schZipCd.val() || !$schAddress01.val()) {
		alert("학교주소를 입력해 주세요.");
		$schZipCd.focus();
		return false;
	}

	if (!$schAddress02.val()) {
		alert("학교주소를 입력해 주세요.");
		$schAddress02.focus();
		return false;
	}

    // 이메일
    if (!$lb_email.val() || !$lb_email2.val()) {
        alert("이메일을 입력해 주세요.");
        $lb_email.focus();
        return false;
    }

	if (!$lb_cellphone0.val() || $lb_cellphone0.val().length !== 3) {
		alert("휴대전화번호를 입력해 주세요.");
		$lb_cellphone0.focus();
		return false;
	}

    if (!$lb_cellphone1.val() || $lb_cellphone1.val().length <= 2) {
        alert("휴대전화번호를 입력해 주세요.");
        $lb_cellphone1.focus();
        return false;
    }

    if (!$lb_cellphone2.val() || $lb_cellphone2.val().length !== 4) {
        alert("휴대전화번호를 입력해 주세요.");
        $lb_cellphone2.focus();
        return false;
    }

    // 라디오 버튼 값 가져오기
    var groupName = document.querySelector('input[name="groupName"]:checked').value;

    // 학급일 경우
    if (groupName == 1) {
        group_name0 = $("#lb_dream_01").val();
        group_name1 = $("#lb_dream_02").val();
        if (group_name0 == "") {
            $("#lb_dream_01").focus();
            alert("그룹 정보를 입력해 주세요.");
            return;
        }
        if (group_name1 == "") {
            $("#lb_dream_02").focus();
            alert("그룹 정보를 입력해 주세요.");
            return;
        }
    } else {
        group_name0 = $("#lb_clbu_01").val();
        if (group_name0 == "") {
            $("#lb_clbu_01").focus();
            alert("그룹 정보를 입력해 주세요.");
            return;
        }
    }

    // 인원수 입력
    if (!$lb_dream_03.val()) {
        alert("꿈지기 선생님을 포함한 총 인원을 입력해 주세요.");
        $lb_dream_03.focus();
        return false;
    }

    //총인원 값 초과 체크
    if ($("#lb_dream_03").val() > 40) {
        $("#lb_dream_03").focus();
        alert("총 인원을 40명 이하로 입력해주세요.");
        $("#lb_dream_03").val(40);
        return;
    }

	// 자세한 이유
	if ($('#opinions').val().length <= 0 || $.trim($('#opinions').val()) == "") {
		alert("신청 사연을 작성해 주세요.");
		$opinions.focus();
		return false;
	}

    if (!$("#infoCheck01").is(":checked")) {
        $("#infoCheck01").focus();
        alert("유의 사항 및 개인정보 수집 및 이용 사항에 동의해 주세요.");
        return false;
    }

    if (!$("#infoCheck03").is(":checked")) {
        $("#infoCheck03").focus();
        alert("유의 사항 및 개인정보 수집 및 이용 사항에 동의해 주세요.");
        return;
    }

    return true;
}

// 신청하기
function save() {
    if (!validate()) {
        return;
    }

    console.log("$('#applyForm').serialize()", $('#applyForm').serialize());
    Ajax.execute({
        url: '/samter/campaign/register.json',
        dataType: 'json',
        data: $('#applyForm').serialize(),
        success: function (data) {
            if (data.response == 'success') {
                alert('신청이 완료되었습니다.');
                $('#storyApply').remove();
                location.href = "/samter/campaign/main";
            }
        }
    });
}

// 인원 40명 제한
function removeChar50(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39) {
    } else {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    if (event.target.value != "") {
        if (parseInt(event.target.value) > 40) {
            alert("40명까지 기입 가능합니다.");
            event.target.value = "40";
        }
    }
    return;
}

// 학교 조회
function search_School() {
    var sch_name = $("#sch_name_input_01").val();
    if (sch_name == "") {
        alert("학교명을 입력해주세요.");
        return;
    }

    Ajax.execute({
        data: {
            schName: sch_name
        },
        url: '/samter/campaign/search/school.json',
        success: function (data) {
            var list = data.response;
            var fList = data.response;
            var pList = data.response;
            $('#school_list').empty();
            if (list.length == 0) {
                $("#school_list").html("<li><a href='javascript:'>검색 결과가 없습니다.</a></li>");
            } else {
                var list_str = "";
                for (var i = 0; i < list.length; i++) {
                    //데이터 합성
                    var fkareaname = list[i].fkareaname;
                    var fkbranchname = list[i].fkbranchname;

                    var sch_tab = list[i].tab;
                    var sch_code = list[i].code;
                    var sch_name = list[i].name;
                    var sch_addr = list[i].addr;
                    var fkareacode = $.trim(list[i].fkareacode);
                    var fkbranchcode = $.trim(list[i].fkbranchcode);
                    var sch_kind = "";
                    if (sch_tab == 'E') {
                        sch_kind = "초등";
                    } else if (sch_tab == 'M') {
                        sch_kind = "중등";
                    } else {
                        sch_kind = "고등";
                    }
                    list_str += "<li id='" + sch_name + "|" + fkareaname + "|" + fkbranchname + "' ><a href='javascript:' >"
                        + sch_kind + " | <strong>" + sch_name + "</strong> | " + sch_addr + "</a></li>";
                }
                $("#school_list").html(list_str);
                //학교 검색 후 선택
                $("#school_list > li").on("click", function (e) {
                    var code = $(this).attr("id").split("|");
                    $("#schoolnName_val0").val(code[0]);
                    $("#schoolnName_val1").val(code[1]);
                    $("#schoolnName_val2").val(code[2]);
                    $("#schoolnName_text").html(code[0] + " (" + code[1] + " &gt; " + code[2] + ")");
                    $("#school_list").html("");
                    $('#schoolFindPop').hide();
                });
            }
        }
    });
}

function changeInputType(code) {

    var $schCode = $('#schCode');
    var $schNm = $('#schNm');
    var $schZipCd = $('#schZipCd');
    var $schAddress01 = $('#schAddress01');
    var $schAddress02 = $('#schAddress02');

    if (code === '1') {
        $('.btnZipCode').hide();
        // 개인정보 불러오기
        $('#School_Search, #searchSchoolMsg').show();
        $('#btnSearchAddr').hide();

        var schName = $schNm.data('old');
        $schCode.val($schCode.data('old'));
        $schNm.val(schName).prop('readonly', true);
        $schZipCd.val($schZipCd.data('old'));
        $schAddress01.val($schAddress01.data('old'));
        $schAddress02.val(schName).prop('readonly', true);
    } else if (code === '2') {
        $('.btnZipCode').show();
        // 직접 입력
        $('#School_Search, #searchSchoolMsg').hide();
        $('#btnSearchAddr').show();

        $('#schNm').val('').prop('readonly', false);
        $schCode.val('');
        $schNm.val('').prop('readonly', false);
        $schZipCd.val('');
        $schAddress01.val('');
        $schAddress02.val('').prop('readonly', false);
    }
}