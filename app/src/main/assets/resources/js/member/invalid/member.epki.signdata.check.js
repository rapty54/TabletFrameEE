	/*
	 * EPKI 인증서 처리 .js
	 * 회원가입, 재인증 페이지에서 공통으로 사용
	 */

	function SignData(gubun) 
	{
		var textBox = document.getElementById('plainText');
		var signedTextBox = document.getElementById('signedText');
		var serial = document.getElementById('certserial');
		
		if ($("#plainText").val() == "")
		{
			alert("서명할 원문이 없습니다.");
			return;
		}

		unisign.SignData( textBox.value, null, 
			function(signedText)
			{					
				signedTextBox.value = signedText;
				
				if ( null == signedText || '' == signedText )
				{
					unisign.GetLastError(
						function(errCode, errMsg) 
						{ 
							if( errCode==999 )
							{
									 alert("사용자가 인증서 선택창을 취소하였습니다.");
							}
							else
							{
									 alert('Error code : ' + errCode + '\n\nError Msg : ' + errMsg); 
							}

						}
					);
				} else {
					if(gubun != undefined && gubun == 'join') {
						sendSignDataForJoin();
					}else {
						sendSignData(gubun);
					}
				}
			} 
		);
		
	}


	//가입 EPKI 인증서 확인
	function sendSignDataForJoin(gubun)
	{
		if ($("#signedText").val() == "")
		{
			alert("전자서명값이 없습니다.");
			return;
		}
		else {

			$.ajax({
				type: "post",
				url: '/member/integratedJoinEPK.json',
				async: false,
				cache: false,
				data: {signedText: $("#signedText").val(), key: key, vivasamformat: "json"},
				dataType: "json",
				success: function (result) {

					var data = result.response;
					console.log(data);
					if (data.code !== "0") {

						if (data.epkiErrorCode) {
							if (data.epkiErrorCode === "8888") {
								alert('서버와 통신이 원활하지 않습니다. \n잠시 후 다시 시도해 주세요.');
							} else {
								alert('인증서 비밀번호가 잘못되었거나 정상적인 인증서가 아닙니다.\n\n또는 서비스 확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
							}
							return;
						}

						if (data.code === '9995' || data.code === '9996' || data.code === '9997' || data.code === '9998') {
							alert(data.msg);
						} else {
							alert('인증 처리를 진행하는 과정에 문제가 발생하였습니다.\n\n고객센터(1544-7714)를 통해 문의바랍니다.');
						}
					} else {
						alert("인증되었습니다. 가입을 진행해 주세요");
						console.log(data);
						if (window.opener && window.opener.setEpkCertValue) {
							window.opener.setEpkCertValue(data);
						}
						self.close();
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert('인증서 확인에 문제가 있어 정상적으로 처리되지 않았습니다.\n\n확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
				},
				complete: function (xhr, textStatus) {
				}
			});
		}
	}

	//EPKI 인증서 확인
	function sendSignData(gubun)
	{
		if ($("#signedText").val() == "")
		{
			alert("전자서명값이 없습니다.");
			return;
		}
		else {

			$.ajax({
				type: "post",
				url: '/member/loginEPK.json',
				async: false,
				cache: false,
				data: {signedText: $("#signedText").val(), memberId: $("#memberId").val(), vivasamformat: "json"},
				dataType: "json",
				success: function (result) {
					if (result.code === 'VALIDATE_LOGIN') {
						alert("로그인이 필요한 서비스입니다.");
						window.opener.location.reload();
						self.close();
						return;
					}

					var data = result.response;
					if (data.code !== "0") {

						if (data.epkiErrorCode) {
							if (data.epkiErrorCode === "8888") {
								alert('서버와 통신이 원활하지 않습니다. \n잠시 후 다시 시도해 주세요.');
							} else {
								alert('인증서 비밀번호가 잘못되었거나 정상적인 인증서가 아닙니다.\n\n또는 서비스 확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
							}
							return;
						}

						if (data.code === '9995' || data.code === '9996' || data.code === '9997' || data.code === '9998') {
							alert(data.msg);
						} else {
							alert('인증 처리를 진행하는 과정에 문제가 발생하였습니다.\n\n고객센터(1544-7714)를 통해 문의바랍니다.');
						}
					} else {
						alert("인증되었습니다. 다시 로그인해 주세요.");
						if (window.opener && window.opener.logout) {
							window.opener.logout();
						}
						self.close();
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert('인증서 확인에 문제가 있어 정상적으로 처리되지 않았습니다.\n\n확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
				},
				complete: function (xhr, textStatus) {
				}
			});
		}	
	}
	