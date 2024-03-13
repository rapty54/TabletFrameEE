$(function () {

	var bundleId = $('input[name=bundleId]').val();
	var fullDownload = $('input[name=fullDownload]').val();

	//기존 이미지 경로들에다 도메인 붙이기
	/*
	$(".steam").find('img').each(function(){
		var src1 = "https://v.vivasam.com";
		var src2 = $(this).attr('src');
		$(this).attr("src", src1+src2);
	});
	*/

	relationData(bundleId);


	// 댓글 로드
	loadReply(_idx, window.globals.menu, "replySection", window.globals.config.activeEnv, false);
	$(".data-replyCnt").text(ReplyInfo.totalCnt);
	
	//수업자료 다운로드
	loadClassData(_idx, _menuGubun, fullDownload, "classData", window.globals.config.activeEnv, false);

	//비바샘 테마자료
	loadClassTheme(_idx, _menuGubun, "themeData",  "ES", window.globals.config.activeEnv, false);


	menuPos();
	$(".tabmenu li").click(function () {
		menuFix();

		$(".tabmenu li").each(function () {
			$(this).removeClass("on");
		});
		$(this).addClass("on");
	});


	var menuList = $(".tabmenu ul li a");
	var sectionList = $(".detail");

	menuList.click(function(event){
		event.preventDefault();
		var conts = $(this).attr('href');
		var contsTop = $(conts).offset().top;
		console.log(conts);
		$('html, body').animate({scrollTop : contsTop - 25});
	})

});


//수업자료 리스트 가져오기.
function relationData(bundleId) {
	var listHtml = "";
	var strDownId = "";

	Ajax.execute({
		url: '/class/alive/data/list.json',
		data: JSON.stringify({
			bundleId: bundleId
		}),
		contentType: 'application/json',
		method: 'POST',
		dataType: 'json',
		success: function (response) {
			var data = $(response.response);
			listHtml += "<ul>";
			if (data.length > 1) {
				for (var i = 0; i < data.length; i++) {
					var filename = data[i].orgFileName;
					var fileExt = filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase();

					listHtml += "<li><img src='https://www.vivasam.com/images/common/icon/ico_" + fileExt + ".png' alt='한글'>" + data[i].subject + "<a href='javascript:void(0);' onclick=\"downloadPopup('" + data[i].contentGubun + "-" + data[i].contentId + "')\"><img src='https://www.vivasam.com/images/new/btn_download2.gif' alt='다운로드'></a></li>";

					strDownId += data[i].contentGubun + "-" + data[i].contentId + ",";
				}

				strDownId = strDownId.substring(0, strDownId.length - 1);
			} else {
				listHtml += "<li class='no_result'>관련 자료 및 활동지 정보가 없습니다.</li>";
			}

			listHtml += "</ul>";

			listHtml += "<div class='btn'>";
			listHtml += "<a href=\"javascript:void(0);\" id=\"relation" + bundleId + "\">";
			listHtml += "<img src='https://www.vivasam.com/images/new/btn_allDownload2.gif' alt=\"전체 다운로드\"></a>";
			listHtml += "<div>";

			$('#databoxList').html(listHtml);

			if (data.length > 1) {
				$("#relation" + bundleId).on('click', function (e) {
					e.preventDefault();
					Popup.openFileDownloadDext(strDownId);
				});
			}

		}
	});

}

//다운로드 호출
function downloadPopup(val){
	Popup.openFileDownloadDext(val);
}

$(window).scroll(function () {
	menuPos();
});

$(window).resize(function(){
	menuPos();
});

function menuPos() {
	var doc_h = $(document).height();
	var win_h = $(window).height();
	var scroll_h = $(window).scrollTop();
	var detail = $(".detail");
	var visual = $(".steam .visual");

	if (!detail.length){
		return;
	}
	var visual_h = visual.offset().top + visual.height();

	if (scroll_h >= visual_h) {
		menuFix();
	} else {
		menuAbs();
	}

	detail.each(function() {
		var sectionsTop = $(this).offset().top;
		var tabmenu = $('.tabmenu');
		var lastElement = $('.tabmenu ul li:last-child');

		if (scroll_h >= sectionsTop - 60) {
			tabmenu.find('li').removeClass('on');
			tabmenu.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('on');
		}
			//스크롤 끝에 다 다를때
		else if (scroll_h + win_h > doc_h - 100) {
			$('.tabmenu ul li').removeClass('on');
			lastElement.addClass('on');
		}
	});

};
function menuAbs(){
	$('#detail_01').css('paddingTop', '70px');
	$(".tabmenu").removeClass("fixed");
	$(".tabmenu").css('top', '0px');
	$(".tabmenu li").removeClass("on");
};
function menuFix(){
	$('#detail_01').css('paddingTop', '124px');
	$(".tabmenu").addClass("fixed");
	$(".tabmenu").css('top', '77px'); //기존에는 탑메뉴가 없어서 0px였으나 현재는 54px정도로 맞춰줘야됨.
}
