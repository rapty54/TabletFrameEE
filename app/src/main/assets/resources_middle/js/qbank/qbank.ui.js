
var API_SERVICE_KEY = "56fc180e753ee4c8f76a7de4604023ae";
var API_ISENCRYPT = "false";
var API_URL = "https://api.vivatem.com/api/xip/webservice/";
//var API_URL = "http://dev.vivatem.visang.com/api/xip/webservice/";


function appendOptionV2(objname,code,val)
{
	$("#"+objname).append("<option value='"+ code +"'>"+ val +"</option>");
}

function clearOptionV2(objname)
{
	$("#"+objname).html("");
	//$("#"+objname).html("<option>선택</option>");
}

function clearOptionV2o(objname,val)
{
	$("#"+objname).html("<option value=''>" + val + "</option>");
}

function spinnerShow() {
	// $('#spinnerId')[0].style.zIndex = '99999';
	// $('#spinnerId').spin('main');
}

function spinnerHide() {
	// $('#spinnerId')[0].style.zIndex = '-1';
	// $('#spinnerId').data().spinner.stop();
}

function blindShow(id) {
	$("#" + id).show();
}

function blindHide(id) {
	$("#" + id).hide();
}

//  단원명 찾기
var SUBJECTS = "S";
var CHAPTER1S = "S";
var CHAPTER2S = "S";

function getUnitName(ArrUnit) {
	var recordCp1 = "";
	var recordCp2 = "";
	var getUnitCode = "";

	if ($.isArray(ArrUnit)) {
		for (var j = 0; j < ArrUnit.length; j++) {
			//alert(ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length);
			if (ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length > 5) {
				recordCp1 = ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				recordCp2 = ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;

				if (COURSE == "2" && COURSE2 == "QC317") {
					// 대단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				} else {
					// 중단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
				}
			}
			//SUBJECTS += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
		}
	} else {
		//SUBJECTS  += "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
		recordCp1 = ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		recordCp2 = ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;

		if (COURSE == "2" && COURSE2 == "QC317") {
			// 대단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		} else {
			// 중단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
		}
	}

	var str = "";

	if (getUnitCode.indexOf("|") >= 0) {
		var codeList = getUnitCode.split('|');

		for (var i in codeList) {
			if (chapter1.indexOf(codeList[i]) >= 0 || chapter2.indexOf(codeList[i]) >= 0) {
				for (var k = 0; k < UNITJSON.length; k++) {
					if (codeList[i] == UNITJSON[k].unit2_code) {
						SUBJECTS += "|" + UNITJSON[k].subject_id;
						CHAPTER1S += (COURSE == "2" && COURSE2 === "QC317") ? "|" + UNITJSON[k].unit2_code : "|" + UNITJSON[k].unit1_code;
						CHAPTER2S += "|" + UNITJSON[k].unit2_code;
						str = (COURSE == "2" && COURSE2 === "QC317")
							? UNITJSON[k].subject_name + " - " + UNITJSON[k].unit2_lab + ". " + UNITJSON[k].unit2
							: UNITJSON[k].unit1_lab + ". " + UNITJSON[k].unit1;
					}
				}
			}
		}
	}

	if (str == "") {
		SUBJECTS += "| ";
		CHAPTER1S += "| ";
		CHAPTER2S += "| ";
	}

	return str;
}

function getUnitCode(ArrUnit) {
	var recordCp1 = "";
	var recordCp2 = "";
	var getUnitCode = "";

	if ($.isArray(ArrUnit)) {
		for (var j = 0; j < ArrUnit.length; j++) {
			//alert(ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length);
			if (ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length > 5) {
				recordCp1 = ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				recordCp2 = ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;

				if (COURSE == "2" && COURSE2 == "QC317") {
					// 대단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				} else {
					// 중단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
				}
			}
			//SUBJECTS += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
		}
	} else {
		//SUBJECTS  += "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
		recordCp1 = ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		recordCp2 = ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;

		if (COURSE == "2" && COURSE2 == "QC317") {
			// 대단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		} else {
			// 중단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
		}
	}

	var rtnCode = "";

	if (getUnitCode.indexOf("|") >= 0) {
		var codeList = getUnitCode.split('|');

		for (var i in codeList) {
			if (chapter1.indexOf(codeList[i]) >= 0 || chapter2.indexOf(codeList[i]) >= 0) {
				for (var k = 0; k < UNITJSON.length; k++) {
					if (codeList[i] == UNITJSON[k].unit2_code) {
						rtnCode = codeList[i];
					}
				}
			}
		}
	}

	return rtnCode;
}


function getUnitRecordName(ArrUnit) {
	var recordCp1 = "";
	var recordCp2 = "";
	var getUnitCode = "";

	if ($.isArray(ArrUnit)) {
		for (var j = 0; j < ArrUnit.length; j++) {
			if (ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length > 5) {
				if (COURSE == "2" && COURSE2 === "QC317") {
					// 대단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				} else {
					// 중단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
				}
			}
		}
	} else {
		//SUBJECTS  += "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[3].code;
		//recordCp1 =  ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		//recordCp2 =  ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;

		if (COURSE == "2" && COURSE2 === "QC317") {
			// 대단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		} else {
			// 중단원 비교하기
			try {
				if (COURSE == "13" || COURSE == "37") {
					getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
				} else {
					getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
				}
			} catch (e) {
				getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
			}
		}
	}

	var str = "";

	if (getUnitCode.indexOf("|") >= 0) {
		var codeList = getUnitCode.split('|');

		for (var i in codeList) {
			if (chapter1.indexOf(codeList[i]) >= 0 || chapter2.indexOf(codeList[i]) >= 0) {
				for (var k = 0; k < UNITJSON.length; k++) {
					if (codeList[i] == UNITJSON[k].unit2_code) {
						recordCp1 = (COURSE == "2" && COURSE2 === "QC317")
							? value.unit1_code
							: UNITJSON[k].unit1_code;
						recordCp2 = (COURSE == "2" && COURSE2 === "QC317")
							? value.unit2_code
							: UNITJSON[k].unit2_code;
						str = (COURSE == "2" && COURSE2 === "QC317")
							? UNITJSON[k].subject_name + " - " + UNITJSON[k].unit2_lab + ". " + UNITJSON[k].unit2
							: UNITJSON[k].unit1_lab + ". " + UNITJSON[k].unit1;
					}
				}
			}
		}

		CHAPTER1S += "|" + recordCp1;
		CHAPTER2S += "|" + recordCp2;
	}

	return str;
}

// 2021년도 초등 대단원명 중단원명 불러오기
function getUnitRecordNameByEs(ArrUnit) {
	var getUnitCode = "";

	if ($.isArray(ArrUnit)) {
		for (var j = 0; j < ArrUnit.length; j++) {
			if (ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length > 5) {
				getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
			}
		}
	} else {
		// 중단원 비교하기
		try {
			if (COURSE == "13" || COURSE == "37") {
				getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
			} else {
				getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
			}
		} catch (e) {
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		}
	}

	var str = "";

	if (getUnitCode.indexOf("|") >= 0) {
		var codeList = getUnitCode.split('|');

		for (var i in codeList) {
			if (chapter2.indexOf(codeList[i]) >= 0) {
				for (var k = 0; k < UNITJSON.length; k++) {
					if (codeList[i] == UNITJSON[k].unit2_code) {
						str = UNITJSON[k].unit2_lab + '. ' + UNITJSON[k].unit2;
					}
				}
			}
		}
	}

	return str;
}

function getUnitRecordNameValue(ArrUnit)
{

	var getUnitCode = "";
	if($.isArray(ArrUnit)) {
		for( var j=0;j< ArrUnit.length;j++ )
		{
			if(ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST.length > 5){
				if (COURSE == "2" && COURSE2 == "QC317")
				{
					// 대단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
				}
				else
				{
					// 중단원 비교하기
					getUnitCode += "|" + ArrUnit[j].CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
				}
			}
		}
	}
	else
	{

		if (COURSE == "2" && COURSE2 == "QC317")
		{
			// 대단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		}
		else
		{
			// 중단원 비교하기
			getUnitCode = "|" + ArrUnit.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
		}
	}

	var str = '';

	if(getUnitCode.indexOf("|") >= 0 ){

		var codeList = getUnitCode.split('|');

		if (COURSE == "2" && COURSE2 == "QC317"){
			for(var i in codeList){
				if(chapter1.indexOf(codeList[i]) >= 0 )
				{

					for(var k=0;k<UNITJSON.length;k++)
					{
						if(codeList[i] == UNITJSON[k].unit2_code)
						{
							str =  UNITJSON[k].course2_name;
						}
					}
				}
			}


		} else {
			for(var i in codeList){
				if(chapter2.indexOf(codeList[i]) >= 0 )
				{
					for(var k=0;k<UNITJSON.length;k++)
					{

						if(codeList[i] == UNITJSON[k].unit2_code)
						{
							str =  UNITJSON[k].course2_name;
						}
					}
				}
			}
		}
	}
	return str;

}


getUnitRecordNameEng = function(obj){
	var recordCp1 = "";
	var recordCp2 = "";
	var chpterCode = '';
	var result = '';
//	console.log(obj);
	if(jQuery.isArray(obj)){
		$.each(obj, function(key, value){
			//alert(value)
			//recordCp1 = value.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
			//recordCp2 = value.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
			if(value.CHAPTER_INFO.CHAPTER_INFO_LIST.length > 7){
				chpterCode += "|" + value.CHAPTER_INFO.CHAPTER_INFO_LIST[7].code;
			}else{
				chpterCode += "|" + value.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
			}
		});
	}else{
		//recordCp1 =  obj.CHAPTER_INFO.CHAPTER_INFO_LIST[4].code;
		//recordCp2 =  obj.CHAPTER_INFO.CHAPTER_INFO_LIST[5].code;
		if(obj.CHAPTER_INFO.CHAPTER_INFO_LIST.length > 7){
			chpterCode = "|" + obj.CHAPTER_INFO.CHAPTER_INFO_LIST[7].code;
		}else{
			chpterCode = "|" + obj.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
		}
	}



	//alert(chpterCode);
	if(chpterCode.indexOf("|") >= 0 ){

		var codeList = chpterCode.split('|');

		for(var i in codeList){
			if(chapter2.indexOf(codeList[i]) != -1){
				$.each(UNITJSON, function(key, value){
					//alert(value.unit2_code + '/' + chpterCode)
					if(value.unit2_code == codeList[i]){
						recordCp1 = value.unit1_code;
						recordCp2 = value.unit2_code;
						//alert(value.subject_name + '/' + value.unit1_lab + '/' + value.unit2_lab);
						result =  value.subject_name + " " +  value.unit1_lab + "-" +  value.unit2_lab + "단원";
					}
				});
			}
		}

		CHAPTER1S += "|" + recordCp1;
		CHAPTER2S += "|" + recordCp2;
	}


	return result;

}

getUnitRecordNameEngValue = function(obj){
	var chpterCode = '';
	var result = ''
	if(jQuery.isArray(obj)){
		$.each(obj, function(key, value){
			//alert(value)
			if(value.CHAPTER_INFO.CHAPTER_INFO_LIST.length > 7){
				chpterCode += "|" + value.CHAPTER_INFO.CHAPTER_INFO_LIST[7].code;
			}else{
				chpterCode += "|" + value.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
			}
		});
	}else{
		if(obj.CHAPTER_INFO.CHAPTER_INFO_LIST.length > 7){
			chpterCode = "|" + obj.CHAPTER_INFO.CHAPTER_INFO_LIST[7].code;
		}else{
			chpterCode += "|" + value.CHAPTER_INFO.CHAPTER_INFO_LIST[6].code;
		}
	}
	//alert(chpterCode);

	if(chpterCode.indexOf("|") >= 0 ){

		var codeList = chpterCode.split('|');

		for(var i in codeList){
			if(chapter2.indexOf(codeList[i]) != -1){
				$.each(UNITJSON, function(key, value){
					//alert(value.unit2_code + '/' + chpterCode)
					if(value.unit2_code == codeList[i]){
						//alert(value.subject_name + '/' + value.unit1_lab + '/' + value.unit2_lab);
						result =  value.subject_name;
					}
				});
			}
		}
	}

	return result;

}



//1. JSON 데이타만 가져오기
function loadOpenAPIJS(urlApi,callback) {
	var _url = API_URL + urlApi;
	_url += "&IsEncrypt="+API_ISENCRYPT;
	_url += "&SERVICE_KEY="+API_SERVICE_KEY;


	$.ajax({
		type:"GET",
		url:_url,

		jsonpCallback : callback,
		dataType:"jsonp"
	});
}


function allNocheck()
{
	var arrUnit1 =UNIT1CODE.split('|');
	var arrUnit2 =UNIT2CODE.split('|');


	for(var i=1;i<arrUnit1.length;i++)
	{
		$("input[id=unit1_"+ arrUnit1[i]  +"]:checkbox").prop("checked", false);
	}


	for(var i=1;i<arrUnit2.length;i++)
	{
		$("input[id=unit2_"+ arrUnit2[i]  +"]:checkbox").prop("checked", false);
	}

}


function allcheckNo()
{
	var arrUnit1 =UNIT1CODE.split('|');
	var arrUnit2 =UNIT2CODE.split('|');

	var arrBL = true;


	for(var i=1;i<arrUnit1.length;i++)
	{
		$("input[id=unit1_"+ arrUnit1[i]  +"]:checkbox").prop("checked", false);
	}


	for(var i=1;i<arrUnit2.length;i++)
	{
		$("input[id=unit2_"+ arrUnit2[i]  +"]:checkbox").prop("checked", false);
	}

}


function allcheck()
{
	var arrUnit1 =UNIT1CODE.split('|');
	var arrUnit2 =UNIT2CODE.split('|');

	var arrBL = true;
	for(var i=1;i<arrUnit2.length;i++)
	{
		if($("input[id=unit2_"+ arrUnit2[i]  +"]:checkbox").is(':checked'))
		{
			arrBL = false;
			break;
		}
	}

	for(var i=1;i<arrUnit1.length;i++)
	{
		$("input[id=unit1_"+ arrUnit1[i]  +"]:checkbox").prop("checked", arrBL);
	}


	for(var i=1;i<arrUnit2.length;i++)
	{
		$("input[id=unit2_"+ arrUnit2[i]  +"]:checkbox").prop("checked", arrBL);
	}

	getQbankTotalCntReady();
}


//
function ck_unit2(obj) {
	var unit2name = obj.name;
	var lastTF = true;
	$("input[name=" + unit2name + "]:checkbox").each(function () {
		if ($(this).is(':checked')) {
			$("input[name=" + unit2name.replace('unit2', 'unit1') + "]:checkbox").prop("checked", true);
			lastTF = false;
			return;
		}
	});

	if (lastTF) {
		$("input[name=" + unit2name.replace('unit2', 'unit1') + "]:checkbox").prop("checked", false);
	}
}




function chkUnit2(objID)
{
	//$("#"+objID).trigger('click');
	if ($("#"+objID).is(':checked'))
		$("#"+objID).prop("checked",false);
	else
		$("#"+objID).prop("checked",true);


	ck_unit2(document.getElementById(objID))

}

//전체 선택 체크 박스 확인
function chkSelectAllUnit() {

	var bool = true

	$('.btn_acc2').each(function() {
		if (!$(this).is(':checked')) {
			bool = false;
		}
	})

	$('.qbankunit2').each(function() {
		if (!$(this).is(':checked')) {
			bool = false;
		}
	})

	return bool;

}

$(function () {
	//단원선택 아코디언
	$('.btn_acc').click(function () {
		if ($(this).parent().nextAll('dd').is(':hidden')) {
			$(this).parent().parent().addClass('active');
			$(this).addClass('close').text('중단원 닫기');
		} else {
			$(this).parent().parent().removeClass('active');
			$(this).removeClass('close').text('중단원 열기');
		}
	});

	$('.qbankunit2').click(function () {
		$(this).prop('checked', !$(this).is(':checked'));

		//전체선택 체크
		if($(this).is(':checked') && chkSelectAllUnit()){
			$('#select_all_unit').prop("checked", true);
		} else {
			$('#select_all_unit').prop("checked", false);
		}

		var obj = document.getElementById($(this).attr('id'));
		ck_unit2(obj);

		getQbankTotalCntReady();
	});


	//단원선택 아코디언
	$('.btn_acc2').click(function () {
		var unit2 = $(this).parent().children(":checkbox").val();
		var bl = $(this).parent().children(":checkbox").is(':checked');
		$("input[name=unit2_" + unit2 + "]:checkbox").each(function () {
			$(this).prop("checked", bl);
		});

		//전체선택 체크
		if($(this).is(':checked') && chkSelectAllUnit()){
			$('#select_all_unit').prop("checked", true);
		} else {
			$('#select_all_unit').prop("checked", false);
		}

		// 단원클릭 no1
		getQbankTotalCntReady();
	});


	//단원선택 아코디언
	$('.btn_acc3').click(function () {
		if ($(this).parent().nextAll('dd').is(':hidden')) {
			$(this).parent().parent().addClass('active');
			$(this).parent().find('.btn_acc').addClass('close').text('중단원 닫기');
		} else {
			$(this).parent().parent().removeClass('active');
			$(this).parent().find('.btn_acc').removeClass('close').text('중단원 열기');
		}
	});

	//단원 전체 선택
	$('#select_all_unit').click(function() {
		if($(this).is(':checked')) {
			$('.btn_acc2').each(function(){
				if(!$(this).is(':checked') && !$(this).attr('disabled')) {
					$(this).prop("checked", true);
				}
			});
			$('.qbankunit2').each(function(){
				if(!$(this).is(':checked') && !$(this).attr('disabled')) {
					$(this).prop("checked", true);
				}
			});
		} else {
			$('.btn_acc2').each(function(){
				if($(this).is(':checked')) {
					$(this).prop("checked", false);
				}
			});
			$('.qbankunit2').each(function(){
				if($(this).is(':checked')) {
					$(this).prop("checked", false);
				}
			});
		}
		getQbankTotalCntReady();
	});

	//출제범위 여닫기
	$('.btn_chapter').click(function (e) {
			e.preventDefault()

			if (!$(this).hasClass('on')) {
				$(this).addClass('on');


				// if($(this).next('.chapter_select').height() <= 600 ) {
				//
				// }

				$(this).children('span').text('출제범위 닫기');
				$('.chapter_select').css('display', 'block');
			} else {
				$(this).removeClass('on');
				$(this).children('span').text('출제범위 보기');
				$('.chapter_select').css('display', 'none');
			}


			//function() {
			//	$(this).parent().animate({left: '-480px'}, 300 );
			//	$(this).removeClass('close').text('출제범위보기');

			// console.log($(this).next('.chapter_select').find('.inner').height())

			// if($(this).next('.chapter_select').find('.inner').height() <= 600){
			// 	$(this).next('.chapter_select').find('.scroll_area').css('overflow-y','unset');
			// }
		}
	);

	$('.btn_level').hover(function () {
			$(this).next('.pop_help').show();
		},
		function () {
			$(this).next('.pop_help').hide();
		});

	//input clear
	$('.inputClear').each(function () {
		var defaultValue = $(this).val();

		$(this).focus(function () {
			if ($(this).val() == defaultValue) $(this).val('');
		});
		$(this).blur(function () {
			if ($(this).val() == '') $(this).val(defaultValue);
		});
	});

	//레이어닫기
	$('.btn_lp_close').click(function () {
		$(this).parent().hide();
		$('#bgLayer').hide();
	});

	//가이드
	function tipLoop() {
		$('.qbank_guide .t2 > img').animate({'top': '-20'}, {
			duration: 1000,
			complete: function () {
				$('.qbank_guide .t2 > img').animate({'top': '-40'}, {
					duration: 1000,
					complete: tipLoop
				});
			}
		});
	}

	tipLoop();
	//가이드닫기
	$('.btn_guide_close').click(function () {
		$(this).parent().parent().hide();
	});
	//가이드 다시 열기
	$('.btn_guide').click(function () {
		return false;
		$('.qbank_guide').show();
	});

	$('.btn_reset').click(function () {
		location.reload();
	});

	$('.btn_close').click(function () {
		$('.layer_pop_wrap').hide();
	});

	$('#selectedChapter').change(function () {
		$('#selectedChapter2').find('option.data').remove();

		$('.unit-list').find('dd[data-unit1-code="' + $(this).val() + '"]').each(function () {
			let data = $(this).data();
			let option = '';

			option += '<option class="data" value="' + data.unit2Code + '">' + data.unit2Lab + ') ' + data.unit2 + '</option>';

			$('#selectedChapter2').append(option);
		});
	});
});

//출제 방식 선택
function ch_layer(hidden, show) {
	var hl = document.getElementById(hidden);
	var sl = document.getElementById(show);

	hl.style.display = "none";
	sl.style.display = "";
}

VIEWTYPE = "1";

//문제+해설보기
function itemview() {
	if (VIEWTYPE == 1) {
		VIEWTYPE = 2;
		$('.explain_box').show();
		$('.explain_btn').addClass('on');
		// $('.tab_question li:eq(0)').children('a').addClass('on');
		// $('.tab_question li:eq(1)').children('a').removeClass('on');
	} else {
		VIEWTYPE = 1;
		$('.explain_box').hide();
		$('.explain_btn').removeClass('on');
		// $('.tab_question li:eq(0)').children('a').removeClass('on');
		// $('.tab_question li:eq(1)').children('a').addClass('on');
	}
}