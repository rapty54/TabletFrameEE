
	var contModId = "";

	//	수정 취소!!!!
	function modifyCancel( contId ) {

		contModId = "";
		var contObjId = "#cont_" + contId;
		var contEditObjId = "#cont_" + contId + "_edit";

		$(contObjId).removeClass("none").addClass("on");
		$(contEditObjId).removeClass("on").addClass("none");
		
		$(contEditObjId).empty();
	}

	//	Talk 수정!!!
	function talkModified(snsId, snsOpenGubun, snsfromMemberId) {
		myClassTalkModForm(snsId, snsOpenGubun, snsfromMemberId);
	}

	//	Talk 수정 검증!!!
	function talkModify(snsId, snsfromMemberId) { 

		var contObjId = "#talkModContent_" + snsId; 
		var chkTalkContent = $.trim( $(contObjId).val() );
		
		if ( chkTalkContent == "" || chkTalkContent == null ) {
			alert("내용 입력은 필수 입니다.");
			return;
		}
		
		if ( chkTalkContent.length > 500 ) {
			alert("내용이 500 자를 초과하였습니다.");
			return;
		}
		
		talkModifyProc(snsId, snsfromMemberId);
	}
	
	//	 Talk 수정 실행!!!
	function talkModifyProc(snsId, snsfromMemberId) {

		var contObjId = "#talkModContent_" + snsId; 
		var openObjId = "#talkModOpenGubun_" + snsId; 

		var talkContent = $.trim( $(contObjId).val() );
		var talkOpenGubun = $(openObjId).val();
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/modTalkNew.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  {fromMemberId : snsfromMemberId, snsId : snsId, talkContent : talkContent, talkOpenGubun : talkOpenGubun, vivasamformat : "json"}, 
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
	
	//	Talk 수정폼!!!
	function myClassTalkModForm(snsId, snsOpenGubun, snsfromMemberId) {
		
		//	각종 값들 초기화!!!
		$('.groupApp>.tab>a').removeClass("on");
		$('.groupApp>.tab>a').each(function(idx){
			if ( idx == "0" ) {
				$(this).addClass("on");
			}
		});
		
		$('.grCnt').removeClass('on');
		$('.grCnt').eq(0).addClass('on');

		if ( contModId != "" && contModId != null ) {
			//	alert("talk - contModid is not null!!!");
			$('.grCnt_Mod').removeClass("on").addClass('none');
			$('.grCnt_Mod').parent().empty();
			$(contModId).removeClass("none");
		}
		//	각종 값들 초기화!!!

		var contObjId = "#cont_" + snsId;
		contModId = contObjId; 
		var contEditObjId = "#cont_" + snsId + "_edit";

		$(contObjId).removeClass("on").addClass("none");
		$(contEditObjId).removeClass("none").addClass("on");
		
		var html = [];
		
		var talkEditContent = $(contObjId).text();
		
		html[0]  = '<!-- talk -->';
		html[0] += '<div class="grCnt_Mod on">';
		html[0] += '	<div id="modTalkBox" class="box" style="padding-left:0" >';
		html[0] += '		<div class="talkCnt">';
		html[0] += '			<textarea id="talkModContent_' + snsId + '" style="width: 637px; height: 100px; overflow: auto" class="textarea" >' + talkEditContent + '</textarea>';
		html[0] += '		</div>';
		html[0] += '	</div>';
		html[0] += '	<div class="grBtn">';
		html[0] += '        <input type="hidden" id="talkModOpenGubun_' + snsId + '" value="' + snsOpenGubun + '" />';
		html[0] += '		<div class="float_l">';
		if ( snsOpenGubun == "N" ) {
			html[0] += '			<a href="javascript:openYN(\'talkModOpenGubun_' + snsId + '\')" ><img id="talkModOpenGubun_' + snsId + '_Img" src="' + IMG_PATH + '/common/button/btn_closed.gif" alt="비공개" /></a>';
		} else {
			html[0] += '			<a href="javascript:openYN(\'talkModOpenGubun_' + snsId + '\')" ><img id="talkModOpenGubun_' + snsId + '_Img" src="' + IMG_PATH + '/common/button/btn_open.gif" alt="공개" /></a>';
		}
		html[0] += '			<a href="javascript:modifyCancel(\'' + snsId + '\')" ><img src="' + IMG_PATH + '/common/button/btn_cancel2.gif" alt="취소" /></a>';
		html[0] += '		</div>';
		html[0] += '		<a href="javascript:talkModify(\'' + snsId + '\',\'' + snsfromMemberId + '\')"><img src="' + IMG_PATH + '/common/button/btn_app3.gif" alt="등록" /></a>';
		html[0] += '	</div>';
		html[0] += '</div>';
		html[0] += '<!-- //talk -->';

		$(contEditObjId).empty();
		$(contEditObjId).append(html.join(''));
		
		$(".setLayer").hide();
	}

	//	content 수정 폼을 호출한다!!!
	function contModified( contFileType, contMediaGubun, contMediaId, contProviderId ) {
		myClassContentModForm( contFileType, contMediaGubun, contMediaId, contProviderId );
	}
	
	//	content 수정 검증!!!
	function contModify( contFileType, contMediaGubun, contMediaId, contProviderId ) {

		var chkContModSubject = $.trim( $("#contModSubject").val() );	
		
		if ( chkContModSubject == '' || chkContModSubject == null ) {
			alert("제목 입력은 필수 입니다.");
			return;
		}
		
		if ( chkContModSubject.length > 100 ) {
			alert("제목은 최대 100자 까지 입니다.");
			return;
		}
		
		if ( $.trim( $("#contModKeyword").val() ) > 500 ) {
			alert("키워드는 최대 100자 까지 입니다.");
			return;
		}	
		
		if ( $.trim( $("#contModContent").val() ) > 500 ) {
			alert("설명이 500자를 초과하였습니다.");
			return;
		}		
		
		contModifyProc( contFileType, contMediaGubun, contMediaId, contProviderId );
	}
	
	//	content 수정 실행!!!
	function contModifyProc( contFileType, contMediaGubun, contMediaId, contProviderId ) {
		
		var contModSubject		= $.trim( $("#contModSubject").val() );		
		var contModEducourseId	= $("#contModEducourseId").val();		
		var contModKeyword		= $("#contModKeyword").val();		
		var contModContent		= $.trim( $("#contModContent").val() );		
		var contModOpenYN		= $("#contModOpenYN").val();
		
		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/modCont.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  { contFileType		: contFileType
    			    , contMediaId		: contMediaId
    			    , contProviderId	: contProviderId
    			    , contSubject		: contModSubject
    			    , contEducourseId	: contModEducourseId
    			    , contKeyword		: contModKeyword
    			    , contContent		: contModContent
    			    , contUpOpenYn		: contModOpenYN
    			    , vivasamformat		: "json" }, 
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
	
	//	content 수정 화면 출력!!!!
	function myClassContentModForm( contFileType, contMediaGubun, contMediaId, contProviderId ) {

		$('.groupApp>.tab>a').removeClass("on");
		$('.groupApp>.tab>a').each(function(idx){
			if ( idx == "0" ) {
				$(this).addClass("on");
			}
		});
		
		$('.grCnt').removeClass('on');
		$('.grCnt').eq(0).addClass('on');

		if ( contModId != "" && contModId != null ) {
			//	alert("cont - contModid is not null!!!");
			$('.grCnt_Mod').removeClass("on").addClass('none');
			$('.grCnt_Mod').parent().empty();
			$(contModId).removeClass("none");
		}
		

		var contObjId = '#cont_' + contMediaGubun + '_' + contMediaId;
		contModId = contObjId;
		
		var contEditObjId = '#cont_' + contMediaGubun + '_' + contMediaId + '_edit';
		
		var html = [];
		

		$.ajax({
    		type : "POST",
    		url : CONTEXTPATH + "/myclass/getContVal.do",
    		async : true,
    		cache : false,
    		dataType : "json",
    		data :  { contFileType : contFileType
    			    , contMediaGubun : contMediaGubun
    			    , contMediaId : contMediaId
    			    , contProviderId : contProviderId
    			    , vivasamformat : "json" }, 
    		success : function(data){
    			
    			
    			if (data.code = '0000') {

    				var item = data.result;
    				
    				html[0]  = '<!-- contents modify -->';
    				html[0] += '<div class="grCnt_Mod on">';
    				html[0] += '	<div class="box">';
    				html[0] += '		<div class="fileCnt">';
    				html[0] += '			<p class="attention">';
    				html[0] += '				<strong>수정합니다.</strong>';
    				html[0] += '				<span class="essential">필수항목</span>';
    				html[0] += '			</p>';
    				html[0] += '			<div class="groupTbl">';
    				html[0] += '				<table>';
    				html[0] += '					<colgroup>';
    				html[0] += '						<col width="16%" />';
    				html[0] += '						<col width="*" />';
    				html[0] += '					</colgroup>';
    				html[0] += '					<tr>';
    				html[0] += '						<th><img src="' + IMG_PATH + '/myclass/myNews/th_tit.gif" alt="제목" class="star" /></th>';
    				html[0] += '						<td>';
    				html[0] += '							<input type="text" id="contModSubject" class="text" maxlength="100" style="width: 400px;" value="'+item.contSubject+'" />';
    				html[0] += '						</td>';
    				html[0] += '					</tr>';
    				html[0] += '					<tr>';
    				html[0] += '						<th><img src="' + IMG_PATH + '/myclass/myNews/th_info.gif" alt="교과정보" /></th>';
    				html[0] += '						<td class="chkArea">';
    				
    				
    				if ( item.contEducourseId == "999999" || item.contEducourseId == null || item.contEducourseId == "" ) {

        				html[0] += '							<input type="radio" class="rdo" name="contModEdu" value="N" checked/><label>미선택</label>';
        				html[0] += '							<input type="radio" class="rdo" name="contModEdu" value="Y" /><label>선택</label>';
        				html[0] += '							<input type="hidden" id="contModEducourseId" value="'+item.contEducourseId+'"/>';
        				html[0] += '							<span id="contModEducourseText" class="subStep none"></span>';
        				html[0] += '							<a href="javascript:void(0)" id="contModEducourseBtn" class="educourseBtn none"><img src="' + IMG_PATH + '/common/button/btn_input.gif" alt="입력하기" /></a>';
        				
    				} else {

        				html[0] += '							<input type="radio" class="rdo" name="contModEdu" value="N" /><label>미선택</label>';
        				html[0] += '							<input type="radio" class="rdo" name="contModEdu" value="Y" checked/><label>선택</label>';
        				html[0] += '							<input type="hidden" id="contModEducourseId" value="'+item.contEducourseId+'"/>';
        				
        				var contEdPath = item.contEducoursePath;
        				if ( contEdPath.length > 40 ) {
        					contEdPath = contEdPath.substring(0, 37) + "...";
        					contEdPath.replace('>','&gt;');
        				}
        				
        				html[0] += '							<span id="contModEducourseText" class="subStep">'+contEdPath+'</span>';
        				html[0] += '							<a href="javascript:void(0)" id="contModEducourseBtn" class="educourseBtn"><img src="' + IMG_PATH + '/common/button/btn_input.gif" alt="입력하기" /></a>';
        				
    				}
    				
    				html[0] += '						</td>';
    				html[0] += '					</tr>';
    				html[0] += '					<tr>';
    				html[0] += '						<th><img src="' + IMG_PATH + '/myclass/myNews/th_keyword.gif" alt="키워드" /></th>';
    				html[0] += '						<td>';
    				html[0] += '							<input type="text" id="contModKeyword" maxlength="100" class="text" style="width: 400px;" value="'+item.contKeyword+'" />';
    				html[0] += '							<a href="javascript:void(0)" class="keywordBtn" id="contModKeywordBtn" ><img src="' + IMG_PATH + '/common/button/btn_recTag.gif" alt="추천 태그 입력" /></a>';
    				html[0] += '						</td>';
    				html[0] += '					</tr>';
    				html[0] += '				</table>';
    				html[0] += '			</div>';
    				html[0] += '			<div class="uploadScript">';
    				html[0] += '				<textarea id="contModContent" class="textarea" style="width: 98%; height: 80px;">'+item.contContent+'</textarea>';
    				html[0] += '				<p class="length"><span id="contModContentCnt">0</span> / 500</p>';
    				html[0] += '				<p class="notice"><span>※</span> 저작권자 등 원 소유자의 허락을 받지 않은 자료의 등록으로 인해, <br />다른 사람의 권리 침해, 명예를 훼손하는 경우 이용약관 및 관련 법률에 의해 제재를 받을 수 있습니다.</p>';
    				html[0] += '			</div>';
    				html[0] += '		</div>';
    				html[0] += '	</div>';
    				html[0] += '	<div class="grBtn">';
    				html[0] += '		<input type="hidden" id="contModOpenYN" value="'+item.contUpOpenYn+'" />';
    				
    				html[0] += '		<div class="float_l">';
    				if ( item.contUpOpenYn == "N" ) {
    					html[0] += '		<a href="javascript:openYN(\'contModOpenYN\')"><img id="contModOpenYN_Img" src="' + IMG_PATH + '/common/button/btn_closed.gif" alt="비공개" /></a>';
        			} else {
    					html[0] += '		<a href="javascript:openYN(\'contModOpenYN\')"><img id="contModOpenYN_Img" src="' + IMG_PATH + '/common/button/btn_open.gif" alt="비공개" /></a>';
        			}
    				html[0] += '		<a href="javascript:modifyCancel( \'' + contMediaGubun + '_' + contMediaId +'\' )"><img id="contModCancle_Img" src="' + IMG_PATH + '/common/button/btn_cancel2.gif" alt="취소" /></a>';
    				html[0] += '		</div>';
    				html[0] += '		<a href="javascript:contModifyProc( \''+contFileType+'\', \''+contMediaGubun+'\', \''+contMediaId+'\', \''+contProviderId+'\' )"><img src="' + IMG_PATH + '/common/button/btn_app3.gif" alt="등록" /></a>';
    				
    				html[0] += '	</div>';
    				html[0] += '</div>';
    				html[0] += '<!-- contents modify -->';
    				
    				$(contObjId).addClass("none");
    				$(contEditObjId).removeClass("none").addClass("on");
    				
    				$(contEditObjId).empty();
    				$(contEditObjId).append(html.join(''));		
    				
    				var contLeng = item.contContent.length;
    				$("#contModContentCnt").html(contLeng);
    				
    				$(".setLayer").hide();

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