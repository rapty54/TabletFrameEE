//gnb scroll design
(function($){
	$(window).on("load",function(){
		$(".gnbScroll").mCustomScrollbar({
			axis:"x",
			theme:"dark",
			advanced:{autoExpandHorizontalScroll:true}
		});
	});
})(jQuery);

$(function(){
	/* var bxConfig = {
		auto: false,
		pager: false,
		//controls: false,
		slideWidth: 102,
		slideMargin: 10,
		moveSlides: 7,
		maxSlides: 7,
		hideControlOnEnd: true,
		infiniteLoop : false
	};
	var $sliders = [];
	$('.slider').each(function (i) {
		$sliders[i] = $(this).bxSlider(bxConfig);
	}); 
	$(".submenu").hide();  */
	
	// nav
	var $gnb = $("#gnb_literature");
	var $gnbMenu = $('#gnb_literature .gnb_depth');
	var $container = $("#container");
	
	//depth 활성화 됐을 경우
	if ($gnbMenu.find("li").hasClass("on"))
	{	
		var activeIdx = $gnbMenu.find('li.on').index() + 1;
		if (activeIdx > 9)
		{
			var scrollLeft = 0;
			
			if (activeIdx < 18)
			{
				scrollLeft = 112 * 9;
			} else if (activeIdx > 18)
			{
				scrollLeft = 112 * 18;
			}
			$gnbMenu.find('li.on').parents(".gnbScroll").mCustomScrollbar({
				axis:"x",
				theme:"dark",
				advanced:{autoExpandHorizontalScroll:true},
				setLeft: scrollLeft+"px"
			});
		}
	}

	$gnb.find('ul.inner > li > a').on('mouseover focusin', function(){
		var idx = $(this).parent('li').index();
		activeNav();
		$gnbMenu.find('.submenu').css({"opacity":"0", "z-index":"0"});
		if ($gnbMenu.hasClass('open'))
		{
			$gnbMenu.find('.submenu').eq(idx).css({"opacity":"1", "z-index":"100"});
			$container.css({"z-index":"10"});
			//$gnb.find('ul.inner > li').removeClass('on');
			//$(this).parent('li').addClass('on');
		}else {
			$gnbMenu.find('.submenu').eq(idx).css({"opacity":"0", "z-index":"0"});
			$container.css({"z-index":"20"});
			$(this).parent('li').removeClass('on');
		}
	});
	$gnb.on('mouseleave', function(){
		clearNav();
	});

	function clearNav(){
		$gnbMenu.removeClass('open');
		$gnbMenu.find('.submenu').css({"opacity":"0", "z-index":"0"});
		$container.css({"z-index":"20"});
		$('#bgLayer').css({"z-index":"9500", "position":"absolute"}).hide();
	}
	function activeNav(){
		$gnbMenu.addClass('open');
		$('#bgLayer').css({"z-index":"10", "position":"fixed"}).show();
	}

	//메인비주얼
	$(".main_visual ul li").each(function(){
		$(this).children("a").hover(function(){
			$(this).find("img").fadeOut(550);
		}, function() {
			$(this).find("img").fadeIn(550);
		});	
	});	

	//작품활용가이드
	$(".btn_guide").click(function(){
		return false;
		$(".guide_wrap").show();
		bgLayerH();
	});

	//작가별 팝업
	$(".btn_author").click(function(){
		$(".search_list.author").show();
		bgLayerH();
	});

	$(".btn_work").click(function(){
		$(".search_list.work").show();
		bgLayerH();
	});

	$(".btn_pop_close").click(function(){
		$(this).parent().parent().hide();
		bgLayerClose();
	});
});

