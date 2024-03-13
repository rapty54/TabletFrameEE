	
	var vStatusFlag = false;
    var isLogging = false;
    var isPopPlus = false;
	var isReqStatus = false; //모달팝업 관련 전역변수
	
	function callDown(type, keyVal)
	{
		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}

	    var width   = 700;
	    var height  = 510;
	    
	    var left    = (screen.width  - width)/2;
	    var top    = (screen.height - height)/2;
	    //var url = "https://www.vivasam.com/file/download/dext.popup";
		/*
			2023-02-28 강남구
			다운로드 기능 변경 -> 팝업 -> 즉시 다운로드
		*/
		if(type == 'url'){
			downloadClient(keyVal);
		}else {
			var fileList = keyVal.split(",");
			for (var i = 0; i < fileList.length; i++) {
				var contentGubun = fileList[i].split("-")[0];
				var contentId = fileList[i].split("-")[1];
				$.ajax({
					type: "POST",
					url: CONTEXTPATH + "/common/content.do",
					cache: false,
					async: false,
					dataType: "json",
					data: {contentGubun: contentGubun, contentId: contentId, vivasamformat: "json"},
					success: function (data) {
						var href = window.globals.siteCdnDomain + data.filePath + data.saveFileName;
						downloadClient(href);
					},
					error: function (xhr, ajaxOptions, thrownError) {//
					},
					complete: function (xhr, textStatus) {
					}

				});
			}
		}
		/*
		var url = window.globals.siteUrlCommon + '/file/download/dext.popup';
		var newWindow = "";

		if(isIE()){
			window.open("/down/vivasamdownNew.do?files=" + type+","+keyVal + "&ufiles=''", "downloadwin", "left="+left+",top="+top+",width="+width+", height="+height+",scrollbars=no,toolbar=no,resizable=no,location=no");
		}else{
			newWindow = window.open("/fountain_html/autoReload.html", "downloadwin", "left="+left+",top="+top+",width="+width+", height="+height+",scrollbars=no,toolbar=no,resizable=no,location=no");
			if (!newWindow) return false;

			var html = "";
			html += "<html><head></head><body><form id='formid' method='post' action='" + url +"'>";
			html += "<input type='hidden' name='files' value='" + type+","+keyVal + "'/>";
			html += "<input type='hidden' name='ufiles' value=''/>";

			html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc"+"ript></body></html>";


			newWindow.document.write(html);
			return newWindow;
		}
		*/
	}

	// 파일 다운로드 a tag 붙이기 & 다운로드
	function downloadClient(href){
		//직접 다운로드 처리
		if (href.indexOf('soobakc.com') > -1 || href.indexOf('VisangUpload') > -1 || href.indexOf('vivasamfiledir') > -1) {
			if($("iframe[id='down_iframe']").length){
				$("iframe[id='down_iframe']").remove();
			}
			var url = '/common/vivasamUrlDownload.do?saveFileName='+href;
			var html = "<iframe id=down_iframe' style='display:none;' src='"+url+"'></iframe>";
			$("body").append(html);
		}else {
			var a = document.createElement("a"); // a 태그 create
			a.href = href
			document.body.appendChild(a);
			a.click();
			sleep(300);
			document.body.removeChild(a);
		}
	}
	function sleep(ms) {
		const wakeUpTime = Date.now() + ms;
		while (Date.now() < wakeUpTime) {}
	}
	
	$(document).ready(function() {

			//LOGIN_ID는 vivasam_common.jsp에 정의되어 있음
	    	if ("${LOGIN_ID}" != "") {
	    		//로그인한 사용자의 폴더목록 조회
	        	getFolderList();	
	    	}
		
	});


    
    /**
     * 작 업 자 : 임재근
     * 주석작성자 : 김남배
     * 주석작성일 : 2014.01.14
     * 내    용 : 파일다운로드 호출 함
     *           멀티다운로드 - LG에서 제공한 멀티다운로드 ActiveX 를 이용하여 구현된것 호출 (IE7에서만 지원함)
     *           단일다운로드 - Java에서 다운로드 기능 구현된것 호
     */
    function go_DownloadFileAll(type, keyVal){
    	
        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다!');
            return;
        }
        else {
			// 필수정보 누락시 알럿알림 후 개인정보 수정 유도 ( 학교정보 없을 시)
			if(SCH_NAME == ''){
				alert("자료 다운로드는 개인정보 입력 후 가능합니다.\n자료는 ‘학교 및 교육기관의 수업’ 목적을 위해서만\n한정하여 사용되도록 저작권법의 보호를 받고 있습니다.");
				if(opener){
					opener.	location.href = '/myinfo/myinfoModify.do';
					window.close();
				}else{
					var isInIframe = (window.location != window.parent.location);
					if(isInIframe == true){
						// iframe 일 경우
						parent.location.href = '/myinfo/myinfoModify.do';
					}else{
						// iframe 아닐 경우
						location.href = '/myinfo/myinfoModify.do';
					}
				}
				return;
			}
			
     	   // 	var msg = '';
            // msg = "다운로드하시는 자료는 '학교 및 교육기관의 수업' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.\n수업 외의 목적으로 사용되지 않도록 주의 부탁드립니다.";
            //
            // alert(msg);
 	   }

        var Arr_keyVal = keyVal.split(",");
        
        // 여려개를 선택해서 다운로드 받는 경우 익스플로어가 아닌경우에 경고문구 처리
        if(Arr_keyVal.length > 1 && fnMobile()){
        	/**
        	* 수 정 자 : 심원보 (2013.12.30)
        	* 주석작성자 : 김남배
        	* 주석작성일 : 2014.01.14
        	* 내    용 : IE11 버젼이 출시되면서 브라우져 체크하는 방법이 변경되어 추가한 내역임
        	*           IE6~10 : $.browser.msie 로 체크
        	*           IE11 : isIE() 에서 체크
        	*/
        	
        	if (fnMobile())
        	{
        	    alert("복수 파일 다운로드는 PC에서만 지원합니다.");
        		return;
        	}
        	
        	if(isIE()) {
        		callDown(type, keyVal);
                
            }else{
                alert("복수 파일 다운로드는 인터넷 익스플로러에서만 지원합니다.");
            }
        }else{
        	callDown(type, keyVal);
            
        }

    }    
    
    function go_DownloadFile(type, keyVal){
    	
       if("${LOGIN_ID}" == ''){
           alert('로그인이 필요한 서비스입니다!');
           location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
           return;
       }
       else {
			// 필수정보 누락시 알럿알림 후 개인정보 수정 유도 ( 학교정보 없을 시)
			if(SCH_NAME == ''){
				alert("자료 다운로드는 개인정보 입력 후 가능합니다.\n자료는 ‘학교 및 교육기관의 수업’ 목적을 위해서만\n한정하여 사용되도록 저작권법의 보호를 받고 있습니다.");
				if(opener){
					opener.	location.href = '/myinfo/myinfoModify.do';
					window.close();
				}else{
					var isInIframe = (window.location != window.parent.location);
					if(isInIframe == true){
						// iframe 일 경우
						parent.location.href = '/myinfo/myinfoModify.do';
					}else{
						// iframe 아닐 경우
						location.href = '/myinfo/myinfoModify.do';
					}
				}
				return;
			}
    	   
    	   // var msg = '';
           // msg = "다운로드하시는 자료는 '학교 및 교육기관의 수업' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.\n수업 외의 목적으로 사용되지 않도록 주의 부탁드립니다.";
           //
           // alert(msg);
	   }

       var Arr_keyVal = keyVal.split(",");
       
       // 여려개를 선택해서 다운로드 받는 경우 익스플로어가 아닌경우에 경고문구 처리
       if(Arr_keyVal.length > 1 && fnMobile()){
       /**
       	* 수 정 자 : 심원보 (2013.12.30)
       	* 주석작성자 : 김남배
       	* 주석작성일 : 2014.01.14
       	* 내    용 : IE11 버젼이 출시되면서 브라우져 체크하는 방법이 변경되어 추가한 내역임
       	*           IE6~10 : $.browser.msie 로 체크
       	*           IE11 : isIE() 에서 체크
       */ 
    	   
    	   if (fnMobile())
	       	{
	       	    alert("복수 파일 다운로드는 PC에서만 지원합니다.");
	       		return;
	       	}
    	   
    	   if(isIE()) {
    		   callDown(type, keyVal);
               
               
           }else{
               alert("복수 파일 다운로드는 인터넷 익스플로러에서만 지원합니다.");
           }
       }else{
    	   callDown(type, keyVal);
         
       }

   	}
    
    //20170809, 비바샘 로그인 상태 체크(서버값)
    function loginStateCheck() {
    	var flag; 
    		
    	$.ajax({
			type : "POST",
			url : "/doCheckLogin.do",
			cache : false,
			async : false,
			dataType : "json",
			data : {
				val1 : '',
				vivasamformat : "json"
			},
			success : function(data) {
				if (data == "FALSE") {
					//로그인 비유지 상태
					flag = false; 
				}
				else {
					//로그인 유지 상태
					flag = true;
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {//
				flag = false;
			},
			complete : function(xhr, textStatus) {
			}
		});
    	
    		return flag;
    }

    function _isChecked(id){
        
        var checkeditems = $("input[name='check" + id + "']:checked");
        var checkeditemslength = checkeditems.length;
        
        if(checkeditemslength == 0){
            return false;
        }else{
            return true;
        }   
    }

    //########################################## 담기 기능 스크립트 #######################################################
    /**
     * 선택한 파일 담기 popup open 
     * goUrl 은 educourse.js 상단에 정의됨.
     */
    function insertFolder(pId, loc, type){
        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다!');
            location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
            return;
        }
        
        if(type == 'single') {
        	viewFolder2015(pId, loc); 
        	
        	//pop_open('savePostionsetPop', pId);
        	//$("#savePositionsetPop > pop1SelVal").val(pId);
        }else{
            var keyVal = "";
            if( _isChecked(pId) ){
                // 선택한 컨텐츠의 키값 연결 
                var len =$('input[name=check'+pId+']:checked').length;
                $('input[name=check'+pId+']:checked').each(function(index){
                    if ( index == len-1 ) {
                        keyVal += $(this).val();
                    } else {
                        keyVal += $(this).val()+",";
                    }
                });
                
                viewFolder2015(keyVal, loc); 
                
                // 1. 폴더 팝업 레이어 열기 incHeader.jsp 에 있다.
                //pop_open('savePostionsetPop', keyVal);
                // 팝업 히든 필드에 선택한 키값 넣어줌 
                //$("#savePositionsetPop > pop1SelVal").val(keyVal);
            }else{
                alert('자료를 먼저 선택해 주세요. ');
            }
        }

    }
    
    /**
     * 선택한 파일 담기 popup open 
     * goUrl 은 educourse.js 상단에 정의됨.
     */
    function insertFolderMove(pId, loc, type){
        if("${LOGIN_ID}" == ''){
            alert('로그인이 필요한 서비스입니다!');
            location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
            return;
        }
        
        //multi 형식으로만 처리됨
        if(type == 'single') {
        	viewFolderMove(pId, loc); 
        	
        	//pop_open('savePostionsetPop', pId);
        	//$("#savePositionsetPop > pop1SelVal").val(pId);
        }else{
            var keyVal = "";
            var folderId = "";
            
            if( _isChecked(pId) ){
            	var count = 0;
            	var len = $('input[name=check'+pId+']:checked').length;

            	$("input[name=check"+pId+"]:checkbox").each(function(index){
        	   		if ( $(this).attr("checked") == "checked") {
        	   			folderId = $("input[name=folderId]").eq(index).val();

        	   			count++;
        	   			
        	   			if ( len == count) {
                            keyVal += folderId + "-" + $(this).val();
                        } else {
                            keyVal += folderId + "-" + $(this).val()+",";
                        }
        	   		}
        	   	});
                
                viewFolderMove(keyVal, loc); 
            }else{
                alert('자료를 먼저 선택해 주세요. ');
            }
        }

    }
    
    var FIDLIST  = "";
	var LNBPOS = "";
	function FolderappendOption(objname,code,val)
	{
		   
		   $("#"+objname).append("<option value='"+ code +"'>"+ val +"</option>");
				   
	}

	function end2015(val)
	{
		if(val=="1")
		{
			$('#folderData').hide(0);
		} else {
			
			$('#confirmPutData').hide(0);
		}
		
	}
	
	function FolderclearOption(objname)
	{
		   $("#"+objname).html("");
	}

	function addFolderST12015()
	{
		if (document.getElementById("newName1").style.display == "none")
		{
			document.getElementById("newName1").style.display = "";
			document.getElementById("newName2").style.display = "";
			
			document.getElementById("newName0").style.display = "none";
		}
		else {
			
			document.getElementById("newName0").style.display = "";
			
			document.getElementById("newName1").style.display = "none";
			document.getElementById("newName2").style.display = "none";	
			
			$("#newName").val(""); //디폴트 메세지
		}
	}
	
	function addFolderST22015()
	{
		//폴더  / 분류 추가 
		if("${LOGIN_ID}" == ''){
	        alert('로그인이 필요한 서비스입니다!');
	        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
	        return;
	    }
		
		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}
		
		if($("#newName").val() == "" || $("#newName").val() == "한글, 영문 포함 10자 이내")
		{
			alert("분류명을 입력해주세요");
			$("#newName").focus();
			return;
		}

		$.ajax({
	        type: "POST",
	        url: "/common/folderList2015.do",
	        cache: false,
	        async: false,
	        dataType: "json",
	        data: {channel : "folderMake" , code1 : $("#newName").val()  ,  vivasamformat : "json"},
	        success: function(data){
	        	if (LNBPOS == "move") {
	        		viewFolderMove(FIDLIST);
	        	}
	        	else {
	        		viewFolder2015(FIDLIST);
	        	}
	        	
	        	addFolderST12015();
	        	document.getElementById("folder2015").value = data[0].code;
	        },
	        error: function (xhr, ajaxOptions, thrownError){//
	        	
	        }, 
	        complete:function (xhr, textStatus){
	        	
	        }         
        });    
		
	}
	
	function addFolderST32015(channel)
	{
		//담기 실행.
		//폴더  / 분류 추가 
		if("${LOGIN_ID}" == ''){
	        alert('로그인이 필요한 서비스입니다!');
	        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
	        return;
	    }
		
		// 교사 인증체크
		var loginChk = loginStateCheck("certify");
		if (loginChk == "fail") {
			return;
		}
		
		//위치 이동하려고 선택한 자료수
		var putDataCount = FIDLIST.split(",").length;
		var selectChannel = (channel == "" ? "addfolderContent" : "addfolderContentMove");
		
		$.ajax({
	        type: "POST",
	        url: "/common/folderList2015.do",
	        cache: false,
	        async: false,
	        dataType: "json",
	        data: {channel : selectChannel, code1 : document.getElementById("folder2015").value , code2 :  FIDLIST , code3 : LNBPOS , vivasamformat : "json"},
	        success: function(data){
	        	
	        	//메세지 레이어 박스의 안내 메세지 초기화
	        	$("#myPutDatacomment").html("'담은 자료'에 자료가 추가되었습니다.");
	        	
	        	if (selectChannel == "addfolderContent") {
	        		//담으려는 자료수와 담겨져 있는 자료가 같은 경우
	        		if (data[0].code == "DUPL" && putDataCount == Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이미 나의 교실에 자료가 담겨져 있습니다.</span>");
	        		}
	        		else if (data[0].code == "DUPL" && putDataCount > data[0].name) {
	        			$("#myPutDatacomment").html("<span>이미 담겨진 자료를 제외한 " + (putDataCount - data[0].name) + "건의 자료가 담겼습니다.</span>");
	        		}
	        		else {
	        			//선택한 모든 자료가 새롭게 담긴 경우
	        		}
	        	}
	        	//나의 교실 > 담은 자료 > 자료 위치 이동 기능 처리시 호출
        		else if (selectChannel == "addfolderContentMove") {
        			//alert(putDataCount + " | " + data[0].name);
        			//이동하려는 자료수와 이동하고자 하는 분류에 담겨져 있는 자료가 같은 경우
	        		if (data[0].code == "DUPL" && Number(putDataCount) == Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이동하려는 분류에 이미 자료가 담겨져 있습니다.</span>");
	        			
	        			$("#myPutDataMove").hide();
	        		}
	        		else if (data[0].code == "DUPL" && putDataCount > Number(data[0].name)) {
	        			$("#myPutDatacomment").html("<span>이미 담겨진 자료를 제외한 " + (putDataCount - Number(data[0].name)) + "건의 자료가 이동되었습니다.</span>");
	        			
	        			$("#myPutDataMove").hide();
	        			$("#myPutDataClose").attr("href", "/myclass/myPutDataList.do?folderId=" + document.getElementById("folder2015").value);
	        		}
	        		else {
	        			//선택한 모든 자료가 이동된 경우 
	        			$("#myPutDatacomment").html("<span>자료의 위치가 이동되었습니다.</span>");
	        			
	        			$("#myPutDataMove").hide();
	        			$("#myPutDataClose").attr("href", "/myclass/myPutDataList.do?folderId=" + document.getElementById("folder2015").value);
	        		}
        		}
	        	
	        	$('#folderData').hide(0);
        		$('#confirmPutData').show(0);
	        },
	        error: function (xhr, ajaxOptions, thrownError){//
	        	
	        }, 
	        complete:function (xhr, textStatus){
	        	
	        }         
        });

		
	}
	
	// ids : contentGubun-contentId,contentGubun-contentId   <-- 요형식으로...  
	//담기 레이어 팝업에 자료명 뿌리기
	function viewFolder2015(idList,lnbPos)
	{
			FIDLIST = idList;
			LNBPOS = lnbPos;
			
		 	if("${LOGIN_ID}" == ''){
		        alert('로그인이 필요한 서비스입니다!');
		        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
		        return;
		    }
		 	
		 	// 교사 인증체크
			var loginChk = loginStateCheck("certify");
			if (loginChk == "fail") {
				return;
			}
			
			var idListCnt = 1;
			//자료명
			idList = "S,"+idList;
			var _code = idList.split(",")[1];
			idListCnt = idList.split(",").length-2;
			
			var oID =  _code.split("-")[1];
			var oGUBUN =  _code.split("-")[0];
			
		
		    $.ajax({
		        type: "POST",
		        url: "/common/folderList2015.do",
		        cache: false,
		        async: false,
		        dataType: "json",
		        data: {channel : "folderlist" , code1 : oID ,code2 : oGUBUN ,  vivasamformat : "json"},
		        success: function(data){

		        	if (idListCnt==0) {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span>");
		        	} else  {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span> 외 " + idListCnt + "건");	
		        	}

		        	FolderclearOption("folder2015");		        	
		        	for (var i=1;i < data.length;i++)
		        	{
		        		FolderappendOption("folder2015",data[i].code,data[i].name);	
		        	}
		        	$('#folderData').show(0);
		        	  		  
		        },
		        error: function (xhr, ajaxOptions, thrownError){//
		        	
		        }, 
		        complete:function (xhr, textStatus){
		        	
		        }         
	        });    
		
	}
	
	//나의 교실 > 자료 관리 > 담은 자료 메뉴에서 위치이동시 호출, 심원보
	//담기 레이어 팝업에 자료명 뿌리기
	function viewFolderMove(idList,lnbPos)
	{
			FIDLIST = idList; //folder ID정보도 포함되어 있음(contentGubun, contentId 외에)
			LNBPOS = lnbPos;
			
		 	if("${LOGIN_ID}" == ''){
		        alert('로그인이 필요한 서비스입니다!');
		        location.href = CONTEXTPATH + "/member/login.do?goURL=" + encodeURIComponent($("#loginFrmPop input[name=goURL]").val());
		        return;
		    }
		 	
		 	// 교사 인증체크
			var loginChk = loginStateCheck("certify");
			if (loginChk == "fail") {
				return;
			}
		 	
			var idListCnt = 1;
			//자료명
			idList = "S,"+idList;
			var _code = idList.split(",")[1];
			idListCnt = idList.split(",").length-2;
			
			var oID =  _code.split("-")[2];
			var oGUBUN =  _code.split("-")[1];
			var folderId =  _code.split("-")[0];
			
			//alert(oGUBUN + " | " + oID + " | " + folderId);
		
		    $.ajax({
		        type: "POST",
		        url: "/common/folderList2015.do",
		        cache: false,
		        async: false,
		        dataType: "json",
		        data: {channel : "folderlist" , code1 : oID, code2 : oGUBUN, vivasamformat : "json"},
		        success: function(data){

		        	if (idListCnt==0) {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span>");
		        	} else  {
		        		$("#contentTitle").html("<span id=\"metaname\">" + data[0].name + "</span> 외 " + idListCnt + "건");	
		        	}
		        	
		        	FolderclearOption("folder2015");		        	
		        	for (var i=1;i < data.length;i++)
		        	{
		        		FolderappendOption("folder2015",data[i].code,data[i].name);	
		        	}
		        	
		        	//기존 onclick 이벤트 함수를 지정한 형식으로 변경함.
		        	//나의 교실 > 자료 관리 > 담은 자료 메뉴에서 위치이동할 경우 최종 확인클릭시 호출, 심원보
		        	$("#addFolderContentId").attr('onclick', '').unbind('click');
		        	$("#addFolderContentId").bind("click", function(){
		        		addFolderST32015("addfolderContentMove");
			        });
							        	
		        	
		        	$('#folderData').show(0);
		        	  		  
		        },
		        error: function (xhr, ajaxOptions, thrownError){//
		        	
		        }, 
		        complete:function (xhr, textStatus){
		        	
		        }         
	        });    
		
	}
    
	//########################################## 담기 기능 스크립트 #######################################################

    //파일 다운로드 
    function downloadFile(pId, type){
     if(type == 'single'){
         go_DownloadFile("ID", pId);
     }
     else{
         
         var keyVal = "";
         
         if( _isChecked(pId) ){
             // 선택한 컨텐츠의 키값 연결 
             var len =$('input[name=check'+pId+']:checked').length;
             $('input[name=check'+pId+']:checked').each(function(index){
                     if ( index == len-1 ) {
                         keyVal += $(this).val();
                     } else {
                         keyVal += $(this).val()+",";
                     }
             });
             
             go_DownloadFile("ID", keyVal);
             
         }else{
             alert('자료를 먼저 선택해 주세요. ');
         }
     }
    }


    /*********************************** 사용자 폴더 및 담기 *******************************************************/
   	/**
     * 사용자의 폴더 목록 조회
     */
    function getFolderList(selId){
		return false;
         if(selId == undefined){
         	selId = '';
         }

         $.ajax({
             type: "POST",
             url: "/common/getFolderList.do",
             cache: false,
             async: true,
             dataType: "json",
             data: {  vivasamformat : "json" },
             success: function(data){
                 var code = data.code;
                 var message = data.msg;
                 var result = data.result;
                 var html = "";
                 var html2= "";

                 if(code == '0000'){

                 	if(result.length > 0){
                         for(var i =0; i < result.length; i ++){
                             var folderId = result[i].folderId;
                             var folderName = result[i].folderName;
                             var pFolderId = result[i].pFolderId;

                             if(selId == ''){ // 내자료홈 디폴트
                                 if(pFolderId == "0"){
                                     $("#p_selFolderId").val(folderId); // 디폴트 폴더 선택은 루트로
                                     $("#p_rootId").val(folderId);
                                     html += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this , 'move');\">"+folderName+"</span>";
                                 }else{
                                     html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }
                             }else{
                                 if(pFolderId == "0"){
                                 	$("#p_selFolderId").val(selId); // 디폴트 폴더 선택은 넘어온 폴더아이디로
                                     $("#p_rootId").val(folderId);
                                     html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }else if(selId == folderId){
                                 	html += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this , 'move');\">"+folderName+"</span>";
                                 }else{
                                 	html += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'move');\">"+folderName+"</span></div>";
                                 }


                             }


                         }
                 	}

                     $("#myFolderDiv").html(html);

                     if(result.length > 0){
                         for(var i =0; i < result.length; i ++){
                             var folderId = result[i].folderId;
                             var folderName = result[i].folderName;
                             var pFolderId = result[i].pFolderId;

                             if(pFolderId == "0"){
                                 $("#p_selFolderId").val(folderId); // 디폴트 폴더 선택은 루트로
                                 html2 += "<a href=\"javascript:void(0)\"  class=\"folder on\"></a><span contenteditable=\"false\" id=\"f1\" class=\"on\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this ,'save');\">"+folderName+"</span>";
                             }else{
                             	html2 += "<div class=\"deps1\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"f1\" onClick=\"javascript: selFolder('"+folderId+"', '"+folderName+"', this, 'save');\">"+folderName+"</span></div>";
                             }
                         }
                     }

                     $("#saveFolderDiv").html(html2);


                 }
             },
             error: function (xhr, ajaxOptions, thrownError){
            //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
             },
             complete:function (xhr, textStatus){
      //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
             }
       	});
    }
    
    //담기위치 설정에서의 새폴더 생성
    function addSingleFolder(){
    	if($("#newDiv").length >0 ){
    		alert('새폴더 생성은 하나씩 가능합니다.');
    		return;
    	}
    	$("span[id^='f1']").removeClass("on");


    	//var newF = "<div class=\"deps1\" id=\"newDiv\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span contenteditable=\"false\" id=\"nFolderSpan\"><input type=\"text\" name=\"nFolderNm\" id=\"nFolderNm\"  value=\"새 폴더\"/></span></div>";
    	var newF = "<div class=\"deps1\" id=\"newDiv\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span id=\"nFolderSpan\"><input type=\"text\" name=\"nFolderNm\" id=\"nFolderNm\" value=\"새 폴더\">&nbsp;<a href=\"javascript:makeFolder()\"><img src=\"" + IMG_DOMAIN + "/images/common/button/btn_ok.png\"></a></span></div>";
    	$("#myFolderDiv").append(newF);
    	$("#nFolderNm").focus();
    }
    
    // 저장폴더선택
    function selFolder(id, name,  obj, type){
    	$("span[id^='f1']").removeClass("on");

    	$(obj).addClass("on");
    	if(type == 'move'){
    		$("#p_selFolderId").val(id);
    	}else{
    		$("#p3_selFolderId").val(id);
    		$("#p3_selFolderName").val(name);
    	}

    }
    
    // 저장폴더 레이어닫기
    function cancelFolderContents(type){
    	if(type == 'move'){
    	      $("span[id^='f1']").removeClass("on");
    	        $("#p_selFolderId").val('');
    	        $("#p_savePostionsetPop").val('');
    	        $("#p_type").val('');

    	        $("#savePostionsetPop").hide();
    	}else{
    	      $("span[id^='f1']").removeClass("on");
    	        $("#p3_selFolderId").val('');
    	        $("#p3_selFolderName").val('');

    	        $("#saveFolderPop").hide();
    	}

    }

    // 선택 폴더 저장폴더로 이동
    function selectFolder(){
    	$("#p3_folderid").val($("#p3_selFolderId").val())
    	$("#p3_foldernm").text($("#p3_selFolderName").val());
    	cancelFolderContents('save');
    }

    // 저장폴더에 컨텐츠 담기
    function insertFolderContents(){
    	var type = $("#p_type").val();
    	var folderId = $("#p_selFolderId").val();
    	if(folderId == ''){
    		alert('저장하실 폴더를 선택해 주십시오.');
    		return;
    	}
    	var param = $("#p_savePostionsetPop").val();

	       $.ajax({
	           type: "POST",
	           url: CONTEXTPATH  + "/mydata/moveFolder.do",
	           cache: false,
	           async: true,
	           dataType: "json",
	           data: { insertType: 'I' , folderId: folderId, targetFolderId: '', contentsData: param, vivasamformat : "json" },
	           success: function(data){
	               var code = data.code;
	               var message = data.msg;
	               var result = data.result;

	               if(code == '0000'){
	                   alert('저장 되었습니다');
	                   $("#p_selFolderId").val('');
	                   $("#p_savePostionsetPop").val('');
	                   $("#p_type").val('');
	               }else{
	               }
	           },
	           error: function (xhr, ajaxOptions, thrownError){
	          //     alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	               vStatusFlag = false;
	           },
	           complete:function (xhr, textStatus){
	    //           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	               vStatusFlag = false;
	               $("#savePostionsetPop").hide();

	           }
	           });
    }
    
    //	2013.09.13 : eoraptor
    //	새 폴더 만들기 : 함수!!!
    //	기존 로직을 분리해서 함수로 만들었다!
    //	기존에는 엔터키 이벤트를 받아서 작동하도록 되어있던 부분이다!!!
    function makeFolder() {

    	var nFolderNm = $("#nFolderNm").val();
    	var nRootId = $("#p_rootId").val();

    	if(nFolderNm ==''){
    		if(confirm("폴더명을 입력하지 않은 경우 폴더가 생성되지 않습니다.\n새폴더 생성을 취소하시겠습니까?")){
    			// 추가한 새폴더 삭제
    			$("#newDiv").remove();
    		}else{
    			$("#nFolderNm").focus();
    		}
    	}else{
            if(confirm("입력하신 이름으로 폴더를 생성하시겠습니까?")){
                // 입력한 이름으로 폴더 생성 확인
			        var ajaxData = {folderName : nFolderNm
			                        , pFolderId : nRootId
			                        , depth :  "2"
			                        , educourseId :  ""
			                        , vivasamformat : "json" };

			        $.ajax({
			            type: "POST",
			            url: CONTEXTPATH + "/common/addNewFolder.do",
			            cache: false,
			            async: true,
			            dataType: "json",
			            data: ajaxData,
			            success: function(data){
			                var code = data.code;
			                var message = data.msg;
			                var result = data.result; //생성된 폴더아이디
			                if(code == '0000'){
			                	$("#nFolderNm").hide(); // input box hide
			                	$("#nFolderSpan").text(nFolderNm).addClass("on"); // nFolderNm insert to span tag
			                	$("#p_selFolderId").val(result); // added folderid into param

			                }
			            },
			            error: function (xhr, ajaxOptions, thrownError){
			            },
			            complete:function (xhr, textStatus){
			            }
			            });
                // 폴더 생성후 선택되도록 함

            }
    	}
    }

    /*********************************** 사용자 폴더 및 담기 *******************************************************/
