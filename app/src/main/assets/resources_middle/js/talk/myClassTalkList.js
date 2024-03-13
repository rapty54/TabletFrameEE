
	
	//	Talk 공개 설정 변경!!!!
	function talkOpenChg(snsId, snsfromMemberId) {
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/modTalkOpenNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {fromMemberId : snsfromMemberId, snsId : snsId, vivasamformat : "json"}, 
    		success : function(data){
    			if (data.code = '0000') {
    				
    				var objBtnId = "#snsOpenGubunBtn_" + snsId;
    				var objIconId = "#snsOpenGubunIcon_" + snsId;
    				var snsOpenGubunMag = data.snsOpenGubunMsg;
    				
    				if ( data.snsOpenGubun == "Y" ) {
    					$(objIconId).attr("src",IMG_PATH + "/common/icon/lock_off1.gif");
    					$(objBtnId).addClass("on");
    				} else {
    					$(objIconId).attr("src",IMG_PATH + "/common/icon/lock_on1.gif");
    					$(objBtnId).removeClass("on");
    				}
    				
    				$(objBtnId).html(snsOpenGubunMag);
    				
    			} else {
    				alert("실패!!!");
    			} 
				$("iframe", parent.document).attr("height",$("#content").height());
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
			}        
		});
	}
	
	//	Talk 삭제!!!
	function talkDell(snsId, snsfromMemberId, contMediaGubun, contMediaId, contProviderId) {
		
		if ( confirm("의견을 삭제합니다.") ) {
			var dataVal = { fromMemberId : snsfromMemberId
					      , snsId : snsId
					      , contMediaGubun : contMediaGubun
					      , contMediaId : contMediaId
					      , contProviderId : contProviderId
					      , vivasamformat : "json"};
			talkDellProc(dataVal);
		}
	}

	//	Talk 삭제 실행!!!
	function talkDellProc(dataVal) {
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/delTalkNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data : dataVal, 
    		success : function(data){
    			if (data.code = '0000') {
    				location.reload();
    			} else {
    				alert("실패!!!");
    			} 
				$("iframe", parent.document).attr("height",$("#content").height());
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
			}        
		});
	}
	
	//	컨텐츠 공개 설정 변경!!!!
	function contOpenChg(contMediaGubun, contMediaId, contProviderId) {
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/modContentsOpenNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {contProviderId : contProviderId, contMediaGubun : contMediaGubun, contMediaId : contMediaId, vivasamformat : "json"}, 
    		success : function(data){
    			if (data.code = '0000') {
    				
    				var objBtnId = "#contOpenGubunBtn_" + contMediaGubun + "_" + contMediaId;
    				var objIconId = "#contOpenGubunIcon_" + contMediaGubun + "_" + contMediaId;
    				var contUpOpenYnMsg = data.contUpOpenYnMsg;
    				
    				if ( data.contUpOpenYn == "Y" ) {
    					$(objIconId).attr("src",IMG_PATH + "/common/icon/lock_off1.gif");
    					$(objBtnId).addClass("on");
    				} else {
    					$(objIconId).attr("src",IMG_PATH + "/common/icon/lock_on1.gif");
    					$(objBtnId).removeClass("on");
    				}
    				
    				$(objBtnId).html(contUpOpenYnMsg);
    				
    			} else {
    				alert("실패!!!");
    			} 
				$("iframe", parent.document).attr("height",$("#content").height());
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
			}        
		});
	}

	//	Contents 삭제!!!
	function contDell(contMediaGubun, contMediaId, contProviderId) {
		
		if ( confirm("자료를 삭제합니다.") ) {
			var dataVal = {contProviderId : contProviderId, contMediaGubun : contMediaGubun, contMediaId : contMediaId, vivasamformat : "json"};
			contDellProc(dataVal);
		}
	}

	//	Contents 삭제 실행!!!
	function contDellProc(dataVal) {
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/delContentsNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data : dataVal, 
    		success : function(data){
    			if (data.code = '0000') {
    				location.reload();
    			} else {
    				alert("실패!!!");
    			} 
				$("iframe", parent.document).attr("height",$("#content").height());
    		},
			error: function (xhr, ajaxOptions, thrownError){
			}, 
			complete:function (xhr, textStatus){
			}        
		});
	}

	//	컨텐츠에 talk 남긴 사람의 정보를 가지고온다!!!
	function contentTalkMember(contentTalkId, contentTalkMG, contentTalkMI) {
		
		var ctLeng = contentTalkId.length;
		
		for ( var i = 0 ; i < ctLeng ; i++ ) {
			contentTalkMemberProc(contentTalkId[i], contentTalkMG[i], contentTalkMI[i]);
		}
	}

	//	컨텐츠에 talk 남긴 사람의 정보를 가지고온다!!! - 실제 작동하는 놈!!!
	function contentTalkMemberProc(talkId, talkMG, talkMI) {

		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/contentTalkMember.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {mediaGubun : talkMG, mediaId : talkMI,vivasamformat : "json"}, 
    		success : function(data){
    			if (data.code = '0000') {
    				
    				var listLeng = data.result.length;
					var html = [];
    				
    				for ( var i = 0 ; i < listLeng ; i++ ) {
    					
    					var item = data.result[i];
    					
    					html[i] = '<a href="javascript:showRoom(\''+item.snsFromMemberId+'\')"><img src="'+item.snsFromMemberProfileImg+'" alt="" class="thum" /></a>';
    				}
    				
    				talkId = '#'+talkId;
					
    				$(talkId).empty();
					$(talkId).append(html.join(''));
    				
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
	
	//	talk 에 달린 뎃글을 가지고 온다!!!
	function talkCommentList(talkSnsId, commPageNo, commPageSize) {
		
		var tcLeng = talkSnsId.length;

		for ( var i = 0 ; i < tcLeng ; i++ ) {
			talkCommentListProc(talkSnsId[i], commPageNo, commPageSize);
		}
	}
	
	//	댓글 전체 보기!!!
	function showTalkCommt(snsId, commentCnt) {
		var commPageNo = 1;
		var commPageSize = commentCnt * 2;
		talkCommentListProc(snsId, commPageNo, commPageSize);
	}

	//	talk 에 달린 뎃글을 가지고 온다!!! - 실제 작동하는 놈!!!
	function talkCommentListProc(snsId, commPageNo, commPageSize) {

		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/talkCommentList.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {snsId : snsId, pageNo : commPageNo, pageSize : commPageSize ,vivasamformat : "json"}, 
    		success : function(data){
    			if (data.code = '0000') {
    				
    				var listLeng = data.result.length;
					var html = [];
					var commentSnsId = "";
					var rowTotal = 0;
					var pageTotal = 0;
    				
    				for ( var i = 0 ; i < listLeng ; i++ ) {
    					
    					var item = data.result[i];
    					
    					html[i]  = '<li>';
    					html[i] += '	<a href="javascript:showRoom(\''+item.commentMemberId+'\')" class="thum" ><img src="'+item.commentMemberProfileImg+'" alt="" /></a>';
    					html[i] += '	<dl>';
    					html[i] += '		<dt>';
    					html[i] += '			<a href="javascript:showRoom(\''+item.commentMemberId+'\')"><strong class="point1">'+item.commentMemberNickname+'</strong></a> 선생님';
    					html[i] += '			<span>'+item.commentRegDttm+'</span>';
    					html[i] += '		</dt>';
    					html[i] += '		<dd>'+item.commentContent+'</dd>';
    					html[i] += '	</dl>';
    					
    					if ( roomType == 'tRoom' ) {
    						if ( memberId == item.commentMemberId ) {
        						html[i] += '	<a href="javascript:delComment(\''+item.commentId+'\',\''+item.commentSnsId+'\')" class="del"><img src="' + IMG_PATH + '/common/button/btn_del3.gif" alt="삭제" /></a>';
    						}
    					} else {
    						if ( showGubun == "CT" ) {
        						if ( memberId == item.commentMemberId ) {
        							html[i] += '	<a href="javascript:delComment(\''+item.commentId+'\',\''+item.commentSnsId+'\')" class="del"><img src="' + IMG_PATH + '/common/button/btn_del3.gif" alt="삭제" /></a>';
        						}
    						} else {
    							html[i] += '	<a href="javascript:delComment(\''+item.commentId+'\',\''+item.commentSnsId+'\')" class="del"><img src="' + IMG_PATH + '/common/button/btn_del3.gif" alt="삭제" /></a>';
    						}
    					}
    					
    					html[i] += '</li>';
    					
    					rowTotal = item.rowTotal;
    					pageTotal = item.pageTotal;
    					commentSnsId = item.commentSnsId;
    				}
    				
    				
    				////// 댓글들이 있었던곳!!!!

    				var comId = "#snsComment_"+commentSnsId;
    				var callbackId = "#pageSnsComment_"+commentSnsId;
					$(comId).empty();
					$(comId).append( html.join('') );
					

					//	의견에 달리는 댓글의 전체 갯수 화면 제어이다!!!
    				var comCntId = "#talkCommtCnt_"+commentSnsId;
					$(comCntId).html(rowTotal);

					//	댓글 수가 15 을 기준을 전체보기 버튼에 대한 화면 제어 부분이다.
    				var comShowId = "#showTalkCommt_" + commentSnsId;
					if ( $(comShowId).hasClass("on") && rowTotal < 16) {
						$(comShowId).removeClass("on").addClass("none"); 
					}
					if ( $(comShowId).hasClass("none") && rowTotal > 16) {
						$(comShowId).removeClass("none").addClass("on"); 
					}
					
					//	댓글 페이징 !!! 
					//	pagingView(commPageNo, toMemberId, commPageSize, rowTotal, pageTotal, callbackId);
					
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
	
	//	댓글 작성!!!
	function regComment(snsId) {
		
		var refType = "T";	//	Talk 에 댓글을 남기는 것은  : T
		var regSnsId = "#snsId_" + snsId;
		var commentContent = $.trim( $(regSnsId).val() );
		
		if ( commentContent == "" || commentContent == null ) {
			$(regSnsId).focus();
			$(regSnsId).val("");
			alert("댓글을 작성하세요");
			return;
		}
		
		if ( commentContent.length > 150 ) {
			alert("댓글은 150자 까지만 작성할 수 있습니다.");
			return;
		} 
		
		var dataVal = {refType : refType, snsId : snsId, commentContent : commentContent, vivasamformat : "json"};
		
		regCommentProc(dataVal, snsId);
	}
	
	//	댓글 작성 - 작동!!!
	function regCommentProc(dataVal, snsId) {
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/regCommentNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  dataVal, 
    		success : function(data){
    			if (data.code = '0000') {
    				//	alert(data.code);
					var regSnsId = "#snsId_" + snsId;
					$(regSnsId).val("");
    				talkCommentListProc(snsId, commPageNo, commPageSize);
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

	//	댓글 삭제!!!
	function delComment(commentId, snsId) {
		if ( confirm("댓글을삭제합니다.") ) {
			delCommentProc(commentId, snsId);
		}
	}
	
	//	댓글 삭제!!!
	function delCommentProc(commentId, snsId) {
		
		var refType = "T";	//	Talk 에 댓글을 남기는 것은  : T
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/delCommentNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {memberId : memberId, toMemberId : toMemberId, commentId : commentId, refType : refType, snsId : snsId, vivasamformat : "json"}, 
    		success : function(data){
    			if (data.code = '0000') {
    				//	alert(data.code);
    				talkCommentListProc(snsId, commPageNo, commPageSize);
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
	
	//	썸네일 이미지 페스!!!
	function thumbnailPath (fileCdnYn, contextPath,  path) {
		//	alert(fileCdnYn+"\n"+contextPath+"\n"+path);
		var imgSrc = "";
		if (path != null && path.length > 0) {
		
			if ( fileCdnYn != null || fileCdnYn != "" ) {
				if (fileCdnYn == "Y" ) {
					imgSrc = CDN_DOMAIN;
				} else if (fileCdnYn == "L" ) {
					imgSrc = LP_DOMAIN + "/captureImage" ;
				}
			}
			
			imgSrc += path;
		} else {
			imgSrc = IMG_PATH+"/common/talk_no_img.gif";
		}
		return imgSrc;
	}

	//	파일 확장자를 이용해서 해당 파일 icon 매칭하기 
	function iconExt( saveFileName ) {
		
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
    