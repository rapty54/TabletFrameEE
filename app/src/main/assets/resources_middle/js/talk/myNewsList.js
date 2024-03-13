

		var rowTotal = 0;
		var pageTotal = 0;
	
		//	talk 댓글 달때 쓴다.
		var vCommConid = [];
	
		//	talk 미디어 정보 달때 쓴다.
		var vMediaConid = [];
		var vMediaGubun = [];
		var vMediaId = [];
		var vMdbBtn = [];
		var goodCnt = [];
		var commentCnt = [];

    	var who = 'M';					//	who : M, Y
    	var newsGroupCode = 'ALL';		//	newsGroupCode : ALL, NW100, NW200, NW300, NW400
	
		var newsConfigVal = false;
		var memberId = "";
		var toMemberId = "";	

		
		function newsList(memberId, toMemberId, who,newsGroupCode,pageNo,pageSize){

	    	//	나의 소식 or 다른 사용자 소식 구분
	    	//	소식 설정 ( 전체, 내 의견과 댓글, 내 활동 소식, 그룹, 구독 )
	    	//	who : M, Y
	    	//	newsGroupCode : ALL, NW100, NW200, NW300, NW400

			$.ajax({
	    		type : "POST",
	    		url : CONTEXTPATH + "/myclass/viewNewsList.do",
	    		async : true,
	    		cache : false,
	    		dataType : "json",
	    		data :  {memberId : memberId, toMemberId : toMemberId, who : who, newsGroupCode : newsGroupCode, pageNo : pageNo, pageSize : pageSize ,vivasamformat : "json"}, 
	    		success : function(data){
					if(data.code == "0000"){
						
						var rleng = data.result.length;
						var html = [];
						var arryJ = -1;
						
						for ( var i = 0 ; i < rleng ; i++ ) {

							var item = data.result[i];

							rowTotal = item.rowTotal;
							pageTotal = item.pageTotal;
							
							if ( item.gubunName == "TALK" ) {

								var name = '';

								++arryJ;
								vCommConid[arryJ] = item.contentsId;

								goodCnt[item.contentsId] = item.goodCnt;
								commentCnt[item.contentsId] = item.commentCnt;
								
								if ( item.gubun == "NW101" ) {
									vMediaConid[arryJ] = item.contentsId;
									vMediaGubun[arryJ] = item.classId;
									vMediaId[arryJ] = item.fileId;
									//	name = '<span class="point1">' + item.memberNickname + '</span> 선생님';
									name = '<a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span> 선생님</a>';
									name += '<input type="hidden" id="ownerId_' + item.contentsId + '" value="' + item.memberId + '" />';
								} else if( item.gubun == "NW102" ) {
									vMediaConid[arryJ] = item.contentsId;
									vMediaGubun[arryJ] = item.classId;
									vMediaId[arryJ] = item.fileId;
									//	name = '<a href="'+CONTEXTPATH+item.goOwnerUrl+'" target="_parent" ><span class="point1">' + item.ownerNickname + '</span> 선생님 에게</a>';
									if ( item.goMemberUrl == "" ) {
										//	name = '<span class="point1">' + item.memberNickname + '</span> 선생님 ▸ ';
										name = '<a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span> 선생님</a> ▸ ';
									} else {
										//	name = '<a href="'+CONTEXTPATH+item.goMemberUrl+'" target="_parent" ><span class="point1">' + item.memberNickname + '</span> 선생님 ▸ </a>';
										name = '<a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span> 선생님</a> ▸ ';
									}
									//	name += '<a href="'+CONTEXTPATH+item.goOwnerUrl+'" target="_parent" ><span class="point1">' + item.ownerNickname + '</span> 선생님</a>';
									name += '<a href="javascript:showRoom(\''+item.ownerId+'\')" ><span class="point1">' + item.ownerNickname + '</span> 선생님</a>';
									name += '<input type="hidden" id="ownerId_' + item.contentsId + '" value="' + item.memberId + '" />';
								} else if( item.gubun == "NW103" ) {
									vMediaConid[arryJ] = item.contentsId;
									vMediaGubun[arryJ] = item.classId;
									vMediaId[arryJ] = item.fileId;
									//	name = '<a href="'+CONTEXTPATH+item.goMemberUrl+'" target="_parent" ><span class="point1">' + item.memberNickname + '</span> 선생님 ▸ </a>';
									name = '<a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span> 선생님</a> ▸ ';
									if (item.goOwnerUrl == "") {
										//	name += '<span class="point1">' + item.ownerNickname + '</span> 선생님';
										name += '<a href="javascript:showRoom(\''+item.ownerId+'\')" ><span class="point1">' + item.ownerNickname + '</span> 선생님</a>';
										name += '<input type="hidden" id="ownerId_' + item.contentsId + '" value="' + item.ownerId + '" />';
									} else {
										//	name += '<a href="'+CONTEXTPATH+item.goOwnerUrl+'" target="_parent" ><span class="point1">' + item.ownerNickname + '</span></a> 선생님';
										name += '<a href="javascript:showRoom(\''+item.ownerId+'\')" ><span class="point1">' + item.ownerNickname + '</span> 선생님</a>';
										name += '<input type="hidden" id="ownerId_' + item.contentsId + '" value="' + item.ownerId + '" />';
									}
								} else if( item.gubun == "NW104" ) {
									vMediaConid[arryJ] = item.contentsId;
									vMediaGubun[arryJ] = item.classId;
									vMediaId[arryJ] = item.linkContentsId;
									//	name = '<span class="point1">' + item.memberNickname + '</span> 선생님';
									name = '<a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span> 선생님</a>';
									name += '<input type="hidden" id="ownerId_' + item.contentsId + '" value="' + item.memberId + '" />';
								}
								//	talk 형태의 리스트 
html[i] = '<div class="replyWrap">                                                                                         \n';
html[i] += '	<dl id="comm_' + item.contentsId + '">                                                                       \n';
html[i] += '		<dt>                                                                                                        \n';
if ( item.memberProfileImgPath == "" || item.memberProfileImgPath == null ) {
	html[i] += '			<span class="pic"><img src="'+CONTEXTPATH+'/vivasamfiledir/UP/default_user.gif" alt="" /></span>                        \n';
} else {
	html[i] += '			<span class="pic"><img src="' + thumbnailPath('N',CONTEXTPATH,item.memberProfileImgPath) + '" alt="" /></span>                        \n';
}
html[i] += '			<strong class="user">' + name + '</strong>                   \n';
html[i] += '			<span class="writeDate">' + item.regDttm + '</span>                                                  \n';
html[i] += '			<p>                                                                                                       \n';
html[i] += ' ' + item.content + '                                                       \n';
html[i] += '			</p>                                                                                                      \n';
html[i] += '			<span class="opt">                                                                                        \n';
//	html[i] += '				<a href="javascript: void(0)">수정</a>  \n';
//	html[i] += '				| \n';

if ( toMemberId == memberId ) {
	html[i] += '				<a href="javascript: delNewsTalk(\'' + item.contentsId + '\', \'' + item.classId + '\', \'' + item.linkContentsId + '\')">삭제</a>   \n';
}


html[i] += '			</span>                                                                                                   \n';
html[i] += '			<!-- //미디어 자료 -->                                                                                    \n';
html[i] += '			<div id="'+item.classId+'_'+item.contentsId+'" class="mediaData"></div>                              \n';
html[i] += '			<!-- 댓글이 들어가야 한다. -->                                                                            \n';
html[i] += '		</dt>                                                                                                       \n';
html[i] += '	</dl>                                                                                                         \n';
html[i] += '	<div class="replyApp" style="">                                                                               \n';
html[i] += '        <input type="text" name="commentText" class="textL" id="comment_' + item.contentsId + '" val="' + item.contentsId + '" />';
html[i] += '		<a href="javascript:void(0)"><img src="' + IMG_PATH + '/common/button/btn_app.gif" name="regComment" val="' + item.contentsId + '" alt="등록" /></a>                            \n';
html[i] += '	</div>                                                                                                        \n';
//	더보기는 제어가 되어야 한다.
//	html[i] += '	<a href="#" class="replyMore">더보기</a>                                                                      \n';
html[i] += '</div>                                                                                                          \n';

							
							} else {
								
								var name = item.memberName;
								var toName = item.toMemberName;
								var title = '';
								
								if ( item.gubun == 'NW105' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">' + item.className + '카페</span>에 ' + item.content + '(을)를 작성하셨습니다.</a>';
									title = '글등록 - <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">[' + item.className + '카페</span>] ' + item.content + '</a>';
								} else if ( item.gubun == 'NW106' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">문의 및 신고</span>에 ' + item.content + '(을)를 작성하습니다.</a>';
									title = '문의및 신고 등록 - <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">' + item.content + '</a>';
								} else if ( item.gubun == 'NW107' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">자료요청</span>에 ' + item.content + '(을)를 작성하셨습니다.</a>';
									title = '자료요청 등록 - <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" ><span class="point1">' + item.content + '</a>';
								} else if ( item.gubun == 'NW108' ) {
									//	title = item.className + ' 카페' + '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '게시에 댓글을 등록하셨습니다.</a>';
									title = '댓글등록 - [' + item.className + ' 카페' + '] <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW109' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goOwnerUrl+'" target="_parent" ><span class="point1">' + item.ownerNickname + '</span>선생님</a> 의견에 댓글을등록 하셨습니다.';
									title = '댓글등록 - <a href="javascript:showRoom(\''+item.ownerId+'\')" ><span class="point1">' + item.ownerNickname + '</span>선생님</a> 의견';
								} else if ( item.gubun == 'NW201' ) {
									//	title = '<a href="javascript:contentViewPop(\'' + item.classId + '\', \'' + item.contentsId + '\')" >' + item.content + '(을)를 추천하셨습니다.</a>';		//	2013.02.08 : eoraptor - 컨텐츠 뷰어 연
									title = '추천 - <a href="javascript:contentViewPop(\'' + item.classId + '\', \'' + item.contentsId + '\')" >' + item.content + '</a>';		//	2013.02.08 : eoraptor - 컨텐츠 뷰어 연
									//	title = '<a href="_goContentsView(\'' + item.classId + '\', \'' + item.contentsId + '\', \'schoolLvlId\', \'textbookId\')" >' + item.content + '(을)를 추천하셨습니다.</a>';		//	2013.02.08 : eoraptor - 컨텐츠 뷰어 연
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '(을)를 추천하셨습니다.</a>';
								} else if ( item.gubun == 'NW202' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goOwnerUrl+'" target="_parent" ><span class="point1">' + item.ownerNickname + '</span>선생님의</a> 의견을 추천하셨습니다.';
									title = '추천 - <a href="javascript:showRoom(\''+item.ownerId+'\')" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW203' ) {
									//	title = item.className + ' 카페' + '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '게시글을 추천하셨습니다.</a>';
									title = '추천 - <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW204' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '을 담기 하셨습니다.</a>';		//	2013.02.08 : eoraptor - 공통뷰어로 보여주기 위해서 수정
									//	title = '<a href="javascript:contentViewPop(\''+item.classId+'\', \''+item.contentsId+'\')" >' + item.content + '(을)를 담기 하셨습니다.</a>';
									title = '담기 - <a href="javascript:contentViewPop(\''+item.classId+'\', \''+item.contentsId+'\')" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW205' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '을 업로드 하셨습니다.</a>';		//	2013.02.08 : eoraptor - 공통뷰어로 보여주기 위해서 수정
									//	title = '<a href="javascript:contentViewPop(\''+item.classId+'\', \''+item.contentsId+'\')" >' + item.content + '(을)를 업로드 하셨습니다.</a>';
									title = '업로드 - <a href="javascript:contentViewPop(\''+item.classId+'\', \''+item.contentsId+'\')" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW206' ) {
									//	title = '<a href="javascript:file_down(\''+item.classId+'\', \'' + item.contentsId+ '\')" target="_parent" >' + item.content + '을 다운로드 하셨습니다.</a>';
									//	title = '<a href="javascript:contentViewPop(\''+item.classId+'\', \'' + item.contentsId+ '\')" >' + item.content + '(을)를 다운로드 하셨습니다.</a>';
									title = '다운로드 - <a href="javascript:contentViewPop(\''+item.classId+'\', \'' + item.contentsId+ '\')" >' + item.content + '</a>';
								} else if ( item.gubun == 'NW300' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.className + '에</a> <a href="javascript:goUrl(\''+item.goMemberUrl+'\')"><span class="point1">' + item.memberNickname + '</span>선생님께서</a> 글을 등록하셨습니다.';
									//	title = '<a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.className + '에</a> <a href="'+CONTEXTPATH+item.goMemberUrl+'" target="_parent" ><span class="point1">' + item.memberNickname + '</span>선생님 께서</a> 글을 등록하셨습니다.';
									title = '글등록 - <a href="javascript:void(0);" onclick="'+item.goUrl+'" target="_parent" >[' + item.className + ']</a> <a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">' + item.memberNickname + '</span>선생님</a>';
								} else if ( item.gubun == 'NW400' ) {
									//	title = '<a href="'+CONTEXTPATH+item.goMemberUrl+'" target="_parent" ><span class="point1">' + item.memberNickname + '</span>선생님께서</a> <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >자료를 등록하셨습니다.</a>';
									title = '자료등록 - <a href="javascript:showRoom(\''+item.memberId+'\')" ><span class="point1">[' + item.memberNickname + ']</span></a> <a href="'+CONTEXTPATH+item.goUrl+'" target="_parent" >' + item.content + '</a>';
								}

								//	알림 형태의 리스트들
								html[i] = '<div class="infoNews1" style="background: url(\''+ IMG_PATH + '/common/icon/' + item.icon + '\') no-repeat 27px 50%;"> \n';
								html[i] += title + ' \n';
								html[i] += '	<span class="writeDate">' + item.regDttm + '</span> \n';
								html[i] += '</div> \n';
							}
						}

		    	
						if ( rleng < 1 ) {
							$("#viewNewsListEmp").removeClass("none").addClass("block");
							$("#viewNewsList").removeClass("block").addClass("none");
						} else {
							$("#viewNewsList").removeClass("none").addClass("block");
							$("#viewNewsListEmp").removeClass("block").addClass("none");
							$("#viewNewsList").empty();
							$("#viewNewsList").append(html.join(''));
						}
						
						//	파일 내용을 보여주기 위한 부분이다.
						viewNewsMedia();
						
						//	talk 형식의 게시물의 댓글을 보여주기 위한 부분이다.
						viewNewsCommList();
						$("iframe", parent.document).attr("height",$("#content").height());
					} else {
						//	alert("실패!!!");
					}
	    		},
	    		error: function (xhr, ajaxOptions, thrownError){
	    		}, 
	    		complete:function (xhr, textStatus){
	    			if ( who == "Y" ) {
						pagingView(pageNo, "#pageHtmlView", pageSize, rowTotal, pageTotal);
						isLoadingTalkList = false;
	    			}
	    			$("iframe", parent.document).attr("height",$("#content").height());
	    		}         
	    	});
		}

		function viewNewsCommList() {
			
			var rLength = vCommConid.length;
		
			for ( var i = 0 ; i < rLength ; i++ ) {
				
				var refId = vCommConid[i];

				$.ajax({
		    		type : "POST",
		    		url : CONTEXTPATH + "/myclass/viewNewsCommList.do",
		    		async : false,
		    		cache : false,
		    		dataType : "json",
		    		data :  {refId : refId, vivasamformat : "json"}, 
		    		success : function(data){
						if(data.code == "0000"){
							
							var html = showCommentHtml(data);
							
							var obj = '#comm_'+refId;
							
							$(obj).append(html);
							
						} else {
							//	alert("실패!!!");
						}
		    		},
		    		error: function (xhr, ajaxOptions, thrownError){
		    		}, 
		    		complete:function (xhr, textStatus){
		    		}         
		    	});
			}
		}
		
		//	SNS Talk 리스트에 댓글을 보여주는 놈이다!
		function showCommentHtml(data){
			
			var rLength = data.result.length;
			var html = '';
			var toMemberId = $("#toMemberId").val(); 
			var memberId = $("#memberId").val(); 
			
			for ( var i = 0 ; i < rLength ; i++ ) {
				
				var item = data.result[i];
				
				html += '<dd>';
				html += '	<a href="javascript:showRoom(\''+item.memberId+'\')"><strong><span class="point1">'+item.memberNickname+'</span> 선생님</strong></a>';
				html += '	<span class="writeDate">' + item.regDttm +  '</span>';
				html += '	<p>' + item.content + '</p>';
				html += '	<span class="opt">';
				//	html += '		<a href="javascript: void(0)">수정</a>';
				//	html += '		| ';
				if( toMemberId == memberId ) {
					html += '		<a href="javascript:commentDel( \'' + item.snsCommentId + '\' , \'' + item.refId + '\', \'' + item.memberId + '\' )">삭제</a>';
				}
				html += '	</span>';
				html += '</dd>';
			}
			
			return html;
		}
		
		function commentDel(commentId , refid, toMemberId ) {
			
			var memberId = $("#memberId").val(); 
			
			delComment(memberId, toMemberId, commentId, 'T', refid);
		}
		
		function delNewsTalk( sns_id, content_type, content_id) {
			
			var memberId = $("#memberId").val(); 
			
			deltalk(memberId, sns_id, content_type, content_id);
		}
		
		
		function viewNewsMedia() {
			
			var mediaConid, mediaId, mediaGubun;
			
			var rLength = vMediaConid.length;
			var Html = '';
			
			for ( var i = 0 ; i < rLength ; i++ ) {
				
				if ( vMediaId[i] != null && vMediaId[i] != '' ) {
					
					mediaId = vMediaId[i];
					mediaGubun = vMediaGubun[i];
					mediaConid = vMediaConid[i];
					vMdbBtn[mediaConid] = false;
					
					$.ajax({
			    		type : "POST",
			    		url : CONTEXTPATH + "/myclass/viewNewsMedia.do",
			    		async : false,
			    		cache : false,
			    		dataType : "json",
			    		data :  {mediaId : mediaId, mediaGubun : mediaGubun, vivasamformat : "json"}, 
			    		success : function(data){
							if(data.code == "0000"){

								var item = data.result;
								
								//	파일 종류별 타이틀이 보여지는 부분이 변경되어야 한다.
								
								var titleIcon = "";
								
								if ( item.fileType == "FT202" ) {			//	음원 : icon
									titleIcon = "ico_mp3T.png";
								} else if (item.fileType == "FT205") {		//	문서 : icon ( 문서일 경우 각 팔일별로 title icon 이 변경되어야 한다. )
									var iconEx = iconExt( item.saveFileName );
									titleIcon = "ico_"+iconEx+"T.png";
								} else if (item.fileType == "FT206") {		//	링크 : icon
									titleIcon = "ico_linkT.png";
								} else if (item.fileType == "FT207") {		//	멀강 : icon
									titleIcon = "ico_zipT.png";
								} else if (item.fileType == "CN020") {		//	사전 : icon
									titleIcon = "ico_dicT.png";
								} else if (item.fileType == "FT201") {		//	동영상 : thumbnail img
									titleIcon = "ico_mp4T.png";
								} else if (item.fileType == "FT203") {		//	이미지 : thumbnail img
									titleIcon = "ico_jpgT.png";
								} else if (item.fileType == "FT204") {		//	플레쉬 : thumbnail img
									titleIcon = "ico_swfT.png";
								} else if (item.fileType == "CN070") {		//	교안 : thumbnail img
									titleIcon = "icon_CN070.gif";
								}

								//	타이틀 관련 해서 나오는 부분
								Html = '<div class="mtitArea block"> \n';
								Html += '   <a href="javascript:void(0)" name="mdbBtn" idVal="'+mediaConid+'">';
								Html += '	<strong id="mtit_'+mediaConid+'" class="mtit">                 \n';

								Html += '		<img src="'+IMG_PATH+'/common/icon/' + titleIcon  + '" alt="title icon" /> \n';
								
								Html += '	</strong> \n';
								Html += '   </a>';
								Html += '	<span class="nBtn curD"><a href="javascript:void(0)" onfocus="this.blur();"> \n';
								Html += '		<img src="'+IMG_PATH+'/common/button/label_rec.gif" alt="추천" /> \n';

								var goodCntVal = item.goodCnt;
								
								if ( goodCntVal == '' || goodCntVal == null ) {
									goodCntVal = 0;
								}
								
								Html += '		<em>' + goodCntVal + '</em> \n';
								
								Html += '	</a></span> \n';
								Html += '	<span class="nBtn curD"><a href="javascript:void(0)" onfocus="this.blur();"> \n';
								Html += '		<img src="'+IMG_PATH+'/common/button/label_idea.gif" alt="의견" /> \n';
								//	 우선 멀티미디어 의견 수가 나오게 했다.

								var talkCntVal = item.talkCnt;

								if ( talkCntVal == '' || talkCntVal == null ) {
									talkCntVal = 0;
								}
								
								Html += '		<em>' + talkCntVal + '</em> \n';
								
								Html += '	</a></span> \n';
								Html += '</div> \n';

								//	멀티미디어 본문 관련
								Html += '<div id="mdb_'+mediaConid+'" class="mediaBox none"> \n';
								Html += '		<a href="javascript:void(0)"  onClick="parent._goContentsView(\''+item.mediaGubun+'\', \'' + item.mediaId + '\')" > \n';

								if ( item.fileType == "FT201" || item.fileType == "FT203" || item.fileType == "FT204" ) {
									Html += '	<span class="mThum"><img src="' + thumbnailPath(item.fileCdnYn,CONTEXTPATH,item.thumbnailPath)  + '" alt="" class="thum" /></span> \n';
								} else if ( item.fileType == "CN070" ) {
									Html += '	<span class="mThum"><img src="' + thumbnailPath('L',CONTEXTPATH,item.thumbnailPath)  + '" alt="" class="thum" /></span> \n';
								}
								
								Html += '		</a> \n';
								Html += '	<ul> \n';
								Html += '		<li class="thumTit"> \n';
								Html += '		<a href="javascript:void(0)"  onClick="parent._goContentsView(\''+item.mediaGubun+'\', \'' + item.mediaId + '\')" > \n';
								Html += '			<img src="'+IMG_PATH+'/common/icon/' + titleIcon + '" alt="title icon" /> \n';
								Html += '			<strong class="point1">' + item.subject + '</strong> \n';
								Html += '		</a> \n';
								Html += '		</li> \n';
								
								//	Html += '		<li class="sFont">' + item.regDttm + '</li> \n';
								
								var content = "";
								
								if ( item.fileType == "CN070" ) {
									content += '<li class="lineLink">';
									content += '<a href="javascript:_goContentsView(\'CN070\',\''+item.mediaId+'\',\''+item.schoolLvl+'\',\''+item.textbook+'\')">';
									
									if ( item.labTextbook != null && item.labTextbook != "" ) {
										content += '<span>'+item.orderNoTextbook+') '+item.labTextbook+'</span>';
									}
									if ( item.labUnit1 != null && item.labUnit1 != "" ) {
										content += '<span>'+item.orderNoUnit1+') '+item.labUnit1+'</span>';
									}
									if ( item.labUnit2 != null && item.labUnit2 != "" ) {
										content += '<span>'+item.orderNoUnit2+') '+item.labUnit2+'</span>';
									}
									if ( item.labUnit3 != null && item.labUnit3 != "" ) {
										content += '<span>'+item.orderNoUnit3+') '+item.labUnit3+'</span>';
									}
									content += '</a>';
									content += '</li>';
								} else {
									if ( item.content != null && item.content != "" ) {
										content += '<li class="thumTxt">' + cutContent ( item.content ) + '</li>';
									}
								}
								Html += content;
								
								//	Html += '		<li class="origin">출처 : ' + item.copyrightName + '</li> \n';
								
								
								Html += '	</ul> \n';
								//	Html += '	<a href="javascript:void(0)" name="mdbBtn" idVal="'+mediaConid+'" ><img class="close" src="'+IMG_PATH+'/common/button/btn_close.gif" alt="닫기"  /></a> \n';
								Html += '</div> \n';
								
								//	alert(Html);
								
								var obj = '#'+item.mediaGubun+'_' + mediaConid;
								
								//	alert(obj);
								
								$(obj).append(Html);

								//	멀티미디어 뷰어 우선 열기!!!
								actMdbView( mediaConid );
								
							} else {
								//	alert("실패!!!");
							}
			    		},
			    		error: function (xhr, ajaxOptions, thrownError){
			    		}, 
			    		complete:function (xhr, textStatus){
			    		}         
			    	});
				}
			}
		}

		function cutContent( value ) {
			var leng = value.length;
			//	alert(leng);
			
			if ( leng > 200 ) {
				value = value.substring(0, 200) + "...";
			}
			
			return value;
		}
		
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
		
		$(function(){
			
			$("[name=commentText]").live("keypress",function(e){
				if(e.keyCode == 13 ){
					var memberId = $("#memberId").val();
					var ownerId = "#ownerId_"+$(this).attr("val");
					var toMemberId = $(ownerId).val();
					var talkId = $(this).attr("val");
					var commentId = "#comment_"+$(this).attr("val");
					
					regComment(talkId,commentId, memberId, toMemberId);
					
					$("iframe", parent.document).attr("height",$("#content").height());
					//	alert($("#content").height());
				}
			});
			
			$("[name=regComment]").live("click", function(){
				var memberId = $("#memberId").val();
				var ownerId = "#ownerId_"+$(this).attr("val");
				var toMemberId = $(ownerId).val();
				var talkId = $(this).attr("val");
				var commentId = "#comment_"+$(this).attr("val");
				
				regComment(talkId,commentId, memberId, toMemberId);
				
				$("iframe", parent.document).attr("height",$("#content").height());
				//	alert($("#content").height());
			});

			//	talk 멀티미디어 창 보여주기 위한 부분 3초후 동작
		    var showDelay = 1500; //will be delayed half a second
		    var showTimer = null;
            
			$("[name=mdbBtn]").live("mouseover",function(){

				var idVal = $(this).attr("idVal");
				
				if (showTimer)//if there is already such event this cancels the setTimeout()
			            clearTimeout(showTimer);
				
		        showTimer = setTimeout(function() //executes a code some time in the future
		        {
		            	actMdbView(idVal);
		        }, showDelay);
			});
			$("[name=mdbBtn]").live("mouseout",function(){
				clearTimeout(showTimer);
			});
			
			// talk 멀티미디어 창 보여주기 위한 버튼 동작
			$("[name=mdbBtn]").live("click",function(){
				var idVal = $(this).attr("idVal");
				actMdbView(idVal);
			});			
		});
		
		//	talk 에 멀티미디어 보여주는 부분이다.
		function actMdbView( idVal ){
			var mtitObj = "#mtit_"+idVal;
			var mdbObj = "#mdb_"+idVal;
			
			if ( vMdbBtn[idVal] ) {
				
				vMdbBtn[idVal] = false;
				
				//	mtit_idVal none -> block
				//	mdb_idVal block -> none
				
				$(mtitObj).removeClass("none");
				$(mtitObj).addClass("block");
				
				$(mdbObj).removeClass("block");
				$(mdbObj).addClass("none");
				
			} else {
				
				vMdbBtn[idVal] = true;
				
				//	mtit_idVal block -> none
				//	mdb_idVal none -> block 으로

				$(mtitObj).removeClass("block");
				$(mtitObj).addClass("none");
				
				$(mdbObj).removeClass("none");
				$(mdbObj).addClass("block");
			}
        	$("iframe", parent.document).attr("height",$("#content").height());
		}

		function contentViewPop(gubun, id){		
			var url = CONTEXTPATH+"/commonviewer/viewercontent.do?gubun="+gubun+"&id="+id+"&entrypoint=0&folderYN=Y";		
			window.open(url,"","scrollbars=auto,toolbar=0,location=no,resizable=0,status=0,menubar=0,width=782px,height=999,left=0,top=0");	
		}

		
	    function goUrl(url) {
	    	if (url != '') {
	    		url = CONTEXTPATH + url;
	    		$(parent.location).attr("href",url);
	    	}
	    }