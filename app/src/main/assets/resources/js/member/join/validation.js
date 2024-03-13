$(function() {
	//휴대폰 인증
	$("#cellphone").click(function(){
		//window.document.domain="www.vivasam.com";
		window.name ="Parent_window";
		fnPopupCell();
	});


	//아이핀 인증
	$("#ipin").click(function(){

		//도메인 설정
		//window.document.domain="www.vivasam.com";
		window.name ="Parent_window";
		fnPopup();
	});

	//새로운 통합 아이디 입력란에 엔터 submit 방지
	$('input[type="text"]').keydown(function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	});
	
});

//아이핀 인증 팝업
function fnPopup(){
	window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100,fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes,location=no, scrollbar=no');
	document.form_ipin.target = "popupIPIN2";
	document.form_ipin.action = "https://cert.vno.co.kr/ipin.cb";
	document.form_ipin.submit();
}


//휴대폰 인증 팝업
function fnPopupCell(){
	window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
	document.form_chk.target = "popupChk";
	document.form_chk.submit();
}