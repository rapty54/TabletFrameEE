var commentarea = [], areaidx = -1;
var reg_talk_btn_click = false;			// 일반 톡 게시버튼 클릭 여부
$(document).ready(function(){
	// 파이어폭스에서 키업 이벤트에 버그가 있는 관계로 beta.fix.js를 인클루드 한 뒤에 이렇게 키업 이벤트를 체크할 input 태그 아이디를 넣어 셋팅한다
	// var v_talk_text_fix = new beta.fix("v_talk_text");
	// 파이어폭스에서 키업 이벤트에 버그가 있는 관계로 mozillaForceKeyup(vivasam_common.js에 정의되어 있음) 함수를 사용하여 keyup 이벤트를 체크해야 할 textarea 태그를 셋팅한다
	mozillaForceKeyup("v_talk_text");
	
	// ajax 작업시 캐쉬를 사용하지 않도록 한다
	$.ajaxSetup({ cache: false });	

	$("#v_talk_text").click(function(){
		var loginid = $("#v_login_id").val();
		if(isNull(loginid) == ""){
			// blur 이벤트를 주어 강제로 포커스를 잃어버리게 한다. 
			// 크롬의 경우 alert를 띄우면 확인버튼을 누른뒤 alert를 띄운 객체에 다시 포커스를 주기 때문에 무한루프가 발생하게 된다
			// 그래서 alert 를 띄우기 전에 현재 객체에 포커스를 잃어버리게 blur 를 호출하도록 한다
			$(this).blur();				
			alert("로그인 해주세요");
		}else{
			if($(this).val() == "의견을 입력해주세요~*"){
				$(this).val("");
			}
			
			$(this).parent().removeClass("min");
			$(this).parent().addClass("max small");
			$(this).focus();
		}
	});
	
	
	$("#v_talk_text").keyup(function(){
		var keylength = $(this).val().length;
		if( keylength > 150 ){
			alert("150글자까지 입력 가능합니다");
		}
		$("#v_talk_text_length").html(keylength);
		
	});
	
	$("#v_talk_layer_cancel").click(function() {
		// 톡 입력 화면 초기화
		$("#v_talk_text").val("의견을 입력해주세요~*");
		$("#v_talk_text").parent().removeClass("min");
		$("#v_talk_text").parent().removeClass("max");
		$("#v_talk_text").parent().addClass("min");
		$("#v_talk_text_length").text("0");
		$("#v_talk_text").blur();
	});
	
	// 일반 톡 등록 화면에서 게시 버튼 클릭 했을때의 이벤트 정의
	$("#v_talk_layer_reg").click(function(){
		if(reg_talk_btn_click == false){											// 버튼이 현재 클릭된 상태가 아니면
			reg_talk_btn_click = true;
			var text = $("#v_talk_text").val();
			var loginid = $("#v_login_id").val();
			var content_type = $("#v_content_type").val();
			var content_id = $("#v_content_id").val();
			var open_gubun = "A";				// 톡 공개 구분
			
			if((text == "") || (text == "의견을 입력해주세요~*")){
				alert("톡을 입력해주세요");
				$("#v_talk_text").focus();
			}else if(text.length > 150){
				alert("톡의 길이는 150자 까지만 가능합니다");
				$("#v_talk_text").focus();
			}else{
				
				$.post(CONTEXTPATH + "/myclass/regTalk.do",
						{member_id : loginid, target_id : loginid, content : text, content_type : content_type, content_id : content_id, open_gubun : open_gubun, page_no : 1, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"},
						function(data){
							var html = [];
							var h = -1;
							if(data.code == "0000"){
								var page_size = PAGE_PER_SNS_RECORD;
								getContentTalkListViewer(loginid, content_type, content_id, 1, page_size);
								pageCenter();
								$("iframe", parent.document).attr("height",$("#content").height());
								$("#v_talk_text").val("의견을 입력해주세요~*");
								$("#v_talk_text").blur();
								$('.newsSetList').find('.replyWrap > dl').eq(0).css('border-top', 'none');
							}else if(data.code == "2001"){
								alert("로그인이 필요한 서비스 입니다");
							}else{
								alert("톡을 등록하지 못했습니다.\n잠시후 다시 이용해 주세요");
							}
							reg_talk_btn_click = false;
						},
						"json"
				);
			}
		}
	});
});
function go_page(page){

	var page_no = page;
    var page_size = PAGE_PER_SNS_RECORD;
	// var page_size = 2;
    var content_type = $("#v_content_type").val();
    var content_id = $("#v_content_id").val();
    var login_id = $("#v_login_id").val();

    getContentTalkListViewer(login_id, content_type, content_id, page_no, page_size);
    pageCenter();
    $("#v_pageno").val(page_no);
}

function getContentTalkListViewer(member_id, content_type, content_id, page_no, page_size){
	$.ajax({
		type : "POST",
		url : CONTEXTPATH + "/sns/getContentTalkList.do",
		async : false,
		cache : false,
		dataType : "json",
		data : {content_type : content_type, content_id : content_id, page_no : page_no, page_size : page_size, vivasamformat : "json"}, 
		success : function(data){

			makeTalkListViewer(member_id, content_type, content_id, page_no, data);
			
			for ( var i = 0 ; i < arryCnt ; i++ ) {
				
				getAutoCommentViewerInit(arryCntId[i], arryMemberId[i], arrySnsGubun[i], arrySnsId[i]);
			}
		},
		error: function (xhr, ajaxOptions, thrownError){
			
		}, 
		complete:function (xhr, textStatus){
			$("iframe", parent.document).attr("height",$("#content").height());
		}         
	});
}

//댓글을 자동으로 보여주기 위해서 값을 배열에 넣었다!!!!!
var arryMemberId = [];
var arrySnsGubun = [];
var arrySnsId = [];
var arryCntId = [];
var arryCnt = 0;

// getTimeLine 함수에서 읽어온 json 문자열을 이용하여 html을 만드는 작업을 진행한다
function makeTalkListViewer(member_id, content_type, content_id, page_no, data){
	arryCnt =0;
	var html = [], h = -1;
	var html2 = [], h2 = -1;
	if(data.code == "0000"){
		if(data.result.length == 0){		// 더 이상 가져올 레코드가 없기 때문에 moresnsyn 을 N으로 셋팅한다
			
		}else{
			var total_cnt = 0;
			var page_cnt = 0; 

			for(var i = 0; i < data.result.length; i++){
				var item = data.result[i];
				if(i == 0){
					total_cnt = item.total_cnt;
					page_cnt = item.page_cnt;
				}else{						
					var item = data.result[i];
					html[++h] = "<div class='replyWrap'>\n";
					html[++h] = "<dl id='comment_"+item.alm_sns_id+"'>\n";
					html[++h] = "<dt>\n";
					html[++h] = "<span class='pic'>";
	                if(item.member_state == "D"){						// 탈퇴한 회원일 경우 알림창을 띄워준다 
	                	html[++h] = "<a href=\"javascript:void(0)\" onclick=\"showWithdraw()\">\n";
	                }else{
	                	html[++h] = "<a href=\"javascript:void(0)\" onclick=\"showRoom('" + item.member_id + "')\">\n";
	                }
	                if(isNull(item.profile_img_path) == "" || item.member_state == "D"){	// 프로필 이미지가 없거나 탈퇴한 회원일 경우 디폴트 프로필 이미지를 보여준다
	                	html[++h] = "		<img src=\"" + DEFAULT_PROFILE_IMG + "\" alt=\"회원 이미지\" width=\"50\" height=\"57\" />\n";
	                }else{
	                	// 2013-02-06 250 대응용도 CONTEXTPATH 제거
//	                	html[++h] = "		<img src=\"" + CONTEXTPATH + item.profile_img_path + "\" alt=\"회원 이미지\" width=\"50\" height=\"57\" />\n";
	                	html[++h] = "		<img src=\"" + item.profile_img_path + "\" alt=\"회원 이미지\" width=\"50\" height=\"57\" />\n";
	                }
	                html[++h] = "</a>\n";
					html[++h] = "</span>\n";
	                if(item.member_state == "D"){						// 탈퇴한 회원일 경우 알림창을 띄워준다
	                	html[++h] = "<strong class='user'><a href=\"javascript:void(0)\" onclick=\"showWithdraw()\"><span class='point1'>회원</span>  선생님</a></strong>\n";
	                }else{
	                	html[++h] = "<strong class='user'><a href=\"javascript:void(0)\" onclick=\"showRoom('" + item.member_id + "')\"><span class='point1'>" + item.name + "</span> 선생님</a></strong>\n";
	                }
					html[++h] = "<span class='writeDate'>"+item.regdttm +"</span>\n";
					html[++h] = "<p class=\"comment\">"+replaceAll(htmlReplaceAll(isNull(item.talkcontent)), "\n", "<br/>") + "\n";
					if((item.tot_comment_cnt != 0)){
                		arryCntId[arryCnt] = arryCnt;
                		arryMemberId[arryCnt] = member_id;
                		arrySnsGubun[arryCnt] = "T";
                		arrySnsId[arryCnt] = item.alm_sns_id;
                		
                		arryCnt++;	  
	                }
					html[++h] = "<a href='javascript: void(0)' class='replyWrite' onclick=\"showCommentInputAreaViewer(this)\"><span>답글달기</span></a></p>\n";
					if(member_id == item.member_id){
						html[++h] = "<span class='opt'>\n";
						html[++h] = "<a href=\"javascript: deltalkViewer('" + member_id + "', '" + item.alm_sns_id + "')\">삭제</a>\n";
						html[++h] = "</span>\n";
					}
					html[++h] = "</dt>\n";
					html[++h] = "</dl>\n";
					html[++h] = "<div class=\"replyApp none\">\n";
					html[++h] = "<div class=\"textarea_layer\">\n"; // 클래스를 on으로 바꾸면 댓글 작성 UI로 바뀐다
	               	html[++h] = "<textarea class=\"textL\" id=\"comment_area_" + i + "\" name=\"commentarea\" >클릭하여 댓글을 남기세요.</textarea>\n"; // 이 textarea의 onclick 이벤트에 textarea_layer off -> textarea_layer on으로 바꿔주는 작업 진행
	               	html[++h] = "<input type=\"image\" src=\""+CONTEXTPATH +"/images/common/button/btn_app.gif\" alt=\"등록\" onclick=\"regCommentViewer(this, '" + member_id + "', 'T', '" + item.alm_sns_id + "')\"/>";
	               	html[++h] = "</div>\n";
	               	html[++h] = "</div>\n";
					html[++h] = "</div>\n";
				}
			}
			var sns_list_html = html.join('');
			
			// 1 페이지를 보는 경우엔 덮어씌워야 하고 2페이지 부터는 뒤에 append 형식으로 붙여야 한다

			$(".newsSetList").html(sns_list_html);
			
			
			$("#v_talk_cnt_p").html("총 <strong><em class=\"point1\">"+ total_cnt +"</em>개</strong>의 의견이 있습니다.");
			
			if(total_cnt > 0 || page_no > page_cnt){		// 검색된 결과가 없거나 현재 보는 페이지 번호와 검색 결과로 나온 총페이지 수가 같게 되는  마지막 페이지를 보는 경우 의미하므로 더보기 버튼을 안보이게 한다
				html2[++h2] = "<div class=\"paging none\">\n";
				html2[++h2] = "<div class=\"pageCnt\">\n";				
				if(page_no > 1){
					html2[++h2] = "<a href=\"javascript:go_page(1)\" class=\"btn first\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_first.gif\" alt=\"처음\" /></a>\n";
					html2[++h2] = "<a href=\"javascript:go_page("+(parseInt(page_no)-1)+")\" class=\"btn prev\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_prev.gif\" alt=\"이전\" /></a>\n";
				}
				else{
					html2[++h2] = "<a href=\"javascript:void(0)\" class=\"btn first\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_first.gif\" alt=\"처음\" /></a>\n";
					html2[++h2] = "<a href=\"javascript:void(0)\" class=\"btn prev\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_prev.gif\" alt=\"이전\" /></a>\n";					
				}
				html2[++h2] = "<span>\n";
				for(var i = 0; i < page_cnt; i++){
					if(page_no == (i+1)){
						html2[++h2] = "<a href=\"javascript:go_page("+(i+1)+")\" class=\"on\">"+(i+1)+"</a>";
					}
					else{
						html2[++h2] = "<a href=\"javascript:go_page("+(i+1)+")\" >"+(i+1)+"</a>";
					}
				}
				html2[++h2] = "</span>\n";
				if(page_no < page_cnt){
					html2[++h2] = "<a href=\"javascript:go_page("+(parseInt(page_no)+1)+")\" class=\"btn next\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_next.gif\" alt=\"다음\" /></a>\n";
					html2[++h2] = "<a href=\"javascript:go_page("+page_cnt+")\" class=\"btn last\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_last.gif\" alt=\"마지막\" /></a>\n";
				}
				else{
					html2[++h2] = "<a href=\"javascript:void(0)\" class=\"btn next\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_next.gif\" alt=\"다음\" /></a>\n";
					html2[++h2] = "<a href=\"javascript:void(0)\" class=\"btn last\"><img src=\""+CONTEXTPATH +"/images/common/board/btn_last.gif\" alt=\"마지막\" /></a>\n";
				}
				html2[++h2] = "</div>\n";
				html2[++h2] = "</div>\n";
				
				pageCenter();
			}
			var sns_paging_html = html2.join('');
			$(".newsSetList").append(sns_paging_html);
			var pageno = parseInt($("#v_pageno").val(), 10);
	        // $("#v_pageno").val(pageno+1);
			
			// 하단 footer를 다시 그리기위한 작업을 진행한다(IE 8에서 더보기를 클릭하면 footer가 더보기 내용과 겹쳐지는 증상이 있다)
			// 그래서 렌더링을 다시 하기 위해 웹페이지 상단의 비바샘 로고에 와곽선을 줬다 빼는 식으로 랜더링을 다시 하게 함으로써 이 증상을 없애도록 했다) 
			redrawfooter();
			if(total_cnt>0){
				$("#v_sns_list").removeClass("none");
				$("#v_sns_list").addClass("block");
			}
			else{
				$("#v_sns_list").removeClass("block");
				$("#v_sns_list").addClass("none");
			}
           	if(page_cnt > 1){
           		$(".paging").removeClass("none");
           		$(".paging").addClass("block");
           	}
			
           	$("iframe", parent.document).attr("height",$("#content").height());
		}
			
		
	}else{
		
	}
	
	// 댓글 쓰는 textarea 태그에 keyup 이벤트 강제발생 시킴
	$("textarea[name=commentarea]").each(function(){
		var comment_id = $(this).attr("id");
		// console.log("id : " + id);
		
		// var comment_fix = new beta.fix(id);
		// commentarea[++areaidx] = new beta.fix(id);
		mozillaForceKeyup(comment_id);
	});
	
	$("textarea[name=commentarea]").keyup(function(){
		// var idx = $("textarea[name=commentarea]").index(this);
		// var obj = $("textarea[name=commentarea]")[idx];
		var spantag = $(this).next().children().first().children().first(); // 댓글 글자수 기록하는 span 태그 접근
		var keylength = $(this).val().length;
		if( keylength > 150 ){
			alert("150글자까지 입력 가능합니다");
		}
		$(spantag).text($(this).val().length);
	});
}

function goodupViewer(gooddiv, member_id, content_type, content_id){
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
			);
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
		);
	}
}

/**
 * 알림 메시지 또는 톡에서 한번도 댓글을 보지 않은 상황에서 클릭했을때 실행되는 함수
 * @param comment_cnt_p		만들어진 html이 출력되어야 할 html 태그(comment_add_layer 클래스가 있는 div 태그의 <p> 태그가 들어온다)
 * @param member_id			로그인 한 회원 id
 * @param ref_type			알림 메시지일 경우 A, 톡일 경우 T가 들어온다
 * @param ref_id			알림 메시지 또는 톡의 고유 ID
 */
function getCommentViewerInit(comment_cnt_p, member_id, ref_type, ref_id){
	// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
	// 기존에 이미 출력되어 있는 상태인지를 체크해서 출력되지 않은 경우면 출력하도록 한다
	var nextcnt = $(comment_cnt_p).parent().next().length;
	if(nextcnt == 0){
		$.post(CONTEXTPATH + "/sns/getComment.do",
				{ref_type : ref_type, ref_id : ref_id, page_no : 1, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						if(data.result.length == 1){		// 검색된 레코드가 없을 경우(0번째 행은 전체 갯수및 페이지 갯수 등의 정보가 있기 때문에 얘는 빼야 한다)
							//alert("등록된 댓글이 없습니다");
						}else{
							
							var html = [], h = -1;
							var curpage_cnt = -1;
							var page_cnt = -1;
							
			               	for(var i =0; i < data.result.length; i++){
			               		var item = data.result[i];
			               		if(i == 0){
			               			curpage_cnt = item.curpage_cnt;
			               			page_cnt = item.page_cnt;
			               		}else{
									html[++h] = "<dd>";
					               	if(item.member_state == "D"){	// 탈퇴한 회원일 경우 회원 선생님으로 보여준다
					               		html[++h] = "<strong><span class=\"point1\">회원</span> 선생님</strong>\n";
					               	}else{
					               	   	html[++h] = "<strong><span class=\"point1\">" + item.name + "</span> 선생님</strong>\n";
					               	}
									html[++h] = "<span class=\"writeDate\">" + item.reg_dttm + "</span>";
									html[++h] = "<p>"+replaceAll(htmlReplaceAll(isNull(item.content)), "\n", "<br/>") + "</p>";
					               	if(member_id == item.member_id){					// 댓글 쓴 사람이 로그인 한 사람과 동일 인물이면
					               		html[++h] = "<span class=\"opt\">";
					               		html[++h] = "<a href=\"javascript: void(0)\" onclick=\"delCommentViewer(this, '" + member_id + "', '" + item.sns_comment_id+ "', '" + item.ref_type + "', '" + item.ref_id + "')\">삭제</a>";
					               		html[++h] = "</span>";
				               		}
									html[++h] = "</dd>";
			               		}
			               	}
			               	
			               	
			               	html[++h] = "		<input type=\"hidden\" name=\"comment_page_no\" value=\"2\">";

			               	var comment_list_html = html.join('');
							
			               	$("#comment_"+ref_id).append(comment_list_html);
			               	if(page_cnt != 1){
			               		$("#comment_"+ref_id).parent().append("<a href=\"javascript:void(0)\" class=\"replyMore\" onclick=\"getCommentViewer(this, '" + member_id + "', '" + ref_type + "', " + ref_id + ")\">더보기</a>\n");
			               	}
			               	$("iframe", parent.document).attr("height",$("#content").height());
							// 하단 footer를 다시 그리기위한 작업을 진행한다(IE 8에서 더보기를 클릭하면 footer가 더보기 내용과 겹쳐지는 증상이 있다)
							// 그래서 렌더링을 다시 하기 위해 웹페이지 상단의 비바샘 로고에 와곽선을 줬다 빼는 식으로 랜더링을 다시 하게 함으로써 이 증상을 없애도록 했다) 
							redrawfooter();
						}
					}else{
						alert("선택하신 글의 댓글을 가져오지 못했습니다\n잠시후 다시 이용해주세요");
					}
				},
				"json"
		);
	}
}



/**
 * 알림 메시지 또는 톡에서 자동으로 댓글을 보이게 하는 함수
 * @param comment_cnt_p		만들어진 html이 출력되어야 할 html 태그(comment_add_layer 클래스가 있는 div 태그의 <p> 태그가 들어온다)
 * @param member_id			로그인 한 회원 id
 * @param ref_type			알림 메시지일 경우 A, 톡일 경우 T가 들어온다
 * @param ref_id			알림 메시지 또는 톡의 고유 ID
 */
function getAutoCommentViewerInit(arryCntId, member_id, ref_type, ref_id){
	
	//	alert( "getAutoCommentViewerInit(" + arryCntId + ", " + member_id + ", " + ref_type + ", " + ref_id + ")" );
	
	// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
	// 기존에 이미 출력되어 있는 상태인지를 체크해서 출력되지 않은 경우면 출력하도록 한다
	var nextcnt = $("#comment_"+ref_id).find("dd").length;
	if(nextcnt == 0){
		$.post(CONTEXTPATH + "/sns/getComment.do",
				{ref_type : ref_type, ref_id : ref_id, page_no : 1, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						if(data.result.length == 1){		// 검색된 레코드가 없을 경우(0번째 행은 전체 갯수및 페이지 갯수 등의 정보가 있기 때문에 얘는 빼야 한다)
							//alert("등록된 댓글이 없습니다");
						}else{
							
							var html = [], h = -1;
							var curpage_cnt = -1;
							var page_cnt = -1;
			               	// for(var i in data.result){
			               	for(var i =0; i < data.result.length; i++){
			               		var item = data.result[i];
			               		if(i == 0){
			               			curpage_cnt = item.curpage_cnt;
			               			page_cnt = item.page_cnt;
			               		}else{
									html[++h] = "<dd>";
					               	if(item.member_state == "D"){	// 탈퇴한 회원일 경우 회원 선생님으로 보여준다
					               		html[++h] = "<strong><span class=\"point1\">회원</span> 선생님</strong>\n";
					               	}else{
					               	   	html[++h] = "<strong><span class=\"point1\">" + item.name + "</span> 선생님</strong>\n";
					               	}
									html[++h] = "<span class=\"writeDate\">" + item.reg_dttm + "</span>";
									html[++h] = "<p>"+replaceAll(htmlReplaceAll(isNull(item.content)), "\n", "<br/>") + "</p>";
					               	if(member_id == item.member_id){					// 댓글 쓴 사람이 로그인 한 사람과 동일 인물이면
					               		html[++h] = "<span class=\"opt\">";
					               		html[++h] = "<a href=\"javascript: void(0)\" onclick=\"delCommentViewer(this, '" + member_id + "', '" + item.sns_comment_id+ "', '" + item.ref_type + "', '" + item.ref_id + "')\">삭제</a>";
					               		html[++h] = "</span>";
				               		}
									html[++h] = "</dd>";
			               		}
			               	}
			               	
			               	
			               	html[++h] = "		<input type=\"hidden\" name=\"comment_page_no\" value=\"2\">";

			               	var comment_list_html = html.join('');
			               	$("#comment_"+ref_id).append(comment_list_html);
			               	if(page_cnt > 1){
			               		$("#comment_"+ref_id).parent().append("<a href=\"javascript:void(0)\" class=\"replyMore\" onclick=\"getCommentViewer(this, '" + member_id + "', '" + ref_type + "', " + ref_id + ")\">더보기</a>\n");
			               	}
			               	$("iframe", parent.document).attr("height",$("#content").height());
							// 하단 footer를 다시 그리기위한 작업을 진행한다(IE 8에서 더보기를 클릭하면 footer가 더보기 내용과 겹쳐지는 증상이 있다)
							// 그래서 렌더링을 다시 하기 위해 웹페이지 상단의 비바샘 로고에 와곽선을 줬다 빼는 식으로 랜더링을 다시 하게 함으로써 이 증상을 없애도록 했다) 
							redrawfooter();
						}
					}else{
						alert("선택하신 글의 댓글을 가져오지 못했습니다\n잠시후 다시 이용해주세요");
					}
				},
				"json"
		);
	}

}

/**
 * 이미 댓글을 보고 있는 상황에서 더보기를 클릭했을때 댓글을 추가로 보이게 하는 함수
 * @param plus_comment_div		더보기 버튼 div 태그
 * @param member_id				로그인 한 회원 id
 * @param ref_type				알림 메시지일 경우 A, 톡일 경우 T가 들어온다
 * @param ref_id				알림 메시지 또는 톡의 고유 ID
 */
function getCommentViewer(plus_comment_div, member_id, ref_type, ref_id){
	// 서버 로직 실행 후 그 결과에 따라 하단 로직 실행
	var page_no = $("#comment_"+ref_id).find("input").val();
	$.post(CONTEXTPATH + "/sns/getComment.do",
			{ref_type : ref_type, ref_id : ref_id, page_no : page_no, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
			function(data){
				if(data.code == "0000"){
					if(data.result.length == 1){		// 검색된 레코드가 없을 경우(0번째 행은 전체 갯수및 페이지 갯수 등의 정보가 있기 때문에 얘는 빼야 한다)
						//alert("등록된 댓글이 없습니다");
					}else{
						var html = [], h = -1;
						var page_cnt = -1;
						
						
		               	
		               	// for(var i in data.result){
		               	for(var i =0; i < data.result.length; i++){
							var item = data.result[i];
							
							if(i == 0){
		               			page_cnt = item.page_cnt;
		               		}else{
								html[++h] = "<dd>";
				               	if(item.member_state == "D"){	// 탈퇴한 회원일 경우 회원 선생님으로 보여준다
				               		html[++h] = "<strong><span class=\"point1\">회원</span> 선생님</strong>\n";
				               	}else{
				               	   	html[++h] = "<strong><span class=\"point1\">" + item.name + "</span> 선생님</strong>\n";
				               	}
								html[++h] = "<span class=\"writeDate\">" + item.reg_dttm + "</span>";
								html[++h] = "<p>"+replaceAll(htmlReplaceAll(isNull(item.content)), "\n", "<br/>") + "</p>";
				               	if(member_id == item.member_id){					// 댓글 쓴 사람이 로그인 한 사람과 동일 인물이면
				               		html[++h] = "<span class=\"opt\">";
				               		html[++h] = "<a href=\"javascript: void(0)\" onclick=\"delCommentViewer(this, '" + member_id + "', '" + item.sns_comment_id+ "', '" + item.ref_type + "', '" + item.ref_id + "')\">삭제</a>";
				               		html[++h] = "</span>";
			               		}
								html[++h] = "</dd>";
		               		}
		               	}
		               	
		               	var comment_list_html = html.join('');
		               	$("#comment_"+ref_id).append(comment_list_html);						
		               	$(plus_comment_div).html();
						if(page_no == page_cnt){		// 현재 보는 페이지가 마지막 페이지면
							$(plus_comment_div).remove();
		               	}else{								// 마지막 페이지가 아닐 경우 다음 페이지 번호 설정
		               		var next_page_no = parseInt(page_no, 10) + 1;
		               		$(plus_comment_div).parent().find("input").val(next_page_no);
		               	}
						$("iframe", parent.document).attr("height",$("#content").height());
						// 하단 footer를 다시 그리기위한 작업을 진행한다(IE 8에서 더보기를 클릭하면 footer가 더보기 내용과 겹쳐지는 증상이 있다)
						// 그래서 렌더링을 다시 하기 위해 웹페이지 상단의 비바샘 로고에 와곽선을 줬다 빼는 식으로 랜더링을 다시 하게 함으로써 이 증상을 없애도록 했다) 
						redrawfooter();
					}
				}else{
					alert("선택하신 글의 댓글을 가져오지 못했습니다\n잠시후 다시 이용해주세요");
				}
			},
			"json"
	);
	
}

//타임라인에서 버튼 클릭시 레이어 제어하는 함수이다
function show_sns_btn_viewer(obj){

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
function deltalkViewer(member_id, sns_id){
	var loginid = $("#v_login_id").val();
	var content_type = $("#v_content_type").val();
	var content_id = $("#v_content_id").val();
	var check = confirm("클릭하신 톡을 삭제하시겠습니까?");
	if(check == true){
		$.post(CONTEXTPATH + "/sns/delTalk.do",
				{member_id : member_id, target_id : "", content_type : content_type, content_id : content_id, sns_id : sns_id, page_no : 1, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						alert("톡이 삭제되었습니다");
						// location.reload();
						makeTalkListViewer(loginid, content_type, content_id, 1, data);
						
						//	나의 교실의 게시물들의 댓글을 보여주기 위한 함수이다.
						//	getAutoCommentViewerInit(comment_cnt_p, member_id, ref_type, ref_id)
						for ( var i = 0 ; i < arryCnt ; i++ ) {
							getAutoCommentViewerInit(arryCntId[i], arryMemberId[i], arrySnsGubun[i], arrySnsId[i]);
						}
						pageCenter();
					}else{
						alert("톡 삭제 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
					}
				},
				"json"
		);
	}
}
	
function showCommentInputAreaViewer(obj){
	
	var loginid = $("#v_login_id").val();

	if(isNull(loginid) == ""){
		// blur 이벤트를 주어 강제로 포커스를 잃어버리게 한다. 
		// 크롬의 경우 alert를 띄우면 확인버튼을 누른뒤 alert를 띄운 객체에 다시 포커스를 주기 때문에 무한루프가 발생하게 된다
		// 그래서 alert 를 띄우기 전에 현재 객체에 포커스를 잃어버리게 blur 를 호출하도록 한다
		$(obj).parent().parent().parent().next().find("textarea").blur();				
		alert("로그인 해주세요");
	}else{
		if($(obj).parent().parent().parent().next().find("textarea").val() != ""){
			$(obj).parent().parent().parent().next().find("textarea").val("");
		}
		$(obj).parent().parent().parent().next().removeClass("none");
		$(obj).parent().parent().parent().next().removeClass("block");
		$(obj).parent().parent().parent().next().addClass("block");


		$(obj).parent().parent().parent().next().find("textarea").focus();
	}
	$("iframe", parent.document).attr("height",$("#content").height());
}

function hideCommentInputAreaViewer(obj){
	$(obj).parent().parent().parent().next().find("textarea").val("클릭하여 댓글을 남기세요.");
	$(obj).parent().parent().parent().next().removeClass("none");
	$(obj).parent().parent().parent().next().removeClass("block");
	$(obj).parent().parent().parent().next().addClass("none");
	$(obj).parent().parent().parent().next().removeClass("on");
	$(obj).parent().parent().parent().next().addClass("off");
	$(obj).prev().prev().children("span").eq(0).text("0");
	$(obj).parent().parent().parent().next().blur();		//	포커스를 잃어버리게 만든다.
}

// regCommentViewer(this, 'T', '" + item.alm_sns_id + "')

function regCommentViewer(obj, member_id, reftype, refid){
	// content를 구한다
	var content = $(obj).prev().val();
	var loginid = $("#v_login_id").val();
	if(content == ""){
		alert("댓글을 입력해주세요");
		$(obj).prev().focus();
	}else if(content.length > 150){
		alert("댓글은 150글자까지 입력 가능합니다");
		$(obj).prev().focus();
	}else{
		$.post(CONTEXTPATH + "/myclass/regComment.do",
				{memberId : member_id,toMemberId : loginid, reftype : reftype, refid : refid, content : content, page_size : PAGE_PER_SNS_RECORD, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						var page_no = 1;
					    var page_size = PAGE_PER_SNS_RECORD;
						// var page_size = 2;
					    var content_type = $("#v_content_type").val();
					    var content_id = $("#v_content_id").val();
					    var login_id = $("#v_login_id").val();

					    getContentTalkListViewer(login_id, content_type, content_id, page_no, page_size);
					    pageCenter();
					}else{
						alert("댓글 등록 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
					}
				},
				"json"
		);
	}
}

// delCommentViewer(this, '" + item.sns_comment_id+ "', '" + item.ref_type + "', '" + item.ref_id + "')
function delCommentViewer(obj, member_id, sns_comment_id, reftype, refid){
	var check = confirm("클릭하신 댓글을 삭제하시겠습니까?");
	var loginid = $("#v_login_id").val();
	if(check == true){
		$.post(CONTEXTPATH + "/myclass/delComment.do",
				{member_id : member_id,ref_member_id:loginid,target_id : loginid, sns_comment_id : sns_comment_id, reftype : reftype, refid : refid, vivasamformat : "json"}, 
				function(data){
					if(data.code == "0000"){
						alert("댓글이 삭제되었습니다");
						var page_no = 1;
					    var page_size = PAGE_PER_SNS_RECORD;
						// var page_size = 2;
					    var content_type = $("#v_content_type").val();
					    var content_id = $("#v_content_id").val();
					    var login_id = $("#v_login_id").val();

					    getContentTalkListViewer(login_id, content_type, content_id, page_no, page_size);
					    pageCenter();

						
					}else{
						alert("댓글 삭제 작업이 이루어지지 않았습니다\n잠시후 다시 해주세요");
					}
				},
				"json"
		);
	}
}
