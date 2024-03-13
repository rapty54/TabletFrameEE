$(document).ready(function() {
	try { 
		
		var subBundleId = $("#subBundleId", parent.document).val();

		var arrBundleId = subBundleId.split(",");
		
		$(".data_wrap .list_area").each(function(index, item) {
			//console.log(index);
			//console.log(item);
			//console.log(arrBundleId[index]);
			
			//alert(arrBundleId[index]);
			//관련자료 컨텐츠 목록 조회
			if (arrBundleId[index] != "") {
				getJaewooTravelRelationData(arrBundleId[index], item);
			}
		});
	}
	catch (err){
      alert(err);
   }

	$("#jaewooQnA").click(function(e) {
		var divTop = e.clientY - 400; //상단 좌표 위치 안맞을시 e.pageY
		var divLeft = (Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft())) + $('#counselData', parent.document).width() / 2;
		
		$('#counselData', parent.document).css({ "top": divTop,"left": divLeft, "position": "absolute"}).show();

	});
	
	//문의하기 등록
	$("#regJaewooQna", parent.document).click(function(e) {
		saveJaewooQna();
	});
	
	//문의하기 닫기
	$("#counselData .close", parent.document).click(function(e) {
		clearJaewooQna();
	});
	
	//문의하기 취소(닫기)
	$("#counselData #cancleJaewooQna", parent.document).click(function(e) {
		clearJaewooQna();
	});
	
	//관련 자료 및 활동지 라인 삭제
	if($(".data_wrap").hasClass("full")){
		$(".list_area").children("ul").find("li:lt(2)").addClass("noline");
	}
});

function clearJaewooQna() {
	$("#qnaTitle", parent.document).val('');
	$("#qnaContents", parent.document).val('');
	
	$('#counselData', parent.document).hide();
}

//문의하기 등록
function saveJaewooQna() {
	var qnaTitle = $("#qnaTitle", parent.document);
	var qnaContents = $("#qnaContents", parent.document);
	
	if (qnaTitle.val() == "") {
		alert("제목을 입력해주세요.");
		qnaTitle.focus();
		return;
	}
	if (qnaContents.val() == "") {
		alert("내용을 입력해주세요.");
		qnaContents.focus();
		return;
	}
	
	if (confirm("감사합니다. 문의하신 내용은 검토 후 회신 드리겠습니다.\n\n답변 내용은 “나의 교실”에서도 확인하실 수 있습니다.")) {
		var ajaxData = {qnaTitle : qnaTitle.val(), qnaContents : qnaContents.val(), vivasamformat : "json"};
		
		$.ajax({
	        type: "POST",
	        url: "/create/jaewooQnAInsert.do",
	        cache: false,
	        async: true,
	        dataType: "json",
	        data: ajaxData,
	        success: function(data){
	        	if(data.code == "0000"){
	        		clearJaewooQna();
	        	}
	        	else {
                    alert("정상적으로 처리되지 못했습니다.");
                }
	        },
	        error: function (xhr, ajaxOptions, thrownError){
	        	//alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
	        },
	        complete:function (xhr, textStatus){
	        	//           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
	        }
	    });	
	}
	else {
		return;
	}
}

//관련자료 컨텐츠 목록 조회
function getJaewooTravelRelationData(bundleId, item) {
	var listHtml = "";
	var strDownId = "";
	var ajaxData = {bundleId : bundleId, vivasamformat : "json"};

	$.ajax({
        type: "POST",
        url: "/create/jaewooTravelRelationDataList.do",
        cache: false,
        async: false,
        dataType: "json",
        data: ajaxData,
        success: function(data){

        	listHtml += "<h5>관련 자료 및 활동지</h5>";
        	listHtml += "<a href=\"javascript:void(0);\" class=\"btn_down\" id=\"relation" + bundleId + "\">";
        	listHtml += "<img src=\"../../../images/create/travel/btn_down_all.gif\" alt=\"전체 다운로드\"></a>";
        	listHtml += "<ul>";
        	
        	if (data.result.length > 1) {
        		for (var i = 1; i < data.result.length; i++) {
            		/*listHtml += "<li><a href=\"javascript:void(0);\" onclick=\"javascript: ContentView2015('', '" + data.result[i].contentGubun + "', '" + data.result[i].contentId + "');\">";
            		listHtml += data.result[i].subject + "</a></li>";*/
        			
        			listHtml += "<li><span>" + data.result[i].subject + "</span></li>";
            		
            		strDownId += data.result[i].contentGubun + "-" + data.result[i].contentId + ",";
            	}	
        		
        		strDownId = strDownId.substring(0, strDownId.length - 1);
        	}
        	else {
        		listHtml += "<li class='no_result'>관련 자료 및 활동지 정보가 없습니다.</li>";
        	}
        	
        	
        	listHtml += "</ul>";
        	
        	//alert(listHtml);
        	
        	$(item).html(listHtml);
        	
        	if (data.result.length > 1) {
	        	$("#relation" + bundleId).on('click' , function(e){
	            	e.preventDefault();
	            	
	            	go_DownloadFile("ID", strDownId);
	            	//parent.go_DownloadFile("ID", strDownId);
	            });
        	}
        	
        },
        error: function (xhr, ajaxOptions, thrownError){
        	//alert("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
        },
        complete:function (xhr, textStatus){
        	//           alert("complete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
        }
    });
}

//url 분기
function contentLinkUrl(val, obj){ // URL 분기 스크립트
	var commonCkeckUrl = window.location.hostname; //URL기반

	if(obj) {
		var $classObj = $(obj).closest('.arrlinkparents').parent();
		var $object = commonCkeckUrl == "e.vivasam.com" ? $classObj.find(".arreslinkurl li").eq(val) : $classObj.find(".arrcomlinkurl li").eq(val);
	} else {
		var $object = commonCkeckUrl == "e.vivasam.com" ? $(".arreslinkurl li").eq(val) : $(".arrcomlinkurl li").eq(val);
	}

	var $linkUrl = $object.text().replace(/"/gi, "");
	$object.data("target") == "blank" ? window.open($linkUrl) : location.href = $linkUrl;
}

