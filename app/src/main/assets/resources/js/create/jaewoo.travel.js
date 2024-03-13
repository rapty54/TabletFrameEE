var strDownId = "";

$(document).ready(function() {


	try {
		$(".data_wrap .list_area").each(function(_index, obj) {
			getJaewooTravelRelationData($($(".subBundleIds")[_index]).val(), obj);

		});
	} catch (err) {
		alert(err);
	}

	$("#jaewooQnA").click(function(e) {
		var divTop = e.clientY - 400; //상단 좌표 위치 안맞을시 e.pageY
		var divLeft = (Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft())) + $('#counselData').width() / 2;
		$('#counselData').css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
	});

	//문의하기 등록
	$("#regJaewooQna").click(function() {
		saveJaewooQna();
	});

	//문의하기 닫기
	$("#counselData .close").click(function() {
		clearJaewooQna();
	});

	//문의하기 취소(닫기)
	$("#counselData #cancleJaewooQna").click(function() {
		clearJaewooQna();
	});

	//관련 자료 및 활동지 라인 삭제
	if ($(".data_wrap").hasClass("full")) {
		$(".list_area").children("ul").find("li:lt(2)").addClass("noline");
	}
});

function clearJaewooQna() {
	$("#qnaTitle").val('');
	$("#qnaContents").val('');

	$('#counselData').hide();
}

//문의하기 등록
function saveJaewooQna() {
	var qnaTitle = $("#qnaTitle");
	var qnaContents = $("#qnaContents");

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
		var ajaxData = { qnaTitle: qnaTitle.val(), qnaContents: qnaContents.val(), vivasamformat: "json" };
		$.ajax({
			type: "POST",
			url: "/create/jaewooQnAInsert.do",
			cache: false,
			async: true,
			dataType: "json",
			data: ajaxData,
			success: function(data) {
				if (data.code == "0000") {
					clearJaewooQna();
				}
				else {
					alert("정상적으로 처리되지 못했습니다.");
				}
			},
		});
	}
	else {
		return;
	}
}

//관련자료 컨텐츠 목록 조회
function getJaewooTravelRelationData(bundleId, item) {
	var listHtml = "";

	var ajaxData = { bundleId: bundleId, vivasamformat: "json" };

	$.ajax({
		type: "POST",
		//url: "/creative/exp/trip/relation.json",
		url: "https://v.vivasam.com/create/jaewooTravelRelationDataList.do",
		cache: false,
		async: false,
		dataType: "json",
		data: ajaxData,
		success: function(data) {

			listHtml += "<h5>관련 자료 및 활동지</h5>";
			listHtml += "<a href=\"javascript:void(0);\" class=\"btn_down\" id=\"relation" + bundleId + "\">";
			listHtml += "<img src=\"/resources/images/create/travel/btn_down_all.gif\" alt=\"전체 다운로드\"></a>";
			listHtml += "<ul>";

			if (data.result.length > 1) {
				for (var i = 1; i < data.result.length; i++) {
					listHtml += "<li><span>" + data.result[i].subject + "</span></li>";
					strDownId += data.result[i].contentGubun + "-" + data.result[i].contentId + ",";
				}
				strDownId = strDownId.substring(0, strDownId.length - 1);
			}
			else {
				listHtml += "<li class='no_result'>관련 자료 및 활동지 정보가 없습니다.</li>";
			}
			listHtml += "</ul>";
			$(item).html(listHtml);

			if (data.result.length > 1) {
				$("#relation" + bundleId).on('click', function(e) {
					// e.preventDefault();
					go_DownloadFile("ID", strDownId);
					// Popup.openFileDownloadDext(strDownId);
				});
			}

		},
	});
}

function go_DownloadFile(_type, keyVal) {
	Popup.openFileDownloadDext(keyVal, 'Y', false);
}
