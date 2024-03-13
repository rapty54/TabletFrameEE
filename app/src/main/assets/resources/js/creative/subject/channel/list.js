$(function () {
	if (nowMonth < 10) {
		nowMonth = '0' + nowMonth;
	}
	//월 별 메인 배너 조회
	getMain(pFctId);
	
});
function getReply(){
	//댓글 로드
	loadReply(nowMonth, menu, "replySection", window.globals.config.activeEnv, false, $("#replyCnt"), function () {
		//로드 후 실행될 로직
	});
}

//월 별 메인 배너 조회
function getMain(fctId){

	var paramData = {};

	if(fctId == ''){
		paramData =	{
			month : nowMonth
		}
	}else{
		paramData =	{
			fctId : fctId,
			month : nowMonth
		}
	}

	Ajax.execute({
		data: paramData,
		dataType: "html",
		type: "get",
		url : "/creative/subject/channel/main.html",
		success : function(data){
			$('#content_2020').empty();
			$('#content_2020').append(data);

			//목록 조회
			getListDtl(fctId);
		}
	});
}

//이미지, 멀티미디어 자료 조회
function getListDtl(fctId){

	var paramData = {};

	if(fctId == undefined || fctId == ''){
		paramData =	{
			month : $('#fctSubjMm').val()
		}
	}else{
		paramData =	{
			fctId : fctId,
			month : $('#fctSubjMm').val()
		}
	}

	var searchMonth =
	Ajax.execute({
		data: paramData,
		dataType: "html",
		type: "get",
		url : "/creative/subject/channel/listdtl.html",
		success : function(data){
			$('#displayListDtl').empty();
			$('#displayListDtl').append(data);
			$('#listDtlCnt').text('('+$('#listDtlHide').val()+')');
			$('.data_list a').on('click',function(e){
					e.stopPropagation(); // 이벤트 차단
			});
			//댓글 조회
			getReply();
		}
	});
}
//담기
function insertFolderChk(data){
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'TEXTBOOK',
		parameter: {
			code2: data,
		}
	});
}
//메인 배너 파일 다운로드
function MainFileDownLoad(code){
	if (!SessionUtils.isLogin(window.location.href, '')) {

	}
	else {
		Ajax.execute({
			url:'/creative/subject/channel/check/download.json',
			success : function(data){
				if (data.response == 'success') {
					Popup.openFileDownloadDext(code);
				} else {
					location.href = "/my/info/check";
				}
			},
		});
	}
}

// 뷰어 오픈
function openViewer(contentId, contentGubun) {
	Popup.openViewerMain(contentId, contentGubun);
}

//파일 다운로드
function fileDownload(data, downyn) {
	Popup.openFileDownloadDext(data, downyn);
}

// 미리보기 (사진, 영상)
function viewDataContents(data1, data2) {
	Popup.openViewerMain(data1, data2);
}

// 멀티 파일 담기
function multiInsertFolder(){
	var chkCnt = $("input:checkbox[class=chkBoxSelect]:checked").length;
	if (chkCnt == 0 ){
		alert('자료를 선택해주세요');
		return false;
	}
	var fileList = '';
	var fileList = '';
	$("input:checkbox[class=chkBoxSelect]:checked").each(function(){
		if (fileList == '') {
			fileList += $(this).val();
		}
		else {
			fileList += ','+$(this).val();
		}
	});
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'CREATIVE',
		parameter: {
			code2: fileList,
		}
	});
}

// 멀티 파일 다운로드
function multiFileDownload(){
	if (!SessionUtils.isLogin(window.location.href, '')) {
		//자료 다운로드는 개인정보 입력 후 가능합니다. 자료는 \'학교 및 교육기관의 수업\' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다. 
	}
	else {
		var chkCnt = $("input:checkbox[class=chkBoxSelect]:checked").length;
		if (chkCnt == 0 ){
			alert('자료를 선택해주세요');
			return false;
		}
		var fileList = '';
		$("input:checkbox[class=chkBoxSelect]:checked").each(function(){
			if (fileList == '') {
				fileList += $(this).val();
			}
			else {
				fileList += ','+$(this).val();
			}
		});
		Ajax.execute({
			url:'/creative/subject/channel/check/download.json',
			success : function(data){
				//alert('자료 다운로드는 개인정보 입력 후 가능합니다. 자료는 \'학교 및 교육기관의 수업\' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다');
				if (data.response == 'success'){
					Popup.openFileDownloadDext(fileList);
				}
				else {
					location.href="/my/info/check";
				}
			}
		});
	}
}

// 기존 스크립트 그대로 옮김
// 월 클릭 이벤트
function getView(fct_subj_mm){
	createView(fct_subj_mm);
}

function getViewById(fctId){
	createView('',fctId);
}

function createView(fct_subj_mm, fctId){

	if(fct_subj_mm == ''){
		history.pushState(null, null, "/creative/subject/channel/list?pMonth=" + nowMonth);
	}else{
		history.pushState(null, null, "/creative/subject/channel/list?pMonth=" + fct_subj_mm);
		// 월 초기화 후 조회
		nowMonth = fct_subj_mm;
	}

	getMain(fctId);
	//목록 조회
	//getListDtl(fctId);
	$("#month01").removeClass("on type2");
	$("#month02").removeClass("on");
	$("#month03").removeClass("on");
	$("#month04").removeClass("on");
	$("#month05").removeClass("on");
	$("#month06").removeClass("on");
	$("#month07").removeClass("on type1");
	$("#month08").removeClass("on type2");
	$("#month09").removeClass("on");
	$("#month10").removeClass("on");
	$("#month11").removeClass("on");
	$("#month12").removeClass("on type1");

	if(fct_subj_mm=="07" || fct_subj_mm=="08")
	{
		$("#month07").addClass("on type1");
		$("#month08").addClass("on type2");
	}else {
		if(fct_subj_mm=="03") $("#month03").addClass("on");
		if(fct_subj_mm=="04") $("#month04").addClass("on");
		if(fct_subj_mm=="05") $("#month05").addClass("on");
		if(fct_subj_mm=="06") $("#month06").addClass("on");
		if(fct_subj_mm=="09") $("#month09").addClass("on");
		if(fct_subj_mm=="10") $("#month10").addClass("on");
		if(fct_subj_mm=="11") $("#month11").addClass("on");
	}

	if(fct_subj_mm=="01" ||  fct_subj_mm=="12")
	{
		$("#month01").addClass("on type2");
		$("#month12").addClass("on type1");
	}else {
		if(fct_subj_mm=="02") $("#month02").addClass("on");
		if(fct_subj_mm=="03") $("#month03").addClass("on");
		if(fct_subj_mm=="04") $("#month04").addClass("on");
		if(fct_subj_mm=="05") $("#month05").addClass("on");
		if(fct_subj_mm=="06") $("#month06").addClass("on");
		if(fct_subj_mm=="09") $("#month09").addClass("on");
		if(fct_subj_mm=="10") $("#month10").addClass("on");
		if(fct_subj_mm=="11") $("#month11").addClass("on");
	}
}


// 체크박스 전체 선택
function chkBoxAllChk(obj){
	if ($(obj).is(':checked') != false){
		$("input[class=chkBoxSelect]:checkbox").prop("checked", true);
		$("input[class=chkBoxSelectAll]:checkbox").prop("checked", true);
		$("input:checkbox[class=chkBoxSelect]:checked").each(function(){
			$(this).parents('li').addClass('active');
		});
	}
	else {
		$("input[class=chkBoxSelect]:checkbox").prop("checked", false);
		$("input[class=chkBoxSelectAll]:checkbox").prop("checked", false);
		$("input:checkbox[class=chkBoxSelect]:unchecked").each(function(){
			$(this).parents('li').removeClass('active');
		});
		
	}
}
// 체크박스 취소
function chkCancle(obj){
	if ($(obj).is(":checked")) {
		$(obj).parents('li').addClass('active');
	}
	else {
		$(obj).parents('li').removeClass('active');
	}
	
	var chkCnt = $("input:checkbox[class=chkBoxSelect]:checked").length;
	var totalCnt = $('#listDtlHide').val();
	if (chkCnt != totalCnt) {
		$("input[class=chkBoxSelectAll]:checkbox").prop("checked", false);
	}
	else {
		$("input[class=chkBoxSelectAll]:checkbox").prop("checked", true);
	}
}

// 미리보기(썸네일 클릭 시)
function divDataContents(obj) {
	var data = $(obj).data();
	Popup.openViewerMain(data.contentId,  data.contentGubun);
}