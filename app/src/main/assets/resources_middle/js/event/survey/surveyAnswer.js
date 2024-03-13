
	    
	    function makeQuestionOption(surveyId) {

			$.ajax({
	    		type : "POST",
	    		url : CONTEXTPATH + "/event/makeQuestionOption.do",
	    		async : true,
	    		cache : false,
	    		dataType : "json",
	    		data :  {surveyId : surveyId, vivasamformat : "json" },
	    		success : function(data){
	    			
	    			var html = "";
					var optionList = data.result;
					
					var leng = optionList.length;
					
					for ( var i = 0 ; i < leng ; i++ ) {
						
						var questionId = optionList[i].questionId;
						var questionMin = optionList[i].questionMin;
						var questionMax = optionList[i].questionMax;
						var questionType = optionList[i].questionType;
						var questionReqId = optionList[i].questionReqId;
						var answerReqId = optionList[i].answerReqId;
						var optionReqTyp = optionList[i].optionReqTyp;
						var optionReqId = optionList[i].optionReqId;
						
						var objId = "#" + questionId;
						
						html = "\n";
						html += '<input type="hidden" id="' + questionId + '_min" value="' + questionMin + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_max" value="' + questionMax + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_typ" value="' + questionType + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_qsReqId" value="' + questionReqId + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_anReqId" value="' + answerReqId + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_opReqTyp" value="' + optionReqTyp + '" />\n';
						html += '<input type="hidden" id="' + questionId + '_opReqId" value="' + optionReqId + '" />\n';

						$(objId).append(html);
					}
	    		},
				error: function (xhr, ajaxOptions, thrownError){
				},
				complete:function (xhr, textStatus){
				}
			});	
	    }
	    
	    function makeAnswer(surveyId) {

			$.ajax({
	    		type : "POST",
	    		url : CONTEXTPATH + "/event/makeAnswer.do",
	    		async : true,
	    		cache : false,
	    		dataType : "json",
	    		data :  {surveyId : surveyId, vivasamformat : "json" },
	    		success : function(data){

	    			var html = "";
					var optionList = data.result;
					
					var leng = optionList.length;
					var tmpQuestionId = "";
					
					for ( var i = 0 ; i < leng ; i++ ) {

						var questionId = optionList[i].questionId;
						var answerId = optionList[i].answerId;
						var answerName = optionList[i].answerName;
						var answerSeq = optionList[i].answerSeq;
						var answerText = optionList[i].answerText;
						var answerValue = optionList[i].answerValue;
						var answerType = optionList[i].answerType;
						var answerMaxlng = optionList[i].answerMaxlng;
						var answerListType = optionList[i].answerListType;
						var answerReqId = optionList[i].answerReqId;
						var answerPosition = optionList[i].answerPosition;
						var alertMsg = optionList[i].alertMsg;
						var answerStyle = optionList[i].answerStyle;
						
						var classVal = "";
						var objId = "#" + questionId;

						//	값을 초기화!!!
						if ( tmpQuestionId != questionId) {
							tmpQuestionId = questionId;
						} 
						
						html = "\n";
						
						if ( answerType == "afterEtc" ||  answerType == "afterText" ||  answerType == "afterEtcLabel" ) {
							
							var etcObjId = "#" + answerPosition + "_label";
							
							if ( answerType == "afterEtc" ) {
								html += '<input type="text" id="' + answerId + '_etcDesc" name="' + answerName + '_etcDesc" class="text" style="' + answerStyle + '" maxlength="' + answerMaxlng + '" aReqId="' + answerReqId + '" alertMsg="' + alertMsg + '" >\n';
							}

							if ( answerType == "afterText" ) {
								html += '<input type="text" id="' + answerId + '" name="' + answerName + '" class="text" style="' + answerStyle + '" maxlength="' + answerMaxlng + '" aReqId="' + answerReqId + '" alertMsg="' + alertMsg + '" >\n';
							}
							
							if ( answerType == "afterEtcLabel" ) {
								html += '<label id="' + answerId + '_label" name="' + answerName + '" class="label_tit">' + answerText + '</label>\n';
							}
							
							$(etcObjId).after(html);
							
						} else if ( answerType == "p" ) {

							var pObjId = "#" + answerPosition;
							
							if ( answerType == "p" ) {
								html += '<p>' + answerText + '</p>\n';
							}
							
							$(pObjId).after(html);
							
						} else if ( answerType == "ext" ||  answerType == "extLabel"  ) {
							
							var extObjId = "#" + answerPosition;
							
							if ( answerType == "ext" ) {
								html += '<input type="text" id="' + answerId + '_etcDesc" name="' + answerName + '_etcDesc" class="text" style="' + answerStyle + '" maxlength="' + answerMaxlng + '" aReqId="' + answerReqId + '" alertMsg="' + alertMsg + '" >\n';
							}
							
							if ( answerType == "extLabel" ) {
								html += '<label id="' + answerId + '_label" name="' + answerName + '" class="label_tit">' + answerText + '</label>\n';
							}
							
							$(extObjId).append(html);
							
						} else if ( answerType == "rank" ) {
							
							html += '<div id="' + answerId + '" class="rank">\n';
							html += '<label class="label_tit">' + answerSeq + '순위</label>\n';
							html += '<input type="text" id="' + answerId + '_rank" name="' + answerName + '" class="text numberOnly" style="width:40px;" maxlength="2" areqid="" alertmsg="' + answerSeq + ' 순위">\n';
							html += '<input type="checkbox" id="' + answerId + '_etcChk" name="' + answerName + '_etcChk" class="chk" areqid="q_2_1_1_4" value="기타">\n';
							html += '<label for="">기타</label>\n';
							html += '<input type="text" id="' + answerId + '_etcDesc" name="' + answerName + '_etcDesc" class="text" style="width:300px;" maxlength="100" areqid="" alertmsg="기타">\n';
							html += '</div>\n';

							$(objId).append(html);
							
						} else {
							
							if ( answerType == "label" ) {
								html += '<label id="' + answerId + '_label" name="' + answerName + '" class="label_tit">' + answerText + '</label>\n';
							}
							
							if ( answerType == "radio" || answerType == "checkbox" ) {
								if ( answerType == "radio" ) classVal = "rdo";
								if ( answerType == "checkbox" ) classVal = "chk";
								html += '<input type="' + answerType + '" id="' + answerId + '" name="' + answerName + '" class="' + classVal + '" aReqId="' + answerReqId + '" value="' + answerValue + '"><label id="' + answerId + '_label" for="">' + answerText + '</label>\n';
							}
							
							if ( answerType == "text" ) {
								html += '<input type="' + answerType + '" id="' + answerId + '" name="' + answerName + '" class="text" value="" style="' + answerStyle + '" maxlength="' + answerMaxlng + '" aReqId="' + answerReqId + '" alertMsg="' + alertMsg + '" >\n';
							}
							
							if ( answerType == "textarea" ) {
								
								html += '<textarea id="' + answerId + '" name="' + answerName + '" class="textarea" style="' + answerStyle + '" maxlength="' + answerMaxlng + '" aReqId="' + answerReqId + '" alertMsg="' + alertMsg + '" ></textarea>\n';
								
							}

							if ( answerListType == "H" ) {
								html = '<div>\n' + html + '</div>\n';
							}
							
							$(objId).append(html);
						}
					}
	    		},
				error: function (xhr, ajaxOptions, thrownError){
				},
				complete:function (xhr, textStatus){
				}
			});	
	    }