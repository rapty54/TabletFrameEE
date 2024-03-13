$(function () {
	if (_tabType == 'A') {
		$("#recentlyPeriod").addClass("on");
		$("#save_chasi").hide();
		$("#view_chasi").show();
	} else {
		$("#myPeriod").addClass("on");
		$("#view_chasi").hide();
		$("#save_chasi").show();
	}
});

// 차시창 오픈
function openPeriod(periodId, lnbCode) {
	Popup.openPeriodViewer(periodId, '', lnbCode);
}

// 내 최근 차시 삭제
function deleteRecentlyPeriod() {

	var checkList = $("input[name='recentlyCheck']:checked");

	if (checkList.length == 0) {
		alert("삭제할 자료를 하나 이상 선택해 주세요.");
		return;
	} else if (!confirm("선택한 파일을 정말 삭제하시겠습니까?")) {
		return;
	}

	var data = "";

	checkList.each(function () {
		if ($(this).val()) {
			data += $(this).val() + ",";
		}
	});

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/data/period/recently/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({seqs: data}),
		success: function (data) {
			if(data.code == "SUCCESS") {
				location.reload();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 내 저장 차시 삭제
function deleteMyPeriod() {

	var checkList = $("input[name='savedCheck']:checked");

	if (checkList.length == 0) {
		alert("삭제할 자료를 하나 이상 선택해 주세요.");
		return;
	} else if (!confirm("선택한 파일을 정말 삭제하시겠습니까?")) {
		return;
	}

	var data = "";

	checkList.each(function () {
		if ($(this).val()) {
			data += $(this).val() + ",";
		}
	});

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/data/period/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({periodIds: data}),
		success: function (data) {
			if(data.code == "SUCCESS") {
				location.reload();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// check
function allCheck(type, self) {
	if (type == "A") {
		$("input[name='recentlyCheck']").prop("checked", $(self).is(":checked"));
	} else {
		$("input[name='savedCheck']").prop("checked", $(self).is(":checked"));
	}
}

// 탭 변경
function tabChange(type) {
	location.href = "/my/classroom/data/period/list?tabType=" + type;
}

// 내 저장 차시 필터 변경 시 검색
function searchMyPeriod(value) {
	location.href = "/my/classroom/data/period/list?tabType=B&textbookCd=" + value;
}