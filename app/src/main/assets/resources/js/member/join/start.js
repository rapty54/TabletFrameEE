$(function(){
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

	// 전송
	$('#nextStepBtn').on('click', function () {
		var isSsoMember = $('input[name=isSsoMember]').val();
		
		// 통합회원
		if(isSsoMember == 'Y') {
			//통합회원 특별약관
			// var agree1 = $("#lbAgree1").is(':checked');
			//비바샘
			var agree2 = $("#TermAgree").is(':checked');
			var agree3 = $("#PrivacyAgree").is(':checked');
			// var agree4 = $("#tschoolPromoAgree").is(':checked');
			//티스쿨
			// var agree5 = $("#lbAgree3_1").is(':checked');
			// var agree6 = $("#lbAgree3_2").is(':checked'); //선택
			// var agree7 = $("#lbAgree3_4").is(':checked'); 2022.04 제3자제공에 대한 동의 삭제
	
	        if(agree2 && agree3){
				document.vnoform.action = "/member/join/identificationAlready";
				document.vnoform.submit();
	        	//$("#joinFrm").submit();
	        } else{
	        	alert("회원가입을 위해 필수 약관에 동의해 주세요.");
	            return;
	        }
		} else {
			var agree1 = $("#TermAgree").is(':checked');
			var agree2 = $("#PrivacyAgree").is(':checked');
			if(agree1 && agree2) {
				$("#joinFrm").attr("action", "/member/sso/form").submit();
				//$("#joinFrm").submit();
	        } else{
	        	alert("회원가입을 위해 필수 약관에 동의해 주세요.");
	            return;
			}
		}
	});
})