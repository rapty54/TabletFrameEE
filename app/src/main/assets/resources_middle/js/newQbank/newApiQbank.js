/*********************************** 비바샘 문제은행 내신 개편 API ***************************************/   
//var API_SERVICE_KEY = "8daf18aab732289eb618af38448af39c";
var API_SERVICE_KEYCall = "56fc180e753ee4c8f76a7de4604023ae";
    
var API_ISENCRYPTVCall = "false";    
//var API_URLCall = "http://dev.vivatem.visang.com/api/xip/webservice/";
var API_URLCall = "https://api.vivatem.com/api/xip/webservice/";

// API CALL (param : call param, callback : jsonp callback, gp :  GET or POST)
function loadOpenAPIJSCall(param, callback, gp) {
	return false;
   var _url = API_URLCall + 'Items?';
   _url += "IsEncrypt="+API_ISENCRYPTVCall;
   _url += "&SERVICE_KEY="+API_SERVICE_KEYCall;
    $.ajax({
		type : gp,
		url : _url,
		data : param,
        jsonpCallback : callback,
        dataType:"jsonp"
    });
}

function loadOpenAPIEtcJSCall(param, callback, gp) {
	   var _url = API_URL + 'Etc?';
	   _url += "IsEncrypt="+API_ISENCRYPT;
	   _url += "&SERVICE_KEY="+API_SERVICE_KEY;

	    $.ajax({
			type : gp,
			url : _url,
			data : param,
	        jsonpCallback : callback,
	        dataType:"jsonp"
	    });
}

/**
 * 문항별 레밸별 갯수 ex)상(5,4), 중(3,2), 하(1) 
 * CHAPTER_ID : 단원정보
**/
getChapterItemLevelCount = function(CHAPTER_ID, callback, gp){
	var param = {
		Action : 'GetChapterItemLevelCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}
/**
 * 단원의 평가영역별 갯수
 * CHAPTER_ID : 단원정보
**/ 
getChapterItemCurriculumCount = function(CHAPTER_ID, callback, gp){
	var param = {
		Action : 'GetChapterItemCurriculumCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 문항별 유형 갯수 ex)객관식, 주관식, 서술형 
 * CHAPTER_ID : 단원정보
**/
getChapterItemTypeCount = function(CHAPTER_ID, callback, gp){
	var param = {
		Action : 'GetChapterItemTypeCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/** 
 * 단원의 출저별 갯수
 * CHAPTER_ID : 단원정보 
**/
getChapterItemOriginCount = function(CHAPTER_ID, callback, gp){	
	
	var param = {
		Action : 'GetChapterItemOriginCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 단원에 해당하는 문항별 년도 갯수
 * MAKE_YEARMONTH_TYPE : 연도 0, 월 1, 조회시작년도 2
 * CHAPTER_ID : 단원정보
 * make : 년 또는 월 값
**/
GetChapterItemMakeYearMonthCount = function(CHAPTER_ID, MAKE_YEARMONTH_TYPE, make, callback, gp){	
	
	var param = {
		Action : 'GetChapterItemMakeYearMonthCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	if(MAKE_YEARMONTH_TYPE == '0'){
		param.MAKE_YEARMONTH_TYPE = '0';
		param.MAKE_YEAR = make;
	}else if(MAKE_YEARMONTH_TYPE == '1'){
		param.MAKE_YEARMONTH_TYPE = '1';
		param.MAKE_MONTH = make;
	}else if(MAKE_YEARMONTH_TYPE == '2'){
		param.MAKE_YEARMONTH_TYPE = '0';
		param.START_YEAR = make;
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 문항별 배점별 갯수
 * CHAPTER_ID : 단원정보
**/
getChapterItemPointCount = function(CHAPTER_ID, callback, gp){	
	
	var param = {
		Action : 'GetChapterItemPointCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 문항별 듣기평가 문제 갯수 (듣기평가 문제 갯수 및 듣기 평가가 아닌 갯수)
 * CHAPTER_ID : 단원정보
**/
getChapterItemIsMultimediaCount = function(CHAPTER_ID, callback, gp){	
	
	var param = {
		Action : 'GetChapterItemIsMultimediaCount'
		,CHAPTER_ID : CHAPTER_ID
	}
	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 랜덤 출제 문항 ID 추출
 * param : 파라미터 값
**/
getRandomItemOnlyId = function(param, callback, gp){	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 직접 출제 문항 ID 추출
 * param : 파라미터 값
**/
getItemIdsOnlyId = function(param, callback, gp){	
	loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 문항별 듣기평가 문제 갯수 (듣기평가 문제 갯수 및 듣기 평가가 아닌 갯수)
 * itemIds : 문제 ID
 * viewType : IMAGE, XML 두 가지 형태
**/
getSelectItemsByIds = function(itemIds, callback, gp){	
	
	var param = {
		Action : 'SelectItemsByIds'
		,itemIds : itemIds
		,viewType : 'IMAGE'
	}
	
	// loadOpenAPIJSCall(param, callback, gp);
}

/**
 * 과목 정보
 * PARENT_ID : 과목 카테고리 코드
**/
getSelectCode = function(PARENT_ID, callback, gp){	
	
	var param = {
		Action : 'SelectCode'
		,PARENT_ID : PARENT_ID
	}
	
	loadOpenAPIEtcJSCall(param, callback, gp);
}

/**
 * 출처 정보
 * vlaue : obj.ITEMS.ITEM
**/

getCommonMetaName = function (value){
	
	var metaName = '';
	var metacnt = 0;
	
	if(jQuery.isArray( value.ITEM_COMMON_METAS)){
		$.each(value.ITEM_COMMON_METAS, function(key, value){
			if(value.META_NAME == 'ORIGINS'){
				if(jQuery.isArray( value.ITEM_COMMON_META)){
					$.each(value.ITEM_COMMON_META, function(key, value){
						if(metacnt == 0){
							metaName += value.COMMON_NAME;
							metacnt++;
						}else{
							metaName += '</br>'+value.COMMON_NAME;
							metacnt++;
						}

					});
				}else{
					metaName += value.ITEM_COMMON_META.COMMON_NAME;
				}
			}
			
		});
	}else{
		if(value.ITEM_COMMON_METAS.META_NAME == 'ORIGINS'){
			if(jQuery.isArray( value.ITEM_COMMON_META)){
				$.each(value.ITEM_COMMON_META, function(key, value){
					metaName += value.COMMON_NAME;
				});
			}else{
				metaName += value.ITEM_COMMON_META.COMMON_NAME;
			}
		}
	}
	
	return metaName;
}

/**
 * 평가 영역 정보
 * vlaue : obj.ITEMS.ITEM
**/
getValutAreaName = function (value, valutAreaId){
	
	var valutAreaName ='';
	var cnt = 1;
	if(jQuery.isArray( value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA )){
		$.each(value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA, function(key, value){
			if(valutAreaId){
				if(valutAreaId.indexOf(value.Depth4ID) == -1){
					if(cnt == 1){
						valutAreaName = value.ValutAreaName;
						cnt++;
					}
				}
			}else{
				if(cnt == 1){
					valutAreaName = value.ValutAreaName;
					cnt++;
				}
			}
		});
	}else{
		valutAreaName = value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA.ValutAreaName;
	}
	
	return valutAreaName;
}

/**
 * 주관식 객관식
 * vlaue : obj.ITEMS.ITEM
**/

getCommonTypeName = function (value){
	var type = '';

	if(value.TYPE_TITLE == '객관식'){
		type = value.TYPE_TITLE;
	}else{
		type = '주관식';
	}
	
	return type;
}

getCommonType2Name = function (value){
	var type = '';
	var type2 = '';
	
	if(value.TYPE_TITLE == '객관식'){
		type = value.TYPE_TITLE;
	}else if(value.TYPE_TITLE == '서술형'){
		type = '서술형';
	}else{
		type = '주관식';
	}

	if(value.QUALITY_CODE == '1'){
		type2 = '시험 출제용'+'-'+type;
	}else{
		try{
			if(value.ITEM_CHAPTERS.ITEM_CHAPTER.CHAPTER_INFO.CHAPTER_INFO_LIST[1].codeName == '수학'){
				type2 = '연산학습용'+'-'+type;;
			}else{
				type2 = '쪽지시험용'+'-'+type;;
			}
		}catch(e){
			type2 = '쪽지시험용'+'-'+type;;
		}
	}
	
	return type2;
}

/**
 * 주관식 레벨
 * vlaue : obj.ITEMS.ITEM
**/
getCommonLevelName = function (value){
	var level = '';

	if(value.LEVEL_CODE == '1' || value.LEVEL_CODE == '2'){
		level = '하';
	}else if(value.LEVEL_CODE == '3'){
		level = '중';
	}else if(value.LEVEL_CODE == '4' || value.LEVEL_CODE == '5'){
		level = '상';
	}

	return level;
}

/**
 * 멀티미디어 파일 정보
 * vlaue : obj.ITEMS.ITEM
**/
getMultimediaList = function (value){
	
	var multiMedia ='';
	var cnt = 1;
	if(jQuery.isArray( value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST )){
		$.each(value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST, function(key, value){
			if(cnt == 1){
				multiMedia = value.fileUrl;
				cnt++;
			}
		});
	}else{
		multiMedia = value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST.fileUrl;
	}
	
	return multiMedia;
}

/**
 * 멀티미디어 미리듣기 팝업
 * vlaue : obj.ITEMS.ITEM
**/

startStarPlayer = function(fileUrl, playType){
	//var url = '/qbankv2/qbankV2StartPlayer.do?fileUrl='+fileUrl+'&fileType='+playType;
	//var popOption = "width=445, height=97, resizable=no, scrollbars=no, status=no;";
	//window.open(url,"",popOption);
	
	var frm = document.starPlay;
	var popup_starPlay = 'popup_starPlay';
	window.open('',popup_starPlay, 'width=445,height=127,scrollbars=no');
	//window.open('',popup_starPlay, 'width=1000,height=597,scrollbars=yes');
	$('#fileUrl').val(fileUrl);
	$('#playType').val(playType);
    frm.target = 'popup_starPlay';
    frm.submit();
	
}

/**
 * 과목 정보
 * PARENT_ID : 과목 카테고리 코드
**/
getTypeAndLevelItemsCount = function(itemId, callback, gp){	
	
	var param = {
		Action : 'GetTypeAndLevelItemsCount'
		,itemIds : itemId
		,viewType : 'IMAGE'
	}
	
	// loadOpenAPIJSCall(param, callback, gp);
}

getIrritatedCount = function (value){
	
	var multiMedia ='';
	var cnt = 1;
	if(jQuery.isArray( value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST )){
		$.each(value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST, function(key, value){
			if(cnt == 1){
				multiMedia = value.fileUrl;
				cnt++;
			}
		});
	}else{
		multiMedia = value.MULTIMEDIA_INFO.MULTIMEDIA_DATA.MULTIMEDIA_DATA_LIST.fileUrl;
	}
	
	return multiMedia;
}

/**
 * 주관식 레벨
 * vlaue : obj.ITEMS.ITEM
**/
getCommonLevelLabel = function (level){
	var label = '';

	if(level == '상'){
		label = 'high';
	}else if(level == '중'){
		label = 'mid';
	}else{
		label = 'row';
	}
	
	return label;
}




getValutAreaNames = function (value, valutAreaIds){
	
	var valutAreaName ='';
	var cnt = 1;
	if(jQuery.isArray( value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA )){
		$.each(value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA, function(key, value){
			if(valutAreaIds.indexOf(value.Depth4ID) == -1){
				if(cnt == 1){
					valutAreaName = value.ValutAreaName;
					cnt++;
				}
			}
		});
	}else{
		valutAreaName = value.ITEM_VALUT_AREAS.ITEM_VALUT_AREA.ValutAreaName;
	}
	
	return valutAreaName;
}

makeInfoLayerPopup = function (){
	if (getCookie("makeInfoLayerPopup") == "done" ) {
		$(".qbank_guide").hide();
	}
}

makeInfoLayerPopupClose = function (){
	$(".qbank_guide").hide();
}

 // 더이상 보지 않기
makeInfoLayerNoPopup = function (){
	setCookie( "makeInfoLayerPopup", "done" , 365);
	$(".qbank_guide").hide();
}

