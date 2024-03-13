var isReqStatus = false; //모달팝업 관련 전역변수

function loginStateCheck(chkGubun) {
	var flag; 
		
	$.ajax({
		type : "POST",
		url : "/doCheckLogin.do",
		cache : false,
		async : false,
		dataType : "json",
		data : {
			chkGubun : chkGubun,
			vivasamformat : "json"
		},
		success : function(data) {
			//로그인 상태가 아닌 경우
			if (data == "FALSE") {
				flag = false; 
			}
			//로그인 세션은 존재하는 상황
			else {
				//교사 인증 여부는 확인하지 않고 로그인 상태만 확인하는 경우
				if (chkGubun != "certify") {
					flag = true;
				}
				//교사 인증 여부까지 확인하는 경우
				else {
					//로그인 유지 상태
					flag = data; //기존 TRUE로 리턴하던 로직을 인증(Y), 미인증(N) 상태값 리턴으로 수정, shimwb, 20190807
					
					//flag = "N"; //교사 미인증 테스트시 주석 해제
					
					//교사 미인증
					if (flag != "Y") {
						if (confirm("교사 인증을 해 주세요. 지금 인증을 진행하시겠습니까?")) {
							location.href = '/member/login.do?goURL=certifyFail';
							flag = "fail"; 
						}
						else
							flag = "fail"; 
					}
					//교사 인증
					else
						flag = true;
				}					
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
	if(window.globals.activeEnv == 'local'){
		url = 'http://' + window.globals.siteUrlCommon + '/file/download/dext.popup';
	}else{
		url = window.globals.siteUrlCommon + '/file/download/dext.popup';
	}
	var newWindow = window.open("/fountain_html/autoReload.html", "downloadwin", "left="+left+",top="+top+",width="+width+", height="+height+",scrollbars=no,toolbar=no,resizable=no,location=no");
	if (!newWindow) return false;
	var html = "";
	html += "<html><head></head><body><form id='formid' method='post' action='" + url +"'>";
   	html += "<input type='hidden' name='files' value='" + type+","+keyVal + "'/>";
   	html += "<input type='hidden' name='ufiles' value=''/>";
   	html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc"+"ript></body></html>";
   	newWindow.document.write(html);
   	return newWindow;
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
	//	2013.09.13 : eoraptor
    //	컨텐츠 담기 팝업에서 새 폴더 만들때
    //	신규 생성 input box 에 클릭이벤트 발생시 "새 폴더"란 값이 있으면 값을 지운다!!!
    /*$("#nFolderNm").live("click",function(){
    	var chkVal = $.trim( $(this).val() );
    	if ( chkVal == "새 폴더" ) {
    		$(this).val("");
    	}
    });*/
	
	$("#nFolderNm").on("click",function(){
    	var chkVal = $.trim( $(this).val() );
    	if ( chkVal == "새 폴더" ) {
    		$(this).val("");
    	}
    });

    //	새 폴더 만들기 : 엔터키 일경우 작동!!!
    /*$("#nFolderNm").live("keypress", function(event){
        if (event.keyCode == 13) {
        	makeFolder();
        }
    });*/
	
	$("#nFolderNm").on("keypress",function(event){
		if (event.keyCode == 13) {
        	makeFolder();
        }
    });
    
    $("#loginFrmPop #userPopId").keypress(function(e){
        if (e.keyCode == 13) {
            $("#loginFrmPop #logPopPw").focus();
            return false;
        }
	});
	
	$("#loginFrmPop #logPopPw,#loginFrmPop #loginBtn").keypress(function(e){
        if (e.keyCode == 13) {
        	_login('loginFrmPop');
            return false;
        }
	});
});

/* gnb */
$(function() {
	$('#gnb > li').not('.sel').mouseenter(function() {
		$('#gnb .dep2').hide();
		$(this).find('.dep2').show();

		$('#gnb > li').find('.dep1').removeClass('on');
		$(this).find('.dep1').addClass('on');

		$('#gnb .sel .dep2').hide();
	});

	$('#gnb>li').not('.sel').mouseleave(function() {
		$('#gnb .dep2').hide();
		$('#gnb > li').find('.dep1').removeClass('on');

		$('#gnb .sel .dep2').show();
	});
});


/* 테마관 메인 */
$(function() {
	$('.gallery > li > a').hover(
		function() {
			$(this).find('span').stop(true, false).animate({'left' : '0px'}, 400)
		},
		function() {
			$(this).find('span').stop(true, false).animate({'left' : '142px'}, 200)
		}
	);
});

/* 다른테마보기 */
$(function() {
	$('.themeView').mouseover(function() {
		$(this).find('dt a').addClass('on');
		$(this).find('dd').show();
	});

	$('.themeView').mouseleave(function() {
		$(this).find('dt a').removeClass('on');
		$(this).find('dd').hide();
	});
})

/* 시대사조 */
$(function() {
	$('.artWrap').each(function(i) {
		var idVal = "#"+$(this).attr('id');

		$(idVal+".artWrap .artSlide").jCarouselLite({
			btnNext: idVal+".artWrap .next",
			visible: 4
		});
	});
});

//파일 다운로드 
function downloadFile(pId, type){
	return false;
	if(type == 'single'){
	    go_DownloadFile("ID", pId);
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
	        
	        go_DownloadFile("ID", keyVal);
	        
	    }else{
	        alert('파일을 선택 하세요. ');
	    }
	}
}

//파일 다운로드
//incHeader.jsp 내에 포함되어 있지만 header include 파일을 따로 쓸 수 밖에 없어 해당 영역으로 복사함. 심원보, 20131018
function go_DownloadFile(type, keyVal){
	if(LOGIN_ID == ''){
		//_showLoginLayerDim('loginPop');
		
		//백그라운드 전체를 어둡게 처리
		bgLayerH();
		
		//로그인 레이어 팝업
		popDim('layerLogin');
		
		return;
	}else {
		// 필수정보 누락시 알럿알림 후 개인정보 수정 유도 ( 학교정보 없을 시)
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
	if (fnMobile()){
		alert("복수 파일 다운로드는 PC에서만 지원합니다.");
		return;
	}else{
		callDown(type, keyVal);
	}
	/*
	// 여려개를 선택해서 다운로드 받는 경우 익스플로어가 아닌경우에 경고문구 처리
	if(Arr_keyVal.length > 1 && fnMobile() ){
		
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
	*/
}

function go_UrlFileDownload(grpGubunId, fileUrl, title) {
	if(LOGIN_ID== ''){
    	//백그라운드 전체를 어둡게 처리
		bgLayerH();
		
		//로그인 레이어 팝업
		popDim('layerLogin');
		
        return;
    }
	
	go_DownloadFile('url', fileUrl);
	
	//url 형식의 파일 다운로드 로그 쌓기, /commonjs/vivasam_common.jsp
    putFileUrlDownLoadLog("THEME_MUNHAK", grpGubunId, title, fileUrl, "");    
}

/**
* 선택한 파일 담기 popup open
*/
function insertFolder(pId , type){
	if(LOGIN_ID == ''){
		//_showLoginLayerDim('loginPop');
		
		//백그라운드 전체를 어둡게 처리
		bgLayerH();
		
		//로그인 레이어 팝업
		popDim('layerLogin');
		
		return;
	}

  if(type == 'single'){
  	pop_open('savePostionsetPop', pId);
  	$("#savePositionsetPop > pop1SelVal").val(pId);
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

          // 1. 폴더 팝업 레이어 열기 incHeader.jsp 에 있다.
          pop_open('savePostionsetPop', keyVal);
          // 팝업 히든 필드에 선택한 키값 넣어줌
          $("#savePositionsetPop > pop1SelVal").val(keyVal);
      }else{
          alert('파일을 선택 하세요. ');
      }
  }

}

//티칭노트 호출 
function callTeachingNote(id, eduCourseId , type){
	if(type == "single"){
		go_TeachingNote(eduCourseId, id);
	}else{
		
	    var keyVal = "";
	    
	    if( _isChecked(id) ){
	        // 선택한 컨텐츠의 키값 연결 
	        var len =$('input[name=check'+id+']:checked').length;
	        $('input[name=check'+id+']:checked').each(function(index){
	                if ( index == len-1 ) {
	                    keyVal += $(this).val();
	                } else {
	                    keyVal += $(this).val()+",";
	                }
	        });
	        
	        go_TeachingNote(eduCourseId, keyVal);
	        
	    }else{
	        alert('파일을 선택 하세요. ');
	    }
	}    
}

/**
 * 티칭노트 연결 (keyVal : CN070-LPID)
 */
 function go_TeachingNote(educourseId, keyVal){
     var iframe_Id = $('#ifrTn').attr('id');// incFooter.jsp 안에 체크하는 jsp 있다.
     document.getElementById(iframe_Id).contentWindow.go_TeachingNoteIfr4Theme(educourseId, keyVal);

 }

//레이어 로그인 창 띄움 
function _showLoginLayerDim(layerId, goURL) {
	
  popDim(layerId);
  
  if (typeof goURL != 'undefined' && goURL != '') {
      $('#' + layerId).find('input[name=goURL]').val(goURL);
  }
}

/**
* 공통 팝업 열기 ( 레이어의 아이디, 선택한 키값 )
*/
function pop_open(){
	if (arguments.length == 0) return;

 	var pop_id = arguments[0];
 	
 	var keyVal;
 	var type;

 	if (arguments.length > 1) {
        keyVal = arguments[1];
 	} else if (arguments.length > 2) {
        type = arguments[2];
 	}

    var layer_id = "#" + pop_id;

    // 담기 팝업의 경우에 폴더 목록을 조회하도록 함
    if(pop_id == 'savePostionsetPop'){
   	 	getFolderList();
    }
    // 2013-02-17 이홍 수정 끝

    var layer_height = $(layer_id).outerHeight(true);
    var layer_width  = $(layer_id).outerWidth(true);
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (arguments.length >= 2 && arguments.length <= 3) {
        if(keyVal != undefined){
            $("#p_"+pop_id).val(keyVal);
        }
    }
    
    //var layer_top = $(window).height() / 3;
 	var layer_top = $(window).height() / 3;

    // 전체메뉴보기 팝업은 화면의 상단에 올려붙도록 수정요청함 (양준석cp 2013-02-18 이홍 수)
    if(pop_id == 'siteMap'){
   	 	layer_top =175;
    }
    // 2013-02-18 수정

    $(layer_id).draggable({
   	 	zIndex: 100,
   	 	handle : '.pop_handle'
    });
    $(layer_id).show().css({
        top : scrollTop + layer_top,
        "margin-left" : - 500
    });
}

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
	var newF = "<div class=\"deps1\" id=\"newDiv\"><a href=\"javascript:void(0)\" class=\"folder off\"></a><span id=\"nFolderSpan\"><input type=\"text\" name=\"nFolderNm\" id=\"nFolderNm\" value=\"새 폴더\">&nbsp;<a href=\"javascript:makeFolder()\"><img src=\"/images/common/button/btn_ok.png\"></a></span></div>";
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
           url: CONTEXTPATH + "/mydata/moveFolder.do",
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

//모바일 채크
function fnMobile()
{

	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	  //PC에서만 실행 될 스크립트
		return false;
	}
	
	var filter = "win16|win32|win64|mac";
	if( navigator.platform  ){
        if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
        	// moblie
           return true;
        }else{
        	// pc
           return false;
        }
    } 
	// moblie
	return true;
}

//사이언스 테마백과 2018
$(function() {
	menuPos();
	$("#quick_science li").click(function () {
		menuFix();

	    $("#quick_science li").each(function () {
	        $(this).removeClass("on");
	    });
	    $(this).addClass("on");
	});
});

$(window).scroll(function () {
	menuPos();
});

$(window).resize(function(){
	menuPos();
});	

function menuPos() {
    var doc_h = $(document).height();
    var win_h = $(window).height();
    var scroll_h = $(window).scrollTop();
	var detail = $(".scrollCont");
	//var header = $("#headerWrap");
	
	if (!detail.length){
		return;
	}
	//var header_h = header.offset().top + header.height();
	
	if (scroll_h > 90) {
		menuFix();
	} else {
		menuAbs();
	}

	detail.each(function() {
		var sectionsTop = $(this).offset().top - 120;
		var quickMenu = $('#quick_science');
		var lastElement = $('#quick_science ul li:last');

		if (scroll_h >= sectionsTop) {
			quickMenu.find('li').removeClass('on');
			quickMenu.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('on');
		}
		//스크롤 끝에 다 다를때
		else if ((scroll_h + win_h) == doc_h) {
			$('#quick_science ul li').removeClass('on');
			lastElement.addClass('on');
		}
	});

};
function menuAbs(){
    $("#quick_science li").removeClass("on");
    $("#quick_science li:first-child").addClass("on");
    $("#quick_science").css({top : "120px"});
};
function menuFix(){
    $("#quick_science").css({top : "30px"});
}