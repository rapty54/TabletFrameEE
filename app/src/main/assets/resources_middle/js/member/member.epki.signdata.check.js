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
					//alert(certAttrs.version);
					sendSignData(gubun);
					/*
					======추출한 인증서 정보=======
					version
					serialNumber   
					signAlgo   
					issuerName   
					validateFrom   
					validateTo   
					subjectName   
					publicKey   
					authorityKeyIdentifier   
					subjectKeyIdentifier   
					keyUsage   
					policiesOid   
					subjectAltName  
					autorityInfoAccess   
					crlDistributionPoints   
					policiesCps   
					policiesUserNotice   
					signature
					*/
					//document.frm.certAttrstxt.value=certAttrs.validateTo; //만료일
				}
			} 
		);
		
	}
	
	
	/*jsonp Type으로 선언하여 크로스브라우징 문제를 해결하려다 IE에서의 get 방식 문자열 길이 제한 문제로*/ 
	/*서버단 asp 소스의 header 설정을 변경하여 처리함. shimwb, 20161205*/
	
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
    			type : "post",
    			url : "/common/verifyCrossCert.do",
    			async : false,
    			cache : false,    			
    			data : {signedText : $("#signedText").val(), vivasamformat : "json"},
    			dataType : "json",
    			success : function(data){
    				//alert(data.constructor);
    				data = JSON.parse(data);
    				
    				//ErrorCode가 9999일 경우 Java Exception 발생한 것임
    				//alert('Error code : ' + data["ErrorCode"] + '\n\nError Msg : ' + data["ErrorMsg"]);
    				
    				//console.log(data["ErrorCode"]);  
    				//console.log(data["ErrorMsg"]);
    				
    				if(data["ErrorCode"] != "" && data["ErrorCode"] != undefined) {
    					alert('인증서 비밀번호가 잘못되었거나 정상적인 인증서가 아닙니다.\n\n또는 서비스 확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
    					return;
					} else {
						//alert(data["Serial"]);
	    				//alert(data["Subject"]);
	    				//alert(data["From"]);
	    				//alert(data["To"]);
						
             			$("#authentication").val("EPKI");
             			$("#EPKI_CERTDN").val(data["Subject"]);
             			$("#EPKI_CERTSN").val(data["Serial"]);
             			$("#VALID_YN").val("Y");
             			
             			if (gubun == "join") { //회원가입 인증
             				$("#check_name").val(check_name);
                 			$("#email").val(email);
                 			$("#sCoInfo1").val("");
                 			$("#isIpin").val("0");
                 			
                 			
             				$("#joinFrm").attr("action", "/member/join_typeinfo.do").submit();	//회원가입
             			}
             			else if (gubun == "reCertify") { //유효기간 만료 30일전 재인증 (현재 인증 상태)
             				$("#joinFrm").attr("action", "/member/memberReCertifyUpdate.do").submit();
             			}
             			else if (gubun == "epkiInValid") { //미인증 회원 인증
	             			verifyEPKI();
             			}
             			
					}
    			},
    			error: function (xhr, ajaxOptions, thrownError){
    				//alert(thrownError);
    				alert('인증서 확인에 문제가 있어 정상적으로 처리되지 않았습니다.\n\n확인이 필요할 수 있으므로 고객센터(1544-7714)를 통해 문의바랍니다.');
    			}, 
    			complete:function (xhr, textStatus){
    				//	alert("complete");
    			}  
    		});
		}	
	}
	