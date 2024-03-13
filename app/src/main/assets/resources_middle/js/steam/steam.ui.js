$(function() {
	menuPos();
	$(".tabmenu li").click(function () {
		menuFix();

	    $(".tabmenu li").each(function () {
	        $(this).removeClass("on");
	    });
	    $(this).addClass("on");
	});

	//이미지 팝업 닫기
	var $btnPopView = $(".btnPopView");
	var $btnPopClose = $(".btnPopClose");
	
	$btnPopView.click(function () {
		popImgView = $(this).attr("href");
		if ($(popImgView).is(":hidden")){
			$(".popImgView").hide().parent().css({"z-index" : "1"});
			$(popImgView).show().parent().css({"z-index" : "10"});
		}
		return false;
	});
	$btnPopClose.click(function () {
		$(this).parent().hide();
		return false;
	});
	var menuList = $(".tabmenu ul li a");
	var sectionList = $(".detail");

	menuList.click(function(event){
		event.preventDefault();
		var conts = $(this).attr('href');
		var contsTop = $(conts).offset().top;
		console.log(conts);
		$('html, body').animate({scrollTop : contsTop - 45});
	});
});

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
		//else if ((scroll_h + win_h) == doc_h) {
		else if (scroll_h + win_h > doc_h - 100) {
			$('.tabmenu ul li').removeClass('on');
			lastElement.addClass('on');
		}
	});

};
function menuAbs(){
    $(".tabmenu").removeClass("fixed");
	$(".tabmenu li").removeClass("on");
};
function menuFix(){
    $(".tabmenu").addClass("fixed");
}


