var commentarea = [], areaidx = -1;

var file_upper_code = "";
var url_upper_code = "";

var reg_talk_btn_click = false;			// 일반 톡 게시버튼 클릭 여부
var reg_file_talk_btn_click = false;		// 파일 톡 게시버튼 클릭 여부
var reg_url_talk_btn_click = false;		// URL 톡 게시버튼 클릭 여부
var reg_comment_btn_click = false;			// 댓글 게시버튼 클릭 여부

$(document).ready(function(){
	

	$("#myTalk").live("click" , function() {
		$(".talkBox").removeClass("none");
		$(".talkBox").addClass("block");
		$(".myTalk").removeClass("block");
		$(".myTalk").addClass("none");
	});
	
	$("#talk_layer_cancel").live("click" , function() {
		$(".myTalk").removeClass("none");
		$(".myTalk").addClass("block");
		$(".talkBox").removeClass("block");
		$(".talkBox").addClass("none");
		$("#talk_text").val("");
	});
	
	// 파이어폭스에서 키업 이벤트에 버그가 있는 관계로 beta.fix.js를 인클루드 한 뒤에 이렇게 키업 이벤트를 체크할 input 태그 아이디를 넣어 셋팅한다
	// var talk_text_fix = new beta.fix("talk_text");
	// var file_text_fix = new beta.fix("file_text");
	// var url_text_fix = new beta.fix("url_text");
	
	// 파이어폭스에서 키업 이벤트에 버그가 있는 관계로 mozillaForceKeyup(vivasam_common.js에 정의되어 있음) 함수를 사용하여 keyup 이벤트를 체크해야 할 textarea 태그를 셋팅한다
	mozillaForceKeyup("talk_text");
	mozillaForceKeyup("file_text");
	mozillaForceKeyup("url_text");
	
	
	// ajax 작업시 캐쉬를 사용하지 않도록 한다
	$.ajaxSetup({ cache: false });
	
	// 더보기 버튼 클릭했을때 사용되는 함수
	$("#sns_plus_btn").click(function(){
		var login_id = $("#loginid").val();
        var member_id = $("#view_member_id").val();
        
        var pageno = parseInt($("#pageno").val(), 10) + 1;
		// 로그인 한 사람의 나의 교실을 보는 경우와 타인의 나의 교실을 보는 경우를 구분해야 한다
		if(login_id == member_id){					// 로그인 한 사람이 나의 교실을 보는 경우
			if($("#moresnsyn").val() == "Y"){
				$("#pageno").val(pageno);		// 보고자 하는 페이지 번호를 먼저 셋팅을 한다. 그래야 getTimeLine 함수에서 검색 결과를 덮어씌울지 append 할지를 결정한다
		        getTimeLine(login_id, pageno, PAGE_PER_SNS_RECORD);
		        
			}else{
				alert("더 이상 가져올 내용이 없습니다");
			}
		}else{										// 타인의 나의 교실을 보는 경우
			$("#pageno").val(pageno);			// 보고자 하는 페이지 번호를 먼저 셋팅을 한다. 그래야 getTimeLine 함수에서 검색 결과를 덮어씌울지 append 할지를 결정한다
			getMemberTalkList(login_id, member_id, pageno, PAGE_PER_SNS_RECORD);
		}
		
	});

	$("#talk_text").focus(function(){
		if($(this).val() == "Talk Talk! 해주세요~*"){
			$(this).val("");
		}
		
		$(this).parent().removeClass("min");
		$(this).parent().addClass("max");
		
	});
	
	$("#talk_text").keyup(function(){
		var keylength = $(this).val().length;
		if( keylength > 150 ){
			alert("150글자까지 입력 가능합니다");
		}
		$("#talk_text_length").html(keylength);
		
	});
	
	$("#file_text").focus(function(){
		if($(this).val() == "Talk Talk! 해주세요~*"){
			$(this).val("");
		}
	});

	$("#file_text").keyup(function(){
		var keylength = $(this).val().length;
		if( keylength > 150 ){
			alert("150글자까지 입력 가능합니다");
		}
		$("#file_text_length").html(keylength);
		 
	});
	
	$("#url_text").focus(function(){
		if($(this).val() == "Talk Talk! 해주세요~*"){
			$(this).val("");
		}
	});

	$("#url_text").keyup(function(){
		var keylength = $(this).val().length;
		if( keylength > 150 ){
			alert("150글자까지 입력 가능합니다");
		}
		$("#url_text_length").html(keylength);
		
	});
	
	$("#file_title").focus(function(){
		if($(this).val() == "제목을 입력하세요"){
			$(this).val("");
		}
	});

	$("#file_keyword").focus(function(){
		if($(this).val() == "키워드를 입력하세요"){
			$(this).val("");
		}
	});
	
	$("#url_title").focus(function(){
		if($(this).val() == "제목을 입력하세요"){
			$(this).val("");
		}
	});
	
	
	$("#userfile").live("change", function(){
		
		// alert($("#userfile").attr("value"));
		// 파일 확장자명을 알아낸다
		var filename = $("#userfile").attr("value");
		var filetype = getExt(filename);
		var imgfile = "";
		var imgpath = "";
		
		if(filename != ""){
			// 설정된 파일에 특수문자가 있는지를 확인하여 그에 따른 결과를 보여준다
			var arr = filename.split("\\");
		    var chkfilename = arr[arr.length-1];
			if(chkSpecialChar(chkfilename)){
				alert("파일명에 특수기호가 있는경우 업로드 하실 수 없습니다.\n파일명을 변경하신 후 다시 시도하여 주시기 바랍니다.");
				return false;
			}
		    
			if(filetype == "GIF" || filetype == "PNG" || filetype == "JPG" || filetype == "JPEG" || filetype == "BMP"){				// 이미지
				imgfile = "img.gif";
			}else if(filetype == "DOC" || filetype == "DOCX"){
				imgfile = "doc.gif";
			}else if(filetype == "PPT" || filetype == "PPTX"){
				imgfile = "ppt.gif";
			}else if(filetype == "XLS" || filetype == "XLSX"){
				imgfile = "xls.gif";
			}else if(filetype == "HWP"){
				imgfile = "hwp.gif";
			}else if(filetype == "PDF"){
				imgfile = "pdf.gif";
			}else if(filetype == "SWF"){
				// imgfile = "swf.gif";
				imgfile = "play.gif";
			//}else if(filetype == "MP3"){		// 음악(MP3만 허용)(mp3의 경우 cdn 서버에 올라가 있는 것만 재생이 가능하므로 사용자는 mp3를 올리지 못하도록 한다. 하지만 재생시엔 cdn것을 재생할수도 있기때문에 목록을 보여줄때는 별도 처리는 안한다)
//				imgfile = "sound.gif";
			}else{
				alert("첨부가능한 파일이 아닙니다");
			}
			
			if(imgfile == ""){
				imgpath = CONTEXTPATH + "/images/common/trasp_1x1.gif";
			}else{
				imgpath = CONTEXTPATH + "/images/defaultimg/" + imgfile;
			}
			
			// alert("imgpath : " + imgpath);
			$("#fileimg").attr("src", imgpath);
			
			//	$("#file_up_data_view_layer").removeClass("none");

			$("#file_up_data_view_layer").attr("style","display:block");

		}

		$("iframe", parent.document).attr("height",$("#content").height());
	});
    
	// 파일 톡 등록 화면에서 보여주는 교과정보 select 태그 변경시 하위 select 태그 보여주는 함수
	$("select[name='file_select']").change(function(){
		var idx = $("select[name='file_select']").index(this);
		// alert("idx : " + idx);
		var refcode = $(this).val();
		// alert("refcode : " + refcode);
		if(idx == 0){
			$("#file_select2 option").remove();
			$("#file_select3 option").remove();
			$("#file_select4 option").remove();
			
			$("#file_select2_ul").remove();
			$("#file_select3_ul").remove();
			$("#file_select4_ul").remove();
			

			if(refcode == '999999'){			// 교과 미분류 선택시
                
                $.post(CONTEXTPATH + "/courseinfo/undefineFolderList.do ",
                        {foldertype : 'FD200', vivasamformat : "json"}, 
                        function(data){
                            var html = '';
                            if(data.code == "0000"){
                            	if(data.result.length > 0){
                                    html += "<option value=\"-999999\">선택해주세요</option>\n";
                                    // for(var i in data.result){
                                    for(var i=0; i < data.result.length; i++){
                                        var item = data.result[i];
                                        
                                        html += "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
                                        
                                    }
                                    	
                                    $("#file_select2").html(html);
    								//$("#file_layer").find(".select2").sSelect({listWidth : 140});
    								
                            	}else{
                                    // 미분류 하위 폴더가 없는 경우.
                                    
                            	}
                            }else{
                                alert("폴더 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
                            }
                            
                        },
                        "json"
                );
                
            }else{
				$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
						{codegroupid : "201", refcode : refcode, vivasamformat : "json"}, 
						function(data){
							var html = [], h = -1;
							if(data.code == "0000"){
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
									
								}
								
								$("#file_select2").html(html.join(''));
								//$("#file_layer").find(".select2").sSelect({listWidth : 140});
								
								
								
								// URL 관련 톡 교과서 목록 select 태그 구성
							}else{
								alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
							}
							
						},
						"json"
				)
            }
			
			// 사용자가 선택한 교과서 코드를 셋팅한다
            $("#educourse1_code").val(refcode);
			
		}else if(idx == 1){
			$("#file_select3 option").remove();
			$("#file_select4 option").remove();
			
			$("#file_select3_ul").remove();
			$("#file_select4_ul").remove();
			
			$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
					{codegroupid : "202", refcode : refcode, vivasamformat : "json"}, 
					function(data){
						var html = [], h = -1;
						if(data.code == "0000"){
							if(data.result.length > 0){
								file_upper_code = refcode;
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
								}
								
								$("#file_select3").html(html.join(''));
								//$("#file_layer").find(".select3").sSelect({listWidth : 140});
							}
							
							
							// URL 관련 톡 교과서 목록 select 태그 구성
						}else{
							alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
						}
						
					},
					"json"
			)
			
		}else if(idx == 2){
			
			$("#file_select4 option").remove();
			$("#file_select4_ul").remove();
			
			$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
					{codegroupid : "203", refcode : refcode, vivasamformat : "json"}, 
					function(data){
						var html = [], h = -1;
						if(data.code == "0000"){
							if(data.result.length > 0){
								file_upper_code = refcode;
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
									
								}
								
								$("#file_select4").html(html.join(''));
								//$("#file_layer").find(".select4").sSelect({listWidth : 140});
							}
							
							
							// URL 관련 톡 교과서 목록 select 태그 구성
						}else{
							alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
						}
						
					},
					"json"
			)
			
			
		}
		
		if(refcode == "-999999"){			// 선택해주세요를 선택한 것이면
			// 사용자가 선택해주세요를 선택하기 앞 단계 것을 셋팅한다
			$("#user_educourse_code").val(url_upper_code);
		}else{
			// 사용자가 현재 선택한 교과서 또는 대단원 또는 중단원 또는 소단원 코드를 셋팅한다
			$("#user_educourse_code").val(refcode);
		}
		
	});
	
	// URL 톡 등록 화면에서 보여주는 교과정보 select 태그 변경시 하위 select 태그 보여주는 함수
	$("select[name='url_select']").change(function(){
		var idx = $("select[name='url_select']").index(this);
		// alert("idx : " + idx);
		var refcode = $(this).val();
		// alert("refcode : " + refcode);
		if(idx == 0){
			$("#url_select2 option").remove();
			$("#url_select3 option").remove();
			$("#url_select4 option").remove();
			
			$("#url_select2_ul").remove();
			$("#url_select3_ul").remove();
			$("#url_select4_ul").remove();
			
			if(refcode == '999999'){			// 교과 미분류 선택시
                
                $.post(CONTEXTPATH + "/courseinfo/undefineFolderList.do ",
                        {foldertype : 'FD200', vivasamformat : "json"}, 
                        function(data){
                            var html = '';
                            if(data.code == "0000"){
                            	
                            	if(data.result.length > 0){
                            		url_upper_code = refcode;
                                    html += "<option value=\"-999999\">선택해주세요</option>\n";
                                    // for(var i in data.result){
                                    for(var i=0; i < data.result.length; i++){
                                        var item = data.result[i];
                                        
                                        html += "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
                                        
                                    }
                                    	
                                    $("#url_select2").html(html);
    								//$("#url_layer").find(".select2").sSelect({listWidth : 140});
    								
                            	}else{
                                    // 미분류 하위 폴더가 없는 경우.
                                    
                            	}
                            }else{
                                alert("폴더 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
                            }
                            
                        },
                        "json"
                );
                
            }else{

				$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
						{codegroupid : "201", refcode : refcode, vivasamformat : "json"}, 
						function(data){
							var html = [], h = -1;
							if(data.code == "0000"){
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									url_upper_code = refcode;
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
									
								}
								
								$("#url_select2").html(html.join(''));
								//$("#url_layer").find(".select2").sSelect({listWidth : 140});
								
								
								
								// URL 관련 톡 교과서 목록 select 태그 구성
							}else{
								alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
							}
							
						},
						"json"
				)
            }
			
			// 사용자가 선택한 교과서 코드를 셋팅한다
            $("#educourse1_code").val(refcode);
			
		}else if(idx == 1){
			$("#url_select3 option").remove();
			$("#url_select4 option").remove();
			
			$("#url_select3_ul").remove();
			$("#url_select4_ul").remove();
			
			$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
					{codegroupid : "202", refcode : refcode, vivasamformat : "json"}, 
					function(data){
						var html = [], h = -1;
						if(data.code == "0000"){
							if(data.result.length > 0){
								url_upper_code = refcode;
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
									
								}
								
								$("#url_select3").html(html.join(''));
								//$("#url_layer").find(".select3").sSelect({listWidth : 140});
							}
							
							
							// URL 관련 톡 교과서 목록 select 태그 구성
						}else{
							alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
						}
						
					},
					"json"
			)
			
		}else if(idx == 2){
			$("#url_select4 option").remove();
			$("#url_select4_ul").remove();
			
			$.post(CONTEXTPATH + "/myclass/getEducourseInfoSelect.do",
					{codegroupid : "203", refcode : refcode, vivasamformat : "json"}, 
					function(data){
						var html = [], h = -1;
						if(data.code == "0000"){
							if(data.result.length > 0){
								url_upper_code = refcode;
								html[++h] = "<option value=\"-999999\">선택해주세요</option>\n";
								// for(var i in data.result){
								for(var i=0; i < data.result.length; i++){
									var item = data.result[i];
									
									html[++h] = "<option value=\"" + item.code + "\">" + item.name + "</option>\n";
									
								}
								
								$("#url_select4").html(html.join(''));
								//$("#url_layer").find(".select4").sSelect({listWidth : 140});
							}
							
							
							// URL 관련 톡 교과서 목록 select 태그 구성
						}else{
							alert("교과서 항목을 조회하지 못했습니다.\n잠시후 다시 이용해 주세요");
						}
						
					},
					"json"
			)
		}
		
		if(refcode == "-999999"){			// 선택해주세요를 선택한 것이면
			// 사용자가 선택해주세요를 선택하기 앞 단계 것을 셋팅한다
			$("#user_educourse_code").val(url_upper_code);
		}else{
			// 사용자가 현재 선택한 교과서 또는 대단원 또는 중단원 또는 소단원 코드를 셋팅한다
			$("#user_educourse_code").val(refcode);
		}
		
	});
	
	// 일반 톡 등록 화면에서 게시 버튼 클릭 했을때의 이벤트 정의
	$("#talk_layer_reg").click(function(){

		if(reg_talk_btn_click == false){											// 버튼이 현재 클릭된 상태가 아니면
			reg_talk_btn_click = true;
			
			var text = $.trim( $("#talk_text").val() );
			var loginid = $("#loginid").val();
			var target_id = $("#view_member_id").val();
			var open_gubun = $("input[name='talk_open_yn']:checked").val();				// 톡 공개 구분
			
			var memberId   = $("#memberId").val();
			var toMemberId = $("#toMemberId").val();
			
			if ( memberId != '' || memberId != null ) {
				if ( loginid != memberId ) {
					loginid = memberId;
				}
			}
			
			if ( toMemberId != '' || toMemberId != null ) {
				if( target_id != toMemberId ) {
					target_id = toMemberId;
				}
			}
			
			
			if((text == "") || (text == "Talk Talk! 해주세요~*")){
				alert("톡을 입력해주세요");
				reg_talk_btn_click == false;
				$("#talk_text").val("");
				$("#talk_text").focus();
			}else if(text.length > 150){
				alert("톡의 길이는 150자 까지만 가능합니다");
				reg_talk_btn_click == false;
				$("#talk_text").focus();
			}else{
		    	$.ajax({
		    		type : "POST",
		    		url : CONTEXTPATH + "/myclass/regTalk.do",
		    		async : false,
		    		cache : false,
		    		dataType : "json",
		    		data : { member_id : loginid
					    , target_id : target_id
					    , content : text
					    , content_type : ""
					    , content_id : ""
					    , open_gubun : open_gubun
					    , page_no : 1
					    , page_size : PAGE_PER_SNS_RECORD
					    , vivasamformat : "json" }, 
		    		success : function(data){
						if(data.code == "0000"){
							//	alert(data.code + " : " + data.msg)
							
							if ( memberId == toMemberId ) {
								var url = CONTEXTPATH + "/myclass/myNewsList.do";
								location.replace(url);
							} else {
								//	var url = CONTEXTPATH + "/troom/tRoomMain.do?toMemberId="+toMemberId+"&subUrl=%2Ftroom%2FtRoomView.do%3FtoMemberId%26"+toMemberId;
								var url = CONTEXTPATH + "/troom/tRoomMain.do?toMemberId="+toMemberId;
								parent.location.replace(url);
							}
						} else if(data.code == "2001"){
							alert("로그인이 필요한 서비스 입니다");
						} else{
							alert("톡을 등록하지 못했습니다.\n잠시후 다시 이용해 주세요");
						}
		    		},
		    		error: function (xhr, ajaxOptions, thrownError){
		    		}, 
		    		complete:function (xhr, textStatus){
		    		}         
		    	});
			}
		}else{
			reg_talk_btn_click = false;
		}
		
	});
	
	var file_frm = $("#file_layer_form");
	file_frm.ajaxForm({
		dataType : "json",
		beforeSubmit : function(){
			
			var text = $.trim( $("#file_text").val() );
			var title = $("#file_title").val();
			var keyword = $("#file_keyword").val();
			var fileval = $("#userfile").val();
			var filetype = getExt(fileval);
			var educourse1_code = $("#educourse1_code").val();
			var user_educourse_code = $("#user_educourse_code").val();
			var arr = fileval.split("\\");
			var filename = "";
			
			if(arr.length != 0){
				filename = arr[arr.length-1];
			}
			
			if((text == "") || (text == "Talk Talk! 해주세요~*")){
				alert("톡을 입력해주세요");
				$("#file_text").val("");
				$("#file_text").focus();
				reg_file_talk_btn_click = false;
				return false;
			}else if(text.length > 150){
				alert("톡의 길이는 150자 까지만 가능합니다");
				reg_file_talk_btn_click = false;
				$("#file_text").focus();
				return false;
			}else if(educourse1_code == "" || educourse1_code == "-999999"){
				alert("교과서는 선택해주셔야 합니다");
				reg_file_talk_btn_click = false;
				return false;
			}else if(user_educourse_code == "" || user_educourse_code == "-999999"){
				alert("업로드 하는 자료가 들어갈 교과서나 대, 중, 소단원을 정해주세요");
				reg_file_talk_btn_click = false;
				return false;
			}else if(fileval == ""){
				alert("파일을 선택해주세요");
				reg_file_talk_btn_click = false;
				$("#fileval").focus();
				return false;
			}else if(chkSpecialChar(filename)){
				alert("파일명에 특수기호가 있는경우 업로드 하실 수 없습니다.\n파일명을 변경하신 후 다시 시도하여 주시기 바랍니다.");
				reg_file_talk_btn_click = false;
				return false;
			}else if(!(filetype == "GIF" || filetype == "PNG" || filetype == "JPG" 
					|| filetype == "JPEG" || filetype == "BMP" || filetype == "DOC" 
					|| filetype == "DOCX" || filetype == "PPT" || filetype == "PPTX"
					|| filetype == "XLS" || filetype == "XLSX" || filetype == "HWP"
					|| filetype == "PDF"|| filetype == "SWF" || filetype == "MP3")) {
				alert("첨부가능한 파일이 아닙니다");
				$("#fileval").focus();
				reg_file_talk_btn_click = false;
				return false;
			}else{
				if(text == "Talk Talk! 해주세요~*"){
					$("#talk_text").val("");
				}
				
				if(keyword == "키워드를 입력하세요"){
					$("#file_keyword").val("");
				}
				
				$("#file_talk_page_no").val("1");
				$("#file_talk_page_size").val(PAGE_PER_SNS_RECORD);
                
                // 공개 여부 설정된 값을 form 태그의 hidden에 셋팅한다
                $("#open_gubun").val($("input[name='file_open_yn']:checked").val());
                
                /*
                $("#file_select1").change();
                $("#file_select2").change();
                $("#file_select3").change();
                $("#file_select4").change();
                */
                
				$("#jmbb").removeClass("none");
				//	$("#jmbb").addClass("none");
			}
		},
		success : function(data){

			var code = data.code;
			var msg = data.msg;
			
			if(code == "0000"){
				
				var url = CONTEXTPATH + "/myclass/myNewsList.do";
				location.replace(url);
				
			}else if(code == "1010"){
				alert("업로드 파일사이즈는  10M 이하만 가능합니다.");
			}else if(data.code == "2001"){
				alert("로그인이 필요한 서비스 입니다");
			}else{
				alert("톡을 등록하지 못했습니다.\n잠시후 다시 이용해 주세요");
				$("#jmbb").addClass("none");
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert("톡을 등록하지 못했습니다.\n잠시후 다시 이용해 주세요");
			$("#jmbb").addClass("none");
		}
	});
	
	file_frm.submit(function(){
		return false;
	});
	
	// 파일 톡 등록 화면에서 게시 버튼 클릭 했을때의 이벤트 정의
	$("#file_layer_reg").click(function(){
		if(reg_file_talk_btn_click == false){
			reg_file_talk_btn_click = true;
			file_frm.submit();
		}
	});
	
	// 파일 톡 취소 버튼 클릭시 등록 폼 초기화 
	$("#file_layer_cancel").click(function(){

		var text = $.trim( $("#file_text").val() );
		//	var facebookbtnonoff = $("#file_facebook_btn").hasClass("on");
        //	var twitterbtnonoff = $("#file_twitter_btn").hasClass("on");
        //	var me2daybtnonoff = $("#file_me2day_btn").hasClass("on");
        
		$("#file_select1 option:eq(0)").attr("selected", "selected");
		$("#file_select2 option").remove();
		$("#file_select3 option").remove();
		$("#file_select4 option").remove();
		
		$("#file_select1_ul").remove();
		$("#file_select2_ul").remove();
		$("#file_select3_ul").remove();
		$("#file_select4_ul").remove();
		
		//	$("#file_layer").find(".select").sSelect({listWidth : 140});
		
		file_upper_code = "";
		
		// 파일 태그 초기화
//		$("#filespan").html("<input id=\"userfile\" name=\"userfile\" type=\"file\" class=\"formUpfile\" title=\"파일업로드\"/>");
//		$(".formUpfile").filestyle({
//	        imagewidth : 91,
//	        imageheight : 25,
//	        image : CONTEXTPATH + "/images/button/btn_file_find.gif",
//	        width : 343,
//	        height : 22
//	    });
		// $("#userfile").val("");

		$("#file_title").val("");
		$("#file_keyword").val("");
		$("#file_contents").val("");
		$("#file_text").val("");
		
//		$("#file_title").val("제목을 입력하세요");
//		$("#file_keyword").val("키워드를 입력하세요");
//		$("#file_text").val("Talk Talk! 해주세요~*");
		
		$("#FAllOpen").attr("checked", "checked");
		
		//	$("#file_up_data_view_layer").removeClass("none");
		//	$("#file_up_data_view_layer").addClass("none");
		$("#file_up_data_view_layer").attr("style","display:none");
		
		$("#file_text_length").text("0");
		// SNS 버튼 초기화
//		if(facebookbtnonoff){
//			$("#file_facebook_btn").removeClass("on");
//			$("#file_facebook_btn").addClass("off");
//		}
//		if(twitterbtnonoff){
//			$("#file_twitter_btn").removeClass("on");
//			$("#file_twitter_btn").addClass("off");
//		}
//		if(me2daybtnonoff){
//			$("#file_me2day_btn").removeClass("on");
//			$("#file_me2day_btn").addClass("off");
//		}
	});
	
	
	// URL 톡 등록 화면에서 게시 버튼 클릭 했을때의 이벤트 정의
	$("#url_layer_reg").click(function(){		
		if(reg_url_talk_btn_click == false){
			reg_url_talk_btn_click = true;
			
			var url = $.trim( $("#url_info").val() );
			var url_img = $("#url_img").attr("src");
			var url_title = $.trim( $("#url_title").val() );
			var url_content = $("#url_detail").text();
			var text = $.trim( $("#url_text").val() );
			var loginid = $("#loginid").val();
			var target_id = $("#view_member_id").val();
	
	        var educourse1_code = $("#educourse1_code").val();
	        var user_educourse_code = $("#user_educourse_code").val();
	        
			
			
			// var open_gubun = "A";				// 톡 공개 구분
			
			var open_gubun = $("input[name='url_open_yn']:checked").val();				// 톡 공개 구분
			
			if(educourse1_code == "" || educourse1_code == "-999999"){
				alert("교과서는 선택해주셔야 합니다");
				$("#educourse1_code").focus();
				reg_url_talk_btn_click = false;
			}else if(user_educourse_code == "" || user_educourse_code == "-999999"){
				alert("업로드 하는 자료가 들어갈 교과서나 대, 중, 소단원을 정해주세요");
				$("#user_educourse_code").focus();
				reg_url_talk_btn_click = false;
			}else if(url == ""){
				alert("URL을 입력해주세요");
				$("#url_info").focus();
				$("#url_info").val("");
				reg_url_talk_btn_click = false;
			}else if(url.length > 200){
				alert("URL의 길이는 200자 까지만 가능합니다");
				$("#url_info").focus();
				reg_url_talk_btn_click = false;
			}else if(url_title == ""){
				alert("제목을 입력해주세요");
				$("#url_title").focus();
				$("#url_title").val("");
				reg_url_talk_btn_click = false;
			}else if(url_title.length > 100){
				alert("제목의 길이는 100자 까지만 가능합니다");
				$("#url_info").focus();
				reg_url_talk_btn_click = false;
			}else if((text == "") || (text == "Talk Talk! 해주세요~*")){
				alert("톡을 입력해주세요");
				$("#url_text").focus();
				reg_url_talk_btn_click = false;
			}else if(text.length > 150){
				alert("톡의 길이는 150자 까지만 가능합니다");
				$("#url_text").focus();
				reg_url_talk_btn_click = false;
			}else{
				
				if(text == "Talk Talk! 해주세요~*"){
					$("#url_text").val("");
				}
				
				
				$.post(CONTEXTPATH + "/myclass/regUrlTalk.do",
						{
							member_id : loginid, target_id : target_id
							, educourse1_code : educourse1_code, user_educourse_code : user_educourse_code
							, url : url, url_title : url_title
							, url_img : url_img, url_detail : url_content
							, url_text : text, open_gubun : open_gubun
							, page_no : 1, page_size : PAGE_PER_SNS_RECORD
							, vivasamformat : "json"
						}, 
						function(data){
							if(data.code == "0000"){
								var url = CONTEXTPATH + "/myclass/myNewsList.do";
								location.replace(url);
							}else if(data.code == "2001"){
								alert("로그인이 필요한 서비스 입니다");
							}else{
								alert("톡을 등록하지 못했습니다.\n잠시후 다시 이용해 주세요");
							}
						},
						"json"
				)
				
			}
		}
	});
	
	// URL 톡 입력시 URL을 입력하여 해당 URL의 정보를 가져오는 기능
	$("#url_search").click(function(){
		var url = $.trim( $("#url_info").val() );
		if(url == ""){
			alert("URL을 입력해주세요");
			$("#url_info").focus();
			$("#url_info").val("");
		}else{
			// 사용자가 입력한 url 앞에 http://가 붙어있는지 확인하고 없으면 이를 붙여준다
			if(url.indexOf("http://") == -1){
				url = "http://" + url;
				$("#url_info").val(url);
			}
			$.post(CONTEXTPATH + "/common/htmlScraping.do",
					{url : url, vivasamformat : "json"},
					function(data){
						var imgurl = data.imgurl;
						var title = data.title;
						var url = data.url;
						var content = data.content;
						
						$("#url_img").attr("src", imgurl);
						$("#url_title").val(title);
						$("#url_link").attr("href", url);
						$("#url_link").text(url);
						$("#url_detail").text(content);
						
						//	$("#url_up_data_view_layer").removeClass("none");
						$("#url_up_data_view_layer").attr("style","display:block");
						// 썸네일 이미지 삭제 버튼이 보이도록 한다
						$("#delurlimg").removeClass("none");
						
					},
					"json"
			);
		}
		
	});
	
	// URL 톡 입력시 URL 썸네일 삭제 버튼 클릭하여 URL 썸네일을 삭제하는 기능
	$("#delurlimg").click(function(){
		var delyn = confirm("URL 썸네일 이미지를 삭제하시겠습니까?\n삭제하시면 디폴트 썸네일 이미지가 나타납니다");
		if(delyn == true){
			$("#url_img").attr("src", CONTEXTPATH + "/images/defaultimg/www.gif");
			$("#delurlimg").addClass("none");
		}
		
	});
	
	// url 톡 취소 버튼 클릭시 폼 초기화 - 이
	$("#url_layer_cancel").click(function(){
		//	var facebookbtnonoff = $("#url_facebook_btn").hasClass("on");
		//	var twitterbtnonoff = $("#url_twitter_btn").hasClass("on");
		//	var me2daybtnonoff = $("#url_me2day_btn").hasClass("on");
        
		$("#url_select1 option:eq(0)").attr("selected", "selected");
		$("#url_select2 option").remove();
		$("#url_select3 option").remove();
		$("#url_select4 option").remove();
		
		$("#url_select1_ul").remove();
		$("#url_select2_ul").remove();
		$("#url_select3_ul").remove();
		$("#url_select4_ul").remove();
		
		//	$("#url_layer").find(".select").sSelect({listWidth : 140});
		
		url_upper_code = "";

		$("#url_info").val("");
		$("#url_img").attr("src", CONTEXTPATH + "/images/common/trasp_1x1.gif");
		$("#url_title").val("");
		$("#url_link").attr("href", "");
		$("#url_link").text("");
		$("#url_detail").text("");

		$("#url_text").val("");
		//	$("#url_text").val("Talk Talk! 해주세요~*");
		
		$("#UAllOpen").attr("checked", "checked");
		
		//	$("#url_up_data_view_layer").removeClass("none");
		//	$("#url_up_data_view_layer").addClass("none");
		//	$("#url_up_data_view_layer").attr("style","display:block");
		$("#url_up_data_view_layer").attr("style","display:none");

		$("#url_text_length").text("0");
		
		// SNS 버튼 초기화
//		if(facebookbtnonoff){
//			$("#url_facebook_btn").removeClass("on");
//			$("#url_facebook_btn").addClass("off");
//		}
//		if(twitterbtnonoff){
//			$("#url_twitter_btn").removeClass("on");
//			$("#url_twitter_btn").addClass("off");
//		}
//		if(me2daybtnonoff){
//			$("#url_me2day_btn").removeClass("on");
//			$("#url_me2day_btn").addClass("off");
//		}
	});
	
	
});

/*
 * 입력받은 파일명(strFileName)의 확장자를 대문자로 리턴한다
 */
function getExt(strFilename){
    var filetype = strFilename.substring(strFilename.lastIndexOf(".")+1);
    filetype = filetype.toUpperCase();
    return filetype;
}


//댓글을 자동으로 보여주기 위해서 값을 배열에 넣었다!!!!!
var arryMemberId = [];
var arrySnsGubun = [];
var arrySnsId = [];
var arryCntId = [];
var arryCnt = 0;


//	추천 (good 하기)
function goodup(gooddiv, member_id, content_type, content_id){
	// alert($(gooddiv).html());
	if($(gooddiv).hasClass("on")){
		var cancelgood = confirm("굿을 취소하시겠습니까?");
		if(cancelgood == true){
			$.post(CONTEXTPATH + "/sns/cancelGood.do",
					{member_id : member_id, content_type : content_type, content_id : content_id, vivasamformat : "json"}, 
					function(data){
						if(data.code == "0000"){
							$(gooddiv).removeClass("on");
							alert("선택하신 컨텐츠에 대한 굿이 취소됐습니다");
							$(gooddiv).text(data.good_pt);
							// $(gooddiv).parent().prev().children("div").text(data.cp_pt); // 컨텐츠 촉점수 출력을 안하기로 했기 때문에 주석 처리
						}else if(data.code == "2001"){
							alert("로그인을 해주세요");
						}else if(data.code == "2005"){
							alert("굿을 한 컨텐츠가 아닙니다");
						}else{
							alert("선택하신 컨텐츠에 대한 굿 취소 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
						}
					},
					"json"
			)
		}
	}else{
		// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
		$.post(CONTEXTPATH + "/sns/regGood.do",
				{member_id : member_id, content_type : content_type, content_id : content_id, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						$(gooddiv).addClass("on");
						alert("선택하신 컨텐츠에 대해 굿을 하셨습니다");
						$(gooddiv).text(data.good_pt);
						// $(gooddiv).parent().prev().children("div").text(data.cp_pt); // 컨텐츠 촉점수 출력을 안하기로 했기 때문에 주석 처리
					}else if(data.code == "2001"){
						alert("로그인을 해주세요");
					}else if(data.code == "2004"){
						alert("이미 굿을 하신 컨텐츠입니다");
						$(gooddiv).addClass("on");
					}else{
						alert("선택하신 컨텐츠에 대한 굿 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
					}
				},
				"json"
		)
		
	}
}


function showLayer(btn){
	var id = $(btn).attr("id");
    
    $("#talkbtn").removeClass("on");
    $("#filebtn").removeClass("on");
    $("#urlbtn").removeClass("on");
    $("#talkbtn").removeClass("off");
    $("#filebtn").removeClass("off");
    $("#urlbtn").removeClass("off");
    
    $("#talk_layer").removeClass("none");
    $("#file_layer").removeClass("none");
    $("#url_layer").removeClass("none");
    $("#talk_layer").removeClass("block");
    $("#file_layer").removeClass("block");
    $("#url_layer").removeClass("block");
    
	if(id == "talkbtn"){					// Talk 버튼을 클릭했으면
		$("#talkbtn").addClass("on");
	    $("#filebtn").addClass("off");
	    $("#urlbtn").addClass("off");
	    
	    $("#talk_layer").addClass("block");
	    $("#file_layer").addClass("none");
	    $("#url_layer").addClass("none");
	}else if(id == "filebtn"){			// File 버튼을 클릭했으면
		$("#talkbtn").addClass("off");
	    $("#filebtn").addClass("on");
	    $("#urlbtn").addClass("off");
	    
	    $("#talk_layer").addClass("none");
	    $("#file_layer").addClass("block");
	    $("#url_layer").addClass("none");
	}else if(id == "urlbtn"){			// Url 버튼을 클릭했으면
		$("#talkbtn").addClass("off");
	    $("#filebtn").addClass("off");
	    $("#urlbtn").addClass("on");
	    
	    $("#talk_layer").addClass("none");
	    $("#file_layer").addClass("none");
	    $("#url_layer").addClass("block");
	}
}

// 로그인 한 사용자 아이디를 입력받아 해당 교과서 목록을 조회해서 화면을 구성해준다
function getCourse1(member_id){
	
	$("#file_select2").addClass("none");
	$("#file_select3").addClass("none");
	$("#file_select4").addClass("none");
	
	$("#url_select2").addClass("none");
	$("#url_select3").addClass("none");
	$("#url_select4").addClass("none");
}

// 타임라인에서 버튼 클릭시 레이어 제어하는 함수이다
function show_sns_btn(obj){

    if($(obj).hasClass("off")){
    	$(obj).removeClass("off");
    	$(obj).next().removeClass("none");
    	$(obj).next().addClass("block");
    }else{
    	$(obj).addClass("off");
    	$(obj).next().removeClass("block");
    	$(obj).next().addClass("none");
    }
}

// 톡을 삭제하는 작업
function deltalk(member_id, sns_id, content_type, content_id){
	var target_id = toMemberId;
	var check = confirm("클릭하신 톡을 삭제하시겠습니까?");
	if(check == true){
		
		$.ajax({
			type : "POST",
			url : CONTEXTPATH + "/myclass/delTalk.do",
			async : false,
			cache : false,
			dataType : "json",
			data : { member_id : member_id
				   , target_id : target_id
				   , sns_id : sns_id
				   , page_no : 1
				   , page_size : PAGE_PER_SNS_RECORD
				   , content_type : content_type
				   , content_id : content_id
				   , vivasamformat : "json" }, 
			success : function(data){
				if(data.code == "0000") {
					var url = CONTEXTPATH + "/myclass/myNewsList.do";
					location.replace(url);
				} else {
					
				}
			},
			error: function (xhr, ajaxOptions, thrownError){
				
			}, 
			complete:function (xhr, textStatus){

			}         
		});		
	}
}

//알림 메시지를 삭제하는 작업
function delalmmsg(member_id, alm_id){
	var check = confirm("클릭하신 알림 메시지를 삭제하시겠습니까?");
	if(check == true){
		$.post(CONTEXTPATH + "/sns/delAlmMsg.do",
				{member_id : member_id, alm_id : alm_id, page_no : 1, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						// alert("알림 메시지가 삭제되었습니다");
						// location.reload();
						// $("#reloadfrm").submit();
						$("#sns_list").html("");				// 1 페이지 출력을 위해 기존 내용 초기화
						$("#pageno").val("1");
						
				        // 타임라인 화면을 구성한다
						makeTimeLine(member_id, data);
				        
						
					}else{
						alert("알림 메시지 삭제 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
					}
				},
				"json"
		)
	}
}


	
function showCommentInputArea(obj){
	if($(obj).val() == "클릭하여 댓글을 남기세요."){
		$(obj).val("");
	}
	$(obj).next().removeClass("none");
	$(obj).next().removeClass("block");
	$(obj).next().addClass("block");
	$(obj).parent().removeClass("off");
	$(obj).parent().addClass("on");
}


function hideCommentInputArea(obj){
	$(obj).parent().prev().val("클릭하여 댓글을 남기세요.");
	$(obj).parent().removeClass("none");
	$(obj).parent().removeClass("block");
	$(obj).parent().addClass("none");
	$(obj).parent().parent().removeClass("on");
	$(obj).parent().parent().addClass("off");
	$(obj).prev().prev().children("span").eq(0).text("0");
}


function regComment( talkId, commentId, memberId, toMemberId ){
	
	// content를 구한다
	var content = $(commentId).val();
	if(content == ""){
		alert("댓글을 입력해주세요");
		$(commentId).focus();
	}else if(content.length > 150){
		alert("댓글은 150글자까지 입력 가능합니다");
		$(commentId).focus();
	}else{
		//alert( talkId+":"+commentId+":"+memberId+":"+toMemberId );
		$.ajax({
			type : "POST",
			url : CONTEXTPATH + "/myclass/regComment.do",
			async : false,
			cache : false,
			dataType : "json",
			data : { memberId : memberId
				   , toMemberId : toMemberId
				   , reftype : "T"
				   , refid : talkId
				   , content : content
				   , page_size : 0
				   , vivasamformat : "json"}, 
			success : function(data){
				if(data.code == "0000") {

					var html = showCommentHtml(data);

					var obj = '#comm_'+talkId;
					
					$(obj).find("dd").remove();
					$(obj).append(html);

					$(commentId).val("");
				} else {
					// alert('1');
				}
			},
			error: function (xhr, ajaxOptions, thrownError){
				
			}, 
			complete:function (xhr, textStatus){

			}         
		});
	}
}

// delComment(this, '" + item.sns_comment_id+ "', '" + item.ref_type + "', '" + item.ref_id + "')
function delComment(memberId, toMemberId, sns_comment_id, reftype, refid){
	
	var check = confirm("클릭하신 댓글을 삭제하시겠습니까?");
	
	if(check == true){

		$.ajax({
			type : "POST",
			url : CONTEXTPATH + "/myclass/delComment.do",
			async : false,
			cache : false,
			dataType : "json",
			data : { member_id : memberId
				   , ref_member_id : toMemberId
				   , sns_comment_id : sns_comment_id
				   , reftype : "T"
				   , refid : refid
				   , vivasamformat : "json"}, 
			success : function(data){
				if(data.code == "0000") {

					var html = showCommentHtml(data);

					var obj = '#comm_'+refid;
					
					$(obj).find("dd").remove();
					$(obj).append(html);

					$(commentId).val("");
				} else {
					
				}
			},
			error: function (xhr, ajaxOptions, thrownError){
				
			}, 
			complete:function (xhr, textStatus){

			}         
		});
	}
}

function show_alert(type){
	if(type == 1){				// 교안 작성중인 경우
		alert("작성 중인 교안입니다");
	}else if(type == 2){		// 교안 비공개인 경우
		alert("비공개 교안입니다");
	}else if(type == 3){		// 교한 삭제인 경우
		alert("삭제된 교안입니다");
	}else if(type == 4){		// 업자료 비공개인 경우
		alert("비공개 자료입니다");
	}else if(type == 5){		// 업자료 삭제인 경우
		alert("삭제된 자료입니다");
	}else if(type == 6){		// 비상자료 서비스 중지인 경우
		alert("이용이 중지된 자료입니다");
	}
}
