function goodAct(code,cid){
	if(LOGIN_ID!=""){
		if($("#good").hasClass("good_on")){
			//alert("이미 추천 하신 컨텐츠입니다");
			var cancelgood = confirm("추천을 취소하시겠습니까?");
			if(cancelgood == true){
				$.post(CONTEXTPATH + "/sns/cancelGood.do",
						{member_id : LOGIN_ID, content_type : code, content_id : cid, vivasamformat : "json"}, 
						function(data){
							if(data.code == "0000"){
								$("#good").attr("class","good_off");
								alert("현재 컨텐츠에 대한 추천이 취소됐습니다");
								$("#good").text(data.good_pt);
								// $(gooddiv).parent().prev().children("div").text(data.cp_pt); // 컨텐츠 촉점수 출력을 안하기로 했기 때문에 주석 처리
							}else if(data.code == "2001"){
								alert("로그인을 해주세요");
							}else if(data.code == "2005"){
								alert("추천을 한 컨텐츠가 아닙니다");
							}else{
								alert("선택하신 컨텐츠에 대한 추천 취소 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
							}
						},
						"json"
				);
			}
		}else if($("#good").hasClass("icon good")){
			// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
			$.post(CONTEXTPATH+"/sns/regGood.do",
					// {member_id : "anonymous", content_type : code, content_id : cid, vivasamformat : "json"}, 
					{member_id : LOGIN_ID, content_type : code, content_id : cid, vivasamformat : "json"},
					function(data){
						if(data.code == "0000"){
							$("#good").attr("class","icon good");
							$("#good").html("<img src=\""+CONTEXTPATH+"/images/common/icon_good.gif\"/>"+data.good_pt);
							
						}else if(data.code == "2001"){
							alert("로그인을 해주세요");
						}else if(data.code == "2004"){
							alert("이미 추천을 하신 컨텐츠입니다");
							$("#good").attr("class","icon good");
						}else{
							alert("선택하신 컨텐츠에 대한 추천 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
						}
					},
					"json"
			);			
		}else{
			// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
			$.post(CONTEXTPATH+"/sns/regGood.do",
					// {member_id : "anonymous", content_type : code, content_id : cid, vivasamformat : "json"}, 
					{member_id : LOGIN_ID, content_type : code, content_id : cid, vivasamformat : "json"},
					function(data){
						if(data.code == "0000"){
						    var iframe_Id = $('iframe').attr('id');// 현재의 iframe 아이디
						    $('#'+iframe_Id).contents().find('#gCnt').text(data.good_pt);
							
							$("#gCnt").html(data.good_pt);
						}else if(data.code == "2001"){
							alert("로그인을 해주세요");
						}else if(data.code == "2004"){
							alert("이미 추천을 하신 컨텐츠입니다");
							$("#good").attr("class","good_on");
						}else{
							alert("선택하신 컨텐츠에 대한 추천 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
						}
					},
					"json"
			);			
		}

	}
	else{
		alert("로그인이 필요합니다.");
	}
}