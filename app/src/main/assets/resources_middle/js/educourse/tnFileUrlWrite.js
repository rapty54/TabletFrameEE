/*

  작성자 : 이홍 
  본 스크립트는 /talk/myClassTalkWrite.js 를 복사해서 만들었습니다.
  티칭노트에서 자료등록시에 호출하는 upinfoInsertPop.jsp 에서 include해서 사용하며, 
  원본 스크립트와의 차이점은 파일/url 등록 처리후에 콜벡 함수를 호출하는 방법입니다. 
  파일 등록과 url 등록 관련 스크립트만 사용합니다. 
  
*/
	var memberId = '${memberId}';
	var toMemberId = '${toMemberId}';
	var showGubun = '${showGubun}';
	var mediaGubun = '${contentGubun}';
	var mediaId = '${contentId}';
	
	var p_domain = "http://author.vivasam.com/author"; // 교안 서버 domain 

	// file & url 입력박스 기본 안내 문구!!!
	var urlChkContVal = "업로드 자료와 관련된 추가 설명을 입력하세요";
	var urlChkSubjVal = "해당 링크 주소의 제목을 입력하세요";
	var urlChkKwVal = "키워드는 콤마(,)로 구분해주세요 (예:키워드1, 키워드2)";
	
	var fileChkContVal = "업로드 자료와 관련된 추가 설명을 입력하세요";
	var fileChkSubjVal = "업로드 파일의 제목을 입력하세요";
	var fileChkKwVal = "키워드는 콤마(,)로 구분해주세요 (예:키워드1, 키워드2)";

	/* 미분류 버튼 */
	$(function() {
		$('.divide .start, .divide .end').click(function() {
			var $this = $(this).parent().find('.subject');

			if($this.is(':hidden')) {
				$this.show();
			} else {
				$this.hide();
			}
			return;
		});
		
		$(".textarea").live("keyup",function(){
			
			var chkLength = 500;								//	입력 가능 글자수 지정
			var cntId = "#" + $(this).attr("id") + "Cnt";		//	글자수 보여줄 위치 아이디
			var keylength = $(this).val().length;				//	입력되어지고 있는 글자수
			
			if( keylength > chkLength ){
				var tempCont = $(this).val().substr(0, chkLength);
				alert("500글자까지 입력 가능합니다\n500자 초과 글자는 잘립니다!");
				$(this).val(tempCont);
				$(cntId).html(chkLength);
			} else {
				$(cntId).html(keylength);
			}
		});
	});

	/* talk, file, url */
	$(function() {
		
		$('.groupApp>.tab>a').click(function() {
			var idx = $('.groupApp>.tab>a').index(this);
			$(this).parent().find('a').removeClass('on').end().end().addClass('on');

			if ( $('.grCnt_Mod').hasClass("on") ) {
				$('.grCnt_Mod').removeClass("on").addClass('none');
				$('.grCnt_Mod').parent().empty();
				$(contModId).removeClass("none");
			}
			
			$('.grCnt').removeClass('on');
			$('.grCnt').eq(idx).addClass('on');
			$("iframe", parent.document).attr("height",$("#content").height());
			return;
		});
		

		$('.dataBox>.tab>a').click(function() {
			var idx = $('.dataBox>.tab>a').index(this);
			$(this).parent().find('a').removeClass('on').end().end().addClass('on');

			$('.grCnt').removeClass('on');
			$('.grCnt').eq(idx).addClass('on');
			$("iframe", parent.document).attr("height",$("#content").height());
			return;
		});

		//	url 자료등록시 썸내일 이미지 닫기 버튼!!!
		$('.pic .close').click(function() {
			//	$(this).parent().remove();
			$(this).parent().addClass("none");
		});
		
		
		//	file & url 입력박스 기본 안내 문구!!!
		//	var urlChkContVal = "업로드 자료와 관련된 추가 설명을 입력하세요";
		//	var urlChkSubjVal = "해당 링크 주소의 제목을 입력하세요";
		//	var fileChkContVal = "업로드 자료와 관련된 추가 설명을 입력하세요";
		//	var fileChkSubjVal = "업로드 파일의 제목을 입력하세요";
		
		var chkVal = "";
		var chkId = "";
		
		$("#urlContent,#urlSubject,#urlKeyword,#fileContent,#fileSubject,#fileKeyword").focus(function(){

			chkId = $(this).attr("id");
			
			if ( chkId == "urlContent" ) {
				chkVal = urlChkContVal;	
			} else if ( chkId == "fileContent" ) {
				chkVal = fileChkContVal;
			} else if ( chkId == "urlSubject" ) {
				chkVal = urlChkSubjVal;
			} else if ( chkId == "fileSubject" ) {
				chkVal = fileChkSubjVal;
			} else if ( chkId == "urlKeyword" ) {
				chkVal = urlChkKwVal;
			} else if ( chkId == "fileKeyword" ) {
				chkVal = fileChkKwVal;
			}
			
			var thisVal = $(this).val();
			if ( chkVal == $.trim( thisVal ) ) {
				$(this).val("");
			} 
		}).focusout(function(){
			
			chkId = $(this).attr("id");
			
			if ( chkId == "urlContent" ) {
				chkVal = urlChkContVal;	
			} else if ( chkId == "fileContent" ) {
				chkVal = fileChkContVal;
			} else if ( chkId == "urlSubject" ) {
				chkVal = urlChkSubjVal;
			} else if ( chkId == "fileSubject" ) {
				chkVal = fileChkSubjVal;
			} else if ( chkId == "urlKeyword" ) {
				chkVal = urlChkKwVal;
			} else if ( chkId == "fileKeyword" ) {
				chkVal = fileChkKwVal;
			}
			
			var thisVal = $(this).val();
			if ( $.trim( thisVal ) == "" ) {
				$(this).val(chkVal);
			} 
		});
		

		//	file & url 교과서 선택 번특 클릭시!!! 설정 pop up open
   		$("input:radio[name=fileEdu]").live("click",function(){
   			var chkVal = $(this).val();
   			if ( chkVal == "Y" ) {
   				//	$("#fileEducourseText").removeClass("none");
   				$("#fileEducourseBtn").removeClass("none");
   			} else {
   				$("#fileEducourseText").addClass("none");
   				$("#fileEducourseBtn").addClass("none");
   				$("#fileEducourseText").text("");
   				$("#fileEducourseId").val("999999");
   			}
   		});
		
		//	file & url 교과서 선택 번특 클릭시!!! 설정 pop up open
   		$("input:radio[name=urlEdu]").live("click",function(i){
   			var chkVal = $(this).val();
   			if ( chkVal == "Y" ) {
   				//	$("#urlEducourseText").removeClass("none");
   				$("#urlEducourseBtn").removeClass("none");
   			} else {
   				$("#urlEducourseText").addClass("none");
   				$("#urlEducourseBtn").addClass("none");
   				$("#urlEducourseText").text("");
   				$("#urlEducourseId").val("999999");
   			}
   		});

		//	file & url 수정폼 - 교과서 선택 번특 클릭시!!! 설정 pop up open
   		$("input:radio[name=contModEdu]").live("click",function(i){
   			var chkVal = $(this).val();
   			if ( chkVal == "Y" ) {
   				//	$("#contModEducourseText").removeClass("none");
   				$("#contModEducourseBtn").removeClass("none");
   			} else {
   				$("#contModEducourseText").addClass("none");
   				$("#contModEducourseBtn").addClass("none");
   				$("#contModEducourseText").text("");
   				$("#contModEducourseId").val("999999");
   			}
   		});

		//
		//
		//	file & url keyword 관련 스크립트 !!! : 시작
		//
		//
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		var keywordBtnVal = "";
		
		//	file & url keyword 선택 팝업 열기!!!
		$('.keywordBtn').live("click",function(){
			
			$("#keywordPop").attr("style","display:block");
			
			$("iframe", parent.document).attr("height","782");
			
			var thisObjId = $(this).attr("id");
			
			if ( thisObjId == "fileKeywordBtn" ) {
				keywordBtnVal = "fileKeywordBtn";
			} else if ( thisObjId == "urlKeywordBtn" ) {
				keywordBtnVal = "urlKeywordBtn";
			}
			

		//	popIf('keywordPop', 'myclass');

		});

		//	키워드 선택한 갯수 표시
		$("input[name=keyword]").live("click", function(i){
			
			var chkCnt = 0;
			
			$("input[name=keyword]:checked").each(function() {
				chkCnt++;
			});
			$("#chkKeywordCnt").html(chkCnt);
		});
		
		//	선택한 키워드 적용
		$("#appKeyWord").click(function(){
			
			var keyWordVal = "";

			$("input[name=keyword]:checked").each(function(idx) {
				if (idx == 0 ) {
					keyWordVal = $(this).val();
				} else {
					keyWordVal += ","+$(this).val();
				}
			});
			
			if ( keywordBtnVal == "fileKeywordBtn" ) {
				$("#fileKeyword").val(keyWordVal);
			} else if ( keywordBtnVal == "urlKeywordBtn" ) {
				$("#urlKeyword").val(keyWordVal);
			}
			$("#keywordPop").attr("style","display:none");
			
			$("iframe", parent.document).attr("height","470");
		});
		
		//	keyword 팝업 닫기 버튼
		$("#cancleKeyWord").click(function(){
			$("input[name=keyword]:checked").each(function() {
				$(this).attr("checked", false);
			});
			if ( keywordBtnVal == "fileKeywordBtn" ) {
				$("#fileKeyword").val("");
			} else if ( keywordBtnVal == "urlKeywordBtn" ) {
				$("#urlKeyword").val("");
			}
			$("#keywordPop").attr("style","display:none");
		});
		
		////////////////	file & url keyword 관련 스크립트 !!! : 종료!!!	////////////////
		
		
	});
	
	//	Talk 의견을 등록하기 전에 필수 조건을 체크한다.
	function regTalk() {
		
		var runProc = true;
		var talkContent = $.trim( $("#talkContent").val() );
		
		if ( talkContent == "" || talkContent == null ) {
			$("#talkContent").val("");
			$("#talkContent").focus();
			alert("의견을 작성하여 주세요");
			runProc = false;
			return;
		}
		
		if ( runProc ) {
			regTalkProc();
		}
	}
	
	//	Talk 의견을 등록하는 놈이다!!!
	function regTalkProc() {
		
		var fromMemberId = $("#fromMemberId").val();
		var toMemberId = $("#toMemberId").val();
		var talkContent = $.trim( $("#talkContent").val() );
		var talkOpenYN = $("#talkOpenYN").val();

		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/regTalkNew.do",
    		async : true,
    		cache : true,
    		dataType : "json",
    		data :  { fromMemberId : fromMemberId
    			    , toMemberId : toMemberId
    			    , talkOpenGubun : talkOpenYN
    			    , talkContent : talkContent
    			    , mediaGubun : mediaGubun
    			    , mediaId : mediaId
    			    , vivasamformat : "json" }, 
    		success : function(data){
    			if (data.code = '0000') {
    				location.reload();
    			} else {
    				alert("실패!!!");
    			} 
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
				$("iframe", parent.document).attr("height",$("#content").height());
			}        
		});
	}
	
	//	file 등록!!!
	//	file 은 form 으로 넘기긴다!!!!
	function myClassRegFile() {
		
		var runProc = true;
		
		//	등록 파일 검사!!!
		var chkExtVal = myClassTalkWirteIconExt( $.trim( $("#userFile").val() ) );
		var chkExtProc = true;
		//	swf, doc, xls, ppt, hwp, jpg, png, gif, pdf
		switch (chkExtVal) {
			case "swf" : chkExtProc = false; break;
			case "doc" : chkExtProc = false; break;
			case "xls" : chkExtProc = false; break;
			case "ppt" : chkExtProc = false; break;
			case "docx" : chkExtProc = false; break;
			case "xlsx" : chkExtProc = false; break;
			case "pptx" : chkExtProc = false; break;
			case "hwp" : chkExtProc = false; break;
			case "jpg" : chkExtProc = false; break;
			case "png" : chkExtProc = false; break;
			case "gif" : chkExtProc = false; break;
			case "pdf" : chkExtProc = false; break;
			default : chkExtProc = true;
		}
		
		if ( chkExtProc ) {
			
			var chkFile = $.trim( $("#userFile").val() );

			$("#userFile").val("");
			$("#filePath").val("");
			$("#userFile").focus();
			
			if ( chkFile == "" || chkFile == null ) {
				alert("저장 파일 정보는 필수항목 입니다.");	
			} else {
				alert("저장 가능한 확장자의 파일이 아닙니다.");
			}
			
			return;
		}
		var aaa = $("#userFile").val();
		var bbb = $("#filePath").val();
		//alert( aaa + "\n\n\n" + bbb );

		
		// 제목 검사!!!
		var chkSubject = $.trim( $("#fileSubject").val() );
		var chkSubjectBool = false;
		if ( chkSubject == "업로드 파일의 제목을 입력하세요") {
			chkSubjectBool = true;
		}
		
		if ( chkSubject == "" || chkSubject == null || chkSubjectBool ) {
			 $("#fileSubject").val("");
			 $("#fileSubject").focus();
			alert("업로드 파일의 제목을 입력하세요!\n제목은 필수 입력 항목입니다.");
			return;
		}
		
		// 키워드 검사!!
		if ( fileChkKwVal == $.trim( $("#fileKeyword").val() ) ) {
			$("#fileKeyword").val("");
		}
		
		//	입력한 내용이 없을경우 
		if ( fileChkContVal == $.trim( $("#fileContent").val() ) ) {
			$("#fileContent").val("");
		}
		
		if (runProc) {
			$("#fileFrm").submit();
		}
	}

    $(document).ready(function(){
    	// file 등록을 위해서 form 값을 넘기는 부분이다!!!!
		$("#fileFrm").ajaxForm({
			dataType : "json",
			success : function(data){
				
	               if(data.code == "0000"){
	                   alert("등록되었습니다.");
	                // iframe 에 비바샘에 있는 html을 호출해서 crossDomain 회피(스마트교안서버의 스크립트 호출)
	                   var target_url = p_domain + "/editor/crossDomainProc.do";
	                   $("#pop3").attr("src", target_url);
	                   
	               }else{
	                   if((data.code == "1001") || (data.code == "1002")){
	                       alert(msg);
	                   }else{
	                       alert("등록에 실패하였습니다.");
	                   }
	               }
	               
			},
			error : function(jqXHR, textStatus, errorThrown){
        	},
        	complete : function(){
				//$("iframe", parent.document).attr("height",$("#content").height());
        	}
		});
    });
	
	//	url 자료 등록!!!
	function regUrl() {

		var runProc = true;
		
		if ( !urlSearchBool ) {
			alert("URL 주소 우측의 \"URL 확인\" 버튼을 클릭해서 확인을 해주세요.");
			return;
		} else {
			if ( tempUrl != "" && urlSearchBool ) {
				var chkUrl = $.trim( $("#urlAddr").val() );
				if ( tempUrl != chkUrl ) {
					urlSearchBool = false;
					runProc = false;
					alert("입력된 주소가 변경되었습니다.\n\nURL 주소 우측의 \"URL 확인\" 버튼을 클릭해서 확인을 해주세요.");
					return;
				}
			}
		}
		
		//	URL 검사!!!
		var urlAddr = $.trim( $("#urlAddr").val() );
		if ( urlAddr == "" || urlAddr == null ) {
			$("#urlAddr").val("");
			$("#urlAddr").focus();
			urlSearchBool = false;
			runProc = false;
			alert("등록할 사이트 주소를 입력하세요");
			return;
		}

		// 제목 검사!!!
		var chkSubject = $.trim( $("#urlSubject").val() );
		var chkSubjectBool = false;
		if ( chkSubject == "해당 링크 주소의 제목을 입력하세요") {
			chkSubjectBool = true;
		}
		
		if ( chkSubject == "" || chkSubject == null || chkSubjectBool ) {
			$("#urlSubject").val("");
			$("#urlSubject").focus();
			runProc = false;
			alert("링크 주소의 제목을 입력하세요!\n제목은 필수 입력 항목입니다.");
			return;
		}
		
		//	키워드 검사!!
		if ( urlChkKwVal == $.trim( $("#urlKeyword").val() ) ) {
			$("#urlKeyword").val("");
		}

		//	입력한 내용이 없을경우 
		if ( urlChkContVal == $.trim( $("#urlContent").val() ) ) {
			$("#urlContent").val("");
		}
		
		if ( runProc ) {
			//	alert("runProc");
			regUrlProc();
		}
	}
	
	function regUrlProc() {
		
		var fromMemberId	= $("#fromMemberId").val();
		var toMemberId		= $("#toMemberId").val();
		var urlAddr			= $("#urlAddr").val();
		var urlImgAddr		= $("#urlImgAddr").val();
		var urlSubject		= $.trim( $("#urlSubject").val() );
		var urlEducourseId	= $("#urlEducourseId").val();
		var urlKeyword		= $("#urlKeyword").val();
		var urlContent		= $.trim( $("#urlContent").val() );
		var urlOpenYN		= $("#urlOpenYN").val();
		var urlFolderId		= $("#urlFolderId").val();

		//	입력한 내용이 없을경우 
		if ( urlChkContVal == urlContent ) {
			$("#urlContent").val("");
		}
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/regUrlContent.do",
    		async : true,
    		cache : true,
    		dataType : "json",
    		data :  { fromMemberId : fromMemberId
    			    , toMemberId : toMemberId
    			    , urlAddr : urlAddr
    			    , urlImgAddr : urlImgAddr
    			    , urlSubject : urlSubject
    			    , urlEducourseId : urlEducourseId
    			    , urlKeyword : urlKeyword
    			    , urlContent : urlContent
    			    , urlOpenYN : urlOpenYN
    			    , urlFolderId : urlFolderId
    			    , vivasamformat : "json" }, 
    		success : function(data){
    			
	               if(data.code == "0000"){
	                   alert("등록되었습니다.");
	                // iframe 에 비바샘에 있는 html을 호출해서 crossDomain 회피(스마트교안서버의 스크립트 호출)
	                   var target_url = p_domain + "/editor/crossDomainProc.do";
	                   $("#pop3").attr("src", target_url);
	                   
	               }else{
	                   if((data.code == "1001") || (data.code == "1002")){
	                       alert(msg);
	                   }else{
	                       alert("등록에 실패하였습니다.");
	                   }
	               }
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
				//$("iframe", parent.document).attr("height",$("#content").height());
			}        
		});
	}
	
	//	url 등록전 검사!!!
	var urlSearchBool = false;
	var tempUrl = "";
	
	function urlSearch() {
		
		var url = $.trim( $("#urlAddr").val() );
		
		if(url == ""){
			alert("URL을 입력해주세요");
			$("#urlAddr").focus();
			$("#urlAddr").val("");
		}else{
			// 사용자가 입력한 url 앞에 http://가 붙어있는지 확인하고 없으면 이를 붙여준다
			if(url.indexOf("http://") == -1){
				url = "http://" + url;
				$("#urlAddr").val(url);
			}
			$.post(CONTEXTPATH + "/common/htmlScraping.do",
					{url : url, vivasamformat : "json"},
					function(data){
						var setUrlImg = $.trim( data.imgurl );
						var setUrlSubject = data.title;
						var setUrl = data.url;
						var content = data.content;
						
						$("#urlSubject").val(setUrlSubject);				//	사이트 제
						
						if(setUrl.indexOf("http://") == -1){
							setUrl = "http://" + setUrl;
						}
						
						$("#urlAddr").val(setUrl);				//	사이트 주
						tempUrl = setUrl;						//	URL 등록할때 검사확인후 변경되었는지 검증용이다!!!

						$("#urlContent").text(content);					//	사이트 설

						// 사이트 이미지 관련 처리!!!
						if ( setUrlImg == "" || setUrlImg == null ) {
							$("#url_up_data_view_layer").attr("style","display:none");
							if ( !$(".pic").hasClass("none") ) {
								$(".pic").addClass("none");			// 썸네일 이미지 삭제 버튼이 보이도록 한다
							}
						} else {	//	이미지 주소가 있을때!!!!
							$("#url_up_data_view_layer").attr("style","display:block");
							$(".pic").removeClass("none");			// 썸네일 이미지 삭제 버튼이 보이도록 한다
						}

						$("#urlImg").attr("src", setUrlImg);
						$("#urlImgAddr").val(setUrlImg);
						
						urlSearchBool = true;		//	 url 검사를 했는지 확인한다!!!
					},
					"json"
			);
		}
	}
	
	//	talk & file & url 컨텐츠 공개 비공개 구분 : 기본은 비공개 이다!!!!
	function openYN( typeId ) {
		
		//	talkOpenYN, fileOpenYN, urlOpenYN
		
		var src = "";
		var objId = "#" + typeId;
		var objId_Img = objId + "_Img";
		
		if ( $(objId).val() == "N" ) {
			$(objId).val("Y");
			src = IMG_PATH + "/common/button/btn_open.gif";
		} else {
			$(objId).val("N");
			src = IMG_PATH + "/common/button/btn_closed.gif";
		}

		$(objId_Img).attr("src",src);
	}

    
	//	파일 확장자를 이용해서 해당 파일 icon 매칭하기 
	function myClassTalkWirteIconExt( saveFileName ) {
		
		var saveFileName = $.trim(saveFileName);
		
		if (saveFileName == '') {
			result = 'link';
		} else {
			var iconName = saveFileName.split('.');
			var iconLength = iconName.length;
			result = iconName[iconLength-1].toLowerCase();
		}
		return result;
	}
	
	function dellUrlImg() {
		$("#urlImgAddr").val("");
	}