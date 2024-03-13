$(function () {

	getVideoList();

	$('#content').on('click','#goSearch', function() {
		$('input[name=page2]').val(1);
		getVideoList();
	});

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#content')
	});

	$('#content').on("keyup",'input[name=searchKeyword]',function(key){
		if(key.keyCode==13) {
			getVideoList();
		}
	});

	//통합뷰어
	$('#content').on('click','.btn-viewer-main-open',function(){
		var data = $(this).data();
		// ZIP 컨텐츠는 새창으로 띄워주기
		if (data.type != 'Y') {
			if (data.file == 'FT207') {
				// FT359	iPDF (복합파일(ZIP)
				if (data.mediaType == 'FT359') {
					Popup.openSimpleSViewer(data.siteUrl);
					return false;
				}
				// FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
				if (data.mediaType == 'FT360') {
					Popup.openHtmlViewer(data.siteUrl);
					return false;
				}
			}
		} else {
			Popup.openHtmlViewer2(data.siteUrl);
			return false;
		}
		Popup.openViewerMain(data.content, data.contentGubun);
	});
});

function downloadPopup(target){
	var $target = $(target);
	var contentId = $target.data('content');
	var downyn = $target.data('downyn');
	// 새창으로 다운로드 호출
	Popup.openFileDownloadDext(contentId,downyn);

};

function insertFolderChk(target) {
	var $target = $(target);
	var contentId = $target.data('content');
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'CREATIVE',
		parameter: {
			textbookCd: "",
			code2: contentId,
		}
	});
}

function clickTypeTab(target) {
	var $target = $(target);
	var type1 = typeof $target.data('id') === 'undefined' ? "" : $target.data('id');
	$('input[name=type1]').val(type1);
	$('input[name=type2]').val('');
	getVideoList();

	$target.closest('div').find('a').each(function(){
		$(this).removeClass('on');
	});
	$target.addClass('on');
};


function clickTypeTabSearch(target) {
	var $target = $(target);
	var type1 = $target.data('code1');
	var type2 = $target.data('code');
	$('input[name=type1]').val(type1);
	$('input[name=type2]').val(type2);
	getVideoList();

	$target.closest('div').find('a').each(function(){
		$(this).removeClass('on');
	});
	$target.addClass('on').closest('ul').siblings('a').addClass('on');
};


