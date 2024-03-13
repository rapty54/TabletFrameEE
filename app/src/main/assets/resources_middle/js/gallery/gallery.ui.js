$(function(){
	//작품상세
	$(".btn_pop_close").click(function(){
		$(this).parent().parent().hide();
		bgLayerClose();
	});
	
	//시대사조
	menuPos();
	$(".tab_period > ul > li > a").click(function () {
		var target = $(this).attr("href");
		var targetValue = $(target).offset().top-$(".tab_period").height();

		$('html').scrollTop(targetValue);

	    $(".tabmenu > ul > li").each(function () {
	        $(this).removeClass("on");
	    });
	    $(this).parent().addClass("on");

		return false;
	});
	
	//top버튼
	$("#btnTop button").on("click", function(){
		$(window).scrollTop(0);
	});
});

$(window).scroll(function () {
	menuPos();
	var scroll_h = $(window).scrollTop();
	
	if (scroll_h == 0)
	{
		$("#btnTop").hide().animate({opacity:0});
	} else {
		$("#btnTop").show().animate({opacity:1});
	}
});

$(window).resize(function(){
	menuPos();
});	

function menuPos() {
    var doc_h = $(document).height();
    var win_h = $(window).height();
    var scroll_h = $(window).scrollTop();
	var detail = $(".period_cont");
	var header = $("#header_gallery");
	var year = detail.find('.inner');
	
	if (!detail.length){
		return;
	}
	var header_h = header.offset().top + header.height() + 10;
	
	if (scroll_h >= header_h) {

	} else {
		menuAbs();
	}

	detail.each(function() {
		var sectionsTop = $(this).offset().top - 240;
		var tabmenu = $('.tab_period');
		
		if (scroll_h >= sectionsTop) {
			tabmenu.find('li').removeClass('on');
			tabmenu.find('a[href="#'+$(this).attr('id')+'"]').parent().addClass('on');
		}
	});

	year.each(function() {
		var yearTop = $(this).offset().top - 300 + 55;
		var year_h = $(this).outerHeight() - 100;
		var yearBottom = yearTop + year_h;
		
		if (scroll_h >= yearTop && scroll_h < yearBottom) {
			$('.period_cont .inner').removeClass('active');
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});

};

function menuAbs(){
	$(".tab_period > ul > li").removeClass("on");
};