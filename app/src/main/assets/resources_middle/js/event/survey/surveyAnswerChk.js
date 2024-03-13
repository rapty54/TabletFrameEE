
	    
	    /*
	    설문조사 페이지 이동하면서 보여주는 화면 제어부분이다.
	    */
	    function showPage( orgClassName, goGlassName, type ) {
	    	
 	    	$(".none").removeClass("none");
	    	$(".on").removeClass("on");
	    	
	    	$(".page_1").addClass("none");
	    	$(".page_2").addClass("none");

	    	$(goGlassName).removeClass("none").addClass("on");
	    }
	    
	    //	설문 문항의 필수 옵션을 체크한다.
		function chkQuestion (className) {
	    	
	    	//console.log("-- chkQuestion : start!!! ---------------------------------------------------");
	    	
	    	var result = true;
	    	
	    	//	사용자 정보 입력 부분을 점검 한다.
 	    	if ( className == ".page_1" ) {
	    		//	result = chkMemberProfile();
	    	}

	    	//	이름 알아오는 넘이다!!!
	    	if ( result ) {
				var tmpName = "";
				$( ":input", className ).each(function( i ) {
					
					/*
					//console.log("" );
					//console.log("---------------------------------------------------------------------------------------" );
					//console.log("index ( " + i + " ) : " + className );
					//console.log("---------------------------------------------------------------------------------------" );
					//console.log("" );
			    	*/
					
					var getName = $(this).attr("name");
					var getId = $(this).attr("id");
					var chkGetNameDesc = tmpName + "_etcDesc";

					/*
					//console.log("getName : " + getName );
					//console.log("getId   : " + getId );
					//console.log("tmpName : " + tmpName );
					//console.log("chkGetNameDesc : " + chkGetNameDesc );
					*/
					
					if ( tmpName != getName && typeof getName != "undefined" && getName != chkGetNameDesc ) {

						tmpName = getName;
						
						if ( chkQuestionVal(tmpName , getId) == false ){
							result = false;
					    	//console.log(getName + " result : " + result );
							return false;
						}
					}
			    });
	    	}

	    	//console.log("-- chkQuestion : end!!! ---------------------------------------------------");

			return result;
		}
	    
	    function chkMemberProfile() {
	    	
	    	var result = true;

	    	var schoolName = $.trim( $("#q_1_1_2").val() );
	    	var career = $.trim( $("#q_1_2_2").val() );
	    	var subjects = $.trim( $("#q_1_3_2").val() );
	    	var age = "";
	    	var phoneNumber = $.trim( $("#q_1_5_2").val() );
	    	var eMail = $.trim( $("#q_1_6_2").val() );
	    	var agree = "";

	    	$("input[name=q_1_4]:checked").each(function () {
	    		age = $(this).val();
	    	});

	    	$("input[name=q_1_7]:checked").each(function () {
	    		agree = $(this).val();
	    	});
	    	
	    	
	    	
	    	if ( schoolName == "" ) {
	    		alert("재직 중인 학교의 지역/학교명을 입력하세요.");
	    		$("#q_1_1_2").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	if ( career == "" ) {
	    		alert("교직경력을 입력하세요.");
	    		$("#q_1_2_2").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	if ( subjects == "" ) {
	    		alert("담당과목을 입력하세요.");
	    		$("#q_1_3_2").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	if ( age == "" ) {
	    		alert("연령대를 선택하세요.");
	    		$("input[name=q_1_4]").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	if ( phoneNumber == "" ) {
	    		alert("휴대폰 번호를 입력하세요.");
	    		$("#q_1_5_2").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	if ( eMail == "" ) {
	    		alert("이메일 주소를 입력하세요.");
	    		$("#q_1_6_2").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	
	    	if ( agree == "" ) {
	    		alert("개인정보 제공 동의하세요.");
	    		$("input[name=q_1_7]").focus();
	    		result = false;
	    		return;
	    	}
	    	
	    	return result;
	    }

	    //	설문 문항의 필수 옵션을 체크한다.
	    function chkQuestionVal( qName , qId ) {

			//console.log("" );
	    	//console.log("------------------------------------------------------------------");
	    	//console.log("chkQuestionVal : Start!!!!");
	    	//console.log("qName : " + qName);
			
	    	var qMin = "#" + qName + "_min";			//	0 이면 필수값 이 아님 , 최소값
	    	var qMax = "#" + qName + "_max";			//	0 이면 선택 무제한 , 최대값
	    	var qTyp = "#" + qName + "_typ";			//	문항 타입!!! ( radio. checkbox, text, textarea )
	    	var qsReqId = "#" + qName + "_qsReqId";		//	필수 답변 확인 - 문제 번호 ( id )
	    	var anReqId = "#" + qName + "_anReqId";		//	필수 답변 확인 - 문제 의 답변 번호 ( id )
	    	var opReqTyp = "#" + qName + "_opReqTyp";	//	문제의 답변 항목중 : 무조건 답변되어야 하는 경우
	    	var opReqId = "#" + qName + "_opReqId";		//	문제의 답변 항목중 : 무조건 답변되어야 하는 경우
	    	//	var qReqId = "#" + qName + "_reqId";
	    	//	var qReqValue = "#" + qName + "_reqValue";

	    	var qMinVal = $(qMin).val();
	    	var qMaxVal = $(qMax).val();
	    	var qTypVal = $(qTyp).val();
	    	var qsReqIdVal = $(qsReqId).val();
	    	var anReqIdVal = $(anReqId).val();	
	    	var opReqTypVal = $(opReqTyp).val();
	    	var opReqIdVal = $(opReqId).val();	
	    	//	var qReqIdVal = $(qReqId).val();
	    	//	var qReqValueVal = $.trim( $(qReqValue).val() );

	    	//console.log("qMin : " + qMin + " / qMinVal : " + qMinVal);
	    	//console.log("qMax : " + qMax + " / qMaxVal : " + qMaxVal);
	    	//console.log("qTyp : " + qTyp + " / qTypVal : " + qTypVal);
	    	//console.log("qsReqId : " + qsReqId + " / qsReqIdVal : " + qsReqIdVal);
	    	//console.log("anReqId : " + anReqId + " / anReqIdVal : " + anReqIdVal);
	    	//console.log("opReqId : " + opReqId + " / opReqIdVal : " + opReqIdVal);
	    	//console.log("opReqTyp : " + opReqTyp + " / opReqTypVal : " + opReqTypVal);
	    	//	//console.log("qReqId : " + qReqId + " / qReqIdVal : " + qReqIdVal);
	    	//	//console.log("qReqValue : " + qReqValue + " / qReqValueVal : " + qReqValueVal);

			var qObjId = "#" + qId;			
	    	var qSubjectId = "#" + qName + "_subText";	//	라벨을 가지고 오는 넘이다!!!!
			var qSubject = $(qSubjectId).text(); 
	    	
	    	//console.log("qObjId : " + qObjId);
	    	//console.log("qSubjectId : " + qSubjectId);
	    	//console.log("qSubject : " + qSubject);
			

	    	//console.log("");
	    	//console.log("------------------------------------------------------------------");
	    	//console.log("qTypVal : " + qTypVal);
	    	//console.log("");
	    	
	    	//	입력 방식이 라디오버튼 이나 체크박스일때
	    	if ( qTypVal == "radio" || qTypVal == "checkbox" ) {

	    		var chkName = "input[name=" + qName + "]:checked";
				var chkCnt = 0;
				var chkEtcDesc = false;
				var aReqId = [];
				var aReqCnt = 0;
				
				$(chkName).each(function() {
					
					//	기타 설명이 작성되어 있는지 체크하는 부분이다!
					if ( $(this).attr("aReqId") != "" ) {
						chkEtcDesc = true;
						aReqId[aReqCnt] = $(this).attr("aReqId");
						aReqCnt++;
					}
					chkCnt++;
				});

				//	필수 인지 아닌지 구분
				if ( qMinVal > 0 ) {
					
					//	필수 항목의 답을 하지 않았을 경우
					if ( chkCnt == 0 ) {
						alert( qSubject + "\n필수 선택 문항입니다.");
						$(qObjId).focus();
						return false;
					}
					
					// 필수 항목의 답변이 최소 갯수 미만일 경우
					if ( qMinVal > chkCnt ) {
						alert( qSubject + "\n선택 답변수가 모자릅니다.");
						$(qObjId).focus();
						return false;
					}
					
					//	최고 답변 갯수 검사
					if ( qMaxVal > 0 ) {
						if ( qMaxVal < chkCnt ) {
							alert( qSubject + "\n답변을 초과 선택 하였습니다.");
							$(qObjId).focus();
							return false;
						}
					}

					//	기타항목이 선택되어있다면 실행
					if ( chkEtcDesc ) {

				    	//console.log("------------------------------------------------------------------");
				    	//console.log("기타항목이 선택되어서 텍스트 박스 검사!!!");
				    	//console.log("------------------------------------------------------------------");
				    	
						for ( var i = 0 ; i < aReqCnt ; i++ ) {
							
							var etcDescId = "#" + aReqId[i] + "_etcDesc";
							var etcDescVal = $.trim( $(etcDescId).val() );
							var alertMsg = $(etcDescId).attr("alertMsg");
							
					    	//console.log("i : " + i);
					    	//console.log("etcDescId  : " + etcDescId);
					    	//console.log("etcDescVal : " + etcDescVal);
					    	//console.log("alertMsg   : " + alertMsg);
							
							if ( etcDescVal == "" ) {
								alert( qSubject + "\n" + alertMsg + " 항목에 대한 의견을 작성하세요.");
								$(etcDescId).focus();
								chkEtcDesc = false;
								return false;
							}
						}
					}
					
					//	문제의 답변 항목중 : 무조건 답변되어야 하는 경우
					//	귀차나서 지금은 무조건 text 입력으로 해놨따... 
					if ( opReqIdVal != "" && opReqIdVal != null && opReqIdVal != "null" && typeof opReqIdVal != "undefined" ) {

						var chkOpReqId = "#" + opReqIdVal;
						var chkVal = $.trim( $(chkOpReqId).val() );
						var chkAlertMsg = $(chkOpReqId).attr("alertMsg");
						var chkValLength = chkVal.length;
						
						if ( chkValLength == 0 ) {
							//	alert("\"" + qSubject + "\" 는" + "\n필수 선택 문항입니다.");
							alert(chkAlertMsg + " 필수 입력 문항입니다.");
							$(chkOpReqId).focus();
							return false;
						}
					}
				}

				//	선언 문항의 조건에 따른 필수 항목 체크
				//	option table 에 입력된 question id 와 answer id 값을 토대로
				//	해당 값이 체크되어 있는지 확인 하는 부분이다.
				//	12  번 1 번 문항은 -> 13 번 문항 필수 답변
				//	12  번 2 번 문항은 -> 14 번 문항 필수 답변
				//	로 검증되어지는 상황이면 
				//	13번 문항에 12번 , 12번 1번 문항
				//	14번 문항에 12번 , 12번 2번 문항
				//	으로 정보가 남겨진다!!!!
				if ( qsReqIdVal != "" && qsReqIdVal != null && qsReqIdVal != "null" && typeof qsReqIdVal != "undefined"  ) {
					
					var chkReqId = "input[name=" + qsReqIdVal + "]:checked";
					var chkResult = true;
					
					$(chkReqId).each(function(){
					
						var chrReqValue = $.trim( $(this).attr("id") );
						
						//console.log( "anReqIdVal  : " + anReqIdVal );
						//console.log( "chrReqValue : " + chrReqValue );
						
						if ( anReqIdVal == chrReqValue ) {

							//	필수 항목의 답을 하지 않았을 경우
							if ( chkCnt == 0 ) {
								alert(qSubject + "\n필수 선택 문항입니다.");
								$(qObjId).focus();
								chkResult = false;
								return false;
							}
							
							// 필수 항목의 답변이 최소 갯수 미만일 경우
							if ( qMinVal > chkCnt ) {
								alert(qSubject + "\n선택 답변수가 모자릅니다.");
								$(qObjId).focus();
								chkResult = false;
								return false;
							}
							
							//	기타항목이 선택되어있다면 실행
							if ( chkEtcDesc ) {

						    	//console.log("------------------------------------------------------------------");
						    	//console.log("기타항목이 선택되어서 텍스트 박스 검사!!!");
						    	//console.log("------------------------------------------------------------------");
						    	
								for ( var i = 0 ; i < aReqCnt ; i++ ) {
									
									var etcDescId = "#" + aReqId[i] + "_etcDesc";
									var etcDescVal = $.trim( $(etcDescId).val() );
									var alertMsg = $(etcDescId).attr("alertMsg");
									
							    	//console.log("i : " + i);
							    	//console.log("etcDescId  : " + etcDescId);
							    	//console.log("etcDescVal : " + etcDescVal);
							    	//console.log("alertMsg   : " + alertMsg);
									
									if ( etcDescVal == "" ) {
										alert( qSubject + "\n" + alertMsg + " 항목에 대한 의견을 작성하세요.");
										$(etcDescId).focus();
										chkResult = false;
										return false;
									}
								}

								if ( !chkResult ) {
									chkResult = false;
									return false;
								}
							}
						}
					});
					
					if ( !chkResult ) {
						return false;
					}
				}
	    	} 
	    	
	    	//	입력방식이 text 나 textarea 일때!!!
	    	if ( qTypVal == "text" || qTypVal == "textarea" ) {

		    	//console.log("---------------------------------------------");
		    	//console.log("text / textarea 입력 값 검증을 시작한다!!!");
		    	//console.log("---------------------------------------------");
	    		
	    		var chkVal = $.trim( $(qObjId).val() );
	    		var chkReqId = $(qObjId).attr("aReqId");				//	필수 문항 입력 정보가 있으면 들어간다!!! option_req_id
    			var chkAlertMsg = $(qObjId).attr("alertMsg");
	    		var chkLength = chkVal.length;

		    	//console.log("chkVal : " + chkVal);
		    	//console.log("chkReqId : " + chkReqId);
		    	//console.log("chkAlertMsg : " + chkAlertMsg);
		    	//console.log("chkLength : " + chkLength);

				//	필수 인지 아닌지 구분 : 0 이면 필수가 아니고 0 보다 크면 필수 이다.
				if ( qMinVal > 0 ) {
					
					if ( chkLength == 0 ) {
						alert( qSubject + "\n" + chkAlertMsg + " 문항에 답변을 하지 않았습니다.");
						$(qObjId).focus();
						return false;
					}

			    	//	인풋필드의 글자수를 제한을 검색하는 부분이다!!!!
		    		if ( qMaxVal < chkLength ) {
		    			alert( qSubject + "\n" + chkAlertMsg + " 글자수 재한을 초과하였습니다.");
		    			$(qObjId).focus();
		    			return false;
		    		}

					//	문제에 옵션이 있는 경우이다
					//	필수 문항에 연결된 문항작성 필드가 있을 때 작동한다!!!!!
		    		if ( chkReqId != "" && chkReqId != null && chkReqId != "null" && typeof chkReqId != "undefined"  ) {

				    	//console.log("---------------------------------------------");
				    	//console.log("문제 답변에 옵션이 있는 경우");
				    	//console.log("---------------------------------------------");
				    	
		    			var chkReqObjId = "#" + chkReqId;
		    			var chkReqVal = $.trim( $(chkReqObjId).val() );
		    			var chkReqAlertMsg = $(chkReqObjId).attr("alertMsg");
		    			var chkReqValLength = chkReqVal.length;

				    	//console.log("chkReqObjId     : " + chkReqObjId);
				    	//console.log("chkReqVal       : " + chkReqVal);
				    	//console.log("chkReqAlertMsg  : " + chkReqAlertMsg);
				    	//console.log("chkReqValLength : " + chkReqValLength);

		    			//	인풋필드에 입력했는지 검증한다!!!!
						if ( chkReqValLength == 0 ) {
							alert( qSubject + "\n" + chkReqAlertMsg + " 문항에 답변을 하지 않았습니다.");
							$(chkReqObjId).focus();
							return false;
						}

				    	//	인풋필드의 글자수를 제한을 검색하는 부분이다!!!!
			    		if ( qMaxVal < chkReqValLength ) {
			    			alert( qSubject + "\n" + chkReqAlertMsg + " 글자수 재한을 초과하였습니다.");
			    			$(qObjId).focus();
			    			return false;
			    		}
		    		}
				}
	    		
	    		
	    		//	문제 옵션에 필수 검증 값이 있을경우
	    		if ( anReqIdVal != "" && anReqIdVal != null && anReqIdVal != "null" && typeof anReqIdVal != "undefined" ) {

		    		
			    	//console.log("---------------------------------------------");
			    	//console.log("문제 옵션에 필수 검증 값이 있을경우");
			    	//console.log("---------------------------------------------");
			    	
			    	var chkObjId = "#" + anReqIdVal;
			    	var chkVal = $(chkObjId).attr("checked")
			    	
			    	var chkInput = "input[name=" + qName + "]";
			    	
			    	//console.log("---------------------------------------------");
			    	//console.log("chkObjId : " + chkObjId);
			    	//console.log("chkVal   : " + chkVal);
			    	//console.log("chkInput : " + chkInput);
			    	//console.log("---------------------------------------------");
			    	
			    	if ( chkVal == "checked" ) {
			    		
			    		var result =  true;
			    		
			    		$(chkInput).each(function () {

			    			var thisId = "#" + $(this).attr("id");
			    			var thisAlertMsg = $(this).attr("alertMsg");
			    			var thisVal = $(this).val();
			    			var thisValLength = thisVal.length;
					    	
					    	//console.log("---------------------------------------------");
					    	//console.log("thisId : " + thisId);
					    	//console.log("thisAlertMsg : " + thisAlertMsg);
					    	//console.log("thisVal : " + thisVal);
					    	//console.log("thisValLength : " + thisValLength);
					    	//console.log("---------------------------------------------");

				    		if ( thisValLength == 0 ) {
				    			alert( qSubject + "\n" + thisAlertMsg + " 문항에 답변을 하지 않았습니다.");
				    			$(thisId).focus();
				    			result =  false;
				    			return result;
				    		}
			    		});
			    		return result;
			    	}
	    		}
	    	}
	    	
	    	//	입력방식이 text 나 textarea 일때!!!
	    	if ( qTypVal == "chkText" || qTypVal == "chkTextarea" ) {

		    	//console.log("---------------------------------------------");
	    		//console.log("chkText / chkTextarea 입력 값 검증을 시작한다!!!");
	    		//console.log("---------------------------------------------");

				//	선언 문항의 조건에 따른 필수 항목 체크
				//	option table 에 입력된 question id 와 answer id 값을 토대로
				//	해당 값이 체크되어 있는지 확인 하는 부분이다.
				//	12  번 1 번 문항은 -> 13 번 문항 필수 답변
				//	12  번 2 번 문항은 -> 14 번 문항 필수 답변
				//	로 검증되어지는 상황이면 
				//	13번 문항에 12번 , 12번 1번 문항
				//	14번 문항에 12번 , 12번 2번 문항
				//	으로 정보가 남겨진다!!!!
		    	
				if ( anReqIdVal != "" && anReqIdVal != null && anReqIdVal != "null" && typeof anReqIdVal != "undefined"  ) {
					
					var objId = "#" + qId;
					var chkReqId = "#" + anReqIdVal;
					var chkReqVal = $(chkReqId).attr("checked");
	    			var alertMsg = $(objId).attr("alertMsg");
					
					if ( chkReqVal == "checked" ) {
						var chkThisVal = $.trim( $(objId).val() );
						var chkLeng = chkThisVal.length;
						
						if ( chkLeng == 0 ) {
							alert( qSubject + "\n" + alertMsg + " 항목에 대한 의견을 작성하세요.");
							$(objId).focus();
							return false;
						}
					}
				}
	    	}
	    	

	    	//	순위 입력 방식일때!!!
	    	if ( qTypVal == "rank" ) {

		    	//console.log("---------------------------------------------");
		    	//console.log("순위 입력 방식일때!!!");
		    	//console.log("qName : " + qName);
		    	//console.log("---------------------------------------------");
		    	
		    	/*
		    	var qMin = "#" + qName + "_min";			//	0 이면 필수값 이 아님 , 최소값
		    	var qMax = "#" + qName + "_max";			//	0 이면 선택 무제한 , 최대값
		    	var qTyp = "#" + qName + "_typ";			//	문항 타입!!! ( radio. checkbox, text, textarea )
		    	var qsReqId = "#" + qName + "_qsReqId";		//	필수 답변 확인 - 문제 번호 ( id )
		    	var anReqId = "#" + qName + "_anReqId";		//	필수 답변 확인 - 문제 의 답변 번호 ( id )
		    	var opReqTyp = "#" + qName + "_opReqTyp";	//	문제의 답변 항목중 : 무조건 답변되어야 하는 경우
		    	var opReqId = "#" + qName + "_opReqId";		//	문제의 답변 항목중 : 무조건 답변되어야 하는 경우
		    	//	var qReqId = "#" + qName + "_reqId";
		    	//	var qReqValue = "#" + qName + "_reqValue";

		    	var qMinVal = $(qMin).val();
		    	var qMaxVal = $(qMax).val();
		    	var qTypVal = $(qTyp).val();
		    	var qsReqIdVal = $(qsReqId).val();
		    	var anReqIdVal = $(anReqId).val();	
		    	var opReqTypVal = $(opReqTyp).val();
		    	var opReqIdVal = $(opReqId).val();	
		    	//	var qReqIdVal = $(qReqId).val();
		    	//	var qReqValueVal = $.trim( $(qReqValue).val() );
		    	*/
		    	
		    	var chkObjName = "input[name=" + qName + "]";
		    	var chkCnt = 0;
		    	var rankVal = [];
		    	var rankId = [];
		    	var rankEtcChk = [];
		    	var rankEtcDescId = [];
		    	
		    	//	필수 입력이면 검증을 한다!!!
		    	if ( qMinVal > 0 ) {
		    		

			    	//console.log("---------------------------------------------");
			    	//console.log("순위 입력 폼값 검증!!! ");
			    	//console.log("---------------------------------------------");
			    	//console.log("chkObjName : " + chkObjName);
		    		
		    		$(chkObjName).each(function () {
		    			
		    			rankVal[chkCnt] = $.trim( $(this).val() );
		    			
		    			var number = chkCnt + 1;
		    			
		    			var chkEtcChkId = "#" + qName + "_" + number + "_etcChk"
		    			var chkEtcDescId = "#" + qName + "_" + number + "_etcDesc"
				    	var chkVal = $(chkEtcChkId).attr("checked")
				    	
					    //console.log("chkEtcChkId  : " + chkEtcChkId);
					    //console.log("chkEtcDescId : " + chkEtcDescId);
					    //console.log("chkVal : " + chkVal);
				    	
		    			if( chkVal == "checked" ) {
		    				rankEtcDescId[chkCnt] = chkEtcDescId;
		    				rankEtcChk[chkCnt] = true;
		    				rankVal[chkCnt] = $.trim( $(chkEtcDescId).val() );
		    			}
		    			
		    			rankId[chkCnt] = "#" + $(this).attr("id");
		    			
				    	//console.log("rankVal[" + chkCnt + "] : " + rankVal[chkCnt]);
				    	//console.log("rankId[" + chkCnt + "]  : " + rankId[chkCnt]);
		    			
		    			chkCnt ++;
		    		});
		    		
		    		var result = true;
		    		
		    		for ( var i = 0 ; i < chkCnt ; i++ ) {

    					var rankNum = i + 1 ;
    					
		    			if ( i < qMaxVal ) {

	    			    	//console.log("---------------------------------------------");
					    	//console.log("최소답변수 검증!!!");
					    	//console.log("---------------------------------------------");
		    				
					    	if ( rankEtcChk[i] ) {
					    		$(rankId[i]).val(opReqTypVal);
					    		if ( rankVal[i] == "" ) {
			    					alert(rankNum + " 순위 기타 내용을 입력하세요.");
		    						$(rankEtcDescId[i]).val("");
		    						$(rankEtcDescId[i]).focus();
		    						result = false;
		    						return result;
					    		}
					    	}
					    	
		    				if ( rankVal[i] == "" ) {
		    					alert(rankNum + "순위 값은 필수 입력입니다.");
	    						$(rankId[i]).focus();
	    						result = false;
	    						return result;
		    				}

					    	if ( !rankEtcChk[i] ) {
					    		//	alert( rankVal[i] + " : " + opReqTypVal  );
					    		var rankValNum = Number(rankVal[i]);
					    		var opReqTypValNum = Number(opReqTypVal);
			    				if ( rankValNum > opReqTypValNum ) {
			    					alert("입력한 " + rankNum + " 순위 값이 문항 번호보다 큽니다.");
		    						$(rankId[i]).val("");
		    						$(rankId[i]).focus();
		    						result = false;
		    						return result;
			    				}
					    	}
		    			}

				    	//console.log("i : " + i);
				    	//console.log("j : " + j);
		    			
		    			for ( var j = 0 ; j < chkCnt ; j++ ) {

	    					var rankNum = j + 1 ;
	    					
	    			    	//console.log("---------------------------------------------");
					    	//console.log("입력값 검증!!!");
					    	//console.log("---------------------------------------------");
		    				
		    				if ( i != j &&  !rankEtcChk[i] && !rankEtcChk[j] ) {
		    			    	//console.log("---------------------------------------------");
						    	//console.log("rankVal[" + i + "] : " + rankVal[i]);
						    	//console.log("rankId[" + i + "]  : " + rankId[i]);
						    	//console.log("---------------------------------------------");
						    	//console.log("rankVal[" + j + "] : " + rankVal[j]);
						    	//console.log("rankId[" + j + "]  : " + rankId[j]);
						    	//console.log("---------------------------------------------");
						    	
		    					if ( rankVal[i] == rankVal[j] ) {
		    						alert(rankNum + "순위의 값이 동일합니다!!!!");
		    						$(rankId[j]).focus();
		    						result = false;
		    						return result;
		    					}
		    				}
		    			}
		    		}
		    	}
	    	}

			//console.log("" );
	    	//console.log("chkQuestionVal : End!!!!");
	    	//console.log("------------------------------------------------------------------");
			//console.log("" );
	    }