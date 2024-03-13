$(function(){
	//slider + tab
	var bxConfig = {
		auto: false,
		slideWidth: 862,
		infiniteLoop: false,
		hideControlOnEnd: true,
		autoControlsCombine: true
	};

	var $container = $('#container');
    var $tabContent = $container.find('.tab_content');
    var $sliders = [];
	
	$('.slider').each(function (i) {
		$sliders[i] = $(this).bxSlider(bxConfig);
	});
	
	$container.find('#tab_energy li a').on('click', function() {
		var idx = $(this).parent().index();
		
		$("#tab_energy ul li").removeClass("on");
		$(this).parent().addClass("on");
		
		var $current = $("#container .tab_content").eq(idx);
		
		$tabContent.not($current).removeClass('active');
		$current.addClass('active');
		
		if ($current.hasClass('active')) {
		  	var index = $tabContent.index($current);
			$sliders[index].reloadSlider();
		}
	});	
	
	$(window).scroll(function() {
		var pos = $(this).scrollTop();
		
		if (pos > 700) {
			$('.btn_top a').stop(true, false).animate({'top' : pos + 400 + 'px'}, 200).show();
		} else {
			$('.btn_top a').hide();
		}
	});
	
	//말풍선
	var $imgObj = $(".imgArea");
	var $imgPopTip = $(".tip");

	$imgObj.mouseenter(function(){
		popImgView = $(this).attr("href");
		
		if ($(popImgView).is(":hidden")){
			console.log(popImgView);
			$(popImgView).show();
		}
	})

	$imgPopTip.mouseleave(function(){
		$(this).hide();
	});
	

	// 메인비주얼
	var $mainVisual = $(".main_visual");
	var $v_con1 = $mainVisual.find(".v1");
	var $v_con2 = $mainVisual.find(".v2");
	var $v_con3 = $mainVisual.find(".v3");

	//$v_con1.css({top:30}, 1500).stop().animate({top:20}, 1500).animate({top:30}, 1000, "easeOutBack");
	//$v_con2.css({top:203}, 1500).stop().animate({top:193}, 1500).animate({top:203}, 1000, "easeOutBack");
	//$v_con3.css({top:48}, 1500).stop().animate({top:38}, 1500).animate({top:48}, 1000, "easeOutBack");
	
	setTimeout(function() {
        $v_con1.animate({top:15}, 500).animate({top:30}, 500);
    }, 0);
	setTimeout(function() {
        $v_con2.animate({top:188}, 500).animate({top:203}, 500);
    }, 1000);
	setTimeout(function() {
        $v_con3.animate({top:33}, 500).animate({top:48}, 500);
    }, 2000);



	var $mainTipObj = $(".imgAreaMain");
	var $mainTipPop = $(".main_tip");
	
	$mainTipObj.mouseenter(function(){
		popTipView = $(this).attr("href");
		if ($(popTipView).is(":hidden")){
			$(popTipView).fadeIn().css("z-index" , "20");
		}
	})

	$mainTipPop.mouseleave(function(){
		$(this).fadeOut();
	});
});