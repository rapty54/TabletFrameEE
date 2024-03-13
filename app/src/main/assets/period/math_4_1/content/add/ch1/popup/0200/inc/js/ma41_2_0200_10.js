$(function(){
	var src = $('.contentFrame1').find('iframe').attr('src');
	$('.bbtn1').on('click',function(){
		$('.contentFrames').fadeIn();
		$('.contentFrame1').show();
		$('.contentFrame2').hide();
		$('.contentFrame1').find('iframe').attr('src',src)
		$('.contentFrame1 li').removeClass('on');
		$('.contentFrame1 li').eq(0).addClass('on');

		playSoundClick();
	});

	$('.bbtn2').on('click',function(){
		$('.contentFrames').fadeIn();
		$('.contentFrame2').show();
		$('.contentFrame1').hide();	
		var src = $('.contentFrame2').find('iframe').attr('src');
		$('.contentFrame2').find('iframe').attr('src',src)
		playSoundClick();
	});

	$('.contentFrame1 .navi li').on('click',function(){
		if($(this).hasClass('on')) return false;
		if($(this).hasClass('return')){
			$('.contentFrames').hide();
			playSoundClick();
			return false;
		}
		playSoundClick();
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		var idx = $(this).index();
		var frame = $(this).parents('.contentFrame1').find('iframe');
		var src = frame.attr('src');
		var html = src.substring(src.length-6,src.length);

		src = src.replaceAll(html, (idx+1)+'.html');
		frame.attr('src',src)
	});

	$('.contentFrame2 .return').on('click',function(){
		$('.contentFrames').hide();
		playSoundClick();
	})
})