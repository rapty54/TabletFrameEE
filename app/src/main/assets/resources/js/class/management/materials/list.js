$(function () {
	initMaterials();
	getList();

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#listConts')
	});

	/* 추천 키워드 tab 버튼 */
	let ClTab = $(".cl_ma_tab li");
	let CldataList = $(".cl_ma_list tr");

	/* 구분 select 카테고리 */
	const ClassMainSelect = document.querySelector(".cl_ma_select1 > .ui-select2");
	const ClassSubSelect = document.querySelector(".cl_ma_select2 > .ui-select2");

	//추천 키워드 선택
	$(ClTab).click(function() {
		var labId = "";
		var existBool = (tempId && tempId.indexOf($(this).data("id")) > -1)?true:false;	//큐레이션 리스트에 있는지 확인

		//미선택 된 키워드 선택 시 -> 단일 조회
		if(!$(this).attr("class")){
			$(ClTab).removeClass("on");
			$(this).addClass('on');
			//자료 조회
			labId = $(this).data("id");
		}else{	//이미 활성화된 키워드 선택시 (큐레이션에서 온 경우와 일반 선택지
			if(existBool){	//큐레이션 키워드 인 경우
				if($(".cl_ma_tab li.on").length != 1){	//2건 이상 활성화(큐레이션으로 넘어온 최초
					$(ClTab).removeClass("on");
					$(this).addClass('on');
					labId = $(this).data("id");
				}else{
					$(ClTab).removeClass("on");
				}
			}else{	//일반 선택지의 경우 class 제거
				$(ClTab).removeClass("on");
			}
		}

		$(ClassMainSelect).removeAttr("disabled");
		$(ClassSubSelect).removeAttr("disabled");
		$('input[name=searchKeyword]').val('');
		$(ClassMainSelect).val(labId).select2();	//select 선택
		var gradeListStr = $(ClassMainSelect).children("option:selected").data("gradelist");
		isGradeList(gradeListStr);	//학년정보
		$('input[name=labId]').val(labId);
		getList();	//리스트 조회
	});

	//추천 SELECT 박스 선택
	$(ClassMainSelect).change(function (){
		let opt = $(this).children("option:selected");
		let optVal = opt.val();
		$(ClTab).removeClass('on');
		$(ClTab).each(function (){
			if($(this).data('id') == optVal){
				$(this).addClass('on');
			}
		});
		$('input[name=labId]').val(optVal);
		let gradeListStr = opt.data("gradelist");
		isGradeList(gradeListStr);	//학년정보
		getList();	//리스트 조회
	});

	//학년 SELECT 박스 선택
	$(ClassSubSelect).change(function (){
		getList();	//리스트 조회
	});

	//다운로드
	$('#listConts').on('click', '.btn-download', function () {
		var data = $(this).data();
		Popup.openFileDownloadDext(data.contentGubun+"-"+data.contentId);
	});

	// 컨텐츠 담기
	$('#listConts').on('click', '.btn-folder-layer-open', function () {
		var data = $(this).data();
		Layer.openFolderMain({
			menu: window.globals.menu,
			type: 'MATERIALS',
			parameter: {
				code2: data.contentGubun+"-"+data.contentId
			}
		});
	});

	// 컨텐츠 보기
	$('#listConts').on('click', '.btn-viewer-main-open', function () {
		var data = $(this).data();
		if (data.fileType === 'FT207') {
			return;
		}
		Popup.openViewerMain(data.contentId, data.contentGubun);
	});

	//검색
	$('input[name=searchKeyword]').on('keydown', function (e){
		if(e.keyCode == '13'){
			getList();
		}
	});
});

//parameter로 추천 키워드 넘어 온 경우
var urlStr = location.href;
var url = new URL(urlStr);
var urlParams = url.searchParams;
var tempId = urlParams.get("id");
var tempWord = urlParams.get("s");
function initMaterials(){
	var labId = "";
	var word = "";
	//큐레이션을 통해 넘어 온경우
	if(tempId){
		$(".cl_ma_tab li").each(function (){
			//고정키워드 거나 URL로 넘어온 경우
			if (tempId.indexOf($(this).data("id")) > -1) {
				$(this).addClass("on");
				labId += $(this).data("id") + ",";
			}
		});
	}else if(tempWord){
		word = tempWord;
	}else{	//일반적으로 넘어온 경우(고정 키워드 랜덤)
		$(".cl_ma_tab li").each(function (){
			//고정키워드 거나 URL로 넘어온 경우
			if ($(this).data("fixyn") == "Y"){
				$(this).addClass("on");
			}
		});

		//랜덤 처리
		var maxNum = $(".cl_ma_tab li.on").length-1;
		var randomIndex = Math.floor(Math.random() * (maxNum +1));
		$(".cl_ma_tab li.on").each(function (index) {
			if ($(this).data("fixyn") == "Y") {	//고정 키워드 인 경우 랜덤 1개
				if (index == randomIndex) {
					labId = $(this).data("id") + ",";
				} else {
					$(this).removeClass("on");
				}
			}
		});
	}
	if(labId){
		labId = labId.substring(0, labId.length-1);
	}

	if (labId.split(",").length > 1) {
		$(".cl_ma_select1 > .ui-select2").attr("disabled", "disabled");
		$(".cl_ma_select2 > .ui-select2").attr("disabled", "disabled");
	}

	$('input[name=labId]').val(labId);
	$('input[name=searchKeyword]').val(tempWord);
}

/* 자료 file download */
function KeywordFileDown(){
	const link = document.createElement('a');
	document.body.appendChild(link);
	link.download = 'some file';
	link.click();
}

function getList(){
	var $listConts = null;
	$listConts = $('#listConts');
	Ajax.execute({
		url: '/class/management/materials/getMaterialsList',
		data: {
			labId: $('input[name=labId]').val(),
			grade: $('select[name=grade]').val(),
			searchKeyword: $('input[name=searchKeyword]').val(),
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$listConts.empty();
			$listConts.append($(html));
		}
	});
}

//학년정보
function isGradeList(gradeListStr){
	const ClassSubSelect = document.querySelector(".cl_ma_select2 > .ui-select2");
	let optHTML = "";
	//학년 정보 있는 경우
	if(gradeListStr) {
		$(ClassSubSelect).prop("disabled", false);
		let gradeList = gradeListStr.split(",");
		optHTML = "<option value=''>학년</option>";
		for (let i = 0; i < gradeList.length; i++) {
			optHTML += "<option value='"+gradeList[i]+"'>"+gradeList[i]+"</option>";
		}
	}else{
		optHTML = "<option value=''>-</option>";
		$(ClassSubSelect).prop("disabled", true);
	}
	$(ClassSubSelect).html(optHTML);
}