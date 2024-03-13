$(function() {
	if (_tabType == 'A') {
		$("#mySubjectData").addClass("on");
		$("#save_chasi").hide();
		$("#view_chasi").hide();
		$("#save_data").show();
	} else if  (_tabType == 'B') {
		$("#myPeriod").addClass("on");
		$("#save_data").hide();
		$("#view_chasi").hide();
		$("#save_chasi").show();
	} else {
		$("#recentlyPeriod").addClass("on");
		$("#save_data").hide();
		$("#save_chasi").hide();
		$("#view_chasi").show();
	}

	// 공통 체크박스 컨트롤 함수 사용
	LayoutHandler.checkbox();
	// 내 폴더 관리 오픈
	$('#btn-folder-edit').bind('click', function() {
		Layer.openFolderMain({
			menu: window.globals.menu,
			edit: true,
			parameter: {
				textbookCd: "",
				code2: "",
			}
		});
	});
	// 폴더 선택 이벤트
	$('select[name=folderId]').bind('change', function() {
		location.href = '/my/classroom/data/subject/list?folderId=' + $(this).val();
	});
	// 통합뷰어 팝업 오픈
	$('.btn-viewer-main-open').bind('click', function() {
		var data = $(this).data();
		if(data.fileType == "FT206") {
			window.open(data.siteUrl, '', '_blank');
		} else {
			Popup.openViewerMain(data.contentId, data.contentGubun);
		}
	});
	// 컨텐츠 다운로드
	$('.btn-download').bind('click', function() {
		return false;
		var content = $(this).data().content;
		if (!content) {
			alert('자료가 없습니다.');
			return false;
		}
		// 새창으로 다운로드 호출
		Popup.openFileDownloadDext(content);
	});
	// 전체 다운로드
	$('.btn-all-download').bind('click', function() {
		if ($('input.ui-checkbox-all-check:checked').length == 0) {
			alert('다운로드할 자료를 선택해 주세요.');
			return false;
		}
		var content = '';
		$('input.ui-checkbox-all-check:checked').each(function() {
			content += $(this).val() + ',';
		});
		Popup.openFileDownloadDext(content);
	});
	// 삭제
	$('.btn-delete').bind('click', function() {
		if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
			return false;
		}
		deleteFolder([ $(this).data() ]);
	});
	// 전체 삭제
	$('.btn-all-delete').bind('click', function() {
		if ($('input.ui-checkbox-all-check:checked').length == 0) {
			alert('삭제 하실 자료를 선택해주세요.');
			return false;
		}
		if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
			return false;
		}
		var items = [];
		$('input.ui-checkbox-all-check:checked').each(function() {
			items.push($(this).data());
		});
		deleteFolder(items);
	});
	//내 저장 차시 개별 삭제
	$('.btn-delete-my-period').bind('click', function() {
		if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
			return false;
		}

		deleteOneMyPeriod( $(this).data('period-id') + ",");
	});
	//최근 본 차시 개별 삭제
	$('.btn-delete-view-period').bind('click', function() {
		if (!confirm('선택하신 자료를 삭제하시겠습니까?')) {
			return false;
		}

		deleteOneRecentlyPeriod( $(this).data('period-id') + ",");
	});
});

function deleteFolder(items) {
	var data = {
		items: items,
		type: 'MY_CLASSROOM_DATA_SUBJECT'
	};
	Ajax.execute({
		url: '/folder/content/delete.json',
		data: JSON.stringify(data),
		contentType: 'application/json',
		method: 'post',
		success: function(response) {
			alert('삭제되었습니다.');
			location.reload();
		}
	});
}
// 차시창 오픈
function openPeriod(periodId, lnbCode) {
	Popup.openPeriodViewer(periodId, '', lnbCode);
}

//내 저장 차시 개별 삭제
function deleteOneMyPeriod(data) {

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/data/subject/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({periodIds: data}),
		success: function (data) {
			if(data.code == "SUCCESS") {
				//location.reload();
				//목록 초기화
				location.href = "/my/classroom/data/subject/list?tabType=B";

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
		url: "/my/classroom/data/subject/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({periodIds: data}),
		success: function (data) {
			if(data.code == "SUCCESS") {
				//location.reload();
				//목록 초기화
				location.href = "/my/classroom/data/subject/list?tabType=B";
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// 최근 본 차시 개별 삭제
function deleteOneRecentlyPeriod(data) {

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/data/subject/recently/delete",
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

// 최근 본 차시 삭제
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
		url: "/my/classroom/data/subject/recently/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({seqs: data}),
		success: function (data) {
			if(data.code == "SUCCESS") {
				location.href = "/my/classroom/data/subject/list?tabType=C&pageNo=1";
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

	} else if (type == "B") {
		$("input[name='savedCheck']").prop("checked", $(self).is(":checked"));
	} else {
		$("input[name='recentlyCheck']").prop("checked", $(self).is(":checked"));
	}
}

// 탭 변경
function tabChange(type) {
	location.href = "/my/classroom/data/subject/list?tabType=" + type;
}

// 내 저장 차시 필터 변경 시 검색
function searchMyPeriod(value) {
	location.href = "/my/classroom/data/subject/list?tabType=B&textbookCd=" + value;
}