$(window).load(function() {
	//배경
	$('#slideTab>li').eq(0).addClass('on')
	$('#pager a').hide().slice(0, 3).show();

	sliderBg = $('#rolling3 ul').bxSlider({
		pagerCustom: '#pager',
		pager: true,
		pause: 8800,
		speed: 1000,
		useCSS: false,
		easing: 'easeInOutQuint',
		touchEnabled: false,
		onSlideBefore: function(){
			idx = sliderBg.getCurrentSlide();
			//console.log(idx);

			$('#slideTab>li').removeClass('on');

			if(idx < 3) {
				$('#slideTab>li').eq(0).addClass('on');
				$('#pager a').hide().slice(0, 3).show();
			} else if(idx < 7) {
				$('#homeCnt').removeAttr('class');
				$('#homeCnt').addClass('visualBg2');
				$('#slideTab>li').eq(1).addClass('on');
				$('#pager a').hide().slice(3, 7).show();
			} else if(idx < 11) {
				$('#slideTab>li').eq(2).addClass('on');
				$('#pager a').hide().slice(7, 11).show();
			} else if(idx < 15) {
				$('#homeCnt').removeAttr('class');
				$('#homeCnt').addClass('visualBg4');
				$('#slideTab>li').eq(3).addClass('on');
				$('#pager a').hide().slice(11, 15).show();
			}
		}
	});
	slideOpt(); // 초기실행

	$('#slideTab>li').click(function() {
		var idx = $(this).attr('data-index');
		sliderBg.goToSlide(idx);
		slideOpt();
		return false;
	});

	$('.btn').click(function() {
		if($(this).is('.btn_prev')) {
			sliderBg.goToPrevSlide();
			slideOpt();
		} else {
			sliderBg.goToNextSlide();
			slideOpt();
		}
		return false;
	});

	$('#pager a').bind('click keypress', function() {
		slideOpt()
	});

	function slideOpt() {
		sliderBg.stopAuto();
		sliderBg.startAuto();
	};
});

/* 홍보 영상보기 */
$(function() {
	$('.bnMovie').click(function() {
		var docH = $(document).height();
		$('#player').show();
		$('#player .tab a').eq(0).trigger('click');
		$('#player').before('<div class="dim"></div>');
		$('.dim').css({
			'height' : docH+'px',
			'opacity' : 0.85
		});
		sliderBg.stopAuto();
		return false;
	});


	$('#player .close').click(function() {
		$('.dim').remove();
		$(this).parent().hide();
		$('.player').empty();
		sliderBg.startAuto();
	});
});