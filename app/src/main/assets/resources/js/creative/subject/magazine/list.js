$(document).ready(function() {

	// 댓글 로드
	loadReply($($("#magazine-list li")[0]).attr("data-cea-div-seq"), window.globals.menu, "replySection", window.globals.config.activeEnv, false);

	var $form = $('#magazine-form');
	// 매거진 클릭 이벤트
	$('#magazine-list li a').bind('click', function() {
		$('#magazine-list li').removeClass('on');
		var $li = $(this).closest('li');
		var index = $li.index();
		$li.addClass('on');
		// 현재 컨텐츠 보여주기
		$('#magazine-view > div.wrap_magazine').hide();
		$('#magazine-view > div.wrap_magazine').eq(index).show();
		var data = $li.data();
		// 조회수 증가 추가 
		Ajax.execute({
			type: 'post',
			url: "/creative/subject/magazine/update.json",
			dataType: 'json',
			data: { 
				ceaDivSeq: data.ceaDivSeq, 
			},
			success: function(response) {

				// 댓글 로드
				history.pushState(null, null, "/creative/subject/magazine/list?ceaDivSeq=" + data.ceaDivSeq + '&ceaDivDetail1Cd=' + data.ceaDivDetail1Cd + '&ceaDivDetail2Cd=' + data.ceaDivDetail2Cd);
				loadReply(data.ceaDivSeq, window.globals.menu, "replySection", window.globals.config.activeEnv, false);

				/*
				if (StringUtils.isNotEmpty(data.linkUrl)) {
					Popup.openWindowTab(data.linkUrl, 'magazine');
				}
				*/
			}
		});
	});
	// 년도 선택 이벤트
	$form.find('select[name=ceaDivDetail2Cd]').bind('change', function () {
		$form.submit();
	});

	if ($("#ceaDivSeq").val()) {
		$("li[data-cea-div-seq='" + $('#ceaDivSeq').val() + "'] a").click();
	}

	if(!$.cookie("vPop")) {
		Ajax.execute({
			type: 'post',
			url: "/member/chkVMagazineUser.json",
			dataType: 'json',
			success: function(result) {
				var data = result.response;
				var code = data.code;
				if (code == "0000") {
					$("#vPop").css("display", "block");
				}
			}
		});
	}

	changeLastYearMagazine();
});


// 컨텐츠 V매거진 E-BOOK 버튼 링크
function viewEbook(id) {
	var data = $('#magazine-list li.on').data();
	if (SessionUtils.isLogin()) {
		Popup.openWindow({
			url: data.linkUrl,
			name: "magazine",
			width: 1200,
			height: 860
		});
	}
}
// 우편번호 검색 후 콜백정보
function callbackJuso(data) {
	$('input[name=uschAddr]').val(data.addr);
	$('input[name=uschZip]').val(data.zip);
}

/**
 * 컨텐츠 다운로드 파일
 * @param type
 * @param key
 */
function DownloadFile(type, key) {
	var contentGubun = '';
	var contentId = '';
	var arrPid = key.split('-');
	// 현재 선택된 데이터
	var data = $('#magazine-list li.on').data();
	if (arrPid[0] == '$contentGubun') {
		contentGubun = data.contentGubun;
	} else {
		contentGubun = data.contentGubunSub;
	}
	if (arrPid[1] == '$contentId') {
		contentId = data.contentId;
	} else {
		contentId = data.contentIdSub;
	}
	Popup.openFileDownloadDext(contentGubun + "-" + contentId);
}

//v매거진 서비스 종료로 인한 작년 동월 메거진을 메인메거진으로 변환하는 작업
function changeLastYearMagazine() {
	const index = $('#lastYearCiIndex').val();

	console.log('index', index);

	if(index!==undefined && index!=='') {
		$('#magazine-list li').removeClass('on');
		$('#magazine-view > div.wrap_magazine').hide();
		$('#magazine-view > div.wrap_magazine').eq(index).show();
		$('#magazine-list li:eq(' + index +')').addClass('on');
		const data = $('#magazine-list li:eq(' + index +')').data();
		// 댓글 로드
		history.pushState(null, null, "/creative/subject/magazine/list?ceaDivSeq=" + data.ceaDivSeq + '&ceaDivDetail1Cd=' + data.ceaDivDetail1Cd + '&ceaDivDetail2Cd=' + data.ceaDivDetail2Cd);
		loadReply(data.ceaDivSeq, window.globals.menu, "replySection", window.globals.config.activeEnv, false);
	}
}