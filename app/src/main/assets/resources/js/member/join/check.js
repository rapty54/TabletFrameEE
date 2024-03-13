$(function() {
	$('#checkBtn').on('click',function(){
		isMemberChecked();
	});
});

var regName = /[\uac00-\ud7a3]{2,4}/;
var regEmail=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z_]+[-A-Za-z_.]*[.]{1}[A-Za-z]{2,5}$/;
var regCellPhone = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;

function isMemberChecked(){

	$("#nameAlert").text("");
	$("#emailAlert").text("");
	$("#cellphoneAlert").text("");
	
	var name = $("#name").val();
	var email = $("#email").val();
	var cellphone = $("#cellphone").val();
	
	if(name == "") {
		$("#nameAlert").text("성명을 입력해 주세요.");
		return;
	}else if(!regName.test(name)) {
		$("#nameAlert").text("올바른 성명 형식이 아닙니다.");
		return;
	}
	
	if(email == "") {
		$("#emailAlert").text("이메일을 입력해 주세요.");
		return;
	} else if(!regEmail.test(email)) {
		$("#emailAlert").text("올바른 이메일 형식이 아닙니다.");
		return;
	}
	
	if(cellphone == "") {
		$("#cellphoneAlert").text("휴대전화번호를 입력해 주세요.");
		return;
	} else if(!regCellPhone.test(cellphone)) {
		$("#cellphoneAlert").text("올바른 휴대전화번호 형식이 아닙니다.");
		return;
	}

	Ajax.execute({
		url: "/member/join/check.json",
		dataType: 'json',
		data: $('#joinFrm').serializeArray(),
		success: function(response) {
			var member = response.response.memberId;
			if(member == null) { // 비회원일 경우
				$("#joinFrm").submit();
			} else { // 회원일 경우
				$('#partCheck').hide();
				$('#partJoin').show().find('#msmberId').text(member);
			}
		}
	});
}

//휴대전화번호 포맷 변경 000-0000-0000
function formatMobile(phoneNum) {
	var rtnNum;
	var regExp =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
	var myArray;
	if(regExp.test(phoneNum)){
		myArray = regExp.exec(phoneNum);
		rtnNum = myArray[1]+'-'+myArray[2]+'-'+myArray[3];
		return rtnNum;
	} else {
		return phoneNum;
	}
}